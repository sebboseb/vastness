import {test} from 'node:test';
import assert from 'node:assert/strict';
import {PlayerPoseSchema,WorkerJobRequestSchema} from './index.ts';
test('public pose input rejects non-finite positions and impossible pitch',()=>{
 assert.equal(PlayerPoseSchema.safeParse({position:[0,Infinity,0],yaw:0,pitch:0}).success,false);
 assert.equal(PlayerPoseSchema.safeParse({position:[0,1.65,0],yaw:0,pitch:90}).success,false);
});
test('job IDs cannot address parent paths in artifact storage',()=>{
 assert.equal(WorkerJobRequestSchema.safeParse({id:'../escape',prompt:'lab',seed:1,fixture:'arrival'}).success,false);
});
