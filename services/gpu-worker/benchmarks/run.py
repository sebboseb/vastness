#!/usr/bin/env python3
"""CPU-safe planning, validation and reporting around an opt-in NVIDIA child process."""
import argparse
import csv
from datetime import datetime, timezone
import hashlib
from importlib import metadata
import json
import os
from pathlib import Path
import platform
import signal
import subprocess
import sys
import time

HERE = Path(__file__).resolve().parent
PINS = json.loads((HERE / 'pins.json').read_text())


def digest(path):
    result = hashlib.sha256()
    with Path(path).open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            result.update(chunk)
    return result.hexdigest()


def command(argv, cwd=None):
    try:
        proc = subprocess.run(argv, cwd=cwd, text=True, capture_output=True, timeout=20)
        return {'argv': argv, 'exitCode': proc.returncode, 'stdout': proc.stdout.strip(),
                'stderr': proc.stderr.strip()}
    except (OSError, subprocess.TimeoutExpired) as error:
        return {'argv': argv, 'exitCode': None, 'stdout': '', 'stderr': str(error)}


def plan():
    return {'schemaVersion': 1, 'status': 'not_run', 'nvidiaExecution': 'not_run',
            'provenance': PINS, 'case': 'upstream-T-seed-1',
            'parameters': {'seed': 1, 'formats': ['gaussian', 'mesh'],
                           'sparseSteps': 12, 'sparseCfg': 7.5, 'slatSteps': 12, 'slatCfg': 3.0},
            'outputs': ['scene.ply', 'collider.glb'],
            'limits': ['Fixed upstream image; prompt, fixture and boundary conditioning unsupported.',
                       'Raw geometry proxy; walkability, scale and browser acceptance unmeasured.',
                       'Dependency installation and NVIDIA execution remain unvalidated.'],
            'metrics': None, 'artifacts': [], 'error': None}


def validate_request(path):
    request = json.loads(Path(path).read_text())
    if not isinstance(request, dict):
        raise ValueError('Request must be a JSON object')
    if request.get('prompt') != '' or request.get('boundary') is not None or request.get('fixture') is not None:
        raise ValueError('This fixed-image benchmark requires empty prompt and no boundary/fixture')
    if type(request.get('seed')) is not int or request['seed'] != 1:
        raise ValueError('This pinned benchmark requires seed=1')
    return request


def verify_manifest(root, expected):
    root = root.resolve()
    manifest = json.loads((root / 'weights-manifest.json').read_text())
    if manifest.get('model') != expected or not manifest.get('files'):
        raise ValueError(f'Wrong or empty weight manifest: {root}')
    for name, sha in manifest['files'].items():
        path = (root / name).resolve()
        if not path.is_relative_to(root) or digest(path) != sha:
            raise ValueError(f'Weight integrity mismatch: {name}')
    return manifest


