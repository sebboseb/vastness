import {test} from 'node:test';
import assert from 'node:assert/strict';
import {movePlayer} from './index.ts';
import type {CollisionBox} from '../../protocol/src/index.ts';

test('a walker stops at a wall, including a frame large enough to tunnel through it',()=>{
 const wall:CollisionBox={min:[-7,0,-9.2],max:[7,4,-8.8]};
 const result=movePlayer([0,1.65,0],[0,0,-20],[wall]);
 assert.ok(result[2]>=-8.5 && result[2]<-8.3);
 assert.equal(result[1],1.65);
});

test('walk through a 3.2m portal and return, but its solid jamb stops a wider approach',()=>{
 const jambs:CollisionBox[]=[{min:[-7,0,-9.2],max:[-1.6,4,-8.8]},{min:[1.6,0,-9.2],max:[7,4,-8.8]}];
 const inB=movePlayer([0,1.65,-7],[0,0,-5],jambs);
 assert.ok(Math.abs(inB[2]+12)<1e-9);
 const back=movePlayer(inB,[0,0,5],jambs);
 assert.ok(Math.abs(back[2]+7)<1e-9);
 assert.ok(movePlayer([2,1.65,-7],[0,0,-5],jambs)[2]>=-8.5);
});

test('floor is walkable and diagonal wall contact slides without escaping',()=>{
 const solids:CollisionBox[]=[{min:[-7,-0.2,-9],max:[7,0,9]},{min:[6.8,0,-9],max:[7.2,4,9]}];
 const result=movePlayer([6,1.65,3],[3,0,-3],solids);
 assert.ok(result[0]<=6.5);
 assert.ok(Math.abs(result[2])<1e-9);
});

test('an unloaded portal barrier stops the walker until removed',()=>{
 const gate:CollisionBox={min:[-1.6,0,-9.2],max:[1.6,3.2,-8.8]};
 const waiting=movePlayer([0,1.65,-8],[0,0,-2],[gate]);
 assert.ok(waiting[2]>=-8.5);
 const ready=movePlayer(waiting,[0,0,-2],[]);
 assert.ok(ready[2]<-9);
});
