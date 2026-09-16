# Independent compiler outcome notes

Read-only audit of frozen saved records in `/Users/seb/Documents/ChatGPT/vastness/.runtime/space-diagnosis`. Written only in the diagnosis-criteria worktree. No assessor, compiler experiment, retuning, source edit or GPU work was run. Trace references below are relative to the root evidence directory, not this worktree. Sequence numbers are zero-based.

## Completion and denominators

Walkway is complete for all 36 candidates: exactly `corridor-2-7` and `corridor-2-42` change criteria relative to coverage. All 36 selected geometry verdicts are unchanged, including three passes. This fixes a compiler vocabulary omission in two inputs, with zero whole-case recoveries and zero regressions.

Doorway-scope is now complete for all 36 candidates. Exactly `chamber-1-7` and `chamber-1-42` change criteria relative to walkway; both remain failed. All 36 selected geometry verdicts are unchanged: **3/36 passed, zero recoveries and zero regressions**. The unchanged passing cases are `narrow_passage-1-7`, `narrow_passage-2-7` and `cave-1-7`. Among the 31 previously unresolved cases, this phase demonstrates **0/31 whole-case recoveries**; it does not classify those cases as irreparable generation failures.

For all 34 cases whose criteria do not change, the complete selected assessment matches the preceding phase after removing only `diagnosisFreeze`, `traceSummary`, `elapsedMs` and the two metric timings `buildMs`/`assessmentMs`. All 36 intent traces were compared as well as all 36 selected assessments. All 47 current method files match the hashes declared in the doorway-scope freeze, whose timestamp is `2026-09-16T13:25:16.559Z` and whose selection hash remains `a023b551f38752982a7f6f7b29d4c5e8010f4628762e8f4ee146ce888bdcb6c7`.

These are geometry-assessment counts. This read-only audit performed no browser run and does not overwrite the prior cave first-attempt browser failure or equate later repeats with primary success.

## Walkway correction

The two corridor-2 intents explicitly say covered walkway between brick walls. Their original unsupported requirement array becomes `[enclosed-passage]`; physical dimensions, cover/wall/width requirements, source hashes, transforms and locked scales remain unchanged. Exact normalized spans are covered `[9,16)`, walkway `[17,24)`, walls `[39,44)` and phrase `[3,44)`. Both final traces record `walkway:0` applied and `walkway:1` corrected criteria.

The compiler's repaired eligibility is not geometry success:

- `corridor-2-7`, scale 10: final fair expanded/legacy passes consider 4,063/2,583 routes, all rejected at enclosed-passage. No seam is built. In `walkway/candidates/corridor-2-7/expanded.ndjson.gz`, seq714186 fails opposing width against 2.4 m; seq714235 passes that width but fails the broad supported region; seq714430 rejects route 1 before explicit cover. Legacy seq477466/477516/477714 corroborate those gates. The broad adjective describes the path; these failures do not justify removing its width requirement.
- `corridor-2-42`, scale 6: passage and cover witnesses qualify expanded route 11 (seq68645/68659/68661), but forward and reverse seam attempts fail `support-gap-or-step` (seq68662/68663; rejected seq68664), ending 0.6351191186543668 m and 1.4168041877674336 m short. Legacy route 21 likewise qualifies at seq49407/49421/49423 then fails both movements at seq49424/49425, ending 0.8326441279939676 m and 1.4203929242250073 m short (rejected seq49426). These are latest fair-pass events. Earlier passes repeat qualified/rejected attempts; they are not additional successful cases.

The detailed root note `.runtime/space-diagnosis/compiler-outcome.md` retains predecessor unsupported events and all eight corridor predecessor/current trace hashes. This audit also compared all 36 coverage/walkway selected criteria and verdicts from their completed records.

## Doorway scope: exact criterion change and safe consumption

Both `chamber-1-7` and `chamber-1-42` contain normalized `broad[42,47)` attached to `doorway[48,55)`. `doorway-scope:0` records the direct text binding without uncertainty; `doorway-scope:1` records the corrected result. Only global minimumWidth changes from 2.4 to 0.6, with `widthByTopology:{'doorway-crossing':2.4}` added. Supported status, topology order `[enclosed-passage,doorway-crossing]`, evidence, conjunctive ambiguity, roof/wall flags and physical dimensions are unchanged. Source SHA, transform and navigator options were compared exactly to walkway; both locked scales stay 6.

| Case | Original source SHA-256 |
| --- | --- |
| chamber-1-7 | d526aec6874c3a1259fe4af64beb770ab96888df3909b58f4e0bd7f79e2ad464 |
| chamber-1-42 | 2b6e56636c72bdccdd387c4a30a7e98526d15efeab66d47c396287f81d7a8a76 |

All four scoped attempts bind diagnosisFreeze `641ff273558a427b72ec1bbf10b88415c308ce70ab1857f0f8ad72b6bfee1f64`. Each recorded conservative-predecessor assessment-start uses global width 2.4 with no override field; only the appended scoped-coverage assessment-start uses global 0.6 plus local 2.4. No unmodified predecessor is observed receiving the smaller global field.

### chamber-1-7: topology advances, seam remains failed

The immediately preceding walkway fair pass rejected all 742 expanded and two legacy routes at enclosed-passage; neither mode built a seam. Representative predecessor events: expanded seq157977 and legacy seq45183, each leaving doorway and explicit-cover unexecuted.

The new scoped expanded pass considers 613 routes: 590 reject enclosed-passage, 20 reject doorway-crossing and three qualify all topology witnesses but fail seam. Scoped node predicates have no broad-region failure: 16,276 observations fail opposing walls and 156 pass. These are repeated node observations, not independent candidate counts.

