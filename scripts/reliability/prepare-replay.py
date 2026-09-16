#!/usr/bin/env python3
"""Freeze a completed baseline and reuse its exact artifacts for numerical replay."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
import subprocess


def digest(path):
    h = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--baseline', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--replay-code', type=Path, required=True)
    args = parser.parse_args()
    baseline, output, code = args.baseline.resolve(), args.output.resolve(), args.replay_code.resolve()
    if baseline == output or baseline in output.parents:
        raise SystemExit('Replay must be outside the baseline directory')
    summary = json.loads((baseline / 'summary.json').read_text())
    if not summary['complete'] or len(summary['rows']) != 36:
        raise SystemExit('Complete all baseline generation/assessment/browser trials first')
    records = []
    inputs = ['candidate.json', 'world.json', 'world-submitted.json', 'request.json',
              'generation-report.json', 'worker-job.json', 'worker-version.json',
              'worker-manifest.json', 'token-preflight.json', 'image-metrics.json',
              'trellis-metrics.json', 'gpu-memory.csv', 'image.log', 'trellis.log',
              'image-prompt.txt', 'remote-evidence-index.json', 'evidence-manifest.json']
    for row in summary['rows']:
        source, target = baseline / 'candidates' / row['id'], output / 'candidates' / row['id']
        target.mkdir(parents=True, exist_ok=True)
        report = json.loads((source / 'generation-report.json').read_text()) if (source / 'generation-report.json').exists() else {}
        for artifact in report.get('artifacts', []):
            name = artifact['path']
            if Path(name).name != name:
                raise ValueError('Unexpected artifact path')
            original = source / name
            if original.stat().st_size != artifact['bytes'] or digest(original) != artifact['sha256']:
                raise ValueError('Baseline artifact identity changed: ' + str(original))
            link = target / name
            if link.is_symlink():
                if link.resolve() != original:
                    raise ValueError('Existing replay link points elsewhere')
            elif link.exists():
                if digest(link) != artifact['sha256']:
                    raise ValueError('Existing replay artifact changed')
            else:
                link.symlink_to(original)
        for name in inputs:
            original, destination = source / name, target / name
            if not original.exists():
                continue
            if destination.exists():
                if digest(destination) != digest(original):
                    raise ValueError('Existing replay input changed: ' + str(destination))
            else:
                shutil.copyfile(original, destination)
        records.append({'candidate': row['id'], 'jobId': row['jobId'], 'artifacts': report.get('artifacts', [])})
    provenance = {'baselineDirectory': str(baseline), 'baselineSummarySha256': digest(baseline / 'summary.json'),
                  'replayCodeCommit': subprocess.check_output(['git', '-C', str(code), 'rev-parse', 'HEAD'], text=True).strip(),
                  'navigatorSha256': digest(code / 'apps/web/src/generated-passage/navigation.ts'),
                  'assessorSha256': digest(code / 'scripts/passage-geometry.ts'),
                  'newGpuJobs': 0, 'geometryEdits': 0, 'candidates': records}
    path = output / 'baseline-reference.json'
    if path.exists() and json.loads(path.read_text()) != provenance:
        raise ValueError('Replay provenance already declared differently')
    path.write_text(json.dumps(provenance, indent=2) + '\n')
    print(json.dumps({'prepared': len(records), 'data': str(output), 'newGpuJobs': 0}))


if __name__ == '__main__':
    main()
