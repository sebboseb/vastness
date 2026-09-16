/** Separate inspection records; never mutates intention worlds or M0 state. */
import {createServer} from 'node:http';
import {createHash, randomUUID} from 'node:crypto';
import {mkdir, readFile, rename, writeFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {z} from 'zod';

export type PassageCaseSource = {
  id: string; label: string; worldId: string; rawIntent: string; semantics: unknown;
  files: {scene: string; colors: string; glb: string; ply: string; assessment?: string};
};
type Visit = {eventId: string; event: 'crossed' | 'returned'; position: [number, number, number]; at: string};
const visitSchema = z.object({identity: z.string().regex(/^[a-f0-9]{64}$/), eventId: z.string().uuid(), event: z.enum(['crossed', 'returned']), position: z.tuple([z.number().finite(), z.number().finite(), z.number().finite()])});
const digest = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex');

export async function createPassageService(options: {directory?: string; sources?: PassageCaseSource[]} = {}) {
  const directory = resolve(options.directory ?? '.runtime/generated-passage/inspection');
  await mkdir(directory, {recursive: true});
  const sources = options.sources ?? JSON.parse(await readFile(join(directory, 'index.json'), 'utf8')) as PassageCaseSource[];
  const cases = new Map<string, {source: PassageCaseSource; assets: Record<string, {path: string; sha256: string; bytes: number; url: string}>; assessment: any; identity: string; visits: Visit[]}>();
  const pending = new Map<string, Promise<void>>();
  for (const source of sources) {
    if (!/^[a-z0-9_-]+$/.test(source.id) || cases.has(source.id)) throw new Error('Invalid or duplicate case identity');
    const assets: Record<string, {path: string; sha256: string; bytes: number; url: string}> = {};
    for (const [kind, file] of Object.entries(source.files)) {
      const path = resolve(file), bytes = await readFile(path), sha256 = digest(bytes);
      assets[kind] = {path, sha256, bytes: bytes.length, url: `/api/passage/cases/${source.id}/assets/${kind}/${sha256}/${kind === 'ply' ? 'scene.ply' : kind === 'glb' ? 'collider.glb' : kind + '.json'}`};
    }
    const assessment = source.files.assessment ? JSON.parse(await readFile(source.files.assessment, 'utf8')) : null;
    if (assessment?.status === 'passed' && assessment.sourceSha256 !== assets.glb.sha256) throw new Error(`Assessment is not bound to source GLB: ${source.id}`);
    const identity = digest(Buffer.from(JSON.stringify({worldId: source.worldId, rawIntent: source.rawIntent, semantics: source.semantics, assets: Object.fromEntries(Object.entries(assets).map(([kind, asset]) => [kind, asset.sha256]))})));
    let visits: Visit[] = [];
    try {
      const saved = JSON.parse(await readFile(join(directory, source.id + '.json'), 'utf8'));
      if (saved.identity !== identity) throw new Error(`Persisted destination changed: ${source.id}`);
      visits = saved.visits;
    } catch (error) {if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;}
    cases.set(source.id, {source, assets, assessment, identity, visits});
  }
  function publicCase(id: string) {
    const item = cases.get(id)!;
    return {id, identity: item.identity, label: item.source.label, worldId: item.source.worldId, rawIntent: item.source.rawIntent, semantics: item.source.semantics,
      assets: Object.fromEntries(Object.entries(item.assets).map(([kind, {path: _, ...asset}]) => [kind, asset])), assessment: item.assessment, visits: item.visits};
  }
  async function save(id: string) {
    const item = cases.get(id)!;
    const data = JSON.stringify({identity: item.identity, glbSha256: item.assets.glb.sha256, assessmentSha256: item.assets.assessment?.sha256, visits: item.visits}, null, 2);
    const previous = pending.get(id) ?? Promise.resolve();
    const task = previous.then(async () => {
      const temporary = join(directory, '.' + id + '-' + randomUUID() + '.tmp');
      await writeFile(temporary, data); await rename(temporary, join(directory, id + '.json'));
    });
    pending.set(id, task); await task;
  }
  const server = createServer(async (request, response) => {
    const json = (status: number, value: unknown) => {response.writeHead(status, {'Content-Type': 'application/json', 'Cache-Control': 'no-store'}); response.end(JSON.stringify(value));};
    try {
      const path = new URL(request.url ?? '/', 'http://127.0.0.1').pathname;
      if (request.method === 'GET' && path === '/api/passage/cases') {json(200, [...cases.keys()].map(publicCase)); return;}
      const match = /^\/api\/passage\/cases\/([a-z0-9_-]+)(?:\/(visits|assets)(?:\/([a-z]+)\/([a-f0-9]{64})\/[a-z]+\.(?:json|ply|glb))?)?$/.exec(path);
      const item = match ? cases.get(match[1]) : undefined;
      if (!match || !item) {json(404, {error: 'Unknown inspection case'}); return;}
      if (request.method === 'GET' && !match[2]) {json(200, publicCase(match[1])); return;}
      if (request.method === 'GET' && match[2] === 'assets') {
        const asset = item.assets[match[3]];
        if (!asset || asset.sha256 !== match[4]) {json(404, {error: 'Unknown artifact identity'}); return;}
        const bytes = await readFile(asset.path);
        if (digest(bytes) !== asset.sha256) {json(409, {error: 'Artifact changed after validation'}); return;}
        response.writeHead(200, {'Content-Type': ['scene', 'colors', 'assessment'].includes(match[3]) ? 'application/json' : 'application/octet-stream', 'Content-Length': bytes.length, 'Cache-Control': 'public,max-age=31536000,immutable'}); response.end(bytes); return;
      }
      if (request.method === 'POST' && match[2] === 'visits') {
        if (item.assessment?.status !== 'passed') {json(409, {error: 'No accepted generated passage'}); return;}
        let text = ''; for await (const chunk of request) {text += chunk; if (text.length > 2048) throw new Error('Visit too large');}
        const {identity, ...visit} = visitSchema.parse(JSON.parse(text));
        if (identity !== item.identity) {json(409, {error: 'Visit belongs to a different destination identity'}); return;}
        const entry = item.assessment.seam ? [item.assessment.seam[0], item.assessment.seam[1] + item.assessment.options.eyeHeight, item.assessment.seam[2]] : item.assessment.route[0] as number[];
        if (!entry || Math.hypot(...visit.position.map((n, i) => n - entry[i])) > .6) {json(400, {error: 'Crossing must occur at the assessed generated entry'}); return;}
        const existing = item.visits.find(v => v.eventId === visit.eventId);
        if (existing) {
          if (existing.event !== visit.event || existing.position.some((n, i) => n !== visit.position[i])) {json(409, {error: 'Visit identity conflicts'}); return;}
          await pending.get(match[1]); json(200, publicCase(match[1])); return;
        }
        if (visit.event === 'returned' && item.visits.at(-1)?.event !== 'crossed') {json(409, {error: 'Cannot return before crossing'}); return;}
        item.visits.push({...visit, at: new Date().toISOString()}); await save(match[1]); json(200, publicCase(match[1])); return;
      }
      json(405, {error: 'Unsupported operation'});
    } catch (error) {json(error instanceof z.ZodError || error instanceof SyntaxError ? 400 : 500, {error: String(error)});}
  });
  return {server, async close() {server.closeAllConnections(); if (server.listening) await new Promise<void>((done, reject) => server.close(e => e ? reject(e) : done())); await Promise.all(pending.values());}};
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const service = await createPassageService({directory: process.env.PASSAGE_DATA_DIR}); service.server.listen(4312, '127.0.0.1', () => console.log('Generated passage inspection API http://127.0.0.1:4312'));
  for (const signal of ['SIGINT', 'SIGTERM'] as const) process.once(signal, () => {void service.close().then(() => process.exit(0));});
}
