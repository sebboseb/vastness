# Doorway-1-7: visible opening versus physically reachable aperture

The image is consistent with a real, adequately wide opening and a solid lintel. Read-only original-triangle queries confirm **nine of nine overhead hits at the opening center and a 3.10344 m flank span**. The observed failure is earlier: the saved search never reaches this supported opening region. A raised, irregular source threshold prevents the tested physical transitions from the surrounding floor. Weakening the roof predicate is not supported by this evidence.

This is a bounded diagnosis of one locked-scale candidate, not a new assessor run, whole-candidate acceptance test, or proof that every continuous path is impossible. No scale, geometry, navigator, witness, or budget changed. No correction is proposed from these observations.

## Evidence and reproduction

All paths below are relative to the repository root. Run the retained read-only probe with:

```sh
node .runtime/space-diagnosis/doorway-opening-probes.mjs
```

It imports only the original navigator, reads the frozen original GLB and completed expanded coverage trace, and writes its own sibling JSON. It does not import or invoke any assessor. It uses original source triangles, the saved transform, default unchanged navigation dimensions, exact retained point/line query parameters, and the frozen cardinal-grid edge predicate. The JSON retains full support samples, source/world blocker vertices, directions, deltas, outcomes, relevant complete trace records and sequence numbers. The script rerun above was solely to retain this evidence reproducibly.

| Binding | Value |
|---|---|
| Source | `.runtime/reliability/candidates/doorway-1-7/collider.glb` |
| Source SHA-256 | `3b2e6b1800b0f9565cf699eea62f1af945e8ce64f453f6360ad2e96770d92810` |
| Mesh | 794,370 triangles; 397,926 vertices |
| Transform | scale `10`, yaw `0`, position `[0,4.226404428482056,0]` |
| Navigation SHA-256 | `8c58a786e9d7fed8384d2ea7144d20b6c55edc6b2eaa45e7047d9f4ab482c73d` |
| Expanded trace | `.runtime/space-diagnosis/coverage/candidates/doorway-1-7/expanded.ndjson.gz` |
| Trace SHA-256 | `d36055cd7de3104c696168ec93536ccb2ab630f703fc4fcf1caa652ef77a788e` |
| Trace pass used | `coverage-round-robin` only |
| Probe source SHA-256 | `fe316901d19227383300439aa3e4c6f29040c9f804aa6554e3f9449a76c40884` |
| Probe results SHA-256 | `5c4de656827b7780ee9c89cabee2a239d306d6c49b18d36a7ae167e89997382c` |
| Image | `.runtime/interpretation-study/candidates/doorway-1-7/browser/overview.png` |
| Image SHA-256 | `86d00a1c78fb2a11efb1db036e0ab5b4758144ea7fed4b407e796893caf132f8` |

Probe results are `.runtime/space-diagnosis/doorway-opening-probes.json`. World bounds are `[-5.0177812576293945,0,-5.004932880401611]` through `[5.006827712059021,8.467782139778137,5.01539945602417]`. Source coordinates recover as `[worldX/10,(worldY-4.226404428482056)/10,worldZ/10]`.

The image was inspected as orientation evidence only. Its inspection camera is not an accepted player route. Neither appearance nor an empty-looking opening establishes collision-free entry.

## The lintel and opening are present

At world center, unchanged `nav.assess` produces valid foot `[0,0.4199824218676343,0]`. Nine upward rays use exactly the witness's center plus eight radius-0.3 m offsets, start height `footY + 1.8 - 0.001`, and maximum `bounds.maxY - footY`. All hit original lintel triangles:

| Sample | Triangle | Hit world Y |
|---|---:|---:|
| Center | 200715 | 6.362122 |
| +X | 213942 | 6.361187 |
| +X,+Z | 208912 | 6.361335 |
| +Z | 200654 | 6.356885 |
| -X,+Z | 192361 | 6.358997 |
| -X | 187476 | 6.363594 |
| -X,-Z | 192442 | 6.365082 |
| -Z | 200781 | 6.362099 |
| +X,-Z | 208984 | 6.362214 |

At `footY + 0.9`, opposing X rays hit triangle 520351 at distance 1.638534 m and triangle 279076 at 1.464909 m: total **3.103444 m**, above the required 2.4 m. These are pointwise geometry measurements, not a complete doorway witness: no traversable route across the aperture has been established.

Thus the nine-ray coverage rule does not reject this measured opening center. The lintel is sufficiently deep to cover the player's complete sampled footprint there. The generic thin-wall hypothesis does not explain the observed first failures for this candidate.

## Why saved routes almost never see a roof

