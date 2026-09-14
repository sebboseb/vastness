# Milestone Zero validation

Date: 2026-09-14. Product code verified at `4cc17b1` on `codex/integration`.

## Environment and commands

Mac: macOS 26.5.1 (25F80), arm64. Node 22.23.1, PlayCanvas 2.22.1, Vite 7.3.6, TypeScript 5.9.2. Python worker tests use local Python 3.14.6; CI uses Python 3.11 and Node 22 on Ubuntu.

`npm run fixtures` produced arrival with 57,064 Gaussian records and observatory with 56,772. Each is an authored binary little endian PLY with an independently loaded GLB collider. Both full served file hashes matched their manifests. They are deterministic fixtures, not AI output.

`npm run check`: typecheck, all **13 TypeScript tests**, production build passed. `python3 -m unittest discover -s services/gpu-worker -p 'test_*.py'`: **10 tests passed**. [GitHub CI at the verified code commit](https://github.com/sebboseb/vastness/actions/runs/34884715521) passed. The initial scaffold CI failure (before the fixture writer existed) remains in history; it was not concealed.

## Live browser acceptance

Used the Codex in-app browser at `http://127.0.0.1:5173`, loading the real local HTTP API and assets. The visible walking-assist buttons invoke the same per-frame movement, collision and proximity code as WASD; no teleportation or application-state injection was used for traversal.

1. Loaded arrival at `[0,1.65,5]`; observatory initially waiting. Rendered real station splats and GLB collider bounds.
2. Walked north; observatory asynchronously changed to ready and the player crossed into it. Both chunks remained ready, with stable world ID `e651eff8-aaa5-48ee-822c-7c47d5fd1aa8`.
3. Continued into the observatory end wall. Position stopped at Z `-26.59` despite sustained forward movement, consistent with its imported GLB wall and 0.3m radius.
4. Walked back to arrival without reloading the page. Both chunks stayed loaded. Repeated A→B→A in the final build: observatory at Z `-18.67`, then arrival at Z `1.68`.
5. Explicit turn-around check: in observatory, three mouse drags changed visible yaw to `-180°`; walking **forward** then returned through the portal to arrival at Z `1.82`. This verifies camera-independent spatial continuity, not merely reverse translation.
6. Stopped and restarted the complete Mac service pair. HTTP comparison against the initial world proved identical world ID, topology and artifact records. Browser reloaded the saved observatory pose at Z `-26.59`, rather than the initial spawn. Final pose remains saved in arrival.
7. Embedded-browser pointer lock was refused. The app now enters first-person mode with drag-to-look, WASD bindings and arrow look fallback; mouse dragging and the shared walking loop were exercised live. Native pointer lock and sustained physical WASD key holds were not independently automated on a second browser. The normal pointer-lock branch remains available where supported.

[Verified station preview](m0-preview.png)

## Failure restoration regression

Both independent reviewers identified a saved player already overlapping the temporary portal gate. If the neighboring room failed, the old startup enabled movement from inside that gate.

Fixed by requiring the nearby neighbor to finish restoring before enabling initial movement. Verified with a separate disposable world and HTTP service on `4311`, browser origin `5174`, to avoid existing browser artifact cache. Seeded its pose through the public player API to `[0,1.65,-9.1]`, and temporarily renamed its accepted arrival PLY (main world data untouched). The browser displayed `arrival: failed · observatory: ready`, the safe restore error, and disabled Enter/forward/backward controls. Restoring the file and clicking Retry restored both rooms, the same world ID and the exact saved pose. Temporary services and test tab were stopped afterward; records remain under ignored `.runtime/failure-qa` for reproduction.

## Save-order regression

A periodic pose request and an exit keepalive request can arrive out of order. A public HTTP regression failed before the fix, then passed with SQLite ordering metadata that atomically ignores stale pose timestamps even after restart. Browser pending-request accounting also preserves an exit write when returning to an already-saved location while another write is pending.

## Independent review

Standards and Spec reviews ran separately against completed backend/worker code and then the browser addition. Both found the failed-restored-seam issue; Standards also found save ordering and its return-to-saved-position edge. All were fixed and re-reviewed. Final unresolved findings: **0 Standards, 0 Spec**.

## Worker and remaining boundary

The Python worker ran locally on `127.0.0.1:4320`. Submitted an observatory job with a boundary contract, polled it to success, validated job/manifest responses using the shared Zod schemas, downloaded its 3,179,644-byte PLY and 1,636-byte GLB, and verified both SHA-256 hashes. Fake mode copies fixtures and does not use prompt/seed/boundary to synthesize content. The orchestrator still serves accepted static fixtures directly; routing dynamic generation through worker jobs is the next product slice.

The PC resolves locally but SSH times out before authentication. No remote worker deployment, GPU inventory, model installation, generation benchmark, AI-generated chunk or boundary-conditioned generation is claimed. See `gpu-connectivity.md` and GitHub #6. Model research/selection waits for measured capability on that machine.

## Known prototype limits

Flat floors, axis-aligned GLB box collision, two rooms, single local player and a roughly 2MB minified renderer bundle. No arbitrary mesh/stair physics or photorealistic fixture-quality claim. Heavy artifacts are local runtime data; back up `.runtime` and `artifacts` together. No world-reset command deletes existing user state.
