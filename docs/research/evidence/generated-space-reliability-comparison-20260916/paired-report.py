#!/usr/bin/env python3
"""Read-only paired evidence aggregation; final files require --run and two complete summaries."""
import argparse,collections,datetime,hashlib,json,pathlib,statistics
ROOT=pathlib.Path('/Users/seb/Documents/ChatGPT/vastness')
OUT=ROOT/'.runtime/reliability-final-checks'
BASE=ROOT/'.runtime/reliability';REPLAY=ROOT/'.runtime/reliability-replay'
def read(p):return json.loads(p.read_text())
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def object_sha(v):return hashlib.sha256(json.dumps(v,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def save(p,v):
 tmp=p.with_suffix(p.suffix+'.tmp');tmp.write_text(v);tmp.replace(p)
def distribution(values):
 a=sorted(values)
 return {'count':len(a),'minimum':min(a) if a else None,'maximum':max(a) if a else None,'median':statistics.median(a) if a else None}
def transition(old,new,same_path):
 if not old['geometryPassed'] and new['geometryPassed']:return 'newly-eligible'
 if old['browserStatus']=='failed' and new['fullPipelinePassed']:return 'browser-failure-to-pass-identical-path' if same_path else 'browser-failure-to-pass-changed-path'
 if old['fullPipelinePassed'] and not new['fullPipelinePassed']:return 'lost-full-pipeline-pass'
 if old['fullPipelinePassed'] and new['fullPipelinePassed']:return 'retained-full-pipeline-pass'
 return 'no-full-pipeline-gain'
def stage_rate(rows,primary,any_scale=False):
 passed=sum(any(s['fullPipelinePassed'] for s in r['scales']) if any_scale else next(s['fullPipelinePassed'] for s in r['scales'] if s['scale']==primary) for r in rows)
 return {'passed':passed,'planned':len(rows),'rate':passed/len(rows) if rows else None}
def compare():
 summaries=[read(d/'summary.json') for d in [BASE,REPLAY]]
 if not all(s.get('complete') is True for s in summaries):raise RuntimeError('Both summaries must be complete before paired final output; no output written.')
 ref=read(REPLAY/'baseline-reference.json')
 if sha(BASE/'summary.json')!=ref['baselineSummarySha256']:raise RuntimeError('Frozen baseline summary hash changed')
 plan=read(ROOT/'scripts/reliability/plan.json');primary=plan['primaryScale'];scales=[primary,*plan['secondaryScales']]
 ids=[c['id'] for c in plan['candidates']];by_run=[{r['id']:r for r in s['rows']} for s in summaries]
 if any(set(rows)!=set(ids) for rows in by_run):raise RuntimeError('Candidate sets do not match declared plan')
 provenance=read(REPLAY/'analysis-provenance.json');assessor=next(h for h in provenance['helpers'] if h['path']=='scripts/passage-geometry.ts')
 if assessor['sha256']!=ref['assessorSha256']:raise RuntimeError('Assessor source differs')
 audit=read(REPLAY/'assessment-integrity.json')
 if not (audit['complete'] and audit['passed'] and audit['baselineUnchanged'] and audit['allPreparedColorsIdentical']):raise RuntimeError('Replay integrity audit is not complete and passing')
 trials=[];options=None
 path_keys=['route','entry','approachStart','approach','seam','approachDirection','approachVerified']
 for case in ids:
  rows=[r[case] for r in by_run];assessments=[read(d/'candidates'/case/'assessment.json') for d in [BASE,REPLAY]]
  if rows[0]['sourceSha256']!=rows[1]['sourceSha256']:raise RuntimeError('Source changed: '+case)
  for scale in scales:
   pair=[next(s for s in r['scales'] if s['scale']==scale) for r in rows]
   attempts=[next(a for a in batch['attempts'] if a['transform']['scale']==scale) for batch in assessments]
   old,new=pair;a,b=attempts
   if a['options']!=b['options'] or a['transform']!=b['transform']:raise RuntimeError(f'Criteria or transform changed: {case}/{scale}')
   options=options or a['options']
   if a['options']!=options:raise RuntimeError(f'Nonuniform navigation options: {case}/{scale}')
   for attempt in attempts:
    if attempt['status']=='passed' and (attempt['metrics']['routeDisplacement']<3-1e-6 or attempt['metrics']['continuousEnclosedDistance']<1-1e-6 or not attempt['approachVerified']):raise RuntimeError(f'Accepted route violates retained thresholds: {case}/{scale}')
   routes_identical=a['route']==b['route'];paths=[{k:v[k] for k in path_keys} for v in attempts];same_path=paths[0]==paths[1]
   trials.append({'id':case,'category':rows[0]['category'],'promptVariant':rows[0]['promptVariant'],'seed':rows[0]['seed'],'scale':scale,'sourceSha256':rows[0]['sourceSha256'],'routesIdentical':routes_identical,'movementPathsIdentical':same_path,'baselinePathSha256':object_sha(paths[0]),'replayPathSha256':object_sha(paths[1]),'transition':transition(old,new,same_path),'baseline':{k:old[k] for k in ['geometryPassed','fullPipelinePassed','browserStatus','metrics']},'replay':{k:new[k] for k in ['geometryPassed','fullPipelinePassed','browserStatus','metrics']}})
 categories=[]
 for category in dict.fromkeys(r['category'] for r in summaries[0]['rows']):
  selected=[[r for r in s['rows'] if r['category']==category] for s in summaries]
  categories.append({'category':category,**{label:{'primary':stage_rate(rows,primary),'anyScale':stage_rate(rows,primary,True)} for label,rows in zip(['baseline','replay'],selected)}})
 seedpairs=[]
 for category,variant in dict.fromkeys((r['category'],r['promptVariant']) for r in summaries[0]['rows']):
  selected=[[r for r in s['rows'] if r['category']==category and r['promptVariant']==variant] for s in summaries]
  seedpairs.append({'category':category,'promptVariant':variant,'seeds':[r['seed'] for r in selected[0]],**{label:{'primary':stage_rate(rows,primary),'anyScale':stage_rate(rows,primary,True)} for label,rows in zip(['baseline','replay'],selected)}})
 ranges={}
 for label in ['baseline','replay']:
  ranges[label]={}
  for group,selected in [('allScales',trials),('primary',[t for t in trials if t['scale']==primary])]:
   ranges[label][group]={}
   for population,key in [('geometryAccepted','geometryPassed'),('browserPassed','fullPipelinePassed')]:
    good=[t[label]['metrics'] for t in selected if t[label][key]]
    ranges[label][group][population]={field:distribution([m[field] for m in good]) for field in ['routeLength','routeDisplacement','continuousEnclosedDistance']}
 transitions=dict(collections.Counter(t['transition'] for t in trials))
 gains=[t for t in trials if t['baseline']['browserStatus']=='failed' and t['replay']['fullPipelinePassed']]
 return {'schemaVersion':1,'generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'complete':True,'summaryHashes':{label:sha(d/'summary.json') for label,d in [('baseline',BASE),('replay',REPLAY)]},'plannedCandidates':len(ids),'pairedScaleTrials':len(trials),'primaryScale':primary,'declaredScales':scales,'newGpuJobs':0,'geometryEdits':0,'criteria':{'unchangedAcrossAllPairedAttempts':True,'navigationOptions':options,'minimumEndpointDisplacementM':3,'minimumContiguousEnclosedDistanceM':1,'coarseSearchEnclosedDistanceM':1.1,'minimumActualBrowserGeneratedTravelM':3,'assessorSha256':assessor['sha256'],'supportRule':'Nine footprint probes on upward original triangles, positive support IDs for interior movement; continuous support and swept body/head clearance.','enclosureRule':'All nine overhead probes at 1.8–6m abovefoot, or opposing torso-height source walls.','numericalChange':'Shared point/continuous triangle-boundary tolerance and matching index query padding; see amended replay provenance.'},'totals':{label:{'primary':s['primary'],'secondary':s['secondary'],'anyScaleGeometryPasses':s['scaleAdjustedGeometryPasses'],'anyScaleFullPipelinePasses':s['scaleAdjustedFullPipelinePasses'],'anyScaleWilson95':s['scaleAdjustedFullPipelineWilson95']} for label,s in zip(['baseline','replay'],summaries)},'transitions':transitions,'browserFailureToPass':{'total':len(gains),'identicalAssessmentRoute':sum(t['routesIdentical'] for t in gains),'changedAssessmentRoute':sum(not t['routesIdentical'] for t in gains),'identicalMovementPath':sum(t['movementPathsIdentical'] for t in gains),'changedMovementPath':sum(not t['movementPathsIdentical'] for t in gains)},'newEligibility':{'trials':sum(t['transition']=='newly-eligible' for t in trials),'browserPassed':sum(t['transition']=='newly-eligible' and t['replay']['fullPipelinePassed'] for t in trials)},'categories':categories,'seedPairs':seedpairs,'seedPairConsistency':{label:{metric:{'bothPassed':sum(p[label][metric]['passed']==2 for p in seedpairs),'onePassed':sum(p[label][metric]['passed']==1 for p in seedpairs),'neitherPassed':sum(p[label][metric]['passed']==0 for p in seedpairs)} for metric in ['primary','anyScale']} for label in ['baseline','replay']},'acceptedRouteRangesM':ranges,'trials':trials,'limitations':['Paired convenience sample; descriptive intervals do not establish population reliability.','All denominators retain 36 declared candidates; secondary results do not replace primary failures.','Identical assessment route means exact saved waypoint equality; identical movement path additionally binds seam, authored approach, direction and approach start.','Runtime movement schedules may differ between actual browser trials; this is not an isolated deterministic movement experiment.','Thresholds remain fixed, but the numerical fix can affect accepted-domain predicates, route selection and eligibility.']}
def markdown(j):
 b,r=j['totals']['baseline'],j['totals']['replay'];gain=j['browserFailureToPass']
 lines=['# Paired baseline and numerical replay comparison','',f"All {j['plannedCandidates']} candidates and {j['pairedScaleTrials']} declared scale trials are complete. Source geometry and renderer colors are unchanged; no new GPU jobs were run.",'','| Outcome | Baseline | Replay |','| --- | ---: | ---: |']
 for title,x,y in [('Primary full pipeline',b['primary']['fullPipelinePasses'],r['primary']['fullPipelinePasses']),('Any declared scale full pipeline',b['anyScaleFullPipelinePasses'],r['anyScaleFullPipelinePasses']),('Primary geometry',b['primary']['geometryPasses'],r['primary']['geometryPasses']),('Any declared scale geometry',b['anyScaleGeometryPasses'],r['anyScaleGeometryPasses'])]:lines.append(f'| {title} | {x}/36 | {y}/36 |')
 lines+=['',f"{gain['total']} previous browser failures passed in replay: {gain['identicalAssessmentRoute']} on identical saved assessment routes and {gain['changedAssessmentRoute']} on changed routes. Including the entry/approach geometry, {gain['identicalMovementPath']} had an identical complete movement path and {gain['changedMovementPath']} had a changed path.",'',f"{j['newEligibility']['trials']} additional scale trials became geometry eligible; {j['newEligibility']['browserPassed']} passed actual browser entry, traversal and return.",'','| Category | Baseline primary | Replay primary | Baseline any scale | Replay any scale |','| --- | ---: | ---: | ---: | ---: |']
 for c in j['categories']:lines.append('| '+c['category']+' | '+' | '.join(f"{c[run][metric]['passed']}/{c[run][metric]['planned']}" for run,metric in [('baseline','primary'),('replay','primary'),('baseline','anyScale'),('replay','anyScale')])+' |')
 lines+=['','Support and enclosure thresholds remain unchanged: 0.3m body radius, 1.8m height, 0.25m maximum step, 35° maximum slope, 0.015m contact tolerance, at least 3m endpoint displacement, at least 1m contiguous enclosure, and at least 3m actual browser generated travel. Each saved assessment retains the same transform and navigation options.','', 'Route lengths describe accepted paths; a zero route length on a rejected assessment does not mean absent source floor.','', '| Accepted browser paths | Route length range | Endpoint displacement range | Contiguous enclosure range |','| --- | ---: | ---: | ---: |']
 for label in ['baseline','replay']:
  v=j['acceptedRouteRangesM'][label]['allScales']['browserPassed'];fmt=lambda field:f"{v[field]['minimum']:.3f}–{v[field]['maximum']:.3f}m" if v[field]['count'] else 'none'
  lines.append(f"| {label} | {fmt('routeLength')} | {fmt('routeDisplacement')} | {fmt('continuousEnclosedDistance')} |")
 lines+=['','Seed-pair consistency counts appear in the JSON, with every category/prompt pair retained. Browser schedules were not held identical; these paired results combine numerical movement changes and any changed route selection, rather than isolating one cause.','']
 return '\n'.join(lines)
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--run',action='store_true');p.add_argument('--self-test',action='store_true');args=p.parse_args()
 if args.self_test:
  old={'geometryPassed':True,'fullPipelinePassed':False,'browserStatus':'failed'};new={'geometryPassed':True,'fullPipelinePassed':True,'browserStatus':'passed'}
  assert transition(old,new,True)=='browser-failure-to-pass-identical-path'
  assert transition(old,new,False)=='browser-failure-to-pass-changed-path'
  assert transition({**old,'geometryPassed':False},new,True)=='newly-eligible'
  assert distribution([])=={'count':0,'minimum':None,'maximum':None,'median':None}
  print('Helper self-checks passed; no final output written.')
 elif args.run:
  j=compare();save(OUT/'paired-aggregate.json',json.dumps(j,indent=2)+'\n');save(OUT/'paired-report.md',markdown(j));print(json.dumps({'complete':True,'transitions':j['transitions'],'browserFailureToPass':j['browserFailureToPass'],'newEligibility':j['newEligibility']}))
 else:
  print(json.dumps({'baselineComplete':read(BASE/'summary.json').get('complete'),'replayComplete':read(REPLAY/'summary.json').get('complete'),'finalOutputWritten':False,'next':'Explicit --run only after lead signal.'}))
