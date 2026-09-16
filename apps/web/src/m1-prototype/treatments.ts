/** Disposable M1 material experiment. The full accepted mesh remains the solid substrate. */
import * as pc from 'playcanvas';
import type {Vec3} from '../../../../packages/protocol/src/index.ts';

export type TreatmentData = {
  mesh: {positions: number[]; normals: number[]; indices: number[]};
  transform: {scale: number; position: Vec3};
  glyphs: Vec3[];
};
export type StressKind = 'corrupt' | 'unfinished' | null;

function vertex(data: TreatmentData, index: number): Vec3 {
  return [0, 1, 2].map(axis => data.mesh.positions[index * 3 + axis] * data.transform.scale + data.transform.position[axis]) as Vec3;
}

function faceCenter(data: TreatmentData, faceIndex: number): Vec3 {
  const ids = data.mesh.indices.slice(faceIndex * 3, faceIndex * 3 + 3);
  return [0, 1, 2].map(axis => ids.reduce((sum, id) => sum + data.mesh.positions[id * 3 + axis], 0) / 3 * data.transform.scale + data.transform.position[axis]) as Vec3;
}

/** Shared with faceted control. Triangle ordinal, in transformed asset space BEFORE placement.
 * Fixed spatial patches are intentional: no random seed, camera state or representation dependency.
 * This fixture is approximately 5.3 m wide and 6 m high; these are material faults, never holes.
 */
export function classifyStressFace(data: TreatmentData, faceIndex: number): StressKind {
  const [x, y, z] = faceCenter(data, faceIndex);
  if (x > -.95 && x < .85 && y > 1.05 && y < 2.85 && z > .12) return 'corrupt';
  if (x > -1.8 && x < -.35 && y > 3.05 && y < 4.45 && z > -.12) return 'unfinished';
  return null;
}

