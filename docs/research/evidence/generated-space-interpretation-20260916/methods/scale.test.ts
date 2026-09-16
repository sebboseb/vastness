import assert from 'node:assert/strict';
import test from 'node:test';
import type {TriangleMesh, Vec3} from '../../apps/web/src/generated-passage/navigation.ts';
import {PHYSICAL_SCALES, selectPhysicalScale} from './scale.ts';

function geometry() {
 const mesh: TriangleMesh = {positions: [], indices: []};
 function quad(a: Vec3, b: Vec3, c: Vec3, d: Vec3) {
  const start = mesh.positions.length / 3;
  (mesh.positions as number[]).push(...a, ...b, ...c, ...d);
  (mesh.indices as number[]).push(start, start + 1, start + 2, start, start + 2, start + 3);
 }
 return {mesh, quad};
}
function room(width: number, height: number | null, depth = 0.8, walls = true) {
 const {mesh, quad} = geometry(), x = width / 2, z = depth / 2;
 quad([-x, 0, -z], [-x, 0, z], [x, 0, z], [x, 0, -z]);
 if (height !== null) quad([-x, height, -z], [x, height, -z], [x, height, z], [-x, height, z]);
 if (walls) {
  const top = height ?? 0.4;
  quad([-x, 0, -z], [-x, top, -z], [-x, top, z], [-x, 0, z]);
  quad([x, 0, -z], [x, 0, z], [x, top, z], [x, top, -z]);
 }
 return mesh;
}

test('known architectural proportions prefer the middle candidate over automatically enlarging', () => {
 const result = selectPhysicalScale(room(0.24, 0.28));
 assert.deepEqual(PHYSICAL_SCALES, [6, 10, 12, 16]);
 assert.equal(result.selectedScale, 10);
 const chosen = result.ranked[0];
 assert.ok(Math.abs(chosen.features.medianHeadroom! - 2.8) < 1e-10);
 assert.ok(Math.abs(chosen.features.medianWallSpacing! - 2.4) < 1e-10);
 assert.equal(chosen.features.standingHeadroomFraction, 1);
 assert.equal(chosen.features.bodyWidthFraction, 1);
 assert.ok(chosen.score > result.ranked.find(r => r.scale === 16)!.score);
});

test('doubling geometry halves the preferred scale when both physical equivalents are declared', () => {
 const mesh = room(2.4 / 12, 2.8 / 12);
 assert.equal(selectPhysicalScale(mesh).selectedScale, 12);
 const doubled = {...mesh, positions: Array.from(mesh.positions, v => v * 2)};
 const result = selectPhysicalScale(doubled);
 assert.equal(result.selectedScale, 6);
 assert.ok(Math.abs(result.ranked[0].features.medianHeadroom! - 2.8) < 1e-10);
});

test('low overhead and sub-body wall spacing independently favor the candidate that clears them', () => {
 const low = selectPhysicalScale(room(0.24, 0.12));
 assert.equal(low.selectedScale, 16);
 assert.equal(low.ranked.find(r => r.scale === 12)!.features.standingHeadroomFraction, 0);
 assert.equal(low.ranked[0].features.standingHeadroomFraction, 1);
 const narrow = selectPhysicalScale(room(0.04, 0.28));
 assert.equal(narrow.selectedScale, 16);
 assert.equal(narrow.ranked.find(r => r.scale === 12)!.features.bodyWidthFraction, 0);
 assert.equal(narrow.ranked[0].features.bodyWidthFraction, 1);
});

test('a flat open scene is explicitly ambiguous, regardless of its overall size', () => {
 const result = selectPhysicalScale(room(1, null, 2, false), [16, 10, 12, 6]);
 assert.equal(result.selectedScale, 6);
 assert.ok(result.ranked.every(r => r.score === 0 && !r.features.informative));
 assert.ok(result.ranked.every(r => r.features.medianHeadroom === null && r.features.medianWallSpacing === null));
 assert.ok(result.limitations.some(s => s.includes('ranking is a tie')));
});

