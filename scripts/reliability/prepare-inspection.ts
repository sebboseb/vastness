/** Prepare immutable study cases using the unchanged color projection and renderer contract. */
import {mkdir, readFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {preparePassageColors} from '../prepare-passage-colors.ts';
import type {PassageCaseSource} from '../../services/passage-prototype/server.ts';
import {isAssessment, readJson, saveJson, sha256, type Plan, type StudyAssessment} from './assess.ts';

export async function prepareInspection(plan: Plan, root: string, data: string, secondary = false) {
 const sources: PassageCaseSource[] = [], diagnostics = [];
 for (const candidate of plan.candidates) {
  const directory = join(data, 'candidates', candidate.id), batch: StudyAssessment | null = await readJson(join(directory, 'assessment.json'));
  const state = await readJson(join(directory, 'candidate.json')), world = await readJson(join(directory, 'world.json'));
  const attempts = batch?.attempts.filter(a => a.status === 'passed' && (secondary || a.transform.scale === plan.primaryScale)) ?? [];
  if (!attempts.length) {diagnostics.push({id: candidate.id, status: 'not-eligible', reason: 'No accepted geometry at requested scales'}); continue;}
  try {
   if (state?.macStatus !== 'ready' || world?.status !== 'ready') throw new Error('Mac preparation/import did not succeed; diagnostic geometry cannot count as pipeline success');
   const scene = join(root, '.runtime/intention-generation/worlds', world.id, 'scene.json'), glb = join(directory, 'collider.glb'), ply = join(directory, 'scene.ply'), colors = join(directory, 'colors.json');
   const prepared = await readJson(scene), report = await readJson(join(directory, 'generation-report.json'));
   const glbHash = sha256(await readFile(glb)), plyHash = sha256(await readFile(ply));
   if (glbHash !== batch?.source?.sha256 || prepared?.sources?.glb?.sha256 !== glbHash || report?.artifacts?.find((a: any) => a.path === 'scene.ply')?.sha256 !== plyHash) throw new Error('Prepared scene/original artifact hash binding failed');
   const existingColors = await readJson(colors), sceneHash = sha256(await readFile(scene));
   if (!existingColors) await preparePassageColors(scene, ply, colors);
   else if (existingColors.source.scene.sha256 !== sceneHash || existingColors.source.ply.sha256 !== plyHash) throw new Error('Previously prepared colors no longer match immutable source');
   for (const attempt of attempts) {
    if (!isAssessment(attempt) || attempt.sourceSha256 !== glbHash) throw new Error('Assessment/source hash binding failed');
    const scale = attempt.transform.scale, id = scale === plan.primaryScale ? candidate.id : `${candidate.id}-scale${scale}`;
    const assessment = join(directory, `assessment-scale${scale}.json`), existing = await readJson(assessment);
    if (existing && JSON.stringify(existing) !== JSON.stringify(attempt)) throw new Error('Refusing to overwrite a changed immutable browser assessment');
    if (!existing) await saveJson(assessment, attempt);
    sources.push({id, label: `${candidate.category} · prompt ${candidate.promptVariant} · seed ${candidate.seed} · ${scale === plan.primaryScale ? 'primary' : 'secondary only'} scale ${scale}`, worldId: world.id, rawIntent: candidate.text, semantics: world.semantics, files: {scene, colors, glb, ply, assessment}});
   }
   diagnostics.push({id: candidate.id, status: 'prepared', scales: attempts.map(a => a.transform.scale)});
  } catch (error) {diagnostics.push({id: candidate.id, status: 'preparation-failed', reason: String(error)});}
 }
 await mkdir(join(data, 'inspection'), {recursive: true});
 await saveJson(join(data, 'inspection/index.json'), sources); await saveJson(join(data, 'inspection/preparation.json'), diagnostics);
 return {cases: sources.map(s => s.id), diagnostics};
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
 const args = process.argv.slice(2), value = (name: string, fallback: string) => {const at = args.indexOf(name); return at < 0 ? fallback : args[at + 1];};
 const root = resolve(value('--root', '.')), data = resolve(value('--data', join(root, '.runtime/reliability'))), plan = await readJson(value('--plan', join(root, 'scripts/reliability/plan.json')));
 console.log(JSON.stringify(await prepareInspection(plan, root, data, args.includes('--secondary')), null, 2));
}
