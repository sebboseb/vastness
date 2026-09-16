# Bounded modifier and criterion diagnosis

Read-only saved-evidence audit during the frozen baseline run, 2026-09-16. All 36 original intents were inspected; 34 selected assessments were complete at the audit cutoff. No assessments, compiler changes, tuning, or source-mesh changes were run. The only written file is this report. Entry and search-coverage diagnosis takes priority over the hypotheses below.

Two distinct local-width propagation problems have observed geometric rejection evidence: `chamber-1-7` (doorway adjective applied to the enclosed route) and `bridge-1-42` (landing adjective applied to the deck). A separate lexical-class omission rejects both `corridor-2` seeds before route evaluation. **These are diagnosis leads, not demonstrated recovered candidates or a count of irreparable generation failures.** No complete corrected geometry proof has been attempted.

All paths below are relative to `.runtime/space-diagnosis/baseline/candidates/`. Intent spans are half-open normalized UTF-16 offsets from each `intent-trace.json`, not raw-input offsets. Event sequence numbers refer to completed gzip NDJSON traces and are zero-based. Counts are repeated observations across routes, not independent tests or candidates.

## 1. Local doorway width propagated to the chamber route

`chamber-1-7` and `chamber-1-42` share: “An empty underground stone chamber with a broad doorway and continuous level floor, high ceiling and open walking space.” The saved normalized `broad` span is `[42,47)` and `doorway` `[48,55)`. In `chamber-1-7/intent-trace.json`, original requirements `intent:18` set global `minimumWidth:2.4`; scope observation `intent:30` and warning `intent:31` identify the local doorway hypothesis. Final requirements are `enclosed-passage` AND `doorway-crossing`, with cover required.

Exact `chamber-1-7/expanded.ndjson.gz` evidence:

| seq | Observation |
| --- | --- |
| 2637 | Support node 1109 is valid, eye `[-1.0115569353103637,1.667743647313494,2.5954667091369634]`, foot height `0.01774364731349399`, head clearance 1.8. |
| 8601 | Route 1, proposal `1109:3`, runs from node 1109 through every second node to 1139; endpoint displacement `3.000000000000001`. |
| 8615 | Node 1109 has nine original roof hits, roof coverage 1, maximum roof distance 3.4596325499588154. Side distances are `[1.6749447396939763,3.7708739303690493,5.542707678168602,null]`. |
| 8616 | Broad feature `1109:support`, radius 1.2: first radial probe succeeds; second is blocked by `unsupported-footprint`, remains 1.1 m from its endpoint. Remaining six radial probes and roof-ray step are unexecuted. |
| 8617 | Enclosed-passage predicate passes opposing-wall width, then fails `broad-supported-region` against global width 2.4. Required-roof-coverage predicate is **not evaluated**; the roof rays above are separate observations. |
| 8875 | Route 1 rejected at enclosed-passage; doorway-crossing and explicit-cover remain unexecuted. |

Across the expanded trace, 318 routes all reject at enclosed-passage. Node predicates record 2,825 broad-supported-region failures over 237 distinct nodes, 5,169 opposing-wall-width failures over 511 distinct nodes, and 55 successes over nine distinct nodes. This is repeated enforcement of the propagated field, not merely one exceptional node.

The legacy trace corroborates the same gate: both routes reject enclosed-passage; all 33 node-predicate observations across 17 distinct nodes fail broad-supported-region. At seq14677, route 1/node1133 passes opposing-wall width (`[4.075264373329853,1.3710206133478406,4.7150149287250045,null]`) and fails broad-region; seq14935 rejects the route before doorway and explicit-cover.

`chamber-1-42` has the same compilation issue but **no topology predicates in either mode**: expanded rejects all 187 reached projection screens and has five missing support edges; legacy rejects all 48 projection screens. It is not a second geometry-supported width attribution. `chamber-2-7` and `chamber-2-42` also reach no topology predicates.

Narrow correction hypothesis, deferred until entry/coverage work: separate local aperture width from whole-route width. For an explicit positive modifier attached to doorway, preserve the 2.4 m local aperture requirement and the full doorway crossing witness; use the body-width baseline for the enclosed route only when no independent whole-space width cue exists. Do not remove either topology, roof, original support, reversibility, seam, or body requirements. Whether chamber-1-7 has a qualifying broad doorway is **unproven**. Its current trace cannot establish recovery because those predicates never run.

## 2. Local landings width propagated to bridge deck

