# Entry diagnosis from completed frozen traces

Read-only snapshot written 2026-09-16T12:22:39.636661+00:00. Scope: the first eight named candidates, 15 completed mode traces; every included trace ends with `result:complete` and has historical parity `true`. Later-arriving candidates are deliberately outside this fixed snapshot. No evaluator rerun or geometry/source modification was performed.

## Systematic measured exclusion

The full-height XZ projection predicate stops at the first intersecting triangle without considering its Y coordinate. The trace proves this excludes proposals on the basis of geometry far below support or wholly above the player. It does **not** prove that those corridors are otherwise clear, that a candidate route passes topology, or that relaxing this single predicate recovers a case. Near-foot triangles are separately retained because ignoring those could overlay original support or bridge a floor hole.

| Candidate | Mode | Deep below seam−.25m | Near-foot/contact band | Above seam+1.8m | Body-height overlap |
|---|---|---:|---:|---:|---:|
| large_open_interior-1-7 | expanded | 62 | 30 | 18 | 10 |
| large_open_interior-1-7 | legacy | 8 | 15 | 6 | 1 |
| tunnel-1-7 | expanded | 58 | 57 | 20 | 29 |
| tunnel-1-7 | legacy | 11 | 5 | 0 | 3 |
| doorway-1-7 | expanded | 11 | 19 | 0 | 1 |
| doorway-1-7 | legacy | 0 | 13 | 0 | 0 |
| chamber-1-7 | expanded | 54 | 27 | 19 | 10 |
| chamber-1-7 | legacy | 33 | 6 | 1 | 0 |
| narrow_passage-1-7 | expanded | 0 | 40 | 3 | 4 |
| cave-1-7 | expanded | 61 | 80 | 14 | 7 |
| cave-1-7 | legacy | 0 | 22 | 0 | 1 |
| courtyard-1-7 | expanded | 23 | 44 | 48 | 31 |
| courtyard-1-7 | legacy | 0 | 2 | 4 | 1 |
| corridor-1-7 | expanded | 71 | 45 | 5 | 10 |
| corridor-1-7 | legacy | 7 | 29 | 2 | 0 |

Totals: **1081 first projection blockers**: 399 deep below, 434 near-foot, 140 above head, 108 intersecting the body-height band. Counts are proposal/mode observations, not distinct recovered routes or cases. The body-height-overlap column is only a Y-range classification, not an independent exact collision test.

## Concrete source-bound observations

### large_open_interior-1-7, expanded, proposal `0:0`

Trace `baseline/candidates/large_open_interior-1-7/expanded.ndjson.gz`, **seq 20928**, source triangle **14382**. GLB SHA256 `b6315fe62b32374bbf3db71538e16b19b8d342eaa975417e0eb1594222048457`; trace SHA256 `dde52948477f780cbc32eb41b11373b1cc14431841a8543e52242c569a95f946`.
Seam `[-3.7272822961211203, 2.7960854043282737, -5.6077369213104244]`, outward `[-1, 0, 0]`. Triangle world Y range 0.085581064…0.086940229m; support band lower bound 2.546085404m; body upper bound 4.596085404m. Exterior projection corridor length 2.000000m and width1.2m.
Source-space vertices (inverse unchanged transform): `[[-0.310541987, -0.21682556, -0.485050917], [-0.310802311, -0.216712296, -0.482768089], [-0.310918272, -0.216785669, -0.487523288]]`.
World-space vertices: `[[-3.726503849029541, 0.08558106422424316, -5.820611000061035], [-3.7296277284622192, 0.0869402289390564, -5.793217062950134], [-3.7310192584991455, 0.08605974912643433, -5.850279450416565]]`.
The projection predicate rejected here; subsequent body screening and final swept seam checks were unexecuted for this proposal. Removing this blocker alone is not a clearance certificate.

### large_open_interior-1-7, expanded, proposal `702:1`

