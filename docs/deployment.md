# Linux worker deployment

This procedure deploys a reviewed Git commit from the Mac to an ordinary Linux account. The bootstrap creates a Python environment, preserves worker state and configuration, and prepares a loopback launcher. It installs no system packages, drivers, PyTorch, models or weights. Fixture mode needs only Bash, Git and Python 3.10+ with the `venv` module; the environment is created without pip because the worker uses the standard library.

These are deployment instructions, not evidence of a PC deployment or NVIDIA validation. The last recorded candidate is `DESKTOP-6QS5JC3.local` / `192.168.1.252`, with an unverified Windows account `sebas` and existing Mac key `~/.ssh/moneytap_codex_win10_ed25519`. Port 22 timed out before authentication. See [the connectivity record](research/gpu-connectivity.md). The Linux account, SSH port, host fingerprint, actual GPU model and working CUDA environment remain unverified.

## Establish a verified Linux endpoint

Use native Linux, or an SSH server **inside WSL2**. An SSH session landing in Windows PowerShell is not a Linux endpoint. WSL forwarding and the listening SSH port must already be configured by the operator. Bootstrap does not install or configure SSH/WSL, change firewall rules or assume Windows-to-WSL forwarding.

After independently comparing the host fingerprint with the PC's console, prepare a Mac `~/.ssh/config` entry. Replace the hostname, account, port and key with verified values:

```sshconfig
Host vastness-gpu-linux
    HostName verified-linux-address
    User verified-linux-account
    Port 22
    IdentityFile ~/.ssh/moneytap_codex_win10_ed25519
    IdentitiesOnly yes
    BatchMode yes
    StrictHostKeyChecking yes
```

The verified host key must already be in `known_hosts`. An unknown or changed key should fail; the scripts never accept it automatically. The alias preserves nonstandard ports, usernames and keys for every deployment/tunnel command. Check that the connection lands in Linux and that prerequisites are available:

```sh
ssh -o BatchMode=yes -o StrictHostKeyChecking=yes vastness-gpu-linux \
  'uname -s; id -un; command -v bash; git --version; python3 -c "import sys, venv; assert sys.version_info >= (3,10); print(sys.version)"'
```

`uname -s` must report `Linux`. Resolve missing prerequisites separately; do not interpret an unavailable NVIDIA command as proof that there is no GPU.

## Deploy the exact commit from the Mac

Run from the reviewed repository checkout on the Mac. `COMMIT` is the full 40-character commit to deploy; replace `HEAD` with the reviewed ref if necessary. Working-tree edits are never deployed. The chosen commit must include `scripts/bootstrap-worker.sh`.

```sh
COMMIT="$(git rev-parse 'HEAD^{commit}')"
PREFIX="$(ssh -o BatchMode=yes -o StrictHostKeyChecking=yes vastness-gpu-linux \
  'printf "%s/.local/share/vastness-worker\n" "$HOME"')"
bash scripts/deploy-worker.sh --host vastness-gpu-linux \
  --repo "$PWD" --ref "$COMMIT" --prefix "$PREFIX" --python python3
```

The helper makes a private temporary Git repository and a bundle containing the chosen commit, transfers that bundle to `PREFIX/incoming/<commit>.bundle`, and executes the bootstrap extracted from the same commit. Product source is never copied from the Mac working tree. Transport uses `BatchMode=yes` and `StrictHostKeyChecking=yes`; all remote paths are shell quoted. The incoming bundle is retained for retry/audit. The helper does not stop or start the worker.

The standalone Linux bootstrap also accepts a Git URL, local Git checkout or bundle. Run this on Linux when the source is already available there:

```sh
# Set COMMIT to the full reviewed SHA and SOURCE to a Git URL/path/bundle.
bash scripts/bootstrap-worker.sh --repo "$SOURCE" --ref "$COMMIT" \
  --prefix "$HOME/.local/share/vastness-worker" --python python3
```

