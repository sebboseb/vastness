# Generated-space reliability study

2026-09-16 · GitHub #18. **The stack is not a reliable scene backend under the declared criteria.** All 36 real RTX 3090 jobs generated and imported successfully. The unchanged pipeline completed the fixed-scale browser round trip for **5/36 candidates (13.9%)**. An isolated numerical-navigation correction raised this to **12/36 (33.3%)**, using exactly the same generated artifacts. Allowing any of the three predeclared scales raised success from **11/36 (30.6%) to 25/36 (69.4%)**. That secondary result does not replace the primary result.

No generation was retried to obtain a success. No source geometry was repaired or removed, and no authored destination floor was added. M0/M1 remain unchanged. Runtime stays on `codex/generated-space-reliability` and `codex/reliability-numerical-replay`; integration receives docs/evidence only. There are no gameplay, intention UX or style additions.

## Method

The [predeclared study](../specs/generated-space-reliability.md) uses nine spatial categories × two distinct prompts × seeds 7/42: 36 new candidates in deterministic shuffled blocks. Previous showcase successes are excluded. Each follows persisted raw intention and semantic constraints → SDXL-Turbo → TRELLIS → Mac import → geometry assessment → browser traversal. All outputs, failures, requests, timings, revisions and hashes are retained. Collection independently checked 36 unique job IDs, 432 evidence files and zero prompt truncations.

Primary scale 6 requires original generated support, a 0.3 m radius/1.8 m body, ≤0.25 m steps, ≤35° slopes, ≥3 m endpoint displacement, ≥1 m sustained enclosure, a safe exterior approach seam, actual browser traversal/return, and persistent destination identity. Scales 10/12 are prespecified sensitivity tests. Only the approach outside the generated destination is authored scaffolding.

The bounded assessor uses a 0.2 m search grid and an entry budget. Rejection means no qualifying route was found, not proof that none exists. Enclosure is roof coverage or opposing walls; this stricter passage requirement can be a poor fit for useful open courtyards, bridges or freestanding doorways. Semantic fidelity is recorded separately and has no preregistered pass rate.

## Results

| Outcome | Unchanged baseline | Corrected same-artifact replay |
| --- | ---: | ---: |
| GPU generation and Mac import | 36/36 | Same jobs; no new generation |
| Primary geometry eligibility | 12/36 | 12/36 |
| **Primary full browser round trip** | **5/36, 13.9%** | **12/36, 33.3%** |
| Scale 10 full browser round trip | 4/36, 11.1% | 19/36, 52.8% |
| Scale 12 full browser round trip | 5/36, 13.9% | 23/36, 63.9% |
| Any declared scale: geometry eligible | 24/36 | 25/36 |
| **Any declared scale: full browser round trip** | **11/36, 30.6%** | **25/36, 69.4%** |
| Browser successes among eligible scale trials | 14/49 | 54/54 |

Primary Wilson 95% intervals: baseline 6.1–28.7%, replay 20.2–49.7%. Any-scale intervals: 18.0–46.9% and 53.1–82.0%. These describe a small selected, paired cohort, not independent random samples or population guarantees.

| Category, four candidates each | Baseline primary | Replay primary | Baseline any scale | Replay any scale |
| --- | ---: | ---: | ---: | ---: |
| Tunnel | 0/4 | 1/4 | 0/4 | 2/4 |
| Chamber | 0/4 | 1/4 | 0/4 | 1/4 |
| Corridor | 0/4 | 3/4 | 2/4 | 4/4 |
| Courtyard | 2/4 | 2/4 | 2/4 | 4/4 |
| Doorway | 1/4 | 2/4 | 2/4 | 2/4 |
| Bridge-like passage | 0/4 | 0/4 | 1/4 | 3/4 |
| Cave | 1/4 | 1/4 | 1/4 | 4/4 |
| Narrow passage | 1/4 | 2/4 | 1/4 | 2/4 |
| Large open interior | 0/4 | 0/4 | 2/4 | 3/4 |

