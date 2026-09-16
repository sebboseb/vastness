import assert from 'node:assert/strict';
import {test} from 'node:test';
import {deriveCorrectedSpatialCriteria} from '../interpretation/criteria-v2.ts';
import {compileDiagnosedCriteria} from './criteria-traced.ts';
import type {TraceEvent} from './trace.ts';

function observed(text: string, semantics?: unknown) {
 const events: TraceEvent[] = [];
 const criteria = compileDiagnosedCriteria(text, semantics, event => events.push(event));
 return {criteria, events};
}
const ofKind = (events: TraceEvent[], kind: string) => events.filter(event => event.kind === kind);

test('tracing and untraced wrapper preserve byte-identical frozen output on a synthetic language matrix', () => {
 const spaces = ['a tunnel', 'a corridor', 'a passage', 'a cave chamber', 'a courtyard', 'a covered bridge', 'a doorway', 'a broad hall', 'quiet mountains'];
 const qualifiers = ['', ' with a broad entrance', ' without a roof', ' under an open sky', ' with an overhead roof', ' or a courtyard', ' with no high vaulted ceiling'];
 const semantics = [undefined, {concept: 'a hall', axes: {openness: 'enclosed'}}, {concept: 'no tunnel', category: 'bridge', id: 'irrelevant', passed: true}];
 for (const space of spaces) for (const qualifier of qualifiers) for (const semantic of semantics) {
  const text = space + qualifier, expected = JSON.stringify(deriveCorrectedSpatialCriteria(text, semantic));
  assert.equal(JSON.stringify(compileDiagnosedCriteria(text, semantic)), expected, text);
  const traced = observed(text, semantic);
  assert.equal(JSON.stringify(traced.criteria), expected, text);
  for (const event of traced.events) {
   assert.equal(event.stage, 'intent');
   if ('observedEvidenceMatchesFrozenCompiler' in event) assert.equal(event.observedEvidenceMatchesFrozenCompiler, true, text);
   if ('observedRequirementsMatchFrozenCompiler' in event) assert.equal(event.observedRequirementsMatchFrozenCompiler, true, text);
  }
  assert.equal(JSON.stringify(ofKind(traced.events, 'final-criteria')[0].criteria), expected);
 }
});

test('broad entrance is explained as a global width contribution without silently fixing scope', () => {
 const {criteria, events} = observed('a narrow passage with a broad entrance and high ceiling');
 assert.equal(criteria.requirements.minimumWidth, 2.4);
 const original = ofKind(events, 'original-requirements')[0];
 assert.equal((original.minimumWidth as {resultMetres: number}).resultMetres, 2.4);
 const warning = ofKind(events, 'scope-warning').find(event => event.code === 'possible-local-width-promoted-to-global')!;
 assert.equal((warning.modifier as {text: string}).text, 'broad');
 assert.equal((warning.likelyReferent as {text: string}).text, 'entrance');
 assert.equal(warning.changesAcceptance, false);
 assert.equal(warning.severity, 'hypothesis-needing-intent-review');
 const narrow = ofKind(events, 'scope-warning').find(event => event.code === 'size-adjective-has-no-dedicated-bound')!;
 assert.equal((narrow.modifier as {text: string}).text, 'narrow');
 assert.equal(observed('a narrow passage').criteria.requirements.minimumWidth, 0.6);
 assert.ok(!ofKind(observed('a broad hall').events, 'scope-warning').some(event => event.code === 'possible-local-width-promoted-to-global'));
});

test('topology negation, skipped concept fallback and accepted semantic provenance are explicit', () => {
 const negated = observed('no tunnel', {concept: 'a tunnel', axes: {openness: 'enclosed'}});
 assert.equal(negated.criteria.supported, false);
 assert.ok(ofKind(negated.events, 'topology-decision').some(event => event.source === 'text' && event.decision === 'excluded-local-negation'));
 assert.ok(ofKind(negated.events, 'topology-decision').some(event => event.source === 'semantic-concept' && event.decision === 'excluded-by-original-text'));
 assert.ok(ofKind(negated.events, 'semantic-fallback').some(event => event.source === 'semantic-openness' && event.state === 'not-evaluated' && event.reason === 'explicit text excludes enclosed-passage topology'));
 const skipped = observed('a courtyard', {concept: 'a tunnel'});
 assert.ok(ofKind(skipped.events, 'semantic-fallback').some(event => event.source === 'semantic-concept' && event.state === 'not-evaluated'));
 assert.ok(!ofKind(skipped.events, 'topology-decision').some(event => event.source === 'semantic-concept'));
 const concept = observed('somewhere quiet', {concept: 'a hall'});
 assert.ok(ofKind(concept.events, 'topology-decision').some(event => event.source === 'semantic-concept' && event.decision === 'included-topology-evidence'));
 const openness = observed('somewhere quiet', {axes: {openness: 'enclosed'}});
 assert.ok(ofKind(openness.events, 'semantic-fallback').some(event => event.source === 'semantic-openness' && event.accepted === true));
 assert.deepEqual(openness.criteria.evidence, [{kind: 'enclosed-passage', source: 'semantic-openness', cue: 'enclosed'}]);
});

