import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {chunkBoxes,route,start,step,overlaps} from './spatial.ts';
import type {CollisionBox,Vec3} from '../../../../packages/protocol/src/index.ts';
const path='apps/web/m1-prototype-public/m1-prototype/scene.json';
test('actual generated chunk supports a closed circuit, real obstacle blocking, and bounded flat-floor walking',{skip:!existsSync(path)},()=>{
 const data=JSON.parse(readFileSync(path,'utf8')) as {boxes:CollisionBox[]};const boxes=chunkBoxes(data.boxes);let p:Vec3=[...start],distance=0;
 assert.equal(overlaps(p,boxes),false);
 for(const target of route){let steps=0;while(Math.hypot(target[0]-p[0],target[2]-p[2])>.035){assert.ok(steps++<1500,'Route must make progress');const dx=target[0]-p[0],dz=target[2]-p[2],len=Math.hypot(dx,dz),next=step(p,dx/len*Math.min(.04,len),dz/len*Math.min(.04,len),boxes);assert.equal(overlaps(next,boxes),false);assert.equal(next[1],1.65);distance+=Math.hypot(next[0]-p[0],next[2]-p[2]);p=next;}}
 assert.ok(distance>28 && distance<30);assert.ok(Math.hypot(p[0]-start[0],p[2]-start[2])<.04);
 const blocked=step(start,0,-20,boxes);assert.ok(blocked[2]>1&&blocked[2]<2);assert.equal(overlaps(blocked,boxes),false);
 assert.ok(Math.abs(step([7,1.65,7],20,0,boxes)[0]-8.5)<1e-6);
 const recess=step([-2.6,1.65,3],0,-6,chunkBoxes(data.boxes,true));assert.ok(Math.abs(recess[2]+3)<1e-6);
});
