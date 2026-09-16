import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash, randomUUID} from 'node:crypto';
import {createPassageService, type PassageCaseSource} from './server.ts';

test('accepted artifact identity and idempotent crossing survive service restart; rejected geometry stays closed', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'passage-service-'));
  const glb = Buffer.from('test-only-mesh-identity'), sourceSha256 = createHash('sha256').update(glb).digest('hex');
  const paths = Object.fromEntries(['glb', 'ply', 'scene', 'colors', 'assessment'].map(name => [name, join(directory, name)])) as PassageCaseSource['files'];
  await Promise.all(Object.entries(paths).map(([key, path]) => writeFile(path, key === 'glb' ? glb : key === 'assessment' ? JSON.stringify({status: 'passed', sourceSha256, route: [[0, 1.65, 0]]}) : '{}')));
  const source: PassageCaseSource = {id: 'fixture', label: 'Test fixture, not GPU evidence', worldId: 'test', rawIntent: 'test', semantics: {}, files: paths};
  let service = await createPassageService({directory, sources: [source]});
  async function listen() {await new Promise<void>(done => service.server.listen(0, '127.0.0.1', done)); return `http://127.0.0.1:${(service.server.address() as {port: number}).port}`;}
  let origin = await listen();
  const identity = ((await (await fetch(origin + '/api/passage/cases/fixture')).json()) as {identity: string}).identity;
  const visit = {identity, eventId: randomUUID(), event: 'crossed', position: [0, 1.65, 0]};
  const post = (value: unknown) => fetch(origin + '/api/passage/cases/fixture/visits', {method: 'POST', body: JSON.stringify(value)});
  try {
    assert.equal((await post({...visit, identity: '0'.repeat(64)})).status, 409);
    assert.equal((await post({...visit, event: 'returned'})).status, 409);
    assert.equal((await post({...visit, position: [9, 1.65, 0]})).status, 400);
    assert.equal((await post(visit)).status, 200); assert.equal((await post(visit)).status, 200);
    assert.equal((await post({...visit, event: 'returned'})).status, 409);
    assert.equal((await post({identity, eventId: randomUUID(), event: 'returned', position: [0, 1.65, 0]})).status, 200);
    const before = await (await fetch(origin + '/api/passage/cases/fixture')).json() as any;
    assert.equal(before.visits.length, 2);
    await service.close(); service = await createPassageService({directory, sources: [source]}); origin = await listen();
    const after = await (await fetch(origin + '/api/passage/cases/fixture')).json(); assert.deepEqual(after, before);
    assert.equal((await fetch(origin + before.assets.glb.url)).status, 200);
    await writeFile(paths.glb, 'corrupt'); assert.equal((await fetch(origin + before.assets.glb.url)).status, 409);
    await service.close(); await writeFile(paths.glb, glb); await writeFile(paths.assessment!, JSON.stringify({status: 'failed', reasons: ['No generated support']}));
    service = await createPassageService({directory, sources: [{...source, id: 'rejected'}]}); origin = await listen();
    assert.equal((await fetch(origin + '/api/passage/cases/rejected/visits', {method: 'POST', body: JSON.stringify(visit)})).status, 409);
  } finally {await service.close(); await rm(directory, {recursive: true, force: true});}
});
