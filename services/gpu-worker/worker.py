#!/usr/bin/env python3
"""Vastness serial artifact worker. Fixture and trusted command backends."""
import argparse
from collections import deque
from copy import deepcopy
import hashlib
import hmac
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import math
import os
from pathlib import Path
import platform
import re
import shutil
import signal
import subprocess
import sys
import threading
import time
import struct

from adapters import FixtureBackend, CommandBackend
from probe import inventory
from urllib.parse import urlsplit

BACKEND = "fake-fixture-v1"
VERSION = "0.1.0"
REPO_ROOT = Path(__file__).resolve().parents[2]
IDENTIFIER = re.compile(r"^[a-zA-Z0-9_-]{1,80}$")
TERMINAL = {"succeeded", "failed", "cancelled"}
ARTIFACT_FILES = (("scene.ply", "ply"), ("collider.glb", "glb"))
MAX_BODY = 64 * 1024
MAX_LOGS = 64
MAX_LOG_LENGTH = 2048


class APIError(Exception):
    def __init__(self, status, message):
        super().__init__(message)
        self.status = status


def finite_number(value):
    if type(value) not in (int, float):
        return False
    try:
        return math.isfinite(value)
    except OverflowError:
        return False


def validate_request(value):
    """Mirror packages/protocol WorkerJobRequestSchema without Python packages."""
    if not isinstance(value, dict):
        raise APIError(400, "Expected a JSON job object")
    identifier = value.get("id")
    if not isinstance(identifier, str) or not IDENTIFIER.fullmatch(identifier):
        raise APIError(400, "id must be 1–80 ASCII letters, digits, underscores or hyphens")
    if not isinstance(value.get("prompt"), str) or len(value["prompt"].encode("utf-16-le", errors="surrogatepass")) // 2 > 4000:
        raise APIError(400, "prompt must be a string of at most 4000 UTF-16 code units")
    seed = value.get("seed")
    if not finite_number(seed) or int(seed) != seed:
        raise APIError(400, "seed must be a finite integer")
    if "fixture" in value and value["fixture"] not in ("arrival", "observatory"):
        raise APIError(400, "fixture must be arrival or observatory")
    request = {key: value[key] for key in ("id", "prompt", "seed", "fixture") if key in value}
    if "boundary" in value:
        boundary = value["boundary"]
        if not isinstance(boundary, dict) or not isinstance(boundary.get("portalId"), str):
            raise APIError(400, "boundary.portalId must be a string")
        position = boundary.get("position")
        if not isinstance(position, list) or len(position) != 3 or not all(finite_number(n) for n in position):
            raise APIError(400, "boundary.position must contain three finite numbers")
        if not all(finite_number(boundary.get(key)) and boundary[key] > 0 for key in ("width", "height")):
            raise APIError(400, "boundary width and height must be positive finite numbers")
        request["boundary"] = {key: boundary[key] for key in ("portalId", "position", "width", "height")}
    return request


def version_info(backend=BACKEND):
    try:
        result = subprocess.run(["git", "rev-parse", "HEAD"], cwd=REPO_ROOT,
                                capture_output=True, text=True, timeout=5, check=False)
        commit = result.stdout.strip() if result.returncode == 0 else None
    except (OSError, subprocess.TimeoutExpired):
        commit = None
    return {"service": "vastness-gpu-worker", "version": VERSION, "backend": backend,
            "python": platform.python_version(), "gitCommit": commit}


class JobCancelled(Exception):
    pass


class JobContext:
    def __init__(self, store, record):
        self.store, self.record = store, record
        self.deadline = time.monotonic() + store.job_timeout

    def check(self):
        with self.store.condition:
            if self.record["job"]["status"] != "running":
                raise JobCancelled("Job cancelled")
            if time.monotonic() >= self.deadline:
                raise TimeoutError("Job exceeded configured timeout")

    def wait(self, duration):
        end = time.monotonic() + duration
        with self.store.condition:
            while time.monotonic() < end:
                self.check()
                self.store.condition.wait(min(end - time.monotonic(), max(0, self.deadline - time.monotonic())))
        self.check()

    def log(self, message):
        with self.store.condition:
            append_log(self.record, message)

    def progress(self, value):
        with self.store.condition:
            self.check()
            self.record["job"]["progress"] = value
            self.store._save(self.record)


def append_log(record, message):
    record["job"]["logs"].append(str(message)[:MAX_LOG_LENGTH])
    del record["job"]["logs"][:-MAX_LOGS]


