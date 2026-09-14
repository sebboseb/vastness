#!/usr/bin/env bash
# Install only committed worker code. Run as the ordinary service account.
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: bootstrap-worker.sh --repo <Git URL/path/bundle> --ref <full40hex commit>
                           --prefix <absolute path> [--python <python3>]
Linux only. Requires Bash, Git and Python >=3.10 with venv support.
Creates releases/<commit>/{repo,venv}, shared/{data,fixtures,config}, current,
and run-worker under prefix. Does not start/stop services or install packages.
EOF
}
die() { printf 'bootstrap-worker: %s\n' "$*" >&2; exit 1; }
repo= ref= prefix= python=python3
while (($#)); do
  case "$1" in
    -h|--help) usage; exit 0 ;;
    --repo|--ref|--prefix|--python)
      (($# >= 2)) || die "missing value for $1"
      case "$1" in
        --repo) repo=$2 ;; --ref) ref=$2 ;; --prefix) prefix=$2 ;; --python) python=$2 ;;
      esac
      shift 2 ;;
    *) die "unknown argument: $1" ;;
  esac
done
[[ -n "$repo" && -n "$ref" && -n "$prefix" ]] || { usage >&2; exit 1; }
[[ "$ref" =~ ^[0-9a-fA-F]{40}$ ]] || die '--ref must be a full 40-hex commit'
ref=$(printf '%s' "$ref" | tr 'A-F' 'a-f')
[[ "$prefix" == /* && "$prefix" != / ]] || die '--prefix must be an absolute non-root path'
[[ $(uname -s) == Linux ]] || die 'requires Linux (including an SSH session inside WSL)'
command -v git >/dev/null || die 'Git is required; install prerequisites separately'
command -v "$python" >/dev/null || die 'requested Python executable is unavailable'
"$python" -c 'import sys, venv; assert sys.version_info >= (3,10), "Python >=3.10 required"'
umask 077
mkdir -p -- "$prefix"
prefix=$(cd -- "$prefix" && pwd -P)
release="$prefix/releases/$ref"
check_clean() {
  [[ -z $(git -C "$1" status --porcelain --untracked-files=all) ]] || die 'release checkout is dirty; preserve/review changes before deploying'
}
if [[ -e "$prefix/current" || -L "$prefix/current" ]]; then
  [[ -L "$prefix/current" && -d "$prefix/current/repo/.git" ]] || die 'current must be a valid release symlink'
  check_clean "$prefix/current/repo"
fi
mkdir -p -- "$prefix/releases" "$prefix/shared/data" "$prefix/shared/fixtures" "$prefix/shared/config"
if [[ ! -e "$release/repo" ]]; then
  # Clone in a temporary directory so a failed fetch leaves no partial checkout.
  staging=$(mktemp -d "$prefix/releases/.checkout.XXXXXXXX")
  trap 'rm -rf -- "$staging"' EXIT
  git clone --quiet --no-checkout --no-hardlinks -- "$repo" "$staging/repo"
  if ! git -C "$staging/repo" cat-file -e "$ref^{commit}" 2>/dev/null; then
    git -C "$staging/repo" fetch --quiet origin "$ref"
  fi
  [[ $(git -C "$staging/repo" rev-parse "$ref^{commit}") == "$ref" ]] || die 'requested object is not the exact commit'
  git -C "$staging/repo" checkout --quiet --detach "$ref"
  [[ -f "$staging/repo/services/gpu-worker/worker.py" ]] || die 'commit does not contain the worker'
  mkdir -p -- "$release"
  mv -- "$staging/repo" "$release/repo"
  rm -rf -- "$staging"
  trap - EXIT
fi
[[ -d "$release/repo/.git" ]] || die 'release repository is invalid'
check_clean "$release/repo"
[[ $(git -C "$release/repo" rev-parse HEAD) == "$ref" ]] || die 'release checkout does not match requested commit'
if [[ ! -x "$release/venv/bin/python" ]]; then
  "$python" -m venv --without-pip "$release/venv"
fi
"$release/venv/bin/python" -c 'import sys; assert sys.version_info >= (3,10)'
config="$prefix/shared/config/worker.env"
if [[ ! -e "$config" ]]; then
  cat > "$config" <<'EOF'
# Trusted shell configuration; sourced by run-worker. Never commit secrets.
# Existing environment values remain available unless assigned here.
# WORKER_BACKEND=fixture
# WORKER_TOKEN='set-an-optional-token'
# WORKER_COMMAND_JSON='["/absolute/path/to/model-adapter"]'
# WORKER_JOB_TIMEOUT=900
EOF
fi
runner=$(mktemp "$prefix/.run-worker.XXXXXXXX")
cat > "$runner" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
[[ $# == 0 ]] || { echo 'run-worker accepts configuration through shared/config/worker.env or environment only' >&2; exit 1; }
prefix=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
# Resolve the release once so a subsequent deployment cannot mix code and venv.
release=$(cd -- "$prefix/current" && pwd -P)
set -a
source "$prefix/shared/config/worker.env"
set +a
export WORKER_BACKEND=${WORKER_BACKEND:-fixture}
export PYTHONDONTWRITEBYTECODE=1
exec "$release/venv/bin/python" "$release/repo/services/gpu-worker/worker.py" \
  --host 127.0.0.1 --port 4320 \
  --data-dir "$prefix/shared/data" --fixture-dir "$prefix/shared/fixtures"
EOF
chmod 700 "$runner"
mv -f -- "$runner" "$prefix/run-worker"
link=$(mktemp -d "$prefix/.current.XXXXXXXX")
ln -s -- "releases/$ref" "$link/current"
mv -Tf -- "$link/current" "$prefix/current"
rmdir -- "$link"
printf 'Deployed commit %s\nStart (or restart after stopping the old process): %s/run-worker\n' "$ref" "$prefix"