const subtract = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const distance = (a: Vec3, b: Vec3) => Math.hypot(...subtract(a, b));
const normalize = (v: Vec3): Vec3 => {const length = Math.hypot(...v) || 1; return v.map(value => value / length) as Vec3;};
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function buildSolidGlyph(app: pc.Application, data: TreatmentData, placements: Vec3[]) {
  const root = new pc.Entity('solid-glyph-treatment');
  const makeMesh = (positions: number[], indices: number[], normals?: number[], colors?: number[]) => {
    const mesh = new pc.Mesh(app.graphicsDevice);
    mesh.setPositions(positions); mesh.setIndices(indices);
    if (normals) mesh.setNormals(normals);
    if (colors) mesh.setColors(colors);
    mesh.update(pc.PRIMITIVE_TRIANGLES);
    return mesh;
  };
  const material = (color: Vec3, lit = true) => {
    const result = new pc.StandardMaterial();
    result.diffuse.set(...color); result.useLighting = lit;
    if (!lit) result.emissive.set(...color);
    result.metalness = 0; result.gloss = 0;
    result.depthTest = true; result.depthWrite = true;
    result.update(); return result;
  };
  const attach = (name: string, mesh: pc.Mesh, mat: pc.Material, parent: pc.Entity) => {
    const entity = new pc.Entity(name);
    entity.addComponent('render', {meshInstances: [new pc.MeshInstance(mesh, mat)]});
    parent.addChild(entity); return entity;
  };

  // Broad value organization, interpolated through the original vertices and smooth normals.
  // No face expansion, simplification, hidden triangles or replacement silhouette.
  const colors: number[] = [];
  for (let i = 0; i < data.mesh.positions.length / 3; i++) {
    const height = vertex(data, i)[1];
    const lower = clamp((height - .35) / 1.2), upper = clamp((height - 4.1) / 1.3);
    const low: Vec3 = [.22, .30, .30], middle: Vec3 = [.59, .61, .52], high: Vec3 = [.75, .70, .56];
    colors.push(...low.map((value, axis) => (value + (middle[axis] - value) * lower) * (1 - upper) + high[axis] * upper), 1);
  }
  const baseMesh = makeMesh(data.mesh.positions, data.mesh.indices, data.mesh.normals, colors);
  const baseMaterial = material([1, 1, 1]); baseMaterial.diffuseVertexColor = true; baseMaterial.update();

  const stressedIndices = {corrupt: [] as number[], unfinished: [] as number[]};
  const impactedFaceIndices: number[] = [];
  for (let face = 0; face < data.mesh.indices.length / 3; face++) {
    const kind = classifyStressFace(data, face);
    if (kind) {stressedIndices[kind].push(...data.mesh.indices.slice(face * 3, face * 3 + 3)); impactedFaceIndices.push(face);}
  }
  const stressMeshes = (['corrupt', 'unfinished'] as const).filter(kind => stressedIndices[kind].length).map(kind => {
    // Reinterpret an ugly material fault as an ochre repair / dark unfinished patch.
    // The exact affected triangles remain visible and identically classifiable in the control.
    const mat = material(kind === 'corrupt' ? [.65, .36, .13] : [.24, .27, .28]);
    mat.depthBias = -.1; mat.slopeDepthBias = -.1; mat.update();
    return {kind, mesh: makeMesh(data.mesh.positions, stressedIndices[kind], data.mesh.normals), material: mat};
  });

  // Candidate voxels are only hints. Snap each chosen mark onto a real triangle centroid.
  const faces = Array.from({length: data.mesh.indices.length / 3}, (_, index) => {
    const ids = data.mesh.indices.slice(index * 3, index * 3 + 3);
    const [a, b, c] = ids.map(id => vertex(data, id));
    const normal = normalize(cross(subtract(b, a), subtract(c, a)));
    return {index, center: faceCenter(data, index), normal};
  });
  const anchors: typeof faces = [];
  // Evenly sample a bounded candidate count, then enforce metre-scale spacing.
  const candidateCount = Math.min(320, data.glyphs.length);
  for (let i = 0; i < candidateCount && anchors.length < 48; i++) {
    const candidate = data.glyphs[Math.floor(i * data.glyphs.length / candidateCount)];
    if (candidate[1] < .55 || anchors.some(anchor => distance(anchor.center, candidate) < .65)) continue;
    let nearest: typeof faces[number] | undefined, best = .23;
    for (const face of faces) {
      const d = distance(candidate, face.center);
      if (d < best && Math.abs(face.normal[1]) < .8 && Math.hypot(...face.normal) > .9) {nearest = face; best = d;}
    }
    if (nearest && anchors.every(anchor => distance(anchor.center, nearest!.center) >= .65)) anchors.push(nearest);
  }

  // Small surface-oriented strokes, not camera-facing text or intersecting billboard clouds.
  const glyphMaterial = material([.82, .67, .36], false);
  glyphMaterial.blendType = pc.BLEND_NORMAL; glyphMaterial.opacity = .8;
  glyphMaterial.depthWrite = false; glyphMaterial.cull = pc.CULLFACE_BACK;
  glyphMaterial.depthBias = -.1; glyphMaterial.slopeDepthBias = -.1; glyphMaterial.update();
  const glyphMeshes = anchors.map((anchor, index) => {
    const tangent = normalize(cross([0, 1, 0], anchor.normal));
    const up = normalize(cross(anchor.normal, tangent));
    const positions: number[] = [], indices: number[] = [];
    const line = (x0: number, y0: number, x1: number, y1: number) => {
      const dx = x1 - x0, dy = y1 - y0, length = Math.hypot(dx, dy), width = .007;
      const ox = -dy / length * width, oy = dx / length * width, base = positions.length / 3;
      for (const [x, y] of [[x0 - ox, y0 - oy], [x1 - ox, y1 - oy], [x1 + ox, y1 + oy], [x0 + ox, y0 + oy]]) {
        positions.push(...anchor.center.map((value, axis) => value + tangent[axis] * x + up[axis] * y + anchor.normal[axis] * .004));
      }
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    };
    if (index % 3 === 0) {line(-.055, 0, .055, 0); line(0, -.075, 0, .075);}
    else if (index % 3 === 1) {line(-.04, -.07, -.04, .07); line(-.04, .07, .04, .07);}
    else {line(-.05, -.07, .05, .07); line(.02, -.07, .06, -.07);}
    return makeMesh(positions, indices);
  });

  const stressEntities: pc.Entity[] = [];
  const glyphEntities: {entity: pc.Entity; group: pc.Entity; anchor: typeof faces[number]}[] = [];
  for (const [index, placement] of placements.entries()) {
    const group = new pc.Entity(`solid-placement-${index}`); group.setLocalPosition(...placement); root.addChild(group);
    const geometry = new pc.Entity('unchanged-generated-geometry');
    geometry.setLocalPosition(...data.transform.position); geometry.setLocalScale(data.transform.scale, data.transform.scale, data.transform.scale);
    group.addChild(geometry); attach('solid-mass', baseMesh, baseMaterial, geometry);
    for (const patch of stressMeshes) {
      const entity = attach(`material-stress-${patch.kind}`, patch.mesh, patch.material, geometry);
      entity.enabled = false; stressEntities.push(entity);
    }
    anchors.forEach((anchor, i) => {
      const entity = attach(`surface-mark-${i}`, glyphMeshes[i], glyphMaterial, group);
      entity.enabled = false; glyphEntities.push({entity, group, anchor});
    });
  }
  let mode: 'solid' | 'hybrid' = 'solid', stress = false;
  let lastCamera: Vec3 | undefined;
  const stats = {
    verticesPerPlacement: data.mesh.positions.length / 3,
    trianglesPerPlacement: data.mesh.indices.length / 3,
    placementCount: placements.length,
    glyphsPerPlacement: anchors.length,
    glyphTrianglesPerPlacement: anchors.length * 4,
    visibleGlyphs: 0,
    stressFacesPerPlacement: impactedFaceIndices.length,
    stressFacesByKind: {corrupt: stressedIndices.corrupt.length / 3, unfinished: stressedIndices.unfinished.length / 3},
    impactedFaceIndices,
    geometryUnchanged: true,
    stressEnabled: false,
    mode: mode as 'solid' | 'hybrid',
  };
  function update(cameraPosition: Vec3 | pc.Vec3) {
    const camera: Vec3 = Array.isArray(cameraPosition) ? [...cameraPosition] : [cameraPosition.x, cameraPosition.y, cameraPosition.z];
    lastCamera = camera; stats.visibleGlyphs = 0;
    for (const {entity, group, anchor} of glyphEntities) {
      const worldAnchor = group.getWorldTransform().transformPoint(new pc.Vec3(...anchor.center));
      const toCamera: Vec3 = [camera[0] - worldAnchor.x, camera[1] - worldAnchor.y, camera[2] - worldAnchor.z];
      const range = Math.hypot(...toCamera);
      const worldNormal = group.getWorldTransform().transformVector(new pc.Vec3(...anchor.normal)).normalize();
      const facing = range ? (toCamera[0] * worldNormal.x + toCamera[1] * worldNormal.y + toCamera[2] * worldNormal.z) / range : 0;
      const opacity = .8 * clamp((range - .55) / .6) * clamp((8 - range) / 2.5) * clamp((facing - .3) / .35);
      entity.enabled = mode === 'hybrid' && group.enabled && opacity > .035;
      if (entity.enabled) {entity.render!.meshInstances[0].setParameter('material_opacity', opacity); stats.visibleGlyphs++;}
    }
  }
  return {
    root, stats, update,
    setMode(next: 'solid' | 'hybrid') {mode = next; stats.mode = next; if (lastCamera) update(lastCamera); else glyphEntities.forEach(({entity}) => entity.enabled = false);},
    setStress(enabled: boolean) {stress = enabled; stats.stressEnabled = stress; stressEntities.forEach(entity => entity.enabled = stress);},
  };
}
