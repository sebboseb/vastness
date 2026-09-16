/** Coarse appearance only: DC color does not identify emission or physical material properties. */
export type RGB = [number, number, number];
export type ColorSamples = {positions: ArrayLike<number>; colors: ArrayLike<number>};
export type ProjectionOptions = {paletteSize?: number; cellSize?: number; maxDistance?: number};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
/** PlayCanvas 2.22.1 scene/gsplat/gsplat-resource.js updateColorData and gsplat-data.js.
 * The renderer uses 0.5 + SH_C0 * f_dc_n. Clamp to the display range for this palette only.
 */
export function gaussianDcToRgb(dc: RGB): RGB {
  if (!dc.every(Number.isFinite)) throw new Error('Gaussian DC values must be finite');
  return dc.map(value => clamp(.5 + .28209479177387814 * value)) as RGB;
}

function validateTriples(values: ArrayLike<number>, name: string, maximum: number) {
  if (!Number.isInteger(values.length) || values.length % 3 || values.length > maximum * 3) throw new Error(`${name} must contain bounded XYZ/RGB triples`);
  for (let i = 0; i < values.length; i++) if (!Number.isFinite(values[i])) throw new Error(`${name} must contain finite values`);
}

const colorAt = (values: ArrayLike<number>, index: number): RGB => [values[index * 3], values[index * 3 + 1], values[index * 3 + 2]];
const chroma = (color: RGB) => Math.max(...color) - Math.min(...color);
// Deliberately prioritize chroma contrast over extra brightness shades. Plain RGB quantization
// merged the generated mushroom's small orange patch into much more common same-hue brown.
// This weights measured color differences; it never boosts or invents a sample's brightness.
const colorDistance = (a: RGB, b: RGB) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2 + 10 * (chroma(a) - chroma(b)) ** 2;

// Six hue families plus neutral. Low chroma stays neutral; saturated minority cues receive their
// own family even when the scene is mostly dark. This is color classification, not object semantics.
function family([r, g, b]: RGB) {
  const high = Math.max(r, g, b), low = Math.min(r, g, b), chroma = high - low;
  if (chroma < .06 || chroma / Math.max(high, .001) < .25) return 6;
  let hue = high === r ? (g - b) / chroma : high === g ? (b - r) / chroma + 2 : (r - g) / chroma + 4;
  hue = (hue * 60 + 360) % 360;
  return Math.floor(((hue + 30) % 360) / 60);
}

function coarsePalette(projected: RGB[], requestedSize: number) {
  const histogram = new Map<number, {color: RGB; count: number; family: number}>();
  for (const color of projected) {
    const key = family(color) * 32768 + (Math.round(color[0] * 31) << 10) + (Math.round(color[1] * 31) << 5) + Math.round(color[2] * 31);
    const current = histogram.get(key);
    if (current) {current.color = current.color.map((value, i) => value + color[i]) as RGB; current.count++;}
    else histogram.set(key, {color: [...color], count: 1, family: family(color)});
  }
  const bins = [...histogram.values()].map(bin => ({...bin, color: bin.color.map(value => value / bin.count) as RGB}));
  // Separate family seeds prevent large neutral regions from swallowing a small red/amber region.
  const palette: {color: RGB; family: number}[] = [];
  for (let group = 0; group <= 6; group++) {
    const members = bins.filter(bin => bin.family === group);
    if (!members.length) continue;
    const count = members.reduce((sum, bin) => sum + bin.count, 0);
    palette.push({family: group, color: [0, 1, 2].map(axis => members.reduce((sum, bin) => sum + bin.color[axis] * bin.count, 0) / count) as RGB});
  }
  while (palette.length < requestedSize && palette.length < bins.length) {
    let winner: typeof bins[number] | undefined, best = .0001;
    for (const bin of bins) {
      const distance = Math.min(...palette.filter(entry => entry.family === bin.family).map(entry => colorDistance(bin.color, entry.color)));
      const score = distance * bin.count ** .15;
      if (score > best) {best = score; winner = bin;}
    }
    if (!winner) break;
    palette.push({family: winner.family, color: [...winner.color]});
  }
  // A few bounded refinement passes coarsen brightness variations within each retained hue family.
  for (let iteration = 0; iteration < 5; iteration++) {
    const sums = palette.map(() => ({rgb: [0, 0, 0] as RGB, count: 0}));
    for (const bin of bins) {
      let nearest = -1, best = Infinity;
      palette.forEach((entry, index) => {const d = colorDistance(bin.color, entry.color); if (entry.family === bin.family && d < best) {nearest = index; best = d;}});
      const sum = sums[nearest]; sum.count += bin.count;
      sum.rgb = sum.rgb.map((value, i) => value + bin.color[i] * bin.count) as RGB;
    }
    palette.forEach((entry, index) => {if (sums[index].count) entry.color = sums[index].rgb.map(value => value / sums[index].count) as RGB;});
  }
  const colors: number[] = [];
  for (const color of projected) {
    const group = family(color);
    let chosen: RGB | undefined, best = Infinity;
    for (const entry of palette) {const d = colorDistance(color, entry.color); if (entry.family === group && d < best) {chosen = entry.color; best = d;}}
    colors.push(...chosen!, 1);
  }
  return {colors, palette: palette.map(entry => entry.color)};
}

/** Same model-space coordinates for mesh and samples; no geometry, transforms or input mutations.
 * One nearest-to-cell-center sample represents each fine spatial cell. Search finds the nearest
 * retained representative within maxDistance. This bounded approximation does not average colors
 * across surfaces. Unmatched vertices receive a declared neutral fallback, never a distant cue.
 */
