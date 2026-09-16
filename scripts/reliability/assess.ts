/** Offline evidence only: the original bounded passage assessor is unchanged. */
import {createHash} from 'node:crypto';
import {readFile, writeFile, rename} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {assessPassage, compareConservativeShell, type PassageAssessment} from '../passage-geometry.ts';
import {parsePassageGlb, type TriangleMesh, type PassageTransform} from '../../apps/web/src/generated-passage/navigation.ts';

export type Candidate = {id: string; category: string; promptVariant: number; seed: number; text: string};
export type Plan = {studyId: string; primaryScale: number; secondaryScales: number[]; candidates: Candidate[]};
export type AssessmentError = {status: 'failed'; sourceSha256: string | null; transform: PassageTransform; assessmentError: {stage: string; message: string; resourceBound: boolean}};
export type Attempt = PassageAssessment | AssessmentError;
export type StudyAssessment = {schemaVersion: 1; candidateId: string; source: {filename: string; sha256: string; bytes: number} | null; attempts: Attempt[]; acceptedAttempt: number | null; primaryScale: number; rawTopology?: ReturnType<typeof rawTopology> | null};
export const isAssessment = (attempt: Attempt): attempt is PassageAssessment => !('assessmentError' in attempt);
export const isResourceBound = (message: string) => /budget|too many|oversized|exceeds|bounds|dimensions/i.test(message);
export const sha256 = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex');
export const scaleSensitivity = (attempts: Pick<Attempt, 'status'>[]) => ({scaleSensitive: attempts.slice(1).some(a => a.status !== attempts[0]?.status), secondaryRescue: attempts[0]?.status !== 'passed' && attempts.slice(1).some(a => a.status === 'passed')});
export async function readJson(path: string): Promise<any | null> {
 try {return JSON.parse(await readFile(path, 'utf8'));} catch (error) {if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null; throw error;}
}
export async function saveJson(path: string, value: unknown) {
 const temporary = `${path}.${process.pid}.tmp`; await writeFile(temporary, JSON.stringify(value, null, 2) + '\n'); await rename(temporary, path);
}

export function rawTopology(mesh: TriangleMesh) {
 let upwardFaces = 0, slopeQualifiedFaces = 0, degenerateFaces = 0;
 for (let i = 0; i < mesh.indices.length; i += 3) {
  const a = mesh.indices[i] * 3, b = mesh.indices[i + 1] * 3, c = mesh.indices[i + 2] * 3, p = mesh.positions;
  const ux = p[b] - p[a], uy = p[b + 1] - p[a + 1], uz = p[b + 2] - p[a + 2], vx = p[c] - p[a], vy = p[c + 1] - p[a + 1], vz = p[c + 2] - p[a + 2];
  const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx, magnitude = Math.hypot(nx, ny, nz);
  if (!magnitude) degenerateFaces++;
  if (ny > 0) upwardFaces++;
  if (magnitude && ny / magnitude >= Math.cos(35 * Math.PI / 180)) slopeQualifiedFaces++;
 }
 return {triangles: mesh.indices.length / 3, vertices: mesh.positions.length / 3, upwardFaces, slopeQualifiedFaces, degenerateFaces, limitation: 'Triangle winding/normal counts describe potential surface support, not valid player footprints, connectivity or mesh manifoldness.'};
}

export function diagnose(attempt: Attempt) {
 if (!isAssessment(attempt)) return {cause: attempt.assessmentError.resourceBound ? 'parser-resource-bound' : 'assessment-error', certainty: 'observed-error', topologyFailure: false, evidence: attempt.assessmentError, rawSupportExists: null, supportedFreeSpaceExists: null, proxyFalseClosure: null};
 const m = attempt.metrics;
 let cause = 'passed', certainty = 'verified-bounded-route';
 if (attempt.status !== 'passed') {
  certainty = 'bounded-search-evidence';
  if (m.testedFloorPoints === 0) cause = 'no-sampled-generated-support';
  else if (m.supportedPoints === 0) cause = (m.rejected['body-or-head-obstruction'] ?? 0) > (m.rejected['unsupported-footprint'] ?? 0) + (m.rejected['footprint-height-spread'] ?? 0) ? 'body-head-clearance' : 'patchy-support-footprint';
  else if (m.entryCandidates === 0) cause = 'no-exterior-entry';
  else if (m.enclosurePoints === 0) cause = 'enclosure-missing';
  else if ((m.rejected['authored-to-generated-seam'] ?? 0) > 0) cause = 'exterior-seam-rejected';
  else cause = m.maximumConnectedDisplacement >= 3 ? 'sustained-enclosure-or-bounded-route' : 'disconnected-or-no-3m-route';
 }
 return {cause, certainty, topologyFailure: attempt.status === 'failed' && !['enclosure-missing', 'sustained-enclosure-or-bounded-route'].includes(cause), rawSupportExists: m.testedFloorPoints > 0, supportedFreeSpaceExists: m.supportedPoints > 0,
  evidence: {sampledFloorHits: m.testedFloorPoints, supportedPoints: m.supportedPoints, enclosurePoints: m.enclosurePoints, entryCandidates: m.entryCandidates, rejected: m.rejected, maximumConnectedDisplacement: m.maximumConnectedDisplacement, routeLength: m.routeLength, routeDisplacement: m.routeDisplacement, continuousEnclosedDistance: m.continuousEnclosedDistance},
  proxyFalseClosure: attempt.shellComparison ? {testedSamples: attempt.shellComparison.testedSamples, blockedOriginalClearSamples: attempt.shellComparison.proxyBlockedSamples} : null};
}

