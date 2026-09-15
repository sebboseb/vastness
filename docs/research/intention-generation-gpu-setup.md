# Isolated intention generation GPU setup — 2026-09-15

The new adapter accepts the semantic envelope in `docs/specs/intention-generated-destination.md` through the existing worker command interface. It compiles arbitrary concept and axis fields into one image prompt, runs SDXL-Turbo, saves RGB plus explicit RGBA conditioning (white color matte or preserved full-frame image with a transparent border), exits that process, then runs the existing pinned TRELLIS model in a second process. The old fixed-image runner and worker stay unchanged. This generates an asset/diorama; it does not establish arbitrary walkable-room generation.

## Pins and budget

`services/gpu-worker/intention_generation/pins.json` records all image file sizes and upstream LFS SHA-256 values. SDXL-Turbo revision is `71153311d3dbb46851df1931d3ca6e939de83304`. Required fp16 files plus configs, tokenizer and license total **6,941,205,599 bytes**. The initially tried, subsequently rejected U2NetP alpha model added **4,574,861 bytes**, SHA-256 `309c8469258dda742793dce0ebea8e6dd393174f89934733ecc8b14c76f4ddd8` (also checked against rembg's upstream MD5). The current white-matte-or-full-frame-v1 alpha stage requires no additional model. No implicit model download is allowed during inference; manifests and weight hashes are checked first.

Before downloads, Windows `Get-Volume` reported E: free **1,060,855,640,064 bytes**; registry inspection confirmed Ubuntu-24.04 at `E:\Vastness\WSL\Ubuntu-24.04`. C: free was 26,443,104,256 bytes and was not selected. A 12 GiB setup allowance covers ~6.95 GB weights plus packages and temporary files. New environment, weights and reports live at `/home/vastness/.local/share/vastness-intention-models/20260915-01` in E-backed Linux home. Python 3.10.21 venv uses `--system-site-packages` from the existing benchmark environment; only diffusers 0.30.3, accelerate 0.34.2 and psutil 6.1.0 are installed in the new venv. Existing Torch 2.4.0+cu121, transformers 4.46.3, rembg 2.0.60 and onnxruntime 1.19.2 remain unmodified. TRELLIS uses its original environment.

The [SDXL-Turbo model card](https://huggingface.co/stabilityai/sdxl-turbo/tree/71153311d3dbb46851df1931d3ca6e939de83304) identifies its noncommercial community license and separate commercial terms. The pinned LICENSE.md is downloaded with the model. This is a local research experiment. [Diffusers 0.30.3 documentation](https://huggingface.co/docs/diffusers/v0.30.3/en/using-diffusers/sdxl_turbo) specifies 512×512, fp16 and guidance scale zero; this experiment uses four steps. [rembg 2.0.60 U2NetP source](https://github.com/danielgatis/rembg/blob/v2.0.60/rembg/sessions/u2netp.py) pins the upstream model download and checksum. [U-2-Net upstream](https://github.com/xuebinqin/U-2-Net) declares Apache-2.0. Existing TRELLIS/DINO/native dependency terms remain as recorded in the first appliance trial, including rasterizer restrictions.

## Reproduction and evidence

Deploy only committed Git through `scripts/deploy-worker-wsl.py` to `/home/vastness/.local/share/vastness-intention-worker`. The committed `intention_generation/serve.sh PREFIX` launches the same stdlib worker on Linux loopback **4321**, with separate shared data/config. The generic bootstrap launcher remains for port 4320 and is not used here. Model setup can be reproduced from the deployed commit with `intention_generation/prepare.py --prefix MODEL_PREFIX --base-python BENCHMARK_PREFIX/env/bin/python --download-budget-bytes 12884901888`, after checking the actual Windows backing volume.

Trusted `WORKER_COMMAND_JSON` selects the isolated venv Python and committed `intention_generation/run.py`, with operator-owned arguments for image weights, original TRELLIS Python/source/weights, DINO source/weights. HTTP supplies only `id`, `seed`, and the typed JSON envelope in `prompt`; no request may select paths or model executables. Worker concurrency is one; the old worker must remain idle during these jobs.

Each output retains `request.json`, `image-prompt.txt`, `source-rgb.png`, `source-rgba.png`, both stage logs and metrics, 100 ms whole-device memory samples, and `generation-report.json` with Git/model/package identities and SHA-256 outputs. Prompt truncation at CLIP's token limit is reported. Original human input remains on the Mac and does not cross this boundary. Failed outputs remain in the worker's failures directory. Genuine PLY and raw mesh GLB preserve the working finite-opacity fix, Y-up rotation and export round-trip checks; scale is explicitly unknown until artifact preparation.

CPU verification: four contract tests cover arbitrary semantics, rejecting unsupported fields/raw text, retained failure diagnostics without importing GPU libraries, and nonsemantic white-matte behavior. GPU and HTTP acceptance are recorded below.


## First smoke and rejected alpha policy

Job `intention-gpu-smoke-20260915-01`, seed 42 and concept “single pale stone arch above a still lake”, completed both CUDA stages at commit `988c7607c82ea04c934d9fbd95853af0fd754ea1`. It produced structurally valid PLY (311,168 Gaussians) and GLB (481,220 triangles) in 167.15 s including cold preflight. SDXL used 45/77 tokens without truncation; image allocated peak was 8,287,861,760 bytes, TRELLIS 10,771,615,744 bytes; sampled whole-device peak was 13,902 MiB. The API success is only a mechanical result: visual inspection found that U2NetP had selected the pale arch opening/water and removed most of the arch. This is a **semantic quality failure**, preserved in its original immutable output directory and Mac `.runtime/intention-generation/smoke-evidence`.

The replacement alpha policy is uniform `white-matte-v1`: near-white pixels with all RGB channels ≥236 become transparent; pixels with any channel ≤224 remain opaque, with linear interpolation between. It preserves colored/darker surfaces without selecting a semantic object. It can erase pale highlights and cannot remove a nonwhite backdrop; both limitations are explicit and source RGB stays intact. No phrase-specific branch, substitute geometry or new model is involved. The test case is rerun unchanged to assess this preprocessing correction.

## Isolated connection

The existing Windows SSH `Match User sebas` now permits exactly `127.0.0.1:4320` and `127.0.0.1:4321`. Backup: `C:\ProgramData\ssh\sshd_config.intention-20260915221804.bak`. `sshd -t` passed before restart. No wildcard listener, firewall rule or port proxy was added. Mac forwarding uses `ssh -o BatchMode=yes -o StrictHostKeyChecking=yes -o ExitOnForwardFailure=yes -N -L 127.0.0.1:14321:127.0.0.1:4321 vastness-gpu`.

A detached startup initially vanished while WSL's user session was still starting. Keep the worker in a persistent foreground SSH command: `ssh -o BatchMode=yes -o StrictHostKeyChecking=yes vastness-gpu "wsl -d Ubuntu-24.04 -u vastness --exec bash /home/vastness/.local/share/vastness-intention-worker/current/repo/services/gpu-worker/intention_generation/serve.sh /home/vastness/.local/share/vastness-intention-worker"`. The Mac `/version` endpoint was verified against the actual deployed Git commit. The existing port 4320 user service starts separately and was not modified.


## Corrected smoke — ready for browser trials

`intention-gpu-smoke-20260915-02` ran the identical semantic envelope, prompt and seed 42 on committed product code `09412b7871e49d040dba5b0a2b002930258a4b09`. The source RGB hash is identical to smoke01 (`bca5c378f0bd6282ddb500ac968a44fca6cf78f37502f6cc7281dec4f88bf835`); only preprocessing changed. The corrected RGBA retains the arch, with opaque foreground fraction 0.6862. SDXL still used 45/77 tokens with no truncation. The two serial CUDA stages and artifact validation succeeded in **63.1347 s** including preflight; warm filesystem pages make this different from the first cold run.

Image load/generation/matte were 2.4750/1.5907/0.3333 s; TRELLIS load/generation/export-validation were 25.6412/6.5597/8.2423 s. Peak allocated memory was 8,288,533,504 bytes for SDXL and 10,878,150,656 bytes for TRELLIS. Output contains 357,920 Gaussians and a raw mesh with 350,326 vertices / 700,610 triangles. Actual HTTP downloads matched both worker manifest and generation-report hashes:

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| scene.ply | 24,338,976 | d0802e86703f5a63f429865cdfb659bce8fc3a5066f86c1797a8da1cd2798975 |
| collider.glb | 12,612,036 | c1d4d2ff93c82f36ada3cda9e2b40bbbc97c97a79a94e8201c1aa1a43f500aa2 |

Full verified evidence is `.runtime/intention-generation/smoke-02-verified` on the Mac and `shared/data/artifacts/intention-gpu-smoke-20260915-02` in the isolated worker prefix. Structural validation does not establish that the arch itself is traversable: browser preparation and movement acceptance remain separate. This established a mechanical baseline, later superseded by the general full-frame fallback below.

Verification: **39 Python worker tests passed, with two GPU-only regression tests skipped on the Mac**. The real smoke executed CUDA and actual export validation separately. Original worker port 4320, M0 state and benchmark runner remain unchanged.

## Collect any completed trial

From any checkout containing this adapter (including the Mac prototype checkout):

```sh
python3 services/gpu-worker/intention_generation/collect_evidence.py \
  --job JOB_ID --output .runtime/intention-generation/evidence/JOB_ID
```

The collector uses the existing encoded WSL deployment transport with strict SSH host verification, copies final report/image/log files, verifies transfer hashes, and downloads PLY/GLB from `http://127.0.0.1:14321`. Artifact hashes must agree with both manifest and report. It refuses to overwrite different existing evidence, and it collects failed-job reports without claiming artifact success. `--worker-url`, `--host`, and `--prefix` are trusted operator overrides. The collector was tested against smoke02's real HTTP artifacts.

## Restart without a tool-owned terminal

Keep the existing service if `/version` is healthy. When deliberately restarting, first stop only the dedicated port 4321 worker/SSH connection and its port 14321 tunnel; never stop the original port 4320 service. The following Mac Python recipe creates independent background SSH processes with retained PIDs and logs. The remote worker remains a foreground WSL command, avoiding the detached-child lifetime problem seen during initial boot.

```python
from pathlib import Path
import subprocess
runtime = Path('.runtime/intention-generation')
runtime.mkdir(parents=True, exist_ok=True)
common = ['ssh', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes']
commands = {
    'worker-ssh': common + ['vastness-gpu', 'wsl -d Ubuntu-24.04 -u vastness --exec bash /home/vastness/.local/share/vastness-intention-worker/current/repo/services/gpu-worker/intention_generation/serve.sh /home/vastness/.local/share/vastness-intention-worker'],
    'worker-tunnel': common + ['-o', 'ExitOnForwardFailure=yes', '-N', '-L', '127.0.0.1:14321:127.0.0.1:4321', 'vastness-gpu'],
}
for name, command in commands.items():
    log = (runtime / (name + '.log')).open('ab')
    process = subprocess.Popen(command, stdin=subprocess.DEVNULL, stdout=log,
                               stderr=log, start_new_session=True)
    (runtime / (name + '.pid')).write_text(str(process.pid))
```

Verify `curl --fail http://127.0.0.1:14321/version` after startup and check the expected Git commit before submitting a job. WSL may take time to finish its user-session startup after a cold boot; a process launch alone is not proof of readiness. Model/data directories persist independently of these SSH processes.


## Dense-scene failure and final general fallback

The first browser garden attempt `intent-fb4bb474-3e58-4172-99e1-d8876313a33c` generated an appropriate image of giant mushrooms and intertwined roots, but SDXL ignored the white-backdrop request. With 0.999954 foreground fraction, the old upper guard rejected this valid full-frame reference before TRELLIS. Its RGB/log/report remain under the worker's failures directory and `.runtime/intention-generation/evidence/trial2`. This failure is not deleted or relabeled as success.

Final `sdxl-turbo-trellis-intention-v3` uniformly applies `white-matte-or-full-frame-v1`: use the existing color matte when it isolates background, otherwise retain every original RGB pixel for an unsegmented full-frame reference when matte foreground fraction is ≥0.98. A 16-pixel transparent border on all sides ensures TRELLIS recognizes explicitly supplied alpha and never downloads/runs an implicit rembg model. Reports identify `conditioningMode`, source matte fraction, padded size and the fact that a retained nonwhite background may become generated geometry. ≤0.01 foreground still fails; RGB, RGBA and image metrics are now written before that guard so diagnostic evidence survives. There is no phrase-specific branch or replacement asset.

All three original sentences were rerun with seed 42 through this one final committed pipeline. Earlier attempts remain evidence of the two failed preprocessing policies. Six focused CPU tests now include exact RGB preservation and explicit transparent-border checks using Pillow in the prepared environment; the Mac skips the two Pillow-dependent cases if Pillow is unavailable.


## Final three-input GPU comparison

All three browser-submitted inputs completed genuine CUDA SDXL → TRELLIS generation with the **same code `04986defd1de38609cfb69c8d6c78ae4704e5670`**, pinned model/dependency identities above, and seed 42. The worker remained serial throughout. No fixtures or phrase-specific asset selection were used. These are runner wall durations, not Mac/browser end-to-end latency.

| Input | Worker job | Runner seconds | Prompt tokens | Conditioning mode | Gaussians | Raw mesh triangles | Sampled device peak MiB |
| --- | --- | ---: | ---: | --- | ---: | ---: | ---: |
| 1 | `intent-627a51e4-fb55-44a6-9e35-b795fba1b82b` | 221.7049 | 55/77 | white-matte | 643,456 | 1,185,258 | 16,629 |
| 2 | `intent-4b29932c-114d-4673-89f3-fa15e3f895a4` | 75.6528 | 48/77 | unsegmented-full-frame | 692,736 | 832,224 | 17,029 |
| 3 | `intent-096c4d7e-3213-4bd4-af72-40ca7630a010` | 119.4169 | 50/77 | unsegmented-full-frame | 2,165,184 | 3,005,700 | 24,233 |

Input 1 asks for an enormous, quiet pale arch over still water; input 2 a dense garden of glowing mushrooms and twisted roots; input 3 a compact, ominous enclosed red-crystal chamber. All image prompts fit within the 77-token limit. The reference images are visibly different and correspond to those concepts; geometry/rendered semantic fidelity and navigation are assessed separately in the parent experiment. Full-frame conditioning explicitly preserves background that may become geometry.

Comparison 1 followed a cold WSL startup: image child wall 33.27 s and TRELLIS child wall 98.80 s (49.19 s model load,10.38 s inference,15.37 s export/validation), with 89.63 s remaining parent/preflight/hash overhead. A post-completion check found 31 GiB guest RAM and zero cumulative `pswpin`/`pswpout` since boot, so the slow run was not swap thrashing. Warm later runs are not an estimate of fresh-machine latency, and these different inputs are not a controlled latency distribution.

Comparison 3 exercised the machine's capacity: TRELLIS peak allocated 17,974,806,016 bytes, reserved 25,358,761,984 bytes; whole-device sampled peak 24,233 of 24,576 MiB. No OOM occurred, but 343 MiB sampled headroom is small and brief peaks can be missed. It produced 147,232,929-byte PLY and 54,111,208-byte GLB, exceeding the Mac prototype's initial preparation bounds. That downstream validation failure was retained. A measured validation retry against the identical bytes then passed: 5.77 seconds, 679 MiB peak Mac resident memory, 126,551 display triangles and 2,093 collider boxes. Browser crossing, circuit, return and restart also passed, without another GPU job or weakening the worker's finite/nonempty export checks. See the parent research report for the bounded navigation claim.

Every report, source RGB/RGBA, prompt, log, memory sample and both artifacts was collected to Mac `.runtime/intention-generation/evidence/comparison1`, `comparison2`, and `comparison3`. The collector verified HTTP download sizes/SHA-256 against both worker manifests and generation reports. Original worker output directories persist under the matching job IDs. The parent research report selects small evidence files and records final browser acceptance; this setup note makes no claim that the model generated a guaranteed navigable room.

Final validation: `npm run check` passed typecheck, 21 tests and production build on the worker branch. Python discovery ran 41 tests: 37 passed and 4 skipped on Mac (two GPU regressions and two Pillow cases); all 6 focused contract/Pillow tests passed inside the prepared worker environment. Service `/version` at Mac loopback 14321 confirmed the deployed 04986de commit. Independent Mac SSH worker/tunnel processes and logs/PIDs under `.runtime/intention-generation` keep the service available after tool sessions finish. All product deployment remains from committed Git; the final documentation/collector commits need not change the running inference release.
