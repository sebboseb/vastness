import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, writeFile, readFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {gaussianDcToRgb, projectCoarseColors, type RGB} from './color.ts';
import {readGaussianDcPly, preparePassageColors} from '../../../../scripts/prepare-passage-colors.ts';

function ply(points: {position: RGB; dc: RGB; opacity?: number}[]) {
  const header = Buffer.from(`ply\nformat binary_little_endian 1.0\nelement vertex ${points.length}\n${['x', 'y', 'z', 'f_dc_0', 'f_dc_1', 'f_dc_2', 'opacity'].map(name => `property float ${name}\n`).join('')}end_header\n`);
  const payload = Buffer.alloc(points.length * 28);
  points.forEach((point, index) => [...point.position, ...point.dc, point.opacity ?? 8].forEach((value, axis) => payload.writeFloatLE(value, index * 28 + axis * 4)));
  return Buffer.concat([header, payload]);
}

test('Gaussian DC follows PlayCanvas conversion, without a fabricated brightness or emission boost', () => {
  assert.deepEqual(gaussianDcToRgb([0, 0, 0]), [.5, .5, .5]);
  const actual = gaussianDcToRgb([1, -1, 0]);
  assert.ok(Math.abs(actual[0] - .7820947917738781) < 1e-12);
  assert.ok(Math.abs(actual[1] - .21790520822612186) < 1e-12);
  assert.deepEqual(gaussianDcToRgb([-10, 10, 0]), [0, 1, .5]);
  assert.throws(() => gaussianDcToRgb([NaN, 0, 0]), /finite/);
});

test('projection preserves spatially separate red, amber and neutral cues without distant color bleed', () => {
  const mesh = [0, 0, 0, .1, 0, 0, .2, 0, 0, 10, 0, 0];
  const samples = {positions: [0, 0, 0, .1, 0, 0, .2, 0, 0, 100, 0, 0], colors: [.85, .04, .02, .95, .55, .03, .4, .4, .4, 0, 1, 0]};
  const original = structuredClone({mesh, samples});
  const result = projectCoarseColors(mesh, samples, {cellSize: .01, maxDistance: .025});
  assert.equal(result.colors.length, mesh.length / 3 * 4);
  const [r, amber, gray, missing] = Array.from({length: 4}, (_, index) => result.colors.slice(index * 4, index * 4 + 3));
  assert.ok(r[0] > .8 && r[1] < .1 && r[2] < .1);
  assert.ok(amber[0] > .8 && amber[1] > .4 && amber[2] < .1);
  assert.ok(Math.max(...gray) - Math.min(...gray) < .001);
  assert.ok(Math.max(...missing) - Math.min(...missing) < .001, 'unmatched vertex stays neutral');
  assert.equal(result.stats.matchedVertices, 3); assert.equal(result.stats.unmatchedVertices, 1);
  assert.ok(!result.palette.some(color => color[1] > .8 && color[0] < .1), 'distant green samples cannot dominate the projected palette');
  for (let i = 3; i < result.colors.length; i += 4) assert.equal(result.colors[i], 1);
  assert.deepEqual({mesh, samples}, original);
  assert.deepEqual(projectCoarseColors(mesh, samples, {cellSize: .01, maxDistance: .025}), result, 'repeat projection is byte-for-byte deterministic');
});

test('minority saturated colors survive a dark majority while neutral vertices remain neutral', () => {
  const positions: number[] = [], colors: number[] = [];
  for (let i = 0; i < 300; i++) {
    positions.push(i * .02, 0, 0);
    const gray = .02 + (i % 20) * .008;
    colors.push(...(i === 298 ? [.9, .025, .01] : i === 299 ? [.95, .65, .025] : [gray, gray, gray]));
  }
  const result = projectCoarseColors(positions, {positions, colors}, {cellSize: .005, maxDistance: .01});
  assert.ok(result.palette.length <= 12);
  const red = result.colors.slice(298 * 4, 298 * 4 + 3), amber = result.colors.slice(299 * 4, 299 * 4 + 3);
  assert.ok(red[0] > .8 && red[1] < .1);
  assert.ok(amber[0] > .8 && amber[1] > .5 && amber[2] < .1);
  for (let i = 0; i < 298; i++) assert.ok(Math.max(...result.colors.slice(i * 4, i * 4 + 3)) - Math.min(...result.colors.slice(i * 4, i * 4 + 3)) < .001);
});

test('nearest representative search crosses cell boundaries and respects the maximum radius', () => {
  const result = projectCoarseColors([.099, 0, 0, .5, 0, 0], {
    positions: [.001, 0, 0, .101, 0, 0], colors: [1, 0, 0, 0, 0, 1],
  }, {cellSize: .1, maxDistance: .11});
  assert.deepEqual(result.colors.slice(0, 4), [0, 0, 1, 1], 'nearer neighbor in an adjacent cell wins');
  assert.equal(result.stats.matchedVertices, 1); assert.equal(result.stats.unmatchedVertices, 1);
  assert.ok(Math.abs(result.stats.maxMatchedDistance - .002) < 1e-12);
});

