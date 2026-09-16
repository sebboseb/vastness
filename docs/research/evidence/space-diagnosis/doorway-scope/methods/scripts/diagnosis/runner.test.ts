import {test} from 'node:test';
import assert from 'node:assert/strict';
import {acceptanceView} from './runner.ts';
test('observational parity ignores clocks and harness provenance but retains acceptance evidence',()=>{
 const a={status:'failed',metrics:{buildMs:3,assessmentMs:4,supportedPoints:5},route:[],criteria:{requirements:{minimumWidth:2.4}},traceSummary:{events:12}};
 const b={...a,metrics:{...a.metrics,buildMs:77,assessmentMs:99},diagnosisFreeze:'new',traceSummary:{events:99}};
 assert.deepEqual(acceptanceView(a),acceptanceView(b));
 assert.notDeepEqual(acceptanceView(a),acceptanceView({...b,status:'passed'}));
 assert.notDeepEqual(acceptanceView(a),acceptanceView({...b,criteria:{requirements:{minimumWidth:.6}}}));
 assert.notDeepEqual(acceptanceView(a),acceptanceView({...b,route:[[1,2,3]]}));
 assert.notDeepEqual(acceptanceView(a),acceptanceView({...b,metrics:{...b.metrics,supportedPoints:6}}));
});