Trace `baseline/candidates/large_open_interior-1-7/expanded.ndjson.gz`, **seq 21056**, source triangle **423468**. GLB SHA256 `b6315fe62b32374bbf3db71538e16b19b8d342eaa975417e0eb1594222048457`; trace SHA256 `dde52948477f780cbc32eb41b11373b1cc14431841a8543e52242c569a95f946`.
Seam `[3.729617269337178, 0.0929983835800587, -3.2077369213104245]`, outward `[1, 0, 0]`. Triangle world Y range 2.400418058…2.413064986m; support band lower bound -0.157001616m; body upper bound 1.892998384m. Exterior projection corridor length 2.000000m and width1.2m.
Source-space vertices (inverse unchanged transform): `[[0.308582902, -0.023922477, -0.297972649], [0.308582038, -0.023050167, -0.301729947], [0.311235696, -0.022868566, -0.302123666]]`.
World-space vertices: `[[3.7029948234558105, 2.400418058037758, -3.5756717920303345], [3.7029844522476196, 2.4108857810497284, -3.62075936794281], [3.7348283529281616, 2.4130649864673615, -3.625483989715576]]`.
The projection predicate rejected here; subsequent body screening and final swept seam checks were unexecuted for this proposal. Removing this blocker alone is not a clearance certificate.

### chamber-1-7, expanded, proposal `1139:1`

Trace `baseline/candidates/chamber-1-7/expanded.ndjson.gz`, **seq 8138**, source triangle **678323**. GLB SHA256 `d526aec6874c3a1259fe4af64beb770ab96888df3909b58f4e0bd7f79e2ad464`; trace SHA256 `574e3fdf029fccd33b0ad7854a9ccd9a2ebd3a6376b7751578d1c5b9383fbb3a`.
Seam `[2.338945862650872, 0.02141951698197842, 2.5954667091369634]`, outward `[1, 0, 0]`. Triangle world Y range 2.387810782…2.401879214m; support band lower bound -0.228580483m; body upper bound 1.821419517m. Exterior projection corridor length 2.000000m and width1.2m.
Source-space vertices (inverse unchanged transform): `[[0.391219497, 0.054737382, 0.366463393], [0.388420433, 0.055933274, 0.369810998], [0.389633119, 0.05708212, 0.365142167]]`.
World-space vertices: `[[2.3473169803619385, 2.387810781598091, 2.198780357837677], [2.33052259683609, 2.3949861377477646, 2.218865990638733], [2.3377987146377563, 2.4018792137503624, 2.190852999687195]]`.
The projection predicate rejected here; subsequent body screening and final swept seam checks were unexecuted for this proposal. Removing this blocker alone is not a clearance certificate.

### narrow_passage-1-7, expanded, proposal `0:0`

Trace `baseline/candidates/narrow_passage-1-7/expanded.ndjson.gz`, **seq 3906**, source triangle **29664**. GLB SHA256 `75e8c7130f57c8786a79c28cc81daa1007039c13ca4ae61bfd97bd4a027c0774`; trace SHA256 `88b3f24abcd045479e9642634ba2c3a845a299aa6227aefa0325cda11a98f267`.
Seam `[-2.968494512140751, 0.022661812987843165, -2.6114558935165406]`, outward `[-1, 0, 0]`. Triangle world Y range 0.003639758…0.004317105m; support band lower bound -0.227338187m; body upper bound 1.822661813m. Exterior projection corridor length 2.000000m and width1.2m.
Source-space vertices (inverse unchanged transform): `[[-0.499023974, -0.32639721, -0.467115521], [-0.499946564, -0.326284319, -0.467102915], [-0.499970973, -0.326292783, -0.471112132]]`.
World-space vertices: `[[-2.994143843650818, 0.0036397576332092285, -2.8026931285858154], [-2.999679386615753, 0.004317104816436768, -2.8026174902915955], [-2.9998258352279663, 0.004266321659088135, -2.8266727924346924]]`.
The projection predicate rejected here; subsequent body screening and final swept seam checks were unexecuted for this proposal. Removing this blocker alone is not a clearance certificate.

## Exact coverage failure (priority2; defer changes)

For `cave-1-7`, successful legacy proposal **834:0** is supported node834 at eye `[-4.096314334869385,1.826791478504237,0.18408615589141863]`. In `legacy.ndjson.gz`: eligible seq11179, selected rank28 seq15942, attempt seq91433, prescreen pass seq91527, swept-forward seq93792, swept-reverse seq93793, route1041 accepted seq93794. Both swept endpoint errors are approximately5.33e−15m, and both moves are unblocked. The source contact at the seam is triangle186; original route entry footprint IDs include646821,660699,654577,10902,642961,641103,642983,646837,654603.

