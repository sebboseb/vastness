# Fixture GPU worker

The Python worker exposes the project job boundary without installing models or GPU libraries. `fake-fixture-v1` copies authored fixtures after a delay; it does not generate geometry, use the prompt/seed to modify assets, or condition geometry on the supplied boundary. It validates and stores those inputs for inspection in its local job records. The browser never calls this service directly; the Mac orchestrator is its intended client.

## Local start and verification

Use Python 3.10 or newer. No pip installation is needed. From the repository root, generate the pinned assets and start the worker:

```sh
npm run fixtures
python3 services/gpu-worker/worker.py
```

It binds `127.0.0.1:4320`. Fixtures come from `artifacts/fixtures/{arrival,observatory}/{scene.ply,collider.glb}`. The fixture generation command requires the project's existing Node dependencies; the Python worker itself does not. Missing fixtures produce a failed job with a useful error, while health/capability inspection remains available.

```sh
python3 -m unittest discover -s services/gpu-worker -p 'test_*.py'
curl --fail http://127.0.0.1:4320/health
curl --fail http://127.0.0.1:4320/capabilities
curl --fail http://127.0.0.1:4320/version
```

The unittest suite creates isolated synthetic fixture bytes and temporary state directories. It verifies HTTP validation, serial execution, cancellation, failure recovery, artifact hashes and bytes, authentication, persisted success, interrupted-job recovery, and honest probe failures. Production fixture visual quality and real GPU behavior are separate acceptance seams.

Options are `--host`, `--port`, `--data-dir`, `--fixture-dir`, and `--delay` (seconds, default 1). `WORKER_HOST` and `WORKER_PORT` set bind defaults. Paths default relative to the repository, independent of the shell's working directory. Job state and output copies live under `.runtime/gpu-worker/` by default. Run one worker process per state directory; no multiprocess scheduler or shared-storage locking is provided.

Ctrl+C stops the service, records outstanding jobs as cancelled, and joins the serial executor. Restarting preserves successful jobs, their manifests and artifact bytes. After an abrupt stop, previously queued/running records become failed with an explicit restart error. Submit a new ID to retry. Existing job IDs always return HTTP 409 on resubmission, including failed and cancelled jobs.

## HTTP contract

The shared names and fields are defined in `packages/protocol/src/index.ts`; exact integration seams are pinned in `docs/exploration.md`. Python validates the same request fields without a JavaScript runtime. Unknown fields are discarded, matching the shared Zod schema. Responses are JSON except artifact bytes. Routes use these statuses:

| Request | Success | Behavior |
| --- | --- | --- |
| `GET /health` | 200 | Service status, fixture mode, backend and service version. No GPU claim. |
| `GET /capabilities` | 200 | Fixture choices, PLY/GLB formats, cancellation support, `maxConcurrency: 1`, `requiresGpu: false`, version information. |
| `GET /version` | 200 | Service version, `fake-fixture-v1`, Python version and Git commit (null if unavailable). |
| `POST /jobs` | 202 | Submit a `WorkerJobRequest`, return a queued `WorkerJob`. |
| `GET /jobs/:id` | 200 | `WorkerJob`: id, status, progress, logs, backend and nullable error. |
| `POST /jobs/:id/cancel` | 200 | Return the job after cancellation; terminal jobs remain unchanged. No request body required. |
| `GET /jobs/:id/artifacts` | 200 | Return the project `Artifact[]`; 409 until successful. |
| `GET /artifacts/:id/:filename` | 200 | Retrieve immutable successful output bytes; only `scene.ply` and `collider.glb` are exposed. |

Errors are `{"error":"message"}`. Invalid JSON/contracts return 400; a body larger than 64 KiB returns 413; unsupported submission content type returns 415; missing routes/jobs/artifacts return 404; duplicate IDs return 409. Requests with configured token authentication require it on every route, including artifact retrieval. Unsupported HTTP methods receive the standard HTTP-server 501 response.

Example submission:

```sh
curl --fail -X POST http://127.0.0.1:4320/jobs \
  -H 'Content-Type: application/json' \
  --data '{"id":"lab-001","prompt":"Coastal observatory","seed":42,"fixture":"observatory","boundary":{"portalId":"north","position":[0,0,-9],"width":3.2,"height":3.2}}'
curl --fail http://127.0.0.1:4320/jobs/lab-001
curl --fail http://127.0.0.1:4320/jobs/lab-001/artifacts
```

Poll status until `succeeded` before requesting the manifest. Each artifact includes a relative worker URL, lowercase SHA-256, byte count, `format` (`ply` or `glb`), and `backend: "fake-fixture-v1"`. Resolve URLs against the worker origin and verify the hash when importing into orchestrator storage. The worker sends an ETag with the digest and an immutable private cache policy. Paths cannot select arbitrary worker files.

