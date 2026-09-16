import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


class EvidenceExportTest(unittest.TestCase):
    def test_reexport_keeps_complete_deduplicated_asset_manifest(self):
        script = Path(__file__).resolve().parents[1] / 'reliability/export-evidence.py'
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            data, output = root / 'data', root / 'export'
            (data / 'inspection').mkdir(parents=True)
            (data / 'candidates').mkdir()
            rows = [{'id': f'case-{n}', 'jobId': f'job-{n}', 'macStatus': 'ready',
                     'preparationStatus': 'ready', 'scales': []} for n in range(36)]
            (data / 'summary.json').write_text(json.dumps({'complete': True, 'studyId': 'test', 'rows': rows}))
            scene, colors = root / 'scene.json', root / 'colors.json'
            scene.write_text('{"scene":1}')
            colors.write_text('{"colors":2}')
            cases = [{'id': f'case-{n}', 'worldId': 'world',
                      'files': {'scene': str(scene), 'colors': str(colors)}} for n in range(2)]
            (data / 'inspection/index.json').write_text(json.dumps(cases))
            manifests = []
            for _ in range(2):
                subprocess.run([sys.executable, str(script), '--data', str(data), '--output', str(output)],
                               check=True, capture_output=True)
                manifest = json.loads((output / 'export-manifest.json').read_text())['files']
                self.assertEqual(len({f['path'] for f in manifest}), len(manifest))
                assets = [f for f in manifest if f['path'].startswith('inspection-assets/')]
                self.assertEqual(len(assets), 2)
                for asset in assets:
                    self.assertEqual(hashlib.sha256((output / asset['path']).read_bytes()).hexdigest(), asset['sha256'])
                manifests.append(manifest)
            self.assertEqual(manifests[0], manifests[1])


if __name__ == '__main__':
    unittest.main()
