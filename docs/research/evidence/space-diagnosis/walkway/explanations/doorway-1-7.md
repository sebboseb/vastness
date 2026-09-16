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

Complete trace: `.runtime/space-diagnosis/walkway/candidates/doorway-1-7/expanded.ndjson.gz`. SHA256 `f2276d9b759240a44bfe2dcd4d5eb9bf29a85e4f1f66357d1d4e631b9388c946`; 695,174 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1836 valid sampled nodes; 2843 floor tests |
| Proposals | Returned pass: 586 eligible; 192 attempted. All trace passes: 1182 omitted by selection; 296 selected but not attempted |
| Pre-screen | {"source-projection": 31, "support-edge-not-found": 37, "entry-prism-blocked": 169, "source-entry-prism": 169}; passed 43 |
| Components | Returned pass: 5 reached-entry discoveries. All passes: 1602 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 12288 candidate events. Returned pass: maximum connected displacement 7.4000m |
| Topology | {"doorway-crossing": 12288} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 456370
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
    "support:column": 5408,
    "support:rejected": 2010,
    "support:node": 3672,
    "support:duplicate-layer": 4,
    "proposal:eligible": 1172,
    "proposal:direction-excluded": 13516,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 788,
    "budget:exhausted": 4,
    "proposal:attempt": 88,
    "prescreen:edge-support-probe": 3986,
    "prescreen:projection-start": 76,
    "prescreen:projection-blocked": 31,
    "prescreen:rejected": 62,
    "prescreen:body-sample": 542,
    "prescreen:passed": 14,
    "component:entry-search": 14,
    "component:node-visited": 20634,
    "edge:tested": 6056,
    "component:node-discovered": 20682,
    "route:candidate": 8192,
    "topology:ray": 39390,
    "topology:node-feature": 3030,
    "topology:aperture-node": 361548,
    "topology:route-rejected": 8192,
    "prescreen:support-edge-not-found": 12,
    "route:candidate-not-executed": 2,
    "proposal:not-attempted": 296,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 31,
    "prescreen:entry-prism-proof": 38,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2704,
    "support:rejected": 1005,
    "support:node": 1836,
    "support:duplicate-layer": 2,
    "proposal:eligible": 586,
    "proposal:direction-excluded": 6758,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 394,
    "budget:exhausted": 2,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9018,
    "prescreen:projection-start": 167,
    "prescreen:entry-prism-blocked": 138,
    "prescreen:entry-prism-proof": 167,
    "prescreen:rejected": 138,
    "prescreen:body-sample": 1124,
    "prescreen:passed": 29,
    "route:stream-admitted": 29,
    "prescreen:support-edge-not-found": 25,
    "route:scheduler-start": 1,
    "route:stream-resumed": 4096,
    "component:entry-search": 29,
    "component:node-visited": 16652,
    "edge:tested": 3028,
    "component:node-discovered": 17399,
    "route:candidate": 4096,
    "topology:ray": 20293,
    "topology:node-feature": 1561,
    "topology:aperture-node": 94822,
    "topology:route-rejected": 4096,
    "route:stream-suspended": 4096,
    "route:stream-unexecuted": 29,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 13719,
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
    "seq": 13720,
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
    "seq": 13809,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 13856,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 15303,
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
    "seq": 15514,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 71126,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 263834,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
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
    "clippedPrismCoordinates": [
      [
        0.004427996277809321,
        0.182240986824036,
        0.06449490785598755
      ],
      [
        0.002,
        0.18183469961945958,
        0.06492407505143911
      ],
      [
        0.0020000000000000018,
        0.18724755981490382,
        0.0649332572318411
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
    "supportBand": [
      -0.18528223537883648,
      0.07971776462116352
    ],
    "bodyBand": [
      0.07971776462116352,
      1.8647177646211635
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
    "seq": 263836,
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
python3 scripts/diagnosis/trace-query.py walkway doorway-1-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/doorway-1-7/legacy.ndjson.gz`. SHA256 `6d5eee87a7f1e4f449cb0862fdfd088c8870e8df52a2beafbdd23ebd722ba1a5`; 698,440 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1836 valid sampled nodes; 2843 floor tests |
| Proposals | Returned pass: 360 eligible; 48 attempted. All trace passes: 936 omitted by selection; 62 selected but not attempted |
| Pre-screen | {"source-projection": 13, "entry-prism-blocked": 36, "source-entry-prism": 36}; passed 33 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 1602 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 12288 candidate events. Returned pass: maximum connected displacement 6.0033m |
| Topology | {"doorway-crossing": 12288} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 485832
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
    "support:column": 5408,
    "support:rejected": 2010,
    "support:node": 3672,
    "support:duplicate-layer": 4,
    "proposal:legacy-body-sample": 13500,
    "proposal:eligible": 720,
    "proposal:direction-unexecuted": 1112,
    "proposal:direction-excluded": 12856,
    "proposal:selected": 96,
    "proposal:omitted": 624,
    "budget:exhausted": 4,
    "proposal:attempt": 34,
    "prescreen:edge-support-probe": 1582,
    "prescreen:projection-start": 34,
    "prescreen:projection-blocked": 13,
    "prescreen:rejected": 26,
    "prescreen:body-sample": 328,
    "prescreen:passed": 8,
    "component:entry-search": 8,
    "component:node-visited": 10252,
    "edge:tested": 6056,
    "component:node-discovered": 10260,
    "route:candidate": 8192,
    "topology:ray": 37050,
    "topology:node-feature": 2850,
    "topology:aperture-node": 401718,
    "topology:route-rejected": 8192,
    "route:candidate-not-executed": 2,
    "proposal:not-attempted": 62,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 13,
    "prescreen:entry-prism-proof": 17,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2704,
    "support:rejected": 1005,
    "support:node": 1836,
    "support:duplicate-layer": 2,
    "proposal:legacy-body-sample": 6750,
    "proposal:eligible": 360,
    "proposal:direction-unexecuted": 556,
    "proposal:direction-excluded": 6428,
    "proposal:selected": 48,
    "proposal:omitted": 312,
    "budget:exhausted": 2,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2241,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 23,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 23,
    "prescreen:body-sample": 1022,
    "prescreen:passed": 25,
    "route:stream-admitted": 25,
    "route:scheduler-start": 1,
    "route:stream-resumed": 4096,
    "component:entry-search": 25,
    "component:node-visited": 11639,
    "edge:tested": 2997,
    "component:node-discovered": 12278,
    "route:candidate": 4096,
    "topology:ray": 19266,
    "topology:node-feature": 1482,
    "topology:aperture-node": 84114,
    "topology:route-rejected": 4096,
    "route:stream-suspended": 4096,
    "route:stream-unexecuted": 25,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 20051,
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
    "seq": 20052,
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
    "seq": 20097,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 21371,
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
    "seq": 21567,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 283399,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
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
    "clippedPrismCoordinates": [
      [
        0.004427996277809321,
        0.182240986824036,
        0.06449490785598755
      ],
      [
        0.002,
        0.18183469961945958,
        0.06492407505143911
      ],
      [
        0.0020000000000000018,
        0.18724755981490382,
        0.0649332572318411
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
    "supportBand": [
      -0.18528223537883648,
      0.07971776462116352
    ],
    "bodyBand": [
      0.07971776462116352,
      1.8647177646211635
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
    "seq": 283401,
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
python3 scripts/diagnosis/trace-query.py walkway doorway-1-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
