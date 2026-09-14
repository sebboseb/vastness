import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {ArtifactSchema,WorkerCapabilitiesSchema,WorkerJobSchema} from '../packages/protocol/src/index.ts';
const origin=process.env.ORCHESTRATOR_URL??'http://127.0.0.1:4310';
async function json(path:string,method='GET',body?:unknown){
 const response=await fetch(origin+path,{method,signal:AbortSignal.timeout(30_000),...(body?{headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{})});
 if(!response.ok)throw new Error(`${path}: HTTP ${response.status} ${await response.text()}`);return response.json();
}
const capabilities=WorkerCapabilitiesSchema.parse(await json('/api/worker/capabilities'));
if(capabilities.backend.mode!=='fixture')throw new Error('This CPU smoke requires the fixture backend; use the pinned benchmark command for NVIDIA execution');
const id=`mac-smoke-${Date.now()}`;
let job=WorkerJobSchema.parse(await json('/api/worker/jobs','POST',{id,prompt:'Coastal observatory fixture integration check',seed:42,fixture:'observatory'}));
const deadline=Date.now()+30_000;
while(['queued','running'].includes(job.status)&&Date.now()<deadline){await new Promise(r=>setTimeout(r,100));job=WorkerJobSchema.parse(await json(`/api/worker/jobs/${id}`));}
if(job.status!=='succeeded')throw new Error(`Fixture job did not succeed: ${job.status}`);
const manifest=ArtifactSchema.array().parse(await json(`/api/worker/jobs/${id}/import`,'POST'));
for(const artifact of manifest){const response=await fetch(origin+artifact.url,{signal:AbortSignal.timeout(30_000)});if(!response.ok)throw new Error('Accepted artifact unavailable');const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length!==artifact.bytes||createHash('sha256').update(bytes).digest('hex')!==artifact.sha256)throw new Error('Accepted artifact does not match manifest');}
await mkdir('.runtime',{recursive:true});
await writeFile('.runtime/worker-smoke.json',JSON.stringify({capturedAt:new Date().toISOString(),mode:'fixture',nvidiaExecution:'not_run',job,capabilities,manifest},null,2)+'\n');
console.log(`Mac → worker → verified local artifacts passed: ${id}. NVIDIA execution: not_run.`);
