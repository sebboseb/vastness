# corridor-2-42: failed

An empty covered walkway between brick walls, broad straight path, low arched ceiling and flat continuous paving.

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
      "cue": "empty covered walkway between brick walls"
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/corridor-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/corridor-2-42/expanded.ndjson.gz`. SHA256 `5722c08f9792b57fe51d8afc16a34d31cd1ddc0ca361bd1a9eb0631a1aa06098`; 68,669 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1084 valid sampled nodes; 1749 floor tests |
| Proposals | Returned pass: 322 eligible; 192 attempted. All trace passes: 390 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 156, "body-obstruction": 15, "support-edge-not-found": 90, "entry-prism-blocked": 308, "source-entry-prism": 308}; passed 7 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 307 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 33 candidate events. Returned pass: maximum connected displacement 3.8000m |
| Topology | {"enclosed-passage": 30} |
| Final seam | {"swept-forward:support-gap-or-step": 3, "swept-reverse:support-gap-or-step": 3} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "broad-supported-region": 135,
  "opposing-wall-width": 363
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
    "support:column": 2048,
    "support:rejected": 1330,
    "support:node": 2168,
    "proposal:eligible": 644,
    "proposal:direction-excluded": 8028,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 260,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 19380,
    "prescreen:projection-start": 324,
    "prescreen:projection-blocked": 156,
    "prescreen:rejected": 320,
    "prescreen:body-sample": 220,
    "prescreen:support-edge-not-found": 60,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 604,
    "edge:tested": 3327,
    "component:node-discovered": 644,
    "route:candidate": 22,
    "topology:ray": 3380,
    "topology:node-feature": 260,
    "topology:broad-feature": 94,
    "topology:node-predicate": 420,
    "topology:sustained-sample": 420,
    "topology:sustained-result": 24,
    "topology:route-rejected": 20,
    "topology:witness": 4,
    "topology:route-qualified": 2,
    "seam:swept-forward": 2,
    "seam:swept-reverse": 2,
    "route:seam-rejected": 2,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 154,
    "prescreen:entry-prism-proof": 162,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 665,
    "support:node": 1084,
    "proposal:eligible": 322,
    "proposal:direction-excluded": 4014,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 130,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9690,
    "prescreen:projection-start": 162,
    "prescreen:entry-prism-blocked": 154,
    "prescreen:entry-prism-proof": 162,
    "prescreen:rejected": 159,
    "prescreen:body-sample": 154,
    "prescreen:support-edge-not-found": 30,
    "prescreen:passed": 3,
    "route:stream-admitted": 3,
    "route:scheduler-start": 1,
    "route:stream-resumed": 13,
    "component:entry-search": 3,
    "component:node-visited": 307,
    "edge:tested": 1685,
    "component:node-discovered": 326,
    "route:stream-complete": 2,
    "route:candidate": 11,
    "topology:ray": 1690,
    "topology:node-feature": 130,
    "topology:broad-feature": 47,
    "topology:node-predicate": 210,
    "topology:sustained-sample": 210,
    "topology:sustained-result": 12,
    "topology:route-rejected": 10,
    "route:stream-suspended": 10,
    "topology:witness": 2,
    "topology:route-qualified": 1,
    "seam:swept-forward": 1,
    "seam:swept-reverse": 1,
    "route:seam-rejected": 1,
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
    "seq": 7689,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 40558,
    "triangle": [
      [
        -3.000976324081421,
        2.554626166820526,
        -2.801689088344574
      ],
      [
        -3.00140118598938,
        2.579663336277008,
        -2.802233040332794
      ],
      [
        -3.0014244318008423,
        2.579663336277008,
        -2.825222432613373
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.19554708610565455
      ],
      [
        0.0020305261015884923,
        0.19558616876602164
      ],
      [
        0.0020537719130508947,
        0.21857556104660025
      ],
      [
        0.002,
        0.21575161294891385
      ]
    ],
    "approach": {
      "seam": [
        -2.9993706598877914,
        2.5916854927351594,
        -2.6066468715667725
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
    "seq": 7690,
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
    "seq": 7736,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1083:1",
    "triangleId": 530223,
    "triangle": [
      [
        2.996103823184967,
        0.013833940029144287,
        2.097133219242096
      ],
      [
        2.976424276828766,
        0.013586640357971191,
        2.0744009613990784
      ],
      [
        2.997493028640747,
        0.014117538928985596,
        2.074727475643158
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.5186370739234771
      ],
      [
        0.0027369633316989272,
        -0.5186256527900701
      ],
      [
        0.002,
        -0.5067395697177907
      ]
    ],
    "approach": {
      "seam": [
        2.994756065309048,
        2.6047833696369094,
        2.593353128433228
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

### prescreen:body-obstruction

```json
[
  {
    "seq": 7802,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "1038:3",
    "firstFailure": "body-obstruction",
    "triangleId": 126852,
    "triangle": [
      [
        -2.152053415775299,
        1.6576584577560425,
        2.568691670894623
      ],
      [
        -2.1430492401123047,
        1.6649523451924324,
        2.5731337666511536
      ],
      [
        -2.138718008995056,
        1.6667751744389534,
        2.5633267164230347
      ]
    ],
    "position": [
      -2.0091288089752197,
      0.04433122278598489,
      2.293353128433228
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

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 7959,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "459:3",
    "eye": [
      2.1908711910247805,
      4.265634796524681,
      -0.40664687156677237
    ],
    "outward": [
      0,
      0,
      1
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
    "seq": 8020,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "25:2",
    "triangleId": 181664,
    "triangle": [
      [
        -1.3997060358524323,
        0.3178185224533081,
        -2.995305061340332
      ],
      [
        -1.4008947908878326,
        0.3429056704044342,
        -2.994012236595154
      ],
      [
        -1.382491797208786,
        0.3426344096660614,
        -3.0012903213500977
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.5733646713992856
      ],
      [
        0.0020006656646724963,
        -0.5733629882335665
      ],
      [
        0.002,
        -0.5733649027553266
      ]
    ],
    "approach": {
      "seam": [
        -0.8091288089752195,
        0.05742833017778466,
        -2.999289655685425
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

### projection:wholly-above-player

```json
[
  {
    "seq": 8945,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "319:1",
    "triangleId": 455412,
    "triangle": [
      [
        2.5896955132484436,
        2.583093613386154,
        -1.5833060145378113
      ],
      [
        2.5901530981063843,
        2.5829968750476837,
        -1.6072474122047424
      ],
      [
        2.6132529973983765,
        2.5831754207611084,
        -1.5837897062301636
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.5905710063087952
      ],
      [
        0.015223348140716464,
        -0.5771428346633911
      ],
      [
        0.0019999999999999983,
        -0.5768713275873367
      ]
    ],
    "approach": {
      "seam": [
        2.59802964925766,
        0.059778324807448914,
        -1.0066468715667725
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

### predicate:broad-supported-region

```json
[
  {
    "seq": 19286,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1072,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          2.1229215277762408,
          3.170959031415246,
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
        "status": "failed",
        "measured": {
          "featureKey": "1072:support",
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 19336,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1048,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "opposing-wall-width",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "failed",
        "measured": [
          2.5034304279673414,
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
    "seq": 19550,
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

### seam:support-gap-or-step

```json
[
  {
    "seq": 22286,
    "stage": "seam",
    "kind": "swept-forward",
    "proposalId": "1072:3",
    "routeId": 11,
    "from": [
      -0.20912880897521946,
      1.6612282603018065,
      4.205578583478928
    ],
    "target": [
      -0.20912880897521946,
      1.7077438465440096,
      2.593353128433228
    ],
    "movement": {
      "position": [
        -0.20912880897521946,
        1.6775395986878316,
        3.228472247087595
      ],
      "blocked": true,
      "reason": "support-gap-or-step",
      "support": {
        "valid": true,
        "eye": [
          -0.20912880897521946,
          1.6775395986878316,
          3.228472247087595
        ],
        "foot": [
          -0.20912880897521946,
          0.027539598687831755,
          3.228472247087595
        ],
        "supportTriangleIds": [
          -1,
          786706
        ],
        "supportSamples": [
          {
            "position": [
              -0.20912880897521946,
              0.011228260301806648,
              3.228472247087595
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.09087119102478053,
              0.011228260301806648,
              3.228472247087595
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.003003225380744795,
              0.011228260301806648,
              3.440604281443559
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.20912880897521943,
              0.011228260301806648,
              3.5284722470875947
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.4212608433311837,
              0.011228260301806648,
              3.440604281443559
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.5091288089752195,
              0.011228260301806648,
              3.228472247087595
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.42126084333118374,
              0.011228260301806648,
              3.0163402127316306
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.20912880897521952,
              0.027539598687831755,
              2.928472247087595
            ],
            "triangleId": 786706,
            "normalY": 0.9824731349945068
          },
          {
            "position": [
              0.0030032253807447395,
              0.011228260301806648,
              3.0163402127316306
            ],
            "triangleId": -1,
            "normalY": 1
          }
        ],
        "headClearance": 1.8,
        "reason": null,
        "blockedTriangleId": null
      }
    },
    "endpointDistance": 0.6351191186543668,
    "endpointTolerance": 1e-06,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 30360,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 40558,
    "triangle": [
      [
        -3.000976324081421,
        2.554626166820526,
        -2.801689088344574
      ],
      [
        -3.00140118598938,
        2.579663336277008,
        -2.802233040332794
      ],
      [
        -3.0014244318008423,
        2.579663336277008,
        -2.825222432613373
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.002,
        0.19554708610565455,
        2.577864428999139
      ],
      [
        0.0020305261015884923,
        0.19558616876602164,
        2.579663336277008
      ],
      [
        0.0020537719130508947,
        0.21857556104660025,
        2.579663336277008
      ],
      [
        0.002,
        0.21575161294891385,
        2.576658932557311
      ]
    ],
    "approach": {
      "seam": [
        -2.9993706598877914,
        2.5916854927351594,
        -2.6066468715667725
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
      2.3416854927351594,
      2.6066854927351595
    ],
    "bodyBand": [
      2.6066854927351595,
      4.391685492735159
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
    "seq": 30362,
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
python3 scripts/diagnosis/trace-query.py walkway corridor-2-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/corridor-2-42/legacy.ndjson.gz`. SHA256 `9f814724910b4cf075b58e7d5ef4c4d0d641928f5844b6b0f608ddca3327aed6`; 49,431 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1084 valid sampled nodes; 1749 floor tests |
| Proposals | Returned pass: 73 eligible; 48 attempted. All trace passes: 75 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 46, "entry-prism-blocked": 86, "source-entry-prism": 86}; passed 12 |
| Components | Returned pass: 5 reached-entry discoveries. All passes: 313 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 63 candidate events. Returned pass: maximum connected displacement 3.6056m |
| Topology | {"enclosed-passage": 60} |
| Final seam | {"swept-forward:support-gap-or-step": 3, "swept-reverse:support-gap-or-step": 3} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "broad-supported-region": 171,
  "opposing-wall-width": 744
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
    "support:column": 2048,
    "support:rejected": 1330,
    "support:node": 2168,
    "proposal:direction-excluded": 8294,
    "proposal:legacy-body-sample": 2874,
    "proposal:eligible": 146,
    "proposal:direction-unexecuted": 232,
    "proposal:selected": 96,
    "proposal:omitted": 50,
    "budget:exhausted": 2,
    "proposal:attempt": 96,
    "prescreen:edge-support-probe": 4200,
    "prescreen:projection-start": 96,
    "prescreen:projection-blocked": 46,
    "prescreen:rejected": 89,
    "prescreen:body-sample": 276,
    "prescreen:passed": 7,
    "component:entry-search": 7,
    "component:node-visited": 623,
    "edge:tested": 3426,
    "component:node-discovered": 662,
    "route:candidate": 42,
    "topology:ray": 3874,
    "topology:node-feature": 298,
    "topology:broad-feature": 106,
    "topology:node-predicate": 786,
    "topology:sustained-sample": 786,
    "topology:sustained-result": 44,
    "topology:route-rejected": 40,
    "topology:witness": 4,
    "topology:route-qualified": 2,
    "seam:swept-forward": 2,
    "seam:swept-reverse": 2,
    "route:seam-rejected": 2,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 43,
    "prescreen:entry-prism-proof": 48,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 665,
    "support:node": 1084,
    "proposal:direction-excluded": 4147,
    "proposal:legacy-body-sample": 1437,
    "proposal:eligible": 73,
    "proposal:direction-unexecuted": 116,
    "proposal:selected": 48,
    "proposal:omitted": 25,
    "budget:exhausted": 1,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2100,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 43,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 43,
    "prescreen:body-sample": 195,
    "prescreen:passed": 5,
    "route:stream-admitted": 5,
    "route:scheduler-start": 1,
    "route:stream-resumed": 25,
    "component:entry-search": 5,
    "component:node-visited": 313,
    "route:stream-complete": 4,
    "edge:tested": 1716,
    "component:node-discovered": 331,
    "route:candidate": 21,
    "topology:ray": 1937,
    "topology:node-feature": 149,
    "topology:broad-feature": 53,
    "topology:node-predicate": 393,
    "topology:sustained-sample": 393,
    "topology:sustained-result": 22,
    "topology:route-rejected": 20,
    "route:stream-suspended": 20,
    "topology:witness": 2,
    "topology:route-qualified": 1,
    "seam:swept-forward": 1,
    "seam:swept-reverse": 1,
    "route:seam-rejected": 1,
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
    "seq": 8669,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:2",
    "triangleId": 62022,
    "triangle": [
      [
        -2.825732946395874,
        2.552886039018631,
        -3.001368284225464
      ],
      [
        -2.8260932564735413,
        2.5796450078487396,
        -3.001769185066223
      ],
      [
        -2.8026146292686462,
        2.579666554927826,
        -3.0016154050827026
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020589038610955993,
        -0.6
      ],
      [
        0.002016237378120067,
        -0.5934858202934263
      ],
      [
        0.002,
        -0.595004837590828
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -2.20912880897522,
        2.591818248267184,
        -2.9995991677045826
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
    "seq": 8670,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:2",
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
    "seq": 8800,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "3:2",
    "triangleId": 237846,
    "triangle": [
      [
        -0.6237531155347824,
        0.053407877683639526,
        -2.9687896370887756
      ],
      [
        -0.6230500638484955,
        0.05349352955818176,
        -2.998334527015686
      ],
      [
        -0.5997716635465622,
        0.053576499223709106,
        -2.9981571435928345
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0030871020775683194,
        -0.6
      ],
      [
        0.003015799820423215,
        -0.5906428545713425
      ],
      [
        0.002,
        -0.5914723548430034
      ],
      [
        0.002000000000000001,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.009128808975219727,
        2.6002949022094777,
        -2.9951413437724113
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

### projection:wholly-above-player

```json
[
  {
    "seq": 8846,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "4:2",
    "triangleId": 237912,
    "triangle": [
      [
        -0.6238444000482559,
        2.5793768763542175,
        -3.000421643257141
      ],
      [
        -0.6232509613037109,
        2.59308922290802,
        -3.0007177591323853
      ],
      [
        -0.5992194414138794,
        2.593122214078903,
        -3.0007892847061157
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0021057445693796976,
        -0.6
      ],
      [
        0.0021352380514141345,
        -0.5900906324386597
      ],
      [
        0.002,
        -0.599149000125859
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.009128808975219727,
        0.056476873036173575,
        -2.9986540466547016
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 9631,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "513:0",
    "triangleId": 24805,
    "triangle": [
      [
        -2.988320767879486,
        1.7003081291913986,
        -0.5975501239299774
      ],
      [
        -2.998700737953186,
        1.7024618089199066,
        -0.603140339255333
      ],
      [
        -2.9920729994773865,
        1.6911507099866867,
        -0.6082925498485565
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.5957468403055088
      ],
      [
        0.00338634550571415,
        0.5964934676885605
      ],
      [
        0.002,
        0.5975711722519631
      ]
    ],
    "approach": {
      "seam": [
        -2.995314392447472,
        0.04228474240283775,
        -0.006646871566772461
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

### predicate:broad-supported-region

```json
[
  {
    "seq": 12171,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1065,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          2.306372572485578,
          2.706911249991678,
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
        "status": "failed",
        "measured": {
          "featureKey": "1065:support",
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 12187,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1047,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "opposing-wall-width",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "failed",
        "measured": [
          2.3034323989429546,
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
    "seq": 12417,
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

### seam:support-gap-or-step

```json
[
  {
    "seq": 15846,
    "stage": "seam",
    "kind": "swept-forward",
    "proposalId": "1065:3",
    "routeId": 21,
    "from": [
      -0.20912880897521946,
      1.6612282603018065,
      4.205578583478928
    ],
    "target": [
      -0.20912880897521946,
      1.709467772553134,
      2.393353128433228
    ],
    "movement": {
      "position": [
        -0.20912880897521946,
        1.6780088456356026,
        3.2259972564271955
      ],
      "blocked": true,
      "reason": "support-gap-or-step",
      "support": {
        "valid": true,
        "eye": [
          -0.20912880897521946,
          1.6780088456356026,
          3.2259972564271955
        ],
        "foot": [
          -0.20912880897521946,
          0.02800884563560259,
          3.2259972564271955
        ],
        "supportTriangleIds": [
          -1,
          786707
        ],
        "supportSamples": [
          {
            "position": [
              -0.20912880897521946,
              0.011228260301806648,
              3.2259972564271955
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.09087119102478053,
              0.011228260301806648,
              3.2259972564271955
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.003003225380744795,
              0.011228260301806648,
              3.4381292907831598
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.20912880897521943,
              0.011228260301806648,
              3.5259972564271953
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.4212608433311837,
              0.011228260301806648,
              3.4381292907831598
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.5091288089752195,
              0.011228260301806648,
              3.2259972564271955
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.42126084333118374,
              0.011228260301806648,
              3.013865222071231
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.20912880897521952,
              0.02800884563560259,
              2.9259972564271957
            ],
            "triangleId": 786707,
            "normalY": 0.9829788208007812
          },
          {
            "position": [
              0.0030032253807447395,
              0.011228260301806648,
              3.013865222071231
            ],
            "triangleId": -1,
            "normalY": 1
          }
        ],
        "headClearance": 1.8,
        "reason": null,
        "blockedTriangleId": null
      }
    },
    "endpointDistance": 0.8326441279939676,
    "endpointTolerance": 1e-06,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 25012,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:2",
    "triangleId": 62022,
    "triangle": [
      [
        -2.825732946395874,
        2.552886039018631,
        -3.001368284225464
      ],
      [
        -2.8260932564735413,
        2.5796450078487396,
        -3.001769185066223
      ],
      [
        -2.8026146292686462,
        2.579666554927826,
        -3.0016154050827026
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0020589038610955993,
        -0.6,
        2.5796605766589904
      ],
      [
        0.002016237378120067,
        -0.5934858202934263,
        2.579666554927826
      ],
      [
        0.002,
        -0.595004837590828,
        2.577906908381084
      ],
      [
        0.002,
        -0.6,
        2.575705584555004
      ]
    ],
    "approach": {
      "seam": [
        -2.20912880897522,
        2.591818248267184,
        -2.9995991677045826
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
      2.341818248267184,
      2.6068182482671842
    ],
    "bodyBand": [
      2.6068182482671842,
      4.391818248267184
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
    "seq": 25014,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:2",
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
python3 scripts/diagnosis/trace-query.py walkway corridor-2-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