For a manual Mac bundle transfer equivalent, use the same `COMMIT` and the default prefix above:

```sh
TRANSFER="$(mktemp -d)"
git init --bare --quiet "$TRANSFER/source.git"
git -C "$TRANSFER/source.git" fetch --quiet "$PWD" "$COMMIT"
git -C "$TRANSFER/source.git" update-ref refs/heads/deploy FETCH_HEAD
git -C "$TRANSFER/source.git" bundle create "$TRANSFER/worker.bundle" refs/heads/deploy
git -C "$TRANSFER/source.git" show "$COMMIT:scripts/bootstrap-worker.sh" > "$TRANSFER/bootstrap-worker.sh"
ssh -o BatchMode=yes -o StrictHostKeyChecking=yes vastness-gpu-linux \
  'test "$(uname -s)" = Linux && umask 077 && mkdir -p "$HOME/.local/share/vastness-worker/incoming" && cat > "$HOME/.local/share/vastness-worker/incoming/worker.bundle"' \
  < "$TRANSFER/worker.bundle"
ssh -o BatchMode=yes -o StrictHostKeyChecking=yes vastness-gpu-linux \
  "bash -s -- --repo \"\$HOME/.local/share/vastness-worker/incoming/worker.bundle\" --ref '$COMMIT' --prefix \"\$HOME/.local/share/vastness-worker\"" \
  < "$TRANSFER/bootstrap-worker.sh"
rm -rf -- "$TRANSFER"
```

The layout is:

```text
PREFIX/
  releases/<commit>/repo/      exact detached Git checkout
  releases/<commit>/venv/      release-specific Python environment
  current -> releases/<commit>
  run-worker                  foreground loopback launcher
  shared/data/                job records and completed artifacts
  shared/fixtures/            separately transferred fixture assets
  shared/config/worker.env    trusted operator shell configuration
  incoming/                   transferred Git bundles
```

Rerunning the same commit keeps the venv and its installed contents, data, fixtures and `worker.env`. A new commit gets a separate venv and shares the persistent state. Bootstrap refuses a dirty current or target checkout, a mismatched existing release HEAD, an invalid commit, and a non-symlink `current`. Failed checkout preparation leaves the active release untouched. Preserve and review unexpected edits; do not force-reset operator data to make deployment pass. Run only one bootstrap/deployment at a time for a prefix.

## Configure and start the service

On Linux, edit `$HOME/.local/share/vastness-worker/shared/config/worker.env` if needed. It is a trusted shell file sourced with export enabled; shell-quote values. Existing launch environment values are inherited unless the file explicitly assigns them. It initially contains comments only. Example options:

```sh
WORKER_BACKEND=fixture
WORKER_JOB_TIMEOUT=900
# WORKER_TOKEN='an-operator-managed-secret'
# WORKER_BACKEND=command
# WORKER_COMMAND_JSON='["/absolute/path/to/prepared/model-adapter"]'
```

Command mode requires an independently prepared adapter and its dependencies; see [worker configuration](worker.md). Installing a new release does not carry packages from the old venv into the new one. Bootstrap never logs configuration values. Keep secrets out of Git and manage access to the service account. The launcher always binds `127.0.0.1:4320` and uses the shared data/fixture paths; `WORKER_HOST` and `WORKER_PORT` cannot expose this launcher publicly.

For fixture jobs, generate assets from the same Git commit on the Mac and transfer only the reproducible artifacts. This requires the project's existing Node toolchain on the Mac, not on Linux:

```sh
FIXTURE_TREE="$(mktemp -d)/source"
git worktree add --detach "$FIXTURE_TREE" "$COMMIT"
(cd "$FIXTURE_TREE" && npm ci && npm run fixtures)
tar -C "$FIXTURE_TREE/artifacts/fixtures" -cf - arrival observatory | \
  ssh -o BatchMode=yes -o StrictHostKeyChecking=yes vastness-gpu-linux \
    'umask 077; mkdir -p "$HOME/.local/share/vastness-worker/shared/fixtures" && tar -C "$HOME/.local/share/vastness-worker/shared/fixtures" -xf -'
git worktree remove --force "$FIXTURE_TREE"
```

