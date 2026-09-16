# Completed baseline: independent evidence and failure interpretation

2026-09-16. This is a supporting analysis note for the **unchanged 36-candidate baseline**, not the final comparative report. It was written only after generation, assessment and every eligible baseline browser trial completed. Corrected replay outcomes are excluded. The study's strict endpoint and original denominator remain unchanged.

## Frozen evidence verified

Source: [frozen baseline evidence](evidence/generated-space-reliability-baseline-20260916/summary.json), frozen at `2026-09-16T09:56:50.641350+00:00`. Summary SHA-256: `228636c655c7b18d1bdb605bbcbcef66b32860d8ec3081453a79cc2d803bc175`. Export/analysis commit: `4c41f54ada3ddf0c8f4521ab7191c9f267c74a7a`.

Independent read-only checks found no remaining discrepancy:

- All **1,335 export-manifest entries**, totaling **295,117,529 bytes**, matched their recorded sizes and SHA-256 hashes.
- All **73 case asset maps** were checked against the content-addressed exported scene/colors and retained source assets: 146 exported asset references and 219 retained references. These are references, not unique-file counts.
- All **15 persisted case identities** were recomputed using the service's complete identity formula: world, raw intent, semantics and ordered asset hashes. Every identity matched. The earlier scene/colors export gap is closed.
- The exported browser observations were independently rechecked: **49 scale-specific trials**, comprising 14 recorded passes and 35 retained failures. The 14 passes are repeated scale trials for **11 unique candidates**, not 14 successful candidates. The verifier deliberately preserves declared failures; this is not a claim that every failed attempt has a proven cause.
- The frozen generation audit records 36 distinct jobs, 36 GPU successes, 36 Mac-ready imports, 432 verified evidence files and zero prompt truncations. Assessment integrity records all 108 scale attempts. Restart evidence records unchanged inspection cases and a clean `courtyard-1-42` reload with the same two visits. These persisted audit records are part of the checked export; no GPU command or service restart was performed for this review.

Relevant records: [freeze](evidence/generated-space-reliability-baseline-20260916/freeze.json), [asset map](evidence/generated-space-reliability-baseline-20260916/case-assets.json), [generation audit](evidence/generated-space-reliability-baseline-20260916/generation-audit.json), [assessment integrity](evidence/generated-space-reliability-baseline-20260916/assessment-integrity.json), [restart verification](evidence/generated-space-reliability-baseline-20260916/restart-verification.json).

## What the endpoint measured

Primary scale 6 requires a 0.3 m radius/1.8 m body, original generated support, bounded step/slope, a reversible ≥3 m route, ≥1 m sustained enclosure, an exterior scaffold seam, and actual coarse-rendered browser entry/traversal/return. This is stricter than either “a floor exists” or “some open space is walkable.” See the [predeclared study](../specs/generated-space-reliability.md).

| Fixed scale | Offline passage accepted | Browser round trip accepted | Browser failures among eligible trials |
| --- | ---: | ---: | ---: |
| **6, primary** | 12/36 | **5/36 (13.9%)** | 7/12 |
| 10, secondary | 18/36 | 4/36 (11.1%) | 14/18 |
| 12, secondary | 19/36 | 5/36 (13.9%) | 14/19 |

At any one of the three prespecified scales, 24/36 candidates have an accepted offline route and 11/36 complete a browser round trip. This secondary result does not replace primary failures. The primary full-pipeline Wilson interval is 6.1–28.7%; the sample is a small, selected set of prompts, so this is descriptive uncertainty rather than a population guarantee.

Primary category passes out of four: courtyard 2; doorway, narrow passage and cave 1 each; large open interior, tunnel, chamber, corridor and bridge 0. None of the 18 prompt pairs succeeds at both seeds at primary scale; five pairs succeed at one seed. These observations support poor repeatability under this exact pipeline, transform and acceptance rule; they do not isolate the generation model from its image conditioning, validator and browser runtime.

## Failure taxonomy: observations and limits

The mutually exclusive **reported primary causes** sum to 36. They follow a priority-ordered diagnostic function, so a selected label is not an exhaustive list of everything a candidate lacks.

| Reported primary cause | Candidates | Defensible interpretation |
| --- | ---: | --- |
| Passed | 5 | Full strict primary endpoint completed. Semantic intent fidelity remains a separate axis. |
| Browser failure | 7 | Offline eligibility was insufficient to establish actual round-trip success. |
| Enclosure missing | 3 | No qualifying enclosure at sampled points; other route conditions may also fail. |
| Sustained enclosure or bounded route | 15 | Supported graph connectivity reaches ≥3 m, but the bounded search selected no strict enclosed passage. Cause remains ambiguous. |
| Disconnected or no 3 m route | 3 | The searched entry components did not reach 3 m displacement at primary scale. |
| Exterior seam rejected | 1 | The offline approach crossing failed; the record alone does not separate numerical inconsistency from geometry. |
| No exterior entry | 2 | The tested exterior-entry construction found no candidate; it does not prove a sealed mesh. |

### Generated support and open-space criteria

**All 36 candidates have sampled upward floor hits and valid body-clear support footprints at every tested scale.** At primary scale, 28/36 also have maximum checked graph displacement ≥3 m; the corresponding secondary counts are 33/36 and 35/36. Thus absent support is not the observed dominant failure. Graph displacement alone establishes neither a safe exterior seam, a retained witness route meeting enclosure, browser return nor semantic correctness.

