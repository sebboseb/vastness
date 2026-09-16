#!/usr/bin/env bash
set -euo pipefail
[[ $# == 1 && "$1" == /* ]] || { echo 'Usage: serve.sh /absolute/deployment-prefix' >&2; exit 2; }
prefix=$1
release=$(cd -- "$prefix/current" && pwd -P)
set -a
source "$prefix/shared/config/worker.env"
set +a
export PYTHONDONTWRITEBYTECODE=1
exec "$release/venv/bin/python" "$release/repo/services/gpu-worker/worker.py" \
  --host 127.0.0.1 --port 4321 --data-dir "$prefix/shared/data" --fixture-dir "$prefix/shared/fixtures"
