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

Complete trace: `.runtime/space-diagnosis/baseline/candidates/tunnel-2-42/expanded.ndjson.gz`. SHA256 `c6aa53b7ae2e016de1ece40dc64ea9acadf35dce8c13ff16f53ab0ca5443535b`; 415,938 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 7207 valid sampled nodes; 11499 floor tests |
| Proposals | 1862 eligible; 192 attempted; 1670 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 161, "support-edge-not-found": 30}; passed 1 |
| Components | 1 reached-entry discoveries, 4061 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 1859 candidates; maximum connected displacement 20.1316m |
| Topology | {"enclosed-passage": 1859} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 137979
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 49153,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 49154,
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
    "seq": 49220,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 49267,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 49554,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 50153,
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
    ]
  }
]
```

### predicate:opposing-wall-width

```json
[
  {
    "seq": 55249,
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
    ]
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 55508,
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline tunnel-2-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/tunnel-2-42/legacy.ndjson.gz`. SHA256 `3aebba69572575afc8cbe9faf3808fd0a8088472333a5af27a71cb8b321954c1`; 735,710 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 7207 valid sampled nodes; 11499 floor tests |
| Proposals | 491 eligible; 14 attempted; 443 omitted by selection; 34 selected but not attempted |
| Pre-screen | {"source-projection": 12}; passed 2 |
| Components | 1 reached-entry discoveries, 4061 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 4096 candidates; maximum connected displacement 20.5183m |
| Topology | {"enclosed-passage": 4096} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 292920
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 57591,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 57592,
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
    "seq": 57636,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### predicate:opposing-wall-width

```json
[
  {
    "seq": 59078,
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
    ]
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 59321,
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline tunnel-2-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
