import type {Chunk, CollisionBox, Portal, Vec3} from '../../protocol/src/index.ts';

/** Flat-floor kinematic walker against separate, world-space solid proxies. */
export function movePlayer(position:Vec3, displacement:Vec3, boxes:CollisionBox[], radius=0.3):Vec3 {
 if(![...position,...displacement,radius].every(Number.isFinite)||radius<=0) throw new Error('Invalid movement');
 const next:Vec3=[...position];
 const solids=boxes.filter(box=>box.max[1]>position[1]-1.45 && box.min[1]<position[1]+0.15);
 const steps=Math.max(1,Math.ceil(Math.hypot(displacement[0],displacement[2])/Math.max(radius/2,0.05)));
 for(let step=0;step<steps;step++) {
  for(const axis of [0,2] as const) {
   const other=axis===0?2:0;
   const delta=displacement[axis]/steps;
   let target=next[axis]+delta;
   for(const box of solids) {
    if(next[other]<=box.min[other]-radius || next[other]>=box.max[other]+radius) continue;
    const min=box.min[axis]-radius,max=box.max[axis]+radius;
    if(delta>0 && next[axis]<=min && target>min) target=min;
    if(delta<0 && next[axis]>=max && target<max) target=max;
   }
   next[axis]=target;
  }
 }
 return next;
}

export function chunkAt(position:Vec3,chunks:Chunk[]):string|null {
 return chunks.find(chunk=>[0,2].every(axis=>position[axis]>=chunk.bounds.min[axis]+chunk.transform.position[axis]&&position[axis]<=chunk.bounds.max[axis]+chunk.transform.position[axis]))?.id??null;
}

export function shouldLoadNeighbor(position:Vec3,portal:Portal,distance=6):boolean {
 return portal.connectedTo!==null && Math.hypot(position[0]-portal.position[0],position[2]-portal.position[2])<=distance;
}
