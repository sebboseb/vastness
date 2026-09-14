"""Transport emulation exercises real bundles/bootstrap; never contacts the PC."""
import base64
import importlib.util
import io
import json
from pathlib import Path
import platform
import re
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location("deploy_wsl", ROOT / "scripts/deploy-worker-wsl.py")
DEPLOY = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(DEPLOY)


def python_from_command(command):
    powershell = base64.b64decode(command.split()[-1]).decode("utf-16le")
    match = re.match(r"\$code='((?:[^']|'')*)'; & wsl.exe ", powershell)
    if match is None:
        raise AssertionError("PowerShell literal contract changed")
    return match.group(1).replace("''", "'"), powershell


class CommandTests(unittest.TestCase):
    def test_language_boundaries_and_short_command(self):
        command = DEPLOY.encode_remote_command("Ubuntu's ; $(touch nope)", "vastness")
        source, powershell = python_from_command(command)
        self.assertLess(len(command), 4096)
        self.assertIn("-d 'Ubuntu''s ; $(touch nope)' -u 'vastness'", powershell)
        self.assertTrue(powershell.endswith("exit $LASTEXITCODE"))
        compile(source, "encoded-loader", "exec")
        config = {"prefix": "/tmp/a ' ; $()", "ref": "a" * 40}
        envelope = json.dumps({"config": config, "program": "import json; print(json.dumps(CONFIG))"}).encode()
        result = subprocess.run([sys.executable, "-c", source], input=len(envelope).to_bytes(4, "big") + envelope,
                                capture_output=True, check=True)
        self.assertEqual(json.loads(result.stdout), config)

    def test_invalid_arguments_fail_before_transport(self):
        valid = ["--host", "vastness-gpu", "--ref", "a" * 40, "--prefix", "/tmp/worker"]
        for index, value in ((1, "host;command"), (3, "HEAD"), (5, "/"), (5, "relative")):
            args = valid.copy()
            args[index] = value
            with self.subTest(value=value), patch("sys.stderr", io.StringIO()), self.assertRaises(SystemExit):
                DEPLOY.parse_args(args)

    def test_loader_rejects_oversized_envelope(self):
        source, _ = python_from_command(DEPLOY.encode_remote_command("Ubuntu-24.04", "vastness"))
        result = subprocess.run([sys.executable, "-c", source], input=(65537).to_bytes(4, "big"), capture_output=True)
        self.assertNotEqual(result.returncode, 0)


@unittest.skipUnless(platform.system() == "Linux", "real Linux bootstrap required")
class LinuxDeploymentTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.base = Path(self.temporary.name)
        self.repo = self.base / "source"
        self.repo.mkdir()
        self.git("init", "--quiet")
        self.git("config", "user.email", "test@example.invalid")
        self.git("config", "user.name", "Test")
        (self.repo / "scripts").mkdir()
        (self.repo / "scripts/bootstrap-worker.sh").write_bytes((ROOT / "scripts/bootstrap-worker.sh").read_bytes())
        (self.repo / "services/gpu-worker").mkdir(parents=True)
        (self.repo / "services/gpu-worker/worker.py").write_text("# committed worker\n")
        (self.repo / "binary.dat").write_bytes(b"\x00\xff\r\n" * 4096)
        self.git("add", ".")
        self.git("commit", "--quiet", "-m", "fixture")
        self.commit = self.git("rev-parse", "HEAD").strip()
        self.prefix = self.base / "worker ' ; $(touch INJECTED)"
        self.args = DEPLOY.parse_args(["--host", "vastness-gpu", "--ref", self.commit,
                                      "--prefix", str(self.prefix), "--repo", str(self.repo)])
        self.run = subprocess.run

    def git(self, *args):
        return subprocess.check_output(["git", "-C", str(self.repo), *args], text=True)

    def transport(self, argv, **kwargs):
        if argv[0] != "ssh":
            return self.run(argv, **kwargs)
        self.assertIn("BatchMode=yes", argv)
        self.assertIn("StrictHostKeyChecking=yes", argv)
        self.assertIn("ConnectTimeout=10", argv)
        self.assertIn("-T", argv)
        self.assertEqual(argv[-2], "vastness-gpu")
        source, powershell = python_from_command(argv[-1])
        self.assertIn("-d 'Ubuntu-24.04' -u 'vastness'", powershell)
        return self.run([sys.executable, "-c", source], **kwargs)

    def test_exact_commit_idempotent_and_preserves_configuration(self):
        # Uncommitted source and bootstrap changes must never cross the transport.
        (self.repo / "services/gpu-worker/worker.py").write_text("uncommitted worker")
        (self.repo / "scripts/bootstrap-worker.sh").write_text("exit 99\n")
        with patch.object(DEPLOY.subprocess, "run", side_effect=self.transport):
            DEPLOY.deploy(self.args)
            config = self.prefix / "shared/config/worker.env"
            config.write_text("WORKER_BACKEND=fixture\n")
            marker = self.prefix / "current/venv/operator-marker"
            marker.write_text("preserved")
            DEPLOY.deploy(self.args)
        release = self.prefix / "current/repo"
        self.assertEqual((release / "services/gpu-worker/worker.py").read_text(), "# committed worker\n")
        self.assertEqual((release / "binary.dat").read_bytes(), b"\x00\xff\r\n" * 4096)
        self.assertEqual(config.read_text(), "WORKER_BACKEND=fixture\n")
        self.assertEqual(marker.read_text(), "preserved")
        self.assertEqual(subprocess.check_output(["git", "-C", str(release), "rev-parse", "HEAD"], text=True).strip(), self.commit)
        self.assertFalse((self.base / "INJECTED").exists())
        self.assertEqual(list((self.prefix / "incoming").glob(".upload-*")), [])

    def test_corrupted_bundle_never_reaches_bootstrap(self):
        def corrupt(argv, **kwargs):
            if argv[0] != "ssh":
                return self.run(argv, **kwargs)
            contents = kwargs.pop("stdin").read()
            contents = contents[:-1] + bytes([contents[-1] ^ 1])
            source, _ = python_from_command(argv[-1])
            return self.run([sys.executable, "-c", source], input=contents, capture_output=True, **kwargs)
        with patch.object(DEPLOY.subprocess, "run", side_effect=corrupt), self.assertRaises(subprocess.CalledProcessError) as caught:
            DEPLOY.deploy(self.args)
        self.assertIn(b"bundle SHA-256 mismatch", caught.exception.stderr)
        self.assertFalse((self.prefix / "current").exists())
        self.assertEqual(list((self.prefix / "incoming").iterdir()), [])


if __name__ == "__main__":
    unittest.main()
