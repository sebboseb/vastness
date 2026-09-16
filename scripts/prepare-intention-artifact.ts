import {randomUUID} from 'node:crypto';
import {mkdir, readFile, rename, rm, stat, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {ArtifactSchema, type Artifact, type CollisionBox, type Vec3} from '../packages/protocol/src/index.ts';
import {movePlayer} from '../packages/world-model/src/index.ts';
import {deriveScene, verifySource, type Mesh, type PreparedScene} from './prepare-m1-prototype.ts';

// Deliberately fixed across intentions: semantic scale is not a claim of inferred metres.
const SCALE = 6;
// The measured crystal export has 2.17M splats and 3.01M triangles. These remain
// hard per-artifact/workload caps; the coordinate, GLB-byte and route limits stay fixed.
const LIMITS = {plyBytes: 256 * 1024 * 1024, glbBytes: 64 * 1024 * 1024, vertices: 2_000_000, triangles: 4_000_000, splats: 4_000_000, surfaceSamples: 12_000_000, modelCoordinate: 2};
const PLACEMENT: Vec3 = [0, 0, -21];
const ENTRY: Vec3 = [0, 1.65, -13];
const APPROACH: Vec3 = [0, 1.65, -11.5];
const ROOM_BOUNDS: CollisionBox = {min: [-10, 0, -31], max: [10, 12, -12]};
const PLAYER_RADIUS = 0.3;

type SourceIdentity = {filename: string; sha256: string; bytes: number; backend: string};
export type IntentionPreparedScene = Omit<PreparedScene, 'sources'> & {
 sources: {jobId: string; ply: SourceIdentity; glb: SourceIdentity};
 validation: ReturnType<typeof validatePlacement> & {
  schemaVersion: 1; hashesVerified: true; limits: typeof LIMITS;
  estimatedSurfaceSamples: number; sourceBounds: CollisionBox;
  visual: {vertices: number; pointBounds: CollisionBox};
 };
};

function boundsOf(positions: number[]): CollisionBox {
 const min: Vec3 = [Infinity, Infinity, Infinity], max: Vec3 = [-Infinity, -Infinity, -Infinity];
 for (let i = 0; i < positions.length; i++) {
  const axis = i % 3;
  min[axis] = Math.min(min[axis], positions[i]); max[axis] = Math.max(max[axis], positions[i]);
 }
 return {min, max};
}

function integer(value: unknown, min: number, max: number, label: string): number {
 if (!Number.isSafeInteger(value) || (value as number) < min || (value as number) > max) throw new Error(`Invalid ${label}`);
 return value as number;
}

/** Parse only the bounded, single identity-mesh GLB exported by TRELLIS/trimesh. */
function readMesh(bytes: Buffer): Mesh {
 if (bytes.length < 28 || bytes.toString('ascii', 0, 4) !== 'glTF' || bytes.readUInt32LE(4) !== 2 || bytes.readUInt32LE(8) !== bytes.length) throw new Error('Invalid GLB header');
 const jsonLength = integer(bytes.readUInt32LE(12), 2, Math.min(1024 * 1024, bytes.length - 28), 'GLB JSON length');
 if (jsonLength % 4 || bytes.readUInt32LE(16) !== 0x4e4f534a) throw new Error('Invalid GLB JSON chunk');
 const binaryHeader = 20 + jsonLength, binaryStart = binaryHeader + 8;
 const binaryLength = bytes.readUInt32LE(binaryHeader);
 if (bytes.readUInt32LE(binaryHeader + 4) !== 0x004e4942 || binaryLength % 4 || binaryStart + binaryLength !== bytes.length) throw new Error('Invalid GLB binary chunk');
 const gltf = JSON.parse(bytes.toString('utf8', 20, binaryHeader));
 if (gltf.asset?.version !== '2.0' || gltf.extensionsRequired?.length || gltf.meshes?.length !== 1 || gltf.meshes[0].primitives?.length !== 1 || gltf.buffers?.length !== 1 || gltf.buffers[0].uri) throw new Error('Unsupported GLB structure');
 const bufferLength = integer(gltf.buffers[0].byteLength, 1, binaryLength, 'GLB buffer length');
 if (binaryLength - bufferLength > 3 || !Array.isArray(gltf.nodes) || !gltf.nodes.length || gltf.nodes.length > 64 || !Array.isArray(gltf.accessors) || !Array.isArray(gltf.bufferViews)) throw new Error('Invalid GLB structure');
 const scene = gltf.scenes?.[gltf.scene ?? 0], visited = new Set<number>();
 let meshInstances = 0;
 function visit(id: number) {
  integer(id, 0, gltf.nodes.length - 1, 'GLB node index');
  if (visited.has(id)) throw new Error('Repeated GLB scene node');
  visited.add(id);
  const node = gltf.nodes[id];
  if (node.matrix || node.scale || node.rotation || node.translation || node.skin !== undefined) throw new Error('Expected identity-transform mesh');
  if (node.mesh !== undefined) {if (node.mesh !== 0) throw new Error('Invalid GLB mesh instance'); meshInstances++;}
  if (node.children !== undefined && !Array.isArray(node.children)) throw new Error('Invalid GLB child nodes');
  for (const child of node.children ?? []) visit(child);
 }
 if (!Array.isArray(scene?.nodes)) throw new Error('Missing GLB scene');
 for (const id of scene.nodes) visit(id);
 if (meshInstances !== 1 || visited.size !== gltf.nodes.length) throw new Error('Expected one reachable mesh instance');
 const primitive = gltf.meshes[0].primitives[0];
 if ((primitive.mode ?? 4) !== 4 || primitive.targets || primitive.extensions) throw new Error('Expected plain triangle primitive');
 function accessor(index: unknown, positions: boolean): number[] {
  const a = gltf.accessors[integer(index, 0, gltf.accessors.length - 1, 'GLB accessor index')];
  const view = gltf.bufferViews[integer(a.bufferView, 0, gltf.bufferViews.length - 1, 'GLB buffer view index')];
  const width = positions ? 3 : 1;
  if (a.type !== (positions ? 'VEC3' : 'SCALAR') || a.sparse || a.normalized || view.buffer !== 0 || (positions ? a.componentType !== 5126 : ![5123, 5125].includes(a.componentType))) throw new Error('Unsupported GLB accessor');
  const count = integer(a.count, 1, positions ? LIMITS.vertices : LIMITS.triangles * 3, 'GLB accessor count');
  const componentBytes = a.componentType === 5123 ? 2 : 4;
  const viewOffset = integer(view.byteOffset ?? 0, 0, bufferLength, 'GLB view offset');
  const viewLength = integer(view.byteLength, 1, bufferLength - viewOffset, 'GLB view length');
  const offset = integer(a.byteOffset ?? 0, 0, viewLength, 'GLB accessor offset');
  const stride = integer(view.byteStride ?? width * componentBytes, width * componentBytes, 252, 'GLB accessor stride');
  if (stride % componentBytes || (viewOffset + offset) % componentBytes || offset + (count - 1) * stride + width * componentBytes > viewLength) throw new Error('GLB accessor exceeds buffer view');
  return Array.from({length: count * width}, (_, i) => {
   const location = binaryStart + viewOffset + offset + Math.floor(i / width) * stride + i % width * componentBytes;
   return positions ? bytes.readFloatLE(location) : componentBytes === 2 ? bytes.readUInt16LE(location) : bytes.readUInt32LE(location);
  });
 }
 return {positions: accessor(primitive.attributes?.POSITION, true), indices: accessor(primitive.indices, false)};
}

/** Gaussian values must be finite before they can reach the browser's GPU. */
function validatePly(bytes: Buffer) {
 const headerEnd = bytes.subarray(0, 16 * 1024).indexOf('end_header\n');
 if (headerEnd < 0) throw new Error('Invalid PLY header');
 const dataStart = headerEnd + 'end_header\n'.length;
 const lines = bytes.toString('ascii', 0, headerEnd).trim().split('\n');
 if (lines.shift() !== 'ply' || lines.shift() !== 'format binary_little_endian 1.0') throw new Error('Expected binary little-endian PLY');
 let vertices = 0;
 const properties: string[] = [];
 for (const line of lines) {
  if (line.startsWith('comment ')) continue;
  const vertex = /^element vertex (\d+)$/.exec(line);
  if (vertex && !vertices && !properties.length) {vertices = integer(Number(vertex[1]), 1, LIMITS.splats, 'PLY vertex count'); continue;}
  const property = /^property float (\w+)$/.exec(line);
  if (!vertices || !property || properties.includes(property[1]) || properties.length >= 80) throw new Error('Unsupported PLY layout');
  properties.push(property[1]);
 }
 const required = ['x', 'y', 'z', 'f_dc_0', 'f_dc_1', 'f_dc_2', 'opacity', 'scale_0', 'scale_1', 'scale_2', 'rot_0', 'rot_1', 'rot_2', 'rot_3'];
 if (!vertices || required.some(name => !properties.includes(name)) || dataStart + vertices * properties.length * 4 !== bytes.length) throw new Error('Invalid Gaussian PLY payload');
 const pointBounds: CollisionBox = {min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity]};
 const axes = properties.map(name => ['x', 'y', 'z'].indexOf(name));
 for (let vertex = 0; vertex < vertices; vertex++) for (let property = 0; property < properties.length; property++) {
  const value = bytes.readFloatLE(dataStart + (vertex * properties.length + property) * 4);
  if (!Number.isFinite(value)) throw new Error('Non-finite Gaussian PLY value');
  const axis = axes[property];
  if (axis >= 0) {
   if (Math.abs(value) > LIMITS.modelCoordinate) throw new Error('PLY exceeds normalized model coordinate limit');
   pointBounds.min[axis] = Math.min(pointBounds.min[axis], value); pointBounds.max[axis] = Math.max(pointBounds.max[axis], value);
  }
 }
 return {vertices, pointBounds};
}

