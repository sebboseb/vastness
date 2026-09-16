import assert from 'node:assert/strict';
import {test} from 'node:test';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {assessPassage} from '../passage-geometry.ts';
import {verifyBrowserAttempt, verifyObservations} from './verify-browser.ts';
import {summarizeRows} from './summarize.ts';

function fixture() {
 const sourceSha256 = 'a'.repeat(64), identity = 'b'.repeat(64);
 const mesh = {positions: [-2, 0, -3, -2, 0, 3, 2, 0, 3, 2, 0, -3, -2, 3, -3, 2, 3, -3, 2, 3, 3, -2, 3, 3], indices: [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]};
 const assessment = {...assessPassage({mesh, transform: {scale: 1, yaw: 0, position: [0, 0, 0]}}), sourceSha256};
 assert.equal(assessment.status, 'passed');
 const bytes = JSON.stringify(assessment), assessmentSha256 = createHash('sha256').update(bytes).digest('hex');
 const seamEye = [...assessment.seam!]; seamEye[1] += 1.65;
 const crossed = {event: 'crossed', eventId: '00000000-0000-4000-8000-000000000001', at: '2026-09-16T00:00:01Z', position: seamEye};
 const returnedVisit = {event: 'returned', eventId: '00000000-0000-4000-8000-000000000002', at: '2026-09-16T00:00:02Z', position: seamEye};
 const common = {caseId: 'test', worldId: 'world', glbSha256: sourceSha256, identity, ready: true, representation: 'coarse', assessment: 'passed', pathRemaining: 0, walking: '', blocked: '', errors: 0, pendingVisits: 0};
 const audit = assessment.samples.map(s => ({position: s.eye, valid: true, headClearance: 1.8, supportTriangleIds: s.supportTriangleIds}));
 const forward = {...common, mode: 'generated', generatedTravel: 3.5, position: assessment.route.at(-1), support: assessment.samples.at(-1), visits: [crossed], audit};
 const returned = {...common, mode: 'scaffold', generatedTravel: 7, position: assessment.approachStart, visits: [crossed, returnedVisit], audit};
 const persisted = {identity, glbSha256: sourceSha256, assessmentSha256, visits: [crossed, returnedVisit]};
 return {forward, returned, persisted, assessment, assessmentSha256, caseId: 'test', worldId: 'world', sourceSha256, bytes};
}

test('real assessed endpoints, original support and persisted new visit pair verify independently', () => {
 assert.deepEqual(verifyObservations(fixture()).reasons, []);
 const f = fixture(); f.persisted = structuredClone(f.persisted); f.persisted.visits[0].position[0] += 1e-15;
 assert.deepEqual(verifyObservations(f).reasons, []);
 f.persisted.visits[0].position[0] += .001; assert.ok(verifyObservations(f).reasons.length > 0);
});
test('forged success flags cannot hide wrong endpoint, missing audit, stale identity, pending persistence or invalid visits', () => {
 const changes: ((input: any) => void)[] = [
  i => {i.forward.position = i.assessment.route[0];}, i => {i.returned.position = i.assessment.route.at(-1);},
  i => {i.forward.audit = [];}, i => {i.forward.audit[0].valid = false;}, i => {i.forward.support.supportTriangleIds = [-1];},
  i => {i.forward.audit[0].supportTriangleIds = [99999999];},
  i => {i.forward.identity = 'c'.repeat(64);}, i => {i.persisted.assessmentSha256 = 'c'.repeat(64);}, i => {i.returned.pendingVisits = 1;},
  i => {i.returned.visits = i.forward.visits;}, i => {i.persisted.visits = [];}, i => {i.returned.visits[1].eventId = i.forward.visits[0].eventId;},
  i => {i.forward.worldId = 'other';}, i => {i.forward.caseId = 'test-scale12';}, i => {i.forward.glbSha256 = 'c'.repeat(64);},
  i => {i.forward.representation = 'splat';}, i => {i.forward.generatedTravel = 2.99;}, i => {i.returned.errors = 1;}, i => {i.returned.walking = 'return';},
 ];
 for (const mutate of changes) {const input = structuredClone(fixture()); mutate(input); assert.ok(verifyObservations(input).reasons.length > 0, String(mutate));}
});
test('file-backed verifier rejects flags without evidence and binds exact saved assessment bytes', async () => {
 const directory = await mkdtemp(join(tmpdir(), 'browser-verification-')), inspection = join(directory, 'inspection'), f = fixture();
 const report = {attempts: [{scale: 1, status: 'passed', entry: true, traversal: true, return: true, sourceSha256: f.sourceSha256, evidence: {forward: 'forward.json', returned: 'returned.json'}}]};
 const input = {directory, inspection, candidateId: 'test', worldId: 'world', scale: 1, primaryScale: 1, sourceSha256: f.sourceSha256, report, assessment: f.assessment};
 try {
  assert.equal((await verifyBrowserAttempt(input)).status, 'invalid-evidence');
  await mkdir(inspection); await writeFile(join(directory, 'assessment-scale1.json'), f.bytes);
  await writeFile(join(directory, 'forward.json'), JSON.stringify(f.forward)); await writeFile(join(directory, 'returned.json'), JSON.stringify(f.returned)); await writeFile(join(inspection, 'test.json'), JSON.stringify(f.persisted));
  const result = await verifyBrowserAttempt(input); assert.equal(result.status, 'passed'); assert.ok(result.evidenceHashes.forward); assert.equal(result.forwardEndpointDistance, 0);
  await writeFile(join(directory, 'assessment-scale1.json'), f.bytes + '\n'); assert.equal((await verifyBrowserAttempt(input)).status, 'invalid-evidence');
  report.attempts[0].status = 'failed'; assert.equal((await verifyBrowserAttempt(input)).status, 'failed');
 } finally {await rm(directory, {recursive: true, force: true});}
});
test('primary completion never hides untested eligible secondary scales or invalid evidence', () => {
 const row = {collected: true, assessmentPresent: true, macStatus: 'ready', category: 'test', scales: [{scale: 6, geometryPassed: true, browserStatus: 'passed', fullPipelinePassed: true}, {scale: 10, geometryPassed: true, browserStatus: 'not-assessed', fullPipelinePassed: false}]};
 const plan = {studyId: 'test', primaryScale: 6, secondaryScales: [10], candidates: []};
 let summary = summarizeRows([row], plan); assert.equal(summary.primaryComplete, true); assert.equal(summary.complete, false);
 row.scales[1].browserStatus = 'invalid-evidence'; summary = summarizeRows([row], plan); assert.equal(summary.complete, false); assert.equal(summary.secondary[0].browser.invalidEvidence, 1);
 row.scales[1].browserStatus = 'failed'; assert.equal(summarizeRows([row], plan).complete, true);
});