At primary scale, none of the 18 prompt pairs passed both seeds in the baseline; five passed one. Replay gives two pairs passing both, eight passing one and eight passing neither. At any scale, replay gives nine pairs passing both, seven passing one and two passing neither. One successful seed does not establish dependable generation.

## Failure taxonomy

All 36 meshes have sampled upward floor hits and valid body-clear support footprints at every scale. At primary scale, 28 have checked graph displacement ≥3 m. **Missing floor is not the dominant observed failure.** Connectivity alone establishes neither exterior entry, an enclosed route nor browser return.

Primary geometry failures are unchanged by the numerical correction:

| First reported cause | Count | Interpretation |
| --- | ---: | --- |
| Sustained enclosure or bounded route search | 15 | Support/connectivity exists, but no strict passage is selected. Cause remains ambiguous. |
| Enclosure missing at sampled points | 3 | Enclosure fails; these are not proven enclosure-only failures because searched displacement is also below 3 m. |
| Disconnected or no 3 m searched route | 3 | Searched entry components do not reach the required displacement. Not a global topology proof. |
| No exterior entry found | 2 | Tested approach construction finds no entry despite internal support. |
| Exterior seam rejected | 1 | Approach crossing fails assessment; local cause is not exhaustively established. |

These 24 geometry failures, seven browser failures and five successes account for the baseline. Replay converts the seven browser failures into successes, leaving the same 24 primary geometry failures. The predeclared “topology failure” count is 6/36: an operational support/connectivity/entry flag, not six proven mesh-topology defects. No-floor and established visual/collider disagreement are not observed primary categories. The [independent baseline analysis](reliability-baseline-analysis.md) explains the diagnostic priority, bounded-search limitations and individual cases.

Across scales, 34 baseline browser failures stop before generated travel with `support-gap-or-step`. One corridor travels 3.05 m but fails on return. Exact reproduction on a saved tunnel exposed inconsistent triangle-boundary tolerances between point contact and continuous support. The [diagnosis](reliability-browser-discrepancy.md) and isolated correction align those domains; real 1 mm and 2 cm gaps still block in negative controls. Source triangles, transforms, body dimensions and passage criteria stay fixed.

The replay used runtime commit `1eae3700a1242d9893abcdb8e3a56c818e49da82`, including numerical fix `3f7693e68c6bd88ad26350d8e815ef0e5e1c4ffe`. It was declared after observing this defect, not before generation. All 35 former browser failures pass: 32 retain the identical planned movement path; three have changed route/entry selection. Five additional secondary-scale routes become eligible and pass, while all 14 original passing trials remain passing. Frame schedules were not held identical. This measures the correction's effect within the cohort, without proving the exact same local edge mechanism in every failure. [All 108 paired scale results](evidence/generated-space-reliability-comparison-20260916/paired-aggregate.json) retain these distinctions.

Scale matters and is not a monotonic repair: some candidates lose eligibility when enlarged. Normalized geometry, fixed body dimensions, enclosure bounds and entry/search selection interact; no automatic real-world scale estimator is validated. Image-stage intent drift also occurs: covered halls for courtyard requests, bridges without clear landings, and chambers with unrequested people/platforms. Plausible interior images sometimes become box-like exterior shells. A single exterior view cannot establish a sealed interior, and spatial success does not establish semantic fidelity. All 36 replay coarse-color files are byte-identical to baseline.

## Resources and persistence

Serial jobs used the RTX 3090 (24,576 MiB), Windows driver 610.62 through WSL2, worker commit `04986defd1de38609cfb69c8d6c78ae4704e5670`. Baseline collector: `5fa2530`. A later tested polling fix is for future runs; it did not rerun this cohort.

| Measurement, 36 jobs | Minimum | Median | Maximum |
| --- | ---: | ---: | ---: |
| Worker generation latency | 64.48 s | 75.67 s | 159.51 s |
| Sampled whole-device peak VRAM | 15,245 MiB | 18,162 MiB | 23,338 MiB |
| Collision GLB bytes | 10,124,028 | 22,697,416 | 41,060,224 |
| Gaussian PLY bytes | 25,846,944 | 52,672,672 | 110,040,737 |
| Original mesh triangles | 562,340 | 1,260,686 | 2,279,942 |

