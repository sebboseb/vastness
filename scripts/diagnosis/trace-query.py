"""Read immutable compressed diagnostic events without loading an entire trace.
Usage: python3 scripts/diagnosis/trace-query.py PHASE CANDIDATE [--mode expanded|legacy] [--stage topology] [--kind KIND] [--field KEY=VALUE] [--limit 20]
"""
import argparse,gzip,json
from pathlib import Path
p=argparse.ArgumentParser(description=__doc__)
p.add_argument('phase');p.add_argument('candidate');p.add_argument('--mode',choices=['expanded','legacy'],default='expanded');p.add_argument('--stage');p.add_argument('--kind');p.add_argument('--field',action='append',default=[]);p.add_argument('--limit',type=int,default=20)
a=p.parse_args();root=Path(__file__).resolve().parents[2];base=root/'.runtime/space-diagnosis';file=(base/a.phase/'candidates'/a.candidate/(a.mode+'.ndjson.gz')).resolve()
if not file.is_relative_to(base.resolve()):raise SystemExit('Trace path must remain inside study data')
filters=dict(v.split('=',1) for v in a.field);count=0;matched=0
with gzip.open(file,'rt') as f:
 for line in f:
  e=json.loads(line);count+=1
  if a.stage and e['stage']!=a.stage or a.kind and e['kind']!=a.kind:continue
  if any(str(e.get(k))!=v for k,v in filters.items()):continue
  matched+=1
  if matched<=a.limit:print(json.dumps(e,ensure_ascii=False))
print(json.dumps({'scanned':count,'matched':matched,'displayed':min(matched,a.limit),'outputLimited':matched>a.limit}))
