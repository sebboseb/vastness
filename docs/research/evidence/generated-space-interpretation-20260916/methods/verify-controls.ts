/** Independent checks for labeled scale-only controls, counterfactuals and the one repeat. */
import {readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {readJson,saveJson,sha256} from '../reliability/assess.ts';
import {verifyObservations} from '../reliability/verify-browser.ts';
const root=resolve('.'),data=join(root,'.runtime/interpretation-replay'),controls=await readJson(join(data,'controls.json'));
const rows: Record<string,any>[] = [];
for(const control of controls){
 const dir=join(data,'candidates',control.id),a=await readJson(join(dir,'selected-assessment.json')),f=await readJson(join(dir,'browser/forward.json')),r=await readJson(join(dir,'browser/returned.json'));
 if(!f||!r)throw Error('Missing control browser evidence: '+control.id);
 const persisted=await readJson(join(data,'inspection',control.id+'.json')),world=await readJson(join(root,'.runtime/reliability/candidates',control.candidateId,'world.json'));
 const source=await readFile(join(root,control.sourceAssessment));
 if(sha256(source)!==sha256(await readFile(join(dir,'selected-assessment.json'))))throw Error('Control substituted source assessment');
 const result=verifyObservations({forward:f,returned:r,persisted,assessment:a,assessmentSha256:sha256(source),caseId:control.id,worldId:world.id,sourceSha256:a.sourceSha256});
 rows.push({...control,status:result.reasons.length?'failed':'passed',...result,generatedTravel:f.generatedTravel});
}
const summary={schemaVersion:1,primaryRateIncludesTheseCases:false,groups:['control','reference','repeat'].map(kind=>({kind,n:rows.filter(r=>r.kind===kind).length,passed:rows.filter(r=>r.kind===kind&&r.status==='passed').length})),rows};
await saveJson(join(data,'control-verification.json'),summary);console.log(JSON.stringify({...summary,rows:undefined},null,2));