def validate_artifact(path, format_name):
    if path.is_symlink() or not path.is_file():
        raise ValueError(f"{path.name} must be a regular output file")
    size = path.stat().st_size
    with path.open("rb") as stream:
        if format_name == "glb":
            header = stream.read(12)
            if len(header) != 12 or struct.unpack("<4sII", header) != (b"glTF", 2, size) or size <= 12:
                raise ValueError("collider.glb has invalid GLB magic, version or declared length")
        else:
            header = bytearray()
            while len(header) < 65536:
                line = stream.readline(65536 - len(header))
                header.extend(line)
                if line.strip() == b"end_header":
                    break
                if not line:
                    break
            lines = bytes(header).splitlines()
            vertices = [line.split() for line in lines if line.startswith(b"element vertex ")]
            if (not lines or lines[0] != b"ply" or b"format binary_little_endian 1.0" not in lines
                    or lines[-1] != b"end_header" or len(header) >= size or not vertices
                    or not vertices[0][-1].isdigit() or int(vertices[0][-1]) <= 0):
                raise ValueError("scene.ply requires a binary_little_endian PLY header and nonempty vertices")


class JobStore:
    """Own durable job state and the one serial executor behind the HTTP boundary."""
    def __init__(self, data_dir, backend, job_timeout):
        self.directory = Path(data_dir).resolve()
        self.backend = backend
        self.job_timeout = job_timeout
        self.condition = threading.Condition()
        self.stopping = False
        self.queue = deque()
        self.records = {}
        (self.directory / "jobs").mkdir(parents=True, exist_ok=True)
        (self.directory / "artifacts").mkdir(exist_ok=True)
        (self.directory / "requests").mkdir(exist_ok=True)
        (self.directory / "failures").mkdir(exist_ok=True)
        for path in sorted((self.directory / "jobs").glob("*.json")):
            record = json.loads(path.read_text(encoding="utf-8"))
            identifier = record["job"]["id"]
            if not IDENTIFIER.fullmatch(identifier) or path.stem != identifier:
                raise ValueError(f"Invalid persisted job record: {path.name}")
            self.records[identifier] = record
            if record["job"]["status"] not in TERMINAL:
                record["job"]["status"] = "failed"
                record["job"]["error"] = "Worker restarted before job completion; submit a new job id to retry"
                append_log(record, record["job"]["error"])
                record["artifacts"] = []
                self._save(record)
        self.executor = threading.Thread(target=self._run, name="worker-executor", daemon=True)
        self.executor.start()

    def _save(self, record):
        destination = self.directory / "jobs" / f"{record['job']['id']}.json"
        temporary = destination.with_suffix(".tmp")
        with temporary.open("w", encoding="utf-8") as stream:
            json.dump(record, stream, ensure_ascii=True, allow_nan=False)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, destination)

    def submit(self, request):
        try:
            self.backend.validate(request)
        except ValueError as error:
            raise APIError(400, str(error)) from error
        with self.condition:
            if self.stopping:
                raise APIError(503, "Worker is stopping")
            identifier = request["id"]
            if identifier in self.records:
                raise APIError(409, "Job id already exists; inspect it or submit a new id")
            record = {"request": request, "job": {
                "id": identifier, "status": "queued", "progress": 0,
                "logs": [f"Queued {self.backend.info['id']}"],
                "backend": self.backend.info["id"], "error": None,
            }, "artifacts": []}
            self._save(record)
            self.records[identifier] = record
            self.queue.append(identifier)
            self.condition.notify_all()
            return deepcopy(record["job"])

    def _record(self, identifier):
        if identifier not in self.records:
            raise APIError(404, "Job not found")
        return self.records[identifier]

    def status(self, identifier):
        with self.condition:
            return deepcopy(self._record(identifier)["job"])

    def cancel(self, identifier):
        with self.condition:
            record = self._record(identifier)
            if record["job"]["status"] not in TERMINAL:
                record["job"]["status"] = "cancelled"
                append_log(record, "Cancelled by request")
                record["artifacts"] = []
                self._save(record)
                self.condition.notify_all()
            return deepcopy(record["job"])

    def manifest(self, identifier):
        with self.condition:
            record = self._record(identifier)
            if record["job"]["status"] != "succeeded":
                raise APIError(409, "Artifacts are available only after job success")
            return deepcopy(record["artifacts"])

    def artifact(self, identifier, filename):
        with self.condition:
            record = self._record(identifier)
            if record["job"]["status"] != "succeeded" or filename not in dict(ARTIFACT_FILES):
                raise APIError(404, "Artifact not found")
            artifact = next((item for item in record["artifacts"] if item["url"].endswith("/" + filename)), None)
            if artifact is None:
                raise APIError(404, "Artifact not found")
            return self.directory / "artifacts" / identifier / filename, deepcopy(artifact)

    def _run(self):
        while True:
            with self.condition:
                self.condition.wait_for(lambda: self.stopping or self.queue)
                if self.stopping:
                    return
                record = self.records[self.queue.popleft()]
                if record["job"]["status"] != "queued":
                    continue
            try:
                self._execute(record)
            except Exception as error:
                # Keep the serial executor alive after adapter or filesystem errors.
                with self.condition:
                    if record["job"]["status"] != "cancelled":
                        record["job"]["status"] = "failed"
                        record["job"]["error"] = f"{type(error).__name__}: {error}"
                        append_log(record, record["job"]["error"])
                        record["artifacts"] = []
                        try:
                            self._save(record)
                        except OSError as storage_error:
                            print(f"Cannot persist failed job {record['job']['id']}: {storage_error}", file=sys.stderr)

    def _execute(self, record):
        identifier = record["job"]["id"]
        staging = self.directory / "artifacts" / f".{identifier}.tmp"
        with self.condition:
            if record["job"]["status"] != "queued":
                return
            record["job"]["status"] = "running"
            append_log(record, f"Running {self.backend.info['id']}")
            self._save(record)
        context = JobContext(self, record)
        try:
            if staging.exists():
                shutil.rmtree(staging)
            staging.mkdir()
            request_path = self.directory / "requests" / f"{identifier}.json"
            request_path.write_text(json.dumps(record["request"], allow_nan=False), encoding="utf-8")
            self.backend.run(deepcopy(record["request"]), request_path, staging, context)
            context.check()
            artifacts = []
            for filename, format_name in ARTIFACT_FILES:
                path = staging / filename
                validate_artifact(path, format_name)
                digest = hashlib.sha256()
                size = 0
                with path.open("rb") as reader:
                    while block := reader.read(1024 * 1024):
                        context.check()
                        digest.update(block)
                        size += len(block)
                artifacts.append({"url": f"/artifacts/{identifier}/{filename}", "sha256": digest.hexdigest(),
                                  "bytes": size, "format": format_name, "backend": self.backend.info["id"]})
            with self.condition:
                context.check()
                os.replace(staging, self.directory / "artifacts" / identifier)
                record["job"]["status"] = "succeeded"
                record["job"]["progress"] = 1
                append_log(record, "Visual and collision artifacts are ready")
                record["artifacts"] = artifacts
                self._save(record)
        finally:
            if staging.exists():
                evidence = self.directory / "failures" / identifier
                os.replace(staging, evidence)
                with self.condition:
                    append_log(record, f"Unpublished adapter evidence retained at {evidence}")
                    self._save(record)

    def close(self):
        with self.condition:
            self.stopping = True
            for record in self.records.values():
                if record["job"]["status"] not in TERMINAL:
                    record["job"]["status"] = "cancelled"
                    append_log(record, "Cancelled during worker shutdown")
                    self._save(record)
            self.condition.notify_all()
        self.executor.join()


