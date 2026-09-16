import {createSurfaceNavigator, type AuthoredApproach, type Enclosure, type PassageTransform, type SupportAssessment, type TriangleMesh, type Vec3} from '../../apps/web/src/generated-passage/navigation.ts';
import type {PassageAssessment, PassageSample} from '../passage-geometry.ts';
import type {SpatialCriteria, SpatialKind} from '../interpretation/criteria.ts';
import type {TraceSink} from './trace.ts';
import {assessDiagnosedSpace as assessPredecessorSpace} from './routes-entry.ts';
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
function topologyIndex(mesh: TriangleMesh, transform: PassageTransform, bounds: PassageAssessment['bounds'], emit: TraceSink) {
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
  if (references > BUDGETS.topologyIndexReferences) {emit({stage: 'budget', kind: 'index-reference-limit', triangleId: id, observed: references, maximum: BUDGETS.topologyIndexReferences}); throw new Error('Topology index reference budget exceeded');}
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
 function scaffoldOutside(approach: AuthoredApproach, proposalId: string) {
  const {seam, outward: d, width: w, length: l} = approach;
  const low = seam[1] - 0.25, high = seam[1] + 1.8;
  const corners = [0, l].flatMap(t => [-w / 2, w / 2].map(r => [seam[0] + d[0] * t - d[2] * r, seam[2] + d[2] * t + d[0] * r]));
  let clear = true, testedTriangles = 0, outsideHeightBand = 0;
  // Query all original XZ candidates. Do not use the Float32 Y bounds for proof:
  // exact transformed vertex coordinates decide the conservative height band.
  query(Math.min(...corners.map(p => p[0])), Math.max(...corners.map(p => p[0])), Math.min(...corners.map(p => p[1])), Math.max(...corners.map(p => p[1])), -Infinity, Infinity, id => {
   testedTriangles++;
   const triangle = [vertex(id * 3), vertex(id * 3 + 1), vertex(id * 3 + 2)];
   if (Math.max(...triangle.map(p => p[1])) < low || Math.min(...triangle.map(p => p[1])) > high) {outsideHeightBand++; return;}
   let polygon = triangle.map(p => {const x = p[0] - seam[0], z = p[2] - seam[2]; return [x * d[0] + z * d[2], -x * d[2] + z * d[0], p[1]];});
   for (const [axis, limit, sign] of [[0, 0.002, 1], [0, l, -1], [1, -w / 2, 1], [1, w / 2, -1], [2, low, 1], [2, high, -1]]) {
    const next: number[][] = [];
    for (let k = 0; k < polygon.length; k++) {
     const a = polygon[k], b = polygon[(k + 1) % polygon.length], ia = (a[axis] - limit) * sign >= 0, ib = (b[axis] - limit) * sign >= 0;
     if (ia) next.push(a);
     if (ia !== ib) {const t = (limit - a[axis]) / (b[axis] - a[axis]); next.push(a.map((v, i) => v + (b[i] - v) * t));}
    }
    polygon = next;
   }
   // A clipped point/line still blocks: vertical zero-area XZ walls are solid.
   if (polygon.length) {
    emit({stage: 'prescreen', kind: 'entry-prism-blocked', proposalId, triangleId: id, triangle, clippedPrismCoordinates: polygon, approach, supportBand: [low, seam[1] + 0.015], bodyBand: [seam[1] + 0.015, high], contactBoundaryTolerance: 0.002});
    clear = false; return false;
   }
  });
  emit({stage: 'prescreen', kind: 'entry-prism-proof', proposalId, clear, scanComplete: clear, testedTriangles, outsideHeightBand, approach, heightBand: [low, high], includesDegenerateIntersections: true});
  return clear;
 }

 return {ray, scaffoldOutside, triangle: (id: number) => [vertex(id * 3), vertex(id * 3 + 1), vertex(id * 3 + 2)]};
}

