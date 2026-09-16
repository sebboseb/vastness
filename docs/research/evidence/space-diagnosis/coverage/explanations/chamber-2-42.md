# chamber-2-42: failed

A quiet rectangular meditation chamber, wide entrance, plain walls, tall ceiling and an uninterrupted flat floor without furniture.

Locked scale: 16. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "enclosed-passage"
  ],
  "evidence": [
    {
      "kind": "enclosed-passage",
      "source": "text",
      "cue": "chamber"
    }
  ],
  "ambiguities": [],
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/chamber-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/coverage/candidates/chamber-2-42/expanded.ndjson.gz`. SHA256 `f8252a5d223750150de2cbe24c10b690f8b8ad3fc9edded1aa4e9923abe2305d`; 1,425,356 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 20000 valid sampled nodes; 21377 floor tests |
| Proposals | Returned pass: 1216 eligible; 192 attempted. All trace passes: 3072 omitted by selection; 157 selected but not attempted |
| Pre-screen | {"source-projection": 132, "support-edge-not-found": 128, "entry-prism-blocked": 148, "source-entry-prism": 148}; passed 11 |
| Components | Returned pass: 4 reached-entry discoveries. All passes: 5154 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 8192 candidate events. Returned pass: maximum connected displacement 9.0000m |
| Topology | {"enclosed-passage": 8192} |
| Final seam | {} |
| Exhausted bounds | ["supported-nodes", "entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 381653
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
    "support:column": 11310,
    "support:rejected": 2754,
    "support:node": 40000,
    "budget:exhausted": 5,
    "proposal:eligible": 2432,
    "proposal:direction-excluded": 157568,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 2048,
    "proposal:attempt": 227,
    "prescreen:edge-support-probe": 10805,
    "prescreen:projection-start": 159,
    "prescreen:projection-blocked": 132,
    "prescreen:rejected": 157,
    "prescreen:support-edge-not-found": 68,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 25,
    "prescreen:entry-prism-proof": 27,
    "prescreen:body-sample": 76,
    "prescreen:passed": 2,
    "component:entry-search": 2,
    "component:node-visited": 8776,
    "edge:tested": 69156,
    "component:node-discovered": 8842,
    "route:candidate": 4096,
    "topology:ray": 66027,
    "topology:node-feature": 5079,
    "topology:node-predicate": 255846,
    "topology:sustained-sample": 255846,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "route:candidate-not-executed": 1,
    "proposal:not-attempted": 157,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 5655,
    "support:rejected": 1377,
    "support:node": 20000,
    "budget:exhausted": 3,
    "proposal:eligible": 1216,
    "proposal:direction-excluded": 78784,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 1024,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9200,
    "prescreen:projection-start": 132,
    "prescreen:entry-prism-blocked": 123,
    "prescreen:entry-prism-proof": 132,
    "prescreen:rejected": 123,
    "prescreen:support-edge-not-found": 60,
    "prescreen:body-sample": 342,
    "prescreen:passed": 9,
    "route:stream-admitted": 9,
    "route:scheduler-start": 1,
    "route:stream-resumed": 4096,
    "component:entry-search": 9,
    "component:node-visited": 11250,
    "edge:tested": 49963,
    "component:node-discovered": 11744,
    "route:candidate": 4096,
    "topology:ray": 47281,
    "topology:node-feature": 3637,
    "topology:node-predicate": 125807,
    "topology:sustained-sample": 125807,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "route:stream-suspended": 4096,
    "route:stream-unexecuted": 9,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 108490,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 100024,
    "triangle": [
      [
        -7.989238739013672,
        0.017724990844726562,
        -7.8031158447265625
      ],
      [
        -7.989719390869141,
        0.07624530792236328,
        -7.805107116699219
      ],
      [
        -7.989487171173096,
        0.0762472152709961,
        -7.872740745544434
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.01246246546506935,
        0.1881364822387699
      ],
      [
        0.0129431173205381,
        0.19012775421142614
      ],
      [
        0.012710897624493178,
        0.257761383056641
      ]
    ],
    "approach": {
      "seam": [
        -7.9767762735486025,
        15.997120807907109,
        -7.614979362487793
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

### prescreen:source-projection

```json
[
  {
    "seq": 108491,
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 108533,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "19696:1",
    "triangleId": 913704,
    "triangle": [
      [
        7.87335205078125,
        0.013788223266601562,
        5.030513763427734
      ],
      [
        7.873361587524414,
        0.013522148132324219,
        4.961656093597412
      ],
      [
        7.925593376159668,
        0.004837989807128906,
        4.96358585357666
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.4220382108130113
      ],
      [
        0.01833263486623604,
        -0.42143478393554723
      ],
      [
        0.0020000000000000018,
        -0.4005105614729689
      ]
    ],
    "approach": {
      "seam": [
        7.907260741293432,
        0.10186923853847676,
        5.385020637512207
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
    "seq": 108685,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "19756:3",
    "eye": [
      -4.612419700622558,
      14.553291621218564,
      5.5850206375122085
    ],
    "outward": [
      0,
      0,
      1
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
    "seq": 110762,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "696:2",
    "triangleId": 832943,
    "triangle": [
      [
        6.994884967803955,
        15.964816093444824,
        -7.7888994216918945
      ],
      [
        6.9287943840026855,
        15.978532791137695,
        -7.864973068237305
      ],
      [
        6.994846820831299,
        15.978257656097412,
        -7.867826461791992
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.05255940609966033,
        -0.6
      ],
      [
        0.05287331193685496,
        -0.592733478546144
      ],
      [
        0.0020000000000000018,
        -0.5927088904856146
      ],
      [
        0.0020000000000000018,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        7.587580299377443,
        2.9175957973303324,
        -7.814953149855137
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 111261,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "10421:1",
    "triangleId": 880965,
    "triangle": [
      [
        7.889017105102539,
        12.897056579589844,
        -1.4142553806304932
      ],
      [
        7.89235258102417,
        12.952932357788086,
        -1.3539196252822876
      ],
      [
        7.892665386199951,
        12.952972412109375,
        -1.4163939952850342
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.08508397191762906,
        -0.5992760181427004
      ],
      [
        0.08841944783925992,
        -0.5389402627944948
      ],
      [
        0.08872517003908179,
        -0.6
      ],
      [
        0.08631901878277941,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        7.80393313318491,
        12.866193727524736,
        -0.8149793624877928
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

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 226785,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 100322,
    "triangle": [
      [
        -7.981989860534668,
        15.724310874938965,
        -7.805533409118652
      ],
      [
        -7.984465599060059,
        15.799111366271973,
        -7.807563781738281
      ],
      [
        -7.986885070800781,
        15.805564403533936,
        -7.87434720993042
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.005968547666195262,
        0.19117319581729902,
        15.747120807907109
      ],
      [
        0.007689325511456069,
        0.19258441925048864,
        15.799111366271973
      ],
      [
        0.010108797252178725,
        0.2593678474426273,
        15.805564403533936
      ],
      [
        0.006587797066117602,
        0.20987183148207414,
        15.747120807907109
      ]
    ],
    "approach": {
      "seam": [
        -7.9767762735486025,
        15.997120807907109,
        -7.614979362487793
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2
    },
    "supportBand": [
      15.747120807907109,
      16.01212080790711
    ],
    "bodyBand": [
      16.01212080790711,
      17.79712080790711
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
    "seq": 226787,
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 229968,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 19087,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "opposing-wall-width",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "failed",
        "measured": [
          null,
          null,
          null,
          null
        ],
        "threshold": {
          "minimumWidth": 2.4,
          "pairs": [
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
      },
      {
        "name": "broad-supported-region",
        "status": "not-evaluated"
      },
      {
        "name": "required-roof-coverage",
        "status": "not-evaluated"
      }
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 230211,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
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
python3 scripts/diagnosis/trace-query.py coverage chamber-2-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/coverage/candidates/chamber-2-42/legacy.ndjson.gz`. SHA256 `90bd79dcba113b12acff4c601d026c512d9c818bd5184d5ff467be83eb51c408`; 1,286,146 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 20000 valid sampled nodes; 21377 floor tests |
| Proposals | Returned pass: 409 eligible; 48 attempted. All trace passes: 1083 omitted by selection; 37 selected but not attempted |
| Pre-screen | {"source-projection": 48, "entry-prism-blocked": 45, "source-entry-prism": 45}; passed 14 |
| Components | Returned pass: 6 reached-entry discoveries. All passes: 5128 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 8192 candidate events. Returned pass: maximum connected displacement 6.0000m |
| Topology | {"enclosed-passage": 8192} |
| Final seam | {} |
| Exhausted bounds | ["supported-nodes", "entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 331933
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
    "support:column": 11310,
    "support:rejected": 2754,
    "support:node": 40000,
    "budget:exhausted": 5,
    "proposal:legacy-body-sample": 23128,
    "proposal:eligible": 818,
    "proposal:direction-unexecuted": 1618,
    "proposal:direction-excluded": 157564,
    "proposal:selected": 96,
    "proposal:omitted": 722,
    "proposal:attempt": 59,
    "prescreen:edge-support-probe": 2607,
    "prescreen:projection-start": 59,
    "prescreen:projection-blocked": 48,
    "prescreen:rejected": 58,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 10,
    "prescreen:entry-prism-proof": 11,
    "prescreen:body-sample": 42,
    "prescreen:passed": 1,
    "component:entry-search": 1,
    "component:node-visited": 4482,
    "edge:tested": 60240,
    "component:node-discovered": 4517,
    "route:candidate": 4096,
    "topology:ray": 57889,
    "topology:node-feature": 4453,
    "topology:node-predicate": 235201,
    "topology:sustained-sample": 235201,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "route:candidate-not-executed": 1,
    "proposal:not-attempted": 37,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 5655,
    "support:rejected": 1377,
    "support:node": 20000,
    "budget:exhausted": 3,
    "proposal:legacy-body-sample": 11564,
    "proposal:eligible": 409,
    "proposal:direction-unexecuted": 809,
    "proposal:direction-excluded": 78782,
    "proposal:selected": 48,
    "proposal:omitted": 361,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2153,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 35,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 35,
    "prescreen:body-sample": 525,
    "prescreen:passed": 13,
    "route:stream-admitted": 13,
    "route:scheduler-start": 1,
    "route:stream-resumed": 4096,
    "component:entry-search": 13,
    "component:node-visited": 8636,
    "edge:tested": 37954,
    "component:node-discovered": 9191,
    "route:candidate": 4096,
    "topology:ray": 36426,
    "topology:node-feature": 2802,
    "topology:node-predicate": 96732,
    "topology:sustained-sample": 96732,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "route:stream-suspended": 4096,
    "route:stream-unexecuted": 13,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 119055,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 100024,
    "triangle": [
      [
        -7.989238739013672,
        0.017724990844726562,
        -7.8031158447265625
      ],
      [
        -7.989719390869141,
        0.07624530792236328,
        -7.805107116699219
      ],
      [
        -7.989487171173096,
        0.0762472152709961,
        -7.872740745544434
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.01246246546506935,
        0.1881364822387699
      ],
      [
        0.0129431173205381,
        0.19012775421142614
      ],
      [
        0.012710897624493178,
        0.257761383056641
      ]
    ],
    "approach": {
      "seam": [
        -7.9767762735486025,
        15.997120807907109,
        -7.614979362487793
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

### prescreen:source-projection

```json
[
  {
    "seq": 119056,
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 119869,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "376:2",
    "triangleId": 800952,
    "triangle": [
      [
        6.172474384307861,
        15.957697868347168,
        -7.792782306671143
      ],
      [
        6.172341346740723,
        15.958245754241943,
        -7.872546672821045
      ],
      [
        6.237381935119629,
        15.960016250610352,
        -7.872655868530273
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0024258992664971265,
        -0.6
      ],
      [
        0.002509510517120006,
        -0.5501983642578132
      ],
      [
        0.002,
        -0.5506124071402055
      ],
      [
        0.0020000000000000013,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        6.787580299377442,
        15.987235052105344,
        -7.870146358013153
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

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 240412,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 100322,
    "triangle": [
      [
        -7.981989860534668,
        15.724310874938965,
        -7.805533409118652
      ],
      [
        -7.984465599060059,
        15.799111366271973,
        -7.807563781738281
      ],
      [
        -7.986885070800781,
        15.805564403533936,
        -7.87434720993042
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.005968547666195262,
        0.19117319581729902,
        15.747120807907109
      ],
      [
        0.007689325511456069,
        0.19258441925048864,
        15.799111366271973
      ],
      [
        0.010108797252178725,
        0.2593678474426273,
        15.805564403533936
      ],
      [
        0.006587797066117602,
        0.20987183148207414,
        15.747120807907109
      ]
    ],
    "approach": {
      "seam": [
        -7.9767762735486025,
        15.997120807907109,
        -7.614979362487793
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2
    },
    "supportBand": [
      15.747120807907109,
      16.01212080790711
    ],
    "bodyBand": [
      16.01212080790711,
      17.79712080790711
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
    "seq": 240414,
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 244646,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 140,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "opposing-wall-width",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "failed",
        "measured": [
          null,
          null,
          null,
          null
        ],
        "threshold": {
          "minimumWidth": 2.4,
          "pairs": [
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
      },
      {
        "name": "broad-supported-region",
        "status": "not-evaluated"
      },
      {
        "name": "required-roof-coverage",
        "status": "not-evaluated"
      }
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 244889,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
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
python3 scripts/diagnosis/trace-query.py coverage chamber-2-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
