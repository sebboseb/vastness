"""Behavioral tests exercise the worker only through its HTTP boundary."""
import hashlib
import os
import signal
import subprocess
import json
import struct
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


def minimal_glb():
    content = b'{"asset":{"version":"2.0"}} '
    return struct.pack("<4sII", b"glTF", 2, 20 + len(content)) + struct.pack("<I4s", len(content), b"JSON") + content


class WorkerHTTPTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.fixtures = self.root / "fixtures"
        for room in ("arrival", "observatory"):
            directory = self.fixtures / room
            directory.mkdir(parents=True)
            (directory / "scene.ply").write_bytes(b"ply\nformat binary_little_endian 1.0\nelement vertex 1\nproperty float x\nproperty float y\nproperty float z\nend_header\n" + struct.pack("<fff", 1, 2, 3))
            (directory / "collider.glb").write_bytes(minimal_glb())
        self.start()

    def start(self, token=None, **options):
        self.server = create_server(
            host="127.0.0.1", port=0, data_dir=self.root / "data",
            fixture_dir=self.fixtures, delay=0.3, token=token, **options,
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
        self.assertEqual(capabilities["backend"]["id"], "fake-fixture-v1")
        self.assertEqual(capabilities["maxConcurrency"], 1)
        self.assertFalse(capabilities["backend"]["requiresGpu"])
        self.assertEqual(capabilities["formats"], ["ply", "glb"])
        self.assertEqual(capabilities["schemaVersion"], 1)
        self.assertEqual(capabilities["hardware"]["nvidiaExecution"], "not_run")
        self.assertEqual(capabilities, self.request("/capabilities")[1])
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

    def test_command_backend_publishes_full_validated_request_and_artifacts(self):
        self.stop()
        script = self.root / "adapter.py"
        script.write_text("""import argparse,json,pathlib,shutil
p=argparse.ArgumentParser();p.add_argument('--request');p.add_argument('--output');a=p.parse_args()
r=json.loads(pathlib.Path(a.request).read_text())
assert not list(pathlib.Path(a.output).iterdir())
assert r['boundary']['portalId']=='north' and r['seed']==42 and 'executable' not in r
for name in ('scene.ply','collider.glb'):
 shutil.copyfile(pathlib.Path(__file__).parent/'fixtures'/'arrival'/name,pathlib.Path(a.output)/name)
print('Command completed')
""")
        self.start(backend="command", command_json=json.dumps([sys.executable, str(script)]))
        request = {"id":"command", "prompt":"room", "seed":42, "executable":"ignored", "boundary":{"portalId":"north","position":[0,0,0],"width":3,"height":3}}
        self.assertEqual(self.request("/jobs", request)[0], 202)
        job = self.await_status("command", {"succeeded", "failed"})
        self.assertEqual(job["status"], "succeeded", job)
        self.assertEqual(job["backend"], "command-v1")
        self.assertIn("Command completed", "\n".join(job["logs"]))
        for artifact in self.request("/jobs/command/artifacts")[1]:
            content = self.request(artifact["url"], raw=True)[1]
            self.assertEqual(hashlib.sha256(content).hexdigest(), artifact["sha256"])
            self.assertEqual(len(content), artifact["bytes"])
            self.assertEqual(artifact["backend"], "command-v1")

    def command_setup(self, timeout=3):
        self.stop()
        script = self.root / "lifecycle.py"
        script.write_text("""import argparse,json,pathlib,shutil,time,sys,signal,subprocess,fcntl,os
p=argparse.ArgumentParser();p.add_argument('--request');p.add_argument('--output');a=p.parse_args()
r=json.loads(pathlib.Path(a.request).read_text()); root=pathlib.Path(__file__).parent
lock=(root/'serial.lock').open('w'); fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
for name in ('scene.ply','collider.glb'):
 shutil.copyfile(root/'fixtures'/'arrival'/name,pathlib.Path(a.output)/name)
if r['prompt']=='fail':
 print('adapter diagnostic',flush=True); sys.exit(7)
if r['prompt']=='badply': (pathlib.Path(a.output)/'scene.ply').write_bytes(b'ply broken')
if r['prompt']=='badglb': (pathlib.Path(a.output)/'collider.glb').write_bytes(b'glTF broken')
if r['prompt']=='logs': print('x'*400000,flush=True)
if r['prompt']=='wait':
 signal.signal(signal.SIGTERM,signal.SIG_IGN)
 code="import pathlib,time,signal; signal.signal(signal.SIGTERM,signal.SIG_IGN); time.sleep(1.5); pathlib.Path('escaped-child').write_text('bad'); time.sleep(20)"
 child=subprocess.Popen([sys.executable,'-c',code],cwd=root)
 print('child started',flush=True)
 time.sleep(20)
if r['prompt']=='slow': time.sleep(.2)
""")
        self.start(backend="command", command_json=json.dumps([sys.executable, str(script)]), job_timeout=timeout)

    def command_submit(self, identifier, prompt):
        self.assertEqual(self.request("/jobs", {"id":identifier,"prompt":prompt,"seed":1})[0], 202)

    def test_command_failures_and_invalid_formats_never_publish(self):
        self.command_setup()
        for mode, diagnostic in (("fail", "status 7"), ("badply", "PLY"), ("badglb", "GLB")):
            self.command_submit(mode, mode)
            job = self.await_status(mode, {"failed", "succeeded"})
            self.assertEqual(job["status"], "failed", job)
            self.assertIn(diagnostic, job["error"])
            self.assertIn("Unpublished adapter evidence retained at", "".join(job["logs"]))
            self.assertEqual(self.request(f"/jobs/{mode}/artifacts")[0], 409)
            self.assertEqual(self.request(f"/artifacts/{mode}/scene.ply")[0], 404)
        self.command_submit("recovery", "ok")
        self.assertEqual(self.await_status("recovery", {"succeeded", "failed"})["status"], "succeeded")

    def test_command_timeout_kills_descendants_and_next_job_runs(self):
        self.command_setup(timeout=.25)
        self.command_submit("timedout", "wait")
        self.command_submit("next", "ok")
        job = self.await_status("timedout", {"failed", "succeeded"})
        self.assertEqual(job["status"], "failed", job)
        self.assertIn("timeout", job["error"])
        self.assertEqual(self.await_status("next", {"succeeded", "failed"})["status"], "succeeded")
        self.assertEqual(self.request("/artifacts/timedout/scene.ply")[0], 404)
        time.sleep(1.6)
        self.assertFalse((self.root / "escaped-child").exists())

    def test_command_cancel_stays_serial_and_kills_descendants(self):
        self.command_setup()
        self.command_submit("cancel", "wait")
        deadline = time.monotonic() + 2
        while time.monotonic() < deadline:
            job = self.request("/jobs/cancel")[1]
            if "child started" in "".join(job["logs"]):
                break
            time.sleep(.01)
        self.assertIn("child started", "".join(job["logs"]))
        self.command_submit("next", "slow")
        self.assertEqual(self.request("/jobs/next")[1]["status"], "queued")
        self.assertEqual(self.request("/jobs/cancel/cancel", method="POST")[1]["status"], "cancelled")
        self.assertEqual(self.await_status("next", {"succeeded", "failed"})["status"], "succeeded")
        self.assertEqual(self.request("/artifacts/cancel/scene.ply")[0], 404)
        time.sleep(1.6)
        self.assertFalse((self.root / "escaped-child").exists())

    def test_command_logs_are_bounded_and_saved_across_backend_restart(self):
        self.command_setup()
        self.command_submit("verbose", "logs")
        job = self.await_status("verbose", {"succeeded", "failed"})
        self.assertEqual(job["status"], "succeeded", job)
        self.assertLessEqual(len(job["logs"]), 64)
        self.assertLessEqual(sum(map(len, job["logs"])), 64 * 2048)
        manifest = self.request("/jobs/verbose/artifacts")[1]
        self.stop()
        self.start()
        self.assertEqual(self.request("/jobs/verbose")[1], job)
        self.assertEqual(self.request("/jobs/verbose/artifacts")[1], manifest)

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


class WorkerCLITest(unittest.TestCase):
    def test_environment_selects_command_backend_and_sigterm_stops_active_adapter(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            script = root / 'command.py'
            marker = root / 'escaped'
            script.write_text("import pathlib,signal,time\nsignal.signal(signal.SIGTERM, signal.SIG_IGN)\nprint('started',flush=True)\ntime.sleep(1.5)\npathlib.Path(" + repr(str(marker)) + ").write_text('escaped')\ntime.sleep(20)\n")
            process = subprocess.Popen([sys.executable, str(Path(__file__).resolve().parents[1] / 'worker.py'), '--port', '0', '--data-dir', str(root / 'data')],
                                       env={**os.environ, 'WORKER_BACKEND':'command', 'WORKER_COMMAND_JSON':json.dumps([sys.executable,str(script)]), 'WORKER_JOB_TIMEOUT':'5', 'WORKER_TOKEN':''},
                                       stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            try:
                import selectors
                selector = selectors.DefaultSelector()
                selector.register(process.stdout, selectors.EVENT_READ)
                self.assertTrue(selector.select(5), 'worker did not start')
                line = process.stdout.readline()
                selector.close()
                base = line.strip().split(' ')[-1]
                def request(path, value=None):
                    data = json.dumps(value).encode() if value is not None else None
                    with urlopen(Request(base + path, data=data, headers={'Content-Type':'application/json'}), timeout=2) as response:
                        return json.loads(response.read())
                self.assertEqual(request('/capabilities')['backend']['id'], 'command-v1')
                request('/jobs', {'id':'shutdown','prompt':'','seed':1})
                deadline = time.monotonic() + 3
                while time.monotonic() < deadline:
                    job = request('/jobs/shutdown')
                    if 'started' in ''.join(job['logs']):
                        break
                    time.sleep(.01)
                self.assertIn('started', ''.join(job['logs']))
                process.send_signal(signal.SIGTERM)
                process.wait(timeout=3)
                time.sleep(1.6)
                self.assertFalse(marker.exists(), 'adapter survived worker shutdown')
            finally:
                if process.poll() is None:
                    process.kill()
                    process.wait(timeout=3)
                process.stdout.close()
                process.stderr.close()


if __name__ == "__main__":
    unittest.main()
