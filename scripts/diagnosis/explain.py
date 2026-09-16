"""Create per-candidate reading guides into the complete immutable traces."""
import json,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2];phase=sys.argv[1];data=root/'.runtime/space-diagnosis'/phase
analysis=json.loads((data/'trace-analysis.json').read_text());assert analysis['complete']
out=data/'explanations';out.mkdir(exist_ok=True)
index=[f'# {phase}: all36 generated-space rejection traces','', 'These guides summarize observed decisions. Complete ordered gzip NDJSON traces retain every emitted event, including skipped predicates and omitted proposals. Counts are observations; a bounded failure is not a proof of unusable geometry.','', '| Candidate | Result | Trace guide |','|---|---|---|']
for row in analysis['rows']:
 text=[f'# {row["id"]}: {row["status"]}', '',row['text'],'',f'Locked scale: {row["selectedScale"]}. Previously unresolved: {row["previouslyUnresolved"]}.','', '## Intent compilation','', '```json',json.dumps(row['criteria'],indent=2),'```','',f'Modifier-scope warnings: {len(row["modifierWarnings"])}. Exact normalized spans and every compiler decision are in `../candidates/{row["id"]}/intent-trace.json`. Warnings are hypotheses, not automatic corrections.']
 for mode in row['modes']:
  a=json.loads((data/'candidates'/row['id']/(mode['mode']+'.json')).read_text());d=a['searchDiagnostics'];m=a['metrics'];counts=mode['eventCounts']
  text+=['',f'## {mode["mode"]}: {mode["status"]}','',f'Complete trace: `{mode["trace"]}`. SHA256 `{mode["sha256"]}`; {mode["events"]:,} contiguous events.','', '| Stage | Observed outcome |','|---|---|',f'| Generated support | {m["supportedPoints"]} valid sampled nodes; {m["testedFloorPoints"]} floor tests |',f'| Proposals | {m["entryCandidates"]} eligible; {d["entriesTested"]} attempted; {counts.get("proposal:omitted",0)} omitted by selection; {counts.get("proposal:not-attempted",0)} selected but not attempted |',f'| Pre-screen | {json.dumps(mode["prescreenRejections"])}; passed {counts.get("prescreen:passed",0)} |',f'| Components | {d["componentsExplored"]} reached-entry discoveries, {mode["distinctVisitedNodes"]} distinct visited nodes; not exhaustive mesh decomposition |',f'| Routes | {mode["candidateRoutes"]} candidates; maximum connected displacement {m["maximumConnectedDisplacement"]:.4f}m |',f'| Topology | {json.dumps(mode["topologyFirstFailures"])} |',f'| Final seam | {json.dumps(mode["seamChecks"])} |',f'| Exhausted bounds | {json.dumps(mode["budgets"])} |','', 'First-failure predicate observations (later short-circuited checks remain untested):','', '```json',json.dumps(mode['predicateFailureObservations'],indent=2),'```','', 'Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.']
  for reason,events in mode['samples'].items():
   text+=['',f'### {reason}','', '```json',json.dumps(events[:1],indent=2),'```']
  text+=['', 'Read any stage or proposal from the full trace:','', '```sh',f'python3 scripts/diagnosis/trace-query.py {phase} {row["id"]} --mode {mode["mode"]} --stage prescreen --limit 20', '```']
  if a['traceSummary'].get('parity'):text+=['',f'Historical assessment parity: `{a["traceSummary"]["parity"]["passed"]}`. Only timing/harness provenance was excluded from comparison.']
 text+=['','A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.','']
 (out/(row['id']+'.md')).write_text('\n'.join(text));index.append(f'| {row["id"]} | {row["status"]} | [{row["id"]}]({row["id"]}.md) |')
(out/'index.md').write_text('\n'.join(index)+'\n');print({'guides':len(analysis['rows']),'directory':str(out)})
