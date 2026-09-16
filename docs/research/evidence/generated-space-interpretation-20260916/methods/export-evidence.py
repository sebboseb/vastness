"""Retain both interpretation phases and bind evidence by content hashes; no source mesh copies."""
import hashlib,json,shutil
from pathlib import Path
root=Path(__file__).resolve().parents[2]
dst=root/'docs/research/evidence/generated-space-interpretation-20260916'
dst.mkdir(parents=True,exist_ok=True)
records={}
def copy(p,relative):
 out=dst/relative;out.parent.mkdir(parents=True,exist_ok=True)
 if not out.exists() or out.read_bytes()!=p.read_bytes():shutil.copyfile(p,out)
 records[str(relative)]={'path':str(relative),'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest()}
for directory,prefix in [('interpretation-study',Path('.')),('interpretation-replay',Path('corrected'))]:
 src=root/'.runtime'/directory
 for name in ['selections.json','selections.sha256','summary.json','original-integrity.json','final-integrity.json','restart-verification.json','method-freeze.json','source-statistics.json','attribution.json','independent-review.md','controls.json','control-verification.json','browser-restart.json','browser-restart.png','final-check.log','focused-tests.log','passage-tests.log','passage-build.log']:
  if (src/name).exists():copy(src/name,prefix/name)
 for p in (src/'candidates').rglob('*'):
  if p.is_file() and p.suffix in ['.json','.png']:copy(p,prefix/p.relative_to(src))
 for p in (src/'inspection').glob('*.json'):
  if p.name!='index.json':copy(p,prefix/p.relative_to(src))
for p in (root/'scripts/interpretation').glob('*'):
 if p.is_file():copy(p,Path('methods')/p.name)
(dst/'manifest.json').write_text(json.dumps({'schemaVersion':1,'files':sorted(records.values(),key=lambda r:r['path']),'sourceArtifacts':'Original GLB/PLY remain unchanged in .runtime/reliability/candidates. Original hashes in selections.json and original-integrity.json. No GPU jobs or geometry edits. corrected/ retains separately frozen post-hoc semantic correction and same-scale search fallback.'},indent=2)+'\n')
print(json.dumps({'files':len(records),'bytes':sum(r['bytes'] for r in records.values()),'destination':str(dst)}))
