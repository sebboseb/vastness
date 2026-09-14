# User-space prerequisites for the pinned TRELLIS trial

Researched 2026-09-14 without installing packages. The existing recipe stays Python 3.10, PyTorch 2.4.0/cu121, torchvision 0.19.0, xformers 0.0.27.post2 and Kaolin 0.17.0. This note supplies the missing `conda` and CUDA 12.1 development toolchain; it does not replace that recipe or prove the environment works.

## Compatibility decision

Use a separate user-owned conda toolchain prefix containing NVIDIA CUDA Toolkit 12.1.1 and conda-forge GCC/G++ 11.4.0. CUDA's component versions differ from its release version: the pinned NVIDIA release label supplies `cuda-nvcc` 12.1.105, whose output is CUDA release 12.1. NVIDIA documents release-specific conda labels for older toolkits. [CUDA conda installation](https://docs.nvidia.com/cuda/archive/12.1.0/cuda-installation-guide-linux/index.html#conda-installation), [NVIDIA toolkit metadata](https://api.anaconda.org/package/nvidia/cuda-toolkit), [release-label repodata](https://conda.anaconda.org/nvidia/label/cuda-12.1.1/linux-64/repodata.json).

Ubuntu 24.04 is newer than CUDA 12.1's qualified Linux distributions; this is an explicit compatibility trial. The published table lists GCC through 12.2 and Ubuntu through 22.04. Do not compile with an unexamined system GCC 13 or bypass version checks with `--allow-unsupported-compiler`. Conda-forge publishes GCC and G++ 11.4.0 activation packages with their matching compiler implementation, binutils and Linux sysroot dependencies. Use them together and verify the actual activated versions. This mitigates the newer system compiler issue; it does not certify CUDA 12.1 on Ubuntu 24.04. [CUDA 12.1 requirements](https://docs.nvidia.com/cuda/archive/12.1.0/cuda-installation-guide-linux/index.html#system-requirements), [GCC metadata](https://api.anaconda.org/package/conda-forge/gcc_linux-64), [G++ metadata](https://api.anaconda.org/package/conda-forge/gxx_linux-64).

