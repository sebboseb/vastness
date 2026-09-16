import {createHash} from 'node:crypto';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createSurfaceNavigator, parsePassageGlb, type AuthoredApproach, type Enclosure, type NavigationOptions, type PassageBounds, type PassageTransform, type SupportAssessment, type TriangleMesh, type Vec3} from '../apps/web/src/generated-passage/navigation.ts';

export type PassageSample = SupportAssessment & {enclosure: Enclosure};
export type PassageAssessment = {
 schemaVersion: 1; sourceSha256: string | null; status: 'passed' | 'failed'; transform: PassageTransform; options: NavigationOptions; bounds: PassageBounds;
 route: Vec3[]; samples: PassageSample[]; entry: Vec3 | null; approachDirection: Vec3 | null;
 seam: Vec3 | null; approach: AuthoredApproach | null; approachStart: Vec3 | null; approachVerified: boolean;
 shellComparison: {sourceSha256: string; testedSamples: number; proxyBlockedSamples: number; originalClearSamples: number; method: string} | null;
 metrics: {sourceTriangles: number; sourceVertices: number; indexReferences: number; indexCells: number; indexPitch: number; gridPitch: number; testedFloorPoints: number; supportedPoints: number; enclosurePoints: number; entryCandidates: number; rejected: Record<string, number>; routeLength: number; routeDisplacement: number; continuousEnclosedDistance: number; maximumConnectedDisplacement: number; buildMs: number; assessmentMs: number};
 reasons: string[]; limitations: string[];
};
export type PassageBatch = {schemaVersion: 1; source: {filename: string; sha256: string; bytes: number}; attempts: PassageAssessment[]; acceptedAttempt: number | null};
type Node = {assessment: SupportAssessment; enclosure: Enclosure; ix: number; iz: number};
const lengthXZ = (a: Vec3, b: Vec3) => Math.hypot(a[0] - b[0], a[2] - b[2]);

