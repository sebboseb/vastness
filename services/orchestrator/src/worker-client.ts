import {createHash,randomUUID} from 'node:crypto';
import {open,mkdir,rename,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {ArtifactSchema,WorkerCapabilitiesSchema,WorkerJobSchema,type Artifact,type WorkerJobRequest} from '../../../packages/protocol/src/index.ts';

export class WorkerError extends Error {
  constructor(readonly status:number,message:string){super(message);}
}
const MAX_JSON=1024*1024;
export const MAX_ARTIFACT_BYTES=256*1024*1024;

async function* chunks(response:Response){
 const reader=response.body?.getReader();if(!reader)return;
 try{while(true){const part=await reader.read();if(part.done)break;yield part.value;}}
 finally{await reader.cancel().catch(()=>{});reader.releaseLock();}
}

export class WorkerClient {
  readonly origin:string;
  constructor(url:string,private token?:string){
    const parsed=new URL(url);
    if(!['http:','https:'].includes(parsed.protocol)||parsed.username||parsed.password||parsed.pathname!=='/'||parsed.search||parsed.hash)throw new Error('WORKER_URL must be an HTTP origin without credentials or path');
    this.origin=parsed.origin;
  }
  private async fetch(path:string,options:RequestInit={},timeout=15_000){
    try {
      return await fetch(this.origin+path,{...options,redirect:'error',signal:AbortSignal.timeout(timeout),headers:{...options.headers,...(this.token?{Authorization:`Bearer ${this.token}`}:{})}});
    } catch {throw new WorkerError(502,'Worker is unreachable, redirected, or timed out');}
  }
  private async json(path:string,method='GET',body?:unknown):Promise<unknown>{
    const response=await this.fetch(path,{method,...(body===undefined?{}:{body:JSON.stringify(body),headers:{'Content-Type':'application/json'}})});
    if(!response.ok){await response.body?.cancel();throw new WorkerError(response.status>=400&&response.status<500?response.status:502,`Worker returned HTTP ${response.status}`);}
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
      if(!response.ok){await response.body?.cancel();throw new WorkerError(502,'Worker artifact download failed');}
      if(response.headers.has('content-length')&&Number(response.headers.get('content-length'))!==artifact.bytes){await response.body?.cancel();throw new WorkerError(502,'Worker artifact length differs from manifest');}
      const directory=join(artifactDir,'objects',artifact.sha256);await mkdir(directory,{recursive:true});
      const temporary=join(directory,`.import-${randomUUID()}`);
      const file=await open(temporary,'wx');let size=0;const hash=createHash('sha256');let header=Buffer.alloc(0);
      try {
        for await(const piece of chunks(response)){
          size+=piece.length;if(size>artifact.bytes)throw new WorkerError(502,'Worker artifact exceeds declared size');
          if(header.length<4096)header=Buffer.concat([header,Buffer.from(piece).subarray(0,4096-header.length)]);
          hash.update(piece);await file.writeFile(piece);
        }
        if(size!==artifact.bytes||hash.digest('hex')!==artifact.sha256)throw new WorkerError(502,'Worker artifact hash or size mismatch');
        const valid=artifact.format==='ply'?header.toString('ascii').startsWith('ply\nformat binary_little_endian 1.0\n'):header.length>=12&&header.readUInt32LE(0)===0x46546c67&&header.readUInt32LE(4)===2&&header.readUInt32LE(8)===size;
        if(!valid)throw new WorkerError(502,'Worker artifact format is invalid');
        await file.sync();await file.close();await rename(temporary,join(directory,filename));
        accepted.push({...artifact,url:`/artifacts/${artifact.sha256}/${filename}`});
      } finally {await file.close().catch(()=>{});await rm(temporary,{force:true});}
    }
    return accepted;
  }
}
