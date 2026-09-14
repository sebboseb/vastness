"""Behavioral tests exercise the worker only through its HTTP boundary."""
import hashlib
import json
from pathlib import Path
import tempfile
import sys
import threading
import time
import unittest
from urllib.error import HTTPError
from urllib.request import Request, urlopen

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from worker import create_server


class WorkerHTTPTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.fixtures = self.root / "fixtures"
        for room in ("arrival", "observatory"):
            directory = self.fixtures / room
            directory.mkdir(parents=True)
            (directory / "scene.ply").write_bytes(b"ply\nfixture-" + room.encode())
            (directory / "collider.glb").write_bytes(b"glTF-fixture-" + room.encode())
        self.start()

    def start(self, token=None):
        self.server = create_server(
            host="127.0.0.1", port=0, data_dir=self.root / "data",
            fixture_dir=self.fixtures, delay=0.3, token=token,
        )
        self.thread = threading.Thread(target=self.server.serve_forever)
        self.thread.start()
        self.base = f"http://127.0.0.1:{self.server.server_port}"

    def stop(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=3)
        self.assertFalse(self.thread.is_alive())

    def tearDown(self):
        self.stop()
        self.temp.cleanup()

    def request(self, path, body=None, method=None, token=None, raw=False):
        headers = {"Content-Type": "application/json"}
        if token:
            headers["Authorization"] = f"Bearer {token}"
        data = body if isinstance(body, bytes) else json.dumps(body).encode() if body is not None else None
        request = Request(self.base + path, data=data, headers=headers, method=method)
        try:
            response = urlopen(request, timeout=3)
        except HTTPError as error:
            response = error
        with response:
            content = response.read()
            return response.status, content if raw else json.loads(content)

    def submit(self, identifier, fixture="arrival"):
        return self.request("/jobs", {"id": identifier, "prompt": "Coastal lab", "seed": 42, "fixture": fixture})

    def await_status(self, identifier, statuses):
        deadline = time.monotonic() + 4
        while time.monotonic() < deadline:
            status, job = self.request(f"/jobs/{identifier}")
            self.assertEqual(status, 200)
            if job["status"] in statuses:
                return job
            time.sleep(0.01)
        self.fail(f"job {identifier} never reached {statuses}: {job}")

    def test_capabilities_are_honest_and_versioned(self):
        status, health = self.request("/health")
        self.assertEqual(status, 200)
        self.assertEqual(health["status"], "ok")
        status, capabilities = self.request("/capabilities")
        self.assertEqual(status, 200)
        self.assertEqual(capabilities["backend"], "fake-fixture-v1")
        self.assertEqual(capabilities["maxConcurrency"], 1)
        self.assertFalse(capabilities["requiresGpu"])
        self.assertEqual(capabilities["formats"], ["ply", "glb"])
        status, version = self.request("/version")
        self.assertEqual(status, 200)
        self.assertIn("python", version)
        self.assertIn("gitCommit", version)

    def test_success_manifest_bytes_hashes_and_restart(self):
        status, job = self.submit("room-1", "observatory")
        self.assertEqual(status, 202)
        self.assertEqual(job["id"], "room-1")
        self.assertEqual(self.request("/jobs/room-1/artifacts")[0], 409)
        job = self.await_status("room-1", {"succeeded"})
        self.assertEqual(job["progress"], 1)
        self.assertTrue(job["logs"])
        self.assertIsNone(job["error"])
        status, manifest = self.request("/jobs/room-1/artifacts")
        self.assertEqual(status, 200)
        self.assertEqual(len(manifest), 2)
        for artifact in manifest:
            status, content = self.request(artifact["url"], raw=True)
            self.assertEqual(status, 200)
            self.assertEqual(artifact["bytes"], len(content))
            self.assertEqual(artifact["sha256"], hashlib.sha256(content).hexdigest())
            self.assertEqual(artifact["backend"], "fake-fixture-v1")
            filename = "scene.ply" if artifact["format"] == "ply" else "collider.glb"
            self.assertEqual(content, (self.fixtures / "observatory" / filename).read_bytes())
        self.stop()
        self.start()
        self.assertEqual(self.request("/jobs/room-1")[1], job)
        self.assertEqual(self.request("/jobs/room-1/artifacts")[1], manifest)
        self.assertEqual(self.submit("room-1")[0], 409)
        self.assertEqual(self.request(manifest[0]["url"], raw=True)[0], 200)

    def test_single_concurrency_progress_and_cancellation(self):
        self.submit("first")
        running = self.await_status("first", {"running"})
        self.assertLess(running["progress"], 1)
        self.submit("second")
        self.assertEqual(self.request("/jobs/second")[1]["status"], "queued")
        self.assertEqual(self.request("/jobs/first/cancel", method="POST")[1]["status"], "cancelled")
        self.assertEqual(self.request("/jobs/first/artifacts")[0], 409)
        self.await_status("second", {"running"})
        self.submit("third")
        self.assertEqual(self.request("/jobs/third/cancel", method="POST")[1]["status"], "cancelled")
        self.await_status("second", {"succeeded"})
        self.assertEqual(self.request("/jobs/third")[1]["status"], "cancelled")
        self.assertEqual(self.request("/jobs/first")[1]["status"], "cancelled")
        self.assertEqual(self.request("/jobs/second/cancel", method="POST")[1]["status"], "succeeded")

    def test_missing_fixture_is_failed_and_next_job_still_runs(self):
        (self.fixtures / "arrival" / "collider.glb").unlink()
        self.submit("broken")
        self.submit("next", "observatory")
        job = self.await_status("broken", {"failed"})
        self.assertIn("collider.glb", job["error"])
        self.assertEqual(self.request("/jobs/broken/artifacts")[0], 409)
        self.assertEqual(self.request("/artifacts/broken/scene.ply")[0], 404)
        self.await_status("next", {"succeeded"})

    def test_validation_rejects_bad_requests_without_creating_job(self):
        valid = {"id": "invalid", "prompt": "", "seed": 1, "fixture": "arrival"}
        invalid = [None, [], {}, {**valid, "id": "../escape"}, {**valid, "seed": True},
                   {**valid, "seed": 1.5}, {**valid, "seed": 10 ** 500}, {**valid, "fixture": "missing"},
                   {**valid, "prompt": "x" * 4001}, {**valid, "boundary": {"portalId": "p", "position": [0, 1, 2], "width": 0, "height": 3}},
                   {**valid, "boundary": {"portalId": "p", "position": [0, 1], "width": 3, "height": 3}}]
        for body in invalid:
            with self.subTest(body=str(body)[:80]):
                self.assertEqual(self.request("/jobs", json.dumps(body).encode())[0], 400)
        self.assertEqual(self.request("/jobs", b'{"bad": NaN}')[0], 400)
        self.assertEqual(self.request("/jobs", b'{broken')[0], 400)
        self.assertEqual(self.request("/jobs", b'x' * 70000)[0], 413)
        self.assertEqual(self.request("/jobs/invalid")[0], 404)
        valid["boundary"] = {"portalId": "north", "position": [0, 0, -9], "width": 3.2, "height": 3.2}
        self.assertEqual(self.request("/jobs", valid)[0], 202)

    def test_auth_and_artifact_path_containment(self):
        self.stop()
        self.start(token="test-token")
        self.assertEqual(self.request("/health")[0], 401)
        self.assertEqual(self.request("/health", token="wrong")[0], 401)
        self.assertEqual(self.request("/health", token="test-token")[0], 200)
        self.assertEqual(self.request("/artifacts/../../jobs.json", token="test-token")[0], 404)
        self.assertEqual(self.request("/jobs/unknown", token="test-token")[0], 404)

    def test_interrupted_record_is_failed_on_restart(self):
        self.stop()
        state = self.root / "data" / "jobs" / "interrupted.json"
        state.write_text(json.dumps({
            "request": {"id": "interrupted", "prompt": "", "seed": 1, "fixture": "arrival"},
            "job": {"id": "interrupted", "status": "running", "progress": 0.4,
                    "logs": [], "backend": "fake-fixture-v1", "error": None}, "artifacts": [],
        }))
        self.start()
        job = self.request("/jobs/interrupted")[1]
        self.assertEqual(job["status"], "failed")
        self.assertIn("restarted", job["error"])
        self.assertEqual(self.request("/jobs/interrupted/artifacts")[0], 409)


if __name__ == "__main__":
    unittest.main()
