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

Complete trace: `.runtime/space-diagnosis/walkway/candidates/cave-2-7/expanded.ndjson.gz`. SHA256 `0a5f57329ce00cfec07c16707f61a937c5d98711a7bc9bae684b54b29727f074`; 81,339 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 335 valid sampled nodes; 901 floor tests |
| Proposals | Returned pass: 276 eligible; 192 attempted. All trace passes: 252 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 148, "support-edge-not-found": 114, "body-obstruction": 6, "entry-prism-blocked": 296, "source-entry-prism": 296}; passed 12 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 210 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 465 candidate events. Returned pass: maximum connected displacement 4.6043m |
| Topology | {"enclosed-passage": 465} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 11235,
  "broad-supported-region": 9
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
    "support:column": 1984,
    "support:rejected": 1132,
    "support:node": 670,
    "proposal:eligible": 552,
    "proposal:direction-excluded": 2128,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 168,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 19004,
    "prescreen:projection-start": 308,
    "prescreen:projection-blocked": 148,
    "prescreen:rejected": 300,
    "prescreen:support-edge-not-found": 76,
    "prescreen:body-sample": 310,
    "prescreen:passed": 8,
    "component:entry-search": 8,
    "component:node-visited": 1680,
    "edge:tested": 1014,
    "component:node-discovered": 1672,
    "route:candidate": 310,
    "topology:ray": 5018,
    "topology:node-feature": 386,
    "topology:node-predicate": 7496,
    "topology:sustained-sample": 7496,
    "topology:sustained-result": 310,
    "topology:route-rejected": 310,
    "topology:broad-feature": 2,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 148,
    "prescreen:entry-prism-proof": 154,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 992,
    "support:rejected": 566,
    "support:node": 335,
    "proposal:eligible": 276,
    "proposal:direction-excluded": 1064,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 84,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9502,
    "prescreen:projection-start": 154,
    "prescreen:entry-prism-blocked": 148,
    "prescreen:entry-prism-proof": 154,
    "prescreen:rejected": 150,
    "prescreen:support-edge-not-found": 38,
    "prescreen:body-sample": 155,
    "prescreen:passed": 4,
    "route:stream-admitted": 4,
    "route:scheduler-start": 1,
    "route:stream-resumed": 159,
    "component:entry-search": 4,
    "component:node-visited": 840,
    "edge:tested": 507,
    "component:node-discovered": 836,
    "route:candidate": 155,
    "topology:ray": 2509,
    "topology:node-feature": 193,
    "topology:node-predicate": 3748,
    "topology:sustained-sample": 3748,
    "topology:sustained-result": 155,
    "topology:route-rejected": 155,
    "route:stream-suspended": 155,
    "topology:broad-feature": 1,
    "route:stream-complete": 4,
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
    "seq": 3753,
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
    "seq": 3754,
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
    "seq": 3795,
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
    "seq": 3859,
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
    "seq": 4081,
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
    "seq": 5648,
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
    "seq": 5939,
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
    "predecessorPass": "baseline"
  }
]
```

### predicate:broad-supported-region

```json
[
  {
    "seq": 9296,
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
    "seq": 10663,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:body-obstruction

```json
[
  {
    "seq": 13882,
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
    "seq": 30654,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
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
    "clippedPrismCoordinates": [
      [
        3.143186517059803,
        0.5968060493469238,
        0.024929344654083252
      ],
      [
        3.1497775986790657,
        0.5969115495681763,
        0.026507914066314697
      ],
      [
        3.149758477586476,
        0.6,
        0.026485037044823218
      ],
      [
        3.144163050776152,
        0.6,
        0.02514439720531172
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
      "length": 3.855496425926685
    },
    "supportBand": [
      -0.10181475206384433,
      0.1631852479361557
    ],
    "bodyBand": [
      0.1631852479361557,
      1.9481852479361557
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
    "seq": 30656,
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
python3 scripts/diagnosis/trace-query.py walkway cave-2-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/cave-2-7/legacy.ndjson.gz`. SHA256 `b0d205b4aa9afb40740762c0a2d1f43487b78e064063354630de33db295bf62e`; 79,460 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 335 valid sampled nodes; 901 floor tests |
| Proposals | Returned pass: 27 eligible; 27 attempted. All trace passes: 0 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 23, "entry-prism-blocked": 46, "source-entry-prism": 46}; passed 12 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 210 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 939 candidate events. Returned pass: maximum connected displacement 4.6043m |
| Topology | {"enclosed-passage": 939} |
| Final seam | {} |
| Exhausted bounds | [] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 22746,
  "broad-supported-region": 9
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
    "support:column": 1984,
    "support:rejected": 1132,
    "support:node": 670,
    "proposal:direction-excluded": 2524,
    "proposal:legacy-body-sample": 1134,
    "proposal:eligible": 54,
    "proposal:direction-unexecuted": 102,
    "proposal:selected": 54,
    "proposal:attempt": 54,
    "prescreen:edge-support-probe": 2090,
    "prescreen:projection-start": 54,
    "prescreen:projection-blocked": 23,
    "prescreen:rejected": 46,
    "prescreen:body-sample": 296,
    "prescreen:passed": 8,
    "component:entry-search": 8,
    "component:node-visited": 1680,
    "edge:tested": 1014,
    "component:node-discovered": 1672,
    "route:candidate": 626,
    "topology:ray": 5252,
    "topology:node-feature": 404,
    "topology:node-predicate": 15170,
    "topology:sustained-sample": 15170,
    "topology:sustained-result": 626,
    "topology:route-rejected": 626,
    "topology:broad-feature": 2,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 23,
    "prescreen:entry-prism-proof": 27,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 992,
    "support:rejected": 566,
    "support:node": 335,
    "proposal:direction-excluded": 1262,
    "proposal:legacy-body-sample": 567,
    "proposal:eligible": 27,
    "proposal:direction-unexecuted": 51,
    "proposal:selected": 27,
    "proposal:attempt": 27,
    "prescreen:edge-support-probe": 1045,
    "prescreen:projection-start": 27,
    "prescreen:entry-prism-blocked": 23,
    "prescreen:entry-prism-proof": 27,
    "prescreen:rejected": 23,
    "prescreen:body-sample": 148,
    "prescreen:passed": 4,
    "route:stream-admitted": 4,
    "route:scheduler-start": 1,
    "route:stream-resumed": 317,
    "component:entry-search": 4,
    "component:node-visited": 840,
    "edge:tested": 507,
    "component:node-discovered": 836,
    "route:candidate": 313,
    "topology:ray": 2626,
    "topology:node-feature": 202,
    "topology:node-predicate": 7585,
    "topology:sustained-sample": 7585,
    "topology:sustained-result": 313,
    "topology:route-rejected": 313,
    "route:stream-suspended": 313,
    "topology:broad-feature": 1,
    "route:stream-complete": 4,
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
    "seq": 3873,
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
    "seq": 3874,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "22:0",
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 4445,
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
    "seq": 4688,
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
    "predecessorPass": "baseline"
  }
]
```

### predicate:broad-supported-region

```json
[
  {
    "seq": 7422,
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
    "seq": 11931,
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
    "seq": 30127,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
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
    "clippedPrismCoordinates": [
      [
        0.05172980427742013,
        0.5867894768714905,
        0.11793100833892822
      ],
      [
        0.04826957583427438,
        0.5867932319641114,
        0.12215405702590942
      ],
      [
        0.04744022949216716,
        0.6,
        0.12158712207798847
      ],
      [
        0.048353603294957664,
        0.6,
        0.1204722730943318
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
    "supportBand": [
      -0.1112787505530034,
      0.1537212494469966
    ],
    "bodyBand": [
      0.1537212494469966,
      1.9387212494469965
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
    "seq": 30129,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "22:0",
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
python3 scripts/diagnosis/trace-query.py walkway cave-2-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
