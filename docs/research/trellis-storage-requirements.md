# TRELLIS benchmark storage budget

Prepared 2026-09-14 using metadata requests only. No checkpoint, wheel, CUDA toolkit, or model was downloaded or installed during this research. This note determines expected transfer/storage before the deployment agent selects and verifies the destination; it does not establish GPU execution.

## Exact model bytes

The existing `services/gpu-worker/benchmarks/prepare.py` calls `snapshot_download` for the complete pinned `microsoft/TRELLIS-image-large` revision, then downloads the DINO checkpoint separately. The whole snapshot therefore counts, including its encoders and radiance-field decoder. The [pinned Hugging Face tree API](https://huggingface.co/api/models/microsoft/TRELLIS-image-large/tree/25e0d31ffbebe4b5a97464dd851910efc3002d96?recursive=true&expand=false) returned 19 files. Summing its `size` fields gives:

| Download | Exact bytes | GiB (bytes / 2³⁰) |
| --- | ---: | ---: |
| TRELLIS snapshot, revision `25e0d31ffbebe4b5a97464dd851910efc3002d96` | 3,299,240,850 | 3.073 |
| DINOv2 ViT-L/14 register checkpoint | 1,217,607,321 | 1.134 |
| **Combined model payload** | **4,516,848,171** | **4.207** |

The DINO size is the `Content-Length` from a successful HTTP HEAD of the [official checkpoint](https://dl.fbaipublicfiles.com/dinov2/dinov2_vitl14/dinov2_vitl14_reg4_pretrain.pth). Headers also reported `Last-Modified: Fri, 27 Oct 2023 10:37:32 GMT` and version ID `HLmbhvcd2hPq9CNLwMvwswbRlzZRuOeA`. Its multipart ETag is not a SHA-256 assertion. The setup records the downloaded SHA-256 before inference.

The eight snapshot checkpoint sizes are:

| File under `ckpts/` | Bytes |
| --- | ---: |
| `slat_dec_gs_swin8_B_64l8gs32_fp16.safetensors` | 171,450,952 |
| `slat_dec_mesh_swin8_B_64l8m256c_fp16.safetensors` | 181,903,412 |
| `slat_dec_rf_swin8_B_64l8r16_fp16.safetensors` | 171,450,488 |
| `slat_enc_swin8_B_64l8_fp16.safetensors` | 173,242,816 |
| `slat_flow_img_dit_L_64l8p2_fp16.safetensors` | 1,203,755,136 |
| `ss_dec_conv3d_16l8_fp16.safetensors` | 147,591,972 |
| `ss_enc_conv3d_16l8_fp16.safetensors` | 119,068,016 |
| `ss_flow_img_dit_L_16l8_fp16.safetensors` | 1,130,770,840 |

These are the same API's metadata, not local hashes or measured transfer. Re-query before download if changing any pin. JSON files, README and attributes account for the remaining 7,218 bytes.

## Environment and temporary space

**Budget at least 40 GiB of physically free disk for one fresh attempt; prefer 60 GiB when available.** This is a conservative planning allowance, not a published minimum or a measured installed size. It reserves 4.207 GiB for models plus the Python environment, CUDA toolkit, source checkouts, compiled extensions, package caches, build temporaries and benchmark outputs. Keep additional Windows operating-system/reboot headroom outside that allowance.

For scale, PyPI metadata for Torch 2.4.0 lists eleven Linux NVIDIA runtime wheel dependencies totaling 1,788,523,551 compressed bytes (1.666 GiB), before Torch itself, other dependencies or decompression. The corresponding PyPI Torch cp310 x86-64 wheel is 797,225,217 bytes; Open3D 0.18.0's is 399,716,652 bytes. These illustrate why model size alone is insufficient. They are **not** a complete resolved install estimate: the prepared recipe obtains Torch from its cu121 index, pins direct packages but not all transitive dependencies, and separately requires CUDA 12.1 `nvcc`. [Torch metadata](https://pypi.org/pypi/torch/2.4.0/json), [Open3D metadata](https://pypi.org/pypi/open3d/0.18.0/json), [CUDA 12.1 installation guide](https://docs.nvidia.com/cuda/archive/12.1.0/cuda-installation-guide-linux/index.html).

Put the benchmark prefix and its temporary/cache directories on the chosen physical volume. A different `--prefix` does not automatically relocate every cache. Inspect/set `PIP_CACHE_DIR`, `CONDA_PKGS_DIRS`, `HF_HOME`, `TORCH_HOME`, and `TMPDIR` as applicable, and record their resolved paths. Pip caches downloads and locally built wheels; conda recommends locating its package cache and environments on the same filesystem to permit hard links. Hugging Face 0.26.2's `local_dir` workflow puts downloaded files at the chosen destination with metadata in its `.cache/huggingface` subdirectory. [pip caching](https://pip.pypa.io/en/stable/topics/caching/), [conda custom locations](https://docs.conda.io/projects/conda/en/latest/user-guide/configuration/custom-env-and-pkg-locations.html), [pinned Hugging Face download documentation](https://huggingface.co/docs/huggingface_hub/v0.26.2/guides/download).

## WSL physical storage and proposed location

The deployment agent reported Windows free-space observations of approximately C: 23.64 GB, D: 137.69 GB and E: 1,078.77 GB. Those are point-in-time remote observations supplied to this research task; the deployment evidence should retain their exact original units/bytes. E: is the preferred backing volume if its filesystem and accessibility checks pass. Prefer Linux ext4 inside an E:-backed WSL VHD for the whole environment, models, caches and build tree. Linux `df` by itself is insufficient: WSL's expandable VHD can report a 1 TB maximum even when its Windows backing volume has much less physical space. Locate the registered distro's `BasePath`, then check both Windows-volume free bytes and Linux filesystem free bytes. [Microsoft WSL disk-space documentation](https://learn.microsoft.com/en-us/windows/wsl/disk-space).

WSL introduced `--manage --move` in [release 2.3.11](https://github.com/microsoft/WSL/releases/tag/2.3.11). Check the installed `wsl --version` and `wsl --help`; do not assume the installed version has the command. The current [official implementation](https://github.com/microsoft/WSL/blob/d6977e2d850a9e5f7ad4327fe61e6f767a88d5b7/src/windows/service/exe/LxssUserSession.cpp#L922) rejects a running distro, requires WSL2, checks the destination is not another distro's path, performs a cross-volume-capable move and updates registration. This source inspection describes current upstream behavior, not a test of the PC's installed version.

If Ubuntu-24.04 currently lives on C:, the proposed native Windows commands, after the requested reboot and when the distro is idle, are:

```powershell
wsl --terminate Ubuntu-24.04
wsl --manage Ubuntu-24.04 --move E:\Vastness\WSL\Ubuntu-24.04
```

Use the existing distro-owning Windows identity and a new destination with enough space for the existing VHD plus the planned growth. Do not hand-edit the registry or copy/move AppData's VHD behind WSL. After a supported move succeeds, re-read `BasePath`, confirm the registered distro name and Linux `vastness` account, re-run the exact NVIDIA command, and record the full benchmark prefix before opting into model downloads. A proposed Linux prefix is `/home/vastness/.local/share/vastness-benchmarks/trellis-<attempt-id>` **only after** its ext4 VHD is confirmed E:-backed. This note performs no move and asserts no post-move verification.
