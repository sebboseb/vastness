# Authored approach outer-boundary diagnosis

Read-only snapshot, 2026-09-16. No assessor, navigator or source-cohort reruns and no source edits. This report inspects finalized `.ndjson.gz` files paired with completed mode assessments; partial traces were excluded. At snapshot time entry-prism had 34 completed selected assessments and 67 completed mode traces. `bridge-2-42` and `tunnel-2-42` had not completed selected assessments. The conclusions below are limited to the completed traces, not a final36-case claim.

**No executed seam check in this snapshot demonstrates the synthetic authored-start precision failure. Defer a margin correction as a known synthetic limitation, rather than adding a recovery phase without cohort evidence.**

## Hypothesis and discriminator

The independently reported synthetic case places the outermost player footprint exactly on the authored platform's outer edge because `length = startDistance + radius`. Floating arithmetic can make the reconstructed footprint point microscopically exceed length. The unchanged navigator then immediately returns `unsupported-footprint` at the initial approachStart with only7of9support samples; reverse travel may reach almost the same point successfully. Translating the identical synthetic geometry by0.1m changes that behavior. This is an authored support placement issue; it does not justify changing source geometry or navigator tolerances.

A matching trace would have a forward failure at the unchanged initial XZ position, invalid initial support with fewer than9footprint samples, and essentially zero backward footprint margin. A source-transition failure instead moves appreciably away from approachStart, retains a last valid9-sample support state, and fails while entering or leaving generated support. The latter observation alone does not prove an actual geometric gap: source-transition numeric behavior and physical geometry remain separate questions.

## Completed trace totals

Filter `pass = entry-prism`; the preserved baseline events must not be counted as new attempts. Of67completedmode traces,64execute the new pass and3return an earlier accepted route.

| Observation | Count |
|---|---:|
| New-pass projection starts |4,871|
| Starts with `abs(length − startDistance − .3) < 1e−12` |1,627|
| Completed clear prism proofs |347|
| Clear prisms with the footprint at the outer authored boundary |8|
| Executed forward seam checks |16|
| Executed reverse seam checks |16|
| Immediate forward or reverse failures at their respective initial XZ positions |0|
| Forward `support-gap-or-step` |15|
| Forward `unsupported-footprint` |1|
| Reverse `support-gap-or-step` |16|

Every executed seam pair uses the minimum2m authored approach and startDistance1.2m, leaving **0.5m** beyond the outermost player footprint. All32movement observations retain `support.valid:true` and9support samples at their last valid position. Forward travel before failure ranges0.9399300825–1.1953377267m. This cannot be the hypothesized missing outer support at the initial point.

The16pairs are cave-1-7 expanded4, corridor-1-7 expanded2 and legacy8, and tunnel-1-42 legacy2. Cave and corridor are already outside the31previously unresolved denominator; the two tunnel attempts remain unresolved source-transition failures, not identified authored-start errors.

## Concrete nonmatching failures

`entry-prism/candidates/cave-1-7/expanded.ndjson.gz`, SHA256 `d7806f174cc144bae5080f6bc54dd60b761c559d8316e1e0a368f23800cbf3a7`; source GLB SHA256 `a56bb24593ddd9164444ec54f03365f5e8712636a983ae6e50a82fa1f4b172bf`.

- Forward seq106824, proposal15:2, route288, is the only new-pass `unsupported-footprint` seam failure. Start `[-1.2963143348693844,1.7073229855735008,-6.210565739870071]`; last valid position `[-1.2963143348693844,1.7188242749300802,-5.2637411767616795]`. It moves0.9468245631083914m first. Last valid support has9samples, source triangle888071 and authored ID−1. Seam Z−5.010565739870071; authored length2m. This is near the source transition, with ample unused support behind the initial player.
- Reverse seq106825 also fails (`support-gap-or-step`) after0.14949861522764074m. It does not independently establish reversible traversal of this route.
- Additional pairs30:2 seq88074/88075,883:0 seq91056/91057 and27:2 seq116910/116911 likewise move before failure and have0.5m outer margin.

