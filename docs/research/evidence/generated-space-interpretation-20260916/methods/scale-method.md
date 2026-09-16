# Frozen geometry-only scale method

Version: `geometry-proportions-v1`. Designed and tested using synthetic geometry before cohort evaluation. No cohort artifacts, prior per-candidate results, reports, IDs, seeds, categories or intent were read during development. The project contract and shared exploration notes supplied the study context; this is an exploratory retrospective method, not a blind generalization claim.

`scale.ts` exports `PHYSICAL_SCALES = [6,10,12,16]` and `selectPhysicalScale(mesh: TriangleMesh, scales?: readonly number[]): PhysicalScaleSelection`. The result contains exactly one `selectedScale`, descending `ranked` entries with `{scale,score,features}`, `methodVersion` and explicit `limitations`. Scores tie by ascending numerical scale, independently of caller ordering. The default four choices are the study contract. The optional argument accepts 1–16 distinct positive finite scales no greater than 20, for synthetic verification and reuse; the cohort must use the default set.

The module is pure and synchronous, does not mutate inputs, and imports only the `TriangleMesh` type. It has no filesystem, clock, random source, artifact identity, text, label, navigation or route-assessment dependency. Its features do not establish entry, connected support, collision-free standing or a reversible route. Selection must be persisted for every candidate before any outcome calculation. Freeze this version and do not revise it after inspecting cohort results.

## Geometry measurements

1. Validate all source coordinates and indices. Y is up, mesh positions are source coordinates, and candidate scales multiply them into hypothesized metres. Winding determines upward-facing support.
2. Place a regular grid of column centres over the original XZ bounding box, initially 16×16. Estimate the number of triangle/column intersection tests from every original triangle's projected bounding box. Choose the finest of 16, 8, 4, 2 or 1 columns per axis whose two vertical scans require no more than 16 million tests. Record the selected resolution and bound. This geometry-only resource choice occurs before examining any candidate scale.
3. In the first full-triangle scan, keep the lowest upward-facing intersection at each column whose slope is at most 35 degrees. In the second full-triangle scan, keep the closest surface above that support, regardless of winding. Ignore intersections within `1e-6 × largest source extent` of support as duplicate contact. Finite overhead distances are clearance observations; an absent overhead supplies no preferred physical height. No authored support or missing surface is added.
4. Choose at most 32 spatially distributed supported columns by deterministic quantiles in grid order. At each candidate scale, cast positive/negative X and Z rays at one hypothesized metre above each support. Intersect all original triangles. For an axis with hits on both sides, sum the nearest distances. Use the narrower finite paired width; absent pairs supply no preferred width. These are coarse wall-spacing observations, not upright-body sweeps.

Every triangle remains included. `sourceTriangles` and `sampledTriangles` are equal and `triangleSamplingStride` is always 1; the sampling is spatial, not of triangle IDs. Other features expose support coverage, overhead coverage and median physical clearance, fraction of finite clearances at least 1.8m, median paired width, fraction of finite widths at least 0.6m, both prior scores, physical bounding dimensions and whether any architectural size evidence exists. Missing observations are `null`, not zero or fabricated infinity in JSON.

## Frozen score

For a measured physical distance `d`, define a proportion score:

```text
p(d; minimum, preferred, spread) = d/minimum - 1                   if d < minimum
                                = exp(-0.5*(ln(d/preferred)/spread)^2) otherwise
H = mean p(finite headroom; 1.8, 2.8, 0.45)
W = mean p(finite paired width; 0.6, 2.4, 0.8)
S = supported columns / all columns
R = finite overhead columns / supported columns
P = finite paired widths / width probes
B = fraction of finite paired widths at least 0.6m
score = S * (0.75*R*H + P*(0.25*W - 0.75*(1-B)))
```

An empty observation class contributes zero, and an absent width class incurs no narrow-width penalty. The preferred 2.8m height and 2.4m width are explicit illustrative architectural priors, not measured facts about generated scenes or learned statistics. The log spreads allow broad variation. The fixed physical player height/diameter motivates the lower limits; the additional width penalty prevents a comfortable roof height from compensating for a consistently sub-body-width opening. Headroom has the larger weight because a floor/roof separation is a more direct size cue than two axis-dependent wall intersections. The peaked priors penalize unnecessarily enlarged rooms, so successively larger scale does not always improve the score. Scores can be negative and are neither pass probabilities nor calibrated confidence.

Absolute metres cannot be identified from geometry without a known-size reference. A flat open floor supplies no architectural size evidence: all candidates tie and the smallest scale wins by convention. The same happens when there is no sampled support. A finite width without a roof can still supply a weak prior; this is not evidence of any particular semantic space type. Report `limitations` and raw features alongside a chosen scale, including ambiguity and reduced grid resolution.

## Resource bounds and verification

Accepted input is at most two million vertices and four million triangles, with finite coordinate magnitude at most 100. Input validation is linear in vertices and indices. One full-triangle preparation scan measures five possible grid bounds; two further scans perform at most 16 million vertical triangle/column tests in total. For each candidate scale, one full-triangle scan tests at most 32 probes and two projected horizontal axes per triangle (early Y rejection usually reduces this). The default four scales therefore have at most `256 × triangleCount` horizontal projected intersection attempts. No recursion, graph search, convergence loop, unbounded nearest-neighbour index or route enumeration occurs. Extra live storage beyond the caller's mesh is bounded by 256 columns, 32 probes and 16 small result records; no transformed mesh copy or per-triangle array is allocated.

The synthetic two-million-triangle test repeats a small room's original triangles and exercises adaptive grid reduction. It completed in approximately 0.53 seconds on the development host in one focused run; this is an observed smoke measurement, not an upper runtime bound or representative cohort benchmark. Dense geometry retaining a 16×16 grid can require more horizontal probes. The bounded operation counts, resolution and actual source triangle counts should be retained in study records.

`npx tsx --test scripts/interpretation/scale.test.ts` covers an ordinary room selecting 10 instead of 16, physically equivalent rescaling selecting 12→6, independently low overhead and narrow wall clearance selecting 16, open-scene ambiguity, a wall with no support, deterministic input/order/translation behaviour, a two-million-triangle resource fixture, dense tessellation preserving all column measurements, and invalid input rejection. The normal repository `npm run check` is also required. These synthetic tests demonstrate the declared heuristic's behaviour; they are not cohort validation.

The main limitations are incomplete spatial coverage, lowest-layer selection, winding dependence, missed thin features, grid/orientation bias, the one-metre wall slice, and interpreting arbitrary overheads or side objects as architectural evidence. Connectivity, full player footprint, exterior entry and semantic topology remain independent evaluator responsibilities. A selector failure is not proof that geometry is unusable, and a high score is not proof that any route exists.
