import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {existsSync} from 'node:fs';
import {mkdir, mkdtemp, readFile, readdir, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {test} from 'node:test';
import type {Artifact, CollisionBox, Vec3} from '../../packages/protocol/src/index.ts';
import {movePlayer} from '../../packages/world-model/src/index.ts';
import {prepareIntentionArtifact, type IntentionPreparedScene} from '../prepare-intention-artifact.ts';

const triangle = {positions: [-0.15, 0, 0, 0.15, 0, 0, 0, 0.3, 0], indices: [0, 1, 2]};
function glb(mesh = triangle, options: {count?: number; index16?: boolean; declaredViewBytes?: number} = {}) {
 const indexBytes = options.index16 ? 2 : 4, indicesLength = mesh.indices.length * indexBytes;
 const positionOffset = Math.ceil(indicesLength / 4) * 4;
 const data = Buffer.alloc(positionOffset + mesh.positions.length * 4);
 mesh.indices.forEach((value, i) => options.index16 ? data.writeUInt16LE(value, i * 2) : data.writeUInt32LE(value, i * 4));
 mesh.positions.forEach((value, i) => data.writeFloatLE(value, positionOffset + i * 4));
 const description = {asset: {version: '2.0'}, scene: 0, scenes: [{nodes: [0]}], nodes: [{mesh: 0}], meshes: [{primitives: [{attributes: {POSITION: 1}, indices: 0, mode: 4}]}], buffers: [{byteLength: data.length}], bufferViews: [{buffer: 0, byteOffset: 0, byteLength: indicesLength}, {buffer: 0, byteOffset: positionOffset, byteLength: options.declaredViewBytes ?? mesh.positions.length * 4}], accessors: [{bufferView: 0, componentType: options.index16 ? 5123 : 5125, count: mesh.indices.length, type: 'SCALAR'}, {bufferView: 1, componentType: 5126, count: options.count ?? mesh.positions.length / 3, type: 'VEC3'}]};
 const jsonText = JSON.stringify(description), json = Buffer.from(jsonText.padEnd(Math.ceil(jsonText.length / 4) * 4, ' '));
 const bytes = Buffer.alloc(12 + 8 + json.length + 8 + data.length);
 bytes.write('glTF'); bytes.writeUInt32LE(2, 4); bytes.writeUInt32LE(bytes.length, 8);
 bytes.writeUInt32LE(json.length, 12); bytes.writeUInt32LE(0x4e4f534a, 16); json.copy(bytes, 20);
 bytes.writeUInt32LE(data.length, 20 + json.length); bytes.writeUInt32LE(0x004e4942, 24 + json.length); data.copy(bytes, 28 + json.length);
 return bytes;
}
function ply(x = 0) {
 const properties = ['x', 'y', 'z', 'f_dc_0', 'f_dc_1', 'f_dc_2', 'opacity', 'scale_0', 'scale_1', 'scale_2', 'rot_0', 'rot_1', 'rot_2', 'rot_3'];
 const header = Buffer.from(`ply\nformat binary_little_endian 1.0\nelement vertex 1\n${properties.map(name => `property float ${name}`).join('\n')}\nend_header\n`);
 const data = Buffer.alloc(properties.length * 4);
 [x, 0.1, 0, 0, 0, 0, 1, -3, -3, -3, 1, 0, 0, 0].forEach((value, i) => data.writeFloatLE(value, i * 4));
 return Buffer.concat([header, data]);
}
async function withArtifacts(body: (context: {dir: string; outputDir: string; artifacts: Artifact[]; run: () => Promise<IntentionPreparedScene>}) => Promise<void>, visual: Buffer = ply(), collider: Buffer = glb()) {
 const dir = await mkdtemp(resolve(tmpdir(), 'vastness-intention-geometry-')), outputDir = resolve(dir, 'prepared');
 try {
  const artifacts: Artifact[] = [];
  for (const [format, bytes] of [['ply', visual], ['glb', collider]] as const) {
   const sha256 = createHash('sha256').update(bytes).digest('hex'), filename = format === 'ply' ? 'scene.ply' : 'collider.glb';
   const objectPath = resolve(dir, 'objects', sha256);
   await mkdir(objectPath, {recursive: true}); await writeFile(resolve(objectPath, filename), bytes);
   artifacts.push({format, sha256, bytes: bytes.length, backend: 'test-returned-artifact', url: `/artifacts/${sha256}/${filename}`});
  }
  await body({dir, outputDir, artifacts, run: () => prepareIntentionArtifact({jobId: 'arbitrary-intention-job', artifacts, objectDir: dir, outputDir})});
 } finally {await rm(dir, {recursive: true, force: true});}
}
const contains = (boxes: CollisionBox[], point: number[]) => boxes.some(box => point.every((value, i) => value >= box.min[i] - 1e-8 && value <= box.max[i] + 1e-8));
function walkRoute(scene: IntentionPreparedScene) {
 const {route, approach, playerRadius, room, generatedBoxes} = scene.validation;
 for (const path of [[approach, ...route, approach], [approach, ...route.toReversed(), approach]]) {
  let position = path[0];
  for (const waypoint of path.slice(1)) {
   position = movePlayer(position, waypoint.map((v, i) => v - position[i]) as Vec3, [...room, ...generatedBoxes], playerRadius);
   assert.ok(position.every((v, i) => Math.abs(v - waypoint[i]) < 1e-7), `Route blocked before ${waypoint}`);
  }
 }
}

test('returned identities replace the old fixture and preparation publishes stable local geometry plus traversable world route', async () => {
 await withArtifacts(async ({artifacts, outputDir, run}) => {
  const scene = await run();
  assert.equal(scene.sources.jobId, 'arbitrary-intention-job');
  assert.equal(scene.sources.ply.sha256, artifacts[0].sha256); assert.equal(scene.sources.glb.sha256, artifacts[1].sha256);
  assert.equal(scene.sources.glb.backend, 'test-returned-artifact');
  assert.deepEqual(scene.validation.placement, [0, 0, -21]); assert.deepEqual(scene.validation.entry, [0, 1.65, -13]);
  assert.deepEqual(scene.validation.route[0], scene.validation.entry); assert.deepEqual(scene.validation.route.at(-1), scene.validation.entry);
  assert.equal(scene.transform.scale, 6); assert.equal(scene.transform.position[2], 0);
  assert.equal(scene.bounds.min[1], 0); assert.ok(scene.bounds.min[2] > -1);
  walkRoute(scene);
  // The actual triangle's interior remains covered after placement, with solid movement response.
  assert.ok(contains(scene.validation.generatedBoxes, [0, 0.6, -21]));
  const blocked = movePlayer([0, 1.65, -19], [0, 0, -4], scene.validation.generatedBoxes);
  assert.ok(blocked[2] > -21, 'Returned mesh blocks the player');
  assert.deepEqual(JSON.parse(await readFile(resolve(outputDir, 'scene.json'), 'utf8')), JSON.parse(JSON.stringify(scene)));
  assert.equal(createHash('sha256').update(await readFile(resolve(outputDir, 'scene.ply'))).digest('hex'), artifacts[0].sha256);
  assert.deepEqual(await run(), scene, 'Restart processing is deterministic');
  assert.deepEqual((await readdir(outputDir)).sort(), ['scene.json', 'scene.ply']);
 });
});

test('both identities must pass before any parsing or publication, including same-size tampering', async () => {
 await withArtifacts(async ({dir, outputDir, artifacts, run}) => {
  const collider = artifacts[1], path = resolve(dir, 'objects', collider.sha256, 'collider.glb');
  const bytes = await readFile(path); bytes[0] ^= 1; await writeFile(path, bytes);
  await assert.rejects(run(), /Source identity mismatch: collider.glb/);
  assert.equal(existsSync(outputDir), false);
 }, Buffer.from('This invalid PLY must not be parsed before both hashes pass.'));
 await withArtifacts(async ({artifacts, outputDir, run}) => {
  artifacts[0].bytes++;
  await assert.rejects(run(), /Source identity mismatch: scene.ply/); assert.equal(existsSync(outputDir), false);
 });
});

test('rejects non-finite returned visuals and collider coordinates with matching manifests', async () => {
 await withArtifacts(async ({run, outputDir}) => {await assert.rejects(run(), /Non-finite Gaussian/); assert.equal(existsSync(outputDir), false);}, ply(NaN));
 await withArtifacts(async ({run, outputDir}) => {await assert.rejects(run(), /Invalid source mesh/); assert.equal(existsSync(outputDir), false);}, ply(), glb({...triangle, positions: [Infinity, ...triangle.positions.slice(1)]}));
});

test('bounded parser rejects allocation claims, accessor overruns and invalid indices', async () => {
 for (const collider of [glb(triangle, {count: 2_000_001}), glb(triangle, {declaredViewBytes: 12}), glb({...triangle, indices: [0, 1, 200]})]) {
  await withArtifacts(async ({run, outputDir}) => {await assert.rejects(run(), /accessor count|exceeds buffer view|Invalid source mesh/); assert.equal(existsSync(outputDir), false);}, ply(), collider);
 }
 await withArtifacts(async ({run}) => {walkRoute(await run());}, ply(), glb(triangle, {index16: true}));
});

test('rejects pathological triangle sampling before collision derivation', async () => {
 const expensive = {positions: [-2, 0, 0, 2, 0, 0, 0, 0.1, 0.1], indices: Array.from({length: 200}, () => [0, 1, 2]).flat()};
 await withArtifacts(async ({run, outputDir}) => {await assert.rejects(run(), /collision sampling budget/); assert.equal(existsSync(outputDir), false);}, ply(), glb(expensive));
});

test('rejects room overflow and geometry that leaves no free entry or perimeter circuit', async () => {
 const outside = {...triangle, positions: triangle.positions.map((v, i) => i % 3 === 0 ? v + 1.8 : v)};
 const entryBlocked = {...triangle, positions: triangle.positions.map((v, i) => i % 3 === 2 ? v + 1.28 : v)};
 const tooWide = {...triangle, positions: triangle.positions.map((v, i) => i % 3 === 0 ? v * 10 : v)};
 for (const [mesh, error] of [[outside, /exceeds authored room/], [entryBlocked, /No free approach/], [tooWide, /No free circuit/]] as const) {
  await withArtifacts(async ({run, outputDir}) => {await assert.rejects(run(), error); assert.equal(existsSync(outputDir), false);}, ply(), glb(mesh));
 }
});

test('rejects missing/duplicated manifests and degenerate source surfaces', async () => {
 await withArtifacts(async ({artifacts, run}) => {artifacts[1] = {...artifacts[0]}; await assert.rejects(run(), /exactly one artifact/);});
 await withArtifacts(async ({run}) => {await assert.rejects(run(), /no surface triangles/);}, ply(), glb({...triangle, positions: [0, 0, 0, 0.1, 0, 0, 0.2, 0, 0]}));
});

const evidence = process.env.M1_SOURCE_DIR ?? resolve('.runtime/benchmark-evidence/trellis-smoke-20260915-03');
test('previous real TRELLIS output keeps its actual surface and passes the same dynamic preparation path', {skip: !existsSync(resolve(evidence, 'collider.glb'))}, async () => {
 const visual = await readFile(resolve(evidence, 'scene.ply')), collider = await readFile(resolve(evidence, 'collider.glb'));
 await withArtifacts(async ({run}) => {
  const scene = await run();
  assert.equal(scene.metrics.sourceTriangles, 634834); assert.equal(scene.metrics.sourceVertices, 317222);
  assert.equal(scene.sources.ply.sha256, '45225f837c1f7551337ee86a5d42afddddf895b59a5f563facc8c1d9c9799a1f');
  assert.equal(scene.sources.glb.sha256, '6141ddd57bec66dfdf47419eec3aa4e4e60bc6ece5360fd392d7953dfa429588');
  assert.ok(scene.validation.estimatedSurfaceSamples <= scene.validation.limits.surfaceSamples);
  assert.ok(scene.validation.generatedBoxes.length > 10); assert.equal(scene.boxes.length, scene.validation.generatedBoxes.length);
  walkRoute(scene);
  const blocked = movePlayer([0, 1.65, -18], [0, 0, -6], scene.validation.generatedBoxes);
  assert.ok(blocked[2] > -23, 'Actual returned geometry still blocks direct traversal');
 }, visual, collider);
});

const intentEvidence = process.env.INTENTION_SOURCE_DIR ?? resolve('.runtime/intention-generation/evidence/trial1');
test('first free-form GPU output above one million triangles remains bounded, simplified and walkable', {skip: !existsSync(resolve(intentEvidence, 'collider.glb'))}, async () => {
 const visual = await readFile(resolve(intentEvidence, 'scene.ply')), collider = await readFile(resolve(intentEvidence, 'collider.glb'));
 await withArtifacts(async ({run}) => {
  const scene = await run();
  assert.equal(scene.metrics.sourceTriangles, 1184866);
  assert.equal(scene.sources.glb.sha256, 'b069c9fff83458b6ee1c95531920e47e392036bbb52ae589aaf2805281b86e6f');
  assert.ok(scene.mesh.indices.length / 3 < scene.metrics.sourceTriangles / 10);
  assert.ok(scene.validation.estimatedSurfaceSamples <= scene.validation.limits.surfaceSamples);
  walkRoute(scene);
 }, visual, collider);
});

const crystalEvidence = process.env.INTENTION_CRYSTAL_SOURCE_DIR ?? resolve('.runtime/intention-generation/evidence/comparison3');
const crystalObjects = resolve('.runtime/intention-generation/artifacts/objects');
const crystalHashes = {ply: 'f5dbfa5c2157da4264d68b064f5ff038cb0bc9a740802cd508a5897ea96fc89b', glb: '925c07cec101e76d91e0781fdf7a9da4051792ec4a155c16eb155aa2825b3382'};
const crystalFiles = existsSync(resolve(crystalEvidence, 'scene.ply')) && existsSync(resolve(crystalEvidence, 'collider.glb'))
 ? {ply: resolve(crystalEvidence, 'scene.ply'), glb: resolve(crystalEvidence, 'collider.glb')}
 : {ply: resolve(crystalObjects, crystalHashes.ply, 'scene.ply'), glb: resolve(crystalObjects, crystalHashes.glb, 'collider.glb')};
test('actual crystal export above three million triangles preserves collision and a walkable bounded circuit', {skip: !existsSync(crystalFiles.ply) || !existsSync(crystalFiles.glb)}, async t => {
 const visual = await readFile(crystalFiles.ply), collider = await readFile(crystalFiles.glb);
 await withArtifacts(async ({run}) => {
  const started = performance.now(), scene = await run();
  assert.equal(scene.sources.ply.sha256, crystalHashes.ply); assert.equal(scene.sources.glb.sha256, crystalHashes.glb);
  assert.equal(scene.sources.ply.bytes, 147232929); assert.equal(scene.sources.glb.bytes, 54111208);
  assert.equal(scene.validation.visual.vertices, 2165184);
  assert.equal(scene.metrics.sourceVertices, 1503500); assert.equal(scene.metrics.sourceTriangles, 3005700);
  assert.ok(scene.metrics.meshTriangles < 150000 && scene.metrics.meshTriangles < scene.metrics.sourceTriangles / 20, 'Fixed abstraction reduces the measured dense export by at least 20x within a 150k-triangle regression budget');
  assert.ok(scene.metrics.colliderBoxes > 10 && scene.metrics.colliderBoxes < 10000);
  assert.ok(scene.metrics.surfaceSamples <= scene.validation.limits.surfaceSamples);
  assert.equal(scene.metrics.surfaceSamples, scene.validation.estimatedSurfaceSamples);
  assert.ok(scene.validation.generatedBoxes.length === scene.boxes.length);
  walkRoute(scene);
  // A deterministic set of original triangle centroids must remain inside the
  // generated proxy, independent of the authored floor and room boundary boxes.
  const jsonLength = collider.readUInt32LE(12), gltf = JSON.parse(collider.toString('utf8', 20, 20 + jsonLength));
  const binaryStart = 28 + jsonLength, primitive = gltf.meshes[0].primitives[0];
  const indices = gltf.accessors[primitive.indices], positions = gltf.accessors[primitive.attributes.POSITION];
  const indexStart = binaryStart + (gltf.bufferViews[indices.bufferView].byteOffset ?? 0) + (indices.byteOffset ?? 0);
  const positionStart = binaryStart + (gltf.bufferViews[positions.bufferView].byteOffset ?? 0) + (positions.byteOffset ?? 0);
  for (let triangle = 0; triangle < scene.metrics.sourceTriangles; triangle += 15427) {
   const ids = [0, 1, 2].map(i => collider.readUInt32LE(indexStart + (triangle * 3 + i) * 4));
   const point = [0, 1, 2].map(axis => ids.reduce((sum, id) => sum + collider.readFloatLE(positionStart + (id * 3 + axis) * 4), 0) / 3 * scene.transform.scale + scene.transform.position[axis] + scene.validation.placement[axis]);
   assert.ok(contains(scene.validation.generatedBoxes, point), `Missing actual crystal triangle centroid ${triangle}`);
  }
  const blocked = movePlayer([0, 1.65, -17], [0, 0, -8], scene.validation.generatedBoxes);
  assert.ok(blocked[2] > -24, 'Actual crystal shell blocks direct traversal');
  t.diagnostic(JSON.stringify({preparationAndChecksMs: Math.round(performance.now() - started), sourceBounds: scene.validation.sourceBounds, visualBounds: scene.validation.visual.pointBounds, metrics: scene.metrics}));
 }, visual, collider);
});
