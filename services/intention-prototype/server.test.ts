import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {setTimeout as delay} from 'node:timers/promises';
import type {Artifact,WorkerJob} from '../../packages/protocol/src/index.ts';
import {WorkerError} from '../orchestrator/src/worker-client.ts';
import {createIntentionService} from './server.ts';
import type {prepareIntentionArtifact} from '../../scripts/prepare-intention-artifact.ts';
import {crossing,start} from '../../apps/web/src/intention-generation/spatial.ts';
test('HTTP intent is recorded before generation; accepted destination and visits survive restart without regeneration',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'vastness-intent-test-'));let submits=0,complete=false,id='';const worker={async submit(request:{id:string;prompt:string}){submits++;id=request.id;assert.equal(JSON.parse(request.prompt).kind,'intention-destination');assert.equal(JSON.parse(request.prompt).intent,undefined);return {id,status:'running'} as WorkerJob;},async status(){return {id,status:complete?'succeeded':'running'} as WorkerJob;},async importArtifacts(){return [{format:'ply',sha256:'a'.repeat(64),bytes:10,url:'/artifacts/'+ 'a'.repeat(64)+'/scene.ply',backend:'command-v1'},{format:'glb',sha256:'b'.repeat(64),bytes:10,url:'/artifacts/'+ 'b'.repeat(64)+'/collider.glb',backend:'command-v1'}] as Artifact[];}};
 const prepare:typeof prepareIntentionArtifact=async args=>{await mkdir(args.outputDir,{recursive:true});await writeFile(join(args.outputDir,'scene.json'),JSON.stringify({validated:true,jobId:args.jobId}));return {} as Awaited<ReturnType<typeof prepareIntentionArtifact>>;};
 let service=await createIntentionService({dataDir:dir,worker,prepare,pollMs:10});
 async function listen(){await new Promise<void>(r=>service.server.listen(0,'127.0.0.1',r));const address=service.server.address();assert.ok(address&&typeof address==='object');return `http://127.0.0.1:${address.port}`;}
 let base=await listen();
 try{let response=await fetch(base+'/api/intent/worlds',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:'I want enormous quiet cobalt arches',source:'text'})});assert.equal(response.status,202);let record=await response.json();assert.equal(record.rawIntent.text,'I want enormous quiet cobalt arches');assert.equal(record.semantics.axes.scale,'vast');assert.equal(record.events[0].type,'intent-recorded');
 response=await fetch(base+`/api/intent/worlds/${record.id}/visit`,{method:'POST',body:JSON.stringify({event:'crossed',position:[0,1.65,-12.1]})});assert.equal(response.status,409);complete=true;
 for(let n=0;n<100;n++){record=await (await fetch(base+`/api/intent/worlds/${record.id}`)).json();if(record.status==='ready')break;await delay(10);}assert.equal(record.status,'ready');assert.equal(submits,1);assert.ok(record.artifacts.every((a:Artifact)=>a.url.startsWith('/api/intent/artifacts/')));
 const visit=async(event:string)=>fetch(base+`/api/intent/worlds/${record.id}/visit`,{method:'POST',body:JSON.stringify({event,position:[0,1.65,event==='crossed'?-12.1:-11.9]})});assert.equal((await visit('returned')).status,409);await visit('crossed');await visit('crossed');await visit('returned');await service.close();
 service=await createIntentionService({dataDir:dir,worker,prepare,pollMs:10});base=await listen();const restored=await (await fetch(base+`/api/intent/worlds/${record.id}`)).json();assert.equal(submits,1);assert.equal(restored.status,'ready');assert.deepEqual(restored.events.filter((e:{type:string})=>['crossed','returned'].includes(e.type)).map((e:{type:string})=>e.type),['crossed','returned']);assert.deepEqual(await (await fetch(base+restored.sceneUrl)).json(),{validated:true,jobId:record.id});
 }finally{await service.close();await rm(dir,{recursive:true,force:true});}
});
test('failed GPU jobs remain failed and cannot be crossed',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'vastness-intent-fail-'));let id='';const worker={async submit(r:{id:string}){id=r.id;return {id,status:'running'} as WorkerJob;},async status(){return {id,status:'failed',error:'measured failure'} as WorkerJob;},async importArtifacts(){throw new Error('must not import failure');}};const service=await createIntentionService({dataDir:dir,worker,pollMs:5});await new Promise<void>(r=>service.server.listen(0,'127.0.0.1',r));const address=service.server.address();assert.ok(address&&typeof address==='object');const base=`http://127.0.0.1:${address.port}`;
 try{const record=await (await fetch(base+'/api/intent/worlds',{method:'POST',body:JSON.stringify({text:'An unfamiliar place',source:'text'})})).json();let status;for(let n=0;n<100;n++){status=await (await fetch(base+`/api/intent/worlds/${record.id}`)).json();if(status.status==='failed')break;await delay(5);}assert.equal(status.status,'failed');assert.match(status.error,/measured failure/);assert.equal((await fetch(base+`/api/intent/worlds/${record.id}/scene`)).status,409);}finally{await service.close();await rm(dir,{recursive:true,force:true});}
});

