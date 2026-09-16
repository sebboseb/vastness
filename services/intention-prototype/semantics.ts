/** Deliberately small, inspectable compiler. Open concepts survive; no destination catalogue. */
import {z} from 'zod';
export const InputSchema=z.object({text:z.string().trim().min(3).max(1200),source:z.enum(['text','voice'])});
export type IntentInput=z.infer<typeof InputSchema>;
export const SemanticSchema=z.object({version:z.literal(1),kind:z.literal('intention-destination'),concept:z.string().min(1).max(600),axes:z.object({scale:z.enum(['intimate','human','vast']),density:z.enum(['sparse','balanced','dense']),mood:z.string().max(80),openness:z.enum(['enclosed','mixed','open'])}),representation:z.literal('abstract-solid')});
export type SemanticIntent=z.infer<typeof SemanticSchema>;
export function deriveIntent(input:IntentInput){
 const normalized=input.text.normalize('NFKC').replace(/\s+/g,' ').trim();
 const concept=normalized.replace(/^(?:please\s+)?(?:i\s+(?:want|wish|would like)\s+(?:to\s+)?|let\s+me\s+|take\s+me\s+to\s+|show\s+me\s+|create\s+)/i,'').replace(/^(?:find|enter|explore|see)\s+/i,'').slice(0,600);
 const words=normalized.toLowerCase();
 const matches=(pattern:string)=>{const regex=new RegExp(`\\b(${pattern})\\b`,'g');return [...words.matchAll(regex)].filter(m=>!/(?:not|no|without)\s+(?:a\s+|an\s+|very\s+)?$/.test(words.slice(Math.max(0,m.index!-20),m.index))).map(m=>m[0]);};
 const cues={vast:matches('enormous|vast|immense|huge|giant|towering|monumental'),intimate:matches('tiny|small|compact|intimate|miniature'),sparse:matches('quiet|sparse|empty|single|solitary|spacious|minimal'),dense:matches('dense|tangled|crowded|overgrown|packed|labyrinth'),open:matches('open|sky|outdoor|horizon|expansive'),enclosed:matches('enclosed|chamber|cave|underground|sheltered|interior'),quiet:matches('quiet|calm|still|peaceful|serene'),ominous:matches('ominous|dark|eerie|menacing|haunted'),luminous:matches('glowing|luminous|radiant|bioluminescent'),joyful:matches('joyful|playful|cheerful')};
 const axes:SemanticIntent['axes']={scale:cues.vast.length?'vast':cues.intimate.length?'intimate':'human',density:cues.dense.length?'dense':cues.sparse.length?'sparse':'balanced',mood:cues.ominous.length?'ominous':cues.quiet.length?'quiet':cues.luminous.length?'luminous':cues.joyful.length?'joyful':'unspecified',openness:cues.enclosed.length?'enclosed':cues.open.length?'open':'mixed'};
 return {semantics:SemanticSchema.parse({version:1,kind:'intention-destination',concept,axes,representation:'abstract-solid'}),derivation:{compiler:'lexical-semantic-v1',cues,limitations:['Rule-based axis extraction; no general language reasoning','Negation handling is local, not a complete semantic parser','Unrecognized concepts stay in the concept field; no fixed destination lookup','Concept is bounded to 600 characters; original input is retained separately']}};
}
