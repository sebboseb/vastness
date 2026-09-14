import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test, type TestContext } from 'node:test';
import { WorldSchema } from '../../../packages/protocol/src/index.ts';
import { createOrchestrator } from './index.ts';

async function fixtureFiles(artifactDir: string) {
  const files = new Map<string, Buffer>();
  for (const id of ['arrival', 'observatory']) {
    const ply = Buffer.from(`ply\nformat ascii 1.0\ncomment ${id}\nelement vertex 1\nproperty float x\nproperty float y\nproperty float z\nend_header\n0 0 0\n`);
    const json = Buffer.from(JSON.stringify({ asset: { version: '2.0' }, scene: 0, scenes: [{}] }).padEnd(80, ' '));
    const glb = Buffer.alloc(20 + json.length);
    glb.writeUInt32LE(0x46546c67, 0);
    glb.writeUInt32LE(2, 4);
    glb.writeUInt32LE(glb.length, 8);
    glb.writeUInt32LE(json.length, 12);
    glb.writeUInt32LE(0x4e4f534a, 16);
    json.copy(glb, 20);
    await mkdir(join(artifactDir, 'fixtures', id), { recursive: true });
    for (const [name, bytes] of [['scene.ply', ply], ['collider.glb', glb]] as const) {
      await writeFile(join(artifactDir, 'fixtures', id, name), bytes);
      files.set(`${id}/${name}`, bytes);
    }
  }
  return files;
}

async function setup(t: TestContext) {
  const root = await mkdtemp(join(tmpdir(), 'vastness-http-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const options = { dataDir: join(root, 'data'), artifactDir: join(root, 'artifacts') };
  const files = await fixtureFiles(options.artifactDir);
  async function start() {
    const app = await createOrchestrator(options);
    t.after(() => app.close());
    app.server.listen(0, '127.0.0.1');
    await once(app.server, 'listening');
    const address = app.server.address();
    assert.ok(address && typeof address !== 'string');
    return { ...app, url: `http://127.0.0.1:${address.port}` };
  }
  return { ...options, files, start };
}

test('world imports real fixture bytes and exposes connected chunks and immutable artifacts over HTTP', async (t) => {
  const { start, files } = await setup(t);
  const app = await start();
  assert.equal((await fetch(`${app.url}/api/health`)).status, 200);
  const response = await fetch(`${app.url}/api/world`);
  assert.equal(response.status, 200);
  const world = WorldSchema.parse(await response.json());
  assert.deepEqual(world.player, { position: [0, 1.65, 5], yaw: 0, pitch: 0 });
  assert.deepEqual(world.chunks.map((chunk) => chunk.id), ['arrival', 'observatory']);
  for (const chunk of world.chunks) {
    assert.equal(chunk.portals[0].connectedTo, chunk.id === 'arrival' ? 'observatory' : 'arrival');
    assert.deepEqual(chunk.portals[0].position, [0, 0, -9]);
    const loaded = await fetch(`${app.url}/api/chunks/${chunk.id}`);
    assert.equal(loaded.status, 200);
    assert.deepEqual(await loaded.json(), chunk);
    for (const [name, artifact] of [['scene.ply', chunk.visualAsset], ['collider.glb', chunk.collisionAsset]] as const) {
      const original = files.get(`${chunk.id}/${name}`)!;
      assert.equal(artifact.sha256, createHash('sha256').update(original).digest('hex'));
      assert.equal(artifact.bytes, original.length);
      assert.equal(artifact.url, `/artifacts/${artifact.sha256}/${name}`);
      const fetched = await fetch(`${app.url}${artifact.url}`);
      assert.equal(fetched.status, 200);
      assert.match(fetched.headers.get('cache-control') ?? '', /immutable/);
      assert.deepEqual(Buffer.from(await fetched.arrayBuffer()), original);
    }
  }
});

test('restart restores singleton identity, topology, saved player and original artifacts without fixture sources', async (t) => {
  const { start, artifactDir, files } = await setup(t);
  const first = await start();
  const worlds = await Promise.all(Array.from({ length: 4 }, async () => WorldSchema.parse(await (await fetch(`${first.url}/api/world`)).json())));
  assert.ok(worlds.every((world) => world.id === worlds[0].id));
  const world = worlds[0];
  const player = { position: [1, 1.65, -19], yaw: 130, pitch: -12 };
  const saved = await fetch(`${first.url}/api/player`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(player) });
  assert.equal(saved.status, 200);
  assert.deepEqual(await saved.json(), player);
  await first.close();
  await rm(join(artifactDir, 'fixtures'), { recursive: true });
  const restarted = await start();
  const restored = WorldSchema.parse(await (await fetch(`${restarted.url}/api/world`)).json());
  assert.deepEqual(restored, { ...world, player });
  const artifact = await fetch(`${restarted.url}${world.chunks[0].visualAsset.url}`);
  assert.equal(artifact.status, 200);
  assert.deepEqual(Buffer.from(await artifact.arrayBuffer()), files.get('arrival/scene.ply'));
});

test('invalid player requests return actionable errors and preserve the last saved pose', async (t) => {
  const { start } = await setup(t);
  const app = await start();
  const world = WorldSchema.parse(await (await fetch(`${app.url}/api/world`)).json());
  for (const body of ['{', 'null', '{}', '{"position":[0,1.65,0],"yaw":0,"pitch":90}', '{"position":[0,1.65,0],"yaw":1e400,"pitch":0}', '{"position":[0,1.65],"yaw":0,"pitch":0}', '{"position":["0",1.65,0],"yaw":0,"pitch":0}']) {
    const response = await fetch(`${app.url}/api/player`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body });
    assert.equal(response.status, 400, body);
    assert.equal(typeof (await response.json()).error, 'string');
  }
  const wrongType = await fetch(`${app.url}/api/player`, { method: 'PUT', headers: { 'content-type': 'text/plain' }, body: JSON.stringify(world.player) });
  assert.equal(wrongType.status, 415);
  const oversized = await fetch(`${app.url}/api/player`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...world.player, padding: 'x'.repeat(20_000) }) });
  assert.equal(oversized.status, 413);
  assert.deepEqual(WorldSchema.parse(await (await fetch(`${app.url}/api/world`)).json()).player, world.player);
});

