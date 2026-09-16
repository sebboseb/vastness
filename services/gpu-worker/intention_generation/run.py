#!/usr/bin/env python3
"""Command adapter: validated semantics → SDXL-Turbo image → genuine TRELLIS geometry."""
import argparse
from datetime import datetime, timezone
import importlib.util
import json
import os
from pathlib import Path
import signal
import subprocess
import sys
import time
from semantic import image_prompt, validate_request

HERE = Path(__file__).resolve().parent
PINS = json.loads((HERE / 'pins.json').read_text())
spec = importlib.util.spec_from_file_location('benchmark_helpers', HERE.parent / 'benchmarks/run.py')
shared = importlib.util.module_from_spec(spec)
spec.loader.exec_module(shared)


def verify_image_weights(root):
    manifest = json.loads((root / 'weights-manifest.json').read_text())
    if manifest['model'] != {k: PINS['imageModel'][k] for k in ['repo', 'revision']}:
        raise ValueError('Wrong image model identity')
    for item in PINS['imageModel']['files']:
        path = root / item['path']
        expected = item['sha256'] or manifest['files'][item['path']]
        if path.stat().st_size != item['bytes'] or shared.digest(path) != expected:
            raise ValueError('Image weight integrity mismatch: ' + item['path'])
    return manifest


def execute(args):
    out = args.output.resolve()
    out.mkdir(parents=True, exist_ok=True)
    if any(out.iterdir()):
        raise ValueError('Output directory must be empty; existing evidence is preserved')
    report = {'schemaVersion': 1, 'backend': PINS['backend'], 'status': 'running',
        'startedAt': datetime.now(timezone.utc).isoformat(), 'stage': 'request',
        'pins': PINS, 'nvidiaExecution': 'not_run', 'stages': {}, 'artifacts': [],
        'vastnessGit': shared.command(['git', 'rev-parse', 'HEAD'], HERE),
        'limitations': ['Asset/diorama generation, not guaranteed walkable room geometry.',
            'Scale remains model units until Mac preparation.', 'Semantic fidelity requires qualitative inspection.']}
    report_path = out / 'generation-report.json'
    child = sampler = None
    interrupted = []
    started = time.monotonic()

    def stop(sig, frame):
        interrupted.append(sig)
        if child is not None and child.poll() is None:
            child.terminate()

    previous = {sig: signal.signal(sig, stop) for sig in [signal.SIGTERM, signal.SIGINT]}
    try:
        request = json.loads(args.request.read_text())
        intent = validate_request(request)
        report.update(request=request, semantics=intent, compiledImagePrompt=image_prompt(intent))
        (out / 'request.json').write_text(json.dumps(request, indent=2)+'\n')
        (out / 'image-prompt.txt').write_text(report['compiledImagePrompt'])
        report['stage'] = 'preflight'
        shared.write_report(report_path, report)
        report['trellisPreflight'] = shared.preflight(args)
        if not report['trellisPreflight']['readyForAttempt']:
            raise ValueError('; '.join(report['trellisPreflight']['problems']))
        report['imageWeights'] = verify_image_weights(args.image_weights)
        report['packageVersions'] = {name: shared.metadata.version(name) for name in ['torch', 'transformers', 'diffusers', 'accelerate', 'rembg', 'onnxruntime']}
        for name, version in PINS['packages'].items():
            if shared.metadata.version(name) != version:
                raise ValueError('Wrong package version: ' + name)
        stages = [
            ('image', [sys.executable, str(HERE / 'image_stage.py'), '--weights', str(args.image_weights),
                '--seed', str(request['seed']), '--output', str(out)]),
            ('trellis', [str(args.trellis_python), str(HERE / 'trellis_stage.py'),
                '--trellis-root', str(args.trellis_root), '--weights-root', str(args.weights_root),
                '--dinov2-root', str(args.dinov2_root), '--dinov2-weights', str(args.dinov2_weights),
                '--image', str(out / 'source-rgba.png'), '--seed', str(request['seed']), '--output', str(out)])]
        with (out / 'gpu-memory.csv').open('w') as memory_log:
            sampler = subprocess.Popen(['nvidia-smi', '--query-gpu=timestamp,index,uuid,memory.used', '--format=csv', '--loop-ms=100'], stdout=memory_log, stderr=memory_log)
            for name, command in stages:
                if interrupted:
                    raise InterruptedError('Generation cancelled')
                report['stage'] = name
                report['nvidiaExecution'] = 'attempted'
                report['stages'][name] = {'command': command, 'status': 'running'}
                shared.write_report(report_path, report)
                stage_start = time.monotonic()
                with (out / (name + '.log')).open('w') as log:
                    child = subprocess.Popen(command, stdout=log, stderr=subprocess.STDOUT,
                        env={**os.environ, 'HF_HUB_OFFLINE': '1', 'TRANSFORMERS_OFFLINE': '1', 'PYTHONDONTWRITEBYTECODE': '1'})
                    code = child.wait()
                report['stages'][name].update(exitCode=code, wallSeconds=time.monotonic()-stage_start,
                    status='succeeded' if code == 0 else 'failed')
                if interrupted:
                    raise InterruptedError('Generation cancelled')
                metrics_path = out / (name + '-metrics.json')
                if metrics_path.exists():
                    report['stages'][name]['metrics'] = json.loads(metrics_path.read_text())
                if code:
                    raise RuntimeError(f'{name} stage exited {code}; see {name}.log')
        for name in ['scene.ply', 'collider.glb', 'source-rgb.png', 'source-rgba.png', 'image-prompt.txt']:
            path = out / name
            report['artifacts'].append({'path': name, 'bytes': path.stat().st_size, 'sha256': shared.digest(path)})
        report.update(status='succeeded', stage='complete', nvidiaExecution='completed')
    except Exception as error:
        report.update(status='cancelled' if isinstance(error, InterruptedError) else 'failed', error=f'{type(error).__name__}: {error}')
    finally:
        for proc in [child, sampler]:
            if proc is not None and proc.poll() is None:
                proc.terminate()
                try:
                    proc.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    proc.kill()
                    proc.wait()
        report.update(finishedAt=datetime.now(timezone.utc).isoformat(), wallSeconds=time.monotonic()-started,
            deviceMemoryMeasurement=shared.device_memory(out / 'gpu-memory.csv'))
        shared.write_report(report_path, report)
        for sig, handler in previous.items():
            signal.signal(sig, handler)
    print(json.dumps({'status': report['status'], 'report': str(report_path), 'error': report.get('error')}), flush=True)
    return 0 if report['status'] == 'succeeded' else 1


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ['request', 'output', 'image-weights', 'trellis-python', 'trellis-root', 'weights-root', 'dinov2-root', 'dinov2-weights']:
        parser.add_argument('--' + name, type=Path, required=True)
    return execute(parser.parse_args())


if __name__ == '__main__':
    sys.exit(main())