The completed fair expanded pass discovers 1,836 valid supported nodes. It visits 1,602 distinct nodes, all on the surrounding low floor below Y 0.25. It queries cached topology features for 1,561 of these nodes: 1,557 have zero overhead hits and four have one. It never queries the actual central aperture nodes.

Examples of valid, unvisited opening support records:

| Trace seq | Node | Foot world XYZ |
|---:|---:|---|
| 502759 | 785 | `[-0.017781,0.420104,-0.404933]` |
| 502906 | 827 | `[-0.017781,0.419936,-0.204933]` |
| 503056 | 864 | `[-0.017781,0.419990,-0.004933]` |
| 503204 | 903 | `[-0.017781,0.419890,0.195067]` |
| 503337 | 929 | `[-0.017781,0.419658,0.395067]` |
| 503468 | 945 | `[-0.017781,0.419711,0.595067]` |

The first five belong to an 85-node opening component. Node 945 belongs to a separate seven-node patch behind it. All 94 supported nodes in the height band `[0.25,1)` remain unvisited. The other two components in this band contain one node each; one is a small non-opening rise elsewhere. Do not describe all 94 nodes as the opening.

The saved expanded pass evaluates 4,096 candidate routes across 29 admitted exterior streams. Its 94,822 aperture-node checks fail the first roof-coverage predicate: 94,533 observe zero hits and 289 observe one. Flank and crossing tests short-circuit. Legacy also evaluates 4,096 routes across 25 streams: 84,114 first roof failures, 83,993 zero-hit and 121 one-hit. Repetition counts are not independent geometric opportunities. Full scheduling comparisons remain in `coverage-outcome.md`.

Causal interpretation: these candidates traverse the outside base, so their absent roofs are expected. The first topology failure is downstream of unreachable or unadmitted opening support, not evidence that the mesh lacks a lintel.

## Exact physical obstruction at the threshold

Player dimensions remain radius 0.3 m, height 1.8 m, eye height 1.65 m, maximum step 0.25 m, maximum slope 35°, movement sample step 0.05 m, contact tolerance 0.015 m. No authored approach is involved in the probes below.

The saved support-discovery trace already contains an exact rejection at the front lip: **seq 502248**, world foot `[-0.01778125762939453,0.14458080107030336,-1.204932880401611]`, has all nine support samples but fails `body-or-head-obstruction`, blocked by original triangle **197558**. At seq 502350, foot `[-0.01778125762939453,0.1446734916551622,-1.0049328804016113]` fails `unsupported-footprint` after only two samples. The missing valid grid row separates the base from the sill.

Independent original-navigator movement confirms an actual rejected transition, not merely a nominal height comparison. At X=0, start eye `[0,1.7946211244210502,-1.5]` is supported (assessed foot Y 0.1449215015). `nav.move(start,[0,0,3])` stops at eye `[0,1.79586698935791,-1.2499999999999998]`, supported foot Y 0.1458669894. The next 0.05 m target, Z -1.2, fails `body-or-head-obstruction` on triangle **197558**. Last-valid support IDs include 594916,607999,603080,594902,584906,581576,586595,201027,603100; the full nine support samples are retained in JSON.

Triangle 197558 coordinates are:

| Vertex | Source XYZ | World XYZ |
|---|---|---|
| A | `[-0.0093679121,-0.3910960555,-0.0897418484]` | `[-0.093679121,0.315443873,-0.897418484]` |
| B | `[-0.0098338751,-0.3867929876,-0.0909046233]` | `[-0.098338751,0.358474553,-0.909046233]` |
| C | `[-0.0061683836,-0.3868000209,-0.0909477025]` | `[-0.061683836,0.358404219,-0.909477025]` |

This triangle lies at the low threshold face within the forward radius of the blocked player. It is not the overhead lintel.

A source-floor profile at X=0 gives additional context:

| Z | Highest floor Y in `[0,1]` | Triangle |
|---:|---:|---:|
| -1.00 | 0.144708 | 594904 |
| -0.95 | 0.145867 | 594902 |
| -0.90 | 0.148128 | 594895 |
| -0.875 | 0.410302 | 594896 |
| -0.85 | 0.412921 | 594890 |
| -0.80 | 0.416408 | 594878 |
| 0.00 | 0.419685 | 594636 |

The approximately 0.275 m base-to-sill difference exceeds the 0.25 m step limit. At the front, the highest floor changes by 0.262174 m over a 0.025 m interval; a lower overlapping hit also exists at Z -0.875. This profile alone is not used as a reachability verdict: the unchanged body/support movement results above establish the rejection directly.

Ten straight crossing probes, X in `[-1,-0.5,0,0.5,1]` from Z -1.5 to +1.5 and the reverse, all fail:

