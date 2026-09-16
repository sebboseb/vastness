import type {CollisionBox, Vec3} from '../../../../packages/protocol/src/index.ts';
import {movePlayer} from '../../../../packages/world-model/src/index.ts';

export const start: Vec3 = [0, 1.65, 5];
export const approach: Vec3 = [0, 1.65, -11.5];
export const gate: CollisionBox = {min: [-10, 0, -12.12], max: [10, 8, -11.88]};
export const sourceRoom: CollisionBox[] = [
  {min: [-10, -.2, -12], max: [10, 0, 8]},
  {min: [-10, 0, -12], max: [-9.8, 8, 8]},
  {min: [9.8, 0, -12], max: [10, 8, 8]},
  {min: [-10, 0, 7.8], max: [10, 8, 8]},
  {min: [-10, 0, -12.1], max: [-1.6, 8, -11.9]},
  {min: [1.6, 0, -12.1], max: [10, 8, -11.9]},
];
export function shiftBoxes(boxes: CollisionBox[], placement: Vec3): CollisionBox[] {
  return boxes.map(box => ({min: box.min.map((n, i) => n + placement[i]) as Vec3, max: box.max.map((n, i) => n + placement[i]) as Vec3}));
}
export function collisionBoxes(destination: CollisionBox[], open: boolean): CollisionBox[] {
  return [...sourceRoom, ...destination, ...(open ? [] : [gate])];
}
export function overlaps(position: Vec3, boxes: CollisionBox[]): boolean {
  return boxes.some(box => box.max[1] > position[1] - 1.45 && box.min[1] < position[1] + .15 && position[0] > box.min[0] - .299 && position[0] < box.max[0] + .299 && position[2] > box.min[2] - .299 && position[2] < box.max[2] + .299);
}
export function stepToward(position: Vec3, target: Vec3, distance: number, boxes: CollisionBox[]): Vec3 {
  const dx = target[0] - position[0], dz = target[2] - position[2];
  const length = Math.hypot(dx, dz);
  if (!length) return position;
  const ratio = Math.min(distance / length, 1);
  return movePlayer(position, [dx * ratio, 0, dz * ratio], boxes, .3);
}
export function crossing(before: Vec3, after: Vec3): 'crossed' | 'returned' | null {
  if (before[2] >= -12 && after[2] < -12) return 'crossed';
  if (before[2] < -12 && after[2] >= -12) return 'returned';
  return null;
}