type Node = {assessment: SupportAssessment; ix: number; iz: number};
type Entry = {id: number; direction: Vec3};
function assessFairSpace(input: {mesh: TriangleMesh; transform: PassageTransform; criteria: SpatialCriteria; searchMode: 'legacy' | 'expanded'; trace?: TraceSink}): InterpretedSpaceAssessment {
 // Clone observations at the boundary: sinks cannot mutate acceptance state. Errors propagate.
 const emit: TraceSink = input.trace ? event => input.trace!(structuredClone(event)) : () => {};
 let activeRouteId: number | null = null, activeProposalId: string | null = null;
 const proposalId = (entry: Entry) => `${entry.id}:${directions.findIndex(d => d[0] === entry.direction[0] && d[2] === entry.direction[2])}`;
 emit({stage: 'result', kind: 'assessment-start', transform: input.transform, criteria: input.criteria, searchMode: input.searchMode, budgets: BUDGETS});
 const started = performance.now(), nav = createSurfaceNavigator(input.mesh, input.transform), {bounds, options} = nav;
 const index = topologyIndex(input.mesh, input.transform, bounds, emit), built = performance.now(), pitch = 0.2;
 const diagnostics: InterpretedSpaceAssessment['searchDiagnostics'] = {mode: input.searchMode, budgets: BUDGETS, exhausted: [], componentsExplored: 0, entriesTested: 0, edgesTested: 0, candidateRoutes: 0, topologyQueries: 0, approachBuilds: 0, routeCrossesBehindSeam: false};
 const exhaust = (reason: string) => {if (!diagnostics.exhausted.includes(reason)) {diagnostics.exhausted.push(reason); emit({stage: 'budget', kind: 'exhausted', reason, proposalId: activeProposalId, routeId: activeRouteId, diagnostics});}};
 const rejected: Record<string, number> = {}, reject = (reason: string) => {rejected[reason] = (rejected[reason] ?? 0) + 1;};
 const nx = Math.ceil((bounds.max[0] - bounds.min[0]) / pitch), nz = Math.ceil((bounds.max[2] - bounds.min[2]) / pitch), nodes: Node[] = [], cells = new Map<string, number[]>(); let testedFloorPoints = 0;
 emit({stage: 'support', kind: 'grid', bounds, gridPitch: pitch, columns: (nx + 1) * (nz + 1), nx, nz, maximumColumns: BUDGETS.gridCells});
 if ((nx + 1) * (nz + 1) > BUDGETS.gridCells) exhaust('grid-cells');
 else outer: for (let iz = 0; iz <= nz; iz++) for (let ix = 0; ix <= nx; ix++) {
  const x = bounds.min[0] + ix * pitch, z = bounds.min[2] + iz * pitch, hits = nav.floors(x, z);
  emit({stage: 'support', kind: 'column', ix, iz, x, z, hits});
  if (hits.length > BUDGETS.layersPerColumn) {exhaust('layers-per-column'); continue;}
  for (const hit of hits) {
   testedFloorPoints++; const assessment = nav.assess([x, hit.y + options.eyeHeight, z]);
   if (!assessment.valid) {emit({stage: 'support', kind: 'rejected', ix, iz, hit, assessment}); reject(assessment.reason ?? 'unknown'); continue;}
   const key = `${ix},${iz}`, existing = cells.get(key) ?? [];
   if (existing.some(id => Math.abs(nodes[id].assessment.eye[1] - assessment.eye[1]) < 0.05)) {emit({stage: 'support', kind: 'duplicate-layer', ix, iz, assessment, existingNodeIds: existing, maximumEyeDifference: 0.05}); continue;}
   existing.push(nodes.length); cells.set(key, existing); nodes.push({assessment, ix, iz}); emit({stage: 'support', kind: 'node', nodeId: nodes.length - 1, ix, iz, assessment});
   if (nodes.length >= BUDGETS.supportedNodes) {exhaust('supported-nodes'); break outer;}
  }
 }
 const ray = (p: Vec3, d: Vec3, max: number) => {if (diagnostics.topologyQueries >= BUDGETS.topologyQueries) {exhaust('topology-queries'); emit({stage: 'topology', kind: 'ray-not-executed', routeId: activeRouteId, origin: p, direction: d, maximum: max, reason: 'budget'}); return null;} diagnostics.topologyQueries++; const hit = index.ray(p, d, max); emit({stage: 'topology', kind: 'ray', queryId: diagnostics.topologyQueries, routeId: activeRouteId, origin: p, direction: d, maximum: max, hit, point: hit ? p.map((v, i) => v + d[i] * hit.distance) : null}); return hit;};
 type Feature = {roofs: RayHit[]; sides: (RayHit | null)[]; enclosure: Enclosure};
 const features = new Map<number, Feature>();
 function feature(id: number): Feature {
  const cached = features.get(id); if (cached) return cached;
  const foot = nodes[id].assessment.foot, roofs: RayHit[] = [];
  for (const [dx, dz] of [[0, 0], ...Array.from({length: 8}, (_, i) => [Math.cos(i * Math.PI / 4) * options.radius, Math.sin(i * Math.PI / 4) * options.radius])]) {const hit = ray([foot[0] + dx, foot[1] + options.height - 0.001, foot[2] + dz], [0, 1, 0], Math.max(0, bounds.max[1] - foot[1])); if (hit) roofs.push({...hit, distance: hit.distance + options.height - 0.001});}
  const sides = directions.map(d => ray([foot[0], foot[1] + 0.9, foot[2]], d, 12));
  const enclosed = roofs.length === 9 || !!(sides[0] && sides[1]) || !!(sides[2] && sides[3]);
  const result = {roofs, sides, enclosure: {roofTriangleId: roofs.length === 9 ? roofs[0].id : null, roofTriangleIds: [...new Set(roofs.map(h => h.id))], roofCoverage: roofs.length / 9, maximumRoofHeight: roofs.length ? Math.max(...roofs.map(h => h.distance)) : null, sideTriangleIds: sides.map(h => h?.id ?? -1), enclosed}};
  features.set(id, result); emit({stage: 'topology', kind: 'node-feature', nodeId: id, foot, roofs, sides, enclosure: result.enclosure, radius: options.radius, sideRayHeight: 0.9, sideRayRange: 12}); return result;
 }
 const edges = new Map<string, boolean>();
 function connected(a: number, b: number) {
  const key = a < b ? `${a}:${b}` : `${b}:${a}`, cached = edges.get(key); if (cached !== undefined) return cached;
  if (diagnostics.edgesTested >= BUDGETS.edges) {exhaust('edges'); return false;} diagnostics.edgesTested++;
  const p = nodes[a].assessment.eye, q = nodes[b].assessment.eye;
  let movements: {forward: ReturnType<typeof nav.move>; reverse: ReturnType<typeof nav.move>} | null = null;
  let valid = Math.abs(p[1] - q[1]) <= options.maxStep + pitch * Math.tan(options.maxSlopeDegrees * Math.PI / 180);
  if (valid) {const f = nav.move(p, [q[0] - p[0], 0, q[2] - p[2]]), r = nav.move(q, [p[0] - q[0], 0, p[2] - q[2]]); movements = {forward: f, reverse: r}; valid = !f.blocked && !r.blocked && distance(f.position, q) < 1e-6 && distance(r.position, p) < 1e-6;}
  edges.set(key, valid); emit({stage: 'edge', kind: 'tested', edgeId: key, fromNodeId: a, toNodeId: b, from: p, to: q, heightDifference: Math.abs(p[1] - q[1]), maximumHeightDifference: options.maxStep + pitch * Math.tan(options.maxSlopeDegrees * Math.PI / 180), endpointTolerance: 1e-6, movements, movementsExecuted: movements !== null, valid}); return valid;
 }
 function neighbors(id: number) {const n = nodes[id], result: number[] = []; for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (const other of cells.get(`${n.ix + dx},${n.iz + dz}`) ?? []) if (connected(id, other)) result.push(other); return result;}
 function makeApproach(entry: Entry) {
  const eye = nodes[entry.id].assessment.eye, foot = eye[1] - options.eyeHeight, d = entry.direction;
  let contactPhase = 'scan';
  const contactAt = (t: number) => {const x = eye[0] + d[0] * t, z = eye[2] + d[2] * t, hits = nav.floors(x, z, foot - options.maxStep, foot + options.maxStep); emit({stage: 'prescreen', kind: 'edge-support-probe', proposalId: proposalId(entry), phase: contactPhase, t, x, z, low: foot - options.maxStep, high: foot + options.maxStep, hits, selectedHit: hits[0] ?? null}); return hits[0];};
  let inside = 0, outside = 0;
  while (outside < 1.5 && contactAt(outside)) {inside = outside; outside += 0.025;}
  if (outside >= 1.5) {emit({stage: 'prescreen', kind: 'support-edge-not-found', proposalId: proposalId(entry), eye, outward: d, inside, outside, maximumScan: 1.5, unexecuted: ['projection', 'body-prescreen', 'final-seam']}); return null;}
  contactPhase = 'bisection';
  for (let i = 0; i < 24; i++) {const mid = (inside + outside) / 2; if (contactAt(mid)) inside = mid; else outside = mid;}
  contactPhase = 'final';
  const contact = contactAt(inside); if (!contact) {emit({stage: 'prescreen', kind: 'edge-contact-missing', proposalId: proposalId(entry), eye, outward: d, inside, outside, unexecuted: ['projection', 'body-prescreen', 'final-seam']}); return null;}
  const seam: Vec3 = [eye[0] + d[0] * inside, contact.y, eye[2] + d[2] * inside];
  const distanceToBounds = d[0] < 0 ? seam[0] - bounds.min[0] : d[0] > 0 ? bounds.max[0] - seam[0] : d[2] < 0 ? seam[2] - bounds.min[2] : bounds.max[2] - seam[2];
  const startDistance = Math.max(1.2, distanceToBounds + options.radius + 0.1), length = Math.max(2, startDistance + options.radius);
  if (length > 10) {emit({stage: 'prescreen', kind: 'exterior-approach-limit', proposalId: proposalId(entry), seam, distanceToBounds, startDistance, requiredLength: length, maximumLength: 10, unexecuted: ['projection', 'body-prescreen', 'final-seam']}); reject('exterior-approach-length-limit'); return null;}
  const approach: AuthoredApproach = {seam, outward: d, width: 1.2, length};
  const approachStart: Vec3 = [seam[0] + d[0] * startDistance, seam[1] + options.eyeHeight, seam[2] + d[2] * startDistance];
  emit({stage: 'prescreen', kind: 'projection-start', proposalId: proposalId(entry), eye, contact, seam, approach, distanceToBounds, startDistance, approachStart, bodyMarginBeyondBounds: startDistance - distanceToBounds - options.radius});
  if (!index.scaffoldOutside(approach, proposalId(entry))) {emit({stage: 'prescreen', kind: 'rejected', proposalId: proposalId(entry), firstFailure: 'source-entry-prism', unexecuted: ['body-prescreen', 'final-seam']}); reject('scaffold-intersects-support-or-body-prism'); return null;}
  for (let t = 0; t <= inside + 1.5; t += options.sampleStep) {const position: Vec3 = [eye[0] + d[0] * t, foot, eye[2] + d[2] * t], triangleId = nav.bodyBlock(position); emit({stage: 'prescreen', kind: 'body-sample', proposalId: proposalId(entry), t, position, triangleId, triangle: triangleId !== null ? index.triangle(triangleId) : null, valid: triangleId === null}); if (triangleId !== null) {emit({stage: 'prescreen', kind: 'rejected', proposalId: proposalId(entry), firstFailure: 'body-obstruction', triangleId, triangle: index.triangle(triangleId), position, unexecuted: ['remaining-body-samples', 'final-seam']}); return null;}}
  emit({stage: 'prescreen', kind: 'passed', proposalId: proposalId(entry), seam, approach});
  return {seam, approach, approachStart};
 }
 const entries: Entry[] = [];
 for (let id = 0; id < nodes.length; id++) {
  const n = nodes[id], eye = n.assessment.eye;
  for (const d of directions) {
   if (input.searchMode === 'legacy') {
    const gap = d[0] < 0 ? eye[0] - bounds.min[0] : d[0] > 0 ? bounds.max[0] - eye[0] : d[2] < 0 ? eye[2] - bounds.min[2] : bounds.max[2] - eye[2];
    if (gap > options.radius + pitch * 2.1) {emit({stage: 'proposal', kind: 'direction-excluded', proposalId: proposalId({id, direction: d}), nodeId: id, direction: d, reason: 'aabb-distance', gap, maximum: options.radius + pitch * 2.1}); continue;}
    let free = true; for (let t = 0; t <= gap + options.radius + 0.1; t += options.sampleStep) {const position: Vec3 = [eye[0] + d[0] * t, eye[1] - options.eyeHeight, eye[2] + d[2] * t], triangleId = nav.bodyBlock(position); emit({stage: 'proposal', kind: 'legacy-body-sample', proposalId: proposalId({id, direction: d}), t, position, triangleId, triangle: triangleId !== null ? index.triangle(triangleId) : null}); if (triangleId !== null) {free = false; break;}}
    if (free) {entries.push({id, direction: d}); const directionIndex = directions.indexOf(d); emit({stage: 'proposal', kind: 'eligible', proposalId: proposalId(entries.at(-1)!), nodeId: id, direction: d, rasterIndex: entries.length - 1}); for (const omitted of directions.slice(directionIndex + 1)) emit({stage: 'proposal', kind: 'direction-unexecuted', proposalId: proposalId({id, direction: omitted}), nodeId: id, direction: omitted, reason: 'legacy-first-eligible-direction'}); break;} else emit({stage: 'proposal', kind: 'direction-excluded', proposalId: proposalId({id, direction: d}), nodeId: id, direction: d, reason: 'legacy-body-obstruction'});
   } else {
    // Local boundary proposals include recessed/L-shaped exteriors and every support layer.
    const nearby = cells.get(`${n.ix + d[0]},${n.iz + d[2]}`) ?? [];
    if (!nearby.some(other => Math.abs(nodes[other].assessment.foot[1] - n.assessment.foot[1]) <= options.maxStep)) {entries.push({id, direction: d}); emit({stage: 'proposal', kind: 'eligible', proposalId: proposalId(entries.at(-1)!), nodeId: id, direction: d, rasterIndex: entries.length - 1});} else emit({stage: 'proposal', kind: 'direction-excluded', proposalId: proposalId({id, direction: d}), nodeId: id, direction: d, reason: 'same-layer-grid-neighbor', nearbyNodeIds: nearby, maximumHeightDifference: options.maxStep});
   }
  }
 }
 const entryBudget = input.searchMode === 'legacy' ? BUDGETS.legacyEntries : BUDGETS.expandedEntries;
 // Legacy uses the identical raster-index spread. Expanded prioritizes spatial diversity,
 // including Y, so a large base cannot monopolize proposals for a disconnected deck.
 let selectedEntries: Entry[]; const proposalScores = new Map<Entry, number>();
 if (input.searchMode === 'legacy') selectedEntries = entries.length <= entryBudget ? entries : Array.from({length: entryBudget}, (_, i) => entries[Math.floor(i * entries.length / entryBudget)]);
 else {
  selectedEntries = []; const remaining = entries.slice(), nearest = new Map<Entry, number>();
  while (remaining.length && selectedEntries.length < entryBudget) {
   let best = 0, score = -1;
   for (let i = 0; i < remaining.length; i++) {const e = remaining[i], p = nodes[e.id].assessment.eye, previous = selectedEntries.at(-1), q = previous ? nodes[previous.id].assessment.eye : p;
    const d = previous ? Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) + (e.direction[0] !== previous.direction[0] || e.direction[2] !== previous.direction[2] ? 0.2 : 0) : Infinity;
    const value = Math.min(nearest.get(e) ?? Infinity, d); nearest.set(e, value); proposalScores.set(e, value); if (value > score) {score = value; best = i;}}
   selectedEntries.push(remaining.splice(best, 1)[0]); emit({stage: 'proposal', kind: 'rank-selection', rank: selectedEntries.length - 1, proposalId: proposalId(selectedEntries.at(-1)!), score: Number.isFinite(score) ? score : 'Infinity', remainingCount: remaining.length, policy: 'farthest-XYZ-with-direction-offset'});
  }
 }
 const ranks = new Map(selectedEntries.map((entry, rank) => [entry, rank]));
 for (const entry of entries) emit({stage: 'proposal', kind: ranks.has(entry) ? 'selected' : 'omitted', proposalId: proposalId(entry), nodeId: entry.id, direction: entry.direction, rank: ranks.get(entry) ?? null, lastObservedRankingScore: proposalScores.has(entry) ? (Number.isFinite(proposalScores.get(entry)!) ? proposalScores.get(entry) : 'Infinity') : null, rankingPolicy: input.searchMode === 'legacy' ? 'raster-spread' : 'farthest-XYZ-with-direction-offset', reason: ranks.has(entry) ? 'within-budget' : 'entry-cap', maximum: entryBudget});
 if (entries.length > entryBudget) exhaust('entry-proposals');
 const broadCache = new Map<string, boolean>();
 function broad(id: number, cover?: 'open' | 'covered') {
  const key = `${id}:${cover ?? 'support'}`; if (broadCache.has(key)) return broadCache.get(key)!;
  const probes: unknown[] = [];
  const p = nodes[id].assessment.eye, radius = Math.max(1.2, input.criteria.requirements.minimumWidth / 2); let valid = true;
  for (let i = 0; i < 8; i++) {
   const dx = Math.cos(i * Math.PI / 4) * radius, dz = Math.sin(i * Math.PI / 4) * radius, end: Vec3 = [p[0] + dx, p[1], p[2] + dz], f = nav.move(p, [dx, 0, dz]);
   if (f.blocked || distance(f.position, end) > 1e-6) {probes.push({probeIndex: i, end, movement: f, endpointDistance: distance(f.position, end), firstFailure: f.blocked ? 'radial-movement-blocked' : 'radial-endpoint', unexecuted: ['roof-ray', 'remaining-radial-probes']}); valid = false; break;}
   if (cover) {const roof = ray([end[0], f.support.foot[1] + options.height - 0.001, end[2]], [0, 1, 0], Math.max(0, bounds.max[1] - f.support.foot[1])); probes.push({probeIndex: i, end, movement: f, roof}); if ((cover === 'covered' && !roof) || (cover === 'open' && roof)) {valid = false; break;}} else probes.push({probeIndex: i, end, movement: f, roofExecuted: false});
  }
  broadCache.set(key, valid); emit({stage: 'topology', kind: 'broad-feature', featureKey: key, nodeId: id, cover: cover ?? null, radius, endpointTolerance: 1e-6, valid, probes, unexecutedProbeIndices: Array.from({length: 8 - probes.length}, (_, i) => probes.length + i)}); return valid;
 }
 function nodeChecks(nodeId: number, topology: string, checks: {name: string; test: () => boolean; measured?: unknown; threshold?: unknown}[]) {
  const observations: unknown[] = []; let valid = true, firstFailure: string | null = null;
  for (const check of checks) {
   if (!valid) {observations.push({name: check.name, status: 'not-evaluated'}); continue;}
   const passed = check.test(); observations.push({name: check.name, status: passed ? 'passed' : 'failed', measured: check.measured, threshold: check.threshold});
   if (!passed) {valid = false; firstFailure = check.name;}
  }
  emit({stage: 'topology', kind: 'node-predicate', routeId: activeRouteId, nodeId, topology, valid, firstFailure, checks: observations}); return valid;
 }
 function witnesses(path: number[]): TopologyWitness[] | null {
  if (!input.criteria.supported) {emit({stage: 'topology', kind: 'criteria-unsupported', routeId: activeRouteId}); return null;}
  const found: TopologyWitness[] = [], completed: string[] = [];
  const requirements: string[] = [...input.criteria.required];
  if (input.criteria.requirements.opposingWalls && !input.criteria.required.includes('enclosed-passage')) requirements.push('explicit-walls');
  if (input.criteria.requirements.openSky && !input.criteria.required.includes('open-courtyard')) requirements.push('explicit-open-sky');
  if (input.criteria.requirements.covered) requirements.push('explicit-cover');
  const failed = (topology: string) => {emit({stage: 'topology', kind: 'route-rejected', routeId: activeRouteId, firstFailingTopology: topology, completed, unexecutedRequirements: requirements.filter(kind => kind !== topology && !completed.includes(kind)), observationsAreFirstFailureNotExhaustive: true}); return null;};
  const add = (kind: TopologyWitness['kind'], routeIndices: number[], structural: number[], measurements: TopologyWitness['measurements']) => {found.push({kind, routeIndices, supportTriangleIds: [...new Set(routeIndices.flatMap(i => nodes[path[i]].assessment.supportTriangleIds))], structuralTriangleIds: [...new Set(structural.filter(id => id >= 0))], measurements}); completed.push(kind); emit({stage: 'topology', kind: 'witness', routeId: activeRouteId, witness: found.at(-1)});};
  function sustained(kind: TopologyWitness['kind'], predicate: (id: number) => boolean, minimum = 1) {
   let start = -1, length = 0, maximumObservedContinuousDistance = 0;
   for (let i = 0; i < path.length; i++) {const valid = predicate(path[i]); emit({stage: 'topology', kind: 'sustained-sample', routeId: activeRouteId, topology: kind, routeIndex: i, nodeId: path[i], valid}); if (!valid) {start = -1; length = 0; continue;} if (start < 0) start = i; else length += distance(nodes[path[i - 1]].assessment.eye, nodes[path[i]].assessment.eye);
    maximumObservedContinuousDistance = Math.max(maximumObservedContinuousDistance, length);
    if (length + 1e-7 >= minimum) {const indices = Array.from({length: i - start + 1}, (_, j) => start + j), fs = indices.map(j => feature(path[j])); add(kind, indices, fs.flatMap(f => [...f.roofs.map(h => h.id), ...f.sides.map(h => h?.id ?? -1)]), {continuousDistance: length, minimumRoofCoverage: Math.min(...fs.map(f => f.roofs.length / 9)), maximumRoofHeight: Math.max(0, ...fs.flatMap(f => f.roofs.map(h => h.distance))), declaredMinimumWidth: input.criteria.requirements.minimumWidth, broadCenterlineDiameter: kind === 'broad-covered-interior' || kind === 'open-courtyard' || input.criteria.requirements.minimumWidth > 0.6 ? 2.4 : 0, minimumBoundaryDirections: Math.min(...fs.map(f => f.sides.filter(Boolean).length))}); emit({stage: 'topology', kind: 'sustained-result', routeId: activeRouteId, topology: kind, valid: true, maximumObservedContinuousDistance, minimum, tolerance: 1e-7, remainingRouteIndices: path.slice(i + 1).map((_, j) => i + 1 + j), remainingStatus: 'not-evaluated-after-success'}); return true;}}
   emit({stage: 'topology', kind: 'sustained-result', routeId: activeRouteId, topology: kind, valid: false, maximumObservedContinuousDistance, minimum, tolerance: 1e-7}); return false;
  }
  for (const kind of input.criteria.required) {
   if (kind === 'enclosed-passage') {if (!sustained(kind, id => {const f = feature(id); const wideOpposing = [[0, 1], [2, 3]].some(([a, b]) => f.sides[a] && f.sides[b] && f.sides[a]!.distance + f.sides[b]!.distance >= input.criteria.requirements.minimumWidth); return nodeChecks(id, kind, [{name: 'opposing-wall-width', test: () => wideOpposing, measured: f.sides.map(h => h?.distance ?? null), threshold: {minimumWidth: input.criteria.requirements.minimumWidth, pairs: [[0, 1], [2, 3]]}}, {name: 'broad-supported-region', test: () => input.criteria.requirements.minimumWidth <= 0.6 || broad(id), measured: {featureKey: `${id}:support`, bypassWhenWidthAtMost: 0.6}, threshold: input.criteria.requirements.minimumWidth}, {name: 'required-roof-coverage', test: () => !input.criteria.requirements.covered || f.roofs.length === 9, measured: f.roofs.length, threshold: input.criteria.requirements.covered ? 9 : 'not-required'}]);})) return failed(kind);}
   if (kind === 'open-courtyard') {if (!sustained(kind, id => {const f = feature(id); return nodeChecks(id, kind, [{name: 'open-sky', test: () => f.roofs.length === 0, measured: f.roofs.length, threshold: 0}, {name: 'boundary-directions', test: () => f.sides.filter(Boolean).length >= 3, measured: f.sides.filter(Boolean).length, threshold: 3}, {name: 'broad-open-region', test: () => broad(id, 'open'), measured: {featureKey: `${id}:open`}}, {name: 'ground-relative-elevation', test: () => nodes[id].assessment.foot[1] - bounds.min[1] <= 0.75, measured: nodes[id].assessment.foot[1] - bounds.min[1], threshold: 0.75}]);})) return failed(kind);}
   if (kind === 'broad-covered-interior') {if (!sustained(kind, id => {const f = feature(id); return nodeChecks(id, kind, [{name: 'roof-coverage', test: () => f.roofs.length === 9, measured: f.roofs.length, threshold: 9}, {name: 'boundary-directions', test: () => f.sides.filter(Boolean).length >= 2, measured: f.sides.filter(Boolean).length, threshold: 2}, {name: 'broad-covered-region', test: () => broad(id, 'covered'), measured: {featureKey: `${id}:covered`}}]);})) return failed(kind);}
   if (kind === 'doorway-crossing') {
    let accepted = false;
    for (let i = 1; i < path.length - 1 && !accepted; i++) {
     const p = nodes[path[i]].assessment.foot, f = feature(path[i]); if (f.roofs.length !== 9) {emit({stage: 'topology', kind: 'aperture-node', routeId: activeRouteId, nodeId: path[i], routeIndex: i, firstFailure: 'roof-coverage', roofCount: f.roofs.length, required: 9, unexecuted: ['flank-rays', 'crossing-sides', 'wider-regions']}); continue;}
     for (const axis of [[1, 0, 0], [0, 0, 1]] as Vec3[]) {
      const lateral: Vec3 = [-axis[2], 0, axis[0]], l = ray([p[0], p[1] + 0.9, p[2]], lateral, 3), r = ray([p[0], p[1] + 0.9, p[2]], [-lateral[0], 0, -lateral[2]], 3); if (!l || !r || l.distance + r.distance < input.criteria.requirements.minimumWidth) {emit({stage: 'topology', kind: 'aperture-axis', routeId: activeRouteId, nodeId: path[i], routeIndex: i, axis, left: l, right: r, minimumWidth: input.criteria.requirements.minimumWidth, rayMaximum: 3, firstFailure: !l ? 'left-flank' : !r ? 'right-flank' : 'aperture-width', unexecuted: ['crossing-sides', 'wider-regions']}); continue;}
      const signed = (j: number) => (nodes[path[j]].assessment.foot[0] - p[0]) * axis[0] + (nodes[path[j]].assessment.foot[2] - p[2]) * axis[2];
      let before = -1, after = -1;
      for (let j = i - 1; j >= 0; j--) if (Math.abs(signed(j)) >= 0.8) {before = j; break;}
      for (let j = i + 1; j < path.length; j++) if (Math.abs(signed(j)) >= 0.8) {after = j; break;}
      if (before < 0 || after < 0 || signed(before) * signed(after) >= 0) {emit({stage: 'topology', kind: 'aperture-axis', routeId: activeRouteId, nodeId: path[i], routeIndex: i, axis, before, after, beforeSigned: before >= 0 ? signed(before) : null, afterSigned: after >= 0 ? signed(after) : null, minimumSignedMagnitude: 0.8, firstFailure: 'opposite-crossing-sides', unexecuted: ['wider-regions']}); continue;}
      // Actual aperture: flanking material and lintel here, expanded/open space on BOTH sides.
      const sideObservations: unknown[] = [];
      const wider = [before, after].every(j => {const q = nodes[path[j]].assessment.foot, a = ray([q[0], q[1] + 0.9, q[2]], lateral, 3), b = ray([q[0], q[1] + 0.9, q[2]], [-lateral[0], 0, -lateral[2]], 3); const valid = !a || !b || a.distance + b.distance >= l.distance + r.distance + 0.5; sideObservations.push({routeIndex: j, nodeId: path[j], left: a, right: b, minimumCombinedDistance: l.distance + r.distance + 0.5, valid}); return valid;});
      emit({stage: 'topology', kind: 'aperture-wider-regions', routeId: activeRouteId, nodeId: path[i], routeIndex: i, axis, valid: wider, sideObservations, unexecutedSides: sideObservations.length < 2 ? ['after'] : [], firstFailure: wider ? null : 'region-does-not-widen'});
      if (!wider) continue;
      add(kind, [before, i, after], [l.id, r.id, ...f.roofs.map(h => h.id)], {apertureWidth: l.distance + r.distance, beforeSignedDistance: signed(before), afterSignedDistance: signed(after), crossingAxis: axis, roofCoverage: 1, opensOnBothSides: true}); emit({stage: 'topology', kind: 'aperture-accepted', routeId: activeRouteId, nodeId: path[i], routeIndex: i, axis, unexecutedApertureCenterIndices: path.slice(i + 1, -1).map((_, j) => i + 1 + j), unexecutedAxesAtThisCenter: axis[0] === 1 ? [[0, 0, 1]] : []}); accepted = true; break;
     }
    }
    if (!accepted) return failed(kind);
   }
   if (kind === 'elevated-bridge') {
    let accepted = false;
    for (const axis of [[1, 0, 0], [0, 0, 1]] as Vec3[]) {
     let start = -1, len = 0; const lateral: Vec3 = [-axis[2], 0, axis[0]];
     for (let i = 0; i < path.length; i++) {
      const p = nodes[path[i]].assessment.foot, f = feature(path[i]); let valid = p[1] - bounds.min[1] >= 0.75;
      const drops: number[] = [], deckObservations: unknown[] = []; const deckFailures: string[] = valid ? [] : ['elevation'];
      for (const sign of [-1, 1]) {let edge = 0;
       for (let t = 0.4; t <= 2.5; t += 0.2) {const x = p[0] + lateral[0] * t * sign, z = p[2] + lateral[2] * t * sign, hits = nav.floors(x, z, p[1] - 0.3, p[1] + 0.25); emit({stage: 'topology', kind: 'deck-edge-probe', routeId: activeRouteId, nodeId: path[i], routeIndex: i, axis, sign, distance: t, x, z, low: p[1] - 0.3, high: p[1] + 0.25, hits}); if (!hits.length) {edge = t; break;}}
       drops.push(edge); if (!edge) {valid = false; deckFailures.push(`missing-edge:${sign}`);}
       // A roof above enclosing building walls is not a deck over a void.
       const lateralHit = ray([p[0], p[1] - 0.6, p[2]], [lateral[0] * sign, 0, lateral[2] * sign], edge || 2.5); deckObservations.push({sign, edge, lateralHit}); if (lateralHit) {valid = false; deckFailures.push(`lower-side-wall:${sign}`);}
      }
      if (drops[0] + drops[1] - 0.4 < input.criteria.requirements.minimumWidth) {valid = false; deckFailures.push('width');}
      const below = ray([p[0], p[1] - 0.55, p[2]], [0, -1, 0], 0.2); if (below) {valid = false; deckFailures.push('under-deck-obstruction');}
      emit({stage: 'topology', kind: 'deck-node', routeId: activeRouteId, nodeId: path[i], routeIndex: i, axis, elevation: p[1] - bounds.min[1], minimumElevation: 0.75, transverseWidthLowerBound: drops[0] + drops[1] - 0.4, minimumWidth: input.criteria.requirements.minimumWidth, deckObservations, below, valid, firstFailure: deckFailures[0] ?? null, otherExecutedFailures: deckFailures.slice(1), unexecuted: valid ? [] : ['longitudinal-displacement']});
      if (!valid) {start = -1; len = 0; continue;} if (start < 0) start = i; else len += distance(nodes[path[i - 1]].assessment.eye, nodes[path[i]].assessment.eye);
      const q = nodes[path[start]].assessment.foot, longitudinal = Math.abs((p[0] - q[0]) * axis[0] + (p[2] - q[2]) * axis[2]);
      emit({stage: 'topology', kind: 'deck-longitudinal', routeId: activeRouteId, nodeId: path[i], routeIndex: i, axis, longitudinal, minimum: 3, tolerance: 1e-7, continuousLength: len});
      if (longitudinal >= 3 - 1e-7) {const ids = Array.from({length: i - start + 1}, (_, j) => start + j); add(kind, ids, [], {continuousDistance: len, longitudinalDisplacement: longitudinal, elevationAboveSourceMinimum: p[1] - bounds.min[1], transverseEdgeDistances: drops, lowerBodyVoid: true, crossingAxis: axis}); emit({stage: 'topology', kind: 'deck-accepted', routeId: activeRouteId, nodeId: path[i], routeIndex: i, axis, unexecutedDeckNodeIndicesForAxis: path.slice(i + 1).map((_, j) => i + 1 + j), unexecutedAxes: axis[0] === 1 ? [[0, 0, 1]] : []}); accepted = true; break;}
     }
     if (accepted) break;
    }
    if (!accepted) return failed(kind);
   }
  }
  if (input.criteria.requirements.opposingWalls && !input.criteria.required.includes('enclosed-passage') && !sustained('explicit-walls', id => {const f = feature(id); return nodeChecks(id, 'explicit-walls', [{name: 'opposing-walls', test: () => !!(f.sides[0] && f.sides[1]) || !!(f.sides[2] && f.sides[3]), measured: f.sides.map(h => h?.id ?? null), threshold: [[0, 1], [2, 3]]}]);})) return failed('explicit-walls');
  if (input.criteria.requirements.openSky && !input.criteria.required.includes('open-courtyard') && !sustained('explicit-open-sky', id => {const f = feature(id); return nodeChecks(id, 'explicit-open-sky', [{name: 'open-sky', test: () => f.roofs.length === 0, measured: f.roofs.length, threshold: 0}]);})) return failed('explicit-open-sky');
  if (input.criteria.requirements.covered && !sustained('explicit-cover', id => {const f = feature(id); return nodeChecks(id, 'explicit-cover', [{name: 'roof-coverage', test: () => f.roofs.length === 9, measured: f.roofs.length, threshold: 9}]);})) return failed('explicit-cover');
  if (diagnostics.exhausted.includes('topology-queries')) return failed('topology-query-budget');
  emit({stage: 'topology', kind: 'route-qualified', routeId: activeRouteId, witnessKinds: found.map(w => w.kind)}); return found;
 }
 let selected: number[] = [], selectedApproach: ReturnType<typeof makeApproach> = null, selectedDirection: Vec3 | null = null, topologyWitnesses: TopologyWitness[] = [], maximumConnectedDisplacement = 0;
 const exploredNodes = new Set<number>(), attemptedEntries = new Set<Entry>();
 type RouteCandidate = {path: number[]; displacement: number; endpointNodeId: number};
 function* routeStream(entry: Entry): Generator<RouteCandidate, void> {
  const previouslyReached = exploredNodes.has(entry.id); if (!previouslyReached) diagnostics.componentsExplored++;
  emit({stage: 'component', kind: 'entry-search', proposalId: proposalId(entry), nodeId: entry.id, previouslyReached, discoveredComponentCount: diagnostics.componentsExplored});
  const previous = new Int32Array(nodes.length).fill(-2), queue = new Int32Array(nodes.length); previous[entry.id] = -1; queue[0] = entry.id; let tail = 1;
  for (let at = 0; at < tail; at++) {
   const id = queue[at], displacement = distance(nodes[id].assessment.eye, nodes[entry.id].assessment.eye); exploredNodes.add(id); maximumConnectedDisplacement = Math.max(maximumConnectedDisplacement, displacement);
   emit({stage: 'component', kind: 'node-visited', proposalId: proposalId(entry), nodeId: id, predecessor: previous[id], displacement, endpointEligible: displacement >= 3 - 1e-7 && (input.searchMode === 'legacy' || (nodes[id].ix + nodes[id].iz) % 2 === 0), minimumDisplacement: 3, tolerance: 1e-7, checkerboardParity: (nodes[id].ix + nodes[id].iz) % 2});
   if (displacement >= 3 - 1e-7 && (input.searchMode === 'legacy' || (nodes[id].ix + nodes[id].iz) % 2 === 0)) {
    const path: number[] = []; let cursor = id; while (cursor >= 0) {path.push(cursor); cursor = previous[cursor];} path.reverse();
    yield {path, displacement, endpointNodeId: id};
   }
   for (const next of neighbors(id)) if (previous[next] === -2) {previous[next] = id; queue[tail] = next; emit({stage: 'component', kind: 'node-discovered', proposalId: proposalId(entry), nodeId: next, predecessor: id, queueIndex: tail}); tail++;}
  }
 }
 const streams: {entry: Entry; approach: NonNullable<ReturnType<typeof makeApproach>>; iterator: Generator<RouteCandidate, void>; localCandidates: number; done: boolean}[] = [];
 // Screen the identical selected population before allocating witness work to any root.
 if (input.criteria.supported) for (const entry of selectedEntries) {
  activeProposalId = proposalId(entry); activeRouteId = null; attemptedEntries.add(entry); diagnostics.entriesTested++;
  emit({stage: 'proposal', kind: 'attempt', proposalId: activeProposalId, rank: ranks.get(entry), nodeId: entry.id, direction: entry.direction});
  const approach = makeApproach(entry); if (!approach) continue;
  streams.push({entry, approach, iterator: routeStream(entry), localCandidates: 0, done: false});
  emit({stage: 'route', kind: 'stream-admitted', proposalId: activeProposalId, rank: ranks.get(entry), maximumNodes: nodes.length});
 }
 emit({stage: 'route', kind: 'scheduler-start', admittedStreams: streams.length, maximumStateBytes: streams.length * nodes.length * 8, candidateQuantum: 1, budgets: BUDGETS});
 let round = 0, stopReason = 'streams-exhausted';
 scheduling: while (streams.some(s => !s.done)) {
  round++;
  for (const stream of streams) {
   if (stream.done) continue;
   if (diagnostics.candidateRoutes >= BUDGETS.candidateRoutes) {exhaust('candidate-routes'); stopReason = 'candidate-routes'; break scheduling;}
   if (diagnostics.exhausted.includes('topology-queries')) {stopReason = 'topology-queries'; break scheduling;}
   if (diagnostics.approachBuilds >= BUDGETS.approachBuilds) {exhaust('approach-builds'); stopReason = 'approach-builds'; break scheduling;}
   const {entry, approach} = stream; activeProposalId = proposalId(entry); activeRouteId = null;
   emit({stage: 'route', kind: 'stream-resumed', proposalId: activeProposalId, round, localCandidates: stream.localCandidates});
   const next = stream.iterator.next();
   if (next.done) {stream.done = true; emit({stage: 'route', kind: 'stream-complete', proposalId: activeProposalId, round, localCandidates: stream.localCandidates, reason: 'bfs-exhausted'}); continue;}
   const {path, displacement, endpointNodeId} = next.value;
   activeRouteId = ++diagnostics.candidateRoutes; stream.localCandidates++;
   emit({stage: 'route', kind: 'candidate', proposalId: activeProposalId, routeId: activeRouteId, nodeIds: path, endpointNodeId, endpointDisplacement: displacement, round, localCandidateIndex: stream.localCandidates});
   const witness = witnesses(path);
   if (witness) {
    diagnostics.approachBuilds++;
    const crossing = createSurfaceNavigator(input.mesh, input.transform, options, approach.approach), eye = nodes[entry.id].assessment.eye, start = approach.approachStart;
    const f = crossing.move(start, [eye[0] - start[0], 0, eye[2] - start[2]]), r = crossing.move(eye, [start[0] - eye[0], 0, start[2] - eye[2]]);
    emit({stage: 'seam', kind: 'swept-forward', proposalId: activeProposalId, routeId: activeRouteId, from: start, target: eye, movement: f, endpointDistance: distance(f.position, eye), endpointTolerance: 1e-6});
    emit({stage: 'seam', kind: 'swept-reverse', proposalId: activeProposalId, routeId: activeRouteId, from: eye, target: start, movement: r, endpointDistance: distance(r.position, start), endpointTolerance: 1e-6});
    if (!f.blocked && !r.blocked && distance(f.position, eye) < 1e-6 && distance(r.position, start) < 1e-6) {selected = path; topologyWitnesses = witness; selectedApproach = approach; selectedDirection = entry.direction;} else reject('authored-to-generated-seam');
    stream.done = true; stream.iterator.return(undefined);
    emit({stage: 'route', kind: selected.length ? 'accepted' : 'seam-rejected', proposalId: activeProposalId, routeId: activeRouteId, searchContinuesForThisEntry: false});
    if (selected.length) {stopReason = 'accepted'; break scheduling;}
   } else emit({stage: 'route', kind: 'stream-suspended', proposalId: activeProposalId, round, localCandidates: stream.localCandidates, reason: 'candidate-quantum'});
  }
 }
 for (const stream of streams) if (!stream.done) {emit({stage: 'route', kind: 'stream-unexecuted', proposalId: proposalId(stream.entry), round, localCandidates: stream.localCandidates, reason: stopReason}); stream.iterator.return(undefined);}
 emit({stage: 'route', kind: 'scheduler-complete', round, stopReason, candidateRoutes: diagnostics.candidateRoutes, admittedStreams: streams.length});
 for (const entry of selectedEntries) if (!attemptedEntries.has(entry)) emit({stage: 'proposal', kind: 'not-attempted', proposalId: proposalId(entry), rank: ranks.get(entry), reason: selected.length ? 'earlier-route-accepted' : !input.criteria.supported ? 'criteria-unsupported' : 'search-stopped', exhausted: diagnostics.exhausted});
 const route = selected.map(id => nodes[id].assessment.eye), samples: PassageSample[] = [];
 for (let i = 0; i < route.length; i++) {
  if (!i) {samples.push({...nodes[selected[i]].assessment, enclosure: feature(selected[i]).enclosure}); continue;}
  const from = route[i - 1], to = route[i], steps = Math.max(1, Math.ceil(distance(from, to) / options.sampleStep)); let eye = from;
  for (let step = 0; step < steps; step++) {const movement = nav.move(eye, [(to[0] - from[0]) / steps, 0, (to[2] - from[2]) / steps]); if (movement.blocked) throw new Error('Accepted interpretation edge failed replay'); eye = movement.position; samples.push({...movement.support, enclosure: nav.enclosure(eye)});}
 }
 for (let sampleIndex = 0; sampleIndex < samples.length; sampleIndex++) emit({stage: 'support', kind: 'accepted-dense-sample', sampleIndex, sample: samples[sampleIndex]});
 let continuousEnclosedDistance = 0, current = 0;
 for (let i = 1; i < samples.length; i++) {current = samples[i - 1].enclosure.enclosed && samples[i].enclosure.enclosed ? current + distance(samples[i - 1].eye, samples[i].eye) : 0; continuousEnclosedDistance = Math.max(continuousEnclosedDistance, current);}
 if (selectedApproach) diagnostics.routeCrossesBehindSeam = route.some(p => (p[0] - selectedApproach!.seam[0]) * selectedDirection![0] + (p[2] - selectedApproach!.seam[2]) * selectedDirection![2] > 0.01);
 const result: InterpretedSpaceAssessment = {schemaVersion: 1, sourceSha256: null, status: route.length ? 'passed' : 'failed', transform: input.transform, options, bounds, route, samples, entry: route[0] ?? null, approachDirection: selectedDirection, seam: selectedApproach?.seam ?? null, approach: selectedApproach?.approach ?? null, approachStart: selectedApproach?.approachStart ?? null, approachVerified: selectedApproach !== null, shellComparison: null,
  metrics: {...nav.metrics, gridPitch: pitch, testedFloorPoints, supportedPoints: nodes.length, enclosurePoints: [...features.values()].filter(f => f.enclosure.enclosed).length, entryCandidates: entries.length, rejected, routeLength: route.slice(1).reduce((n, p, i) => n + distance(p, route[i]), 0), routeDisplacement: route.length ? distance(route[0], route.at(-1)!) : 0, continuousEnclosedDistance, maximumConnectedDisplacement, buildMs: built - started, assessmentMs: performance.now() - started},
  reasons: route.length ? [] : [!input.criteria.supported ? 'Intent has no supported topology criteria.' : 'No exterior-entered, reversible original-supported route with >=3m displacement and all declared topology witnesses was found within the reported budgets.'],
  limitations: ['Synthetic-frozen bounded proposal search; failure does not prove geometry irreparable.', 'Original triangles and corrected navigator are unchanged. The full exterior approach prism excludes all original geometry from seamY-0.25 through seamY+1.8 beyond a 2mm contact-boundary tolerance.', 'Witnesses are geometric operational definitions, not semantic recognition. Courtyards must be within 0.75m of source minimum height; bridge-like detached roof slabs can be geometrically indistinguishable from decks.', 'Exterior proposals require a continuously clear 1.2m-wide support/body prism to beyond source bounds plus body-radius margin; overhead and deep-below geometry cannot independently reject an otherwise clear prism. This remains conservative around near-floor irregularities.', 'Doorway flank rays are limited to 3m on each side; broader apertures may be missed. Deck edges must be within 2.5m on each side.', 'Topology witnesses use 0.2m route vertices and original ray triangle IDs; dense samples independently preserve support/body checks. Legacy Enclosure fields retain their old 6m roof range on dense samples; tall roofs are recorded in topologyWitnesses.', 'Enclosure-point count covers queried witness nodes only. Component count is reached-entry components, not an exhaustive mesh decomposition.'], criteria: input.criteria, topologyWitnesses, searchDiagnostics: diagnostics};
 emit({stage: 'result', kind: 'assessment-complete', status: result.status, reasons: result.reasons, diagnostics, metrics: result.metrics, selectedNodeIds: selected, selectedProposalId: selected.length ? activeProposalId : null, selectedRouteId: selected.length ? activeRouteId : null, approachVerified: result.approachVerified, topologyWitnessKinds: topologyWitnesses.map(w => w.kind), denseSamples: samples.length});
 return result;
}

