# GPU worker readiness without NVIDIA execution

## Problem Statement
M0 is proven but fixture behavior is embedded in the worker. The Mac cannot yet inspect structured GPU capability or safely accept remote results. Repeatable deployment and a reproducible benchmark are needed before the PC is reachable.

## Solution
Switch a worker between fixture and external-command adapters using configuration, inspect versioned capability reports, submit/poll/cancel jobs from the Mac, and import verified output bytes into persistent local storage. Prepare idempotent Linux bootstrap and exact SSH deployment commands. Prepare the first real backend benchmark with source/weights provenance and an explicit not-run result until actual GPU execution.

## User Stories
1. As a developer, I switch backends without changing HTTP or browser code.
2. As a developer, I inspect GPU model, total/free VRAM, driver, CUDA toolkit and PyTorch states without conflating missing commands with absent hardware.
3. As a developer, I can run every contract/job/import check on the Mac with fixture and command-backed test adapters.
4. As a developer, failed/cancelled/timed-out adapters never publish partial results and jobs remain serial.
5. As a developer, the Mac imports only same-worker artifacts with correct format, size and SHA-256, preserving completed imports on restart.
6. As an operator, rerunning Linux bootstrap for the same Git commit preserves data, configuration and environment, and reports the deployed commit.
7. As an operator, I deploy the exact Mac repository commit through verified SSH without creating a divergent source copy or exposing worker ports publicly.
8. As a researcher, I run a pinned first backend benchmark and retain failures, timing, VRAM, versions, outputs and licenses.

## Implementation Decisions
Keep the fixture worker backward compatible. A trusted configured command adapter is the extension seam: no shell and no executable chosen by HTTP input. Commands receive a request JSON path and staging output directory, write actual PLY/GLB files, and cooperate with cancellation/timeout through process termination. Python owns adapter isolation, job state and publication. The report schema explicitly marks NVIDIA execution not run; inventory is not model validation. HTTP endpoints on the Mac proxy jobs through a configured worker URL/token, and persist accepted job manifests separately from current world topology. Existing M0 chunks are not replaced by a benchmark.

Linux bootstrap uses an unprivileged versioned checkout/venv, persistent external data directory and loopback-only launch. No driver installs, system package changes or model downloads by default. Git-based SSH deployment transports a committed bundle when remote GitHub credentials are unavailable. Actual NVIDIA execution remains a separate human/external blocker.

## Testing Decisions
Use public HTTP tests against real Python subprocesses, including command adapter success/failure/cancel, malformed capability data, external/redirect artifact URLs, hash failures and restart. Linux bootstrap is run twice against a local Git source on Linux CI; Mac may additionally test in a Linux container if available. Schema validation consumes real Python probe output. No GPU is required for CI and no CI outcome is called GPU validation.

## Out of Scope
Running NVIDIA kernels on the Mac, fabricated GPU benchmark results, changing the accepted M0 world, choosing a permanent model, downloading all candidate stacks, and installing PC drivers without the PC.
