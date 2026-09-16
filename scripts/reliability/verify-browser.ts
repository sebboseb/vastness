/** Verify saved browser observations independently of browser.json success booleans. */
import {readFile} from 'node:fs/promises';
import {join, relative, resolve, sep} from 'node:path';
import {createHash} from 'node:crypto';
import type {PassageAssessment} from '../passage-geometry.ts';

export type BrowserVerification = {status: 'passed' | 'failed' | 'invalid-evidence' | 'not-assessed'; declaredStatus: string | null; reasons: string[]; evidenceHashes: Record<string, string>; forwardEndpointDistance: number | null; returnEndpointDistance: number | null};
const hash = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex');
const point = (value: any): value is number[] => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
const distance = (a: any, b: any) => point(a) && point(b) ? Math.hypot(...a.map((v, i) => v - b[i])) : Infinity;
const ids = (value: any, generated = false) => Array.isArray(value) && value.length > 0 && value.every(id => Number.isInteger(id) && id >= (generated ? 0 : -1));

export function verifyObservations(input: {forward: any; returned: any; persisted: any; assessment: PassageAssessment; assessmentSha256: string; caseId: string; worldId: string; sourceSha256: string}) {
 const {forward: f, returned: r, persisted, assessment: a} = input, reasons: string[] = [];
 const require = (condition: unknown, reason: string) => {if (!condition) reasons.push(reason);};
 const sourceIds = (value: any, generated = false) => ids(value, generated) && value.every((id: number) => id < a.metrics.sourceTriangles);
 require(a.status === 'passed' && a.sourceSha256 === input.sourceSha256 && a.approachVerified, 'Source assessment is not an accepted hash-bound passage');
 require(persisted?.glbSha256 === input.sourceSha256 && persisted?.assessmentSha256 === input.assessmentSha256, 'Persisted case does not bind source and exact saved assessment');
 require(typeof persisted?.identity === 'string' && /^[a-f0-9]{64}$/.test(persisted.identity), 'Missing persisted case identity');
 for (const [name, snapshot] of [['forward', f], ['returned', r]] as const) {
  require(snapshot?.caseId === input.caseId && snapshot?.worldId === input.worldId && snapshot?.glbSha256 === input.sourceSha256, `${name}: case/world/source mismatch`);
  require(snapshot?.identity === persisted?.identity, `${name}: persisted identity mismatch`);
  require(snapshot?.ready === true && snapshot?.representation === 'coarse' && snapshot?.assessment === 'passed', `${name}: coarse accepted scene is not ready`);
  require(snapshot?.pathRemaining === 0 && snapshot?.walking === '' && snapshot?.blocked === '' && snapshot?.errors === 0 && snapshot?.pendingVisits === 0, `${name}: motion, error or persistence work remains`);
  require(Array.isArray(snapshot?.audit) && snapshot.audit.length > 0 && snapshot.audit.every((sample: any) => sample.valid === true && sample.headClearance >= 1.8 && point(sample.position) && sourceIds(sample.supportTriangleIds)), `${name}: missing or invalid support audit`);
 }
 require(f?.mode === 'generated' && Number.isFinite(f?.generatedTravel) && f.generatedTravel >= 3, 'Forward snapshot did not complete at least3m generated traversal');
 require(r?.mode === 'scaffold', 'Return did not reach scaffold mode');
 require(f?.support?.valid === true && f.support.headClearance >= 1.8 && sourceIds(f.support.supportTriangleIds, true) && Array.isArray(f.support.supportSamples) && f.support.supportSamples.length === 9 && f.support.supportSamples.every((s: any) => Number.isInteger(s.triangleId) && s.triangleId >= 0 && s.triangleId < a.metrics.sourceTriangles), 'Forward endpoint lacks genuine generated support');
 const forwardAudit = Array.isArray(f?.audit) ? f.audit : [], firstGenerated = forwardAudit.findIndex((s: any) => sourceIds(s.supportTriangleIds, true));
 require(firstGenerated >= 0 && forwardAudit.slice(firstGenerated).every((s: any) => sourceIds(s.supportTriangleIds, true)), 'Forward interior audit lacks continuous generated support identities');
 const forwardEndpointDistance = distance(f?.position, a.route.at(-1)), returnEndpointDistance = distance(r?.position, a.approachStart);
 require(forwardEndpointDistance <= .03, 'Forward endpoint is outside .03m of accepted route end');
 require(returnEndpointDistance <= .03, 'Return endpoint is outside .03m of approach start');
 const fv = Array.isArray(f?.visits) ? f.visits : [], rv = Array.isArray(r?.visits) ? r.visits : [], pv = Array.isArray(persisted?.visits) ? persisted.visits : [];
 // Snapshot transport can round the last IEEE754 digit. IDs/events/timestamps are exact;
 // positions allow only 1 nanometre of serialization noise, not movement tolerance.
 const sameVisit = (x: any, y: any) => Boolean(x && y && x.eventId === y.eventId && x.event === y.event && x.at === y.at && distance(x.position, y.position) <= 1e-9);
 require(fv.length > 0 && rv.length === fv.length + 1 && fv.every((v: any, i: number) => sameVisit(v, rv[i])), 'Return does not append exactly one visit to the forward visit sequence');
 require(rv.length > 1 && pv.length >= rv.length && rv.every((v: any, i: number) => sameVisit(v, pv[i])), 'Observed visits are not a prefix of persisted visits');
 const cross = fv.at(-1), returned = rv.at(-1);
 require(cross?.event === 'crossed' && returned?.event === 'returned' && cross?.eventId !== returned?.eventId, 'Missing distinct new crossed/returned visit pair');
 require(new Set(rv.map((v: any) => v.eventId)).size === rv.length && rv.every((v: any, i: number) => typeof v.eventId === 'string' && /^[0-9a-f-]{36}$/i.test(v.eventId) && v.event === (i % 2 ? 'returned' : 'crossed') && Number.isFinite(Date.parse(v.at))), 'Invalid, repeated or unordered visit identities');
 require(Number.isFinite(Date.parse(cross?.at)) && Date.parse(cross?.at) <= Date.parse(returned?.at), 'Visit timestamps do not establish crossing before return');
 const seamEye = a.seam ? [a.seam[0], a.seam[1] + a.options.eyeHeight, a.seam[2]] : null;
 require(distance(cross?.position, seamEye) <= .6 && distance(returned?.position, seamEye) <= .6, 'Visit positions do not match assessed entry seam');
 return {reasons, forwardEndpointDistance: Number.isFinite(forwardEndpointDistance) ? forwardEndpointDistance : null, returnEndpointDistance: Number.isFinite(returnEndpointDistance) ? returnEndpointDistance : null};
}

