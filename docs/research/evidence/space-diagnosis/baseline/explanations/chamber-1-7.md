# chamber-1-7: failed

An empty underground stone chamber with a broad doorway and continuous level floor, high ceiling and open walking space.

Locked scale: 6. Previously unresolved: True.

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
      "cue": "chamber"
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/chamber-1-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/chamber-1-7/expanded.ndjson.gz`. SHA256 `574e3fdf029fccd33b0ad7854a9ccd9a2ebd3a6376b7751578d1c5b9383fbb3a`; 54,165 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1141 valid sampled nodes; 1921 floor tests |
| Proposals | 408 eligible; 192 attempted; 216 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 110, "support-edge-not-found": 71, "body-obstruction": 1}; passed 10 |
| Components | 3 reached-entry discoveries, 956 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 318 candidates; maximum connected displacement 6.0000m |
| Topology | {"enclosed-passage": 318} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "broad-supported-region": 2825,
  "opposing-wall-width": 5169
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 8093,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 5396,
    "triangle": [
      [
        -2.804038882255554,
        2.4941013157367706,
        -2.801234185695648
      ],
      [
        -2.8039880990982056,
        2.5158823281526566,
        -2.8006564378738403
      ],
      [
        -2.8040608763694763,
        2.5028847008943558,
        -2.813860237598419
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.005099773406982422,
        0.196700894832611
      ],
      [
        0.005048990249633789,
        0.19612314701080313
      ],
      [
        0.005121767520904541,
        0.209326946735382
      ]
    ],
    "approach": {
      "seam": [
        -2.7989391088485718,
        3.9744010648382986,
        -2.604533290863037
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
    "seq": 8094,
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

### projection:wholly-above-player

```json
[
  {
    "seq": 8138,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1139:1",
    "triangleId": 678323,
    "triangle": [
      [
        2.3473169803619385,
        2.387810781598091,
        2.198780357837677
      ],
      [
        2.33052259683609,
        2.3949861377477646,
        2.218865990638733
      ],
      [
        2.3377987146377563,
        2.4018792137503624,
        2.190852999687195
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.008371117711066578,
        -0.3966863512992864
      ],
      [
        0.002,
        -0.38906666518935384
      ],
      [
        0.0020000000000000005,
        -0.40199258390279413
      ]
    ],
    "approach": {
      "seam": [
        2.338945862650872,
        0.02141951698197842,
        2.5954667091369634
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 8228,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "26:2",
    "triangleId": 617310,
    "triangle": [
      [
        1.7666362524032593,
        0.026251494884490967,
        -2.9211389422416687
      ],
      [
        1.7678507566452026,
        0.026426732540130615,
        -2.9513347148895264
      ],
      [
        1.7906502485275269,
        0.026809751987457275,
        -2.951435387134552
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.007818050116341721,
        -0.6
      ],
      [
        0.007827796041965485,
        -0.5977928161621096
      ],
      [
        0.005043177306829844,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        2.3884430646896364,
        0.052425113789696255,
        -2.9436075910925865
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

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 8337,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "610:2",
    "eye": [
      2.3884430646896364,
      5.598034677556731,
      0.19546670913696307
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

### predicate:broad-supported-region

```json
[
  {
    "seq": 8617,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1109,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          1.6749447396939763,
          3.7708739303690493,
          5.542707678168602,
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
        "status": "failed",
        "measured": {
          "featureKey": "1109:support",
          "bypassWhenWidthAtMost": 0.6
        },
        "threshold": 2.4
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
    "seq": 8875,
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
    "seq": 10245,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "930:1",
    "triangleId": 756208,
    "triangle": [
      [
        2.7389456033706665,
        0.022879064083099365,
        1.2082061469554901
      ],
      [
        2.7456783056259155,
        0.048570334911346436,
        1.2085945308208466
      ],
      [
        2.7385761737823486,
        0.022917866706848145,
        1.1848499178886414
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.38703396063367457
      ],
      [
        0.0048045247793195855,
        -0.38687217831611687
      ],
      [
        0.002,
        -0.3962485679425698
      ]
    ],
    "approach": {
      "seam": [
        2.740873780846596,
        0.01765611021831419,
        1.5954667091369634
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
    "seq": 12681,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 2,
    "nodeId": 601,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "opposing-wall-width",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "failed",
        "measured": [
          null,
          1.17019101046152,
          2.3156354993899018,
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
    ]
  }
]
```

### prescreen:body-obstruction

```json
[
  {
    "seq": 50558,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "934:3",
    "firstFailure": "body-obstruction",
    "triangleId": 162080,
    "triangle": [
      [
        -2.29492324590683,
        0.4309024214744568,
        2.636796534061432
      ],
      [
        -2.2948957085609436,
        0.45182740688323975,
        2.6367525458335876
      ],
      [
        -2.2853888869285583,
        0.4396260380744934,
        2.6358949542045593
      ]
    ],
    "position": [
      -2.2115569353103637,
      0.1721261226296844,
      2.3454667091369634
    ],
    "unexecuted": [
      "remaining-body-samples",
      "final-seam"
    ]
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline chamber-1-7 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/chamber-1-7/legacy.ndjson.gz`. SHA256 `9e454714990bd7bfeb7a5514b136f38a7a51bf5f4f57942d91cf6519095b3fd0`; 15,040 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1141 valid sampled nodes; 1921 floor tests |
| Proposals | 185 eligible; 48 attempted; 137 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 40}; passed 8 |
| Components | 4 reached-entry discoveries, 37 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 2 candidates; maximum connected displacement 3.2000m |
| Topology | {"enclosed-passage": 2} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "broad-supported-region": 33
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 11696,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 5396,
    "triangle": [
      [
        -2.804038882255554,
        2.4941013157367706,
        -2.801234185695648
      ],
      [
        -2.8039880990982056,
        2.5158823281526566,
        -2.8006564378738403
      ],
      [
        -2.8040608763694763,
        2.5028847008943558,
        -2.813860237598419
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.005099773406982422,
        0.196700894832611
      ],
      [
        0.005048990249633789,
        0.19612314701080313
      ],
      [
        0.005121767520904541,
        0.209326946735382
      ]
    ],
    "approach": {
      "seam": [
        -2.7989391088485718,
        3.9744010648382986,
        -2.604533290863037
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
    "seq": 11697,
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
    "seq": 12508,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "693:1",
    "triangleId": 700546,
    "triangle": [
      [
        2.513738214969635,
        3.825282633304596,
        0.17525282129645348
      ],
      [
        2.501579225063324,
        3.832501173019409,
        0.17479703575372696
      ],
      [
        2.514436662197113,
        3.8258190751075745,
        0.15130963549017906
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.443894178785397
      ],
      [
        0.002143913507461459,
        -0.4441570736467839
      ],
      [
        0.002,
        -0.43922363313242413
      ]
    ],
    "approach": {
      "seam": [
        2.5122927486896516,
        3.832655647262717,
        0.595466709136963
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

### predicate:broad-supported-region

```json
[
  {
    "seq": 14677,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1133,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          4.075264373329853,
          1.3710206133478406,
          4.7150149287250045,
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
        "status": "failed",
        "measured": {
          "featureKey": "1133:support",
          "bypassWhenWidthAtMost": 0.6
        },
        "threshold": 2.4
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
    "seq": 14935,
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

### projection:wholly-above-player

```json
[
  {
    "seq": 15035,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1137:3",
    "triangleId": 1489668,
    "triangle": [
      [
        2.188064932823181,
        2.160424254834652,
        3.000435948371887
      ],
      [
        2.184462010860443,
        2.182240806519985,
        3.0013904571533203
      ],
      [
        2.174111545085907,
        2.184723012149334,
        2.9953415393829346
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.39632645513285175
      ],
      [
        0.002081467211246135,
        -0.39601894617080635
      ],
      [
        0.002,
        -0.3958795454360372
      ]
    ],
    "approach": {
      "seam": [
        1.7884430646896368,
        0.011927557827310859,
        2.999308989942074
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
python3 scripts/diagnosis/trace-query.py baseline chamber-1-7 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
