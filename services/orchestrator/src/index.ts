import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer, type ServerResponse } from 'node:http';
import { join, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { setTimeout as delay } from 'node:timers/promises';
import { pathToFileURL } from 'node:url';
import { createWorkerGateway } from './worker-gateway.ts';
import { PlayerPoseSchema, WorldSchema, type Artifact, type Chunk, type World } from '../../../packages/protocol/src/index.ts';

class HttpError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}

function missingFile(error: unknown) {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT';
}

function json(response: ServerResponse, status: number, body: unknown) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  response.end(JSON.stringify(body));
}

export async function createOrchestrator(options: { dataDir?: string; artifactDir?: string; workerUrl?: string; workerToken?: string } = {}) {
  const dataDir = resolve(options.dataDir ?? '.runtime');
  const artifactDir = resolve(options.artifactDir ?? 'artifacts');
  await mkdir(dataDir, { recursive: true });
  const gateway = createWorkerGateway({...options,dataDir,artifactDir});
  const database = new DatabaseSync(join(dataDir, 'world.sqlite'));
  database.exec('PRAGMA journal_mode = WAL; CREATE TABLE IF NOT EXISTS worlds (singleton INTEGER PRIMARY KEY CHECK (singleton = 1), document TEXT NOT NULL)');
  database.exec('CREATE TABLE IF NOT EXISTS player_save_clock (singleton INTEGER PRIMARY KEY CHECK (singleton = 1), timestamp REAL NOT NULL); INSERT OR IGNORE INTO player_save_clock VALUES (1, 0)');
  let initialization: Promise<World> | undefined;

  async function importArtifact(chunkId: string, filename: 'scene.ply' | 'collider.glb'): Promise<Artifact> {
    const bytes = await readFile(join(artifactDir, 'fixtures', chunkId, filename)).catch((error: unknown) => {
      if (missingFile(error)) throw new HttpError(503, 'Fixture files are missing; run npm run fixtures before opening the world');
      throw error;
    });
    const sha256 = createHash('sha256').update(bytes).digest('hex');
    const directory = join(artifactDir, 'objects', sha256);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, filename), bytes);
    return { url: `/artifacts/${sha256}/${filename}`, sha256, bytes: bytes.length, format: filename === 'scene.ply' ? 'ply' : 'glb', backend: 'authored-fixture-v1' };
  }

  async function initialize(): Promise<World> {
    const saved = database.prepare('SELECT document FROM worlds WHERE singleton = 1').get();
    if (saved) return WorldSchema.parse(JSON.parse(saved.document as string));
    const chunks: Chunk[] = [];
    for (const id of ['arrival', 'observatory']) {
      const arrival = id === 'arrival';
      chunks.push({
        id, label: arrival ? 'Arrival laboratory' : 'Coastal observatory',
        theme: 'Scandinavian coastal research station — authored fixture',
        transform: { position: [0, 0, arrival ? 0 : -18], rotation: [0, 0, 0] },
        bounds: { min: [-7, 0, -9], max: [7, 4, 9] }, status: 'ready',
        visualAsset: await importArtifact(id, 'scene.ply'), collisionAsset: await importArtifact(id, 'collider.glb'),
        portals: [{ id: arrival ? 'north' : 'south', position: [0, 0, -9], width: 3.2, height: 3.2, connectedTo: arrival ? 'observatory' : 'arrival' }],
        seed: arrival ? 1 : 2, backend: 'authored-fixture-v1',
      });
    }
    const world: World = { id: randomUUID(), prompt: 'An abandoned Scandinavian coastal research facility during a snowstorm', createdAt: new Date().toISOString(), chunks, player: { position: [0, 1.65, 5], yaw: 0, pitch: 0 } };
    database.prepare('INSERT INTO worlds (singleton, document) VALUES (1, ?)').run(JSON.stringify(world));
    return world;
  }

  function world() {
    initialization ??= initialize().catch((error: unknown) => { initialization = undefined; throw error; });
    return initialization;
  }

  const server = createServer((request, response) => {
    void (async () => {
      const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
      if (await gateway.handle(request,response,pathname)) return;
      if (request.method === 'GET' && pathname === '/api/health') {
        json(response, 200, { status: 'ok', mode: 'fixture' });
      } else if (request.method === 'GET' && pathname === '/api/world') {
        json(response, 200, await world());
      } else if (request.method === 'PUT' && pathname === '/api/player') {
        if (request.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') {
          json(response, 415, { error: 'Player pose requires application/json' });
          request.resume();
          return;
        }
        const body: Buffer[] = [];
        let size = 0;
        // Drain oversized requests while retaining at most the allowed body size.
        for await (const part of request) {
          size += part.length;
          if (size <= 16_384) body.push(Buffer.from(part));
        }
        if (size > 16_384) { json(response, 413, { error: 'Player pose exceeds 16384 bytes' }); return; }
        let input: unknown;
        try { input = JSON.parse(Buffer.concat(body).toString('utf8')); }
        catch { json(response, 400, { error: 'Player pose must be valid JSON' }); return; }
        const parsed = PlayerPoseSchema.safeParse(input);
        if (!parsed.success) { json(response, 400, { error: 'Player pose requires three finite coordinates, finite yaw, and pitch between -89 and 89' }); return; }
        const player = parsed.data;
        const timestamp = request.headers['x-pose-time'] === undefined ? performance.timeOrigin + performance.now() : Number(request.headers['x-pose-time']);
        if (!Number.isFinite(timestamp) || timestamp <= 0 || timestamp > Date.now() + 60_000) { json(response, 400, { error: 'Invalid pose timestamp' }); return; }
        const current = await world();
        const clock = database.prepare('SELECT timestamp FROM player_save_clock WHERE singleton = 1').get()!;
        if (timestamp <= Number(clock.timestamp)) { json(response, 200, current.player); return; }
        const updated = { ...current, player };
        database.exec('BEGIN IMMEDIATE');
        try {
          database.prepare('UPDATE worlds SET document = ? WHERE singleton = 1').run(JSON.stringify(updated));
          database.prepare('UPDATE player_save_clock SET timestamp = ? WHERE singleton = 1').run(timestamp);
          database.exec('COMMIT');
        } catch (error) { database.exec('ROLLBACK'); throw error; }
        initialization = Promise.resolve(updated);
        json(response, 200, player);
      } else if (request.method === 'GET' && /^\/api\/chunks\/[^/]+$/.test(pathname)) {
        const chunk = (await world()).chunks.find((candidate) => candidate.id === pathname.slice('/api/chunks/'.length));
        if (chunk?.id === 'observatory') await delay(350);
        if (chunk) json(response, 200, chunk);
        else json(response, 404, { error: 'Chunk not found' });
      } else if (request.method === 'GET' && /^\/artifacts\/[a-f0-9]{64}\/(scene\.ply|collider\.glb)$/.test(pathname)) {
        const artifact = (await world()).chunks.flatMap((chunk) => [chunk.visualAsset, chunk.collisionAsset]).find((candidate) => candidate.url === pathname);
        if (!artifact) { json(response, 404, { error: 'Artifact not found' }); return; }
        const bytes = await readFile(join(artifactDir, 'objects', artifact.sha256, pathname.split('/').at(-1)!)).catch((error: unknown) => {
          if (missingFile(error)) throw new HttpError(404, 'Stored artifact is missing');
          throw error;
        });
        response.writeHead(200, { 'content-type': artifact.format === 'glb' ? 'model/gltf-binary' : 'application/octet-stream', 'content-length': bytes.length, 'cache-control': 'public, max-age=31536000, immutable' });
        response.end(bytes);
      } else {
        json(response, 404, { error: 'Route not found' });
      }
    })().catch((error: unknown) => {
      if (response.destroyed) return;
      if (error instanceof HttpError) json(response, error.status, { error: error.message });
      else json(response, 500, { error: 'Unable to serve world data' });
    });
  });
  let closing: Promise<void> | undefined;
  function close() {
    closing ??= new Promise<void>((resolveClose, reject) => {
      if (!server.listening) { database.close(); gateway.close(); resolveClose(); return; }
      server.close((error) => { database.close(); gateway.close(); if (error) reject(error); else resolveClose(); });
    });
    return closing;
  }
  return { server, close };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const app = await createOrchestrator({workerUrl:process.env.WORKER_URL,workerToken:process.env.WORKER_TOKEN});
  app.server.listen(Number(process.env.PORT ?? 4310), process.env.HOST ?? '127.0.0.1', () => console.log('Vastness fixture orchestrator listening', app.server.address()));
  for (const signal of ['SIGINT', 'SIGTERM'] as const) process.once(signal, () => { void app.close(); });
}
