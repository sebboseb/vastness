import * as pc from 'playcanvas';
import { ChunkSchema, type Chunk, type CollisionBox, type PlayerPose } from '../../../packages/protocol/src/index.ts';

export type LoadState = 'waiting' | 'metadata' | 'visual' | 'collision' | 'ready' | 'failed';
type LoadedChunk = {chunk: Chunk; boxes: CollisionBox[]; visual: pc.Entity; collider: pc.Entity};

/** Owns retained renderer resources; collision comes exclusively from imported GLB solids. */
export class StationScene {
  readonly app: pc.Application;
  readonly camera: pc.Entity;
  readonly loaded = new Map<string, LoadedChunk>();
  readonly states = new Map<string, LoadState>();
  private pending = new Map<string, Promise<void>>();

  constructor(canvas: HTMLCanvasElement, private onState: (id: string, state: LoadState) => void) {
    this.app = new pc.Application(canvas, {graphicsDeviceOptions: {antialias: false, alpha: false, powerPreference:'high-performance'}});
    this.camera = new pc.Entity('visitor',this.app);
    this.app.graphicsDevice.maxPixelRatio = Math.min(window.devicePixelRatio, 1.5);
    this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    this.app.setCanvasResolution(pc.RESOLUTION_AUTO);
    this.camera.addComponent('camera', {fov: 68, nearClip: 0.07, farClip: 110, clearColor: new pc.Color(0.065,0.1,0.11)});
    this.app.root.addChild(this.camera);
    this.app.start();
    window.addEventListener('resize', () => this.app.resizeCanvas());
  }

  setPose(pose: PlayerPose) {
    this.camera.setPosition(...pose.position);
    this.camera.setEulerAngles(pose.pitch, pose.yaw, 0);
  }

  load(chunk: Chunk, requestMetadata = false): Promise<void> {
    if (this.loaded.has(chunk.id)) return Promise.resolve();
    const existing = this.pending.get(chunk.id);
    if (existing) return existing;
    const promise = this.loadArtifacts(chunk, requestMetadata).finally(() => this.pending.delete(chunk.id));
    this.pending.set(chunk.id, promise);
    return promise;
  }

  private setState(id: string, state: LoadState) {
    this.states.set(id,state); this.onState(id,state);
  }

  private async loadArtifacts(original: Chunk, requestMetadata: boolean) {
    const assets: pc.Asset[] = [];
    let visual: pc.Entity | undefined, collider: pc.Entity | undefined;
    try {
      let chunk = original;
      if (requestMetadata) {
        this.setState(chunk.id,'metadata');
        const response = await fetch(`/api/chunks/${encodeURIComponent(chunk.id)}`);
        if (!response.ok) throw new Error(`Chunk request failed (${response.status})`);
        chunk = ChunkSchema.parse(await response.json());
        if (chunk.id !== original.id) throw new Error('Chunk identity changed during load');
      }
      this.setState(chunk.id,'visual');
      const splats = new pc.Asset(`${chunk.id}-visual`, 'gsplat', {url:chunk.visualAsset.url});
      assets.push(splats); await this.loadAsset(splats);
      visual = new pc.Entity(`${chunk.id}-splats`);
      visual.setPosition(...chunk.transform.position); visual.setEulerAngles(...chunk.transform.rotation);
      visual.addComponent('gsplat',{asset:splats});
      this.app.root.addChild(visual);
      this.setState(chunk.id,'collision');
      const collision = new pc.Asset(`${chunk.id}-collider`,'container',{url:chunk.collisionAsset.url});
      assets.push(collision); await this.loadAsset(collision);
      collider = (collision.resource as pc.ContainerResource).instantiateRenderEntity();
      collider.name = `${chunk.id}-collision`;
      collider.setPosition(...chunk.transform.position); collider.setEulerAngles(...chunk.transform.rotation);
      this.app.root.addChild(collider);
      const boxes: CollisionBox[] = [];
      for (const component of collider.findComponents('render') as pc.RenderComponent[]) {
        for (const mesh of component.meshInstances) {
          const bounds = mesh.aabb.clone(); const min = bounds.getMin(), max = bounds.getMax();
          boxes.push({min:[min.x,min.y,min.z],max:[max.x,max.y,max.z]});
          mesh.visible = false;
        }
      }
      if (boxes.length === 0) throw new Error('Collision artifact contains no solids');
      this.loaded.set(chunk.id,{chunk,boxes,visual,collider});
      this.setState(chunk.id,'ready');
    } catch (error) {
      visual?.destroy(); collider?.destroy();
      for (const asset of assets) {asset.unload(); this.app.assets.remove(asset);}
      this.setState(original.id,'failed');
      throw error;
    }
  }

  private loadAsset(asset: pc.Asset): Promise<void> {
    this.app.assets.add(asset);
    return new Promise((resolve,reject) => {
      asset.once('load', () => resolve());
      asset.once('error', (error: unknown) => reject(new Error(typeof error === 'string' ? error : `Unable to load ${asset.name}`)));
      this.app.assets.load(asset);
    });
  }

  collisionBoxes(): CollisionBox[] {
    const boxes = [...this.loaded.values()].flatMap(chunk => chunk.boxes);
    // A destination is traversable only after BOTH its visual and collision artifacts are ready.
    for (const {chunk} of this.loaded.values()) for (const portal of chunk.portals) {
      if (portal.connectedTo && this.loaded.has(portal.connectedTo)) continue;
      const [x,y,z] = portal.position;
      boxes.push({min:[x-portal.width/2,y,z-0.12],max:[x+portal.width/2,y+portal.height,z+0.12]});
    }
    return boxes;
  }
}
