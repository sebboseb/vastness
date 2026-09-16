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

Complete trace: `.runtime/space-diagnosis/baseline/candidates/corridor-1-42/expanded.ndjson.gz`. SHA256 `4edafe62e9fae1b55ba52d14a6b4a1cb750b0a617c35a53a1e8731680bf6753d`; 544,334 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 11170 valid sampled nodes; 23800 floor tests |
| Proposals | 716 eligible; 192 attempted; 524 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 167, "support-edge-not-found": 24}; passed 1 |
| Components | 1 reached-entry discoveries, 5750 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 2699 candidates; maximum connected displacement 16.8155m |
| Topology | {"enclosed-passage": 2699} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 163452
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 76162,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 76163,
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
    "seq": 76210,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 76353,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 76748,
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
    ]
  }
]
```

### predicate:opposing-wall-width

```json
[
  {
    "seq": 81142,
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
    ]
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 81385,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 538690,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline corridor-1-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/corridor-1-42/legacy.ndjson.gz`. SHA256 `4f5030474ced49a86b5b2c3414d02a8ce533e04dd0224113b20081e0bab98b5c`; 614,428 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 11170 valid sampled nodes; 23800 floor tests |
| Proposals | 486 eligible; 13 attempted; 438 omitted by selection; 35 selected but not attempted |
| Pre-screen | {"source-projection": 12}; passed 1 |
| Components | 1 reached-entry discoveries, 4449 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 4096 candidates; maximum connected displacement 15.0053m |
| Topology | {"enclosed-passage": 4096} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 209147
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 86188,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 86189,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "17:2",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ]
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 86533,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### predicate:opposing-wall-width

```json
[
  {
    "seq": 88494,
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
    ]
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 88737,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline corridor-1-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