export async function verifyBrowserAttempt(input: {directory: string; inspection: string; candidateId: string; worldId: string; scale: number; primaryScale: number; sourceSha256: string | null; report: any; assessment: PassageAssessment | null}): Promise<BrowserVerification> {
 const attempt = input.report?.attempts?.find((a: any) => a.scale === input.scale), declaredStatus = attempt?.status ?? null;
 const result: BrowserVerification = {status: 'not-assessed', declaredStatus, reasons: [], evidenceHashes: {}, forwardEndpointDistance: null, returnEndpointDistance: null};
 if (!attempt) return result;
 const read = async (path: string, key: string) => {const bytes = await readFile(path); result.evidenceHashes[key] = hash(bytes); return JSON.parse(bytes.toString('utf8'));};
 try {
  if (!input.assessment || !input.sourceSha256) throw new Error('No original accepted source assessment');
  const evidencePath = (name: string) => {
   const file = attempt.evidence?.[name]; if (typeof file !== 'string' || !file) throw new Error(`Missing ${name} evidence path`);
   const full = resolve(input.directory, file), rel = relative(resolve(input.directory), full);
   if (rel === '..' || rel.startsWith('..' + sep) || resolve(file) === file) throw new Error('Evidence path must stay within candidate directory');
   return full;
  };
  const caseId = input.scale === input.primaryScale ? input.candidateId : `${input.candidateId}-scale${input.scale}`;
  const saved = await read(join(input.directory, `assessment-scale${input.scale}.json`), 'assessment');
  if (JSON.stringify(saved) !== JSON.stringify(input.assessment)) throw new Error('Browser assessment differs from saved source assessment');
  const forward = await read(evidencePath('forward'), 'forward'), returned = await read(evidencePath('returned'), 'returned'), persisted = await read(join(input.inspection, caseId + '.json'), 'persisted');
  const verified = verifyObservations({forward, returned, persisted, assessment: saved, assessmentSha256: result.evidenceHashes.assessment, caseId, worldId: input.worldId, sourceSha256: input.sourceSha256});
  Object.assign(result, verified);
  if (attempt.sourceSha256 !== input.sourceSha256) result.reasons.push('Browser report source hash mismatch');
  result.status = declaredStatus === 'failed' ? 'failed' : declaredStatus === 'passed' && !result.reasons.length ? 'passed' : 'invalid-evidence';
 } catch (error) {result.reasons.push(String(error)); result.status = declaredStatus === 'failed' ? 'failed' : 'invalid-evidence';}
 return result;
}
