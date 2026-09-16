/** Every predeclared candidate remains in the denominator, including absent evidence. */
import {writeFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {diagnose, isAssessment, readJson, saveJson, type Plan, type StudyAssessment} from './assess.ts';

export function wilson(successes: number, total: number) {
 if (!total) return null;
 const z = 1.959963984540054, p = successes / total, divisor = 1 + z * z / total;
 const center = (p + z * z / (2 * total)) / divisor, half = z * Math.sqrt(p * (1 - p) / total + z * z / (4 * total * total)) / divisor;
 return {lower: Math.max(0, center - half), upper: Math.min(1, center + half)};
}
export function browserPassed(browser: any, scale: number, sourceSha256: string | null) {
 const a = browser?.attempts?.find((a: any) => a.scale === scale);
 return Boolean(sourceSha256 && a?.status === 'passed' && a.entry === true && a.traversal === true && a.return === true && a.sourceSha256 === sourceSha256 && a.evidence);
}
export function summarizeRows(rows: any[], plan: Plan) {
 const distribution = (values: unknown[]) => {
  const numbers = values.filter((n): n is number => typeof n === 'number' && Number.isFinite(n)).sort((a, b) => a - b);
  return {measured: numbers.length, missing: values.length - numbers.length, min: numbers[0] ?? null, median: numbers.length ? (numbers[Math.floor((numbers.length - 1) / 2)] + numbers[Math.ceil((numbers.length - 1) / 2)]) / 2 : null, max: numbers.at(-1) ?? null, total: numbers.length ? numbers.reduce((a, b) => a + b, 0) : null};
 };
 const count = (selected: any[], scale: number) => {
  const geometryPasses = selected.filter(row => row.scales.find((a: any) => a.scale === scale)?.geometryPassed).length;
  const fullPipelinePasses = selected.filter(row => row.scales.find((a: any) => a.scale === scale)?.fullPipelinePassed).length;
  const eligible = selected.filter(row => row.scales.find((a: any) => a.scale === scale)?.geometryPassed && row.macStatus === 'ready');
  const browserPassed = eligible.filter(row => row.scales.find((a: any) => a.scale === scale)?.browserStatus === 'passed').length;
  const browserFailed = eligible.filter(row => row.scales.find((a: any) => a.scale === scale)?.browserStatus === 'failed').length;
  return {planned: selected.length, geometryPasses, geometryWilson95: wilson(geometryPasses, selected.length), fullPipelinePasses, fullPipelineWilson95: wilson(fullPipelinePasses, selected.length), browser: {eligible: eligible.length, passed: browserPassed, failed: browserFailed, notAssessed: eligible.length - browserPassed - browserFailed, conditionalPassRateAmongTested: browserPassed + browserFailed ? browserPassed / (browserPassed + browserFailed) : null}};
 };
 const categories = [...new Set(rows.map(row => row.category))].map(category => ({category, primary: count(rows.filter(r => r.category === category), plan.primaryScale), secondary: plan.secondaryScales.map(scale => ({scale, ...count(rows.filter(r => r.category === category), scale)}))}));
 const promptPairs = [...new Set(rows.map(r => `${r.category}/${r.promptVariant}`))].map(key => {
  const paired = rows.filter(r => `${r.category}/${r.promptVariant}` === key);
  return {key, seeds: paired.map(r => r.seed), primaryGeometryPasses: paired.filter(r => r.scales.find((a: any) => a.scale === plan.primaryScale)?.geometryPassed).length, primaryFullPipelinePasses: paired.filter(r => r.scales.find((a: any) => a.scale === plan.primaryScale)?.fullPipelinePassed).length};
 });
 const primary = count(rows, plan.primaryScale), topologyFailures = rows.filter(r => r.scales.find((a: any) => a.scale === plan.primaryScale)?.diagnosis?.topologyFailure).length;
 const complete = rows.every(r => r.collected && r.assessmentPresent && r.scales.filter((a: any) => a.scale === plan.primaryScale).every((a: any) => !a.geometryPassed || r.macStatus !== 'ready' || r.preparationStatus === 'preparation-failed' || a.browserStatus !== 'not-assessed'));
 const canStillMeetThreshold = (primary.fullPipelinePasses + rows.filter(r => !r.collected || !r.assessmentPresent || r.scales.find((a: any) => a.scale === plan.primaryScale)?.browserStatus === 'not-assessed' && r.scales.find((a: any) => a.scale === plan.primaryScale)?.geometryPassed).length) / rows.length >= .8;
 return {schemaVersion: 1, studyId: plan.studyId, generatedAt: new Date().toISOString(), complete, primary: {scale: plan.primaryScale, ...primary}, secondary: plan.secondaryScales.map(scale => ({scale, ...count(rows, scale)})),
  scaleAdjustedGeometryPasses: rows.filter(r => r.scales.some((a: any) => a.geometryPassed)).length, topologyFailures, topologyFailureFractionOfPlanned: topologyFailures / rows.length,
  categories, promptPairs, pairedSeedConsistency: {bothPrimaryFullPass: promptPairs.filter(p => p.primaryFullPipelinePasses === 2).length, onePrimaryFullPass: promptPairs.filter(p => p.primaryFullPipelinePasses === 1).length, neitherPrimaryFullPass: promptPairs.filter(p => p.primaryFullPipelinePasses === 0).length, bothPrimaryGeometryPass: promptPairs.filter(p => p.primaryGeometryPasses === 2).length, onePrimaryGeometryPass: promptPairs.filter(p => p.primaryGeometryPasses === 1).length},
  measurements: {generationSeconds: distribution(rows.map(r => r.measurements?.generationSeconds)), glbBytes: distribution(rows.map(r => r.measurements?.glbBytes)), plyBytes: distribution(rows.map(r => r.measurements?.plyBytes)), meshTriangles: distribution(rows.map(r => r.measurements?.meshTriangles)), sampledPeakWholeDeviceMiB: distribution(rows.map(r => {const peaks = Object.values(r.measurements?.wholeDeviceMemory?.devices ?? {}).map((d: any) => d.sampledPeakMiB).filter((v): v is number => typeof v === 'number'); return peaks.length ? Math.max(...peaks) : null;}))},
  failureCounts: Object.fromEntries([...new Set(rows.map(r => r.primaryCause))].map(cause => [cause, rows.filter(r => r.primaryCause === cause).length])),
  continuation: {status: complete ? (primary.fullPipelinePasses / rows.length >= .8 && categories.every(c => c.primary.fullPipelinePasses >= 2) && topologyFailures / rows.length < .2 ? 'retain-working-backend' : 'benchmark-fallbacks') : 'incomplete', primaryThresholdAlreadyUnreachable: !canStillMeetThreshold, topologyTriggerReached: topologyFailures / rows.length >= .2},
  limitations: ['Descriptive convenience sample; Wilson intervals do not establish population generalizability.', 'Secondary scales never replace primary failures.', 'Browser acceptance requires explicit source-bound browser evidence; offline replay does not qualify.', 'Topology failures count bounded support/clearance/entry/connectivity rejections at primary scale; enclosure-only and ambiguous sustained-enclosure findings are excluded. No claim of universal impossibility.', 'Maximum connected displacement describes checked graph edges; it alone proves neither exterior entry nor an accepted enclosed route.'], rows};
}

export async function summarizeStudy(plan: Plan, data: string) {
 const rows = [], preparation = await readJson(join(data, 'inspection/preparation.json'));
 for (const candidate of plan.candidates) {
  const directory = join(data, 'candidates', candidate.id);
  const state = await readJson(join(directory, 'candidate.json')), report = await readJson(join(directory, 'generation-report.json'));
  const batch: StudyAssessment | null = await readJson(join(directory, 'assessment.json')), browser = await readJson(join(directory, 'browser.json'));
  const visualReview = await readJson(join(directory, 'visual-review.json')), prepared = preparation?.find((p: any) => p.id === candidate.id);
  const scales = [plan.primaryScale, ...plan.secondaryScales].map(scale => {
   const attempt = batch?.attempts.find(a => a.transform.scale === scale), geometryPassed = attempt?.status === 'passed';
   const evidence = browser?.attempts?.find((a: any) => a.scale === scale), accepted = browserPassed(browser, scale, batch?.source?.sha256 ?? null);
   return {scale, geometryPassed, fullPipelinePassed: geometryPassed && state?.gpuStatus === 'succeeded' && state?.macStatus === 'ready' && accepted,
    browserStatus: accepted ? 'passed' : evidence?.status === 'failed' ? 'failed' : 'not-assessed', diagnosis: attempt ? diagnose(attempt) : null, metrics: attempt && isAssessment(attempt) ? attempt.metrics : null};
  });
  const primary = scales[0];
  rows.push({...candidate, collected: state?.collected === true, assessmentPresent: batch !== null, jobId: state?.jobId ?? null, worldId: state?.worldId ?? null, sourceSha256: batch?.source?.sha256 ?? null,
   gpuStatus: state?.gpuStatus ?? 'pending', macStatus: state?.macStatus ?? 'pending', failureStage: state?.failureStage ?? report?.stage ?? null,
   primaryCause: !state?.collected ? 'pending' : state.gpuStatus !== 'succeeded' ? `pipeline-${state.failureStage ?? report?.stage ?? 'generation'}` : !batch ? 'assessment-pending' : !primary.geometryPassed ? primary.diagnosis?.cause : state.macStatus !== 'ready' ? 'pipeline-import' : prepared?.status === 'preparation-failed' ? 'pipeline-inspection-preparation' : primary.browserStatus === 'failed' ? 'browser-failure' : primary.browserStatus === 'not-assessed' ? 'browser-pending' : 'passed',
   preparationStatus: prepared?.status ?? 'not-prepared', preparationError: prepared?.status === 'preparation-failed' ? prepared.reason : null,
   scales, rawTopology: batch?.rawTopology ?? null, sourceImageFidelity: visualReview?.sourceImageFidelity ?? 'not-assessed', visualReview, scaleSensitive: scales.slice(1).some(a => a.geometryPassed !== primary.geometryPassed), secondaryRescue: !primary.geometryPassed && scales.slice(1).some(a => a.geometryPassed),
   measurements: {generationSeconds: report?.wallSeconds ?? state?.generationSeconds ?? null, stageSeconds: Object.fromEntries(Object.entries(report?.stages ?? {}).map(([key, value]: [string, any]) => [key, value.wallSeconds ?? null])),
    wholeDeviceMemory: report?.deviceMemoryMeasurement ?? null, glbBytes: report?.artifacts?.find((a: any) => a.path === 'collider.glb')?.bytes ?? null, plyBytes: report?.artifacts?.find((a: any) => a.path === 'scene.ply')?.bytes ?? null,
    meshTriangles: report?.stages?.trellis?.metrics?.meshTriangleCount ?? null, tokenCounts: report?.stages?.image?.metrics?.tokenCounts ?? null},
   provenance: {workerCommit: report?.vastnessGit?.stdout ?? state?.workerCommit ?? null, trellisCommit: report?.trellisPreflight?.source?.stdout ?? null, imageModel: report?.pins?.imageModel?.revision ?? null}});
 }
 return summarizeRows(rows, plan);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
 const args = process.argv.slice(2), value = (name: string, fallback: string) => {const at = args.indexOf(name); return at < 0 ? fallback : args[at + 1];};
 const root = resolve(value('--root', '.')), data = resolve(value('--data', join(root, '.runtime/reliability'))), plan = await readJson(value('--plan', join(root, 'scripts/reliability/plan.json')));
 const summary = await summarizeStudy(plan, data); await saveJson(join(data, 'summary.json'), summary);
 await writeFile(join(data, 'rows.jsonl'), summary.rows.map(row => JSON.stringify(row)).join('\n') + '\n');
 console.log(JSON.stringify({...summary, rows: undefined}, null, 2));
}
