# cave-2-7: failed

A wide cave passage through rough rock, two visible openings and a smooth level stone floor without boulders or steps.

Locked scale: 6. Previously unresolved: True.

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
      "cue": "cave"
    },
    {
      "kind": "enclosed-passage",
      "source": "text",
      "cue": "passage"
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/cave-2-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/cave-2-7/expanded.ndjson.gz`. SHA256 `368c9a294f39a234209eb445fe54ab7f568d298af3a4f9afc6ae376494ce0ade`; 26,902 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 335 valid sampled nodes; 901 floor tests |
| Proposals | 276 eligible; 192 attempted; 84 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 148, "support-edge-not-found": 38, "body-obstruction": 2}; passed 4 |
| Components | 1 reached-entry discoveries, 210 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 155 candidates; maximum connected displacement 4.6043m |
| Topology | {"enclosed-passage": 155} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 3745,
  "broad-supported-region": 3
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 3751,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 152,
    "triangle": [
      [
        -2.9944095611572266,
        0.024929344654083252,
        -2.5940487384796143
      ],
      [
        -3.0010006427764893,
        0.026507914066314697,
        -2.5941542387008667
      ],
      [
        -3.0008704662323,
        0.0263521671295166,
        -2.6151804327964783
      ]
    ],
    "clippedApproachCoordinates": [
      [
        3.143186517059803,
        0.5968060493469238
      ],
      [
        3.1497775986790657,
        0.5969115495681763
      ],
      [
        3.149758477586476,
        0.6
      ],
      [
        3.144163050776152,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        0.14877695590257656,
        0.14818524793615567,
        -1.9972426891326904
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 3.2554964259266854
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 3752,
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
    "seq": 3793,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "236:1",
    "triangleId": 216550,
    "triangle": [
      [
        0.4951460659503937,
        4.562794983386993,
        0.5916886031627655
      ],
      [
        0.48658646643161774,
        4.570517420768738,
        0.5993688851594925
      ],
      [
        0.4809943735599518,
        4.5686012506484985,
        0.574354961514473
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0038642540574072015,
        -0.41106870770454407
      ],
      [
        0.002,
        -0.409395966258753
      ],
      [
        0.002,
        -0.41335213154396394
      ]
    ],
    "approach": {
      "seam": [
        0.4912818118929865,
        5.073309791529604,
        1.0027573108673096
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2.5241803243756293
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 3857,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "299:1",
    "eye": [
      -2.406719470024109,
      1.8312321263262967,
      2.0027573108673096
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 4079,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "204:2",
    "triangleId": 91409,
    "triangle": [
      [
        -1.215899258852005,
        0.5799173712730408,
        -2.6074896454811096
      ],
      [
        -1.2073911130428314,
        0.5645336508750916,
        -2.6111977100372314
      ],
      [
        -1.2001352906227112,
        0.5712427496910095,
        -2.6045726537704468
      ]
    ],
    "clippedApproachCoordinates": [
      [
        2.8897206741876955,
        -0.6
      ],
      [
        2.8837088733911513,
        -0.5934158205986027
      ],
      [
        2.8849272212370765,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.6067194700241085,
        0.23563562101118662,
        0.2791362196207047
      ],
      "outward": [
        0,
        0,
        -1
      ],
      "width": 1.2,
      "length": 3.376378908753395
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### predicate:opposing-wall-width

```json
[
  {
    "seq": 5646,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 241,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "opposing-wall-width",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "failed",
        "measured": [
          null,
          4.033585796365716,
          3.4517133882159796,
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

### topology:enclosed-passage

```json
[
  {
    "seq": 5937,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### predicate:broad-supported-region

```json
[
  {
    "seq": 9294,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 35,
    "nodeId": 169,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          null,
          0.5216901166392736,
          1.376528863759612,
          1.296478729007694
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
          "featureKey": "169:support",
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

### projection:wholly-above-player

```json
[
  {
    "seq": 10661,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "9:2",
    "triangleId": 146576,
    "triangle": [
      [
        -0.41265709698200226,
        2.9439554661512375,
        -2.6641629338264465
      ],
      [
        -0.4232097566127777,
        2.9509254097938538,
        -2.6744388341903687
      ],
      [
        -0.40381814539432526,
        2.950318269431591,
        -2.6769286394119263
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.8829643086955942,
        -0.6
      ],
      [
        0.8833368271589281,
        -0.5970986753702165
      ],
      [
        0.8791465727306368,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        0.1932805299758913,
        0.23660767532114718,
        -1.7935918122529981
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

### prescreen:body-obstruction

```json
[
  {
    "seq": 13880,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "4:2",
    "firstFailure": "body-obstruction",
    "triangleId": 271968,
    "triangle": [
      [
        0.9715164005756378,
        0.3451092839241028,
        -2.082955777645111
      ],
      [
        0.9721778333187103,
        0.3670998215675354,
        -2.0860807299613953
      ],
      [
        0.9602562189102173,
        0.3671455979347229,
        -2.0973077416419983
      ]
    ],
    "position": [
      0.7932805299758914,
      0.33655805323030696,
      -1.8472426891326903
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
python3 scripts/diagnosis/trace-query.py baseline cave-2-7 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/cave-2-7/legacy.ndjson.gz`. SHA256 `d74ed0d3b22f32d8535a4f07abfe9171e57db567f4f90198deb42ed84c4b3078`; 26,255 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 335 valid sampled nodes; 901 floor tests |
| Proposals | 27 eligible; 27 attempted; 0 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 23}; passed 4 |
| Components | 1 reached-entry discoveries, 210 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 313 candidates; maximum connected displacement 4.6043m |
| Topology | {"enclosed-passage": 313} |
| Final seam | {} |
| Exhausted bounds | [] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 7582,
  "broad-supported-region": 3
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 3871,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "22:0",
    "triangleId": 2626,
    "triangle": [
      [
        -2.765451729297638,
        0.11793100833892822,
        -1.784032166004181
      ],
      [
        -2.761991500854492,
        0.12215405702590942,
        -1.7840359210968018
      ],
      [
        -2.7608646154403687,
        0.12138372659683228,
        -1.8019807934761047
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.05172980427742013,
        0.5867894768714905
      ],
      [
        0.04826957583427438,
        0.5867932319641114
      ],
      [
        0.04744022949216716,
        0.6
      ],
      [
        0.048353603294957664,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -2.713721925020218,
        0.1387212494469966,
        -1.1972426891326904
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
    "seq": 3872,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "22:0",
    "firstFailure": "source-projection",
    "unexecuted": [
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
    "seq": 4443,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 73,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "opposing-wall-width",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "failed",
        "measured": [
          null,
          4.353252405491324,
          1.6512245266967345,
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

### topology:enclosed-passage

```json
[
  {
    "seq": 4686,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### predicate:broad-supported-region

```json
[
  {
    "seq": 7420,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 37,
    "nodeId": 169,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          null,
          0.5216901166392736,
          1.376528863759612,
          1.296478729007694
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
          "featureKey": "169:support",
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 11929,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "149:0",
    "triangleId": 3460,
    "triangle": [
      [
        -2.717712879180908,
        0.13429337739944458,
        -0.5755620002746582
      ],
      [
        -2.7164204120635986,
        0.13786160945892334,
        -0.575845867395401
      ],
      [
        -2.7175853848457336,
        0.13451796770095825,
        -0.5991871207952499
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.006631374359130859,
        0.5783193111419678
      ],
      [
        0.005338907241821289,
        0.5786031782627106
      ],
      [
        0.006406832537910925,
        0.6
      ],
      [
        0.0065143732623672655,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -2.7110815048217773,
        0.13711846894493812,
        0.0027573108673095703
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline cave-2-7 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