function validateMesh(mesh: Mesh) {
 if (!mesh.positions.length || mesh.positions.length % 3 || !mesh.indices.length || mesh.indices.length % 3 || !mesh.positions.every(Number.isFinite) || !mesh.indices.every(i => Number.isInteger(i) && i >= 0 && i < mesh.positions.length / 3)) throw new Error('Invalid source mesh');
 if (mesh.positions.some(value => Math.abs(value) > LIMITS.modelCoordinate)) throw new Error('Mesh exceeds normalized model coordinate limit');
 const sourceBounds = boundsOf(mesh.positions);
 if (Math.max(...sourceBounds.max.map((max, i) => max - sourceBounds.min[i])) < 0.01) throw new Error('Generated mesh has no useful extent');
 let estimatedSurfaceSamples = 0, nondegenerate = 0;
 for (let i = 0; i < mesh.indices.length; i += 3) {
  const [a, b, c] = mesh.indices.slice(i, i + 3).map(id => mesh.positions.slice(id * 3, id * 3 + 3));
  const u = b.map((v, j) => v - a[j]), v = c.map((value, j) => value - a[j]);
  if (Math.hypot(u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]) > 1e-12) nondegenerate++;
  const longest = SCALE * Math.max(Math.hypot(...u), Math.hypot(...v), Math.hypot(...b.map((value, j) => value - c[j])));
  const steps = Math.max(1, Math.ceil(longest / 0.06));
  estimatedSurfaceSamples += (steps + 1) * (steps + 2) / 2;
  if (estimatedSurfaceSamples > LIMITS.surfaceSamples) throw new Error('Generated mesh exceeds collision sampling budget');
 }
 if (!nondegenerate) throw new Error('Generated mesh contains no surface triangles');
 return {sourceBounds, estimatedSurfaceSamples};
}

