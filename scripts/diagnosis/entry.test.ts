import assert from 'node:assert/strict';
import {test} from 'node:test';
import {assessDiagnosedSpace as baseline} from './routes-traced.ts';
import {assessDiagnosedSpace as corrected} from './routes-entry.ts';
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
function run(mesh: TriangleMesh, text = 'a tunnel') {const events: TraceEvent[] = [], before = JSON.stringify(mesh), a = corrected({...input(mesh, text), trace: e => events.push(e)}); assert.equal(JSON.stringify(mesh), before); assert.ok(events.every(e => e.pass === 'baseline' || e.pass === 'entry-prism')); return {a, events};}
function verifyMovement(mesh: TriangleMesh, a: ReturnType<typeof corrected>) {
 assert.equal(a.status, 'passed'); assert.ok(a.approachVerified && a.metrics.routeDisplacement >= 3 - 1e-7);
 assert.ok(a.samples.every(s => s.valid && s.supportTriangleIds.every(i => i >= 0) && s.supportSamples.length === 9));
 const nav = createSurfaceNavigator(mesh, a.transform, a.options, a.approach!);
 const path = [a.approachStart!, ...a.route];
 for (const points of [path, path.toReversed()]) for (let i = 1; i < points.length; i++) {const p = points[i - 1], q = points[i], movement = nav.move(p, [q[0] - p[0], 0, q[2] - p[2]]); assert.equal(movement.blocked, false);}
}
test('same-mode predecessor passes preserve the complete route and never run new entry queries', () => {
 const f = tunnel(), prior = baseline(input(f.mesh)), {a, events} = run(f.mesh);
 assert.equal(prior.status, 'passed'); assert.deepEqual(withoutTimings(a), withoutTimings(prior)); assert.ok(events.every(e => e.pass === 'baseline'));
 assert.equal(events.filter(e => e.kind === 'entry-pass-start').length, 1);
});
test('overhead overhang admission requires completed continuous prism proof and actual reversible seam', () => {
 const f = tunnel(true); assert.equal(baseline(input(f.mesh)).status, 'failed');
 const {a, events} = run(f.mesh); verifyMovement(f.mesh, a);
 const proofs = events.filter(e => e.kind === 'entry-prism-proof' && e.clear); assert.ok(proofs.length); assert.ok(proofs.every(e => e.scanComplete === true));
 assert.ok(proofs.some(e => Number(e.outsideHeightBand) > 0)); assert.equal(events.filter(e => e.kind === 'entry-pass-start').length, 2);
 assert.ok(events.filter(e => e.pass === 'entry-prism' && e.kind === 'node-feature').length > 0);
});
test('a detached floor strictly below the support band cannot alone exclude the entrance', () => {
 const f = tunnel(); f.floor(-2, 2, -3.5, -3.2, -3);
 assert.equal(baseline(input(f.mesh)).status, 'failed'); const {a} = run(f.mesh); verifyMovement(f.mesh, a);
});
test('sealed rooms and both walled and unwalled internal holes retain rejection', () => {
 const sealed = tunnel(true); sealed.wallZ(-3, -2, 2); assert.equal(run(sealed.mesh).a.status, 'failed');
 for (const walls of [false, true]) {
  const f = fixture(); f.floor(-6, 6, -6, -4); f.floor(-6, 6, 4, 6); f.floor(-6, -4, -4, 4); f.floor(4, 6, -4, 4);
  if (walls) {for (const x of [-6, 6]) f.wallX(x, -6, 6); for (const z of [-6, 6]) f.wallZ(z, -6, 6);}
  const {a, events} = run(f.mesh, 'a courtyard'); assert.equal(a.status, 'failed');
  assert.ok(events.some(e => e.kind === 'exterior-approach-limit' || (e.kind === 'entry-prism-blocked' && (e.triangle as Vec3[]).every(p => p[1] === 0))));
 }
 const smaller = fixture(); smaller.floor(-4, 4, -4, -2); smaller.floor(-4, 4, 2, 4); smaller.floor(-4, -2, -2, 2); smaller.floor(2, 4, -2, 2);
 const insideCap = run(smaller.mesh, 'a courtyard'); assert.equal(insideCap.a.status, 'failed');
 assert.ok(insideCap.events.some(e => e.kind === 'entry-prism-blocked' && (e.triangle as Vec3[]).every(p => p[1] === 0)));
});
test('zero-thickness walls, sloping head obstacles and hanging beams remain solid', () => {
 const wall = tunnel(true); wall.wallZ(-3.777, -2, 2);
 const slope = tunnel(true); slope.quad([-2, 1.6, -3.9], [2, 1.6, -3.9], [2, 3, -3.1], [-2, 3, -3.1]);
 const beam = tunnel(true); beam.wallZ(-3.5, -2, 2, 1.7, 2.8);
 for (const f of [wall, slope, beam]) {const {a, events} = run(f.mesh); assert.equal(a.status, 'failed'); assert.ok(events.some(e => e.kind === 'entry-prism-blocked'));}
});
test('same-level source support beyond a gap is excluded from the authored corridor', () => {
 const f = tunnel(true); f.floor(-2, 2, -5, -3.2);
 const {a, events} = run(f.mesh); assert.equal(a.status, 'failed');
 assert.ok(events.some(e => e.kind === 'entry-prism-blocked' && (e.triangle as Vec3[]).every(p => p[1] === 0)));
});
test('missing generated floor continuity is not repaired by allowing an overhead roof', () => {
 const f = fixture(); f.floor(-1, 1, -3, -1); f.floor(-1, 1, 1, 3); f.roof(-1, 1, -4, 4); f.wallX(-1, -3, 3); f.wallX(1, -3, 3);
 assert.equal(run(f.mesh).a.status, 'failed');
});
test('grid limits still fail closed and each pass has independent unchanged caps', () => {
 const f = fixture(); f.floor(-20, 20, -20, 20);
 const {a, events} = run(f.mesh); assert.equal(a.status, 'failed'); assert.deepEqual(a.searchDiagnostics.exhausted, ['grid-cells']);
 const completed = events.filter(e => e.kind === 'entry-pass-complete'); assert.equal(completed.length, 2); assert.deepEqual(completed.map(e => (e.diagnostics as {budgets: unknown}).budgets), [a.searchDiagnostics.budgets, a.searchDiagnostics.budgets]);
});

test('a recessed entrance starts the whole body outside source bounds on a fully verified longer approach', () => {
 const f = tunnel(); f.roof(-2, 2, -7, -3);
 assert.equal(baseline(input(f.mesh)).status, 'failed'); const {a, events} = run(f.mesh); verifyMovement(f.mesh, a);
 assert.ok(a.approach!.length > 4.5 && a.approach!.length <= 10);
 assert.ok(a.approachStart![2] + a.options.radius < a.bounds.min[2]);
 assert.ok(events.some(e => e.kind === 'projection-start' && e.pass === 'entry-prism' && Number(e.bodyMarginBeyondBounds) >= 0.099999));
});
test('exterior access longer than the navigator approach cap is an explicit bounded rejection', () => {
 const f = tunnel(); f.roof(-2, 2, -13, -3);
 const {a, events} = run(f.mesh); assert.equal(a.status, 'failed');
 assert.ok(events.some(e => e.kind === 'exterior-approach-limit' && Number(e.requiredLength) > 10 && e.maximumLength === 10));
});
