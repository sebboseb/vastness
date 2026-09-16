import type {SpatialCriteria} from '../interpretation/criteria.ts';
import {compileDiagnosedCriteria as compileBaseline} from './criteria-traced.ts';
import type {TraceSink} from './trace.ts';

export const WALKWAY_METHOD_VERSION = 'covered-walled-walkway-alias-v1';
const NO_TOPOLOGY = 'No supported spatial topology was specified; generic objects or open scenery cannot be accepted as an inferred interior.';
const QUALIFIER = 'covered|roofed|walled|and|empty|straight|stone|brick|wooden|solid|high|low|tall|narrow|broad|wide|flat|level';
const prefixPattern = new RegExp(`\\b(?:(?:${QUALIFIER}) ){1,6}walkways?\\b`, 'g');
const betweenPattern = /^ between (?:(?:two|parallel|stone|brick|wooden|solid|high|low|tall) ){0,4}walls\b/;
// This alias deliberately declines even unrelated negation instead of guessing its scope.
const uncertainPattern = /\b(?:no|not|without|avoid|never|neither|nor|except|unless|rather|but|however|yet|although|or|either|maybe|perhaps|possibly|supposedly|apparently|hypothetical|optional|optionally|if|whether|would|could|might|should|may|imagine|imaginary|lack|lacks|lacking|missing|absent|exclude|excluded|excluding|uncovered|unroofed|roofless|unwalled|open)\b|n['’]t\b|[?]/g;

type Span = {source: 'text'; start: number; end: number; text: string; offsets: 'normalized-utf16'};

/** Separately frozen lexical alias; geometry and every physical requirement still need proof. */
export function compileDiagnosedCriteria(rawIntent: string, semantics?: unknown, trace?: TraceSink): SpatialCriteria {
 const baseline = compileBaseline(rawIntent, semantics, trace);
 const normalized = rawIntent.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ');
 const text = normalized.slice(0, 2400);
 const span = (start: number, end: number): Span => ({source: 'text', start, end, text: text.slice(start, end), offsets: 'normalized-utf16'});
 const reasons: string[] = [];
 const emit = (kind: string, decisionId: string, fields: Record<string, unknown>) => trace?.(structuredClone({stage: 'intent', kind, decisionId, methodVersion: WALKWAY_METHOD_VERSION, ...fields}));
 let corrected = baseline;
 let attachment: {walkway: Span; cover: Span; walls: Span; phrase: Span; wallRelation: string} | null = null;
 let uncertainty: Span[] = [];
 if (baseline.supported) reasons.push('existing-supported-criteria-preserved');
 else if (baseline.required.length || baseline.evidence.length || baseline.ambiguities.some(message => message !== NO_TOPOLOGY)) reasons.push('existing-topology-or-ambiguity-preserved');
 else {
  if (normalized.length > 2400) reasons.push('input-truncated');
  uncertainty = [...text.matchAll(uncertainPattern)].map(match => span(match.index!, match.index! + match[0].length));
  if (uncertainty.length) reasons.push('negation-alternative-or-uncertain-wording');
  const walkways = [...text.matchAll(/\bwalkways?\b/g)];
  if (walkways.length !== 1) reasons.push('requires-exactly-one-textual-walkway');
  const phrases = [...text.matchAll(prefixPattern)];
  for (const phrase of phrases) {
   const start = phrase.index!, end = start + phrase[0].length;
   const cover = /\b(?:covered|roofed)\b/.exec(phrase[0]);
   const walled = /\bwalled\b/.exec(phrase[0]);
   const between = betweenPattern.exec(text.slice(end));
   if (!cover || (!walled && !between)) continue;
   const walkway = /\bwalkways?\b/.exec(phrase[0])!;
   const wallStart = walled ? start + walled.index : end + between![0].lastIndexOf('walls');
   attachment = {walkway: span(start + walkway.index, end), cover: span(start + cover.index, start + cover.index + cover[0].length),
    walls: span(wallStart, wallStart + (walled ? walled[0].length : 5)), phrase: span(start, between ? end + between[0].length : end),
    wallRelation: walled ? 'direct-walled-modifier' : 'immediate-between-walls'};
   break;
  }
  if (!attachment) reasons.push('no-direct-covered-and-walled-walkway-phrase');
  if (!baseline.requirements.covered || !baseline.requirements.opposingWalls || baseline.requirements.openSky) reasons.push('existing-roof-wall-or-open-sky-requirements-conflict');
  if (!reasons.length && attachment) corrected = {...baseline, supported: true, required: ['enclosed-passage'],
   evidence: [{kind: 'enclosed-passage', source: 'text', cue: attachment.phrase.text}],
   ambiguities: baseline.ambiguities.filter(message => message !== NO_TOPOLOGY)};
 }
 emit('walkway-alias-decision', 'walkway:0', {applied: corrected !== baseline, reasons, attachment, uncertainty,
  baselineSupported: baseline.supported, baselineRequired: baseline.required,
  rule: 'One directly covered/roofed walkway that is directly walled or immediately between qualified walls; existing unsupported empty topology only.',
  source: 'normalized-original-text-only', semanticFallbackAdded: false,
  limitations: ['Finite lexical attachment grammar, not syntactic or semantic certainty.', 'Any listed uncertainty or negation marker declines this alias, including unrelated negation.', 'No source geometry or route evidence is inspected. Acceptance still requires the existing enclosed-passage and physical witnesses.']});
 emit('walkway-final-criteria', 'walkway:1', {criteria: corrected, changedByAlias: corrected !== baseline,
  sourceOfAcceptance: corrected !== baseline ? WALKWAY_METHOD_VERSION : 'unchanged-baseline-criteria',
  requirementsPreserved: true, physicalPreserved: true});
 return corrected;
}
