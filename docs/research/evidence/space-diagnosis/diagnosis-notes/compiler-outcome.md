# Compiler correction outcomes

Read-only targeted audit, 2026-09-16. Both changed walkway cases have complete expanded, legacy and selected records. No assessments, new corrections, source edits or geometry changes were run. Doorway-scope outcomes have not been inspected; that phase is reserved for a later appended audit after freezing and completion.

## Walkway alias: omission fixed, zero whole-case recoveries

The compiler omission is fixed for **2/2 changed cases**, `corridor-2-7` and `corridor-2-42`. Both now compile to the existing enclosed-passage requirement and reach actual geometry assessment. **Whole-case recoveries are 0/2 changed cases**: both selected assessments remain failed after expanded and legacy search. This targeted note does not claim a complete 36-case phase aggregate.

The immediate predecessor is `coverage`, whose compiler was still the observational unchanged compiler. Its four corridor attempts report “Intent has no supported topology criteria.” with zero tested entries, route candidates, topology queries and seam builds. Their final fair-pass completion events are:

| Candidate | Expanded seq | Legacy seq |
| --- | ---: | ---: |
| corridor-2-7 | 32529 | 49362 |
| corridor-2-42 | 23466 | 26022 |

Paths are `coverage/candidates/<id>/<mode>.ndjson.gz`, relative to this report's directory. Earlier baseline evidence remains immutable: baseline completion seq10840/16451 for seed7 and seq7819/8671 for seed42 documents the same unsupported stopping condition.

### What changed, and what did not

The identical normalized intent is: “an empty covered walkway between brick walls, broad straight path, low arched ceiling and flat continuous paving.” In both `walkway/candidates/<id>/intent-trace.json` records, `walkway:0` applies the alias with no uncertainty markers. Exact half-open normalized UTF-16 spans are covered `[9,16)`, walkway `[17,24)`, walls `[39,44)`, and the evidence phrase “empty covered walkway between brick walls” `[3,44)`. `walkway:1` records supported true, required `[enclosed-passage]`, new positive text evidence and removal of the obsolete no-topology notice. The retained original trace still records the earlier unsupported decision; it is not the final corrected result.

The quantitative requirements and physical objects were compared for exact equality between coverage and walkway: openSky false, covered true, opposingWalls true, minimumWidth 2.4; radius0.3, height1.8, eyeHeight1.65, maximumStep0.25, maximumSlope35, displacement3 and reversible true. The “broad straight path” request remains constrained. The raw intent, semantics, source SHA, transform and navigator options are also identical. No same-named method changed hash between the two freezes; both name `routes-coverage.ts` as route module and share selection hash `a023b551f38752982a7f6f7b29d4c5e8010f4628762e8f4ee146ce888bdcb6c7`.

| Candidate | Locked scale | Original source SHA-256 |
| --- | ---: | --- |
| corridor-2-7 | 10 | 3deff24d4be94dee2bc86c7bc6d3091f3ebc6ec2bf0c1d51aad186022ed87f00 |
| corridor-2-42 | 6 | 79b792cfba58bb085aa025625e66ad170eaf5d21cecf1c18f4ed654f523345fe |

Coverage attempts bind diagnosisFreeze `11eda9be71cd8e43f0fb0c6e71cb62a21c1952c81a4e5fe9d0c2292bb01c9ed2`; walkway attempts bind `a4da4c9e46d361f012f200fd03d6fb0747fb623a6ee880f3accb4bde655e2cbe`. Freeze records were inspected for shared-method equality; this is not a claim that the entire unrelated cohort was re-audited.

### corridor-2-7: retained width predicates reject all considered routes

The final fair pass now considers 4,063 expanded routes and 2,583 legacy routes. Every one rejects enclosed-passage; no route reaches seam construction. Across all three evaluator passes, there are 11,479 expanded and 7,394 legacy route-candidate observations, all rejected at topology. Counts repeat routes/nodes and are not independent geometric examples.

Exact fair-pass predicate counts:

| Mode | Opposing-wall-width first failures | Broad-supported-region first failures | Passed node predicates | Seam builds |
| --- | ---: | ---: | ---: | ---: |
| expanded | 126438 | 17410 | 0 | 0 |
| legacy | 73510 | 16239 | 0 | 0 |

Representative saved events in `walkway/candidates/corridor-2-7/expanded.ndjson.gz`, all `pass:coverage-round-robin`:

- Seq714186, route1/node1019: opposing-wall-width fails. Side distances `[null,null,0.5446706297668995,1.207623353008066]` cannot satisfy the retained 2.4 m threshold. Broad-region and roof predicates are unexecuted.
- Seq714235, route1/node1013: opposing width passes with `[null,null,5.275944693547002,2.7783243096576253]`, then broad-supported-region fails at minimumWidth2.4. Required roof is unexecuted.
- Seq714430: route1 rejects enclosed-passage; explicit-cover remains unexecuted. Seq1071601 completes the failed fair pass.

