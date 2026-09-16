import * as pc from 'playcanvas';
import type {Vec3} from '../../../../packages/protocol/src/index.ts';

export type DisplayScene = {sources: {jobId: string; glb: {sha256: string}; ply: {sha256: string}}; mesh: {positions: number[]; normals: number[]; indices: number[]}; transform: {scale: number; position: Vec3}};
export type DisplayTransform = {scale: number; yaw: number; position: Vec3};
export class PassageRenderer {
  readonly app: pc.Application;
  private camera: pc.Entity;
  private root: pc.Entity;
  private solid?: pc.Entity;
  private splat?: pc.Entity;
  private mesh?: pc.Mesh;
  private material?: pc.StandardMaterial;
  private assets: pc.Asset[] = [];
  private scaffold?: pc.Entity;
  private scaffoldMaterial?: pc.StandardMaterial;
  private generation = 0;
  private requestedMode = 'coarse';
  private splatLoad?: Promise<void>;
  private palette: number[] = [];
  private uniform: number[] = [];
  private transform: DisplayTransform = {scale: 1, yaw: 0, position: [0, 0, 0]};
  constructor(canvas: HTMLCanvasElement) {
    this.app = new pc.Application(canvas, {graphicsDeviceOptions: {antialias: true, alpha: false}});
    this.app.graphicsDevice.maxPixelRatio = Math.min(devicePixelRatio, 1.5);
    this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW); this.app.setCanvasResolution(pc.RESOLUTION_AUTO);
    this.camera = new pc.Entity('inspection-camera', this.app);
    this.camera.addComponent('camera', {fov: 65, nearClip: .05, farClip: 150, clearColor: new pc.Color(.06, .085, .10)});
    this.app.root.addChild(this.camera);
    this.root = new pc.Entity('generated-only', this.app); this.app.root.addChild(this.root);
    this.app.scene.ambientLight = new pc.Color(.75, .75, .75);
    const light = new pc.Entity('sun', this.app); light.addComponent('light', {type: 'directional', intensity: .7, color: new pc.Color(1, .95, .86)}); light.setEulerAngles(45, 25, 0); this.app.root.addChild(light);
    this.app.start(); window.addEventListener('resize', () => this.app.resizeCanvas());
  }
  pose(position: Vec3, yaw: number, pitch: number) {this.camera.setPosition(...position); this.camera.setEulerAngles(pitch, yaw, 0);}
  clear() {
    this.generation++; this.splatLoad = undefined; this.requestedMode = 'coarse'; this.root.destroy(); this.mesh?.destroy(); this.material?.destroy(); this.scaffoldMaterial?.destroy();
    for (const asset of this.assets) {asset.unload(); this.app.assets.remove(asset);}
    this.assets = []; this.mesh = undefined; this.material = undefined; this.solid = undefined; this.splat = undefined; this.scaffold = undefined;
    this.root = new pc.Entity('generated-only', this.app); this.app.root.addChild(this.root);
  }
  private place(entity: pc.Entity) {entity.setLocalScale(this.transform.scale, this.transform.scale, this.transform.scale); entity.setLocalPosition(...this.transform.position); entity.setLocalEulerAngles(0, this.transform.yaw * 180 / Math.PI, 0);}
  async install(scene: DisplayScene, colors: number[], transform: DisplayTransform) {
    this.clear(); const generation = this.generation; this.transform = transform;
    if (colors.length !== scene.mesh.positions.length / 3 * 4 || !colors.every(Number.isFinite)) throw new Error('Color artifact does not match display geometry');
    this.palette = colors; this.uniform = [];
    for (let i = 0; i < colors.length; i += 4) this.uniform.push(.55, .62, .56, 1);
    this.mesh = new pc.Mesh(this.app.graphicsDevice); this.mesh.setPositions(scene.mesh.positions); this.mesh.setNormals(scene.mesh.normals); this.mesh.setIndices(scene.mesh.indices); this.mesh.setColors(colors); this.mesh.update(pc.PRIMITIVE_TRIANGLES);
    this.material = new pc.StandardMaterial(); this.material.diffuse.set(1, 1, 1); this.material.diffuseVertexColor = true; Object.assign(this.material, {vertexColorGamma: true}); this.material.gloss = 0; this.material.cull = pc.CULLFACE_NONE; this.material.update();
    this.solid = new pc.Entity('abstract-generated-geometry', this.app); this.solid.addComponent('render', {meshInstances: [new pc.MeshInstance(this.mesh, this.material)]}); this.place(this.solid); this.root.addChild(this.solid);
    await new Promise<void>(done => this.app.once('postrender', done)); if (generation !== this.generation) throw new Error('Superseded scene');
  }
  addScaffold(entry: Vec3, outward: Vec3, eyeHeight: number, width: number, length: number) {
    // Only the external approach. Its end is exactly the generated entry plane.
    const floorY = entry[1] - eyeHeight;
    this.scaffoldMaterial = new pc.StandardMaterial(); this.scaffoldMaterial.diffuse.set(.18, .24, .27); this.scaffoldMaterial.update();
    this.scaffold = new pc.Entity('authored-approach-only', this.app); this.scaffold.addComponent('render', {type: 'box', material: this.scaffoldMaterial});
    this.scaffold.setLocalScale(width, .12, length);
    this.scaffold.setLocalPosition(entry[0] + outward[0] * length / 2, floorY - .06, entry[2] + outward[2] * length / 2);
    this.scaffold.setLocalEulerAngles(0, Math.atan2(outward[0], outward[2]) * 180 / Math.PI, 0); this.root.addChild(this.scaffold);
  }
  async representation(mode: string, plyUrl: string) {
    this.requestedMode = mode;
    if (!this.solid || !this.mesh) return;
    if (mode !== 'original') {
      this.mesh.setColors(mode === 'coarse' ? this.palette : this.uniform); this.mesh.update(pc.PRIMITIVE_TRIANGLES);
      this.solid.enabled = true; if (this.splat) this.splat.enabled = false; return;
    }
    const generation = this.generation;
    if (!this.splatLoad) {
      const asset = new pc.Asset('original-generated-splat', 'gsplat', {url: plyUrl}); this.assets.push(asset); this.app.assets.add(asset);
      this.splatLoad = new Promise<void>((done, reject) => {asset.once('load', done); asset.once('error', (error: unknown) => reject(new Error(String(error)))); this.app.assets.load(asset);}).then(() => {
        if (generation !== this.generation) return;
        this.splat = new pc.Entity('original-generated-splat', this.app); this.splat.addComponent('gsplat', {asset}); this.place(this.splat); this.root.addChild(this.splat);
      }).catch(error => {if (generation === this.generation) {this.splatLoad = undefined; asset.unload(); this.app.assets.remove(asset); this.assets = this.assets.filter(item => item !== asset);} throw error;});
    }
    await this.splatLoad;
    if (generation !== this.generation || !this.splat) return;
    this.splat.enabled = this.requestedMode === 'original'; this.solid.enabled = !this.splat.enabled;
  }
}
