"""Diagnostic browser controls only; never replace the locked selected-scale results."""
import json,shutil
from pathlib import Path
root=Path(__file__).resolve().parents[2];data=root/'.runtime/interpretation-replay';prior=root/'.runtime/interpretation-study'
read=lambda p:json.loads(p.read_text());index=read(data/'inspection/index.json');plan_ids={c['id'] for c in read(root/'scripts/reliability/plan.json')['candidates']};base={c['id']:c for c in index if c['id'] in plan_ids};index=list(base.values());records=[]
def add(candidate,source,kind,scale):
 identifier=kind+'-'+candidate['id'];out=data/'candidates'/identifier;out.mkdir(parents=True,exist_ok=True)
 target=out/'selected-assessment.json';shutil.copyfile(source,target)
 case={**base[candidate['id']],'id':identifier,'label':kind.upper()+' ONLY · '+candidate['id']+' · scale '+str(scale),'files':{**base[candidate['id']]['files'],'assessment':str(target)}}
 record={'id':identifier,'candidateId':candidate['id'],'kind':kind,'scale':scale,'chosenScale':candidate['selectedScale'],'includedInPrimaryRate':False,'sourceAssessment':str(source.relative_to(root))}
 (out/'control.json').write_text(json.dumps(record,indent=2)+'\n');index.append(case);records.append(record)
for r in read(prior/'summary.json')['rows']:
 if r['selectedOldStrict']:add(r,prior/'candidates'/r['id']/f"old-strict-scale{r['selectedScale']}.json",'control',r['selectedScale'])
for r in read(data/'summary.json')['rows']:
 if not r['selectedPassed'] and r['availableSuccess']:
  scale=next(g['scale'] for g in r['grid'] if g['status']=='passed')
  add(r,data/'candidates'/r['id']/f'interpreted-scale{scale}.json','reference',scale)
# One diagnostic repeat for a recorded silent stop; preserve the original journal and rate.
for r in read(data/'summary.json')['rows']:
 p=data/'candidates'/r['id'];f=p/'browser/returned.json'
 if r['selectedPassed'] and f.exists():
  result=read(f)
  if result['mode']=='generated' and not result['errors'] and not result['blocked'] and not result['walking']:
   add(r,p/'selected-assessment.json','repeat',r['selectedScale'])
(data/'inspection/index.json').write_text(json.dumps(index,indent=2)+'\n');(data/'controls.json').write_text(json.dumps(records,indent=2)+'\n');print({'cases':len(index),'controls':len(records)})
