import assert from 'node:assert/strict';
import {test} from 'node:test';
import {compileDiagnosedCriteria as baseline} from './criteria-traced.ts';
import {compileDiagnosedCriteria, WALKWAY_METHOD_VERSION} from './criteria-walkway.ts';
import type {TraceEvent} from './trace.ts';

function observed(text: string, semantics?: unknown) {
 const events: TraceEvent[] = [];
 const criteria = compileDiagnosedCriteria(text, semantics, event => events.push(event));
 return {criteria, events};
}

test('direct covered and walled walkways gain only the existing passage classification', () => {
 for (const text of ['a covered walkway between brick walls', 'a broad roofed walkway between two parallel stone walls',
  'a covered and walled walkway', 'a walled and covered straight walkway', 'a narrow roofed wooden walkway between tall walls']) {
  const before = baseline(text), {criteria, events} = observed(text);
  assert.equal(before.supported, false, text);
  assert.equal(criteria.supported, true, text);
  assert.deepEqual(criteria.required, ['enclosed-passage']);
  assert.deepEqual(criteria.requirements, before.requirements);
  assert.deepEqual(criteria.physical, before.physical);
  assert.deepEqual(criteria.ambiguities, []);
  assert.equal(criteria.evidence[0].source, 'text');
  assert.equal(events.at(-2)?.applied, true);
  assert.equal(events.at(-1)?.methodVersion, WALKWAY_METHOD_VERSION);
  assert.deepEqual(compileDiagnosedCriteria(text), criteria);
 }
 assert.equal(compileDiagnosedCriteria('a broad covered walkway between walls').requirements.minimumWidth, 2.4);
 assert.equal(compileDiagnosedCriteria('a narrow covered walkway between walls').requirements.minimumWidth, 0.6);
});

test('negation, contradictory or alternative wording never gains alias acceptance', () => {
 for (const text of ['no covered walkway between walls', 'not a covered walkway between walls', 'avoid any covered walkway between walls',
  'a covered walkway without walls', 'a covered walkway between no walls', 'a covered walkway between walls without a roof',
  'a covered walkway between walls under open sky', 'a roofless covered walkway between walls',
  'either a covered walkway between walls or scenery', 'maybe a covered walkway between walls',
  'a covered walkway between walls but the roof is absent', 'a covered walkway between walls lacking overhead cover',
  'a covered walkway between walls and missing a roof', 'a supposedly covered walkway between walls',
  'a covered walkway between walls?', 'a covered walkway between walls that are optional',
  'a covered walkway between walls that aren’t solid', 'a covered walkway between walls without furniture',
  'a covered walkway between walls; no corridor', 'a covered walkway between walls and another covered walkway between walls']) {
  const before = baseline(text), {criteria, events} = observed(text);
  assert.equal(JSON.stringify(criteria), JSON.stringify(before), text);
  assert.equal(events.at(-2)?.applied, false, text);
 }
});

test('unattached cover, missing walls, generic walkways and semantic-only aliases stay unsupported', () => {
 for (const text of ['a walkway', 'an open walkway', 'a covered walkway', 'a walled walkway',
  'a walkway between walls near a covered kiosk', 'a covered kiosk beside a walkway between walls',
  'a covered walkway next to walls', 'a covered walkway, between walls', 'a walkway between walls with a ceiling',
  'a covered painted decorative elaborate curved bright distant walkway between walls']) {
  const {criteria, events} = observed(text);
  assert.equal(criteria.supported, false, text);
  assert.equal(events.at(-2)?.applied, false, text);
  assert.deepEqual(criteria, baseline(text));
 }
 const semantics = {concept: 'a covered walkway between walls', axes: {openness: 'mixed'}};
 assert.equal(compileDiagnosedCriteria('somewhere quiet', semantics).supported, false);
});

test('every existing supported or independently ambiguous result is byte-identical', () => {
 const bases = ['a tunnel', 'a broad hall', 'a courtyard', 'a doorway', 'a covered bridge', 'a cave', 'a passage'];
 const suffixes = ['', ' with a covered walkway between walls', ' without a roof', ' or a courtyard'];
 for (const base of bases) for (const suffix of suffixes) {
  const text = base + suffix;
  for (const semantics of [undefined, {concept: 'a bridge', axes: {openness: 'enclosed'}}])
   assert.equal(JSON.stringify(observed(text, semantics).criteria), JSON.stringify(baseline(text, semantics)), text);
 }
 const text = 'a covered walkway between walls';
 for (const semantics of [{concept: 'a hall'}, {axes: {openness: 'enclosed'}}, {concept: 'no tunnel'}])
  assert.equal(JSON.stringify(observed(text, semantics).criteria), JSON.stringify(baseline(text, semantics)));
});

test('trace retains the complete original unsupported decision before explicit alias and final criteria', () => {
 const text = 'Ａ  covered\twalkway between brick walls', originalEvents: TraceEvent[] = [];
 const original = baseline(text, undefined, event => originalEvents.push(event));
 const {criteria, events} = observed(text);
 assert.deepEqual(events.slice(0, -2), originalEvents);
 assert.equal(original.supported, false);
 assert.equal((events.at(-3)?.criteria as {supported: boolean}).supported, false);
 assert.equal(events.at(-2)?.kind, 'walkway-alias-decision');
 assert.equal(events.at(-2)?.decisionId, 'walkway:0');
 assert.equal(events.at(-1)?.kind, 'walkway-final-criteria');
 assert.equal(events.at(-1)?.decisionId, 'walkway:1');
 assert.deepEqual(events.at(-1)?.criteria, criteria);
 const normalized = text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ');
 const attachment = events.at(-2)?.attachment as Record<string, unknown>;
 for (const key of ['walkway', 'cover', 'walls', 'phrase']) {
  const span = attachment[key] as {start: number; end: number; text: string};
  assert.equal(normalized.slice(span.start, span.end), span.text);
 }
 assert.deepEqual(events, observed(text).events);
});

test('truncation, metadata, trace mutation and sink errors cannot silently weaken the rule', () => {
 const text = 'a covered walkway between walls';
 assert.equal(compileDiagnosedCriteria(text + ' '.repeat(2) + 'x'.repeat(2400)).supported, false);
 const expected = compileDiagnosedCriteria(text), semantics = {id: 'hall', category: 'bridge', passed: true};
 assert.deepEqual(compileDiagnosedCriteria(text, semantics), expected);
 const result = compileDiagnosedCriteria(text, semantics, event => {
  if (event.kind === 'walkway-final-criteria') (event.criteria as {supported: boolean}).supported = false;
  if (event.kind === 'walkway-alias-decision') event.applied = false;
  if (event.kind === 'final-criteria') (event.criteria as {supported: boolean}).supported = true;
 });
 assert.deepEqual(result, expected);
 assert.deepEqual(semantics, {id: 'hall', category: 'bridge', passed: true});
 assert.throws(() => compileDiagnosedCriteria(text, undefined, event => {
  if (event.kind === 'walkway-alias-decision') throw new Error('trace failed');
 }), /trace failed/);
});
