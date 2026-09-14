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
export const WorkerJobRequestSchema = z.object({id:z.string().regex(/^[a-zA-Z0-9_-]{1,80}$/),prompt:z.string().max(4000),seed:z.number().int(),fixture:z.enum(['arrival','observatory']).optional(),boundary:z.object({portalId:z.string(),position:Vec3Schema,width:z.number().positive(),height:z.number().positive()}).optional()});
export type WorkerJobRequest=z.infer<typeof WorkerJobRequestSchema>;
export const WorkerJobSchema=z.object({id:z.string(),status:z.enum(['queued','running','succeeded','failed','cancelled']),progress:z.number().min(0).max(1),logs:z.array(z.string()),backend:z.string(),error:z.string().nullable()});
export type WorkerJob=z.infer<typeof WorkerJobSchema>;
export interface CollisionBox {min:Vec3;max:Vec3}

export const ProbeStatusSchema=z.enum(['available','unavailable','failed','not_checked']);
const NullableText=z.string().nullable();
export const CapabilityReportSchema=z.object({
  schemaVersion:z.literal(1), capturedAt:z.string().datetime({offset:true}),
  host:z.object({hostname:z.string(),os:z.string(),release:z.string(),arch:z.string()}),
  python:z.object({version:z.string(),executable:z.string()}),
  gpu:z.object({status:ProbeStatusSchema,devices:z.array(z.object({index:z.number().int().nonnegative(),uuid:z.string(),name:z.string(),driverVersion:z.string(),vramTotalMiB:z.number().finite().nonnegative(),vramFreeMiB:z.number().finite().nonnegative()})),error:NullableText}),
  cuda:z.object({driverStatus:ProbeStatusSchema,driverSupportedVersion:NullableText,toolkitStatus:ProbeStatusSchema,toolkitVersion:NullableText}),
  pytorch:z.object({status:ProbeStatusSchema,version:NullableText,cudaBuildVersion:NullableText,cudaAvailable:z.boolean().nullable(),error:NullableText}),
  nvidiaExecution:z.literal('not_run'), notes:z.array(z.string())
});
export type CapabilityReport=z.infer<typeof CapabilityReportSchema>;
export const WorkerCapabilitiesSchema=z.object({
  schemaVersion:z.literal(1),backend:z.object({id:z.string().min(1),version:z.string().min(1),mode:z.enum(['fixture','command']),requiresGpu:z.boolean()}),
  maxConcurrency:z.literal(1),formats:z.array(z.enum(['ply','glb'])),cancellation:z.boolean(),hardware:CapabilityReportSchema,
  version:z.object({service:z.string(),version:z.string(),python:z.string(),gitCommit:NullableText})
});
export type WorkerCapabilities=z.infer<typeof WorkerCapabilitiesSchema>;
