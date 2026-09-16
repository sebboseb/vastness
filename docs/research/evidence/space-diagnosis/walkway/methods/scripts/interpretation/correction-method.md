# Separately frozen corrected replay

This is a **post-hoc correction**, authored after exposure to the first11 cohort candidates' frozen-v1 results. It is neither blind validation nor a replacement for the original study. Preserve all v1 methods, attempts, witnesses, browser records and the36 already-frozen scale selections. Freeze the new compiler, replay/fallback harness, tests and method hashes before running corrected outcomes. Do not tune further against the corrected replay. The geometry-only selector, physical scale set, chosen scales, original geometry, player dimensions and frozen route/topology assessor remain unchanged.

## Bounded compiler correction

`criteria-v2.ts` exports `deriveCorrectedSpatialCriteria(rawIntent, semantics?): SpatialCriteria`. It calls the original frozen compiler and changes only cover/open-sky decisions and directly related ambiguities/unsupported status. It reads no candidate IDs, categories, outcomes or files. Unaffected criteria retain byte-equivalent JSON so the harness may reuse hash-verified original assessments whose complete input criteria, source, transform and method dependencies match.

The demonstrated errors were:

1. “Courtyard enclosed by stone walls … under an open sky” acquired a covered requirement from the word “enclosed.” With open sky, enclosure alone is now a lateral-boundary cue; independently stated roofs/cover still count.
2. “Corridor … overhead roof” did not acquire cover because the original compiler omitted bare “roof.” Positive roof/roofs and the existing roofed/ceiling/covered forms now require cover.

A bounded local negation rule allows up to four common article/adjective qualifiers between no/not/without/avoid and roof/ceiling/covered wording. Negated roof wording cannot create cover and requests an open portion; it overrides only inferred cover when there is no separate positive roof cue. Explicitly roofless halls/interiors are marked unsupported because the existing broad-covered-interior witness necessarily requires a roof; the compiler does not invent one or replace that topology. Mixed descriptions such as open courtyard plus roof over an arcade retain both requirements, witnessed on different portions of the same route. This is not unrestricted language reasoning: double negation, distant negation, comparative descriptions and general relational scope remain unresolved.

No topology vocabulary, aperture dimensions, support/clearance checks, broad-region radius, height reference, search proposal policy or resource cap is changed. In particular the frozen aperture witness still requires a lintel for a gate/doorway, and the corrected compiler does not newly interpret “gate” as an unroofed gap.

## Modifier-scope audit

The original compiler promotes any positive broad/wide/spacious/vast/large cue to a global2.4m minimum-width requirement. Thus “cave with a broad entrance” also imposes broad supported interior-center paths; it does not bind the adjective only to the entrance. This conservative qualifier propagation is retained and explicitly recorded as a limitation. Correctly localizing it would require separate per-topology widths and route-witness changes, beyond this focused cover correction. The replay therefore must not claim full semantic intent comprehension, and failures under this operational width rule remain possible interpretation failures rather than proof of unusable generation. Original conjunction and alternative-wording ambiguity rules remain unchanged.

## Deterministic same-scale fallback

The corrected harness (owned separately) evaluates the corrected criteria at the **already-selected scale** using the unchanged expanded search first. On expanded failure it evaluates the unchanged legacy search using the same geometry, transform, criteria and player. A passing expanded result is selected first; otherwise a passing legacy result is selected; otherwise the result is failed. Retain both attempts and record which route was used. Never select another scale after failure and never relabel a v1 expanded failure as a v1 success. Use separate corrected output and browser identities; browser-test every eligible corrected final route.

The expanded-to-legacy fallback was motivated by the observed v1 cave search regression: expanded proposals are not a superset of legacy proposals. This is an outcome-informed methodological change and must be labelled separately from compiler correction. Report corrected expanded-only results as well as corrected expanded-or-legacy results, and report fallback contribution separately. If computing corrected any-scale opportunity, apply the same corrected criteria and fallback policy independently to each predeclared scale only after selections remain frozen; compare like policies in numerator and denominator. Do not compare a fallback numerator with an expanded-only opportunity denominator.

Frozen data may be reused only when the full original input and method provenance match; equality of status or candidate ID is insufficient. The32-bit source triangle IDs and recorded support/topology witnesses remain bound to the unchanged original GLB. No GPU jobs, new source artifacts or added destination support are authorized by this replay.

## Verification before corrected outcomes

`npx tsx --test scripts/interpretation/criteria-v2.test.ts` covers byte-equivalent unchanged criteria; ignored metadata; roofless wall-enclosed courtyard acceptance; positive bare-roof enforcement against actual roofless/roofed synthetic corridors; local roof negation; unsupported roofless hall conflict; mixed open courtyard and covered arcade with distinct actual topology witnesses; and explicit retention of conservative broad-entrance scope.

Run the original criteria/routes tests and `npm run check` too. No v1 file should change. This document and the correction code/tests are new files; provenance and version labels belong in the replay harness rather than unconditional extra fields in every unchanged criteria JSON.
