import {createSurfaceNavigator, type AuthoredApproach, type Enclosure, type PassageTransform, type SupportAssessment, type TriangleMesh, type Vec3} from '../../apps/web/src/generated-passage/navigation.ts';
import type {PassageAssessment, PassageSample} from '../passage-geometry.ts';
import type {SpatialCriteria, SpatialKind} from './criteria.ts';
export type TopologyWitness = {kind: SpatialKind | 'explicit-open-sky' | 'explicit-cover' | 'explicit-walls'; routeIndices: number[]; supportTriangleIds: number[]; structuralTriangleIds: number[]; measurements: Record<string, number | boolean | number[]>};
export type InterpretedSpaceAssessment = PassageAssessment & {
 criteria: SpatialCriteria; topologyWitnesses: TopologyWitness[];
 searchDiagnostics: {mode: 'legacy' | 'expanded'; budgets: typeof BUDGETS; exhausted: string[]; componentsExplored: number; entriesTested: number; edgesTested: number; candidateRoutes: number; topologyQueries: number; approachBuilds: number; routeCrossesBehindSeam: boolean};
};
const BUDGETS = {gridCells: 20000, supportedNodes: 20000, layersPerColumn: 32, legacyEntries: 48, expandedEntries: 192, edges: 80000, candidateRoutes: 4096, topologyQueries: 160000, approachBuilds: 8, topologyIndexReferences: 24000000} as const;
const distance = (a: Vec3, b: Vec3) => Math.hypot(a[0] - b[0], a[2] - b[2]);
const directions: Vec3[] = [[-1, 0, 0], [1, 0, 0], [0, 0, -1], [0, 0, 1]];
type RayHit = {id: number; distance: number};

