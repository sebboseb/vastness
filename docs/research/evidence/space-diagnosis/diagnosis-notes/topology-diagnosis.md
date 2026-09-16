# Bounded topology-witness diagnosis

Read-only evidence audit, 2026-09-16. **No additional topology correction is justified by this snapshot.** In particular, defer changes to courtyard ground-relative elevation and doorway widening. Frequent rejection is not evidence that either threshold is wrong. No assessor, cohort, geometry, compiler, navigator, or GPU work was run; this report is the only file written.

## Scope and integrity

The audit read all 36 baseline summary rows to locate executed topology stages, then streamed both completed modes for all four courtyard cases, all four doorway cases, and corridor-1-7. It also streamed both completed entry-prism modes for courtyard-1-7, courtyard-1-42, courtyard-2-7, doorway-1-7, doorway-1-42, and corridor-1-7. These are 30 complete mode traces. Later cases and later phases are outside this fixed audit; no partial trace was read. For entry-prism, counts below include only events with `pass: entry-prism`, excluding the repeated predecessor pass.

Each compressed trace's SHA-256 matched its saved attempt's `traceSummary.sha256`; sequence numbers were checked in order from zero and the terminal event was `result:complete`. Baseline attempt metadata records historical parity. Counts are repeated route/node observations, not distinct candidate failures or recovered cases. Candidate labels select explanatory evidence only and must not enter algorithms. Paths below are relative to `.runtime/space-diagnosis/`.

## Courtyard elevation is unexecuted, not an observed false negative

The frozen courtyard witness checks open sky, at least three cardinal boundary hits, a broad open supported region, then foot height within 0.75 m of the global source minimum. In the inspected traces **no courtyard node reaches the elevation check**. Every evaluated node fails an earlier predicate; courtyard-2-42 never reaches topology in the baseline at all.

Baseline totals, combining expanded and legacy:

| Case | Open-sky first failures | Boundary first failures | Broad-region first failures | Elevation checks executed |
| --- | ---: | ---: | ---: | ---: |
| courtyard-1-7 | 167,223 | 11,010 | 10,242 | 0 |
| courtyard-1-42 | 16,587 | 183,720 | 0 | 0 |
| courtyard-2-7 | 15,018 | 6,013 | 0 | 0 |
| courtyard-2-42 | 0 | 0 | 0 | 0 |

The completed entry-prism passes retain the same first-failure totals for courtyard-1-7 and courtyard-2-7. Courtyard-1-42 has 16,794 open-sky and 187,975 boundary failures after additional routes; elevation remains unexecuted.

Concrete baseline observations:

- `courtyard-1-42/expanded.ndjson.gz`, seq6460–6461: route1/node622 at foot `[-0.6080373,0.0297763,2.3937222]` has no roof hits but only one boundary hit, original triangle371515 at 2.6828887 m. Broadness and elevation are explicitly not evaluated. Cardinal misses alone do not prove that a rotated or differently shaped courtyard is absent, but this trace also supplies no alternative enclosing-boundary certificate.
- `courtyard-1-7/expanded.ndjson.gz`, seq21291–21293: route33/node1339 has no roofs and three boundary triangles666713,953751,183037. Its first 1.2 m radial movement stops after about0.35 m with `unsupported-footprint`, 0.85 m short of the endpoint. Other radial probes and elevation are unexecuted. The last valid footprint contains original support triangles967029,986197,979260,967015,959249,954670,959271,967044,979282. This is concrete missing support for that tested broad region, not evidence that source-relative height rejected a valid courtyard.
- `courtyard-2-7/expanded.ndjson.gz`, seq10736–10737: route21/node102 has open sky and zero boundary hits; neither broadness nor elevation runs. The covered-arcade phrase does not establish a demonstrated roof-scope false negative because the explicit-cover obligation is later in the route witness sequence.