Legacy corroboration: seq477466, route1/node20, passes opposing width `[1.8022521272801855,0.9487095732603623,null,null]` but fails broad-supported-region; seq477516/node111 fails opposing width; seq477714 rejects route1 before explicit-cover; seq702589 completes failure.

Both returned fair-pass diagnostics record entry-proposals exhausted. This is still bounded-search failure, not proof that the artifact has no possible valid route or an irreparable generation defect. Because the adjective describes the path itself, this evidence does not justify deleting width as a scope fix.

### corridor-2-42: topology witnesses are found, but reversible seam fails

The final fair pass considers 11 expanded routes and 21 legacy routes. In each mode, one route satisfies the enclosed-passage and explicit-cover witnesses, then fails both forward and reverse seam movement. The same candidate is also topology-qualified and seam-rejected in the two predecessor passes. Those six qualified-attempt observations across modes/passes are not six distinct traversable successes.

Expanded `walkway/candidates/corridor-2-42/expanded.ndjson.gz`, fair pass:

- Seq68645 records route11 enclosed-passage witness: continuousDistance1, minimumRoofCoverage1, maximumRoofHeight2.5482539721161217, declaredMinimumWidth2.4, broadCenterlineDiameter2.4, minimumBoundaryDirections2.
- Seq68659 records explicit-cover, continuousDistance1.0000000000000004 and roof coverage1. Seq68661 marks route11 topology-qualified.
- Seq68662, proposal `1072:3`: forward seam from `[-0.20912880897521946,1.6612282603018065,4.205578583478928]` toward `[-0.20912880897521946,1.7077438465440096,2.593353128433228]` is blocked with `support-gap-or-step`, ending 0.6351191186543668 m short. Retained last-valid support references authored `-1` and original triangle786706.
- Seq68663: reverse is also blocked with `support-gap-or-step`, ending 1.4168041877674336 m short. Seq68664 records seam-rejected.

Legacy `walkway/candidates/corridor-2-42/legacy.ndjson.gz`, fair pass:

- Seq49407 records route21 enclosed-passage witness with continuousDistance1, roof coverage1, maximumRoofHeight2.534675788111097 and declaredMinimumWidth2.4. Seq49421 records explicit-cover and seq49423 qualifies the route.
- Seq49424, proposal `1065:3`: forward movement reports `support-gap-or-step`, 0.8326441279939676 m short; retained last-valid support references `-1` and original triangle786707.
- Seq49425: reverse reports the same reason, 1.4203929242250073 m short. Seq49426 rejects the seam.

The movement's retained support object is last-valid state; its `valid:true` and null support reason do not override the movement's `blocked:true` and `support-gap-or-step`. These records establish failed movement, not whether its underlying cause is mesh geometry, conservative support policy or a numerical issue. They are not the separately observed synthetic far-approach `unsupported-footprint` start failure. Both returned fair-pass diagnostics also retain entry-proposals exhaustion; other proposals/routes remain outside the bounded search proof.

### Completed gzip integrity anchors

Every listed gzip was read end-to-end, SHA-256 recomputed against its attempt traceSummary, event count matched and seq checked contiguous from zero. No partial gzip or doorway-scope outcome was read.

| Phase / candidate / mode | Events | SHA-256 |
| --- | ---: | --- |
| coverage / corridor-2-7 / expanded | 32532 | ebd876f45858c22580e7bcba5194384d47134b5da9f0b2c00b426bba641aeb9f |
| coverage / corridor-2-7 / legacy | 49365 | 9d8bec1e0e7e26e0c3ab95ffd9ed394df2ed4327c9ecef88812caa50278fd9be |
| coverage / corridor-2-42 / expanded | 23469 | cbcab4b450a414a4df1dc0375e094118a85bf4e76a840282a80a4cd24e2c766c |
| coverage / corridor-2-42 / legacy | 26025 | eff272940dfc236c15f762c18556aae46290450f3c0d208cc1840d2fa7351133 |
| walkway / corridor-2-7 / expanded | 1071604 | 0b3b66d32d0400eb4e013a44c4c659167cf55716b8c25558287a1720b18ec537 |
| walkway / corridor-2-7 / legacy | 702592 | 976d45911e18e846f3391d836ab6d2b89ad12a1fee0c83be9529726a0915b1b5 |
| walkway / corridor-2-42 / expanded | 68669 | 5722c08f9792b57fe51d8afc16a34d31cd1ddc0ca361bd1a9eb0631a1aa06098 |
| walkway / corridor-2-42 / legacy | 49431 | 9f814724910b4cf075b58e7d5ef4c4d0d641928f5844b6b0f608ddca3327aed6 |

## Doorway scope

Pending separate freeze, completed assessment records and authorization to inspect. No outcome conclusion is made here.
