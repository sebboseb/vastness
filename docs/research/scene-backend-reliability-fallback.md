# Scene-backend fallback feasibility and prospective benchmark

Researched 2026-09-16 against the exact revisions below. **Research only: no alternative model weights downloaded, environment installed, remote files modified, or GPU inference attempted.** This does not supersede the running 36-job TRELLIS reliability study or count as its fallback benchmark. Assessment contract: [generated-space-reliability.md](../specs/generated-space-reliability.md).

## Decision prepared for the continuation gate

If primary success is below 80%, any category has fewer than 2/4 successes, or topology failures reach 20%, retain the failed baseline and apply the same original-floor, body-clearance, reversible ≥3 m route, ≥1 m enclosure, safe entry and browser-return criteria to alternatives. No procedural floor, repaired opening, reconstruction-only demo, image/video, or Gaussian-only artifact counts as a replacement success.

| Candidate | Scene-generation fit | RTX 3090 / 24 GB disposition | Current execution blocker |
| --- | --- | --- | --- |
| WorldGrow | Generates spatial blocks and both mesh/3DGS. Strongest bounded geometry fallback, but released training uses a fixed generic house prompt; arbitrary intent fidelity is unproven. | Plausible, unvalidated: paper reports 13 GB peak on A100 for 10×10; start with 1×1. Modified sparse-convolution builds and raw export are required. | Repository still says license TBD; model metadata supplies no license. Permission for use/distribution remains unresolved. |
| HunyuanWorld 1.0 / lite | Text → panorama → layered scene meshes; genuine generation, no native Gaussian export in scene demo. | Conditional engineering candidate, not demonstrated on 3090. BF16 + CPU offload exists; FP8 flags are not proof of fit. | Its community agreement excludes EU/UK/South Korea; FLUX base models also require gated access and their own license. |
| HY-World 2.0 | Full panorama → trajectory → generated views → 3DGS/mesh pipeline. WorldMirror alone is reconstruction and does not qualify. | Full default pipeline is unsuitable for this single card: ≥4 GPUs recommended, tested on 8×H20. A single-GPU training knob does not make preceding generation stages fit. | Same explicit territorial exclusion, SAM3 manual gate, and no validated single-3090 generation configuration. |