const translateBox = (box: CollisionBox, by: Vec3): CollisionBox => ({min: box.min.map((v, i) => v + by[i]) as Vec3, max: box.max.map((v, i) => v + by[i]) as Vec3});
const authoredRoom = (): CollisionBox[] => [
 {min: [-10, -0.2, -31], max: [10, 0, -12]},
 {min: [-10.2, 0, -31.2], max: [-10, 12, -11.8]},
 {min: [10, 0, -31.2], max: [10.2, 12, -11.8]},
 {min: [-10, 0, -31.2], max: [10, 12, -31]},
 {min: [-10, 0, -12], max: [-1.6, 12, -11.8]},
 {min: [1.6, 0, -12], max: [10, 12, -11.8]},
];

function validatePlacement(scene: PreparedScene, visualBounds: CollisionBox) {
 const generatedBoxes = scene.boxes.map(box => translateBox(box, PLACEMENT));
 const worldBounds = translateBox(scene.bounds, PLACEMENT);
 const visualWorldBounds = translateBox({min: visualBounds.min.map((v, i) => v * SCALE + scene.transform.position[i]) as Vec3, max: visualBounds.max.map((v, i) => v * SCALE + scene.transform.position[i]) as Vec3}, PLACEMENT);
 // Surface padding may extend below the authored floor; every XZ solid stays inside the room.
 for (const bounds of [worldBounds, visualWorldBounds, ...generatedBoxes]) {
  if ([0, 2].some(axis => bounds.min[axis] < ROOM_BOUNDS.min[axis] || bounds.max[axis] > ROOM_BOUNDS.max[axis]) || bounds.max[1] > ROOM_BOUNDS.max[1]) throw new Error('Generated artifact exceeds authored room');
 }
 const extent = boundsOf(generatedBoxes.flatMap(box => [...box.min, ...box.max]));
 const clearance = PLAYER_RADIUS + 0.3;
 const left = extent.min[0] - clearance, right = extent.max[0] + clearance;
 const back = extent.min[2] - clearance, front = extent.max[2] + clearance;
 if (front >= ENTRY[2]) throw new Error('No free approach from destination entry');
 const route: Vec3[] = [[...ENTRY], [0, ENTRY[1], front], [right, ENTRY[1], front], [right, ENTRY[1], back], [left, ENTRY[1], back], [left, ENTRY[1], front], [0, ENTRY[1], front], [...ENTRY]];
 if (route.some(point => [0, 2].some(axis => point[axis] < ROOM_BOUNDS.min[axis] + PLAYER_RADIUS || point[axis] > ROOM_BOUNDS.max[axis] - PLAYER_RADIUS))) throw new Error('No free circuit around generated extent inside authored room');
 const room = authoredRoom(), boxes = [...room, ...generatedBoxes];
 function free(point: Vec3) {
  return !boxes.some(box => box.max[1] > point[1] - 1.45 && box.min[1] < point[1] + 0.15 && point[0] > box.min[0] - PLAYER_RADIUS && point[0] < box.max[0] + PLAYER_RADIUS && point[2] > box.min[2] - PLAYER_RADIUS && point[2] < box.max[2] + PLAYER_RADIUS);
 }
 function walk(points: Vec3[]) {
  for (let i = 0; i < points.length; i++) {
   if (!free(points[i])) throw new Error('Generated collision obstructs entry or route');
   if (!i) continue;
   const end = movePlayer(points[i - 1], points[i].map((v, axis) => v - points[i - 1][axis]) as Vec3, boxes, PLAYER_RADIUS);
   if (end.some((v, axis) => Math.abs(v - points[i][axis]) > 1e-7)) throw new Error('Generated collision obstructs route traversal');
  }
 }
 walk([APPROACH, ...route, APPROACH]); walk([APPROACH, ...route.toReversed(), APPROACH]);
 return {
  placement: [...PLACEMENT] as Vec3, entry: [...ENTRY] as Vec3, approach: [...APPROACH] as Vec3,
  route, room, roomBounds: structuredClone(ROOM_BOUNDS), playerRadius: PLAYER_RADIUS,
  threshold: {min: [-1.6, 0, -12.1], max: [1.6, 3.2, -11.9]} as CollisionBox,
  generatedBoxes, worldBounds, visualWorldBounds, routeVerified: true as const,
  collision: 'Conservative shell of every returned GLB triangle; no invented interior fill or floor semantics.',
  scaffold: 'Authored flat support floor, room boundaries and readiness threshold; these are not generated geometry.',
  routeMethod: 'Axis-aligned circuit outside the generated collision extent, checked forward and backward with movePlayer at radius 0.3.',
 };
}