Both `bridge-1` seeds say “A stone bridge with a flat continuous deck, tall solid side parapets and an empty walkway joining two broad stone landings.” In saved normalized text, `broad` is `[102,107)` and `landings` `[114,122)`. The trace records the broad modifier at `intent:18`, global minimumWidth 2.4, and `likelyReferent:null`: **landings is outside the inspector noun dictionary**. Attachment to landings is this review's lexical hypothesis, not a parser conclusion or trace claim.

The frozen bridge witness does consume minimumWidth on deck transverse width. `bridge-1-42/expanded.ndjson.gz` seq20858, route1/node2082/axis `[1,0,0]`, records elevation `0.9481827146489226` above the 0.75 threshold, both deck edges (1.8 and 0.6), and transverse width lower bound 2.0 below 2.4. Width is the sole executed failure; longitudinal-displacement is unexecuted. Seq21976 rejects route1 at elevated-bridge. There are 4,377 sole-width observations over 108 distinct nodes; 760 rejected routes overall.

Legacy seq22482, route1/node106/axis `[0,0,1]`, likewise records elevation `0.9207688736515436`, both edges (0.6 and 1.6), width lower bound 1.8, and sole width failure with longitudinal-displacement unexecuted. Seq22654 rejects route1. There are 5,532 sole-width observations over 104 distinct nodes; 735 rejected routes overall. These node observations do not establish that a continuous deck route would pass after changing width.

`bridge-1-7` has the same lexical propagation but **zero sole-width observations** in either mode: its width failures coexist with other executed deck failures. Do not attribute that candidate to width alone.

Separate deferred hypothesis: a broad-landing modifier should constrain original connected landing regions rather than impose broadness on the entire span. A correction must add explicit original-geometry proof for both landings while retaining deck edges/elevation/continuity, body support, complete crossing and return. Merely lowering the deck field loses the requested landing property and is not justified. This is outside the narrow doorway correction.

## 3. Covered/walled walkway omitted from supported topology vocabulary

`corridor-2-7` and `corridor-2-42` share exactly: “An empty covered walkway between brick walls, broad straight path, low arched ceiling and flat continuous paving.” Saved normalized spans, verified by indexing the recorded normalized string: `covered[9,16)`, `walkway[17,24)`, `walls[39,44)`, `broad[46,51)`, `path[61,65)`, `ceiling[78,85)`.

Both intent traces have semantic-concept fallback evaluated (`intent:3`) and semantic-openness fallback evaluated but not accepted (`intent:4`). Topology compilation `intent:5` has empty evidence/required arrays. Final `intent:28` says supported false while retaining covered true, opposingWalls true and minimumWidth2.4. This is a lexical class gap, not a negation decision or missing geometry result.

| Trace | assessment-complete seq | Recorded reason |
| --- | --- | --- |
| corridor-2-7/expanded.ndjson.gz | 10840 | Intent has no supported topology criteria. |
| corridor-2-7/legacy.ndjson.gz | 16451 | Same |
| corridor-2-42/expanded.ndjson.gz | 7819 | Same |
| corridor-2-42/legacy.ndjson.gz | 8671 | Same |

All four record zero entries tested, edges tested, candidate routes and topology queries. Supported nodes exist (1,581 for seed7; 1,084 for seed42), but no usable route or required topology has been proved.

Narrow correction hypothesis: recognize a positive walkway expressly bounded by walls and covered/ceiling cues as an enclosed-passage synonym. Preserve original negation/exclusion rules, broad path width, roof requirements, all physical constraints, and the full geometric witness. Do not infer interior from arbitrary walkway/open scenery, a roof alone, or a negated enclosure. This changes supported lexical classification; full source geometry proof is still required before counting a rescue.

## Scope groups and non-attributions

Each row applies to both seeds, whose text is identical. Lexical warning counts alone are not a false-negative count.

