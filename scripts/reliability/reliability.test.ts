import assert from 'node:assert/strict';
import {test} from 'node:test';
import {mkdtemp, mkdir, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {assessMesh, diagnose, isAssessment, assessCandidate, readJson, saveJson, type Plan} from './assess.ts';
import {browserPassed, summarizeStudy, wilson} from './summarize.ts';
import type {TriangleMesh, Vec3} from '../../apps/web/src/generated-passage/navigation.ts';

function room({width = 3, floor = true, roof = true, sealed = false} = {}): TriangleMesh {
 const positions: number[] = [], indices: number[] = [];
 const quad = (...points: Vec3[]) => {const base = positions.length / 3; positions.push(...points.flat()); indices.push(base, base + 1, base + 2, base, base + 2, base + 3);};
 const x = width / 2;
 if (floor) quad([-x, 0, -3], [-x, 0, 3], [x, 0, 3], [x, 0, -3]);
 if (roof) {
  quad([-x, 3, -3], [x, 3, -3], [x, 3, 3], [-x, 3, 3]);
  quad([-x, 0, -3], [-x, 3, -3], [-x, 3, 3], [-x, 0, 3]);
  quad([x, 0, -3], [x, 0, 3], [x, 3, 3], [x, 3, -3]);
 }
 if (sealed) for (const z of [-3, 3]) quad([-x, 0, z], [x, 0, z], [x, 3, z], [-x, 3, z]);
 return {positions, indices};
}
const hash = 'a'.repeat(64);
test('taxonomy distinguishes missing sampled support, patchy footprints, sealed entry and open floor without changing geometry', () => {
 for (const [mesh, cause] of [[room({floor: false}), 'no-sampled-generated-support'], [room({width: .2}), 'patchy-support-footprint'], [room({sealed: true}), 'no-exterior-entry'], [room({roof: false}), 'enclosure-missing']] as const) {
  const before = JSON.stringify(mesh), attempt = assessMesh(mesh, hash, [1])[0], diagnosis = diagnose(attempt);
  assert.equal(diagnosis.cause, cause); assert.equal(JSON.stringify(mesh), before);
  if (cause === 'patchy-support-footprint') {assert.equal(diagnosis.rawSupportExists, true); assert.equal(diagnosis.supportedFreeSpaceExists, false);}
 }
});
test('scale-sensitive accepted assessment preserves original source hash, route, footprint IDs and seam', () => {
 const mesh = room(); mesh.positions = Array.from(mesh.positions, n => n / 10);
 const attempts = assessMesh(mesh, hash, [6, 10, 12]);
 assert.equal(attempts[0].status, 'failed'); assert.equal(attempts[1].status, 'passed');
 const accepted = attempts[1]; assert.ok(isAssessment(accepted)); assert.equal(accepted.sourceSha256, hash);
 assert.ok(accepted.route.length > 0 && accepted.approachVerified && accepted.metrics.routeDisplacement >= 3 && accepted.metrics.continuousEnclosedDistance >= 1);
 assert.ok(accepted.samples.every(s => s.valid && s.supportTriangleIds.every(id => id >= 0)));
});
test('a bounded failure at one scale does not prevent subsequent scale assessment', () => {
 const mesh = room(); mesh.positions = Array.from(mesh.positions, n => n / 10);
 const attempts = assessMesh(mesh, hash, [20, 10], input => {if (input.transform.scale === 20) throw new Error('Triangle spatial index exceeds bounded reference budget'); return assessMesh(mesh, hash, [10])[0] as any;});
 assert.equal(diagnose(attempts[0]).cause, 'parser-resource-bound'); assert.equal(diagnose(attempts[0]).topologyFailure, false); assert.equal(attempts[1].status, 'passed');
});
test('all declared jobs remain in the denominator and offline success never implies browser acceptance', async () => {
 const data = await mkdtemp(join(tmpdir(), 'reliability-'));
 const plan: Plan = {studyId: 'test', primaryScale: 6, secondaryScales: [10, 12], candidates: [{id: 'failed', category: 'tunnel', promptVariant: 1, seed: 7, text: 'tunnel'}, {id: 'pending', category: 'tunnel', promptVariant: 1, seed: 42, text: 'tunnel'}]};
 try {
  const dir = join(data, 'candidates/failed'); await mkdir(dir, {recursive: true});
  await saveJson(join(dir, 'candidate.json'), {collected: true, seed: 7, rawIntent: {text: 'tunnel'}, gpuStatus: 'failed', failureStage: 'inference', error: 'CUDA out of memory'});
  await assessCandidate(plan.candidates[0], {root: data, data, plan});
  const batch = await readJson(join(dir, 'assessment.json')); assert.equal(batch.attempts.length, 3); assert.ok(batch.attempts.every((a: any) => a.assessmentError.message === 'CUDA out of memory'));
  const summary = await summarizeStudy(plan, data); assert.equal(summary.primary.planned, 2); assert.equal(summary.primary.fullPipelinePasses, 0); assert.equal(summary.rows.length, 2); assert.equal(summary.complete, false); assert.equal(summary.rows[0].measurements.generationSeconds, null);
  assert.equal(browserPassed(null, 6, hash), false);
  const browser = {attempts: [{scale: 6, status: 'passed', entry: true, traversal: true, return: true, sourceSha256: hash, evidence: {forward: 'file'}}]};
  assert.equal(browserPassed(browser, 6, hash), true); assert.equal(browserPassed(browser, 6, 'b'.repeat(64)), false); assert.equal(browserPassed(browser, 10, hash), false);
 } finally {await rm(data, {recursive: true, force: true});}
});
test('Wilson interval remains descriptive and nondegenerate for zero successes', () => {
 const interval = wilson(0, 36)!; assert.ok(interval.lower < 1e-10); assert.ok(Math.abs(interval.upper - .0964186) < 1e-6); assert.equal(wilson(0, 0), null);
});
