import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

type Point = [number, number, number];
type Color = [number, number, number];
type Solid = { name: string; center: Point; size: Point; color: Color };
const output = resolve(process.env.ARTIFACT_DIR ?? 'artifacts', 'fixtures');
const SH = 0.28209479177387814;

/** Authored spatial samples, deliberately reproducible without a model or GPU. */
function room(observatory: boolean) {
  const samples: number[][] = [];
  const solids: Solid[] = [];
  const wall: Color = observatory ? [0.24, 0.34, 0.35] : [0.36, 0.36, 0.32];
  const dark: Color = [0.105, 0.145, 0.155];
  const amber: Color = [0.95, 0.56, 0.23];
  let seed = observatory ? 73 : 41;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  function splat(p: Point, color: Color, size: Point, alpha = 0.98) {
    const shade = 0.94 + random() * 0.12;
    samples.push([...p, ...color.map(c => (Math.min(1, c * shade) - 0.5) / SH), Math.log(alpha / (1 - alpha)), ...size.map(Math.log), 1, 0, 0, 0]);
  }
  function surface(center: Point, size: Point, color: Color, axis: number, step = 0.22) {
    const u = (axis + 1) % 3, v = (axis + 2) % 3;
    const nu = Math.max(1, Math.ceil(size[u] / step)), nv = Math.max(1, Math.ceil(size[v] / step));
    for (let i = 0; i <= nu; i++) for (let j = 0; j <= nv; j++) {
      const p: Point = [...center];
      p[u] += (i / nu - 0.5) * size[u]; p[v] += (j / nv - 0.5) * size[v];
      const sigma: Point = [step * 0.7, step * 0.7, step * 0.7]; sigma[axis] = 0.025;
      splat(p, color, sigma);
    }
  }
  function box(name: string, center: Point, size: Point, color: Color, collision = true, step = 0.22) {
    if (collision) solids.push({name, center, size, color});
    for (let axis = 0; axis < 3; axis++) for (const sign of [-1, 1]) {
      const face: Point = [...center]; face[axis] += sign * size[axis] / 2;
      const light = axis === 1 && sign === 1 ? 1.12 : axis === 1 ? 0.6 : axis === 0 ? 0.83 : 0.96;
      surface(face, size, color.map(c => c * light) as Color, axis, step);
    }
  }
  // Shell, with a physical aperture at the shared boundary.
  box('floor', [0, -0.12, 0], [14, 0.24, 18], [0.16, 0.20, 0.21]);
  box('ceiling', [0, 4.1, 0], [14, 0.2, 18], [0.13, 0.17, 0.18]);
  box('west wall', [-7, 2, 0], [0.22, 4, 18], wall);
  box('east wall', [7, 2, 0], [0.22, 4, 18], wall);
  const seam = observatory ? 9 : -9, end = -seam;
  box('end wall', [0, 2, end], [14, 4, 0.22], wall);
  box('portal west wall', [-4.3, 2, seam], [5.4, 4, 0.22], wall);
  box('portal east wall', [4.3, 2, seam], [5.4, 4, 0.22], wall);
  box('portal lintel', [0, 3.7, seam], [3.2, 0.6, 0.22], dark);
  // Timber ceiling ribs, glowing strips, and a quiet centreline establish depth.
  for (let z = -7.5; z <= 7.5; z += 3) {
    box('ceiling rib', [0, 3.72, z], [13.8, 0.22, 0.18], [0.34, 0.26, 0.18], false);
    box('ceiling light', [0, 3.82, z + 0.35], [4.5, 0.035, 0.09], [0.95, 0.83, 0.61], false, 0.16);
    box('floor seam', [0, 0.016, z], [13.7, 0.015, 0.035], [0.075, 0.11, 0.12], false, 0.15);
    box('path marker', [0, 0.026, z], [0.055, 0.018, 0.65], amber, false, 0.12);
  }
  for (const x of [-1.7, 1.7]) {
    box('portal frame', [x, 1.65, seam + (observatory ? -0.13 : 0.13)], [0.14, 3.3, 0.18], dark, false, 0.12);
    box('portal light', [x + (x < 0 ? 0.09 : -0.09), 1.7, seam + (observatory ? -0.25 : 0.25)], [0.05, 2.9, 0.05], amber, false, 0.12);
  }
  // Inset seaward windows. The blue layered view is also spatial Gaussian data.
  for (const z of [-5.8, -1.5, 2.8, 6.5]) {
    box('window recess', [6.83, 2.15, z], [0.12, 2.4, 3.2], dark, false);
    surface([6.74, 2.15, z], [0, 2.08, 2.94], [0.29, 0.44, 0.49], 0, 0.16);
    surface([6.71, 1.61, z], [0, 0.95, 2.94], [0.16, 0.31, 0.36], 0, 0.14);
    for (let k = 0; k < 6; k++) surface([6.68, 1.34 + k * 0.12, z], [0, 0.025, 2.9], [0.38, 0.53, 0.53], 0, 0.15);
    box('window mullion', [6.62, 2.15, z], [0.09, 2.18, 0.075], dark, false, 0.14);
    box('window sill', [6.56, 0.99, z], [0.65, 0.12, 3.3], [0.43, 0.42, 0.34], false);
  }
  if (!observatory) {
    box('field equipment', [-4.3, 0.64, -2.4], [2.6, 1.28, 4.4], [0.27, 0.32, 0.30]);
    box('worktop', [-4.3, 1.33, -2.4], [2.8, 0.1, 4.6], [0.53, 0.42, 0.28], false);
    for (const z of [-3.7, -1.2]) {
      box('instrument', [-4.5, 1.7, z], [0.65, 0.65, 0.85], dark, false);
      surface([-4.16, 1.76, z], [0, 0.35, 0.62], [0.22, 0.64, 0.59], 0, 0.09);
    }
    for (let i = 0; i < 4; i++) {
      box('field locker', [-6.2, 1.3, 2.5 + i], [0.95, 2.6, 0.88], [0.30 + i * 0.015, 0.34, 0.32]);
      box('locker handle', [-5.69, 1.35, 2.8 + i], [0.06, 0.3, 0.045], amber, false, 0.09);
    }
    box('bench', [4.8, 0.42, 3], [1.05, 0.84, 3], [0.46, 0.34, 0.22]);
  } else {
    box('observation console', [-3.8, 0.72, -4.7], [3.3, 1.44, 2.1], dark);
    box('console top', [-3.8, 1.48, -4.7], [3.5, 0.12, 2.3], [0.39, 0.44, 0.41], false);
    for (let i = 0; i < 3; i++) {
      box('monitor', [-4.8 + i, 1.9, -5.2], [0.84, 0.72, 0.16], dark, false);
      surface([-4.8 + i, 1.9, -5.1], [0.70, 0.53, 0], [0.20, 0.63, 0.63], 2, 0.08);
    }
    box('chart cabinet', [-5.8, 0.9, 2], [1.7, 1.8, 3.7], [0.38, 0.31, 0.23]);
    box('survey pedestal', [3.7, 0.9, -4.2], [1.6, 1.8, 1.6], [0.45, 0.47, 0.42]);
    box('survey instrument', [3.7, 2.08, -4.2], [0.65, 0.65, 1.4], [0.70, 0.58, 0.35], false);
    for (let i = 0; i < 4; i++) surface([-6.86, 2.5, -5.5 + i * 1.5], [0, 1.4, 1.1], [0.53, 0.61, 0.55], 0, 0.15);
  }
  const properties = ['x', 'y', 'z', 'f_dc_0', 'f_dc_1', 'f_dc_2', 'opacity', 'scale_0', 'scale_1', 'scale_2', 'rot_0', 'rot_1', 'rot_2', 'rot_3'];
  const header = Buffer.from(`ply\nformat binary_little_endian 1.0\ncomment Vastness deterministic authored fixture v1\nelement vertex ${samples.length}\n${properties.map(p => `property float ${p}\n`).join('')}end_header\n`);
  const data = Buffer.alloc(samples.length * 56);
  samples.forEach((sample, i) => sample.forEach((value, j) => data.writeFloatLE(value, i * 56 + j * 4)));
  return { ply: Buffer.concat([header, data]), glb: collisionGlb(solids), count: samples.length };
}

