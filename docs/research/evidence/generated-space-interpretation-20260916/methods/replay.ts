/** Disclosed post-hoc interpretation correction; original36 scale choices never change. */
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {methods} from './study.ts';
import {readJson, saveJson, sha256} from '../reliability/assess.ts';
import {parsePassageGlb, type TriangleMesh} from '../../apps/web/src/generated-passage/navigation.ts';
import {deriveCorrectedSpatialCriteria} from './criteria-v2.ts';
import {assessInterpretedSpace} from './routes.ts';
import {verifyObservations} from '../reliability/verify-browser.ts';
const root = resolve('.'), prior = join(root,'.runtime/interpretation-study'), data = join(root,'.runtime/interpretation-replay');
const originalData = join(root,'.runtime/reliability/candidates');
export async function replayMethods() {
 return {...await methods(), ...Object.fromEntries(await Promise.all(['scripts/interpretation/criteria-v2.ts','scripts/interpretation/criteria-v2.test.ts','scripts/interpretation/correction-method.md','scripts/interpretation/replay.ts'].map(async p=>[p,sha256(await readFile(join(root,p)))])))};
}
function minimumY(mesh:TriangleMesh){let value=Infinity;for(let i=1;i<mesh.positions.length;i+=3)value=Math.min(value,mesh.positions[i]);return value;}
const sameTransform=(a:any,b:any)=>a?.scale===b.scale&&a?.yaw===b.yaw&&Array.isArray(a?.position)&&a.position.length===3&&a.position.every((v:number,i:number)=>v===b.position[i]);
async function context() {
 const bytes = await readFile(join(prior,'selections.json')), selections = JSON.parse(bytes.toString()), selectionHash = sha256(bytes);
 if(selectionHash !== (await readFile(join(prior,'selections.sha256'),'utf8')).trim() || JSON.stringify(await methods()) !== JSON.stringify(selections.methods)) throw Error('Originalmethod/selection freeze changed');
 const plan = await readJson(join(root,'scripts/reliability/plan.json'));
 return {selections,selectionHash,plan};
}
async function freeze() {
 const c=await context(); await mkdir(data,{recursive:true});
 await writeFile(join(data,'method-freeze.json'),JSON.stringify({schemaVersion:1,frozenAt:new Date().toISOString(),selectionHash:c.selectionHash,methods:await replayMethods(),reason:'Post-hoc correction of explicitroof/open-sky parsing and expanded-search regressions. Fixed expanded→legacy fallback uses samecriteria andsame selectedscale. Originalchoices andv1 outcomes retained. No generator/source/navigation changes. This is a retrospective engineering replay, not an unseen validation set.'},null,2)+'\n',{flag:'wx'});
}
async function evaluate() {
 const {selections,selectionHash,plan}=await context(), frozen=await readJson(join(data,'method-freeze.json'));
 if(frozen.selectionHash!==selectionHash || JSON.stringify(frozen.methods)!==JSON.stringify(await replayMethods())) throw Error('Replaymethods notfrozen');
 const replayHash=sha256(await readFile(join(data,'method-freeze.json')));
 for(const c of plan.candidates) {
  const chosen=selections.selections.find((s:any)=>s.id===c.id), out=join(data,'candidates',c.id), before=join(prior,'candidates',c.id), orig=join(originalData,c.id);
  await mkdir(out,{recursive:true});
  let ready=false;for(let wait=0;wait<60;wait++){if(await readJson(join(before,'selected-assessment.json'))){ready=true;break;}await new Promise(done=>setTimeout(done,1000));}if(!ready)throw Error('Priorcandidate incomplete;resume when ready: '+c.id);
  const world=await readJson(join(orig,'world.json')), criteria=deriveCorrectedSpatialCriteria(c.text,world.semantics), oldIntent=await readJson(join(before,'intent.json'));
  if(world.rawIntent.text!==c.text) throw Error('Intentmismatch');
  const bytes=await readFile(join(orig,'collider.glb')); if(sha256(bytes)!==chosen.source.sha256) throw Error('Sourcemismatch');
  let mesh:TriangleMesh|undefined;
  const getMesh=()=>mesh??=(parsePassageGlb(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength) as ArrayBuffer));
  const sourceMinY=minimumY(getMesh());
  await saveJson(join(out,'intent.json'),{rawIntent:world.rawIntent,semantics:world.semantics,criteria,changed:JSON.stringify(criteria)!==JSON.stringify(oldIntent.criteria),originalCriteria:oldIntent.criteria});
  const attempt=async(scale:number,mode:'legacy'|'expanded')=>{
   const expectedTransform={scale,yaw:0,position:[0,-sourceMinY*scale,0] as [number,number,number]};
   const path=join(out,`${mode}-scale${scale}.json`), existing=await readJson(path);
   if(existing) {if(existing.replayFreeze!==replayHash || existing.selectionFreeze!==selectionHash || existing.sourceSha256!==chosen.source.sha256 || !sameTransform(existing.transform,expectedTransform) || existing.evaluationMode!==mode || !['passed','failed'].includes(existing.status) || JSON.stringify(existing.criteria)!==JSON.stringify(criteria)) throw Error('Stalereplay');return existing;}
   const originalPath=join(before,`${mode}-scale${scale}.json`), cached=await readJson(originalPath);
   let result:any, reuse:any=null;
   if(cached && cached.selectionFreeze===selectionHash && cached.sourceSha256===chosen.source.sha256 && sameTransform(cached.transform,expectedTransform) && ['passed','failed'].includes(cached.status) && (cached.assessmentError ? cached.status==='failed' : cached.searchDiagnostics?.mode===mode && JSON.stringify(cached.criteria)===JSON.stringify(criteria)) && JSON.stringify(criteria)===JSON.stringify(oldIntent.criteria)) {
    result=cached;reuse={path:originalPath.slice(root.length+1),sha256:sha256(await readFile(originalPath))};
   } else {
    const m=getMesh();
    const transform=expectedTransform, start=performance.now();
    try {result=assessInterpretedSpace({mesh:m,transform,criteria,searchMode:mode});}catch(error){result={status:'failed',transform,assessmentError:String(error)}}
    result={...result,elapsedMs:performance.now()-start};
   }
   result={...result,criteria,evaluationMode:mode,sourceSha256:chosen.source.sha256,selectionFreeze:selectionHash,replayFreeze:replayHash,reusedEvidence:reuse};
   await saveJson(path,result);console.log(JSON.stringify({id:c.id,scale,mode,status:result.status,reused:!!reuse,seconds:result.elapsedMs/1000}));return result;
  };
  for(const scale of selections.scales) {
   const expanded=await attempt(scale,'expanded'), final=expanded.status==='passed'?expanded:await attempt(scale,'legacy');
   const interpreted={...final,routeStrategy:expanded.status==='passed'?'expanded':'legacy-fallback',expandedStatus:expanded.status};
   await saveJson(join(out,`interpreted-scale${scale}.json`),interpreted);
   if(scale===chosen.selection.selectedScale) await saveJson(join(out,'selected-assessment.json'),interpreted);
  }
 }
}
async function prepare() {
 const {plan}=await context(), sources=[];
 for(const c of plan.candidates){
  const assessment=join(data,'candidates',c.id,'selected-assessment.json'),a=await readJson(assessment);if(!a||a.assessmentError)continue;
  const orig=join(originalData,c.id),world=await readJson(join(orig,'world.json'));
  sources.push({id:c.id,label:`${c.category} · ${c.promptVariant}/${c.seed} · automatic ${a.transform.scale} · ${a.routeStrategy}${a.status==='passed'?'':' · inspection only'}`,worldId:world.id,rawIntent:c.text,semantics:world.semantics,files:{scene:join(root,'.runtime/intention-generation/worlds',world.id,'scene.json'),colors:join(orig,'colors.json'),glb:join(orig,'collider.glb'),ply:join(orig,'scene.ply'),assessment}});
 }
 await mkdir(join(data,'inspection'),{recursive:true});await saveJson(join(data,'inspection/index.json'),sources);console.log({cases:sources.length});
}
async function summarize() {
 const {selections,selectionHash,plan}=await context(), frozen=await readJson(join(data,'method-freeze.json')), replayHash=sha256(await readFile(join(data,'method-freeze.json')));
 if(JSON.stringify(frozen.methods)!==JSON.stringify(await replayMethods()))throw Error('Replaymethods changed');
 const rows:Record<string,any>[]=[];
 for(const c of plan.candidates){
  const dir=join(data,'candidates',c.id),choice=selections.selections.find((s:any)=>s.id===c.id),scale=choice.selection.selectedScale,selected=await readJson(join(dir,'selected-assessment.json'));
  const grid=await Promise.all(selections.scales.map(async(n:number)=>{const a=await readJson(join(dir,`interpreted-scale${n}.json`));if(!a||a.replayFreeze!==replayHash||a.selectionFreeze!==selectionHash||a.sourceSha256!==choice.source.sha256||a.transform.scale!==n||!['passed','failed'].includes(a.status))throw Error('Missing/unboundreplay '+c.id+'/'+n);return a;}));
  if(JSON.stringify(selected)!==JSON.stringify(grid.find(a=>a.transform.scale===scale)))throw Error('Selectedscale substitution');
  const intent=await readJson(join(dir,'intent.json')),v1=await readJson(join(prior,'candidates',c.id,'selected-assessment.json'));
  const sourceBytes=await readFile(join(originalData,c.id,'collider.glb'));if(sha256(sourceBytes)!==choice.source.sha256)throw Error('Replay source changed');const sourceMinY=minimumY(parsePassageGlb(sourceBytes.buffer.slice(sourceBytes.byteOffset,sourceBytes.byteOffset+sourceBytes.byteLength) as ArrayBuffer));
  const originalIntent=await readJson(join(prior,'candidates',c.id,'intent.json')),world=await readJson(join(originalData,c.id,'world.json')),expectedCriteria=deriveCorrectedSpatialCriteria(c.text,world.semantics);
  if(v1.sourceSha256!==choice.source.sha256||v1.selectionFreeze!==selectionHash||!sameTransform(v1.transform,{scale,yaw:0,position:[0,-sourceMinY*scale,0]})||!['passed','failed'].includes(v1.status))throw Error('Unboundv1 comparison');
  if(JSON.stringify(intent.criteria)!==JSON.stringify(expectedCriteria)||intent.changed!==(JSON.stringify(expectedCriteria)!==JSON.stringify(originalIntent.criteria)))throw Error('Unboundcriteria change');
  for(const a of grid)if(!sameTransform(a.transform,{scale:a.transform.scale,yaw:0,position:[0,-sourceMinY*a.transform.scale,0]})||JSON.stringify(a.criteria)!==JSON.stringify(expectedCriteria)||a.evaluationMode!==(a.routeStrategy==='expanded'?'expanded':'legacy'))throw Error('Misboundreplay mode/criteria');

  let browser:any={status:selected.status==='passed'?'not-assessed':'not-eligible',reasons:[]};
  const f=await readJson(join(dir,'browser/forward.json')),r=await readJson(join(dir,'browser/returned.json'));
  if(f&&r){const persisted=await readJson(join(data,'inspection',c.id+'.json')),world=await readJson(join(originalData,c.id,'world.json'));const verified=verifyObservations({forward:f,returned:r,persisted,assessment:selected,assessmentSha256:sha256(await readFile(join(dir,'selected-assessment.json'))),caseId:c.id,worldId:world.id,sourceSha256:choice.source.sha256});browser={...verified,status:verified.reasons.length?'failed':'passed'};}
  const m=selected.metrics,d=selected.searchDiagnostics;
  const failure=selected.status==='passed'?browser.status==='failed'?'browser-navigation-or-evidence':null:selected.assessmentError?'assessment-resource-or-error':!m.supportedPoints?'no-valid-sampled-player-support':!m.entryCandidates?'no-exterior-entry-found':d.componentsExplored===0?'no-verified-exterior-entry':m.maximumConnectedDisplacement<3?'no-connected-3m-route-found':'intent-topology-or-bounded-route-search';
  rows.push({...c,selectedScale:scale,sourceSha256:choice.source.sha256,criteriaChanged:intent.changed,criteria:intent.criteria,v1Passed:v1.status==='passed',selectedPassed:selected.status==='passed',expandedPassed:selected.expandedStatus==='passed',strategy:selected.routeStrategy,fixed6Passed:grid.find(a=>a.transform.scale===6).status==='passed',availableSuccess:grid.some(a=>a.status==='passed'),grid:grid.map(a=>({scale:a.transform.scale,status:a.status,strategy:a.routeStrategy,exhausted:a.searchDiagnostics?.exhausted,routeLength:a.metrics?.routeLength})),browser,failure,metrics:m,searchDiagnostics:d,topologyWitnesses:selected.topologyWitnesses});
 }
 const counts={n:rows.length,selected:rows.filter(r=>r.selectedPassed).length,expandedOnly:rows.filter(r=>r.expandedPassed).length,anyScale:rows.filter(r=>r.availableSuccess).length,fixed6:rows.filter(r=>r.fixed6Passed).length,browser:rows.filter(r=>r.browser.status==='passed').length,fallbackRescues:rows.filter(r=>r.selectedPassed&&r.strategy==='legacy-fallback').length,criteriaChanged:rows.filter(r=>r.criteriaChanged).length};
 const categories=[...new Set(rows.map(r=>r.category))].map(category=>{const group=rows.filter(r=>r.category===category);return{category,n:group.length,selected:group.filter(r=>r.selectedPassed).length,expandedOnly:group.filter(r=>r.expandedPassed).length,anyScale:group.filter(r=>r.availableSuccess).length,browser:group.filter(r=>r.browser.status==='passed').length,fixed6:group.filter(r=>r.fixed6Passed).length}});
 const summary={schemaVersion:1,selectionHash,replayHash,counts,categories,failureTaxonomy:Object.fromEntries([...new Set(rows.map(r=>r.failure).filter(Boolean))].map(k=>[k,rows.filter(r=>r.failure===k).length])),rows};
 await saveJson(join(data,'summary.json'),summary);console.log(JSON.stringify({...summary,rows:undefined},null,2));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){const command=process.argv[2];if(command==='freeze')await freeze();else if(command==='evaluate')await evaluate();else if(command==='prepare')await prepare();else if(command==='summarize')await summarize();else throw Error('Usefreeze,evaluate,prepare,summarize');}
