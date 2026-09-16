# Frozen compiler observation

`compileDiagnosedCriteria(rawIntent, semantics?, trace?: TraceSink)` returns the exact object produced by the unchanged `deriveCorrectedSpatialCriteria`. Without a sink, it immediately returns that result. With a sink, it additionally obtains the original compiler's result and inspects the retained normalized text to explain the difference. Neither observed matches nor scope hypotheses feed acceptance. No existing compiler, route, player, selector or artifact file changes.

This is observational instrumentation, not a new language parser. It was developed on synthetic text fixtures only; this task runs no cohort replay or correction. Existing historical outcomes are known from the previous study, so later diagnosis is retrospective rather than blind validation.

## Event contract

All events use the shared `TraceSink` with `stage: 'intent'`, a `kind`, and a deterministic local `decisionId` (`intent:0`, `intent:1`, …). IDs are local to one compiler call; the caller must bind the stream to the source, attempt, method hashes and candidate identity. This module does not read files, know candidate IDs, inspect outcomes or attach filesystem provenance.

The stable emission order is:

1. `compiler-observation` states the authoritative compiler and the limits of the observation.
2. Two `normalized-source` events retain the original text and semantic concept after the compiler's NFKC, lowercase, whitespace-collapse and 2,400 UTF-16-code-unit limit. Input and retained lengths explicitly expose compiler truncation.
3. `lexical-match`, `negation-window` and `topology-decision` events inspect topology cues in the original compiler's topology-family order. Each match includes its source, exact normalized span, regex and linked cue ID. Negation includes its exact 45-character original or 90-character corrected lookbehind window, matched span, pattern and observed match result. A failed local-negation match does not establish that a phrase is semantically positive.
4. `semantic-fallback` records whether concept collection and the `axes.openness` fallback are evaluated or skipped, why, and whether explicit original-text exclusions block semantic evidence. Skipped concept branches have no fabricated topology match events. Semantic openness has field provenance and explicitly has no text span.
5. `topology-compilation` records the frozen evidence and conjunctive requirements, text exclusions, and a consistency check against the inspected lexical decisions.
6. Additional match/window events inspect original open-sky, cover, opposing-wall and width cues. `original-requirements` records their observed inputs, physical thresholds, final original fields and the global scope of `minimumWidth`.
7. Corrected roof/open-sky/enclosed/underground scans precede `roof-correction`. It records the original and corrected requirements, positive and negative roof cues, inherited topology defaults, suppressed enclosed-as-cover contribution, unsupported roofless-interior status and a consistency check against the frozen corrected fields.
8. `modifier-scope-observation` and `scope-warning` independently inspect nearby noun associations. They never alter or add to returned criteria. `compiler-ambiguity` then records both compiler phases and which ambiguity messages were retained, removed or added. `final-criteria` contains a detached copy of the authoritative result.

Spans use half-open `[start,end)` **normalized UTF-16 offsets**, with the exact substring and source name. NFKC and whitespace collapse can change offsets; no raw-input coordinates are guessed. Consumers should resolve spans against the corresponding `normalized-source` event, not the original raw input. Non-string semantic concept values and unrelated semantic metadata are ignored as in the original compiler.

## What the trace does and does not observe

Lexical scans intentionally expose every retained match, including matches after the first positive cue. They are labeled full lexical inspection, **not** a low-level execution log of JavaScript short-circuit regex calls. Aggregate compiler results are direct observations of the frozen functions; explicit semantic-fallback activation is reconstructed from their unchanged guards. The two consistency fields make disagreements between the observation rules and frozen outputs visible rather than substituting inferred results. The route tracing module separately owns executed/failed/unexecuted geometric predicates.

Scope inspection uses the first recognized following noun within 48 normalized code units, stopping at listed punctuation or conjunctions/prepositions. It is only a lexical-proximity hypothesis. For example, “narrow passage with a broad entrance” still returns global `minimumWidth: 2.4`. Its trace identifies broad→entrance as a possible local constraint promoted to a global field, while narrow has no dedicated maximum-width or relative-size field. A “broad hall” retains the same global threshold without claiming a local-opening mismatch. Height words such as high/tall are observable but do not create new height requirements. The trace does not claim that nearby words establish syntactic attachment or intended meaning.

No events are silently capped or sampled. Inspection covers at most two retained 2,400-code-unit sources using a fixed family of lexical scans; the original normalization still processes the complete input before its existing truncation. The sink receives every emitted observation synchronously. Sink errors propagate so a caller cannot silently label an incomplete trace successful. The harness owns durable writing/compression and failure handling.

Every emitted object is deep-cloned before delivery. A sink can annotate or mutate its copy without changing input semantics, returned criteria or subsequent events. Ordinary JSON-compatible semantic envelopes are the intended input, as in the study; side-effectful JavaScript getters are not a supported evidence source.

## Verification

`npx tsx --test scripts/diagnosis/criteria-traced.test.ts` checks exact JSON parity with and without tracing across 189 synthetic combinations, global broad-entrance scope, unrepresented narrowness, explicit negation and semantic fallback exclusions, skipped branches, original-versus-corrected roofs, mixed courtyard/arcade cues, unsupported roofless halls, normalized Unicode spans and truncation, deterministic ordering, metadata exclusion, sink mutation isolation and sink error propagation. The final focused run passes seven tests. `npm run check` also passes: typecheck, 26 existing tests with four artifact-dependent skips, and production build.

These checks establish observational parity and explanation fidelity on synthetic inputs. They do not establish a correct parse of arbitrary language, a newly usable cohort route or any correction to the frozen endpoint. The lead must freeze these files and replay all 36 locked-scale cases before proposing an evidence-based correction.
