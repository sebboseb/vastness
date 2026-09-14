# M0 renderer research

Verified 2026-09-14 against official documentation and engine source. These are implementation recommendations for static scene A/B, mouse look, walking, and portal transitions; runtime behavior still needs browser verification.

## Renderer choice

Use the `playcanvas` engine package directly, pinned to `2.22.1`. SuperSplat's current package depends on that exact engine version, establishing that this is its underlying renderer. A custom app does not need to embed the SuperSplat editor. [SuperSplat package](https://github.com/playcanvas/supersplat/blob/main/package.json)

Use `Application` with `graphicsDeviceOptions: { antialias: false }`. Load a PLY as an asset of type `gsplat`, then add a `gsplat` component to its scene entity. The official engine guide demonstrates the same asset/component flow. [Engine guide](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/your-first-app/engine/)

```ts
const asset = new pc.Asset('scene-a', 'gsplat', { url: '/scenes/a/visual.ply' });
app.assets.add(asset);
await new Promise<void>((resolve, reject) => {
  asset.once('load', () => resolve());
  asset.once('error', reject);
  app.assets.load(asset);
});
const visual = new pc.Entity('scene-a-visual');
visual.addComponent('gsplat', { asset });
app.root.addChild(visual);
```

The GSplat component supports ordinary `.ply` assets. Keep asset loading, visibility, movement, and portal state in separate functions so a return trip can reuse the already loaded asset/entity. [GSplat API](https://api.playcanvas.com/engine/classes/GSplatComponent.html)

## Deterministic PLY fixture

Write a binary little endian PLY with a single `vertex` element. The engine explicitly rejects ASCII and big endian formats. Use LF newlines, start with `ply\n`, finish the header with `end_header\n`, and write interleaved little endian float32 records in header property order. An all-float vertex element uses the parser's fast path. [Pinned PLY parser](https://github.com/playcanvas/engine/blob/v2.22.1/src/framework/parsers/ply.js)

Recommended minimal property names, all declared `property float NAME`:

```text
x y z
f_dc_0 f_dc_1 f_dc_2
opacity
scale_0 scale_1 scale_2
rot_0 rot_1 rot_2 rot_3
```

These 14 floats occupy 56 bytes per Gaussian. Encoding follows the engine's decoding formulas:

| Field | Authored value |
| --- | --- |
| `x`, `y`, `z` | Position in the shared scene coordinate system |
| `f_dc_0..2` | `(channel - 0.5) / 0.28209479177387814` |
| `opacity` | `log(alpha / (1 - alpha))`, with `0 < alpha < 1` |
| `scale_0..2` | `log(sigmaX)`, `log(sigmaY)`, `log(sigmaZ)`; strictly positive sigma |
| `rot_0..3` | Quaternion in W/X/Y/Z order; identity is `1, 0, 0, 0` |

Normals and higher spherical harmonic coefficients are unnecessary for this constant-color fixture; absent `f_rest_*` properties select zero higher SH bands. [Pinned Gaussian data source](https://github.com/playcanvas/engine/blob/v2.22.1/src/scene/gsplat/gsplat-data.js)

Recommendation: author actual volumetric Gaussian samples across architecture, ground, and landmarks; produce and commit the resulting PLY ahead of runtime. Start with a fixed grid/seed and tens of thousands of splats, then tune visually. This is a deterministic authored fixture, not a trained reconstruction or live AI generation. Keep its metadata honest. Sample spacing and sigma must overlap enough to make walkable surfaces legible; excessive overlap costs fill rate. The engine's own performance guidance identifies overlapping translucent splats and pixel resolution as major costs. [Performance guide](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/performance/)

Recommendation: author both the PLY and GLB in meters, Y-up, with matching origin and scale. Avoid copying the tutorial cat's 180-degree asset correction onto an already Y-up authored fixture. Rotation belongs to the imported asset's coordinate convention, not every PLY.

## Separate GLB collider

PlayCanvas loads GLB files as `container` assets. `asset.resource.instantiateRenderEntity()` produces an entity hierarchy; `findComponents('render')` exposes the mesh instances. [Container API](https://api.playcanvas.com/engine/classes/ContainerResource.html)

```ts
const colliderRoot = container.resource.instantiateRenderEntity();
app.root.addChild(colliderRoot);
const boxes = colliderRoot.findComponents('render').flatMap((component) =>
  component.meshInstances.map((mesh) => {
    const bounds = mesh.aabb.clone();
    mesh.visible = false;
    return bounds;
  })
);
```

`MeshInstance.aabb` is a world-space box, and `visible = false` disables its rendering. Clone bounds after applying scene transforms. Derive collision data from the loaded GLB, so moving a collider in that asset changes where the player is blocked. [MeshInstance API](https://api.playcanvas.com/engine/classes/MeshInstance.html)

M0 recommendation: author each collider mesh as a distinct axis-aligned rectangular solid, with separate meshes for floor, wall segments, and obstacles. Do not merge an entire room into one mesh: its aggregate bounding box would block the interior. For this explicit box contract, a small kinematic controller can resolve an upright player against these bounds, use horizontal axis sliding, and obtain floor height from box tops. Sweep movement or subdivide steps to prevent passing through thin walls; clear held keys on blur/unlock. Test the opening between portal posts with the player's radius included.

This simplified collision contract is unsuitable for arbitrary triangle meshes, rotated structures, slopes, stairs, or stacked floors without additional handling. If those become required, use mesh collision with a real physics controller. PlayCanvas's built-in physics requires separately loaded Ammo; adding collision/rigidbody components without it does not enable physics. [Physics setup](https://developer.playcanvas.com/user-manual/physics/physics-basics/)

## Browser and portal checks

WebGL 2 is the engine baseline; WebGL 1 is unsupported in engine v2. Show an actionable capability error if context creation fails. [Supported browsers](https://developer.playcanvas.com/user-manual/engine/supported-browsers/)

Gaussian rendering works with CPU worker sorting on WebGL 2. WebGPU supports GPU sorting, and the engine's automatic renderer selection chooses the appropriate path. Very fast camera motion may briefly expose stale ordering on the asynchronous CPU path. Therefore a short transition fade is useful for a teleported viewpoint, though it is a product choice rather than a rendering requirement. [Renderer architecture](https://developer.playcanvas.com/user-manual/gaussian-splatting/rendering-architecture/renderers/)

Recommended M0 acceptance checks:

- Static PLY appears through PlayCanvas's Gaussian component, with no mesh proxy providing the world visuals.
- Collider GLB is loaded and invisible; walking demonstrably stops at an obstacle represented by that file.
- Both scenes share the declared units and orientation with their colliders.
- Mouse look and normalized WASD movement work; diagonal movement is no faster.
- A portal swaps the active scene and collider set atomically, places the player outside the destination trigger, and prevents immediate bounce-back.
- A → B → A reuses cached scene resources and preserves identity. Portal transit never invokes fixture authoring or generation.
- Asset/capability errors are visible; movement remains disabled until the active visual and collision data are ready.
- Browser inspection confirms loaded PLY and GLB requests, console health, and a rendered frame after both outbound and return transit.
