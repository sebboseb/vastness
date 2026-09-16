import assert from 'node:assert/strict';
import {test} from 'node:test';
import {assessDiagnosedSpace as predecessor} from './routes-coverage.ts';
import {assessDiagnosedSpace as scoped} from './routes-doorway.ts';
import {compileDiagnosedCriteria as compilePredecessor} from './criteria-walkway.ts';
import {compileDiagnosedCriteria} from './criteria-doorway.ts';
import {createSurfaceNavigator, type TriangleMesh, type Vec3} from '../../apps/web/src/generated-passage/navigation.ts';
import type {TraceEvent} from './trace.ts';

function fixture() {
 const positions: number[] = [], indices: number[] = [];
 function quad(a: Vec3, b: Vec3, c: Vec3, d: Vec3) {const i = positions.length / 3; positions.push(...a, ...b, ...c, ...d); indices.push(i, i + 1, i + 2, i, i + 2, i + 3);}
 const floor = (x0: number, x1: number, z0: number, z1: number, y = 0) => quad([x0, y, z0], [x0, y, z1], [x1, y, z1], [x1, y, z0]);
 const roof = (x0: number, x1: number, z0: number, z1: number, y = 3) => quad([x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]);
 const wallX = (x: number, z0: number, z1: number, low = 0, high = 3) => quad([x, low, z0], [x, high, z0], [x, high, z1], [x, low, z1]);
 const wallZ = (z: number, x0: number, x1: number, low = 0, high = 3) => quad([x0, low, z], [x1, low, z], [x1, high, z], [x0, high, z]);
 return {mesh: {positions, indices} as TriangleMesh, floor, roof, wallX, wallZ};
}
// The original floor broadens locally on both sides of the aperture, then narrows
// to a supported walkway. No 2.4m-diameter broad center region fits along a metre of route.
function chamber(apertureWidth = 2.6, options: {wideFloor?: boolean; sealed?: boolean; roof?: boolean; gap?: boolean} = {}) {
 const f = fixture(), half = apertureWidth / 2;
 if (options.wideFloor) f.floor(-2.2, 2.2, -4, 4);
 else {
  if (options.gap) {f.floor(-2.2, 2.2, -1.1, -0.4); f.floor(-2.2, 2.2, 0.4, 1.1);}
  else f.floor(-2.2, 2.2, -1.1, 1.1);
  f.floor(-0.6, 0.6, -4, -1.1);
  f.floor(-0.6, 0.6, 1.1, 4);
 }
 if (options.roof !== false) f.roof(-2.2, 2.2, -4, 4);
 f.wallX(-2.2, -4, 4); f.wallX(2.2, -4, 4);
 for (const x of [-half, half]) f.wallX(x, -0.2, 0.2);
 for (const z of [-0.2, 0.2]) {f.wallZ(z, -2.2, -half); f.wallZ(z, half, 2.2);}
 if (options.sealed) f.wallZ(0, -half, half);
 return f.mesh;
}
const text = 'a chamber with a broad doorway';
const input = (mesh: TriangleMesh, intent = text, searchMode: 'expanded' | 'legacy' = 'expanded') => ({mesh, transform: {scale: 1, yaw: 0, position: [0, 0, 0.1] as Vec3}, criteria: compileDiagnosedCriteria(intent), searchMode});
const withoutTime = (assessment: ReturnType<typeof scoped>) => {const copy = structuredClone(assessment); copy.metrics.buildMs = 0; copy.metrics.assessmentMs = 0; return copy;};
function verifyMovement(mesh: TriangleMesh, assessment: ReturnType<typeof scoped>) {
 assert.equal(assessment.status, 'passed');
 assert.ok(assessment.approachVerified && assessment.metrics.routeDisplacement >= 3 - 1e-7);
 assert.ok(assessment.samples.every(sample => sample.valid && sample.supportTriangleIds.length > 0 && sample.supportTriangleIds.every(id => id >= 0)));
 const nav = createSurfaceNavigator(mesh, assessment.transform, assessment.options, assessment.approach!);
 const path = [assessment.approachStart!, ...assessment.route];
 for (const points of [path, path.toReversed()]) for (let i = 1; i < points.length; i++) {
  const a = points[i - 1], b = points[i], movement = nav.move(a, [b[0] - a[0], 0, b[2] - a[2]]);
  assert.equal(movement.blocked, false); assert.ok(Math.hypot(movement.position[0] - b[0], movement.position[2] - b[2]) < 1e-6);
 }
}

