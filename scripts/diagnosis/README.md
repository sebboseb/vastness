# Disposable generated-space diagnosis

Question: which of the frozen36 rejected spaces are false negatives of interpretation? No generation or geometry repair is permitted. Previous frozen modules are immutable. Diagnostic copies first prove observational parity; later changes need explicit trace evidence and separate phase freezes.

Prepare a phase config and freeze it before evaluation:

```sh
node --import tsx scripts/diagnosis/runner.ts freeze scripts/diagnosis/baseline.json
node --import tsx scripts/diagnosis/runner.ts evaluate baseline
node --import tsx scripts/diagnosis/runner.ts summarize baseline
```

The runner consumes only previously retained local artifacts. It never submits GPU jobs. `.runtime/space-diagnosis/<phase>` is a separate scratch study directory. Each considered route/proposal is identified in a streaming NDJSON trace compressed in concatenated gzip members. Every emitted event is retained, with sequence number, counts and content hash; no silent trace sampling. Assessment source hashes and freeze hashes bind these observations to source triangles and the predeclared method. A crash leaves a `.partial` file; resume preserves it as an aborted attempt and starts a fresh trace. Completed traces lacking assessments are similarly retained as orphans. Failed observational parity always blocks resume and publication.

Inspect a rejection without loading the whole trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline tunnel-1-7 --stage prescreen --limit 20
```

`--mode legacy` chooses the fallback attempt; `--kind` or `--field name=value` narrows events. Output limits apply only to viewing, not saved traces. The final line reports the complete scanned/matching counts. A skipped predicate is not a failed geometric observation.

Browser inspection reuses the existing generated-passage page and original navigator:

```sh
node --import tsx scripts/diagnosis/runner.ts prepare baseline
PASSAGE_DATA_DIR=.runtime/space-diagnosis/baseline/inspection node --import tsx services/passage-prototype/server.ts
```

Use the existing passage Vite configuration on5176 and API4312. Keep separate journals for each phase. Previous data remains untouched. This diagnostic shell and methods stay on the isolated runtime branch; integration retains only evidence and conclusions.
