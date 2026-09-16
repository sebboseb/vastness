# Interpreting the frozen TRELLIS spaces

Study in progress on `codex/generated-space-interpretation`, GitHub #20. No GPU generation is allowed in this slice. This report will be completed from the locked 36-candidate evaluation; no success rate is asserted before those measurements.

## Question and controls

How much apparent generation failure is recoverable by interpreting unchanged geometry? The cohort is the same 36 original results (nine categories, two prompts and two seeds per category). It is a retrospective exploratory sample, not an unseen validation set. Original GLB/PLY, imported coarse-color scene, original intents and previous study evidence are hash-pinned. Nothing is repaired, removed or regenerated. The corrected original-triangle navigator, player dimensions and renderer remain fixed.

## Predeclared method

The selector receives only mesh arrays and scales `[6,10,12,16]`. It estimates human architectural proportions from sampled support, overhead and paired-wall distances, with an explicit peaked prior rather than always preferring enlargement. There is no known physical-scale ground truth. All 36 choices are persisted before any outcome evaluation. Details and limitations: `scripts/interpretation/scale-method.md` on the runtime branch.

Original intent and its semantic envelope determine geometric requirements. Courtyards, apertures, bridge decks, covered interiors and enclosed passages have separate witnesses. A supported rooftop or a route beside an arch cannot alone satisfy those requests. This lexical interpretation is conservative and cannot fully resolve modifier scope, alternatives or general natural language.

Expanded entry search proposes local boundaries across support layers, tests reversible connections, and requires scaffolding to lie outside source projection with a clear projected corridor to beyond the source bounds. That conservative exterior condition prevents spawning inside a floor hole. It can also miss legitimate approaches beneath overhangs or around bends. Both search modes retain hard resource limits; failure is not a proof of geometric impossibility.

## Measurement design

- Previous corrected scale6 strict passage endpoint is the historical reference.
- Automatically selected scale with the old strict assessor measures selection under that same endpoint.
- Selected scale with intent criteria and legacy-style proposals is an intermediate ablation. Shared safety checks and new witness/search budgets mean this is not a pure criterion-only intervention.
- Selected scale with intent criteria and expanded proposals is the final automatic interpretation result.
- All four scales under the final criteria/search form a bounded opportunity reference, evaluated only after the choices are locked. They never substitute for the selected scale in browser acceptance.

Every eligible selected result must enter, traverse at least3m on original generated support, return and preserve source/assessment identity and visits across service restart. Saved browser telemetry is checked independently of recorder success flags. The existing inspection controls are reused; no new interaction or style system is added.

Report usable-scale yield out of36, capture of available successes, actual browser success, category counts and remaining uncertainty. A missed selected scale with another passing scale is demonstrated interpretation error. Exhausted search or an unverified exterior connection remains unresolved interpretation/navigation evidence, not a demonstrated generation defect. Changed semantic criteria must be reported separately from better discovery under a fixed criterion.
