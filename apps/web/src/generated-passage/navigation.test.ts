import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createSurfaceNavigator, type TriangleMesh, type Vec3} from './navigation.ts';

function fixture() {
 const positions: number[] = [], indices: number[] = [];
 function quad(a: Vec3, b: Vec3, c: Vec3, d: Vec3) {const base = positions.length / 3; positions.push(...a, ...b, ...c, ...d); indices.push(base, base + 1, base + 2, base, base + 2, base + 3);}
 function floor(x0: number, x1: number, z0: number, z1: number, y = 0) {quad([x0, y, z0], [x0, y, z1], [x1, y, z1], [x1, y, z0]);}
 return {mesh: {positions, indices} satisfies TriangleMesh, quad, floor};
}
const transform = {scale: 1, yaw: 0, position: [0, 0, 0] as Vec3};

test('walking uses genuine support triangles and returns on the same surface', () => {
 const f = fixture(); f.floor(-2, 2, -4, 4);
 const nav = createSurfaceNavigator(f.mesh, transform), start: Vec3 = [0, 1.65, -3];
 const outward = nav.move(start, [0, 0, 6]);
 assert.equal(outward.blocked, false); assert.deepEqual(outward.position.map(v => Math.round(v * 1e6) / 1e6), [0, 1.65, 3]);
 assert.equal(outward.support.supportSamples.length, 9); assert.ok(outward.support.supportTriangleIds.every(id => id >= 0 && id < 2));
 const returned = nav.move(outward.position, [0, 0, -6]); assert.equal(returned.blocked, false); assert.ok(returned.position.every((v, i) => Math.abs(v - start[i]) < 1e-6));
});

test('unsupported gaps cannot be crossed, including a 1mm gap between movement samples', () => {
 const f = fixture(); f.floor(-2, 0.023, -2, 2); f.floor(0.024, 2, -2, 2);
 const nav = createSurfaceNavigator(f.mesh, transform);
 assert.equal(nav.assess([0, 1.65, 0]).valid, true); assert.equal(nav.assess([0.05, 1.65, 0]).valid, true);
 const move = nav.move([0, 1.65, 0], [0.05, 0, 0]); assert.equal(move.blocked, true); assert.deepEqual(move.position, [0, 1.65, 0]);
});

test('actual walls block the full radius without tunneling through large displacement', () => {
 const f = fixture(); f.floor(-2, 2, -3, 3); f.quad([-2, 0, 0], [2, 0, 0], [2, 3, 0], [-2, 3, 0]);
 const nav = createSurfaceNavigator(f.mesh, transform), movement = nav.move([0, 1.65, -2], [0, 0, 4]);
 assert.equal(movement.blocked, true); assert.ok(movement.position[2] <= -0.3 + 1e-8);
 const blocked = nav.assess([0, 1.65, -0.1]); assert.equal(blocked.valid, false); assert.ok(blocked.blockedTriangleId !== null && blocked.blockedTriangleId >= 2);
});

test('swept body clearance catches an obstacle between otherwise clear endpoints', () => {
 const f = fixture(); f.floor(-2, 2, -2, 2); f.quad([0.02499, 0.3, 0.2995], [0.02501, 0.3, 0.2995], [0.02501, 1.5, 0.2995], [0.02499, 1.5, 0.2995]);
 const nav = createSurfaceNavigator(f.mesh, transform);
 assert.equal(nav.assess([0, 1.65, 0]).valid, true); assert.equal(nav.assess([0.05, 1.65, 0]).valid, true);
 assert.equal(nav.move([0, 1.65, 0], [0.05, 0, 0]).blocked, true);
});

test('explicit exterior scaffold permits a continuous crossing but cannot provide interior support', () => {
 const f = fixture(); f.floor(-1.5, 1.5, 0, 2); f.floor(-1.5, 1.5, 3, 6);
 const approach = {seam: [0, 0, 0] as Vec3, outward: [0, 0, -1] as Vec3, width: 1.2, length: 2};
 const nav = createSurfaceNavigator(f.mesh, transform, {}, approach), start: Vec3 = [0, 1.65, -1];
 assert.deepEqual(nav.assess(start).supportTriangleIds, [-1]);
 const outward = nav.move(start, [0, 0, 2]); assert.equal(outward.blocked, false); assert.ok(outward.support.supportTriangleIds.every(id => id >= 0));
 const returned = nav.move(outward.position, [0, 0, -2]); assert.equal(returned.blocked, false);
 assert.equal(nav.assess([0, 1.65, 2.5]).valid, false); assert.equal(nav.move(outward.position, [0, 0, 3]).blocked, true);
});

test('low ceilings and radius-offset obstacles fail the original-triangle body check', () => {
 const low = fixture(); low.floor(-2, 2, -2, 2); low.floor(-2, 2, -2, 2, 1.7);
 assert.equal(createSurfaceNavigator(low.mesh, transform).assess([0, 1.65, 0]).valid, false);
 const tall = fixture(); tall.floor(-2, 2, -2, 2); tall.floor(-2, 2, -2, 2, 1.81);
 assert.equal(createSurfaceNavigator(tall.mesh, transform).assess([0, 1.65, 0]).valid, true);
 const offset = fixture(); offset.floor(-2, 2, -2, 2); offset.quad([0.2, 0.3, -0.1], [0.2, 1.5, -0.1], [0.2, 1.5, 0.1], [0.2, 0.3, 0.1]);
 assert.equal(createSurfaceNavigator(offset.mesh, transform).assess([0, 1.65, 0]).valid, false);
});

test('bounded steps work forward and backward, while a tall ledge stays impassable', () => {
 for (const height of [0.2, 0.4]) {
  const f = fixture(); f.floor(-2, 0, -2, 2); f.floor(0, 2, -2, 2, height); f.quad([0, 0, -2], [0, height, -2], [0, height, 2], [0, 0, 2]);
  const nav = createSurfaceNavigator(f.mesh, transform), outward = nav.move([-1, 1.65, 0], [2, 0, 0]);
  assert.equal(outward.blocked, height > 0.25);
  if (height < 0.25) {assert.ok(Math.abs(outward.position[1] - 1.85) < 1e-8); const returned = nav.move(outward.position, [-2, 0, 0]); assert.equal(returned.blocked, false); assert.ok(Math.abs(returned.position[1] - 1.65) < 1e-8);}
 }
});

test('slope bound and upward source winding govern support', () => {
 for (const slope of [0.2, 1]) {
  const f = fixture(); f.quad([-2, -2 * slope, -2], [-2, -2 * slope, 2], [2, 2 * slope, 2], [2, 2 * slope, -2]);
  const nav = createSurfaceNavigator(f.mesh, transform), support = nav.assess([0, 1.65, 0]);
  assert.equal(support.valid, slope < 0.7);
  if (support.valid) assert.equal(nav.move(support.eye, [0.5, 0, 0]).blocked, false);
 }
 const down = fixture(); down.floor(-2, 2, -2, 2); down.mesh.indices.reverse();
 assert.equal(createSurfaceNavigator(down.mesh, transform).assess([0, 1.65, 0]).valid, false);
});

test('a roof is not an interior, but a supported tunnel has source roof evidence', () => {
 const f = fixture(); f.floor(-2, 2, -3, 3); f.floor(-2, 2, -3, 3, 3);
 const nav = createSurfaceNavigator(f.mesh, transform);
 assert.equal(nav.enclosure([0, 1.65, 0]).enclosed, true);
 assert.equal(nav.enclosure([0, 4.65, 0]).enclosed, false);
});