| X | Forward last Z / reason | Reverse last Z / reason |
|---:|---|---|
| -1 | -1.25 / body obstruction, triangle 158142 | 1.05 / body obstruction, triangle 156042 |
| -0.5 | -1.25 / body obstruction, triangle 177708 | 1.00 / support-gap-or-step |
| 0 | -1.25 / body obstruction, triangle 197558 | 1.00 / body obstruction, triangle 198822 |
| 0.5 | -1.25 / body obstruction, triangle 219119 | 0.95 / unsupported-footprint |
| 1 | -1.25 / body obstruction, triangle 241457 | 0.95 / unsupported-footprint |

The table's body triangle IDs come from assessing the exact next target after each stopped movement. These probes establish no successful crossing at the locked scale. They do not rule out every angled or subgrid route.

## Component connectivity and entry proposals

The retained probe uses the saved nodes and checks cardinal adjacency involving the 94 nodes in `[0.25,1)`, with the exact frozen edge height gate `0.25 + 0.2*tan(35°) = 0.3900415076 m`, unchanged forward/reverse navigation, and endpoint distance tolerance `1e-6`. Of 281 unique neighbor pairs, 163 pass the height gate and execute movement; 151 connect. The main opening component contains 85 nodes in X `[-1.817781,0.982219]`, Y `[0.418598,0.421663]`, Z `[-0.804933,0.395067]`.

There are 123 cardinal pairs from this component to other saved support nodes. None is valid: 117 are upper-roof layers excluded by the height gate; six lead to adjacent sill patches and fail unchanged movement. Pairs 897→924,925→941,926→942,927→943,929→945 fail `support-gap-or-step` in both directions; 928→944 fails `unsupported-footprint` both ways. No directly adjacent valid lower-floor node bridges the rejected discovery rows. This establishes isolation in the **saved 0.2 m grid graph**, not an exhaustive decomposition of continuous mesh space.

The component was also considered directly for exterior entry. Of its 340 direction opportunities, 302 are excluded by a same-layer grid neighbor and 38 become eligible proposals. Thirteen are selected, all thirteen attempted, all thirteen rejected by an exact original-triangle approach prism. The other 25 are omitted under the unchanged 192-entry cap. No admitted stream starts in the component.

| Prism-block trace seq | Proposal | First blocker triangle |
|---:|---|---:|
| 514215 | 930:3 | 182270 |
| 515570 | 772:0 | 28108 |
| 515670 | 708:1 | 270034 |
| 515942 | 702:2 | 166919 |
| 517931 | 908:1 | 283954 |
| 519159 | 694:2 | 148197 |
| 519194 | 698:2 | 148197 |
| 521153 | 705:2 | 230136 |
| 522779 | 898:3 | 518366 |
| 523103 | 725:3 | 99742 |
| 523247 | 925:0 | 21302 |
| 523705 | 858:0 | 24688 |
| 523752 | 906:3 | 198828 |

For example, proposal `702:2` has seam `[-0.217781,0.406513,-0.889100]`; its support/body prism starts at Y 0.156513. Triangle166919, farther outward near Z -3.52, intersects that band at Y0.156513–0.163965 and lateral -0.6 to -0.581642. This is an original low support obstruction to an authored platform spanning outward from the raised sill. Proposal `708:1` instead immediately meets threshold/jamb geometry (triangle270034, Y0.503874–0.524406). The retained trace records include full original triangle vertices and exact clipped polygons for all13. These are not mere XZ projection rejections and cannot be dismissed as irrelevant overhead roof triangles.

The 25 omitted proposals remain censored; they were not evaluated here. This diagnosis neither asserts that every possible authored entry is impossible nor authorizes patching the source threshold with a platform. Preserving original support and the no-interior-support-repair constraint remains necessary.

## Conclusion and limits

The visual opening is real. Its center already meets the measured roof and width conditions. Saved routes miss it because the supported aperture region is disconnected in the sampled physical graph and all its tested exterior approaches meet source geometry. Direct unchanged-navigator crossings corroborate obstruction at the raised threshold. Relaxing roof coverage would select surrounding-floor bypasses while leaving this physical transition unresolved, so it is the wrong correction for the demonstrated mechanism.

No safety-preserving interpreter recovery is proved by this candidate analysis. An unsampled curved path, a censored proposal, or another navigation-conservative mechanism remains possible; resolving those would need separate, explicit evidence. The present observations support deferring a topology relaxation, while recording the threshold/connectivity limitation. Whole-case acceptance counts remain the frozen phase results; a pointwise lintel measurement is not a recovered playable doorway.
