#!/usr/bin/env python3
"""Immutable, resumable serial reliability batch. Preflight uses existing CPU tokenizers only."""
import argparse
import base64
from datetime import datetime, timezone
import fcntl
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request

TERMINAL = {'succeeded', 'failed', 'cancelled'}
MODEL = '/home/vastness/.local/share/vastness-intention-models/20260915-01'
PREFIX = '/home/vastness/.local/share/vastness-intention-worker'


def now():
    return datetime.now(timezone.utc).isoformat()


def sha(data):
    return hashlib.sha256(data).hexdigest()


def save(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix('.tmp')
    temporary.write_text(json.dumps(value, indent=2) + '\n')
    temporary.replace(path)


def immutable(path, value):
    if path.exists():
        if json.loads(path.read_text()) != value:
            raise ValueError('Immutable study input changed: ' + str(path))
    else:
        save(path, value)


def event(out, **value):
    value = {'at': now(), **value}
    with (out / 'events.jsonl').open('a') as stream:
        stream.write(json.dumps(value) + '\n')
    print(json.dumps(value), flush=True)


def request(url, value=None):
    req = urllib.request.Request(url, data=None if value is None else json.dumps(value).encode(),
                                 headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.load(response)


def get(url, out, deadline):
    while True:
        try:
            return request(url)
        except (OSError, TimeoutError) as error:
            if isinstance(error, urllib.error.HTTPError) and error.code < 500:
                raise
            event(out, event='transport-interruption', url=url, error=str(error))
            if time.monotonic() >= deadline:
                raise TimeoutError('Transport deadline reached; resume saved IDs') from error
            time.sleep(5)


def module(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def remote(args, program, config):
    deploy = module(args.runtime_repo / 'scripts/deploy-worker-wsl.py', 'wsl_deploy')
    metadata = json.dumps({'program': program, 'config': config}).encode()
    if len(metadata) > 65536:
        raise ValueError('Remote metadata exceeds transport bound')
    result = subprocess.run(['ssh', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes',
                             '-o', 'ConnectTimeout=15', args.host,
                             deploy.encode_remote_command('Ubuntu-24.04', 'vastness')],
                            input=len(metadata).to_bytes(4, 'big') + metadata,
                            capture_output=True, timeout=240)
    if result.returncode:
        raise RuntimeError(result.stderr.decode(errors='replace')[-4000:])
    return json.loads(result.stdout)


PREFLIGHT = r'''
from pathlib import Path
import json, os, shutil, subprocess
root = Path(CONFIG['prefix'])
repo = root/'current/repo'
code = """import json,sys
from pathlib import Path
from transformers import CLIPTokenizer
sys.path.insert(0,sys.argv[1])
from semantic import image_prompt
weights=Path(sys.argv[2])
tokenizers=[CLIPTokenizer.from_pretrained(str(weights/name),local_files_only=True) for name in ['tokenizer','tokenizer_2']]
rows=[]
for item in json.load(sys.stdin):
 prompt=image_prompt(item['semantics'])
 counts=[len(t(prompt,truncation=False)['input_ids']) for t in tokenizers]
 limits=[t.model_max_length for t in tokenizers]
 rows.append({**item,'imagePrompt':prompt,'tokenCounts':counts,'tokenLimits':limits,'promptLengthPass':all(n<=limit for n,limit in zip(counts,limits))})
print(json.dumps(rows))
"""
result = subprocess.run([CONFIG['model']+'/env/bin/python','-c',code,
 str(repo/'services/gpu-worker/intention_generation'),CONFIG['model']+'/weights/sdxl-turbo'],
 input=json.dumps(CONFIG['rows']),capture_output=True,text=True,check=True,
 env={**os.environ,'CUDA_VISIBLE_DEVICES':'','HF_HUB_OFFLINE':'1','TRANSFORMERS_OFFLINE':'1','PYTHONDONTWRITEBYTECODE':'1'})
# Inspect the Windows backing volume as well as guest free space.
ps = "Get-Volume -DriveLetter E | Select-Object DriveLetter,Size,SizeRemaining | ConvertTo-Json -Compress"
volume=subprocess.run(['/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe','-NoProfile','-NonInteractive','-Command',ps],capture_output=True,text=True,check=True)
print(json.dumps({'rows':json.loads(result.stdout),'tokenizerStderr':result.stderr,
 'workerCommit':subprocess.check_output(['git','-C',str(repo),'rev-parse','HEAD'],text=True).strip(),
 'workerDirty':subprocess.check_output(['git','-C',str(repo),'status','--porcelain'],text=True),
 'linuxDisk':shutil.disk_usage(root)._asdict(),'windowsVolume':json.loads(volume.stdout),
 'gpu':subprocess.check_output(['nvidia-smi','--query-gpu=name,memory.used,memory.total','--format=csv'],text=True),
 'nvidiaExecution':'not_run'}))
'''


def preflight(args, plan):
    compiler = args.runtime_repo / 'services/intention-prototype/semantics.ts'
    source = ("import {deriveIntent} from " + json.dumps(compiler.as_uri()) + ";"
              "let s='';for await(const c of process.stdin)s+=c;"
              "console.log(JSON.stringify(JSON.parse(s).map(c=>({id:c.id,...deriveIntent({text:c.text,source:'text'})}))));")
    result = subprocess.run(['node', '--import', 'tsx', '--input-type=module', '-e', source],
                            cwd=args.runtime_repo, input=json.dumps(plan['candidates']),
                            text=True, capture_output=True, check=True)
    rows = json.loads(result.stdout)
    evidence = remote(args, PREFLIGHT, {'rows': rows, 'prefix': args.prefix, 'model': args.model})
    if evidence['workerCommit'] != plan['workerCommit'] or evidence['workerDirty']:
        raise ValueError('Deployed checkout differs from immutable worker commit')
    budget = 20 * 1024 ** 3
    evidence.update(capturedAt=now(), outputBudgetBytes=budget,
                    macDisk=shutil.disk_usage(args.output)._asdict())
    save(args.output / 'preflight.json', evidence)
    if min(evidence['linuxDisk']['free'], evidence['windowsVolume']['SizeRemaining'],
           evidence['macDisk']['free']) < budget:
        raise ValueError('Insufficient measured disk budget for baseline artifacts')
    return evidence


# Complement the existing collector: enumerate *all* retained failure evidence,
# including partial geometry, without requiring a generation-report.json.
INDEX = r'''
from pathlib import Path
import hashlib,json
root=Path(CONFIG['prefix'])/'shared/data'
source=next((p for p in [root/'artifacts'/CONFIG['job'],root/'failures'/CONFIG['job']] if p.is_dir()),None)
files=[]
if source:
 for p in sorted(source.iterdir()):
  if p.is_file():
   h=hashlib.sha256()
   with p.open('rb') as f:
    for block in iter(lambda:f.read(1024*1024),b''):h.update(block)
   files.append({'name':p.name,'bytes':p.stat().st_size,'sha256':h.hexdigest()})
print(json.dumps({'source':str(source) if source else None,'files':files}))
'''
CHUNK = r'''
from pathlib import Path
import base64,json
p=Path(CONFIG['source'])/CONFIG['name']
with p.open('rb') as f:
 f.seek(CONFIG['offset']);data=f.read(1024*1024)
print(json.dumps({'base64':base64.b64encode(data).decode()}))
'''


def collect(args, out, state, job):
    collector = args.runtime_repo / 'services/gpu-worker/intention_generation/collect_evidence.py'
    run = subprocess.run([sys.executable, str(collector), '--job', state['jobId'], '--output', str(out),
                          '--worker-url', args.worker_url, '--host', args.host, '--prefix', args.prefix],
                         capture_output=True, text=True, timeout=600)
    save(out / 'collector-result.json', {'exitCode': run.returncode, 'stdout': run.stdout, 'stderr': run.stderr})
    index = remote(args, INDEX, {'prefix': args.prefix, 'job': state['jobId']})
    save(out / 'remote-evidence-index.json', index)
    for item in index['files']:
        name = item['name']
        if Path(name).name != name or item['bytes'] > 512 * 1024 ** 2:
            raise ValueError('Unexpected evidence filename or size')
        path = out / name
        if path.exists():
            if sha(path.read_bytes()) != item['sha256']:
                raise ValueError('Existing evidence hash mismatch: ' + name)
            continue
        temporary = out / (name + '.download')
        with temporary.open('wb') as stream:
            for offset in range(0, item['bytes'], 1024 * 1024):
                part = remote(args, CHUNK, {'source': index['source'], 'name': name, 'offset': offset})
                stream.write(base64.b64decode(part['base64'], validate=True))
        if temporary.stat().st_size != item['bytes'] or sha(temporary.read_bytes()) != item['sha256']:
            raise ValueError('Failure evidence transfer hash mismatch')
        temporary.replace(path)
    if job['status'] == 'succeeded' and run.returncode:
        # A transfer failure is resumable, never counted as a new generation.
        raise RuntimeError('Successful job collector needs resumption: ' + run.stderr[-1000:])
    save(out / 'evidence-manifest.json', {'hashVerified': True, **index})
    report_path = out / 'generation-report.json'
    if not report_path.exists():
        return None
    report = json.loads(report_path.read_text())
    if report['vastnessGit']['stdout'] != state['workerCommit'] or report.get('request') != state['request']:
        raise ValueError('Generation provenance differs from submitted request')
    return report


def find_submission(worlds, state):
    raw = state['rawIntent']
    matches = [w for w in worlds if w['rawIntent']['text'] == raw['text']
               and w['rawIntent']['source'] == raw['source']
               and w['request']['seed'] == raw['seed'] and w['createdAt'] >= state['declaredAt']]
    if len(matches) > 1:
        raise ValueError('Ambiguous previous submission; refusing another generation')
    return matches[0] if matches else None


def candidate(row, tokens, args, plan):
    out = args.output / row['id']
    out.mkdir(exist_ok=True)
    path = out / 'candidate.json'
    raw = {'text': row['text'], 'source': 'text', 'seed': row['seed']}
    if path.exists():
        state = json.loads(path.read_text())
        if state['rawIntent'] != raw:
            raise ValueError('Saved request differs from declared plan')
        if state.get('collected'):
            return
    else:
        state = {'candidate': row['id'], **row, 'rawIntent': raw, 'declaredAt': now(),
                 'workerCommit': plan['workerCommit'], 'semantics': tokens['semantics']}
        save(path, state)
    immutable(out / 'token-preflight.json', tokens)
    if not tokens['promptLengthPass']:
        state.update(collected=True, gpuStatus='not_submitted', macStatus='not_submitted',
                     failureStage='prompt_length', finishedAt=now())
        save(path, state)
        event(args.output, event='collected', **state)
        return
    deadline = time.monotonic() + args.timeout
    version = get(args.worker_url + '/version', args.output, deadline)
    if version['gitCommit'] != plan['workerCommit']:
        raise ValueError('Live worker differs from declared pipeline')
    save(out / 'worker-version.json', version)
    if not state.get('worldId'):
        world = find_submission(get(args.api_url + '/api/intent/worlds', args.output, deadline), state)
        if world is None:
            if state.get('submissionAttemptedAt'):
                raise RuntimeError('Uncertain previous POST absent from world list; reconcile before continuing')
            state['submissionAttemptedAt'] = now()
            save(path, state)
            # Never retry a POST. On response loss, reconcile the durable world next run.
            world = request(args.api_url + '/api/intent/worlds', raw)
        if world['request']['seed'] != row['seed'] or world['semantics'] != tokens['semantics']:
            raise ValueError('API seed/semantic output differs from preflight')
        state.update(worldId=world['id'], jobId=world['jobId'], request=world['request'],
                     semantics=world['semantics'])
        save(path, state)
        save(out / 'world-submitted.json', world)
        event(args.output, event='submitted', candidate=row['id'], jobId=state['jobId'])
    while True:
        world = get(args.api_url + '/api/intent/worlds/' + state['worldId'], args.output, deadline)
        save(out / 'world.json', world)
        try:
            job = get(args.worker_url + '/jobs/' + state['jobId'], args.output, deadline)
        except urllib.error.HTTPError as error:
            if error.code != 404:
                raise
            job = {'status': 'not_submitted' if world['status'] == 'failed' else 'awaiting-submission'}
        save(out / 'worker-job.json', job)
        with (out / 'polls.jsonl').open('a') as stream:
            stream.write(json.dumps({'at': now(), 'worldStatus': world['status'], 'job': job}) + '\n')
        if job['status'] in TERMINAL or job['status'] == 'not_submitted':
            break
        if time.monotonic() >= deadline:
            raise TimeoutError('Polling deadline reached; resume same job')
        time.sleep(args.poll_seconds)
    report = None if job['status'] == 'not_submitted' else collect(args, out, state, job)
    for _ in range(20):
        world = get(args.api_url + '/api/intent/worlds/' + state['worldId'], args.output, deadline)
        if world['status'] in {'ready', 'failed'}:
            break
        time.sleep(args.poll_seconds)
    save(out / 'world.json', world)
    state.update(collected=True, gpuStatus=job['status'], macStatus=world['status'], finishedAt=now(),
                 generationSeconds=report.get('wallSeconds') if report else None,
                 deviceMemoryMeasurement=report.get('deviceMemoryMeasurement') if report else None,
                 failureStage=report.get('stage') if report and report.get('status') != 'succeeded' else None,
                 geometryAssessment='pending separate generated-support assessment')
    save(path, state)
    event(args.output, event='collected', candidate=row['id'], jobId=state['jobId'],
          gpuStatus=state['gpuStatus'], macStatus=state['macStatus'], generationSeconds=state['generationSeconds'])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--execute', action='store_true')
    parser.add_argument('--preflight', action='store_true', help='Read-only worker/tokenizer checks; no jobs')
    parser.add_argument('--runtime-repo', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--plan', type=Path)
    parser.add_argument('--output', type=Path)
    parser.add_argument('--api-url', default='http://127.0.0.1:4311')
    parser.add_argument('--worker-url', default='http://127.0.0.1:14321')
    parser.add_argument('--host', default='vastness-gpu')
    parser.add_argument('--prefix', default=PREFIX)
    parser.add_argument('--model', default=MODEL)
    parser.add_argument('--timeout', type=int, default=2400)
    parser.add_argument('--poll-seconds', type=float, default=3)
    args = parser.parse_args()
    args.runtime_repo = args.runtime_repo.resolve()
    args.plan = args.plan or args.runtime_repo / 'scripts/reliability/plan.json'
    args.output = (args.output or args.runtime_repo / '.runtime/reliability/candidates').resolve()
    plan = json.loads(args.plan.read_text())
    if len(plan['candidates']) != plan['candidateCount'] or len({r['id'] for r in plan['candidates']}) != plan['candidateCount']:
        raise ValueError('Invalid declared candidate count/IDs')
    if any(not re.fullmatch(r'[a-z0-9_-]+', row['id']) for row in plan['candidates']):
        raise ValueError('Unsafe candidate ID')
    if not args.execute and not args.preflight:
        print(json.dumps(plan, indent=2))
        return
    args.output.mkdir(parents=True, exist_ok=True)
    with (args.output / '.batch.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        immutable(args.output / 'declared-batch.json', plan)
        provenance = {'runnerSha256': sha(Path(__file__).read_bytes()),
                      'runnerGitCommit': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=Path(__file__).parent, text=True).strip(),
                      'planSha256': sha(args.plan.read_bytes()),
                      'compilerSha256': sha((args.runtime_repo / 'services/intention-prototype/semantics.ts').read_bytes()),
                      'collectorSha256': sha((args.runtime_repo / 'services/gpu-worker/intention_generation/collect_evidence.py').read_bytes())}
        if args.execute:
            tracked = subprocess.check_output(['git', 'status', '--porcelain', '--', str(Path(__file__).resolve())], cwd=Path(__file__).parent, text=True)
            if tracked:
                raise ValueError('Commit runner before execution')
            immutable(args.output / 'runner-provenance.json', provenance)
        evidence = preflight(args, plan)
        event(args.output, event='preflight', promptLengthPasses=sum(x['promptLengthPass'] for x in evidence['rows']), candidateCount=plan['candidateCount'])
        if args.execute:
            tokens = {row['id']: row for row in evidence['rows']}
            for row in plan['candidates']:
                candidate(row, tokens[row['id']], args, plan)
            event(args.output, event='batch-complete', candidateCount=plan['candidateCount'])


if __name__ == '__main__':
    main()
