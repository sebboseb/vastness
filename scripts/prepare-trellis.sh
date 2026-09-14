#!/usr/bin/env bash
# No installation/download unless --execute is supplied; Python also enforces Linux.
set -euo pipefail
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
exec python3 "$script_dir/../services/gpu-worker/benchmarks/prepare.py" "$@"