def preflight(args):
    checks = {'os': platform.system(), 'python': platform.python_version(),
              'nvidia': command(['nvidia-smi', '--query-gpu=index,uuid,name,driver_version,memory.total,memory.free', '--format=csv']),
              'nvcc': command(['nvcc', '--version']), 'packages': {}}
    for name in ['torch', 'torchvision', 'xformers', 'kaolin', 'spconv-cu120']:
        try:
            checks['packages'][name] = metadata.version(name)
        except metadata.PackageNotFoundError:
            checks['packages'][name] = None
    problems = []
    for name, version in checks['packages'].items():
        if version is None:
            problems.append(f'Required package is unavailable: {name}')
    expected_packages = {'torch': '2.4.0', 'torchvision': '0.19.0', 'xformers': '0.0.27.post2',
                         'kaolin': '0.17.0', 'spconv-cu120': '2.3.6'}
    for name, expected in expected_packages.items():
        version = checks['packages'].get(name)
        if version is not None and version.split('+')[0] != expected:
            problems.append(f'Prepared environment expects {name}=={expected}; found {version}')
    if checks['os'] != 'Linux':
        problems.append('NVIDIA execution requires Linux')
    for name in ['nvidia', 'nvcc']:
        if checks[name]['exitCode'] != 0:
            problems.append(f'{name} is unavailable or failed')
    if checks['nvcc']['exitCode'] == 0 and 'release 12.1,' not in checks['nvcc']['stdout']:
        problems.append('Pinned preparation expects CUDA Toolkit 12.1')
    try:
        for flag, pin in [('trellis_root', 'source'), ('dinov2_root', 'dinov2')]:
            root = getattr(args, flag)
            if root is None:
                raise ValueError(f'--{flag.replace("_", "-")} is required')
            actual = command(['git', 'rev-parse', 'HEAD'], root)
            checks[pin] = actual
            if actual['stdout'] != PINS[pin]['revision'] or actual['exitCode'] != 0:
                raise ValueError(f'Wrong {pin} revision')
            dirty = command(['git', 'diff', '--exit-code', 'HEAD', '--'], root)
            if dirty['exitCode'] != 0:
                raise ValueError(f'Modified tracked files in {pin} checkout')
        if digest(args.trellis_root / PINS['input']['path']) != PINS['input']['sha256']:
            raise ValueError('Pinned input image hash mismatch')
        if args.weights_root is None or args.dinov2_weights is None:
            raise ValueError('--weights-root and --dinov2-weights are required')
        checks['weights'] = verify_manifest(args.weights_root, PINS['model'])
        pipeline = json.loads((args.weights_root / 'pipeline.json').read_text())
        recorded = checks['weights']['files']
        required = ['pipeline.json']
        for model_path in pipeline['args']['models'].values():
            if not model_path.startswith('ckpts/') or '..' in Path(model_path).parts:
                raise ValueError('Unexpected model reference; remote fallback is forbidden')
            required.extend([model_path + '.json', model_path + '.safetensors'])
        if any(name not in recorded for name in required):
            raise ValueError('Weight manifest is missing a required pipeline/model file')
        checks['dinov2Weights'] = verify_manifest(args.dinov2_weights.parent, PINS['dinov2Weights'])
        if args.dinov2_weights.name not in checks['dinov2Weights']['files']:
            raise ValueError('DINO weight path is not in its manifest')
    except (ValueError, OSError, TypeError, KeyError) as error:
        problems.append(str(error))
    checks['problems'] = problems
    checks['readyForAttempt'] = not problems
    checks['note'] = 'Read-only inspection; no torch import, CUDA inference or artifact generation.'
    return checks


def write_report(path, report):
    temporary = path.with_suffix('.json.tmp')
    temporary.write_text(json.dumps(report, indent=2) + '\n')
    temporary.replace(path)


def device_memory(path):
    devices = {}
    if path.exists():
        with path.open() as stream:
            for row in csv.reader(stream):
                if len(row) != 4:
                    continue
                try:
                    used = float(row[3].strip().split()[0])
                except (ValueError, IndexError):
                    continue
                uuid = row[2].strip()
                previous = devices.setdefault(uuid, {'baselineMiB': used, 'sampledPeakMiB': used, 'samples': 0})
                previous['sampledPeakMiB'] = max(previous['sampledPeakMiB'], used)
                previous['samples'] += 1
    return {'file': path.name if path.exists() else None, 'pollIntervalMs': 100,
            'devices': devices or None,
            'note': 'First sample is baseline, not guaranteed idle. Whole-device usage includes other processes and may miss peaks. Torch peaks are separate.'}


