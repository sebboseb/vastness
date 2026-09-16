"""Fill measured report sections only after complete replay, browser and preservation evidence."""
import datetime,json,re
from pathlib import Path
root=Path(__file__).resolve().parents[2];base=root/'.runtime/space-diagnosis'
names=['baseline','entry-prism','coverage','walkway','doorway-scope']
summaries={name:json.loads((base/name/'summary.json').read_text()) for name in names}
for name,s in summaries.items():assert s['n']==len(s['rows'])==36 and len({r['id'] for r in s['rows']})==36
final=summaries[names[-1]];browser=json.loads((base/names[-1]/'browser-verification.json').read_text())
assert browser['eligible']==final['passed'] and not any(r['status']=='not-assessed' for r in browser['rows'])
restart=json.loads((base/names[-1]/'restart-verification.json').read_text());assert restart['passed'] and restart['checkedCases']==36
integrity=json.loads((base/'integrity-verification.json').read_text());assert integrity['passed']
assert datetime.datetime.fromisoformat(integrity['verifiedAt']).timestamp()>=max(p.stat().st_mtime for n in names for p in (base/n/'candidates').glob('*/selected-assessment.json'))
new=browser['previouslyUnresolvedVerified'];unresolved=31-new
outcome=(f'**{new}/31 previously unresolved cases were demonstrated as whole-case interpreter false negatives** in these frozen replays. '
 f'The final interpreter accepts **{final["passed"]}/36 ({100*final["passed"]/36:.1f}%)** at the original locked scales, compared with3/36 before diagnosis. '
 f'Browser entry, traversal and return pass **{browser["passed"]}/{browser["eligible"]} eligible destinations**. '
 f'{final["recoveredFrom31"]} of the prior31 pass geometry, and {new} complete the browser endpoint. '
 f'All {unresolved} remaining cases stay unresolved; this is **not evidence that all {unresolved} contain unusable generation**.')
if new==0:outcome='**No new whole-case interpreter false negative was demonstrated (0/31).** '+outcome.split(' in these frozen replays. ',1)[1]
lines=['| Frozen phase | Accepted /36 | Newly accepted geometry | Regressions | Method freeze |','|---|---:|---:|---:|---|']
for name,s in summaries.items():lines.append(f'| {name} | {s["passed"]} | {s["recovered"]} | {s["regressed"]} | [{s["freeze"][:12]}](evidence/space-diagnosis/{name}/freeze.json) |')
lines+=['','Every phase includes all36; counts are not selected examples. Newly accepted geometry is relative to the immediately preceding phase. These columns do not themselves establish browser recovery.','', '| Category | Final geometry /4 | Final browser /4 |','|---|---:|---:|']
for category in final['categories']:
 ids={r['id'] for r in final['rows'] if r['category']==category['category']}
 passed=sum(r['id'] in ids and r['status']=='passed' for r in browser['rows'])
 lines.append(f'| {category["category"].replace("_"," ")} | {category["passed"]} | {passed} |')
tax={n:json.loads((base/n/'taxonomy.json').read_text()) for n in names}
keys=sorted({k for t in tax.values() for k in t['prior31Counts']})
lines+=['', 'Operational stages among the original31 unresolved cases:', '', '| Deepest reached result | Baseline | Entry | Coverage | Walkway | Doorway scope |','|---|---:|---:|---:|---:|---:|']
for key in keys:lines.append('| '+key.replace('-',' ')+' | '+' | '.join(str(tax[n]['prior31Counts'].get(key,0)) for n in names)+' |')
lines+=['','These stage counts aggregate all recorded bounded passes. A later rejection can coexist with earlier projection, body or connectivity failures. They do not identify an irreparable cause for an entire mesh.','', '| Phase | Complete traces | Ordered events | Compressed trace bytes retained locally |','|---|---:|---:|---:|']
for n in names:
 manifest=json.loads((root/'docs/research/evidence/space-diagnosis'/n/'trace-manifest.json').read_text())
 lines.append(f'| [{n} case guides](evidence/space-diagnosis/{n}/explanations/index.md) | {len(manifest)} | {sum(x["events"] for x in manifest):,} | {sum(x["bytes"] for x in manifest):,} |')
lines+=['','Newly accepted cases: '+(', '.join(r['id'] for r in final['rows'] if r['previouslyUnresolved'] and r['status']=='passed') or 'none')+'.', 'Lost cases at any phase: '+(', '.join(f'{n}: {r["id"]}' for n,s in summaries.items() for r in s['rows'] if r['regressed']) or 'none')+'.']
browser_text=(f'The final doorway-scope inspection independently tested all **{browser["eligible"]} accepted destinations** through the existing visible controls; **{browser["passed"]} passed**. '
 f'{new} are from the prior31 unresolved cases. First attempts are retained as recorded, including any failure; none is replaced by a successful retry. '
 f'An actual final service restart verified all36 artifact identities and retained visit journals. '
 'The unchanged accepted cases are regression checks, not new recoveries. [Final browser evidence](evidence/space-diagnosis/doorway-scope/browser-verification.json), [restart evidence](evidence/space-diagnosis/doorway-scope/restart-verification.json).')
integrity_text=('The final preservation audit verifies both pinned inventories: '+', '.join(f'{x["files"]:,} files / {x["bytes"]:,} bytes' for x in integrity['inventories'])+'. '
 'Original generated assets, previous results and their source methods remain intact. '
 '[Integrity verification](evidence/space-diagnosis/integrity-verification.json).')
path=root/'docs/research/generated-space-diagnosis.md';text=path.read_text()
for key,value in [('outcome',outcome),('results','\n'.join(lines)),('browser',browser_text),('integrity',integrity_text)]:
 pattern=f'<!-- {key}-start -->.*?<!-- {key}-end -->';text,count=re.subn(pattern,lambda _:value,text,flags=re.S);assert count==1,key
text=text.replace('all36','all 36').replace('all31','all 31').replace('original31','original 31').replace('prior31','prior 31').replace('with3/36','with 3/36')
path.write_text(text);print({'report':str(path),'geometry':final['passed'],'browser':browser['passed'],'newWholeCases':new,'unresolved':unresolved})
