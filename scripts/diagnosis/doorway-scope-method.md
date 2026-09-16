# Local doorway width scope, v1

Decision frozen before any corrected cohort evaluation. Module `criteria-doorway.ts`, version `local-doorway-width-scope-v1`. API remains `compileDiagnosedCriteria(rawIntent: string, semantics?: unknown, trace?: TraceSink)`. Return type is exported as `ScopedSpatialCriteria = SpatialCriteria & {widthByTopology?: Partial<Record<SpatialKind, number>>}`. The baseline compiler is the separately frozen `criteria-walkway.ts` wrapper.

## Evidence and narrow decision

This is an explicitly retrospective, outcome-informed scope correction. In the frozen baseline, `chamber-1-7` has normalized broad `[42,47)` attached to doorway `[48,55)`, but a global minimumWidth2.4. At `baseline/candidates/chamber-1-7/expanded.ndjson.gz` seq8617, node1109/route1 passes opposing-wall width and fails broad-supported-region. Seq8875 rejects enclosed-passage before doorway-crossing and explicit-cover execute. Legacy seq14677/14935 corroborate the gate. Full paths, source hashes, counts and remaining uncertainty are recorded in `.runtime/space-diagnosis/modifier-diagnosis.md`. No corrected geometry or recovery is proved by this module.

Change the baseline only if all checks hold:

- Supported criteria contain at least two topology kinds, including doorway-crossing, and global minimumWidth is exactly 2.4.
- There is no existing ambiguity except the retained notice that multiple positive topologies are conjunctive.
- The original normalized text is not clipped at the inherited 2,400 UTF-16 code-unit boundary.
- No listed negation, alternative, contrast, uncertainty, or question marker occurs anywhere in the text. The source regex is authoritative. Unrelated negation also declines the correction rather than being reassigned by a guessed parser.
- Every positive width modifier in the original compiler vocabulary (`broad`, `wide`, `spacious`, `vast`, `large`) has a direct attachment to a text-evidenced doorway-crossing noun. There must be at least one such positive modifier.

Attachment grammar: a single space after the modifier; zero through three qualifiers from `human`, `empty`, `clear`, `stone`, `brick`, `wooden`, `high`, `low`, `tall`; then `doorway(s)`, `archway(s)`, `arch`, or `door opening(s)`. Require whitespace, sentence punctuation, or end of text after the noun, so “doorway-shaped” does not count. The noun text must match positive text-source doorway-crossing evidence already present in the baseline. The original 45-code-unit negation predicate is recorded per width token; the separate conservative uncertainty gate also blocks negations outside that predicate's limited vocabulary.

Bare “opening” is deliberately unresolved: it could be a window or some other opening while an independent doorway appears elsewhere. “Door opening” is eligible because it is already an explicit doorway-crossing cue. Entrance, landing, gate, generic door and unlisted attachment forms remain baseline-identical. Any independent whole-space broad/large/wide modifier fails the all-modifiers attachment condition and preserves global width. Multiple narrowly attached doorway modifiers can qualify, preserving the existing single witness per topology-kind model; this does not claim to count distinct physical apertures.

When applied, set only `requirements.minimumWidth` to 0.6 and add `widthByTopology: {'doorway-crossing': 2.4}`. Preserve every other baseline field, including supported state, required topology ordering, evidence, ambiguity text, open-sky/cover/wall flags and all physical dimensions. Declined inputs return the unchanged baseline object without a widthByTopology property. Existing walkway behavior and single-topology criteria are unchanged.

This is finite lexical attachment, not general syntactic certainty. It intentionally forgoes unsupported scope guesses and is not a language-wide fix. No candidate identity, category, source mesh, filesystem, scale, route outcome or prior success enters the implementation.

## Route integration is required before phase freeze

This module alone is **not a safe replacement** for the existing compiler in a route consumer that ignores widthByTopology. The lead owns a separate route copy that must use `criteria.widthByTopology?.['doorway-crossing'] ?? criteria.requirements.minimumWidth` at aperture width acceptance and its corresponding recorded threshold. Global width continues to govern other topology predicates; intrinsic broad-covered-interior/courtyard breadth remains in their unchanged witnesses.

Before evaluating the cohort, freeze the combined compiler and route phase only after full synthetic geometry tests prove both: a broad aperture with a narrower body-clear chamber route can pass all required witnesses; an otherwise equivalent narrow aperture still fails despite a 0.6 global width. Independent broad passage/chamber requirements must remain constrained. Original support/body/roof/wall checks, sustained traversal, source-bound exterior entry, reversible seam and subsequent browser proof all remain mandatory. Root owns these full geometry tests; this task changes no route module and runs no cohort assessment.

## Trace and bounded work

Retain the complete original and walkway trace prefix, including their original final-criteria records. Append:

1. `doorway-scope-decision`, decisionId `doorway-scope:0`: version, application/decline reasons, every width modifier span, original local-negation result, matched noun and phrase spans, text-topology binding, uncertainty spans, baseline topology/width and scoped output.
2. `doorway-final-criteria`, decisionId `doorway-scope:1`: actual returned criteria, changedByScope flag and preservation declarations.

Spans are half-open normalized UTF-16 coordinates after NFKC/lowercase/whitespace collapse, matching baseline normalized text. Consumers must read the final appended scope event for the new phase rather than mistake the intentionally retained original final record for corrected acceptance. Events are deterministic and deep-cloned; sink mutation cannot alter acceptance and sink errors propagate.

After inherited input normalization, scans inspect at most 2,400 retained code units. Attachment qualifiers are capped at three; there are no geometry loops, route searches, I/O or random calls. Normalization still has the inherited original-input-length cost.

## Synthetic validation

Seven new tests cover direct doorway/arch/door-opening attachment; preserved 2.4 local width and all remaining fields; independent whole-space modifiers; entrance/landing/bare opening/punctuation/doorway-shaped/unrecognized qualification refusals; negation/alternative/ambiguity handling; single-topology/body-width/walkway/semantic-fallback parity; complete trace prefix, exact normalized spans and determinism; truncation, irrelevant metadata, mutation isolation and sink errors. Original trace and walkway tests remain unchanged. No cohort evaluation or claim of a recovered candidate is part of this implementation.
