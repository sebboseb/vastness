# GPU PC connectivity

**Current status (2026-09-15, Europe/Stockholm):** the dedicated SSH connection and WSL GPU inventory passed before the authorized reboot. The PC has returned at the same LAN IP, but SSH is timing out. Post-reboot SSH/GPU verification, worker deployment and inference remain incomplete. The earlier discovery notes below are historical.

Checked from the Mac on 2026-09-14. Discovery and connection probes were read-only; no software, SSH configuration, services, or files on the PC were changed.

## Discovered endpoint

| Setting | Evidence / status |
| --- | --- |
| PC name | `DESKTOP-6QS5JC3`, listed as an existing Codex remote host |
| LAN hostname | `DESKTOP-6QS5JC3.local`, resolved through macOS name resolution |
| IPv4 address | `192.168.1.252` at time of check; may change with DHCP |
| Windows user | Likely `sebas`, inferred from saved PC project path `C:/Users/sebas/Documents/ChatGPT/3d2`; SSH account not yet verified |
| Candidate authentication | Existing local key at `~/.ssh/moneytap_codex_win10_ed25519`; public key comment identifies Mac-to-Windows use; authorization on this PC not verified |
| SSH configuration | No PC alias in the Mac's `~/.ssh/config` |
| Host key trust | No existing PC entry in the Mac's SSH known-host list; verification will be needed on first successful connection |

## Probe results

- IPv4 SSH port 22: timed out after five seconds.
- IPv6 SSH through the resolved hostname: timed out.
- One ICMP ping: no response. This alone does not establish that the PC is offline because Windows can block ping.
- The Mac has a local `en0` route and an ARP entry for the IPv4 address. The address is discoverable on the LAN, but this does not establish that OpenSSH is running or allowed through the firewall.
- Authentication was never reached. GPU model, driver version, CUDA support, WSL availability, and available GPU memory remain unverified. The user's 24 GB NVIDIA description is not yet a measured hardware inventory.

## Next connection check

The missing prerequisite is a reachable SSH service: confirm the PC is awake, its current SSH address and port, and that Windows OpenSSH Server is running and permitted on the local network. If it uses another endpoint, supply that hostname/address, port, and account name. Do not paste private key contents.

Once the endpoint is reachable and its host fingerprint is verified, use the existing key for a read-only inventory:

```sh
ssh -o BatchMode=yes -o ConnectTimeout=5 -o IdentitiesOnly=yes \
  -o StrictHostKeyChecking=yes \
  -i ~/.ssh/moneytap_codex_win10_ed25519 \
  sebas@DESKTOP-6QS5JC3.local hostname
```

Then run `whoami`, `nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv`, and `wsl --list --verbose` separately through the verified connection. Model installation and GPU worker setup should follow this inventory rather than assume that a compatible environment is already installed.

## Mac enrollment and pre-reboot verification — 2026-09-14

The dedicated Mac key is `~/.ssh/vastness_pc_ed25519` (private key stays on the Mac). Alias `vastness-gpu` targets `sebas@192.168.1.252`. The server ED25519 key was retrieved without trusting it, fingerprinted locally, compared exactly with the user's out-of-band value `SHA256:9x9TJqqXOxwX0+UxTn+uOZKsSU1nFIWh45j/Jczy7qE`, and only then added to known_hosts. Strict host-key checking was retained for connections.

Both requested commands passed from the Mac:

```sh
ssh vastness-gpu "whoami"
# desktop-6qs5jc3\sebas
ssh vastness-gpu "wsl -d Ubuntu-24.04 -u vastness --exec /usr/lib/wsl/lib/nvidia-smi"
```

The second command reported NVIDIA GeForce RTX 3090, 24,576 MiB total VRAM, Windows/KMD driver 610.62, NVIDIA-SMI 610.43.02 and CUDA UMD 13.3. A separate CSV query identified GPU UUID `GPU-02ec26d3-2fcf-7527-1110-7120a701ec49`, driver 610.62 and 19,391 MiB free at capture. This verifies **Mac → Windows SSH → WSL2 → RTX 3090 connectivity**, before the pending reboot. It does not establish PyTorch/CUDA computation or model inference.

Windows boot time before restart: `2026-08-28T16:16:11.7667180+02:00`. WSL 2.7.13.0 registers Ubuntu-24.04 as WSL2 and Linux user `vastness`. Its ext4 VHD currently lives on C:. Windows physical free space was C: 23,642,570,752 bytes, D: 137,692,766,208 bytes, E: 1,078,767,316,992 bytes. The Linux virtual disk's much larger advertised free space is not the physical C: allowance. No model downloads occurred before this inventory and the [explicit storage budget](trellis-storage-requirements.md).

The existing worker contract requires Python 3.10+ with venv, Bash and Git; fixture mode is stdlib-only. Bootstrap uses committed Git bundles, persistent shared data/config, and loopback `127.0.0.1:4320`; the documented Mac tunnel endpoint is `127.0.0.1:14320`. The existing direct-Linux SSH helper cannot be passed a Windows shell alias unchanged. Deployment must explicitly bridge to Ubuntu or establish a verified Linux SSH endpoint. Model setup separately requires the pinned Python/Torch/CUDA recipe in `docs/benchmark.md`.

## Reboot recovery — 2026-09-15

Before restarting, the existing ComfyUI queue reported zero running and zero pending jobs. The previously observed automation coordinator and background downloader had exited. WSL was shut down, then Windows received the authorized planned restart command without `/f`. A subsequent early SSH response still showed the old boot time and was not counted as post-reboot verification.

The PC later responded to a fresh Tailscale ping directly through `192.168.1.252:41641`, and Parsec displayed its live Windows desktop. The LAN IP therefore remained `192.168.1.252`; the SSH alias was not changed. Temporary Mac Tailscale diagnostic settings were restored to their original stopped state with the original route/DNS preferences.

Repeated dedicated SSH attempts still timed out on port 22. The PC Codex task was unavailable through its remote host, and Computer Use could display the Parsec stream but could not successfully forward clicks or keyboard input. The cause of the SSH outage is **not yet diagnosed**: a stopped service, listener startup failure, or changed firewall/network profile remain possibilities. No new boot timestamp or post-reboot `nvidia-smi` result has been obtained.

Recovery requires a working PC control channel. From administrator PowerShell on the PC, first inspect `Get-Service sshd`, `Get-NetTCPConnection -State Listen -LocalPort 22`, `Get-NetConnectionProfile`, and the OpenSSH event log. Restarting the existing `sshd` service is a bounded first recovery action; do not disable the firewall or broaden its LAN restrictions. Once SSH responds, repeat both exact commands above, record the new Windows boot timestamp and Ethernet IPv4 address, and investigate startup reliability before deployment.

The Windows-to-WSL Git-bundle deployment helper is implemented and CPU-tested; see [the exact deployment procedure](../deployment-wsl.md). The proposed model storage is an E:-backed Ubuntu VHD at `E:\Vastness\WSL\Ubuntu-24.04`, with a distro export backup before moving it. This move has **not** been executed. The measured model payload is 4,516,848,171 bytes (4.207 GiB); the complete environment/build/cache attempt needs a planning allowance of at least 40 GiB, preferably 60 GiB. No large weights, CUDA toolkit or model environment have been downloaded or deployed to the PC during this work.
