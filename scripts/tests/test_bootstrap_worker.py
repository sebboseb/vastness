"""Deployment acceptance tests. Linux cases use real Git, venv and worker HTTP."""
import hashlib
import json
import os
from pathlib import Path
import platform
import shutil
import signal
import struct
import subprocess
import sys
import tempfile
import time
import unittest
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[2]
BOOTSTRAP = ROOT / "scripts/bootstrap-worker.sh"
DEPLOY = ROOT / "scripts/deploy-worker.sh"


def run(*args, **kwargs):
    return subprocess.run(args, text=True, capture_output=True, **kwargs)


class ScriptPreflightTest(unittest.TestCase):
    def test_help_and_shell_syntax(self):
        for script in (BOOTSTRAP, DEPLOY):
            self.assertEqual(run("bash", "-n", str(script)).returncode, 0)
            result = run("bash", str(script), "--help")
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn("Usage:", result.stdout)

    def test_invalid_arguments_do_not_create_prefix(self):
        with tempfile.TemporaryDirectory() as directory:
            prefix = str(Path(directory) / "must-not-exist")
            for arguments in (
                ["--repo", ".", "--ref", "HEAD", "--prefix", prefix],
                ["--repo", ".", "--ref", "a" * 40, "--prefix", "relative"],
                ["--python"],
            ):
                result = run("bash", str(BOOTSTRAP), *arguments)
                self.assertNotEqual(result.returncode, 0)
                self.assertFalse(Path(prefix).exists())


