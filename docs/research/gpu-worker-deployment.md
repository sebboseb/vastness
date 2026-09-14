# GPU appliance deployment — 2026-09-15

The Mac → Windows SSH → WSL2 → RTX 3090 path passes after the authorized Windows reboot. This record distinguishes the deployed service/fixture transport from the still-unvalidated model environment.

## Verified identity and reboot

- Dedicated Mac key: `~/.ssh/vastness_pc_ed25519`; private key remains on the Mac.
- Server ED25519 fingerprint: `SHA256:9x9TJqqXOxwX0+UxTn+uOZKsSU1nFIWh45j/Jczy7qE`, compared before accepting the key. Strict checking remains enabled.
- `ssh vastness-gpu "whoami"`: `desktop-6qs5jc3\sebas`.
- Exact remote command: `ssh vastness-gpu "wsl -d Ubuntu-24.04 -u vastness --exec /usr/lib/wsl/lib/nvidia-smi"`.
- RTX 3090, 24,576 MiB total VRAM, driver 610.62; NVIDIA-SMI 610.43.02 and CUDA UMD 13.3. A subsequent inventory measured 22,493 MiB free; availability varies with desktop workloads.
- New Windows boot: `2026-09-15T00:02:30.5000000+02:00`; component-servicing pending reboot false.
- Ethernet IP remains `192.168.1.252`. No SSH address change was needed.

The reboot initially left SSH inaccessible. Its OpenSSH log showed only a loopback listener at boot; the user's service restart restored both configured listeners. Delayed automatic startup and 60/120/300-second service recovery were configured to mitigate the observed startup issue. Their behavior on another Windows reboot has not been tested. No second reboot was needed for deployment.

## Storage protection

Ubuntu's registered VHD is now `E:\Vastness\WSL\Ubuntu-24.04`, replacing its former C: backing location. After the move, `/home/vastness` resolves to Linux ext4 `/dev/sdd`; Windows E: free space was 1,102,559,604,736 bytes, C: 28,252,192,768 bytes. These are snapshots, not quotas.

Before moving, the distro was exported to `E:\Vastness\backups\Ubuntu-24.04-pre-move-20260914.tar`: 1,313,607,680 bytes, SHA-256 `755f978c04325d72f452b68cdedcc2a9e7b1eab3d5aeccf160a4c22e333075d8`. The backup and JSON metadata remain on E:. An initial sharing violation left an empty destination; it was preserved under a separate name. A full WSL shutdown and eight-second wait allowed the native `wsl --manage Ubuntu-24.04 --move` retry to succeed. Linux user and GPU access were checked afterwards.

The [pinned model payload](trellis-storage-requirements.md) is 4,516,848,171 bytes (4.207 GiB). The complete attempt uses a planning allowance of 60 GiB including dependencies, caches, builds and outputs. Toolchains live under `/home/vastness/.local/share/vastness-toolchains`; benchmark attempts belong under `/home/vastness/.local/share/vastness-benchmarks`. All are inside the verified E:-backed ext4 disk. Miniforge's pinned installer checksum passed. The actual conda dry run retained CUDA Toolkit 12.1.1, nvcc 12.1.105 and GCC/G++ 11.4.0 across 83 packages, with 3,674,690,978 bytes to fetch. The installed GCC 11.4.0/nvcc 12.1.105 pair subsequently compiled a CUDA object successfully. Conda activation required disabling shell nounset while its scripts run. No kernel executed in that compile check.

## Running worker and networking

The actual deployed revision is `b7e5764f89a7edbb93f6676669d1c27ed5e58713`, transferred by `scripts/deploy-worker-wsl.py` from its Git bundle. The prefix is `/home/vastness/.local/share/vastness-worker`; current points to that release. Fixtures were generated on the Mac from a detached checkout of the same commit and transferred separately.

