export type Vec3 = [number, number, number];
export type TriangleMesh = {positions: number[] | Float32Array; indices: number[] | Uint32Array};
export type PassageTransform = {scale: number; yaw: number; position: Vec3};
export type AuthoredApproach = {seam: Vec3; outward: Vec3; width: number; length: number};
export type NavigationOptions = {radius: number; height: number; eyeHeight: number; maxStep: number; maxSlopeDegrees: number; sampleStep: number; contactTolerance: number};
export const DEFAULT_NAVIGATION: NavigationOptions = {radius: 0.3, height: 1.8, eyeHeight: 1.65, maxStep: 0.25, maxSlopeDegrees: 35, sampleStep: 0.05, contactTolerance: 0.015};
export type SupportSample = {position: Vec3; triangleId: number; normalY: number};
export type SupportAssessment = {
 valid: boolean; eye: Vec3; foot: Vec3; supportTriangleIds: number[]; supportSamples: SupportSample[];
 headClearance: number; reason: string | null; blockedTriangleId: number | null;
};
export type Enclosure = {roofTriangleId: number | null; roofTriangleIds: number[]; roofCoverage: number; maximumRoofHeight: number | null; sideTriangleIds: number[]; enclosed: boolean};

/** Zero-copy bounded parser for the single identity-mesh TRELLIS GLB contract. */
export function parsePassageGlb(buffer: ArrayBuffer): TriangleMesh {
 const view = new DataView(buffer), decoder = new TextDecoder();
 if (buffer.byteLength < 28 || view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2 || view.getUint32(8, true) !== buffer.byteLength || buffer.byteLength > 96 * 1024 * 1024) throw new Error('Invalid or oversized GLB');
 const jsonLength = view.getUint32(12, true), binaryHeader = 20 + jsonLength;
 if (jsonLength > 1024 * 1024 || jsonLength % 4 || binaryHeader + 8 > buffer.byteLength || view.getUint32(16, true) !== 0x4e4f534a) throw new Error('Invalid GLB JSON');
 const gltf = JSON.parse(decoder.decode(new Uint8Array(buffer, 20, jsonLength)));
 const binaryStart = binaryHeader + 8, binaryLength = view.getUint32(binaryHeader, true);
 if (view.getUint32(binaryHeader + 4, true) !== 0x004e4942 || binaryStart + binaryLength !== buffer.byteLength || gltf.buffers?.length !== 1 || gltf.buffers[0].uri || gltf.buffers[0].byteLength > binaryLength || gltf.meshes?.length !== 1 || gltf.meshes[0].primitives?.length !== 1) throw new Error('Unsupported GLB layout');
 if (!Array.isArray(gltf.nodes) || !gltf.nodes.length || gltf.nodes.length > 64 || gltf.nodes.filter((node: {mesh?: number}) => node.mesh !== undefined).length !== 1 || gltf.nodes.some((node: Record<string, unknown>) => node.matrix || node.scale || node.rotation || node.translation || (node.mesh !== undefined && node.mesh !== 0))) throw new Error('Expected one identity-transform GLB mesh');
 const primitive = gltf.meshes[0].primitives[0];
 if ((primitive.mode ?? 4) !== 4 || primitive.targets || gltf.extensionsRequired?.length) throw new Error('Expected unmodified triangle mesh');
 function accessor(id: number, positions: boolean) {
  const a = gltf.accessors?.[id], b = gltf.bufferViews?.[a?.bufferView];
  if (!a || !b || a.sparse || a.normalized || b.buffer !== 0 || a.type !== (positions ? 'VEC3' : 'SCALAR') || a.componentType !== (positions ? 5126 : 5125)) throw new Error('Unsupported GLB accessor');
  const width = positions ? 3 : 1, count = a.count, offset = (b.byteOffset ?? 0) + (a.byteOffset ?? 0);
  if (!Number.isSafeInteger(count) || count <= 0 || count > (positions ? 2_000_000 : 12_000_000) || !Number.isSafeInteger(offset) || offset < 0 || offset % 4 || (b.byteStride ?? width * 4) !== width * 4 || (a.byteOffset ?? 0) + count * width * 4 > b.byteLength || offset + count * width * 4 > binaryLength) throw new Error('Invalid GLB accessor bounds');
  return positions ? new Float32Array(buffer, binaryStart + offset, count * width) : new Uint32Array(buffer, binaryStart + offset, count);
 }
 return {positions: accessor(primitive.attributes?.POSITION, true) as Float32Array, indices: accessor(primitive.indices, false) as Uint32Array};
}

