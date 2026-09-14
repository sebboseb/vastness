# GPU worker preparation validation

Date: 2026-09-14. This delivery prepares the Mac and a deployable Linux worker. **No PC deployment, NVIDIA inference, GPU timing, measured PC VRAM, or generated room is claimed.** The execution record remains `not_run`.

## Delivered boundary

The worker selects fixture or trusted external-command adapters at launch. HTTP callers cannot choose executable code. Jobs remain serial, cancellation/timeouts terminate process groups, partial outputs are not published, and completed jobs survive restart/backend changes. The shared capability schema distinguishes GPU inventory, driver-supported CUDA, installed toolkit and optional PyTorch inspection. Unknown values remain null.

The Mac submits, polls, cancels and imports through the configured worker origin. Accepted artifact bytes have verified hashes/sizes and nonempty format headers, use local immutable URLs, and survive an offline restart. Concurrent identical submissions share one operation; conflicting identities cannot replace existing provenance. Benchmark imports do not change the saved M0 world.

Linux deployment uses a bundle from an exact Git commit, detached release checkout, separate environment, persistent shared state/configuration and an atomic current link. Bootstrap does not install drivers/models or start a service. The SSH instructions require an independently verified Linux endpoint and host key. Windows PowerShell is not treated as Linux.

The first prepared benchmark is pinned original TRELLIS, using a fixed official RGBA image and seed. Its setup and runner default to plans, require explicit Linux execution, preserve failures and version/hash evidence, and export Gaussian PLY plus a mesh proxy in the same coordinates. Text prompting, portal conditioning, metre scale and walkability remain unsupported/unmeasured for this case.

## Verification evidence

- `npm run check`: typecheck, 21 TypeScript tests and production build passed. Worker/benchmark unittest suite: 32 passed (including 10 benchmark cases). Mac bootstrap suite: 2 passed, 4 Linux-only cases skipped; all 6 passed on Linux. The transport regression also passed repeated Node 22 runs, and the full TypeScript check passed Node 26. The existing bundle-size build warning remains non-fatal.

- The live Mac smoke submitted `mac-smoke-1789420573086`, completed the fixture job, imported and rehashed its local PLY and GLB. The PLY was 3,179,644 bytes, SHA-256 `f8ce312b7eb1c9437bf53bcdbbe33e0feae4cb16a2219a7d883f7ea8c591ffcb`; GLB was 1,636 bytes, SHA-256 `e55dad0ba416d0613b24564ed9e47d02d53d99f2a0f5219db90633907c317b66`.
- Restarting the configured Mac service and worker preserved world `e651eff8-aaa5-48ee-822c-7c47d5fd1aa8` byte-for-byte through its API, including player position/topology. Runtime smoke evidence is `.runtime/worker-smoke.json` (local, ignored by Git).
- All six bootstrap acceptance tests passed in official `python:3.11-slim`, Debian 13.6, Linux `6.12.76-linuxkit`, aarch64, Python 3.11.16, as unprivileged `nobody`. The tested integration SHA was `682f278e04f17f6806b2b0c98a8bf7ae7f8ec375`. Tests include repeat deployment, environment/config preservation, worker restart/upgrade with original artifacts, invalid/dirty releases and quoted SSH transport. Transport is emulated; this is not evidence of PC connectivity.
- Plan and preflight commands ran on the Mac without Torch/model imports, package installs, weight downloads or NVIDIA execution. Mac inventory reports NVIDIA tools unavailable and PyTorch not checked.
- A full-suite failure was traced to Node 22 fetch/Undici asserting on HTTP/1.0 EOF under download backpressure. The worker client now uses core HTTP/HTTPS streams. A minimal regression failed before the change; slow-download and total-body-deadline coverage verify the replacement.
- Independent Standards and Spec reviews found and prompted fixes for header-only artifact acceptance, concurrent-submission provenance loss, and missing prerequisite-failure setup reports. Regression coverage exercises these boundaries.

## Remaining external dependency

[Connect the NVIDIA appliance (#6)](https://github.com/sebboseb/vastness/issues/6) remains unresolved. Once reachable, [execute the pinned benchmark (#11)](https://github.com/sebboseb/vastness/issues/11) carries the exact experiment and acceptance criteria. The proposed CUDA environment and real model runtime must still be installed and tested on that appliance. A failed build/OOM is evidence to record, not successful GPU validation.

See [deployment](../deployment.md), [Mac integration](../worker-integration.md), [benchmark commands](../benchmark.md), and [the source comparison](first-backend-benchmark.md).
