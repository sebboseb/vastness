/** Post-evaluation browser evidence check. Never alters assessments or chooses scales. */
import {join,resolve} from 'node:path';
import {readFile} from 'node:fs/promises';
import {readJson,saveJson,sha256} from '../reliability/assess.ts';
import {verifyObservations} from '../reliability/verify-browser.ts';
const name=process.argv[2];if(!/^[a-z][a-z0-9-]*$/.test(name))throw Error('Phase required');
const root=resolve('.'),data=join(root,'.runtime/space-diagnosis',name),summary=await readJson(join(data,'summary.json')),rows=[];
for(const row of summary.rows){
 const dir=join(data,'candidates',row.id),assessment=await readJson(join(dir,'selected-assessment.json'));
 if(assessment.status!=='passed'){rows.push({id:row.id,status:'not-eligible',recovered:row.recovered,previouslyUnresolved:row.previouslyUnresolved});continue;}
 const f=await readJson(join(dir,'browser/forward.json')),r=await readJson(join(dir,'browser/returned.json'));
 if(!f||!r){rows.push({id:row.id,status:'not-assessed',recovered:row.recovered,previouslyUnresolved:row.previouslyUnresolved});continue;}
 const persisted=await readJson(join(data,'inspection',row.id+'.json')),world=await readJson(join(root,'.runtime/reliability/candidates',row.id,'world.json'));
 const result=verifyObservations({forward:f,returned:r,persisted,assessment,assessmentSha256:sha256(await readFile(join(dir,'selected-assessment.json'))),caseId:row.id,worldId:world.id,sourceSha256:assessment.sourceSha256});
 rows.push({id:row.id,status:result.reasons.length?'failed':'passed',recovered:row.recovered,previouslyUnresolved:row.previouslyUnresolved,generatedTravel:f.generatedTravel,...result});
}
const result={phase:name,eligible:rows.filter(r=>r.status!=='not-eligible').length,passed:rows.filter(r=>r.status==='passed').length,recoveredVerified:rows.filter(r=>r.recovered&&r.status==='passed').length,previouslyUnresolvedVerified:rows.filter(r=>r.previouslyUnresolved&&r.status==='passed').length,rows};await saveJson(join(data,'browser-verification.json'),result);console.log(JSON.stringify(result,null,2));
