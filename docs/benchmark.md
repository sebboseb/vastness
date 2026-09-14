# TRELLIS benchmark

The first real NVIDIA trial succeeded on the RTX 3090 on 2026-09-15: genuine Gaussian PLY and mesh GLB outputs passed validation and Mac import checks. See [the measured trial record](research/trellis-first-appliance-trial.md) for timing, VRAM, provenance, retained failures and inspection. This establishes a fixed-image asset backend; walkable rooms and a permanent world-generator choice remain separate work. See [the research comparison](research/first-backend-benchmark.md) for alternatives, licenses and the installation uncertainty.

The executable pins live in [pins.json](../services/gpu-worker/benchmarks/pins.json): TRELLIS `442aa1e1afb9014e80681d3bf604e8d728a86ee7`, model `25e0d31ffbebe4b5a97464dd851910efc3002d96`, DINOv2 code `7b187bd4df8efce2cbcbbb67bd01532c19bf4c9c`, and the official RGBA `T.png` sample with SHA-256 `e29ddc83a5bd3a05fe9b34732169bc4ea7131f7c36527fdc5f626a90a73076d2`. DINO's official weight URL has no independently verified checksum in this preparation; setup records its actual downloaded hash. This is provenance/integrity capture, not an authenticated pre-published checksum claim.

## Safe Mac preparation

From the repository root:

```sh
python3 services/gpu-worker/benchmarks/run.py --help
python3 services/gpu-worker/benchmarks/run.py --plan
python3 services/gpu-worker/benchmarks/run.py --preflight
bash scripts/prepare-trellis.sh
python3 -m unittest discover -s services/gpu-worker -p 'test_*.py'
python3 -m compileall -q services/gpu-worker/benchmarks
```

Help/plan/preflight import no Torch or model libraries. Plan is the default; its JSON says `status: not_run` and `nvidiaExecution: not_run`. Preflight performs read-only command/package/file inspection; it does not load CUDA or infer. Running the preparation script without `--execute`, even with `--download-models`, only prints a plan. Execution and installation are rejected on macOS.

## Linux appliance setup

Deploy Vastness from its committed Git revision, inventory the actual GPU/driver/toolkit/RAM/disk first, and use a new prefix per attempt. Do not run this on the Mac. The tested environment uses Python 3.10, Torch 2.4.0/cu121, CUDA Toolkit 12.1 and Kaolin 0.17.0. Build and inference passed on the recorded RTX 3090/driver 610.62 stack; other combinations are untested. The upstream default installer uses a different CUDA combination; the research note records why this recipe selects a consistent cu121 wheel route instead. Unexpected hardware/toolkit support is a recorded failed setup, not permission to silently change pins.

These commands assume the Linux checkout is the current directory and a working `conda`, `git`, `nvidia-smi` and CUDA 12.1 `nvcc` are already on PATH. No sudo/system installation is performed by the script.

```sh
# Explicit opt-in to dependency installation AND model downloads.
bash scripts/prepare-trellis.sh --execute --download-models --prefix "$PWD/.runtime/trellis-benchmark"
```

Setup creates a separate environment, pinned upstream/extension checkouts, weights, weight-file hash manifests, `setup-report.json`, full `setup.log`, `pip-freeze.txt` and `conda-explicit.txt`. The prefix must be empty. Model downloads require the additional `--download-models` switch. Direct Python dependencies are version-pinned and extension checkouts are commit-pinned; transitive package dependencies/build tooling are not fully locked. The retained installed versions from the successful PC setup are the starting point for a complete reproducibility lock. Wheel indexes and PyPI version metadata were checked on the Mac, but no wheel/CUDA extension was installed or tested there.

## Fixed benchmark execution

The benchmark accepts only `prompt: ""`, `seed: 1`, and no fixture/boundary. Its image comes from the trusted pinned checkout, not a path supplied over HTTP. Nonempty prompts and boundary contracts fail with an honest unsupported-input report. This avoids presenting a fixed example as prompt-conditioned generation.

```sh
bench="$PWD/.runtime/trellis-benchmark"
cat > "$bench/request.json" <<'JSON'
{"id":"trellis-smoke-1","prompt":"","seed":1}
JSON

# Read-only checks with the same environment and local files used for inference.
"$bench/env/bin/python" services/gpu-worker/benchmarks/run.py --preflight \
  --trellis-root "$bench/src/TRELLIS" --weights-root "$bench/weights/trellis-image-large" \
  --dinov2-root "$bench/src/dinov2" --dinov2-weights "$bench/weights/dinov2/dinov2_vitl14_reg4_pretrain.pth"

# One heavy job at a time. Choose a NEW output directory for every run.
CUDA_VISIBLE_DEVICES=0 "$bench/env/bin/python" services/gpu-worker/benchmarks/run.py --execute \
  --trellis-root "$bench/src/TRELLIS" --weights-root "$bench/weights/trellis-image-large" \
  --dinov2-root "$bench/src/dinov2" --dinov2-weights "$bench/weights/dinov2/dinov2_vitl14_reg4_pretrain.pth" \
  --request "$bench/request.json" --output "$bench/runs/trellis-smoke-1"
```

Model loading is local: Hugging Face offline mode is set, DINO code loads from its pinned checkout with `pretrained=False`, and its recorded weights load explicitly. An image without alpha fails instead of triggering background-removal weights. Preflight verifies checkout revisions, tracked modifications, the sample hash, and all recorded weight hashes; missing checkpoint references fail before loading.

