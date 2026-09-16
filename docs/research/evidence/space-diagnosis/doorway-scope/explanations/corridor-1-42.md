# corridor-1-42: failed

A long straight corridor with parallel stone walls, level floor, overhead roof and an open doorway at each end.

Locked scale: 16. Previously unresolved: True.

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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/corridor-1-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/corridor-1-42/expanded.ndjson.gz`. SHA256 `554e5a3593768481df17113f20d74a7201df0d6f87024729eddb20b4ba343b48`; 1,833,590 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 11170 valid sampled nodes; 23800 floor tests |
| Proposals | Returned pass: 716 eligible; 192 attempted. All trace passes: 1572 omitted by selection; 183 selected but not attempted |
| Pre-screen | {"source-projection": 167, "support-edge-not-found": 48, "entry-prism-blocked": 163, "source-entry-prism": 163, "exterior-approach-limit": 2}; passed 13 |
| Components | Returned pass: 6 reached-entry discoveries. All passes: 11021 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 6670 candidate events. Returned pass: maximum connected displacement 5.4000m |
| Topology | {"enclosed-passage": 2837, "doorway-crossing": 3833} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 166588,
  "left-flank": 272939,
  "right-flank": 2971,
  "roof-coverage": 33612
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
    "support:column": 13448,
    "support:rejected": 25260,
    "support:node": 22340,
    "proposal:eligible": 1432,
    "proposal:direction-excluded": 87928,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 1048,
    "budget:exhausted": 3,
    "proposal:attempt": 201,
    "prescreen:edge-support-probe": 9151,
    "prescreen:projection-start": 177,
    "prescreen:projection-blocked": 167,
    "prescreen:rejected": 175,
    "prescreen:support-edge-not-found": 24,
    "prescreen:body-sample": 78,
    "prescreen:passed": 2,
    "component:entry-search": 2,
    "component:node-visited": 11021,
    "edge:tested": 64124,
    "component:node-discovered": 11019,
    "route:candidate": 5154,
    "topology:ray": 233710,
    "topology:node-feature": 10716,
    "topology:node-predicate": 178182,
    "topology:sustained-sample": 178182,
    "topology:sustained-result": 5154,
    "topology:route-rejected": 5154,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 8,
    "prescreen:entry-prism-proof": 9,
    "topology:witness": 2455,
    "topology:aperture-axis": 217904,
    "topology:ray-not-executed": 341406,
    "topology:aperture-node": 33612,
    "proposal:not-attempted": 183,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 6724,
    "support:rejected": 12630,
    "support:node": 11170,
    "proposal:eligible": 716,
    "proposal:direction-excluded": 43964,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 524,
    "budget:exhausted": 2,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 8761,
    "prescreen:projection-start": 166,
    "prescreen:entry-prism-blocked": 155,
    "prescreen:entry-prism-proof": 166,
    "prescreen:rejected": 155,
    "prescreen:body-sample": 437,
    "prescreen:passed": 11,
    "route:stream-admitted": 11,
    "prescreen:support-edge-not-found": 24,
    "prescreen:exterior-approach-limit": 2,
    "route:scheduler-start": 1,
    "route:stream-resumed": 1516,
    "component:entry-search": 11,
    "component:node-visited": 6774,
    "edge:tested": 19918,
    "component:node-discovered": 7262,
    "route:candidate": 1516,
    "topology:ray": 160000,
    "topology:node-feature": 3387,
    "topology:node-predicate": 11404,
    "topology:sustained-sample": 11404,
    "topology:witness": 1378,
    "topology:sustained-result": 1516,
    "topology:aperture-axis": 58006,
    "topology:route-rejected": 1516,
    "route:stream-suspended": 1516,
    "topology:ray-not-executed": 43,
    "route:stream-unexecuted": 11,
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
    "seq": 76164,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 31406,
    "triangle": [
      [
        -7.984044075012207,
        0.012969493865966797,
        -7.802427768707275
      ],
      [
        -8.000038146972656,
        0.01659393310546875,
        -7.803823471069336
      ],
      [
        -7.984709739685059,
        0.011260032653808594,
        -7.86923885345459
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.13901799619197774,
        0.384229755401611
      ],
      [
        0.15501206815242696,
        0.3856254577636715
      ],
      [
        0.1396836608648293,
        0.4510408401489254
      ]
    ],
    "approach": {
      "seam": [
        -7.845026078820229,
        10.177695944482705,
        -7.418198013305664
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
    "seq": 76165,
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
    "seq": 76212,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "11061:1",
    "triangleId": 693072,
    "triangle": [
      [
        7.788199424743652,
        0.01847219467163086,
        7.034107685089111
      ],
      [
        7.789325714111328,
        0.018264293670654297,
        6.968327045440674
      ],
      [
        7.862574577331543,
        0.017958641052246094,
        6.969505786895752
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.41268891457345974
      ],
      [
        0.026403918862342834,
        -0.41229619979858434
      ],
      [
        0.0020000000000000052,
        -0.3910990737825934
      ]
    ],
    "approach": {
      "seam": [
        7.8361706584692,
        0.15749364868223417,
        7.381801986694336
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

### projection:wholly-above-player

```json
[
  {
    "seq": 76355,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "5896:0",
    "triangleId": 15900,
    "triangle": [
      [
        -7.976387023925781,
        8.528273820877075,
        0.2171223759651184
      ],
      [
        -7.984638690948486,
        8.55976939201355,
        0.2182627171278
      ],
      [
        -7.976535797119141,
        8.528865814208984,
        0.1574331670999527
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.1240812063217156,
        0.3646796107292172
      ],
      [
        0.13233287334442068,
        0.3635392695665356
      ],
      [
        0.12422997951507497,
        0.4243688195943829
      ]
    ],
    "approach": {
      "seam": [
        -7.852305817604066,
        1.5164316313886808,
        0.5818019866943356
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

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 76750,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "10492:2",
    "eye": [
      -7.410958671569825,
      1.837128916632447,
      6.781801986694337
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 81144,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 5743,
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
        "status": "not-evaluated"
      },
      {
        "name": "required-roof-coverage",
        "status": "not-evaluated"
      }
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 81387,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 538692,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "11143:3",
    "triangleId": 1174536,
    "triangle": [
      [
        2.719775915145874,
        10.10506296157837,
        7.964143753051758
      ],
      [
        2.7178282737731934,
        10.130310535430908,
        7.9651336669921875
      ],
      [
        2.659111499786377,
        10.104764461517334,
        7.963451862335205
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.3292002202302961
      ],
      [
        0.0022100523114190196,
        -0.3287869453430172
      ],
      [
        0.002,
        -0.3214533979873282
      ]
    ],
    "approach": {
      "seam": [
        2.389041328430176,
        10.125889161460837,
        7.9629236146807685
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

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 620497,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 31724,
    "triangle": [
      [
        -7.998264312744141,
        9.891950130462646,
        -7.78987979888916
      ],
      [
        -7.998088359832764,
        9.962284088134766,
        -7.792898178100586
      ],
      [
        -7.998191833496094,
        9.89391279220581,
        -7.864171504974365
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.15314880940900363,
        0.37321581587988,
        9.927695944482705
      ],
      [
        0.15306228101253438,
        0.3747001647949215,
        9.962284088134766
      ],
      [
        0.15311462698437592,
        0.41075640791531143,
        9.927695944482705
      ]
    ],
    "approach": {
      "seam": [
        -7.845026078820229,
        10.177695944482705,
        -7.418198013305664
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
      9.927695944482705,
      10.192695944482706
    ],
    "bodyBand": [
      10.192695944482706,
      11.977695944482706
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
    "seq": 620499,
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

### predicate:left-flank

```json
[
  {
    "seq": 622854,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 4386,
    "routeIndex": 1,
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
    "predecessorPass": "entry-prism"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 623062,
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
    "predecessorPass": "entry-prism"
  }
]
```

### predicate:right-flank

```json
[
  {
    "seq": 656896,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 157,
    "nodeId": 7854,
    "routeIndex": 24,
    "axis": [
      1,
      0,
      0
    ],
    "left": {
      "id": 648655,
      "distance": 2.844470032150228
    },
    "right": null,
    "minimumWidth": 0.6,
    "rayMaximum": 3,
    "firstFailure": "right-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 882465,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 936,
    "nodeId": 7651,
    "routeIndex": 49,
    "firstFailure": "roof-coverage",
    "roofCount": 0,
    "required": 9,
    "unexecuted": [
      "flank-rays",
      "crossing-sides",
      "wider-regions"
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
    "seq": 1537384,
    "stage": "prescreen",
    "kind": "exterior-approach-limit",
    "proposalId": "2888:3",
    "seam": [
      -7.610958671569824,
      10.142713395801621,
      -3.1185265079140656
    ],
    "distanceToBounds": 11.137630511820316,
    "startDistance": 11.537630511820316,
    "requiredLength": 11.837630511820317,
    "maximumLength": 10,
    "unexecuted": [
      "projection",
      "body-prescreen",
      "final-seam"
    ],
    "pass": "coverage-round-robin"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope corridor-1-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/corridor-1-42/legacy.ndjson.gz`. SHA256 `4e69228feb0d609f0d19e0704bb5038e8a88eabbb35f458d5f84a01ccfe9219e`; 2,245,282 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 11170 valid sampled nodes; 23800 floor tests |
| Proposals | Returned pass: 486 eligible; 48 attempted. All trace passes: 1314 omitted by selection; 81 selected but not attempted |
| Pre-screen | {"source-projection": 12, "entry-prism-blocked": 45, "source-entry-prism": 45}; passed 6 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 9046 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 10026 candidate events. Returned pass: maximum connected displacement 6.0000m |
| Topology | {"enclosed-passage": 4554, "doorway-crossing": 5472} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 220451,
  "left-flank": 361797,
  "right-flank": 12881,
  "roof-coverage": 64916
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
    "support:column": 13448,
    "support:rejected": 25260,
    "support:node": 22340,
    "proposal:legacy-body-sample": 20894,
    "proposal:direction-excluded": 87360,
    "proposal:eligible": 972,
    "proposal:direction-unexecuted": 1028,
    "proposal:selected": 96,
    "proposal:omitted": 876,
    "budget:exhausted": 5,
    "proposal:attempt": 15,
    "prescreen:edge-support-probe": 663,
    "prescreen:projection-start": 15,
    "prescreen:projection-blocked": 12,
    "prescreen:rejected": 13,
    "prescreen:body-sample": 78,
    "prescreen:passed": 2,
    "component:entry-search": 2,
    "component:node-visited": 8877,
    "edge:tested": 52150,
    "component:node-discovered": 8990,
    "route:candidate": 8192,
    "topology:ray": 217785,
    "topology:node-feature": 8797,
    "topology:node-predicate": 233723,
    "topology:sustained-sample": 233723,
    "topology:sustained-result": 8192,
    "topology:route-rejected": 8192,
    "route:candidate-not-executed": 2,
    "proposal:not-attempted": 81,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 1,
    "prescreen:entry-prism-proof": 2,
    "topology:witness": 4096,
    "topology:aperture-axis": 311084,
    "topology:ray-not-executed": 518744,
    "topology:aperture-node": 64915,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 6724,
    "support:rejected": 12630,
    "support:node": 11170,
    "proposal:legacy-body-sample": 10447,
    "proposal:direction-excluded": 43680,
    "proposal:eligible": 486,
    "proposal:direction-unexecuted": 514,
    "proposal:selected": 48,
    "proposal:omitted": 438,
    "budget:exhausted": 2,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2137,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 44,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 44,
    "prescreen:body-sample": 158,
    "prescreen:passed": 4,
    "route:stream-admitted": 4,
    "route:scheduler-start": 1,
    "route:stream-resumed": 1834,
    "component:entry-search": 4,
    "component:node-visited": 3243,
    "edge:tested": 13366,
    "component:node-discovered": 3448,
    "route:candidate": 1834,
    "topology:ray": 160000,
    "topology:node-feature": 2532,
    "topology:node-predicate": 19560,
    "topology:sustained-sample": 19560,
    "topology:witness": 1376,
    "topology:sustained-result": 1834,
    "topology:aperture-axis": 63594,
    "topology:route-rejected": 1834,
    "route:stream-suspended": 1834,
    "topology:ray-not-executed": 104,
    "topology:aperture-node": 1,
    "route:stream-unexecuted": 4,
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
    "seq": 86190,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "17:2",
    "triangleId": 148110,
    "triangle": [
      [
        -6.040740966796875,
        0.010962486267089844,
        -7.861260414123535
      ],
      [
        -6.0413818359375,
        0.010731697082519531,
        -7.911015033721924
      ],
      [
        -5.975866794586182,
        0.010610580444335938,
        -7.85800838470459
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.007093888718690957,
        -0.6
      ],
      [
        0.0019999999999999983,
        -0.5937040666363399
      ],
      [
        0.0019999999999999987,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -5.410958671569825,
        1.5179196873734808,
        -7.879306492209435
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
    "seq": 86191,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "17:2",
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

### projection:wholly-above-player

```json
[
  {
    "seq": 86535,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2285:1",
    "triangleId": 701554,
    "triangle": [
      [
        7.799244403839111,
        8.545564413070679,
        -4.7779011726379395
      ],
      [
        7.798266887664795,
        8.54591679573059,
        -4.840672492980957
      ],
      [
        7.874783515930176,
        8.544469118118286,
        -4.77876615524292
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.3614034124767965
      ],
      [
        0.0030323997139927172,
        -0.3605681419372555
      ],
      [
        0.002,
        -0.36055632014362743
      ]
    ],
    "approach": {
      "seam": [
        7.871751116216183,
        1.5204090662447274,
        -4.418198013305664
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 88496,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 5592,
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
        "status": "not-evaluated"
      },
      {
        "name": "required-roof-coverage",
        "status": "not-evaluated"
      }
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 88739,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-cover"
    ],
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
    "seq": 700617,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "17:2",
    "triangleId": 148152,
    "triangle": [
      [
        -6.023956298828125,
        1.205693244934082,
        -7.905886650085449
      ],
      [
        -6.02117919921875,
        1.2695508003234863,
        -7.913352966308594
      ],
      [
        -5.970045566558838,
        1.268160104751587,
        -7.891196250915527
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.029617817058687483,
        -0.6,
        1.269272829801846
      ],
      [
        0.011889758706092657,
        -0.5590868949890133,
        1.268160104751587
      ],
      [
        0.011946297921639632,
        -0.5592943822381216,
        1.2679196873734808
      ],
      [
        0.029434323855278288,
        -0.6,
        1.2679196873734808
      ]
    ],
    "approach": {
      "seam": [
        -5.410958671569825,
        1.5179196873734808,
        -7.879306492209435
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
      1.2679196873734808,
      1.5329196873734807
    ],
    "bodyBand": [
      1.5329196873734807,
      3.3179196873734806
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
    "seq": 700619,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "17:2",
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

### predicate:left-flank

```json
[
  {
    "seq": 702542,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 39,
    "routeIndex": 1,
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
    "predecessorPass": "entry-prism"
  }
]
```

### predicate:right-flank

```json
[
  {
    "seq": 702545,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 39,
    "routeIndex": 1,
    "axis": [
      0,
      0,
      1
    ],
    "left": {
      "id": 868301,
      "distance": 2.6067701156855705
    },
    "right": null,
    "minimumWidth": 0.6,
    "rayMaximum": 3,
    "firstFailure": "right-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 702750,
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
    "predecessorPass": "entry-prism"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 963258,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 1150,
    "nodeId": 3648,
    "routeIndex": 41,
    "firstFailure": "roof-coverage",
    "roofCount": 0,
    "required": 9,
    "unexecuted": [
      "flank-rays",
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope corridor-1-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
