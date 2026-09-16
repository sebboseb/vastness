# narrow_passage-1-7: passed

A narrow human passage between tall stone walls, straight flat floor and clear overhead space, open entrances at both ends.

Locked scale: 6. Previously unresolved: False.

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
      "cue": "passage"
    }
  ],
  "ambiguities": [],
  "requirements": {
    "openSky": false,
    "covered": false,
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/narrow_passage-1-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: passed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/narrow_passage-1-7/expanded.ndjson.gz`. SHA256 `8cbc0d274612a375e218311cb7bd4af12fab696c27d0b06a03bcb4488c833a3d`; 9,230 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 384 valid sampled nodes; 859 floor tests |
| Proposals | Returned pass: 248 eligible; 70 attempted. All trace passes: 56 omitted by selection; 122 selected but not attempted |
| Pre-screen | {"source-projection": 47, "support-edge-not-found": 17, "body-obstruction": 2}; passed 4 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 182 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 2 candidate events. Returned pass: maximum connected displacement 3.2000m |
| Topology | {} |
| Final seam | {"swept-forward:support-gap-or-step": 1, "swept-reverse:support-gap-or-step": 1, "swept-forward:passed": 1, "swept-reverse:passed": 1} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
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
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 475,
    "support:node": 384,
    "proposal:eligible": 248,
    "proposal:direction-excluded": 1288,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 56,
    "budget:exhausted": 1,
    "proposal:attempt": 70,
    "prescreen:edge-support-probe": 3595,
    "prescreen:projection-start": 53,
    "prescreen:projection-blocked": 47,
    "prescreen:rejected": 49,
    "prescreen:support-edge-not-found": 17,
    "prescreen:body-sample": 160,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 299,
    "edge:tested": 342,
    "component:node-discovered": 320,
    "route:candidate": 2,
    "topology:ray": 156,
    "topology:node-feature": 12,
    "topology:node-predicate": 12,
    "topology:sustained-sample": 12,
    "topology:witness": 2,
    "topology:sustained-result": 2,
    "topology:route-qualified": 2,
    "seam:swept-forward": 2,
    "seam:swept-reverse": 2,
    "route:seam-rejected": 1,
    "route:accepted": 1,
    "proposal:not-attempted": 122,
    "support:accepted-dense-sample": 73,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 3908,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 29664,
    "triangle": [
      [
        -2.994143843650818,
        0.0036397576332092285,
        -2.8026931285858154
      ],
      [
        -2.999679386615753,
        0.004317104816436768,
        -2.8026174902915955
      ],
      [
        -2.9998258352279663,
        0.004266321659088135,
        -2.8266727924346924
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.025649331510066986,
        0.1912372350692748
      ],
      [
        0.03118487447500229,
        0.19116159677505484
      ],
      [
        0.031331323087215424,
        0.21521689891815177
      ]
    ],
    "approach": {
      "seam": [
        -2.968494512140751,
        0.022661812987843165,
        -2.6114558935165406
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
    "seq": 3909,
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 3955,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "383:1",
    "triangleId": 1340730,
    "triangle": [
      [
        3.0075870752334595,
        0.0285036563873291,
        2.2208885550498962
      ],
      [
        2.996285319328308,
        0.02884465456008911,
        2.2223333716392517
      ],
      [
        2.9995111227035522,
        0.028235971927642822,
        2.240805208683014
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.00795333087444261,
        -0.36765555143356377
      ],
      [
        0.001999999999999999,
        -0.36689447755429194
      ],
      [
        0.002,
        -0.35297363886033806
      ]
    ],
    "approach": {
      "seam": [
        2.999633744359017,
        0.02796736529540688,
        2.58854410648346
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

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 4109,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "344:0",
    "eye": [
      -0.007240176200866699,
      1.6945535723220964,
      1.3885441064834598
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

### seam:support-gap-or-step

```json
[
  {
    "seq": 5053,
    "stage": "seam",
    "kind": "swept-forward",
    "proposalId": "176:1",
    "routeId": 1,
    "from": [
      4.2019989758729945,
      1.6798690891426542,
      -0.21145589351654026
    ],
    "target": [
      2.592759823799134,
      1.6999630069896199,
      -0.21145589351654026
    ],
    "movement": {
      "position": [
        3.0316432289101822,
        1.6934124888623951,
        -0.21145589351654026
      ],
      "blocked": true,
      "reason": "support-gap-or-step",
      "support": {
        "valid": true,
        "eye": [
          3.0316432289101822,
          1.6934124888623951,
          -0.21145589351654026
        ],
        "foot": [
          3.0316432289101822,
          0.0434124888623953,
          -0.21145589351654026
        ],
        "supportTriangleIds": [
          -1,
          1329509,
          1322007,
          1329545
        ],
        "supportSamples": [
          {
            "position": [
              3.0316432289101822,
              0.029869089142654258,
              -0.21145589351654026
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              3.331643228910182,
              0.029869089142654258,
              -0.21145589351654026
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              3.2437752632661465,
              0.029869089142654258,
              0.0006761408394239665
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              3.0316432289101822,
              0.029869089142654258,
              0.08854410648345973
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              2.819511194554218,
              0.040987896225516615,
              0.0006761408394239943
            ],
            "triangleId": 1329509,
            "normalY": 0.9978614449501038
          },
          {
            "position": [
              2.7316432289101824,
              0.0434124888623953,
              -0.21145589351654023
            ],
            "triangleId": 1322007,
            "normalY": 0.9994505643844604
          },
          {
            "position": [
              2.819511194554218,
              0.03542121457016997,
              -0.4235879278725045
            ],
            "triangleId": 1329545,
            "normalY": 0.9991934299468994
          },
          {
            "position": [
              3.0316432289101822,
              0.029869089142654258,
              -0.5114558935165403
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              3.2437752632661465,
              0.029869089142654258,
              -0.42358792787250454
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
    "endpointDistance": 0.4388834051110484,
    "endpointTolerance": 1e-06,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 7360,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "36:1",
    "triangleId": 1341726,
    "triangle": [
      [
        2.998369574546814,
        3.7777040004730225,
        -2.191143214702606
      ],
      [
        3.00505793094635,
        3.794331192970276,
        -2.190903961658478
      ],
      [
        2.9983209371566772,
        3.8025450110435486,
        -2.190930962562561
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.37956550242365816
      ],
      [
        0.0052828937768927275,
        -0.37944806814193743
      ],
      [
        0.002,
        -0.37946122550896977
      ]
    ],
    "approach": {
      "seam": [
        2.9997750371694574,
        0.015876346452279793,
        -1.8114558935165403
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
    "seq": 8229,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "33:2",
    "firstFailure": "body-obstruction",
    "triangleId": 1134934,
    "triangle": [
      [
        1.3718298375606537,
        0.06953287124633789,
        -2.211773693561554
      ],
      [
        1.3714505732059479,
        0.08881509304046631,
        -2.2104833722114563
      ],
      [
        1.3482309579849243,
        0.0889011025428772,
        -2.210539162158966
      ]
    ],
    "position": [
      1.3927598237991337,
      0.03333342035137643,
      -1.9114558935165404
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py walkway narrow_passage-1-7 --mode expanded --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