test('a vertical wall has no support and cannot fabricate a usable scale', () => {
 const {mesh, quad} = geometry();
 quad([0, 0, 0], [0, 1, 0], [0.5, 1, 1], [0.5, 0, 1]);
 const result = selectPhysicalScale(mesh);
 assert.equal(result.selectedScale, 6);
 assert.ok(result.ranked.every(r => r.features.supportColumns === 0 && r.score === 0));
 assert.ok(result.limitations.some(s => s.includes('No sampled upward support')));
});

test('selection is deterministic, translation invariant, pure and independent of candidate ordering', () => {
 const mesh = room(0.24, 0.28), original = structuredClone(mesh), result = selectPhysicalScale(mesh);
 assert.deepEqual(selectPhysicalScale(mesh, [12, 6, 16, 10]), result);
 assert.deepEqual(mesh, original);
 const translated = {...mesh, positions: Array.from(mesh.positions, (v, i) => v + [7, -3, 11][i % 3])};
 const moved = selectPhysicalScale(translated);
 assert.equal(moved.selectedScale, result.selectedScale);
 for (let i = 0; i < moved.ranked.length; i++) assert.ok(Math.abs(moved.ranked[i].score - result.ranked[i].score) < 1e-10);
});

test('two million synthetic triangles remain within declared geometry-sampling bounds', () => {
 const mesh = room(0.24, 0.28);
 const indices = new Uint32Array(6_000_000);
 for (let i = 0; i < indices.length; i++) indices[i] = mesh.indices[i % mesh.indices.length];
 const result = selectPhysicalScale({...mesh, indices});
 assert.equal(result.selectedScale, 10);
 for (const {features} of result.ranked) {
  assert.equal(features.sourceTriangles, 2_000_000);
  assert.equal(features.sampledTriangles, 2_000_000);
  assert.ok(features.columnIntersectionBound <= 16_000_000);
  assert.ok(features.gridColumns <= 256);
  assert.ok(features.widthProbes <= 32);
 }
 assert.ok(result.limitations.some(s => s.includes('Spatial grid reduced')));
});

test('dense floor tessellation preserves full column coverage and the architectural choice', () => {
 const {mesh, quad} = geometry(), divisions = 256;
 for (let x = 0; x < divisions; x++) for (let z = 0; z < divisions; z++) {
  const x0 = x / divisions * 0.24, x1 = (x + 1) / divisions * 0.24;
  const z0 = z / divisions * 0.8, z1 = (z + 1) / divisions * 0.8;
  quad([x0, 0, z0], [x0, 0, z1], [x1, 0, z1], [x1, 0, z0]);
  quad([x0, 0.28, z0], [x1, 0.28, z0], [x1, 0.28, z1], [x0, 0.28, z1]);
 }
 quad([0, 0, 0], [0, 0.28, 0], [0, 0.28, 0.8], [0, 0, 0.8]);
 quad([0.24, 0, 0], [0.24, 0, 0.8], [0.24, 0.28, 0.8], [0.24, 0.28, 0]);
 const result = selectPhysicalScale(mesh);
 assert.equal(result.selectedScale, 10);
 assert.equal(result.ranked[0].features.gridResolution, 16);
 assert.equal(result.ranked[0].features.supportColumns, 256);
 assert.equal(result.ranked[0].features.overheadColumns, 256);
 assert.equal(result.ranked[0].features.pairedWallProbes, 32);
 assert.ok(Math.abs(result.ranked[0].score - selectPhysicalScale(room(0.24, 0.28)).ranked[0].score) < 1e-10);
});

test('rejects invalid meshes and scale sets, including corruption late in a large index buffer', () => {
 const mesh = room(0.24, 0.28);
 for (const scales of [[], [0], [21], [6, 6], [NaN]]) assert.throws(() => selectPhysicalScale(mesh, scales));
 assert.throws(() => selectPhysicalScale({...mesh, positions: [0, 0, Infinity]}));
 assert.throws(() => selectPhysicalScale({...mesh, indices: [0, 1, 10_000]}));
 const indices = new Uint32Array(210_000);
 indices[indices.length - 1] = 10_000;
 assert.throws(() => selectPhysicalScale({...mesh, indices}));
});
