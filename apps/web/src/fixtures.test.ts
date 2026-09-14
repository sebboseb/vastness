import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { movePlayer } from '../../../packages/world-model/src/index.ts';
import type { CollisionBox, Vec3 } from '../../../packages/protocol/src/index.ts';

test('reproducible fixture artifacts describe solid rooms with a traversable shared aperture', async () => {
  const directory = await mkdtemp(resolve(tmpdir(),'vastness-fixtures-'));
  try {
    const script = fileURLToPath(new URL('../../../scripts/create-fixtures.ts',import.meta.url));
    const generate = () => execFileSync(process.execPath,['--import','tsx',script],{env:{...process.env,ARTIFACT_DIR:directory},stdio:'pipe'});
    generate();
    const hashes: string[] = [];
    for (const id of ['arrival','observatory']) {
      const ply = await readFile(resolve(directory,'fixtures',id,'scene.ply'));
      const glb = await readFile(resolve(directory,'fixtures',id,'collider.glb'));
      hashes.push(createHash('sha256').update(ply).update(glb).digest('hex'));
      const headerEnd = ply.indexOf('end_header\n') + 'end_header\n'.length;
      const header = ply.subarray(0,headerEnd).toString('ascii');
      const count = Number(header.match(/element vertex (\d+)/)?.[1]);
      assert.ok(header.startsWith('ply\nformat binary_little_endian 1.0\n'));
      assert.ok(count > 20_000,'room contains actual spatial Gaussian samples');
      assert.equal(ply.length-headerEnd,count*56);
      for (let offset = headerEnd; offset < ply.length; offset += 4) assert.ok(Number.isFinite(ply.readFloatLE(offset)));
      assert.equal(glb.readUInt32LE(0),0x46546c67);
      assert.equal(glb.readUInt32LE(8),glb.length);
      const json = JSON.parse(glb.subarray(20,20+glb.readUInt32LE(12)).toString()) as {nodes:{name:string;translation:Vec3;scale:Vec3}[]};
      const worldZ = id === 'observatory' ? -18 : 0;
      const boxes: CollisionBox[] = json.nodes.map(node => ({
        min:node.translation.map((n,i)=>n-node.scale[i]/2+(i===2?worldZ:0)) as Vec3,
        max:node.translation.map((n,i)=>n+node.scale[i]/2+(i===2?worldZ:0)) as Vec3,
      }));
      const east = movePlayer([0,1.65,worldZ],[30,0,0],boxes);
      assert.ok(east[0] < 6.6,'authored wall blocks the player');
      const towardPortal = id === 'arrival' ? -1 : 1;
      const start: Vec3 = [0,1.65,worldZ+towardPortal*7];
      const across = movePlayer(start,[0,0,towardPortal*4],boxes);
      assert.ok(Math.abs(across[2]-(start[2]+towardPortal*4))<1e-8,'center of aperture is open');
      const jamb = movePlayer([2,1.65,start[2]],[0,0,towardPortal*4],boxes);
      assert.ok(Math.abs(jamb[2]-worldZ)<9,'portal jamb blocks the player');
      if (id === 'arrival') {
        const equipment = movePlayer([0,1.65,-2.4],[-5,0,0],boxes);
        assert.ok(equipment[0]>-3.1,'field equipment blocks the player');
      }
    }
    generate();
    for (const [i,id] of ['arrival','observatory'].entries()) {
      const hash = createHash('sha256').update(await readFile(resolve(directory,'fixtures',id,'scene.ply'))).update(await readFile(resolve(directory,'fixtures',id,'collider.glb'))).digest('hex');
      assert.equal(hash,hashes[i],'authoring reproduces identical artifact bytes');
    }
  } finally {await rm(directory,{recursive:true,force:true});}
});
