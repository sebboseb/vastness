## Parent
#7

## What to build
Prepare the pinned original TRELLIS image-to-3D benchmark launcher, environment setup recipe and result-recording harness on the Mac. Use a fixed official example image and exact source/model/DINO revisions. Preserve upstream outputs honestly, export a visual PLY and raw mesh proxy GLB in the same coordinate frame, retain logs/failures/timing/VRAM observations and mark inference not run until executed. Unit-test preparation/reporting paths without importing CUDA packages. This is benchmark preparation, not acceptance of a walkable room or permanent model selection.

## Acceptance criteria
- [x] Reproducible commands and exact provenance documented.
- [x] CPU-only preparation and failure/reporting tests pass.
- [x] Execution ticket #11 lists the prepared command and required real measurements.

## Blocked by
None.

## Delivery evidence
Implemented and verified on Mac/CPU; see `docs/research/gpu-worker-readiness-validation.md`. Actual appliance execution remains in #6 and #11.
