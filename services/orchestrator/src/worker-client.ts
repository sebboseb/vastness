import {createHash,randomUUID} from 'node:crypto';
import {open,mkdir,rename,rm,type FileHandle} from 'node:fs/promises';
import {join} from 'node:path';
import {request as httpRequest,type IncomingMessage} from 'node:http';
import {request as httpsRequest} from 'node:https';
import {ArtifactSchema,WorkerCapabilitiesSchema,WorkerJobSchema,type Artifact,type WorkerJobRequest} from '../../../packages/protocol/src/index.ts';

export class WorkerError extends Error {
  constructor(readonly status:number,message:string){super(message);}
}
const MAX_JSON=1024*1024;
const MAX_HEADER=65536;
function validHeader(header:Buffer,size:number,format:'ply'|'glb'){
 if(format==='glb')return size>12&&header.length>=12&&header.readUInt32LE(0)===0x46546c67&&header.readUInt32LE(4)===2&&header.readUInt32LE(8)===size;
 const text=header.toString('ascii');const end=/^end_header\r?\n/m.exec(text);if(!end)return false;
 const lines=text.slice(0,end.index).split(/\r?\n/);
 return lines[0]==='ply'&&lines.includes('format binary_little_endian 1.0')&&lines.some(line=>/^element vertex [0-9]+$/.test(line)&&Number(line.split(' ')[2])>0)&&end.index+end[0].length<size;
}
export const MAX_ARTIFACT_BYTES=256*1024*1024;

const transportErrors=new WeakMap<IncomingMessage,Error>();
async function* chunks(response:IncomingMessage){
 try{
  const failure=transportErrors.get(response);if(failure)throw failure;
  for await(const piece of response)yield Buffer.from(piece);
 }
 finally{response.destroy();}
}

export class WorkerClient {
  readonly origin:string;
  constructor(url:string,private token?:string){
    const parsed=new URL(url);
    if(!['http:','https:'].includes(parsed.protocol)||parsed.username||parsed.password||parsed.pathname!=='/'||parsed.search||parsed.hash)throw new Error('WORKER_URL must be an HTTP origin without credentials or path');
    this.origin=parsed.origin;
  }
  private async fetch(path:string,options:{method?:string;body?:string;headers?:Record<string,string>}={},timeout=15_000):Promise<IncomingMessage>{
    try {
      // Node 22 fetch/Undici can assert on HTTP/1.0 EOF while its parser is
      // paused by artifact writes. Core HTTP streams support this backpressure.
      return await new Promise<IncomingMessage>((resolve,reject)=>{
        const url=new URL(this.origin+path);
        const request=(url.protocol==='https:'?httpsRequest:httpRequest)(url,{
          method:options.method,signal:AbortSignal.timeout(timeout),
          headers:{...options.headers,...(options.body===undefined?{}:{'Content-Length':Buffer.byteLength(options.body)}),...(this.token?{Authorization:`Bearer ${this.token}`}:{})},
        },response=>{
          // A peer can abort while the consumer awaits mkdir/open. Retain the
          // error until the iterator attaches, then propagate it to the caller.
          response.on('error',error=>transportErrors.set(response,error));
          const status=response.statusCode??502;
          if(status>=300&&status<400){response.destroy();reject(new Error('Worker redirect rejected'));return;}
          resolve(response);
        });
        request.once('error',reject);
        request.end(options.body);
      });
    } catch {throw new WorkerError(502,'Worker is unreachable, redirected, or timed out');}
  }
  private async json(path:string,method='GET',body?:unknown):Promise<unknown>{
    const response=await this.fetch(path,{method,...(body===undefined?{}:{body:JSON.stringify(body),headers:{'Content-Type':'application/json'}})});
    const status=response.statusCode??502;
    if(status<200||status>=300){response.destroy();throw new WorkerError(status>=400&&status<500?status:502,`Worker returned HTTP ${status}`);}
    const pieces:Uint8Array[]=[];let size=0;
    for await(const piece of chunks(response)){size+=piece.length;if(size>MAX_JSON){throw new WorkerError(502,'Worker JSON response exceeds limit');}pieces.push(piece);}
    try {return JSON.parse(Buffer.concat(pieces).toString());}catch{throw new WorkerError(502,'Worker returned invalid JSON');}
  }
  async capabilities(){return WorkerCapabilitiesSchema.parse(await this.json('/capabilities'));}
  async submit(request:WorkerJobRequest){const job=WorkerJobSchema.parse(await this.json('/jobs','POST',request));if(job.id!==request.id)throw new WorkerError(502,'Worker returned a different job identity');return job;}
  async status(id:string){const job=WorkerJobSchema.parse(await this.json(`/jobs/${encodeURIComponent(id)}`));if(job.id!==id)throw new WorkerError(502,'Worker returned a different job identity');return job;}
  async cancel(id:string){const job=WorkerJobSchema.parse(await this.json(`/jobs/${encodeURIComponent(id)}/cancel`,'POST'));if(job.id!==id)throw new WorkerError(502,'Worker returned a different job identity');return job;}
  async importArtifacts(id:string,artifactDir:string):Promise<Artifact[]>{
    const job=await this.status(id);
    if(job.status!=='succeeded')throw new WorkerError(409,'Worker job must succeed before importing artifacts');
    const manifest=ArtifactSchema.array().length(2).parse(await this.json(`/jobs/${encodeURIComponent(id)}/artifacts`));
    if(new Set(manifest.map(a=>a.format)).size!==2)throw new WorkerError(502,'Worker must provide one PLY and one GLB');
    const accepted:Artifact[]=[];
    for(const artifact of manifest){
      const filename=artifact.format==='ply'?'scene.ply':'collider.glb';
      if(artifact.url!==`/artifacts/${id}/${filename}`||artifact.backend!==job.backend||artifact.bytes<=0||artifact.bytes>MAX_ARTIFACT_BYTES)throw new WorkerError(502,'Invalid worker artifact location, provenance or size');
      const response=await this.fetch(artifact.url,{},120_000);
      const status=response.statusCode??502;
      if(status<200||status>=300){response.destroy();throw new WorkerError(502,'Worker artifact download failed');}
      if(response.headers['content-length']!==undefined&&Number(response.headers['content-length'])!==artifact.bytes){response.destroy();throw new WorkerError(502,'Worker artifact length differs from manifest');}
      const directory=join(artifactDir,'objects',artifact.sha256);
      const temporary=join(directory,`.import-${randomUUID()}`);let file:FileHandle|undefined;
      let size=0;const hash=createHash('sha256');let header=Buffer.alloc(0);
      try {
        await mkdir(directory,{recursive:true});file=await open(temporary,'wx');
        for await(const piece of chunks(response)){
          size+=piece.length;if(size>artifact.bytes)throw new WorkerError(502,'Worker artifact exceeds declared size');
          if(header.length<MAX_HEADER)header=Buffer.concat([header,Buffer.from(piece).subarray(0,MAX_HEADER-header.length)]);
          hash.update(piece);await file.writeFile(piece);
        }
        if(size!==artifact.bytes||hash.digest('hex')!==artifact.sha256)throw new WorkerError(502,'Worker artifact hash or size mismatch');
        if(!validHeader(header,size,artifact.format))throw new WorkerError(502,'Worker artifact format is invalid');
        await file.sync();await file.close();await rename(temporary,join(directory,filename));
        accepted.push({...artifact,url:`/artifacts/${artifact.sha256}/${filename}`});
      } finally {response.destroy();await file?.close().catch(()=>{});await rm(temporary,{force:true});}
    }
    return accepted;
  }
}
