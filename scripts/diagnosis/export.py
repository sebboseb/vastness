"""Export compact auditable evidence; retain complete gzip traces at their pinned local paths."""
import hashlib,json,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2];phase=sys.argv[1]
assert phase and all(c.islower() or c.isdigit() or c=='-' for c in phase)
source=root/'.runtime/space-diagnosis'/phase;dest=root/'docs/research/evidence/space-diagnosis'/phase
freeze=json.loads((source/'freeze.json').read_text());summary=json.loads((source/'summary.json').read_text())
assert summary['n']==36 and summary['freeze']==hashlib.sha256((source/'freeze.json').read_bytes()).hexdigest()
manifest=[]
def save(relative,content):
 target=dest/relative;target.parent.mkdir(parents=True,exist_ok=True)
 if target.exists():assert target.read_bytes()==content,('Existing evidence differs',target)
 else:target.write_bytes(content)
def copy(path):save(path.relative_to(source),path.read_bytes())
for name in ['freeze.json','summary.json','trace-analysis.json','taxonomy.json','browser-verification.json','restart-verification.json']:
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