class WorkerServer(ThreadingHTTPServer):
    daemon_threads = True

    def server_close(self):
        super().server_close()
        self.jobs.close()


class WorkerHandler(BaseHTTPRequestHandler):
    def setup(self):
        super().setup()
        self.connection.settimeout(10)

    def log_message(self, format_string, *args):
        # The CLI has a startup message; job diagnostics are exposed in job logs.
        pass

    def _json(self, status, value):
        data = json.dumps(value, allow_nan=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def _body(self):
        if self.headers.get("Transfer-Encoding"):
            raise APIError(400, "Transfer-Encoding is unsupported; send Content-Length")
        try:
            size = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            raise APIError(400, "Invalid Content-Length") from None
        if size < 0:
            raise APIError(400, "Invalid Content-Length")
        if size > MAX_BODY:
            raise APIError(413, "Request exceeds 64 KiB")
        if self.headers.get_content_type() != "application/json":
            raise APIError(415, "Content-Type must be application/json")
        try:
            def reject_constant(value):
                raise ValueError(f"Invalid JSON constant: {value}")
            return json.loads(self.rfile.read(size), parse_constant=reject_constant)
        except (ValueError, UnicodeError):
            raise APIError(400, "Invalid JSON") from None

    def do_GET(self):
        self._dispatch()

    def do_POST(self):
        self._dispatch()

    def _dispatch(self):
        try:
            token = self.server.token
            if token and not hmac.compare_digest(self.headers.get("Authorization", "").encode(), f"Bearer {token}".encode()):
                raise APIError(401, "Bearer token required")
            path = urlsplit(self.path).path
            parts = path.strip("/").split("/")
            jobs = self.server.jobs
            if self.command == "GET":
                if path == "/health":
                    self._json(200, {"status": "ok" if jobs.executor.is_alive() else "degraded", "backend": jobs.backend.info["id"],
                                     "version": VERSION, "mode": jobs.backend.info["mode"]})
                    return
                if path == "/version":
                    self._json(200, self.server.version)
                    return
                if path == "/capabilities":
                    self._json(200, self.server.capabilities)
                    return
                if len(parts) in (2, 3) and parts[0] == "jobs" and IDENTIFIER.fullmatch(parts[1]):
                    if len(parts) == 2:
                        self._json(200, jobs.status(parts[1]))
                        return
                    if parts[2] == "artifacts":
                        self._json(200, jobs.manifest(parts[1]))
                        return
                if len(parts) == 3 and parts[0] == "artifacts" and IDENTIFIER.fullmatch(parts[1]):
                    filename, artifact = jobs.artifact(parts[1], parts[2])
                    try:
                        stream = filename.open("rb")
                    except FileNotFoundError:
                        raise APIError(404, "Artifact file is missing") from None
                    with stream:
                        self.send_response(200)
                        self.send_header("Content-Type", "model/gltf-binary" if artifact["format"] == "glb" else "application/octet-stream")
                        self.send_header("Content-Length", str(artifact["bytes"]))
                        self.send_header("ETag", f'"{artifact["sha256"]}"')
                        self.send_header("Cache-Control", "private, max-age=31536000, immutable")
                        self.end_headers()
                        shutil.copyfileobj(stream, self.wfile)
                    return
            if self.command == "POST":
                if path == "/jobs":
                    self._json(202, jobs.submit(validate_request(self._body())))
                    return
                if len(parts) == 3 and parts[0] == "jobs" and IDENTIFIER.fullmatch(parts[1]) and parts[2] == "cancel":
                    self._json(200, jobs.cancel(parts[1]))
                    return
            raise APIError(404, "Route not found")
        except APIError as error:
            self._json(error.status, {"error": str(error)})
        except (BrokenPipeError, ConnectionResetError, TimeoutError):
            pass
        except OSError:
            self._json(500, {"error": "Worker storage operation failed"})


def create_server(host="127.0.0.1", port=4320, data_dir=None, fixture_dir=None, delay=1.0, token=None,
                  backend="fixture", command_json=None, job_timeout=900, check_torch=False):
    if not math.isfinite(delay) or delay < 0:
        raise ValueError("delay must be finite and nonnegative")
    if not math.isfinite(job_timeout) or job_timeout <= 0:
        raise ValueError("job_timeout must be finite and positive")
    if backend == "fixture":
        adapter = FixtureBackend(fixture_dir or REPO_ROOT / "artifacts" / "fixtures", delay)
    elif backend == "command":
        adapter = CommandBackend(command_json)
    elif hasattr(backend, "run") and hasattr(backend, "info") and hasattr(backend, "validate"):
        adapter = backend
    else:
        raise ValueError("Unknown backend")
    version = version_info(adapter.info["id"])
    hardware = inventory(check_torch=check_torch)
    server = WorkerServer((host, port), WorkerHandler)
    try:
        server.jobs = JobStore(data_dir or REPO_ROOT / ".runtime" / "gpu-worker", adapter, job_timeout)
        server.token = token
        server.version = version
        server.capabilities = {"schemaVersion": 1, "backend": adapter.info, "maxConcurrency": 1,
                               "formats": ["ply", "glb"], "cancellation": True, "hardware": hardware,
                               "version": {key: value for key, value in version.items() if key != "backend"}}
        return server
    except Exception:
        ThreadingHTTPServer.server_close(server)
        raise


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default=os.environ.get("WORKER_HOST", "127.0.0.1"))
    parser.add_argument("--port", type=int, default=int(os.environ.get("WORKER_PORT", "4320")))
    parser.add_argument("--data-dir", type=Path, default=REPO_ROOT / ".runtime" / "gpu-worker")
    parser.add_argument("--fixture-dir", type=Path, default=REPO_ROOT / "artifacts" / "fixtures")
    parser.add_argument("--delay", type=float, default=1.0)
    parser.add_argument("--backend", choices=("fixture", "command"), default=os.environ.get("WORKER_BACKEND", "fixture"))
    parser.add_argument("--command-json", default=os.environ.get("WORKER_COMMAND_JSON"))
    parser.add_argument("--job-timeout", type=float, default=float(os.environ.get("WORKER_JOB_TIMEOUT", "900")))
    parser.add_argument("--check-torch", action="store_true")
    arguments = parser.parse_args()
    server = create_server(**vars(arguments), token=os.environ.get("WORKER_TOKEN") or None)
    print(f"Vastness {server.jobs.backend.info['id']} listening on http://{arguments.host}:{server.server_port}", flush=True)
    def terminate(signum, frame):
        raise KeyboardInterrupt
    signal.signal(signal.SIGTERM, terminate)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
