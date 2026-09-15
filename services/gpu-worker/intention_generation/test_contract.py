import copy
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
try:
    from .semantic import validate_request, image_prompt
    from .alpha import alpha_for_rgb, conditioning_image
except ImportError:
    from semantic import validate_request, image_prompt
    from alpha import alpha_for_rgb, conditioning_image


class ContractTests(unittest.TestCase):
    def setUp(self):
        self.intent = {'version': 1, 'kind': 'intention-destination', 'concept': 'suspended coral library',
            'axes': {'scale': 'vast', 'density': 'dense', 'mood': 'quiet', 'openness': 'open'}, 'representation': 'abstract-solid'}

    def request(self, intent=None):
        return {'id': 'contract-smoke', 'seed': 14, 'prompt': json.dumps(intent or self.intent)}

    def test_arbitrary_concept_and_axes_condition_image_prompt(self):
        a = image_prompt(validate_request(self.request()))
        other = copy.deepcopy(self.intent)
        other['concept'] = 'clockwork root system'
        other['axes']['openness'] = 'enclosed'
        b = image_prompt(validate_request(self.request(other)))
        self.assertIn('suspended coral library', a)
        self.assertIn('clockwork root system', b)
        self.assertIn('enclosed space', b)
        self.assertNotEqual(a, b)

    def test_rejects_untyped_raw_text_paths_and_unknown_axes(self):
        cases = [{'id': 'bad', 'seed': 14, 'prompt': 'make a place'},
            {**self.request(), 'fixture': 'arrival'}, {**self.request(), 'seed': True}]
        for mutate in [lambda x: x.update(modelPath='/tmp/a'), lambda x: x['axes'].update(openness='anything'),
                       lambda x: x.update(concept='x'*601), lambda x: x.update(version=True)]:
            invalid = copy.deepcopy(self.intent)
            mutate(invalid)
            cases.append(self.request(invalid))
        for request in cases:
            with self.subTest(request=request), self.assertRaises(ValueError):
                validate_request(request)

    def test_white_matte_preserves_material_and_removes_background_without_semantic_selection(self):
        self.assertEqual(alpha_for_rgb((250, 248, 238)), 0)
        self.assertEqual(alpha_for_rgb((247, 245, 239)), 0)
        self.assertEqual(alpha_for_rgb((208, 181, 152)), 255)
        self.assertEqual(alpha_for_rgb((255, 80, 120)), 255)
        self.assertEqual(alpha_for_rgb((30, 30, 30)), 255)
        self.assertTrue(0 < alpha_for_rgb((232, 230, 230)) < 255)

    @unittest.skipUnless(importlib.util.find_spec('PIL'), 'Pillow available in prepared worker environment')
    def test_full_frame_preserves_every_rgb_pixel_and_explicit_alpha_border(self):
        from PIL import Image
        original = Image.new('RGB', (8, 8), (20, 110, 40))
        conditioned, metrics = conditioning_image(original)
        self.assertEqual(metrics['conditioningMode'], 'unsegmented-full-frame')
        self.assertEqual(conditioned.crop((16, 16, 24, 24)).tobytes(), original.convert('RGBA').tobytes())
        self.assertEqual(conditioned.getpixel((0, 0))[3], 0)
        self.assertEqual(conditioned.getpixel((16, 16))[3], 255)

    @unittest.skipUnless(importlib.util.find_spec('PIL'), 'Pillow available in prepared worker environment')
    def test_white_background_matte_preserves_colored_material(self):
        from PIL import Image
        original = Image.new('RGB', (8, 8), (250, 248, 238))
        original.putpixel((4, 4), (150, 80, 40))
        conditioned, metrics = conditioning_image(original)
        self.assertEqual(metrics['conditioningMode'], 'white-matte')
        self.assertEqual(conditioned.getpixel((20, 20)), (150, 80, 40, 255))
        self.assertEqual(conditioned.getpixel((17, 17))[3], 0)

    def test_invalid_command_request_preserves_failure_without_gpu_import(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / 'request.json').write_text(json.dumps({'id': 'bad', 'seed': 14, 'prompt': 'raw text'}))
            command = [sys.executable, str(Path(__file__).parent / 'run.py'), '--request', str(root/'request.json'), '--output', str(root/'out')]
            for name in ['image-weights', 'trellis-python', 'trellis-root', 'weights-root', 'dinov2-root', 'dinov2-weights']:
                command += ['--'+name, str(root/'missing')]
            process = subprocess.run(command, capture_output=True, text=True)
            self.assertEqual(process.returncode, 1, process.stderr)
            report = json.loads((root/'out/generation-report.json').read_text())
            self.assertEqual(report['status'], 'failed')
            self.assertEqual(report['nvidiaExecution'], 'not_run')
            self.assertEqual(report['stage'], 'request')


if __name__ == '__main__':
    unittest.main()
