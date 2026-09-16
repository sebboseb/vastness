import assert from 'node:assert/strict';
import {test} from 'node:test';
import {compileDiagnosedCriteria as baseline} from './criteria-walkway.ts';
import {compileDiagnosedCriteria, DOORWAY_SCOPE_METHOD_VERSION} from './criteria-doorway.ts';
import type {TraceEvent} from './trace.ts';

function observed(text: string, semantics?: unknown) {
 const events: TraceEvent[] = [];
 const criteria = compileDiagnosedCriteria(text, semantics, event => events.push(event));
 return {criteria, events};
}

test('local doorway width moves only to its topology and preserves all remaining obligations', () => {
 for (const text of ['a chamber with a broad doorway and high ceiling', 'a passage through a wide stone arch',
  'a corridor with a large human doorway', 'a chamber with a spacious door opening', 'a tunnel with a vast archway',
  'a chamber with a broad doorway and a wide archway']) {
  const before = baseline(text), {criteria, events} = observed(text);
  assert.equal(before.requirements.minimumWidth, 2.4, text);
  assert.equal(criteria.requirements.minimumWidth, 0.6, text);
  assert.deepEqual(criteria.widthByTopology, {'doorway-crossing': 2.4});
  assert.deepEqual(criteria, {...before, requirements: {...before.requirements, minimumWidth: 0.6}, widthByTopology: {'doorway-crossing': 2.4}});
  assert.deepEqual(criteria.physical, before.physical);
  assert.deepEqual(criteria.required, before.required);
  assert.deepEqual(criteria.ambiguities, before.ambiguities);
  assert.equal(events.at(-2)?.applied, true);
  assert.equal(events.at(-1)?.methodVersion, DOORWAY_SCOPE_METHOD_VERSION);
  assert.deepEqual(compileDiagnosedCriteria(text), criteria);
 }
});

test('independent whole-space modifiers cannot be lost when a doorway is also broad', () => {
 for (const space of ['broad chamber', 'wide passage', 'large room', 'spacious corridor', 'vast interior']) {
  const text = `a ${space} with a broad doorway`;
  assert.equal(JSON.stringify(compileDiagnosedCriteria(text)), JSON.stringify(baseline(text)), text);
 }
 for (const text of ['a broad chamber with a doorway', 'a chamber with a doorway and wide floor',
  'a bridge with a doorway joining broad stone landings', 'a wide cave passage with a large doorway'])
  assert.deepEqual(compileDiagnosedCriteria(text), baseline(text), text);
});

test('entrance, bare opening, punctuation and unresolved modifier attachment preserve baseline', () => {
 for (const text of ['a chamber with a broad entrance', 'a chamber with a broad entrance and a doorway',
  'a chamber with a broad opening and a doorway', 'a chamber with a broad window opening and an arch',
  'a chamber with a broad, doorway', 'a chamber with a broad and tall doorway',
  'a chamber with a broad vestibule before a doorway', 'a broad doorway-shaped chamber', 'a chamber with a broad tiny doorway',
  'a chamber with a broad ornate stone doorway', 'a chamber with a broad stone brick wooden high doorway']) {
  assert.deepEqual(compileDiagnosedCriteria(text), baseline(text), text);
  assert.equal(observed(text).events.at(-2)?.applied, false);
 }
});

test('negation, alternatives and conflicting baseline requirements never change', () => {
 for (const text of ['a chamber with no broad doorway', 'a chamber without a broad doorway',
  'a chamber with a broad doorway but no roof', 'a chamber with a broad doorway without furniture',
  'either a chamber or a broad doorway', 'a chamber with a possibly broad doorway',
  'a chamber with a broad doorway?', 'a chamber with a broad doorway that isn’t real',
  'a chamber with a broad doorway under open sky and covered ceiling', 'a roofless hall with a broad doorway',
  'a chamber with a broad doorway, avoiding a tunnel', 'no chamber with a broad doorway']) {
  assert.deepEqual(compileDiagnosedCriteria(text), baseline(text), text);
 }
});

test('one topology, body width, walkway alias and semantic fallback remain byte-identical', () => {
 for (const text of ['a broad doorway', 'a large stone arch', 'a chamber with a doorway', 'a narrow corridor with a doorway',
  'a covered walkway between walls', 'a broad covered walkway between walls', 'somewhere with a broad entrance']) {
  for (const semantics of [undefined, {concept: 'a doorway and a chamber'}, {axes: {openness: 'enclosed'}}])
   assert.equal(JSON.stringify(compileDiagnosedCriteria(text, semantics)), JSON.stringify(baseline(text, semantics)), text);
 }
});

test('trace keeps the baseline prefix and exact normalized attachment spans before scoped output', () => {
 const text = 'Ａ chamber with a BROAD\tstone doorway', beforeEvents: TraceEvent[] = [];
 const before = baseline(text, undefined, event => beforeEvents.push(event));
 const {criteria, events} = observed(text);
 assert.deepEqual(events.slice(0, -2), beforeEvents);
 assert.equal((events.at(-3)?.criteria as typeof before).requirements.minimumWidth, 2.4);
 assert.equal(events.at(-2)?.kind, 'doorway-scope-decision');
 assert.equal(events.at(-2)?.decisionId, 'doorway-scope:0');
 assert.equal(events.at(-1)?.kind, 'doorway-final-criteria');
 assert.deepEqual(events.at(-1)?.criteria, criteria);
 const normalized = text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ');
 const modifiers = events.at(-2)?.modifiers as {modifier: {start: number; end: number; text: string}; noun: {start: number; end: number; text: string}; attachment: {start: number; end: number; text: string}}[];
 for (const item of modifiers) for (const span of [item.modifier, item.noun, item.attachment]) assert.equal(normalized.slice(span.start, span.end), span.text);
 assert.equal(modifiers[0].noun.text, 'doorway');
 assert.deepEqual(events, observed(text).events);
});

test('clipping, metadata, sink mutation and sink failures cannot silently change scope', () => {
 const text = 'a chamber with a broad doorway';
 assert.deepEqual(compileDiagnosedCriteria(text + ' ' + 'x'.repeat(2400)), baseline(text + ' ' + 'x'.repeat(2400)));
 const expected = compileDiagnosedCriteria(text), semantics = {category: 'bridge', id: 'doorway', passed: false};
 assert.deepEqual(compileDiagnosedCriteria(text, semantics), expected);
 assert.deepEqual(compileDiagnosedCriteria(text, semantics, event => {
  if (event.kind === 'doorway-final-criteria') (event.criteria as typeof expected).widthByTopology!['doorway-crossing'] = 0.6;
  if (event.kind === 'doorway-scope-decision') event.applied = false;
  if (event.kind === 'walkway-final-criteria') (event.criteria as typeof expected).requirements.minimumWidth = 99;
 }), expected);
 assert.throws(() => compileDiagnosedCriteria(text, undefined, event => {
  if (event.kind === 'doorway-scope-decision') throw new Error('trace failed');
 }), /trace failed/);
});
