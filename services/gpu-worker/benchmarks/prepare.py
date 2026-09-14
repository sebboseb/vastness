#!/usr/bin/env python3
"""Opt-in Linux setup. Default prints a plan; never installs or downloads on macOS."""
import argparse
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import platform
import shutil
import subprocess
import sys
import urllib.request

if __package__:
    from .run import HERE, PINS, digest, write_report
else:
    from run import HERE, PINS, digest, write_report


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--execute', action='store_true')
    parser.add_argument('--download-models', action='store_true', help='Additional explicit opt-in to weight downloads')
    parser.add_argument('--prefix', type=Path, default=Path('.runtime/trellis-benchmark'))
    args = parser.parse_args(argv)
    report = {'status': 'not_run', 'nvidiaExecution': 'not_run', 'provenance': PINS,
              'prefix': str(args.prefix.resolve()), 'weightDownloadsRequested': args.download_models,
              'limitations': ['CUDA build and dependency compatibility unvalidated.',
                             'Direct packages/source pinned; transitive packages captured after setup.']}
    if not args.execute:
        print(json.dumps(report, indent=2))
        return 0
    if platform.system() != 'Linux':
        parser.error('Installation/download is disabled outside Linux; use the default plan on Mac')
    for name in ['conda', 'git', 'nvcc', 'nvidia-smi']:
        if shutil.which(name) is None:
            parser.error(f'{name} is required before setup')
    toolkit = subprocess.run(['nvcc', '--version'], text=True, capture_output=True, check=True)
    if 'release 12.1,' not in toolkit.stdout:
        parser.error('This proposed environment requires CUDA Toolkit 12.1; do not silently substitute versions')
    root = args.prefix.resolve()
    root.mkdir(parents=True, exist_ok=True)
    # A new attempt never replaces a previous setup record or environment.
    if any(root.iterdir()):
        parser.error('Setup prefix must be empty; use a fresh path for another attempt')
    environment = root / 'env'
    report['startedAt'] = datetime.now(timezone.utc).isoformat()
    report['status'] = 'running'
    (root / 'src').mkdir()
    report_path = root / 'setup-report.json'
    write_report(report_path, report)
    env = {**os.environ, 'CUDA_HOME': str(Path(shutil.which('nvcc')).resolve().parents[1])}
    try:
        with (root / 'setup.log').open('w') as log:
            def run(argv):
                report['lastCommand'] = [str(x) for x in argv]
                write_report(report_path, report)
                log.write('\n$ ' + repr(report['lastCommand']) + '\n')
                log.flush()
                subprocess.run(report['lastCommand'], stdout=log, stderr=subprocess.STDOUT, check=True, env=env)

            def checkout(name, pin):
                path = root / 'src' / name
                run(['git', 'clone', 'https://github.com/' + pin['repo'] + '.git', path])
                run(['git', '-C', path, 'checkout', '--detach', pin['revision']])
                run(['git', '-C', path, 'submodule', 'update', '--init', '--recursive'])
                return path

            trellis = checkout('TRELLIS', PINS['source'])
            checkout('dinov2', PINS['dinov2'])
            sources = {name: checkout(name, pin) for name, pin in PINS['extensions'].items()}
            run(['conda', 'create', '-y', '-p', environment, 'python=3.10', 'pip'])
            python = environment / 'bin' / 'python'
            pip = [python, '-m', 'pip']
            run([*pip, 'install', 'torch==2.4.0', 'torchvision==0.19.0', '--index-url', 'https://download.pytorch.org/whl/cu121'])
            run([*pip, 'install', '-r', HERE / 'requirements-preparation.txt'])
            run([*pip, 'install', 'xformers==0.0.27.post2', '--index-url', 'https://download.pytorch.org/whl/cu121'])
            run([*pip, 'install', 'kaolin==0.17.0', '-f', 'https://nvidia-kaolin.s3.us-east-2.amazonaws.com/torch-2.4.0_cu121.html'])
            for name, path in sources.items():
                target = path / 'submodules/diff-gaussian-rasterization' if name == 'mip-splatting' else path
                run([*pip, 'install', '--no-build-isolation', target])
            run([*pip, 'check'])
            freeze = subprocess.run([*map(str, pip), 'freeze', '--all'], text=True, capture_output=True, check=True)
            (root / 'pip-freeze.txt').write_text(freeze.stdout)
            explicit = subprocess.run(['conda', 'list', '-p', str(environment), '--explicit'], text=True, capture_output=True, check=True)
            (root / 'conda-explicit.txt').write_text(explicit.stdout)
            if digest(trellis / PINS['input']['path']) != PINS['input']['sha256']:
                raise ValueError('Upstream sample hash mismatch')
            if args.download_models:
                weights = root / 'weights' / 'trellis-image-large'
                run([python, '-c',
                     'from huggingface_hub import snapshot_download; import sys; snapshot_download(sys.argv[1], revision=sys.argv[2], local_dir=sys.argv[3])',
                     PINS['model']['repo'], PINS['model']['revision'], weights])
                files = {str(path.relative_to(weights)): digest(path) for path in weights.rglob('*')
                         if path.is_file() and '.cache' not in path.relative_to(weights).parts}
                write_report(weights / 'weights-manifest.json', {'model': PINS['model'], 'files': files})
                dino = root / 'weights' / 'dinov2'
                dino.mkdir(parents=True)
                target = dino / 'dinov2_vitl14_reg4_pretrain.pth'
                urllib.request.urlretrieve(PINS['dinov2Weights']['url'], target)
                write_report(dino / 'weights-manifest.json', {'model': PINS['dinov2Weights'], 'files': {target.name: digest(target)}})
            report['status'] = 'prepared'
            report['weightsDownloaded'] = args.download_models
    except Exception as error:
        report.update(status='failed', error=f'{type(error).__name__}: {error}')
    finally:
        report['finishedAt'] = datetime.now(timezone.utc).isoformat()
        write_report(report_path, report)
    print(json.dumps(report, indent=2))
    return 0 if report['status'] == 'prepared' else 1


if __name__ == '__main__':
    sys.exit(main())
