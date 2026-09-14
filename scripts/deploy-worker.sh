#!/usr/bin/env bash
# Mac-to-Linux transport: both application and bootstrap come from a Git commit.
set -euo pipefail
usage() {
  cat <<'EOF'
Usage: deploy-worker.sh --host <verified SSH alias or user@host>
                        --ref <full40hex commit> --prefix <absolute Linux path>
                        [--repo <local Git repository>] [--python <python3>]
Uses SSH config for user, port and key. Requires preverified host fingerprints.
Transfers committed code via Git bundle. Does not start/stop the worker or copy
fixtures, operator configuration, models or uncommitted source files.
EOF
}
die() { printf 'deploy-worker: %s\n' "$*" >&2; exit 1; }
quote() { printf "'%s'" "${1//\'/\'\\\'\'}"; }
host= ref= prefix= python=python3
repo=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)
while (($#)); do
  case "$1" in
    -h|--help) usage; exit 0 ;;
    --host|--ref|--prefix|--repo|--python)
      (($# >= 2)) || die "missing value for $1"
      case "$1" in
        --host) host=$2 ;; --ref) ref=$2 ;; --prefix) prefix=$2 ;;
        --repo) repo=$2 ;; --python) python=$2 ;;
      esac
      shift 2 ;;
    *) die "unknown argument: $1" ;;
  esac
done
[[ -n "$host" && -n "$ref" && -n "$prefix" ]] || { usage >&2; exit 1; }
[[ "$host" =~ ^[a-zA-Z0-9_][a-zA-Z0-9_.@:-]*$ ]] || die 'use a prepared SSH alias or user@host'
[[ "$ref" =~ ^[0-9a-fA-F]{40}$ ]] || die '--ref must be a full 40-hex commit'
ref=$(printf '%s' "$ref" | tr 'A-F' 'a-f')
[[ "$prefix" == /* && "$prefix" != / ]] || die '--prefix must be an absolute non-root Linux path'
for tool in git ssh; do command -v "$tool" >/dev/null || die "$tool is required"; done
repo=$(git -C "$repo" rev-parse --absolute-git-dir)
[[ $(git -C "$repo" rev-parse "$ref^{commit}") == "$ref" ]] || die 'requested object is not the exact commit'
umask 077
temporary=$(mktemp -d)
trap 'rm -rf -- "$temporary"' EXIT
# A private temporary ref makes arbitrary detached commits bundleable without
# modifying refs or copying working-tree edits in the source repository.
git init --bare --quiet "$temporary/source.git"
git -C "$temporary/source.git" fetch --quiet -- "$repo" "$ref"
git -C "$temporary/source.git" update-ref refs/heads/deploy FETCH_HEAD
git -C "$temporary/source.git" bundle create "$temporary/worker.bundle" refs/heads/deploy
git -C "$temporary/source.git" show "$ref:scripts/bootstrap-worker.sh" > "$temporary/bootstrap-worker.sh"
ssh_options=(-o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=10)
ssh "${ssh_options[@]}" "$host" 'test "$(uname -s)" = Linux && command -v bash >/dev/null && command -v git >/dev/null' || die 'SSH must reach Linux with Bash and Git; check the verified endpoint'
incoming="$prefix/incoming"
bundle="$incoming/$ref.bundle"
ssh "${ssh_options[@]}" "$host" "umask 077; mkdir -p -- $(quote "$incoming") && cat > $(quote "$bundle")" < "$temporary/worker.bundle"
ssh "${ssh_options[@]}" "$host" "bash -s -- --repo $(quote "$bundle") --ref $(quote "$ref") --prefix $(quote "$prefix") --python $(quote "$python")" < "$temporary/bootstrap-worker.sh"
printf 'Bundle/bootstrap deployment finished for %s. Start the worker and verify /version through the SSH tunnel.\n' "$ref"
