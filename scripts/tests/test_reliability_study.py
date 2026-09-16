"""Study runner HTTP behavior: one POST despite lost responses, retained failures."""
import importlib.util
import json
from pathlib import Path
import tempfile
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from types import SimpleNamespace
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('study', Path(__file__).parents[1] / 'run-reliability-study.py')
study = importlib.util.module_from_spec(spec)
spec.loader.exec_module(study)


class StudyTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.posts = []
        self.worlds = []
        self.drop = False
        self.processing_reads_remaining = 0
        self.final_world_status = 'failed'
        self.worker_status = 'failed'
        owner = self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, *args):
                pass

            def reply(self, value):
                data = json.dumps(value).encode()
                self.send_response(200)
                self.end_headers()
                self.wfile.write(data)

            def do_GET(self):
                if self.path == '/version':
                    self.reply({'gitCommit': 'fixed'})
                elif self.path == '/api/intent/worlds':
                    self.reply(owner.worlds)
                elif self.path.startswith('/api/intent/worlds/'):
                    world = next(w for w in owner.worlds if self.path.endswith(w['id']))
                    status = owner.final_world_status
                    if owner.processing_reads_remaining:
                        owner.processing_reads_remaining -= 1
                        status = 'processing'
                    self.reply({**world, 'status': status})
                elif self.path.startswith('/jobs/'):
                    self.reply({'status': owner.worker_status, 'logs': [], 'error': None})

            def do_POST(self):
                raw = json.loads(self.rfile.read(int(self.headers['Content-Length'])))
                owner.posts.append(raw)
                identity = 'job-' + str(len(owner.posts))
                world = {'id': identity, 'jobId': identity, 'createdAt': study.now(),
                         'rawIntent': {k: raw[k] for k in ('text', 'source')},
                         'request': {'id': identity, 'seed': raw['seed'], 'prompt': '{}'},
                         'semantics': {}, 'status': 'failed'}
                owner.worlds.append(world)
                if owner.drop:
                    self.close_connection = True
                    return
                self.reply(world)

        self.server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
        threading.Thread(target=self.server.serve_forever, daemon=True).start()
        self.addCleanup(self.server.server_close)
        self.addCleanup(self.server.shutdown)
        url = 'http://127.0.0.1:' + str(self.server.server_port)
        self.args = SimpleNamespace(output=Path(self.tmp.name), timeout=2, poll_seconds=0,
                                    api_url=url, worker_url=url)
        self.tokens = {'semantics': {}, 'promptLengthPass': True}
        self.row = {'id': 'one', 'text': 'Test corridor', 'seed': 7, 'category': 'corridor', 'promptVariant': 1}
        self.plan = {'workerCommit': 'fixed'}

    def run_row(self, row=None):
        with patch.object(study, 'collect', return_value=None):
            study.candidate(row or self.row, self.tokens, self.args, self.plan)

    def test_response_loss_reconciles_saved_world_without_new_post(self):
        self.drop = True
        with self.assertRaises(Exception):
            self.run_row()
        self.drop = False
        self.run_row()
        self.run_row()
        self.assertEqual(len(self.posts), 1)
        state = json.loads((self.args.output / 'one/candidate.json').read_text())
        self.assertEqual(state['jobId'], 'job-1')
        self.assertEqual(state['gpuStatus'], 'failed')
        self.assertTrue(state['collected'])

    def test_failed_generation_does_not_prevent_next_candidate(self):
        self.run_row()
        self.run_row({**self.row, 'id': 'two', 'seed': 42})
        self.assertEqual([p['seed'] for p in self.posts], [7, 42])
        self.assertTrue((self.args.output / 'one/worker-job.json').exists())
        self.assertTrue((self.args.output / 'two/worker-job.json').exists())

    def test_overlong_prompt_recorded_without_submission(self):
        self.tokens['promptLengthPass'] = False
        self.run_row()
        self.assertEqual(self.posts, [])
        state = json.loads((self.args.output / 'one/candidate.json').read_text())
        self.assertEqual(state['failureStage'], 'prompt_length')
        self.assertTrue(state['collected'])

    def test_mac_processing_beyond_twenty_polls_waits_for_terminal_state(self):
        self.worker_status = 'succeeded'
        self.final_world_status = 'ready'
        self.processing_reads_remaining = 25
        self.run_row()
        state = json.loads((self.args.output / 'one/candidate.json').read_text())
        self.assertTrue(state['collected'])
        self.assertEqual(state['macStatus'], 'ready')
        self.assertEqual(self.processing_reads_remaining, 0)
        self.assertEqual(len(self.posts), 1)

    def test_mac_deadline_preserves_ids_and_resume_uses_same_generation(self):
        self.worker_status = 'succeeded'
        self.final_world_status = 'ready'
        self.processing_reads_remaining = 100
        self.args.timeout = 0
        with self.assertRaisesRegex(TimeoutError, 'Mac preparation'):
            self.run_row()
        state = json.loads((self.args.output / 'one/candidate.json').read_text())
        self.assertFalse(state.get('collected', False))
        self.assertEqual(state['jobId'], 'job-1')
        self.assertEqual(json.loads((self.args.output / 'one/world.json').read_text())['status'], 'processing')
        self.args.timeout = 2
        self.processing_reads_remaining = 0
        self.run_row()
        resumed = json.loads((self.args.output / 'one/candidate.json').read_text())
        self.assertEqual(resumed['jobId'], state['jobId'])
        self.assertEqual(resumed['macStatus'], 'ready')
        self.assertTrue(resumed['collected'])
        self.assertEqual(len(self.posts), 1)

    def test_legacy_nonterminal_collected_record_is_reconciled(self):
        self.worker_status = 'succeeded'
        self.final_world_status = 'ready'
        self.run_row()
        path = self.args.output / 'one/candidate.json'
        state = json.loads(path.read_text())
        state['macStatus'] = 'processing'
        study.save(path, state)
        self.run_row()
        resumed = json.loads(path.read_text())
        self.assertEqual(resumed['jobId'], state['jobId'])
        self.assertEqual(resumed['macStatus'], 'ready')
        self.assertTrue(resumed['collected'])
        self.assertEqual(len(self.posts), 1)

    def test_changed_immutable_manifest_refused(self):
        path = self.args.output / 'manifest.json'
        study.immutable(path, {'a': 1})
        with self.assertRaises(ValueError):
            study.immutable(path, {'a': 2})
        self.assertEqual(json.loads(path.read_text()), {'a': 1})


if __name__ == '__main__':
    unittest.main()