At `doorway-scope/candidates/chamber-1-7/expanded.ndjson.gz`:

- Seq243299 records route 1's enclosed-passage witness at global width 0.6, continuous distance 1.0000000000000002 m and roof coverage 1. The route now reaches the aperture gate; seq243303/243306 record missing flank failures using local threshold 2.4, and seq243511 rejects doorway-crossing with explicit-cover still unexecuted.
- Route 7's aperture witness at seq250852 measures 4.954194919030584 m against `declaredMinimumWidth:2.4`, opposite-side signed distances 0.8000000000000003/-1, roof coverage 1 and open space on both sides. It references original flank triangles 972357 and 716288 plus original roof triangles. Seq250868 records all three witness kinds: enclosed-passage, doorway-crossing and explicit-cover.
- Route 27's aperture at seq255008 measures the same width. Route 75 at seq260663 measures 4.954170685425696 m, also with declared minimum 2.4. The local aperture requirement was retained quantitatively, not discarded.

All three qualified expanded routes fail both seam directions:

| Route / proposal | Forward seq / remaining m | Reverse seq / remaining m | Recorded movement failure |
| --- | --- | --- | --- |
| 7 / 953:3 | 250869 / 1.4228265790914998 | 250870 / 2.305960317837949 | support-gap-or-step |
| 27 / 947:3 | 255025 / 1.422910016166921 | 255026 / 2.3060955434429404 | support-gap-or-step |
| 75 / 971:3 | 260680 / 1.4228465251472535 | 260681 / 2.305992644204169 | support-gap-or-step |

For route 7, the forward movement starts at `[-0.21155693531036368,1.6622045410264195,4.19955299794674]` toward `[-0.21155693531036368,1.8223539047778035,1.7954667091369636]`. Last-valid support has authored `-1` and original triangle1232991. Last-valid support does not override the failed swept move or establish a valid seam.

The scoped legacy pass considers two routes. Both now pass enclosed-passage and fail doorway-crossing; neither reaches seam testing. Seq60125 records route 1's one-metre covered passage witness. Aperture seq60129 (left flank), seq60176 (opposite crossing sides) and seq60236 (right flank) remain failures; seq60337 rejects doorway-crossing. This is a stage change, not a whole-route acceptance.

Expanded returned counts fall from 742 to 613 routes because the scoped pass reaches seam-build attempts and uses the inherited per-entry stopping behavior after a seam failure. This is not evidence that the frozen prior search was discarded: the complete conservative predecessor still executes first with its original width, and its trace remains present. Counts from the returned final pass must not be mistaken for total multi-pass work.

### chamber-1-42: compiler changes, geometry remains censored by entry screening

Neither mode reaches a component, route candidate, topology query or seam build. The scoped expanded pass tries 192 proposals: 187 reached prism screens reject and five have no support edge. Legacy tries 48, all rejected by the prism. This reproduces the predecessor's entry-stage outcome; a scope fix cannot establish a usable aperture where no entry reaches topology assessment.

Expanded seq64574 records proposal `0:0` blocked by original triangle115464 inside the support/body prism; seq64576 records first failure `source-entry-prism`, leaving body prescreen and final seam unexecuted. The triangle's Y range is approximately 5.73977–5.76248, clipping the support band `[5.751104273714782,6.016104273714782]`; it is not merely a detached overhead triangle. Legacy seq60295/60297 records the same representative proposal and blocker. These first blockers do not prove that all possible exterior access is impossible.

## Scope trace integrity anchors

These eight complete gzips were read end-to-end, SHA-256 recomputed against traceSummary, event count matched and seq checked contiguous from zero. No partial trace was read.

| Phase / case / mode | Events | SHA-256 |
| --- | ---: | --- |
| walkway / chamber-1-7 / expanded | 223637 | 51d234cc33e490adf5895c89e9dcb353eadfffc102c2af919a2f00d8f940eb6a |
| walkway / chamber-1-7 / legacy | 45247 | 55a51a120759d1918da6c0ca04c8a2258ba7bad10ec617850793559beab79deb |
| walkway / chamber-1-42 / expanded | 55328 | 06af259153605d20c400723c678ed5dda8e0243177d046cb88d577a2a5d399b2 |
| walkway / chamber-1-42 / legacy | 46983 | 70f654bfc00b766c02032df563f2aae4678fc2c9dacdeabfb8a112b6a29f7d37 |
| doorway-scope / chamber-1-7 / expanded | 300553 | c55e560b4684564ed410f04b3f16154226b7bb81bf71d63e8db3f16f1a58ecc0 |
| doorway-scope / chamber-1-7 / legacy | 60470 | 4ac2d693ec41d17b29b0456fe66c016d549f2c44cb3247abe387739149d5c7ca |
| doorway-scope / chamber-1-42 / expanded | 73836 | 94302a82499163c1c558bb8f47cf416aaee80765651e256dd0925a574b05ad0f |
| doorway-scope / chamber-1-42 / legacy | 62663 | 933281a541059b4ad4fbc4dcb38adde09acf2ab9bbc2ca6585124adeb3812f67 |

## Bounded implications

A compiler rejection condition can be incorrect even when repairing it does not produce a complete accepted case. The saved traces now distinguish that repair from subsequent quantitative topology and seam failures. They do not establish irreparable geometry, a new successful generated interior, or a model-comparison verdict. Movement failures are recorded reasons, not a proved diagnosis of their underlying geometric/numerical cause. No additional correction is proposed or tuned from this audit.
