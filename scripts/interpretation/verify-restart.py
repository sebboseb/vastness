"""Verify restarted inspection service against retained case files and event journals."""
import sys,json,hashlib,subprocess,datetime,urllib.request
from pathlib import Path
root=Path(__file__).resolve().parents[2];data=root/'.runtime'/sys.argv[1];previous_pid=int(sys.argv[2])
pid=int(subprocess.check_output(['lsof','-t','-iTCP:4312','-sTCP:LISTEN'],text=True).strip())
assert pid!=previous_pid,'Service did not restart'
index=json.loads((data/'inspection/index.json').read_text());rows=[]
for case in index:
 value=json.load(urllib.request.urlopen('http://127.0.0.1:4312/api/passage/cases/'+case['id']))
 for kind,path in case['files'].items():assert hashlib.sha256(Path(path).read_bytes()).hexdigest()==value['assets'][kind]['sha256'],(case['id'],kind)
 saved=data/'inspection'/(case['id']+'.json')
 if saved.exists():
  expected=json.loads(saved.read_text());assert expected['identity']==value['identity'] and expected['visits']==value['visits']
  assert expected['glbSha256']==value['assets']['glb']['sha256'] and expected['assessmentSha256']==value['assets']['assessment']['sha256']
 else:assert value['visits']==[]
 rows.append({'id':case['id'],'identity':value['identity'],'worldId':value['worldId'],'glbSha256':value['assets']['glb']['sha256'],'assessmentSha256':value['assets']['assessment']['sha256'],'visits':value['visits']})
result={'verifiedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'previousPid':previous_pid,'currentPid':pid,'passed':True,'checkedCases':len(rows),'visitedCases':sum(bool(r['visits']) for r in rows),'rows':rows}
(data/'restart-verification.json').write_text(json.dumps(result,indent=2)+'\n');print({k:v for k,v in result.items() if k!='rows'})
