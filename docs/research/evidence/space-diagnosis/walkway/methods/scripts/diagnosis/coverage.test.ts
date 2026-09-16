import assert from 'node:assert/strict';
import {test} from 'node:test';
import {assessDiagnosedSpace as baseline} from './routes-entry.ts';
import {assessDiagnosedSpace as corrected} from './routes-coverage.ts';
import {deriveCorrectedSpatialCriteria} from '../interpretation/criteria-v2.ts';
import {createSurfaceNavigator, type TriangleMesh, type Vec3} from '../../apps/web/src/generated-passage/navigation.ts';
import type {TraceEvent} from './trace.ts';
function fixture() {
 const positions: number[] = [], indices: number[] = [];
 function quad(a: Vec3, b: Vec3, c: Vec3, d: Vec3) {const i = positions.length / 3; positions.push(...a, ...b, ...c, ...d); indices.push(i, i + 1, i + 2, i, i + 2, i + 3);}
 const floor = (x0: number, x1: number, z0: number, z1: number, y = 0) => quad([x0, y, z0], [x0, y, z1], [x1, y, z1], [x1, y, z0]);
 const roof = (x0: number, x1: number, z0: number, z1: number, y = 3) => quad([x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]);
 const wallX = (x: number, z0: number, z1: number, low = 0, high = 3) => quad([x, low, z0], [x, high, z0], [x, high, z1], [x, low, z1]);
 const wallZ = (z: number, x0: number, x1: number, low = 0, high = 3) => quad([x0, low, z], [x1, low, z], [x1, high, z], [x0, high, z]);
 return {mesh: {positions, indices} as TriangleMesh, quad, floor, roof, wallX, wallZ};
}
function tunnel(overhang = false) {const f = fixture(); f.floor(-2, 2, -3, 3); f.roof(-2, 2, overhang ? -4 : -3, 3); f.wallX(-2, -3, 3); f.wallX(2, -3, 3); f.wallZ(3, -2, 2); return f;}
const input = (mesh: TriangleMesh, text = 'a tunnel') => ({mesh, transform: {scale: 1, yaw: 0, position: [0, 0, 0] as Vec3}, criteria: deriveCorrectedSpatialCriteria(text), searchMode: 'expanded' as const});
const withoutTimings = (a: ReturnType<typeof baseline>) => {const copy = structuredClone(a); copy.metrics.buildMs = 0; copy.metrics.assessmentMs = 0; return copy;};
function run(mesh: TriangleMesh, text = 'a tunnel') {const events: TraceEvent[] = [], before = JSON.stringify(mesh), a = corrected({...input(mesh, text), trace: e => events.push(e)}); assert.equal(JSON.stringify(mesh), before); assert.ok(events.every(e => e.pass === 'predecessor' || e.pass === 'coverage-round-robin')); return {a, events};}
function verifyMovement(mesh: TriangleMesh, a: ReturnType<typeof corrected>) {
 assert.equal(a.status, 'passed'); assert.ok(a.approachVerified && a.metrics.routeDisplacement >= 3 - 1e-7);
 assert.ok(a.samples.every(s => s.valid && s.supportTriangleIds.every(i => i >= 0) && s.supportSamples.length === 9));
 const nav = createSurfaceNavigator(mesh, a.transform, a.options, a.approach!);
 const path = [a.approachStart!, ...a.route];
 for (const points of [path, path.toReversed()]) for (let i = 1; i < points.length; i++) {const p = points[i - 1], q = points[i], movement = nav.move(p, [q[0] - p[0], 0, q[2] - p[2]]); assert.equal(movement.blocked, false);}
}

