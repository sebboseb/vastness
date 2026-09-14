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
