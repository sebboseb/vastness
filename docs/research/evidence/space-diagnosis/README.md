# Frozen-space diagnosis evidence

This directory contains compact, source-bound evidence from the isolated `codex/generated-space-diagnosis` experiment. Every phase has its own method freeze, all 36 assessments, intent traces, per-candidate trace guides and exact diagnostic excerpts. Runtime methods are snapshotted under each phase's `methods/`; integration receives these as evidence, not active application code.

The complete ordered traces are retained locally as `.runtime/space-diagnosis/<phase>/candidates/<id>/<expanded|legacy>.ndjson.gz`. They are concatenated gzip members, readable by Python's gzip reader. They are not sampled or truncated. `trace-manifest.json` records each path, SHA256, compressed size, event count and event-type counts. These large files are deliberately not duplicated into Git; source artifacts remain in the existing frozen local dataset. A clone alone does not contain either the original generated assets or complete traces.

Read `explanations/index.md` for a phase's 36 candidate guides. Exact compiler decisions are in `candidates/<id>/intent-trace.json`; assessment files contain thresholds, routes, witnesses, search budgets and trace hashes. Guides include representative exact rejection events with sequence IDs. Zero observations at a later stage mean it was unexecuted, not that its geometry predicate failed.

On the runtime branch, query any complete local trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline doorway-1-7 --mode expanded --stage proposal --limit 20
```

The viewer limit only limits displayed records. It does not truncate the underlying evidence. `analyze.py` checks every event sequence and count against the assessment and validates the compressed trace hash before summarizing. Counts across routes may repeatedly observe the same geometry; they are not independent failures.

Each correction is frozen before cohort evaluation. Original scales, source meshes, player dimensions, navigation implementation and earlier results remain fixed. Per-mode predecessor success is retained; a newly selected route for an already successful candidate receives fresh browser verification and is not a recovery. The 31-unresolved denominator excludes the three prior selected successes and two previously demonstrated alternate-scale opportunities.

Browser evidence, when eligible, is stored per candidate with forward/return telemetry and screenshots. The first attempt is primary. Independent verification reads the original navigator's observations and the persisted service journal. The restart record checks artifact hashes, destination identities and visits after a real service restart. No GPU jobs or source geometry repairs are part of this experiment.