test('restart reconciles a job accepted before the Mac saved its submission acknowledgment',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'vastness-intent-reconcile-'));const id='intent-resume';await mkdir(join(dir,'worlds'));await writeFile(join(dir,'worlds',id+'.json'),JSON.stringify({id,jobId:id,status:'requested',request:{id,prompt:'{}',seed:42},events:[]}));let resumed=0;
 const worker={async submit(){throw new WorkerError(409,'Already exists');},async status(){resumed++;return {id,status:'succeeded'} as WorkerJob;},async importArtifacts(){return [] as Artifact[];}};
 const prepare:typeof prepareIntentionArtifact=async()=>({} as Awaited<ReturnType<typeof prepareIntentionArtifact>>);const service=await createIntentionService({dataDir:dir,worker,prepare,pollMs:5});
 try{for(let n=0;n<100&&service.worlds.get(id)?.status!=='ready';n++)await delay(5);assert.equal(service.worlds.get(id)?.status,'ready');assert.ok(resumed>0);assert.ok(service.worlds.get(id)?.events.some(e=>e.type==='gpu-job-reconciled-after-restart'));}finally{await service.close();await rm(dir,{recursive:true,force:true});}
});

test('temporary worker transport failure preserves resumable job and retries without generating again',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'vastness-intent-transport-'));const id='intent-transport';await mkdir(join(dir,'worlds'));await writeFile(join(dir,'worlds',id+'.json'),JSON.stringify({id,jobId:id,status:'generating',request:{id,prompt:'{}',seed:42},events:[]}));let polls=0;
 const worker={async submit(){throw new Error('must not resubmit');},async status(){if(++polls===1)throw new WorkerError(502,'Worker is unreachable, redirected, or timed out');return {id,status:'succeeded'} as WorkerJob;},async importArtifacts(){return [] as Artifact[];}};
 const prepare:typeof prepareIntentionArtifact=async()=>({} as Awaited<ReturnType<typeof prepareIntentionArtifact>>);const service=await createIntentionService({dataDir:dir,worker,prepare,pollMs:5});
 try{for(let n=0;n<100&&service.worlds.get(id)?.status!=='ready';n++)await delay(5);assert.equal(service.worlds.get(id)?.status,'ready');assert.equal(polls,2);assert.equal(service.worlds.get(id)?.error,undefined);assert.ok(service.worlds.get(id)?.events.some(e=>e.type==='worker-connection-retry'));}finally{await service.close();await rm(dir,{recursive:true,force:true});}
});

test('visit identities preserve a fresh crossing after pose reset and deduplicate retries across restart',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'vastness-intent-visits-'));const id='intent-visits';
 await mkdir(join(dir,'worlds'));await writeFile(join(dir,'worlds',id+'.json'),JSON.stringify({id,jobId:id,status:'ready',events:[]}));
 let service=await createIntentionService({dataDir:dir});
 async function listen(){await new Promise<void>(resolve=>service.server.listen(0,'127.0.0.1',resolve));const address=service.server.address();assert.ok(address&&typeof address==='object');return `http://127.0.0.1:${address.port}`;}
 let base=await listen();
 const crossedPosition:[number,number,number]=[0,1.65,-12.1];
 const post=(event:string,eventId:string,position:[number,number,number]=crossedPosition)=>fetch(base+`/api/intent/worlds/${id}/visit`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event,eventId,position})});
 try{
  assert.equal((await post('returned',randomUUID(),[0,1.65,-11.9])).status,409);
  let position:[number,number,number]=[0,1.65,-11.9];const firstId=randomUUID();
  assert.equal(crossing(position,crossedPosition),'crossed');
  assert.equal((await post('crossed',firstId)).status,200);position=[...crossedPosition];
  await service.close();service=await createIntentionService({dataDir:dir});base=await listen();
  // Browser reload/reselection resets the pose to source without inventing a returned event.
  position=[...start];assert.equal(crossing(position,crossedPosition),'crossed');
  const secondId=randomUUID();assert.equal((await post('crossed',secondId)).status,200);
  assert.equal((await post('crossed',secondId)).status,200);
  const returnedId=randomUUID();assert.equal((await post('returned',returnedId,[0,1.65,-11.9])).status,200);
  // Lost acknowledgments can arrive after later events; identity still prevents duplicate history.
  assert.equal((await post('crossed',firstId)).status,200);
  assert.equal((await post('returned',returnedId,[0,1.65,-11.9])).status,200);
  assert.equal((await post('returned',randomUUID(),[0,1.65,-11.9])).status,409);
  assert.equal((await post('returned',secondId,[0,1.65,-11.9])).status,409);
  const restored=await (await fetch(base+`/api/intent/worlds/${id}`)).json();
  assert.deepEqual(restored.events.map((event:{type:string;eventId:string})=>[event.type,event.eventId]),[['crossed',firstId],['crossed',secondId],['returned',returnedId]]);
 }finally{await service.close();await rm(dir,{recursive:true,force:true});}
});

