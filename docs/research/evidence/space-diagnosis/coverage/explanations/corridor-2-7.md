# corridor-2-7: failed

An empty covered walkway between brick walls, broad straight path, low arched ceiling and flat continuous paving.

Locked scale: 10. Previously unresolved: True.

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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/corridor-2-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/coverage/candidates/corridor-2-7/expanded.ndjson.gz`. SHA256 `ebd876f45858c22580e7bcba5194384d47134b5da9f0b2c00b426bba641aeb9f`; 32,532 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1581 valid sampled nodes; 2420 floor tests |
| Proposals | Returned pass: 408 eligible; 0 attempted. All trace passes: 648 omitted by selection; 576 selected but not attempted |
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
  "predecessor": {
    "result:coverage-pass-start": 1,
    "result:entry-pass-start": 2,
    "result:assessment-start": 2,
    "support:grid": 2,
    "support:column": 2600,
    "support:rejected": 1678,
    "support:node": 3162,
    "proposal:eligible": 816,
    "proposal:direction-excluded": 11832,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 432,
    "budget:exhausted": 2,
    "proposal:not-attempted": 384,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1300,
    "support:rejected": 839,
    "support:node": 1581,
    "proposal:eligible": 408,
    "proposal:direction-excluded": 5916,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 216,
    "budget:exhausted": 1,
    "route:scheduler-start": 1,
    "route:scheduler-complete": 1,
    "proposal:not-attempted": 192,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py coverage corridor-2-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/coverage/candidates/corridor-2-7/legacy.ndjson.gz`. SHA256 `9d8bec1e0e7e26e0c3ab95ffd9ed394df2ed4327c9ecef88812caa50278fd9be`; 49,365 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1581 valid sampled nodes; 2420 floor tests |
| Proposals | Returned pass: 321 eligible; 0 attempted. All trace passes: 819 omitted by selection; 144 selected but not attempted |
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
  "predecessor": {
    "result:coverage-pass-start": 1,
    "result:entry-pass-start": 2,
    "result:assessment-start": 2,
    "support:grid": 2,
    "support:column": 2600,
    "support:rejected": 1678,
    "support:node": 3162,
    "proposal:legacy-body-sample": 12068,
    "proposal:eligible": 642,
    "proposal:direction-unexecuted": 1152,
    "proposal:direction-excluded": 10854,
    "proposal:selected": 96,
    "proposal:omitted": 546,
    "budget:exhausted": 2,
    "proposal:not-attempted": 96,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1300,
    "support:rejected": 839,
    "support:node": 1581,
    "proposal:legacy-body-sample": 6034,
    "proposal:eligible": 321,
    "proposal:direction-unexecuted": 576,
    "proposal:direction-excluded": 5427,
    "proposal:selected": 48,
    "proposal:omitted": 273,
    "budget:exhausted": 1,
    "route:scheduler-start": 1,
    "route:scheduler-complete": 1,
    "proposal:not-attempted": 48,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py coverage corridor-2-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