export function projectCoarseColors(meshPositions: ArrayLike<number>, samples: ColorSamples, options: ProjectionOptions = {}) {
  validateTriples(meshPositions, 'Mesh positions', 2_000_000);
  validateTriples(samples.positions, 'Sample positions', 4_000_000);
  validateTriples(samples.colors, 'Sample colors', 4_000_000);
  if (samples.positions.length !== samples.colors.length) throw new Error('Sample position/color counts must match');
  for (let i = 0; i < samples.colors.length; i++) if (samples.colors[i] < 0 || samples.colors[i] > 1) throw new Error('Sample RGB must be in [0,1]');
  const paletteSize = options.paletteSize ?? 12;
  if (!Number.isInteger(paletteSize) || paletteSize < 7 || paletteSize > 16) throw new Error('Palette size must be 7..16 to retain hue families and neutral');
  const min: RGB = [Infinity, Infinity, Infinity], max: RGB = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < meshPositions.length; i++) {const axis = i % 3; min[axis] = Math.min(min[axis], meshPositions[i]); max[axis] = Math.max(max[axis], meshPositions[i]);}
  const diagonal = meshPositions.length ? Math.hypot(...max.map((value, i) => value - min[i])) : 0;
  const cellSize = options.cellSize ?? Math.max(diagonal / 256, .001);
  const maxDistance = options.maxDistance ?? cellSize * 4;
  if (!Number.isFinite(cellSize) || cellSize <= 0 || !Number.isFinite(maxDistance) || maxDistance <= 0 || maxDistance / cellSize > 8) throw new Error('Positive finite distances required, maxDistance/cellSize must be <= 8');
  const cells = new Map<string, number>();
  const cellDistance = (i: number, x: number, y: number, z: number) => (samples.positions[i * 3] - (x + .5) * cellSize) ** 2 + (samples.positions[i * 3 + 1] - (y + .5) * cellSize) ** 2 + (samples.positions[i * 3 + 2] - (z + .5) * cellSize) ** 2;
  for (let i = 0; i < samples.positions.length / 3; i++) {
    const x = Math.floor(samples.positions[i * 3] / cellSize), y = Math.floor(samples.positions[i * 3 + 1] / cellSize), z = Math.floor(samples.positions[i * 3 + 2] / cellSize);
    if (![x, y, z].every(Number.isSafeInteger)) throw new Error('Sample coordinates exceed safe spatial grid bounds');
    const key = `${x},${y},${z}`, previous = cells.get(key);
    if (previous === undefined || cellDistance(i, x, y, z) < cellDistance(previous, x, y, z)) cells.set(key, i);
    if (cells.size > 750_000) throw new Error('Projection spatial cell budget exceeded; use a larger cellSize');
  }
  const projected: RGB[] = [];
  let matchedVertices = 0, maxMatchedDistance = 0, searchedCells = 0;
  const fallback: RGB = [.35, .35, .35];
  for (let i = 0; i < meshPositions.length / 3; i++) {
    const px = meshPositions[i * 3], py = meshPositions[i * 3 + 1], pz = meshPositions[i * 3 + 2];
    const cx = Math.floor(px / cellSize), cy = Math.floor(py / cellSize), cz = Math.floor(pz / cellSize);
    if (![cx, cy, cz].every(Number.isSafeInteger)) throw new Error('Mesh coordinates exceed safe spatial grid bounds');
    let nearest = -1, best = maxDistance ** 2;
    for (let ring = 0; ring <= Math.ceil(maxDistance / cellSize); ring++) {
      for (let x = cx - ring; x <= cx + ring; x++) for (let y = cy - ring; y <= cy + ring; y++) for (let z = cz - ring; z <= cz + ring; z++) {
        if (ring && Math.max(Math.abs(x - cx), Math.abs(y - cy), Math.abs(z - cz)) !== ring) continue;
        if (++searchedCells > 50_000_000) throw new Error('Projection search budget exceeded; reduce vertex count or search radius');
        const candidate = cells.get(`${x},${y},${z}`);
        if (candidate === undefined) continue;
        const d = (samples.positions[candidate * 3] - px) ** 2 + (samples.positions[candidate * 3 + 1] - py) ** 2 + (samples.positions[candidate * 3 + 2] - pz) ** 2;
        if (d < best || (d === best && (nearest < 0 || candidate < nearest))) {nearest = candidate; best = d;}
      }
      const outside = Math.min(px - (cx - ring) * cellSize, (cx + ring + 1) * cellSize - px, py - (cy - ring) * cellSize, (cy + ring + 1) * cellSize - py, pz - (cz - ring) * cellSize, (cz + ring + 1) * cellSize - pz);
      if (outside ** 2 > best) break;
    }
    if (nearest >= 0) {projected.push(colorAt(samples.colors, nearest)); matchedVertices++; maxMatchedDistance = Math.max(maxMatchedDistance, Math.sqrt(best));}
    else projected.push([...fallback]);
  }
  const result = coarsePalette(projected, paletteSize);
  return {...result, stats: {vertexCount: meshPositions.length / 3, sampleCount: samples.positions.length / 3, retainedSamples: cells.size, searchedCells, matchedVertices, unmatchedVertices: meshPositions.length / 3 - matchedVertices, maxMatchedDistance, paletteSize: result.palette.length, cellSize, maxDistance}};
}