Using a global source minimum could conceptually misclassify an elevated courtyard above unrelated low fragments, but that scenario is not observed at the first failing predicate here. Do not delete or raise the 0.75 m guard. A future replacement would first need an actually elevation-blocked route and an original-triangle local ground/enclosure certificate that distinguishes a courtyard from an exposed roof, balcony, or detached slab; preserve broad original support, exterior reachability and every movement check. This audit supplies no such certificate.

## Doorway widening does not explain the doorway-category failures

The doorway witness first requires nine overhead footprint hits, then original flanks and requested aperture width, then opposite-side crossing, then wider/open regions on both sides. **None of the four doorway-category candidates reaches the widening predicate in either baseline mode.**

| Case | Baseline observation |
| --- | --- |
| doorway-1-7 | 381,633 repeated aperture-node rejections, all at roof coverage; zero flank/widening checks |
| doorway-1-42 | No candidate topology routes in either mode |
| doorway-2-7 | 265,754 roof-coverage rejections; 12,349 missing-flank and 12,349 aperture-width rejections |
| doorway-2-42 | 140,683 roof-coverage rejections; 3,143 missing-flank and 3,143 aperture-width rejections |

The two doorway-2 seeds explicitly request a **broad human doorway**, so the 2.4 m width obligation applies locally to the requested opening. Across executed paired-flank observations, seed7 measures1.3657809–2.0728409 m and seed42 measures0.8509619–0.8509668 m. Lowering the threshold would weaken the requested broad-opening obligation. These are measurements at tested nodes/axes, not proof that no qualifying opening exists elsewhere.

Source-bound examples:

- `doorway-2-7/expanded.ndjson.gz`, seq12337: route33/node678, axis `[0,0,1]`, flank triangles568012 and245358 at0.9602595 and0.4117183 m, combined1.3719778 m below2.4 m. Crossing and widening are unexecuted. The largest measured width is2.0728409 m, node475, seq226957.
- `doorway-2-42/expanded.ndjson.gz`, seq8790: route41/node36, flank triangles770802 and327011 combine to0.8509619 m. Again, widening is unexecuted.
- `doorway-1-7/expanded.ndjson.gz`, seq61458–61459: route531/node453 has one overhead hit, triangle662714 at5.2233483 m, and sides `[triangle656584,null,null,triangle288161]`. The roof count is1/9; flank crossing and widening are explicitly unexecuted. Across this mode,180,469 observations have zero overhead hits and305 have one. Legacy has200,849 with zero and10 with one. The entry-prism correction pass preserves these exact roof-count distributions.

A nine-ray footprint may theoretically overconstrain a thin lintel compared with the ordinary meaning of an arch/doorway. The recorded lone high triangle, however, does not prove a connected lintel spanning two original jambs, a qualifying width, or an actual crossing. Do not replace nine hits with one or remove the roof witness based on this evidence. A future quantitative alternative would need an original connected transverse lintel/jamb certificate and a crossing axis, with negative fixtures for unrelated overhead fragments, a continuous corridor without an aperture, missing jambs, a narrow opening, body obstruction and unsupported crossing. No candidate recovery or implementation is authorized by this hypothesis alone.

## The only baseline widening case already passes that witness on some routes

The complete baseline summaries contain `aperture-wider-regions` only for corridor-1-7: “A long straight corridor with parallel stone walls, level floor, overhead roof and an open doorway at each end.” This is one of the previously proven scale misses and is **outside the31-unresolved denominator**.

Expanded records1,174 widening failures and2 successes; legacy records8,320 failures and8 successes. The completed entry-prism correction passes have the same counts. Thus there is concrete widening rejection evidence, but it does not establish that widening prevents this candidate from passing the full endpoint.

