"""Post-evaluation attribution across BOTH searches; does not change acceptance or selection."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[2];data=root/'.runtime/interpretation-replay';prior=root/'.runtime/interpretation-study'
read=lambda p:json.loads(p.read_text())
summary=read(data/'summary.json');old=read(prior/'summary.json');rows=[]
for r in summary['rows']:
 p=data/'candidates'/r['id'];scale=r['selectedScale']
 attempts=[read(p/f'{mode}-scale{scale}.json') for mode in ['expanded','legacy'] if (p/f'{mode}-scale{scale}.json').exists()]
 metrics=[a.get('metrics',{}) for a in attempts];ds=[a.get('searchDiagnostics',{}) for a in attempts]
 supported=max((m.get('supportedPoints',0) for m in metrics),default=0)
 distance=max((m.get('maximumConnectedDisplacement',0) for m in metrics),default=0)
 entered=any(d.get('componentsExplored',0)>0 for d in ds)
 seam=sum(m.get('rejected',{}).get('authored-to-generated-seam',0) for m in metrics)
 exhausted=sorted({x for d in ds for x in d.get('exhausted',[])})
 if r['selectedPassed']:failure=None
 elif any(a.get('assessmentError') for a in attempts):failure='assessment-resource-or-error'
 elif not supported:failure='no-valid-sampled-player-support'
 elif not entered:failure='no-exterior-approach-admitted-by-prescreen'
 elif distance<3-1e-7:failure='no-connected-3m-route-found'
 else:failure='topology-witness-entry-seam-or-bounded-search'
 scale_miss=not r['selectedPassed'] and r['availableSuccess']
 attribution='verified-usable-selected-space' if r['selectedPassed'] else 'demonstrated-scale-interpretation-miss' if scale_miss else 'unresolved-generation-versus-interpretation'
 rows.append({'id':r['id'],'category':r['category'],'selectedScale':scale,'selectedPass':r['selectedPassed'],'browserPass':r['browser']['status']=='passed','scaleMiss':scale_miss,'availableScales':[g['scale'] for g in r['grid'] if g['status']=='passed'],'failure':failure,'attribution':attribution,'supportedPoints':supported,'maximumConnectedDisplacement':distance,'prescreenedExteriorApproachExists':entered,'topologyQualifiedSeamRejections':seam,'exhausted':exhausted,'sameScaleFallbackRescue':r['selectedPassed'] and r['strategy']=='legacy-fallback'})
counts=lambda key: {value:sum(r[key]==value for r in rows) for value in sorted({r[key] for r in rows if r[key] is not None})}
strict={'fixed6':old['counts']['fixed6'],'automatic':old['counts']['selectedOldStrict'],'recovered':[r['id'] for r in old['rows'] if not r['baselineFixed6'] and r['selectedOldStrict']],'lost':[r['id'] for r in old['rows'] if r['baselineFixed6'] and not r['selectedOldStrict']]}
out={'schemaVersion':1,'interpretation':'Failure taxonomy aggregates both selected-scale searches, rather than attributing failure solely to the last fallback attempt. No bounded search proves impossibility. Scale misses are demonstrated because another predeclared scale has a valid generated route. No irreparable generation-failure count is established.','strictEndpointScaleEffect':strict,'failureTaxonomy':counts('failure'),'attribution':counts('attribution'),'selectedFailureBudgetCounts':{x:sum(not r['selectedPass'] and x in r['exhausted'] for r in rows) for x in sorted({x for r in rows for x in r['exhausted']})},'rows':rows}
(data/'attribution.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items() if k!='rows'},indent=2))
