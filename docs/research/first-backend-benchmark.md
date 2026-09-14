# First real backend benchmark preparation

Prepared on the Mac, 2026-09-14. **Status: not run.** No PC connection, CUDA installation, model-weight download, GPU measurement, generated artifact, or browser acceptance of generated content is claimed. Hardware and connectivity remain as recorded in [gpu-connectivity.md](gpu-connectivity.md).

## Experiment decision

Benchmark **original Microsoft TRELLIS, image-large**, first: one pinned upstream input image, one seed, one Gaussian PLY, and one independently exported geometry GLB. This tests the appliance's ability to generate explicit 3D and the cost of producing the two artifact kinds required by [ADR 0001](../adr/0001-spatial-artifact-boundary.md). It is an asset-scale experiment, not selection of the final world generator. A successful asset does not demonstrate a walkable room, text conditioning, boundary conditioning, or coherent adjacent chunks.

Original TRELLIS is included alongside the three candidates named in the brief because its documented output formats match this experiment more closely. The preference is an inference from published interfaces and requirements, not measured superiority.

| Candidate | Published fit and output | First-benchmark decision |
| --- | --- | --- |
| Original TRELLIS image-large | Linux; published minimum 16 GB NVIDIA memory; verified upstream on A100/A6000. Gaussian PLY and mesh export are available. | First candidate: lower stated memory boundary and both required representations. Consumer hardware success remains unmeasured. [README](https://github.com/microsoft/TRELLIS/blob/442aa1e1afb9014e80681d3bf604e8d728a86ee7/README.md), [example](https://github.com/microsoft/TRELLIS/blob/442aa1e1afb9014e80681d3bf604e8d728a86ee7/example.py). |
| TRELLIS.2 4B | Linux; published minimum 24 GB NVIDIA memory, upstream verification on A100/H100. PBR mesh GLB; its minimal example does not produce Gaussian PLY. Published approximately 3/17/60-second generation at 512/1024/1536 resolution was on H100. | Second geometry experiment at 512 resolution. A 24 GB card is at its stated boundary. H100 timing is not a prediction for this PC. Needs a separate splat-production stage before satisfying the current visual contract. [README](https://github.com/microsoft/TRELLIS.2/blob/75fbf0183001ed9876c8dbb35de6b68552ee08bd/README.md). |
| HunyuanWorld-1.0-lite | The official 1.0 repository adds FP8 GEMM/attention flags and announces consumer GPU support including 4090. Its scene demo writes layered triangle-mesh PLY, optionally Draco; a `.ply` extension does not make it a Gaussian splat. | Practical Hunyuan generation variant to compare, but not the default execution target: license territory excludes EU/UK/South Korea. No numerical peak-memory claim is substituted for measurement. [README](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0/blob/57fa9f3a79eae1079c279968cdb9d82c75fa7c86/README.md), [scene exporter](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0/blob/57fa9f3a79eae1079c279968cdb9d82c75fa7c86/demo_scenegen.py), [license](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0/blob/57fa9f3a79eae1079c279968cdb9d82c75fa7c86/LICENSE). |
| WorldGrow | Released block-growth inference and checkpoints; example exports mesh GLB and Gaussian PLY. Requires modified `cumm`/`spconv`. README still labels its license TBD. | Strong conceptual world-growth fit, deferred until license and an actual 24 GB experiment are resolved. TRELLIS ancestry does not prove the same memory requirement. [README](https://github.com/world-grow/WorldGrow/blob/1f2ac49c30fd1390a810a201019ed26c02487883/README.md), [example](https://github.com/world-grow/WorldGrow/blob/1f2ac49c30fd1390a810a201019ed26c02487883/example_world_grow.py). |

HunyuanWorld-Mirror is a reconstruction option, accepting images and predicting geometry/cameras/3DGS; it does not replace the missing image-generation input stage. Its own license has the same territory exclusion. The newer HY-World-2.0 repository distinguishes reconstruction from a larger generation pipeline and recommends making reconstruction work first; newer naming alone is not evidence of better fit on this PC. [Mirror inference](https://github.com/Tencent-Hunyuan/HunyuanWorld-Mirror/blob/c61300e47ce06db2f02c8e2551aae68be7ae3a0b/README.md), [Mirror license](https://github.com/Tencent-Hunyuan/HunyuanWorld-Mirror/blob/c61300e47ce06db2f02c8e2551aae68be7ae3a0b/License.txt), [HY-World-2.0](https://github.com/Tencent-Hunyuan/HY-World-2.0).

## Pinned upstream identities

These revisions were read through GitHub commit APIs and Hugging Face model APIs on the preparation date. Model APIs returned public, ungated metadata for these repositories; this does not establish that every transitive model is accessible or licensed identically.

| Repository | Code commit | Model repository and revision |
| --- | --- | --- |
| `microsoft/TRELLIS` | `442aa1e1afb9014e80681d3bf604e8d728a86ee7` | `microsoft/TRELLIS-image-large` at `25e0d31ffbebe4b5a97464dd851910efc3002d96` |
| `microsoft/TRELLIS.2` | `75fbf0183001ed9876c8dbb35de6b68552ee08bd` | `microsoft/TRELLIS.2-4B` at `af44b45f2e35a493886929c6d786e563ec68364d` |
| `Tencent-Hunyuan/HunyuanWorld-1.0` | `57fa9f3a79eae1079c279968cdb9d82c75fa7c86` | `tencent/HunyuanWorld-1` at `43c47e7c5d7e5c6ac0f8410cb1df31a4af815d88` |
| `Tencent-Hunyuan/HunyuanWorld-Mirror` | `c61300e47ce06db2f02c8e2551aae68be7ae3a0b` | `tencent/HunyuanWorld-Mirror` at `5574b7b0d5ac9d80e8a92976222370a0d20a57a0` |
| `world-grow/WorldGrow` | `1f2ac49c30fd1390a810a201019ed26c02487883` | `UranusITS/WorldGrow` at `b6e0ccf34ed56878cefd56817cc1b9985f4c25de` |

The TRELLIS and TRELLIS.2 model cards declare MIT. WorldGrow's card has no license declaration. Tencent uses named community agreements rather than MIT. Preserve actual license files with the future environment; the top-level license does not replace dependency terms. [TRELLIS card](https://huggingface.co/microsoft/TRELLIS-image-large/tree/25e0d31ffbebe4b5a97464dd851910efc3002d96), [TRELLIS.2 card](https://huggingface.co/microsoft/TRELLIS.2-4B/tree/af44b45f2e35a493886929c6d786e563ec68364d), [Hunyuan card](https://huggingface.co/tencent/HunyuanWorld-1/tree/43c47e7c5d7e5c6ac0f8410cb1df31a4af815d88), [WorldGrow card](https://huggingface.co/UranusITS/WorldGrow/tree/b6e0ccf34ed56878cefd56817cc1b9985f4c25de).

The selected input is upstream `assets/example_image/T.png` at the TRELLIS code commit above: 954,642 bytes, SHA-256 `e29ddc83a5bd3a05fe9b34732169bc4ea7131f7c36527fdc5f626a90a73076d2`. The file was fetched into memory solely to compute this identity and inspect its PNG metadata; it is RGBA. It is shipped in the MIT-licensed repository; no separate image-specific license or authorship notice was found. Keep it as an upstream research input, with attribution, rather than assert any independently verified authorship. [Input](https://github.com/microsoft/TRELLIS/blob/442aa1e1afb9014e80681d3bf604e8d728a86ee7/assets/example_image/T.png), [repository license](https://github.com/microsoft/TRELLIS/blob/442aa1e1afb9014e80681d3bf604e8d728a86ee7/LICENSE).

TRELLIS additionally loads DINOv2 `dinov2_vitl14_reg` / LVD142M. Pin its code to `facebookresearch/dinov2@7b187bd4df8efce2cbcbbb67bd01532c19bf4c9c`. Its weight URL is `https://dl.fbaipublicfiles.com/dinov2/dinov2_vitl14/dinov2_vitl14_reg4_pretrain.pth`; record the downloaded file's SHA-256 on the PC, since no hash is claimed here. DINOv2 code uses Apache-2.0. [DINO loader](https://github.com/facebookresearch/dinov2/blob/7b187bd4df8efce2cbcbbb67bd01532c19bf4c9c/dinov2/hub/backbones.py), [license](https://github.com/facebookresearch/dinov2/blob/7b187bd4df8efce2cbcbbb67bd01532c19bf4c9c/LICENSE).

This DINO pin deliberately precedes `7764ea0f912e53c92e82eb78a2a1631e92725fc8`, whose loader compares `torch.__version__` against a tuple. Source inspection suggests a compatibility failure with supported Torch versions; it has not been reproduced here. Using a local checkout also avoids executing a moving torch.hub branch. [Changed helper](https://github.com/facebookresearch/dinov2/blob/7764ea0f912e53c92e82eb78a2a1631e92725fc8/dinov2/hub/utils.py).

## Future Linux preparation commands — not executed

Run only after a read-only PC inventory records GPU model, compute capability, total/free VRAM, driver, OS, RAM, free disk, and `nvcc --version`. One heavy job at a time. A supported NVIDIA GPU and a matching CUDA development toolchain are prerequisites, not properties established by the Mac.

Use a disposable benchmark directory, outside accepted artifacts. The recipe below specifies Python 3.10 / PyTorch 2.4.0 / CUDA 12.1 to match the CUDA 12.1 Kaolin wheel route in this pinned setup script. This is a proposed consistent installation combination, **not an upstream-tested or locally validated environment**: upstream documentation reports testing CUDA 11.8/12.2 and defaults to Torch 2.4.0/cu118, while this script selects a cu121 Kaolin index for Torch 2.4.0. That mismatch is why blindly claiming the default installer is proven would be misleading. Exact driver/toolkit compatibility must be resolved from inventory. [Pinned setup script](https://github.com/microsoft/TRELLIS/blob/442aa1e1afb9014e80681d3bf604e8d728a86ee7/setup.sh).

```bash
# On the Linux GPU appliance, in a new empty benchmark directory.
git clone https://github.com/microsoft/TRELLIS.git
git -C TRELLIS checkout --detach 442aa1e1afb9014e80681d3bf604e8d728a86ee7
git -C TRELLIS submodule update --init --recursive
git clone https://github.com/facebookresearch/dinov2.git
git -C dinov2 checkout --detach 7b187bd4df8efce2cbcbbb67bd01532c19bf4c9c

conda create -y -n vastness-trellis-bench python=3.10
conda activate vastness-trellis-bench
python -m pip install torch==2.4.0 torchvision==0.19.0 --index-url https://download.pytorch.org/whl/cu121
export CUDA_HOME=/usr/local/cuda-12.1
export PATH="$CUDA_HOME/bin:$PATH"
export ATTN_BACKEND=xformers
export SPCONV_ALGO=native
cd TRELLIS
# This script has some unpinned transitive dependencies; capture resolved versions.
# xformers avoids requiring the moving flash-attn package for this first run.
source ./setup.sh --basic --xformers --diffoctreerast --spconv --mipgaussian --kaolin --nvdiffrast
python -m pip install huggingface_hub plyfile
python -m pip check
python -m pip freeze > ../environment-pip-freeze.txt
conda list --explicit > ../environment-conda-explicit.txt
git submodule status --recursive > ../submodules.txt
python - <<'PY'
from huggingface_hub import snapshot_download
snapshot_download(
    'microsoft/TRELLIS-image-large',
    revision='25e0d31ffbebe4b5a97464dd851910efc3002d96',
    local_dir='../weights/trellis-image-large',
)
PY
```

If any install/import step fails, preserve its command, full error, resolved environment and exit code; classify the run as setup failure. Do not change CUDA/PyTorch/model revision silently or count a reduced-output workaround as success. The upstream script clones additional repositories under `/tmp/extensions` and does not fully lock dependencies: record their commits and installed package versions. A complete tested dependency lock remains an execution deliverable, not a result of this research.

The installed TRELLIS pipeline imports rendering/mesh modules beyond the two output formats requested. Its modified FlexiCubes, rasterizers and Kaolin retain their respective terms. [TRELLIS imports](https://github.com/microsoft/TRELLIS/blob/442aa1e1afb9014e80681d3bf604e8d728a86ee7/trellis/models/__init__.py), [FlexiCubes submodule](https://github.com/microsoft/TRELLIS/blob/442aa1e1afb9014e80681d3bf604e8d728a86ee7/.gitmodules).

## Future inference smoke recipe

Save this as `smoke.py` in the pinned TRELLIS checkout and invoke `python smoke.py` from that directory. The process writes to a fresh `../run-seed-1` directory and refuses to overwrite an earlier run. This recipe is source-reviewed only. Imports, model loading, generation and export must be verified on NVIDIA Linux.

```python
import hashlib
import json
import os
from pathlib import Path
import time

os.environ['ATTN_BACKEND'] = 'xformers'
os.environ['SPCONV_ALGO'] = 'native'
import numpy as np
from PIL import Image
import torch
from torchvision import transforms
import trimesh
from trellis.pipelines import TrellisImageTo3DPipeline

out = Path('../run-seed-1')
out.mkdir(exist_ok=False)
image_path = Path('assets/example_image/T.png')
assert hashlib.sha256(image_path.read_bytes()).hexdigest() == (
    'e29ddc83a5bd3a05fe9b34732169bc4ea7131f7c36527fdc5f626a90a73076d2'
)
image = Image.open(image_path)
# Fail instead of silently downloading an unpinned background-removal model.
assert image.mode == 'RGBA' and np.any(np.asarray(image)[..., 3] < 255)

class PinnedPipeline(TrellisImageTo3DPipeline):
    def _init_image_cond_model(self, name):
        assert name == 'dinov2_vitl14_reg'
        model = torch.hub.load(
            str(Path('../dinov2').resolve()), name,
            source='local', pretrained=True,
        )
        self.models['image_cond_model'] = model.eval()
        self.image_cond_model_transform = transforms.Compose([
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
            )
        ])

# Upstream's static factory constructs its concrete class, so a subclass alone
# does not override the encoder hook. Replace that one hook for this process.
TrellisImageTo3DPipeline._init_image_cond_model = PinnedPipeline._init_image_cond_model
torch.cuda.synchronize()
torch.cuda.reset_peak_memory_stats()
started = time.perf_counter()
pipeline = TrellisImageTo3DPipeline.from_pretrained('../weights/trellis-image-large')
pipeline.cuda()
torch.cuda.synchronize()
loaded = time.perf_counter()
outputs = pipeline.run(
    image, seed=1, formats=['gaussian', 'mesh'],
    sparse_structure_sampler_params={'steps': 12, 'cfg_strength': 7.5},
    slat_sampler_params={'steps': 12, 'cfg_strength': 3.0},
)
torch.cuda.synchronize()
generated = time.perf_counter()

# Column-vector transform (x,y,z) -> (x,z,-y); apply identically to both.
rotation = np.array([[1, 0, 0], [0, 0, 1], [0, -1, 0]], dtype=np.float32)
outputs['gaussian'][0].save_ply(str(out / 'scene.ply'), transform=rotation)
mesh = outputs['mesh'][0]
vertices = mesh.vertices.detach().cpu().numpy() @ rotation.T
faces = mesh.faces.detach().cpu().numpy()
assert len(vertices) > 0 and len(faces) > 0 and np.isfinite(vertices).all()
trimesh.Trimesh(vertices=vertices, faces=faces, process=False).export(out / 'collider.glb')
torch.cuda.synchronize()
finished = time.perf_counter()
(out / 'metrics.json').write_text(json.dumps({
    'seed': 1,
    'load_seconds': loaded - started,
    'generation_seconds': generated - loaded,
    'export_seconds': finished - generated,
    'total_seconds': finished - started,
    'torch_peak_allocated_bytes': torch.cuda.max_memory_allocated(),
    'torch_peak_reserved_bytes': torch.cuda.max_memory_reserved(),
    'torch_version': torch.__version__,
    'torch_cuda': torch.version.cuda,
    'gpu_name': torch.cuda.get_device_name(),
    'mesh_vertex_count': len(vertices),
    'mesh_triangle_count': len(faces),
    'sha256': {
        name: hashlib.sha256((out / name).read_bytes()).hexdigest()
        for name in ['scene.ply', 'collider.glb']
    },
}, indent=2) + '\n')
```

Model download and DINO first-load download are setup costs; for a reported generation benchmark, prewarm/cache them and hash the checkpoint files before recording the run. Capture a first cold process and a second process with cached downloads separately, each in a fresh directory. Seed stability does not promise byte-identical outputs across driver/library/GPU changes.

The above export deliberately uses raw decoded mesh geometry as a **candidate collision artifact**, avoiding texture baking and mesh-cleanup costs. It does not establish watertightness, floor coverage, walkability or metre scale. It is not the upstream textured GLB path and must be identified that way in the result. The Gaussian and mesh coordinate transform is explicit because upstream `save_ply` multiplies row positions by `transform.T`, while `to_glb` multiplies by a fixed matrix without transposing. [Gaussian exporter](https://github.com/microsoft/TRELLIS/blob/442aa1e1afb9014e80681d3bf604e8d728a86ee7/trellis/representations/gaussian/gaussian_model.py), [textured GLB exporter](https://github.com/microsoft/TRELLIS/blob/442aa1e1afb9014e80681d3bf604e8d728a86ee7/trellis/utils/postprocessing_utils.py), [pipeline parameters](https://github.com/microsoft/TRELLIS/blob/442aa1e1afb9014e80681d3bf604e8d728a86ee7/trellis/pipelines/trellis_image_to_3d.py).

## Required measurements and artifact inspection

- Store code/model/input identities, sampler settings, all environment versions, command, start/end time, exit code and full stdout/stderr, including failed runs.
- Sample `nvidia-smi` device memory during the whole process; record polling interval and baseline. Its sampled maximum can miss brief peaks and includes other processes. Store Torch allocated/reserved peaks separately: neither is an interchangeable whole-device VRAM measurement. Never fill absent measurements with zero.
- Check PLY Gaussian properties (`x/y/z`, `f_dc_*`, `opacity`, `scale_*`, `rot_*`), nonzero count, finite values, readable GLB geometry, sizes, bounds and hashes. A triangle-mesh PLY or empty file is failure for the splat output requirement.
- Inspect a fixed camera orbit from multiple sides and an overlay of mesh and splat using the same transform. Capture representative views and record holes, floaters, size/orientation mismatch and decimation needs. No camera video alone counts as explicit 3D output.
- Import only into a disposable benchmark viewer/world. Keep fixture collision for the known walkable world until generated collision is explicitly accepted. One asset's mesh AABB can block its entire bounding volume in the present M0 physics implementation; it cannot prove arbitrary triangle-mesh collision.

## Runner integration gaps and next ticket

The research smoke case needs a fixed image input even though production requests currently carry prompt/seed/boundary data. Keep benchmark image selection in the backend configuration or benchmark command. Report that prompt and boundary are unused for this case. Do not claim prompt generation from a fixture/reference image.

The future command adapter must run in its pinned environment/working directory, map a unique job output directory to `scene.ply` and `collider.glb`, retain logs, terminate the process group on cancellation/timeouts, validate actual file contents, and report source provenance. A successful subprocess is insufficient if either artifact is absent/invalid. Publish generated candidates via the existing worker manifest only after checks; no upstream classes or CUDA configuration belong in the product protocol.

Suggested ticket: **Run and record one pinned TRELLIS image-to-3D benchmark on the 24 GB appliance.** Blocked by verified PC access and inventory, not by further architecture design. Acceptance:

1. Deploy the Vastness runner from a Git commit and record that revision; execute the pinned smoke case with only one heavy job active.
2. Record setup success/failure honestly, and preserve any OOM/build/import/export failure as a result with logs. Do not describe a failed run as backend acceptance.
3. On success, retain real Gaussian PLY and geometry GLB, validate/hash both, measure runtime and memory using the distinct methods above, and record representative multi-view inspection.
4. Exercise the worker command path through an actual HTTP job and verify the downloaded artifact hashes. Report cancellation and unsupported prompt/boundary behavior.
5. Decide the next experiment from measured results. A room-generation/backend-selection ticket remains separate.

Fallback order: preserve a TRELLIS setup/OOM failure, then try a separately recorded environment fix or smaller decoding case without redefining the first success criteria. TRELLIS.2 at 512 is a later geometry-only comparison, with missing Gaussian output recorded explicitly. WorldGrow requires a clarified upstream license before a runnable trial; HunyuanWorld-1.0/Mirror are not default runnable fallbacks under the observed territory terms. While hardware or licensing is unavailable, keep deterministic fixtures available for product development, clearly labeled as fixtures. No fallback is counted as real GPU validation.