function collisionGlb(solids: Solid[]): Buffer {
  const positions = [-.5,-.5,-.5, .5,-.5,-.5, .5,.5,-.5, -.5,.5,-.5, -.5,-.5,.5, .5,-.5,.5, .5,.5,.5, -.5,.5,.5];
  const indices = [0,2,1,0,3,2,4,5,6,4,6,7,0,1,5,0,5,4,3,7,6,3,6,2,0,4,7,0,7,3,1,2,6,1,6,5];
  const binary = Buffer.alloc(positions.length * 4 + indices.length * 2);
  positions.forEach((n,i) => binary.writeFloatLE(n,i*4)); indices.forEach((n,i) => binary.writeUInt16LE(n,96+i*2));
  const document = {asset:{version:'2.0',generator:'Vastness authored collision fixture v1'},scene:0,scenes:[{nodes:solids.map((_,i)=>i)}],nodes:solids.map(s=>({name:s.name,mesh:0,translation:s.center,scale:s.size})),meshes:[{primitives:[{attributes:{POSITION:0},indices:1}]}],buffers:[{byteLength:binary.length}],bufferViews:[{buffer:0,byteOffset:0,byteLength:96,target:34962},{buffer:0,byteOffset:96,byteLength:72,target:34963}],accessors:[{bufferView:0,componentType:5126,count:8,type:'VEC3',min:[-.5,-.5,-.5],max:[.5,.5,.5]},{bufferView:1,componentType:5123,count:36,type:'SCALAR'}]};
  const json = Buffer.from(JSON.stringify(document)); const padded = Buffer.alloc(Math.ceil(json.length/4)*4,0x20); json.copy(padded);
  const header = Buffer.alloc(20); header.writeUInt32LE(0x46546c67,0); header.writeUInt32LE(2,4); header.writeUInt32LE(28+padded.length+binary.length,8); header.writeUInt32LE(padded.length,12); header.writeUInt32LE(0x4e4f534a,16);
  const binHeader = Buffer.alloc(8); binHeader.writeUInt32LE(binary.length,0); binHeader.writeUInt32LE(0x004e4942,4);
  return Buffer.concat([header,padded,binHeader,binary]);
}

for (const id of ['arrival', 'observatory']) {
  const fixture = room(id === 'observatory'); const directory = resolve(output, id);
  await mkdir(directory, {recursive:true});
  await writeFile(resolve(directory,'scene.ply'), fixture.ply);
  await writeFile(resolve(directory,'collider.glb'), fixture.glb);
  console.log(`${id}: ${fixture.count.toLocaleString()} authored Gaussians, ${fixture.glb.length} collider bytes`);
}
