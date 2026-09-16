# tunnel-2-42: failed

A railway tunnel through rock with a wide level walkway, clear entrance and exit, empty floor and generous headroom.

Locked scale: 16. Previously unresolved: True.

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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/tunnel-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/coverage/candidates/tunnel-2-42/expanded.ndjson.gz`. SHA256 `186b76bbbb99a8a627afda7b997b9c9463e2751bcedda0ab77896f0bf9ec6601`; 1,907,673 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 7207 valid sampled nodes; 11499 floor tests |
| Proposals | Returned pass: 1862 eligible; 192 attempted. All trace passes: 5010 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 161, "support-edge-not-found": 90, "entry-prism-blocked": 222, "source-entry-prism": 222, "exterior-approach-limit": 98}; passed 5 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 4061 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 9435 candidate events. Returned pass: maximum connected displacement 21.4960m |
| Topology | {"enclosed-passage": 9435} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 723971
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
    "support:rejected": 8578,
    "support:node": 14414,
    "support:duplicate-layer": 6,
    "proposal:eligible": 3724,
    "proposal:direction-excluded": 53932,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 3340,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 18638,
    "prescreen:projection-start": 275,
    "prescreen:projection-blocked": 161,
    "prescreen:rejected": 272,
    "prescreen:support-edge-not-found": 60,
    "prescreen:body-sample": 114,
    "prescreen:passed": 3,
    "component:entry-search": 3,
    "component:node-visited": 12183,
    "edge:tested": 27250,
    "component:node-discovered": 12180,
    "route:candidate": 5647,
    "topology:ray": 101309,
    "topology:node-feature": 7793,
    "topology:node-predicate": 430975,
    "topology:sustained-sample": 430975,
    "topology:sustained-result": 5647,
    "topology:route-rejected": 5647,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-proof": 113,
    "prescreen:entry-prism-blocked": 111,
    "prescreen:exterior-approach-limit": 49,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 6724,
    "support:rejected": 4289,
    "support:node": 7207,
    "support:duplicate-layer": 3,
    "proposal:eligible": 1862,
    "proposal:direction-excluded": 26966,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 1670,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9319,
    "prescreen:projection-start": 113,
    "prescreen:entry-prism-proof": 113,
    "prescreen:body-sample": 76,
    "prescreen:passed": 2,
    "route:stream-admitted": 2,
    "prescreen:entry-prism-blocked": 111,
    "prescreen:rejected": 111,
    "prescreen:exterior-approach-limit": 49,
    "prescreen:support-edge-not-found": 30,
    "route:scheduler-start": 1,
    "route:stream-resumed": 3790,
    "component:entry-search": 2,
    "component:node-visited": 8122,
    "edge:tested": 13625,
    "component:node-discovered": 8120,
    "route:candidate": 3788,
    "topology:ray": 51649,
    "topology:node-feature": 3973,
    "topology:node-predicate": 292996,
    "topology:sustained-sample": 292996,
    "topology:sustained-result": 3788,
    "topology:route-rejected": 3788,
    "route:stream-suspended": 3788,
    "route:stream-complete": 2,
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
    "seq": 49155,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 43532,
    "triangle": [
      [
        -7.982480525970459,
        6.876737475395203,
        -7.90412712097168
      ],
      [
        -8.001299858093262,
        6.93888247013092,
        -7.901825904846191
      ],
      [
        -8.001293182373047,
        6.93488883972168,
        -7.919793128967285
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        0.28601168569913654
      ],
      [
        0.0024569466710095966,
        0.28595581054687536
      ],
      [
        0.002450270950794753,
        0.3039230346679691
      ],
      [
        0.002,
        0.30354807707748394
      ]
    ],
    "approach": {
      "seam": [
        -7.998842911422252,
        16.024566998388863,
        -7.615870094299316
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
    "seq": 49156,
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

### projection:wholly-above-player

```json
[
  {
    "seq": 49222,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "7116:1",
    "triangleId": 855590,
    "triangle": [
      [
        5.848979473114014,
        15.88481092453003,
        7.04384183883667
      ],
      [
        5.849471092224121,
        15.884993553161621,
        6.978642463684082
      ],
      [
        5.910375118255615,
        15.883447170257568,
        7.043187618255615
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.3703197791208295
      ],
      [
        0.029720245301723125,
        -0.3409422874450687
      ],
      [
        0.0020000000000000018,
        -0.34064690566438305
      ]
    ],
    "approach": {
      "seam": [
        5.880654872953892,
        6.343978391519635,
        7.384129905700684
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2.2332382544875142
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
    "seq": 49269,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1294:1",
    "triangleId": 2167035,
    "triangle": [
      [
        7.936803340911865,
        15.997718811035156,
        -5.360032558441162
      ],
      [
        7.9837141036987305,
        15.99710750579834,
        -5.415770530700684
      ],
      [
        7.936771392822266,
        15.998075008392334,
        -5.419451713562012
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.3961683347176838
      ],
      [
        0.0051410496234876035,
        -0.3999004364013672
      ],
      [
        0.002,
        -0.4001467531952778
      ]
    ],
    "approach": {
      "seam": [
        7.978573054075243,
        15.996500928575285,
        -5.015870094299316
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 49556,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "3618:1",
    "triangleId": 209958,
    "triangle": [
      [
        -5.166362285614014,
        15.671518325805664,
        -0.38728973269462585
      ],
      [
        -5.19705867767334,
        15.703455924987793,
        -0.3916322886943817
      ],
      [
        -5.160511493682861,
        15.679141998291016,
        -0.4257150888442993
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.01605377942323649,
        -0.37141963839530945
      ],
      [
        0.002,
        -0.37340779791697803
      ],
      [
        0.0020000000000000018,
        -0.3912825923714488
      ],
      [
        0.021904571354388835,
        -0.4098449945449829
      ]
    ],
    "approach": {
      "seam": [
        -5.18241606503725,
        15.80001575324112,
        -0.015870094299316406
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 13.296309192478656
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
    "seq": 50155,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "2206:0",
    "eye": [
      -2.22160358428955,
      6.005050539987234,
      -2.8158700942993162
    ],
    "outward": [
      -1,
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 55251,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 944,
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
    "seq": 55510,
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

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 858387,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "7116:1",
    "triangleId": 855596,
    "triangle": [
      [
        5.850139141082764,
        6.216309070587158,
        6.928137302398682
      ],
      [
        5.848267555236816,
        6.240885496139526,
        6.959004878997803
      ],
      [
        5.913679599761963,
        6.236601829528809,
        6.961272716522217
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0020000000000000018,
        -0.4239328173773838,
        6.238633559117742
      ],
      [
        0.03302472680807078,
        -0.42285718917846715,
        6.236601829528809
      ],
      [
        0.0020000000000000018,
        -0.43903612764104866,
        6.226693539355372
      ]
    ],
    "approach": {
      "seam": [
        5.880654872953892,
        6.343978391519635,
        7.384129905700684
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2.833238254487514
    },
    "supportBand": [
      6.093978391519635,
      6.358978391519635
    ],
    "bodyBand": [
      6.358978391519635,
      8.143978391519635
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
    "seq": 858389,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "7116:1",
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

### prescreen:exterior-approach-limit

```json
[
  {
    "seq": 858627,
    "stage": "prescreen",
    "kind": "exterior-approach-limit",
    "proposalId": "5494:0",
    "seam": [
      2.045784080028535,
      15.79031396499598,
      3.9841299057006836
    ],
    "distanceToBounds": 10.067387664318087,
    "startDistance": 10.467387664318087,
    "requiredLength": 10.767387664318088,
    "maximumLength": 10,
    "unexecuted": [
      "projection",
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
python3 scripts/diagnosis/trace-query.py coverage tunnel-2-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/coverage/candidates/tunnel-2-42/legacy.ndjson.gz`. SHA256 `24df160e3e5e0a455896eaf9c62bafea8836381c40232ecae6b3587b7523516e`; 1,975,672 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 7207 valid sampled nodes; 11499 floor tests |
| Proposals | Returned pass: 491 eligible; 48 attempted. All trace passes: 1329 omitted by selection; 70 selected but not attempted |
| Pre-screen | {"source-projection": 12, "entry-prism-blocked": 55, "source-entry-prism": 55}; passed 7 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 4061 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 12288 candidate events. Returned pass: maximum connected displacement 12.8000m |
| Topology | {"enclosed-passage": 12288} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 776429
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
    "support:rejected": 8578,
    "support:node": 14414,
    "support:duplicate-layer": 6,
    "proposal:legacy-body-sample": 20002,
    "proposal:eligible": 982,
    "proposal:direction-unexecuted": 1556,
    "proposal:direction-excluded": 55118,
    "proposal:selected": 96,
    "proposal:omitted": 886,
    "budget:exhausted": 4,
    "proposal:attempt": 26,
    "prescreen:edge-support-probe": 1172,
    "prescreen:projection-start": 26,
    "prescreen:projection-blocked": 12,
    "prescreen:rejected": 22,
    "prescreen:body-sample": 164,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 9357,
    "edge:tested": 27250,
    "component:node-discovered": 9431,
    "route:candidate": 8192,
    "topology:ray": 104806,
    "topology:node-feature": 8062,
    "topology:node-predicate": 609318,
    "topology:sustained-sample": 609318,
    "topology:sustained-result": 8192,
    "topology:route-rejected": 8192,
    "route:candidate-not-executed": 2,
    "proposal:not-attempted": 70,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-proof": 12,
    "prescreen:entry-prism-blocked": 10,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 6724,
    "support:rejected": 4289,
    "support:node": 7207,
    "support:duplicate-layer": 3,
    "proposal:legacy-body-sample": 10001,
    "proposal:eligible": 491,
    "proposal:direction-unexecuted": 778,
    "proposal:direction-excluded": 27559,
    "proposal:selected": 48,
    "proposal:omitted": 443,
    "budget:exhausted": 2,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2177,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-proof": 48,
    "prescreen:body-sample": 122,
    "prescreen:passed": 3,
    "route:stream-admitted": 3,
    "prescreen:entry-prism-blocked": 45,
    "prescreen:rejected": 45,
    "route:scheduler-start": 1,
    "route:stream-resumed": 4096,
    "component:entry-search": 3,
    "component:node-visited": 4960,
    "edge:tested": 6599,
    "component:node-discovered": 5074,
    "route:candidate": 4096,
    "topology:ray": 23673,
    "topology:node-feature": 1821,
    "topology:node-predicate": 167111,
    "topology:sustained-sample": 167111,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "route:stream-suspended": 4096,
    "route:stream-unexecuted": 3,
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
    "seq": 57593,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 43532,
    "triangle": [
      [
        -7.982480525970459,
        6.876737475395203,
        -7.90412712097168
      ],
      [
        -8.001299858093262,
        6.93888247013092,
        -7.901825904846191
      ],
      [
        -8.001293182373047,
        6.93488883972168,
        -7.919793128967285
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        0.28601168569913654
      ],
      [
        0.0024569466710095966,
        0.28595581054687536
      ],
      [
        0.002450270950794753,
        0.3039230346679691
      ],
      [
        0.002,
        0.30354807707748394
      ]
    ],
    "approach": {
      "seam": [
        -7.998842911422252,
        16.024566998388863,
        -7.615870094299316
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
    "seq": 57594,
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
    "seq": 57638,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "10:2",
    "triangleId": 151156,
    "triangle": [
      [
        -6.277331829071045,
        15.889849662780762,
        -7.987125396728516
      ],
      [
        -6.277740001678467,
        15.96489667892456,
        -7.994712829589844
      ],
      [
        -6.215357780456543,
        15.965014934539795,
        -7.995274066925049
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.008155104852511096,
        -0.6
      ],
      [
        0.008211296796798884,
        -0.5937541961669925
      ],
      [
        0.007390066028675223,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -5.62160358428955,
        16.014786201693916,
        -7.98706277012825
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 59080,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 636,
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
    "seq": 59323,
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

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 1506168,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "10:2",
    "triangleId": 151156,
    "triangle": [
      [
        -6.277331829071045,
        15.889849662780762,
        -7.987125396728516
      ],
      [
        -6.277740001678467,
        15.96489667892456,
        -7.994712829589844
      ],
      [
        -6.215357780456543,
        15.965014934539795,
        -7.995274066925049
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.008155104852511096,
        -0.6,
        15.96500309460591
      ],
      [
        0.008211296796798884,
        -0.5937541961669925,
        15.965014934539795
      ],
      [
        0.007390066028675223,
        -0.6,
        15.957439706634615
      ]
    ],
    "approach": {
      "seam": [
        -5.62160358428955,
        16.014786201693916,
        -7.98706277012825
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
      15.764786201693916,
      16.029786201693916
    ],
    "bodyBand": [
      16.029786201693916,
      17.814786201693916
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
    "seq": 1506170,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "10:2",
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
python3 scripts/diagnosis/trace-query.py coverage tunnel-2-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
