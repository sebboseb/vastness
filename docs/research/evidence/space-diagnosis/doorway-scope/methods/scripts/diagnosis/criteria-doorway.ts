import type {SpatialCriteria, SpatialKind} from '../interpretation/criteria.ts';
import {compileDiagnosedCriteria as compileBaseline} from './criteria-walkway.ts';
import type {TraceSink} from './trace.ts';

export type ScopedSpatialCriteria = SpatialCriteria & {widthByTopology?: Partial<Record<SpatialKind, number>>};
export const DOORWAY_SCOPE_METHOD_VERSION = 'local-doorway-width-scope-v1';
const CONJUNCTION = 'Multiple positive topology cues are conjunctive: the same supported route must witness each requirement.';
const attachmentPattern = /^ (?:(?:human|empty|clear|stone|brick|wooden|high|low|tall) ){0,3}(doorways?|archways?|arch|door openings?)(?= |[.,;:!?]|$)/;
const uncertainPattern = /\b(?:no|not|without|avoid(?:ing|ed)?|never|neither|nor|except|unless|rather|but|however|yet|although|or|either|maybe|perhaps|possibly|supposedly|apparently|hypothetical|optional|optionally|if|whether|would|could|might|should|may|imagine|imaginary|lack|lacks|lacking|missing|absent|exclude|excluded|excluding)\b|n['’]t\b|[?]/g;
type Span = {source: 'text'; start: number; end: number; text: string; offsets: 'normalized-utf16'};

/** Preserve the broad aperture requirement while localizing a narrowly attached doorway adjective. */
export function compileDiagnosedCriteria(rawIntent: string, semantics?: unknown, trace?: TraceSink): ScopedSpatialCriteria {
 const baseline = compileBaseline(rawIntent, semantics, trace);
 const normalized = rawIntent.normalize('NFKC').toLowerCase().replace(/\s+/g, ' '), text = normalized.slice(0, 2400);
 const span = (start: number, end: number): Span => ({source: 'text', start, end, text: text.slice(start, end), offsets: 'normalized-utf16'});
 const uncertainty = [...text.matchAll(uncertainPattern)].map(match => span(match.index!, match.index! + match[0].length));
 const modifiers = [...text.matchAll(/\b(broad|wide|spacious|vast|large)\b/g)].map(match => {
  const start = match.index!, end = start + match[0].length;
  const negated = /\b(?:no|not|without|avoid)(?:\s+(?:a|an|any|the|enclosed|covered|open))?\s*$/.test(text.slice(Math.max(0, start - 45), start));
  const attachment = attachmentPattern.exec(text.slice(end));
  const nounStart = attachment ? end + attachment[0].length - attachment[1].length : null;
  const noun = attachment && nounStart !== null ? span(nounStart, nounStart + attachment[1].length) : null;
  const boundToTextTopology = noun !== null && baseline.evidence.some(item => item.kind === 'doorway-crossing' && item.source === 'text' && item.cue === noun.text);
  return {modifier: span(start, end), originalNegationMatched: negated, noun, boundToTextTopology,
   attachment: noun ? span(start, noun.end) : null};
 });
 const positive = modifiers.filter(item => !item.originalNegationMatched), reasons: string[] = [];
 if (!baseline.supported || baseline.required.length < 2 || !baseline.required.includes('doorway-crossing')) reasons.push('requires-supported-conjunction-including-doorway');
 if (baseline.requirements.minimumWidth !== 2.4) reasons.push('no-global-broad-width-to-localize');
 if (baseline.ambiguities.some(message => message !== CONJUNCTION)) reasons.push('unresolved-baseline-ambiguity');
 if (normalized.length > 2400) reasons.push('input-truncated');
 if (uncertainty.length) reasons.push('negation-alternative-or-uncertain-wording');
 if (!positive.length || positive.some(item => !item.boundToTextTopology)) reasons.push('not-every-positive-width-cue-has-direct-doorway-attachment');
 const applied = reasons.length === 0;
 const corrected: ScopedSpatialCriteria = applied ? {...baseline, requirements: {...baseline.requirements, minimumWidth: 0.6}, widthByTopology: {'doorway-crossing': 2.4}} : baseline;
 trace?.(structuredClone({stage: 'intent', kind: 'doorway-scope-decision', decisionId: 'doorway-scope:0', methodVersion: DOORWAY_SCOPE_METHOD_VERSION,
  applied, reasons, modifiers, uncertainty, baselineRequired: baseline.required, baselineMinimumWidth: baseline.requirements.minimumWidth,
  rule: 'Supported conjunctive topologies with doorway-crossing; every positive width modifier directly attaches to a text-evidenced doorway, arch, archway or door opening.',
  globalMinimumWidth: corrected.requirements.minimumWidth, widthByTopology: corrected.widthByTopology ?? null,
  limitations: ['Finite lexical attachment grammar; no general syntactic certainty is claimed.', 'Bare opening, entrance, landing, independent whole-space width, negation and unresolved scope preserve the baseline.', 'The route consumer must enforce the topology-specific aperture width; all other geometric and physical obligations remain required.']}));
 trace?.(structuredClone({stage: 'intent', kind: 'doorway-final-criteria', decisionId: 'doorway-scope:1', methodVersion: DOORWAY_SCOPE_METHOD_VERSION,
  criteria: corrected, changedByScope: applied, sourceOfAcceptance: applied ? DOORWAY_SCOPE_METHOD_VERSION : 'unchanged-walkway-baseline',
  physicalPreserved: true, topologyRequirementsPreserved: true, localWidthRequirementPreserved: true}));
 return corrected;
}
