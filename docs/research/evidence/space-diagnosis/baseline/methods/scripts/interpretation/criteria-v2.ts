import {deriveSpatialCriteria, type SpatialCriteria} from './criteria.ts';

const conflict = 'Both open-sky and covered requirements occur; they must be witnessed on different route portions.';
/** Post-hoc, separately frozen roof correction; the original compiler and selector remain unchanged. */
export function deriveCorrectedSpatialCriteria(rawIntent: string, semantics?: unknown): SpatialCriteria {
 const criteria = deriveSpatialCriteria(rawIntent, semantics);
 const text = rawIntent.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').slice(0, 2400);
 // Bounded local qualifier handling, not a new language parser. In particular,
 // no IDs/categories/outcomes or semantic fields other than the original compiler's enter here.
 const negated = (index: number) => /\b(?:no|not|without|avoid)(?:\s+(?:a|an|any|the|overhead|high|low|vaulted|solid|continuous|stone|wooden|enclosing)){0,4}\s*$/.test(text.slice(Math.max(0, index - 90), index));
 const matches = (pattern: RegExp) => [...text.matchAll(pattern)];
 const positive = (pattern: RegExp) => matches(pattern).some(match => !negated(match.index!));
 const roofWords = matches(/\b(?:roofs?|roofed|ceilings?|covered)\b/g);
 const positiveRoof = roofWords.some(match => !negated(match.index!));
 const negativeRoof = roofWords.some(match => negated(match.index!));
 const explicitOpen = positive(/\b(?:open[ -]air|open[ -]sky|roofless|uncovered)\b/g) || negativeRoof;
 const openSky = criteria.requirements.openSky || explicitOpen;
 // 'Enclosed by walls ... under an open sky' describes lateral boundaries.
 // A separately stated roof/covered arcade still demands its own covered route portion.
 const explicitCover = positiveRoof || positive(/\bunderground\b/g) || (!openSky && positive(/\benclosed\b/g));
 const inherentCover = !openSky && criteria.evidence.some(item => /^(?:tunnels?|caves?|caverns?|chambers?)$/.test(item.cue));
 const lacksRoof = !positiveRoof && (negativeRoof || positive(/\b(?:roofless|uncovered)\b/g));
 const covered = !lacksRoof && (criteria.required.includes('broad-covered-interior') || explicitCover || inherentCover);
 if (openSky !== criteria.requirements.openSky || covered !== criteria.requirements.covered) {
  criteria.requirements = {...criteria.requirements, openSky, covered};
  criteria.ambiguities = criteria.ambiguities.filter(value => value !== conflict);
  // Preserve the original ambiguity ordering: this precedes any alternative-topology note.
  if (openSky && covered) {
   const alternative = criteria.ambiguities.findIndex(value => value.startsWith('Alternative topology wording'));
   if (alternative < 0) criteria.ambiguities.push(conflict); else criteria.ambiguities.splice(alternative, 0, conflict);
  }
 }
 if (lacksRoof && criteria.required.includes('broad-covered-interior')) {
  criteria.supported = false;
  criteria.ambiguities.push('Explicitly roofless hall/interior is outside the frozen broad-covered-interior topology; no roof is inferred to resolve it.');
 }
 return criteria;
}
