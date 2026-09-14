"""Probes report missing tools and failed commands without inventing hardware facts."""
from pathlib import Path
import json
import os
import tempfile
import time
import subprocess
import sys
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from probe import command_probe, inventory


class ProbeTest(unittest.TestCase):
    def test_missing_tool_is_unavailable(self):
        with patch("probe.shutil.which", return_value=None):
            result = command_probe(["nvidia-smi"])
        self.assertEqual(result["status"], "unavailable")
        self.assertIsNone(result["exitCode"])
        self.assertEqual(result["stdout"], "")

    def test_failed_tool_preserves_diagnostic(self):
        completed = subprocess.CompletedProcess(["nvidia-smi"], 9, "", "driver unavailable")
        with patch("probe.shutil.which", return_value="/bin/nvidia-smi"), patch("probe.subprocess.run", return_value=completed):
            result = command_probe(["nvidia-smi"])
        self.assertEqual(result["status"], "failed")
        self.assertEqual(result["exitCode"], 9)
        self.assertEqual(result["stderr"], "driver unavailable")

    def test_timeout_is_failed_not_a_gpu_measurement(self):
        with patch("probe.shutil.which", return_value="/bin/nvidia-smi"), patch("probe.subprocess.run", side_effect=subprocess.TimeoutExpired("nvidia-smi", 10)):
            result = command_probe(["nvidia-smi"])
        self.assertEqual(result["status"], "failed")
        self.assertIn("TimeoutExpired", result["stderr"])
        self.assertEqual(result["stdout"], "")


class InventoryTest(unittest.TestCase):
    def test_default_inventory_does_not_import_torch_or_claim_execution(self):
        with patch("probe.shutil.which", return_value=None):
            report = inventory()
        self.assertEqual(report["schemaVersion"], 1)
        self.assertEqual(report["nvidiaExecution"], "not_run")
        self.assertEqual(report["gpu"]["status"], "unavailable")
        self.assertEqual(report["gpu"]["devices"], [])
        self.assertEqual(report["pytorch"]["status"], "not_checked")
        self.assertIsNone(report["pytorch"]["cudaAvailable"])
        self.assertNotIn("torch", sys.modules)


class ProbeCLITest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.env = {**os.environ, "PATH": str(self.root), "PYTHONPATH": str(self.root)}

    def executable(self, name, body):
        path = self.root / name
        path.write_text(f"#!{sys.executable}\n" + body)
        path.chmod(0o755)

    def report(self, *arguments):
        result = subprocess.run([sys.executable, str(Path(__file__).resolve().parents[1] / "probe.py"), *arguments],
                                env=self.env, capture_output=True, text=True, timeout=15, check=True)
        return json.loads(result.stdout)

    def test_report_parses_multiple_gpus_unknown_vram_and_distinct_cuda_versions(self):
        self.executable("nvidia-smi", "import sys\nprint('0, GPU-a, Example GPU, 550.12, 24576, 23000\\n1, GPU-b, Other GPU, 550.12, 24576, [N/A]' if len(sys.argv)>1 else 'CUDA Version: 12.4')")
        self.executable("nvcc", "print('Cuda compilation tools, release 12.1, V12.1.2')")
        report = self.report()
        self.assertEqual(report["gpu"]["status"], "available", report)
        self.assertEqual(len(report["gpu"]["devices"]), 2)
        self.assertEqual(report["gpu"]["devices"][0]["vramTotalMiB"], 24576)
        self.assertIsNone(report["gpu"]["devices"][1]["vramFreeMiB"])
        self.assertEqual(report["cuda"]["driverSupportedVersion"], "12.4")
        self.assertEqual(report["cuda"]["toolkitVersion"], "12.1")
        self.assertEqual(report["nvidiaExecution"], "not_run")

    def test_legacy_and_umd_banners_keep_driver_cuda_separate_from_toolkit(self):
        banners = (
            ("| NVIDIA-SMI 550.54.14 Driver Version: 550.54.14 CUDA Version: 12.4 |", "12.4"),
            ("| NVIDIA-SMI 610.43.02 KMD Version: 610.62 CUDA UMD Version: 13.3 |", "13.3"),
        )
        for banner, expected in banners:
            for toolkit_installed in (False, True):
                with self.subTest(banner=banner, toolkit_installed=toolkit_installed):
                    self.executable("nvidia-smi", "import sys\nprint('0, GPU-a, RTX 3090, 610.62, 24576, 23000' if len(sys.argv)>1 else " + repr(banner) + ")")
                    if toolkit_installed:
                        self.executable("nvcc", "print('Cuda compilation tools, release 12.1, V12.1.2')")
                    else:
                        (self.root / "nvcc").unlink(missing_ok=True)
                    report = self.report()
                    self.assertEqual(report["cuda"]["driverStatus"], "available")
                    self.assertEqual(report["cuda"]["driverSupportedVersion"], expected)
                    self.assertEqual(report["cuda"]["toolkitStatus"], "available" if toolkit_installed else "unavailable")
                    self.assertEqual(report["cuda"]["toolkitVersion"], "12.1" if toolkit_installed else None)
                    self.assertEqual(report["nvidiaExecution"], "not_run")

    def test_malformed_tool_output_is_failure(self):
        self.executable("nvidia-smi", "print('not a gpu inventory')")
        report = self.report()
        self.assertEqual(report["gpu"]["status"], "failed")
        self.assertEqual(report["gpu"]["devices"], [])
        self.assertIsNone(report["cuda"]["driverSupportedVersion"])

    def test_opt_in_torch_inspection_is_isolated_and_does_not_claim_inference(self):
        (self.root / "torch.py").write_text("__version__='test-version'\nclass version: cuda='12.1'\nclass cuda:\n @staticmethod\n def is_available(): return False\n")
        default = self.report()
        self.assertEqual(default["pytorch"]["status"], "not_checked")
        report = self.report("--check-torch")
        self.assertEqual(report["pytorch"]["status"], "available", report)
        self.assertEqual(report["pytorch"]["version"], "test-version")
        self.assertEqual(report["pytorch"]["cudaBuildVersion"], "12.1")
        self.assertFalse(report["pytorch"]["cudaAvailable"])
        self.assertEqual(report["nvidiaExecution"], "not_run")

    def test_opt_in_torch_failure_preserves_diagnostic(self):
        (self.root / "torch.py").write_text("raise RuntimeError('broken CUDA package')")
        report = self.report("--check-torch")
        self.assertEqual(report["pytorch"]["status"], "failed")
        self.assertIn("broken CUDA package", report["pytorch"]["error"])
        self.assertIsNone(report["pytorch"]["cudaAvailable"])

    def test_opt_in_torch_import_has_a_bounded_deadline(self):
        (self.root / "torch.py").write_text("import time; time.sleep(30)")
        started = time.monotonic()
        report = self.report("--check-torch")
        self.assertLess(time.monotonic() - started, 12)
        self.assertEqual(report["pytorch"]["status"], "failed")
        self.assertIn("TimeoutExpired", report["pytorch"]["error"])
        self.assertIsNone(report["pytorch"]["cudaAvailable"])
