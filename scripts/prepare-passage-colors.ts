import {createHash} from 'node:crypto';
import {readFile, writeFile, mkdir, stat} from 'node:fs/promises';
import {basename, dirname, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {gaussianDcToRgb, projectCoarseColors, type ProjectionOptions} from '../apps/web/src/generated-passage/color.ts';

/** Strict reader for the uncompressed float32 little-endian Gaussian PLY emitted by our worker.
 * Reject unfamiliar schemas instead of guessing a layout. No view-dependent SH is reconstructed.
 */
export function readGaussianDcPly(bytes: Uint8Array, minOpacity = .1) {
  if (bytes.byteLength > 256 * 1024 * 1024) throw new Error('PLY exceeds the 256 MiB limit');
  if (!Number.isFinite(minOpacity) || minOpacity < 0 || minOpacity > 1) throw new Error('Opacity threshold must be in [0,1]');
  const prefix = Buffer.from(bytes.buffer, bytes.byteOffset, Math.min(bytes.byteLength, 64 * 1024));
  const headerEnd = prefix.indexOf('end_header\n');
  if (headerEnd < 0) throw new Error('PLY requires a bounded LF-terminated header');
  const lines = prefix.subarray(0, headerEnd).toString('ascii').trim().split('\n');
  if (lines[0] !== 'ply' || lines[1] !== 'format binary_little_endian 1.0') throw new Error('Expected binary_little_endian PLY 1.0');
  let count = -1;
  const properties: string[] = [];
  for (const line of lines.slice(2)) {
    if (!line || line.startsWith('comment ')) continue;
    const vertex = /^element vertex (\d+)$/.exec(line);
    if (vertex && count === -1) {count = Number(vertex[1]); continue;}
    const property = /^property (?:float|float32) (\w+)$/.exec(line);
    if (property && count >= 0 && !properties.includes(property[1])) {properties.push(property[1]); continue;}
    throw new Error(`Unsupported PLY header declaration: ${line}`);
  }
  if (!Number.isSafeInteger(count) || count < 1 || count > 4_000_000) throw new Error('PLY vertex count must be 1..4000000');
  const required = ['x', 'y', 'z', 'f_dc_0', 'f_dc_1', 'f_dc_2', 'opacity'];
  const offsets = required.map(name => {const index = properties.indexOf(name); if (index < 0) throw new Error(`Missing Gaussian property ${name}`); return index * 4;});
  const start = headerEnd + 'end_header\n'.length, stride = properties.length * 4;
  if (start + count * stride !== bytes.byteLength) throw new Error('PLY payload length does not match vertex count and stride');
  const positions = new Float32Array(count * 3), colors = new Float32Array(count * 3);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let kept = 0;
  for (let i = 0; i < count; i++) {
    const values = offsets.map(offset => view.getFloat32(start + i * stride + offset, true));
    if (!values.every(Number.isFinite)) throw new Error(`Non-finite Gaussian at vertex ${i}`);
    if (1 / (1 + Math.exp(-values[6])) < minOpacity) continue;
    positions.set(values.slice(0, 3), kept * 3);
    colors.set(gaussianDcToRgb([values[3], values[4], values[5]]), kept * 3); kept++;
  }
  if (!kept) throw new Error('No visible Gaussian DC samples remain');
  return {positions: positions.subarray(0, kept * 3), colors: colors.subarray(0, kept * 3), sourceCount: count, filteredCount: count - kept, minOpacity};
}

export async function preparePassageColors(scenePath: string, plyPath: string, outputPath: string, options: ProjectionOptions = {}) {
  if ([resolve(scenePath), resolve(plyPath)].includes(resolve(outputPath))) throw new Error('Color output must not replace a source artifact');
  const [sceneStat, plyStat] = await Promise.all([stat(scenePath), stat(plyPath)]);
  if (sceneStat.size > 128 * 1024 * 1024 || plyStat.size > 256 * 1024 * 1024) throw new Error('Source file size limit exceeded');
  const [sceneBytes, plyBytes] = await Promise.all([readFile(scenePath), readFile(plyPath)]);
  const scene = JSON.parse(sceneBytes.toString('utf8')) as {mesh?: {positions?: unknown}};
  if (!Array.isArray(scene.mesh?.positions)) throw new Error('Prepared scene.mesh.positions is required');
  const geometryBefore = JSON.stringify(scene.mesh);
  const samples = readGaussianDcPly(plyBytes);
  const result = projectCoarseColors(scene.mesh.positions, samples, options);
  const hash = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex');
  if (JSON.stringify(scene.mesh) !== geometryBefore) throw new Error('Projection unexpectedly changed source geometry');
  const output = {schemaVersion: 1, algorithm: 'local-dc-hue-palette-v1', coordinateSpace: 'source-model',
    source: {scene: {name: basename(scenePath), sha256: hash(sceneBytes)}, ply: {name: basename(plyPath), sha256: hash(plyBytes)}},
    geometry: {sha256: hash(Buffer.from(geometryBefore)), hashEncoding: 'JSON.stringify(scene.mesh)', unchanged: true},
    ...result, gaussian: {sourceCount: samples.sourceCount, filteredCount: samples.filteredCount, minOpacity: samples.minOpacity},
    limitations: ['DC appearance only; no emission, material physics or higher-order SH', 'Nearest fine-cell representative; bounded approximate projection, not texture reconstruction', 'Unmatched vertices use a neutral fallback; surfaces closer than the spatial cell may share a representative']};
  await mkdir(dirname(outputPath), {recursive: true});
  await writeFile(outputPath, JSON.stringify(output));
  return output;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const args = new Map<string, string>();
  const allowed = new Set(['--scene', '--ply', '--out', '--palette-size', '--cell-size', '--max-distance']);
  for (let i = 2; i < process.argv.length; i += 2) {
    if (!allowed.has(process.argv[i]) || !process.argv[i + 1] || args.has(process.argv[i])) throw new Error('Usage: tsx scripts/prepare-passage-colors.ts --scene scene.json --ply scene.ply --out colors.json [--palette-size 12] [--cell-size N] [--max-distance N]');
    args.set(process.argv[i], process.argv[i + 1]);
  }
  if (!args.has('--scene') || !args.has('--ply') || !args.has('--out')) throw new Error('--scene, --ply and --out are required');
  const options: ProjectionOptions = {};
  for (const [flag, key] of [['--palette-size', 'paletteSize'], ['--cell-size', 'cellSize'], ['--max-distance', 'maxDistance']] as const) if (args.has(flag)) options[key] = Number(args.get(flag));
  const output = await preparePassageColors(args.get('--scene')!, args.get('--ply')!, args.get('--out')!, options);
  console.log(JSON.stringify({output: resolve(args.get('--out')!), source: output.source, palette: output.palette, stats: output.stats, gaussian: output.gaussian}, null, 2));
}
