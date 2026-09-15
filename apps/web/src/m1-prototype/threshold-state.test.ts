import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {acceptComposition,approachRoute,express,freshWorld,observeCrossing,restoreWorld,thresholdBoxes,type Intention} from './threshold-state.ts';
import {start,step,overlaps} from './spatial.ts';
import type {CollisionBox,Vec3} from '../../../../packages/protocol/src/index.ts';
const artifact='apps/web/m1-prototype-public/m1-prototype/scene.json';
test('intention is proximity-gated, causal, persisted, and cannot replace an accepted result',()=>{
 const initial=freshWorld();assert.equal(express(initial,'ascend',start),initial);
 for(const intent of ['ascend','seek'] as Intention[]){const forming=express(initial,intent,[0,1.65,-9]);assert.equal(forming.threshold.phase,'forming');assert.equal(forming.events[0].kind,'intention-recorded');assert.equal(forming.threshold.constraints?.continuousFloor,true);assert.equal(forming.threshold.composition?.upperOpenness,forming.threshold.constraints?.upperOpenness);assert.equal(restoreWorld(JSON.stringify(forming)).threshold.phase,'forming');
 const ready=acceptComposition(forming);assert.equal(ready.events[1].kind,'composition-ready');const crossed=observeCrossing(ready,[0,1.65,-10],[0,1.65,-12]);assert.equal(crossed.threshold.phase,'crossed');assert.equal(crossed.events[2].kind,'crossed');const returned=observeCrossing(crossed,[0,1.65,-12],[0,1.65,-10]);assert.equal(returned.events[3].kind,'returned');assert.deepEqual(restoreWorld(JSON.stringify(returned)),returned);assert.equal(express(returned,intent==='ascend'?'seek':'ascend',[0,1.65,-9]),returned);}
 assert.notDeepEqual(express(initial,'ascend',[0,1.65,-9]).threshold.composition,express(initial,'seek',[0,1.65,-9]).threshold.composition);
 assert.deepEqual(restoreWorld('broken'),initial);
});
test('real generated approach, gated seam, shared destination and return stay walkable for both intentions',{skip:!existsSync(artifact)},()=>{
 const source=JSON.parse(readFileSync(artifact,'utf8')).boxes as CollisionBox[];
 for(const intent of ['ascend','seek'] as Intention[]){let world=freshWorld(),p:Vec3=[...start];let boxes=thresholdBoxes(source,world);
 function walk(target:Vec3){for(let i=0;i<2000&&Math.hypot(p[0]-target[0],p[2]-target[2])>.04;i++){const dx=target[0]-p[0],dz=target[2]-p[2],len=Math.hypot(dx,dz),next=step(p,dx/len*Math.min(.04,len),dz/len*Math.min(.04,len),boxes);assert.equal(overlaps(next,boxes),false);assert.ok(Math.hypot(next[0]-p[0],next[2]-p[2])>.00001,'Must progress');world=observeCrossing(world,p,next);p=next;}assert.ok(Math.hypot(p[0]-target[0],p[2]-target[2])<.05);}
 for(const target of approachRoute)walk(target);assert.ok(step(p,0,-8,boxes)[2]>=-10.5);
 p=step(p,0,-8,boxes);assert.equal(p[2],-10.5);world=express(world,intent,p);assert.equal(world.threshold.phase,'forming','Contact at the closed seam must allow intention');assert.ok(step(p,0,-8,thresholdBoxes(source,world))[2]>=-10.5);
 world=acceptComposition(world);boxes=thresholdBoxes(source,world);walk([0,1.65,-20]);assert.equal(world.events.at(-1)?.kind,'crossed');walk([0,1.65,-9]);assert.equal(world.events.at(-1)?.kind,'returned');
 const other=acceptComposition(express(freshWorld(),intent==='ascend'?'seek':'ascend',[0,1.65,-9]));assert.deepEqual(boxes,thresholdBoxes(source,other));}
});