export type PassageBounds = {min: Vec3; max: Vec3};
type FloorHit = {y: number; triangleId: number; normalY: number};
type Point2 = [number, number];

function polygonNear(polygon: Vec3[], x: number, z: number, radius: number) {
 let positive = false, negative = false;
 for (let i = 0; i < polygon.length; i++) {
  const a = polygon[i], b = polygon[(i + 1) % polygon.length];
  const dx = b[0] - a[0], dz = b[2] - a[2], length = dx * dx + dz * dz;
  const t = length ? Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[2]) * dz) / length)) : 0;
  if ((x - a[0] - t * dx) ** 2 + (z - a[2] - t * dz) ** 2 < radius * radius - 1e-10) return true;
  const cross = dx * (z - a[2]) - dz * (x - a[0]);
  positive ||= cross > 1e-10; negative ||= cross < -1e-10;
 }
 return polygon.length >= 3 && (positive || negative) && !(positive && negative);
}

function sweptPolygonNear(polygon: Vec3[], from: Vec3, to: Vec3, radius: number) {
 if (polygonNear(polygon, from[0], from[2], radius) || polygonNear(polygon, to[0], to[2], radius)) return true;
 const dx = to[0] - from[0], dz = to[2] - from[2], length = dx * dx + dz * dz;
 if (!length) return false;
 for (let i = 0; i < polygon.length; i++) {
  const a = polygon[i], b = polygon[(i + 1) % polygon.length];
  const t = Math.max(0, Math.min(1, ((a[0] - from[0]) * dx + (a[2] - from[2]) * dz) / length));
  if ((a[0] - from[0] - t * dx) ** 2 + (a[2] - from[2] - t * dz) ** 2 < radius * radius - 1e-10) return true;
  const ex = b[0] - a[0], ez = b[2] - a[2], determinant = dx * ez - dz * ex;
  if (Math.abs(determinant) < 1e-15) continue;
  const along = ((a[0] - from[0]) * ez - (a[2] - from[2]) * ex) / determinant;
  const edge = ((a[0] - from[0]) * dz - (a[2] - from[2]) * dx) / determinant;
  if (along >= 0 && along <= 1 && edge >= 0 && edge <= 1) return true;
 }
 return false;
}

function clipY(polygon: Vec3[], plane: number, keepAbove: boolean): Vec3[] {
 const output: Vec3[] = [];
 for (let i = 0; i < polygon.length; i++) {
  const a = polygon[i], b = polygon[(i + 1) % polygon.length];
  const insideA = keepAbove ? a[1] >= plane : a[1] <= plane;
  const insideB = keepAbove ? b[1] >= plane : b[1] <= plane;
  if (insideA) output.push(a);
  if (insideA !== insideB) {
   const t = (plane - a[1]) / (b[1] - a[1]);
   output.push([a[0] + (b[0] - a[0]) * t, plane, a[2] + (b[2] - a[2]) * t]);
  }
 }
 return output;
}

