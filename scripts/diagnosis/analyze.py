"""Read saved traces to expose rejection causes. Does not change acceptance or geometry."""
import argparse,collections,gzip,hashlib,json
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('phase');p.add_argument('--partial',action='store_true');a=p.parse_args()
root=Path(__file__).resolve().parents[2];data=root/'.runtime/space-diagnosis'/a.phase
plan=json.loads((root/'scripts/reliability/plan.json').read_text());old=json.loads((root/'.runtime/interpretation-replay/summary.json').read_text());rows=[]
for c in plan['candidates']:
 directory=data/'candidates'/c['id'];selected=directory/'selected-assessment.json'
 if not selected.exists():
  if a.partial:continue
  raise SystemExit('Incomplete candidate '+c['id'])
 selected=json.loads(selected.read_text());intent=json.loads((directory/'intent-trace.json').read_text());modes=[]
 for mode in ['expanded','legacy']:
  attempt=directory/(mode+'.json')
  if not attempt.exists():continue
  attempt=json.loads(attempt.read_text());path=directory/(mode+'.ndjson.gz');digest=hashlib.sha256(path.read_bytes()).hexdigest()
  assert digest==attempt['traceSummary']['sha256']
  counts=collections.Counter();predicates=collections.Counter();topologies=collections.Counter();prescreens=collections.Counter();seams=collections.Counter();projections=collections.Counter();samples={};visited=set();routes=0;events=0;stagecounts=collections.Counter();passes={}
  def sample(key,e):
   if len(samples.setdefault(key,[]))<4:samples[key].append(e)
  with gzip.open(path,'rt') as f:
   for line in f:
    e=json.loads(line);assert e['seq']==events;events+=1;counts[e['stage']+':'+e['kind']]+=1;stagecounts[e['stage']]+=1;passname=e.get('pass','single');passcounts=passes.setdefault(passname,collections.Counter());passcounts[e['stage']+':'+e['kind']]+=1
    if e['stage']=='prescreen' and e['kind']=='projection-blocked':
     ys=[p[1] for p in e['triangle']];foot=e['approach']['seam'][1];height=attempt['options']['height']
     kind='wholly-above-player' if min(ys)>=foot+height else 'wholly-below-support-band' if max(ys)<foot-attempt['options']['maxStep'] else 'below-feet-within-support-band' if max(ys)<=foot else 'intersects-or-straddles-height-band'
     projections[kind]+=1;sample('projection:'+kind,e)
    if e['stage']=='prescreen' and e['kind']=='rejected':prescreens[e.get('firstFailure',e.get('reason','unspecified'))]+=1;sample('prescreen:'+e.get('firstFailure',e.get('reason','unspecified')),e)
    if e['stage']=='prescreen' and e['kind'] in ['support-edge-not-found','edge-contact-missing']:prescreens[e['kind']]+=1;sample('prescreen:'+e['kind'],e)
    if e['stage']=='topology' and e['kind']=='route-rejected':topologies[e['firstFailingTopology']]+=1;sample('topology:'+e['firstFailingTopology'],e)
    if e['stage']=='topology' and e['kind']=='node-predicate' and e.get('firstFailure'):predicates[e['firstFailure']]+=1;sample('predicate:'+e['firstFailure'],e)
    if e['stage']=='topology' and e['kind'] in ['aperture-node','aperture-axis','aperture-wider-regions'] and e.get('firstFailure'):predicates[e['firstFailure']]+=1;sample('predicate:'+e['firstFailure'],e)
    if e['stage']=='topology' and e['kind']=='deck-node':
     for reason in ([e['firstFailure']] if e.get('firstFailure') else [])+e.get('otherExecutedFailures',[]):predicates['deck:'+reason]+=1;sample('predicate:deck:'+reason,e)
    if e['stage']=='seam' and e['kind'] in ['swept-forward','swept-reverse']:
     m=e['movement'];reason=m.get('reason') if m.get('blocked') else 'endpoint-mismatch' if e['endpointDistance']>e['endpointTolerance'] else 'passed';seams[e['kind']+':'+str(reason)]+=1
     if reason!='passed':sample('seam:'+str(reason),e)
    if e['stage']=='component' and e['kind']=='node-visited':visited.add(e['nodeId'])
    if e['stage']=='route' and e['kind']=='candidate':routes+=1
  assert events==attempt['traceSummary']['events'] and dict(counts)==attempt['traceSummary']['counts']
  modes.append({'mode':mode,'status':attempt['status'],'trace':str(path.relative_to(root)), 'sha256':digest,'events':events,'passes':{name:dict(v) for name,v in passes.items()},'stageCounts':dict(stagecounts),'eventCounts':dict(counts),'projectionFirstBlockerHeights':dict(projections),'prescreenRejections':dict(prescreens),'topologyFirstFailures':dict(topologies),'predicateFailureObservations':dict(predicates),'seamChecks':dict(seams),'distinctVisitedNodes':len(visited),'candidateRoutes':routes,'budgets':attempt['searchDiagnostics']['exhausted'],'samples':samples})
 previous=next(r for r in old['rows'] if r['id']==c['id'])
 rows.append({'id':c['id'],'category':c['category'],'text':c['text'],'selectedScale':selected['transform']['scale'],'status':selected['status'],'previouslyUnresolved':not(previous['selectedPassed']or previous['availableSuccess']),'criteria':intent['criteria'],'modifierWarnings':[e for e in intent['events'] if e['kind']=='scope-warning'],'modes':modes})
def aggregate(field):
 result=collections.Counter()
 for row in rows:
  for mode in row['modes']:result.update(mode[field])
 return dict(result)
summary={'phase':a.phase,'complete':len(rows)==36,'candidates':len(rows),'passed':sum(r['status']=='passed' for r in rows),'previouslyUnresolvedRecovered':sum(r['previouslyUnresolved'] and r['status']=='passed' for r in rows),'candidatesWithScopeWarnings':sum(bool(r['modifierWarnings']) for r in rows),'projectionFirstBlockerHeights':aggregate('projectionFirstBlockerHeights'),'prescreenRejections':aggregate('prescreenRejections'),'topologyFirstFailures':aggregate('topologyFirstFailures'),'predicateFailureObservations':aggregate('predicateFailureObservations'),'seamChecks':aggregate('seamChecks'),'notes':['Counts are observations, not independent candidates or proof of impossible geometry.','Projection height class uses the entire first blocking triangle; other triangles may still obstruct the corridor.','Topology predicates record first failing and unexecuted checks; not every predicate runs on every node.'],'rows':rows}
out=data/('trace-analysis.partial.json' if a.partial else 'trace-analysis.json');out.write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps({k:v for k,v in summary.items() if k!='rows'},indent=2))