test('validation retry reuses the successful job and accepted hashes without worker contact or regeneration',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'vastness-intent-validation-retry-'));let submits=0,imports=0,preparations=0,id='',workerOffline=false;
 const artifacts:Artifact[]=[{format:'ply',sha256:'c'.repeat(64),bytes:10,url:'/artifacts/'+ 'c'.repeat(64)+'/scene.ply',backend:'command-v1'},{format:'glb',sha256:'d'.repeat(64),bytes:10,url:'/artifacts/'+ 'd'.repeat(64)+'/collider.glb',backend:'command-v1'}];
 const worker={async submit(request:{id:string}){submits++;id=request.id;return {id,status:'running'} as WorkerJob;},async status(){assert.equal(workerOffline,false,'Accepted artifacts must not require the worker on retry');return {id,status:'succeeded'} as WorkerJob;},async importArtifacts(){imports++;return artifacts;}};
 let releaseRetry!:()=>void;const retryGate=new Promise<void>(resolve=>releaseRetry=resolve);
 const prepare:typeof prepareIntentionArtifact=async args=>{
  preparations++;assert.equal(args.jobId,id);assert.deepEqual(args.artifacts.map(artifact=>artifact.sha256),artifacts.map(artifact=>artifact.sha256));
  if(preparations===1)throw new Error('Triangle limit rejected valid generated mesh');
  await retryGate;await mkdir(args.outputDir,{recursive:true});await writeFile(join(args.outputDir,'scene.json'),JSON.stringify({jobId:args.jobId,hashes:args.artifacts.map(artifact=>artifact.sha256)}));
  return {} as Awaited<ReturnType<typeof prepareIntentionArtifact>>;
 };
 let service=await createIntentionService({dataDir:dir,worker,prepare,pollMs:5});
 async function listen(){await new Promise<void>(resolve=>service.server.listen(0,'127.0.0.1',resolve));const address=service.server.address();assert.ok(address&&typeof address==='object');return `http://127.0.0.1:${address.port}`;}
 let base=await listen();
 const read=()=>fetch(base+`/api/intent/worlds/${id}`).then(response=>response.json());
 const retry=()=>fetch(base+`/api/intent/worlds/${id}/retry-validation`,{method:'POST'});
 try{
  await fetch(base+'/api/intent/worlds',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:'An unfamiliar crystalline garden',source:'text'})});
  let failed;for(let n=0;n<100;n++){failed=await read();if(failed.status==='failed')break;await delay(5);}
  assert.equal(failed.status,'failed');assert.equal(failed.workerJob.status,'succeeded');assert.match(failed.error,/Triangle limit/);
  // A restart must retain enough accepted provenance to repeat only Mac preparation.
  await service.close();workerOffline=true;service=await createIntentionService({dataDir:dir,worker,prepare,pollMs:5});base=await listen();
  const responses=await Promise.all([retry(),retry()]);assert.deepEqual(responses.map(response=>response.status).sort(),[202,409]);
  const processing=await read();assert.equal(processing.status,'processing');assert.equal(processing.error,undefined);
  assert.equal((await fetch(base+`/api/intent/worlds/${id}/scene`)).status,409);
  releaseRetry();let ready;for(let n=0;n<100;n++){ready=await read();if(ready.status==='ready')break;await delay(5);}
  assert.equal(ready.status,'ready');assert.equal(ready.jobId,failed.jobId);assert.deepEqual(ready.request,failed.request);assert.deepEqual(ready.artifacts,failed.artifacts);
  assert.equal(ready.events.filter((event:{type:string})=>event.type==='validation-retried').length,1);
  assert.deepEqual([submits,imports,preparations],[1,1,2]);assert.equal((await retry()).status,409);
  assert.deepEqual(await (await fetch(base+ready.sceneUrl)).json(),{jobId:id,hashes:artifacts.map(artifact=>artifact.sha256)});
 }finally{releaseRetry();await service.close();await rm(dir,{recursive:true,force:true});}
});