/** Original triangles are never removed. CSR XZ buckets bound queries without millions of JS objects. */
export function createSurfaceNavigator(mesh: TriangleMesh, transform: PassageTransform, overrides: Partial<NavigationOptions> = {}, approach?: AuthoredApproach) {
 const options = {...DEFAULT_NAVIGATION, ...overrides};
 if (!Object.values(options).every(v => Number.isFinite(v) && v > 0) || options.maxSlopeDegrees > 35 || options.maxStep > 0.25 || options.radius < 0.3 || options.radius > 1 || options.height < 1.8 || options.eyeHeight > options.height || options.sampleStep > 0.05 || options.sampleStep < 0.001 || options.contactTolerance > 0.02) throw new Error('Invalid navigation dimensions');
 if (approach && (!approach.seam.every(Number.isFinite) || !approach.outward.every(Number.isFinite) || Math.abs(approach.outward[1]) > 1e-9 || Math.abs(Math.hypot(...approach.outward) - 1) > 1e-6 || !Number.isFinite(approach.width) || !Number.isFinite(approach.length) || approach.width < 0.6 || approach.width > 4 || approach.length < 0.5 || approach.length > 10)) throw new Error('Invalid bounded exterior approach');
 if (!Number.isFinite(transform.scale) || transform.scale <= 0 || transform.scale > 20 || !Number.isFinite(transform.yaw) || !transform.position.every(Number.isFinite)) throw new Error('Invalid passage transform');
 if (!mesh.positions.length || mesh.positions.length % 3 || mesh.positions.length > 6_000_000 || !mesh.indices.length || mesh.indices.length % 3 || mesh.indices.length > 12_000_000) throw new Error('Invalid navigation mesh dimensions');
 const positions = new Float64Array(mesh.positions.length), indices = mesh.indices;
 const bounds: PassageBounds = {min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity]};
 const sin = Math.sin(transform.yaw), cos = Math.cos(transform.yaw);
 for (let i = 0; i < positions.length; i += 3) {
  const x = mesh.positions[i], y = mesh.positions[i + 1], z = mesh.positions[i + 2];
  if (![x, y, z].every(Number.isFinite) || Math.max(Math.abs(x), Math.abs(y), Math.abs(z)) > 100) throw new Error('Invalid source coordinates');
  const values = [(cos * x + sin * z) * transform.scale + transform.position[0], y * transform.scale + transform.position[1], (-sin * x + cos * z) * transform.scale + transform.position[2]];
  for (let axis = 0; axis < 3; axis++) {positions[i + axis] = values[axis]; bounds.min[axis] = Math.min(bounds.min[axis], values[axis]); bounds.max[axis] = Math.max(bounds.max[axis], values[axis]);}
 }
 if (!Array.from(bounds.max, (v, i) => v - bounds.min[i]).every(v => v <= 40)) throw new Error('Navigation extent exceeds 40 metres');
 for (let i = 0; i < indices.length; i++) if (!Number.isInteger(indices[i]) || indices[i] < 0 || indices[i] >= positions.length / 3) throw new Error('Invalid triangle index');
 const triangles = indices.length / 3, minY = new Float32Array(triangles), maxY = new Float32Array(triangles), normalY = new Float32Array(triangles);
 const pitch = 0.2, width = Math.max(1, Math.ceil((bounds.max[0] - bounds.min[0]) / pitch) + 1), depth = Math.max(1, Math.ceil((bounds.max[2] - bounds.min[2]) / pitch) + 1);
 const counts = new Uint32Array(width * depth), spans = new Uint16Array(triangles * 4);
 const cellX = (x: number) => Math.max(0, Math.min(width - 1, Math.floor((x - bounds.min[0]) / pitch)));
 const cellZ = (z: number) => Math.max(0, Math.min(depth - 1, Math.floor((z - bounds.min[2]) / pitch)));
 const vertex = (index: number): Vec3 => [positions[index * 3], positions[index * 3 + 1], positions[index * 3 + 2]];
 const triangle = (id: number): [Vec3, Vec3, Vec3] => [vertex(indices[id * 3]), vertex(indices[id * 3 + 1]), vertex(indices[id * 3 + 2])];
 let references = 0;
 for (let id = 0; id < triangles; id++) {
  const [a, b, c] = triangle(id);
  minY[id] = Math.min(a[1], b[1], c[1]); maxY[id] = Math.max(a[1], b[1], c[1]);
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  normalY[id] = ny / (Math.hypot(nx, ny, nz) || 1);
  const x0 = cellX(Math.min(a[0], b[0], c[0])), x1 = cellX(Math.max(a[0], b[0], c[0]));
  const z0 = cellZ(Math.min(a[2], b[2], c[2])), z1 = cellZ(Math.max(a[2], b[2], c[2]));
  spans.set([x0, x1, z0, z1], id * 4);
  references += (x1 - x0 + 1) * (z1 - z0 + 1);
  if (references > 24_000_000) throw new Error('Triangle spatial index exceeds bounded reference budget');
  for (let x = x0; x <= x1; x++) for (let z = z0; z <= z1; z++) counts[z * width + x]++;
 }
 const starts = new Uint32Array(counts.length + 1);
 for (let i = 0; i < counts.length; i++) starts[i + 1] = starts[i] + counts[i];
 const ids = new Uint32Array(references), cursor = starts.slice(0, -1);
 for (let id = 0; id < triangles; id++) for (let x = spans[id * 4]; x <= spans[id * 4 + 1]; x++) for (let z = spans[id * 4 + 2]; z <= spans[id * 4 + 3]; z++) ids[cursor[z * width + x]++] = id;
 const seen = new Uint32Array(triangles); let queryId = 0;
 function query(x0: number, x1: number, z0: number, z1: number, visit: (id: number) => boolean | void) {
  if (x1 < bounds.min[0] || x0 > bounds.max[0] || z1 < bounds.min[2] || z0 > bounds.max[2]) return;
  queryId++; if (queryId >= 0xffffffff) {seen.fill(0); queryId = 1;}
  for (let z = cellZ(z0); z <= cellZ(z1); z++) for (let x = cellX(x0); x <= cellX(x1); x++) {
   const cell = z * width + x;
   for (let k = starts[cell]; k < starts[cell + 1]; k++) {
    const id = ids[k]; if (seen[id] === queryId) continue; seen[id] = queryId;
    if (visit(id) === false) return;
   }
  }
 }
 function weights(id: number, x: number, z: number): Vec3 | null {
  const ai = indices[id * 3] * 3, bi = indices[id * 3 + 1] * 3, ci = indices[id * 3 + 2] * 3;
  const ax = positions[ai], az = positions[ai + 2], ux = positions[bi] - ax, uz = positions[bi + 2] - az, vx = positions[ci] - ax, vz = positions[ci + 2] - az;
  const determinant = ux * vz - uz * vx;
  if (Math.abs(determinant) < 1e-15) return null;
  const u = ((x - ax) * vz - (z - az) * vx) / determinant, v = (ux * (z - az) - uz * (x - ax)) / determinant;
  return [1 - u - v, u, v];
 }
 function height(id: number, weights: Vec3) {return weights[0] * positions[indices[id * 3] * 3 + 1] + weights[1] * positions[indices[id * 3 + 1] * 3 + 1] + weights[2] * positions[indices[id * 3 + 2] * 3 + 1];}
 const slopeY = Math.cos(options.maxSlopeDegrees * Math.PI / 180);
 function approachCoordinates(x: number, z: number): Point2 {
  if (!approach) return [Infinity, Infinity];
  const dx = x - approach.seam[0], dz = z - approach.seam[2];
  return [dx * approach.outward[0] + dz * approach.outward[2], dx * -approach.outward[2] + dz * approach.outward[0]];
 }
 function floors(x: number, z: number, low = -Infinity, high = Infinity) {
  const hits: FloorHit[] = [];
  query(x, x, z, z, id => {
   if (normalY[id] < slopeY || maxY[id] < low - 1e-6 || minY[id] > high + 1e-6) return;
   const w = weights(id, x, z);
   if (!w || w.some(value => value < -1e-7)) return;
   const y = height(id, w);
   if (y >= low - 1e-6 && y <= high + 1e-6 && !hits.some(hit => Math.abs(hit.y - y) < 0.001)) hits.push({y, triangleId: id, normalY: normalY[id]});
  });
  if (approach && approach.seam[1] >= low && approach.seam[1] <= high) {
   const [outward, lateral] = approachCoordinates(x, z);
   if (outward >= -1e-9 && outward <= approach.length && Math.abs(lateral) <= approach.width / 2) hits.push({y: approach.seam[1], triangleId: -1, normalY: 1});
  }
  return hits.sort((a, b) => b.y - a.y);
 }
 function volumeBlock(from: Vec3, to: Vec3, low: number, high: number): number | null {
  let blocked: number | null = null;
  query(Math.min(from[0], to[0]) - options.radius, Math.max(from[0], to[0]) + options.radius, Math.min(from[2], to[2]) - options.radius, Math.max(from[2], to[2]) + options.radius, id => {
   if (maxY[id] <= low + 1e-6 || minY[id] >= high - 1e-6) return;
   let polygon: Vec3[] = triangle(id);
   if (minY[id] < low) polygon = clipY(polygon, low, true);
   if (maxY[id] > high) polygon = clipY(polygon, high, false);
   if (polygon.length && sweptPolygonNear(polygon, from, to, options.radius)) {blocked = id; return false;}
  });
  return blocked;
 }
 function bodyBlock(foot: Vec3) {return volumeBlock(foot, foot, foot[1] + options.contactTolerance, foot[1] + options.height);}
 function sweptBlock(from: Vec3, to: Vec3) {
  const lowFoot = Math.min(from[1], to[1]) - options.eyeHeight, highFoot = Math.max(from[1], to[1]) - options.eyeHeight;
  // Step up before horizontal translation; step down afterward. Validate both
  // vertical and horizontal sweeps against source geometry, including headroom.
  const vertical = to[1] >= from[1] ? from : to;
  return volumeBlock(vertical, vertical, lowFoot + options.contactTolerance, highFoot + options.height)
   ?? volumeBlock(from, to, highFoot + options.contactTolerance, highFoot + options.height);
 }
 const probes: Point2[] = [[0, 0], ...Array.from({length: 8}, (_, i): Point2 => [Math.cos(i * Math.PI / 4) * options.radius, Math.sin(i * Math.PI / 4) * options.radius])];
 function assess(eye: Vec3): SupportAssessment {
  const expected = eye[1] - options.eyeHeight, samples: SupportSample[] = [];
  const failed = (reason: string, blockedTriangleId: number | null = null): SupportAssessment => ({valid: false, eye: [...eye], foot: [eye[0], expected, eye[2]], supportTriangleIds: [...new Set(samples.map(s => s.triangleId))], supportSamples: samples, headClearance: 0, reason, blockedTriangleId});
  if (!eye.every(Number.isFinite)) return failed('non-finite-position');
  for (const [dx, dz] of probes) {
   const x = eye[0] + dx, z = eye[2] + dz, hits = floors(x, z, expected - options.maxStep - options.radius * Math.tan(options.maxSlopeDegrees * Math.PI / 180), expected + options.maxStep);
   if (!hits.length) return failed(samples.length ? 'unsupported-footprint' : 'unsupported-center');
   const hit = hits.reduce((a, b) => Math.abs(a.y - expected) <= Math.abs(b.y - expected) ? a : b);
   samples.push({position: [x, hit.y, z], triangleId: hit.triangleId, normalY: hit.normalY});
  }
  const footY = Math.max(...samples.map(s => s.position[1]));
  if (footY - Math.min(...samples.map(s => s.position[1])) > 2 * options.radius * Math.tan(options.maxSlopeDegrees * Math.PI / 180) + options.contactTolerance) return failed('footprint-height-spread');
  const foot: Vec3 = [eye[0], footY, eye[2]], blocked = bodyBlock(foot);
  if (blocked !== null) return failed('body-or-head-obstruction', blocked);
  return {valid: true, eye: [foot[0], footY + options.eyeHeight, foot[2]], foot, supportTriangleIds: [...new Set(samples.map(s => s.triangleId))], supportSamples: samples, headClearance: options.height, reason: null, blockedTriangleId: null};
 }
 /** Union of original projected support intervals catches gaps narrower than a movement substep. */
 function continuousSupport(from: Vec3, to: Vec3) {
  for (const [dx, dz] of probes) {
   const a: Point2 = [from[0] + dx, from[2] + dz], b: Point2 = [to[0] + dx, to[2] + dz], intervals: Point2[] = [];
   const low = Math.min(from[1], to[1]) - options.eyeHeight - options.maxStep - options.radius * Math.tan(options.maxSlopeDegrees * Math.PI / 180), high = Math.max(from[1], to[1]) - options.eyeHeight + options.maxStep;
   query(Math.min(a[0], b[0]), Math.max(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[1], b[1]), id => {
    if (normalY[id] < slopeY || minY[id] > high || maxY[id] < low) return;
    const wa = weights(id, a[0], a[1]), wb = weights(id, b[0], b[1]); if (!wa || !wb) return;
    let start = 0, end = 1;
    const constraints = [...wa.map((v, i): Point2 => [v, wb[i]]), [height(id, wa) - low, height(id, wb) - low] as Point2, [high - height(id, wa), high - height(id, wb)] as Point2];
    for (const [v0, v1] of constraints) {
     if (v0 < -1e-9 && v1 < -1e-9) return;
     if (v0 < 0 && v1 >= 0) start = Math.max(start, -v0 / (v1 - v0));
     if (v1 < 0 && v0 >= 0) end = Math.min(end, -v0 / (v1 - v0));
    }
    if (start <= end) intervals.push([start, end]);
   });
   if (approach && approach.seam[1] >= low && approach.seam[1] <= high) {
    const ca = approachCoordinates(a[0], a[1]), cb = approachCoordinates(b[0], b[1]);
    const constraints: Point2[] = [[ca[0], cb[0]], [approach.length - ca[0], approach.length - cb[0]], [approach.width / 2 + ca[1], approach.width / 2 + cb[1]], [approach.width / 2 - ca[1], approach.width / 2 - cb[1]]];
    let start = 0, end = 1;
    for (const [v0, v1] of constraints) {
     if (v0 < 0 && v1 < 0) {end = -1; break;}
     if (v0 < 0 && v1 >= 0) start = Math.max(start, -v0 / (v1 - v0));
     if (v1 < 0 && v0 >= 0) end = Math.min(end, -v0 / (v1 - v0));
    }
    if (start <= end) intervals.push([start, end]);
   }
   intervals.sort((a, b) => a[0] - b[0]); let covered = 0;
   for (const interval of intervals) {if (interval[0] > covered + 1e-7) break; covered = Math.max(covered, interval[1]); if (covered >= 1 - 1e-7) break;}
   if (covered < 1 - 1e-7) return false;
  }
  return true;
 }
 function move(eye: Vec3, delta: Vec3) {
  let support = assess(eye), position: Vec3 = [...eye], reason = support.reason;
  if (!support.valid) return {position, blocked: true, reason, support};
  position = support.eye;
  const distance = Math.hypot(delta[0], delta[2]);
  if (!delta.every(Number.isFinite) || distance > 40 || Math.abs(delta[1]) > 1e-9) throw new Error('Movement must be bounded horizontal displacement');
  const steps = Math.max(1, Math.ceil(distance / options.sampleStep)); let blocked = false;
  for (let step = 0; step < steps; step++) {
   const target: Vec3 = [position[0] + delta[0] / steps, position[1], position[2] + delta[2] / steps], next = assess(target);
   if (!next.valid || Math.abs(next.eye[1] - position[1]) > options.maxStep + 1e-6 || !continuousSupport(position, next.eye)) {blocked = true; reason = next.reason ?? 'support-gap-or-step'; break;}
   if (sweptBlock(position, next.eye) !== null) {blocked = true; reason = 'swept-body-or-head-obstruction'; break;}
   position = next.eye; support = next;
  }
  return {position, blocked, reason, support};
 }
 function enclosure(eye: Vec3): Enclosure {
  const footY = eye[1] - options.eyeHeight;
  const roofs: {id: number; height: number}[] = [];
  for (const [dx, dz] of probes) {
   const x = eye[0] + dx, z = eye[2] + dz; let roof: {id: number; height: number} | null = null;
   query(x, x, z, z, id => {
    if (maxY[id] < footY + options.height || minY[id] > footY + 6) return;
    const w = weights(id, x, z);
    if (!w || w.some(value => value < -1e-7)) return;
    const y = height(id, w) - footY;
    if (y >= options.height - 1e-6 && y <= 6 && (!roof || y < roof.height)) roof = {id, height: y};
   });
   if (roof !== null) roofs.push(roof);
  }
  const roofTriangleId = roofs.length === probes.length ? roofs[0].id : null;
  const sideTriangleIds: number[] = [];
  // Horizontal rays intersect actual vertical/steep triangles at torso height.
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
   let nearest = 6, hit: number | null = null;
   const rayY = footY + 0.9;
   query(Math.min(eye[0], eye[0] + dx * 6), Math.max(eye[0], eye[0] + dx * 6), Math.min(eye[2], eye[2] + dz * 6), Math.max(eye[2], eye[2] + dz * 6), id => {
    if (minY[id] > rayY || maxY[id] < rayY || Math.abs(normalY[id]) > 0.7) return;
    const polygon = triangle(id), crossings: Point2[] = [];
    for (let i = 0; i < 3; i++) {
     const a = polygon[i], b = polygon[(i + 1) % 3];
     if ((a[1] <= rayY && b[1] > rayY) || (b[1] <= rayY && a[1] > rayY)) {const t = (rayY - a[1]) / (b[1] - a[1]); crossings.push([a[0] + (b[0] - a[0]) * t, a[2] + (b[2] - a[2]) * t]);}
    }
    if (crossings.length !== 2) return;
    const [a, b] = crossings, ex = b[0] - a[0], ez = b[1] - a[1], determinant = dx * ez - dz * ex;
    if (Math.abs(determinant) < 1e-12) return;
    const t = ((a[0] - eye[0]) * ez - (a[1] - eye[2]) * ex) / determinant, u = ((a[0] - eye[0]) * dz - (a[1] - eye[2]) * dx) / determinant;
    if (t > options.radius && t < nearest && u >= 0 && u <= 1) {nearest = t; hit = id;}
   });
   sideTriangleIds.push(hit ?? -1);
  }
  const enclosed = roofTriangleId !== null || (sideTriangleIds[0] >= 0 && sideTriangleIds[1] >= 0) || (sideTriangleIds[2] >= 0 && sideTriangleIds[3] >= 0);
  return {roofTriangleId, roofTriangleIds: [...new Set(roofs.map(roof => roof.id))], roofCoverage: roofs.length / probes.length, maximumRoofHeight: roofs.length ? Math.max(...roofs.map(roof => roof.height)) : null, sideTriangleIds, enclosed};
 }
 return {options, transform, approach, bounds, assess, move, floors, enclosure, bodyBlock, continuousSupport, metrics: {sourceTriangles: triangles, sourceVertices: positions.length / 3, indexReferences: references, indexCells: counts.length, indexPitch: pitch}};
}
