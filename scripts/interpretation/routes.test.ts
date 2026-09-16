import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createSurfaceNavigator, type TriangleMesh, type Vec3} from '../../apps/web/src/generated-passage/navigation.ts';
import {deriveSpatialCriteria} from './criteria.ts';
import {assessInterpretedSpace} from './routes.ts';
function fixture() {
 const positions: number[] = [], indices: number[] = [];
 const quad = (a: Vec3, b: Vec3, c: Vec3, d: Vec3) => {const i = positions.length / 3; positions.push(...a, ...b, ...c, ...d); indices.push(i, i + 1, i + 2, i, i + 2, i + 3);};
 const floor = (x0: number, x1: number, z0: number, z1: number, y = 0) => quad([x0, y, z0], [x0, y, z1], [x1, y, z1], [x1, y, z0]);
 const roof = (x0: number, x1: number, z0: number, z1: number, y = 3) => quad([x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]);
 const wallX = (x: number, z0: number, z1: number, low = 0, high = 3) => quad([x, low, z0], [x, high, z0], [x, high, z1], [x, low, z1]);
 const wallZ = (z: number, x0: number, x1: number, low = 0, high = 3) => quad([x0, low, z], [x1, low, z], [x1, high, z], [x0, high, z]);
 return {mesh: {positions, indices} as TriangleMesh, floor, roof, wallX, wallZ};
}
const transform = {scale: 1, yaw: 0, position: [0, 0, 0] as Vec3};
const assess = (mesh: TriangleMesh, intent: string, searchMode: 'legacy' | 'expanded' = 'expanded') => assessInterpretedSpace({mesh, transform, criteria: deriveSpatialCriteria(intent), searchMode});
function room({height = 3, sealed = false, gap = false, width = 4}: {height?: number; sealed?: boolean; gap?: boolean; width?: number} = {}) {
 const f = fixture();
 if (gap) {f.floor(-width / 2, width / 2, -3, -1); f.floor(-width / 2, width / 2, 1, 3);} else f.floor(-width / 2, width / 2, -3, 3);
 f.roof(-width / 2, width / 2, -3, 3, height); f.wallX(-width / 2, -3, 3, 0, height); f.wallX(width / 2, -3, 3, 0, height);
 if (sealed) {f.wallZ(-3, -width / 2, width / 2, 0, height); f.wallZ(3, -width / 2, width / 2, 0, height);} return f;
}
test('enclosed passage has fixed body dimensions, original support, reversible route and exterior approach', () => {
 const f = room(), before = JSON.stringify(f.mesh), a = assess(f.mesh, 'a tunnel');
 assert.equal(a.status, 'passed', JSON.stringify(a.searchDiagnostics)); assert.ok(a.metrics.routeDisplacement >= 3 - 1e-7);
 assert.deepEqual(a.options, {radius: .3, height: 1.8, eyeHeight: 1.65, maxStep: .25, maxSlopeDegrees: 35, sampleStep: .05, contactTolerance: .015});
 assert.equal(a.topologyWitnesses[0].kind, 'enclosed-passage'); assert.ok(a.topologyWitnesses[0].structuralTriangleIds.length >= 3);
 assert.ok(a.samples.every(s => s.valid && s.supportTriangleIds.every(id => id >= 0)));
 const nav = createSurfaceNavigator(f.mesh, transform, {}, a.approach!);
 for (const path of [[a.approachStart!, ...a.route], [...a.route.toReversed(), a.approachStart!]]) for (let i = 1; i < path.length; i++) {const from = path[i - 1], to = path[i]; assert.equal(nav.move(from, [to[0] - from[0], 0, to[2] - from[2]]).blocked, false);}
 assert.equal(JSON.stringify(f.mesh), before);
});
test('sealed box and disconnected short floors cannot be rescued by authored support', () => {
 for (const f of [room({sealed: true}), room({gap: true, width: 2})]) {const a = assess(f.mesh, 'tunnel'); assert.equal(a.status, 'failed'); assert.equal(a.approach, null);}
});
test('broad tall covered interior has genuine roof and side witnesses above old 6m limit', () => {
 const a = assess(room({height: 9, width: 8}).mesh, 'a broad hall'); assert.equal(a.status, 'passed');
 const w = a.topologyWitnesses.find(w => w.kind === 'broad-covered-interior')!; assert.ok(Number(w.measurements.maximumRoofHeight) > 6);
 const bare = fixture(); bare.floor(-4, 4, -3, 3); bare.roof(-4, 4, -3, 3, 9); assert.equal(assess(bare.mesh, 'a broad hall').status, 'failed');
});
test('open courtyard requires open sky and at least three real boundaries; bare rooftop fails', () => {
 const f = fixture(); f.floor(-3, 3, -3, 3); f.wallX(-3, -3, 3); f.wallX(3, -3, 3); f.wallZ(3, -3, 3);
 const a = assess(f.mesh, 'an open courtyard'); assert.equal(a.status, 'passed'); assert.equal(a.topologyWitnesses[0].measurements.minimumBoundaryDirections, 3);
 const roof = fixture(); roof.floor(-3, 3, -3, 3, 3); roof.wallX(-3, -3, 3); roof.wallX(3, -3, 3); roof.wallZ(3, -3, 3);
 assert.equal(assess(roof.mesh, 'an open courtyard').status, 'failed');
});
function arch(bypassOnly = false) {
 const f = fixture(); f.floor(-4, 4, -4, 4);
 for (const x of [-1, 1]) f.wallX(x, -.25, .25);
 for (const z of [-.25, .25]) {f.wallZ(z, -3, -1); f.wallZ(z, 1, 3);}
 f.roof(-1, 1, -.35, .35, 2.5);
 if (bypassOnly) {f.wallZ(0, -1, 1); /* sealed aperture: floor around either flank remains */}
 return f;
}
test('doorway witness crosses aperture between flanks and lintel, not alongside an arch', () => {
 const a = assess(arch().mesh, 'walk through an arch'); assert.equal(a.status, 'passed', JSON.stringify(a.searchDiagnostics));
 const w = a.topologyWitnesses[0]; assert.equal(w.kind, 'doorway-crossing'); assert.ok(Number(w.measurements.beforeSignedDistance) * Number(w.measurements.afterSignedDistance) < 0); assert.ok(w.structuralTriangleIds.length >= 3);
 assert.equal(assess(arch(true).mesh, 'walk through an arch').status, 'failed');
});
test('elevated bridge route stays on narrow deck over void, not the base or building roof', () => {
 const f = fixture(); f.floor(-1, 1, -3, 3, 2); f.roof(-1, 1, -3, 3, 1.8); f.wallX(-.2, -.2, .2, 0, 1.8);
 const a = assess(f.mesh, 'cross a bridge'); assert.equal(a.status, 'passed', JSON.stringify(a.searchDiagnostics)); assert.ok(a.route.every(p => p[1] > 3));
 const base = fixture(); base.floor(-1, 1, -3, 3); assert.equal(assess(base.mesh, 'cross a bridge').status, 'failed');
 const roof = fixture(); roof.floor(-1, 1, -3, 3, 2); roof.wallX(-1, -3, 3, 0, 2); roof.wallX(1, -3, 3, 0, 2); roof.wallZ(-3, -1, 1, 0, 2); roof.wallZ(3, -1, 1, 0, 2);
 assert.equal(assess(roof.mesh, 'cross a bridge').status, 'failed');
});
test('expanded local boundary search finds recessed entry that global-AABB legacy search misses', () => {
 const f = room({width: 3});
 // Disconnected distant vertical ornaments expand both global entry boundaries.
 f.wallZ(-7, -6, -5); f.wallZ(7, 5, 6);
 assert.equal(assess(f.mesh, 'a tunnel', 'legacy').status, 'failed');
 assert.equal(assess(f.mesh, 'a tunnel', 'expanded').status, 'passed');
});
test('explicitly open walled passage and covered bridge honor intent without contradictory defaults', () => {
 const passage = fixture(); passage.floor(-1, 1, -3, 3); passage.wallX(-1, -3, 3); passage.wallX(1, -3, 3);
 const a = assess(passage.mesh, 'an open-air narrow passage between tall walls'); assert.equal(a.status, 'passed');
 assert.equal(assess(passage.mesh, 'an enclosed tunnel').status, 'failed');
 const bridge = fixture(); bridge.floor(-1, 1, -3, 3, 2); bridge.roof(-1, 1, -3, 3, 1.8); bridge.wallX(-.2, -.2, .2, 0, 1.8); bridge.roof(-1, 1, -3, 3, 8);
 const b = assess(bridge.mesh, 'a covered bridge with a high roof'); assert.equal(b.status, 'passed'); assert.ok(b.topologyWitnesses.some(w => w.kind === 'explicit-cover'));
});
test('authored approach cannot begin inside a large internal hole', () => {
 const f = fixture();
 f.floor(-6, 6, -6, -4); f.floor(-6, 6, 4, 6); f.floor(-6, -4, -4, 4); f.floor(4, 6, -4, 4);
 for (const x of [-6, 6]) f.wallX(x, -6, 6); for (const z of [-6, 6]) f.wallZ(z, -6, 6);
 const a = assess(f.mesh, 'an open courtyard'); assert.equal(a.status, 'failed'); assert.ok(a.metrics.rejected['scaffold-overlaps-source-footprint'] > 0);
});
test('two-million-triangle synthetic room keeps bounded original-surface queries practical', {skip: process.env.INTERPRETATION_LARGE_SYNTHETIC !== '1'}, () => {
 const f = fixture(), positions: number[] = [], indices: number[] = [], n = 707;
 for (const y of [0, 3]) {
  const base = positions.length / 3;
  for (let z = 0; z <= n; z++) for (let x = 0; x <= n; x++) positions.push(-2 + 4 * x / n, y, -3 + 6 * z / n);
  for (let z = 0; z < n; z++) for (let x = 0; x < n; x++) {const a = base + z * (n + 1) + x, b = a + n + 1; if (!y) indices.push(a, b, b + 1, a, b + 1, a + 1); else indices.push(a, a + 1, b + 1, a, b + 1, b);}
 }
 f.wallX(-2, -3, 3); f.wallX(2, -3, 3);
 const base = positions.length / 3; positions.push(...f.mesh.positions); indices.push(...Array.from(f.mesh.indices, i => i + base));
 const a = assess({positions: new Float32Array(positions), indices: new Uint32Array(indices)}, 'a tunnel');
 assert.equal(a.status, 'passed'); assert.ok(a.metrics.sourceTriangles > 1_990_000);
 console.log(JSON.stringify({syntheticLargeTriangles: a.metrics.sourceTriangles, assessmentMs: a.metrics.assessmentMs, buildMs: a.metrics.buildMs, search: a.searchDiagnostics}));
});
test('explicit wide tunnel cannot pass on a narrow supported corridor', () => {
 assert.equal(assess(room({width: 1}).mesh, 'a wide tunnel').status, 'failed');
 assert.equal(assess(room({width: 1}).mesh, 'a tunnel').status, 'passed');
});
test('L-shaped interior enters from its concave outer boundary without filling the recess', () => {
 const f = fixture(); f.floor(-5, 0, 0, 3); f.floor(-3, 0, 3, 7); f.roof(-5, 0, 0, 3); f.roof(-3, 0, 3, 7);
 f.wallZ(0, -5, 0); f.wallX(-5, 0, 3); f.wallX(0, 0, 7); f.wallZ(7, -3, 0); f.wallX(-3, 3, 7);
 assert.equal(assess(f.mesh, 'a tunnel', 'legacy').status, 'failed');
 const a = assess(f.mesh, 'a tunnel'); assert.equal(a.status, 'passed'); assert.ok(a.seam![2] < 3.01 && a.seam![2] > 2.99); assert.ok(a.approachStart![0] < -3);
});
test('longitudinal room length cannot masquerade as explicit tunnel width at a side doorway', () => {
 const f = fixture(); f.floor(0, .8, -4, 4); f.roof(0, .8, -4, 4); f.wallX(.8, -4, 4); f.wallX(0, -4, -.5); f.wallX(0, .5, 4); f.wallZ(-4, 0, .8); f.wallZ(4, 0, .8);
 assert.equal(assess(f.mesh, 'a wide tunnel').status, 'failed');
});
test('a thin canopy cannot witness a broad covered interior', () => {
 const f = fixture(); f.floor(-4, 4, -3, 3); f.wallX(-4, -3, 3); f.wallX(4, -3, 3); f.roof(-.4, .4, -3, 3, 8);
 assert.equal(assess(f.mesh, 'a broad hall').status, 'failed');
});