/** Catches each scale independently: one resource bound cannot discard later candidates. */
export function assessMesh(mesh: TriangleMesh, sourceSha256: string, scales: number[], assessor = assessPassage): Attempt[] {
 let minY = Infinity; for (let i = 1; i < mesh.positions.length; i += 3) minY = Math.min(minY, mesh.positions[i]);
 return scales.map(scale => {
  const transform: PassageTransform = {scale, yaw: 0, position: [0, -minY * scale, 0]};
  try {return {...assessor({mesh, transform}), sourceSha256};}
  catch (error) {const message = String(error instanceof Error ? error.message : error); return {status: 'failed', sourceSha256, transform, assessmentError: {stage: 'assessment', message, resourceBound: isResourceBound(message)}};}
 });
}

export async function assessCandidate(candidate: Candidate, options: {root: string; data: string; plan: Plan; force?: boolean}) {
 const directory = join(options.data, 'candidates', candidate.id), state = await readJson(join(directory, 'candidate.json'));
 if (!state?.collected) return {id: candidate.id, status: 'pending'};
 const output = join(directory, 'assessment.json');
 if (!options.force && await readJson(output)) return {id: candidate.id, status: 'reused'};
 const scales = [options.plan.primaryScale, ...options.plan.secondaryScales], report = await readJson(join(directory, 'generation-report.json'));
 const world = await readJson(join(directory, 'world.json'));
 let source: StudyAssessment['source'] = null, attempts: Attempt[] = [], stage = 'provenance', topology: ReturnType<typeof rawTopology> | null = null;
 const auxiliaryErrors: string[] = [];
 try {
  if (state.rawIntent?.text !== candidate.text || state.seed !== candidate.seed) throw new Error('Candidate state differs from predeclared prompt/seed');
  if (state.gpuStatus !== 'succeeded') {stage = 'generation'; throw new Error(state.error ?? state.failureStage ?? report?.error ?? `GPU status: ${state.gpuStatus}`);}
  stage = 'artifact-verification';
  const filename = join(directory, 'collider.glb'), bytes = await readFile(filename), hash = sha256(bytes);
  source = {filename, sha256: hash, bytes: bytes.length};
  const expected = report?.artifacts?.find((item: any) => item.path === 'collider.glb');
  if (!expected || expected.sha256 !== hash || expected.bytes !== bytes.length) throw new Error('Original GLB differs from worker generation-report hash/bytes');
  stage = 'parser';
  const mesh = parsePassageGlb(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer);
  topology = rawTopology(mesh);
  attempts = assessMesh(mesh, hash, scales);
  const shellPath = world?.id ? join(options.root, '.runtime/intention-generation/worlds', world.id, 'scene.json') : null;
  if (shellPath) {
   try {
    const shell = await readJson(shellPath);
    if (shell) for (const attempt of attempts) if (isAssessment(attempt)) attempt.shellComparison = compareConservativeShell(attempt, shell);
   } catch (error) {auxiliaryErrors.push(`Conservative shell comparison unavailable: ${String(error)}`);}
  }
 } catch (error) {
  const message = String(error instanceof Error ? error.message : error);
  attempts = scales.map(scale => ({status: 'failed', sourceSha256: source?.sha256 ?? null, transform: {scale, yaw: 0, position: [0, 0, 0]}, assessmentError: {stage, message, resourceBound: ['parser', 'assessment'].includes(stage) && isResourceBound(message)}}));
 }
 const accepted = attempts.findIndex(attempt => attempt.status === 'passed');
 const batch: StudyAssessment = {schemaVersion: 1, candidateId: candidate.id, source, attempts, acceptedAttempt: accepted < 0 ? null : accepted, primaryScale: options.plan.primaryScale, rawTopology: topology};
 await saveJson(output, batch);
 await saveJson(join(directory, 'diagnostic.json'), {schemaVersion: 1, candidateId: candidate.id, sourceSha256: source?.sha256 ?? null, primaryScale: options.plan.primaryScale,
  rawTopology: topology, ...scaleSensitivity(attempts), attempts: attempts.map(a => ({scale: a.transform.scale, ...diagnose(a)})), auxiliaryErrors,
  visualFidelity: 'not-assessed', browserAcceptance: 'not-assessed', limitations: ['Offline geometry is not browser acceptance.', 'A zero sampled-floor count is not a proof that no floor triangle exists between proposal points.', 'Support uses original upward-facing triangles and nine footprint probes; rejected footprints are not literally absent floors.', 'No-exterior-entry and no-route findings describe the unchanged bounded search, not mathematical impossibility.', 'Enclosure criterion is identical for every category, including bridges and courtyards.']});
 return {id: candidate.id, status: 'assessed', attempts: attempts.map(a => ({scale: a.transform.scale, status: a.status, cause: diagnose(a).cause}))};
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
 const args = process.argv.slice(2), value = (name: string, fallback: string) => {const at = args.indexOf(name); return at < 0 ? fallback : args[at + 1];};
 const root = resolve(value('--root', '.')), data = resolve(value('--data', join(root, '.runtime/reliability')));
 const plan: Plan = await readJson(value('--plan', join(root, 'scripts/reliability/plan.json')));
 if (!plan?.candidates?.length) throw new Error('Missing predeclared plan');
 const id = value('--id', ''), candidates = id ? plan.candidates.filter(c => c.id === id) : plan.candidates;
 if (!candidates.length) throw new Error('Candidate is not in declared plan');
 for (const candidate of candidates) console.log(JSON.stringify(await assessCandidate(candidate, {root, data, plan, force: args.includes('--force')})));
}
