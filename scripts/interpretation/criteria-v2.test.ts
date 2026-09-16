import assert from 'node:assert/strict';
import {test} from 'node:test';
import {deriveSpatialCriteria} from './criteria.ts';
import {deriveCorrectedSpatialCriteria} from './criteria-v2.ts';
import {assessInterpretedSpace} from './routes.ts';
import type {TriangleMesh, Vec3} from '../../apps/web/src/generated-passage/navigation.ts';

function geometry() {
 const positions: number[] = [], indices: number[] = [];
 const quad = (a: Vec3, b: Vec3, c: Vec3, d: Vec3) => {const i = positions.length / 3; positions.push(...a, ...b, ...c, ...d); indices.push(i, i + 1, i + 2, i, i + 2, i + 3);};
 const floor = (x0: number, x1: number, z0: number, z1: number) => quad([x0, 0, z0], [x0, 0, z1], [x1, 0, z1], [x1, 0, z0]);
 const roof = (x0: number, x1: number, z0: number, z1: number) => quad([x0, 3, z0], [x1, 3, z0], [x1, 3, z1], [x0, 3, z1]);
 const wallX = (x: number, z0: number, z1: number) => quad([x, 0, z0], [x, 3, z0], [x, 3, z1], [x, 0, z1]);
 const wallZ = (z: number, x0: number, x1: number) => quad([x0, 0, z], [x1, 0, z], [x1, 3, z], [x0, 3, z]);
 return {mesh: {positions, indices} as TriangleMesh, floor, roof, wallX, wallZ};
}
const assess = (mesh: TriangleMesh, text: string, original = false) => assessInterpretedSpace({mesh, transform: {scale: 1, yaw: 0, position: [0, 0, 0]}, searchMode: 'expanded', criteria: original ? deriveSpatialCriteria(text) : deriveCorrectedSpatialCriteria(text)});

test('unchanged intents retain byte-equivalent criteria JSON and ignore outcome metadata', () => {
 for (const text of ['a narrow passage between stone walls', 'a tunnel', 'a broad hall with a high ceiling', 'a covered bridge', 'a quiet courtyard', 'no tunnel', 'an open-air passage', 'either a courtyard or a covered bridge']) {
  assert.equal(JSON.stringify(deriveCorrectedSpatialCriteria(text)), JSON.stringify(deriveSpatialCriteria(text)), text);
 }
 const text = 'a corridor with an overhead roof';
 assert.deepEqual(deriveCorrectedSpatialCriteria(text, {category: 'courtyard', id: 'roofless', passed: false}), deriveCorrectedSpatialCriteria(text));
});
test('wall-enclosed courtyard under open sky does not acquire a roof requirement', () => {
 const text = 'A courtyard enclosed by high stone walls under an open sky';
 assert.equal(deriveSpatialCriteria(text).requirements.covered, true);
 const corrected = deriveCorrectedSpatialCriteria(text);
 assert.deepEqual(corrected.requirements, {openSky: true, covered: false, opposingWalls: true, minimumWidth: .6});
 assert.ok(!corrected.ambiguities.some(value => value.startsWith('Both open-sky')));
 const f = geometry(); f.floor(-3, 3, -3, 3); f.wallX(-3, -3, 3); f.wallX(3, -3, 3); f.wallZ(3, -3, 3);
 assert.equal(assess(f.mesh, text, true).status, 'failed'); assert.equal(assess(f.mesh, text).status, 'passed');
});
test('bare positive roof requires actual cover; absent roof fails without changing navigation', () => {
 const f = geometry(); f.floor(-1.5, 1.5, -3, 3); f.wallX(-1.5, -3, 3); f.wallX(1.5, -3, 3);
 const text = 'a corridor between walls with an overhead roof';
 assert.equal(deriveCorrectedSpatialCriteria(text).requirements.covered, true);
 assert.equal(assess(f.mesh, text, true).status, 'passed'); assert.equal(assess(f.mesh, text).status, 'failed');
 f.roof(-1.5, 1.5, -3, 3); assert.equal(assess(f.mesh, text).status, 'passed');
});
test('locally negated roofs do not create cover and override inferred tunnel cover', () => {
 for (const phrase of ['no roof', 'without a roof', 'without any overhead roof', 'no high vaulted ceiling']) {
  const c = deriveCorrectedSpatialCriteria(`a passage between walls with ${phrase}`);
  assert.equal(c.requirements.covered, false, phrase); assert.equal(c.requirements.openSky, true, phrase);
 }
 const tunnel = deriveCorrectedSpatialCriteria('a tunnel between stone walls without a roof');
 assert.equal(tunnel.requirements.covered, false); assert.equal(tunnel.requirements.openSky, true);
 assert.equal(deriveCorrectedSpatialCriteria('a corridor that is not roofless').requirements.openSky, false);
});
test('separate open courtyard and covered arcade retain both witnessed requirements', () => {
 const text = 'a courtyard enclosed by walls under an open sky with a roof over one arcade';
 const c = deriveCorrectedSpatialCriteria(text);
 assert.equal(c.requirements.openSky, true); assert.equal(c.requirements.covered, true);
 assert.ok(c.ambiguities.some(value => value.startsWith('Both open-sky')));
 const f = geometry(); f.floor(-5, 5, -4, 4); f.wallX(-5, -4, 4); f.wallX(5, -4, 4); f.wallZ(4, -5, 5); f.roof(-5, -1, -4, 4);
 const a = assess(f.mesh, text); assert.equal(a.status, 'passed');
 assert.ok(a.topologyWitnesses.some(w => w.kind === 'open-courtyard')); assert.ok(a.topologyWitnesses.some(w => w.kind === 'explicit-cover'));
 const sky = a.topologyWitnesses.find(w => w.kind === 'open-courtyard')!, covered = a.topologyWitnesses.find(w => w.kind === 'explicit-cover')!;
 assert.equal(sky.measurements.minimumRoofCoverage, 0); assert.equal(covered.measurements.minimumRoofCoverage, 1);
});
test('localized broad-entrance wording is retained conservatively, not silently reinterpreted', () => {
 const text = 'a cave chamber with a broad entrance and high ceiling';
 assert.equal(JSON.stringify(deriveCorrectedSpatialCriteria(text)), JSON.stringify(deriveSpatialCriteria(text)));
 assert.equal(deriveCorrectedSpatialCriteria(text).requirements.minimumWidth, 2.4);
});
test('roofless inherently covered topology is unsupported rather than inventing a roof', () => {
 for (const text of ['a hall without a roof', 'a roofless hall']) {
  const c = deriveCorrectedSpatialCriteria(text); assert.equal(c.requirements.covered, false); assert.equal(c.requirements.openSky, true); assert.equal(c.supported, false);
  assert.ok(c.ambiguities.some(value => value.startsWith('Explicitly roofless hall')));
 }
});
