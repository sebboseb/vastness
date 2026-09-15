import {createHash} from 'node:crypto';
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import type {CollisionBox, Vec3} from '../packages/protocol/src/index.ts';

export const SOURCE = {
 jobId: 'trellis-smoke-20260915-03',
 ply: {filename: 'scene.ply', sha256: '45225f837c1f7551337ee86a5d42afddddf895b59a5f563facc8c1d9c9799a1f', bytes: 34115744},
 glb: {filename: 'collider.glb', sha256: '6141ddd57bec66dfdf47419eec3aa4e4e60bc6ece5360fd392d7953dfa429588', bytes: 11425480},
} as const;
export type Mesh = {positions: number[]; indices: number[]};
export type PreparedScene = ReturnType<typeof deriveScene>;

export function verifySource(bytes: Buffer, identity: {filename: string; sha256: string; bytes: number}) {
 if (bytes.length !== identity.bytes || createHash('sha256').update(bytes).digest('hex') !== identity.sha256) {
  throw new Error(`Source identity mismatch: ${identity.filename}`);
 }
}

/** Deliberately limited to the verified export: one indexed, identity-transform mesh. */
export function readSourceMesh(bytes: Buffer): Mesh {
 if (bytes.toString('ascii', 0, 4) !== 'glTF' || bytes.readUInt32LE(4) !== 2 || bytes.readUInt32LE(8) !== bytes.length) throw new Error('Invalid GLB');
 const jsonLength = bytes.readUInt32LE(12);
 const gltf = JSON.parse(bytes.toString('utf8', 20, 20 + jsonLength));
 const binaryStart = 20 + jsonLength + 8;
 if (gltf.meshes.length !== 1 || gltf.meshes[0].primitives.length !== 1 || gltf.nodes.some((node: Record<string, unknown>) => node.matrix || node.scale || node.rotation || node.translation)) throw new Error('Expected one identity-transform mesh');
 const primitive = gltf.meshes[0].primitives[0];
 if (primitive.mode !== 4) throw new Error('Expected triangle primitive');
 function accessor(index: number, width: number, componentType: number): number[] {
  const a = gltf.accessors[index], view = gltf.bufferViews[a.bufferView];
  if (a.componentType !== componentType || a.type !== (width === 3 ? 'VEC3' : 'SCALAR') || a.sparse || view.buffer !== 0) throw new Error('Unsupported accessor');
  const start = binaryStart + (view.byteOffset ?? 0) + (a.byteOffset ?? 0), stride = view.byteStride ?? width * 4;
  return Array.from({length: a.count * width}, (_, i) => {
   const offset = start + Math.floor(i / width) * stride + i % width * 4;
   return componentType === 5126 ? bytes.readFloatLE(offset) : bytes.readUInt32LE(offset);
  });
 }
 return {positions: accessor(primitive.attributes.POSITION, 3, 5126), indices: accessor(primitive.indices, 1, 5125)};
}

function boundsOf(positions: number[]): CollisionBox {
 const min: Vec3 = [Infinity, Infinity, Infinity], max: Vec3 = [-Infinity, -Infinity, -Infinity];
 for (let i = 0; i < positions.length; i++) {
  const axis = i % 3;
  min[axis] = Math.min(min[axis], positions[i]); max[axis] = Math.max(max[axis], positions[i]);
 }
 return {min, max};
}

