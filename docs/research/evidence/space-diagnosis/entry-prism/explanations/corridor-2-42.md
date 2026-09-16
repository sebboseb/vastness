# corridor-2-42: failed

An empty covered walkway between brick walls, broad straight path, low arched ceiling and flat continuous paving.

Locked scale: 6. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": false,
  "required": [],
  "evidence": [],
  "ambiguities": [
    "No supported spatial topology was specified; generic objects or open scenery cannot be accepted as an inferred interior."
  ],
  "requirements": {
    "openSky": false,
    "covered": true,
    "opposingWalls": true,
    "minimumWidth": 2.4
  },
  "physical": {
    "radius": 0.3,
    "height": 1.8,
    "eyeHeight": 1.65,
    "maxStep": 0.25,
    "maxSlopeDegrees": 35,
    "minimumDisplacement": 3,
    "reversible": true
  }
}
```

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/corridor-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/corridor-2-42/expanded.ndjson.gz`. SHA256 `382dcb433953b239d1f2af6d0ac417253e86b56f2903216cc538166dbe6cc042`; 15,644 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1084 valid sampled nodes; 1749 floor tests |
| Proposals | Returned pass: 322 eligible; 0 attempted. All trace passes: 260 omitted by selection; 384 selected but not attempted |
| Pre-screen | {}; passed 0 |
| Components | Returned pass: 0 reached-entry discoveries. All passes: 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 0 candidate events. Returned pass: maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

Per-pass event counts (nested predecessor identity is retained in each complete trace event):

```json
{
  "single": {
    "result:begin": 1,
    "result:complete": 1
  },
  "baseline": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 665,
    "support:node": 1084,
    "proposal:eligible": 322,
    "proposal:direction-excluded": 4014,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 130,
    "budget:exhausted": 1,
    "proposal:not-attempted": 192,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 665,
    "support:node": 1084,
    "proposal:eligible": 322,
    "proposal:direction-excluded": 4014,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 130,
    "budget:exhausted": 1,
    "proposal:not-attempted": 192,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py entry-prism corridor-2-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/corridor-2-42/legacy.ndjson.gz`. SHA256 `c482c8e718a9fc7157e91dd0658ada558312d6a01cbf8abd0655a88a7eb0da1e`; 17,348 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1084 valid sampled nodes; 1749 floor tests |
| Proposals | Returned pass: 73 eligible; 0 attempted. All trace passes: 50 omitted by selection; 96 selected but not attempted |
| Pre-screen | {}; passed 0 |
| Components | Returned pass: 0 reached-entry discoveries. All passes: 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 0 candidate events. Returned pass: maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

Per-pass event counts (nested predecessor identity is retained in each complete trace event):

```json
{
  "single": {
    "result:begin": 1,
    "result:complete": 1
  },
  "baseline": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 665,
    "support:node": 1084,
    "proposal:direction-excluded": 4147,
    "proposal:legacy-body-sample": 1437,
    "proposal:eligible": 73,
    "proposal:direction-unexecuted": 116,
    "proposal:selected": 48,
    "proposal:omitted": 25,
    "budget:exhausted": 1,
    "proposal:not-attempted": 48,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 665,
    "support:node": 1084,
    "proposal:direction-excluded": 4147,
    "proposal:legacy-body-sample": 1437,
    "proposal:eligible": 73,
    "proposal:direction-unexecuted": 116,
    "proposal:selected": 48,
    "proposal:omitted": 25,
    "budget:exhausted": 1,
    "proposal:not-attempted": 48,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py entry-prism corridor-2-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