Total generation duration: 2,910.43 s; GLB+PLY: 2,915,114,081 bytes. Generation latency is worker duration, not browser readiness or user wait time. VRAM is sampled every 100 ms, includes desktop/other allocations and can miss brief spikes. Per-stage PyTorch allocated/reserved peaks, timings and artifact sizes/hashes remain in candidate metrics/manifests. No OOM, transfer failure or prompt truncation occurred.

Accepted replay assessment routes span 3.0–9.8 m, displacement 3.0–8.2 m, continuous enclosure 1.2–4.0 m. Rejected route length zero is an empty-route sentinel, not zero floor area. Support IDs bind movement to original triangles. Baseline restart preserved 73 case identities/visits. Replay restart preserved 78 identities and 108 events across 54 completed round trips; clean browser reloads confirmed saved destinations. These are service/browser restart checks, not another PC reboot.

## Decision and alternative benchmark status

Do not promote TRELLIS to a reliable navigable-scene backend yet. Both conditions fail the predeclared ≥80% primary success and every-category ≥2/4 rule. Numerical navigation correction is necessary and useful; it does not solve scene generation. The stack remains useful for controlled experiments and generated assets.

**WorldGrow and HunyuanWorld have not been GPU-benchmarked in this study.** The [pinned fallback report](scene-backend-reliability-fallback.md) supplies the same geometry/browser criteria, exact model files, revisions and storage budgets:

- WorldGrow: 13.804 GiB selected weights; 80 GiB E-backed reservation. Single-3090 execution is plausible but unvalidated. Published license remains TBD; applicable permission is unresolved.
- HunyuanWorld 1.0: 67.052 GiB weights; 160 GiB reservation. Published territorial terms exclude the EU, FLUX access is gated, and applicable permission/access is unresolved. Single-3090 fit is unvalidated.
- HY-World 2.0: 199.009 GiB selected full-pipeline weights; 350 GiB reservation. Terms/access remain unresolved and documented full generation is not a validated single-3090 configuration.

No alternative weights were downloaded or gated terms accepted. The question about existing upstream permission remains unanswered. The fallback benchmark remains blocked on applicable rights/access and hardware prerequisites; feasibility research is not an execution result. Do not expand gameplay or visual-style work based on this study.

## Evidence, isolation and checks

- Baseline: [CSV](evidence/generated-space-reliability-baseline-20260916/rows.csv), [full records](evidence/generated-space-reliability-baseline-20260916/summary.json), [generation audit](evidence/generated-space-reliability-baseline-20260916/generation-audit.json).
- Replay: [CSV](evidence/generated-space-reliability-replay-20260916/rows.csv), [full records](evidence/generated-space-reliability-replay-20260916/summary.json), [artifact/criteria/color integrity](evidence/generated-space-reliability-replay-20260916/assessment-integrity.json).
- Comparison: [paired report](evidence/generated-space-reliability-comparison-20260916/paired-report.md), [108 paired rows](evidence/generated-space-reliability-comparison-20260916/paired-aggregate.json).

Both bundles contain browser traces/screenshots, source images, visits, scene/color inputs, complete asset-hash maps, export manifests and retained-heavy-artifact paths. Original GLB/PLY remain on this Mac and the GPU worker, outside Git.

The baseline was frozen before replay. Recorder recovery records are retained: the first replay trace briefly used the runtime baseline path (restored exactly from the committed archive); one chamber capture preceded its first animation frame (premature records retained, same motion allowed to finish); a long bridge return outlived the control call (same tab reconnected after completion). No generation or movement was repeated to recover these captures. No invalid/pending evidence counts as success.

Checks: baseline `npm run check`, 13 analysis/verifier tests, 23 Python worker tests; future collector 7 Python tests and an idempotent evidence-export regression; corrected `npm run check:passage` plus 12 explicit navigation regressions using the saved tunnel, including 28 step/phase round trips. Integration `npm run check` also passed. The build retains its existing large-bundle warning.