/** Separate read-only, compact XZ index for witness rays and exact scaffold footprint exclusion. */
function topologyIndex(mesh: TriangleMesh, transform: PassageTransform, bounds: PassageAssessment['bounds']) {
 const vertices = new Float64Array(mesh.positions.length), indices = mesh.indices, count = indices.length / 3;
 const c = Math.cos(transform.yaw), s = Math.sin(transform.yaw);
 for (let i = 0; i < vertices.length; i += 3) {vertices[i] = (mesh.positions[i] * c + mesh.positions[i + 2] * s) * transform.scale + transform.position[0]; vertices[i + 1] = mesh.positions[i + 1] * transform.scale + transform.position[1]; vertices[i + 2] = (-mesh.positions[i] * s + mesh.positions[i + 2] * c) * transform.scale + transform.position[2];}
 const pitch = 0.2, width = Math.ceil((bounds.max[0] - bounds.min[0]) / pitch) + 1, depth = Math.ceil((bounds.max[2] - bounds.min[2]) / pitch) + 1;
 const cellX = (x: number) => Math.max(0, Math.min(width - 1, Math.floor((x - bounds.min[0]) / pitch))), cellZ = (z: number) => Math.max(0, Math.min(depth - 1, Math.floor((z - bounds.min[2]) / pitch)));
 const spans = new Uint16Array(count * 4), counts = new Uint32Array(width * depth), loY = new Float32Array(count), hiY = new Float32Array(count);
 const vertex = (i: number): Vec3 => [vertices[indices[i] * 3], vertices[indices[i] * 3 + 1], vertices[indices[i] * 3 + 2]];
 let references = 0;
 for (let id = 0; id < count; id++) {
  const a = vertex(id * 3), b = vertex(id * 3 + 1), d = vertex(id * 3 + 2);
  const x0 = cellX(Math.min(a[0], b[0], d[0])), x1 = cellX(Math.max(a[0], b[0], d[0])), z0 = cellZ(Math.min(a[2], b[2], d[2])), z1 = cellZ(Math.max(a[2], b[2], d[2]));
  spans.set([x0, x1, z0, z1], id * 4); loY[id] = Math.min(a[1], b[1], d[1]); hiY[id] = Math.max(a[1], b[1], d[1]);
  references += (x1 - x0 + 1) * (z1 - z0 + 1);
  if (references > BUDGETS.topologyIndexReferences) throw new Error('Topology index reference budget exceeded');
  for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) counts[z * width + x]++;
 }
 const starts = new Uint32Array(counts.length + 1);
 for (let i = 0; i < counts.length; i++) starts[i + 1] = starts[i] + counts[i];
 const ids = new Uint32Array(references), cursor = starts.slice(0, -1), seen = new Uint32Array(count); let serial = 0;
 for (let id = 0; id < count; id++) for (let z = spans[id * 4 + 2]; z <= spans[id * 4 + 3]; z++) for (let x = spans[id * 4]; x <= spans[id * 4 + 1]; x++) ids[cursor[z * width + x]++] = id;
 function query(x0: number, x1: number, z0: number, z1: number, low: number, high: number, visit: (id: number) => boolean | void) {
  if (x1 < bounds.min[0] || x0 > bounds.max[0] || z1 < bounds.min[2] || z0 > bounds.max[2]) return;
  if (++serial === 0xffffffff) {seen.fill(0); serial = 1;}
  for (let z = cellZ(z0); z <= cellZ(z1); z++) for (let x = cellX(x0); x <= cellX(x1); x++) for (let k = starts[z * width + x]; k < starts[z * width + x + 1]; k++) {
   const id = ids[k]; if (seen[id] === serial || loY[id] > high || hiY[id] < low) continue; seen[id] = serial; if (visit(id) === false) return;
  }
 }
 function ray(origin: Vec3, dir: Vec3, maximum: number): RayHit | null {
  let nearest = maximum + 1e-7, hit: RayHit | null = null;
  const end = origin.map((v, i) => v + dir[i] * maximum) as Vec3;
  query(Math.min(origin[0], end[0]) - 1e-7, Math.max(origin[0], end[0]) + 1e-7, Math.min(origin[2], end[2]) - 1e-7, Math.max(origin[2], end[2]) + 1e-7, Math.min(origin[1], end[1]), Math.max(origin[1], end[1]), id => {
   const ai = indices[id * 3] * 3, bi = indices[id * 3 + 1] * 3, ci = indices[id * 3 + 2] * 3;
   const ax = vertices[ai], ay = vertices[ai + 1], az = vertices[ai + 2], ux = vertices[bi] - ax, uy = vertices[bi + 1] - ay, uz = vertices[bi + 2] - az, vx = vertices[ci] - ax, vy = vertices[ci + 1] - ay, vz = vertices[ci + 2] - az;
   const px = dir[1] * vz - dir[2] * vy, py = dir[2] * vx - dir[0] * vz, pz = dir[0] * vy - dir[1] * vx, determinant = ux * px + uy * py + uz * pz;
   if (Math.abs(determinant) < 1e-12) return;
   const tx = origin[0] - ax, ty = origin[1] - ay, tz = origin[2] - az, baryU = (tx * px + ty * py + tz * pz) / determinant;
   if (baryU < -1e-7 || baryU > 1 + 1e-7) return;
   const qx = ty * uz - tz * uy, qy = tz * ux - tx * uz, qz = tx * uy - ty * ux, baryV = (dir[0] * qx + dir[1] * qy + dir[2] * qz) / determinant;
   if (baryV < -1e-7 || baryU + baryV > 1 + 1e-7) return;
   const d = (vx * qx + vy * qy + vz * qz) / determinant;
   if (d > 1e-5 && d < nearest) {nearest = d; hit = {id, distance: d};}
  });
  return hit;
 }
 function scaffoldOutside(approach: AuthoredApproach) {
  const {seam, outward: d, width: w, length: l} = approach, corners = [0, l].flatMap(t => [-w / 2, w / 2].map(r => [seam[0] + d[0] * t - d[2] * r, seam[2] + d[2] * t + d[0] * r])); let clear = true;
  query(Math.min(...corners.map(p => p[0])), Math.max(...corners.map(p => p[0])), Math.min(...corners.map(p => p[1])), Math.max(...corners.map(p => p[1])), -Infinity, Infinity, id => {
   let polygon = [0, 1, 2].map(k => {const p = vertex(id * 3 + k), x = p[0] - seam[0], z = p[2] - seam[2]; return [x * d[0] + z * d[2], -x * d[2] + z * d[0]];});
   // Source-contact boundary tolerance only; no positive-area destination support is supplied.
   for (const [axis, limit, sign] of [[0, 0.002, 1], [0, l, -1], [1, -w / 2, 1], [1, w / 2, -1]]) {
    const next: number[][] = [];
    for (let k = 0; k < polygon.length; k++) {const a = polygon[k], b = polygon[(k + 1) % polygon.length], ia = (a[axis] - limit) * sign >= 0, ib = (b[axis] - limit) * sign >= 0;
     if (ia) next.push(a); if (ia !== ib) {const t = (limit - a[axis]) / (b[axis] - a[axis]); next.push(a.map((v, i) => v + (b[i] - v) * t));}}
    polygon = next;
   }
   if (polygon.length) {clear = false; return false;}
  });
  return clear;
 }
 return {ray, scaffoldOutside};
}

