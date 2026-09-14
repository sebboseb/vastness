import { z } from 'zod';
export const Vec3Schema = z.tuple([z.number().finite(), z.number().finite(), z.number().finite()]);
export type Vec3 = z.infer<typeof Vec3Schema>;
export const PlayerPoseSchema = z.object({position: Vec3Schema, yaw: z.number().finite(), pitch: z.number().finite().min(-89).max(89)});
export type PlayerPose = z.infer<typeof PlayerPoseSchema>;
export const ArtifactSchema = z.object({url:z.string(), sha256:z.string().regex(/^[a-f0-9]{64}$/), bytes:z.number().int().nonnegative(), format:z.enum(['ply','glb']), backend:z.string()});
export type Artifact = z.infer<typeof ArtifactSchema>;
export const PortalSchema = z.object({id:z.string(), position:Vec3Schema, width:z.number().positive(), height:z.number().positive(), connectedTo:z.string().nullable()});
export type Portal = z.infer<typeof PortalSchema>;
export const ChunkSchema = z.object({id:z.string(), label:z.string(), theme:z.string(), transform:z.object({position:Vec3Schema,rotation:Vec3Schema}), bounds:z.object({min:Vec3Schema,max:Vec3Schema}), status:z.enum(['ready','queued','running','failed']), visualAsset:ArtifactSchema, collisionAsset:ArtifactSchema, portals:z.array(PortalSchema), seed:z.number().int(), backend:z.string()});
export type Chunk = z.infer<typeof ChunkSchema>;
export const WorldSchema = z.object({id:z.string(),prompt:z.string(),createdAt:z.string(),chunks:z.array(ChunkSchema),player:PlayerPoseSchema});
export type World = z.infer<typeof WorldSchema>;
export const WorkerJobRequestSchema = z.object({id:z.string().regex(/^[a-zA-Z0-9_-]{1,80}$/),prompt:z.string().max(4000),seed:z.number().int(),fixture:z.enum(['arrival','observatory']),boundary:z.object({portalId:z.string(),position:Vec3Schema,width:z.number().positive(),height:z.number().positive()}).optional()});
export type WorkerJobRequest=z.infer<typeof WorkerJobRequestSchema>;
export const WorkerJobSchema=z.object({id:z.string(),status:z.enum(['queued','running','succeeded','failed','cancelled']),progress:z.number().min(0).max(1),logs:z.array(z.string()),backend:z.string(),error:z.string().nullable()});
export type WorkerJob=z.infer<typeof WorkerJobSchema>;
export interface CollisionBox {min:Vec3;max:Vec3}