`entry-prism/candidates/tunnel-1-42/legacy.ndjson.gz`, SHA256 `fa306ffc6c52f1970137390a75c550573853671f044ae828167e1f1d6779c0b9`; source GLB SHA256 `ca0f3ceb9e7248fd493d597a5f715df12cc911c647b7e631c1586f32a9dc001e`.

- Proposal51:2, route2, seq698269/698270: forward starts `[2.4342543601989757,3.2285516215188967,-9.148740231990814]`, travels0.9399300825211192m toZ−8.208810149469695, then fails `support-gap-or-step`. Last valid support IDs−1and1014849,9samples. Seam Z−7.948740231990814. Reverse travels0.09894000868643538m before the same failure reason.
- Proposal126:2, route4, seq699514/699515: forward travels0.940628477718148m; last valid support IDs−1and1029608,9samples. Both directions fail near generated support. Both approaches leave0.5m beyond the outer footprint at their initial point.

Corridor references: expanded SHA256 `2d63e8e18def88cabb511b2beee4ea662415fbe1384b17256b0466e1f1654584`, forward sequences70466and83704; legacy SHA256 `ce5e543ff8a3eb449bd18589efa6784d6e0e4d9dd67dd179b3ecf632a9246b89`, forward sequences186994,207467,225948,241990,257527,275637,293144,308964. The reverse event immediately follows each. All preserve the same0.5m authored outer margin.

## Latent boundary placements that never reached seam checks

Eight completed clear-prism proposals have nominal zero outer margin. This demonstrates that the potentially fragile placement formula is exercised by real source inputs, but none reaches final forward/reverse movement in the saved traces. It does not demonstrate a current false-negative verdict or predict recovery.

| Case / mode | Proposal | projection-start seq | clear-proof seq | Authored length(m) |
|---|---|---:|---:|---:|
| bridge-1-42 expanded |1867:0|2938712|2938713|5.730249151587486|
| bridge-1-42 expanded |1419:0|2942456|2942457|6.188854880630970|
| bridge-2-7 expanded |2052:1|78373|78374|3.887063294649124|
| bridge-2-7 expanded |3200:1|308569|308570|3.888428376615047|
| bridge-2-7 expanded |1482:1|558088|558089|3.888223783671855|
| bridge-2-7 expanded |2638:1|796378|796379|3.889161860942840|
| doorway-2-42 expanded |52:3|185270|185271|4.830057157576083|
| large_open_interior-2-7 expanded |5173:3|130729|130730|2.035479930043220|

Trace hashes: bridge-1-42 expanded `dc97df0cf212c5673b312d825e3cebb36c7a47dd7bbbef90587ddb7514f8f202`; bridge-2-7 expanded `6752b48dfa37ea5fb4aed1d49df142f0188a4463b217283f2e9fb7650e416ce6`; doorway-2-42 expanded `38b8873e9422ba0d9f837542e0bcbf14231eebfd8241a8f452cf95f29706a516`; large_open_interior-2-7 expanded `7de28adec8fd308bd474e29ff5091d84ee7347a72839ba49de236004af64d3a8`.

## Disposition

Retain this as a synthetic-known authored-approach limitation. Do not classify any completed cohort failure as recovered or recoverable by this fix. No new correction phase is warranted solely by these traces. Further completed phase traces can be checked with the same exact-start/footprint discriminator without rerunning changed assessors.

If a later trace demonstrates this specific outer-boundary failure, the narrow correction to test would keep approachStart, source seam, physical radius, original source geometry and immutable navigator unchanged; add a small exterior-only support margin such as0.01m beyond `startDistance + radius`, prove the entire resulting longer prism clear against original triangles, and reject rather than clamp if the10m maximum would be exceeded. Preserve predecessor successful paths and test translation sensitivity, the10m boundary, thin obstacles in the added strip, sealed holes and real source gaps. Extending support backward must never extend authored support inward across a generated gap. That proposal is deferred, not implemented or evaluated here.