The documented `vastness-worker.service` systemd user unit is enabled and running as `vastness`, using the bootstrap's `run-worker`, shared data/fixtures and loopback `127.0.0.1:4320`. Its PATH includes `/usr/lib/wsl/lib` for the capability probe. Windows loopback `/health` was independently checked before tunneling.

Systemd services alone do not keep WSL running, as [Microsoft documents](https://learn.microsoft.com/en-us/windows/wsl/systemd). The ordinary-user Windows scheduled task **Vastness WSL worker lifecycle** runs `wsl.exe -d Ubuntu-24.04 -u vastness --exec /bin/sleep infinity` at `sebas` logon and is currently running. It stores no password, has no runtime limit, and retries failures. This supports the existing signed-in Windows session; unattended operation before Windows login is not claimed. WSL user-session startup can take tens of seconds, so service availability must be polled rather than inferred from the command launching.

The SSH configuration backup is `C:\ProgramData\ssh\sshd_config.vastness-20260915-pre-forwarding`. Under `Match User sebas`, local forwarding is enabled only to `127.0.0.1:4320`. `sshd -t` and effective `-T` configuration passed before restarting. Password authentication remains disabled, listeners remain explicit LAN/loopback, and firewall scope was not broadened.

The active Mac tunnel uses:

```sh
ssh -N -o ExitOnForwardFailure=yes -o ServerAliveInterval=30 \
  -o ServerAliveCountMax=3 \
  -L 127.0.0.1:14320:127.0.0.1:4320 vastness-gpu
```

The Mac orchestrator was restarted with `WORKER_URL=http://127.0.0.1:14320`. HTTP `/version` identifies the deployed commit. `npm run worker:smoke` completed job `mac-smoke-1789425075286`, imported both artifacts into Mac storage and verified downloaded byte lengths/SHA-256 against the manifest. Evidence is retained locally in `.runtime/remote-worker-smoke.json`. A second deployment of the same commit and a systemd worker restart preserved the completed job; both remote artifact downloads still matched their original hashes. The existing world's identity (`e651eff8-aaa5-48ee-822c-7c47d5fd1aa8`), chunks, topology and artifact manifests are unchanged; the live browser continues to update player pose.

## Capability and benchmark boundary

The real capability schema reports the NVIDIA device and driver, distinguishes driver-supported CUDA 13.3 from an installed toolkit, and reports PyTorch absent in the stdlib worker environment. Baseline evidence is `.runtime/remote-capability-initial.json`. Fixture transport passes with `nvidiaExecution: not_run`. A separate pinned benchmark environment is being prepared; no CUDA kernel, successful inference or generated 3D result is implied by these checks. Ticket #11 owns those measurements.

## First model setup result and next attempt

Attempt `trellis-20260915-01` installed Torch 2.4.0+cu121, xformers, Kaolin and all pinned native extensions. A real CUDA arange/multiply/add/reduction passed with the exact expected result 1,048,576 on compute capability 8.6. This validates small-kernel NVIDIA execution; it is not model inference.

The original preparation then failed at its retained `pip check` gate, before downloading weights: `ninja 1.11.1.1 is not supported on this platform`. Inspection found a blank line before the WHEEL tags, matching [pip's upstream report](https://github.com/pypa/pip/issues/12884). The built Ninja executable worked, and all native extensions compiled; this failure is packaging metadata rather than an observed CUDA build failure.

The next explicit experiment updates only the Ninja distribution pin to **1.11.1.4**. Its downloaded Linux wheel has parseable, compatible platform tags and SHA-256 `096487995473320de7f65d622c3f1d16c3ad174797602218ca8c967f51ec38a0`. [Upstream releases](https://github.com/scikit-build/ninja-python-distributions/releases). Python/Torch/CUDA, model sources, weights and generation parameters are unchanged. A fresh `trellis-20260915-02` prefix preserves the complete failed attempt and logs; cached dependency downloads may be reused. Do not mark the original failed setup as successful or bypass `pip check`.
