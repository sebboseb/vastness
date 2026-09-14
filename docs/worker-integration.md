# Mac worker integration

The browser continues to use the Mac API. A configured worker origin is used only by the orchestrator; the browser receives local content-addressed artifact URLs. The M0 world and its topology remain untouched by benchmark imports.

Start the Python fixture worker, then restart the Mac service pair with the origin configured:

```sh
python3 services/gpu-worker/worker.py
WORKER_URL=http://127.0.0.1:4320 npm run dev
npm run worker:smoke
```

`worker:smoke` checks the versioned capability schema, submits/polls a fixture job, imports it and verifies the served local PLY/GLB hashes. It writes `.runtime/worker-smoke.json`, explicitly recording NVIDIA execution as `not_run`. It refuses a non-fixture backend. Python adapter/command tests exercise the alternative execution path without CUDA.

For the PC tunnel, set `WORKER_URL=http://127.0.0.1:14320` and optionally `WORKER_TOKEN` to match the worker. Tokens are kept in the process environment, not the browser or request database. See [deployment.md](deployment.md) for the exact Git-bundle/SSH path.

## API

| Mac route | Behavior |
| --- | --- |
| `GET /api/worker/capabilities` | Fetch and validate `WorkerCapabilitiesSchema`; 503 when no origin is configured. |
| `POST /api/worker/jobs` | Validate job request, persist intent/source origin and submit. Existing IDs cannot silently change prompt, seed, fixture or worker. |
| `GET /api/worker/jobs/:id` | Inspect a job submitted through this Mac. |
| `POST /api/worker/jobs/:id/cancel` | Cancel through the worker; actual backend cancellation behavior is reported in worker logs. |
| `POST /api/worker/jobs/:id/import` | Require success; download/verify both artifacts; atomically accept a local manifest. Repeated calls return the accepted manifest. |
| `GET /api/worker/jobs/:id/artifacts` | Return the accepted local manifest even if the worker is offline or unconfigured. |
| `GET /artifacts/:sha256/:filename` | Serve accepted bytes from local storage. |

Example job JSON for fixture mode:

```json
{"id":"coastal-test-001","prompt":"Coastal observatory","seed":42,"fixture":"observatory","boundary":{"portalId":"north","position":[0,0,-9],"width":3.2,"height":3.2}}
```

`fixture` is optional in the shared protocol but required by the fixture adapter. Configured command adapters receive the validated request, including optional boundary information, and decide which inputs they support. The fixed TRELLIS benchmark is image-conditioned: follow its runner instructions and do not claim it implements text-to-world or boundary conditioning.

## Persistence and failure handling

`.runtime/worker.sqlite` stores normalized requests, worker origins, accepted manifests and acceptance timestamps separately from `world.sqlite`. Accepted artifact bytes use the same `artifacts/objects/<sha256>/<filename>` store as M0. Back up `.runtime` and `artifacts` together.

Downloads allow only the expected relative worker artifact route for that job. Redirects and external URLs are rejected; bearer credentials are never forwarded to a manifest-selected origin. JSON responses are capped at 1 MiB, each artifact at 256 MiB. Downloads are streamed through a temporary file with a two-minute deadline and verified length/hash and format signature before renaming. Both outputs must pass before a manifest becomes visible. Orphaned content objects from a failed pair are not exposed as accepted artifacts. Header checks are not a full mesh/walkability validator; import does not attach generated geometry to the world.

An explicit worker rejection does not reserve a new local job ID. Uncertain connection failures retain the original intent so retries can inspect the same ID rather than silently launching different work. Durable imports remain accessible without a running worker. Restart does not regenerate accepted artifacts.

## Validation boundaries

The capability inventory reports GPU/CUDA/PyTorch availability and measurement provenance, not successful inference. Missing tools use explicit unavailable/not-checked states and null unknown values. Published model VRAM requirements are hypotheses until the pinned benchmark runs on the actual NVIDIA machine. The Linux CPU bootstrap test and Mac fixture/command tests do not validate CUDA or generation quality.