test('missing chunks and assets return JSON errors and artifact paths cannot escape storage', async (t) => {
  const { start, artifactDir } = await setup(t);
  const app = await start();
  const world = WorldSchema.parse(await (await fetch(`${app.url}/api/world`)).json());
  const artifact = world.chunks[0].visualAsset;
  for (const path of ['/api/chunks/unknown', `/artifacts/${'f'.repeat(64)}/scene.ply`, `/artifacts/${artifact.sha256}/world.sqlite`, `/artifacts/${artifact.sha256}/%2e%2e%2fworld.sqlite`, `/artifacts/${artifact.sha256}/scene.ply%00`, '/artifacts/%2e%2e%2fworld.sqlite/scene.ply']) {
    const response = await fetch(`${app.url}${path}`);
    assert.equal(response.status, 404, path);
    assert.equal(typeof (await response.json()).error, 'string');
  }
  await rm(join(artifactDir, 'objects', artifact.sha256, 'scene.ply'));
  const missing = await fetch(`${app.url}${artifact.url}`);
  assert.equal(missing.status, 404);
  assert.equal(typeof (await missing.json()).error, 'string');
  assert.deepEqual(await (await fetch(`${app.url}/api/world`)).json(), world);
});

test('missing initial fixture is visible and initialization can recover without restarting', async (t) => {
  const { start, artifactDir, files } = await setup(t);
  await rm(join(artifactDir, 'fixtures', 'observatory', 'collider.glb'));
  const app = await start();
  assert.equal((await fetch(`${app.url}/api/health`)).status, 200);
  const missing = await fetch(`${app.url}/api/world`);
  assert.equal(missing.status, 503);
  assert.match((await missing.json()).error, /fixture/i);
  await writeFile(join(artifactDir, 'fixtures', 'observatory', 'collider.glb'), files.get('observatory/collider.glb')!);
  const ready = await fetch(`${app.url}/api/world`);
  assert.equal(ready.status, 200);
  assert.equal(WorldSchema.parse(await ready.json()).chunks.length, 2);
});
