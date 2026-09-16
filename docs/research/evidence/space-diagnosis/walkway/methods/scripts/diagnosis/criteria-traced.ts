import {deriveSpatialCriteria, type SpatialCriteria, type SpatialKind} from '../interpretation/criteria.ts';
import {deriveCorrectedSpatialCriteria} from '../interpretation/criteria-v2.ts';
import type {TraceEvent, TraceSink} from './trace.ts';

type Source = 'text' | 'semantic-concept';
type Span = {source: Source; start: number; end: number; text: string; offsets: 'normalized-utf16'};
type Match = {span: Span; negated: boolean; cueId: string};
const TOPOLOGIES: [SpatialKind, RegExp][] = [
 ['enclosed-passage', /\b(tunnels?|corridors?|passages?|caves?|caverns?|chambers?)\b/g],
 ['open-courtyard', /\b(courtyards?|courts?|walled gardens?|enclosed gardens?)\b/g],
 ['doorway-crossing', /\b(arch(?:way)?s?|doorways?|door openings?|gateways?|gates?|portals?)\b/g],
 ['elevated-bridge', /\b(bridges?|footbridges?|viaducts?)\b/g],
 ['broad-covered-interior', /\b(halls?|rooms?|interiors?|atriums?|atria|hangars?|warehouses?|cathedrals?)\b/g],
];
const NEGATION = {
 original: {window: 45, pattern: /\b(?:no|not|without|avoid)(?:\s+(?:a|an|any|the|enclosed|covered|open))?\s*$/},
 corrected: {window: 90, pattern: /\b(?:no|not|without|avoid)(?:\s+(?:a|an|any|the|overhead|high|low|vaulted|solid|continuous|stone|wooden|enclosing)){0,4}\s*$/},
};
const INHERENT_COVER = /^(?:tunnels?|caves?|caverns?|chambers?)$/;

