# doorway-1-7: failed

A freestanding thick stone doorway with a large empty opening and attached flat floor extending through it on both sides.

Locked scale: 10. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "doorway-crossing"
  ],
  "evidence": [
    {
      "kind": "doorway-crossing",
      "source": "text",
      "cue": "doorway"
    }
  ],
  "ambiguities": [],
  "requirements": {
    "openSky": false,
    "covered": false,
    "opposingWalls": false,
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/doorway-1-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/doorway-1-7/expanded.ndjson.gz`. SHA256 `fdb9ab8135b9ae91de4469352e1c06064cfc75a768216e5426259660527dbc63`; 250,116 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1836 valid sampled nodes; 2843 floor tests |
| Proposals | 586 eligible; 44 attempted; 394 omitted by selection; 148 selected but not attempted |
| Pre-screen | {"source-projection": 31, "support-edge-not-found": 6}; passed 7 |
| Components | 1 reached-entry discoveries, 1602 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 4096 candidates; maximum connected displacement 11.6825m |
| Topology | {"doorway-crossing": 4096} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 180774
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 13717,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 378,
    "triangle": [
      [
        -5.010156035423279,
        0.06449490785598755,
        -4.787173867225647
      ],
      [
        -4.991781413555145,
        0.06774276494979858,
        -4.7840991616249084
      ],
      [
        -4.991784989833832,
        0.06781160831451416,
        -4.825055301189423
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.004427996277809321,
        0.182240986824036
      ],
      [
        0.002,
        0.18183469961945958
      ],
      [
        0.0020000000000000018,
        0.18724755981490382
      ]
    ],
    "approach": {
      "seam": [
        -5.0057280391454695,
        0.06471776462116352,
        -4.604932880401611
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
    "seq": 13718,
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
    "seq": 13807,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "744:2",
    "triangleId": 201986,
    "triangle": [
      [
        -0.020116500090807676,
        0.0895535945892334,
        -4.786326289176941
      ],
      [
        -0.020007509738206863,
        0.08449792861938477,
        -4.825559854507446
      ],
      [
        0.02102155238389969,
        0.08985340595245361,
        -4.786609411239624
      ]
    ],
    "clippedApproachCoordinates": [
      [
        3.8966759001098055,
        -0.6
      ],
      [
        3.8598389223217966,
        -0.5611971899867063
      ],
      [
        3.859571871964573,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        0.582218742370606,
        8.423843860178767,
        -0.9267704889178272
      ],
      "outward": [
        0,
        0,
        -1
      ],
      "width": 1.2,
      "length": 4.1781623914837835
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 13854,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1789:3",
    "triangleId": 395,
    "triangle": [
      [
        -5.001084208488464,
        0.045767128467559814,
        4.997262060642242
      ],
      [
        -4.9606651067733765,
        0.04909902811050415,
        4.960342347621918
      ],
      [
        -4.956768155097961,
        0.047371089458465576,
        5.00252366065979
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        0.3391094249343229
      ],
      [
        0.0033262595534306882,
        0.33898689746856725
      ],
      [
        0.002,
        0.3501573758370262
      ]
    ],
    "approach": {
      "seam": [
        -4.617781257629394,
        0.07659459938096677,
        4.999197401106359
      ],
      "outward": [
        0,
        0,
        1
      ],
      "width": 1.2,
      "length": 2
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 15301,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 1,
    "nodeId": 1812,
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

### topology:doorway-crossing

```json
[
  {
    "seq": 15512,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 71124,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "515:1",
    "eye": [
      -1.6177812576293942,
      1.7639282515252388,
      -2.0049328804016113
    ],
    "outward": [
      1,
      0,
      0
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline doorway-1-7 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/doorway-1-7/legacy.ndjson.gz`. SHA256 `fe84acf8482570f38810c499b6cf5ecef6674d0dd6c062b625a649a14846822d`; 263,349 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1836 valid sampled nodes; 2843 floor tests |
| Proposals | 360 eligible; 17 attempted; 312 omitted by selection; 31 selected but not attempted |
| Pre-screen | {"source-projection": 13}; passed 4 |
| Components | 1 reached-entry discoveries, 1602 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 4096 candidates; maximum connected displacement 12.7311m |
| Topology | {"doorway-crossing": 4096} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 200859
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 20049,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 378,
    "triangle": [
      [
        -5.010156035423279,
        0.06449490785598755,
        -4.787173867225647
      ],
      [
        -4.991781413555145,
        0.06774276494979858,
        -4.7840991616249084
      ],
      [
        -4.991784989833832,
        0.06781160831451416,
        -4.825055301189423
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.004427996277809321,
        0.182240986824036
      ],
      [
        0.002,
        0.18183469961945958
      ],
      [
        0.0020000000000000018,
        0.18724755981490382
      ]
    ],
    "approach": {
      "seam": [
        -5.0057280391454695,
        0.06471776462116352,
        -4.604932880401611
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
    "seq": 20050,
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 20095,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "7:2",
    "triangleId": 16034,
    "triangle": [
      [
        -3.8449379801750183,
        0.0646623969078064,
        -4.981904327869415
      ],
      [
        -3.845462203025818,
        0.06932377815246582,
        -4.995987415313721
      ],
      [
        -3.8135579228401184,
        0.06957888603210449,
        -4.9979168176651
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002863603262133054,
        -0.6
      ],
      [
        0.003119008243084309,
        -0.5957766652107237
      ],
      [
        0.002,
        -0.5979696122960467
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -3.2177812576293947,
        0.07561975211141128,
        -4.994797809422016
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

### predicate:roof-coverage

```json
[
  {
    "seq": 21369,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 1,
    "nodeId": 139,
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

### topology:doorway-crossing

```json
[
  {
    "seq": 21565,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline doorway-1-7 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
