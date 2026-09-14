import contextlib
import io
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

from . import prepare, run


class BenchmarkTests(unittest.TestCase):
    def test_plan_and_help_need_no_model_libraries_or_output_directory(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'torch.py').write_text("raise AssertionError('torch must not be imported')\n")
            env = {**os.environ, 'PYTHONPATH': str(root)}
            for flag in ['--plan', '--help']:
                result = subprocess.run([sys.executable, '-S', str(run.HERE / 'run.py'), flag],
                                        cwd=root, env=env, capture_output=True, text=True)
                self.assertEqual(result.returncode, 0, result.stderr)
                if flag == '--plan':
                    report = json.loads(result.stdout)
                    self.assertEqual(report['status'], 'not_run')
                    self.assertEqual(report['nvidiaExecution'], 'not_run')
                    self.assertIsNone(report['metrics'])
            self.assertEqual([path.name for path in root.iterdir()], ['torch.py'])

    def test_cpu_preflight_reports_unavailable_without_execution(self):
        with patch.object(run.platform, 'system', return_value='Darwin'), \
             patch.object(run, 'command', return_value={'exitCode': None, 'stdout': '', 'stderr': 'missing'}), \
             contextlib.redirect_stdout(io.StringIO()) as output:
            self.assertEqual(run.main(['--preflight']), 0)
        report = json.loads(output.getvalue())
        self.assertFalse(report['preflight']['readyForAttempt'])
        self.assertEqual(report['status'], 'not_run')
        self.assertEqual(report['artifacts'], [])

    def test_unsupported_prompt_and_boundary_preserve_failure_before_execution(self):
        for extra in [{'prompt': 'generate a room'}, {'boundary': {'portalId': 'north'}}]:
            with self.subTest(extra=extra), tempfile.TemporaryDirectory() as directory:
                root = Path(directory)
                request = root / 'request.json'
                request.write_text(json.dumps({'id': 'test', 'prompt': '', 'seed': 1, **extra}))
                out = root / 'output'
                with patch.object(run, 'preflight', side_effect=AssertionError('must reject before preflight')), \
                     contextlib.redirect_stdout(io.StringIO()):
                    status = run.main(['--execute', '--request', str(request), '--output', str(out)])
                report = json.loads((out / 'benchmark-report.json').read_text())
                self.assertEqual(status, 1)
                self.assertEqual(report['status'], 'failed')
                self.assertEqual(report['nvidiaExecution'], 'not_run')
                self.assertEqual(report['stage'], 'request')
                self.assertEqual(report['artifacts'], [])
                self.assertFalse((out / 'scene.ply').exists())

    def test_failed_cpu_subprocess_retains_log_and_no_published_artifacts(self):
        original_popen = subprocess.Popen

        def cpu_process(argv, **kwargs):
            code = "print('CPU test telemetry')" if argv[0] == 'nvidia-smi' else (
                "import sys; print('deliberate CPU test failure'); sys.exit(9)"
            )
            return original_popen([sys.executable, '-c', code], **kwargs)

        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            request = root / 'request.json'
            request.write_text(json.dumps({'prompt': '', 'seed': 1}))
            out = root / 'output'
            arguments = ['--execute', '--request', str(request), '--output', str(out)]
            for flag in ['--trellis-root', '--weights-root', '--dinov2-root', '--dinov2-weights']:
                arguments += [flag, str(root)]
            with patch.object(run, 'preflight', return_value={'readyForAttempt': True}), \
                 patch.object(run.subprocess, 'Popen', side_effect=cpu_process), \
                 contextlib.redirect_stdout(io.StringIO()):
                self.assertEqual(run.main(arguments), 1)
            report = json.loads((out / 'benchmark-report.json').read_text())
            self.assertEqual(report['exitCode'], 9)
            self.assertEqual(report['status'], 'failed')
            self.assertEqual(report['nvidiaExecution'], 'attempted')  # simulated child boundary only
            self.assertIn('deliberate CPU test failure', (out / 'inference.log').read_text())
            self.assertIsNone(report['metrics'])
            self.assertEqual(report['artifacts'], [])

    def test_weight_manifest_detects_changed_bytes(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            artifact = root / 'test.safetensors'
            artifact.write_bytes(b'not real weights; integrity-test bytes')
            (root / 'weights-manifest.json').write_text(json.dumps({
                'model': run.PINS['model'], 'files': {artifact.name: run.digest(artifact)}}))
            run.verify_manifest(root, run.PINS['model'])
            artifact.write_bytes(b'changed')
            with self.assertRaisesRegex(ValueError, 'integrity mismatch'):
                run.verify_manifest(root, run.PINS['model'])

    def test_previous_run_evidence_cannot_be_overwritten(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            previous = root / 'benchmark-report.json'
            previous.write_text('previous evidence')
            with contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit) as error:
                run.main(['--execute', '--output', str(root), '--request', str(root / 'absent.json')])
            self.assertEqual(error.exception.code, 2)
            self.assertEqual(previous.read_text(), 'previous evidence')

    def test_device_memory_keeps_peak_and_baseline_distinct_and_missing_is_null(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'gpu.csv'
            self.assertIsNone(run.device_memory(path)['devices'])
            path.write_text('timestamp, index, uuid, memory.used [MiB]\n'
                            'first, 0, GPU-test, 512 MiB\nsecond, 0, GPU-test, 4096 MiB\n'
                            'last, 0, GPU-test, 1024 MiB\n')
            self.assertEqual(run.device_memory(path)['devices']['GPU-test'],
                             {'baselineMiB': 512, 'sampledPeakMiB': 4096, 'samples': 3})

    def test_prepare_on_mac_is_plan_only_even_with_download_flag(self):
        with tempfile.TemporaryDirectory() as directory:
            result = subprocess.run([sys.executable, '-S', str(run.HERE / 'prepare.py'),
                                     '--download-models', '--prefix', str(Path(directory) / 'new')],
                                    text=True, capture_output=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(json.loads(result.stdout)['status'], 'not_run')
            self.assertEqual(list(Path(directory).iterdir()), [])

    def test_prepare_explicit_execution_is_rejected_on_mac_before_any_mutation(self):
        with tempfile.TemporaryDirectory() as directory:
            prefix = Path(directory) / 'must-not-exist'
            with patch.object(prepare.platform, 'system', return_value='Darwin'), \
                 contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit) as error:
                prepare.main(['--execute', '--download-models', '--prefix', str(prefix)])
            self.assertEqual(error.exception.code, 2)
            self.assertFalse(prefix.exists())

    def test_linux_setup_prerequisite_failures_keep_reports_without_installing(self):
        cases = [
            ('missing', None, 'conda is required before setup'),
            ('mismatch', subprocess.CompletedProcess(['nvcc', '--version'], 0, 'release 12.4,', ''), 'CUDA Toolkit 12.1'),
            ('failed', subprocess.CompletedProcess(['nvcc', '--version'], 1, '', 'broken toolkit'), 'nvcc exited 1'),
        ]
        for case, toolkit, expected_error in cases:
            with self.subTest(case=case), tempfile.TemporaryDirectory() as directory:
                prefix = Path(directory) / 'attempt'

                def which(name):
                    return None if case == 'missing' and name == 'conda' else '/tools/bin/' + name

                with patch.object(prepare.platform, 'system', return_value='Linux'), \
                     patch.object(prepare.shutil, 'which', side_effect=which), \
                     patch.object(prepare.subprocess, 'run', return_value=toolkit) as commands, \
                     patch.object(prepare.urllib.request, 'urlretrieve') as download, \
                     contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
                    self.assertEqual(prepare.main(['--execute', '--download-models', '--prefix', str(prefix)]), 1)
                report = json.loads((prefix / 'setup-report.json').read_text())
                self.assertEqual(report['status'], 'failed')
                self.assertEqual(report['stage'], 'prerequisites')
                self.assertEqual(report['nvidiaExecution'], 'not_run')
                self.assertIn(expected_error, report['error'])
                self.assertIn(expected_error, (prefix / 'setup.log').read_text())
                self.assertIn('finishedAt', report)
                self.assertFalse((prefix / 'env').exists())
                self.assertFalse((prefix / 'weights').exists())
                download.assert_not_called()
                self.assertEqual(commands.call_count, 0 if case == 'missing' else 1)


if __name__ == '__main__':
    unittest.main()
