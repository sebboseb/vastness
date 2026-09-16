import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import * as pc from 'playcanvas';
import type {Vec3} from '../../../../packages/protocol/src/index.ts';
import {buildSolidGlyph, classifyStressFace, type TreatmentData} from './treatments.ts';

// Derived benchmark data is intentionally untracked. Prepare it with npm run m1 / check:m1.
// An isolated worktree can use M1_SCENE_PATH to verify against the main checkout's same asset.
const scenePath = process.env.M1_SCENE_PATH ?? fileURLToPath(new URL('../../m1-prototype-public/m1-prototype/scene.json', import.meta.url));
const skip = existsSync(scenePath) ? false : 'Prepare the verified M1 scene.json or set M1_SCENE_PATH';

test('solid and hybrid treatments preserve generated geometry through material and visibility changes', {skip}, async t => {
  const data = JSON.parse(readFileSync(scenePath, 'utf8')) as TreatmentData;
  const original = structuredClone(data);
  // Real PlayCanvas mesh buffers and render components without requiring a browser/WebGL context.
  const canvas = {id: 'm1-treatment-buffer-check', width: 800, height: 600};
  const app = new pc.AppBase(canvas as HTMLCanvasElement);
  const options = new pc.AppOptions();
  options.graphicsDevice = new pc.NullGraphicsDevice(canvas);
  options.componentSystems = [pc.RenderComponentSystem];
  options.resourceHandlers = [];
  app.init(options);
  t.after(() => app.destroy());
  const placements: Vec3[] = [[0, 0, 0], [-4, 0, -6], [4, 0, -6]];
  const treatment = buildSolidGlyph(app as pc.Application, data, placements);
  app.root.addChild(treatment.root);
  const groups = treatment.root.children as pc.Entity[];
  const baseEntities = groups.map(group => group.findByName('solid-mass') as pc.Entity);
  const baseMeshes = baseEntities.map(entity => entity.render!.meshInstances[0].mesh);
  const patchEntities = groups.flatMap(group => ['corrupt', 'unfinished'].map(kind => group.findByName(`material-stress-${kind}`) as pc.Entity));
  const glyphEntities = groups.flatMap(group => group.children.filter(entity => entity.name.startsWith('surface-mark-')) as pc.Entity[]);
  const visibleGlyphs = () => glyphEntities.filter(entity => entity.enabled).length;

  const verifyBaseBuffers = () => {
    for (const [index, mesh] of baseMeshes.entries()) {
      assert.equal(baseEntities[index].render!.meshInstances[0].mesh, mesh, 'switching treatments retains the same base mesh');
      const positions: number[] = [], normals: number[] = [], indices: number[] = [];
      mesh.getPositions(positions); mesh.getNormals(normals); mesh.getIndices(indices);
      assert.deepEqual(positions, original.mesh.positions.map(Math.fround), 'GPU upload preserves every original position at float32 precision');
      assert.deepEqual(normals, original.mesh.normals.map(Math.fround));
      assert.deepEqual(indices, original.mesh.indices, 'no base triangles are removed, reordered or expanded');
    }
    assert.deepEqual(data, original, 'building and toggling treatments does not mutate source data');
  };

  await t.test('each placement has the complete original base buffers and transform', () => {
    assert.equal(groups.length, placements.length);
    for (const [index, group] of groups.entries()) {
      assert.deepEqual(group.getLocalPosition().toArray(), placements[index]);
      const geometry = group.findByName('unchanged-generated-geometry') as pc.Entity;
      assert.deepEqual(geometry.getLocalPosition().toArray(), data.transform.position);
      assert.deepEqual(geometry.getLocalScale().toArray(), Array(3).fill(data.transform.scale));
    }
    assert.equal(treatment.stats.verticesPerPlacement, data.mesh.positions.length / 3);
    assert.equal(treatment.stats.trianglesPerPlacement, data.mesh.indices.length / 3);
    verifyBaseBuffers();
  });

  await t.test('stress overlays match shared classified faces exactly and retain all solid mass', () => {
    const expected = {corrupt: [] as number[], unfinished: [] as number[]};
    const impacted: number[] = [];
    for (let face = 0; face < data.mesh.indices.length / 3; face++) {
      const kind = classifyStressFace(data, face);
      if (kind) {expected[kind].push(...data.mesh.indices.slice(face * 3, face * 3 + 3)); impacted.push(face);}
    }
    assert.ok(expected.corrupt.length > 0 && expected.unfinished.length > 0, 'both labeled material faults affect actual faces');
    assert.ok(impacted.length < data.mesh.indices.length / 3 * .2, 'stress remains a localized part of the fixture');
    assert.deepEqual(treatment.stats.impactedFaceIndices, impacted);
    assert.equal(treatment.stats.stressFacesPerPlacement, impacted.length);
    for (const group of groups) {
      for (const kind of ['corrupt', 'unfinished'] as const) {
        const patch = group.findByName(`material-stress-${kind}`) as pc.Entity;
        const instance = patch.render!.meshInstances[0];
        const positions: number[] = [], indices: number[] = [];
        instance.mesh.getPositions(positions); instance.mesh.getIndices(indices);
        assert.deepEqual(positions, original.mesh.positions.map(Math.fround));
        assert.deepEqual(indices, expected[kind], 'each overlay contains only the same exact original faces as the control classifier');
        assert.equal(instance.material.depthTest, true);
        assert.equal(patch.enabled, false);
        assert.equal(treatment.stats.stressFacesByKind[kind], expected[kind].length / 3);
      }
    }
    treatment.setStress(true);
    assert.equal(treatment.stats.stressEnabled, true);
    assert.ok(patchEntities.every(entity => entity.enabled));
    assert.ok(baseEntities.every(entity => entity.enabled), 'stress never removes or disables the original solid mass');
    verifyBaseBuffers();
    treatment.setStress(false);
    assert.equal(treatment.stats.stressEnabled, false);
    assert.ok(patchEntities.every(entity => !entity.enabled));
    verifyBaseBuffers();
  });

  await t.test('sparse glyphs appear nearby in hybrid mode and disappear at distance or in solid mode', () => {
    assert.ok(treatment.stats.glyphsPerPlacement > 0 && treatment.stats.glyphsPerPlacement <= 48);
    assert.equal(glyphEntities.length, treatment.stats.glyphsPerPlacement * placements.length);
    assert.equal(visibleGlyphs(), 0);
    treatment.setMode('hybrid'); treatment.update([0, 1.65, 4]);
    const nearVisible = visibleGlyphs();
    assert.ok(nearVisible > 0 && nearVisible < glyphEntities.length, 'camera-facing nearby marks appear while others remain restrained');
    assert.equal(treatment.stats.visibleGlyphs, nearVisible);
    for (const glyph of glyphEntities) assert.equal(glyph.render!.meshInstances[0].material.depthTest, true);
    treatment.update(new pc.Vec3(0, 1.65, 100));
    assert.equal(visibleGlyphs(), 0);
    assert.equal(treatment.stats.visibleGlyphs, 0);
    treatment.update([0, 1.65, 4]);
    assert.equal(visibleGlyphs(), nearVisible, 'revisiting a camera position restores the same deterministic marks');
    treatment.setMode('solid');
    assert.equal(visibleGlyphs(), 0, 'mode changes apply immediately without waiting for another update');
    assert.equal(treatment.stats.mode, 'solid');
    treatment.setMode('hybrid');
    assert.equal(visibleGlyphs(), nearVisible);
    verifyBaseBuffers();
  });
});
