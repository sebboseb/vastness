# Bounded search coverage diagnosis

Read-only snapshot, 2026-09-16. No assessor reruns or algorithm edits. Baseline all 36 completed traces have exact historical parity. The entry-prism phase was still running; the completed `doorway-1-7/expanded` trace supplies the post-entry-correction comparison below. Counts describe work and omissions, not proof of a valid missed route. Candidate labels select explanatory evidence only and must never enter the algorithm.

## Systematic baseline coverage limits

From `baseline/summary.json`, restricted to the 31 previously unresolved candidates: all 31 record entry-proposal truncation in expanded search; 55 mode runs record that cap. Eight candidates (nine mode runs) exhaust the 4,096 candidate-route budget; three candidates (six modes) exhaust 160,000 topology queries; one candidate (both modes) hits the supported-node cap. Entry-cap diagnostics are emitted at ranking time, even if unsupported criteria later prevent all entry attempts: the two unsupported corridor intents must not be called route-search failures.

Route-budget cases are doorway-1-7, courtyard-1-7, courtyard-1-42, corridor-1-42, tunnel-1-42, tunnel-2-7, doorway-2-7 and tunnel-2-42. The three topology-ray cases are bridge-1-7, bridge-1-42 and bridge-2-42. These are measured censoring mechanisms; neither the caps nor the absence of a witness demonstrate irreparable geometry.

## Repeated component traversal precedes unexecuted selected entries

Streaming `component:node-visited` events gives these exact totals. Unique nodes are the union of visited node IDs, not inferred from component labels. Different entry-rooted paths can be semantically meaningful, so repeated nodes alone are not redundant witness queries and should not simply be suppressed.

| Baseline case / mode | Node visits | Unique nodes | Routes evaluated | Entry attempts / selected | Interpretation |
|---|---:|---:|---:|---:|---|
| doorway-1-7 expanded | 10,317 | 1,602 | 4,096 | 44 / 192 | Six complete traversals of the same 1,602 nodes, then a partial seventh; 148 selected proposals never screened |
| doorway-1-7 legacy | 5,126 | 1,602 | 4,096 | 17 / 48 | Three complete traversals and a partial fourth; 31 selected proposals never screened |
| tunnel-2-7 legacy | 5,602 | 630 | 4,096 | 13 / 48 | Eight complete traversals and a partial ninth; 35 selected proposals never screened |
| courtyard-1-42 legacy | 8,951 | 570 | 4,096 | 42 / 48 | Fifteen complete traversals and a partial sixteenth; six selected proposals never screened |
| courtyard-1-42 expanded | 15,390 | 570 | 3,651 | 192 / 192 | 27 complete traversals; expensive repetition, but no route-budget starvation in this mode |
| tunnel-1-42 expanded | 7,690 | 1,538 | 3,431 | 192 / 192 | Five complete traversals; useful counterexample to treating repetition itself as a miss |
| corridor-1-42 legacy | 4,449 | 4,449 | 4,096 | 13 / 48 | One large entry search can exhaust the route budget without repeated component roots |

The diagnostics counter is 4,097 at exhaustion because it includes the next candidate rejected before execution; exactly 4,096 `route:candidate` events were executed. The initial route order exhausts each entry's BFS before screening the next entry. Cached edges/features avoid repeating some expensive geometric work, but they do not prevent route-budget consumption by many paths rooted at early entries.

## Exact evidence surviving the entry-prism correction

`entry-prism/candidates/doorway-1-7/expanded.ndjson.gz`, SHA256 `0977bbcd5396a38e3b7571ae6b12ee31598e2c450e67a6048bf09c40845f5367`, is complete (500,270 events). Filter `pass=entry-prism` to avoid counting the preserved predecessor pass twice.

- `component:entry-search` seq264339 starts proposal1811:3. Subsequent proposals1225:0 seq321484,1823:3 seq353759,1271:1 seq388146,437:1 seq419998,1800:3 seq456422,958:0 seq492254 all record `previouslyReached:true`.
- Those seven searches evaluate respectively 620,661,627,654,664,632,238 routes: 4,096 total. They make 10,317 visits to the same 1,602-node union, matching the predecessor's work pattern.
- Seq500117 rejects candidate4097 for proposal958:0 before evaluation. Seq500118 records exhaustion with only44 entry attempts,3,028 tested edges,19,695 topology rays,zero final approach builds and one reached component. Thus neither the edge cap nor topology-query cap nor seam cap caused this stop.
- Seq500119–500266 mark the remaining148 selected entries `not-attempted`; first are1829:3 rank44,40:2 rank45,1817:3 rank46. Seq500268 is the failed pass completion. These entries did not receive the new prism test at all.

The preserved baseline expanded trace is SHA256 `fdb9ab8135b9ae91de4469352e1c06064cfc75a768216e5426259660527dbc63`. The corresponding stop is seq249963–249964; remaining proposal events start249965. Proposal218:1 is selected at rank65 (seq13161) yet unattempted at seq249986. Independently, baseline legacy prescreen seq119001 accepts the same proposal, then component seq119002 explores it. That establishes an actually prescreen-clear proposal hidden behind expanded route-budget starvation; it does not establish that its aperture witness or final seam would pass. Legacy trace SHA256 `fe84acf8482570f38810c499b6cf5ecef6674d0dd6c062b625a649a14846822d`.