def execute(args):
    if args.output is None or args.request is None:
        raise ValueError('--execute requires --request and --output')
    out = args.output.resolve()
    out.mkdir(parents=True, exist_ok=True)
    if any(out.iterdir()):
        raise ValueError('Output directory must be empty; previous evidence will not be overwritten')
    report = plan()
    report.update({'startedAt': datetime.now(timezone.utc).isoformat(),
                   'command': sys.argv, 'stage': 'request', 'exitCode': None,
                   'vastnessGit': command(['git', 'rev-parse', 'HEAD'], HERE),
                   'logs': ['inference.log', 'gpu-memory.csv']})
    report_path = out / 'benchmark-report.json'
    started = time.monotonic()
    child = sampler = None
    interrupted = []

    def stop(signum, frame):
        interrupted.append(signum)
        if child is not None and child.poll() is None:
            child.terminate()

    old_handlers = {sig: signal.signal(sig, stop) for sig in (signal.SIGTERM, signal.SIGINT)}
    try:
        report['request'] = validate_request(args.request)
        report['stage'] = 'preflight'
        report['preflight'] = preflight(args)
        write_report(report_path, report)
        if not report['preflight']['readyForAttempt']:
            raise ValueError('; '.join(report['preflight']['problems']))
        if interrupted:
            raise InterruptedError('Cancelled before NVIDIA execution')
        report['stage'] = 'inference'
        child_argv = [sys.executable, str(HERE / 'infer.py'),
                      '--trellis-root', str(args.trellis_root.resolve()),
                      '--weights-root', str(args.weights_root.resolve()),
                      '--dinov2-root', str(args.dinov2_root.resolve()),
                      '--dinov2-weights', str(args.dinov2_weights.resolve()),
                      '--output', str(out)]
        report['inferenceCommand'] = child_argv
        with (out / 'inference.log').open('w') as log, (out / 'gpu-memory.csv').open('w') as gpu_log:
            sampler = subprocess.Popen(['nvidia-smi', '--query-gpu=timestamp,index,uuid,memory.used',
                                        '--format=csv', '--loop-ms=100'], stdout=gpu_log, stderr=gpu_log)
            child = subprocess.Popen(child_argv, stdout=log, stderr=subprocess.STDOUT,
                                     env={**os.environ, 'HF_HUB_OFFLINE': '1', 'TRANSFORMERS_OFFLINE': '1'})
            report['nvidiaExecution'] = 'attempted'
            write_report(report_path, report)
            report['exitCode'] = child.wait()
        if interrupted:
            raise InterruptedError('Cancelled during NVIDIA execution')
        if report['exitCode'] != 0:
            raise RuntimeError(f'Inference exited {report["exitCode"]}; see inference.log')
        report['stage'] = 'artifacts'
        report['metrics'] = json.loads((out / 'metrics.json').read_text())
        for name in ['scene.ply', 'collider.glb']:
            path = out / name
            if path.stat().st_size == 0:
                raise ValueError(f'Empty generated artifact: {name}')
            report['artifacts'].append({'path': name, 'bytes': path.stat().st_size, 'sha256': digest(path)})
        report.update(status='succeeded', nvidiaExecution='completed', stage='complete')
    except Exception as error:
        report.update(status='cancelled' if isinstance(error, InterruptedError) else 'failed',
                      error=f'{type(error).__name__}: {error}')
    finally:
        if child is not None and child.poll() is None:
            child.terminate()
            try:
                child.wait(timeout=5)
            except subprocess.TimeoutExpired:
                child.kill()
                child.wait()
        if sampler is not None:
            sampler.terminate()
            try:
                sampler.wait(timeout=5)
            except subprocess.TimeoutExpired:
                sampler.kill()
                sampler.wait()
        report['wallSeconds'] = time.monotonic() - started
        report['finishedAt'] = datetime.now(timezone.utc).isoformat()
        report['deviceMemoryMeasurement'] = device_memory(out / 'gpu-memory.csv')
        report['logs'] = [name for name in report['logs'] if (out / name).exists()]
        write_report(report_path, report)
        for sig, old in old_handlers.items():
            signal.signal(sig, old)
    print(json.dumps(report, indent=2))
    return 0 if report['status'] == 'succeeded' else 1


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument('--plan', action='store_true', help='Print preparation plan; never import torch or execute')
    mode.add_argument('--preflight', action='store_true', help='Read-only inventory; no model/CUDA imports')
    mode.add_argument('--execute', action='store_true', help='Explicitly attempt pinned inference on NVIDIA Linux')
    for flag in ['trellis-root', 'weights-root', 'dinov2-root', 'dinov2-weights', 'request', 'output']:
        parser.add_argument('--' + flag, type=Path)
    args = parser.parse_args(argv)
    if args.execute:
        try:
            return execute(args)
        except (ValueError, OSError) as error:
            parser.error(str(error))
    report = plan()
    if args.preflight:
        report['preflight'] = preflight(args)
    print(json.dumps(report, indent=2))
    return 0


if __name__ == '__main__':
    sys.exit(main())
