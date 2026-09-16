# corridor-1-7: failed

A long straight corridor with parallel stone walls, level floor, overhead roof and an open doorway at each end.

Locked scale: 10. Previously unresolved: False.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "enclosed-passage",
    "doorway-crossing"
  ],
  "evidence": [
    {
      "kind": "enclosed-passage",
      "source": "text",
      "cue": "corridor"
    },
    {
      "kind": "doorway-crossing",
      "source": "text",
      "cue": "doorway"
    }
  ],
  "ambiguities": [
    "Multiple positive topology cues are conjunctive: the same supported route must witness each requirement."
  ],
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/corridor-1-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/corridor-1-7/expanded.ndjson.gz`. SHA256 `c3b2a893317a6a6707b093f1c8d3f8f058199d14f967be4b8914d2ad226b59ac`; 137,547 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1294 valid sampled nodes; 2084 floor tests |
| Proposals | Returned pass: 560 eligible; 192 attempted. All trace passes: 1104 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 131, "support-edge-not-found": 171, "entry-prism-blocked": 262, "source-entry-prism": 262}; passed 12 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 319 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 387 candidate events. Returned pass: maximum connected displacement 5.4037m |
| Topology | {"doorway-crossing": 381} |
| Final seam | {"swept-forward:support-gap-or-step": 6, "swept-reverse:support-gap-or-step": 6} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "required-roof-coverage": 3297,
  "roof-coverage": 2943,
  "left-flank": 6942,
  "region-does-not-widen": 3522,
  "opposite-crossing-sides": 774
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
    "support:column": 2808,
    "support:rejected": 1580,
    "support:node": 2588,
    "proposal:eligible": 1120,
    "proposal:direction-excluded": 9232,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 736,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 20010,
    "prescreen:projection-start": 270,
    "prescreen:projection-blocked": 131,
    "prescreen:rejected": 262,
    "prescreen:body-sample": 308,
    "prescreen:passed": 8,
    "component:entry-search": 8,
    "component:node-visited": 1166,
    "edge:tested": 2720,
    "component:node-discovered": 1206,
    "prescreen:support-edge-not-found": 114,
    "route:candidate": 258,
    "topology:ray": 27130,
    "topology:node-feature": 566,
    "topology:node-predicate": 3792,
    "topology:sustained-sample": 3792,
    "topology:witness": 266,
    "topology:sustained-result": 262,
    "topology:aperture-node": 1940,
    "topology:aperture-axis": 5144,
    "topology:aperture-wider-regions": 2352,
    "topology:route-rejected": 254,
    "topology:aperture-accepted": 4,
    "topology:route-qualified": 4,
    "seam:swept-forward": 4,
    "seam:swept-reverse": 4,
    "route:seam-rejected": 4,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 131,
    "prescreen:entry-prism-proof": 135,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1404,
    "support:rejected": 790,
    "support:node": 1294,
    "proposal:eligible": 560,
    "proposal:direction-excluded": 4616,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 368,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 10005,
    "prescreen:projection-start": 135,
    "prescreen:entry-prism-blocked": 131,
    "prescreen:entry-prism-proof": 135,
    "prescreen:rejected": 131,
    "prescreen:body-sample": 154,
    "prescreen:passed": 4,
    "route:stream-admitted": 4,
    "prescreen:support-edge-not-found": 57,
    "route:scheduler-start": 1,
    "route:stream-resumed": 131,
    "component:entry-search": 4,
    "component:node-visited": 583,
    "edge:tested": 1360,
    "component:node-discovered": 603,
    "route:stream-complete": 2,
    "route:candidate": 129,
    "topology:ray": 13565,
    "topology:node-feature": 283,
    "topology:node-predicate": 1896,
    "topology:sustained-sample": 1896,
    "topology:witness": 133,
    "topology:sustained-result": 131,
    "topology:aperture-node": 970,
    "topology:aperture-axis": 2572,
    "topology:aperture-wider-regions": 1176,
    "topology:route-rejected": 127,
    "route:stream-suspended": 127,
    "topology:aperture-accepted": 2,
    "topology:route-qualified": 2,
    "seam:swept-forward": 2,
    "seam:swept-reverse": 2,
    "route:seam-rejected": 2,
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
    "seq": 9467,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 704,
    "triangle": [
      [
        -2.5196701288223267,
        0.07634907960891724,
        -4.791375696659088
      ],
      [
        -2.5196677446365356,
        0.0842408835887909,
        -4.792197346687317
      ],
      [
        -2.519039809703827,
        0.077638179063797,
        -4.8241108655929565
      ]
    ],
    "clippedApproachCoordinates": [
      [
        1.1927802219986916,
        0.18443473577499425
      ],
      [
        1.1927778378129006,
        0.185256385803223
      ],
      [
        1.1921499028801918,
        0.21716990470886266
      ]
    ],
    "approach": {
      "seam": [
        -1.326889906823635,
        0.09436968259666925,
        -4.606940960884094
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
    "seq": 9468,
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
    "seq": 9514,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1282:1",
    "triangleId": 357294,
    "triangle": [
      [
        2.473163902759552,
        0.12609153985977173,
        4.001239240169525
      ],
      [
        2.4743199348449707,
        0.12664243578910828,
        3.9613810181617737
      ],
      [
        2.496732324361801,
        0.12438878417015076,
        3.9611804485321045
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.43177122951475777
      ],
      [
        0.013996921479701108,
        -0.4318785905838016
      ],
      [
        0.002,
        -0.41148765452722746
      ]
    ],
    "approach": {
      "seam": [
        2.4827354028821,
        4.060477299178251,
        4.393059039115906
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 9557,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "850:3",
    "triangleId": 260,
    "triangle": [
      [
        -2.4927762150764465,
        0.1027803122997284,
        1.8038560450077057
      ],
      [
        -2.4908719956874847,
        0.10862022638320923,
        1.8035075068473816
      ],
      [
        -2.493062913417816,
        0.10121792554855347,
        1.7652435600757599
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.09521999508142454,
        0.36794313192367545
      ],
      [
        0.09487145692110044,
        0.36603891253471366
      ],
      [
        0.056607510149478735,
        0.3682298302650451
      ]
    ],
    "approach": {
      "seam": [
        -2.124833083152771,
        0.0952584523409945,
        1.7086360499262812
      ],
      "outward": [
        0,
        0,
        1
      ],
      "width": 1.2,
      "length": 3.401076526939869
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
    "seq": 9993,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "393:2",
    "eye": [
      -1.1248330831527709,
      1.7355011351246876,
      -1.4069409608840941
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

### predicate:required-roof-coverage

```json
[
  {
    "seq": 11158,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 10,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "required-roof-coverage",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          2.462414628749517,
          0.4073477051194203,
          null,
          null
        ],
        "threshold": {
          "minimumWidth": 0.6,
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
        "status": "passed",
        "measured": {
          "featureKey": "10:support",
          "bypassWhenWidthAtMost": 0.6
        },
        "threshold": 0.6
      },
      {
        "name": "required-roof-coverage",
        "status": "failed",
        "measured": 0,
        "threshold": 9
      }
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 11338,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 1,
    "nodeId": 9,
    "routeIndex": 1,
    "firstFailure": "roof-coverage",
    "roofCount": 0,
    "required": 9,
    "unexecuted": [
      "flank-rays",
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 11345,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 90,
    "routeIndex": 6,
    "axis": [
      1,
      0,
      0
    ],
    "left": null,
    "right": null,
    "minimumWidth": 0.6,
    "rayMaximum": 3,
    "firstFailure": "left-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:region-does-not-widen

```json
[
  {
    "seq": 11350,
    "stage": "topology",
    "kind": "aperture-wider-regions",
    "routeId": 1,
    "nodeId": 90,
    "routeIndex": 6,
    "axis": [
      0,
      0,
      1
    ],
    "valid": false,
    "sideObservations": [
      {
        "routeIndex": 2,
        "nodeId": 22,
        "left": {
          "id": 510883,
          "distance": 2.2643209934287443
        },
        "right": {
          "id": 262219,
          "distance": 0.6086488648623583
        },
        "minimumCombinedDistance": 3.4433045468837733,
        "valid": false
      }
    ],
    "unexecutedSides": [
      "after"
    ],
    "firstFailure": "region-does-not-widen",
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:opposite-crossing-sides

```json
[
  {
    "seq": 11432,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 291,
    "routeIndex": 13,
    "axis": [
      0,
      0,
      1
    ],
    "before": 9,
    "after": -1,
    "beforeSigned": -0.8000000000000003,
    "afterSigned": null,
    "minimumSignedMagnitude": 0.8,
    "firstFailure": "opposite-crossing-sides",
    "unexecuted": [
      "wider-regions"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 11473,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [
      "enclosed-passage"
    ],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### seam:support-gap-or-step

```json
[
  {
    "seq": 24782,
    "stage": "seam",
    "kind": "swept-forward",
    "proposalId": "10:2",
    "routeId": 62,
    "from": [
      1.075166916847229,
      1.7483602838420644,
      -6.199957635998726
    ],
    "target": [
      1.075166916847229,
      1.751713621469221,
      -4.606940960884094
    ],
    "movement": {
      "position": [
        1.075166916847229,
        1.7486068577098677,
        -5.254103985149417
      ],
      "blocked": true,
      "reason": "support-gap-or-step",
      "support": {
        "valid": true,
        "eye": [
          1.075166916847229,
          1.7486068577098677,
          -5.254103985149417
        ],
        "foot": [
          1.075166916847229,
          0.09860685770986781,
          -5.254103985149417
        ],
        "supportTriangleIds": [
          -1,
          580024
        ],
        "supportSamples": [
          {
            "position": [
              1.075166916847229,
              0.09836028384206445,
              -5.254103985149417
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              1.3751669168472291,
              0.09836028384206445,
              -5.254103985149417
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              1.2872989512031934,
              0.09836028384206445,
              -5.041971950793453
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              1.075166916847229,
              0.09860685770986781,
              -4.954103985149417
            ],
            "triangleId": 580024,
            "normalY": 0.9999840259552002
          },
          {
            "position": [
              0.8630348824912648,
              0.09836028384206445,
              -5.041971950793453
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.775166916847229,
              0.09836028384206445,
              -5.254103985149417
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.8630348824912648,
              0.09836028384206445,
              -5.466236019505381
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              1.075166916847229,
              0.09836028384206445,
              -5.554103985149417
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              1.2872989512031934,
              0.09836028384206445,
              -5.466236019505382
            ],
            "triangleId": -1,
            "normalY": 1
          }
        ],
        "headClearance": 1.8,
        "reason": null,
        "blockedTriangleId": null
      }
    },
    "endpointDistance": 0.647163024265323,
    "endpointTolerance": 1e-06,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 26113,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "92:1",
    "triangleId": 222052,
    "triangle": [
      [
        1.3555577397346497,
        3.7570352852344513,
        -3.9975470304489136
      ],
      [
        1.3381314277648926,
        3.77169668674469,
        -4.015454947948456
      ],
      [
        1.3949044048786163,
        3.775659203529358,
        -4.016309082508087
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.409212238200358
      ],
      [
        0.012361325323581696,
        -0.4093681216239933
      ],
      [
        0.002,
        -0.40442743035036743
      ]
    ],
    "approach": {
      "seam": [
        1.3825430795550346,
        0.11721497719261881,
        -3.606940960884094
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
    "seq": 55136,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 704,
    "triangle": [
      [
        -2.5196701288223267,
        0.07634907960891724,
        -4.791375696659088
      ],
      [
        -2.5196677446365356,
        0.0842408835887909,
        -4.792197346687317
      ],
      [
        -2.519039809703827,
        0.077638179063797,
        -4.8241108655929565
      ]
    ],
    "clippedPrismCoordinates": [
      [
        1.1927802219986916,
        0.18443473577499425,
        0.07634907960891724
      ],
      [
        1.1927778378129006,
        0.185256385803223,
        0.0842408835887909
      ],
      [
        1.1921499028801918,
        0.21716990470886266,
        0.077638179063797
      ]
    ],
    "approach": {
      "seam": [
        -1.326889906823635,
        0.09436968259666925,
        -4.606940960884094
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
      -0.15563031740333075,
      0.10936968259666925
    ],
    "bodyBand": [
      0.10936968259666925,
      1.8943696825966694
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
    "seq": 55138,
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py walkway corridor-1-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/corridor-1-7/legacy.ndjson.gz`. SHA256 `a3b87bfaaef1a556839b22278980b4012d82bc722003bd1e734a0779c066e2c5`; 468,288 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1294 valid sampled nodes; 2084 floor tests |
| Proposals | Returned pass: 100 eligible; 48 attempted. All trace passes: 156 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 38, "entry-prism-blocked": 76, "source-entry-prism": 76}; passed 30 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 335 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 2745 candidate events. Returned pass: maximum connected displacement 5.4000m |
| Topology | {"doorway-crossing": 2721} |
| Final seam | {"swept-forward:support-gap-or-step": 24, "swept-reverse:support-gap-or-step": 24} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "required-roof-coverage": 21363,
  "roof-coverage": 18726,
  "left-flank": 49008,
  "region-does-not-widen": 24960,
  "opposite-crossing-sides": 5238
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
    "support:column": 2808,
    "support:rejected": 1580,
    "support:node": 2588,
    "proposal:direction-excluded": 9826,
    "proposal:legacy-body-sample": 4734,
    "proposal:eligible": 200,
    "proposal:direction-unexecuted": 326,
    "proposal:selected": 96,
    "proposal:omitted": 104,
    "budget:exhausted": 2,
    "proposal:attempt": 96,
    "prescreen:edge-support-probe": 4316,
    "prescreen:projection-start": 96,
    "prescreen:body-sample": 796,
    "prescreen:passed": 20,
    "component:entry-search": 20,
    "component:node-visited": 4500,
    "edge:tested": 2818,
    "component:node-discovered": 4664,
    "route:candidate": 1830,
    "topology:ray": 147108,
    "topology:node-feature": 596,
    "topology:node-predicate": 25390,
    "topology:sustained-sample": 25390,
    "topology:witness": 1862,
    "topology:sustained-result": 1846,
    "topology:aperture-node": 12412,
    "topology:aperture-axis": 36164,
    "topology:aperture-wider-regions": 16656,
    "topology:route-rejected": 1814,
    "topology:aperture-accepted": 16,
    "topology:route-qualified": 16,
    "seam:swept-forward": 16,
    "seam:swept-reverse": 16,
    "route:seam-rejected": 16,
    "prescreen:projection-blocked": 38,
    "prescreen:rejected": 76,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-proof": 48,
    "prescreen:entry-prism-blocked": 38,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1404,
    "support:rejected": 790,
    "support:node": 1294,
    "proposal:direction-excluded": 4913,
    "proposal:legacy-body-sample": 2367,
    "proposal:eligible": 100,
    "proposal:direction-unexecuted": 163,
    "proposal:selected": 48,
    "proposal:omitted": 52,
    "budget:exhausted": 1,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2158,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-proof": 48,
    "prescreen:body-sample": 398,
    "prescreen:passed": 10,
    "route:stream-admitted": 10,
    "prescreen:entry-prism-blocked": 38,
    "prescreen:rejected": 38,
    "route:scheduler-start": 1,
    "route:stream-resumed": 917,
    "component:entry-search": 10,
    "component:node-visited": 2250,
    "edge:tested": 1409,
    "component:node-discovered": 2332,
    "route:candidate": 915,
    "topology:ray": 73554,
    "topology:node-feature": 298,
    "topology:node-predicate": 12695,
    "topology:sustained-sample": 12695,
    "topology:witness": 931,
    "topology:sustained-result": 923,
    "topology:aperture-node": 6206,
    "topology:aperture-axis": 18082,
    "topology:aperture-wider-regions": 8328,
    "topology:route-rejected": 907,
    "route:stream-suspended": 907,
    "route:stream-complete": 2,
    "topology:aperture-accepted": 8,
    "topology:route-qualified": 8,
    "seam:swept-forward": 8,
    "seam:swept-reverse": 8,
    "route:seam-rejected": 8,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### predicate:required-roof-coverage

```json
[
  {
    "seq": 11874,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 0,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "required-roof-coverage",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          0.4624055819799931,
          2.407297313918492,
          null,
          null
        ],
        "threshold": {
          "minimumWidth": 0.6,
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
        "status": "passed",
        "measured": {
          "featureKey": "0:support",
          "bypassWhenWidthAtMost": 0.6
        },
        "threshold": 0.6
      },
      {
        "name": "required-roof-coverage",
        "status": "failed",
        "measured": 0,
        "threshold": 9
      }
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 12038,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 1,
    "nodeId": 13,
    "routeIndex": 1,
    "firstFailure": "roof-coverage",
    "roofCount": 0,
    "required": 9,
    "unexecuted": [
      "flank-rays",
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 12044,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 76,
    "routeIndex": 5,
    "axis": [
      1,
      0,
      0
    ],
    "left": null,
    "right": null,
    "minimumWidth": 0.6,
    "rayMaximum": 3,
    "firstFailure": "left-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:region-does-not-widen

```json
[
  {
    "seq": 12049,
    "stage": "topology",
    "kind": "aperture-wider-regions",
    "routeId": 1,
    "nodeId": 76,
    "routeIndex": 5,
    "axis": [
      0,
      0,
      1
    ],
    "valid": false,
    "sideObservations": [
      {
        "routeIndex": 1,
        "nodeId": 13,
        "left": {
          "id": 510883,
          "distance": 0.46430240527088135
        },
        "right": {
          "id": 262216,
          "distance": 2.408548693875398
        },
        "minimumCombinedDistance": 3.4432802780402985,
        "valid": false
      }
    ],
    "unexecutedSides": [
      "after"
    ],
    "firstFailure": "region-does-not-widen",
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:opposite-crossing-sides

```json
[
  {
    "seq": 12131,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 277,
    "routeIndex": 12,
    "axis": [
      0,
      0,
      1
    ],
    "before": 8,
    "after": -1,
    "beforeSigned": -0.8000000000000003,
    "afterSigned": null,
    "minimumSignedMagnitude": 0.8,
    "firstFailure": "opposite-crossing-sides",
    "unexecuted": [
      "wider-regions"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 12172,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [
      "enclosed-passage"
    ],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### seam:support-gap-or-step

```json
[
  {
    "seq": 31544,
    "stage": "seam",
    "kind": "swept-forward",
    "proposalId": "0:2",
    "routeId": 108,
    "from": [
      -0.9248330831527709,
      1.734500463823733,
      -6.2047010362148285
    ],
    "target": [
      -0.9248330831527709,
      1.7420556706826011,
      -4.606940960884094
    ],
    "movement": {
      "position": [
        -0.9248330831527709,
        1.7367547732587092,
        -5.256030991487202
      ],
      "blocked": true,
      "reason": "support-gap-or-step",
      "support": {
        "valid": true,
        "eye": [
          -0.9248330831527709,
          1.7367547732587092,
          -5.256030991487202
        ],
        "foot": [
          -0.9248330831527709,
          0.0867547732587093,
          -5.256030991487202
        ],
        "supportTriangleIds": [
          -1,
          528138
        ],
        "supportSamples": [
          {
            "position": [
              -0.9248330831527709,
              0.0845004638237331,
              -5.256030991487202
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.6248330831527709,
              0.0845004638237331,
              -5.256030991487202
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.7127010487968066,
              0.0845004638237331,
              -5.043898957131238
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.9248330831527709,
              0.0867547732587093,
              -4.956030991487202
            ],
            "triangleId": 528138,
            "normalY": 0.9999399185180664
          },
          {
            "position": [
              -1.1369651175087352,
              0.0845004638237331,
              -5.043898957131238
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -1.224833083152771,
              0.0845004638237331,
              -5.256030991487202
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -1.1369651175087352,
              0.0845004638237331,
              -5.4681630258431655
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.9248330831527709,
              0.0845004638237331,
              -5.5560309914872015
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.7127010487968067,
              0.0845004638237331,
              -5.468163025843166
            ],
            "triangleId": -1,
            "normalY": 1
          }
        ],
        "headClearance": 1.8,
        "reason": null,
        "blockedTriangleId": null
      }
    },
    "endpointDistance": 0.6490900306031078,
    "endpointTolerance": 1e-06,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 31591,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2:2",
    "triangleId": 154661,
    "triangle": [
      [
        -1.1216042190790176,
        0.08374199271202087,
        -4.986642003059387
      ],
      [
        -1.1610319465398788,
        0.08488297462463379,
        -5.003952383995056
      ],
      [
        -1.1198130995035172,
        0.08486419916152954,
        -5.003580451011658
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0037175363634500786,
        -0.6
      ],
      [
        0.0036722391843797553,
        -0.5949800163507462
      ],
      [
        0.002,
        -0.5951568436696659
      ],
      [
        0.0020000000000000005,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.524833083152771,
        0.09229009235953371,
        -4.999908211827278
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
    "seq": 31592,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "2:2",
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
    "seq": 153560,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "24:1",
    "triangleId": 366210,
    "triangle": [
      [
        2.503238320350647,
        0.12139245867729187,
        -4.800172448158264
      ],
      [
        2.486732304096222,
        0.12650147080421448,
        -4.801391363143921
      ],
      [
        2.484789192676544,
        0.12537211179733276,
        -4.830996096134186
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.017204798758029494,
        -0.39323148727416957
      ],
      [
        0.002,
        -0.39435431162950657
      ],
      [
        0.0019999999999999996,
        -0.4186347135264386
      ]
    ],
    "approach": {
      "seam": [
        2.4860335215926175,
        4.053972376665011,
        -4.406940960884095
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 153755,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "130:0",
    "triangleId": 36,
    "triangle": [
      [
        -2.521508038043976,
        0.08025243878364563,
        -3.7953123450279236
      ],
      [
        -2.521158754825592,
        0.08637294173240662,
        -3.7964612245559692
      ],
      [
        -2.520882487297058,
        0.08562088012695312,
        -3.832673728466034
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.03380333632230759,
        0.5883713841438292
      ],
      [
        0.0334540531039238,
        0.5895202636718748
      ],
      [
        0.03337410251938955,
        0.6
      ],
      [
        0.033608635573431495,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -2.4877047017216682,
        0.08611792483790393,
        -3.2069409608840944
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

### projection:wholly-above-player

```json
[
  {
    "seq": 154096,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "419:1",
    "triangleId": 350682,
    "triangle": [
      [
        2.446022927761078,
        4.038975834846497,
        -1.7623308300971985
      ],
      [
        2.462664842605591,
        4.051825702190399,
        -1.7629659175872803
      ],
      [
        2.463339865207672,
        4.050496816635132,
        -1.8070833384990692
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.35567716167369706
      ],
      [
        0.011113665997981137,
        -0.3560249567031861
      ],
      [
        0.011788688600062436,
        -0.40014237761497506
      ],
      [
        0.002,
        -0.3748452735416595
      ]
    ],
    "approach": {
      "seam": [
        2.4515511766076097,
        0.0914527160134197,
        -1.4069409608840941
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
    "seq": 187042,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "2:2",
    "triangleId": 154661,
    "triangle": [
      [
        -1.1216042190790176,
        0.08374199271202087,
        -4.986642003059387
      ],
      [
        -1.1610319465398788,
        0.08488297462463379,
        -5.003952383995056
      ],
      [
        -1.1198130995035172,
        0.08486419916152954,
        -5.003580451011658
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0037175363634500786,
        -0.6,
        0.084866485797973
      ],
      [
        0.0036722391843797553,
        -0.5949800163507462,
        0.08486419916152954
      ],
      [
        0.002,
        -0.5951568436696659,
        0.08475340993201336
      ],
      [
        0.0020000000000000005,
        -0.6,
        0.08475272135997282
      ]
    ],
    "approach": {
      "seam": [
        -0.524833083152771,
        0.09229009235953371,
        -4.999908211827278
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
      -0.15770990764046627,
      0.10729009235953371
    ],
    "bodyBand": [
      0.10729009235953371,
      1.8922900923595338
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
    "seq": 187044,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "2:2",
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
python3 scripts/diagnosis/trace-query.py walkway corridor-1-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
