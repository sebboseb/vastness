import {DatabaseSync} from 'node:sqlite';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import type {IncomingMessage,ServerResponse} from 'node:http';
import {ZodError} from 'zod';
import {ArtifactSchema,WorkerJobRequestSchema,type Artifact} from '../../../packages/protocol/src/index.ts';
import {WorkerClient,WorkerError} from './worker-client.ts';

function json(response:ServerResponse,status:number,body:unknown){response.writeHead(status,{'content-type':'application/json','cache-control':'no-store'});response.end(JSON.stringify(body));}
async function body(request:IncomingMessage){
 if(request.headers['content-type']?.split(';')[0].trim()!=='application/json')throw new WorkerError(415,'Expected application/json');
 const pieces:Buffer[]=[];let size=0;
 for await(const piece of request){size+=piece.length;if(size<=65536)pieces.push(Buffer.from(piece));}
 if(size>65536)throw new WorkerError(413,'Job request exceeds 64 KiB');
 try{return JSON.parse(Buffer.concat(pieces).toString());}catch{throw new WorkerError(400,'Invalid job JSON');}
}

export function createWorkerGateway(options:{dataDir:string;artifactDir:string;workerUrl?:string;workerToken?:string}){
 const client=options.workerUrl?new WorkerClient(options.workerUrl,options.workerToken):undefined;
 const db=new DatabaseSync(join(options.dataDir,'worker.sqlite'));
 db.exec('CREATE TABLE IF NOT EXISTS requests (id TEXT PRIMARY KEY, request TEXT NOT NULL, origin TEXT NOT NULL); CREATE TABLE IF NOT EXISTS imports (id TEXT PRIMARY KEY, manifest TEXT NOT NULL, accepted_at TEXT NOT NULL)');
 const pending=new Map<string,Promise<Artifact[]>>();
 function local(id:string):Artifact[]|undefined{const row=db.prepare('SELECT manifest FROM imports WHERE id=?').get(id);return row?ArtifactSchema.array().parse(JSON.parse(row.manifest as string)):undefined;}
 async function importedArtifact(pathname:string,response:ServerResponse){
  if(!/^\/artifacts\/[a-f0-9]{64}\/(scene\.ply|collider\.glb)$/.test(pathname))return false;
  const rows=db.prepare('SELECT manifest FROM imports').all();
  const artifact=rows.flatMap(row=>ArtifactSchema.array().parse(JSON.parse(row.manifest as string))).find(a=>a.url===pathname);
  if(!artifact)return false;
  try{const bytes=await readFile(join(options.artifactDir,'objects',artifact.sha256,pathname.split('/').at(-1)!));response.writeHead(200,{'content-type':artifact.format==='glb'?'model/gltf-binary':'application/octet-stream','content-length':bytes.length,'cache-control':'public, max-age=31536000, immutable'});response.end(bytes);}catch{json(response,404,{error:'Imported artifact is missing'});}
  return true;
 }
 async function handle(request:IncomingMessage,response:ServerResponse,pathname:string):Promise<boolean>{
  if(request.method==='GET'&&await importedArtifact(pathname,response))return true;
  if(!pathname.startsWith('/api/worker/'))return false;
  try {
   const match=/^\/api\/worker\/jobs\/([a-zA-Z0-9_-]{1,80})(?:\/(cancel|import|artifacts))?$/.exec(pathname);
   if(match?.[2]==='artifacts'&&request.method==='GET'){const manifest=local(match[1]);if(!manifest)throw new WorkerError(404,'Job has no accepted local artifacts');json(response,200,manifest);return true;}
   if(!client)throw new WorkerError(503,'Configure WORKER_URL to connect a worker');
   if(pathname==='/api/worker/capabilities'&&request.method==='GET'){json(response,200,await client.capabilities());return true;}
   if(pathname==='/api/worker/jobs'&&request.method==='POST'){
    const parsed=WorkerJobRequestSchema.safeParse(await body(request));if(!parsed.success)throw new WorkerError(400,'Invalid job request');const job=parsed.data;
    const existing=db.prepare('SELECT request,origin FROM requests WHERE id=?').get(job.id);
    if(existing){
     if(existing.request!==JSON.stringify(job)||existing.origin!==client.origin)throw new WorkerError(409,'Job id already belongs to a different request or worker');
     try{json(response,200,await client.status(job.id));return true;}catch(error){if(!(error instanceof WorkerError&&error.status===404))throw error;}
    }else db.prepare('INSERT INTO requests VALUES (?,?,?)').run(job.id,JSON.stringify(job),client.origin);
    try {json(response,202,await client.submit(job));}
    catch(error){if(!existing&&error instanceof WorkerError&&error.status>=400&&error.status<500)db.prepare('DELETE FROM requests WHERE id=?').run(job.id);throw error;}
    return true;
   }
   if(match){
    const [_,id,action]=match;
    const source=db.prepare('SELECT origin FROM requests WHERE id=?').get(id);
    if(!source)throw new WorkerError(404,'Submit this job through the Mac first');
    if(source.origin!==client.origin)throw new WorkerError(409,'Job belongs to a different worker origin');
    if(!action&&request.method==='GET'){json(response,200,await client.status(id));return true;}
    if(action==='cancel'&&request.method==='POST'){json(response,200,await client.cancel(id));return true;}
    if(action==='import'&&request.method==='POST'){
     const saved=local(id);if(saved){json(response,200,saved);return true;}
     let operation=pending.get(id);
     if(!operation){operation=client.importArtifacts(id,options.artifactDir).then(manifest=>{db.prepare('INSERT OR IGNORE INTO imports VALUES (?,?,?)').run(id,JSON.stringify(manifest),new Date().toISOString());return manifest;}).finally(()=>pending.delete(id));pending.set(id,operation);}
     json(response,200,await operation);return true;
    }
   }
   throw new WorkerError(404,'Worker route not found');
  }catch(error){if(!response.destroyed)json(response,error instanceof WorkerError?error.status:502,{error:error instanceof WorkerError?error.message:error instanceof ZodError?'Worker response does not match the protocol':'Worker operation failed'});return true;}
 }
 return {handle,close:()=>db.close()};
}
