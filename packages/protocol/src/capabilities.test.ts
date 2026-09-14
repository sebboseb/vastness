import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {CapabilityReportSchema} from './index.ts';

test('actual Python inventory matches the shared capability schema without claiming GPU validation',()=>{
 const result=execFileSync(process.env.PYTHON??'python3',['services/gpu-worker/probe.py'],{encoding:'utf8',timeout:60_000});
 const report=CapabilityReportSchema.parse(JSON.parse(result));
 assert.equal(report.nvidiaExecution,'not_run');
 assert.equal(report.pytorch.cudaAvailable,null,'default inventory must not import PyTorch to validate CUDA');
 assert.ok(report.host.os.length>0);
 assert.equal(CapabilityReportSchema.safeParse({...report,nvidiaExecution:'passed'}).success,false);
});
