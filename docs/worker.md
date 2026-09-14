# GPU worker adapters

The standard-library Python worker owns a serial job API, durable job records, staging, format validation, hashing and publication. Its default `fake-fixture-v1` adapter copies authored fixtures without AI generation. A configured `command-v1` adapter runs a trusted local executable. The browser never contacts this service directly; the Mac orchestrator is its client. No model or GPU package is installed by either the worker or its probe.

## Start and configuration

Use Python 3.10 or newer. From the repository root:

```sh
npm run fixtures
python3 services/gpu-worker/worker.py
```

The fixture worker binds `127.0.0.1:4320`, copies `artifacts/fixtures/{arrival,observatory}/{scene.ply,collider.glb}`, and stores state under `.runtime/gpu-worker`. Paths default relative to the repository. Missing fixtures fail jobs without preventing health inspection.

| CLI option | Environment default | Default value |
| --- | --- | --- |
| `--backend` | `WORKER_BACKEND` | `fixture` (`command` also supported) |
| `--command-json` | `WORKER_COMMAND_JSON` | Required JSON argv array for command mode |
| `--job-timeout` | `WORKER_JOB_TIMEOUT` | 900 seconds, finite and positive |
| `--host` | `WORKER_HOST` | `127.0.0.1` |
| `--port` | `WORKER_PORT` | `4320` |
| `--data-dir` | — | `.runtime/gpu-worker` in repository |
| `--fixture-dir` | — | `artifacts/fixtures` in repository |
| `--delay` | — | 1 second, fixture only |
| `--check-torch` | — | Off; optional startup PyTorch inspection |

`WORKER_TOKEN` enables bearer authentication on every route, including health and artifacts. It has no CLI option and is not included in job records or capability responses. An empty token disables authentication. Prefer SSH forwarding with loopback binding; the HTTP service has no TLS or browser CORS support. Run one worker process per data directory.

## Trusted command adapter

Configure an executable using local operator configuration, never job input:

```sh
export WORKER_BACKEND=command
export WORKER_COMMAND_JSON='["/absolute/venv/bin/python","/absolute/backend/run.py"]'
python3 services/gpu-worker/worker.py --job-timeout 900
```

The worker executes that argv with `shell=False`, appending `--request <absolute request.json> --output <absolute staging directory>`. The output directory starts empty; request files persist separately in the worker data directory. The command reads the validated project `WorkerJobRequest`: ID, prompt, seed, optional fixture and optional portal boundary. Unknown fields are discarded. Fixture mode requires `arrival` or `observatory`; command mode does not require a fixture. HTTP cannot select an executable or modify argv.

The command must exit zero and write regular files named `scene.ply` and `collider.glb` in the output directory. The worker checks a binary little-endian PLY header with positive vertex count and payload, and GLB magic, version 2 and declared file length with a nonempty payload. These checks detect malformed containers; they do not certify visual quality, complete mesh semantics or walkability. The adapter must supply a real collision artifact; the worker never fabricates one. Symlink outputs are rejected.

The worker checks cancellation and its wall-clock deadline during execution and hashing. Only after both files pass validation does it atomically rename the staging directory and persist a successful manifest. Failed, timed-out and cancelled jobs expose no artifact bytes or manifest. Unpublished staging is retained under `data-dir/failures/<job-id>` after failure or cancellation, with its path recorded in job logs; the artifact API never serves it. Successful extra output files remain in the published directory but are not served by the artifact API. This preserves benchmark reports and full model logs from failed experiments. Operators control retention of these potentially large evidence directories. Commands run in their own POSIX process group on Linux, WSL2 or macOS; termination escalates from SIGTERM to SIGKILL after a bounded grace period. Remaining descendants are also stopped when a leader exits successfully. Command mode refuses non-POSIX hosts. Configured commands are trusted code, not a security sandbox; they must not detach into new sessions or modify published files.

One executor drains the queue in order and completes process cleanup before starting the next job. Job logs retain at most 64 entries of at most 2048 characters, including merged command stdout/stderr. Current output is visible through polling, and terminal logs are persisted. Command progress is 0 while running and 1 on success; fixture progress reflects its delay/copy steps. Generic command capability `requiresGpu:false` means this adapter has no intrinsic GPU requirement; it does not assert that the configured model can run without a GPU. Actual model identity, revision and GPU requirements belong in benchmark provenance.

Python integrations can pass an adapter object to `create_server(backend=adapter)`. It supplies `info` (`id`, `version`, `mode`, `requiresGpu`), `validate(request)` and `run(request, request_path, output, context)`. `context.check()`, `wait(seconds)`, `progress(value)` and `log(message)` cooperate with the same lifecycle. Adapters must return only after their work is stopped. The built-in command adapter enforces subprocess isolation; arbitrary in-process adapters are trusted to cooperate.