Keep the existing Windows NVIDIA driver. WSL exposes that driver to Linux; NVIDIA explicitly directs users not to install a Linux display driver inside WSL. The conda toolkit includes `cuda-driver-dev`, a development package, not a kernel/display driver installer. Its library stubs must not replace the WSL runtime driver or be placed on runtime `LD_LIBRARY_PATH`. [NVIDIA WSL guide](https://docs.nvidia.com/cuda/wsl-user-guide/index.html), [NVIDIA release package metadata](https://conda.anaconda.org/nvidia/label/cuda-12.1.1/linux-64/repodata.json).

## Pinned Miniforge bootstrap

The official Miniforge release **26.7.2-0** provides a Linux x86-64 installer of **124,514,161 bytes**. Its release asset digest and separately published `.sha256` file agree on:

```text
281b0ac7d550802efc81af633225a5e6116d29ae72f3ab4eae7168c3931a4c05
```

Source: [release](https://github.com/conda-forge/miniforge/releases/tag/26.7.2-0), [checksum file](https://github.com/conda-forge/miniforge/releases/download/26.7.2-0/Miniforge3-26.7.2-0-Linux-x86_64.sh.sha256). The installer was not downloaded during this research. Miniforge supports unattended `-b -p` installation and its base Python version does not constrain the separate benchmark environment's Python 3.10. [Miniforge installation](https://github.com/conda-forge/miniforge#install).

Run the following only on the Linux appliance after its ext4 VHD is verified on E:, and use previously nonexistent prefixes. The bootstrap downloads approximately 119 MiB; it downloads no models. The expected user is `vastness`, matching the documented WSL entry point.

```bash
set -euo pipefail
[ "$(uname -s)" = Linux ]
[ "$(uname -m)" = x86_64 ]
[ "$(id -un)" = vastness ]
prereq=/home/vastness/.local/share/vastness-toolchains
mkdir -p "$prereq/downloads" "$prereq/cache/conda" "$prereq/tmp"
export CONDA_PKGS_DIRS="$prereq/cache/conda"
export TMPDIR="$prereq/tmp"
installer="$prereq/downloads/Miniforge3-26.7.2-0-Linux-x86_64.sh"
[ ! -e "$prereq/miniforge-26.7.2-0" ]
curl --fail --location --output "$installer" \
  https://github.com/conda-forge/miniforge/releases/download/26.7.2-0/Miniforge3-26.7.2-0-Linux-x86_64.sh
printf '%s  %s\n' \
  281b0ac7d550802efc81af633225a5e6116d29ae72f3ab4eae7168c3931a4c05 \
  "$installer" | sha256sum --check --strict
bash "$installer" -b -p "$prereq/miniforge-26.7.2-0"
```

No `conda init`, shell-profile modification or sudo is needed. If an installation prefix already exists, inspect and reuse a verified installation or choose a new attempt name; do not overwrite it.

## Resolve, record and install the toolchain

First obtain a solve without fetching package payloads. Repodata downloads are small metadata compared with the toolkit; retain the solve and review its versions/channels/download sizes. Reject a solve that changes the requested CUDA/compiler versions. The complete toolkit's NVIDIA dependency closure in the release label currently sums to **3,530,474,803 compressed bytes (3.288 GiB)**, including static libraries and profiler tools; Miniforge, the conda-forge compiler/sysroot dependencies and unpacked/cache duplication are additional. This closure was calculated from metadata, not an executed conda solve. The concrete solve determines the final transfer size. Allow roughly **10–15 GiB of installed/cache/temporary space for prerequisites**, as an estimate within the broader 40–60 GiB attempt budget in [storage requirements](trellis-storage-requirements.md).

```bash
conda_bin="$prereq/miniforge-26.7.2-0/bin/conda"
toolchain="$prereq/cuda-12.1.1-gcc-11.4.0"
[ ! -e "$toolchain" ]
"$conda_bin" create --dry-run --json --prefix "$toolchain" \
  --override-channels --strict-channel-priority \
  --channel nvidia/label/cuda-12.1.1 --channel conda-forge \
  cuda-toolkit=12.1.1 gcc_linux-64=11.4.0 gxx_linux-64=11.4.0 \
  > "$prereq/toolchain-solve.json"
```

After inspecting the successful solve, execute the same request and retain its log:

```bash
"$conda_bin" create --yes --prefix "$toolchain" \
  --override-channels --strict-channel-priority \
  --channel nvidia/label/cuda-12.1.1 --channel conda-forge \
  cuda-toolkit=12.1.1 gcc_linux-64=11.4.0 gxx_linux-64=11.4.0 \
  > "$prereq/toolchain-install.log" 2>&1
"$conda_bin" list --prefix "$toolchain" --explicit \
  > "$prereq/toolchain-explicit.txt"
source "$prereq/miniforge-26.7.2-0/etc/profile.d/conda.sh"
conda activate "$toolchain"
export CC="$toolchain/bin/x86_64-conda-linux-gnu-gcc"
export CXX="$toolchain/bin/x86_64-conda-linux-gnu-g++"
export CUDAHOSTCXX="$CXX"
export CUDA_HOME="$toolchain"
export PATH="$toolchain/bin:/usr/lib/wsl/lib:$PATH"
"$CC" --version
"$CXX" --version
nvcc --version
```

PyTorch 2.4.0's extension builder consumes `CC` as nvcc's `-ccbin`; `CXX` selects the C++ compiler. Keep this activated environment when launching the existing preparation script, which creates its own Python environment but inherits the compiler configuration. Its `nvcc` discovery derives `CUDA_HOME` from the executable location, so check that `readlink -f "$(command -v nvcc)"` resolves within this toolchain before continuing. [PyTorch 2.4.0 extension builder](https://github.com/pytorch/pytorch/blob/v2.4.0/torch/utils/cpp_extension.py#L570), [nvcc compiler selection](https://docs.nvidia.com/cuda/archive/12.1.0/cuda-compiler-driver-nvcc/index.html#compiler-bindir-directory-ccbin).

Optionally compile a small CUDA object before downloading model weights. Compilation checks the compiler/header seam and does not execute a CUDA kernel:

```bash
printf '%s\n' '__global__ void vastness_compile_probe() {}' \
  > "$prereq/compile-probe.cu"
nvcc -ccbin "$CC" -c "$prereq/compile-probe.cu" \
  -o "$prereq/compile-probe.o"
```

Continue with the existing `scripts/prepare-trellis.sh` only after these checks pass and the full benchmark destination/storage allowance is recorded. Keep model download authorization separate via its existing `--download-models` switch. A compiler or setup failure is evidence to diagnose with preserved logs, not reason to silently move to a different Torch/CUDA generation.