test('roof tracing explains the correction, separate cover cues and both negation rules', () => {
 const courtyard = observed('a courtyard enclosed by walls under an open sky');
 const correction = ofKind(courtyard.events, 'roof-correction')[0];
 assert.equal((correction.before as {covered: boolean}).covered, true);
 assert.equal((correction.after as {covered: boolean}).covered, false);
 assert.equal((correction.enclosedContribution as {state: string}).state, 'suppressed-by-open-sky');
 const mixed = observed('a courtyard under open sky with a roof over one arcade');
 assert.equal(mixed.criteria.requirements.openSky, true); assert.equal(mixed.criteria.requirements.covered, true);
 const negated = observed('a tunnel without any overhead roof');
 assert.equal(negated.criteria.requirements.covered, false);
 const roofWindow = ofKind(negated.events, 'negation-window').find(event => event.family === 'corrected-roof')!;
 assert.equal(roofWindow.rule, 'corrected'); assert.equal(roofWindow.matched, true);
 assert.equal((roofWindow.matchedSpan as {text: string}).text, 'without any overhead ');
 const unsupported = observed('a roofless hall');
 assert.equal(unsupported.criteria.supported, false);
 assert.ok(ofKind(unsupported.events, 'compiler-ambiguity').some(event => event.phase === 'corrected' && event.presentInOriginal === false));
});

test('all spans reference exact retained normalized text and compiler truncation is explicit', () => {
 const {events} = observed('Ａ  BROAD\tEntrance, then a cave ' + ' '.repeat(2500) + 'hall', {concept: 'Ａ　ROOM'});
 const sources = new Map(ofKind(events, 'normalized-source').map(event => [event.source, event.normalizedText as string]));
 function inspect(value: unknown) {
  if (!value || typeof value !== 'object') return;
  if ('offsets' in value && value.offsets === 'normalized-utf16') {
   assert.ok('source' in value && typeof value.source === 'string' && 'start' in value && typeof value.start === 'number' && 'end' in value && typeof value.end === 'number' && 'text' in value && typeof value.text === 'string');
   assert.equal(sources.get(value.source)!.slice(value.start, value.end), value.text);
   assert.ok(value.start >= 0 && value.end >= value.start && value.end <= sources.get(value.source)!.length);
  }
  for (const child of Object.values(value)) inspect(child);
 }
 events.forEach(inspect);
 assert.ok(sources.get('text')!.startsWith('a broad entrance'));
 const long = observed('a passage ' + 'x'.repeat(2600) + ' hall');
 const source = ofKind(long.events, 'normalized-source').find(event => event.source === 'text')!;
 assert.equal(source.retainedCodeUnits, 2400); assert.ok(Number(source.compilerOmittedCodeUnits) > 0);
 assert.ok(!long.criteria.required.includes('broad-covered-interior'));
});

test('event order is deterministic and sinks cannot mutate acceptance, inputs or later events', () => {
 const text = 'a broad hall with a roof', semantics = {concept: 'a tunnel', ignored: {category: 'doorway'}}, before = structuredClone(semantics);
 assert.deepEqual(observed(text, semantics).events, observed(text, semantics).events);
 const expected = deriveCorrectedSpatialCriteria(text, semantics);
 const result = compileDiagnosedCriteria(text, semantics, event => {
  if (event.kind === 'original-requirements') (event.requirements as {minimumWidth: number}).minimumWidth = 999;
  if (event.kind === 'final-criteria') (event.criteria as {supported: boolean}).supported = false;
 });
 assert.deepEqual(result, expected); assert.deepEqual(semantics, before);
 const clean = observed(text).events, metadata = observed(text, {category: 'courtyard', id: 'tunnel', passed: false}).events;
 assert.deepEqual(clean, metadata);
 assert.ok(clean.every((event, i) => event.decisionId === `intent:${i}`));
});

test('all matched cues are observable, while alternatives and local negation limits stay honest', () => {
 const text = 'either a broad hall or a wide chamber with no very high roof';
 const {criteria, events} = observed(text);
 assert.equal(ofKind(events, 'lexical-match').filter(event => event.family === 'minimum-width').length, 2);
 assert.ok(criteria.ambiguities.some(message => message.startsWith('Alternative topology wording')));
 const roof = ofKind(events, 'negation-window').find(event => event.family === 'corrected-roof')!;
 assert.equal(roof.matched, false); // "very" is not in the frozen local negation vocabulary.
 assert.equal(criteria.requirements.covered, true);
 assert.match(String(roof.conclusion), /semantic positivity is not established/);
 assert.throws(() => compileDiagnosedCriteria('a hall', undefined, () => {throw new Error('trace storage failed');}), /trace storage failed/);
});
