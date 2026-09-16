import type {TriangleMesh} from '../../apps/web/src/generated-passage/navigation.ts';

export const PHYSICAL_SCALES = [6, 10, 12, 16] as const;
const METHOD_VERSION = 'geometry-proportions-v1';
const MAX_GRID = 16, MAX_COLUMN_INTERSECTIONS = 16_000_000, MAX_WIDTH_PROBES = 32;
const SLOPE_Y = Math.cos(35 * Math.PI / 180);

export type ScaleFeatures = {
 sourceTriangles: number; sampledTriangles: number; triangleSamplingStride: number;
 gridResolution: number; gridColumns: number; columnIntersectionBound: number; supportColumns: number; supportCoverage: number;
 overheadColumns: number; overheadCoverage: number; medianHeadroom: number | null;
 standingHeadroomFraction: number | null; headroomProportionScore: number | null;
 widthProbes: number; pairedWallProbes: number; medianWallSpacing: number | null;
 bodyWidthFraction: number | null; widthProportionScore: number | null;
 dimensions: [number, number, number]; informative: boolean;
};
export type PhysicalScaleSelection = {
 selectedScale: number;
 ranked: {scale: number; score: number; features: ScaleFeatures}[];
 methodVersion: string;
 limitations: string[];
};
type Column = {x: number; z: number; floor: number; overhead: number};
type Vertex = [number, number, number];

const average = (values: number[]) => values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
function median(values: number[]) {
 if (!values.length) return null;
 const sorted = [...values].sort((a, b) => a - b), middle = Math.floor(sorted.length / 2);
 return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}
function proportion(value: number, minimum: number, preferred: number, logSpread: number) {
 // A soft architectural prior, not a claim that geometry determines metres.
 return value < minimum ? value / minimum - 1 : Math.exp(-0.5 * (Math.log(value / preferred) / logSpread) ** 2);
}

