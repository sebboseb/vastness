"""Probes report missing tools and failed commands without inventing hardware facts."""
from pathlib import Path
import subprocess
import sys
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from probe import command_probe


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
