#!/usr/bin/env python3
"""Deploy committed worker code through Windows OpenSSH into an existing WSL user."""
import argparse
import base64
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import subprocess
import tempfile


# This program runs inside Linux. Its only stdin is the binary Git bundle.
REMOTE_PROGRAM = r'''
import hashlib, os, pathlib, platform, shutil, subprocess, sys, tempfile
if platform.system() != "Linux":
    raise SystemExit("deployment requires Linux inside WSL")
if sys.version_info < (3, 10):
    raise SystemExit("Python >=3.10 required")
import venv
for tool in ("git", "bash", CONFIG["python"]):
    if not shutil.which(tool):
        raise SystemExit("missing prerequisite: " + tool)
prefix = pathlib.Path(CONFIG["prefix"])
if not prefix.is_absolute() or prefix.resolve() == pathlib.Path("/"):
    raise SystemExit("prefix must resolve to an absolute non-root Linux path")
os.umask(0o077)
prefix.mkdir(parents=True, exist_ok=True)
prefix = prefix.resolve()
incoming = prefix / "incoming"
incoming.mkdir(exist_ok=True)
bundle = incoming / (CONFIG["ref"] + ".bundle")
fd, temporary = tempfile.mkstemp(prefix=".upload-", dir=incoming)
try:
    digest = hashlib.sha256()
    remaining = CONFIG["size"]
    with os.fdopen(fd, "wb") as output:
        while remaining:
            chunk = sys.stdin.buffer.read(min(1024 * 1024, remaining))
            if not chunk:
                raise SystemExit("truncated bundle")
            output.write(chunk)
            digest.update(chunk)
            remaining -= len(chunk)
        if sys.stdin.buffer.read(1):
            raise SystemExit("bundle exceeds expected size")
        output.flush()
        os.fsync(output.fileno())
    if digest.hexdigest() != CONFIG["sha256"]:
        raise SystemExit("bundle SHA-256 mismatch")
    # Resolve bootstrap from the transmitted commit, never from a working tree.
    with tempfile.TemporaryDirectory(prefix=".verify-", dir=incoming) as directory:
        source = pathlib.Path(directory) / "source.git"
        subprocess.run(["git", "init", "--bare", "--quiet", str(source)], check=True)
        subprocess.run(["git", "-C", str(source), "fetch", "--quiet", str(temporary),
                        "refs/heads/deploy"], check=True)
        actual = subprocess.check_output(["git", "-C", str(source), "rev-parse", "FETCH_HEAD"], text=True).strip()
        if actual != CONFIG["ref"]:
            raise SystemExit("bundle commit differs from requested commit")
        bootstrap = subprocess.check_output(["git", "-C", str(source), "show",
                                            actual + ":scripts/bootstrap-worker.sh"])
    os.replace(temporary, bundle)
    subprocess.run(["bash", "-s", "--", "--repo", str(bundle), "--ref", CONFIG["ref"],
                    "--prefix", str(prefix), "--python", CONFIG["python"]], input=bootstrap, check=True)
finally:
    if os.path.exists(temporary):
        os.unlink(temporary)
'''


def encode_remote_command(distro, user):
    """Encode each language boundary; no Linux paths become shell expressions."""
    loader = "import json,sys;size=int.from_bytes(sys.stdin.buffer.read(4),'big');assert 0<size<=65536;metadata=json.loads(sys.stdin.buffer.read(size));exec(metadata['program'],{'CONFIG':metadata['config']})"
    encoded_source = base64.b64encode(loader.encode()).decode()
    python = "import base64;exec(base64.b64decode('" + encoded_source + "'))"
    # All dynamic values below are single-quoted PowerShell literals.
    quote = lambda value: "'" + value.replace("'", "''") + "'"
    powershell = "$code=" + quote(python) + "; & wsl.exe -d " + quote(distro)
    powershell += " -u " + quote(user) + " --exec python3 -c $code; exit $LASTEXITCODE"
    encoded_powershell = base64.b64encode(powershell.encode("utf-16le")).decode()
    return "powershell.exe -NoProfile -NonInteractive -EncodedCommand " + encoded_powershell