Additional read-only arithmetic on the eight saved starts: all eight pass body prescreen (seq2938752,2942495,78414,308610,558129,796419,185312,130771 respectively). The four bridge-2-7 proposals reconstruct the outer cardinal footprint1.3322676295501878e−15m beyond the authored length using the saved coordinates; the other four reconstruct exactly at length. This is a latent outer-support predicate risk on real inputs, not an executed failure. The bridge proposals evaluate208,241,230and216route candidates respectively before failing upstream topology; large_open_interior-2-7 proposal5173:3 evaluates333candidates; the other three have no eligible candidate routes. None reaches final seam movement. An exterior margin cannot by itself cure their recorded topology/search failures, so the deferred disposition is unchanged.

## Final-completion addendum — all36 entry-prism cases

The phase is now complete:36selected assessments,70mode traces,3geometry passes,0recoveries and0regressions against baseline. The original snapshot already contained bridge-2-42 expanded; the three remaining completed modes are bridge-2-42 legacy and both tunnel-2-42 modes. All four traces below were inspected and their compressed-byte SHA256 verified against their mode assessments. No assessor was rerun.

| Final cases / mode | New projection starts | Clear prisms | Boundary-aligned starts | Clear boundary-aligned prisms | Final seam checks |
|---|---:|---:|---:|---:|---:|
| bridge-2-42 expanded |1|1|0|0|0|
| bridge-2-42 legacy |1|1|0|0|0|
| tunnel-2-42 expanded |113|2|60|0|0|
| tunnel-2-42 legacy |12|2|0|0|0|

Updated full-phase new-pass totals are67prism passes,4,997projection starts,1,687boundary-aligned starts,352clear prisms and8clear boundary-aligned prisms. The4,997projection total is independently confirmed by subtracting the frozen baseline event counts from completed entry-phase mode counts. Final seam totals remain16forward and16reverse, with **zero immediate start-position failures**. The late two cases add no seam observations and no clear boundary-aligned approach.

Exact final trace references under `entry-prism/candidates/`:

- `bridge-2-42/expanded.ndjson.gz`: SHA256 `b2c3da6c011bb312d95c0799de24c3bdceaaf3cc078e1385cda8cc114c8e1a12`,3,151,392events. New-pass topology-query exhaustion seq3128389 (proposal0:0,route438), pass completion3151390. Final diagnostics1entry,443candidate routes,160,000rays,0approach builds.
- `bridge-2-42/legacy.ndjson.gz`: SHA256 `3d1791a15ac2e9250d71e9c62fe0dd9c375402db5befd7257d4cc0a4e8d0fe2c`,4,245,601events. Exhaustion3166472 (proposal0:0,route576), completion4245599. Final diagnostics1entry,886candidate routes,160,000rays,0approach builds. Both bridge traces bind source GLB `08e209f8cc1ba52619cfd02edc04abc6d4522232c238eb19998801bfb2a16e00`.
- `tunnel-2-42/expanded.ndjson.gz`: SHA256 `ad0b52d0defe15196491c674e0ede80629cad6ce384b091110f5807550d00247`,1,158,013events. Pass completion1158011:192entry attempts,3,788candidate routes,51,649rays,0approach builds; entry selection cap remains exhausted.
- `tunnel-2-42/legacy.ndjson.gz`: SHA256 `7641d519103eb3a5dc08b94bdef6aba92f4dafb453a075a23301aad8efd11f27`,1,518,744events. Candidate cap seq1518704 (proposal636:0,route4096), completion1518742:12entry attempts,4,097candidate counter including the unevaluated next candidate,52,793rays,0approach builds. Both tunnel traces bind source GLB `57449dddb406c34b47e052c63fae7c8e3c3f974c1949cc3f49f7af6e51e38faf`.

**The final two cases do not change the disposition: defer the authored outer-margin correction.** Their observed censoring is upstream of seam movement, so no new cohort evidence links the synthetic precision bug to a failed verdict.