function simplify(source: Mesh, pitch: number) {
 const clusters = new Map<string, number>(), positions: number[] = [], counts: number[] = [];
 const remap: number[] = [];
 for (let i = 0; i < source.positions.length; i += 3) {
  const key = source.positions.slice(i, i + 3).map(v => Math.floor(v / pitch)).join(',');
  let id = clusters.get(key);
  if (id === undefined) {id = counts.length; clusters.set(key, id); positions.push(0, 0, 0); counts.push(0);}
  counts[id]++;
  for (let axis = 0; axis < 3; axis++) positions[id * 3 + axis] += source.positions[i + axis];
  remap.push(id);
 }
 positions.forEach((v, i) => {positions[i] = v / counts[Math.floor(i / 3)];});
 const indices: number[] = [], normals = positions.map(() => 0), seen = new Set<string>();
 for (let i = 0; i < source.indices.length; i += 3) {
  const ids = source.indices.slice(i, i + 3).map(id => remap[id]);
  if (new Set(ids).size !== 3) continue;
  const key = [...ids].sort((a, b) => a - b).join(',');
  if (seen.has(key)) continue;
  seen.add(key);
  const [a, b, c] = ids.map(id => positions.slice(id * 3, id * 3 + 3));
  const u = b.map((v, j) => v - a[j]), v = c.map((v, j) => v - a[j]);
  const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  if (Math.hypot(...n) < 1e-12) continue;
  indices.push(...ids);
  for (const id of ids) for (let axis = 0; axis < 3; axis++) normals[id * 3 + axis] += n[axis];
 }
 for (let i = 0; i < normals.length; i += 3) {
  const length = Math.hypot(normals[i], normals[i + 1], normals[i + 2]);
  if (length > 0) for (let axis = 0; axis < 3; axis++) normals[i + axis] /= length;
  else normals[i + 1] = 1;
 }
 return {positions, normals, indices};
}

/** Barycentric lattice covers every triangle; a sample's padding is one lattice edge. */
function surfaceCells(mesh: Mesh, pitch: number) {
 const cells = new Set<string>(), surface = new Set<string>();
 let samples = 0;
 for (let i = 0; i < mesh.indices.length; i += 3) {
  const [a, b, c] = mesh.indices.slice(i, i + 3).map(id => mesh.positions.slice(id * 3, id * 3 + 3));
  const longest = Math.max(Math.hypot(...a.map((v, j) => v - b[j])), Math.hypot(...a.map((v, j) => v - c[j])), Math.hypot(...b.map((v, j) => v - c[j])));
  const steps = Math.max(1, Math.ceil(longest / (pitch / 2))), padding = longest / steps;
  for (let u = 0; u <= steps; u++) for (let v = 0; v <= steps - u; v++) {
   const p = a.map((value, j) => value + (b[j] - value) * u / steps + (c[j] - value) * v / steps);
   surface.add(p.map(value => Math.floor(value / pitch)).join(','));
   const min = p.map(value => Math.floor((value - padding) / pitch)), max = p.map(value => Math.floor((value + padding) / pitch));
   for (let x = min[0]; x <= max[0]; x++) for (let y = min[1]; y <= max[1]; y++) for (let z = min[2]; z <= max[2]; z++) cells.add(`${x},${y},${z}`);
   samples++;
  }
 }
 return {cells, surface, samples};
}

/** Greedy boxes contain occupied cells only, so merging cannot fill a passage. */
function mergeCells(cells: Set<string>, pitch: number): CollisionBox[] {
 const remaining = new Set(cells), boxes: CollisionBox[] = [];
 const ordered = [...cells].map(key => key.split(',').map(Number) as Vec3).sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
 for (const min of ordered) {
  if (!remaining.has(min.join(','))) continue;
  const end: Vec3 = [...min];
  for (const axis of [0, 2, 1]) {
   let expand = true;
   while (expand) {
    const layerMin: Vec3 = [...min], layerMax: Vec3 = [...end];
    layerMin[axis] = layerMax[axis] = end[axis] + 1;
    for (let x = layerMin[0]; x <= layerMax[0]; x++) for (let y = layerMin[1]; y <= layerMax[1]; y++) for (let z = layerMin[2]; z <= layerMax[2]; z++) if (!remaining.has(`${x},${y},${z}`)) expand = false;
    if (expand) end[axis]++;
   }
  }
  for (let x = min[0]; x <= end[0]; x++) for (let y = min[1]; y <= end[1]; y++) for (let z = min[2]; z <= end[2]; z++) remaining.delete(`${x},${y},${z}`);
  boxes.push({min: min.map(value => value * pitch) as Vec3, max: end.map(value => (value + 1) * pitch) as Vec3});
 }
 return boxes;
}

