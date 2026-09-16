# Exterior support/body prism correction

This is a retrospective, trace-motivated correction after the frozen diagnosis baseline began. It is not a blind evaluation. The first eight completed baseline cases supplied 1,081 first projection blockers: 399 triangles wholly below seam height minus 0.25 m, 140 wholly above the 1.8 m body, 434 near-foot triangles and 108 overlapping the body band. Those counts identify over-conservative first exclusions, not clear corridors or recoverable cases. The frozen baseline and every original artifact remain unchanged; root records final counts and candidate-level evidence separately.

## API and phase order

`routes-entry.ts` exports `assessDiagnosedSpace` with the traced predecessor's input and assessment shape. It first runs `routes-traced.ts` for the requested mode. A successful predecessor assessment is returned exactly, including its 2 m approach, route, witnesses and diagnostics. Only a failed same-mode assessment runs the copied route method with the entry-prism change. The harness still evaluates expanded then legacy at the same locked selected scale and criteria. A new expanded success can therefore replace a formerly selected legacy route in this new phase; historical files remain immutable and every new phase success requires browser verification.

Every nested observation receives `pass: 'baseline' | 'entry-prism'`. `entry-pass-start` and `entry-pass-complete` delimit each pass and expose its budgets/counters. Return counters describe the returned pass, not accumulated work; an added limitation states this explicitly. Trace sinks retain streaming behavior, cloned observations and propagated errors. There is no event sampling or truncation.

## Continuous proof over original triangles

Entry proposals, ranking, support-edge scanning/bisection, original seam contact, criteria, witnesses, graph discovery and all route budgets are unchanged in the new pass. The full XZ projection exclusion alone is replaced. Source vertices are transformed in Float64; a conservative XZ index finds candidate triangles. The proof does not rely on Float32 Y bounds. It clips each original triangle against all six planes of a closed rectangular prism in outward/lateral/Y coordinates:

- outward distance from 0.002 m to the actual authored approach length;
- lateral distance within the complete 1.2 m approach width;
- Y from seam height minus the fixed 0.25 m maximum step through seam height plus the fixed 1.8 m player height.

The 2 mm boundary tolerance is inherited from the predecessor's seam contact rule. It does not authorize a patch across an interior hole. Any nonempty clipped polygon rejects the approach, including a line or point: a zero-thickness vertical wall cannot disappear because its XZ area is zero. A triangle wholly below the lower support band or wholly above the head can be ignored, but all remaining candidate triangles must be checked before a clear proof is emitted. Original floors in the support-height band block the entire authored corridor, preventing authored support from overlaying source floors or bridging an internal hole to another floor. Sloped triangles are clipped in 3D, not accepted on an average/minimum/first vertex height.

`entry-prism-blocked` records the original triangle ID and transformed coordinates, clipped coordinates, approach, support/body bands and seam tolerance. `entry-prism-proof` records clear/scanComplete, tested triangle count, wholly out-of-band count, full prism and height band. Only `clear: true` implies a completed scan; a first blocker short-circuits a failed proof.

## Actual exterior access and unchanged final navigator

New approaches begin with the entire player body outside the source AABB, not just in clear air within a recess. For the selected cardinal outward direction, start distance is `max(1.2, distanceToBounds + radius + 0.1)`. Authored length is `max(2, startDistance + radius)`. Lengths above the existing navigator's 10 m approach cap reject with `exterior-approach-limit`; they are never clamped into a false exterior claim. The continuous prism covers the whole actual approach, including its outer support margin. A clear prism alone cannot accept a route: the unchanged original navigator still verifies complete movement from this exterior start to the original generated entry and back. Interior dense samples retain only original nonnegative support triangle IDs, the fixed physical player, and at least 3 m displacement. No destination geometry, support holes, walls or navigator implementation are changed.

## Work bounds and limitations

The wrapper can perform two bounded searches per requested mode, and the outer fallback can perform four per candidate. Each pass retains 20,000 grid cells/supported nodes, 32 layers per column, 48 legacy or 192 expanded entries, 80,000 edges, 4,096 candidate routes, 160,000 topology rays, 8 final approach builds and 24 million index references. The prism checks at most the indexed original triangles once per attempted approach, stopping at the first blocker; proof work is reported separately and does not consume or silently alter topology-ray counters. The new 10 m exterior approach bound can conservatively reject deep recesses. No proposal coverage, modifier scope or witness threshold change is included. A failure remains a censored bounded-search result rather than proof that the geometry lacks a route.

Synthetic tests cover unchanged predecessor success, high overhangs, deeply lower detached support, a recess deeper than 2 m with actual exterior start and reversible traversal, over-cap recess rejection, sealed rooms, 8 m holes in 12 m floor rings with and without surrounding walls, thin vertical walls, sloped head obstacles, hanging beams, source support beyond gaps, disconnected generated floors and fail-closed grid budgets. No cohort evaluation is performed during implementation. Freeze includes this file, routes-entry.ts, and unchanged imported routes-traced.ts, trace.ts, interpretation criteria/types, passage types and original navigator dependencies.
