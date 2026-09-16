import assert from 'node:assert/strict';
import {test} from 'node:test';
import {deriveSpatialCriteria} from './criteria.ts';
test('criteria distinguish topology and conjoin explicit requirements', () => {
 for (const [text, kind] of [['a cave', 'enclosed-passage'], ['open courtyard', 'open-courtyard'], ['through a doorway', 'doorway-crossing'], ['cross a bridge', 'elevated-bridge'], ['a vast hall', 'broad-covered-interior']]) assert.deepEqual(deriveSpatialCriteria(text).required, [kind]);
 assert.deepEqual(deriveSpatialCriteria('a courtyard through an arch').required, ['open-courtyard', 'doorway-crossing']);
 assert.equal(deriveSpatialCriteria('a broad hall with a ceiling').requirements.minimumWidth, 2.4);
});
test('metadata, category, identity and outcomes never feed interpretation', () => {
 const baseline = deriveSpatialCriteria('quiet mountains');
 assert.deepEqual(deriveSpatialCriteria('quiet mountains', {category: 'tunnel', id: 'bridge', passed: true}), baseline);
 assert.equal(baseline.supported, false);
 assert.deepEqual(deriveSpatialCriteria('open courtyard', {concept: 'an enclosed tunnel', axes: {openness: 'enclosed'}}).required, ['open-courtyard']);
 assert.deepEqual(deriveSpatialCriteria('somewhere quiet', {concept: 'a hall'}).required, ['broad-covered-interior']);
});
test('local negation and unresolved alternatives are reported honestly', () => {
 assert.equal(deriveSpatialCriteria('no tunnel and no hall').supported, false);
 assert.ok(deriveSpatialCriteria('either a tunnel or a courtyard').ambiguities.length);
 assert.equal(deriveSpatialCriteria('a courtyard without a roof').requirements.covered, false);
});
test('semantic fallback cannot resurrect explicit text exclusions', () => {
 assert.equal(deriveSpatialCriteria('no tunnel', {concept: 'a tunnel', axes: {openness: 'enclosed'}}).supported, false);
});
