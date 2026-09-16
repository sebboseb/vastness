/** Frozen lexical interpretation: only user text and the documented semantic envelope are inputs. */
export type SpatialKind = 'enclosed-passage' | 'open-courtyard' | 'doorway-crossing' | 'elevated-bridge' | 'broad-covered-interior';
export type SpatialCriteria = {
 version: 1; supported: boolean; required: SpatialKind[];
 evidence: {kind: SpatialKind; source: 'text' | 'semantic-concept' | 'semantic-openness'; cue: string}[];
 ambiguities: string[];
 requirements: {openSky: boolean; covered: boolean; opposingWalls: boolean; minimumWidth: number};
 physical: {radius: 0.3; height: 1.8; eyeHeight: 1.65; maxStep: 0.25; maxSlopeDegrees: 35; minimumDisplacement: 3; reversible: true};
};
const patterns: [SpatialKind, RegExp][] = [
 ['enclosed-passage', /\b(tunnels?|corridors?|passages?|caves?|caverns?|chambers?)\b/g],
 ['open-courtyard', /\b(courtyards?|courts?|walled gardens?|enclosed gardens?)\b/g],
 ['doorway-crossing', /\b(arch(?:way)?s?|doorways?|door openings?|gateways?|gates?|portals?)\b/g],
 ['elevated-bridge', /\b(bridges?|footbridges?|viaducts?)\b/g],
 ['broad-covered-interior', /\b(halls?|rooms?|interiors?|atriums?|atria|hangars?|warehouses?|cathedrals?)\b/g],
];
export function deriveSpatialCriteria(rawIntent: string, semantics?: unknown): SpatialCriteria {
 const evidence: SpatialCriteria['evidence'] = [], ambiguities: string[] = [], excluded = new Set<SpatialKind>();
 const envelope = semantics && typeof semantics === 'object' ? semantics as Record<string, unknown> : {};
 const concept = typeof envelope.concept === 'string' ? envelope.concept : '';
 const normalize = (value: string) => value.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').slice(0, 2400);
 const text = normalize(rawIntent), semanticText = normalize(concept);
 function negated(value: string, index: number) {return /\b(?:no|not|without|avoid)(?:\s+(?:a|an|any|the|enclosed|covered|open))?\s*$/.test(value.slice(Math.max(0, index - 45), index));}
 function collect(value: string, source: 'text' | 'semantic-concept') {
  for (const [kind, pattern] of patterns) for (const match of value.matchAll(pattern)) {
   if (negated(value, match.index!)) {if (source === 'text') excluded.add(kind); ambiguities.push(`Negated ${match[0]} is excluded from positive topology requirements.`); continue;}
   if (source === 'text' || !excluded.has(kind)) evidence.push({kind, source, cue: match[0]});
  }
 }
 collect(text, 'text');
 // Original text is authoritative. Concept supplies a fallback only, so a lossy compiler cannot add topology.
 if (!evidence.length) collect(semanticText, 'semantic-concept');
 const axes = envelope.axes && typeof envelope.axes === 'object' ? envelope.axes as Record<string, unknown> : {};
 if (!evidence.length && !excluded.has('enclosed-passage') && axes.openness === 'enclosed') evidence.push({kind: 'enclosed-passage', source: 'semantic-openness', cue: 'enclosed'});
 const required = [...new Set(evidence.map(item => item.kind))];
 if (!required.length) ambiguities.push('No supported spatial topology was specified; generic objects or open scenery cannot be accepted as an inferred interior.');
 if (required.length > 1) ambiguities.push('Multiple positive topology cues are conjunctive: the same supported route must witness each requirement.');
 const positive = (pattern: RegExp) => [...text.matchAll(pattern)].some(match => !negated(text, match.index!));
 const openSky = required.includes('open-courtyard') || positive(/\b(open[ -]air|open[ -]sky|roofless|uncovered|without a roof|without roof)\b/g);
 const covered = required.includes('broad-covered-interior') || positive(/\b(covered|roofed|ceiling|underground|enclosed)\b/g) || (!openSky && evidence.some(item => /^(?:tunnels?|caves?|caverns?|chambers?)$/.test(item.cue)));
 if (openSky && covered) ambiguities.push('Both open-sky and covered requirements occur; they must be witnessed on different route portions.');
 if (/\b(or|either)\b/.test(text) && required.length > 1) ambiguities.push('Alternative topology wording is not resolved by this lexical compiler; conservative conjunction retained.');
 return {version: 1, supported: required.length > 0, required, evidence, ambiguities,
  requirements: {openSky, covered, opposingWalls: positive(/\b(enclosed|walls?|walled|tunnel|corridor|cave|cavern)\b/g), minimumWidth: positive(/\b(broad|wide|spacious|vast|large)\b/g) ? 2.4 : 0.6},
  physical: {radius: 0.3, height: 1.8, eyeHeight: 1.65, maxStep: 0.25, maxSlopeDegrees: 35, minimumDisplacement: 3, reversible: true}};
}
