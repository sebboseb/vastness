# Coverage phase outcome

The frozen fair scheduling phase corrected the targeted search-order mechanism but recovered **no whole case**: all 36 locked selected-scale cases completed, with 3/36 geometry passes, zero recoveries, zero regressions, and zero new passes among the previously unresolved 31. Coverage freeze SHA256: `11eda9be71cd8e43f0fb0c6e71cb62a21c1952c81a4e5fe9d0c2292bb01c9ed2`; predecessor entry-prism freeze: `159335c9df017f7613c5dad23e1da597ba71fa6d523b871ac5120e0cd49f4f01`.

This is read-only outcome analysis. All-case counts come from the 70 saved per-mode summary/assessment records. Only the targeted doorway's predecessor and coverage traces were parsed; the separate full trace analyzer remains authoritative for broader predicate counts. No source, criterion, method or scale was changed and no assessor was rerun.

## Targeted doorway: more entries served under the same route cap

`doorway-1-7`, selected scale 10, remains failed. Compare the predecessor's returned `entry-prism` pass with the new `coverage-round-robin` pass, excluding nested preserved predecessor observations:

| Measurement | Expanded predecessor | Expanded fair | Legacy predecessor | Legacy fair |
|---|---:|---:|---:|---:|
| Eligible proposals | 586 | 586 | 360 | 360 |
| Selected proposals | 192 | 192 | 48 | 48 |
| Entry prescreens attempted | 44 | 192 | 17 | 48 |
| Selected entries never screened | 148 | 0 | 31 | 0 |
| Admitted entries receiving candidate routes | 7 | 29 | 4 | 25 |
| Executed candidate routes | 4,096 | 4,096 | 4,096 | 4,096 |
| Node visits across entry-rooted BFS streams | 10,317 | 16,652 | 5,126 | 11,639 |
| Distinct visited node IDs | 1,602 | 1,602 | 1,602 | 1,581 |
| Cached node-feature records | 1,515 | 1,561 | 1,425 | 1,482 |
| Topology rays | 19,695 | 20,293 | 18,525 | 19,266 |
| Tested graph edges | 3,028 | 3,028 | 3,028 | 2,997 |
| Maximum reached displacement (m) | 11.6825 | 7.4000 | 12.7311 | 6.0033 |
| Final seam builds | 0 | 0 | 0 | 0 |

The old diagnostic candidate counter is 4,097 because it includes the next unevaluated candidate; the table uses actual `route:candidate` observations. The fair counter is exactly 4,096 executed routes.

Expanded fair scheduling serves every one of the 29 admitted streams: seven receive 142 candidates and 22 receive 141. Legacy serves all 25 admitted streams: 21 receive 164 and four receive 163. All 54 streams remain unfinished at the global route cap; none is claimed exhaustively searched. The method trades depth within early entry-rooted searches for breadth across entry roots. It does not necessarily increase unique spatial coverage: legacy visits fewer unique nodes and reaches less displacement here, while giving more entrances a chance. The `componentsExplored` increase from 1 to 5/3 is an interleaved reached-root bookkeeping effect, not evidence of newly discovered disconnected components.

The exact previously diagnosed starvation example is addressed: expanded proposal `218:1`, previously selected at rank 65 but unattempted, now evaluates its first candidate at coverage seq535942 and receives 141 candidates through seq694191. Its still-unexecuted remainder is logged at seq695153. This is a demonstrated correction of proposal starvation, not a demonstrated valid missed doorway.

## The same first topology prerequisite still rejects every tested candidate

Every one of the 4,096 candidates in each fair mode fails `doorway-crossing`. All observed aperture-node first failures are `roof-coverage`, whose unchanged threshold requires nine overhead footprint rays. No flank rays, opposite-side crossing test or wider-region test runs for those failed aperture nodes.

| Fair mode | Aperture-node failure observations | Observations with 0 roofs | With 1 roof | Distinct tested nodes with 0 roofs / 1 roof |
|---|---:|---:|---:|---:|
| Expanded | 94,822 | 94,533 | 289 | 1,557 / 4 |
| Legacy | 84,114 | 83,993 | 121 | 1,480 / 2 |

