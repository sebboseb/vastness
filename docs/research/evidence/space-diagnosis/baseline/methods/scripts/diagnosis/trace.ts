/** Prototype diagnostic seam. Events are observations, never inputs to acceptance. */
export type TraceStage = 'intent' | 'support' | 'proposal' | 'prescreen' | 'component' | 'edge' | 'route' | 'topology' | 'seam' | 'budget' | 'result';
export type TraceEvent = {stage: TraceStage; kind: string; [key: string]: unknown};
export type TraceSink = (event: TraceEvent) => void;