/** Search original surfaces. Grid proposals become edges only after forward AND reverse movement verification. */
export function assessPassage(input: {mesh: TriangleMesh; transform: PassageTransform; options?: Partial<NavigationOptions>; gridPitch?: number; minInteriorDistance?: number}): PassageAssessment {
 const started = performance.now(), navigator = createSurfaceNavigator(input.mesh, input.transform, input.options), built = performance.now();
 const gridPitch = input.gridPitch ?? 0.2, minDistance = input.minInteriorDistance ?? 3;
 if (gridPitch < 0.1 || gridPitch > 0.4 || minDistance < 3 || minDistance > 20) throw new Error('Invalid passage search bounds');
 const {bounds, options} = navigator, nodes: Node[] = [], cells = new Map<string, number[]>(), rejected: Record<string, number> = {};
 const nx = Math.ceil((bounds.max[0] - bounds.min[0]) / gridPitch), nz = Math.ceil((bounds.max[2] - bounds.min[2]) / gridPitch);
 if (nx * nz > 20000) throw new Error('Passage search exceeds grid budget');
 let testedFloorPoints = 0;
 for (let iz = 0; iz <= nz; iz++) for (let ix = 0; ix <= nx; ix++) {
  const x = bounds.min[0] + ix * gridPitch, z = bounds.min[2] + iz * gridPitch;
  const hits = navigator.floors(x, z);
  // Every layer is considered; extremely layered geometry fails explicitly instead of dropping surfaces.
  if (hits.length > 32) throw new Error('Too many distinct support layers in generated mesh');
  for (const hit of hits) {
   testedFloorPoints++;
   const assessment = navigator.assess([x, hit.y + options.eyeHeight, z]);
   if (!assessment.valid) {const reason = assessment.reason ?? 'unknown'; rejected[reason] = (rejected[reason] ?? 0) + 1; continue;}
   const key = `${ix},${iz}`, existing = cells.get(key) ?? [];
   if (existing.some(id => Math.abs(nodes[id].assessment.eye[1] - assessment.eye[1]) < 0.05)) continue;
   const enclosure = navigator.enclosure(assessment.eye);
   existing.push(nodes.length); cells.set(key, existing); nodes.push({assessment, enclosure, ix, iz});
   if (nodes.length > 20000) throw new Error('Passage search exceeds supported-node budget');
  }
 }
 const edges = new Map<string, boolean>();
 function connected(a: number, b: number) {
  const key = a < b ? `${a}:${b}` : `${b}:${a}`, cached = edges.get(key); if (cached !== undefined) return cached;
  const start = nodes[a].assessment.eye, end = nodes[b].assessment.eye;
  if (Math.abs(start[1] - end[1]) > options.maxStep + gridPitch * Math.tan(options.maxSlopeDegrees * Math.PI / 180)) {edges.set(key, false); return false;}
  const forward = navigator.move(start, [end[0] - start[0], 0, end[2] - start[2]]);
  const reverse = navigator.move(end, [start[0] - end[0], 0, start[2] - end[2]]);
  const valid = !forward.blocked && !reverse.blocked && lengthXZ(forward.position, end) < 1e-6 && lengthXZ(reverse.position, start) < 1e-6;
  edges.set(key, valid); return valid;
 }
 function neighbors(id: number) {
  const node = nodes[id], result: number[] = [];
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (const other of cells.get(`${node.ix + dx},${node.iz + dz}`) ?? []) if (connected(id, other)) result.push(other);
  return result;
 }
 // A seam must be near the exterior footprint and have a clear body-volume approach.
 // This rejects sealed rooms and keeps authored approach support out of the destination.
 function entryDirection(node: Node): Vec3 | null {
  const eye = node.assessment.eye, distances = [eye[0] - bounds.min[0], bounds.max[0] - eye[0], eye[2] - bounds.min[2], bounds.max[2] - eye[2]];
  const directions: Vec3[] = [[-1, 0, 0], [1, 0, 0], [0, 0, -1], [0, 0, 1]];
  for (let i = 0; i < 4; i++) {
   if (distances[i] > options.radius + gridPitch * 2.1) continue;
   const direction = directions[i], distance = distances[i] + options.radius + 0.1;
   let free = true;
   for (let t = 0; t <= distance; t += options.sampleStep) if (navigator.bodyBlock([eye[0] + direction[0] * t, eye[1] - options.eyeHeight, eye[2] + direction[2] * t]) !== null) {free = false; break;}
   if (free) return direction;
  }
  return null;
 }
 const entries = nodes.map((node, id) => ({id, direction: entryDirection(node)})).filter((entry): entry is {id: number; direction: Vec3} => entry.direction !== null);
 function makeApproach(entry: {id: number; direction: Vec3}) {
  const eye = nodes[entry.id].assessment.eye, expectedFoot = eye[1] - options.eyeHeight;
  const contactAt = (distance: number) => navigator.floors(eye[0] + entry.direction[0] * distance, eye[2] + entry.direction[2] * distance, expectedFoot - options.maxStep, expectedFoot + options.maxStep)[0];
  let inside = 0, outside = 0;
  while (outside < 1.5 && contactAt(outside)) {inside = outside; outside += 0.025;}
  if (outside >= 1.5) return null;
  for (let i = 0; i < 30; i++) {const middle = (inside + outside) / 2; if (contactAt(middle)) inside = middle; else outside = middle;}
  const contact = contactAt(inside); if (!contact) return null;
  const seam: Vec3 = [eye[0] + entry.direction[0] * inside, contact.y, eye[2] + entry.direction[2] * inside];
  const approach: AuthoredApproach = {seam, outward: entry.direction, width: 1.2, length: 2};
  const approachStart: Vec3 = [seam[0] + entry.direction[0] * 1.2, seam[1] + options.eyeHeight, seam[2] + entry.direction[2] * 1.2];
  const crossing = createSurfaceNavigator(input.mesh, input.transform, options, approach);
  const forward = crossing.move(approachStart, [eye[0] - approachStart[0], 0, eye[2] - approachStart[2]]);
  if (forward.blocked || lengthXZ(forward.position, eye) > 1e-6) return null;
  const returned = crossing.move(forward.position, [approachStart[0] - eye[0], 0, approachStart[2] - eye[2]]);
  if (returned.blocked || lengthXZ(returned.position, approachStart) > 1e-6) return null;
  return {seam, approach, approachStart};
 }
 let selectedRoute: number[] = [], selectedDirection: Vec3 | null = null, maximumConnectedDisplacement = 0;
 let selectedApproach: ReturnType<typeof makeApproach> = null;
 function enclosedDistance(points: {eye: Vec3; enclosure: Enclosure}[]) {
  let maximum = 0, current = 0;
  for (let i = 1; i < points.length; i++) {current = points[i - 1].enclosure.enclosed && points[i].enclosure.enclosed ? current + lengthXZ(points[i - 1].eye, points[i].eye) : 0; maximum = Math.max(maximum, current);}
  return maximum;
 }
 // A deterministic spread of boundary proposals avoids quadratic work along a wide exterior edge.
 const entryBudget = 48, selectedEntries = entries.length <= entryBudget ? entries : Array.from({length: entryBudget}, (_, i) => entries[Math.floor(i * entries.length / entryBudget)]);
 for (const entry of selectedEntries) {
  const predecessor = new Map<number, number>([[entry.id, -1]]), queue = [entry.id];
  let target = -1;
  for (let at = 0; at < queue.length; at++) {
   const id = queue[at], displacement = lengthXZ(nodes[id].assessment.eye, nodes[entry.id].assessment.eye);
   maximumConnectedDisplacement = Math.max(maximumConnectedDisplacement, displacement);
   if (displacement >= minDistance) {
    const candidate: number[] = []; let cursor = id;
    while (cursor >= 0) {candidate.push(cursor); cursor = predecessor.get(cursor)!;}
    candidate.reverse();
    if (enclosedDistance(candidate.map(id => ({eye: nodes[id].assessment.eye, enclosure: nodes[id].enclosure}))) >= 1.1) {
     selectedApproach = makeApproach(entry);
     if (selectedApproach) {target = id; selectedRoute = candidate;}
     else rejected['authored-to-generated-seam'] = (rejected['authored-to-generated-seam'] ?? 0) + 1;
     break;
    }
   }
   for (const next of neighbors(id)) if (!predecessor.has(next)) {predecessor.set(next, id); queue.push(next);}
  }
  if (target >= 0) {selectedDirection = entry.direction; break;}
 }
 const route = selectedRoute.map(id => nodes[id].assessment.eye), samples: PassageSample[] = [];
 // Publish dense auditable samples, including support triangle IDs and the 1.8m body check.
 for (let i = 0; i < route.length; i++) {
  if (!i) {samples.push({...nodes[selectedRoute[i]].assessment, enclosure: nodes[selectedRoute[i]].enclosure}); continue;}
  const from = route[i - 1], to = route[i], steps = Math.max(1, Math.ceil(lengthXZ(from, to) / options.sampleStep));
  let eye = from;
  for (let step = 0; step < steps; step++) {
   const movement = navigator.move(eye, [(to[0] - from[0]) / steps, 0, (to[2] - from[2]) / steps]);
   if (movement.blocked) throw new Error('Accepted passage edge failed deterministic replay');
   eye = movement.position; samples.push({...movement.support, enclosure: navigator.enclosure(eye)});
  }
 }
 const continuousEnclosedDistance = enclosedDistance(samples), reasons: string[] = [];
 if (route.length && continuousEnclosedDistance < 1 - 1e-6) {route.length = 0; samples.length = 0; selectedApproach = null; selectedDirection = null; reasons.push('Dense original-triangle checks did not sustain a full metre of opening/interior evidence.');}
 if (!nodes.length) reasons.push('No radius-0.3 generated support footprint has 1.8m original-triangle body/head clearance.');
 else if (!entries.length) reasons.push('Generated support exists, but no body-clear exterior entry was found near the generated footprint boundary.');
 else if (!nodes.some(node => node.enclosure.enclosed)) reasons.push('Supported points are exterior surfaces/roofs; no generated overhead opening or opposing body-height walls were found.');
 else if (!route.length) reasons.push(`No reversible generated-supported route with an opening/interior and ${minDistance}m endpoint displacement was found within the bounded search.`);
 return {
  schemaVersion: 1, sourceSha256: null, status: route.length ? 'passed' : 'failed', transform: input.transform, options, bounds, route, samples, entry: route[0] ?? null, approachDirection: selectedDirection,
  seam: selectedApproach?.seam ?? null, approach: selectedApproach?.approach ?? null, approachStart: selectedApproach?.approachStart ?? null, approachVerified: selectedApproach !== null,
  shellComparison: null,
  metrics: {...navigator.metrics, gridPitch, testedFloorPoints, supportedPoints: nodes.length, enclosurePoints: nodes.filter(node => node.enclosure.enclosed).length, entryCandidates: entries.length, rejected, routeLength: route.slice(1).reduce((sum, point, i) => sum + lengthXZ(point, route[i]), 0), routeDisplacement: route.length ? lengthXZ(route[0], route.at(-1)!) : 0, continuousEnclosedDistance, maximumConnectedDisplacement, buildMs: built - started, assessmentMs: performance.now() - started},
  reasons,
  limitations: ['Original source triangle winding defines upward support; no face deletion, authored destination support, or occupancy clearing.', 'Nine footprint contact probes; projected triangle-union continuity is checked for all nine during movement. The full disk is used for swept body collision.', 'Upright cylinder body model; 1.5cm contact tolerance, bounded step and slope, no jumping or falling.', 'Search is a bounded 0.2m proposal grid by default with at most 48 exterior entry proposals; failure is not a proof that every possible route is impossible.', 'At least 1m contiguous route has either a roof covering all nine footprint probes 1.8–6m abovefoot or opposing torso-height source walls. Semantic room recognition is not claimed.'],
 };
}

