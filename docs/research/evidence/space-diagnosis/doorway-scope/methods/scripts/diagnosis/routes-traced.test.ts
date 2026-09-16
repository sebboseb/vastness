import assert from 'node:assert/strict';
import {test} from 'node:test';
import {assessInterpretedSpace} from '../interpretation/routes.ts';
import {deriveCorrectedSpatialCriteria} from '../interpretation/criteria-v2.ts';
import {assessDiagnosedSpace} from './routes-traced.ts';
import type {TraceEvent} from './trace.ts';
import type {TriangleMesh, Vec3} from '../../apps/web/src/generated-passage/navigation.ts';

function fixture() {
 const positions: number[] = [], indices: number[] = [];
 function quad(a: Vec3, b: Vec3, c: Vec3, d: Vec3) {const i = positions.length / 3; positions.push(...a, ...b, ...c, ...d); indices.push(i, i + 1, i + 2, i, i + 2, i + 3);}
 const floor = (x0: number, x1: number, z0: number, z1: number, y = 0) => quad([x0, y, z0], [x0, y, z1], [x1, y, z1], [x1, y, z0]);
 const roof = (x0: number, x1: number, z0: number, z1: number, y = 3) => quad([x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]);
 const wallX = (x: number, z0: number, z1: number, low = 0, high = 3) => quad([x, low, z0], [x, high, z0], [x, high, z1], [x, low, z1]);
 const wallZ = (z: number, x0: number, x1: number, low = 0, high = 3) => quad([x0, low, z], [x1, low, z], [x1, high, z], [x0, high, z]);
 return {mesh: {positions, indices} as TriangleMesh, quad, floor, roof, wallX, wallZ};
}
function room(sealed = false, height = 3) {const f = fixture(); f.floor(-2, 2, -3, 3); f.roof(-2, 2, -3, 3, height); f.wallX(-2, -3, 3, 0, height); f.wallX(2, -3, 3, 0, height); if (sealed) {f.wallZ(-3, -2, 2, 0, height); f.wallZ(3, -2, 2, 0, height);} return f;}
function withoutTimings(a: ReturnType<typeof assessInterpretedSpace>) {const copy = structuredClone(a); copy.metrics.buildMs = 0; copy.metrics.assessmentMs = 0; return copy;}
function compare(mesh: TriangleMesh, text: string, searchMode: 'legacy' | 'expanded' = 'expanded') {
 const input = {mesh, transform: {scale: 1, yaw: 0, position: [0, 0, 0] as Vec3}, criteria: deriveCorrectedSpatialCriteria(text), searchMode}, before = JSON.stringify(input), events: TraceEvent[] = [];
 const original = assessInterpretedSpace(input), traced = assessDiagnosedSpace({...input, trace: e => events.push(e)});
 assert.deepEqual(withoutTimings(traced), withoutTimings(original)); assert.equal(JSON.stringify(input), before);
 assert.equal(events[0].kind, 'assessment-start'); assert.equal(events.at(-1)!.kind, 'assessment-complete');
 const features = events.filter(e => e.kind === 'node-feature').map(e => e.nodeId); assert.equal(new Set(features).size, features.length);
 const broad = events.filter(e => e.kind === 'broad-feature').map(e => e.featureKey); assert.equal(new Set(broad).size, broad.length);
 return {assessment: traced, events};
}

