# Declared generated-passage candidate batch — 2026-09-16

This batch tests whether the existing prompt-image-TRELLIS pipeline produces actual floor support and free passage volume. The source renderer and existing authored-support prototype do not prove that property. Geometry assessment uses `docs/specs/generated-passage.md` and remains independent of GPU/export success.

The unchanged live worker must identify commit `04986defd1de38609cfb69c8d6c78ae4704e5670`. Its pinned SDXL-Turbo/TRELLIS models, four image steps, 12-step TRELLIS samplers, alpha policy and “sculptural architectural diorama” prompt suffix remain exactly as documented in `intention-generation-gpu-setup.md`. Seed 42 is fixed by the existing Mac intention service. No model downloads, worker code edits, alternative models or candidate-specific collider edits are included.

The entire declared batch is:

1. **Arch:** A wide stone arch doorway with attached continuous flat stone floor through the opening. Empty human passage, clear headroom, no central object, no steps.
2. **Tunnel:** A wide short open-ended stone tunnel with a continuous flat floor through both openings. Empty human passage, clear headroom, no central object, no steps.
3. **Courtyard:** An open courtyard with surrounding stone walls, a broad empty doorway and a continuous flat floor through it. Clear human passage and headroom, no central object, no steps.

The runner `scripts/run-passage-candidates.py` prints the declared batch by default. `--execute --runtime-repo /absolute/prototype/checkout --output /absolute/.runtime/generated-passage/candidates` submits each free-form sentence through `POST /api/intent/worlds`, which persists original text and compiled semantic axes. It waits for the GPU result before starting another candidate, collects reports/images and hash-verified PLY/GLB, and saves the Mac world independently of the later generated-support verdict. `--candidate arch|tunnel|courtyard` permits serial operator stepping through the same declared batch. A resumed run reuses saved world/job IDs, including failed results; it does not fish for replacements.

At initial inspection the remote worker was already healthy at the pinned commit. The Mac tunnel 14321 and intention service 4311 had stopped. Only those Mac processes were restored, with health and live `/version` verified; the remote worker, original 4320 service and PC were not restarted. Logs/PIDs are under `.runtime/generated-passage`. The restored SSH tunnel uses keepalive 30s and the existing verified host key and restricted loopback forwarding.

## Execution and evidence

The CPU preflight used the existing Mac semantic compiler and the actual pinned CLIP tokenizer: arch 67, tunnel 69 and courtyard 71 tokens, including axes and the unchanged image prompt suffix, against the 77-token limit. The raw and compiled requests are retained with each candidate; no phrase-specific processing was added.

Runner commit `1a8926f` passed `python3 -m py_compile`, its print-only plan and `npm run check`. A concurrent invocation during the first real job failed its batch lock without adding a world. After all three completed, resuming the whole batch returned the three original job IDs as reused and launched no inference. Artifacts live outside Git under `.runtime/generated-passage/candidates/{arch,tunnel,courtyard}` in the main checkout. Each directory holds `candidate.json`, submitted/final world snapshots, worker identity/job, `generation-report.json`, source RGB/RGBA, prompts, child logs and sampled GPU memory, plus original `scene.ply` and `collider.glb`. Collection verifies both artifact bytes and SHA-256 against worker manifest and generation report.

| Candidate | World/job ID | GPU wall | Image child / TRELLIS child | Sampled device peak | Gaussians / raw triangles |
| --- | --- | --- | --- | --- | --- |
| Arch | `intent-e44e1be5-6a27-4437-be52-5851aa6945ef` |179.59s|18.92s /92.72s|20,598MiB|1,149,280 /2,125,234|
| Tunnel | `intent-dac5feaf-60b5-4aa9-990b-1d02d749e686` |69.33s|8.41s /53.81s|16,937MiB|485,536 /664,376|
| Courtyard | `intent-885b00f4-d697-47ac-98e5-84714bdd2210` |76.83s|7.89s /60.94s|18,132MiB|772,640 /1,431,264|

Wall time includes weight-integrity preflight and orchestration outside the two child durations. The GPU peak is whole-device usage sampled every 100ms, including other processes; it is not a guaranteed instantaneous peak. All candidates use the same original artifacts for geometry assessment. A legacy Mac `ready` result includes authored support and is expressly **not** a generated-passage pass.

The arch RGB shows recognizable stone masonry and a broad arch above a continuous visible pale floor. However, a pale wall appears beyond the opening, with a small dark rectangular doorway farther away: the image does not clearly depict an unobstructed through-opening. Alpha preserved the unsegmented full frame (99.707% matte foreground before transparent padding); that pale background can become mesh geometry. Actual 67-token conditioning was not truncated. Independent triangle support/free-space assessment is pending.

The tunnel RGB depicts a continuous pale floor, stone corridor walls, a broad ceiling and a bright arch opening at the far end. It also includes an unwanted standing person near that opening despite the empty-passage instruction. Full-frame conditioning retained the whole image (98.403% matte foreground); all 69 tokens were retained. No person removal, collider deletion or replacement generation was performed. Independent generated-support assessment is pending.

The courtyard RGB depicts a skylit stone chamber with a broad continuous visible pale floor, large lateral openings, a solid back wall and another unwanted standing person. RGBA inspection shows the walls and floor retained with transparent outer padding; white-matte mode removed about 3.096% of the original frame. All 71 tokens were retained. The image meets some requested layout properties but does not establish a through-route; no image or mesh was repaired.

All three GPU runs actually executed on 2026-09-16, in this declared order, and completed without OOM or export failure. All report the same deployed worker Git commit and pinned model identities. The first run had 67.95s outside the two child durations, versus 7.11s and 8.00s for later runs; these differences include read/hash preflight and orchestration and must not be presented as model-only inference time. No swap or cold-cache causal diagnosis was measured for this batch. The GPU is released after these three jobs. All three source images were inspected; original PLY/GLB were handed to the independent geometry assessment, whose verdict is pending in this report.

## Original artifact identities

| Candidate | Artifact | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| Arch | `scene.ply` | 78,151,457 | `048442ea6b98bcb58d2115c90e552dfa54d15b7f43569a3d3447d49aa31b5a4a` |
| Arch | `collider.glb` | 38,281,240 | `caab9c299983c56f96e4c8eda324f976624914fe70de61b36e5c03fb91dcf811` |
| Tunnel | `scene.ply` | 33,016,864 | `950049eb70df799c1e960e16d7afa477e8dabddacf287d3ae3e52c04fbdb0e9f` |
| Tunnel | `collider.glb` | 11,962,320 | `bc5a2f21fc24dc7aaf20db120167f69fe3788588fd8848586d50b3c778eb5472` |
| Courtyard | `scene.ply` | 52,539,936 | `7136e4f9ca582966b99814550b42b17e70e7beb9cf2b116f940e437948c3512b` |
| Courtyard | `collider.glb` | 25,777,324 | `a4bfd87d64cf98a5895d2536b89d14a162c26a527432df3d782a00d891919eb0` |

These are the unchanged generated outputs. The later geometry experiment may apply only the specification's declared rigid orientation and uniform scale; that experiment must retain its own transformation and route evidence. GPU/export success and a plausible source image alone do not satisfy the passage requirement.

If all three varied candidates fail the genuine support/free-space requirement, the batch stops; scene-first alternatives require a separately coordinated benchmark and storage budget.