The GPU child creates temporary exports, round-trips them through PLY/GLB readers and promotes both when valid. The Gaussian exporter preserves raw finite opacity logits: the pinned upstream sigmoid/inverse-sigmoid round trip can turn large finite values into infinity. The correction and actual GPU regression are recorded in the trial report. `scene.ply` contains actual Gaussian attributes. `collider.glb` contains the raw decoded mesh after the **same** `(x,y,z) → (x,z,-y)` transform as the splats. There is no texture baking, decimation, automatic floor generation or metre-scale inference. The filename identifies its candidate role; collision quality and walkability remain unassessed.

## Existing worker command adapter

Configure `WORKER_COMMAND_JSON` as a JSON argv array of absolute paths. It is trusted local configuration. The worker appends `--request <path>` and `--output <directory>`; do not add them to this array. Generate the array without shell interpolation:

```sh
export WORKER_COMMAND_JSON="$(python3 - <<'PY'
import json
from pathlib import Path
repo = Path.cwd()
bench = repo / '.runtime/trellis-benchmark'
print(json.dumps([
    str(bench / 'env/bin/python'), str(repo / 'services/gpu-worker/benchmarks/run.py'), '--execute',
    '--trellis-root', str(bench / 'src/TRELLIS'),
    '--weights-root', str(bench / 'weights/trellis-image-large'),
    '--dinov2-root', str(bench / 'src/dinov2'),
    '--dinov2-weights', str(bench / 'weights/dinov2/dinov2_vitl14_reg4_pretrain.pth'),
]))
PY
)"
```

For the deployed appliance, retain `CUDA_HOME`, `CC`, `CXX`, `CUDAHOSTCXX`, and the CUDA toolchain plus `/usr/lib/wsl/lib` on PATH in `shared/config/worker.env`. The runner uses the separate benchmark Python executable. Optional JIT rasterization also needs the benchmark environment’s `bin` directory on PATH so Ninja is discoverable. See [the actual deployment record](research/gpu-worker-deployment.md).

Start the worker using [its documented command-mode configuration](worker.md), then submit the same JSON request through `POST /jobs` and inspect status/artifacts through the normal API. The generic adapter stores the request outside the empty output directory. It retains successful extra report files locally and keeps failed/cancelled output directories under worker `data/failures/<job-id>`; only valid PLY/GLB artifacts are exposed as success. Do not manually copy benchmark outputs into an accepted world.

## Retain appliance evidence on the Mac

The API exposes the accepted PLY/GLB. Retrieve the extra reports/logs over the verified SSH alias from [deployment.md](deployment.md). For the actual Windows SSH → WSL2 endpoint and successful job `trellis-smoke-20260915-03`, run on the Mac. Base64 preserves archive bytes across Windows PowerShell:

```sh
python3 - <<'PY'
import base64, subprocess
from pathlib import Path
remote = '''import base64, io, tarfile
p='/home/vastness/.local/share/vastness-worker/shared/data/artifacts/trellis-smoke-20260915-03'
b=io.BytesIO()
with tarfile.open(fileobj=b,mode='w:gz') as t:
 for n in ['benchmark-report.json','inference.log','metrics.json','gpu-memory.csv']:
  t.add(p+'/'+n,arcname=n)
print(base64.b64encode(b.getvalue()).decode())
'''
ps = "& wsl.exe -d Ubuntu-24.04 -u vastness --exec python3 -c '" + remote.replace("'", "''") + "'; exit $LASTEXITCODE"
encoded = base64.b64encode(ps.encode('utf-16le')).decode()
r = subprocess.run(['ssh','-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','vastness-gpu',
 'powershell.exe -NoProfile -NonInteractive -EncodedCommand '+encoded],
 capture_output=True, check=True, timeout=60)
out=Path('.runtime/benchmark-evidence/trellis-smoke-20260915-03')
out.mkdir(parents=True,exist_ok=True)
(out/'reports.tar.gz').write_bytes(base64.b64decode(r.stdout,validate=False))
PY
```

For a failed/cancelled job, use its logged `shared/data/failures/<job-id>` directory and archive the files that actually exist; a preflight failure has no inference metrics. Preserve the setup prefix's `setup-report.json`, `setup.log`, `pip-freeze.txt`, `conda-explicit.txt` and weight manifests as well. Keep raw archives locally and commit a concise measured research record linking the source SHA and job ID.

## Evidence and acceptance

Each attempt records `benchmark-report.json`, with the plan/pins, request, repository revision, preflight observations, stage, exit code, timestamps, errors and artifact hashes. Failures before CUDA keep `nvidiaExecution: not_run`; starting the GPU child changes it to `attempted`; only successful validated exports change it to `completed`. Output directories cannot overwrite earlier evidence. Process-group cancellation belongs to the worker; the runner catches termination to write its final report when time permits. Abrupt kill/power loss can leave the last in-progress report, which must not be treated as success.

`inference.log` preserves the child's complete output. `metrics.json` separates model load, generation and export/validation durations and includes PyTorch allocated/reserved peaks. `gpu-memory.csv` samples whole-device memory every 100 ms; the report gives each device's baseline/sample maximum and sample count, or null when absent. These observations include other processes and may miss brief peaks; they do not equal PyTorch allocator peaks. Keep download/setup time separate from cached inference measurements.

Ticket #11 records the completed NVIDIA execution, logs, artifact verification, GPU/runtime measurements, multi-view inspection and next-experiment decision. [The measured result](research/trellis-first-appliance-trial.md) is the acceptance evidence; plan and inventory output alone still do not establish inference. Failure/OOM is valid research evidence but does not satisfy backend-success acceptance. Browser integration, scale normalization, room generation, prompt conditioning, arbitrary-mesh collision and neighboring boundary continuity remain separate work.