test('accepted route, witnesses, samples, diagnostics and options exactly match in both modes', () => {
 for (const mode of ['legacy', 'expanded'] as const) {
  const {assessment, events} = compare(room().mesh, 'a tunnel', mode); assert.equal(assessment.status, 'passed');
  assert.equal(events.filter(e => e.kind === 'swept-forward').length, assessment.searchDiagnostics.approachBuilds);
  assert.equal(events.filter(e => e.kind === 'swept-reverse').length, assessment.searchDiagnostics.approachBuilds);
  assert.equal(events.filter(e => e.stage === 'edge' && e.kind === 'tested').length, assessment.searchDiagnostics.edgesTested);
  assert.equal(events.filter(e => e.kind === 'ray').length, assessment.searchDiagnostics.topologyQueries);
  assert.equal(events.filter(e => e.kind === 'candidate').length, Math.min(4096, assessment.searchDiagnostics.candidateRoutes));
 }
});
test('all topology branches preserve successful and rejected synthetic decisions', () => {
 const courtyard = fixture(); courtyard.floor(-3, 3, -3, 3); courtyard.wallX(-3, -3, 3); courtyard.wallX(3, -3, 3); courtyard.wallZ(3, -3, 3);
 const arch = fixture(); arch.floor(-4, 4, -4, 4); arch.wallX(-1, -.25, .25); arch.wallX(1, -.25, .25); for (const z of [-.25, .25]) {arch.wallZ(z, -3, -1); arch.wallZ(z, 1, 3);} arch.roof(-1, 1, -.35, .35, 2.5);
 const bridge = fixture(); bridge.floor(-1, 1, -3, 3, 2); bridge.roof(-1, 1, -3, 3, 1.8); bridge.wallX(-.2, -.2, .2, 0, 1.8);
 for (const [mesh, text] of [[courtyard.mesh, 'courtyard enclosed by walls under open sky'], [arch.mesh, 'through an arch'], [bridge.mesh, 'cross a bridge'], [room(false, 9).mesh, 'a broad hall'], [courtyard.mesh, 'a broad covered hall']] as const) compare(mesh, text);
 arch.wallZ(0, -1, 1); compare(arch.mesh, 'through an arch');
});
test('sealed and internal-hole rejection records original projection triangles and omitted stages', () => {
 const sealed = compare(room(true).mesh, 'a tunnel'); assert.equal(sealed.assessment.status, 'failed');
 assert.ok(sealed.events.some(e => e.kind === 'rejected' && e.firstFailure === 'body-obstruction'));
 const hole = fixture(); hole.floor(-6, 6, -6, -4); hole.floor(-6, 6, 4, 6); hole.floor(-6, -4, -4, 4); hole.floor(4, 6, -4, 4); for (const x of [-6, 6]) hole.wallX(x, -6, 6); for (const z of [-6, 6]) hole.wallZ(z, -6, 6);
 const {assessment, events} = compare(hole.mesh, 'an open courtyard'); assert.equal(assessment.status, 'failed');
 const blocked = events.find(e => e.kind === 'projection-blocked')!; assert.ok(Number.isInteger(blocked.triangleId)); assert.equal((blocked.triangle as Vec3[]).length, 3);
 assert.ok(events.some(e => e.kind === 'rejected' && (e.unexecuted as string[])?.includes('final-seam')));
});
test('first failed node predicates leave later queries explicitly unexecuted', () => {
 const f = fixture(); f.floor(-3, 3, -3, 3);
 const {assessment, events} = compare(f.mesh, 'a broad hall'); assert.equal(assessment.status, 'failed');
 const event = events.find(e => e.kind === 'node-predicate' && e.firstFailure === 'roof-coverage')!;
 assert.ok(event); assert.deepEqual((event.checks as {status: string}[]).map(c => c.status), ['failed', 'not-evaluated', 'not-evaluated']);
 assert.ok(events.some(e => e.kind === 'route-rejected' && e.firstFailingTopology === 'broad-covered-interior'));
 assert.equal(events.filter(e => e.kind === 'broad-feature').length, 0);
});
test('entry rank, cap omissions and successful-stop omissions partition the original proposals', () => {
 const f = room(); f.floor(-2, 2, -8, -3); f.floor(-2, 2, 3, 8);
 const {assessment, events} = compare(f.mesh, 'a tunnel', 'legacy');
 const eligible = events.filter(e => e.kind === 'eligible'), selected = events.filter(e => e.kind === 'selected'), omitted = events.filter(e => e.kind === 'omitted');
 assert.equal(eligible.length, assessment.metrics.entryCandidates); assert.equal(selected.length + omitted.length, eligible.length);
 assert.ok(omitted.length > 0); assert.ok(omitted.every(e => e.reason === 'entry-cap'));
 assert.equal(events.filter(e => e.kind === 'attempt').length, assessment.searchDiagnostics.entriesTested);
 assert.equal(events.filter(e => e.kind === 'not-attempted').length + assessment.searchDiagnostics.entriesTested, selected.length);
});
test('grid budget and unsupported criteria preserve terminal failure instead of fabricating evaluations', () => {
 const f = fixture(); f.floor(-20, 20, -20, 20);
 const {assessment, events} = compare(f.mesh, 'a tunnel'); assert.equal(assessment.status, 'failed'); assert.ok(events.some(e => e.stage === 'budget' && e.reason === 'grid-cells'));
 const unsupported = compare(room().mesh, 'quiet mountains'); assert.equal(unsupported.assessment.status, 'failed'); assert.equal(unsupported.events.filter(e => e.kind === 'candidate').length, 0);
});
test('stream errors propagate and observation mutation cannot change the assessment', () => {
 const input = {mesh: room().mesh, transform: {scale: 1, yaw: 0, position: [0, 0, 0] as Vec3}, criteria: deriveCorrectedSpatialCriteria('a tunnel'), searchMode: 'expanded' as const};
 const expected = assessInterpretedSpace(input);
 const actual = assessDiagnosedSpace({...input, trace: e => {if (e.assessment) (e.assessment as {eye: Vec3}).eye[0] = 999; if (e.criteria) (e.criteria as {supported: boolean}).supported = false;}});
 assert.deepEqual(withoutTimings(actual), withoutTimings(expected));
 assert.throws(() => assessDiagnosedSpace({...input, trace: () => {throw Error('trace-write-failed');}}), /trace-write-failed/);
});
test('a tapered unsupported seam records both actual movement directions without adding support', () => {
 const f = fixture(); f.floor(-2, 2, -2, 3); f.quad([-2, 0, -2], [2, 0, -2], [0, 0, -3], [0, 0, -3]); f.roof(-2, 2, -2, 3); f.wallX(-2, -2, 3); f.wallX(2, -2, 3);
 const {events} = compare(f.mesh, 'a tunnel', 'legacy');
 const failed = events.find(e => e.kind === 'seam-rejected'); assert.ok(failed);
 const movements = events.filter(e => e.stage === 'seam' && e.routeId === failed.routeId);
 assert.deepEqual(movements.map(e => e.kind), ['swept-forward', 'swept-reverse']);
 assert.ok(movements.some(e => (e.movement as {blocked: boolean}).blocked));
});
