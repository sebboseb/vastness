# Diagnosing interpretation failures in frozen TRELLIS spaces

**No new whole-case interpreter false negative was demonstrated (0/31).** The final interpreter accepts **3/36 (8.3%)** at the original locked scales, compared with 3/36 before diagnosis. Browser entry, traversal and return pass **3/3 eligible destinations**. 0 of the prior 31 pass geometry, and 0 complete the browser endpoint. All 31 remaining cases stay unresolved; this is **not evidence that all 31 contain unusable generation**.

[GitHub #21](https://github.com/sebboseb/vastness/issues/21). Runtime branch: `codex/generated-space-diagnosis`. Integration receives documentation and evidence only. No GPU jobs, new generated artifacts, source geometry repair, navigation-tolerance changes, gameplay, input interface or rendering work was performed.

## What the denominator means

The same 36 frozen artifacts cover nine spatial categories, two prompts and two seeds each. Their automatically selected scales remain locked. This experiment never searches alternative scales or uses a candidate ID, category or historical label in an assessor or compiler.

The **31 previously unresolved cases** exclude the three prior selected successes (`narrow_passage-1-7`, `narrow_passage-2-7`, `cave-1-7`) and two known alternate-scale opportunities (`large_open_interior-1-7`, `corridor-1-7`). Recovering a known scale miss at its selected scale would be useful, but would not answer the question about the other 31. Previous results, including the cave's earlier first-browser return failure and separately successful repeat, remain intact.

A demonstrated whole-case interpreter false negative requires a previously rejected selected-scale artifact to pass the unchanged physical movement checks, the applicable intent criteria, and independent browser entry, traversal, return and persistence. Clearing one earlier rejection is recorded as stage progress, not a recovered destination. Failure of a bounded search is not proof that generated geometry is unusable.

## Trace coverage and controls

The observational baseline reproduced all **70/70 historical mode assessments**, preserving verdicts, routes, witnesses, criteria and search diagnostics. Only clocks and harness provenance were excluded from parity comparison. Its 19,687,293 ordered events cover:

- Intent normalization, lexical cues, semantic fallback, negation, scope warnings and final compiled criteria. Text spans use normalized UTF-16 offsets, not raw-input byte offsets.
- Supported grid samples, every entry proposal's eligibility/ranking/selection, omitted proposals and selected proposals left unattempted.
- Projection blockers with original triangle IDs and coordinates, body screening, support-edge discovery and unexecuted checks.
- Reached components, discovered nodes and edges, movement failures, candidate routes, exhausted bounds and unfinished searches.
- Topology measurements, thresholds, first failed predicates, later short-circuited predicates and original structural triangle IDs.
- Final forward/reverse seam movement, support observations and endpoint errors.

Complete compressed NDJSON traces remain under `.runtime/space-diagnosis/<phase>/candidates/<id>/`. They contain every emitted event, including omissions and short circuits. Event sequences, counts and compressed-byte hashes are verified before analysis. [Committed evidence](evidence/space-diagnosis/README.md) contains all 36 assessments and compiler traces per phase, exact diagnostic excerpts, per-candidate guides, trace manifests and frozen method snapshots. Large traces and original generated meshes remain local; a Git clone alone does not contain them.

Every correction was fixed and hashed before its own full 36 replay. All 36 are re-evaluated, including cases whose criteria remain identical. This is retrospective, outcome-informed diagnosis, not held-out validation. The original triangle mesh, selected transform, player dimensions, navigator and rendering remain unchanged. The player remains 0.3 m radius and 1.8 m tall, with a 0.25 m step limit and 35° slope limit.

Corrections preserve successful same-mode predecessor route and witness evidence and add at most one separately bounded search on failure. Thus later phases do more total work; they are not fixed-compute comparisons. Per-pass events retain the additional cost. Returned assessment metrics describe the final selected pass, while accumulated event totals are explicitly labeled separately. Component counts describe reached-entry discoveries, not an exhaustive decomposition of the entire mesh.

## Corrections and their evidence

**Exterior entry.** Baseline projection tests rejected triangles entirely above the player or below its support band. The correction proves a continuous 1.2 m wide exterior prism against every original triangle, from the original seam to an approach starting with the whole player outside source bounds. The protected band extends from 0.25 m below the seam through the player's full height. It preserves thin-wall, sealed-hole, source-support-overlay and missing-floor rejection. Original forward/reverse seam validation remains mandatory. [Diagnosis](evidence/space-diagnosis/diagnosis-notes/entry-diagnosis.md).

The complete entry replay retained 43,530,899 events and recovered no destination. Five unresolved cases progressed from no admitted entry to topology rejection: `large_open_interior-1-42`, `bridge-2-7`, `chamber-2-7`, `chamber-2-42`, `courtyard-2-42`. Separately, `tunnel-1-42` progressed from topology rejection to seam rejection. The new prism passes found 352 clear prisms and reached 16 final seam pairs; all failed reversible crossing near generated support. This is evidence of improved interpretation coverage without a whole-case recovery.

**Route scheduling.** In `doorway-1-7`, the prism search spent its 4,096 executed route checks on seven admitted entries, repeatedly visiting the same 1,602 nodes and leaving 148 selected proposals unscreened. A separate correction interleaves one candidate per active entry, retaining the same proposal population, ranking, per-entry BFS ordering, witnesses and global per-pass caps. It does not merge components or assume one entry represents every route through a component. [Diagnosis](evidence/space-diagnosis/diagnosis-notes/coverage-diagnosis.md).

The fair pass screens all 192 selected expanded proposals instead of 44, and all 48 legacy proposals instead of 17, for that doorway case. It serves 29 expanded entry streams instead of seven and 25 legacy streams instead of four. All 8,192 executed fair routes still fail the roof prerequisite; no flank, crossing or final seam test is reached for this doorway. It still fails acceptance. The old counter's 4,097 includes an unexecuted next candidate; both methods execute at most 4,096 checks. Fairness concerns candidate allocation, not CPU time: an expensive early witness can still consume shared ray limits. Proposal population, cardinal orientation and ranking remain bounded limitations.

**Covered-walkway alias.** Two requests explicitly describe an empty covered walkway between brick walls, but the prior compiler emitted unsupported topology and skipped geometry search. A narrowly matched positive alias assigns the existing enclosed-passage criterion, preserving every physical and modifier requirement. Previously supported inputs, negation and uncertain wording retain the original result. The full replay removes unsupported compilation for `corridor-2-7` and `corridor-2-42`, but recovers neither destination: the first fails width/broad-region witnesses, while the second reaches enclosed/covered witnesses and fails both seam directions at a support gap or step. [Measured compiler outcome](evidence/space-diagnosis/diagnosis-notes/compiler-outcome.md).

**Doorway modifier scope.** The phrase “broad doorway” in a chamber request propagated the 2.4 m broad-region setting into the enclosed-passage witness. That witness requires a sustained segment of at least 1 m; it does not test the entire route for breadth. Its broad-region probe moves a 0.3 m radius body along 1.2 m radial centerlines, so 2.4 m is not a literal floor-diameter test. A traced chamber route failed that broad-region check before its aperture could be examined. The correction localizes only unambiguous direct doorway width cues. It keeps the 2.4 m aperture requirement through `widthByTopology['doorway-crossing']`, while unrelated route support uses the original body-width minimum. The conservative predecessor receives the stronger global width; only a separate scoped evaluator may use the localized criterion. Narrow apertures still fail. Only `chamber-1-7` and `chamber-1-42` change criteria in the full cohort. The first advances to three complete topology witness sets, each preserving a broad aperture, but all six forward/reverse seam attempts fail at a support gap or step. The second still has no admitted entry. All 34 unchanged-criteria cases preserve their predecessor assessment behavior. [Compiler diagnosis](evidence/space-diagnosis/diagnosis-notes/modifier-diagnosis.md).

The 2.4 m threshold is the existing operational meaning assigned to “broad,” not a numerical dimension supplied by the player or independently established semantic ground truth. The finite compiler is not general language understanding. Localizing scope does not validate every other lexical or topology assumption.

## Definitions deliberately left unchanged

The [topology audit](evidence/space-diagnosis/diagnosis-notes/topology-diagnosis.md) did not justify lowering courtyard elevation or doorway widening requirements. Relevant courtyard traces stop at earlier sky, boundary or supported-breadth checks. Doorway-category traces never reach widening: they lack the tested lintel footprint, flanks or operational aperture width. A single high triangle does not establish a valid lintel spanning an opening. In the known corridor scale miss, some routes already pass widening and then fail the physical seam. Relaxing those later definitions would not be an evidence-backed correction of their observed first rejection.

A saved image of `doorway-1-7` appears to show a usable opening. [Targeted source probes](evidence/space-diagnosis/diagnosis-notes/doorway-opening-diagnosis.md) confirm that the opening itself has nine overhead hits and roughly 3.103 m flank spacing. The searched routes never reach its isolated 85-node support component. All six relevant neighboring sill edges fail physical movement in both directions, all ten direct crossing probes fail at the threshold, and all 13 selected entries into that component hit the source prism; 25 other proposals remain censored. This explains why searched routes lack a roof witness without implying that the actual lintel is missing. The probes use the original navigator and mesh and do not prove that every possible continuous path is impossible. No roof relaxation follows from the image.

Synthetic tests also exposed translation-sensitive support at an authored approach's exact outer footprint boundary. The [cohort audit](evidence/space-diagnosis/diagnosis-notes/approach-boundary-diagnosis.md) found no executed seam failure with that signature. Every new entry-phase seam pair had 0.5 m spare outer support and moved before failing near the source transition. Eight clear boundary-aligned proposals never reached seam validation. The numerical issue is retained as a known limitation, not used to justify another cohort correction. Scope fixtures disclose a 0.1 m translation that isolates width behavior from that inherited issue.

## Results and remaining rejection stages

| Frozen phase | Accepted /36 | Newly accepted geometry | Regressions | Method freeze |
|---|---:|---:|---:|---|
| baseline | 3 | 0 | 0 | [2efc00a4787d](evidence/space-diagnosis/baseline/freeze.json) |
| entry-prism | 3 | 0 | 0 | [159335c9df01](evidence/space-diagnosis/entry-prism/freeze.json) |
| coverage | 3 | 0 | 0 | [11eda9be71cd](evidence/space-diagnosis/coverage/freeze.json) |
| walkway | 3 | 0 | 0 | [a4da4c9e46d3](evidence/space-diagnosis/walkway/freeze.json) |
| doorway-scope | 3 | 0 | 0 | [641ff273558a](evidence/space-diagnosis/doorway-scope/freeze.json) |

Every phase includes all 36; counts are not selected examples. Newly accepted geometry is relative to the immediately preceding phase. These columns do not themselves establish browser recovery.

| Category | Final geometry /4 | Final browser /4 |
|---|---:|---:|
| large open interior | 0 | 0 |
| tunnel | 0 | 0 |
| doorway | 0 | 0 |
| narrow passage | 2 | 2 |
| chamber | 0 | 0 |
| cave | 1 | 1 |
| corridor | 0 | 0 |
| courtyard | 0 | 0 |
| bridge | 0 | 0 |

Operational stages among the original 31 unresolved cases:

| Deepest reached result | Baseline | Entry | Coverage | Walkway | Doorway scope |
|---|---:|---:|---:|---:|---:|
| final seam rejected after topology | 0 | 1 | 1 | 2 | 3 |
| no admitted exterior entry within search | 10 | 5 | 5 | 5 | 5 |
| no qualifying connected route within search | 3 | 3 | 3 | 3 | 3 |
| topology witness not found within search | 16 | 20 | 20 | 21 | 20 |
| unsupported intent compilation | 2 | 2 | 2 | 0 | 0 |

These stage counts aggregate all recorded bounded passes. A later rejection can coexist with earlier projection, body or connectivity failures. They do not identify an irreparable cause for an entire mesh.

| Phase | Complete traces | Ordered events | Compressed trace bytes retained locally |
|---|---:|---:|---:|
| [baseline case guides](evidence/space-diagnosis/baseline/explanations/index.md) | 70 | 19,687,293 | 541,774,101 |
| [entry-prism case guides](evidence/space-diagnosis/entry-prism/explanations/index.md) | 70 | 43,530,899 | 1,168,703,487 |
| [coverage case guides](evidence/space-diagnosis/coverage/explanations/index.md) | 70 | 60,603,348 | 1,670,346,057 |
| [walkway case guides](evidence/space-diagnosis/walkway/explanations/index.md) | 70 | 62,364,253 | 1,712,010,372 |
| [doorway-scope case guides](evidence/space-diagnosis/doorway-scope/explanations/index.md) | 70 | 62,490,580 | 1,717,507,072 |

Newly accepted cases: none.
Lost cases at any phase: none.

All 36 artifacts have sampled original-triangle support at the locked scale; the smallest selected assessment contains 335 supported grid nodes. This does not prove a usable ground floor or interior: support may lie on an inaccessible object, roof or disconnected surface. The remaining taxonomy describes the deepest reached interpreter decision. It must not be read as a count of independently proven generation defects.

## Browser verification and preservation

The entry correction preserved all three accepted route-evidence fingerprints. Fresh browser controls completed generated-supported travel and return for both narrow passages and the cave, traveling approximately 3.312 m, 3.111 m and 4.510 m respectively. An actual service restart preserved all 36 destination identities/assets and all three visit journals. The earlier cave return failure is neither overwritten nor removed from its historical rate.

The final doorway-scope inspection independently tested all **3 accepted destinations** through the existing visible controls; **3 passed**. 0 are from the prior 31 unresolved cases. First attempts are retained as recorded, including any failure; none is replaced by a successful retry. An actual final service restart verified all 36 artifact identities and retained visit journals. The unchanged accepted cases are regression checks, not new recoveries. [Final browser evidence](evidence/space-diagnosis/doorway-scope/browser-verification.json), [restart evidence](evidence/space-diagnosis/doorway-scope/restart-verification.json).

The diagnosis suite passes 54 behavioral tests, including trace parity, immutable sink observations, late-entry recovery, prior-route preservation, sealed holes, thin obstructions, unsupported gaps, actual doorway width and reversible movement. The root `npm run check` passes type checking, 33 project tests and build. Validation logs are [retained](evidence/space-diagnosis/validation/final-focused.log).

The final preservation audit verifies both pinned inventories: 2,877 files / 3,678,337,509 bytes, 1,209 files / 47,128,777 bytes. Original generated assets, previous results and their source methods remain intact. [Integrity verification](evidence/space-diagnosis/integrity-verification.json).

## Decision

The four trace-supported corrections demonstrate interpretation defects, but **recover zero of the prior 31 unresolved destinations**. At this frozen selected-scale, intent-specific endpoint, **3/36 (8.3%) is not reliable enough** to treat TRELLIS outputs as generally usable navigable spaces. No regressions were observed. This result measures the combined generator, selected scale, finite search, physical navigator and operational intent criteria; it does not isolate the generator as the cause of every rejection.

Do not spend this slice on more TRELLIS samples, indiscriminate tolerance relaxation or geometry repair. The justified next investment is resolving the recorded prerequisites for a comparable scene-backend benchmark in [#19](https://github.com/sebboseb/vastness/issues/19), while retaining TRELLIS as the working reference. A comparison must pin the interpreter and report its remaining coverage and semantic limitations rather than call every rejection a model defect. No WorldGrow/HunyuanWorld inference has run here, and their existing rights/access/hardware prerequisites remain unresolved. Diagnosis is complete; no further model execution is part of this slice.
