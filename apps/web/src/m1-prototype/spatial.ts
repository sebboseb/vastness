import type {CollisionBox, Vec3} from '../../../../packages/protocol/src/index.ts';
import {movePlayer} from '../../../../packages/world-model/src/index.ts';

export const placements: Vec3[] = [[0,0,0],[-4,0,-6],[4,0,-6]];
export const start: Vec3 = [0,1.65,7];
export const route: Vec3[] = [[-3.4,1.65,5],[-3.4,1.65,-2],[0,1.65,-3],[3.4,1.65,-2],[3.4,1.65,5],[0,1.65,7]];
export const boundary: CollisionBox[] = [
 {min:[-9,-.2,-11],max:[9,0,9]},
 {min:[-9,0,-11],max:[-8.8,8,9]}, {min:[8.8,0,-11],max:[9,8,9]},
 {min:[-9,0,-11],max:[9,8,-10.8]}, {min:[-9,0,8.8],max:[9,8,9]},
];
export function chunkBoxes(boxes:CollisionBox[], inspection=false):CollisionBox[] {
 return [...boundary,...(inspection?placements.slice(0,1):placements).flatMap(p=>boxes.map(b=>({min:b.min.map((n,i)=>n+p[i]) as Vec3,max:b.max.map((n,i)=>n+p[i]) as Vec3})))];
}
export function step(position:Vec3, dx:number,dz:number, boxes:CollisionBox[]):Vec3 {
 return movePlayer(position,[dx,0,dz],boxes,.3);
}
export function overlaps(position:Vec3,boxes:CollisionBox[]):boolean {
 return boxes.some(b=>b.max[1]>position[1]-1.45 && b.min[1]<position[1]+.15 && position[0]>b.min[0]-.299 && position[0]<b.max[0]+.299 && position[2]>b.min[2]-.299 && position[2]<b.max[2]+.299);
}
