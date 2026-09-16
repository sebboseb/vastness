/** Disposable persistent intent→worker→artifact service. It never opens the M0 database. */
import {createServer,type IncomingMessage,type ServerResponse} from 'node:http';
import {randomUUID} from 'node:crypto';
import {mkdir,readFile,readdir,rename,writeFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {setTimeout as delay} from 'node:timers/promises';
import {z} from 'zod';
import {WorkerClient,WorkerError} from '../orchestrator/src/worker-client.ts';
import type {Artifact,Vec3,WorkerJob,WorkerJobRequest} from '../../packages/protocol/src/index.ts';
import {prepareIntentionArtifact} from '../../scripts/prepare-intention-artifact.ts';
import {deriveIntent,InputSchema,type IntentInput,type SemanticIntent} from './semantics.ts';
export type WorldRecord={id:string;createdAt:string;rawIntent:IntentInput;semantics:SemanticIntent;derivation:ReturnType<typeof deriveIntent>['derivation'];status:'requested'|'generating'|'processing'|'ready'|'failed';jobId:string;request:WorkerJobRequest;events:{type:string;at:string;position?:Vec3;eventId?:string}[];workerJob?:WorkerJob;artifacts?:Artifact[];sceneUrl?:string;error?:string};
const idPattern=/^[a-zA-Z0-9_-]{1,80}$/;
const visitSchema=z.object({event:z.enum(['crossed','returned']),eventId:z.string().uuid().optional(),position:z.tuple([z.number().finite(),z.number().finite(),z.number().finite()])});
const now=()=>new Date().toISOString();
export async function createIntentionService(options:{dataDir?:string;workerUrl?:string;worker?:Pick<WorkerClient,'submit'|'status'|'importArtifacts'>;prepare?:typeof prepareIntentionArtifact;pollMs?:number}={}){
 const directory=resolve(options.dataDir??'.runtime/intention-generation');const worldDir=join(directory,'worlds'),objectDir=join(directory,'artifacts');await mkdir(worldDir,{recursive:true});await mkdir(objectDir,{recursive:true});
 const worker=options.worker??new WorkerClient(options.workerUrl??process.env.INTENTION_WORKER_URL??'http://127.0.0.1:14321',process.env.INTENTION_WORKER_TOKEN);
 const prepare=options.prepare??prepareIntentionArtifact;const worlds=new Map<string,WorldRecord>(),tasks=new Map<string,Promise<void>>(),writes=new Map<string,Promise<void>>();const abort=new AbortController();let closed=false;
 for(const file of await readdir(worldDir)){if(!file.endsWith('.json'))continue;const world=JSON.parse(await readFile(join(worldDir,file),'utf8')) as WorldRecord;if(!idPattern.test(world.id)||file!==world.id+'.json')throw new Error('Invalid persisted prototype world');worlds.set(world.id,world);}
 async function save(world:WorldRecord){const snapshot=JSON.stringify(world,null,2)+'\n';const operation=(writes.get(world.id)??Promise.resolve()).then(async()=>{const temporary=join(worldDir,`.${world.id}-${randomUUID()}.tmp`);await writeFile(temporary,snapshot);await rename(temporary,join(worldDir,world.id+'.json'));});writes.set(world.id,operation);await operation;}
 async function run(world:WorldRecord){try{
  if(world.status==='requested'){try{world.workerJob=await worker.submit(world.request);}catch(error){if(!(error instanceof WorkerError)||error.status!==409)throw error;world.workerJob=await worker.status(world.jobId);world.events.push({type:'gpu-job-reconciled-after-restart',at:now()});}world.status='generating';world.events.push({type:'gpu-job-submitted',at:now()});await save(world);}
  while(!closed){const job=world.status==='processing'&&world.artifacts&&world.workerJob?.status==='succeeded'?world.workerJob:await worker.status(world.jobId);world.workerJob=job;delete world.error;
   if(job.status==='failed'||job.status==='cancelled')throw new Error(job.error??`GPU job ${job.status}`);
   if(job.status==='succeeded'){world.status='processing';world.events.push({type:'artifacts-processing',at:now()});await save(world);if(!world.artifacts){world.artifacts=(await worker.importArtifacts(world.jobId,objectDir)).map(artifact=>({...artifact,url:'/api/intent'+artifact.url}));await save(world);}await prepare({jobId:world.jobId,artifacts:world.artifacts,objectDir,outputDir:join(worldDir,world.id)});world.sceneUrl=`/api/intent/worlds/${world.id}/scene`;world.status='ready';world.events.push({type:'destination-validated',at:now()});await save(world);return;}
   await save(world);await delay(options.pollMs??1500,undefined,{signal:abort.signal});
  }
 }catch(error){if(closed)return;const message=String(error);if((error instanceof WorkerError&&error.status===502&&/unreachable|timed out|download failed|returned HTTP 50[234]/i.test(message))||['ECONNRESET','EPIPE','ETIMEDOUT'].includes((error as NodeJS.ErrnoException).code??'')){if(world.error!==message)world.events.push({type:'worker-connection-retry',at:now()});world.error=message;await save(world);return;}world.status='failed';world.error=String(error);world.events.push({type:'failed',at:now()});await save(world);}}
 function launch(world:WorldRecord){if(tasks.has(world.id))return;const task=(async()=>{while(!closed){await run(world);if(world.status==='ready'||world.status==='failed')return;try{await delay(options.pollMs??3000,undefined,{signal:abort.signal});}catch{if(closed)return;}}})().finally(()=>tasks.delete(world.id));tasks.set(world.id,task);void task.catch(error=>console.error('Prototype persistence failure',error));}
 function json(response:ServerResponse,status:number,value:unknown){response.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});response.end(JSON.stringify(value));}
 async function body(request:IncomingMessage){let text='';for await(const chunk of request){text+=chunk;if(Buffer.byteLength(text)>8192)throw new Error('Request too large');}return JSON.parse(text);}
 const server=createServer(async(request,response)=>{try{
  const url=new URL(request.url??'/', 'http://127.0.0.1');const path=url.pathname;
  if(path==='/api/intent/health'){json(response,200,{status:'ok',workerOrigin:options.workerUrl??process.env.INTENTION_WORKER_URL??'http://127.0.0.1:14321'});return;}
  if(path==='/api/intent/worlds'&&request.method==='GET'){json(response,200,[...worlds.values()].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)));return;}
  if(path==='/api/intent/worlds'&&request.method==='POST'){
   const {seed=42,...input}=InputSchema.extend({seed:z.number().int().min(0).max(2147483647).optional()}).parse(await body(request));const derived=deriveIntent(input);const id='intent-'+randomUUID();const world:WorldRecord={id,createdAt:now(),rawIntent:input,...derived,status:'requested',jobId:id,request:{id,prompt:JSON.stringify(derived.semantics),seed},events:[{type:'intent-recorded',at:now()},{type:'constraints-derived',at:now()}]};worlds.set(id,world);await save(world);json(response,202,world);launch(world);return;
  }
  const match=/^\/api\/intent\/worlds\/([a-zA-Z0-9_-]+)(?:\/(scene|visit|retry-validation))?$/.exec(path);
  if(match){const world=worlds.get(match[1]);if(!world){json(response,404,{error:'Unknown prototype world'});return;}
   if(!match[2]&&request.method==='GET'){json(response,200,world);return;}
   if(match[2]==='retry-validation'&&request.method==='POST'){
    if(world.status!=='failed'||world.workerJob?.status!=='succeeded'){json(response,409,{error:'Validation retry requires a failed destination with a successful GPU job'});return;}
    // The failed state becomes visible before its final write and task cleanup finish.
    // Wait before changing it, otherwise the old runner can consume or hide this retry.
    await tasks.get(world.id);
    if(world.status!=='failed'||world.workerJob?.status!=='succeeded'||tasks.has(world.id)){json(response,409,{error:'Destination validation is already active'});return;}
    world.status='processing';delete world.error;world.events.push({type:'validation-retried',at:now()});
    await save(world);json(response,202,world);launch(world);return;
   }
   if(match[2]==='scene'&&request.method==='GET'){if(world.status!=='ready'){json(response,409,{error:'Destination not validated'});return;}response.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});response.end(await readFile(join(worldDir,world.id,'scene.json')));return;}
   if(match[2]==='visit'&&request.method==='POST'){
    const visit=visitSchema.parse(await body(request));
    if(world.status!=='ready'){json(response,409,{error:'Threshold is closed'});return;}
    if(Math.abs(visit.position[0])>1.7||Math.abs(visit.position[2]+12)>1){json(response,400,{error:'Visit must occur at the physical threshold'});return;}
    const existing=visit.eventId?world.events.find(event=>event.eventId===visit.eventId):undefined;
    if(existing){
     if(existing.type!==visit.event||existing.position?.some((value,axis)=>value!==visit.position[axis])){json(response,409,{error:'Visit event id already belongs to a different crossing'});return;}
     // A response can be lost after the write; retries must acknowledge durable history.
     await writes.get(world.id);json(response,200,world);return;
    }
    const last=world.events.filter(event=>event.type==='crossed'||event.type==='returned').at(-1)?.type;
    // Older clients have no retry identity, so retain their alternating-event behavior.
    if(!visit.eventId&&last===visit.event){await writes.get(world.id);json(response,200,world);return;}
    if(visit.event==='returned'&&last!=='crossed'){json(response,409,{error:'Cannot return before crossing'});return;}
    world.events.push({type:visit.event,at:now(),position:visit.position,...(visit.eventId?{eventId:visit.eventId}:{})});
    await save(world);json(response,200,world);return;
   }
  }
  const artifact=/^\/api\/intent\/artifacts\/([a-f0-9]{64})\/(scene\.ply|collider\.glb)$/.exec(path);
  if(artifact&&request.method==='GET'){const known=[...worlds.values()].some(w=>w.status==='ready'&&w.artifacts?.some(a=>a.sha256===artifact[1]&&(a.format==='ply'?'scene.ply':'collider.glb')===artifact[2]));if(!known){json(response,404,{error:'Artifact not accepted'});return;}const bytes=await readFile(join(objectDir,'objects',artifact[1],artifact[2]));response.writeHead(200,{'Content-Type':'application/octet-stream','Content-Length':bytes.length,'Cache-Control':'public,max-age=31536000,immutable'});response.end(bytes);return;}
  json(response,404,{error:'Unknown prototype route'});
 }catch(error){json(response,error instanceof z.ZodError||error instanceof SyntaxError?400:500,{error:String(error)});}});
 for(const world of worlds.values())if(['requested','generating','processing'].includes(world.status))launch(world);
 return {server,worlds,async close(){closed=true;abort.abort();server.closeAllConnections();if(server.listening)await new Promise<void>((done,error)=>server.close(e=>e?error(e):done()));await Promise.allSettled([...tasks.values(),...writes.values()]);}};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){const service=await createIntentionService();service.server.listen(4311,'127.0.0.1',()=>console.log('Intention prototype API http://127.0.0.1:4311'));for(const signal of ['SIGINT','SIGTERM'] as const)process.once(signal,()=>{void service.close().then(()=>process.exit(0));});}
