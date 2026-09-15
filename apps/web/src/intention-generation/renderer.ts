import * as pc from 'playcanvas';
import type {CollisionBox, Vec3} from '../../../../packages/protocol/src/index.ts';
import type {PreparedScene} from './types.ts';
import {sourceRoom, shiftBoxes} from './spatial.ts';

export class DestinationRenderer {
  readonly app: pc.Application;
  readonly camera: pc.Entity;
  private destination: pc.Entity;
  private solid: pc.Entity | undefined;
  private splat: pc.Entity | undefined;
  private colliderRoot: pc.Entity | undefined;
  private gate: pc.Entity;
  private resources: (pc.Mesh | pc.Material)[] = [];
  private assets: pc.Asset[] = [];
  private generation = 0;
  private disposed = false;
  private splatLoad: Promise<void> | undefined;
  private splatWanted = false;
  private colliderVisible = false;
  private data: PreparedScene | undefined;
  private sharedMaterials: pc.StandardMaterial[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.app = new pc.Application(canvas, {graphicsDeviceOptions: {antialias: true, alpha: false, powerPreference: 'high-performance'}});
    // Entity captures its application at construction; class field initializers run too early.
    this.camera = new pc.Entity('visitor', this.app);
    this.destination = new pc.Entity('destination', this.app);
    this.app.graphicsDevice.maxPixelRatio = Math.min(devicePixelRatio, 1.5);
    this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    this.app.setCanvasResolution(pc.RESOLUTION_AUTO);
    this.camera.addComponent('camera', {fov: 68, nearClip: .07, farClip: 100, clearColor: new pc.Color(.065, .105, .13)});
    this.app.root.addChild(this.camera);
    this.app.root.addChild(this.destination);
    this.app.scene.ambientLight = new pc.Color(.55, .6, .62);
    const sun = new pc.Entity('light', this.app);
    sun.addComponent('light', {type: 'directional', color: new pc.Color(1, .9, .7), intensity: 1.4});
    sun.setEulerAngles(48, -28, 0); this.app.root.addChild(sun);
    const floorMaterial = this.material([.19, .27, .28]);
    const wallMaterial = this.material([.12, .19, .22]);
    const gateMaterial = this.material([.47, .51, .43]);
    this.sharedMaterials.push(floorMaterial, wallMaterial, gateMaterial);
    for (const box of sourceRoom) this.box(box, box.max[1] <= 0 ? floorMaterial : wallMaterial, this.app.root);
    this.gate = this.box({min: [-1.6, 0, -12.08], max: [1.6, 4.5, -11.92]}, gateMaterial, this.app.root);
    this.app.start();
    window.addEventListener('resize', this.resize);
  }

