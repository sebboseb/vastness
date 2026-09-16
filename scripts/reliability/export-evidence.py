#!/usr/bin/env python3
"""Export completed study measurements; retain heavy original artifacts in place."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--data', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    data, output = args.data.resolve(), args.output.resolve()
    summary = json.loads((data / 'summary.json').read_text())
    if not summary['complete'] or len(summary['rows']) != 36:
        raise SystemExit('Refusing to export an incomplete 36-candidate study')
    output.mkdir(parents=True, exist_ok=True)
    exported = []

    def copy(source, relative):
        if not source.exists():
            return
        target = output / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)
        exported.append({'path': str(relative), 'bytes': target.stat().st_size,
                         'sha256': hashlib.sha256(target.read_bytes()).hexdigest()})

    for source in data.iterdir():
        if source.is_file() and source.suffix in {'.json', '.jsonl', '.csv', '.js', '.log'}:
            copy(source, Path(source.name))
    for name in ['declared-batch.json', 'preflight.json', 'runner-provenance.json', 'events.jsonl']:
        copy(data / 'candidates' / name, Path(name))
    retained = []
    allowed = {'candidate.json', 'world.json', 'world-submitted.json', 'worker-job.json',
               'worker-version.json', 'generation-report.json', 'image-metrics.json',
               'trellis-metrics.json', 'diagnostic.json', 'assessment.json', 'token-preflight.json',
               'visual-review.json', 'browser.json', 'evidence-manifest.json',
               'remote-evidence-index.json', 'collector-result.json', 'image-prompt.txt',
               'request.json', 'worker-manifest.json', 'image.log', 'trellis.log',
               'gpu-memory.csv', 'source-rgb.png'}
    for row in summary['rows']:
        directory = data / 'candidates' / row['id']
        for name in sorted(allowed):
            copy(directory / name, Path('candidates') / row['id'] / name)
        for source in sorted((directory / 'browser').glob('*')):
            if source.is_file() and source.suffix in {'.json', '.png', '.txt'}:
                copy(source, Path('candidates') / row['id'] / 'browser' / source.name)
        report = json.loads((directory / 'generation-report.json').read_text()) if (directory / 'generation-report.json').exists() else {}
        retained.append({'candidate': row['id'], 'jobId': row['jobId'],
                         'localDirectory': str(directory),
                         'artifacts': report.get('artifacts', []),
                         'note': 'Original mesh, splat and conditioning files retained locally and on the GPU worker; not copied into Git.'})
    for source in sorted((data / 'inspection').glob('*.json')):
        copy(source, Path('inspection') / source.name)
    (output / 'retained-artifacts.json').write_text(json.dumps(retained, indent=2) + '\n')
    (output / 'export-manifest.json').write_text(json.dumps({'studyId': summary['studyId'],
        'sourceDirectory': str(data), 'files': exported}, indent=2) + '\n')
    print(json.dumps({'output': str(output), 'files': len(exported),
                      'bytes': sum(item['bytes'] for item in exported)}))


if __name__ == '__main__':
    main()