## HTTP contract and persistence

Exact schemas live in `packages/protocol/src/index.ts` and integration names in `docs/exploration.md`.

| Request | Success | Behavior |
| --- | --- | --- |
| `GET /health` | 200 | Service health, selected mode/backend and service version |
| `GET /version` | 200 | Service, Python, backend and Git commit (null if unavailable) |
| `GET /capabilities` | 200 | `WorkerCapabilitiesSchema`, including versioned hardware inventory |
| `POST /jobs` | 202 | Validate and enqueue `WorkerJobRequest`, return `WorkerJob` |
| `GET /jobs/:id` | 200 | ID, status, progress, bounded logs, backend and nullable error |
| `POST /jobs/:id/cancel` | 200 | Cancel queued/running job; terminal states remain unchanged |
| `GET /jobs/:id/artifacts` | 200 | `Artifact[]`; 409 before successful publication |
| `GET /artifacts/:id/:filename` | 200 | Successful `scene.ply` or `collider.glb` bytes only |

```sh
curl --fail -X POST http://127.0.0.1:4320/jobs \
  -H 'Content-Type: application/json' \
  --data '{"id":"lab-001","prompt":"Coastal observatory","seed":42,"fixture":"observatory","boundary":{"portalId":"north","position":[0,0,-9],"width":3.2,"height":3.2}}'
curl --fail http://127.0.0.1:4320/jobs/lab-001
curl --fail http://127.0.0.1:4320/jobs/lab-001/artifacts
```

Every manifest contains relative worker URLs, lowercase SHA-256, actual byte counts, `ply`/`glb` formats and the adapter ID that produced the bytes. The Mac verifies these bytes before accepting them into its own persistent storage. Artifact responses include a digest ETag and immutable private cache policy.

Errors are `{"error":"message"}`. Invalid jobs/JSON return 400, absent authentication 401, missing routes/jobs/artifacts 404, duplicate IDs or incomplete manifests 409, bodies exceeding 64 KiB 413, and unsupported submission content types 415. Job IDs cannot be reused, including after failure or cancellation. Unknown request fields are discarded, matching Zod.

SIGTERM and Ctrl+C cancel outstanding jobs and join the executor. Restart preserves completed job status, logs, manifests and bytes, including after switching adapters. Abruptly interrupted queued/running records become failed with a restart diagnostic; retry with a new ID. Records are atomically replaced JSON files and output directories are published before successful records. This local store has no automatic retention or multiprocess locking. Preserve the data directory across upgrades and keep published bytes immutable.

## Capability inventory

```sh
python3 services/gpu-worker/probe.py
python3 services/gpu-worker/probe.py --check-torch
```

Both print `CapabilityReportSchema` version 1: capture time, host OS/architecture, Python, GPU devices with total/free VRAM, NVIDIA driver compatibility, CUDA toolkit and PyTorch state. Report statuses distinguish `available`, `unavailable`, `failed` and `not_checked`. Unknown measurements are null. Missing executables do not establish hardware absence. Malformed GPU output is a failed probe, not a zero-sized device.

Default inspection does not import PyTorch. `--check-torch` imports it in a child with a ten-second deadline and reports package version, build CUDA and `torch.cuda.is_available()`. NVIDIA and toolkit inspection commands also have ten-second deadlines. Availability inspection is not inference. `nvidiaExecution` remains `not_run`, regardless of discovered hardware or PyTorch availability. Driver-supported CUDA is separate from the installed toolkit and PyTorch CUDA build.

The worker captures its inventory once at startup and caches `/capabilities` for its process lifetime. Repeated HTTP inspection does not rerun probes or block the job executor. Restart for a fresh report.

## Verification and deployment

```sh
python3 -m unittest discover -s services/gpu-worker -p 'test_*.py'
```

Tests use valid minimal fixture containers and real adapter subprocesses through public HTTP. They cover successful bytes and hashes, malformed output, failures, serial execution, bounded logs, child-process cancellation/timeouts, SIGTERM shutdown, persisted completion across backend switches, authentication and typed probe outputs. No NVIDIA execution is performed or claimed.

Product deployments come from exact Git commits. The repeatable Linux bootstrap and Mac-to-Linux SSH procedure are documented in `docs/deployment.md`. Preserve external state/configuration across releases, verify the returned `/version` commit, and complete a fixture or command job through the SSH tunnel before calling remote deployment successful. The PC connectivity blocker remains documented in `docs/research/gpu-connectivity.md`; local tests are not evidence of PC or model readiness.