  private resize = () => this.app.resizeCanvas();
  private material(color: Vec3) {
    const material = new pc.StandardMaterial();
    material.diffuse.set(...color); material.gloss = 0; material.metalness = 0;
    material.update(); return material;
  }
  private box(box: CollisionBox, material: pc.StandardMaterial, parent: pc.Entity) {
    const entity = new pc.Entity('authored-support', this.app);
    entity.addComponent('render', {type: 'box', material});
    entity.setLocalPosition(...box.min.map((n, i) => (n + box.max[i]) / 2) as Vec3);
    entity.setLocalScale(...box.min.map((n, i) => Math.max(.001, box.max[i] - n)) as Vec3);
    parent.addChild(entity); return entity;
  }
  setPose(position: Vec3, yaw: number, pitch: number) {
    this.camera.setPosition(...position); this.camera.setEulerAngles(pitch, yaw, 0);
  }
  setGate(open: boolean) {this.gate.enabled = !open;}
  showColliders(show: boolean) {this.colliderVisible = show; if (this.colliderRoot) this.colliderRoot.enabled = show;}
  get counts() {
    return {generatedMeshes: this.solid ? 1 : 0, splatAssets: this.assets.length, generatedTriangles: (this.data?.mesh.indices.length ?? 0) / 3, destinationEntities: this.destination.find(() => true).length};
  }
  clear() {
    this.generation++; this.splatWanted = false; this.splatLoad = undefined;
    this.destination.destroy();
    for (const resource of this.resources) resource.destroy();
    for (const asset of this.assets) {asset.unload(); this.app.assets.remove(asset);}
    this.resources = []; this.assets = []; this.solid = undefined; this.splat = undefined; this.colliderRoot = undefined; this.data = undefined;
    this.destination = new pc.Entity('destination', this.app); this.app.root.addChild(this.destination);
    this.setGate(false);
  }
  async install(data: PreparedScene) {
    this.clear(); const generation = this.generation;
    this.validate(data); this.data = data;
    const floor = this.material([.24, .29, .25]), walls = this.material([.13, .21, .23]);
    this.resources.push(floor, walls);
    for (const box of data.validation.room) this.box(box, box.max[1] <= 0 ? floor : walls, this.destination);
    const material = this.material([1, 1, 1]);
    material.diffuseVertexColor = true; material.cull = pc.CULLFACE_NONE; material.update();
    const mesh = new pc.Mesh(this.app.graphicsDevice);
    mesh.setPositions(data.mesh.positions); mesh.setNormals(data.mesh.normals); mesh.setIndices(data.mesh.indices);
    const colors: number[] = [];
    // Keep every returned triangle. Broad height values abstract the material, not the geometry.
    for (let i = 0; i < data.mesh.positions.length; i += 3) {
      const y = data.mesh.positions[i + 1] * data.transform.scale + data.transform.position[1];
      const t = Math.max(0, Math.min(1, y / 6));
      colors.push(.33 + .39 * t, .43 + .27 * t, .42 + .13 * t, 1);
    }
    mesh.setColors(colors); mesh.update(pc.PRIMITIVE_TRIANGLES);
    this.resources.push(mesh, material);
    this.solid = new pc.Entity('accepted-generated-mesh', this.app);
    this.solid.addComponent('render', {meshInstances: [new pc.MeshInstance(mesh, material)]});
    this.setArtifactTransform(this.solid, data); this.destination.addChild(this.solid);
    this.colliderRoot = new pc.Entity('derived-collision', this.app); this.destination.addChild(this.colliderRoot);
    const colliderMaterial = this.material([.95, .55, .15]);
    colliderMaterial.blendType = pc.BLEND_NORMAL; colliderMaterial.opacity = .22; colliderMaterial.depthWrite = false; colliderMaterial.update();
    this.resources.push(colliderMaterial);
    for (const box of shiftBoxes(data.boxes, data.validation.placement)) this.box(box, colliderMaterial, this.colliderRoot);
    this.showColliders(this.colliderVisible);
    // Readiness waits for a rendered frame, as well as scene parsing and mesh allocation.
    await new Promise<void>(resolve => this.app.once('postrender', resolve));
    if (this.disposed || generation !== this.generation) throw new Error('Destination load superseded');
  }
  private setArtifactTransform(entity: pc.Entity, data: PreparedScene) {
    entity.setLocalScale(data.transform.scale, data.transform.scale, data.transform.scale);
    entity.setLocalPosition(...data.transform.position.map((n, i) => n + data.validation.placement[i]) as Vec3);
  }
  async setRepresentation(mode: 'solid' | 'original', url?: string) {
    this.splatWanted = mode === 'original';
    if (!this.data || !this.solid) return;
    if (mode === 'solid') {this.solid.enabled = true; if (this.splat) this.splat.enabled = false; return;}
    if (!url) throw new Error('This record has no original splat artifact.');
    const generation = this.generation, data = this.data;
    if (!this.splatLoad) {
      const asset = new pc.Asset('accepted-original-splat', 'gsplat', {url});
      this.assets.push(asset); this.app.assets.add(asset);
      this.splatLoad = new Promise<void>((resolve, reject) => {
        asset.once('load', resolve); asset.once('error', (error: unknown) => reject(new Error(String(error))));
        this.app.assets.load(asset);
      }).then(() => {
        if (generation !== this.generation) {asset.unload(); this.app.assets.remove(asset); return;}
        this.splat = new pc.Entity('accepted-original-splat', this.app);
        this.splat.addComponent('gsplat', {asset}); this.setArtifactTransform(this.splat, data);
        this.destination.addChild(this.splat);
      }).catch(error => {
        if (generation === this.generation) {
          this.splatLoad = undefined; asset.unload(); this.app.assets.remove(asset); this.assets = this.assets.filter(item => item !== asset);
        }
        throw error;
      });
    }
    await this.splatLoad;
    if (generation !== this.generation || !this.splat || !this.solid) return;
    this.splat.enabled = this.splatWanted; this.solid.enabled = !this.splatWanted;
  }
  private validate(data: PreparedScene) {
    const vec = (value: unknown): value is Vec3 => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
    const boxes = (value: CollisionBox[]) => Array.isArray(value) && value.every(box => vec(box.min) && vec(box.max) && box.min.every((n, i) => n <= box.max[i]));
    const {positions, normals, indices} = data.mesh ?? {};
    if (!Array.isArray(positions) || !positions.length || positions.length % 3 || !positions.every(Number.isFinite) || !Array.isArray(normals) || normals.length !== positions.length || !normals.every(Number.isFinite) || !Array.isArray(indices) || !indices.length || indices.length % 3 || !indices.every(n => Number.isInteger(n) && n >= 0 && n < positions.length / 3)) throw new Error('Prepared scene has invalid generated mesh.');
    if (!Number.isFinite(data.transform?.scale) || data.transform.scale <= 0 || !vec(data.transform.position) || !vec(data.validation?.placement) || !vec(data.validation.entry) || !Array.isArray(data.validation.route) || !data.validation.route.length || !data.validation.route.every(vec) || !boxes(data.boxes) || !data.boxes.length || !boxes(data.validation.room)) throw new Error('Prepared scene has invalid collision or placement validation.');
  }
  destroy() {
    this.disposed = true; this.clear(); window.removeEventListener('resize', this.resize);
    this.app.destroy(); this.sharedMaterials.forEach(material => material.destroy());
  }
}
