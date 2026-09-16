"""Verify immutable source and prior-study inventories without altering their files."""
import hashlib,json,datetime
from pathlib import Path
root=Path(__file__).resolve().parents[2];rows=[]
for name in ['.runtime/interpretation-study/original-integrity.json','.runtime/space-diagnosis/prior-integrity.json']:
 inventory=json.loads((root/name).read_text());files=inventory if isinstance(inventory,list) else inventory['files']
 for row in files:
  path=root/row['path'];content=path.read_bytes()
  assert len(content)==row['bytes'] and hashlib.sha256(content).hexdigest()==row['sha256'],row['path']
 rows.append({'inventory':name,'sha256':hashlib.sha256((root/name).read_bytes()).hexdigest(),'files':len(files),'bytes':sum(x['bytes'] for x in files),'passed':True})
out={'verifiedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'inventories':rows,'passed':True}
(root/'.runtime/space-diagnosis/integrity-verification.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out,indent=2))
