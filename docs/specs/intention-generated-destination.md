# Isolated intention-generated destination experiment

Question: can the player ask for something not pre-scripted, then physically enter what the pipeline creates? Preserve M0 and existing M1 pages, scripts, state and artifacts unchanged. New page intention-generation.html; new prototype service loopback 4311, browser 5175. Runtime storage .runtime/intention-generation/worlds and content-addressed objects. No production protocol migration.

Persist original input separately from a small SemanticIntent, derived by an explicitly versioned deterministic text normalizer/axis extractor. It accepts arbitrary bounded concepts rather than classifying into fixed destinations; unfamiliar descriptions remain in a normalized concept field. This is a limited compiler, not claimed general language understanding. Intent input adapter accepts {text,source:'text'} initially and can later accept transcribed voice without changing generation. The original sentence stays in the Mac world record; only compiled semantics cross the worker boundary.

Pinned worker envelope: existing WorkerJobRequest {id,seed,prompt}, where prompt is JSON serialized exactly as {version:1,kind:'intention-destination',concept:string,axes:{scale:'intimate'|'human'|'vast',density:'sparse'|'balanced'|'dense',mood:string,openness:'enclosed'|'mixed'|'open'},representation:'abstract-solid'}. Concept max600 chars, mood max80; no filesystem/model paths from requests. This existing string transport carries a typed semantic envelope, not raw original intent. Worker validates it and compiles one image prompt; text-to-image and TRELLIS run serially on the GPU, recording prompt, seed, pinned model/code identities, input image, timings and VRAM. Artifact contract remains genuine scene.ply + collider.glb. Supplementary reports/source image remain in job output for research. Do not modify old benchmark runner or its fixed input.

Worker agent owns only services/gpu-worker/intention_generation/** and its notes; use existing worker.py command backend with a separate data/config prefix and loopback service where possible. Geometry agent owns only scripts/prepare-intention-artifact.ts and its tests, importing unmodified M1 geometry functions if useful. Lead owns new Mac service, semantic contract, browser page/runtime/config, research integration and tracker. Shared output geometry shape matches existing PreparedScene with honest dynamic sources. Artifact preparation verifies manifest hashes and scale/bounds, derives collision from actual returned mesh, places one generated result at [0,0,-21], validates an approach/return path in authored support space; explicitly label floor/seam as authored. Do not fabricate a room or remove collision to hide bad geometry.

World lifecycle records requested → generating → processing → ready/failed plus crossed/returned events; portal blocks until both imported artifact validation and browser rendering are ready. Persist input, semantics, request, job id, manifest, derived scene and visit history. Returning/reload reuse the same accepted artifacts. Failure keeps the seam closed and preserves diagnostics. Heavy jobs exactly one at a time. At least three substantially different free-form inputs use the identical pipeline and seed for a controlled qualitative comparison; the semantic compiler must not contain those three test phrases as destinations or fixtures.

Acceptance includes actual browser approach/input/submission/polling, real RTX 3090 job reports, SHA-verified artifacts, meaningful geometry/movement tests, crossing/return/reload, measured semantic fidelity/failures and original-versus-abstract inspection. Keep all runtime work on the isolated prototype branch. Integration receives research/spec/evidence only. No UI polish or permanent gameplay/art decision.

## Mac/browser seam

The isolated service is `services/intention-prototype/server.ts`, bound to `127.0.0.1:4311`.

| Route | Behavior |
| --- | --- |
| GET `/api/intent/worlds` | Saved world records, newest first |
| POST `/api/intent/worlds` | Accept `{text, source: 'text'}`; persist before GPU submission; return 202 |
| GET `/api/intent/worlds/:id` | Original intent, semantics, status, provenance and events |
| GET `/api/intent/worlds/:id/scene` | Prepared geometry, available only after validation |
| POST `/api/intent/worlds/:id/visit` | Record crossing or return with world position and a stable retry identity |
| POST `/api/intent/worlds/:id/retry-validation` | Retry a failed validation against the same successful GPU job and saved hashes; never regenerate |
| GET `/api/intent/artifacts/:sha/:filename` | Hash-verified accepted PLY/GLB bytes |

The worker origin comes from `INTENTION_WORKER_URL`, defaulting to `http://127.0.0.1:14321`; browser input cannot choose it. Imported artifact URLs use the isolated `/api/intent/artifacts` prefix.

A world record contains `id`, `createdAt`, `rawIntent`, `semantics`, `derivation`, `status`, `jobId`, `request`, `events`, and optional `workerJob`, `artifacts`, `sceneUrl` and `error`. The original sentence remains on the Mac. A new trial creates a new ID. Existing destinations remain selectable through secondary developer controls. Restart resumes active jobs and reuses ready worlds without generation. A transport interruption remains resumable; a terminal GPU or validation failure keeps the gate closed.

The browser owns only the new `intention-generation.html`, `src/intention-generation/**` and `vite.intention-generation.config.ts`. It can import existing M1 helpers without modifying them. `npm run intention` starts the Mac service and Vite on port 5175; `npm run check:intention` runs existing checks plus the isolated checks/build.

The authored threshold is at z=-12. The source floor spans z=-12..8; the destination floor spans z=-31..-12. Geometry preparation publishes `scene.validation`, including placement, collision room and verified route. Generated collision boxes receive the same placement as the visual mesh. The eye height remains 1.65 m, player radius 0.3 m. The gate opens only after both server validation and browser rendering succeed.

The browser records actual movement crossings. Secondary approach/circuit/return controls drive the same collision-constrained movement function as keyboard input. DOM telemetry exposes pose, overlaps, gate state, loaded geometry and visit persistence for acceptance checks. A small `InputSource` adapter submits text today and can later accept transcribed voice. Abstract solid is the default; the original splat remains available for comparison. The authored floor and perimeter route do not establish that generated interiors, stairs or slopes are navigable.