test('broad local aperture plus narrower supported route succeeds only with scoped obligations', () => {
 const mesh = chamber(), prior = predecessor({...input(mesh), criteria: compilePredecessor(text)}), events: TraceEvent[] = [];
 assert.equal(prior.status, 'failed');
 const assessment = scoped({...input(mesh), trace: event => events.push(event)});
 verifyMovement(mesh, assessment);
 const doorway = assessment.topologyWitnesses.find(witness => witness.kind === 'doorway-crossing')!;
 assert.ok(doorway && Number(doorway.measurements.apertureWidth) >= 2.4);
 assert.ok(assessment.topologyWitnesses.some(witness => witness.kind === 'enclosed-passage'));
 assert.ok(assessment.topologyWitnesses.some(witness => witness.kind === 'explicit-cover'));
 assert.ok(events.some(event => event.kind === 'doorway-pass-start' && event.scopePass === 'scoped-coverage'));
});

test('global0.6 cannot bypass the preserved2.4 aperture threshold', () => {
 const mesh = chamber(1.4), events: TraceEvent[] = [];
 const assessment = scoped({...input(mesh), trace: event => events.push(event)});
 assert.equal(assessment.status, 'failed');
 assert.ok(events.some(event => event.scopePass === 'scoped-coverage' && event.kind === 'aperture-axis' && event.firstFailure === 'aperture-width' && event.minimumWidth === 2.4));
 // This control demonstrates the false positive that would result from ignoring the override.
 const unsafe = predecessor(input(mesh));
 assert.equal(unsafe.status, 'passed');
});

test('predecessor successful route is retained under conservative global width', () => {
 const mesh = chamber(2.6, {wideFloor: true}), prior = predecessor({...input(mesh), criteria: compilePredecessor(text)}), events: TraceEvent[] = [];
 assert.equal(prior.status, 'passed');
 const assessment = scoped({...input(mesh), trace: event => events.push(event)});
 verifyMovement(mesh, assessment);
 assert.deepEqual(assessment.route, prior.route); assert.deepEqual(assessment.topologyWitnesses, prior.topologyWitnesses);
 assert.ok(!events.some(event => event.scopePass === 'scoped-coverage'));
 assert.deepEqual(assessment.criteria, compileDiagnosedCriteria(text));
});

test('criteria without scoped width retain exact predecessor assessment and trace', () => {
 const mesh = chamber(1.4), plain = input(mesh, 'a chamber with a doorway'), before: TraceEvent[] = [], after: TraceEvent[] = [];
 const prior = predecessor({...plain, trace: event => before.push(event)}), assessment = scoped({...plain, trace: event => after.push(event)});
 assert.deepEqual(withoutTime(assessment), withoutTime(prior));
 const stripTime = (events: TraceEvent[]) => events.map(event => {
  const copy = structuredClone(event); if (copy.metrics) {const m = copy.metrics as Record<string, unknown>; delete m.buildMs; delete m.assessmentMs;} return copy;
 });
 assert.deepEqual(stripTime(after), stripTime(before));
});

test('scope cannot repair sealed aperture, absent roof, unsupported gap or broad whole chamber', () => {
 for (const mesh of [chamber(2.6, {sealed: true}), chamber(2.6, {roof: false}), chamber(2.6, {gap: true})]) assert.equal(scoped(input(mesh)).status, 'failed');
 const wideIntent = 'a broad chamber with a broad doorway';
 assert.equal(input(chamber(), wideIntent).criteria.widthByTopology, undefined);
 assert.equal(scoped(input(chamber(), wideIntent)).status, 'failed');
});


test('legacy scoped search also preserves aperture width and actual reversible movement', () => {
 const mesh = chamber(), assessment = scoped(input(mesh, text, 'legacy'));
 verifyMovement(mesh, assessment);
 assert.ok(Number(assessment.topologyWitnesses.find(witness => witness.kind === 'doorway-crossing')?.measurements.apertureWidth) >= 2.4);
 assert.equal(scoped(input(chamber(1.4), text, 'legacy')).status, 'failed');
});

test('non-finite or sub-body scoped widths fail explicitly before geometric evaluation', () => {
 for (const width of [NaN, Infinity, -1, 0.2]) {
  const request = input(chamber()); request.criteria.widthByTopology = {'doorway-crossing': width};
  assert.throws(() => scoped(request), /finite and at least the physical body diameter/);
 }
});
