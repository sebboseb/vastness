# tunnel-2-7: failed

A railway tunnel through rock with a wide level walkway, clear entrance and exit, empty floor and generous headroom.

Locked scale: 10. Previously unresolved: True.

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
      "cue": "tunnel"
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/tunnel-2-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/tunnel-2-7/expanded.ndjson.gz`. SHA256 `eecc0ed36b0f45f7dd0ce80ac71b57ba315353a6298ae487dd653a68ec214bb6`; 234,678 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 844 valid sampled nodes; 2189 floor tests |
| Proposals | Returned pass: 456 eligible; 192 attempted. All trace passes: 528 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 165, "support-edge-not-found": 40, "entry-prism-blocked": 165, "source-entry-prism": 165}; passed 14 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 633 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 2230 candidate events. Returned pass: maximum connected displacement 9.1214m |
| Topology | {"enclosed-passage": 2230} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 71872,
  "broad-supported-region": 6756
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
  "baseline": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2244,
    "support:rejected": 1343,
    "support:node": 844,
    "support:duplicate-layer": 2,
    "proposal:eligible": 456,
    "proposal:direction-excluded": 2920,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 264,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9500,
    "prescreen:projection-start": 172,
    "prescreen:projection-blocked": 165,
    "prescreen:rejected": 165,
    "prescreen:body-sample": 290,
    "prescreen:passed": 7,
    "component:entry-search": 7,
    "component:node-visited": 3153,
    "edge:tested": 1243,
    "component:node-discovered": 3146,
    "route:candidate": 1115,
    "topology:ray": 8034,
    "topology:node-feature": 618,
    "topology:node-predicate": 39314,
    "topology:sustained-sample": 39314,
    "topology:sustained-result": 1115,
    "topology:route-rejected": 1115,
    "topology:broad-feature": 104,
    "prescreen:support-edge-not-found": 20,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2244,
    "support:rejected": 1343,
    "support:node": 844,
    "support:duplicate-layer": 2,
    "proposal:eligible": 456,
    "proposal:direction-excluded": 2920,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 264,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9500,
    "prescreen:projection-start": 172,
    "prescreen:entry-prism-blocked": 165,
    "prescreen:entry-prism-proof": 172,
    "prescreen:rejected": 165,
    "prescreen:body-sample": 290,
    "prescreen:passed": 7,
    "component:entry-search": 7,
    "component:node-visited": 3153,
    "edge:tested": 1243,
    "component:node-discovered": 3146,
    "route:candidate": 1115,
    "topology:ray": 8034,
    "topology:node-feature": 618,
    "topology:node-predicate": 39314,
    "topology:sustained-sample": 39314,
    "topology:sustained-result": 1115,
    "topology:route-rejected": 1115,
    "topology:broad-feature": 104,
    "prescreen:support-edge-not-found": 20,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 8518,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 21446,
    "triangle": [
      [
        -4.216177463531494,
        2.4423834681510925,
        -3.9370834827423096
      ],
      [
        -4.225304126739502,
        2.4770277738571167,
        -3.9389964938163757
      ],
      [
        -4.194680452346802,
        2.4782775342464447,
        -3.9610612392425537
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.11180637031793594,
        -0.02005270719528207
      ],
      [
        0.12093303352594376,
        -0.01813969612121591
      ],
      [
        0.09030935913324356,
        0.003925049304962069
      ]
    ],
    "approach": {
      "seam": [
        -4.104371093213558,
        0.6677057803434462,
        -3.9571361899375916
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
    "pass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 8519,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "baseline"
  }
]
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 8565,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "742:1",
    "triangleId": 400790,
    "triangle": [
      [
        3.580622375011444,
        3.3443833887577057,
        2.278178185224533
      ],
      [
        3.581427037715912,
        3.3383873105049133,
        2.2390037775039673
      ],
      [
        3.6211687326431274,
        3.3373336493968964,
        2.277953326702118
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.587672316357592
      ],
      [
        0.02522475719451789,
        -0.5649104833602907
      ],
      [
        0.0020000000000000052,
        -0.5647816854881452
      ]
    ],
    "approach": {
      "seam": [
        3.5959439754486096,
        7.919417936194151,
        2.8428638100624086
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
    "pass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 8619,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "216:2",
    "triangleId": 400189,
    "triangle": [
      [
        3.5643216967582703,
        7.805647850036621,
        -1.5482784807682037
      ],
      [
        3.57595294713974,
        7.842827141284943,
        -1.5689481794834137
      ],
      [
        3.590768575668335,
        7.817970812320709,
        -1.5385012328624725
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.8164784986143503,
        -0.6
      ],
      [
        0.7983336299657822,
        -0.591170620918275
      ],
      [
        0.8015977969183087,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        4.18193919658661,
        0.1670188374211798,
        -0.7401676028966904
      ],
      "outward": [
        0,
        0,
        -1
      ],
      "width": 1.2,
      "length": 3.7169685870409013
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 8656,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "842:1",
    "triangleId": 32214,
    "triangle": [
      [
        -3.835693895816803,
        0.14523327350616455,
        3.261706531047821
      ],
      [
        -3.8515281677246094,
        0.15486598014831543,
        3.2628872990608215
      ],
      [
        -3.834826350212097,
        0.1452973484992981,
        3.2221078872680664
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.01610862910747546,
        -0.3811572790145874
      ],
      [
        0.002,
        -0.3801051928779851
      ],
      [
        0.002,
        -0.384189866722255
      ],
      [
        0.01697617471218127,
        -0.42075592279434204
      ]
    ],
    "approach": {
      "seam": [
        -3.8518025249242784,
        0.22565662401716946,
        3.6428638100624084
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 8.788913759589194
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### predicate:opposing-wall-width

```json
[
  {
    "seq": 9621,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 170,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "opposing-wall-width",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "failed",
        "measured": [
          null,
          9.246811484282732,
          2.1869770492281395,
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
    "pass": "baseline"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 9864,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### predicate:broad-supported-region

```json
[
  {
    "seq": 16198,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 70,
    "nodeId": 199,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          null,
          3.4468124816227195,
          0.765466573755418,
          2.694051255049403
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
          "featureKey": "199:support",
          "bypassWhenWidthAtMost": 0.6
        },
        "threshold": 2.4
      },
      {
        "name": "required-roof-coverage",
        "status": "not-evaluated"
      }
    ],
    "pass": "baseline"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 49984,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "318:1",
    "eye": [
      -3.018060803413391,
      1.817765067020164,
      0.44286381006240916
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
    "pass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 125770,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 21446,
    "triangle": [
      [
        -4.216177463531494,
        2.4423834681510925,
        -3.9370834827423096
      ],
      [
        -4.225304126739502,
        2.4770277738571167,
        -3.9389964938163757
      ],
      [
        -4.194680452346802,
        2.4782775342464447,
        -3.9610612392425537
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.11180637031793594,
        -0.02005270719528207,
        2.4423834681510925
      ],
      [
        0.11847725635007994,
        -0.018654443825365262,
        2.4677057803434463
      ],
      [
        0.09664079874476193,
        -0.003137035558681274,
        2.4677057803434463
      ]
    ],
    "approach": {
      "seam": [
        -4.104371093213558,
        0.6677057803434462,
        -3.9571361899375916
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
      0.4177057803434462,
      0.6827057803434462
    ],
    "bodyBand": [
      0.6827057803434462,
      2.4677057803434463
    ],
    "contactBoundaryTolerance": 0.002,
    "pass": "entry-prism"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 125772,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py entry-prism tunnel-2-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/tunnel-2-7/legacy.ndjson.gz`. SHA256 `88338929d18de75d06fb6db687f724dc252652c2dfa9c66836826764f3eda64d`; 688,311 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 844 valid sampled nodes; 2189 floor tests |
| Proposals | Returned pass: 49 eligible; 13 attempted. All trace passes: 2 omitted by selection; 70 selected but not attempted |
| Pre-screen | {"source-projection": 4, "entry-prism-blocked": 4, "source-entry-prism": 4}; passed 18 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 630 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 8192 candidate events. Returned pass: maximum connected displacement 9.1214m |
| Topology | {"enclosed-passage": 8192} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 279340,
  "broad-supported-region": 21660
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
  "baseline": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2244,
    "support:rejected": 1343,
    "support:node": 844,
    "support:duplicate-layer": 2,
    "proposal:direction-excluded": 3192,
    "proposal:legacy-body-sample": 951,
    "proposal:eligible": 49,
    "proposal:direction-unexecuted": 135,
    "proposal:selected": 48,
    "proposal:omitted": 1,
    "budget:exhausted": 2,
    "proposal:attempt": 13,
    "prescreen:edge-support-probe": 588,
    "prescreen:projection-start": 13,
    "prescreen:projection-blocked": 4,
    "prescreen:rejected": 4,
    "prescreen:body-sample": 358,
    "prescreen:passed": 9,
    "component:entry-search": 9,
    "component:node-visited": 5602,
    "edge:tested": 1238,
    "component:node-discovered": 5608,
    "route:candidate": 4096,
    "topology:ray": 7852,
    "topology:node-feature": 604,
    "topology:node-predicate": 150500,
    "topology:sustained-sample": 150500,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "topology:broad-feature": 106,
    "route:candidate-not-executed": 1,
    "proposal:not-attempted": 35,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2244,
    "support:rejected": 1343,
    "support:node": 844,
    "support:duplicate-layer": 2,
    "proposal:direction-excluded": 3192,
    "proposal:legacy-body-sample": 951,
    "proposal:eligible": 49,
    "proposal:direction-unexecuted": 135,
    "proposal:selected": 48,
    "proposal:omitted": 1,
    "budget:exhausted": 2,
    "proposal:attempt": 13,
    "prescreen:edge-support-probe": 588,
    "prescreen:projection-start": 13,
    "prescreen:entry-prism-blocked": 4,
    "prescreen:entry-prism-proof": 13,
    "prescreen:rejected": 4,
    "prescreen:body-sample": 358,
    "prescreen:passed": 9,
    "component:entry-search": 9,
    "component:node-visited": 5602,
    "edge:tested": 1238,
    "component:node-discovered": 5608,
    "route:candidate": 4096,
    "topology:ray": 7852,
    "topology:node-feature": 604,
    "topology:node-predicate": 150500,
    "topology:sustained-sample": 150500,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "topology:broad-feature": 106,
    "route:candidate-not-executed": 1,
    "proposal:not-attempted": 35,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 8861,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "3:2",
    "triangleId": 33446,
    "triangle": [
      [
        -3.8284066319465637,
        2.120102643966675,
        -4.222015142440796
      ],
      [
        -3.8322681188583374,
        2.1592529118061066,
        -4.224806129932404
      ],
      [
        -3.8104549050331116,
        2.130262553691864,
        -4.2439234256744385
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.006708902734018976,
        -0.6
      ],
      [
        0.013374780118465601,
        -0.5923941016197203
      ],
      [
        0.004092543553436058,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -3.2180608034133913,
        0.7068652555648701,
        -4.230548645555973
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
    "pass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 8862,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "3:2",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 8906,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "4:2",
    "triangleId": 40596,
    "triangle": [
      [
        -3.6301305890083313,
        3.4741897135972977,
        -4.141993820667267
      ],
      [
        -3.6278921365737915,
        3.4965725988149643,
        -4.151461124420166
      ],
      [
        -3.614775538444519,
        3.4773732721805573,
        -4.162723124027252
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.031014243182427015,
        -0.6
      ],
      [
        0.033834993839263916,
        -0.5967147350311279
      ],
      [
        0.029399889319440455,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -3.018060803413391,
        0.7069756504864253,
        -4.128888130187988
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
    "pass": "baseline"
  }
]
```

### predicate:opposing-wall-width

```json
[
  {
    "seq": 9400,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 62,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "opposing-wall-width",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "failed",
        "measured": [
          null,
          2.1734634091105534,
          0.5876885741795754,
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
    "pass": "baseline"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 9643,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### predicate:broad-supported-region

```json
[
  {
    "seq": 27397,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 203,
    "nodeId": 199,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          null,
          3.4468124816227195,
          0.765466573755418,
          2.694051255049403
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
          "featureKey": "199:support",
          "bypassWhenWidthAtMost": 0.6
        },
        "threshold": 2.4
      },
      {
        "name": "required-roof-coverage",
        "status": "not-evaluated"
      }
    ],
    "pass": "baseline"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 99154,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "64:0",
    "triangleId": 214,
    "triangle": [
      [
        -4.998800754547119,
        0.13287663459777832,
        -1.9763241708278656
      ],
      [
        -4.998641610145569,
        0.13776808977127075,
        -1.9745242595672607
      ],
      [
        -4.98567134141922,
        0.13794630765914917,
        -2.0126336812973022
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0024875581264502955,
        0.4191879808902743
      ],
      [
        0.0023284137249000025,
        0.41738806962966946
      ],
      [
        0.002,
        0.41835301934722796
      ],
      [
        0.002,
        0.42053632728811813
      ]
    ],
    "approach": {
      "seam": [
        -4.996313196420669,
        0.1430502762248565,
        -1.5571361899375913
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
    "pass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 353009,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "3:2",
    "triangleId": 33446,
    "triangle": [
      [
        -3.8284066319465637,
        2.120102643966675,
        -4.222015142440796
      ],
      [
        -3.8322681188583374,
        2.1592529118061066,
        -4.224806129932404
      ],
      [
        -3.8104549050331116,
        2.130262553691864,
        -4.2439234256744385
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.006708902734018976,
        -0.6,
        2.1403710007823085
      ],
      [
        0.013374780118465601,
        -0.5923941016197203,
        2.130262553691864
      ],
      [
        0.004092543553436058,
        -0.6,
        2.125957940475812
      ]
    ],
    "approach": {
      "seam": [
        -3.2180608034133913,
        0.7068652555648701,
        -4.230548645555973
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
      0.4568652555648701,
      0.7218652555648701
    ],
    "bodyBand": [
      0.7218652555648701,
      2.50686525556487
    ],
    "contactBoundaryTolerance": 0.002,
    "pass": "entry-prism"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 353011,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "3:2",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py entry-prism tunnel-2-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
