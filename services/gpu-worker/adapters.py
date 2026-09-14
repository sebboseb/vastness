"""Trusted backend adapters write staging files; the worker owns their publication."""
import json
import os
from pathlib import Path
import selectors
import signal
import subprocess
import time


class FixtureBackend:
    info = {"id": "fake-fixture-v1", "version": "1", "mode": "fixture", "requiresGpu": False}

    def __init__(self, fixture_dir, delay):
        self.fixtures = Path(fixture_dir)
        self.delay = delay

    def validate(self, request):
        if request.get("fixture") not in ("arrival", "observatory"):
            raise ValueError("fixture adapter requires arrival or observatory")

    def run(self, request, request_path, output, context):
        context.log("Copying authored fixture; no AI generation")
        for step in range(10):
            context.wait(self.delay / 10)
            context.progress((step + 1) * 0.08)
        for filename in ("scene.ply", "collider.glb"):
            with (self.fixtures / request["fixture"] / filename).open("rb") as source, (output / filename).open("wb") as target:
                while block := source.read(1024 * 1024):
                    context.check()
                    target.write(block)


class CommandBackend:
    # The generic adapter itself needs no GPU; the configured executable may do so.
    info = {"id": "command-v1", "version": "1", "mode": "command", "requiresGpu": False}

    def __init__(self, command_json):
        try:
            self.command = json.loads(command_json)
        except (ValueError, TypeError) as error:
            raise ValueError("command backend requires WORKER_COMMAND_JSON / --command-json containing argv") from error
        if not isinstance(self.command, list) or not self.command or any(not isinstance(arg, str) or not arg or '\0' in arg for arg in self.command):
            raise ValueError("Command argv must be a nonempty JSON array of nonempty strings")
        if os.name != "posix":
            raise ValueError("Command backend requires POSIX process groups (Linux, WSL2 or macOS)")

    def validate(self, request):
        pass

    def run(self, request, request_path, output, context):
        context.check()
        process = subprocess.Popen([*self.command, "--request", str(request_path), "--output", str(output)],
                                   shell=False, stdin=subprocess.DEVNULL, stdout=subprocess.PIPE,
                                   stderr=subprocess.STDOUT, start_new_session=True)
        selector = selectors.DefaultSelector()
        selector.register(process.stdout, selectors.EVENT_READ)
        try:
            while True:
                context.check()
                for key, _ in selector.select(0.05):
                    block = os.read(key.fileobj.fileno(), 4096)
                    if block:
                        context.log(block.decode("utf-8", errors="replace"))
                    else:
                        selector.unregister(key.fileobj)
                if process.poll() is not None:
                    # Drain only already-readable bytes. A descendant retaining the pipe cannot hang completion.
                    for _ in range(256):
                        if not selector.select(0):
                            break
                        block = os.read(process.stdout.fileno(), 4096)
                        if not block:
                            break
                        context.log(block.decode("utf-8", errors="replace"))
                    if process.returncode:
                        raise RuntimeError(f"Command exited with status {process.returncode}")
                    return
        finally:
            # Always reap the group, including descendants left by a successful leader.
            try:
                os.killpg(process.pid, signal.SIGTERM)
            except ProcessLookupError:
                pass
            deadline = time.monotonic() + 0.3
            while time.monotonic() < deadline:
                try:
                    os.killpg(process.pid, 0)
                except ProcessLookupError:
                    break
                time.sleep(0.02)
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
            process.wait(timeout=2)
            selector.close()
            process.stdout.close()
