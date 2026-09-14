# GPU PC connectivity

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