| Intent pair | Local cue spans | What remains established or unresolved |
| --- | --- | --- |
| chamber-1 | broad[42,47), doorway[48,55) | Explicit doorway topology exists; only seed7 reaches width rejection. |
| courtyard-2 | wide[35,39), doorway[40,47) | Explicit doorway exists, but seed7 predicates all stop at open-sky or boundary directions; seed42 reaches none. Courtyard broad region is intrinsically required even if field is 0.6, so lowering the shared field does not bypass it. |
| cave-1 | broad[30,35), entrance[36,44) | No doorway topology; preserving local width needs a new explicit entry-width proof. Seed7 already passed and is excluded from 31 unresolved; seed42 has zero candidate routes in either mode. |
| chamber-2 | wide[40,44), entrance[45,53) | No doorway topology; new entry-width proof needed. Neither seed reaches topology predicates. |
| courtyard-1 | broad[44,49), entrance[50,58), followed by gate | Gate already gives doorway-crossing, but courtyard breadth remains intrinsic. No scoped-width rescue established. |
| large_open_interior-1 | broad[38,43), entrance[44,52) | Hall requires broad-covered-interior independently. Seed7 is a prior scale miss outside the 31; seed42 reaches no topology. No justification to weaken hall broadness. |
| doorway-1 | large[42,47), opening[54,61) | Only doorway-crossing required, so local aperture width already consumes the field at the appropriate topology. |
| doorway-2 | broad[47,52), doorway[59,66) | Only doorway-crossing required; same non-attribution. |
| large_open_interior-2 | large[46,51), doorway[52,59) | Independent vast-interior modifier requires broadness; cannot localize away the independent global requirement. |

Whole-space modifiers such as tunnel-1 broad passage, tunnel-2 wide walkway, corridor-2 broad path, and cave-2 wide cave passage must remain constrained. For example tunnel-1-42 records 229,803 expanded and 273,020 legacy opposing-wall-width first failures, but the adjective actually describes the passage: this is **not evidence of a scope bug**. Narrowness/compactness lacking a dedicated maximum-width field is a known representational limitation, not a demonstrated cause of these failures.

Courtyard-2's covered arcades also create a possible cover-scope question, but seed7 never reaches explicit-cover (all 264 expanded/487 legacy routes reject courtyard first); seed42 has no topology predicates. No roof-scope correction or recovery is supported by this audit.

## Falsifiable tests required before any correction

1. Local doorway: a broad original aperture leading to a body-clear narrower chamber route can satisfy local aperture width, while an otherwise equivalent narrow aperture must fail. An independently broad chamber/passage must retain global breadth. A broad entrance without doorway topology must not silently lose its width proof.
2. Landings, separately: broad original connected landings plus a narrower valid deck can qualify only if both landing regions and the complete deck/return are proved. Narrow or disconnected landings, missing deck edges, low/non-elevated slabs, unsupported gaps, and sealed-hole approaches must remain failures.
3. Walkway vocabulary: covered/walled walkway and equivalent corridor should compile equivalent geometric obligations. Arbitrary open walkway, negated walls/roof, and unsupported generic scene must not gain an interior classification. Geometry negatives for absent roof, narrow broad-path claim, blocked body, gap and inaccessible approach must still fail.
4. Keep selected scales, source assets, primary observations and baseline attempts fixed. Freeze each intended correction with its synthetic tests before cohort reevaluation. Attribute candidate improvements only after every remaining geometric and browser check succeeds.

## Evidence integrity anchors

The following completed gzip hashes were recomputed and matched each attempt's traceSummary. Bridge sequence continuity was also scanned end-to-end. No partial gzip was read.

| Trace | Events | SHA-256 |
| --- | ---: | --- |
| chamber-1-7/expanded.ndjson.gz | 54165 | 574e3fdf029fccd33b0ad7854a9ccd9a2ebd3a6376b7751578d1c5b9383fbb3a |
| chamber-1-7/legacy.ndjson.gz | 15040 | 9e454714990bd7bfeb7a5514b136f38a7a51bf5f4f57942d91cf6519095b3fd0 |
| bridge-1-42/expanded.ndjson.gz | 1923328 | 545af5cca3a81a4e33496a92e24e06a8b67b158118e1c2f07bbc316585fdca11 |
| bridge-1-42/legacy.ndjson.gz | 1666396 | 89a7374774120a574b425a435ecfb9ec5438f81f879630c2ca9d252c33c929ae |
| corridor-2-7/expanded.ndjson.gz | 10843 | e5097ed54402a3c0fff9cdf1281a36cf8dabc2049ec2577955b422c0807d5916 |
| corridor-2-7/legacy.ndjson.gz | 16454 | 5ee29865fc47fe4dc8f4b12827138518c157ef8e48351eede8362dc14f74f966 |

The chamber and bridge pairs record historical parity passed. The partial analysis summary used for orientation contained only ten candidates at first inspection; the specific findings above were read directly from later completed per-candidate records, not inferred from that stale partial aggregate.
