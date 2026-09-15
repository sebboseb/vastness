import {test} from 'node:test';
import assert from 'node:assert/strict';
import {deriveIntent,InputSchema} from './semantics.ts';
test('free concepts survive compilation rather than selecting canned destinations',()=>{
 const a=deriveIntent({text:'I want to find somewhere enormous and quiet: a single pale arch over a still lake under open sky.',source:'text'});
 assert.deepEqual(a.semantics.axes,{scale:'vast',density:'sparse',mood:'quiet',openness:'open'});assert.match(a.semantics.concept,/pale arch/);assert.doesNotMatch(a.semantics.concept,/^I want/);
 const b=deriveIntent({text:'Let me enter a dense tangled garden of giant glowing mushrooms and twisted roots.',source:'voice'});assert.equal(b.semantics.axes.density,'dense');assert.equal(b.semantics.axes.mood,'luminous');
 const unknown=deriveIntent({text:'Clockwork whales orbit a cobalt teacup on an impossible brass planet',source:'text'});assert.match(unknown.semantics.concept,/Clockwork whales/);assert.equal(unknown.semantics.axes.scale,'human');
 assert.throws(()=>InputSchema.parse({text:'',source:'text'}));
});
test('simple negation does not select the negated axis, and original intent is separate',()=>{
 const input={text:'I want an open place, not dense or ominous, full of blue paper birds',source:'text' as const};const {semantics}=deriveIntent(input);assert.equal(semantics.axes.density,'balanced');assert.equal(semantics.axes.openness,'open');assert.equal(input.text,'I want an open place, not dense or ominous, full of blue paper birds');assert.equal('intent' in semantics,false);
});
