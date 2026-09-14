"""Opt-in regression against the real pinned TRELLIS exporter on the appliance."""
import os
from pathlib import Path
import sys
import subprocess
import tempfile
import unittest

from .gaussian_export import save_gaussian_ply


@unittest.skipUnless(os.environ.get('VASTNESS_TEST_TRELLIS_ROOT'), 'Requires the prepared NVIDIA TRELLIS environment')
class GaussianExportTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        from .run import PINS
        root = os.environ['VASTNESS_TEST_TRELLIS_ROOT']
        revision = subprocess.check_output(['git', '-C', root, 'rev-parse', 'HEAD'], text=True).strip()
        if revision != PINS['source']['revision']:
            raise RuntimeError('Regression requires the pinned TRELLIS source revision')
        sys.path.insert(0, root)
        import numpy as np
        import torch
        from plyfile import PlyData
        from trellis.representations.gaussian.gaussian_model import Gaussian
        cls.np, cls.torch, cls.PlyData, cls.Gaussian = np, torch, PlyData, Gaussian
        if not torch.cuda.is_available():
            raise RuntimeError('Explicit appliance regression requires working CUDA')

    def gaussian(self, logits):
        t = self.torch
        g = self.Gaussian([-.5, -.5, -.5, 1, 1, 1], opacity_bias=.5)
        n = len(logits)
        g._xyz = t.zeros((n, 3), device='cuda')
        g._features_dc = t.zeros((n, 3, 1), device='cuda')
        g._scaling = t.zeros((n, 3), device='cuda')
        g._rotation = t.zeros((n, 4), device='cuda')
        g._opacity = t.tensor(logits, device='cuda', dtype=t.float32).reshape(-1, 1)
        return g

    def test_saturated_opacity_preserves_finite_logits_and_other_attributes(self):
        g = self.gaussian([100., -100., 20., 0.])
        rotation = [[1, 0, 0], [0, 0, 1], [0, -1, 0]]
        with tempfile.TemporaryDirectory() as directory:
            raw, fixed = Path(directory) / 'upstream.ply', Path(directory) / 'worker.ply'
            g.save_ply(str(raw), transform=rotation)
            before = self.PlyData.read(raw, mmap=False)['vertex'].data
            self.assertFalse(self.np.isfinite(before['opacity']).all(), 'Fixture must reproduce upstream saturation')
            save_gaussian_ply(g, fixed, rotation)
            after = self.PlyData.read(fixed, mmap=False)['vertex'].data
            self.assertTrue(all(self.np.isfinite(after[n]).all() for n in after.dtype.names))
            self.np.testing.assert_array_equal(after['opacity'], [100., -100., 20., 0.])
            for name in after.dtype.names:
                if name != 'opacity':
                    self.np.testing.assert_array_equal(after[name], before[name])

    def test_nonfinite_model_logits_are_rejected_without_clipping(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'rejected.ply'
            with self.assertRaisesRegex(ValueError, 'nonfinite opacity logits'):
                save_gaussian_ply(self.gaussian([float('inf')]), path, None)
            self.assertFalse(path.exists())
