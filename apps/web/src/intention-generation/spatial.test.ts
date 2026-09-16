import assert from 'node:assert/strict';
import test from 'node:test';
import {movePlayer} from '../../../../packages/world-model/src/index.ts';
import type {CollisionBox, Vec3} from '../../../../packages/protocol/src/index.ts';
import {approach, collisionBoxes, crossing, overlaps, shiftBoxes, stepToward} from './spatial.ts';

test('closed threshold stops high-speed movement until the destination is render-ready', () => {
  const closed = collisionBoxes([], false);
  const stopped = movePlayer(approach, [0, 0, -30], closed, .3);
  assert.ok(stopped[2] >= -11.58 - 1e-9);
  assert.equal(crossing(approach, stopped), null);
  assert.equal(overlaps(stopped, closed), false);
  const entered = movePlayer(stopped, [0, 0, -2], collisionBoxes([], true), .3);
  assert.equal(crossing(stopped, entered), 'crossed');
  const returned = movePlayer(entered, [0, 0, 2], collisionBoxes([], true), .3);
  assert.equal(crossing(entered, returned), 'returned');
});

test('open center is traversable while authored wall beside threshold remains solid', () => {
  const boxes = collisionBoxes([], true);
  assert.ok(movePlayer([0, 1.65, -11], [0, 0, -3], boxes)[2] < -12);
  assert.ok(movePlayer([3, 1.65, -11], [0, 0, -3], boxes)[2] > -12);
});

test('actual generated collision moves with the accepted placement and route stepping cannot bypass it', () => {
  const local: CollisionBox[] = [{min: [-1, 0, -1], max: [1, 4, 1]}];
  const destination = shiftBoxes(local, [0, 0, -21]);
  assert.deepEqual(local[0].min, [-1, 0, -1]);
  const boxes = collisionBoxes(destination, true);
  let position: Vec3 = [0, 1.65, -13];
  for (let i = 0; i < 100; i++) position = stepToward(position, [0, 1.65, -25], .16, boxes);
  assert.ok(Math.abs(position[2] + 19.7) < 1e-8);
  assert.equal(overlaps(position, boxes), false);
  const route: Vec3[] = [[-3, 1.65, -13], [-3, 1.65, -25], [3, 1.65, -25], [3, 1.65, -13], [0, 1.65, -13]];
  position = [0, 1.65, -13];
  for (const target of route) {
    for (let i = 0; i < 200 && Math.hypot(position[0] - target[0], position[2] - target[2]) > .001; i++) {
      position = stepToward(position, target, .16, boxes); assert.equal(overlaps(position, boxes), false);
    }
    assert.ok(Math.hypot(position[0] - target[0], position[2] - target[2]) < .001);
  }
});
