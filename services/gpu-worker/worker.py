#!/usr/bin/env python3
"""Vastness fixture worker. Standard library only; no model or GPU dependency."""
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
import subprocess
import sys
import threading
from urllib.parse import urlsplit

BACKEND = "fake-fixture-v1"
VERSION = "0.1.0"
REPO_ROOT = Path(__file__).resolve().parents[2]
IDENTIFIER = re.compile(r"^[a-zA-Z0-9_-]{1,80}$")
TERMINAL = {"succeeded", "failed", "cancelled"}
ARTIFACT_FILES = (("scene.ply", "ply"), ("collider.glb", "glb"))
MAX_BODY = 64 * 1024


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
    if value.get("fixture") not in ("arrival", "observatory"):
        raise APIError(400, "fixture must be arrival or observatory")
    request = {key: value[key] for key in ("id", "prompt", "seed", "fixture")}
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


def version_info():
    try:
        result = subprocess.run(["git", "rev-parse", "HEAD"], cwd=REPO_ROOT,
                                capture_output=True, text=True, timeout=5, check=False)
        commit = result.stdout.strip() if result.returncode == 0 else None
    except (OSError, subprocess.TimeoutExpired):
        commit = None
    return {"service": "vastness-gpu-worker", "version": VERSION, "backend": BACKEND,
            "python": platform.python_version(), "gitCommit": commit}


class JobStore:
    """Own durable job state and the one serial executor behind the HTTP boundary."""
    def __init__(self, data_dir, fixture_dir, delay):
        if not math.isfinite(delay) or delay < 0:
            raise ValueError("delay must be finite and nonnegative")
        self.directory = Path(data_dir)
        self.fixtures = Path(fixture_dir)
        self.delay = delay
        self.condition = threading.Condition()
        self.stopping = False
        self.queue = deque()
        self.records = {}
        (self.directory / "jobs").mkdir(parents=True, exist_ok=True)
        (self.directory / "artifacts").mkdir(exist_ok=True)
        for path in sorted((self.directory / "jobs").glob("*.json")):
            record = json.loads(path.read_text(encoding="utf-8"))
            identifier = record["job"]["id"]
            if not IDENTIFIER.fullmatch(identifier) or path.stem != identifier:
                raise ValueError(f"Invalid persisted job record: {path.name}")
            self.records[identifier] = record
            if record["job"]["status"] not in TERMINAL:
                record["job"]["status"] = "failed"
                record["job"]["error"] = "Worker restarted before job completion; submit a new job id to retry"
                record["job"]["logs"].append(record["job"]["error"])
                record["artifacts"] = []
                self._save(record)
        self.executor = threading.Thread(target=self._run, name="fixture-executor", daemon=True)
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
        with self.condition:
            if self.stopping:
                raise APIError(503, "Worker is stopping")
            identifier = request["id"]
            if identifier in self.records:
                raise APIError(409, "Job id already exists; inspect it or submit a new id")
            record = {"request": request, "job": {
                "id": identifier, "status": "queued", "progress": 0,
                "logs": ["Queued authored fixture copy; no AI generation"],
                "backend": BACKEND, "error": None,
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
                record["job"]["logs"].append("Cancelled by request")
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
                        record["job"]["logs"].append(record["job"]["error"])
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
            record["job"]["logs"].append(f"Copying {record['request']['fixture']} fixture after {self.delay:g}s delay")
            self._save(record)
        try:
            for step in range(1, 11):
                with self.condition:
                    if self.condition.wait_for(lambda: record["job"]["status"] != "running", timeout=self.delay / 10):
                        return
                    record["job"]["progress"] = step * 0.08
                    self._save(record)
            staging.mkdir(exist_ok=True)
            artifacts = []
            for filename, format_name in ARTIFACT_FILES:
                with self.condition:
                    if record["job"]["status"] != "running":
                        return
                source = self.fixtures / record["request"]["fixture"] / filename
                digest = hashlib.sha256()
                size = 0
                with source.open("rb") as reader, (staging / filename).open("wb") as writer:
                    while block := reader.read(1024 * 1024):
                        with self.condition:
                            if record["job"]["status"] != "running":
                                return
                        writer.write(block)
                        digest.update(block)
                        size += len(block)
                artifacts.append({"url": f"/artifacts/{identifier}/{filename}", "sha256": digest.hexdigest(),
                                  "bytes": size, "format": format_name, "backend": BACKEND})
            with self.condition:
                if record["job"]["status"] != "running":
                    return
                os.replace(staging, self.directory / "artifacts" / identifier)
                record["job"]["status"] = "succeeded"
                record["job"]["progress"] = 1
                record["job"]["logs"].append("Fixture visual and collision artifacts are ready")
                record["artifacts"] = artifacts
                self._save(record)
        finally:
            if staging.exists():
                shutil.rmtree(staging)

    def close(self):
        with self.condition:
            self.stopping = True
            for record in self.records.values():
                if record["job"]["status"] not in TERMINAL:
                    record["job"]["status"] = "cancelled"
                    record["job"]["logs"].append("Cancelled during worker shutdown")
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
                    self._json(200, {"status": "ok" if jobs.executor.is_alive() else "degraded", "backend": BACKEND,
                                     "version": VERSION, "mode": "fixture"})
                    return
                if path == "/version":
                    self._json(200, self.server.version)
                    return
                if path == "/capabilities":
                    self._json(200, {"backend": BACKEND, "mode": "fixture", "requiresGpu": False,
                                     "maxConcurrency": 1, "formats": ["ply", "glb"],
                                     "fixtures": ["arrival", "observatory"], "cancellation": True,
                                     "version": self.server.version})
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


def create_server(host="127.0.0.1", port=4320, data_dir=None, fixture_dir=None, delay=1.0, token=None):
    server = WorkerServer((host, port), WorkerHandler)
    try:
        server.jobs = JobStore(data_dir or REPO_ROOT / ".runtime" / "gpu-worker",
                               fixture_dir or REPO_ROOT / "artifacts" / "fixtures", delay)
        server.token = token
        server.version = version_info()
        return server
    except Exception:
        # JobStore may not exist yet; close the socket directly on failed startup.
        ThreadingHTTPServer.server_close(server)
        raise


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default=os.environ.get("WORKER_HOST", "127.0.0.1"))
    parser.add_argument("--port", type=int, default=int(os.environ.get("WORKER_PORT", "4320")))
    parser.add_argument("--data-dir", type=Path, default=REPO_ROOT / ".runtime" / "gpu-worker")
    parser.add_argument("--fixture-dir", type=Path, default=REPO_ROOT / "artifacts" / "fixtures")
    parser.add_argument("--delay", type=float, default=1.0)
    arguments = parser.parse_args()
    server = create_server(**vars(arguments), token=os.environ.get("WORKER_TOKEN") or None)
    print(f"Vastness {BACKEND} listening on http://{arguments.host}:{server.server_port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