One executor processes jobs in submission order. Status follows `queued → running → succeeded` or `failed`; cancellation can end queued or running jobs. Progress describes the fixture delay/copy operation. Logs are available in every status response and persist with the job. Cancelling a running job interrupts its delay or the next copy block, and partial files are never published through the API. Heavy work remains strictly serial even while concurrent HTTP clients submit or inspect jobs.

State is stored as one atomically replaced JSON record per job, with artifact copies published before the successful manifest. This is a local prototype store with no automatic retention or cleanup of completed jobs. Preserve it across upgrades. It is not a multi-host database. Keep output files immutable; callers can use the recorded hash to detect external modification.

## Read-only inventory

Run the probe on the machine being inventoried:

```sh
python3 services/gpu-worker/probe.py
```

It prints JSON containing UTC time, hostname/OS, Python executable/version, Git commit and working-tree status, NVIDIA GPU names/VRAM/driver query, full `nvidia-smi` output, CUDA toolkit compiler version when available, and PyTorch package version without importing PyTorch. On Windows it also records `wsl --list --verbose`. Every command includes its executable path, exit code, stdout/stderr, and `ok`, `unavailable` or `failed` status. Command timeouts are ten seconds each. A missing command is not evidence that the host has no GPU.

The probe does not change system configuration, install dependencies, download weights, or execute a generation workload. `nvidia-smi`'s CUDA version reports driver compatibility; `nvcc` describes an installed toolkit, and neither establishes that a model can run. PyTorch package metadata also does not establish working CUDA support. Capture an inventory and then run separate approved benchmark experiments before choosing a model adapter.

Local validation on 2026-09-14 ran on the Mac (Darwin arm64, Python 3.14.6). NVIDIA commands, `nvcc` and PyTorch package metadata were unavailable. No PC hardware measurement or GPU benchmark is claimed. See `docs/research/gpu-connectivity.md`: PC SSH port 22 timed out, authentication was never reached, and the candidate Windows account and GPU inventory remain unverified.

## Deployment from a Git commit

The following is a deployment procedure, not a record of a completed PC deployment. First establish reachable SSH and verify the host fingerprint. Use the actual confirmed account/host and the existing key; do not disable host-key checking. The known candidate endpoint and the connection blocker are documented in the connectivity research.

Use an ordinary Git clone on the GPU host, ideally native Linux or a confirmed WSL2 Linux environment. Product code must come from the accepted repository commit. On that host, in a clean deployment checkout:

```sh
git fetch origin
git checkout --detach <accepted-commit-sha>
git rev-parse HEAD
git status --porcelain
python3 services/gpu-worker/probe.py
```

Replace the commit placeholder with the exact reviewed/integrated SHA available on the remote. Confirm `git rev-parse HEAD` matches it and the checkout is clean. Stop the prior worker before starting the new one, retaining the same state directory. A persistent directory outside the checkout is useful when deployment checkouts change; pass it with `--data-dir`.

Fixture options are to run `npm ci && npm run fixtures` on the host when Node is already available, or transfer only the reproducible `artifacts/fixtures/` assets generated from the same commit on the Mac. Product Python source is always deployed through Git; do not maintain an independently edited PC copy. No GPU libraries or models are required for fixture mode.

Start on the host in a persistent shell/service environment:

```sh
python3 services/gpu-worker/worker.py --host 127.0.0.1 --port 4320
```

On the Mac, forward a distinct local port through the verified SSH connection:

```sh
ssh -N -o ExitOnForwardFailure=yes -o StrictHostKeyChecking=yes \
  -o IdentitiesOnly=yes -i ~/.ssh/moneytap_codex_win10_ed25519 \
  -L 127.0.0.1:14320:127.0.0.1:4320 <verified-user>@<verified-host>
```

With WSL2, confirm the SSH session reaches the environment running the worker or verify Windows-to-WSL loopback forwarding before relying on this tunnel. Through the Mac end, request `/health`, `/capabilities` and `/version`; verify the returned commit. Then submit a fixture job, wait for success, download both artifacts and verify their byte counts and SHA-256 values. This acceptance loop is required before reporting remote deployment as complete. None of these PC deployment checks has passed yet.

## Optional remote authentication

SSH tunneling with the worker bound to loopback is preferred. If deliberately binding another interface using `--host` or `WORKER_HOST`, set `WORKER_TOKEN` in the service environment. An empty/unset token disables authentication, including on explicitly selected non-loopback interfaces. The service does not provide TLS; expose it only through a trusted network or encrypted tunnel/proxy.

Clients then send `Authorization: Bearer <token>` on every request. Tokens are not part of command-line options, job records, version responses, or logs. Do not put actual tokens in Git. The API intentionally has no browser CORS integration.