/** Preserve the complete frozen entry assessor before trying a bounded fair schedule. */
export function assessDiagnosedSpace(input: Parameters<typeof assessPredecessorSpace>[0]): InterpretedSpaceAssessment {
 const emit = (event: Parameters<TraceSink>[0]) => input.trace?.(structuredClone(event));
 const run = (pass: 'predecessor' | 'coverage-round-robin', assessor: typeof assessPredecessorSpace) => {
  emit({stage: 'result', kind: 'coverage-pass-start', pass, searchMode: input.searchMode, budgets: BUDGETS});
  const assessment = assessor({...input, trace: input.trace ? event => emit({...event, ...(event.pass ? {predecessorPass: event.pass} : {}), pass}) : undefined});
  emit({stage: 'result', kind: 'coverage-pass-complete', pass, searchMode: input.searchMode, status: assessment.status, metrics: assessment.metrics, diagnostics: assessment.searchDiagnostics});
  return assessment;
 };
 const predecessor = run('predecessor', assessPredecessorSpace);
 if (predecessor.status === 'passed') return predecessor;
 const corrected = run('coverage-round-robin', assessFairSpace);
 corrected.limitations.push('Coverage correction runs the complete frozen same-mode entry assessor first, then at most one separately bounded round-robin search on failure. Selected proposals and individual BFS paths are unchanged; returned counters describe only the fair pass. Per-pass costs and unexecuted streams are traced.');
 return corrected;
}
