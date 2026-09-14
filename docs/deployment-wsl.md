# Deploy through Windows OpenSSH into WSL2

Use this route when `vastness-gpu` lands in Windows rather than Linux. The existing [Linux deployment helper](deployment.md) requires a Linux SSH shell and cannot be used directly with that alias. This helper sends a Git bundle through the verified Windows connection and invokes the existing bootstrap inside `Ubuntu-24.04` as Linux user `vastness`.

The Mac alias uses the dedicated `~/.ssh/vastness_pc_ed25519` key, Windows user `sebas`, and the verified current address. Its server ED25519 fingerprint must already match `SHA256:9x9TJqqXOxwX0+UxTn+uOZKsSU1nFIWh45j/Jczy7qE`. The helper uses batch mode and strict host-key checking; it neither accepts a new key nor changes SSH configuration. See [the connectivity record](research/gpu-connectivity.md) for measurements and reboot status.

## Prerequisites and storage

Windows must already provide OpenSSH, PowerShell and the registered WSL2 distribution. Inside Ubuntu, the ordinary `vastness` account needs Bash, Git and Python 3.10+ with `venv`. The transport loader uses `python3`; `--python` optionally selects the Python executable for the existing bootstrap. The bootstrap creates its stdlib-only venv without pip and installs no OS packages, drivers, CUDA, PyTorch or model weights.

The deployment prefix below holds small code releases and runtime state. Model weights and dependency caches require a separately established physical storage budget: see [TRELLIS storage requirements](research/trellis-storage-requirements.md). A large `df` value inside WSL does not establish free space on the Windows volume holding its VHD. Do not place a model download on C: merely because the worker's code prefix is there.

## Exact deployment

From the Mac repository, select a reviewed full Git commit containing `scripts/bootstrap-worker.sh` and `services/gpu-worker/worker.py`:

```sh
COMMIT="$(git rev-parse 'HEAD^{commit}')"
python3 scripts/deploy-worker-wsl.py \
  --host vastness-gpu \
  --distro Ubuntu-24.04 \
  --user vastness \
  --repo "$PWD" \
  --ref "$COMMIT" \
  --prefix /home/vastness/.local/share/vastness-worker
```

The helper creates a temporary bare repository on the Mac, fetches exactly that commit and makes a bundle under a private temporary directory. Neither the source repository's refs nor its uncommitted files are changed or deployed. A short UTF-16LE encoded PowerShell command calls `wsl.exe -d Ubuntu-24.04 -u vastness --exec python3 -c ...`. The binary stdin stream contains a bounded JSON envelope followed by the bundle. Encoding keeps Linux paths out of Windows shell expressions and avoids Windows command-length limits.

The Linux receiver verifies the incoming byte count and SHA-256, fetches the bundle's deployment ref into a temporary bare repository, checks that its commit is exactly the requested SHA, and extracts `scripts/bootstrap-worker.sh` from that commit. It then invokes Bash with the existing bootstrap's documented `--repo`, `--ref`, `--prefix` and `--python` arguments. The bundle remains at `PREFIX/incoming/<commit>.bundle` for audit/retry. Partial transfers and failed verification remove the temporary upload and do not run bootstrap.

Rerunning preserves the existing shared data, fixtures, operator configuration and release venv. The existing bootstrap refuses dirty current/release checkouts and switches `current` for the next launch. Run only one deployment per prefix at a time. The helper starts or stops no worker, changes no Windows networking, and downloads no models.

## Start and verify separately

The existing launcher runs the selected release in the foreground at Linux loopback `127.0.0.1:4320`, with shared state outside the checkout. After checking that no worker already owns that data directory, its exact Windows-to-WSL invocation is:

```sh
ssh -o BatchMode=yes -o StrictHostKeyChecking=yes vastness-gpu \
  "wsl -d Ubuntu-24.04 -u vastness --exec /home/vastness/.local/share/vastness-worker/run-worker"
```

The worker's real capabilities can be inspected inside Ubuntu without changing networking:

```sh
ssh -o BatchMode=yes -o StrictHostKeyChecking=yes vastness-gpu \
  "wsl -d Ubuntu-24.04 -u vastness --exec curl --fail --silent --show-error http://127.0.0.1:4320/capabilities"
```

This inspection command assumes `curl` is present; it is not a worker dependency. A started process is not sufficient evidence of a complete deployment: verify `/health`, `/version` against the selected commit and the fixture job/artifact hashes described in [worker.md](worker.md). Fixtures must be generated from the selected commit and transferred separately before submitting fixture jobs.

The documented Mac worker endpoint remains `127.0.0.1:14320`. Windows SSH forwarding was disabled in the initial inspection, so a direct `ssh -L ...:127.0.0.1:4320 vastness-gpu` command must **not** be assumed to reach WSL. The Windows server must have a verified, restricted forwarding configuration and a verified Windows-to-WSL loopback route before the Mac HTTP tunnel can be used. This deployment helper deliberately leaves that separate step to the operator; it does not enable wildcard listeners or firewall rules. A subsequently verified route and any restrictions belong in the connectivity record.

Inventory and fixture checks do not validate CUDA kernel execution or TRELLIS inference. Run the separately prepared [benchmark procedure](benchmark.md) only after storage and dependencies are explicitly established.

## CPU acceptance

```sh
python3 -m unittest discover -s scripts/tests -p 'test_deploy_worker_wsl.py' -v
```

The suite decodes and exercises the encoded loader, checks that adversarial literal values survive both language boundaries, and rejects malformed arguments/envelopes. On Linux it runs real Git bundles and the real bootstrap through an emulated SSH/PowerShell transport, verifies idempotence and configuration retention, excludes uncommitted source/bootstrap edits, preserves binary NUL/FF/CRLF bytes, and proves a corrupt bundle never reaches bootstrap. Linux cases are skipped on macOS. Transport emulation provides no evidence of an actual Windows SSH connection; record that separately after deployment.
