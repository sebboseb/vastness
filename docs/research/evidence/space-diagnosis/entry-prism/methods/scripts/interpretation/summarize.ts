/** Post-selection outcomes only. This module is never imported by the selector. */
import {readFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {readJson, saveJson, sha256} from '../reliability/assess.ts';
import {methods} from './study.ts';
import {verifyObservations} from '../reliability/verify-browser.ts';
const root = resolve('.'), data = join(root, '.runtime/interpretation-study');
const plan = await readJson('scripts/reliability/plan.json'), lock = await readJson(join(data, 'selections.json'));
const lockHash = sha256(await readFile(join(data, 'selections.json')));
if (!lock || lock.selections.length !== 36 || lockHash !== (await readFile(join(data, 'selections.sha256'), 'utf8')).trim() || JSON.stringify(await methods()) !== JSON.stringify(lock.methods)) throw Error('All immutable selections and frozen methods must exist before outcome summaries');
const rows: Record<string, any>[] = [];
for (const c of plan.candidates) {
 const dir = join(data, 'candidates', c.id), s = lock.selections.find((v: any) => v.id === c.id);
 const scale = s.selection.selectedScale, strict = await readJson(join(dir, `old-strict-scale${scale}.json`)), legacy = await readJson(join(dir, `legacy-scale${scale}.json`)), selected = await readJson(join(dir, 'selected-assessment.json'));
 const grid = await Promise.all(lock.scales.map(async (n: number) => ({scale: n, assessment: await readJson(join(dir, `expanded-scale${n}.json`))})));
 const old = await readJson(join(root, '.runtime/reliability-replay/candidates', c.id, 'assessment.json'));
 for (const [name, a, expectedScale] of [['strict', strict, scale], ['legacy', legacy, scale], ['selected', selected, scale], ...grid.map(g => ['expanded', g.assessment, g.scale])] as [string, any, number][]) {
  if (!a || !['passed', 'failed'].includes(a.status) || a.selectionFreeze !== lockHash || a.sourceSha256 !== s.source.sha256 || a.transform.scale !== expectedScale) throw Error('Missing or unbound outcome: ' + c.id + '/' + name + '/' + expectedScale);
 }
 if (JSON.stringify(selected) !== JSON.stringify(grid.find(g => g.scale === scale)!.assessment)) throw Error('Selected outcome differs from frozen selected-scale grid outcome');
 if (!old?.attempts?.some((a: any) => a.transform.scale === 6 && ['passed', 'failed'].includes(a.status) && a.sourceSha256 === s.source.sha256)) throw Error('Missing or unbound fixed6 reference');

 let browser: any = {status: selected?.status === 'passed' ? 'not-assessed' : 'not-eligible', reasons: []};
 const forward = await readJson(join(dir, 'browser/forward.json')), returned = await readJson(join(dir, 'browser/returned.json'));
 if (forward && returned) {
  const persisted = await readJson(join(data, 'inspection', c.id + '.json')), world = await readJson(join(root, '.runtime/reliability/candidates', c.id, 'world.json'));
  const verified = verifyObservations({forward, returned, persisted, assessment: selected, assessmentSha256: sha256(await readFile(join(dir, 'selected-assessment.json'))), caseId: c.id, worldId: world.id, sourceSha256: s.source.sha256});
  browser = {...verified, status: verified.reasons.length ? 'failed' : 'passed'};
 }
 const metrics = selected?.metrics;
 const failure = selected?.status === 'passed' ? browser.status === 'failed' ? 'browser-navigation-or-evidence' : null
  : selected?.assessmentError ? 'assessment-resource-or-error'
  : !metrics?.supportedPoints ? 'no-valid-sampled-player-support'
  : !metrics?.entryCandidates ? 'no-exterior-entry-found'
  : selected?.searchDiagnostics?.componentsExplored === 0 ? 'no-verified-exterior-entry'
  : metrics.maximumConnectedDisplacement < 3 ? 'no-connected-3m-route-found'
  : 'intent-topology-or-bounded-route-search';
 rows.push({...c, sourceSha256: s.source.sha256, selectedScale: scale,
  baselineFixed6: old?.attempts?.find((a: any) => a.transform.scale === 6)?.status === 'passed',
  selectedOldStrict: strict?.status === 'passed', selectedIntentLegacy: legacy?.status === 'passed', selectedIntentExpanded: selected?.status === 'passed',
  grid: grid.map(g => ({scale: g.scale, status: g.assessment?.status ?? 'pending', reasons: g.assessment?.reasons ?? [g.assessment?.assessmentError].filter(Boolean)})),
  fixed6IntentExpanded: grid.find(g => g.scale === 6)?.assessment?.status === 'passed',
  availableSuccess: grid.some(g => g.assessment?.status === 'passed'), browser,
  routeLength: metrics?.routeLength, routeDisplacement: metrics?.routeDisplacement,
  criteria: selected?.criteria, topologyWitnesses: selected?.topologyWitnesses, searchDiagnostics: selected?.searchDiagnostics,
  failure, reasons: selected?.reasons ?? [selected?.assessmentError].filter(Boolean), metrics});
}
const count = (key: string, subset = rows) => subset.filter(r => r[key]).length;
const categories = [...new Set(rows.map(r => r.category))].map(category => {
 const group = rows.filter(r => r.category === category);
 return {category, n: group.length, fixed6: count('baselineFixed6', group), fixed6IntentExpanded: count('fixed6IntentExpanded', group), selectedOldStrict: count('selectedOldStrict', group), selectedIntentLegacy: count('selectedIntentLegacy', group), selected: count('selectedIntentExpanded', group), anyScale: count('availableSuccess', group), browser: group.filter(r => r.browser.status === 'passed').length};
});
const summary = {schemaVersion: 1, generatedAt: new Date().toISOString(), selectionsSha256: sha256(await readFile(join(data, 'selections.json'))), n: rows.length,
 counts: {fixed6: count('baselineFixed6'), fixed6IntentExpanded: count('fixed6IntentExpanded'), selectedOldStrict: count('selectedOldStrict'), selectedIntentLegacy: count('selectedIntentLegacy'), selected: count('selectedIntentExpanded'), anyScale: count('availableSuccess'), browser: rows.filter(r => r.browser.status === 'passed').length},
 scaleHistogram: Object.fromEntries(lock.scales.map((n: number) => [n, rows.filter(r => r.selectedScale === n).length])),
 failureTaxonomy: Object.fromEntries([...new Set(rows.map(r => r.failure).filter(Boolean))].map(k => [k, rows.filter(r => r.failure === k).length])),
 scaleMisses: rows.filter(r => r.availableSuccess && !r.selectedIntentExpanded).map(r => r.id),
 recoveredFromFixed6: rows.filter(r => !r.baselineFixed6 && r.selectedIntentExpanded).map(r => r.id),
 lostFromFixed6: rows.filter(r => r.baselineFixed6 && !r.selectedIntentExpanded).map(r => r.id), categories, rows};
await saveJson(join(data, 'summary.json'), summary);
console.log(JSON.stringify({...summary, rows: undefined}, null, 2));
