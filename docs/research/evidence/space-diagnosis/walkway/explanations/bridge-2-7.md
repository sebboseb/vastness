# bridge-2-7: failed

A covered wooden footbridge with parallel side walls, high roof and flat uninterrupted deck, open entrances at both ends.

Locked scale: 16. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "elevated-bridge"
  ],
  "evidence": [
    {
      "kind": "elevated-bridge",
      "source": "text",
      "cue": "footbridge"
    }
  ],
  "ambiguities": [],
  "requirements": {
    "openSky": false,
    "covered": true,
    "opposingWalls": true,
    "minimumWidth": 0.6
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/bridge-2-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/bridge-2-7/expanded.ndjson.gz`. SHA256 `e844970d4199abd3848f0fcca25020bf812074a54a43055500e02cdca69ea292`; 1,977,179 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 4423 valid sampled nodes; 7646 floor tests |
| Proposals | Returned pass: 1280 eligible; 192 attempted. All trace passes: 3264 omitted by selection; 3 selected but not attempted |
| Pre-screen | {"source-projection": 145, "support-edge-not-found": 141, "entry-prism-blocked": 239, "source-entry-prism": 239, "exterior-approach-limit": 40}; passed 8 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 765 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 1778 candidate events. Returned pass: maximum connected displacement 6.6843m |
| Topology | {"elevated-bridge": 1770, "explicit-walls": 8} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:missing-edge:-1": 37779,
  "deck:lower-side-wall:-1": 79917,
  "deck:missing-edge:1": 38110,
  "deck:lower-side-wall:1": 46145,
  "deck:width": 25713,
  "deck:under-deck-obstruction": 3864,
  "opposing-walls": 326
}
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
    "support:column": 12960,
    "support:rejected": 6436,
    "support:node": 8846,
    "support:duplicate-layer": 10,
    "proposal:eligible": 2560,
    "proposal:direction-excluded": 32824,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 2176,
    "budget:exhausted": 3,
    "proposal:attempt": 381,
    "prescreen:edge-support-probe": 18657,
    "prescreen:projection-start": 267,
    "prescreen:projection-blocked": 145,
    "prescreen:rejected": 263,
    "prescreen:support-edge-not-found": 94,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 118,
    "prescreen:entry-prism-proof": 122,
    "prescreen:exterior-approach-limit": 20,
    "prescreen:body-sample": 156,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 3060,
    "edge:tested": 4613,
    "component:node-discovered": 3056,
    "route:candidate": 895,
    "topology:ray": 160000,
    "topology:node-feature": 737,
    "topology:deck-edge-probe": 703008,
    "topology:deck-node": 51255,
    "topology:route-rejected": 895,
    "topology:deck-longitudinal": 621,
    "topology:ray-not-executed": 3346,
    "topology:witness": 7,
    "topology:deck-accepted": 7,
    "topology:node-predicate": 284,
    "topology:sustained-sample": 284,
    "topology:sustained-result": 7,
    "proposal:not-attempted": 3,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 6480,
    "support:rejected": 3218,
    "support:node": 4423,
    "support:duplicate-layer": 5,
    "proposal:eligible": 1280,
    "proposal:direction-excluded": 16412,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 1088,
    "budget:exhausted": 2,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9400,
    "prescreen:projection-start": 125,
    "prescreen:entry-prism-blocked": 121,
    "prescreen:entry-prism-proof": 125,
    "prescreen:rejected": 121,
    "prescreen:exterior-approach-limit": 20,
    "prescreen:support-edge-not-found": 47,
    "prescreen:body-sample": 156,
    "prescreen:passed": 4,
    "route:stream-admitted": 4,
    "route:scheduler-start": 1,
    "route:stream-resumed": 885,
    "component:entry-search": 4,
    "component:node-visited": 3037,
    "edge:tested": 4613,
    "component:node-discovered": 3039,
    "route:candidate": 883,
    "topology:ray": 160000,
    "topology:node-feature": 737,
    "topology:deck-edge-probe": 689132,
    "topology:deck-node": 50195,
    "topology:route-rejected": 883,
    "route:stream-suspended": 883,
    "topology:deck-longitudinal": 111,
    "route:stream-complete": 2,
    "topology:ray-not-executed": 166,
    "topology:witness": 1,
    "topology:deck-accepted": 1,
    "topology:node-predicate": 42,
    "topology:sustained-sample": 42,
    "topology:sustained-result": 1,
    "route:stream-unexecuted": 2,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 33349,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 117694,
    "triangle": [
      [
        -2.083895683288574,
        0.169342041015625,
        -7.521005153656006
      ],
      [
        -2.0677123069763184,
        0.1853961944580078,
        -7.544327735900879
      ],
      [
        -2.01051664352417,
        0.17838621139526367,
        -7.571967601776123
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0848632842302326,
        -0.04295883178710902
      ],
      [
        0.06867990791797673,
        -0.019636249542235973
      ],
      [
        0.011484244465828297,
        0.008003616333008168
      ]
    ],
    "approach": {
      "seam": [
        -1.9990323990583416,
        0.1966045558515366,
        -7.563963985443115
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 6.09265299141407
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 33350,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 33458,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1833:1",
    "triangleId": 144360,
    "triangle": [
      [
        -1.1433031558990479,
        8.124064207077026,
        -0.7180870175361633
      ],
      [
        -1.1456674337387085,
        8.122507810592651,
        -0.7758967280387878
      ],
      [
        -1.0882105827331543,
        8.093044996261597,
        -0.774173378944397
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.4102921962717427
      ],
      [
        0.004760663211345051,
        -0.41020939350128227
      ],
      [
        0.002,
        -0.4073989320234407
      ]
    ],
    "approach": {
      "seam": [
        -1.0929712459444993,
        8.48904813066565,
        -0.3639639854431147
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 9.191547410190104
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 33503,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1088:1",
    "triangleId": 299544,
    "triangle": [
      [
        7.933455467224121,
        0.7972965240478516,
        -1.8981597423553467
      ],
      [
        7.934326648712158,
        0.8153038024902344,
        -1.9642289876937866
      ],
      [
        7.985132217407227,
        0.8059499263763428,
        -1.905867099761963
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.3551129962864878
      ],
      [
        0.013499552011488447,
        -0.341903114318848
      ],
      [
        0.002,
        -0.3401880072919071
      ]
    ],
    "approach": {
      "seam": [
        7.971632665395738,
        0.803904406132276,
        -1.5639639854431149
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 34106,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "3593:2",
    "eye": [
      -0.5916853904724118,
      1.8754413487793482,
      2.636036014556886
    ],
    "outward": [
      0,
      0,
      -1
    ],
    "inside": 1.4999999999999987,
    "outside": 1.5249999999999986,
    "maximumScan": 1.5,
    "unexecuted": [
      "projection",
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 34367,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "3043:3",
    "triangleId": 183700,
    "triangle": [
      [
        0.5594394207000732,
        7.492588758468628,
        1.8375645875930786
      ],
      [
        0.5597537755966187,
        7.492638826370239,
        1.7759308815002441
      ],
      [
        0.6166197657585144,
        7.465616703033447,
        1.8373541831970215
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.15079569677056334,
        0.6
      ],
      [
        0.15976643860340012,
        0.5916948437690746
      ],
      [
        0.15979699877891396,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        1.208314609527589,
        3.7177643555102735,
        1.6775877445936214
      ],
      "outward": [
        0,
        0,
        1
      ],
      "width": 1.2,
      "length": 6.205325940251349
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 76719,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 117694,
    "triangle": [
      [
        -2.083895683288574,
        0.169342041015625,
        -7.521005153656006
      ],
      [
        -2.0677123069763184,
        0.1853961944580078,
        -7.544327735900879
      ],
      [
        -2.01051664352417,
        0.17838621139526367,
        -7.571967601776123
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0848632842302326,
        -0.04295883178710902,
        0.169342041015625
      ],
      [
        0.06867990791797673,
        -0.019636249542235973,
        0.1853961944580078
      ],
      [
        0.011484244465828297,
        0.008003616333008168,
        0.17838621139526367
      ]
    ],
    "approach": {
      "seam": [
        -1.9990323990583416,
        0.1966045558515366,
        -7.563963985443115
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 6.69265299141407
    },
    "supportBand": [
      -0.053395444148463395,
      0.2116045558515366
    ],
    "bodyBand": [
      0.2116045558515366,
      1.9966045558515366
    ],
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 76721,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### prescreen:exterior-approach-limit

```json
[
  {
    "seq": 77113,
    "stage": "prescreen",
    "kind": "exterior-approach-limit",
    "proposalId": "3855:2",
    "seam": [
      4.608314609527589,
      0.3938403630309948,
      2.9411705434322357
    ],
    "distanceToBounds": 10.905134528875351,
    "startDistance": 11.305134528875351,
    "requiredLength": 11.605134528875352,
    "maximumLength": 10,
    "unexecuted": [
      "projection",
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 80173,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 2052,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 6.531994977193851,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": -0.4,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": {
          "id": 563084,
          "distance": 0.07824609340091648
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 268044,
          "distance": 0.301170118120683
        }
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
      "lower-side-wall:-1",
      "missing-edge:1",
      "lower-side-wall:1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### predicate:deck:lower-side-wall:-1

```json
[
  {
    "seq": 80173,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 2052,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 6.531994977193851,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": -0.4,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": {
          "id": 563084,
          "distance": 0.07824609340091648
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 268044,
          "distance": 0.301170118120683
        }
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
      "lower-side-wall:-1",
      "missing-edge:1",
      "lower-side-wall:1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 80173,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 2052,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 6.531994977193851,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": -0.4,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": {
          "id": 563084,
          "distance": 0.07824609340091648
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 268044,
          "distance": 0.301170118120683
        }
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
      "lower-side-wall:-1",
      "missing-edge:1",
      "lower-side-wall:1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### predicate:deck:lower-side-wall:1

```json
[
  {
    "seq": 80173,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 2052,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 6.531994977193851,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": -0.4,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": {
          "id": 563084,
          "distance": 0.07824609340091648
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 268044,
          "distance": 0.301170118120683
        }
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
      "lower-side-wall:-1",
      "missing-edge:1",
      "lower-side-wall:1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### predicate:deck:width

```json
[
  {
    "seq": 80173,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 2052,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 6.531994977193851,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": -0.4,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": {
          "id": 563084,
          "distance": 0.07824609340091648
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 268044,
          "distance": 0.301170118120683
        }
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
      "lower-side-wall:-1",
      "missing-edge:1",
      "lower-side-wall:1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### topology:elevated-bridge

```json
[
  {
    "seq": 80951,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "elevated-bridge",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-walls",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### predicate:deck:under-deck-obstruction

```json
[
  {
    "seq": 82603,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 3,
    "nodeId": 2158,
    "routeIndex": 17,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 7.661353973208438,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": -0.4,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": {
          "id": 197469,
          "distance": 0.032806421821550504
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 493241,
          "distance": 0.18864316723506555
        }
      }
    ],
    "below": {
      "id": 197456,
      "distance": 0.06384600222861957
    },
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
      "lower-side-wall:-1",
      "missing-edge:1",
      "lower-side-wall:1",
      "width",
      "under-deck-obstruction"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### predicate:opposing-walls

```json
[
  {
    "seq": 1003610,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 885,
    "nodeId": 2638,
    "topology": "explicit-walls",
    "valid": false,
    "firstFailure": "opposing-walls",
    "checks": [
      {
        "name": "opposing-walls",
        "status": "failed",
        "measured": [
          499752,
          null,
          null,
          null
        ],
        "threshold": [
          [
            0,
            1
          ],
          [
            2,
            3
          ]
        ]
      }
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### topology:explicit-walls

```json
[
  {
    "seq": 1003687,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 885,
    "firstFailingTopology": "explicit-walls",
    "completed": [
      "elevated-bridge"
    ],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py walkway bridge-2-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/bridge-2-7/legacy.ndjson.gz`. SHA256 `3093b2aa749bc08c9c1291730caaec59a6fabd2343a32598ba60b689ec40f4e8`; 100,658 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 4423 valid sampled nodes; 7646 floor tests |
| Proposals | Returned pass: 25 eligible; 25 attempted. All trace passes: 0 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 25, "entry-prism-blocked": 50, "source-entry-prism": 50}; passed 0 |
| Components | Returned pass: 0 reached-entry discoveries. All passes: 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 0 candidate events. Returned pass: maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | [] |

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
    "support:column": 12960,
    "support:rejected": 6436,
    "support:node": 8846,
    "support:duplicate-layer": 10,
    "proposal:direction-excluded": 35236,
    "proposal:legacy-body-sample": 956,
    "proposal:eligible": 50,
    "proposal:direction-unexecuted": 98,
    "proposal:selected": 50,
    "proposal:attempt": 50,
    "prescreen:edge-support-probe": 2216,
    "prescreen:projection-start": 50,
    "prescreen:projection-blocked": 25,
    "prescreen:rejected": 50,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 25,
    "prescreen:entry-prism-proof": 25,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 6480,
    "support:rejected": 3218,
    "support:node": 4423,
    "support:duplicate-layer": 5,
    "proposal:direction-excluded": 17618,
    "proposal:legacy-body-sample": 478,
    "proposal:eligible": 25,
    "proposal:direction-unexecuted": 49,
    "proposal:selected": 25,
    "proposal:attempt": 25,
    "prescreen:edge-support-probe": 1108,
    "prescreen:projection-start": 25,
    "prescreen:entry-prism-blocked": 25,
    "prescreen:entry-prism-proof": 25,
    "prescreen:rejected": 25,
    "route:scheduler-start": 1,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 32369,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:2",
    "triangleId": 136020,
    "triangle": [
      [
        -1.444771647453308,
        0.17864751815795898,
        -7.881711959838867
      ],
      [
        -1.4147107601165771,
        0.18680143356323242,
        -7.90965461730957
      ],
      [
        -1.3787243366241455,
        0.18294095993041992,
        -7.920538425445557
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002000000000000001,
        0.0012738286224351567
      ],
      [
        0.005534708499908447,
        0.012961053848266069
      ],
      [
        0.002,
        0.0069481967072412745
      ]
    ],
    "approach": {
      "seam": [
        -1.3916853904724116,
        0.18872289740057308,
        -7.915003716945648
      ],
      "outward": [
        0,
        0,
        -1
      ],
      "width": 1.2,
      "length": 2
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 32370,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:2",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 32768,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "899:0",
    "triangleId": 52,
    "triangle": [
      [
        -7.918210983276367,
        0.15226459503173828,
        -1.9525843858718872
      ],
      [
        -7.916989803314209,
        0.1534743309020996,
        -1.951532244682312
      ],
      [
        -7.913371562957764,
        0.15275049209594727,
        -1.9805328845977783
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0028926864266392016,
        -0.011379599571228027
      ],
      [
        0.002,
        -0.012148718118818578
      ],
      [
        0.002,
        -0.0062241793318169
      ]
    ],
    "approach": {
      "seam": [
        -7.915318296849728,
        0.15330518363511242,
        -1.9639639854431152
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 65903,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:2",
    "triangleId": 136020,
    "triangle": [
      [
        -1.444771647453308,
        0.17864751815795898,
        -7.881711959838867
      ],
      [
        -1.4147107601165771,
        0.18680143356323242,
        -7.90965461730957
      ],
      [
        -1.3787243366241455,
        0.18294095993041992,
        -7.920538425445557
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.002000000000000001,
        0.0012738286224351567,
        0.1841947167766525
      ],
      [
        0.005534708499908447,
        0.012961053848266069,
        0.18294095993041992
      ],
      [
        0.002,
        0.0069481967072412745,
        0.18255009084435084
      ]
    ],
    "approach": {
      "seam": [
        -1.3916853904724116,
        0.18872289740057308,
        -7.915003716945648
      ],
      "outward": [
        0,
        0,
        -1
      ],
      "width": 1.2,
      "length": 2
    },
    "supportBand": [
      -0.061277102599426925,
      0.2037228974005731
    ],
    "bodyBand": [
      0.2037228974005731,
      1.988722897400573
    ],
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 65905,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:2",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py walkway bridge-2-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
