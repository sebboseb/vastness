# Interpreting the frozen TRELLIS spaces

Automatic scale interpretation recovered **9 of the 24 previous generic traversal failures (37.5%)**, without changing or regenerating geometry. Under the same old traversal criterion, success rose from **12/36 (33.3%) to 21/36 (58.3%)**; all 21 automatically selected routes completed browser entry, generated-supported travel, return and persistence checks. No previous success was lost.

That does **not** establish that 21 results satisfy their requested spatial topology. The stricter intent-aware interpretation found **3/36 usable selected destinations (8.3%)**, against **5/36 (13.9%)** at any of the four declared scales. It captured **3/5 available opportunities (60%)**. Only **2/36 (5.6%)** completed the first browser round trip; the third passed an explicitly separate diagnostic repeat after an unexplained early return stop. The unresolved cases cannot be assigned wholesale to generation failure.

[GitHub #20](https://github.com/sebboseb/vastness/issues/20). Runtime: `codex/generated-space-interpretation`. Integration receives documentation and evidence only. No GPU jobs, new models, gameplay, intent interface or rendering changes were made.

## Cohort and measurement controls

The same 36 original artifacts cover nine categories, two prompts and two seeds per category. This is a retrospective exploratory study, not an unseen validation cohort. Every artifact and failure was retained. The 846,650,068 bytes of original GLB geometry remain unchanged; 2,877 original source/prior-evidence files were checked against pinned hashes. Source GLB/PLY, coarse-color scenes, original intents and previous reports are preserved. No collider triangles were deleted, no floors patched, and no destination support authored.

The geometry-only selector was designed with synthetic fixtures and frozen before its author inspected per-candidate cohort geometry or outcomes, and before any new evaluation. Aggregate prior-study results were already available in the shared project context. It takes triangle arrays alone: no category, ID, seed, intent, filesystem or pass/fail label. It estimates original support, overhead clearance and opposing-wall spacing, then ranks `[6,10,12,16]` using explicit human architectural priors. All 36 choices were locked before evaluating any routes; the selector was never retuned. Chosen scales: 6 for 15 cases, 10 for 10, 12 for 4, and 16 for 7. Selection took 18.74 seconds total (0.25–0.87 seconds per artifact). Four winning margins were below 0.01, indicating weak ranking separation rather than calibrated confidence.

There is no known physical-scale ground truth. “Scale accuracy” here means **usable-scale yield** and **capture of a bounded passing-scale reference**, not correctness in metres. The reference is limited to four scales and finite searches; it is not an oracle for all possible placements or routes.

Original intent and its semantic envelope feed a separate bounded lexical compiler. Enclosed passages, open courtyards, doorway crossings, elevated bridges and broad covered interiors receive distinct geometric witnesses. Enclosure is not universally required. A walk beside a doorway or on an ordinary rooftop does not automatically satisfy a doorway or bridge request. Modifiers and roof wording can still be misinterpreted; this is not general language understanding.

Entry discovery tests exterior boundary proposals across support layers, connected regions and reversible routes. Both searches require an authored approach outside the source's full XZ projection and a clear projected corridor to beyond its bounds. This prevents internal-hole spawning but can reject legitimate overhang or curved approaches. Player radius 0.3m, height 1.8m, eye height 1.65m, step 0.25m and slope limit 35° are unchanged. Accepted paths have at least 3m endpoint displacement, dense original-triangle support and body-clearance checks in both directions. The corrected prior navigator and existing coarse-color renderer remain fixed.

## Two retained phases

The original frozen v1 phase completed all 36 cases. Intent-aware legacy proposals passed 2/36; expanded proposals also passed 2/36, but they found different routes. Expanded search gained one narrow passage and lost a cave found by legacy search. The expanded proposal set was not a superset of the legacy set. Any of the four scales passed for 3/36 cases. Both eligible selected v1 routes passed the browser test and restart verification.

An early audit exposed two compiler errors: an open-sky courtyard “enclosed by walls” incorrectly required a roof, and “overhead roof” did not require cover. These observations motivated a **separate, disclosed post-hoc replay**. All v1 methods and outputs remain intact. The corrected compiler and deterministic expanded-then-legacy fallback were frozen before corrected evaluation. The fallback always uses the same already-selected scale. The same policy was used at every reference scale. Four cases received changed criteria; the roof fix alone added no selected successes. The fallback recovered the cave, yielding three selected successes.

This replay is outcome-informed, not blind validation. It changed neither the scale selector nor any choice, geometry, topology witness or search cap. Cached v1 assessments were reused only after matching source hash, complete transform, criteria, search mode and frozen method dependencies. The evidence retains 216 v1 attempts, 282 corrected attempts and provenance for 158 reused assessments.

## Results

| Endpoint | Successful candidates | Meaning |
|---|---:|---|
| Previous corrected navigator, fixed scale 6, old strict criterion | 12/36 (33.3%) | Historical comparable baseline |
| Automatic scale, same old strict criterion | 21/36 (58.3%) | Nine recoveries, zero losses; all 21 browser round trips passed |
| Corrected intent criteria and fallback, fixed scale 6 | 2/36 (5.6%) | Comparable fixed-scale reference for the new endpoint |
| Corrected intent criteria, expanded search only, selected scale | 2/36 (5.6%) | Same selected scales |
| Corrected intent criteria, expanded then legacy, selected scale | 3/36 (8.3%) | Final automatic geometry result |
| Same corrected endpoint, any declared scale | 5/36 (13.9%) | Bounded reference, never substituted into automatic results |
| First browser entry/traverse/return at selected scale | 2/36 (5.6%) | 2/3 eligible selected destinations |
| Distinct selected destinations demonstrated including diagnostic repeat | 3/36 (8.3%) | Includes the cave repeat; not the primary first-attempt rate |

The generic 21/36 and intent-specific 3/36 use different endpoints. Their difference cannot be described as a regression caused by intent awareness. Shared stricter exterior checks and changed witness/search budgets also mean old-strict versus new-legacy is not a pure criteria-only ablation.

Usable-scale opportunity capture is **3/5 = 60%**, with **2/5 = 40% missed**. The selected large hall failed at scale 12 but passed at 16; the selected corridor failed at 10 but passed at 12. Both nonselected reference routes completed independent browser round trips, proving these are interpretation misses. They remain outside the primary numerator. With only five demonstrated opportunities, this is a small and uncertain estimate.

Every category has four candidates. “Generic” includes verified browser round trips under the old criterion; “intent geometry” is the final selected-scale result; “first browser” requires the first complete round trip. “Any scale” is the bounded intent-specific reference.

| Category | Generic automatic | Intent geometry | First browser | Any scale |
|---|---:|---:|---:|---:|
| large open interior | 3/4 | 0/4 | 0/4 | 1/4 |
| tunnel | 2/4 | 0/4 | 0/4 | 0/4 |
| doorway | 2/4 | 0/4 | 0/4 | 0/4 |
| narrow passage | 2/4 | 2/4 | 2/4 | 2/4 |
| chamber | 1/4 | 0/4 | 0/4 | 0/4 |
| cave | 1/4 | 1/4 | 0/4 | 1/4 |
| corridor | 3/4 | 0/4 | 0/4 | 1/4 |
| courtyard | 4/4 | 0/4 | 0/4 | 0/4 |
| bridge | 3/4 | 0/4 | 0/4 | 0/4 |

Selected intent-valid cases are `narrow_passage-1-7` and `narrow_passage-2-7` at scale 6, plus `cave-1-7` at scale 10 through legacy fallback. Their browser forward travel was approximately 3.30m, 3.10m and 4.48m respectively. The cave's first return stopped in generated space without a collision/error diagnostic, about 3.38m short of its approach. Its cause was not captured. The unchanged route and assessment passed a separately journaled repeat. The original failure remains in the primary rate; no geometry, criteria, scale or route was changed to make it pass.

## Remaining failure taxonomy

The following aggregates **both** selected-scale searches, rather than treating the last fallback reason as the complete diagnosis. These are operational search outcomes, not intrinsic geometry verdicts.

| Selected geometry failure | Count | What is established |
|---|---:|---|
| No exterior approach admitted by projection/body pre-screen | 12 | Conservative entry rules admitted no search region; not proof that no real entrance exists |
| No connected route with at least 3m displacement found | 3 | Insufficient route found within the tested entry/search policy |
| Topology witness, final entry seam or bounded search unresolved | 18 | Connected support exists, but full requested acceptance was not established |
| No valid sampled generated support | 0 | All 36 artifacts have some valid sampled support; this alone is insufficient |

All 33 selected geometry failures exhausted the entry-proposal bound. Nine also exhausted candidate routes, three topology queries, and one supported nodes (overlapping counts). Caps include 48 legacy/192 expanded proposals, 20,000 supported nodes, 4,096 candidate routes, 160,000 topology rays and eight final approach builds. A preliminary admitted approach does not prove the final swept scaffold crossing succeeds.

Attribution is therefore: **three demonstrated selected spaces, two demonstrated scale-selection misses, and 31 unresolved generation-versus-interpretation cases**. No irreparable-generation count is established. The first cave browser failure adds a separate unexplained inspection/navigation failure despite an independently valid route and successful repeat.

Important remaining interpreter limitations are conservative full-projection entry exclusion, finite proposal coverage, cardinal structural rays, global width propagation (a “broad entrance” can impose broad interior paths), a thin-deck/void bridge definition, courtyard height reference, and incomplete per-predicate rejection diagnostics. A failed witness can mean the requested feature is absent, the operational definition is too narrow, or the search did not find it. These records cannot fully distinguish those possibilities.

## Evidence and verification

- [Locked choices and feature rankings](evidence/generated-space-interpretation-20260916/selections.json), [v1 summary](evidence/generated-space-interpretation-20260916/summary.json), [corrected summary with all 36 prompts and outcomes](evidence/generated-space-interpretation-20260916/corrected/summary.json).
- [Aggregated failure attribution](evidence/generated-space-interpretation-20260916/corrected/attribution.json), [21 controls, two references and one repeat](evidence/generated-space-interpretation-20260916/corrected/control-verification.json).
- [Original integrity inventory](evidence/generated-space-interpretation-20260916/original-integrity.json), [unchanged-source verification](evidence/generated-space-interpretation-20260916/final-integrity.json), [corrected freeze](evidence/generated-space-interpretation-20260916/corrected/method-freeze.json), [independent audit](evidence/generated-space-interpretation-20260916/corrected/independent-review.md).
- [Corrected restart verification](evidence/generated-space-interpretation-20260916/corrected/restart-verification.json): actual process restart, all 60 primary/control/reference/repeat identities and asset hashes retained, all 27 visited case journals preserved. Browser reload also showed the same destination and prior crossed/returned events.
- [Evidence manifest](evidence/generated-space-interpretation-20260916/manifest.json) binds both phases, every candidate assessment, browser overviews, successful/failed attempt telemetry, screenshots and method snapshots. Original large GLB/PLY files remain in `.runtime/reliability/candidates`; hashes bind them to these records.

Selection SHA-256: `a023b551f38752982a7f6f7b29d4c5e8010f4628762e8f4ee146ce888bdcb6c7`. Corrected freeze SHA-256: `e0e3ba360ad14f252986a4d26d3741920ceaa4da25bb47e2926b5da0f40b3881`.

`npm run check` passed (typecheck, 33 tests, production build). Passage tests passed 26 with one artifact-dependent regression skipped, and the passage build passed. Interpretation tests passed 33 with one opt-in large stress fixture skipped in the normal run; the large fixture was separately exercised during method development. Browser observations were independently checked against assessment/source identities and persisted journals rather than accepting recorder flags. All 36 corrected cases have retained browser overviews. No GPU validation or new generation is claimed.

## Decision

A material part of the old apparent unreliability was interpretation: **at least 37.5% of its failed candidates were recovered by automatic scale selection alone** under the same criterion, with browser proof. This does not resolve intent-faithful scene reliability. The final interpreter captures only three of five demonstrated topology-valid scale opportunities, and most remaining failures remain unresolved under conservative criteria and bounded entry search. Further diagnosis should expose entry and individual witness rejection traces and validate modifier scope before spending GPU time or calling these generation defects. No new gameplay or style work is justified by this slice.
