/** Assemble immutable local artifact references for the disposable inspection server. */
import {access, mkdir, readFile, writeFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import type {PassageCaseSource} from '../services/passage-prototype/server.ts';
const root = resolve('.runtime'), output = join(root, 'generated-passage/inspection');
const sources: PassageCaseSource[] = [];
for (const [id, worldId, comparison] of [
  ['mushroom', 'intent-4b29932c-114d-4673-89f3-fa15e3f895a4', 'comparison2'],
  ['crystal', 'intent-096c4d7e-3213-4bd4-af72-40ca7630a010', 'comparison3'],
]) {
  const world = JSON.parse(await readFile(join(root, 'intention-generation/worlds', worldId + '.json'), 'utf8'));
  const evidence = join(root, 'intention-generation/evidence', comparison);
  sources.push({id, label: `${id} · material control (not a passage)`, worldId, rawIntent: world.rawIntent.text, semantics: world.semantics,
    files: {scene: join(root, 'intention-generation/worlds', worldId, 'scene.json'), colors: join(root, 'generated-passage/colors', id + '.json'), glb: join(evidence, 'collider.glb'), ply: join(evidence, 'scene.ply')}});
}
for (const id of ['arch', 'tunnel', 'courtyard']) {
  const directory = join(root, 'generated-passage/candidates', id);
  try {await access(join(directory, 'colors.json'));} catch {continue;}
  const world = JSON.parse(await readFile(join(directory, 'world.json'), 'utf8'));
  const files: PassageCaseSource['files'] = {scene: join(root, 'intention-generation/worlds', world.id, 'scene.json'), colors: join(directory, 'colors.json'), glb: join(directory, 'collider.glb'), ply: join(directory, 'scene.ply')};
  try {
    const batch = JSON.parse(await readFile(join(root, 'generated-passage/assessments', id + '.json'), 'utf8'));
    const assessment = batch.attempts ? batch.attempts[batch.acceptedAttempt ?? 0] : batch;
    assessment.sourceSha256 ??= batch.source?.sha256;
    const path = join(directory, 'selected-assessment.json'); await writeFile(path, JSON.stringify(assessment, null, 2) + '\n'); files.assessment = path;
  } catch (error) {if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;}
  sources.push({id, label: `${id} · generated negative-space candidate`, worldId: world.id, rawIntent: world.rawIntent.text, semantics: world.semantics, files});
}
await mkdir(output, {recursive: true}); await writeFile(join(output, 'index.json'), JSON.stringify(sources, null, 2) + '\n');
console.log(JSON.stringify({cases: sources.map(({id, files}) => ({id, assessed: Boolean(files.assessment)})), output}, null, 2));
