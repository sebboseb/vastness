/** Frozen-artifact CPU study. Selection and outcome evaluation are separate commands. */
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {parsePassageGlb} from '../../apps/web/src/generated-passage/navigation.ts';
import {assessPassage} from '../passage-geometry.ts';
import {readJson, saveJson, sha256, type Plan} from '../reliability/assess.ts';
import {selectPhysicalScale, PHYSICAL_SCALES} from './scale.ts';
import {deriveSpatialCriteria} from './criteria.ts';
import {assessInterpretedSpace} from './routes.ts';
import type {PassageCaseSource} from '../../services/passage-prototype/server.ts';

const root = resolve('.'), data = join(root, '.runtime/interpretation-study');
const oldData = join(root, '.runtime/reliability/candidates');
const methodFiles = ['scripts/reliability/plan.json', 'scripts/reliability/verify-browser.ts', 'scripts/interpretation/browser-recorder.mjs', 'services/passage-prototype/server.ts', 'apps/web/src/generated-passage/main.ts', 'scripts/interpretation/study.ts', 'scripts/interpretation/summarize.ts', 'scripts/interpretation/scale.ts', 'scripts/interpretation/criteria.ts', 'scripts/interpretation/routes.ts', 'scripts/passage-geometry.ts', 'apps/web/src/generated-passage/navigation.ts'];
export async function methods() {return Object.fromEntries(await Promise.all(methodFiles.map(async p => [p, sha256(await readFile(join(root, p)))])));}
async function original(id: string) {
 const directory = join(oldData, id), bytes = await readFile(join(directory, 'collider.glb'));
 const report = await readJson(join(directory, 'generation-report.json'));
 const source = {sha256: sha256(bytes), bytes: bytes.length};
 const expected = report.artifacts.find((a: any) => a.path === 'collider.glb');
 if (expected?.sha256 !== source.sha256 || expected.bytes !== source.bytes) throw Error('Original source hash/size changed: ' + id);
 const mesh = parsePassageGlb(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer);
 return {mesh, source, directory};
}
async function select(plan: Plan) {
 const path = join(data, 'selections.json');
 if (await readJson(path)) throw Error('Selections are immutable; refusing to rerun');
 const frozenMethods = await methods(), startedAt = new Date().toISOString(), selections = [];
 for (const c of plan.candidates) {
  const {mesh, source} = await original(c.id), start = performance.now();
  // Deliberately only triangle arrays and the predeclared scale set enter the selector.
  const selection = selectPhysicalScale(mesh, [...PHYSICAL_SCALES]);
  selections.push({id: c.id, source, selection, elapsedMs: performance.now() - start});
  console.log(JSON.stringify({id: c.id, selectedScale: selection.selectedScale}));
 }
 if (JSON.stringify(await methods()) !== JSON.stringify(frozenMethods)) throw Error('Methods changed while selecting');
 await writeFile(path, JSON.stringify({schemaVersion: 1, startedAt, frozenAt: new Date().toISOString(), methods: frozenMethods, scales: PHYSICAL_SCALES, selections}, null, 2) + '\n', {flag: 'wx'});
 await writeFile(join(data, 'selections.sha256'), sha256(await readFile(path)) + '\n', {flag: 'wx'});
}
async function evaluate(plan: Plan, id?: string) {
 const lockBytes = await readFile(join(data, 'selections.json')), lock = JSON.parse(lockBytes.toString()), lockHash = sha256(lockBytes);
 if (lockHash !== (await readFile(join(data, 'selections.sha256'), 'utf8')).trim() || lock.selections.length !== 36 || JSON.stringify(await methods()) !== JSON.stringify(lock.methods)) throw Error('Selection/method freeze mismatch');
 for (const c of plan.candidates.filter(c => !id || c.id === id)) {
  const out = join(data, 'candidates', c.id); await mkdir(out, {recursive: true});
  const chosen = lock.selections.find((s: any) => s.id === c.id), {mesh, source, directory} = await original(c.id);
  if (chosen.source.sha256 !== source.sha256) throw Error('Source changed since selection');
  const world = await readJson(join(directory, 'world.json'));
  if (world.rawIntent.text !== c.text) throw Error('Original intent mismatch');
  const criteria = deriveSpatialCriteria(world.rawIntent.text, world.semantics);
  await saveJson(join(out, 'intent.json'), {rawIntent: world.rawIntent, semantics: world.semantics, criteria});
  let minY = Infinity; for (let i = 1; i < mesh.positions.length; i += 3) minY = Math.min(minY, mesh.positions[i]);
  const attempt = async (scale: number, mode: 'old-strict'|'legacy'|'expanded') => {
   const path = join(out, `${mode}-scale${scale}.json`), previous = await readJson(path);
   if (previous) {if (previous.selectionFreeze !== lockHash) throw Error('Prior attempt freeze mismatch'); return previous;}
   const transform = {scale, yaw: 0, position: [0, -minY * scale, 0] as [number, number, number]}, start = performance.now();
   let result: any;
   try {result = mode === 'old-strict' ? assessPassage({mesh, transform}) : assessInterpretedSpace({mesh, transform, criteria, searchMode: mode});}
   catch (error) {result = {status: 'failed', transform, assessmentError: String(error)};}
   result = {...result, sourceSha256: source.sha256, selectionFreeze: lockHash, elapsedMs: performance.now() - start};
   await saveJson(path, result); console.log(JSON.stringify({id: c.id, mode, scale, status: result.status, seconds: result.elapsedMs / 1000})); return result;
  };
  const scale = chosen.selection.selectedScale;
  await attempt(scale, 'old-strict'); await attempt(scale, 'legacy');
  for (const value of PHYSICAL_SCALES) await attempt(value, 'expanded');
  const selected = await readJson(join(out, `expanded-scale${scale}.json`));
  if (!await readJson(join(out, 'selected-assessment.json'))) await saveJson(join(out, 'selected-assessment.json'), selected);
 }
}
async function prepare(plan: Plan) {
 const lock = await readJson(join(data, 'selections.json')), sources: PassageCaseSource[] = [];
 for (const c of plan.candidates) {
  const out = join(data, 'candidates', c.id), a = await readJson(join(out, 'selected-assessment.json'));
  if (!a || a.assessmentError) continue;
  const directory = join(oldData, c.id), world = await readJson(join(directory, 'world.json'));
  const scene = join(root, '.runtime/intention-generation/worlds', world.id, 'scene.json'), colors = join(directory, 'colors.json'), glb = join(directory, 'collider.glb'), ply = join(directory, 'scene.ply');
  const source = lock.selections.find((s: any) => s.id === c.id).source, prepared = await readJson(scene), color = await readJson(colors);
  if (sha256(await readFile(glb)) !== source.sha256 || prepared.sources.glb.sha256 !== source.sha256 || color.source.scene.sha256 !== sha256(await readFile(scene)) || color.source.ply.sha256 !== sha256(await readFile(ply))) throw Error('Visual/source binding changed');
  sources.push({id: c.id, label: `${c.category} · ${c.promptVariant}/${c.seed} · automatic scale ${a.transform.scale}${a.status === 'passed' ? '' : ' · inspection only'}`, worldId: world.id, rawIntent: c.text, semantics: world.semantics, files: {scene, colors, glb, ply, assessment: join(out, 'selected-assessment.json')}});
 }
 await mkdir(join(data, 'inspection'), {recursive: true}); await saveJson(join(data, 'inspection/index.json'), sources);
 console.log(JSON.stringify({prepared: sources.length, eligible: (await Promise.all(sources.map(async s => (await readJson(s.files.assessment!)).status === 'passed'))).filter(Boolean).length}));
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
 const plan: Plan = await readJson(join(root, 'scripts/reliability/plan.json')); await mkdir(data, {recursive: true});
 const command = process.argv[2];
 if (command === 'select') await select(plan);
 else if (command === 'evaluate') await evaluate(plan, process.argv[3]);
 else if (command === 'prepare') await prepare(plan);
 else throw Error('Use select, evaluate [candidate-id], or prepare');
}
