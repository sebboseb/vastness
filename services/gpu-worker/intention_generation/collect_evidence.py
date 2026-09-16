#!/usr/bin/env python3
"""Collect final reports/images through verified Windows SSH and hash-check HTTP artifacts."""
import argparse
import base64
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import urllib.request

REMOTE = '''from pathlib import Path
import json,base64,hashlib
root=Path(CONFIG['prefix'])/'shared/data'
paths=[root/'artifacts'/CONFIG['job'],root/'failures'/CONFIG['job']]
source=next((p for p in paths if p.is_dir()),None)
if source is None:raise ValueError('Final job directory is unavailable; wait for completion')
report=json.loads((source/'generation-report.json').read_text())
if report['status'] not in ['succeeded','failed','cancelled']:raise ValueError('Job is not final')
names=['generation-report.json','request.json','image-prompt.txt','source-rgb.png','source-rgba.png','image-metrics.json','trellis-metrics.json','image.log','trellis.log','gpu-memory.csv']
files={}
for name in names:
 p=source/name
 if p.is_file():
  data=p.read_bytes();files[name]={'sha256':hashlib.sha256(data).hexdigest(),'base64':base64.b64encode(data).decode()}
print(json.dumps(files))
'''


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--job', required=True)
    p.add_argument('--output', type=Path, required=True)
    p.add_argument('--host', default='vastness-gpu')
    p.add_argument('--prefix', default='/home/vastness/.local/share/vastness-intention-worker')
    p.add_argument('--worker-url', default='http://127.0.0.1:14321')
    a = p.parse_args()
    if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_-]{0,127}', a.job):
        p.error('Invalid job id')
    spec = importlib.util.spec_from_file_location('wsl_deploy', Path(__file__).resolve().parents[3]/'scripts/deploy-worker-wsl.py')
    deploy = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(deploy)
    metadata = json.dumps({'program': REMOTE, 'config': {'job': a.job, 'prefix': a.prefix}}).encode()
    result = subprocess.run(['ssh', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', a.host,
        deploy.encode_remote_command('Ubuntu-24.04', 'vastness')],
        input=len(metadata).to_bytes(4,'big')+metadata, capture_output=True, check=True)
    files = json.loads(result.stdout)
    a.output.mkdir(parents=True, exist_ok=True)
    for name, item in files.items():
        if Path(name).name != name:
            raise ValueError('Invalid remote evidence name')
        data = base64.b64decode(item['base64'], validate=True)
        if hashlib.sha256(data).hexdigest() != item['sha256']:
            raise ValueError('Evidence transfer hash mismatch')
        path = a.output/name
        if path.exists() and path.read_bytes() != data:
            raise ValueError('Refusing to overwrite different evidence: '+name)
        path.write_bytes(data)
    report = json.loads((a.output/'generation-report.json').read_text())
    if report['status'] == 'succeeded':
        manifest = json.load(urllib.request.urlopen(a.worker_url+'/jobs/'+a.job+'/artifacts', timeout=30))
        for item in manifest:
            name = 'scene.ply' if item['format'] == 'ply' else 'collider.glb'
            if item['url'] != '/artifacts/'+a.job+'/'+name or item['bytes'] > 512*1024*1024:
                raise ValueError('Unexpected artifact location or size')
            with urllib.request.urlopen(a.worker_url+item['url'], timeout=120) as response:
                data = response.read(item['bytes']+1)
            sha = hashlib.sha256(data).hexdigest()
            if len(data) != item['bytes'] or sha != item['sha256']:
                raise ValueError('Artifact transfer hash mismatch')
            recorded = next(x for x in report['artifacts'] if x['path'] == name)
            if sha != recorded['sha256']:
                raise ValueError('HTTP manifest disagrees with generation report')
            target = a.output/name
            if target.exists() and target.read_bytes() != data:
                raise ValueError('Refusing to overwrite different artifact')
            target.write_bytes(data)
        (a.output/'worker-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    print(json.dumps({'job': a.job, 'status': report['status'], 'output': str(a.output.resolve())}))


if __name__ == '__main__':
    main()