@unittest.skipUnless(platform.system() == "Linux", "bootstrap requires a real Linux host/container")
class LinuxDeploymentTest(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="vastness-bootstrap-")
        self.addCleanup(self.temporary.cleanup)
        self.directory = Path(self.temporary.name)
        self.source = self.directory / "Git source ' with spaces"
        self.source.mkdir()
        shutil.copytree(ROOT / "services/gpu-worker", self.source / "services/gpu-worker",
                        ignore=shutil.ignore_patterns("__pycache__"))
        (self.source / "scripts").mkdir()
        shutil.copy2(BOOTSTRAP, self.source / "scripts/bootstrap-worker.sh")
        (self.source / ".gitignore").write_text("__pycache__/\n*.pyc\n")
        self.git("init", "--quiet")
        self.git("config", "user.name", "Bootstrap Test")
        self.git("config", "user.email", "bootstrap@example.invalid")
        self.git("add", ".")
        self.git("commit", "--quiet", "-m", "initial worker")
        self.commit = self.git("rev-parse", "HEAD").strip()
        self.prefix = self.directory / "worker install ' $literal"
        self.process = None
        self.addCleanup(self.stop_worker)

    def git(self, *arguments):
        result = run("git", "-C", str(self.source), *arguments)
        self.assertEqual(result.returncode, 0, result.stderr)
        return result.stdout

    def bootstrap(self, commit=None, repo=None, success=True):
        result = run("bash", str(BOOTSTRAP), "--repo", str(repo or self.source),
                     "--ref", commit or self.commit, "--prefix", str(self.prefix),
                     "--python", sys.executable)
        if success:
            self.assertEqual(result.returncode, 0, result.stderr)
        else:
            self.assertNotEqual(result.returncode, 0, result.stdout)
        return result

    def request(self, path, body=None, raw=False):
        request = Request("http://127.0.0.1:4320" + path,
                          data=json.dumps(body).encode() if body else None,
                          headers={"Content-Type": "application/json", "Authorization": "Bearer private-test-token"})
        with urlopen(request, timeout=2) as response:
            content = response.read()
            return content if raw else json.loads(content)

    def start_worker(self):
        self.log = (self.directory / "worker.log").open("a+")
        self.addCleanup(self.log.close)
        environment = dict(os.environ, WORKER_HOST="0.0.0.0", WORKER_PORT="19999",
                           WORKER_TOKEN="private-test-token", WORKER_BACKEND="fixture")
        self.process = subprocess.Popen([str(self.prefix / "run-worker")], env=environment,
                                        stdout=self.log, stderr=self.log)
        for _ in range(150):
            if self.process.poll() is not None:
                self.log.seek(0)
                self.fail(f"worker exited: {self.log.read()}")
            try:
                self.request("/health")
                break
            except (OSError, URLError):
                time.sleep(0.05)
        else:
            self.fail("worker did not become healthy on loopback port 4320")
        # Token supplied through the launch environment survives config loading.
        with self.assertRaises(HTTPError) as error:
            urlopen("http://127.0.0.1:4320/health", timeout=2)
        self.assertEqual(error.exception.code, 401)

    def stop_worker(self):
        if self.process is not None and self.process.poll() is None:
            self.process.send_signal(signal.SIGINT)
            try:
                self.process.wait(timeout=8)
            except subprocess.TimeoutExpired:
                self.process.kill()
                self.process.wait(timeout=3)

    def test_rerun_preserves_venv_config_completed_jobs_and_release_upgrade(self):
        self.bootstrap()
        config = self.prefix / "shared/config/worker.env"
        config.write_text("# operator-owned configuration\nWORKER_JOB_TIMEOUT=37\n")
        sentinel = self.prefix / "current/venv/operator-installed-package.marker"
        sentinel.write_text("preserve installed environment")
        fixture = self.prefix / "shared/fixtures/arrival"
        fixture.mkdir()
        (fixture / "scene.ply").write_bytes(
            b"ply\nformat binary_little_endian 1.0\nelement vertex 1\nproperty float x\nproperty float y\nproperty float z\nend_header\n" + struct.pack("<fff", 0, 0, 0))
        glb_json = b'{"asset":{"version":"2.0"}}  '
        (fixture / "collider.glb").write_bytes(struct.pack("<4sII", b"glTF", 2, 20 + len(glb_json)) +
                                              struct.pack("<I4s", len(glb_json), b"JSON") + glb_json)
        self.start_worker()
        self.assertEqual(self.request("/version")["gitCommit"], self.commit)
        self.request("/jobs", {"id": "saved-job", "prompt": "Fixture", "seed": 1, "fixture": "arrival"})
        for _ in range(100):
            job = self.request("/jobs/saved-job")
            if job["status"] in ("succeeded", "failed"):
                break
            time.sleep(0.05)
        self.assertEqual(job["status"], "succeeded", job)
        manifest = self.request("/jobs/saved-job/artifacts")
        self.stop_worker()
        self.bootstrap()
        self.assertEqual(config.read_text(), "# operator-owned configuration\nWORKER_JOB_TIMEOUT=37\n")
        self.assertEqual(sentinel.read_text(), "preserve installed environment")
        self.start_worker()
        self.assertEqual(self.request("/jobs/saved-job/artifacts"), manifest)
        self.stop_worker()
        (self.source / "release-note.txt").write_text("new committed release")
        self.git("add", ".")
        self.git("commit", "--quiet", "-m", "next release")
        next_commit = self.git("rev-parse", "HEAD").strip()
        self.bootstrap(next_commit)
        self.assertEqual((self.prefix / "current").resolve().name, next_commit)
        self.assertTrue((self.prefix / "releases" / self.commit / "venv/operator-installed-package.marker").exists())
        self.start_worker()
        self.assertEqual(self.request("/version")["gitCommit"], next_commit)
        self.assertEqual(self.request("/jobs/saved-job/artifacts"), manifest)
        for artifact in manifest:
            content = self.request(artifact["url"], raw=True)
            self.assertEqual(hashlib.sha256(content).hexdigest(), artifact["sha256"])

    def test_missing_commit_and_dirty_release_fail_without_switching(self):
        self.bootstrap()
        original_target = (self.prefix / "current").resolve()
        self.bootstrap("0" * 40, success=False)
        self.assertEqual((self.prefix / "current").resolve(), original_target)
        self.assertEqual(list((self.prefix / "releases").glob(".checkout.*")), [])
        worker = self.prefix / "current/repo/services/gpu-worker/worker.py"
        worker.write_text(worker.read_text() + "\n# operator edit\n")
        self.assertIn("dirty", self.bootstrap(success=False).stderr)
        self.assertIn("operator edit", worker.read_text())

    def test_bundle_source_and_wrong_existing_release_commit(self):
        bundle = self.directory / "worker.bundle"
        self.git("bundle", "create", str(bundle), "HEAD")
        self.bootstrap(repo=bundle)
        self.assertEqual((self.prefix / "current").resolve().name, self.commit)
        checkout = self.prefix / "current/repo"
        run("git", "-C", str(checkout), "config", "user.name", "Test")
        run("git", "-C", str(checkout), "config", "user.email", "test@example.invalid")
        result = run("git", "-C", str(checkout), "commit", "--allow-empty", "-m", "wrong HEAD")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("does not match", self.bootstrap(success=False).stderr)

    def test_deploy_transports_commit_and_quotes_remote_paths(self):
        # Emulate only the SSH transport locally. Git/bundle/bootstrap are real.
        binary = self.directory / "bin"
        binary.mkdir()
        log = self.directory / "ssh.jsonl"
        ssh = binary / "ssh"
        ssh.write_text(f"#!{sys.executable}\n" + """import json, os, subprocess, sys
args = sys.argv[1:]
with open(os.environ['SSH_TEST_LOG'], 'a') as log:
    log.write(json.dumps(args) + '\\n')
assert args[:6] == ['-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', '-o', 'ConnectTimeout=10']
assert args[6] == 'prepared-linux-alias'
sys.exit(subprocess.run(args[7], shell=True).returncode)
""")
        ssh.chmod(0o700)
        # This uncommitted script must never reach the remote.
        (self.source / "scripts/bootstrap-worker.sh").write_text("exit 73\n")
        self.prefix = self.directory / "worker ' ; touch INJECTION; # $x"
        result = run("bash", str(DEPLOY), "--host", "prepared-linux-alias", "--repo", self.source.name,
                     "--ref", self.commit, "--prefix", str(self.prefix), "--python", sys.executable,
                     env=dict(os.environ, PATH=str(binary) + os.pathsep + os.environ["PATH"], SSH_TEST_LOG=str(log)),
                     cwd=self.directory)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertFalse((self.directory / "INJECTION").exists())
        self.assertEqual((self.prefix / "current").resolve().name, self.commit)
        self.assertEqual(len(log.read_text().splitlines()), 3)
        deployed = self.prefix / "current/repo/scripts/bootstrap-worker.sh"
        self.assertEqual(deployed.read_bytes(), BOOTSTRAP.read_bytes())


if __name__ == "__main__":
    unittest.main()