/** Observe the frozen compiler. Neither trace output nor scope hypotheses drive its return value. */
export function compileDiagnosedCriteria(rawIntent: string, semantics?: unknown, trace?: TraceSink): SpatialCriteria {
 const result = deriveCorrectedSpatialCriteria(rawIntent, semantics);
 if (!trace) return result;
 // The uncorrected result exposes what the separately frozen roof correction changed.
 const original = deriveSpatialCriteria(rawIntent, semantics);
 const envelope = semantics && typeof semantics === 'object' ? semantics as Record<string, unknown> : {};
 const concept = typeof envelope.concept === 'string' ? envelope.concept : '';
 const axes = envelope.axes && typeof envelope.axes === 'object' ? envelope.axes as Record<string, unknown> : {};
 const inputs = {text: rawIntent, 'semantic-concept': concept};
 const normalized = {text: '', 'semantic-concept': ''};
 let sequence = 0;
 const emit = (kind: string, observations: Record<string, unknown>) => {
  const event: TraceEvent = {stage: 'intent', kind, decisionId: `intent:${sequence++}`, ...observations};
  // A consumer may annotate its own events, but cannot mutate the compiler result or later events.
  trace(structuredClone(event));
 };
 const span = (source: Source, start: number, end: number): Span => ({source, start, end, text: normalized[source].slice(start, end), offsets: 'normalized-utf16'});
 emit('compiler-observation', {
  compiler: 'deriveCorrectedSpatialCriteria', traceVersion: 'criteria-observation-v1',
  authority: 'unchanged frozen compiler return value',
  matchObservation: 'Full lexical inspection of retained normalized input; this is not a low-level execution log of short-circuit regex calls.',
  scopeObservation: 'Nearby noun associations are explicitly labeled hypotheses, not parsed intent or acceptance inputs.',
 });
 for (const source of ['text', 'semantic-concept'] as const) {
  const value = inputs[source].normalize('NFKC').toLowerCase().replace(/\s+/g, ' ');
  normalized[source] = value.slice(0, 2400);
  emit('normalized-source', {source, normalizedText: normalized[source], rawCodeUnits: inputs[source].length,
   normalizedCodeUnits: value.length, retainedCodeUnits: normalized[source].length, compilerOmittedCodeUnits: Math.max(0, value.length - 2400),
   normalization: ['NFKC', 'lowercase', 'collapse whitespace', 'first 2400 UTF-16 code units'],
   spanBasis: 'All spans refer to normalizedText. No raw-input offsets are inferred after normalization.'});
 }
 function inspect(source: Source, family: string, pattern: RegExp, version: keyof typeof NEGATION): Match[] {
  return [...normalized[source].matchAll(pattern)].map(match => {
   const start = match.index!, end = start + match[0].length, rule = NEGATION[version], windowStart = Math.max(0, start - rule.window);
   const window = normalized[source].slice(windowStart, start), negation = window.match(rule.pattern);
   const item = {span: span(source, start, end), negated: Boolean(negation), cueId: `${source}:${family}:${start}:${end}`};
   emit('lexical-match', {...item, family, pattern: pattern.source, negationRule: version, observation: 'complete-inspection'});
   emit('negation-window', {cueId: item.cueId, family, rule: version, pattern: rule.pattern.source, maximumLookbehindCodeUnits: rule.window,
    window: span(source, windowStart, start), matched: Boolean(negation),
    matchedSpan: negation ? span(source, windowStart + negation.index!, start) : null,
    conclusion: negation ? 'excluded by this local lexical negation rule' : 'not excluded by this rule; semantic positivity is not established'});
   return item;
  });
 }
 const excluded = new Set<SpatialKind>();
 const observedEvidence: SpatialCriteria['evidence'] = [];
 function topology(source: Source) {
  for (const [kind, pattern] of TOPOLOGIES) for (const match of inspect(source, `topology:${kind}`, pattern, 'original')) {
   let decision: string;
   if (match.negated) {if (source === 'text') excluded.add(kind); decision = 'excluded-local-negation';}
   else if (source === 'semantic-concept' && excluded.has(kind)) decision = 'excluded-by-original-text';
   else {observedEvidence.push({kind, source, cue: match.span.text}); decision = 'included-topology-evidence';}
   emit('topology-decision', {cueId: match.cueId, span: match.span, topology: kind, decision, source,
    appliesTo: 'conjunctive route requirements', excludedTopologies: [...excluded]});
  }
 }
 topology('text');
 const useConcept = observedEvidence.length === 0;
 emit('semantic-fallback', {source: 'semantic-concept', state: useConcept ? 'evaluated' : 'not-evaluated',
  reason: useConcept ? 'no positive original-text topology evidence' : 'original text already supplies topology evidence',
  textExcludedTopologies: [...excluded], conceptAvailable: concept.length > 0});
 if (useConcept) topology('semantic-concept');
 const useOpenness = observedEvidence.length === 0 && !excluded.has('enclosed-passage');
 const opennessAccepted = useOpenness && axes.openness === 'enclosed';
 emit('semantic-fallback', {source: 'semantic-openness', field: 'axes.openness', state: useOpenness ? 'evaluated' : 'not-evaluated',
  reason: observedEvidence.length ? 'positive topology evidence already exists' : excluded.has('enclosed-passage') ? 'explicit text excludes enclosed-passage topology' : 'no positive text or concept topology evidence',
  observedEnclosedValue: axes.openness === 'enclosed', accepted: opennessAccepted,
  consequence: opennessAccepted ? 'enclosed-passage evidence from semantic-openness; no text span exists' : 'none'});
 if (opennessAccepted) observedEvidence.push({kind: 'enclosed-passage', source: 'semantic-openness', cue: 'enclosed'});
 emit('topology-compilation', {evidence: original.evidence, required: original.required, excludedTopologies: [...excluded],
  observedEvidenceMatchesFrozenCompiler: JSON.stringify(observedEvidence) === JSON.stringify(original.evidence),
  alternatives: 'The frozen compiler retains conjunctive requirements; it does not choose between alternatives.'});

 // These scans record every lexical cue, including candidates after the first positive match.
 // The aggregate decisions below are read from the frozen compiler, not substituted for it.
 const positive = (matches: Match[]) => matches.some(match => !match.negated);
 const baseOpen = inspect('text', 'original-open-sky', /\b(open[ -]air|open[ -]sky|roofless|uncovered|without a roof|without roof)\b/g, 'original');
 const baseCover = inspect('text', 'original-cover', /\b(covered|roofed|ceiling|underground|enclosed)\b/g, 'original');
 const walls = inspect('text', 'opposing-walls', /\b(enclosed|walls?|walled|tunnel|corridor|cave|cavern)\b/g, 'original');
 const width = inspect('text', 'minimum-width', /\b(broad|wide|spacious|vast|large)\b/g, 'original');
 emit('original-requirements', {requirements: original.requirements,
  openSky: {inherentCourtyard: original.required.includes('open-courtyard'), positiveCueIds: baseOpen.filter(m => !m.negated).map(m => m.cueId)},
  covered: {inherentBroadInterior: original.required.includes('broad-covered-interior'), positiveCueIds: baseCover.filter(m => !m.negated).map(m => m.cueId), inherentCoverEvidence: original.evidence.filter(item => INHERENT_COVER.test(item.cue)), inherentCoverSuppressedByOpenSky: original.requirements.openSky},
  opposingWalls: {positiveCueIds: walls.filter(m => !m.negated).map(m => m.cueId), result: original.requirements.opposingWalls},
  minimumWidth: {positiveCueIds: width.filter(m => !m.negated).map(m => m.cueId), defaultMetres: 0.6, positiveModifierMetres: 2.4,
   resultMetres: original.requirements.minimumWidth, appliedScope: 'one global minimumWidth field, regardless of the modifier’s nearby noun; downstream witnesses decide where to consume that field'}});

 const roofs = inspect('text', 'corrected-roof', /\b(?:roofs?|roofed|ceilings?|covered)\b/g, 'corrected');
 const open = inspect('text', 'corrected-open-sky', /\b(?:open[ -]air|open[ -]sky|roofless|uncovered)\b/g, 'corrected');
 const underground = inspect('text', 'corrected-underground', /\bunderground\b/g, 'corrected');
 const enclosed = inspect('text', 'corrected-enclosed', /\benclosed\b/g, 'corrected');
 const roofless = inspect('text', 'corrected-roofless', /\b(?:roofless|uncovered)\b/g, 'corrected');
 const positiveRoof = positive(roofs), negativeRoof = roofs.some(m => m.negated);
 const explicitOpen = positive(open) || negativeRoof, openSky = original.requirements.openSky || explicitOpen;
 const explicitCover = positiveRoof || positive(underground) || (!openSky && positive(enclosed));
 const inherentCover = !openSky && original.evidence.some(item => INHERENT_COVER.test(item.cue));
 const lacksRoof = !positiveRoof && (negativeRoof || positive(roofless));
 emit('roof-correction', {before: original.requirements, after: result.requirements,
  observedInputs: {positiveRoof, negativeRoof, explicitOpen, inheritedOpenSky: original.requirements.openSky, openSky, explicitCover, inherentCover, lacksRoof, inherentBroadInterior: original.required.includes('broad-covered-interior')},
  enclosedContribution: {positiveCueIds: enclosed.filter(m => !m.negated).map(m => m.cueId), state: openSky ? 'suppressed-by-open-sky' : 'eligible-as-cover-cue'},
  positiveRoofCueIds: roofs.filter(m => !m.negated).map(m => m.cueId), negativeRoofCueIds: roofs.filter(m => m.negated).map(m => m.cueId),
  rule: 'Negated/absent roof cues can request open sky. With open sky, enclosed alone is lateral; separate positive roof cues still require cover. Explicit rooflessness conflicts with frozen broad-covered-interior topology.',
  observedRequirementsMatchFrozenCompiler: openSky === result.requirements.openSky && (!lacksRoof && (original.required.includes('broad-covered-interior') || explicitCover || inherentCover)) === result.requirements.covered,
  supportedBefore: original.supported, supportedAfter: result.supported});

 // Scope is an independent lexical hypothesis, deliberately absent from the returned criteria.
 const modifierPattern = /\b(?:broad|wide|spacious|vast|large|narrow|compact|small|tall|high|low|open|enclosed)\b/g;
 const nouns = /\b(?:entrances?|entries|entry|openings?|apertures?|doors?|doorways?|gates?|arches|arch|passages?|corridors?|tunnels?|caves?|caverns?|chambers?|halls?|rooms?|interiors?|courtyards?|bridges?|roofs?|ceilings?|walls?|floors?)\b/;
 for (const modifier of inspect('text', 'scope-modifier', modifierPattern, 'original')) {
  const tail = normalized.text.slice(modifier.span.end, modifier.span.end + 48);
  const clauseEnd = tail.search(/[.!?;,:]|\b(?:and|or|but|with|without)\b/);
  const clause = clauseEnd < 0 ? tail : tail.slice(0, clauseEnd), noun = clause.match(nouns);
  const referent = noun ? span('text', modifier.span.end + noun.index!, modifier.span.end + noun.index! + noun[0].length) : null;
  const widthContributor = width.find(m => m.span.start === modifier.span.start && !m.negated);
  const localOpening = referent && /^(?:entrances?|entries|entry|openings?|apertures?|doors?|doorways?|gates?|arches|arch)$/.test(referent.text);
  emit('modifier-scope-observation', {modifier: modifier.span, originalNegationMatched: modifier.negated,
   likelyReferent: referent, confidence: 'lexical-proximity-hypothesis-only',
   inspectionRule: 'first recognized following noun within 48 normalized code units, stopping at punctuation or a listed conjunction/preposition',
   frozenAppliedScope: widthContributor ? 'global-minimum-width-field' : 'no minimum-width contribution from this token',
   requirementMetres: result.requirements.minimumWidth,
   limitation: 'This is not a syntactic attachment or an assertion of intended meaning; narrowness and height adjectives have no dedicated dimension fields.'});
  if (widthContributor && localOpening) emit('scope-warning', {code: 'possible-local-width-promoted-to-global', modifier: modifier.span, likelyReferent: referent,
   observation: 'A width modifier next to a local opening noun sets the same global minimumWidth field as a whole-space modifier.',
   severity: 'hypothesis-needing-intent-review', changesAcceptance: false});
  if (!modifier.negated && /^(?:narrow|compact|small)$/.test(modifier.span.text)) emit('scope-warning', {code: 'size-adjective-has-no-dedicated-bound', modifier: modifier.span, likelyReferent: referent,
   observation: 'The compiler has no maximum-width or relative-size requirement for this adjective; the physical minimum remains independently enforced.',
   severity: 'lexically-observed-representation-limit', changesAcceptance: false});
 }
 for (let i = 0; i < original.ambiguities.length; i++) emit('compiler-ambiguity', {phase: 'original', index: i, message: original.ambiguities[i], retainedInCorrected: result.ambiguities.includes(original.ambiguities[i])});
 for (let i = 0; i < result.ambiguities.length; i++) emit('compiler-ambiguity', {phase: 'corrected', index: i, message: result.ambiguities[i], presentInOriginal: original.ambiguities.includes(result.ambiguities[i])});
 emit('final-criteria', {criteria: result, changedByTracing: false, sourceOfAcceptance: 'deriveCorrectedSpatialCriteria'});
 return result;
}