test('a rare vivid orange patch survives muted brown of the same hue family', () => {
  const positions: number[] = [], colors: number[] = [];
  for (let i = 0; i < 1000; i++) {
    positions.push(i * .02, 0, 0);
    const value = .12 + (i % 31) / 31 * .83;
    colors.push(...(i % 3 === 0 ? [value, value, value] : i % 3 === 1 ? [value * .8, value * .48, value * .3] : [value * .85, value * .75, value * .4]));
  }
  for (const color of [[.2, .5, .15], [.3, .45, .52], [.25, .28, .38], [.17, .07, .16], [.95, .44, .13]]) {
    positions.push(positions.length / 3 * .02, 0, 0); colors.push(...color);
  }
  const result = projectCoarseColors(positions, {positions, colors}, {cellSize: .005, maxDistance: .01});
  const orange = result.colors.slice(-4, -1);
  assert.ok(orange[0] > .8 && orange[1] < .55 && orange[2] < .22, `saturated local orange must not become brown: ${orange}`);
  assert.ok(result.palette.length <= 12);
});

test('invalid projection input fails explicitly rather than manufacturing geometry colors', () => {
  assert.throws(() => projectCoarseColors([0, 0], {positions: [], colors: []}), /triples/);
  assert.throws(() => projectCoarseColors([0, NaN, 0], {positions: [], colors: []}), /finite/);
  assert.throws(() => projectCoarseColors([], {positions: [0, 0, 0], colors: []}), /counts/);
  assert.throws(() => projectCoarseColors([], {positions: [0, 0, 0], colors: [2, 0, 0]}), /\[0,1\]/);
  assert.throws(() => projectCoarseColors([], {positions: [], colors: []}, {cellSize: 0}), /distances/);
  assert.throws(() => projectCoarseColors([], {positions: [], colors: []}, {cellSize: .001, maxDistance: 1}), /distances/);
  assert.deepEqual(projectCoarseColors([], {positions: [], colors: []}).colors, []);
});

test('PLY reader validates layout and filters transparent samples before color projection', () => {
  const bytes = ply([{position: [1, 2, 3], dc: [1, 0, -1]}, {position: [4, 5, 6], dc: [0, 1, 0], opacity: -20}]);
  const samples = readGaussianDcPly(bytes);
  assert.deepEqual([...samples.positions], [1, 2, 3]);
  assert.deepEqual([...samples.colors], gaussianDcToRgb([1, 0, -1]).map(Math.fround));
  assert.equal(samples.sourceCount, 2); assert.equal(samples.filteredCount, 1);
  assert.throws(() => readGaussianDcPly(bytes.subarray(0, bytes.length - 1)), /payload length/);
  assert.throws(() => readGaussianDcPly(ply([{position: [NaN, 0, 0], dc: [0, 0, 0]}])), /Non-finite/);
  assert.throws(() => readGaussianDcPly(Buffer.from(bytes.toString('binary').replace('f_dc_0', 'f_xx_0'), 'binary')), /Missing/);
});

test('offline preparation records actual source and untouched mesh hashes and is reproducible', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'vastness-colors-'));
  try {
    const mesh = {positions: [0, 0, 0, .1, 0, 0, 0, .1, 0], normals: [0, 0, 1, 0, 0, 1, 0, 0, 1], indices: [0, 1, 2]};
    const sceneBytes = Buffer.from(JSON.stringify({mesh}));
    const plyBytes = ply([{position: [0, 0, 0], dc: [1, -1, -1]}, {position: [.1, 0, 0], dc: [0, 0, 0]}, {position: [0, .1, 0], dc: [.7, .3, -1]}]);
    const scenePath = join(directory, 'scene.json'), plyPath = join(directory, 'scene.ply'), outputPath = join(directory, 'colors.json');
    await Promise.all([writeFile(scenePath, sceneBytes), writeFile(plyPath, plyBytes)]);
    const result = await preparePassageColors(scenePath, plyPath, outputPath);
    const hash = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex');
    assert.equal(result.source.scene.sha256, hash(sceneBytes)); assert.equal(result.source.ply.sha256, hash(plyBytes));
    assert.equal(result.geometry.sha256, hash(Buffer.from(JSON.stringify(mesh)))); assert.equal(result.geometry.unchanged, true);
    assert.equal(result.colors.length, 12); assert.equal(result.stats.matchedVertices, 3);
    const first = await readFile(outputPath);
    await preparePassageColors(scenePath, plyPath, outputPath);
    assert.deepEqual(await readFile(outputPath), first);
    assert.deepEqual(await readFile(scenePath), sceneBytes); assert.deepEqual(await readFile(plyPath), plyBytes);
    await assert.rejects(preparePassageColors(scenePath, plyPath, scenePath), /must not replace/);
  } finally {await rm(directory, {recursive: true, force: true});}
});