/** Artifact-only heuristic; no route, component, entry or traversal assessment. */
export function selectPhysicalScale(mesh: TriangleMesh, scales: readonly number[] = PHYSICAL_SCALES): PhysicalScaleSelection {
 if (!scales.length || scales.length > 16 || !scales.every(scale => Number.isFinite(scale) && scale > 0 && scale <= 20) || new Set(scales).size !== scales.length) throw new Error('Expected 1–16 distinct positive scales no greater than 20');
 const {positions, indices} = mesh;
 if (!positions.length || positions.length % 3 || positions.length > 6_000_000 || !indices.length || indices.length % 3 || indices.length > 12_000_000) throw new Error('Invalid scale-selection mesh dimensions');
 const low: Vertex = [Infinity, Infinity, Infinity], high: Vertex = [-Infinity, -Infinity, -Infinity];
 for (let i = 0; i < positions.length; i++) {
  const value = positions[i], axis = i % 3;
  if (!Number.isFinite(value) || Math.abs(value) > 100) throw new Error('Invalid source coordinates');
  low[axis] = Math.min(low[axis], value); high[axis] = Math.max(high[axis], value);
 }
 for (const index of indices) if (!Number.isInteger(index) || index < 0 || index >= positions.length / 3) throw new Error('Invalid triangle index');
 const dimensions = high.map((v, i) => v - low[i]) as Vertex;
 const triangles = indices.length / 3;
 const vertex = (id: number): Vertex => [positions[id * 3], positions[id * 3 + 1], positions[id * 3 + 2]];
 const triangle = (id: number) => [vertex(indices[id * 3]), vertex(indices[id * 3 + 1]), vertex(indices[id * 3 + 2])];
 // Choose the finest spatial grid whose two vertical scans fit the operation cap.
 // This measures all triangles, avoiding tessellation-dependent ID subsampling.
 const grids = [MAX_GRID, 8, 4, 2, 1], boundsPerGrid = grids.map(() => 0);
 const cellBounds = (minimum: number, maximum: number, axis: number, grid: number) => [
  Math.max(0, Math.ceil((minimum - low[axis]) / dimensions[axis] * grid - 0.5)),
  Math.min(grid - 1, Math.floor((maximum - low[axis]) / dimensions[axis] * grid - 0.5)),
 ];
 if (dimensions[0] > 0 && dimensions[2] > 0) for (let id = 0; id < triangles; id++) {
  const [a, b, c] = triangle(id);
  const minX = Math.min(a[0], b[0], c[0]), maxX = Math.max(a[0], b[0], c[0]);
  const minZ = Math.min(a[2], b[2], c[2]), maxZ = Math.max(a[2], b[2], c[2]);
  for (let g = 0; g < grids.length; g++) {
   const [x0, x1] = cellBounds(minX, maxX, 0, grids[g]), [z0, z1] = cellBounds(minZ, maxZ, 2, grids[g]);
   boundsPerGrid[g] += 2 * Math.max(0, x1 - x0 + 1) * Math.max(0, z1 - z0 + 1);
  }
 }
 const gridIndex = boundsPerGrid.findIndex(bound => bound <= MAX_COLUMN_INTERSECTIONS);
 const GRID = grids[gridIndex];
 const columns: Column[] = dimensions[0] > 0 && dimensions[2] > 0 ? Array.from({length: GRID * GRID}, (_, i) => ({
  x: low[0] + (i % GRID + 0.5) / GRID * dimensions[0],
  z: low[2] + (Math.floor(i / GRID) + 0.5) / GRID * dimensions[2],
  floor: Infinity, overhead: Infinity,
 })) : [];
 // Two streaming scans avoid retaining an unbounded number of vertical layers.
 // Only the lowest upward-facing layer is sampled, explicitly excluding upper decks.
 for (const pass of ['floor', 'overhead'] as const) for (let id = 0; id < triangles; id++) {
  const [a, b, c] = triangle(id);
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
  const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  if (pass === 'floor' && ny / (Math.hypot(nx, ny, nz) || 1) < SLOPE_Y) continue;
  const determinant = ux * vz - uz * vx;
  if (Math.abs(determinant) < 1e-15 || !columns.length) continue;
  const ix0 = Math.max(0, Math.ceil((Math.min(a[0], b[0], c[0]) - low[0]) / dimensions[0] * GRID - 0.5));
  const ix1 = Math.min(GRID - 1, Math.floor((Math.max(a[0], b[0], c[0]) - low[0]) / dimensions[0] * GRID - 0.5));
  const iz0 = Math.max(0, Math.ceil((Math.min(a[2], b[2], c[2]) - low[2]) / dimensions[2] * GRID - 0.5));
  const iz1 = Math.min(GRID - 1, Math.floor((Math.max(a[2], b[2], c[2]) - low[2]) / dimensions[2] * GRID - 0.5));
  for (let iz = iz0; iz <= iz1; iz++) for (let ix = ix0; ix <= ix1; ix++) {
   const column = columns[iz * GRID + ix], dx = column.x - a[0], dz = column.z - a[2];
   const u = (dx * vz - dz * vx) / determinant, v = (ux * dz - uz * dx) / determinant;
   if (u < -1e-9 || v < -1e-9 || u + v > 1 + 1e-9) continue;
   const y = a[1] + u * uy + v * vy;
   if (pass === 'floor') column.floor = Math.min(column.floor, y);
   else if (y > column.floor + Math.max(...dimensions) * 1e-6) column.overhead = Math.min(column.overhead, y - column.floor);
  }
 }
 const supported = columns.filter(column => Number.isFinite(column.floor));
 const overheads = supported.filter(column => Number.isFinite(column.overhead)).map(column => column.overhead);
 const widthColumns = Array.from({length: Math.min(MAX_WIDTH_PROBES, supported.length)}, (_, i) => supported[Math.floor((i + 0.5) * supported.length / Math.min(MAX_WIDTH_PROBES, supported.length))]);
 const limitations = [
  'Absolute physical scale is unidentifiable without a known-size reference; scores encode a human architectural prior, not measured metres or route acceptance.',
  'At most 16×16 columns sample only the lowest upward-facing support layer; thin features, upper decks, local holes and connectivity can be missed. Triangle winding affects support.',
  'Wall spacing uses paired axis-aligned rays at one metre above at most 32 supports; orientation, open sides and nonarchitectural objects can bias it. No body sweep or usable-route proof is performed.',
  'A finite overhead is treated as clearance regardless of semantics. Open/unbounded samples supply no preferred height or width; ties select the smallest declared scale.',
 ];
 if (GRID < MAX_GRID) limitations.push(`Spatial grid reduced to ${GRID}×${GRID} to keep vertical intersection tests within 16 million. All original triangles remain included; the coarser spatial evidence is less representative.`);
 if (!supported.length) limitations.push('No sampled upward support: all scores are uninformative and the smallest scale is selected by convention.');
 const ranked = [...scales].sort((a, b) => a - b).map(scale => {
  const heights = overheads.map(height => height * scale), widths: number[] = [];
  const nearest = widthColumns.map(() => [Infinity, Infinity, Infinity, Infinity]);
  // Horizontal intersections against source triangles, with two projected ray axes.
  for (let id = 0; id < triangles; id++) {
   const [a, b, c] = triangle(id), minY = Math.min(a[1], b[1], c[1]), maxY = Math.max(a[1], b[1], c[1]);
   if (maxY === minY) continue;
   for (let i = 0; i < widthColumns.length; i++) {
    const column = widthColumns[i], y = column.floor + 1 / scale;
    if (y < minY || y > maxY) continue;
    for (const axis of [0, 2] as const) {
     const other = axis === 0 ? 2 : 0, coordinate = other === 0 ? column.x : column.z;
     const u1 = b[1] - a[1], u2 = b[other] - a[other], v1 = c[1] - a[1], v2 = c[other] - a[other];
     const determinant = u1 * v2 - u2 * v1;
     if (Math.abs(determinant) < 1e-15) continue;
     const u = ((y - a[1]) * v2 - (coordinate - a[other]) * v1) / determinant;
     const v = (u1 * (coordinate - a[other]) - u2 * (y - a[1])) / determinant;
     if (u < -1e-9 || v < -1e-9 || u + v > 1 + 1e-9) continue;
     const distance = (a[axis] + u * (b[axis] - a[axis]) + v * (c[axis] - a[axis]) - (axis === 0 ? column.x : column.z)) * scale;
     const slot = (axis === 0 ? 0 : 2) + (distance < 0 ? 1 : 0);
     nearest[i][slot] = Math.min(nearest[i][slot], Math.abs(distance));
    }
   }
  }
  for (const hits of nearest) {
   const width = Math.min(hits[0] + hits[1], hits[2] + hits[3]);
   if (Number.isFinite(width)) widths.push(width);
  }
  const heightScore = average(heights.map(height => proportion(height, 1.8, 2.8, 0.45)));
  const widthScore = average(widths.map(width => proportion(width, 0.6, 2.4, 0.8)));
  const supportCoverage = supported.length / (columns.length || 1), overheadCoverage = heights.length / (supported.length || 1);
  const bodyWidthFraction = average(widths.map(width => Number(width >= 0.6)));
  const score = supportCoverage * (0.75 * overheadCoverage * (heightScore ?? 0) + widths.length / (widthColumns.length || 1) * (0.25 * (widthScore ?? 0) - 0.75 * (1 - (bodyWidthFraction ?? 1))));
  const features: ScaleFeatures = {
   sourceTriangles: triangles, sampledTriangles: triangles, triangleSamplingStride: 1,
   gridResolution: GRID, gridColumns: columns.length, columnIntersectionBound: boundsPerGrid[gridIndex], supportColumns: supported.length, supportCoverage,
   overheadColumns: heights.length, overheadCoverage, medianHeadroom: median(heights),
   standingHeadroomFraction: average(heights.map(height => Number(height >= 1.8))), headroomProportionScore: heightScore,
   widthProbes: widthColumns.length, pairedWallProbes: widths.length, medianWallSpacing: median(widths),
   bodyWidthFraction, widthProportionScore: widthScore,
   dimensions: dimensions.map(d => d * scale) as Vertex, informative: heights.length > 0 || widths.length > 0,
  };
  return {scale, score, features};
 }).sort((a, b) => b.score - a.score || a.scale - b.scale);
 if (!ranked.some(item => item.features.informative)) limitations.push('No finite overhead or paired walls: no architectural size evidence; the ranking is a tie, resolved by the smallest declared scale.');
 return {selectedScale: ranked[0].scale, ranked, methodVersion: METHOD_VERSION, limitations};
}