export function deriveScene(source: Mesh) {
 if (!source.positions.length || source.positions.length % 3 || !source.indices.length || source.indices.length % 3 || !source.positions.every(Number.isFinite) || !source.indices.every(i => Number.isInteger(i) && i >= 0 && i < source.positions.length / 3)) throw new Error('Invalid source mesh');
 const scale = 6, voxelPitch = 0.12, clusterPitch = 0.018;
 const originalBounds = boundsOf(source.positions);
 const transform = {scale, position: [0, -originalBounds.min[1] * scale, 0] as Vec3};
 const worldMesh = {positions: source.positions.map((v, i) => v * scale + transform.position[i % 3]), indices: source.indices};
 const mesh = simplify(source, clusterPitch);
 const {cells, surface, samples} = surfaceCells(worldMesh, voxelPitch);
 const boxes = mergeCells(cells, voxelPitch);
 const surfaceCenters = [...surface].sort().map(key => key.split(',').map(value => (Number(value) + 0.5) * voxelPitch) as Vec3);
 const glyphCount = Math.min(3500, surfaceCenters.length);
 const glyphs = Array.from({length: glyphCount}, (_, i) => surfaceCenters[Math.floor(i * surfaceCenters.length / glyphCount)]);
 return {
  sources: SOURCE, transform, mesh, boxes, glyphs, bounds: boundsOf(worldMesh.positions),
  metrics: {sourceVertices: source.positions.length / 3, sourceTriangles: source.indices.length / 3, meshVertices: mesh.positions.length / 3, meshTriangles: mesh.indices.length / 3, clusterPitchModelUnits: clusterPitch, scaleMetresPerModelUnit: scale, voxelPitchMetres: voxelPitch, maximumSamplePitchMetres: voxelPitch / 2, maximumSurfacePaddingMetres: voxelPitch / 2, surfaceSamples: samples, surfaceCells: surface.size, occupiedCells: cells.size, colliderBoxes: boxes.length, colliderTriangles: boxes.length * 12, glyphCount},
  caveats: [
   'Scale 6 metres per model unit is an authored experimental choice; it is not a model-estimated scale.',
   'Every original triangle is sampled, including foliage. Padding by each triangle lattice edge conservatively covers the continuous triangle surface; voxel quantization adds up to one cell of excess.',
   'The proxy is a surface shell, not a watertight interior fill. It has no floor semantics or walkable slope inference. The browser supplies a labeled authored floor and boundary.',
   'Vertex clustering averages source vertices and removes collapsed/duplicate faces; it can erase fine detail and does not preserve mesh topology.',
  ],
 };
}

export async function prepare(input: string, output: string) {
 const [ply, glb] = await Promise.all([readFile(resolve(input, SOURCE.ply.filename)), readFile(resolve(input, SOURCE.glb.filename))]);
 // Both identities are checked before parsing, deriving, or writing any output.
 verifySource(ply, SOURCE.ply); verifySource(glb, SOURCE.glb);
 const scene = deriveScene(readSourceMesh(glb));
 await mkdir(output, {recursive: true});
 await writeFile(resolve(output, 'scene.ply'), ply);
 await writeFile(resolve(output, 'scene.json'), JSON.stringify(scene));
 return scene;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
 const args = process.argv.slice(2);
 let input = resolve('.runtime/benchmark-evidence', SOURCE.jobId), output = resolve('apps/web/m1-prototype-public/m1-prototype');
 for (let i = 0; i < args.length; i += 2) {
  if (!args[i + 1] || !['--input', '--output'].includes(args[i])) throw new Error('Usage: tsx scripts/prepare-m1-prototype.ts [--input directory] [--output directory]');
  if (args[i] === '--input') input = resolve(args[i + 1]); else output = resolve(args[i + 1]);
 }
 const scene = await prepare(input, output);
 console.log(JSON.stringify({output, transform: scene.transform, bounds: scene.bounds, metrics: scene.metrics}, null, 2));
}
