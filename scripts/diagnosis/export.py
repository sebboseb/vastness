"""Export compact auditable evidence; retain complete gzip traces at their pinned local paths."""
import hashlib,json,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2];phase=sys.argv[1]
assert phase and all(c.islower() or c.isdigit() or c=='-' for c in phase)
source=root/'.runtime/space-diagnosis'/phase;dest=root/'docs/research/evidence/space-diagnosis'/phase
freeze=json.loads((source/'freeze.json').read_text());summary=json.loads((source/'summary.json').read_text())
assert summary['n']==36 and summary['freeze']==hashlib.sha256((source/'freeze.json').read_bytes()).hexdigest()
plan=json.loads((root/'scripts/reliability/plan.json').read_text());ids=[x['id'] for x in plan['candidates']]
assert len(ids)==len(set(ids))==36 and len(summary['rows'])==36 and sorted(x['id'] for x in summary['rows'])==sorted(ids)
for row in summary['rows']:
 directory=source/'candidates'/row['id']
 selected=json.loads((directory/'selected-assessment.json').read_text());expanded=json.loads((directory/'expanded.json').read_text())
 attempts=[expanded]
 if expanded['status']!='passed':attempts.append(json.loads((directory/'legacy.json').read_text()))
 chosen=next((a for a in attempts if a['status']=='passed'),attempts[0])
 assert selected['status']==row['status']==chosen['status'] and selected['route']==chosen['route']
 for a in [selected,*attempts]:assert a['diagnosisFreeze']==summary['freeze'] and a['sourceSha256']==selected['sourceSha256'] and a['criteria']==selected['criteria']
manifest=[]
def save(relative,content):
 target=dest/relative;target.parent.mkdir(parents=True,exist_ok=True)
 if target.exists():assert target.read_bytes()==content,('Existing evidence differs',target)
 else:target.write_bytes(content)
def copy(path):save(path.relative_to(source),path.read_bytes())
for name in ['freeze.json','summary.json','trace-analysis.json','taxonomy.json','route-comparison.json','browser-verification.json','restart-verification.json']:
 path=source/name
 if path.exists():copy(path)
for path in sorted((source/'explanations').glob('*.md')):copy(path)
for row in summary['rows']:
 directory=source/'candidates'/row['id']
 for path in sorted(directory.glob('*.json')):copy(path)
 for path in sorted((directory/'browser').glob('*')):
  if path.suffix in ['.json','.png']:copy(path)
 for mode in ['expanded','legacy']:
  assessment=directory/(mode+'.json')
  if not assessment.exists():continue
  a=json.loads(assessment.read_text());path=directory/(mode+'.ndjson.gz')
  digest=hashlib.sha256(path.read_bytes()).hexdigest();assert digest==a['traceSummary']['sha256']
  manifest.append({'candidate':row['id'],'mode':mode,'path':str(path.relative_to(root)),'sha256':digest,'bytes':path.stat().st_size,'events':a['traceSummary']['events'],'counts':a['traceSummary']['counts']})
for path in sorted((source/'inspection').glob('*.json')):copy(path)
for path,digest in freeze['methods'].items():
 content=(root/path).read_bytes();assert hashlib.sha256(content).hexdigest()==digest
 save(Path('methods')/path,content)
save(Path('trace-manifest.json'),(json.dumps(manifest,indent=2)+'\n').encode())
print({'phase':phase,'traces':len(manifest),'events':sum(x['events'] for x in manifest),'traceBytes':sum(x['bytes'] for x in manifest),'export':str(dest)})