- Baseline expanded seq11348, route1/node90: the first region has flank distances2.2643210+0.6086489=2.8729699 m, below the aperture-relative required3.4433045 m. The other side is unexecuted. This can describe an interior corridor cross-section rather than a doorway; the trace does not independently establish a false-negative aperture there.
- Baseline expanded seq24750, route62/node605: both surrounding regions pass; seq24780–24782 then fail forward and reverse seam movement with `support-gap-or-step`, respectively0.6471630 and1.4436714 m short. A successful doorway witness therefore exists on a route rejected for a different, physical reason.
- Baseline legacy seq31514, route108/node589 likewise passes widening. Seq31542–31544 record the same seam failure class. All2 expanded and8 legacy final approach builds are counted as authored-to-generated seam rejections.
- Entry-prism repeats the failed/successful widening examples at expanded seq57034/70436 and legacy seq167499/186966. This does not turn the historical selected-scale miss into a topology false-negative count.

Dropping widening would allow ordinary covered corridor sections to masquerade as doorways. Any future replacement must positively identify a bounded aperture or terminating wall/lintel structure in original geometry and prove the requested crossing; simply accepting more constant-width sections is not a safety-preserving semantic replacement. Current traces do not establish the missing certificate.

## Disposition

Defer topology threshold changes. Retain all31 unresolved classifications unless another independently frozen correction proves full geometry and browser acceptance. The known local doorway modifier-scope issue is documented separately in `modifier-diagnosis.md`; this report neither duplicates its proposed correction nor supplies a new recovery claim. Coverage limits remain censored search observations as documented in `coverage-diagnosis.md`.

Useful next evidence would be a first-failure elevation record after all courtyard predicates pass, or an independently identified original aperture rejected solely by widening/lintel representation. Any ensuing correction must preserve quantitative semantic obligations, the unchanged physical navigator, original support, exterior proof, bidirectional seam traversal, selected scale and fresh browser verification. No geometry repair or frequency-driven threshold relaxation follows from this audit.

## Selected trace integrity anchors

Full hashes for concrete examples and post-entry comparisons; every other scanned trace was also checked against its attempt manifest as described above.

| Trace | SHA-256 |
| --- | --- |
| baseline/candidates/courtyard-1-7/expanded.ndjson.gz | 0963d47bf5b02048fa1d6c24139c24eccaee2aee58e63de507cd22b17b0c3365 |
| baseline/candidates/courtyard-1-42/expanded.ndjson.gz | dac212c3b2748bd1e87a9e7a49b4467d1139e737e7cf7319fa401410f564f6eb |
| baseline/candidates/courtyard-2-7/expanded.ndjson.gz | 92e406e30b486973c8231017eaa44190b0fef9c40c3f94150b50d55bdd214515 |
| baseline/candidates/doorway-1-7/expanded.ndjson.gz | fdb9ab8135b9ae91de4469352e1c06064cfc75a768216e5426259660527dbc63 |
| baseline/candidates/doorway-2-7/expanded.ndjson.gz | 6d4728f21e436e41560fd232cf716c09dd710005741e8a6b6018ce3501639a09 |
| baseline/candidates/doorway-2-42/expanded.ndjson.gz | d4a492cd8c158ab21c3ba3e4cb9fc6f1c11d28bf3a162a56b37d37638f1ead61 |
| baseline/candidates/corridor-1-7/expanded.ndjson.gz | b457ca8bfbe87555e2756918b9cb7d1fc013f73f607ad1c2ba710e9701f94f0e |
| baseline/candidates/corridor-1-7/legacy.ndjson.gz | 40c38316df8a20065d32ec9bfe97ed84a095e68ed685541ccea1068591af2a21 |
| entry-prism/candidates/courtyard-1-42/expanded.ndjson.gz | 37885db8a13ff66aa028a69c4a1902d436872ddbdf22a75aa61a223264d9bc18 |
| entry-prism/candidates/doorway-1-7/expanded.ndjson.gz | 0977bbcd5396a38e3b7571ae6b12ee31598e2c450e67a6048bf09c40845f5367 |
| entry-prism/candidates/corridor-1-7/expanded.ndjson.gz | 2d63e8e18def88cabb511b2beee4ea662415fbe1384b17256b0466e1f1654584 |
| entry-prism/candidates/corridor-1-7/legacy.ndjson.gz | ce5e543ff8a3eb449bd18589efa6784d6e0e4d9dd67dd179b3ecf632a9246b89 |