These are repeated path-node observations, not independent geometry failures. The predecessor shows the same first failure on all its aperture-node observations (180,774 expanded; 200,859 legacy). Fair ordering changes which and how many path nodes are examined but produces no aperture node reaching the unchanged nine-roof prerequisite. The evidence does not establish that source geometry has no aperture, that the roof prerequisite is semantically correct in every setting, or that later flank/crossing predicates would pass. It only establishes that the bounded candidates tested here never qualified under the frozen witness definition. No complete topology witness means no final seam/navigation evidence for a new route and no whole-case recovery.

## Exact targeted trace references

All paths below are under `.runtime/space-diagnosis/` and compressed-byte hashes were checked while reading:

- `entry-prism/candidates/doorway-1-7/expanded.ndjson.gz`, SHA256 `0977bbcd5396a38e3b7571ae6b12ee31598e2c450e67a6048bf09c40845f5367`: first aperture failure seq265428 (route 1, node 1812, roofCount 0, required 9); route rejected265639; route-cap exhaustion500118.
- `entry-prism/candidates/doorway-1-7/legacy.ndjson.gz`, SHA256 `e686061f2c968ca796f4009860d6f8c1f5ceb8872ca87c580b6c76b5d8dfca60`: first aperture failure284732 (route 1, node 139, roofCount 0, required 9); route rejected284928; cap526680.
- `coverage/candidates/doorway-1-7/expanded.ndjson.gz`, SHA256 `d36055cd7de3104c696168ec93536ccb2ab630f703fc4fcf1caa652ef77a788e`: first candidate526047; identical first aperture failure526062 and route rejection526273. Remaining streams are logged695141–695169. Scheduler completion695170 records round142, 29 admitted streams, 4,096 candidates and `candidate-routes` stop.
- `coverage/candidates/doorway-1-7/legacy.ndjson.gz`, SHA256 `de496f1094c8be9fd80ca5c7dddf799402a87d0f22eac093be0ef64f7ebc5072`: first candidate550835, first aperture failure550850 and route rejection551046. Remaining streams698411–698435. Scheduler completion698436 records round164, 25 admitted streams and the same global route stop.

## All-case saved diagnostic counts

The following totals sum the **returned pass diagnostics over all 70 modes**, not total computational cost across nested preserved and new passes. Three modes return a preserved successful predecessor; 67 run a new fair pass. Preserved passes are still executed before every failed mode's new fair attempt, so lower returned counters do not mean this phase costs less overall.

| Returned-pass diagnostic | Entry phase | Coverage phase |
|---|---:|---:|
| Entry attempts | 6,269 | 7,607 |
| Tested graph edges | 348,441 | 269,017 |
| Candidate diagnostic counter | 106,231 | 104,003 |
| Topology rays | 2,166,046 | 2,074,862 |
| Final approach builds | 27 | 27 |
| Modes with entry-proposal cap / distinct cases | 63 / 36 | 63 / 36 |
| Modes with candidate-route cap / distinct cases | 14 / 12 | 13 / 11 |
| Modes with topology-query cap / distinct cases | 9 / 5 | 9 / 5 |
| Modes with supported-node cap / distinct cases | 2 / 1 | 2 / 1 |

Entry attempts increased in 22 modes across 16 cases. Entry-selection cap flags include cases whose unsupported criteria prevent search; do not interpret every such flag as an executed route failure. Caps overlap and are not mutually exclusive failure diagnoses.

New scheduler event kinds, which occur only in the fair pass, report 538 admitted streams: 225 exhaust their BFS; 16 retire after a qualifying witness fails the unchanged final seam; 297 retain unexecuted work at the stopping budget. The new pass executes 102,666 candidate routes, 7,428 entry prescreens, 2,062,551 topology rays and 263,114 graph-edge tests across all 67 runs. Those counts are obtained by subtracting each mode's preserved entry-phase trace counters from its coverage trace counters, so predecessor work is not accidentally attributed to the correction. There are 16 new forward seam tests, 16 seam rejections and **zero new accepted routes**.

This outcome demonstrates broader allocation of the same bounded route-search budget. It does not demonstrate an additional interpreter false negative at whole-case level. Existing proposal-population exclusions, selected-entry caps, shared query/node budgets and topology requirements still censor the result. The counts support no tuning, threshold change, geometry repair or model decision in this analysis.

## Per-case mode diagnostics

Each row below is read from saved JSON only. E/L mean expanded/legacy. Entry attempts and route counters are predecessor → returned coverage; the final two columns describe the fair pass only. “Remaining streams” includes any admitted stream with unevaluated work, not necessarily a stream that received zero candidates.