/** Optional diagnosis against the prior conservative voxel shell; never used to clear original triangles. */
export function compareConservativeShell(assessment: PassageAssessment, scene: {sources: {glb: {sha256: string}}; transform: {scale: number; position: Vec3}; boxes: PassageBounds[]}): NonNullable<PassageAssessment['shellComparison']> {
 if (assessment.sourceSha256 !== scene.sources.glb.sha256) throw new Error('Shell comparison source hash mismatch');
 const scale = assessment.transform.scale / scene.transform.scale, cos = Math.cos(assessment.transform.yaw), sin = Math.sin(assessment.transform.yaw);
 const boxes = scene.boxes.map(box => {
  const min: Vec3 = [Infinity, Infinity, Infinity], max: Vec3 = [-Infinity, -Infinity, -Infinity];
  for (const x of [box.min[0], box.max[0]]) for (const y of [box.min[1], box.max[1]]) for (const z of [box.min[2], box.max[2]]) {
   const a = (x - scene.transform.position[0]) * scale, b = (y - scene.transform.position[1]) * scale, c = (z - scene.transform.position[2]) * scale;
   const p = [a * cos + c * sin + assessment.transform.position[0], b + assessment.transform.position[1], -a * sin + c * cos + assessment.transform.position[2]];
   p.forEach((v, axis) => {min[axis] = Math.min(min[axis], v); max[axis] = Math.max(max[axis], v);});
  }
  return {min, max};
 });
 const proxyBlockedSamples = assessment.samples.filter(sample => boxes.some(box => {
  // Match the earlier flat walker body band (foot+0.2..foot+1.8), so shell floor padding alone is not counted as an obstruction.
  if (box.max[1] <= sample.foot[1] + 0.2 || box.min[1] >= sample.foot[1] + assessment.options.height) return false;
  const dx = Math.max(box.min[0] - sample.foot[0], 0, sample.foot[0] - box.max[0]), dz = Math.max(box.min[2] - sample.foot[2], 0, sample.foot[2] - box.max[2]);
  return dx * dx + dz * dz < assessment.options.radius ** 2;
 })).length;
 return {sourceSha256: assessment.sourceSha256!, testedSamples: assessment.samples.length, proxyBlockedSamples, originalClearSamples: assessment.samples.filter(sample => sample.valid).length, method: 'Original accepted support/clearance samples compared against hash-matched prior surface-shell AABBs, with the earlier walker body band foot+0.2..foot+1.8. Rotated shell boxes are conservatively re-bounded; no proxy cells are removed.'};
}

