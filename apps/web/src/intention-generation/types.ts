import type {Artifact, CollisionBox, Vec3} from '../../../../packages/protocol/src/index.ts';

export type WorldRecord = {
  id: string; createdAt: string; rawIntent: {text: string; source: string};
  semantics: unknown; status: 'requested' | 'generating' | 'processing' | 'ready' | 'failed';
  jobId: string; request: {id: string; prompt: string; seed: number};
  events: {type: string; at: string; position?: Vec3}[];
  artifacts?: Artifact[]; sceneUrl?: string; error?: string;
};
export type PreparedScene = {
  sources: unknown;
  transform: {scale: number; position: Vec3};
  mesh: {positions: number[]; normals: number[]; indices: number[]};
  boxes: CollisionBox[]; glyphs: Vec3[];
  validation: {placement: Vec3; route: Vec3[]; room: CollisionBox[]; entry: Vec3};
  caveats?: string[];
};

/** Text and future voice transcription meet here, before any generation request. */
export interface InputSource {submit(text: string): Promise<void>}