| Case | Mode | Entry attempts | Candidate counter | Returned rays | Admitted / remaining streams | Exhausted bounds |
|---|---|---:|---:|---:|---:|---|
| large_open_interior-1-7 | E | 192 → 192 | 2622 → 2622 | 21,275 | 4 / 0 | entry-proposals |
| large_open_interior-1-7 | L | 34 → 48 | 4097 → 4096 | 13,997 | 9 / 9 | entry-proposals, candidate-routes |
| tunnel-1-7 | E | 192 → 192 | 0 → 0 | 0 | 1 / 0 | entry-proposals |
| tunnel-1-7 | L | 20 → 20 | 0 → 0 | 0 | 1 / 0 | none |
| doorway-1-7 | E | 44 → 192 | 4097 → 4096 | 20,293 | 29 / 29 | entry-proposals, candidate-routes |
| doorway-1-7 | L | 17 → 48 | 4097 → 4096 | 19,266 | 25 / 25 | entry-proposals, candidate-routes |
| narrow_passage-1-7 | E | 70 → 70 | 2 → 2 | 156 | 0 / 0 | entry-proposals |
| chamber-1-7 | E | 192 → 192 | 742 → 742 | 10,868 | 13 / 0 | entry-proposals |
| chamber-1-7 | L | 48 → 48 | 2 → 2 | 221 | 8 / 0 | entry-proposals |
| cave-1-7 | E | 192 → 192 | 399 → 399 | 6,916 | 4 / 0 | entry-proposals |
| cave-1-7 | L | 29 → 29 | 1041 → 1041 | 7,098 | 0 / 0 | entry-proposals |
| corridor-1-7 | E | 192 → 192 | 129 → 129 | 13,565 | 4 / 0 | entry-proposals |
| corridor-1-7 | L | 48 → 48 | 915 → 915 | 73,554 | 10 / 0 | entry-proposals |
| courtyard-1-7 | E | 192 → 192 | 852 → 852 | 12,651 | 2 / 0 | entry-proposals |
| courtyard-1-7 | L | 12 → 48 | 4097 → 4096 | 8,347 | 17 / 16 | candidate-routes |
| bridge-1-7 | E | 48 → 192 | 1022 → 1010 | 160,000 | 20 / 20 | entry-proposals, topology-queries |
| bridge-1-7 | L | 3 → 48 | 1230 → 1188 | 160,000 | 27 / 27 | entry-proposals, topology-queries |
| large_open_interior-1-42 | E | 192 → 192 | 2824 → 2824 | 12,532 | 9 / 0 | entry-proposals |
| large_open_interior-1-42 | L | 30 → 48 | 4097 → 4096 | 10,465 | 9 / 9 | entry-proposals, candidate-routes |
| bridge-1-42 | E | 112 → 192 | 760 → 595 | 160,000 | 5 / 3 | entry-proposals, topology-queries |
| bridge-1-42 | L | 8 → 48 | 629 → 953 | 160,000 | 10 / 10 | entry-proposals, topology-queries |
| doorway-1-42 | E | 192 → 192 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| doorway-1-42 | L | 48 → 48 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| narrow_passage-1-42 | E | 192 → 192 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| narrow_passage-1-42 | L | 48 → 48 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| cave-1-42 | E | 192 → 192 | 0 → 0 | 0 | 2 / 0 | entry-proposals |
| cave-1-42 | L | 48 → 48 | 0 → 0 | 0 | 12 / 0 | entry-proposals |
| courtyard-1-42 | E | 192 → 192 | 3813 → 3813 | 7,215 | 29 / 0 | entry-proposals |
| courtyard-1-42 | L | 42 → 48 | 4097 → 4096 | 7,410 | 21 / 20 | entry-proposals, candidate-routes |
| corridor-1-42 | E | 9 → 192 | 2455 → 1516 | 160,000 | 11 / 11 | entry-proposals, topology-queries |
| corridor-1-42 | L | 2 → 48 | 4097 → 1834 | 160,000 | 4 / 4 | entry-proposals, topology-queries |
| tunnel-1-42 | E | 192 → 192 | 3431 → 3431 | 19,318 | 5 / 0 | entry-proposals |
| tunnel-1-42 | L | 43 → 48 | 4097 → 4096 | 15,925 | 7 / 5 | entry-proposals, candidate-routes |
| chamber-1-42 | E | 192 → 192 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| chamber-1-42 | L | 48 → 48 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| courtyard-2-7 | E | 192 → 192 | 264 → 264 | 5,603 | 2 / 0 | entry-proposals |
| courtyard-2-7 | L | 48 → 48 | 487 → 487 | 5,694 | 2 / 0 | entry-proposals |
| bridge-2-7 | E | 189 → 192 | 895 → 883 | 160,000 | 4 / 2 | entry-proposals, topology-queries |
| bridge-2-7 | L | 25 → 25 | 0 → 0 | 0 | 0 / 0 | none |
| tunnel-2-7 | E | 192 → 192 | 1115 → 1115 | 8,034 | 7 / 0 | entry-proposals |
| tunnel-2-7 | L | 13 → 48 | 4097 → 4096 | 5,681 | 18 / 18 | entry-proposals, candidate-routes |
| corridor-2-7 | E | 0 → 0 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| corridor-2-7 | L | 0 → 0 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| narrow_passage-2-7 | E | 80 → 80 | 294 → 294 | 5,057 | 0 / 0 | entry-proposals |
| chamber-2-7 | E | 192 → 192 | 3818 → 3818 | 9,308 | 17 / 0 | entry-proposals |
| chamber-2-7 | L | 34 → 48 | 4097 → 4096 | 9,477 | 14 / 14 | entry-proposals, candidate-routes |
| cave-2-7 | E | 192 → 192 | 155 → 155 | 2,509 | 4 / 0 | entry-proposals |
| cave-2-7 | L | 27 → 27 | 313 → 313 | 2,626 | 4 / 0 | none |
| large_open_interior-2-7 | E | 192 → 192 | 982 → 982 | 13,902 | 6 / 0 | entry-proposals |
| large_open_interior-2-7 | L | 48 → 48 | 689 → 689 | 16,643 | 8 / 0 | entry-proposals |
| doorway-2-7 | E | 192 → 192 | 3443 → 3443 | 43,356 | 10 / 0 | entry-proposals |
| doorway-2-7 | L | 26 → 48 | 4097 → 4096 | 24,555 | 11 / 11 | entry-proposals, candidate-routes |
| large_open_interior-2-42 | E | 192 → 192 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| large_open_interior-2-42 | L | 0 → 0 | 0 → 0 | 0 | 0 / 0 | none |
| doorway-2-42 | E | 192 → 192 | 2456 → 2456 | 10,252 | 34 / 0 | entry-proposals |
| doorway-2-42 | L | 48 → 48 | 3252 → 3252 | 11,719 | 23 / 0 | entry-proposals |
| corridor-2-42 | E | 0 → 0 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| corridor-2-42 | L | 0 → 0 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| chamber-2-42 | E | 35 → 192 | 4097 → 4096 | 47,281 | 9 / 9 | supported-nodes, entry-proposals, candidate-routes |
| chamber-2-42 | L | 11 → 48 | 4097 → 4096 | 36,426 | 13 / 13 | supported-nodes, entry-proposals, candidate-routes |
| narrow_passage-2-42 | E | 192 → 192 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| narrow_passage-2-42 | L | 48 → 48 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| courtyard-2-42 | E | 192 → 192 | 0 → 0 | 0 | 0 / 0 | entry-proposals |
| courtyard-2-42 | L | 7 → 7 | 2725 → 2725 | 20,345 | 2 / 0 | none |
| cave-2-42 | E | 192 → 192 | 0 → 0 | 0 | 3 / 0 | entry-proposals |
| cave-2-42 | L | 5 → 5 | 0 → 0 | 0 | 5 / 0 | none |
| bridge-2-42 | E | 1 → 192 | 443 → 973 | 160,000 | 13 / 13 | entry-proposals, topology-queries |
| bridge-2-42 | L | 1 → 48 | 886 → 1250 | 160,000 | 26 / 26 | entry-proposals, topology-queries |
| tunnel-2-42 | E | 192 → 192 | 3788 → 3788 | 51,649 | 2 / 0 | entry-proposals |
| tunnel-2-42 | L | 12 → 48 | 4097 → 4096 | 23,673 | 3 / 3 | entry-proposals, candidate-routes |
