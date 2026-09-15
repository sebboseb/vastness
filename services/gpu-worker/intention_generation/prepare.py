#!/usr/bin/env python3
"""Explicit CPU-only setup; confirm Windows backing-volume budget before invoking."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import urllib.request


def digest(path):
    h = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024*1024), b''):
            h.update(block)
    return h.hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--prefix', required=True, type=Path)
    parser.add_argument('--base-python', required=True, type=Path)
    parser.add_argument('--download-budget-bytes', required=True, type=int)
    a = parser.parse_args()
    pins = json.loads((Path(__file__).parent/'pins.json').read_text())
    planned = sum(f['bytes'] for f in pins['imageModel']['files']) + pins['alpha']['bytes']
    if planned > a.download_budget_bytes:
        raise ValueError(f'Weight bytes {planned} exceed explicit budget')
    a.prefix.mkdir(parents=True, exist_ok=True)
    report = {'plannedBytes': planned, 'model': {k: pins['imageModel'][k] for k in ['repo','revision']}, 'files': {}}
    with (a.prefix/'setup.log').open('a') as log:
        subprocess.run([str(a.base_python), '-m', 'venv', '--system-site-packages', str(a.prefix/'env')], check=True, stdout=log, stderr=log)
        subprocess.run([str(a.prefix/'env/bin/python'), '-m', 'pip', 'install', '--no-deps', *[f'{n}=={pins["packages"][n]}' for n in ['diffusers','accelerate','psutil']]], check=True, stdout=log, stderr=log)
        root = a.prefix/'weights/sdxl-turbo'
        for item in pins['imageModel']['files']:
            target = root/item['path']
            target.parent.mkdir(parents=True, exist_ok=True)
            if not target.exists():
                partial = target.with_suffix(target.suffix+'.partial')
                url = f'https://huggingface.co/{report["model"]["repo"]}/resolve/{report["model"]["revision"]}/{item["path"]}'
                urllib.request.urlretrieve(url, partial)
                partial.replace(target)
            sha = digest(target)
            if target.stat().st_size != item['bytes'] or (item['sha256'] and sha != item['sha256']):
                raise ValueError('Weight mismatch: '+item['path'])
            report['files'][item['path']] = sha
            (a.prefix/'setup-report.json').write_text(json.dumps(report, indent=2)+'\n')
        (root/'weights-manifest.json').write_text(json.dumps(report, indent=2)+'\n')
        mask = a.prefix/'weights/rembg/u2netp.onnx'
        mask.parent.mkdir(parents=True, exist_ok=True)
        if not mask.exists():
            urllib.request.urlretrieve(pins['alpha']['url'], mask)
        if mask.stat().st_size != pins['alpha']['bytes'] or digest(mask) != pins['alpha']['sha256']:
            raise ValueError('U2NetP weight mismatch')
        subprocess.run([str(a.prefix/'env/bin/python'), '-m', 'pip', 'check'], check=True, stdout=log, stderr=log)
        subprocess.run([str(a.prefix/'env/bin/python'), '-m', 'pip', 'freeze'], check=True, stdout=(a.prefix/'pip-freeze.txt').open('w'))
    print(json.dumps({'status': 'prepared', 'prefix': str(a.prefix), 'weightBytes': planned}))


if __name__ == '__main__':
    main()
