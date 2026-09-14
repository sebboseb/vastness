#!/usr/bin/env python3
"""Read-only typed inventory; CUDA/model execution is never implied by inspection."""
import argparse
import csv
from datetime import datetime, timezone
import json
import math
import platform
import re
import shutil
import subprocess
import sys


def command_probe(arguments, cwd=None, timeout=10):
    executable = shutil.which(arguments[0])
    if executable is None:
        return {"status": "unavailable", "exitCode": None, "stdout": "", "stderr": "Executable not found on PATH"}
    try:
        result = subprocess.run([executable, *arguments[1:]], cwd=cwd, capture_output=True,
                                text=True, encoding="utf-8", errors="replace", timeout=timeout, check=False)
        return {"status": "available" if result.returncode == 0 else "failed", "exitCode": result.returncode,
                "stdout": result.stdout.strip(), "stderr": result.stderr.strip()[:4096]}
    except (OSError, subprocess.TimeoutExpired) as error:
        return {"status": "failed", "exitCode": None, "stdout": "", "stderr": f"{type(error).__name__}: {error}"[:4096]}


def measurement(value):
    if value.lower() in ("n/a", "[n/a]", "not supported", "[not supported]", "unknown"):
        return None
    return float(value)


def inventory(check_torch=False):
    gpu_probe = command_probe(["nvidia-smi", "--query-gpu=index,uuid,name,driver_version,memory.total,memory.free", "--format=csv,noheader,nounits"])
    gpu = {"status": gpu_probe["status"], "devices": [], "error": gpu_probe["stderr"] or None}
    if gpu["status"] == "available":
        try:
            for row in csv.reader(gpu_probe["stdout"].splitlines()):
                index, uuid, name, driver, total, free = [value.strip() for value in row]
                device = {"index": int(index), "uuid": uuid, "name": name, "driverVersion": driver,
                          "vramTotalMiB": measurement(total), "vramFreeMiB": measurement(free)}
                if device["index"] < 0 or any(device[key] is not None and (not math.isfinite(device[key]) or device[key] < 0) for key in ("vramTotalMiB", "vramFreeMiB")):
                    raise ValueError("Invalid GPU index or VRAM measurement")
                gpu["devices"].append(device)
        except (ValueError, TypeError) as error:
            gpu = {"status": "failed", "devices": [], "error": f"Invalid nvidia-smi inventory: {error}"}
    driver = command_probe(["nvidia-smi"])
    toolkit = command_probe(["nvcc", "--version"])
    driver_version = re.search(r"CUDA Version:\s*([\d.]+)", driver["stdout"])
    toolkit_version = re.search(r"release\s+([\d.]+)", toolkit["stdout"])
    torch = {"status": "not_checked", "version": None, "cudaBuildVersion": None, "cudaAvailable": None, "error": None}
    if check_torch:
        # Import and CUDA availability inspection happen only in this bounded child.
        code = '''import importlib.util,json
if importlib.util.find_spec("torch") is None:
 print(json.dumps({"status":"unavailable","version":None,"cudaBuildVersion":None,"cudaAvailable":None,"error":"PyTorch is not installed"}))
else:
 import torch
 print(json.dumps({"status":"available","version":str(torch.__version__),"cudaBuildVersion":torch.version.cuda,"cudaAvailable":bool(torch.cuda.is_available()),"error":None}))
'''
        result = command_probe([sys.executable, "-c", code])
        if result["status"] == "available":
            try:
                torch = json.loads(result["stdout"])
            except (ValueError, TypeError):
                torch.update(status="failed", error="PyTorch probe returned invalid JSON")
        else:
            torch.update(status=result["status"], error=result["stderr"] or "PyTorch probe failed")
    return {
        "schemaVersion": 1, "capturedAt": datetime.now(timezone.utc).isoformat(),
        "host": {"hostname": platform.node(), "os": platform.system(), "release": platform.release(), "arch": platform.machine()},
        "python": {"version": platform.python_version(), "executable": sys.executable},
        "gpu": gpu,
        "cuda": {"driverStatus": driver["status"], "driverSupportedVersion": driver_version.group(1) if driver_version else None,
                 "toolkitStatus": toolkit["status"], "toolkitVersion": toolkit_version.group(1) if toolkit_version else None},
        "pytorch": torch, "nvidiaExecution": "not_run",
        "notes": ["No model generation or NVIDIA execution benchmark was run.",
                  "Missing tools are not proof of absent hardware. Unknown measurements are not zero.",
                  "Driver-supported CUDA is distinct from an installed toolkit and a PyTorch CUDA build.",
                  "PyTorch availability inspection does not validate model inference."],
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check-torch", action="store_true", help="Inspect PyTorch in a subprocess with a ten-second deadline")
    print(json.dumps(inventory(**vars(parser.parse_args())), indent=2, allow_nan=False))
