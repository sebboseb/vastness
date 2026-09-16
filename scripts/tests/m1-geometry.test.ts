import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {existsSync} from 'node:fs';
import {mkdtemp, readFile, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {test} from 'node:test';
import type {CollisionBox, Vec3} from '../../packages/protocol/src/index.ts';
import {movePlayer} from '../../packages/world-model/src/index.ts';
import {deriveScene, prepare, readSourceMesh, SOURCE, verifySource} from '../prepare-m1-prototype.ts';

const contains = (boxes: CollisionBox[], p: number[]) => boxes.some(box => p.every((value, axis) => value >= box.min[axis] - 1e-9 && value <= box.max[axis] + 1e-9));

test('identity verification rejects truncation and same-size corruption', () => {
 const bytes = Buffer.from('verified original');
 const identity = {filename: 'scene.ply', bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex')};
 verifySource(bytes, identity);
 assert.throws(() => verifySource(bytes.subarray(1), identity), /Source identity mismatch/);
 const corrupt = Buffer.from(bytes); corrupt[0] ^= 1;
 assert.throws(() => verifySource(corrupt, identity), /Source identity mismatch/);
});

test('preparation rejects mismatched sources before creating output', async () => {
 const dir = await mkdtemp(resolve(tmpdir(), 'vastness-m1-invalid-'));
 try {
  await writeFile(resolve(dir, 'scene.ply'), 'invalid');
  await writeFile(resolve(dir, 'collider.glb'), 'invalid');
  await assert.rejects(prepare(dir, resolve(dir, 'output')), /Source identity mismatch/);
  assert.equal(existsSync(resolve(dir, 'output')), false);
 } finally {await rm(dir, {recursive: true, force: true});}
});

test('scaled and grounded surface boxes cover triangle interiors without filling gaps', () => {
 // Two disconnected large triangles force interpolation beyond their three vertices.
 const source = {positions: [-0.3, -0.1, 0, -0.1, -0.1, 0, -0.3, 0.1, 0, 0.1, -0.1, 0, 0.3, -0.1, 0, 0.3, 0.1, 0], indices: [0, 1, 2, 3, 4, 5]};
 const scene = deriveScene(source);
 assert.equal(scene.transform.scale, 6);
 assert.equal(scene.bounds.min[1], 0);
 assert.ok(Math.abs(scene.bounds.max[1] - 1.2) < 1e-9);
 assert.equal(scene.mesh.indices.length, 6);
 assert.ok([...scene.mesh.positions, ...scene.mesh.normals].every(Number.isFinite));
 assert.deepEqual(scene.mesh.positions, source.positions); // Visuals retain model coordinates.
 for (let triangle = 0; triangle < 2; triangle++) {
  const [a, b, c] = source.indices.slice(triangle * 3, triangle * 3 + 3).map(id => source.positions.slice(id * 3, id * 3 + 3));
  for (let u = 0; u <= 37; u++) for (let v = 0; v <= 37 - u; v++) {
   const p = a.map((value, axis) => (value + (b[axis] - value) * u / 37 + (c[axis] - value) * v / 37) * 6 + scene.transform.position[axis]);
   assert.ok(contains(scene.boxes, p), `Missing surface point ${p}`);
  }
 }
 assert.equal(contains(scene.boxes, [0, 0.6, 0]), false);
 const boxVolume = scene.boxes.reduce((sum, box) => sum + box.min.reduce((v, min, axis) => v * (box.max[axis] - min), 1), 0);
 assert.ok(Math.abs(boxVolume - scene.metrics.occupiedCells * 0.12 ** 3) < 1e-9, 'Merging preserves exactly the occupied volume');
 assert.ok(scene.metrics.colliderBoxes < scene.metrics.occupiedCells);
 assert.ok(scene.glyphs.every(glyph => contains(scene.boxes, glyph)));
});

const evidence = process.env.M1_SOURCE_DIR ?? resolve('.runtime/benchmark-evidence', SOURCE.jobId);
test('verified real asset retains navigable AABB recesses and conservatively blocks its surface', {skip: !existsSync(resolve(evidence, 'collider.glb'))}, async () => {
 const dir = await mkdtemp(resolve(tmpdir(), 'vastness-m1-real-'));
 try {
  const scene = await prepare(evidence, dir);
  verifySource(await readFile(resolve(dir, 'scene.ply')), SOURCE.ply);
  const mesh = readSourceMesh(await readFile(resolve(evidence, 'collider.glb')));
  assert.equal(scene.metrics.sourceVertices, 317222);
  assert.equal(scene.metrics.sourceTriangles, 634834);
  assert.ok(scene.metrics.meshTriangles >= 10000 && scene.metrics.meshTriangles <= 30000);
  assert.ok(scene.mesh.positions.every(Number.isFinite) && scene.mesh.normals.every(Number.isFinite));
  assert.ok(scene.metrics.colliderTriangles < scene.metrics.sourceTriangles / 20);
  assert.ok(scene.glyphs.length > 0 && scene.glyphs.length <= 3500);
  assert.equal(scene.bounds.min[1], 0);
  // A dense deterministic set of triangle centroids is independent of the vertex sampling lattice.
  for (let i = 0; i < mesh.indices.length; i += 3 * 101) {
   const point = [0, 1, 2].map(axis => mesh.indices.slice(i, i + 3).reduce((sum, id) => sum + mesh.positions[id * 3 + axis], 0) / 3 * 6 + scene.transform.position[axis]);
   assert.ok(contains(scene.boxes, point), `Uncovered actual triangle centroid ${i / 3}`);
  }
  // Traverse a real side recess inside the complete asset AABB. The player's
  // center is inside that AABB; its radius extends outside the AABB near the edge.
  const start: Vec3 = [-2.6, 1.65, scene.bounds.min[2] - 1];
  const distance = scene.bounds.max[2] - scene.bounds.min[2] + 2;
  const end = movePlayer(start, [0, 0, distance], scene.boxes);
  assert.ok(start[0] > scene.bounds.min[0] && start[0] < scene.bounds.max[0]);
  assert.ok(Math.abs(end[2] - (start[2] + distance)) < 1e-9);
  assert.ok(Math.abs(movePlayer(end, [0, 0, -distance], scene.boxes)[2] - start[2]) < 1e-9);
  const blockedStart: Vec3 = [0, 1.65, -3];
  const blockedEnd = movePlayer(blockedStart, [0, 0, 6], scene.boxes);
  assert.ok(blockedEnd[2] < 0, 'The real central obstacle stops traversal');
 } finally {await rm(dir, {recursive: true, force: true});}
});