/** Verify both content-addressed inputs before parsing, deriving or publishing any output. */
export async function prepareIntentionArtifact(input: {jobId: string; artifacts: Artifact[]; objectDir: string; outputDir: string}): Promise<IntentionPreparedScene> {
 if (!input.jobId || input.jobId.length > 200 || input.artifacts.length !== 2) throw new Error('Expected job id and one PLY/GLB artifact pair');
 const artifacts = input.artifacts.map(artifact => ArtifactSchema.parse(artifact));
 function identity(format: 'ply' | 'glb'): SourceIdentity {
  const matches = artifacts.filter(artifact => artifact.format === format);
  if (matches.length !== 1) throw new Error('Expected exactly one artifact of each format');
  const artifact = matches[0], limit = format === 'ply' ? LIMITS.plyBytes : LIMITS.glbBytes;
  integer(artifact.bytes, 1, limit, `${format} artifact size`);
  return {filename: format === 'ply' ? 'scene.ply' : 'collider.glb', sha256: artifact.sha256, bytes: artifact.bytes, backend: artifact.backend};
 }
 const sources = {jobId: input.jobId, ply: identity('ply'), glb: identity('glb')};
 async function load(source: SourceIdentity) {
  const path = resolve(input.objectDir, 'objects', source.sha256, source.filename);
  if ((await stat(path)).size !== source.bytes) throw new Error(`Source identity mismatch: ${source.filename}`);
  const bytes = await readFile(path);
  verifySource(bytes, source);
  return bytes;
 }
 const [ply, glb] = await Promise.all([load(sources.ply), load(sources.glb)]);
 const visual = validatePly(ply), source = readMesh(glb), meshValidation = validateMesh(source);
 const derived = deriveScene(source);
 if (!derived.mesh.indices.length) throw new Error('Generated mesh collapses at the fixed abstraction scale');
 const validation = {schemaVersion: 1 as const, hashesVerified: true as const, limits: {...LIMITS}, ...meshValidation, visual, ...validatePlacement(derived, visual.pointBounds)};
 const scene: IntentionPreparedScene = {...derived, sources, validation};
 await mkdir(input.outputDir, {recursive: true});
 const plyTemp = resolve(input.outputDir, `.scene-${randomUUID()}.ply`), jsonTemp = resolve(input.outputDir, `.scene-${randomUUID()}.json`);
 try {
  await writeFile(plyTemp, ply);
  await writeFile(jsonTemp, JSON.stringify(scene));
  await rename(plyTemp, resolve(input.outputDir, 'scene.ply'));
  // scene.json is the publication marker. Restart processing may safely repeat these writes.
  await rename(jsonTemp, resolve(input.outputDir, 'scene.json'));
 } finally {await Promise.all([rm(plyTemp, {force: true}), rm(jsonTemp, {force: true})]);}
 return scene;
}