Sources: [WorldGrow paper §5.1](https://arxiv.org/html/2510.21682v1), [WorldGrow README/license](https://github.com/world-grow/WorldGrow/blob/1f2ac49c30fd1390a810a201019ed26c02487883/README.md), [Hunyuan 1.0 scene demo](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0/blob/57fa9f3a79eae1079c279968cdb9d82c75fa7c86/demo_scenegen.py), [HY2 world-generation instructions](https://github.com/Tencent-Hunyuan/HY-World-2.0/blob/df9988efb87bfc0f4947eb3889411cf957478b06/hyworld2/worldgen/README.md).

## License and access findings

WorldGrow's published repository has no finalized top-level grant: its License section is literally “TBD (to be finalized before full code release).” `UranusITS/WorldGrow` is ungated but lacks a license declaration. Public download availability is not a license. This report does not infer MIT from its TRELLIS ancestry, nor infer permission to redistribute weights/results from the gallery. Obtain an explicit applicable upstream license or permission before making a runnable/distributable WorldGrow trial; that unresolved scope is recorded separately from technical feasibility. No message to maintainers has been sent. [Pinned README](https://github.com/world-grow/WorldGrow/blob/1f2ac49c30fd1390a810a201019ed26c02487883/README.md#license), [model metadata](https://huggingface.co/api/models/UranusITS/WorldGrow/revision/b6e0ccf34ed56878cefd56817cc1b9985f4c25de?blobs=true).

Both Tencent licenses expressly limit their grant to territory excluding the European Union, United Kingdom and South Korea, and restrict use/display of their works and outputs outside it. **HY-World 2.0 does not remove the older restriction.** With this project operated from Stockholm, neither is a default authorized deployment under the published agreement. A separate applicable Tencent permission is required; do not bypass this using a mirror, VPN, foreign server or another person's credentials. This is the stated license boundary, not an inference that every Tencent model has identical terms. [Hunyuan 1.0 LICENSE §§1(l),2,5(c)](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0/blob/57fa9f3a79eae1079c279968cdb9d82c75fa7c86/LICENSE), [HY2 License.txt §§1(l),2,5(c)](https://github.com/Tencent-Hunyuan/HY-World-2.0/blob/df9988efb87bfc0f4947eb3889411cf957478b06/License.txt).

FLUX.1-dev and Fill-dev metadata reports `gated=auto`; authorized account acceptance is still necessary. Their pinned license is the FLUX.1 [dev] Non-Commercial License v1.1.1, which distinguishes noncommercial/nonproduction model use from allowed output uses and includes conditions on distribution. Do not label it Apache/MIT or assume production deployment permission from experimental use. HY2 uses `facebook/sam3`, `gated=manual`; metadata inspection did not request or establish access. Other public component cards declare Apache-2.0 (Qwen, Wan, Grounding DINO, DINOv2), MIT (MoGe/TRELLIS), or CC-BY-4.0 (ZIM). These declarations do not replace checking each dependency's terms. CLIP's source license is MIT; its HF API card has no license field. [FLUX license](https://huggingface.co/black-forest-labs/FLUX.1-dev/blob/3de623fc3c33e44ffbe2bad470d0f45bccf2eb21/LICENSE.md), [SAM3 metadata](https://huggingface.co/api/models/facebook/sam3/revision/3c879f39826c281e95690f02c7821c4de09afae7?blobs=true), [CLIP license](https://github.com/openai/CLIP/blob/main/LICENSE).

## WorldGrow: technical plan

Code pin: `world-grow/WorldGrow@1f2ac49c30fd1390a810a201019ed26c02487883`. Its gitlinks pin `chensjtu/cumm-int32@bafae87673d2d10da0f83a900e4d5935b93909b8`, `chensjtu/spconv-int32@2ce36f8bb1a17cb5a8f759ebce4b6a531e4f2d6b`, and `MaxtirError/FlexiCubes@815e075a2a400d06c48d94c347674344ed6ae5c5`. **Do not reuse or replace the running TRELLIS environment's `spconv-cu120`.** Upstream explicitly requires its modified cumm/spconv sources. [Tree/gitlinks](https://api.github.com/repos/world-grow/WorldGrow/git/trees/1f2ac49c30fd1390a810a201019ed26c02487883?recursive=1), [setup](https://github.com/world-grow/WorldGrow/blob/1f2ac49c30fd1390a810a201019ed26c02487883/setup.sh).

Use a new environment under `/home/vastness/.local/share/vastness-benchmarks/worldgrow-reliability-01/`, whose backing WSL VHD is on E:. Proposed compatibility baseline is Python 3.10, Torch 2.4.0/cu121, torchvision 0.19.0, xformers 0.0.27.post2, CUDA Toolkit 12.1.1 and the existing GCC 11.4 toolchain. This follows the compatible Torch/CUDA combinations in WorldGrow's setup and reuses proven toolchain binaries, **not a tested WorldGrow package lock**. Pin remaining rasterizer/Kaolin/utils3d sources to the recorded TRELLIS preparation revisions where compatible; record any difference before installing. `ATTN_BACKEND=xformers`, `SPCONV_ALGO=native`, `TORCH_CUDA_ARCH_LIST=8.6`, and build parallelism 2 are proposed resource limits. Capture conda explicit list, pip freeze/check, source/submodule revisions, build logs and tiny CUDA/modified sparse-convolution smoke before inference. No GPU driver change is needed. [Existing toolchain provenance](trellis-linux-prerequisites.md), [existing benchmark pins](../../services/gpu-worker/benchmarks/pins.json), [NVIDIA compute-capability table](https://developer.nvidia.com/cuda/gpus).

The released `run(world_size, seed, …)` has no prompt parameter. It reads `pipeline.text_prompt` populated from `pipeline.json`; tokenization truncates at 77 tokens. A research adapter can set that attribute from the frozen semantic-intent description without changing weights, but must record exact text and token truncation. The paper trained with a fixed generic house description, so this is an **experimental conditioning intervention**, not established open-ended instruction following. Default sampler values are 50 steps for both stages and CFG strength 0; zero CFG amplification still retains the conditional prediction in this implementation. Preserve those settings for the first comparison rather than tune by outcome. [Pipeline](https://github.com/world-grow/WorldGrow/blob/1f2ac49c30fd1390a810a201019ed26c02487883/trellis/pipelines/world_grow.py), [model pipeline/config](https://huggingface.co/UranusITS/WorldGrow/blob/b6e0ccf34ed56878cefd56817cc1b9985f4c25de/pipeline.json), [guidance mixin](https://github.com/world-grow/WorldGrow/blob/1f2ac49c30fd1390a810a201019ed26c02487883/trellis/pipelines/samplers/guidance_interval_mixin.py).

The default mesh route calls `to_glb(... simplify=0.9, texture_size=1024)` and defaults to hole filling. That cannot silently become evidence of original decoder-supported floor. Prepare a committed adapter that retains each `slat_decoder_mesh` result **before** simplification, invisible-face removal, hole filling or texture baking; preserve vertex/face ordering and block IDs. Apply only the predetermined rigid transform and block translation. For raw internal Z-up coordinates use `(x,y,z)→(x,z,-y)` and translation `(i/2,0,-j/2)`. Gaussian block translations are initially `(i/2,j/2,0)`; apply the same final rotation explicitly, then the same uniform assessment scale. Upstream default Gaussian `save_ply` and GLB export use transposed conventions and must not be assumed aligned. Reuse the finite-opacity-logit export correction only after a regression against this fork. Keep the native upstream artifact separately if produced; assess raw GLB only. Never manufacture Gaussian attributes from triangle PLY. [Block decoding](https://github.com/world-grow/WorldGrow/blob/1f2ac49c30fd1390a810a201019ed26c02487883/trellis/pipelines/world_grow.py), [mesh postprocessing](https://github.com/world-grow/WorldGrow/blob/1f2ac49c30fd1390a810a201019ed26c02487883/trellis/utils/postprocessing_utils.py), [Gaussian export](https://github.com/world-grow/WorldGrow/blob/1f2ac49c30fd1390a810a201019ed26c02487883/trellis/representations/gaussian/gaussian_model.py).

The concrete export substitution for that adapter is below. It uses the existing pipeline's block loop and offsets while replacing only the renderer/mesh-cleanup call; original decoded vertices and faces are copied without repair. This is a **source-derived implementation recipe, not a tested installed adapter**. Wrap it with pinned local model paths, the existing job/report/cancellation boundary and the geometry-preservation regression before execution. The returned scene still needs finite/index validation, hash recording and the fixed assessment transform; do not launch the upstream example as if those checks already existed.

```python
# Run only in the isolated, authorized WorldGrow environment.
import numpy as np
import trimesh
from trellis.utils import postprocessing_utils

rotation = np.array([[1, 0, 0], [0, 0, 1], [0, -1, 0]], dtype=np.float32)

def raw_glb(gaussian, decoded_mesh, **ignored_export_options):
    vertices = decoded_mesh.vertices.detach().cpu().numpy().copy()
    faces = decoded_mesh.faces.detach().cpu().numpy().copy()
    return trimesh.Trimesh(vertices=vertices @ rotation.T,
                           faces=faces, process=False)

postprocessing_utils.to_glb = raw_glb
# pipeline is loaded from a locally resolved and hashed model manifest.
pipeline.text_prompt = frozen_semantic_description
outputs = pipeline.run(world_size=(1, 1), seed=frozen_seed,
                       formats=['gaussian', 'mesh'])
outputs['mesh'].export(fresh_output_dir / 'collider.glb')
# Export outputs['gaussian'] with this same explicit rotation and finite logits.
```

Smallest resource probe: one `world_size=(1,1)`, seed 7, full Gaussian+raw-mesh outputs, unchanged 50-step settings, with a proposed 30-minute deadline and 4 GiB output cap. These are engineering limits, **not predicted runtime/output sizes**. Paper timing is 20 s/block on A100 and 30 minutes for 10×10 with 13 GB peak; no 3090 timing is reported. If the one-block probe fits, freeze `world_size=(1,1)` for all 36 paired intent/seed cases, or predeclare a separate 3×3 study before seeing outcomes. Do not enlarge only failing cases. Record full-pipeline spatial success and semantic fidelity separately: a navigable generic house cannot count as following a cave/bridge intent merely because a route exists. [Published measurements](https://arxiv.org/html/2510.21682v1).

## HunyuanWorld 1.0/lite: conditional plan

Code pin `Tencent-Hunyuan/HunyuanWorld-1.0@57fa9f3a79eae1079c279968cdb9d82c75fa7c86`. Published environment is Python 3.10 / Torch 2.5.0+cu124, with diffusers 0.34.0, transformers 4.51.0 and SageAttention 1.0.6 in the environment YAML. It also installs Real-ESRGAN, ZIM, MoGe and PyTorch3D; several source URLs are unpinned, so a future preparation must freeze their revisions rather than silently follow HEAD. Draco is optional and unnecessary for triangle GLB. Use a separate environment, never install this YAML into TRELLIS. [README](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0/blob/57fa9f3a79eae1079c279968cdb9d82c75fa7c86/README.md), [environment](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0/blob/57fa9f3a79eae1079c279968cdb9d82c75fa7c86/docker/HunyuanWorld.yaml).

A 4090 announcement does not prove 3090 compatibility, but “FP8 requires Hopper, therefore impossible” would also be wrong here. RTX 3090 is CC 8.6. The pinned GEMM processor enables native `_scaled_mm` only for CC≥9.0 and otherwise dequantizes into `torch.nn.functional.linear`; that offers FP8 weight storage with wider temporary computation, not native FP8 speed. Its attention flag calls SageAttention. Validate that exact package/kernel combination independently and measure peaks; do not treat the flag name as a hardware guarantee. Both panorama and inpainting use model CPU offload, but the scene constructor creates two Fill pipelines, so host-RAM peaks matter as well as VRAM. No documented 3090 peak or runtime was found. [GEMM fallback](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0/blob/57fa9f3a79eae1079c279968cdb9d82c75fa7c86/hy3dworld/AngelSlim/gemm_quantization_processor.py), [attention](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0/blob/57fa9f3a79eae1079c279968cdb9d82c75fa7c86/hy3dworld/AngelSlim/attention_quantization_processor.py), [layer constructor](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0/blob/57fa9f3a79eae1079c279968cdb9d82c75fa7c86/hy3dworld/models/layer_decomposer.py).

After applicable license/access permission, first generate one 1920×960 panorama from the exact intent at 50 steps, then run scene reconstruction at its default 3840×1920 target; no existing scenic panorama substituted for intent generation. Use foreground labels/classes fixed from semantic constraints before execution, not manually chosen after inspecting output. `demo_scenegen.py --seed` does not govern everything: `LayerDecomposition` hardcodes seed 25, which must be recorded or explicitly patched in the candidate revision. Preserve layered triangle PLY outputs; export their existing vertices/faces to GLB without filling gaps. Pin and test orientation from the actual exporter instead of assuming GLB Y-up from the filename. Exclude the separately identified sky/background shell from collision using a predeclared layer policy, retain its original artifact/hash, and record that there is no native Gaussian visual output. The coarse-mesh reliability viewer can assess the scene; production dual-artifact acceptance remains a separate gap. Suggested deadline 60 minutes, output cap 8 GiB, one job at a time: limits only, not measurements. [Panorama demo](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0/blob/57fa9f3a79eae1079c279968cdb9d82c75fa7c86/demo_panogen.py), [scene demo](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0/blob/57fa9f3a79eae1079c279968cdb9d82c75fa7c86/demo_scenegen.py).

## HY-World 2.0: genuine scene pipeline, unsuitable default resource plan

Code pin `Tencent-Hunyuan/HY-World-2.0@df9988efb87bfc0f4947eb3889411cf957478b06`. Default full HY-Pano model has 32 weight shards totaling 168,557,179,060 bytes. The documented lighter option uses Qwen-Image-Edit-2509 plus a panorama LoRA; the latter's advertised 425M parameters are **not** the total base-model requirement. From an existing intent-generated input image it expands to a panorama; then WorldNav/VLM plans paths, WorldStereo generates unseen views, WorldMirror reconstructs them, and GS training exports splats plus a TSDF mesh. Do not substitute WorldMirror-only reconstruction for these generation stages. [Pano options](https://github.com/Tencent-Hunyuan/HY-World-2.0/blob/df9988efb87bfc0f4947eb3889411cf957478b06/hyworld2/panogen/README.md), [worldgen](https://github.com/Tencent-Hunyuan/HY-World-2.0/blob/df9988efb87bfc0f4947eb3889411cf957478b06/hyworld2/worldgen/README.md).

Recommended setup is Python 3.11+/CUDA 12.8; root requirements pin Torch 2.7.1, torchvision 0.22.1, diffusers 0.36.0, transformers 5.2.0 and peft 0.18.1. Source builds include custom gsplat, Recast navmesh, fused-ssim, PyTorch3D and MoGe. README recommends ≥4 GPUs and tests8×H20. Its explicit single-GPU 8000-step GS-training alternative applies to the last stage only. The DMD WorldStereo checkpoint is 34,863,748,704 bytes, and the current wrapper loads the BF16 transformer plus a float32 UMT5 encoder and CLIP, VAE and other scene models. FSDP on one device does not shard across additional memory. A comment in `video_gen.py` mentions FP8 in `init_wan_from_cfg`, but that function/quantization path is absent from the used wrapper; do not advertise the paper's FP8 efficiency as this checkout's working consumer-GPU option. Full single 3090 execution needs a separately implemented/tested offload/quantization plan, not merely `--nproc_per_node=1`. [Requirements](https://github.com/Tencent-Hunyuan/HY-World-2.0/blob/df9988efb87bfc0f4947eb3889411cf957478b06/requirements.txt), [actual loader](https://github.com/Tencent-Hunyuan/HY-World-2.0/blob/df9988efb87bfc0f4947eb3889411cf957478b06/hyworld2/worldgen/models/worldstereo_wrapper.py), [video driver](https://github.com/Tencent-Hunyuan/HY-World-2.0/blob/df9988efb87bfc0f4947eb3889411cf957478b06/hyworld2/worldgen/video_gen.py).

The paper reports 712 seconds end-to-end on H20 hardware with parallelism and optimization; this is not a 3090 estimate. A future authorized trial must preserve original TSDF mesh triangles, explicitly map camera/world axes to the assessor, retain generated-support triangle IDs, and assess the same fixed scales/route criteria. No current minimal full job can responsibly be promised on 24 GB from the documented configuration. [Runtime table 10](https://arxiv.org/html/2604.14268v1), [GS mesh export](https://github.com/Tencent-Hunyuan/HY-World-2.0/blob/df9988efb87bfc0f4947eb3889411cf957478b06/hyworld2/worldgen/world_gs_trainer.py).

## Storage and handoff before any large download

Lead relayed fresh appliance inventory on 2026-09-16: physical E: approximately 1.052 TB free; Linux filesystem approximately 975 GB free. These are rounded inventory values, not reservations. Existing physical RAM inventory is 64 GiB; free host RAM must be measured at handoff. All candidate weights, conda/pip/HF/Torch caches, build/tmp paths and outputs must stay beneath the E-backed Linux benchmark prefix. C: must not receive another environment or model cache. Recheck physical E: and Linux free bytes immediately before install/download; Linux virtual-disk capacity alone is insufficient.

| Prospective route | Exact selected weight payload | Planning reservation including environment/cache/output | Status |
| --- | ---: | ---: | --- |
| WorldGrow raw Gaussian+mesh |14,821,828,348 bytes (13.804 GiB)|80 GiB|Plausible storage; license unresolved; no download|
| Hunyuan1 text→scene |71,996,649,339 bytes (67.052 GiB)|160 GiB|Territory/access blocked; no download|
| HY2 Qwen pano + complete generation |213,684,312,506 bytes (199.009 GiB)|350 GiB|Territory/access/hardware blocked; no download|

Reservations are conservative **estimates**, not measured installed sizes. Weight totals below exclude small configs/tokenizers/source/archives; allow 10 MiB extra metadata for WorldGrow,32 MiB for Hunyuan 1,128 MiB for HY2. They include separate repository copies without assuming hardlink/dedup; existing TRELLIS VAE weights may save 266,659,988 download bytes only after exact hash verification. Full HY-Pano instead of Qwen replaces 57,699,249,798 base-weight bytes plus 849,544,392 LoRA bytes with 168,557,179,060 bytes, adding 110,008,384,870 bytes; its metadata/tokenizers also differ. Runtime working files and package distributions are not model weights and require their own recorded budgets.

Before GPU handoff, lead must: (1) finish the unchanged baseline and compute the predeclared gate; (2) resolve candidate-specific rights/access without changing credentials or accepting gated terms implicitly; (3) commit the bounded runner/export mapping and test preservation of original triangles, coordinate alignment, unsupported conditioning and cancellation; (4) freeze the candidate manifest/configs and dry-run dependency solve in a new prefix; (5) obtain the idle GPU lease and fresh memory/disk inventory. Then run the fixed resource probe once, retain every failure, and only afterwards start the predeclared paired cohort. A setup/OOM/license block remains that category of result, never a fabricated geometry failure or benchmark success. Existing M0/M1/passage data and the running TRELLIS environment stay intact.

## Exact weight inventory and model revisions

Metadata method: unauthenticated Hugging Face `GET /api/models/{repo}?blobs=true`, selecting only the files consumed by the pinned loaders, then recording the returned commit and per-file `size`. No weight body was requested. Each link below points to that immutable revision's metadata. All metadata queries succeeded, including gated repositories; that does **not** establish download entitlement. Safetensors selected instead of duplicate `.bin`/Flax/TF weights; FLUX root single-file duplicates and unused image-to-panorama LoRA omitted. HY2 retains the Wan base transformer because the wrapper loads it before applying the WorldStereo checkpoint; excluding it merely because the new checkpoint exists would undercount actual loading. `ewrfcas/Uni3C` is not required: the selected configuration and wrapper both disable that load. Embedded model code/config/tokenizer files must also be pinned and hashed before execution.

### WorldGrow

**`UranusITS/WorldGrow` @ `b6e0ccf34ed56878cefd56817cc1b9985f4c25de`** — gate `false`; selected weights **12,844,627,780 bytes**. [HF metadata](https://huggingface.co/api/models/UranusITS/WorldGrow/revision/b6e0ccf34ed56878cefd56817cc1b9985f4c25de?blobs=true).

| File | Bytes |
| --- | ---: |
| `ckpts/slat_decoder_gs.safetensors` | 341,486,240 |
| `ckpts/slat_decoder_mesh.safetensors` | 363,718,540 |
| `ckpts/slat_flow.safetensors` | 4,293,731,864 |
| `ckpts/ss_coarse_flow.safetensors` | 3,922,845,568 |
| `ckpts/ss_fine_flow.safetensors` | 3,922,845,568 |

**`microsoft/TRELLIS-image-large` @ `25e0d31ffbebe4b5a97464dd851910efc3002d96`** — gate `false`; selected weights **266,659,988 bytes**. [HF metadata](https://huggingface.co/api/models/microsoft/TRELLIS-image-large/revision/25e0d31ffbebe4b5a97464dd851910efc3002d96?blobs=true).

| File | Bytes |
| --- | ---: |
| `ckpts/ss_dec_conv3d_16l8_fp16.safetensors` | 147,591,972 |
| `ckpts/ss_enc_conv3d_16l8_fp16.safetensors` | 119,068,016 |

**`openai/clip-vit-large-patch14` @ `32bd64288804d66eefd0ccbe215aa642df71cc41`** — gate `false`; selected weights **1,710,540,580 bytes**. [HF metadata](https://huggingface.co/api/models/openai/clip-vit-large-patch14/revision/32bd64288804d66eefd0ccbe215aa642df71cc41?blobs=true).

| File | Bytes |
| --- | ---: |
| `model.safetensors` | 1,710,540,580 |

### HunyuanWorld 1.0 text-to-scene

**`tencent/HunyuanWorld-1` @ `43c47e7c5d7e5c6ac0f8410cb1df31a4af815d88`** — gate `false`; selected weights **1,075,949,640 bytes**. [HF metadata](https://huggingface.co/api/models/tencent/HunyuanWorld-1/revision/43c47e7c5d7e5c6ac0f8410cb1df31a4af815d88?blobs=true).

| File | Bytes |
| --- | ---: |
| `HunyuanWorld-PanoDiT-Text/lora.safetensors` | 478,187,784 |
| `HunyuanWorld-PanoInpaint-Scene/lora.safetensors` | 478,187,784 |
| `HunyuanWorld-PanoInpaint-Sky/lora.safetensors` | 119,574,072 |

**`black-forest-labs/FLUX.1-dev` @ `3de623fc3c33e44ffbe2bad470d0f45bccf2eb21`** — gate `auto`; selected weights **33,741,413,878 bytes**. [HF metadata](https://huggingface.co/api/models/black-forest-labs/FLUX.1-dev/revision/3de623fc3c33e44ffbe2bad470d0f45bccf2eb21?blobs=true).

| File | Bytes |
| --- | ---: |
| `text_encoder/model.safetensors` | 246,144,352 |
| `text_encoder_2/model-00001-of-00002.safetensors` | 4,994,582,224 |
| `text_encoder_2/model-00002-of-00002.safetensors` | 4,530,066,360 |
| `transformer/diffusion_pytorch_model-00001-of-00003.safetensors` | 9,983,040,304 |
| `transformer/diffusion_pytorch_model-00002-of-00003.safetensors` | 9,949,328,904 |
| `transformer/diffusion_pytorch_model-00003-of-00003.safetensors` | 3,870,584,832 |
| `vae/diffusion_pytorch_model.safetensors` | 167,666,902 |

**`black-forest-labs/FLUX.1-Fill-dev` @ `358293da0354175698b67ec8299acf928313a78a`** — gate `auto`; selected weights **33,911,019,268 bytes**. [HF metadata](https://huggingface.co/api/models/black-forest-labs/FLUX.1-Fill-dev/revision/358293da0354175698b67ec8299acf928313a78a?blobs=true).

| File | Bytes |
| --- | ---: |
| `text_encoder/model.safetensors` | 246,144,352 |
| `text_encoder_2/model-00001-of-00002.safetensors` | 4,994,582,224 |
| `text_encoder_2/model-00002-of-00002.safetensors` | 4,530,066,360 |
| `transformer/diffusion_pytorch_model-00001-of-00003.safetensors` | 9,985,006,384 |
| `transformer/diffusion_pytorch_model-00002-of-00003.safetensors` | 9,949,328,904 |
| `transformer/diffusion_pytorch_model-00003-of-00003.safetensors` | 3,870,584,832 |
| `vae/diffusion_pytorch_model.safetensors` | 335,306,212 |

**`Ruicheng/moge-vitl` @ `ad326bfb61facd6c52b5a825bc1e34d7c97d9672`** — gate `false`; selected weights **1,256,823,446 bytes**. [HF metadata](https://huggingface.co/api/models/Ruicheng/moge-vitl/revision/ad326bfb61facd6c52b5a825bc1e34d7c97d9672?blobs=true).

| File | Bytes |
| --- | ---: |
| `model.pt` | 1,256,823,446 |

**`naver-iv/zim-anything-vitl` @ `667e2d7c233f6f1cacd12ccc64bdf6cc7b5aa16d`** — gate `false`; selected weights **1,255,022,286 bytes**. [HF metadata](https://huggingface.co/api/models/naver-iv/zim-anything-vitl/revision/667e2d7c233f6f1cacd12ccc64bdf6cc7b5aa16d?blobs=true).

| File | Bytes |
| --- | ---: |
| `zim_vit_l_2092/decoder.onnx` | 19,330,176 |
| `zim_vit_l_2092/encoder.onnx` | 1,235,692,110 |

**`IDEA-Research/grounding-dino-tiny` @ `a2bb814dd30d776dcf7e30523b00659f4f141c71`** — gate `false`; selected weights **689,359,096 bytes**. [HF metadata](https://huggingface.co/api/models/IDEA-Research/grounding-dino-tiny/revision/a2bb814dd30d776dcf7e30523b00659f4f141c71?blobs=true).

| File | Bytes |
| --- | ---: |
| `model.safetensors` | 689,359,096 |

Additional required weight: `RealESRGAN_x2plus.pth`, **67,061,725 bytes**, official release `v0.2.1`; size from the [GitHub release API](https://api.github.com/repos/xinntao/Real-ESRGAN/releases/tags/v0.2.1). No release-provided digest; obtain SHA256 after an authorized download. x4plus and face-restoration models are not invoked by the selected scene path.

### HY-World 2.0, Qwen panorama route

**`tencent/HY-World-2.0` @ `d78a16c91c7a56488894a1c8de4f5c7cc28aa8b0`** — gate `false`; selected weights **5,903,097,664 bytes**. [HF metadata](https://huggingface.co/api/models/tencent/HY-World-2.0/revision/d78a16c91c7a56488894a1c8de4f5c7cc28aa8b0?blobs=true).

| File | Bytes |
| --- | ---: |
| `HY-Pano-2.0/pytorch_lora_weights.safetensors` | 849,544,392 |
| `HY-WorldMirror-2.0/model.safetensors` | 5,053,553,272 |

**`Qwen/Qwen-Image-Edit-2509` @ `d3968ef930e841f4c73640fb8afa3b306a78167e`** — gate `false`; selected weights **57,699,249,798 bytes**. [HF metadata](https://huggingface.co/api/models/Qwen/Qwen-Image-Edit-2509/revision/d3968ef930e841f4c73640fb8afa3b306a78167e?blobs=true).

| File | Bytes |
| --- | ---: |
| `text_encoder/model-00001-of-00004.safetensors` | 4,968,243,304 |
| `text_encoder/model-00002-of-00004.safetensors` | 4,991,495,816 |
| `text_encoder/model-00003-of-00004.safetensors` | 4,932,751,040 |
| `text_encoder/model-00004-of-00004.safetensors` | 1,691,924,384 |
| `transformer/diffusion_pytorch_model-00001-of-00005.safetensors` | 9,973,578,592 |
| `transformer/diffusion_pytorch_model-00002-of-00005.safetensors` | 9,987,326,072 |
| `transformer/diffusion_pytorch_model-00003-of-00005.safetensors` | 9,987,307,440 |
| `transformer/diffusion_pytorch_model-00004-of-00005.safetensors` | 9,930,685,712 |
| `transformer/diffusion_pytorch_model-00005-of-00005.safetensors` | 982,130,472 |
| `vae/diffusion_pytorch_model.safetensors` | 253,806,966 |

**`hanshanxue/WorldStereo` @ `ac2ad97ecb043fe80c2f19cd1898006becb9d66e`** — gate `false`; selected weights **34,863,748,704 bytes**. [HF metadata](https://huggingface.co/api/models/hanshanxue/WorldStereo/revision/ac2ad97ecb043fe80c2f19cd1898006becb9d66e?blobs=true).

| File | Bytes |
| --- | ---: |
| `worldstereo-memory-dmd/model.safetensors` | 34,863,748,704 |

**`Wan-AI/Wan2.1-I2V-14B-480P-Diffusers` @ `b184e23a8a16b20f108f727c902e769e873ffc73`** — gate `false`; selected weights **90,075,953,948 bytes**. [HF metadata](https://huggingface.co/api/models/Wan-AI/Wan2.1-I2V-14B-480P-Diffusers/revision/b184e23a8a16b20f108f727c902e769e873ffc73?blobs=true).

| File | Bytes |
| --- | ---: |
| `image_encoder/model.safetensors` | 1,264,217,760 |
| `text_encoder/model-00001-of-00005.safetensors` | 4,972,389,712 |
| `text_encoder/model-00002-of-00005.safetensors` | 4,899,225,672 |
| `text_encoder/model-00003-of-00005.safetensors` | 4,966,309,504 |
| `text_encoder/model-00004-of-00005.safetensors` | 4,999,880,704 |
| `text_encoder/model-00005-of-00005.safetensors` | 2,885,866,152 |
| `transformer/diffusion_pytorch_model-00001-of-00014.safetensors` | 4,929,161,040 |
| `transformer/diffusion_pytorch_model-00002-of-00014.safetensors` | 4,951,011,392 |
| `transformer/diffusion_pytorch_model-00003-of-00014.safetensors` | 4,951,011,392 |
| `transformer/diffusion_pytorch_model-00004-of-00014.safetensors` | 4,951,093,744 |
| `transformer/diffusion_pytorch_model-00005-of-00014.safetensors` | 4,846,133,208 |
| `transformer/diffusion_pytorch_model-00006-of-00014.safetensors` | 4,846,133,208 |
| `transformer/diffusion_pytorch_model-00007-of-00014.safetensors` | 4,846,133,208 |
| `transformer/diffusion_pytorch_model-00008-of-00014.safetensors` | 4,846,133,208 |
| `transformer/diffusion_pytorch_model-00009-of-00014.safetensors` | 4,846,133,208 |
| `transformer/diffusion_pytorch_model-00010-of-00014.safetensors` | 4,846,133,208 |
| `transformer/diffusion_pytorch_model-00011-of-00014.safetensors` | 4,846,133,208 |
| `transformer/diffusion_pytorch_model-00012-of-00014.safetensors` | 4,846,133,208 |
| `transformer/diffusion_pytorch_model-00013-of-00014.safetensors` | 4,846,133,208 |
| `transformer/diffusion_pytorch_model-00014-of-00014.safetensors` | 2,182,996,112 |
| `vae/diffusion_pytorch_model.safetensors` | 507,591,892 |

**`Qwen/Qwen3-VL-8B-Instruct` @ `0c351dd01ed87e9c1b53cbc748cba10e6187ff3b`** — gate `false`; selected weights **17,534,339,512 bytes**. [HF metadata](https://huggingface.co/api/models/Qwen/Qwen3-VL-8B-Instruct/revision/0c351dd01ed87e9c1b53cbc748cba10e6187ff3b?blobs=true).

| File | Bytes |
| --- | ---: |
| `model-00001-of-00004.safetensors` | 4,902,275,944 |
| `model-00002-of-00004.safetensors` | 4,915,962,496 |
| `model-00003-of-00004.safetensors` | 4,999,831,048 |
| `model-00004-of-00004.safetensors` | 2,716,270,024 |

**`facebook/sam3` @ `3c879f39826c281e95690f02c7821c4de09afae7`** — gate `manual`; selected weights **3,439,938,512 bytes**. [HF metadata](https://huggingface.co/api/models/facebook/sam3/revision/3c879f39826c281e95690f02c7821c4de09afae7?blobs=true).

| File | Bytes |
| --- | ---: |
| `model.safetensors` | 3,439,938,512 |

**`Ruicheng/moge-2-vitl-normal` @ `cb0e8bbd6b1e243589717c78e750b1ba4c093acf`** — gate `false`; selected weights **1,323,815,904 bytes**. [HF metadata](https://huggingface.co/api/models/Ruicheng/moge-2-vitl-normal/revision/cb0e8bbd6b1e243589717c78e750b1ba4c093acf?blobs=true).

| File | Bytes |
| --- | ---: |
| `model.pt` | 1,323,815,904 |

**`facebook/dinov2-base` @ `f9e44c814b77203eaa57a6bdbbd535f21ede1415`** — gate `false`; selected weights **346,345,912 bytes**. [HF metadata](https://huggingface.co/api/models/facebook/dinov2-base/revision/f9e44c814b77203eaa57a6bdbbd535f21ede1415?blobs=true).

| File | Bytes |
| --- | ---: |
| `model.safetensors` | 346,345,912 |

**`naver-iv/zim-anything-vitl` @ `667e2d7c233f6f1cacd12ccc64bdf6cc7b5aa16d`** — gate `false`; selected weights **1,255,022,286 bytes**. [HF metadata](https://huggingface.co/api/models/naver-iv/zim-anything-vitl/revision/667e2d7c233f6f1cacd12ccc64bdf6cc7b5aa16d?blobs=true).

| File | Bytes |
| --- | ---: |
| `zim_vit_l_2092/decoder.onnx` | 19,330,176 |
| `zim_vit_l_2092/encoder.onnx` | 1,235,692,110 |

**`IDEA-Research/grounding-dino-tiny` @ `a2bb814dd30d776dcf7e30523b00659f4f141c71`** — gate `false`; selected weights **689,359,096 bytes**. [HF metadata](https://huggingface.co/api/models/IDEA-Research/grounding-dino-tiny/revision/a2bb814dd30d776dcf7e30523b00659f4f141c71?blobs=true).

| File | Bytes |
| --- | ---: |
| `model.safetensors` | 689,359,096 |

Additional GS perceptual-loss weights: `vgg16-397923af.pth`, **553,433,881 bytes**, [PyTorch official URL](https://download.pytorch.org/models/vgg16-397923af.pth), HTTP HEAD Content-Length; LPIPS `vgg.pth`, **7,289 bytes**, [TorchMetrics v1.8.2 bundled calibration](https://github.com/Lightning-AI/torchmetrics/blob/v1.8.2/src/torchmetrics/functional/image/lpips_models/vgg.pth), HTTP HEAD. The latter is an explicit prospective TorchMetrics pin because upstream leaves that package unlocked; compatibility needs resolution before install. Neither weight downloaded. Include these ancillary weights even though they are absent from the main model zoo.