def parse_args(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", required=True, help="verified Windows SSH alias")
    parser.add_argument("--distro", default="Ubuntu-24.04")
    parser.add_argument("--user", default="vastness", help="existing WSL Linux user")
    parser.add_argument("--ref", required=True, help="full 40-hex committed SHA")
    parser.add_argument("--prefix", required=True, help="absolute non-root Linux deployment path")
    parser.add_argument("--repo", type=Path, default=Path(__file__).resolve().parent.parent)
    parser.add_argument("--python", default="python3", help="Linux Python used by bootstrap")
    args = parser.parse_args(argv)
    if not re.fullmatch(r"[A-Za-z0-9_][A-Za-z0-9_.@:-]*", args.host):
        parser.error("use a prepared SSH alias or user@host")
    if not re.fullmatch(r"[0-9a-fA-F]{40}", args.ref):
        parser.error("--ref must be a full 40-hex commit")
    args.ref = args.ref.lower()
    prefix = PurePosixPath(args.prefix)
    if not prefix.is_absolute() or str(prefix) in ("/", "//") or "\x00" in args.prefix:
        parser.error("--prefix must be an absolute non-root Linux path")
    for name in ("distro", "user", "python"):
        value = getattr(args, name)
        if not value or value.startswith("-") or any(c in value for c in "\x00\r\n"):
            parser.error("invalid --" + name)
    return args


def deploy(args):
    for tool in ("git", "ssh"):
        if not shutil.which(tool):
            raise RuntimeError(tool + " is required")
    repo = subprocess.check_output(["git", "-C", str(args.repo), "rev-parse", "--absolute-git-dir"], text=True).strip()
    actual = subprocess.check_output(["git", "-C", repo, "rev-parse", args.ref + "^{commit}"], text=True).strip()
    if actual != args.ref:
        raise RuntimeError("requested object is not the exact commit")
    # Fail locally before SSH if the selected commit is not deployable.
    subprocess.run(["git", "-C", repo, "cat-file", "-e", args.ref + ":scripts/bootstrap-worker.sh"], check=True)
    subprocess.run(["git", "-C", repo, "cat-file", "-e", args.ref + ":services/gpu-worker/worker.py"], check=True)
    with tempfile.TemporaryDirectory(prefix="vastness-wsl-") as directory:
        source = Path(directory) / "source.git"
        bundle = Path(directory) / "worker.bundle"
        subprocess.run(["git", "init", "--bare", "--quiet", str(source)], check=True)
        subprocess.run(["git", "-C", str(source), "fetch", "--quiet", "--", repo, args.ref], check=True)
        subprocess.run(["git", "-C", str(source), "update-ref", "refs/heads/deploy", "FETCH_HEAD"], check=True)
        subprocess.run(["git", "-C", str(source), "bundle", "create", str(bundle), "refs/heads/deploy"], check=True)
        digest = hashlib.sha256()
        with bundle.open("rb") as content:
            for chunk in iter(lambda: content.read(1024 * 1024), b""):
                digest.update(chunk)
        config = dict(ref=args.ref, prefix=args.prefix, python=args.python,
                      size=bundle.stat().st_size, sha256=digest.hexdigest())
        command = encode_remote_command(args.distro, args.user)
        # Keep the Windows command short; the program/configuration travel in a
        # bounded envelope before the binary bundle on the same unmodified stdin.
        transfer = Path(directory) / "transfer.bin"
        envelope = json.dumps({"program": REMOTE_PROGRAM, "config": config}).encode()
        if len(envelope) > 65536:
            raise RuntimeError("deployment envelope is too large")
        with transfer.open("wb") as output, bundle.open("rb") as content:
            output.write(len(envelope).to_bytes(4, "big"))
            output.write(envelope)
            shutil.copyfileobj(content, output)
        with transfer.open("rb") as content:
            subprocess.run(["ssh", "-T", "-o", "BatchMode=yes", "-o", "StrictHostKeyChecking=yes",
                            "-o", "ConnectTimeout=10", args.host, command], stdin=content, check=True)
    print("WSL bundle/bootstrap deployment finished for " + args.ref + ". Worker was not started.")


def main(argv=None):
    args = parse_args(argv)
    try:
        deploy(args)
    except (OSError, RuntimeError, subprocess.CalledProcessError) as error:
        raise SystemExit("deploy-worker-wsl: " + str(error)) from error


if __name__ == "__main__":
    main()
