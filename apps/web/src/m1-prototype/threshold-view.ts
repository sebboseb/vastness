/** Authored fixture response, never represented as boundary-conditioned generation. */
import * as pc from 'playcanvas';
import type {CollisionBox,Vec3} from '../../../../packages/protocol/src/index.ts';
import {closedSeam,nextBoundary,portalSides,type PrototypeWorld} from './threshold-state.ts';
export function buildThresholdView(app:pc.Application){
 const root=new pc.Entity('disposable next space');app.root.addChild(root);
 const result=new pc.Entity('semantic fixture response');root.addChild(result);
 function mat(c:number[],lit=true){const m=new pc.StandardMaterial();m.diffuse=new pc.Color(...c);if(!lit){m.useLighting=false;m.emissive=new pc.Color(...c);}m.update();return m;}
 let focus:pc.Entity|undefined;const focusMaterial=mat([.68,.76,.55],false);focusMaterial.blendType=pc.BLEND_NORMAL;focusMaterial.depthWrite=false;focusMaterial.update();
 const stone=mat([.12,.20,.22]),accent=mat([.68,.76,.55],false),trace=mat([.33,.50,.50],false);
 function box(b:CollisionBox,m:pc.Material,parent=root){const e=new pc.Entity();e.addComponent('render',{type:'box',material:m});e.setLocalPosition(...b.min.map((n,i)=>(n+b.max[i])/2) as [number,number,number]);e.setLocalScale(...b.min.map((n,i)=>b.max[i]-n) as [number,number,number]);parent.addChild(e);return e;}
 for(const b of [...nextBoundary,...portalSides])box(b,stone);
 const veilMat=mat([.20,.37,.40],false);const veil=box(closedSeam,veilMat);veil.setLocalScale(3.2,4,.08);veil.setLocalPosition(0,2,-10.9);
 for(const x of [-1.67,1.67])box({min:[x-.06,0,-11.05],max:[x+.06,4.2,-10.72]},accent);
 box({min:[-1.73,4.14,-11.05],max:[1.73,4.26,-10.72]},accent);
 for(let z=-12;z>=-26;z-=2)box({min:[-8.8,.001,z-.012],max:[8.8,.007,z+.012]},trace);
 for(let x=-8;x<=8;x+=2)box({min:[x-.012,.001,-27.8],max:[x+.012,.007,-11]},trace);
 function compose(world:PrototypeWorld){for(const child of [...result.children])child.destroy();const c=world.threshold.composition;if(!c)return;
 // The physical shell/obstacles are invariant. Non-solid light traces remain above body height or flush to walls.
 const rising=c.verticalEmphasis>c.focalEmphasis,roof=4.3+3.4*c.upperOpenness;focus=undefined;
 for(const x of [-7,-5,5,7]){for(const z of [-14,-18,-22,-26]){
 if(rising){box({min:[x-.055,3.2,z-.055],max:[x+.055,roof-.1,z+.055]},accent,result);box({min:[x-.24,roof-.3,z-.04],max:[x+.24,roof-.24,z+.04]},trace,result);}
 else{box({min:[x-.38,3.1,z-.04],max:[x+.38,3.17,z+.04]},trace,result);}
 }}
 if(rising){for(const z of [-14,-20,-26])box({min:[-7,roof-.05,z-.04],max:[7,roof,z+.04]},trace,result);}
 else{for(const z of [-14,-18,-22]){box({min:[-2.8,roof-.08,z-.05],max:[2.8,roof,z+.05]},accent,result);for(const x of [-2.8,2.8])box({min:[x-.035,roof-.5,z-.05],max:[x+.035,roof,z+.05]},trace,result);}
 // A fragmented focus on the far wall draws the eye through, rather than naming a destination.
 focus=new pc.Entity('revealed focus');result.addChild(focus);for(let i=0;i<9;i++){const angle=i*Math.PI*2/9;const x=Math.cos(angle)*1.15,y=2.35+Math.sin(angle)*1.15;box({min:[x-.11,y-.11,-27.68],max:[x+.11,y+.11,-27.60]},focusMaterial,focus);}
 }
 }
 return {root,compose,update(world:PrototypeWorld,forming:number,position:Vec3){if(focus){const c=world.threshold.composition!;const reveal=Math.max(0,Math.min(1,(18-Math.hypot(position[0],position[2]+27.6))/8))*c.detailRevelation;focus.enabled=reveal>.03;focusMaterial.opacity=reveal;focusMaterial.update();}veil.enabled=world.threshold.phase==='unshaped'||world.threshold.phase==='forming';if(world.threshold.phase==='forming'){veil.setLocalScale(3.2,Math.max(.01,4*(1-forming)),.08);veil.setLocalPosition(0,4-2*(1-forming),-10.9);}else{veil.setLocalScale(3.2,4,.08);veil.setLocalPosition(0,2,-10.9);}result.enabled=!!world.threshold.composition;},result};
}
