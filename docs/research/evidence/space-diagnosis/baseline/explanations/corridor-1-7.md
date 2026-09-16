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

Complete trace: `.runtime/space-diagnosis/baseline/candidates/corridor-1-7/expanded.ndjson.gz`. SHA256 `b457ca8bfbe87555e2756918b9cb7d1fc013f73f607ad1c2ba710e9701f94f0e`; 45,670 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1294 valid sampled nodes; 2084 floor tests |
| Proposals | 560 eligible; 192 attempted; 368 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 131, "support-edge-not-found": 57}; passed 4 |
| Components | 3 reached-entry discoveries, 319 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 129 candidates; maximum connected displacement 5.4037m |
| Topology | {"doorway-crossing": 127} |
| Final seam | {"swept-forward:support-gap-or-step": 2, "swept-reverse:support-gap-or-step": 2} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "required-roof-coverage": 1099,
  "roof-coverage": 981,
  "left-flank": 2314,
  "region-does-not-widen": 1174,
  "opposite-crossing-sides": 258
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 9465,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 9466,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ]
  }
]
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 9512,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 9555,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 9991,
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
    ]
  }
]
```

### predicate:required-roof-coverage

```json
[
  {
    "seq": 11156,
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
    ]
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 11336,
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
    ]
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 11343,
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
    ]
  }
]
```

### predicate:region-does-not-widen

```json
[
  {
    "seq": 11348,
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
    "firstFailure": "region-does-not-widen"
  }
]
```

### predicate:opposite-crossing-sides

```json
[
  {
    "seq": 11430,
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
    ]
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 11471,
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
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### seam:support-gap-or-step

```json
[
  {
    "seq": 24780,
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
    "endpointTolerance": 1e-06
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 26111,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline corridor-1-7 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/corridor-1-7/legacy.ndjson.gz`. SHA256 `40c38316df8a20065d32ec9bfe97ed84a095e68ed685541ccea1068591af2a21`; 155,451 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1294 valid sampled nodes; 2084 floor tests |
| Proposals | 100 eligible; 48 attempted; 52 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 38}; passed 10 |
| Components | 3 reached-entry discoveries, 335 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 915 candidates; maximum connected displacement 5.4000m |
| Topology | {"doorway-crossing": 907} |
| Final seam | {"swept-forward:support-gap-or-step": 8, "swept-reverse:support-gap-or-step": 8} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "required-roof-coverage": 7121,
  "roof-coverage": 6242,
  "left-flank": 16336,
  "region-does-not-widen": 8320,
  "opposite-crossing-sides": 1746
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### predicate:required-roof-coverage

```json
[
  {
    "seq": 11872,
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
    ]
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 12036,
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
    ]
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 12042,
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
    ]
  }
]
```

### predicate:region-does-not-widen

```json
[
  {
    "seq": 12047,
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
    "firstFailure": "region-does-not-widen"
  }
]
```

### predicate:opposite-crossing-sides

```json
[
  {
    "seq": 12129,
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
    ]
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 12170,
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
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### seam:support-gap-or-step

```json
[
  {
    "seq": 31542,
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
    "endpointTolerance": 1e-06
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 31589,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 31590,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "2:2",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ]
  }
]
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 153558,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 153753,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 154094,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline corridor-1-7 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