type Node = {assessment: SupportAssessment; ix: number; iz: number};
type Entry = {id: number; direction: Vec3};
export function assessInterpretedSpace(input: {mesh: TriangleMesh; transform: PassageTransform; criteria: SpatialCriteria; searchMode: 'legacy' | 'expanded'}): InterpretedSpaceAssessment {
 const started = performance.now(), nav = createSurfaceNavigator(input.mesh, input.transform), {bounds, options} = nav;
 const index = topologyIndex(input.mesh, input.transform, bounds), built = performance.now(), pitch = 0.2;
 const diagnostics: InterpretedSpaceAssessment['searchDiagnostics'] = {mode: input.searchMode, budgets: BUDGETS, exhausted: [], componentsExplored: 0, entriesTested: 0, edgesTested: 0, candidateRoutes: 0, topologyQueries: 0, approachBuilds: 0, routeCrossesBehindSeam: false};
 const exhaust = (reason: string) => {if (!diagnostics.exhausted.includes(reason)) diagnostics.exhausted.push(reason);};
 const rejected: Record<string, number> = {}, reject = (reason: string) => {rejected[reason] = (rejected[reason] ?? 0) + 1;};
 const nx = Math.ceil((bounds.max[0] - bounds.min[0]) / pitch), nz = Math.ceil((bounds.max[2] - bounds.min[2]) / pitch), nodes: Node[] = [], cells = new Map<string, number[]>(); let testedFloorPoints = 0;
 if ((nx + 1) * (nz + 1) > BUDGETS.gridCells) exhaust('grid-cells');
 else outer: for (let iz = 0; iz <= nz; iz++) for (let ix = 0; ix <= nx; ix++) {
  const x = bounds.min[0] + ix * pitch, z = bounds.min[2] + iz * pitch, hits = nav.floors(x, z);
  if (hits.length > BUDGETS.layersPerColumn) {exhaust('layers-per-column'); continue;}
  for (const hit of hits) {
   testedFloorPoints++; const assessment = nav.assess([x, hit.y + options.eyeHeight, z]);
   if (!assessment.valid) {reject(assessment.reason ?? 'unknown'); continue;}
   const key = `${ix},${iz}`, existing = cells.get(key) ?? [];
   if (existing.some(id => Math.abs(nodes[id].assessment.eye[1] - assessment.eye[1]) < 0.05)) continue;
   existing.push(nodes.length); cells.set(key, existing); nodes.push({assessment, ix, iz});
   if (nodes.length >= BUDGETS.supportedNodes) {exhaust('supported-nodes'); break outer;}
  }
 }
 const ray = (p: Vec3, d: Vec3, max: number) => {if (diagnostics.topologyQueries >= BUDGETS.topologyQueries) {exhaust('topology-queries'); return null;} diagnostics.topologyQueries++; return index.ray(p, d, max);};
 type Feature = {roofs: RayHit[]; sides: (RayHit | null)[]; enclosure: Enclosure};
 const features = new Map<number, Feature>();
 function feature(id: number): Feature {
  const cached = features.get(id); if (cached) return cached;
  const foot = nodes[id].assessment.foot, roofs: RayHit[] = [];
  for (const [dx, dz] of [[0, 0], ...Array.from({length: 8}, (_, i) => [Math.cos(i * Math.PI / 4) * options.radius, Math.sin(i * Math.PI / 4) * options.radius])]) {const hit = ray([foot[0] + dx, foot[1] + options.height - 0.001, foot[2] + dz], [0, 1, 0], Math.max(0, bounds.max[1] - foot[1])); if (hit) roofs.push({...hit, distance: hit.distance + options.height - 0.001});}
  const sides = directions.map(d => ray([foot[0], foot[1] + 0.9, foot[2]], d, 12));
  const enclosed = roofs.length === 9 || !!(sides[0] && sides[1]) || !!(sides[2] && sides[3]);
  const result = {roofs, sides, enclosure: {roofTriangleId: roofs.length === 9 ? roofs[0].id : null, roofTriangleIds: [...new Set(roofs.map(h => h.id))], roofCoverage: roofs.length / 9, maximumRoofHeight: roofs.length ? Math.max(...roofs.map(h => h.distance)) : null, sideTriangleIds: sides.map(h => h?.id ?? -1), enclosed}};
  features.set(id, result); return result;
 }
 const edges = new Map<string, boolean>();
 function connected(a: number, b: number) {
  const key = a < b ? `${a}:${b}` : `${b}:${a}`, cached = edges.get(key); if (cached !== undefined) return cached;
  if (diagnostics.edgesTested >= BUDGETS.edges) {exhaust('edges'); return false;} diagnostics.edgesTested++;
  const p = nodes[a].assessment.eye, q = nodes[b].assessment.eye;
  let valid = Math.abs(p[1] - q[1]) <= options.maxStep + pitch * Math.tan(options.maxSlopeDegrees * Math.PI / 180);
  if (valid) {const f = nav.move(p, [q[0] - p[0], 0, q[2] - p[2]]), r = nav.move(q, [p[0] - q[0], 0, p[2] - q[2]]); valid = !f.blocked && !r.blocked && distance(f.position, q) < 1e-6 && distance(r.position, p) < 1e-6;}
  edges.set(key, valid); return valid;
 }
 function neighbors(id: number) {const n = nodes[id], result: number[] = []; for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (const other of cells.get(`${n.ix + dx},${n.iz + dz}`) ?? []) if (connected(id, other)) result.push(other); return result;}
 function makeApproach(entry: Entry) {
  const eye = nodes[entry.id].assessment.eye, foot = eye[1] - options.eyeHeight, d = entry.direction;
  const contactAt = (t: number) => nav.floors(eye[0] + d[0] * t, eye[2] + d[2] * t, foot - options.maxStep, foot + options.maxStep)[0];
  let inside = 0, outside = 0;
  while (outside < 1.5 && contactAt(outside)) {inside = outside; outside += 0.025;}
  if (outside >= 1.5) return null;
  for (let i = 0; i < 24; i++) {const mid = (inside + outside) / 2; if (contactAt(mid)) inside = mid; else outside = mid;}
  const contact = contactAt(inside); if (!contact) return null;
  const seam: Vec3 = [eye[0] + d[0] * inside, contact.y, eye[2] + d[2] * inside], approach: AuthoredApproach = {seam, outward: d, width: 1.2, length: 2};
  const exteriorDistance = Math.max(2, d[0] < 0 ? seam[0] - bounds.min[0] + 0.1 : d[0] > 0 ? bounds.max[0] - seam[0] + 0.1 : d[2] < 0 ? seam[2] - bounds.min[2] + 0.1 : bounds.max[2] - seam[2] + 0.1);
  if (!index.scaffoldOutside({...approach, length: exteriorDistance})) {reject('scaffold-overlaps-source-footprint'); return null;}
  for (let t = 0; t <= inside + 1.5; t += options.sampleStep) if (nav.bodyBlock([eye[0] + d[0] * t, foot, eye[2] + d[2] * t]) !== null) return null;
  return {seam, approach, approachStart: [seam[0] + d[0] * 1.2, seam[1] + options.eyeHeight, seam[2] + d[2] * 1.2] as Vec3};
 }
 const entries: Entry[] = [];
 for (let id = 0; id < nodes.length; id++) {
  const n = nodes[id], eye = n.assessment.eye;
  for (const d of directions) {
   if (input.searchMode === 'legacy') {
    const gap = d[0] < 0 ? eye[0] - bounds.min[0] : d[0] > 0 ? bounds.max[0] - eye[0] : d[2] < 0 ? eye[2] - bounds.min[2] : bounds.max[2] - eye[2];
    if (gap > options.radius + pitch * 2.1) continue;
    let free = true; for (let t = 0; t <= gap + options.radius + 0.1; t += options.sampleStep) if (nav.bodyBlock([eye[0] + d[0] * t, eye[1] - options.eyeHeight, eye[2] + d[2] * t]) !== null) {free = false; break;}
    if (free) {entries.push({id, direction: d}); break;}
   } else {
    // Local boundary proposals include recessed/L-shaped exteriors and every support layer.
    const nearby = cells.get(`${n.ix + d[0]},${n.iz + d[2]}`) ?? [];
    if (!nearby.some(other => Math.abs(nodes[other].assessment.foot[1] - n.assessment.foot[1]) <= options.maxStep)) entries.push({id, direction: d});
   }
  }
 }
 const entryBudget = input.searchMode === 'legacy' ? BUDGETS.legacyEntries : BUDGETS.expandedEntries;
 // Legacy uses the identical raster-index spread. Expanded prioritizes spatial diversity,
 // including Y, so a large base cannot monopolize proposals for a disconnected deck.
 let selectedEntries: Entry[];
 if (input.searchMode === 'legacy') selectedEntries = entries.length <= entryBudget ? entries : Array.from({length: entryBudget}, (_, i) => entries[Math.floor(i * entries.length / entryBudget)]);
 else {
  selectedEntries = []; const remaining = entries.slice(), nearest = new Map<Entry, number>();
  while (remaining.length && selectedEntries.length < entryBudget) {
   let best = 0, score = -1;
   for (let i = 0; i < remaining.length; i++) {const e = remaining[i], p = nodes[e.id].assessment.eye, previous = selectedEntries.at(-1), q = previous ? nodes[previous.id].assessment.eye : p;
    const d = previous ? Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) + (e.direction[0] !== previous.direction[0] || e.direction[2] !== previous.direction[2] ? 0.2 : 0) : Infinity;
    const value = Math.min(nearest.get(e) ?? Infinity, d); nearest.set(e, value); if (value > score) {score = value; best = i;}}
   selectedEntries.push(remaining.splice(best, 1)[0]);
  }
 }
 if (entries.length > entryBudget) exhaust('entry-proposals');
 const broadCache = new Map<string, boolean>();
 function broad(id: number, cover?: 'open' | 'covered') {
  const key = `${id}:${cover ?? 'support'}`; if (broadCache.has(key)) return broadCache.get(key)!;
  const p = nodes[id].assessment.eye, radius = Math.max(1.2, input.criteria.requirements.minimumWidth / 2); let valid = true;
  for (let i = 0; i < 8; i++) {
   const dx = Math.cos(i * Math.PI / 4) * radius, dz = Math.sin(i * Math.PI / 4) * radius, end: Vec3 = [p[0] + dx, p[1], p[2] + dz], f = nav.move(p, [dx, 0, dz]);
   if (f.blocked || distance(f.position, end) > 1e-6) {valid = false; break;}
   if (cover) {const roof = ray([end[0], f.support.foot[1] + options.height - 0.001, end[2]], [0, 1, 0], Math.max(0, bounds.max[1] - f.support.foot[1])); if ((cover === 'covered' && !roof) || (cover === 'open' && roof)) {valid = false; break;}}
  }
  broadCache.set(key, valid); return valid;
 }
 function witnesses(path: number[]): TopologyWitness[] | null {
  if (!input.criteria.supported) return null;
  const found: TopologyWitness[] = [];
  const add = (kind: TopologyWitness['kind'], routeIndices: number[], structural: number[], measurements: TopologyWitness['measurements']) => found.push({kind, routeIndices, supportTriangleIds: [...new Set(routeIndices.flatMap(i => nodes[path[i]].assessment.supportTriangleIds))], structuralTriangleIds: [...new Set(structural.filter(id => id >= 0))], measurements});
  function sustained(kind: TopologyWitness['kind'], predicate: (id: number) => boolean, minimum = 1) {
   let start = -1, length = 0;
   for (let i = 0; i < path.length; i++) {if (!predicate(path[i])) {start = -1; length = 0; continue;} if (start < 0) start = i; else length += distance(nodes[path[i - 1]].assessment.eye, nodes[path[i]].assessment.eye);
    if (length + 1e-7 >= minimum) {const indices = Array.from({length: i - start + 1}, (_, j) => start + j), fs = indices.map(j => feature(path[j])); add(kind, indices, fs.flatMap(f => [...f.roofs.map(h => h.id), ...f.sides.map(h => h?.id ?? -1)]), {continuousDistance: length, minimumRoofCoverage: Math.min(...fs.map(f => f.roofs.length / 9)), maximumRoofHeight: Math.max(0, ...fs.flatMap(f => f.roofs.map(h => h.distance))), declaredMinimumWidth: input.criteria.requirements.minimumWidth, broadCenterlineDiameter: kind === 'broad-covered-interior' || kind === 'open-courtyard' || input.criteria.requirements.minimumWidth > 0.6 ? 2.4 : 0, minimumBoundaryDirections: Math.min(...fs.map(f => f.sides.filter(Boolean).length))}); return true;}}
   return false;
  }
  for (const kind of input.criteria.required) {
   if (kind === 'enclosed-passage') {if (!sustained(kind, id => {const f = feature(id); const wideOpposing = [[0, 1], [2, 3]].some(([a, b]) => f.sides[a] && f.sides[b] && f.sides[a]!.distance + f.sides[b]!.distance >= input.criteria.requirements.minimumWidth); return wideOpposing && (input.criteria.requirements.minimumWidth <= 0.6 || broad(id)) && (!input.criteria.requirements.covered || f.roofs.length === 9);})) return null;}
   if (kind === 'open-courtyard') {if (!sustained(kind, id => {const f = feature(id); return f.roofs.length === 0 && f.sides.filter(Boolean).length >= 3 && broad(id, 'open') && nodes[id].assessment.foot[1] - bounds.min[1] <= 0.75;})) return null;}
   if (kind === 'broad-covered-interior') {if (!sustained(kind, id => {const f = feature(id); return f.roofs.length === 9 && f.sides.filter(Boolean).length >= 2 && broad(id, 'covered');})) return null;}
   if (kind === 'doorway-crossing') {
    let accepted = false;
    for (let i = 1; i < path.length - 1 && !accepted; i++) {
     const p = nodes[path[i]].assessment.foot, f = feature(path[i]); if (f.roofs.length !== 9) continue;
     for (const axis of [[1, 0, 0], [0, 0, 1]] as Vec3[]) {
      const lateral: Vec3 = [-axis[2], 0, axis[0]], l = ray([p[0], p[1] + 0.9, p[2]], lateral, 3), r = ray([p[0], p[1] + 0.9, p[2]], [-lateral[0], 0, -lateral[2]], 3); if (!l || !r || l.distance + r.distance < input.criteria.requirements.minimumWidth) continue;
      const signed = (j: number) => (nodes[path[j]].assessment.foot[0] - p[0]) * axis[0] + (nodes[path[j]].assessment.foot[2] - p[2]) * axis[2];
      let before = -1, after = -1;
      for (let j = i - 1; j >= 0; j--) if (Math.abs(signed(j)) >= 0.8) {before = j; break;}
      for (let j = i + 1; j < path.length; j++) if (Math.abs(signed(j)) >= 0.8) {after = j; break;}
      if (before < 0 || after < 0 || signed(before) * signed(after) >= 0) continue;
      // Actual aperture: flanking material and lintel here, expanded/open space on BOTH sides.
      const wider = [before, after].every(j => {const q = nodes[path[j]].assessment.foot, a = ray([q[0], q[1] + 0.9, q[2]], lateral, 3), b = ray([q[0], q[1] + 0.9, q[2]], [-lateral[0], 0, -lateral[2]], 3); return !a || !b || a.distance + b.distance >= l.distance + r.distance + 0.5;});
      if (!wider) continue;
      add(kind, [before, i, after], [l.id, r.id, ...f.roofs.map(h => h.id)], {apertureWidth: l.distance + r.distance, beforeSignedDistance: signed(before), afterSignedDistance: signed(after), crossingAxis: axis, roofCoverage: 1, opensOnBothSides: true}); accepted = true; break;
     }
    }
    if (!accepted) return null;
   }
   if (kind === 'elevated-bridge') {
    let accepted = false;
    for (const axis of [[1, 0, 0], [0, 0, 1]] as Vec3[]) {
     let start = -1, len = 0; const lateral: Vec3 = [-axis[2], 0, axis[0]];
     for (let i = 0; i < path.length; i++) {
      const p = nodes[path[i]].assessment.foot, f = feature(path[i]); let valid = p[1] - bounds.min[1] >= 0.75;
      const drops: number[] = [];
      for (const sign of [-1, 1]) {let edge = 0;
       for (let t = 0.4; t <= 2.5; t += 0.2) if (!nav.floors(p[0] + lateral[0] * t * sign, p[2] + lateral[2] * t * sign, p[1] - 0.3, p[1] + 0.25).length) {edge = t; break;}
       drops.push(edge); if (!edge) valid = false;
       // A roof above enclosing building walls is not a deck over a void.
       if (ray([p[0], p[1] - 0.6, p[2]], [lateral[0] * sign, 0, lateral[2] * sign], edge || 2.5)) valid = false;
      }
      if (drops[0] + drops[1] - 0.4 < input.criteria.requirements.minimumWidth) valid = false;
      const below = ray([p[0], p[1] - 0.55, p[2]], [0, -1, 0], 0.2); if (below) valid = false;
      if (!valid) {start = -1; len = 0; continue;} if (start < 0) start = i; else len += distance(nodes[path[i - 1]].assessment.eye, nodes[path[i]].assessment.eye);
      const q = nodes[path[start]].assessment.foot, longitudinal = Math.abs((p[0] - q[0]) * axis[0] + (p[2] - q[2]) * axis[2]);
      if (longitudinal >= 3 - 1e-7) {const ids = Array.from({length: i - start + 1}, (_, j) => start + j); add(kind, ids, [], {continuousDistance: len, longitudinalDisplacement: longitudinal, elevationAboveSourceMinimum: p[1] - bounds.min[1], transverseEdgeDistances: drops, lowerBodyVoid: true, crossingAxis: axis}); accepted = true; break;}
     }
     if (accepted) break;
    }
    if (!accepted) return null;
   }
  }
  if (input.criteria.requirements.opposingWalls && !input.criteria.required.includes('enclosed-passage') && !sustained('explicit-walls', id => {const f = feature(id); return !!(f.sides[0] && f.sides[1]) || !!(f.sides[2] && f.sides[3]);})) return null;
  if (input.criteria.requirements.openSky && !input.criteria.required.includes('open-courtyard') && !sustained('explicit-open-sky', id => feature(id).roofs.length === 0)) return null;
  if (input.criteria.requirements.covered && !sustained('explicit-cover', id => feature(id).roofs.length === 9)) return null;
  if (diagnostics.exhausted.includes('topology-queries')) return null;
  return found;
 }
 let selected: number[] = [], selectedApproach: ReturnType<typeof makeApproach> = null, selectedDirection: Vec3 | null = null, topologyWitnesses: TopologyWitness[] = [], maximumConnectedDisplacement = 0;
 const exploredNodes = new Set<number>();
 for (const entry of selectedEntries) {
  if (!input.criteria.supported || diagnostics.candidateRoutes >= BUDGETS.candidateRoutes || diagnostics.exhausted.includes('topology-queries')) break;
  diagnostics.entriesTested++;
  const approach = makeApproach(entry); if (!approach) continue;
  if (!exploredNodes.has(entry.id)) diagnostics.componentsExplored++;
  const previous = new Map<number, number>([[entry.id, -1]]), queue = [entry.id];
  for (let at = 0; at < queue.length; at++) {
   const id = queue[at], displacement = distance(nodes[id].assessment.eye, nodes[entry.id].assessment.eye); exploredNodes.add(id); maximumConnectedDisplacement = Math.max(maximumConnectedDisplacement, displacement);
   if (displacement >= 3 - 1e-7 && (input.searchMode === 'legacy' || (nodes[id].ix + nodes[id].iz) % 2 === 0)) {
    if (++diagnostics.candidateRoutes > BUDGETS.candidateRoutes) {exhaust('candidate-routes'); break;}
    const path: number[] = []; let cursor = id; while (cursor >= 0) {path.push(cursor); cursor = previous.get(cursor)!;} path.reverse();
    const witness = witnesses(path);
    if (witness) {
     if (diagnostics.approachBuilds >= BUDGETS.approachBuilds) {exhaust('approach-builds'); break;} diagnostics.approachBuilds++;
     const crossing = createSurfaceNavigator(input.mesh, input.transform, options, approach.approach), eye = nodes[entry.id].assessment.eye, start = approach.approachStart;
     const f = crossing.move(start, [eye[0] - start[0], 0, eye[2] - start[2]]), r = crossing.move(eye, [start[0] - eye[0], 0, start[2] - eye[2]]);
     if (!f.blocked && !r.blocked && distance(f.position, eye) < 1e-6 && distance(r.position, start) < 1e-6) {selected = path; topologyWitnesses = witness; selectedApproach = approach; selectedDirection = entry.direction;} else reject('authored-to-generated-seam');
     break;
    }
   }
   for (const next of neighbors(id)) if (!previous.has(next)) {previous.set(next, id); queue.push(next);}
  }
  if (selected.length || diagnostics.exhausted.includes('approach-builds')) break;
 }
 const route = selected.map(id => nodes[id].assessment.eye), samples: PassageSample[] = [];
 for (let i = 0; i < route.length; i++) {
  if (!i) {samples.push({...nodes[selected[i]].assessment, enclosure: feature(selected[i]).enclosure}); continue;}
  const from = route[i - 1], to = route[i], steps = Math.max(1, Math.ceil(distance(from, to) / options.sampleStep)); let eye = from;
  for (let step = 0; step < steps; step++) {const movement = nav.move(eye, [(to[0] - from[0]) / steps, 0, (to[2] - from[2]) / steps]); if (movement.blocked) throw new Error('Accepted interpretation edge failed replay'); eye = movement.position; samples.push({...movement.support, enclosure: nav.enclosure(eye)});}
 }
 let continuousEnclosedDistance = 0, current = 0;
 for (let i = 1; i < samples.length; i++) {current = samples[i - 1].enclosure.enclosed && samples[i].enclosure.enclosed ? current + distance(samples[i - 1].eye, samples[i].eye) : 0; continuousEnclosedDistance = Math.max(continuousEnclosedDistance, current);}
 if (selectedApproach) diagnostics.routeCrossesBehindSeam = route.some(p => (p[0] - selectedApproach!.seam[0]) * selectedDirection![0] + (p[2] - selectedApproach!.seam[2]) * selectedDirection![2] > 0.01);
 return {schemaVersion: 1, sourceSha256: null, status: route.length ? 'passed' : 'failed', transform: input.transform, options, bounds, route, samples, entry: route[0] ?? null, approachDirection: selectedDirection, seam: selectedApproach?.seam ?? null, approach: selectedApproach?.approach ?? null, approachStart: selectedApproach?.approachStart ?? null, approachVerified: selectedApproach !== null, shellComparison: null,
  metrics: {...nav.metrics, gridPitch: pitch, testedFloorPoints, supportedPoints: nodes.length, enclosurePoints: [...features.values()].filter(f => f.enclosure.enclosed).length, entryCandidates: entries.length, rejected, routeLength: route.slice(1).reduce((n, p, i) => n + distance(p, route[i]), 0), routeDisplacement: route.length ? distance(route[0], route.at(-1)!) : 0, continuousEnclosedDistance, maximumConnectedDisplacement, buildMs: built - started, assessmentMs: performance.now() - started},
  reasons: route.length ? [] : [!input.criteria.supported ? 'Intent has no supported topology criteria.' : 'No exterior-entered, reversible original-supported route with >=3m displacement and all declared topology witnesses was found within the reported budgets.'],
  limitations: ['Synthetic-frozen bounded proposal search; failure does not prove geometry irreparable.', 'Original triangles and corrected navigator are unchanged. Scaffolding excludes the entire source XZ projection beyond a 2mm contact-boundary tolerance.', 'Witnesses are geometric operational definitions, not semantic recognition. Courtyards must be within 0.75m of source minimum height; bridge-like detached roof slabs can be geometrically indistinguishable from decks.', 'Exterior proposals require a clear projected corridor all the way beyond the global bounds, so scaffolding cannot seed an internal hole. This can conservatively reject exteriors behind detached source fragments.', 'Doorway flank rays are limited to 3m on each side; broader apertures may be missed. Deck edges must be within 2.5m on each side.', 'Topology witnesses use 0.2m route vertices and original ray triangle IDs; dense samples independently preserve support/body checks. Legacy Enclosure fields retain their old 6m roof range on dense samples; tall roofs are recorded in topologyWitnesses.', 'Enclosure-point count covers queried witness nodes only. Component count is reached-entry components, not an exhaustive mesh decomposition.'], criteria: input.criteria, topologyWitnesses, searchDiagnostics: diagnostics};
}
