"""Candidate-level operational taxonomy; never infer irreparable generation from bounded search."""
import collections,json,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2];data=root/'.runtime/space-diagnosis'/sys.argv[1]
analysis=json.loads((data/'trace-analysis.json').read_text());assert analysis['complete'];rows=[]
for row in analysis['rows']:
 counts=collections.Counter();budgets=set()
 for mode in row['modes']:counts.update(mode['eventCounts']);budgets.update(mode['budgets'])
 if row['status']=='passed':kind='accepted-geometry'
 elif not row['criteria']['supported']:kind='unsupported-intent-compilation'
 elif counts['seam:swept-forward'] or counts['seam:swept-reverse']:kind='final-seam-rejected-after-topology'
 elif counts['route:candidate']:kind='topology-witness-not-found-within-search'
 elif counts['prescreen:passed']:kind='no-qualifying-connected-route-within-search'
 else:kind='no-admitted-exterior-entry-within-search'
 rows.append({'id':row['id'],'category':row['category'],'previouslyUnresolved':row['previouslyUnresolved'],'status':row['status'],'operationalFailure':kind,'exhausted':sorted(budgets),'generationUnusableProven':False})
out={'phase':sys.argv[1],'counts':dict(collections.Counter(r['operationalFailure'] for r in rows)),'prior31Counts':dict(collections.Counter(r['operationalFailure'] for r in rows if r['previouslyUnresolved'])),'notes':['Labels describe the deepest reached decision, aggregated over all recorded bounded passes. They are not mutually exclusive physical defects.','No irreparable generation claim follows from search exhaustion or failure of an operational topology witness.'],'rows':rows}
(data/'taxonomy.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items() if k!='rows'},indent=2))