Stop the old worker gracefully before starting another process; one process owns each shared data directory. In a Linux terminal, run the worker in the foreground:

```sh
"$HOME/.local/share/vastness-worker/run-worker"
```

Ctrl+C stops it. Bootstrap switches `current` for the **next launch**; it does not claim that an existing process has restarted. After deploying another commit, stop the old process and rerun this command. Completed jobs remain available from the shared directory.

If Linux already provides a working systemd user session, this optional user service provides restart/log handling without root:

```sh
mkdir -p "$HOME/.config/systemd/user"
cat > "$HOME/.config/systemd/user/vastness-worker.service" <<'UNIT'
[Unit]
Description=Vastness loopback worker

[Service]
ExecStart=%h/.local/share/vastness-worker/run-worker
Restart=on-failure
KillSignal=SIGINT
TimeoutStopSec=30

[Install]
WantedBy=default.target
UNIT
systemctl --user daemon-reload
systemctl --user enable --now vastness-worker
journalctl --user -u vastness-worker -n 30 --no-pager
```

Use `systemctl --user restart vastness-worker` after subsequent deployments, and `systemctl --user stop vastness-worker` before running it manually. Availability across logout/reboot depends on the host's existing user-session policy; this procedure does not change that policy.

## Tunnel and verify the running commit

In a separate Mac terminal, keep this tunnel running:

```sh
ssh -N -o BatchMode=yes -o StrictHostKeyChecking=yes \
  -o ExitOnForwardFailure=yes \
  -L 127.0.0.1:14320:127.0.0.1:4320 vastness-gpu-linux
```

On the Mac, verify health, capabilities and the live commit. For optional token authentication, set `WORKER_TOKEN` in the Mac environment too; the Python check sends it without placing it on the command line:

```sh
export COMMIT
python3 - <<'PY'
import json, os, urllib.request
headers = {}
if os.environ.get('WORKER_TOKEN'):
    headers['Authorization'] = 'Bearer ' + os.environ['WORKER_TOKEN']
for route in ('health', 'capabilities', 'version'):
    request = urllib.request.Request('http://127.0.0.1:14320/' + route, headers=headers)
    with urllib.request.urlopen(request, timeout=15) as response:
        value = json.load(response)
    print(route, json.dumps(value, indent=2))
    if route == 'health':
        assert value['status'] == 'ok'
    elif route == 'capabilities':
        assert value['schemaVersion'] == 1
        assert value['maxConcurrency'] == 1
        assert value['hardware']['nvidiaExecution'] == 'not_run'
    else:
        assert value['gitCommit'] == os.environ['COMMIT'], 'running commit differs from deployment'
PY
```

Then use the fixture submission and artifact verification flow in [worker.md](worker.md), targeting port `14320`, or configure the Mac orchestrator with `WORKER_URL=http://127.0.0.1:14320` and the same optional `WORKER_TOKEN`. Do not report remote deployment complete until the live commit matches and a job's output bytes/hashes have been verified. A capability inventory and passing fixture job do not validate NVIDIA execution or model quality.

## Local acceptance tests

Run on Linux with Git, Bash and Python available:

```sh
python3 -m unittest discover -s scripts/tests -p 'test_*.py' -v
```

The tests deploy twice, preserve operator config and installed environment markers, restart a real HTTP worker with a completed job, switch commits, verify persisted artifact hashes, reject dirty/wrong releases and invalid commits, and transport a committed bundle through an emulated SSH transport with adversarial path quoting. They require free loopback port `4320` and use temporary directories. The SSH transport test does not establish PC connectivity. On macOS only CLI/syntax tests run; Linux acceptance cases are skipped. Run the full suite in a Linux container or CI to validate Linux behavior.
