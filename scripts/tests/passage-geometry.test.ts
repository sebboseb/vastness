import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {test} from 'node:test';
import {assessPassage, assessPassageFile, compareConservativeShell} from '../passage-geometry.ts';
import {createSurfaceNavigator, type TriangleMesh, type Vec3} from '../../apps/web/src/generated-passage/navigation.ts';

function room({ceiling = 3, sealed = false, floor = true}: {ceiling?: number; sealed?: boolean; floor?: boolean} = {}): TriangleMesh {
 const positions: number[] = [], indices: number[] = [];
 function quad(a: Vec3, b: Vec3, c: Vec3, d: Vec3) {const base = positions.length / 3; positions.push(...a, ...b, ...c, ...d); indices.push(base, base + 1, base + 2, base, base + 2, base + 3);}
 if (floor) quad([-1.5, 0, -3], [-1.5, 0, 3], [1.5, 0, 3], [1.5, 0, -3]);
 quad([-1.5, ceiling, -3], [1.5, ceiling, -3], [1.5, ceiling, 3], [-1.5, ceiling, 3]);
 quad([-1.5, 0, -3], [-1.5, ceiling, -3], [-1.5, ceiling, 3], [-1.5, 0, 3]);
 quad([1.5, 0, -3], [1.5, 0, 3], [1.5, ceiling, 3], [1.5, ceiling, -3]);
 if (sealed) for (const z of [-3, 3]) quad([-1.5, 0, z], [1.5, 0, z], [1.5, ceiling, z], [-1.5, ceiling, z]);
 return {positions, indices};
}
const transform = {scale: 1, yaw: 0, position: [0, 0, 0] as Vec3};

test('assessment finds an auditable reversible route on generated floor through an actual opening', () => {
 const mesh = room(), assessment = assessPassage({mesh, transform});
 assert.equal(assessment.status, 'passed'); assert.ok(assessment.metrics.routeDisplacement >= 3); assert.ok(assessment.samples.length >= 60);
 assert.equal(assessment.approachVerified, true); assert.ok(assessment.seam && assessment.approach && assessment.approachStart);
 assert.ok(assessment.samples.every(sample => sample.valid && sample.headClearance >= 1.8 && sample.supportSamples.length === 9 && sample.supportTriangleIds.every(id => id === 0 || id === 1)));
 assert.ok(assessment.samples.some(sample => sample.enclosure.roofTriangleId !== null));
 assert.ok(assessment.metrics.continuousEnclosedDistance >= 1);
 const nav = createSurfaceNavigator(mesh, transform);
 for (const route of [assessment.route, assessment.route.toReversed()]) {
  let eye = route[0];
  for (const target of route.slice(1)) {const result = nav.move(eye, [target[0] - eye[0], 0, target[2] - eye[2]]); assert.equal(result.blocked, false); eye = result.position;}
 }
 const crossing = createSurfaceNavigator(mesh, transform, {}, assessment.approach!);
 const entry = assessment.entry!, start = assessment.approachStart!;
 const arrived = crossing.move(start, [entry[0] - start[0], 0, entry[2] - start[2]]); assert.equal(arrived.blocked, false);
 assert.ok(arrived.support.supportTriangleIds.every(id => id >= 0));
 assert.equal(crossing.move(arrived.position, [start[0] - entry[0], 0, start[2] - entry[2]]).blocked, false);
});

test('an isolated floating overhead patch cannot turn an open floor into a meaningful passage', () => {
 for (const height of [3, 20]) {
  const positions = [-2, 0, -3, -2, 0, 3, 2, 0, 3, 2, 0, -3, -0.1, height, -0.1, -0.1, height, 0.1, 0.1, height, 0.1, 0.1, height, -0.1];
  const mesh = {positions, indices: [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]};
  const assessment = assessPassage({mesh, transform}); assert.equal(assessment.status, 'failed'); assert.equal(assessment.metrics.enclosurePoints, 0);
 }
});

test('sealed geometry, absent support and insufficient headroom fail without modifying triangles', () => {
 for (const mesh of [room({sealed: true}), room({floor: false}), room({ceiling: 1.6})]) {
  const before = JSON.stringify(mesh), result = assessPassage({mesh, transform});
  assert.equal(result.status, 'failed'); assert.equal(result.route.length, 0); assert.ok(result.reasons.length > 0); assert.equal(JSON.stringify(mesh), before);
 }
});

test('a declared uniform transform can make a small real opening human-sized without removing surfaces', () => {
 const source = room(); source.positions = source.positions.map(value => value / 10);
 assert.equal(assessPassage({mesh: source, transform: {...transform, scale: 3}}).status, 'failed');
 const accepted = assessPassage({mesh: source, transform: {...transform, scale: 10, yaw: Math.PI / 2, position: [5, 0, -10]}});
 assert.equal(accepted.status, 'passed'); assert.equal(accepted.transform.scale, 10); assert.equal(accepted.transform.yaw, Math.PI / 2);
});

test('a hash-matched conservative proxy can obstruct a route that original triangles demonstrably permit', () => {
 const assessment = assessPassage({mesh: room(), transform}); assessment.sourceSha256 = 'a'.repeat(64);
 const scene = {sources: {glb: {sha256: assessment.sourceSha256}}, transform: {scale: 1, position: [0, 0, 0] as Vec3}, boxes: [{min: [-1.5, 0, -1.5] as Vec3, max: [1.5, 3, -1] as Vec3}]};
 const comparison = compareConservativeShell(assessment, scene);
 assert.ok(comparison.proxyBlockedSamples > 0); assert.equal(comparison.originalClearSamples, assessment.samples.length);
 scene.sources.glb.sha256 = 'b'.repeat(64); assert.throws(() => compareConservativeShell(assessment, scene), /hash mismatch/);
});

const actualTunnel = process.env.PASSAGE_TUNNEL_GLB ?? resolve('.runtime/generated-passage/candidates/tunnel/collider.glb');
test('verified real tunnel has a reversible generated-floor route, sustained enclosure and genuine approach seam', {skip: !existsSync(actualTunnel)}, async () => {
 const batch = await assessPassageFile({glb: actualTunnel, scales: [6], expectedSha256: 'bc5a2f21fc24dc7aaf20db120167f69fe3788588fd8848586d50b3c778eb5472'});
 const assessment = batch.attempts[0];
 assert.equal(assessment.status, 'passed'); assert.equal(assessment.approachVerified, true);
 assert.equal(assessment.metrics.sourceTriangles, 664376); assert.ok(assessment.metrics.routeDisplacement >= 3);
 assert.ok(assessment.metrics.continuousEnclosedDistance >= 3);
 assert.ok(assessment.samples.every(sample => sample.supportTriangleIds.every(id => id >= 0)));
 assert.ok(assessment.samples.every(sample => sample.headClearance >= 1.8));
 assert.ok(assessment.samples.every(sample => sample.enclosure.roofCoverage === 1));
});