In the expanded trace, **seq8693** explicitly excludes the identical **834:0** proposal because it has same-layer grid neighbor833 within the.25m threshold. It never reaches ranking or the192-entry cap. This is a demonstrated proposal-population miss, not speculation about ranking diversity. The baseline corrected endpoint already recovers it through legacy fallback, so it is outside the31-unresolved recovery denominator. Any later coverage change should retain successful predecessor proposal paths, rather than replace one incomplete population with another.

## Narrow priority1 correction proposal

1. Keep the full predecessor expanded→legacy acceptance policy first. If either predecessor mode accepts, retain that exact route and assessment. Only predecessor failures enter a separately measured correction pass. This avoids newly admitted proposals consuming caps before a previously successful route and makes added work explicit.
2. In the correction pass only, replace full-height XZ exclusion with exact clipping of every potentially intersecting original triangle against an exterior rectangular prism in seam coordinates. Preserve the1.2m approach width and2mm contact boundary tolerance. Its outward extent must reach beyond the global source bounds with body-radius margin; do not stop at the2m authored platform. Transform each source triangle to outward/lateral/Y coordinates and successively clip against the six planes. Reject any intersection with the whole support+body band from `seamY−maxStep` through `seamY+height` (or two contiguous support/body prisms if that makes the proof clearer). Reject degenerate line intersections too for vertical/thin walls; positive-area-only testing is insufficient for body collision.
3. Scan all spatial-index candidates intersecting that3D prism, stopping only upon a genuine clipped intersection. A triangle wholly below the support band or above the head is not enough to reject, but it does not terminate the scan as clear. No projection hit may simply be ignored without continuing through all remaining candidates. Require an explicit completed-clear result, or fail closed on any resource limit.
4. The support-height portion rejects original floor/step surfaces along the would-be authored corridor, including the ring around an internal hole. The body-height portion rejects sealed walls and arbitrarily thin obstructions continuously between sample locations. Bounds-exterior connection plus these two checks is the justification for an exterior platform; it is not merely a relaxed roof threshold. The stronger1.2m rectangular prism is conservative relative to the player cylinder.
5. Preserve original contact search, support-node sampling, criteria, topology witnesses, proposals, graph edges, route caps and bidirectional final seam navigator checks. The final unchanged navigator is still authoritative for movement onto original support, including slope, stepping, head clearance, gaps and numerical boundary behavior. Keep interior samples original-supported; authored support IDs must remain absent from the interior route.

Work is bounded: at most the existing predecessor modes plus one correction pass per mode, with unchanged per-pass search limits and spatial-index reference caps. Expose predecessor and correction costs separately. Neither this proof nor a changed prescreen guarantees recovery; it only admits physically plausible proposals to the unchanged downstream tests.

## Required synthetic acceptance and rejection tests before freeze

- Positive: roof overhang wholly above standing clearance; detached/lower floor well below the support band; a recessed entrance with a continuous clear corridor to outside global bounds. Require final actual outward/return seam movement and original-only interior support.
- Negative: sealed box;8×8m internal floor hole in a sealed12×12m ring; internal hole in an unroofed floor ring with no surrounding walls (support-band rejection still required); a second floor island beyond a gap; a wall thinner than movement sample spacing positioned between sample locations.
- Negative: sloping roof/underhang that starts above the head but descends into the swept prism; hanging beam at head height; floor/step in the scaffold band; vertical triangles whose XZ projection has zero area; approach with height-clear origin but an obstructed segment before outside bounds.
- Invariance: cases accepted by the exact predecessor return the same route/witness/support record before new proposals run; sealed/hole tests retain rejection; no source arrays mutate; failed/exhausted prism scans fail closed. Record additional predecessor/correction work instead of presenting it as unchanged resource cost.

Do not change priority2 proposal coverage in the same phase. Freeze the new source/tests/method before the36-candidate correction replay, retain baseline parity traces, and browser-verify only actual recovered selected-scale routes.

## Implementation policy settled after this diagnosis

The new phase preserves successful predecessor routes per requested mode: run the frozen traced baseline first, then at most one separately bounded prism pass on same-mode failure. The outer expanded→legacy order remains unchanged, so a new expanded success can replace a prior selected legacy route only in the new phase. Every nested event carries the pass label. The actual new authored approach extends to a body-clear start beyond source bounds, within the unchanged navigator 10 m cap; the continuous source support/body prism covers its entire length and original navigation verifies both complete seam directions. This supersedes the earlier suggestion to finish both old modes before trying any new pass. No historical outputs change.
