/** Disposable scratch world. Semantic intent → fixture composition → accepted threshold. */
import {z} from 'zod';
import type {CollisionBox,Vec3} from '../../../../packages/protocol/src/index.ts';
import {boundary,chunkBoxes} from './spatial.ts';
export const scratchKey='vastness:PROTOTYPE-wipe-me:intention-v1';
export const seamZ=-10.9;
export const nextPlacements:Vec3[]=[[-4,0,-19],[4,0,-19],[0,0,-24]];
export const approachRoute:Vec3[]=[[-3.4,1.65,5],[-3.4,1.65,-2],[0,1.65,-3],[0,1.65,-9]];
export type Intention='ascend'|'seek';
const compositionSchema=z.object({source:z.literal('controlled-fixture-v1'),seed:z.literal(14),verticalEmphasis:z.number(),focalEmphasis:z.number(),upperOpenness:z.number(),detailRevelation:z.number()});
const eventSchema=z.object({sequence:z.number(),kind:z.enum(['intention-recorded','composition-ready','crossed','returned']),intention:z.enum(['ascend','seek'])});
const worldSchema=z.object({schema:z.literal(1),id:z.literal('PROTOTYPE-wipe-me-threshold'),threshold:z.object({id:z.literal('north'),phase:z.enum(['unshaped','forming','ready','crossed']),intention:z.enum(['ascend','seek']).nullable(),constraints:z.array(z.string()),composition:compositionSchema.nullable()}),events:z.array(eventSchema)});
export type PrototypeWorld=z.infer<typeof worldSchema>;
export function freshWorld():PrototypeWorld{return {schema:1,id:'PROTOTYPE-wipe-me-threshold',threshold:{id:'north',phase:'unshaped',intention:null,constraints:[],composition:null},events:[]};}
export function inReach(p:Vec3){return Math.abs(p[0])<1.25&&p[2]<-7.5&&p[2]>-10.5;}
export function gesture(pitch:number):Intention{return pitch>23?'ascend':'seek';}
export function express(world:PrototypeWorld,intention:Intention,p:Vec3):PrototypeWorld{
 if(world.threshold.phase!=='unshaped'||!inReach(p))return world;
 const constraints=intention==='ascend'?['emphasize vertical rhythm','open the upper volume','keep a continuous walkable floor']:['draw attention toward a concealed focus','reveal sparse traces on approach','keep a continuous walkable floor'];
 // Fixed seed, shared shell and source artifacts. Semantic axes, not a destination id.
 const composition={source:'controlled-fixture-v1' as const,seed:14 as const,verticalEmphasis:intention==='ascend'?1:.15,focalEmphasis:intention==='seek'?1:.15,upperOpenness:intention==='ascend'?1:.35,detailRevelation:intention==='seek'?1:.2};
 return {...world,threshold:{...world.threshold,phase:'forming',intention,constraints,composition},events:[...world.events,{sequence:world.events.length+1,kind:'intention-recorded',intention}]};
}
export function acceptComposition(world:PrototypeWorld):PrototypeWorld{
 if(world.threshold.phase!=='forming'||!world.threshold.composition||!world.threshold.intention)return world;
 return {...world,threshold:{...world.threshold,phase:'ready'},events:[...world.events,{sequence:world.events.length+1,kind:'composition-ready',intention:world.threshold.intention}]};
}
export function observeCrossing(world:PrototypeWorld,before:Vec3,after:Vec3):PrototypeWorld{
 if(!world.threshold.intention||!['ready','crossed'].includes(world.threshold.phase))return world;
 const crossed=before[2]>=seamZ&&after[2]<seamZ,returned=before[2]<seamZ&&after[2]>=seamZ;
 if(!crossed&&!returned)return world;
 return {...world,threshold:{...world.threshold,phase:'crossed'},events:[...world.events,{sequence:world.events.length+1,kind:crossed?'crossed':'returned',intention:world.threshold.intention}]};
}
export function restoreWorld(raw:string|null):PrototypeWorld{
 try{const result=worldSchema.safeParse(JSON.parse(raw??'null'));if(!result.success)return freshWorld();const w=result.data;
 if(w.threshold.phase!=='unshaped'&&(!w.threshold.composition||!w.threshold.intention))return freshWorld();
 // Rendering the persisted composition must finish again before opening the seam.
 if(w.threshold.phase==='forming')return w;
 return w;
 }catch{return freshWorld();}
}
export const nextBoundary:CollisionBox[]=[{min:[-9,-.2,-28],max:[9,0,-11]}, {min:[-9,0,-28],max:[-8.8,8,-11]},{min:[8.8,0,-28],max:[9,8,-11]},{min:[-9,0,-28],max:[9,8,-27.8]}];
export const portalSides:CollisionBox[]=[{min:[-9,0,-11],max:[-1.6,8,-10.8]},{min:[1.6,0,-11],max:[9,8,-10.8]}];
export const closedSeam:CollisionBox={min:[-1.6,0,-11],max:[1.6,5,-10.8]};
export function thresholdBoxes(source:CollisionBox[],world:PrototypeWorld):CollisionBox[]{
 const existing=chunkBoxes(source).filter(b=>b!==boundary[3]);
 return [...existing,...portalSides,...nextBoundary,...nextPlacements.flatMap(p=>source.map(b=>({min:b.min.map((n,i)=>n+p[i]) as Vec3,max:b.max.map((n,i)=>n+p[i]) as Vec3}))),...(['ready','crossed'].includes(world.threshold.phase)?[]:[closedSeam])];
}