For a second unresolved example, baseline tunnel-2-7 legacy SHA256 `04ed8369f9c5fad61d9712c43536ae28020b2e60813ba2fe490067c8fd395488`: first component seq8990, route-cap stop344109–344110, then unattempted97:0 rank13 seq344111 and113:0 rank14 seq344112. Its9 rooted searches use490,484,470,463,461,453,453,444,378 candidate routes, respectively. All remain within one630-node component. Baseline courtyard-1-42 legacy SHA256 `f6ceede7994b9b9767e474811872ffe56b3170286786b465b901eb371ad0a2ad`: stop259885–259886, then625:3 rank42 seq259887. Proposal625:3 independently passes expanded prescreen seq59204, and that expanded search evaluates119 routes. Again, the omission is measured; a valid topology route is unproven.

## Separate population and ranking losses, not included in the proposed correction

Expanded eligibility's immediate same-layer-neighbor test is not equivalent to exterior reachability. Concrete baseline legacy-prescreen-clear proposals excluded from expanded eligibility include doorway-1-7 280:1 (expanded seq6671,neighbor281; legacy pass192326), doorway-1-7 358:1 (seq6983,neighbor359; legacy pass262018), tunnel-1-42 5594:3 (expanded39897; legacy267644), and chamber-1-7 1063:3 (expanded7139; legacy13089). Doorway's exclusions persist unchanged in entry-prism expanded seq256787 and257099. This is a population loss, not a ranking-cap loss.

Eligible but cap-omitted, independently legacy-clear baseline examples include doorway-1-7 140:1 (expanded omitted13139; legacy pass20744), tunnel-2-7 67:0 (omitted8071; legacy pass99291), doorway-2-7 430:1 (omitted8123; legacy pass12320) and corridor-1-42 5592:1 (omitted75755; legacy pass86802). Eligibility and rank truncation are distinct from the selected-but-unattempted route-budget mechanism above.

Cave-1-7's proven accepted legacy route834:0 is excluded by expanded same-layer neighbor833 (seq8693), as documented in entry-diagnosis.md. It motivates a potential later union strategy but is outside the31 denominator. Current mode fallback already covers many of these population differences. Changing population, rank and route scheduling together would prevent causal attribution.

## One proposed correction: fair scheduling among the unchanged selected entries

Recommend a separately frozen, predecessor-first fair-route scheduling pass, only after the entire current same-mode entry assessor fails. Keep the exact selected proposal population/order/caps, physical player, criteria, witnesses, source support, prism, exterior approach, reversible navigator and scale. Preserve successful predecessor assessments exactly. Do not add a legacy-union population or change witness thresholds in this phase.

In the new pass, screen the existing selected entries under the current entry rule, then keep one resumable BFS per admitted entry. Advance them in deterministic rank order, evaluating at most one candidate route per active entry per round before resuming the first entry. Preserve each entry's existing neighbor order, candidate parity and BFS predecessor/path semantics. Retire a stream at its existing terminal conditions; a qualifying route still requires unchanged final bidirectional seam validation. Keep the global4,096 route/160,000 ray/80,000 edge/8 approach-build caps. Expose round, entry-local candidate index, suspension/resumption, aggregate candidate count, and unexecuted streams. This is search ordering only: it allocates early checks across entries without treating identical connected components as semantically interchangeable.

Resource disclosure is essential: screening all selected entries can add work before the first route check. The separate correction pass adds bounded work after the preserved current method; cap per-entry BFS states explicitly at the existing20,000 supported nodes and selected-entry count (192 expanded/48 legacy), preferably compact predecessor/queue arrays. At most192×20,000 node states/visits is the existing worst-case per-entry BFS envelope, not an unbounded search. Keep global edge/ray/route caps; do not count only emitted traces as the work bound. This scheduling can still starve distant endpoints or exhaust shared ray/edge budgets and is not a completeness claim.

Required synthetic tests before implementation freeze: (1) an early large nonqualifying component consumes the sequential route cap while a later selected exterior entry has an independently valid original-supported route; fair scheduling must reach it with unchanged total caps, (2) multiple entries into one component remain eligible for different topology paths rather than globally deduplicated, (3) predecessor successes retain exact assessment bytes apart from timings, (4) absent topology still rejects after fair budget exhaustion with unexecuted streams explicit, and (5) sealed holes, thin barriers and unsupported gaps retain the current prism/navigation rejection. No candidate IDs, labels or cohort outcomes may guide scheduling.

This proposal is justified as a controlled test of demonstrated search censoring. It does not predict a number of recoveries. Full predecessor/new-phase comparison and browser verification are required before calling any candidate an interpreter false negative.

## Final entry-phase completion addendum

Entry-prism is now complete on all36locked cases/70mode traces:3passed,0recovered,0regressed. This changes no method or proposed coverage correction. The late bridge-2-42 entry pass reaches the160,000ray cap after one entry in each mode (443expanded/886legacy candidate counters), before any seam attempt. Tunnel-2-42 expanded completes192selected entry attempts and3,788candidate routes; legacy stops after12of48selected entries at4,096executed routes (diagnostic counter4,097), leaving36selected entries unattempted. Neither mode builds an authored seam navigator. Exact final trace hashes, budget-event sequences and completion sequences are recorded in the final-completion addendum of `approach-boundary-diagnosis.md`.

These late counts reinforce the existing distinction between shared query-budget censoring and sequential candidate-route starvation. They do not establish a missing valid route or justify changing witness thresholds, scales or source geometry. The original baseline-wide counts and separately frozen fair scheduling method remain unchanged.