The three `enclosure-missing` cases are `large_open_interior-1-7`, `bridge-1-42` and `bridge-2-7`. Their primary maximum connected displacements are only 0.20, 0.825 and 1.720 m, respectively. Do **not** call these proven “enclosure-only” failures: enclosure is the reported first diagnosis, but the primary graph does not independently establish a qualifying 3 m route either.

`doorway-1-7` is the clearer criterion-mismatch example. It has 506 valid primary footprints, 22 enclosed points and 7.354 m checked graph displacement, while the source/coarse review describes a freestanding doorway and attached generated base. It fails sustained-enclosure acceptance at all scales. That supports a distinction between a plausible open doorway scene and the study's enclosed-passage requirement; it does not prove browser traversal through the doorway. The other 14 `sustained-enclosure-or-bounded-route` cases should retain their ambiguous label unless separately investigated.

The search first requires 1.1 m enclosure on a coarse candidate path before checking ≥1 m densely. Its 0.2 m grid and 48-entry budget are bounded. Failed `continuousEnclosedDistance: 0` values describe the empty selected route, not an exhaustive maximum over every possible path. For no-entry cases, `maximumConnectedDisplacement: 0` also reflects absence of starting entries, not proof that their supported interiors are disconnected.

### Browser symptoms versus demonstrated numerical cause

Across all scales, **34 of the 35 failed trials stop in scaffold mode with zero generated travel and `support-gap-or-step`**. The remaining failure is `corridor-1-42` at scale 6: forward travel reaches 3.0507 m on generated support, then the return stops with the same reason while still in generated mode; the return endpoint remains about 1.503 m from the approach start. This case must not be described as an entry failure.

The exact nanometre boundary-tolerance mechanism has been independently reproduced for **`tunnel-1-7` at scales 10 and 12**. It is documented in [the CPU discrepancy diagnosis](reliability-browser-discrepancy.md). That is evidence of a navigator/assessor consistency defect, not a missing generated floor. The saved source mesh was unchanged.

The shared `support-gap-or-step` string does **not** prove the same mechanism in every other case: the branch covers continuity or step-height rejection. Some retained visual-review notes use “tolerance mismatch” or “numerical seam” as shorthand; beyond the reproduced tunnel cases, treat that wording as a hypothesis, not an independently established causal diagnosis. A corrected same-artifact replay can measure the effect of the patch without establishing identical local edge geometry in all cases.

### What the “topology failure” counter means

The reported counter is **6/36 (16.7%)**, consisting of:

- `cave-1-7`, `cave-1-42`, `cave-2-42`: primary checked displacement 1.281, 1.020 and 0.400 m.
- `large_open_interior-2-42`, `courtyard-2-42`: no primary exterior-entry candidate despite substantial valid support and enclosed points.
- `courtyard-1-7`: four primary authored-to-generated seam rejections, despite 3.007 m checked graph displacement.

These are **operational geometry/search failure flags**, not six proven mesh-topology defects. No manifoldness, watertightness or exhaustive reachability proof is supplied. In particular, the seam case may be affected by the numerical validator issue, and no-entry views do not prove a sealed interior. Keep this counter for the predeclared rule, but qualify its meaning in prose. The study does provide direct evidence of local footprint and body-obstruction rejections; it does not establish that those local conditions eliminate every usable route through each entire mesh.

## Scale and semantic conditioning remain separate

Fifteen candidates change offline eligibility between primary and at least one secondary scale. Twelve are primary failures with a secondary offline success. Three lose a primary offline success at a larger scale: `chamber-1-7` at 10/12, `tunnel-2-7` at 12, and `cave-2-7` at 10/12. Larger scale is therefore not a monotonic repair. Fixed player size, enclosure bounds, entry selection and the bounded grid all interact with uniform scene scale; the study does not determine a correct real-world unit for the generated model.

Semantic conditioning is also independent of spatial passage success. For example, `courtyard-2-7` completes the primary round trip although the source review describes a covered hall rather than the requested open courtyard. Several bridge images omit clear level landings or add stairs; chamber images can introduce people/platforms. These qualitative observations identify possible image-stage intent drift, but no calibrated semantic pass rate was preregistered. Do not turn the 5 spatial successes into 5 verified faithful worlds, or attribute all scene mismatch solely to TRELLIS.

## Implication for the diagnostic replay and fallback decision

The unchanged baseline triggers fallback benchmarking through its primary success rate and category thresholds. The operational 16.7% topology counter does **not** reach the separate 20% trigger. This is a decision about the measured pipeline under the declared endpoint; it is not a claim that 86.1% of outputs lack navigable geometry.

Keep the frozen baseline intact. Reassess the same source hashes under the separately committed numerical correction, retain its new assessments/diagnostics/visits, and collect fresh browser trials for every replay-eligible route, including previous passes. Report paired baseline/replay transitions by candidate and fixed scale. A replay improvement measures the correction's effect within this cohort; it is not a new generation sample, a replacement baseline rate, evidence that the enclosure criterion became appropriate for every open-scene request, or a benchmark of an alternative backend.
