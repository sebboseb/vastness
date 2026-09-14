#!/usr/bin/env python3
"""Read-only machine inventory. Prints JSON; never installs or changes host software."""
from datetime import datetime, timezone
from importlib import metadata
import json
from pathlib import Path
import platform
import shutil
import subprocess
import sys

REPO_ROOT = Path(__file__).resolve().parents[2]


def command_probe(arguments, cwd=None):
    executable = shutil.which(arguments[0])
    if executable is None:
        return {"command": arguments, "status": "unavailable", "executable": None,
                "exitCode": None, "stdout": "", "stderr": "Executable not found on PATH"}
    try:
        result = subprocess.run([executable, *arguments[1:]], cwd=cwd, capture_output=True,
                                text=True, encoding="utf-8", errors="replace", timeout=10, check=False)
        return {"command": arguments, "status": "ok" if result.returncode == 0 else "failed",
                "executable": executable, "exitCode": result.returncode,
                "stdout": result.stdout.strip(), "stderr": result.stderr.strip()}
    except (OSError, subprocess.TimeoutExpired) as error:
        return {"command": arguments, "status": "failed", "executable": executable,
                "exitCode": None, "stdout": "", "stderr": f"{type(error).__name__}: {error}"}


def inventory():
    try:
        torch = {"status": "installed", "version": metadata.version("torch")}
    except metadata.PackageNotFoundError:
        torch = {"status": "unavailable", "version": None}
    probes = {
        "gpu": command_probe(["nvidia-smi", "--query-gpu=name,memory.total,driver_version", "--format=csv"]),
        "nvidiaDriver": command_probe(["nvidia-smi"]),
        "cudaToolkit": command_probe(["nvcc", "--version"]),
        "gitCommit": command_probe(["git", "rev-parse", "HEAD"], REPO_ROOT),
        "gitStatus": command_probe(["git", "--no-optional-locks", "status", "--porcelain"], REPO_ROOT),
    }
    if platform.system() == "Windows":
        probes["wsl"] = command_probe(["wsl", "--list", "--verbose"])
    return {
        "capturedAt": datetime.now(timezone.utc).isoformat(),
        "host": platform.node(),
        "os": {"system": platform.system(), "release": platform.release(),
               "version": platform.version(), "machine": platform.machine()},
        "python": {"version": platform.python_version(), "executable": sys.executable},
        "pytorchPackage": torch,
        "probes": probes,
        "notes": [
            "No generation or GPU benchmark was run; no software or models were installed.",
            "nvidia-smi CUDA Version indicates driver compatibility, not an installed CUDA toolkit.",
            "Package metadata does not verify PyTorch CUDA functionality; unavailable probes are not hardware absence.",
        ],
    }


if __name__ == "__main__":
    print(json.dumps(inventory(), indent=2))