test('late selected entry receives a qualifying route before early roots consume the unchanged global cap', () => {
 const f = fixture(); f.floor(-18, 10, -10, 4); f.floor(11, 15, -4, 4); f.roof(11, 15, -4, 4); f.wallX(11, -4, 4); f.wallX(15, -4, 4);
 const args = input(f.mesh, 'a broad covered hall'), before = JSON.stringify(args);
 const stats: Record<string, {selected: string[]; candidates: number; firstProposal?: string; acceptedProposal?: string; acceptedRound?: number; paths: Map<string, number[]>}> = {};
 const a = corrected({...args, trace: e => {
  const pass = String(e.pass) + ':' + String(e.predecessorPass ?? 'fair');
  const s = stats[pass] ??= {selected: [], candidates: 0, paths: new Map()};
  if (e.kind === 'selected') s.selected.push(String(e.proposalId));
  if (e.kind === 'candidate') {s.candidates++; s.firstProposal ??= String(e.proposalId); if (!s.paths.has(String(e.proposalId))) s.paths.set(String(e.proposalId), e.nodeIds as number[]);}
  if (e.kind === 'accepted') s.acceptedProposal = String(e.proposalId);
  if (e.kind === 'scheduler-complete') s.acceptedRound = Number(e.round);
 }});
 assert.equal(JSON.stringify(args), before); verifyMovement(f.mesh, a);
 const prior = stats['predecessor:entry-prism'], fair = stats['coverage-round-robin:fair'];
 assert.equal(prior.candidates, 4096); assert.equal(prior.acceptedProposal, undefined);
 assert.deepEqual(fair.selected, prior.selected); assert.notEqual(fair.acceptedProposal, prior.firstProposal);
 assert.ok(fair.candidates < 4096); assert.ok(a.route.every(p => p[0] >= 11));
 for (const [proposal, path] of fair.paths) if (prior.paths.has(proposal)) assert.deepEqual(path, prior.paths.get(proposal));
 assert.equal(a.searchDiagnostics.budgets.candidateRoutes, 4096);
});
test('successful predecessor route and assessment are returned unchanged in both modes', () => {
 for (const searchMode of ['expanded', 'legacy'] as const) {
  const f = tunnel(), args = {...input(f.mesh), searchMode}, prior = baseline(args), events: TraceEvent[] = [];
  const a = corrected({...args, trace: e => events.push(e)});
  assert.equal(prior.status, 'passed'); assert.deepEqual(withoutTimings(a), withoutTimings(prior));
  assert.ok(events.every(e => e.pass === 'predecessor')); assert.ok(events.some(e => e.predecessorPass === 'baseline'));
 }
});
test('sealed rooms, internal floor holes, thin barriers and disconnected support remain rejected', () => {
 const sealed = tunnel(true); sealed.wallZ(-3, -2, 2);
 const hole = fixture(); hole.floor(-4, 4, -4, -2); hole.floor(-4, 4, 2, 4); hole.floor(-4, -2, -2, 2); hole.floor(2, 4, -2, 2);
 const wall = tunnel(true); wall.wallZ(-3.777, -2, 2);
 const gap = fixture(); gap.floor(-1, 1, -3, -1); gap.floor(-1, 1, 1, 3); gap.roof(-1, 1, -4, 4); gap.wallX(-1, -3, 3); gap.wallX(1, -3, 3);
 for (const [f, text] of [[sealed, 'a tunnel'], [hole, 'a courtyard'], [wall, 'a tunnel'], [gap, 'a tunnel']] as const) assert.equal(run(f.mesh, text).a.status, 'failed');
});
test('one shared component keeps distinct entry streams and fails closed at the unchanged route cap', () => {
 const f = fixture(); f.floor(-4, 4, -4, 4);
 const seen = new Set<string>(), features = new Set<number>(), completed: TraceEvent[] = [], rounds = new Map<number, Set<string>>(); let candidates = 0, duplicateFeatures = 0;
 const a = corrected({...input(f.mesh, 'a broad covered hall'), trace: e => {
  if (e.pass !== 'coverage-round-robin') return;
  if (e.kind === 'candidate') {candidates++; seen.add(String(e.proposalId)); const ids = rounds.get(Number(e.round)) ?? new Set(); assert.ok(!ids.has(String(e.proposalId))); ids.add(String(e.proposalId)); rounds.set(Number(e.round), ids);}
  if (e.kind === 'node-feature') {if (features.has(Number(e.nodeId))) duplicateFeatures++; features.add(Number(e.nodeId));}
  if (['scheduler-complete', 'stream-unexecuted'].includes(e.kind)) completed.push(e);
 }});
 assert.equal(a.status, 'failed'); assert.ok(seen.size > 1); assert.equal(candidates, 4096); assert.equal(a.searchDiagnostics.candidateRoutes, 4096);
 assert.ok(a.searchDiagnostics.exhausted.includes('candidate-routes')); assert.ok(completed.some(e => e.kind === 'stream-unexecuted' && e.reason === 'candidate-routes'));
 assert.equal(duplicateFeatures, 0); assert.ok(a.searchDiagnostics.topologyQueries <= 160000); assert.ok(a.searchDiagnostics.edgesTested <= 80000);
});
test('unsupported criteria and grid exhaustion produce no invented candidates', () => {
 const f = fixture(); f.floor(-20, 20, -20, 20);
 for (const args of [input(f.mesh), input(tunnel().mesh, 'quiet mountains')]) {
  let candidates = 0; const a = corrected({...args, trace: e => {if (e.kind === 'candidate') candidates++;}});
  assert.equal(a.status, 'failed'); assert.equal(candidates, 0);
 }
});
