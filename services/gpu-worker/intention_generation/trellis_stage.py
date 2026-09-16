#!/usr/bin/env python3
"""GPU-only child; run.py owns validation, logs, failures and process lifetime."""
import argparse
import json
import os
from pathlib import Path
import sys
import time


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    for flag in ['trellis-root', 'weights-root', 'dinov2-root', 'dinov2-weights', 'output', 'image']:
        parser.add_argument('--' + flag, required=True, type=Path)
    parser.add_argument('--seed', type=int, required=True)
    args = parser.parse_args()
    sys.path.insert(0, str(Path(__file__).resolve().parent.parent / 'benchmarks'))
    os.environ['ATTN_BACKEND'] = 'xformers'
    os.environ['SPCONV_ALGO'] = 'native'
    os.environ.setdefault('CUDA_VISIBLE_DEVICES', '0')
    os.environ['HF_HUB_OFFLINE'] = '1'
    os.environ['TRANSFORMERS_OFFLINE'] = '1'
    sys.path.insert(0, str(args.trellis_root))
    os.chdir(args.trellis_root)

    import numpy as np
    from PIL import Image
    from plyfile import PlyData
    import torch
    from torchvision import transforms
    import trimesh
    from trellis.pipelines import TrellisImageTo3DPipeline

    if not torch.cuda.is_available():
        raise RuntimeError('PyTorch cannot execute on CUDA')
    if torch.cuda.device_count() != 1:
        raise RuntimeError('Set CUDA_VISIBLE_DEVICES to exactly one GPU for this benchmark')
    pins = json.loads((Path(__file__).parent.parent / 'benchmarks/pins.json').read_text())
    image = Image.open(args.image)
    if image.mode != 'RGBA' or not np.any(np.asarray(image)[..., 3] < 255):
        raise ValueError('Generated source image must already contain alpha; remote downloads forbidden')

    def local_encoder(self, name):
        if name != pins['dinov2Weights']['name']:
            raise ValueError('Unexpected image encoder')
        model = torch.hub.load(str(args.dinov2_root), name, source='local', pretrained=False)
        model.load_state_dict(torch.load(args.dinov2_weights, map_location='cpu', weights_only=True))
        self.models['image_cond_model'] = model.eval()
        self.image_cond_model_transform = transforms.Compose([
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

    # Static upstream factory creates its concrete class; subclassing is insufficient.
    TrellisImageTo3DPipeline._init_image_cond_model = local_encoder
    torch.cuda.synchronize()
    torch.cuda.reset_peak_memory_stats()
    started = time.perf_counter()
    pipeline = TrellisImageTo3DPipeline.from_pretrained(str(args.weights_root))
    pipeline.cuda()
    torch.cuda.synchronize()
    loaded = time.perf_counter()
    outputs = pipeline.run(image, seed=args.seed, formats=['gaussian', 'mesh'],
                           sparse_structure_sampler_params={'steps': 12, 'cfg_strength': 7.5},
                           slat_sampler_params={'steps': 12, 'cfg_strength': 3.0})
    torch.cuda.synchronize()
    generated = time.perf_counter()
    rotation = np.array([[1, 0, 0], [0, 0, 1], [0, -1, 0]], dtype=np.float32)
    staging = args.output / 'staging'
    staging.mkdir(exist_ok=False)
    from gaussian_export import save_gaussian_ply
    save_gaussian_ply(outputs['gaussian'][0], staging / 'scene.ply', rotation)
    mesh = outputs['mesh'][0]
    vertices = mesh.vertices.detach().cpu().numpy() @ rotation.T
    faces = mesh.faces.detach().cpu().numpy()
    if len(vertices) == 0 or len(faces) == 0 or not np.isfinite(vertices).all():
        raise ValueError('Decoded mesh is empty or nonfinite')
    if faces.min() < 0 or faces.max() >= len(vertices):
        raise ValueError('Decoded mesh has invalid vertex indices')
    trimesh.Trimesh(vertices=vertices, faces=faces, process=False).export(staging / 'collider.glb')
    # Round-trip both exports before exposing files to the adapter.
    saved = PlyData.read(str(staging / 'scene.ply'))['vertex'].data
    required = ['x', 'y', 'z', 'opacity'] + [f'{prefix}_{i}' for prefix, count in
               [('f_dc', 3), ('scale', 3), ('rot', 4)] for i in range(count)]
    if len(saved) == 0 or any(name not in saved.dtype.names for name in required):
        raise ValueError('PLY export lacks nonempty Gaussian attributes')
    if any(not np.isfinite(saved[name]).all() for name in required):
        raise ValueError('PLY contains nonfinite Gaussian attributes')
    roundtrip = trimesh.load(staging / 'collider.glb', force='mesh', process=False)
    if len(roundtrip.faces) == 0 or not np.isfinite(roundtrip.vertices).all():
        raise ValueError('GLB failed geometry round-trip')
    torch.cuda.synchronize()
    finished = time.perf_counter()
    metrics = {'loadSeconds': loaded - started, 'generationSeconds': generated - loaded,
               'exportAndValidationSeconds': finished - generated, 'totalSeconds': finished - started,
               'torchPeakAllocatedBytes': torch.cuda.max_memory_allocated(),
               'torchPeakReservedBytes': torch.cuda.max_memory_reserved(),
               'torchVersion': torch.__version__, 'torchCudaVersion': torch.version.cuda,
               'gpuName': torch.cuda.get_device_name(),
               'computeCapability': list(torch.cuda.get_device_capability()),
               'gaussianCount': len(saved), 'meshVertexCount': len(vertices), 'meshTriangleCount': len(faces),
               'meshBounds': [vertices.min(axis=0).tolist(), vertices.max(axis=0).tolist()],
               'sourceToOutputRotation': rotation.tolist(), 'scaleMetres': None,
               'collisionAssessment': 'unassessed_raw_mesh_proxy'}
    (args.output / 'trellis-metrics.json').write_text(json.dumps(metrics, indent=2) + '\n')
    for name in ['scene.ply', 'collider.glb']:
        (staging / name).replace(args.output / name)
    staging.rmdir()
    print(json.dumps(metrics, indent=2), flush=True)


if __name__ == '__main__':
    main()
