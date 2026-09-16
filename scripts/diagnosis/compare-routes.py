"""Identify route-change browser requirements; missing/failed prior browser proof still requires testing."""
import hashlib,json,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2];base=root/'.runtime/space-diagnosis';phase=base/sys.argv[1]
freeze=json.loads((phase/'freeze.json').read_text());previous=(root/'.runtime/interpretation-replay') if freeze['config']['predecessor']=='interpretation-replay' else base/freeze['config']['predecessor']
summary=json.loads((phase/'summary.json').read_text());rows=[]
keys=['sourceSha256','transform','options','criteria','route','samples','approach','approachStart','seam','entry','approachDirection','approachVerified','topologyWitnesses']
for row in summary['rows']:
 a=json.loads((phase/'candidates'/row['id']/'selected-assessment.json').read_text());p=json.loads((previous/'candidates'/row['id']/'selected-assessment.json').read_text())
 def digest(value):return hashlib.sha256(json.dumps({k:value.get(k) for k in keys},sort_keys=True,separators=(',',':')).encode()).hexdigest()
 current,prior=digest(a),digest(p)
 rows.append({'id':row['id'],'passed':a['status']=='passed','previouslyPassed':p['status']=='passed','currentRouteEvidenceSha256':current,'priorRouteEvidenceSha256':prior,'acceptedEvidenceUnchanged':a['status']=='passed' and p['status']=='passed' and current==prior,'freshBrowserRequiredForRouteChange':a['status']=='passed' and (p['status']!='passed' or current!=prior)})
out={'phase':sys.argv[1],'keys':keys,'unchangedAccepted':sum(x['acceptedEvidenceUnchanged'] for x in rows),'freshBrowserRequiredForRouteChange':[x['id'] for x in rows if x['freshBrowserRequiredForRouteChange']],'rows':rows}
(phase/'route-comparison.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items() if k not in ['rows','keys']},indent=2))
