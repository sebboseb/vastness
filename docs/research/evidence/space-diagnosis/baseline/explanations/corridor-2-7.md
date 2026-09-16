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

Complete trace: `.runtime/space-diagnosis/baseline/candidates/corridor-2-7/expanded.ndjson.gz`. SHA256 `e5097ed54402a3c0fff9cdf1281a36cf8dabc2049ec2577955b422c0807d5916`; 10,843 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1581 valid sampled nodes; 2420 floor tests |
| Proposals | 408 eligible; 0 attempted; 216 omitted by selection; 192 selected but not attempted |
| Pre-screen | {}; passed 0 |
| Components | 0 reached-entry discoveries, 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline corridor-2-7 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/corridor-2-7/legacy.ndjson.gz`. SHA256 `5ee29865fc47fe4dc8f4b12827138518c157ef8e48351eede8362dc14f74f966`; 16,454 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1581 valid sampled nodes; 2420 floor tests |
| Proposals | 321 eligible; 0 attempted; 273 omitted by selection; 48 selected but not attempted |
| Pre-screen | {}; passed 0 |
| Components | 0 reached-entry discoveries, 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline corridor-2-7 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