export async function assessPassageFile(input: {glb: string; out?: string; scales?: number[]; yaw?: number; expectedSha256?: string; shellScene?: string}): Promise<PassageBatch> {
 const bytes = await readFile(input.glb), sha256 = createHash('sha256').update(bytes).digest('hex');
 if (input.expectedSha256 && sha256 !== input.expectedSha256) throw new Error('Passage source hash mismatch');
 const mesh = parsePassageGlb(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer);
 let minY = Infinity;
 for (let i = 1; i < mesh.positions.length; i += 3) minY = Math.min(minY, mesh.positions[i]);
 const attempts: PassageAssessment[] = [];
 const shellScene = input.shellScene ? JSON.parse(await readFile(input.shellScene, 'utf8')) : null;
 for (const scale of input.scales ?? [6, 10, 12]) {
  const transform: PassageTransform = {scale, yaw: input.yaw ?? 0, position: [0, -minY * scale, 0]};
  const attempt = {...assessPassage({mesh, transform}), sourceSha256: sha256};
  if (shellScene) attempt.shellComparison = compareConservativeShell(attempt, shellScene);
  attempts.push(attempt);
 }
 const accepted = attempts.findIndex(attempt => attempt.status === 'passed');
 const result: PassageBatch = {schemaVersion: 1, source: {filename: resolve(input.glb), sha256, bytes: bytes.length}, attempts, acceptedAttempt: accepted < 0 ? null : accepted};
 if (input.out) {await mkdir(dirname(resolve(input.out)), {recursive: true}); await writeFile(input.out, JSON.stringify(result, null, 2));}
 return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
 const args = process.argv.slice(2); let glb = '', out = '', shellScene: string | undefined; let scales: number[] | undefined;
 for (let i = 0; i < args.length; i += 2) {
  if (args[i] === '--glb') glb = args[i + 1]; else if (args[i] === '--out') out = args[i + 1]; else if (args[i] === '--scales') scales = args[i + 1].split(',').map(Number); else if (args[i] === '--shell-scene') shellScene = args[i + 1]; else throw new Error('Usage: tsx scripts/passage-geometry.ts --glb collider.glb --out assessment.json [--scales 6,10,12] [--shell-scene prior-scene.json]');
 }
 if (!glb || !out || scales?.some(scale => !Number.isFinite(scale) || scale <= 0)) throw new Error('Expected --glb and --out with optional positive --scales');
 const result = await assessPassageFile({glb, out, scales, shellScene});
 console.log(JSON.stringify({source: result.source, acceptedAttempt: result.acceptedAttempt, attempts: result.attempts.map(({transform, status, metrics, reasons}) => ({transform, status, metrics, reasons}))}, null, 2));
}
