# Covered and walled walkway alias, v1

Method decision frozen before any corrected cohort evaluation. Module: `criteria-walkway.ts`; exported version `covered-walled-walkway-alias-v1`. API: `compileDiagnosedCriteria(rawIntent: string, semantics?: unknown, trace?: TraceSink): SpatialCriteria`.

This is an explicitly retrospective compiler vocabulary correction. Frozen baseline traces for `corridor-2-7` and `corridor-2-42` record a covered walkway between brick walls but unsupported empty topology. Both modes stop before route evaluation: assessment-complete seq10840/16451 for seed7 and seq7819/8671 for seed42. The rationale and complete normalized spans are in `.runtime/space-diagnosis/modifier-diagnosis.md`. Neither seed has a geometry success proof. The implementation uses no candidate ID, category, scale, prior outcome, artifact, filesystem, or assessment input.

## Decision

Call the original diagnostic compiler first, including its complete original trace. Return every already-supported result byte-for-byte unchanged. Also preserve an unsupported result when it already has topology/evidence or an ambiguity other than the original no-topology notice. This prevents the alias from repairing a conflicting existing topology, overriding an exclusion, or discarding semantic fallback decisions.

Only an otherwise unsupported empty topology can gain the existing `enclosed-passage` kind. Require all of the following:

- Exactly one `walkway` or `walkways` token in the normalized original text. The semantic envelope cannot supply the new alias.
- A directly preceding phrase of one through six permitted modifier tokens containing `covered` or `roofed`.
- Either `walled` in that same modifier phrase, or immediately after the walkway: `between`, zero through four permitted qualifiers, then plural `walls`.
- The unchanged baseline already requires covered and opposing walls, and does not require open sky.
- No input clipping: normalized text must fit the inherited 2,400 UTF-16 code-unit bound.
- No listed negation, contrast, alternative, uncertainty, absent-cover, open, or question marker anywhere in the retained text. The source regex is authoritative. This deliberately rejects even unrelated negation such as “without furniture”; it does not guess scope.

Permitted preceding modifiers are `covered`, `roofed`, `walled`, `and`, `empty`, `straight`, `stone`, `brick`, `wooden`, `solid`, `high`, `low`, `tall`, `narrow`, `broad`, `wide`, `flat`, `level`. Permitted between-wall qualifiers are `two`, `parallel`, `stone`, `brick`, `wooden`, `solid`, `high`, `low`, `tall`. No punctuation or unlisted intervening word can connect these phrases. This finite lexical grammar is a deliberately narrow alias, not a general parser or assertion of semantic certainty. It does not recognize remote “with a ceiling” references, arbitrary nearby walls, generic open walkways, or unseen attachment forms.

When applied, change only `supported` to true, `required` to the existing enclosed-passage kind, and text evidence to the matched phrase; remove only the now-obsolete no-topology notice. Preserve the complete `requirements` and `physical` objects. In particular, broad-path minimum width stays 2.4 m, body-width baseline stays 0.6 m, cover/walls stay required, and physical radius0.3/height1.8/eye1.65/step0.25/slope35/displacement3/reversibility remain unchanged. There is no width-scope or landing correction here.

The alias makes geometry eligible for the existing quantitative enclosed-passage witness. It does not assert geometry acceptance or physical reachability. Original triangle support, body clearance, roof coverage, opposing walls, retained width, sustained route, exterior approach, reversible seam, and browser proof still have to pass. Existing supported criteria can retain existing lexical limitations because byte parity takes precedence for that branch.

## Trace and resource contract

Preserve all original trace events and their decision IDs, including the original unsupported `final-criteria`. Append exactly:

1. `walkway-alias-decision`, ID `walkway:0`: method version, application flag, decline reasons, normalized matched spans, wall relation, uncertainty spans, baseline status and limitations.
2. `walkway-final-criteria`, ID `walkway:1`: actual returned criteria, alias-change flag, source of acceptance and preservation declarations.

Consumers must use the appended corrected event when displaying final acceptance; the earlier original decision intentionally remains visible. Spans are half-open normalized UTF-16 offsets (NFKC, lower case, collapsed whitespace), sharing the baseline normalized text. Appended events are deep-cloned before delivery; sink mutation cannot change results, and sink errors propagate. Observations do not drive later compilation. Order is deterministic.

After the inherited normalization, lexical work scans at most 2,400 retained code units with finite bounded attachment expressions. No route searches, geometry loops, I/O, or random behavior are added. Input normalization itself has the original input-length cost; this is not an input-size sandbox.

## Synthetic validation and follow-up boundary

Six new tests exercise five accepted synthetic phrasings, broad versus body-width preservation, negations/conflicts/alternatives, missing/unattached dimensions, semantic-only refusal, existing supported/ambiguous byte parity, complete original trace prefix, exact normalized spans, deterministic events, clipping refusal, irrelevant metadata, sink mutation and sink errors. The original seven trace tests also remain unchanged and pass. These are compiler behavior tests; no cohort assessment has been run by this implementation task.

Before claiming an interpreter rescue, the lead must freeze this method's content with its dependencies, evaluate at the previously locked selected scales as a separate phase after entry/coverage priority, preserve every baseline attempt, and obtain full required geometric/browser proof. No result from such evaluation is used to revise this version silently.
