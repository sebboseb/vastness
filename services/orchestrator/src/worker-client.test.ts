import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawn,execFileSync} from 'node:child_process';
import {createServer} from 'node:http';
import {once} from 'node:events';
import {createHash} from 'node:crypto';
import {createOrchestrator} from './index.ts';
import {WorkerClient} from './worker-client.ts';
import {ArtifactSchema,WorkerCapabilitiesSchema} from '../../../packages/protocol/src/index.ts';

async function listen(server:ReturnType<typeof createServer>){server.listen(0,'127.0.0.1');await once(server,'listening');const a=server.address();assert.ok(a&&typeof a!=='string');return `http://127.0.0.1:${a.port}`;}

test('Mac submits real Python jobs, imports verified bytes and keeps accepted artifacts offline after restart',async t=>{
 const dir=await mkdtemp(join(tmpdir(),'vastness-worker-bridge-'));t.after(()=>rm(dir,{recursive:true,force:true}));
 execFileSync(process.execPath,['--import','tsx','scripts/create-fixtures.ts'],{env:{...process.env,ARTIFACT_DIR:join(dir,'source')},stdio:'pipe'});
 const child=spawn(process.env.PYTHON??'python3',['-u','services/gpu-worker/worker.py','--port','0','--data-dir',join(dir,'worker'),'--fixture-dir',join(dir,'source/fixtures'),'--delay','0.05'],{stdio:['ignore','pipe','pipe']});
 t.after(()=>{child.kill('SIGTERM');});
 const url=await new Promise<string>((resolve,reject)=>{let output='';const timer=setTimeout(()=>reject(new Error('Worker startup timed out')),30000);child.stdout.on('data',part=>{output+=part;const m=/http:\/\/127\.0\.0\.1:\d+/.exec(output);if(m){clearTimeout(timer);resolve(m[0]);}});child.once('exit',code=>{clearTimeout(timer);reject(new Error(`Worker exited ${code}`));});});
 const options={dataDir:join(dir,'mac'),artifactDir:join(dir,'artifacts'),workerUrl:url};
 let app=await createOrchestrator(options);let origin=await listen(app.server);t.after(()=>app.close());
 const capabilities=WorkerCapabilitiesSchema.parse(await(await fetch(origin+'/api/worker/capabilities')).json());assert.equal(capabilities.hardware.nvidiaExecution,'not_run');assert.equal(capabilities.backend.mode,'fixture');
 const request={id:'observatory-test',prompt:'coastal observatory',seed:3,fixture:'observatory'};
 const submitted=await fetch(origin+'/api/worker/jobs',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(request)});assert.equal(submitted.status,202);
 let status;for(let i=0;i<100;i++){status=await(await fetch(origin+'/api/worker/jobs/observatory-test')).json();if(status.status==='succeeded')break;await new Promise(r=>setTimeout(r,25));}assert.equal(status.status,'succeeded');
 const imported=await fetch(origin+'/api/worker/jobs/observatory-test/import',{method:'POST'});assert.equal(imported.status,200);const artifacts=ArtifactSchema.array().parse(await imported.json());assert.equal(artifacts.length,2);
 for(const a of artifacts){const bytes=Buffer.from(await(await fetch(origin+a.url)).arrayBuffer());assert.equal(createHash('sha256').update(bytes).digest('hex'),a.sha256);}
 assert.equal((await fetch(origin+'/api/worker/jobs',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...request,seed:99})})).status,409);
 const collision={id:'pre-existing',prompt:'not ours',seed:1,fixture:'arrival'};
 await fetch(url+'/jobs',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(collision)});
 assert.equal((await fetch(origin+'/api/worker/jobs',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...collision,seed:2})})).status,409);
 assert.equal((await fetch(origin+'/api/worker/jobs/pre-existing/import',{method:'POST'})).status,404);
 await app.close();child.kill('SIGTERM');await once(child,'exit');
 app=await createOrchestrator({...options,workerUrl:undefined});origin=await listen(app.server);
 assert.deepEqual(await(await fetch(origin+'/api/worker/jobs/observatory-test/artifacts')).json(),artifacts);
 for(const a of artifacts)assert.equal((await fetch(origin+a.url)).status,200);
 assert.equal((await fetch(origin+'/api/worker/capabilities')).status,503);
});

test('artifact import rejects hostile URLs, wrong hashes, redirects and invalid formats',async t=>{
 const dir=await mkdtemp(join(tmpdir(),'vastness-import-boundary-'));t.after(()=>rm(dir,{recursive:true,force:true}));
 const ply=Buffer.from('ply\nformat binary_little_endian 1.0\nend_header\n');const glb=Buffer.alloc(12);glb.writeUInt32LE(0x46546c67);glb.writeUInt32LE(2,4);glb.writeUInt32LE(12,8);
 let mode='external';let downloaded=0;
 const server=createServer((req,res)=>{res.setHeader('content-type','application/json');
 if(req.url==='/jobs/test'){res.end(JSON.stringify({id:'test',status:'succeeded',progress:1,logs:[],backend:'fixture',error:null}));return;}
 if(req.url==='/jobs/test/artifacts'){res.end(JSON.stringify([{url:mode==='external'?'https://example.com/private':'/artifacts/test/scene.ply',format:'ply',bytes:ply.length,sha256:mode==='hash'?'0'.repeat(64):createHash('sha256').update(mode==='format'?Buffer.alloc(ply.length):ply).digest('hex'),backend:'fixture'},{url:'/artifacts/test/collider.glb',format:'glb',bytes:glb.length,sha256:createHash('sha256').update(glb).digest('hex'),backend:'fixture'}]));return;}
 downloaded++;if(mode==='redirect'){res.writeHead(302,{location:'http://127.0.0.1:9/private'});res.end();return;}res.end(req.url?.endsWith('.ply')?(mode==='format'?Buffer.alloc(ply.length):ply):glb);
 });const origin=await listen(server);t.after(()=>new Promise<void>(r=>server.close(()=>r())));const client=new WorkerClient(origin);
 await assert.rejects(client.importArtifacts('test',dir),/location/);assert.equal(downloaded,0);
 mode='hash';await assert.rejects(client.importArtifacts('test',dir),/hash/);
 mode='redirect';await assert.rejects(client.importArtifacts('test',dir),/redirect/);
 mode='format';await assert.rejects(client.importArtifacts('test',dir),/format/);
});
