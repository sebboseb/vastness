# Declared generated-passage candidate batch — 2026-09-16

This batch tests whether the existing prompt-image-TRELLIS pipeline produces actual floor support and free passage volume. The source renderer and existing authored-support prototype do not prove that property. Geometry assessment uses `docs/specs/generated-passage.md` and remains independent of GPU/export success.

The unchanged live worker must identify commit `04986defd1de38609cfb69c8d6c78ae4704e5670`. Its pinned SDXL-Turbo/TRELLIS models, four image steps, 12-step TRELLIS samplers, alpha policy and “sculptural architectural diorama” prompt suffix remain exactly as documented in `intention-generation-gpu-setup.md`. Seed42 is fixed by the existing Mac intention service. No model downloads, worker code edits, alternative models or candidate-specific collider edits are included.

The entire declared batch is:

1. **Arch:** A wide stone arch doorway with attached continuous flat stone floor through the opening. Empty human passage, clear headroom, no central object, no steps.
2. **Tunnel:** A wide short open-ended stone tunnel with a continuous flat floor through both openings. Empty human passage, clear headroom, no central object, no steps.
3. **Courtyard:** An open courtyard with surrounding stone walls, a broad empty doorway and a continuous flat floor through it. Clear human passage and headroom, no central object, no steps.

The runner `scripts/run-passage-candidates.py` prints the declared batch by default. `--execute --runtime-repo /absolute/prototype/checkout --output /absolute/.runtime/generated-passage/candidates` submits each free-form sentence through `POST /api/intent/worlds`, which persists original text and compiled semantic axes. It waits for the GPU result before starting another candidate, collects reports/images and hash-verified PLY/GLB, and saves the Mac world independently of the later generated-support verdict. `--candidate arch|tunnel|courtyard` permits serial operator stepping through the same declared batch. A resumed run reuses saved world/job IDs, including failed results; it does not fish for replacements.

At initial inspection the remote worker was already healthy at the pinned commit. The Mac tunnel14321 and intention service4311 had stopped. Only those Mac processes were restored, with health and live `/version` verified; the remote worker, original4320 service and PC were not restarted. Logs/PIDs are under `.runtime/generated-passage`. The restored SSH tunnel uses keepalive30s and the existing verified host key and restricted loopback forwarding.

Results, source-image inspection and geometry handoff will be recorded below after actual runs. If all three varied candidates fail the genuine support/free-space requirement, the batch stops; scene-first alternatives require a separately coordinated benchmark and storage budget.
