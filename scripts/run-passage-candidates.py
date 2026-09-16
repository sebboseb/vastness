#!/usr/bin/env python3
"""Declared three-scene batch through the existing intention API; no inference changes."""
import argparse
from datetime import datetime, timezone
import fcntl
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import time
import urllib.error
import urllib.request

WORKER_COMMIT = '04986defd1de38609cfb69c8d6c78ae4704e5670'
CANDIDATES = {
    'arch': 'A wide stone arch doorway with attached continuous flat stone floor through the opening. Empty human passage, clear headroom, no central object, no steps.',
    'tunnel': 'A wide short open-ended stone tunnel with a continuous flat floor through both openings. Empty human passage, clear headroom, no central object, no steps.',
    'courtyard': 'An open courtyard with surrounding stone walls, a broad empty doorway and a continuous flat floor through it. Clear human passage and headroom, no central object, no steps.',
}


def now():
    return datetime.now(timezone.utc).isoformat()


def save(path, value):
    temporary = path.with_suffix('.tmp')
    temporary.write_text(json.dumps(value, indent=2) + '\n')
    temporary.replace(path)


def request(url, value=None):
    req = urllib.request.Request(url, data=None if value is None else json.dumps(value).encode(),
                                 headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.load(response)


def candidate(name, args):
    out = args.output / name
    out.mkdir(parents=True, exist_ok=True)
    state_path = out / 'candidate.json'
    raw = {'text': CANDIDATES[name], 'source': 'text'}
    if state_path.exists():
        state = json.loads(state_path.read_text())
        if state['rawIntent'] != raw:
            raise ValueError('Saved candidate differs from declared batch; refusing replacement')
        if state.get('collected'):
            print(json.dumps({'event': 'reused', 'candidate': name, 'jobId': state['jobId']}), flush=True)
            return
    else:
        state = {'candidate': name, 'rawIntent': raw, 'declaredAt': now(), 'workerCommit': WORKER_COMMIT}
        save(state_path, state)
    version = request(args.worker_url + '/version')
    if version['gitCommit'] != WORKER_COMMIT:
        raise ValueError('Live worker differs from the declared pipeline')
    save(out / 'worker-version.json', version)
    if not state.get('worldId'):
        # Recover a response lost after POST without silently submitting a fourth job.
        worlds = request(args.api_url + '/api/intent/worlds')
        matches = [w for w in worlds if w['rawIntent'] == raw and w['createdAt'] >= state['declaredAt']]
        if len(matches) > 1:
            raise ValueError('Ambiguous previous submission; manual reconciliation required')
        world = matches[0] if matches else request(args.api_url + '/api/intent/worlds', raw)
        if world['request']['seed'] != 42 or world['rawIntent'] != raw:
            raise ValueError('Intention API changed seed or raw input')
        state.update(worldId=world['id'], jobId=world['jobId'], request=world['request'], semantics=world['semantics'])
        save(state_path, state)
        save(out / 'world-submitted.json', world)
        print(json.dumps({'event': 'submitted', 'candidate': name, 'worldId': world['id'], 'jobId': world['jobId'], 'semantics': world['semantics']}), flush=True)
    deadline = time.monotonic() + args.timeout
    while True:
        world = request(args.api_url + '/api/intent/worlds/' + state['worldId'])
        save(out / 'world.json', world)
        try:
            job = request(args.worker_url + '/jobs/' + state['jobId'])
        except urllib.error.HTTPError as error:
            if error.code != 404 or world['status'] == 'failed':
                raise
            job = {'status': 'awaiting-submission'}
        save(out / 'worker-job.json', job)
        if job['status'] in ['succeeded', 'failed', 'cancelled']:
            break
        if time.monotonic() >= deadline:
            raise TimeoutError('Polling deadline reached; saved IDs allow resumption without regeneration')
        time.sleep(3)
    collector = args.runtime_repo / 'services/gpu-worker/intention_generation/collect_evidence.py'
    subprocess.run([sys.executable, str(collector), '--job', state['jobId'], '--output', str(out), '--worker-url', args.worker_url], check=True)
    report = json.loads((out / 'generation-report.json').read_text())
    if report['vastnessGit']['stdout'] != WORKER_COMMIT or report['request'] != state['request']:
        raise ValueError('Generation provenance differs from the declared request/worker')
    for _ in range(20):
        world = request(args.api_url + '/api/intent/worlds/' + state['worldId'])
        if world['status'] in ['ready', 'failed']:
            break
        time.sleep(3)
    save(out / 'world.json', world)
    state.update(collected=True, gpuStatus=report['status'], macStatus=world['status'], finishedAt=now(),
                 generationSeconds=report.get('wallSeconds'), geometryAssessment='pending separate generated-support assessment')
    save(state_path, state)
    print(json.dumps({'event': 'collected', **state}), flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--execute', action='store_true', help='Submit/resume the declared batch; default only prints it')
    parser.add_argument('--candidate', choices=list(CANDIDATES))
    parser.add_argument('--output', type=Path, default=Path('.runtime/generated-passage/candidates'))
    parser.add_argument('--runtime-repo', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--api-url', default='http://127.0.0.1:4311')
    parser.add_argument('--worker-url', default='http://127.0.0.1:14321')
    parser.add_argument('--timeout', type=int, default=1800)
    args = parser.parse_args()
    plan = {'workerCommit': WORKER_COMMIT, 'seed': 42, 'candidates': CANDIDATES,
            'limit': 'Exactly these three requests; resumption reuses saved IDs, including failures.'}
    if not args.execute:
        print(json.dumps(plan, indent=2))
        return
    args.output = args.output.resolve()
    args.runtime_repo = args.runtime_repo.resolve()
    args.output.mkdir(parents=True, exist_ok=True)
    with (args.output / '.batch.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        plan_path = args.output / 'declared-batch.json'
        if plan_path.exists() and json.loads(plan_path.read_text()) != plan:
            raise ValueError('Existing batch differs; refusing to overwrite it')
        save(plan_path, plan)
        save(args.output / 'runner-provenance.json', {'capturedAt': now(),
             'runnerSha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
             'runnerGitCommit': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=Path(__file__).parent, text=True).strip(),
             'compilerSha256': hashlib.sha256((args.runtime_repo/'services/intention-prototype/semantics.ts').read_bytes()).hexdigest()})
        for name in [args.candidate] if args.candidate else CANDIDATES:
            candidate(name, args)


if __name__ == '__main__':
    main()
