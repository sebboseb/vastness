# cave-1-7: passed

A natural cave chamber with a broad entrance, high rocky ceiling and a continuous flat sandy floor with empty walking space.

Locked scale: 10. Previously unresolved: False.

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
      "cue": "chamber"
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/cave-1-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/cave-1-7/expanded.ndjson.gz`. SHA256 `d771016c87ace8ba8ad1565ba136d42e1d5205836f23d1e282c349399ddc669d`; 179,057 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1550 valid sampled nodes; 2806 floor tests |
| Proposals | Returned pass: 810 eligible; 192 attempted. All trace passes: 1854 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 162, "support-edge-not-found": 78, "entry-prism-blocked": 324, "source-entry-prism": 324}; passed 12 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 752 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 1197 candidate events. Returned pass: maximum connected displacement 5.6886m |
| Topology | {"enclosed-passage": 1185} |
| Final seam | {"swept-forward:support-gap-or-step": 9, "swept-reverse:support-gap-or-step": 12, "swept-forward:unsupported-footprint": 3} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 21240,
  "broad-supported-region": 11874,
  "roof-coverage": 117
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
    "support:column": 5096,
    "support:rejected": 2512,
    "support:node": 3100,
    "proposal:eligible": 1620,
    "proposal:direction-excluded": 10780,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 1236,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 18736,
    "prescreen:projection-start": 332,
    "prescreen:projection-blocked": 162,
    "prescreen:rejected": 324,
    "prescreen:support-edge-not-found": 52,
    "prescreen:body-sample": 304,
    "prescreen:passed": 8,
    "component:entry-search": 8,
    "component:node-visited": 2738,
    "edge:tested": 3856,
    "component:node-discovered": 2942,
    "route:candidate": 798,
    "topology:ray": 13832,
    "topology:node-feature": 1064,
    "topology:node-predicate": 22842,
    "topology:sustained-sample": 22842,
    "topology:broad-feature": 460,
    "topology:sustained-result": 806,
    "topology:route-rejected": 790,
    "topology:witness": 16,
    "topology:route-qualified": 8,
    "seam:swept-forward": 8,
    "seam:swept-reverse": 8,
    "route:seam-rejected": 8,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 162,
    "prescreen:entry-prism-proof": 166,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2548,
    "support:rejected": 1256,
    "support:node": 1550,
    "proposal:eligible": 810,
    "proposal:direction-excluded": 5390,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 618,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9368,
    "prescreen:projection-start": 166,
    "prescreen:entry-prism-blocked": 162,
    "prescreen:entry-prism-proof": 166,
    "prescreen:rejected": 162,
    "prescreen:support-edge-not-found": 26,
    "prescreen:body-sample": 152,
    "prescreen:passed": 4,
    "route:stream-admitted": 4,
    "route:scheduler-start": 1,
    "route:stream-resumed": 399,
    "component:entry-search": 4,
    "component:node-visited": 1369,
    "edge:tested": 1928,
    "component:node-discovered": 1471,
    "route:candidate": 399,
    "topology:ray": 6916,
    "topology:node-feature": 532,
    "topology:node-predicate": 11421,
    "topology:sustained-sample": 11421,
    "topology:broad-feature": 230,
    "topology:sustained-result": 403,
    "topology:route-rejected": 395,
    "route:stream-suspended": 395,
    "topology:witness": 8,
    "topology:route-qualified": 4,
    "seam:swept-forward": 4,
    "seam:swept-reverse": 4,
    "route:seam-rejected": 4,
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
    "seq": 12606,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 474,
    "triangle": [
      [
        -4.684231281280518,
        0.0351107120513916,
        -4.7974056005477905
      ],
      [
        -4.680753648281097,
        0.04320114850997925,
        -4.7959840297698975
      ],
      [
        -4.684474468231201,
        0.030726492404937744,
        -4.828590154647827
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.010580919682979584,
        0.18149175643920934
      ],
      [
        0.007103286683559418,
        0.18007018566131627
      ],
      [
        0.010824106633663177,
        0.21267631053924596
      ]
    ],
    "approach": {
      "seam": [
        -4.673650361597538,
        0.0640502369178535,
        -4.615913844108581
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
    "seq": 12607,
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
    "seq": 12703,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "320:2",
    "triangleId": 470484,
    "triangle": [
      [
        2.09780752658844,
        0.03340810537338257,
        -4.801271557807922
      ],
      [
        2.09687203168869,
        0.025497078895568848,
        -4.839172661304474
      ],
      [
        2.1358639001846313,
        0.03231912851333618,
        -4.801074862480164
      ]
    ],
    "clippedApproachCoordinates": [
      [
        1.886394168422347,
        -0.6
      ],
      [
        1.8549537688493727,
        -0.5678217649459842
      ],
      [
        1.8551200828696681,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        2.7036856651306156,
        5.467676391499164,
        -2.946121093630791
      ],
      "outward": [
        0,
        0,
        -1
      ],
      "width": 1.2,
      "length": 2.1697927504777907
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
    "seq": 12748,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1495:0",
    "triangleId": 32,
    "triangle": [
      [
        -4.687352478504181,
        0.016576647758483887,
        4.0034109354019165
      ],
      [
        -4.679811596870422,
        0.022665858268737793,
        4.001061022281647
      ],
      [
        -4.68761146068573,
        0.01680433750152588,
        3.964170217514038
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.02034834325313639,
        0.3806752204895023
      ],
      [
        0.012807461619377847,
        0.3830251336097721
      ],
      [
        0.020607325434685464,
        0.4199159383773807
      ]
    ],
    "approach": {
      "seam": [
        -4.6670041352510445,
        0.018326316445483597,
        4.384086155891419
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
    "seq": 12949,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "196:2",
    "eye": [
      0.10368566513061594,
      1.7904917805724803,
      -3.2159138441085817
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

### projection:wholly-above-player

```json
[
  {
    "seq": 13051,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "881:3",
    "triangleId": 598276,
    "triangle": [
      [
        3.496052324771881,
        3.460327200591564,
        0.6013486161828041
      ],
      [
        3.5152599215507507,
        3.47519064322114,
        0.5989998579025269
      ],
      [
        3.491758406162262,
        3.4661479364149272,
        0.5710316821932793
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.1027134781706181,
        0.6
      ],
      [
        0.10129814594984021,
        0.5884257435798652
      ],
      [
        0.08752410491839369,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        4.103685665130616,
        0.1562717909966508,
        0.49770171195268664
      ],
      "outward": [
        0,
        0,
        1
      ],
      "width": 1.2,
      "length": 4.616120009124279
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
    "seq": 16155,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 30,
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
          2.4047501258555797
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

### predicate:broad-supported-region

```json
[
  {
    "seq": 16412,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 283,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          4.299391340163347,
          0.8624633181634946,
          null,
          5.332628228565464
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
          "featureKey": "283:support",
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

### topology:enclosed-passage

```json
[
  {
    "seq": 16483,
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

### predicate:roof-coverage

```json
[
  {
    "seq": 28679,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 120,
    "nodeId": 30,
    "topology": "explicit-cover",
    "valid": false,
    "firstFailure": "roof-coverage",
    "checks": [
      {
        "name": "roof-coverage",
        "status": "failed",
        "measured": 0,
        "threshold": 9
      }
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
    "seq": 28718,
    "stage": "seam",
    "kind": "swept-forward",
    "proposalId": "30:2",
    "routeId": 120,
    "from": [
      3.3036856651306152,
      1.6594919079554138,
      -6.1990625888109205
    ],
    "target": [
      3.3036856651306152,
      1.7699067719891102,
      -4.615913844108581
    ],
    "movement": {
      "position": [
        3.3036856651306152,
        1.6690644083056685,
        -5.259068021643913
      ],
      "blocked": true,
      "reason": "support-gap-or-step",
      "support": {
        "valid": true,
        "eye": [
          3.3036856651306152,
          1.6690644083056685,
          -5.259068021643913
        ],
        "foot": [
          3.3036856651306152,
          0.019064408305668645,
          -5.259068021643913
        ],
        "supportTriangleIds": [
          -1,
          583016
        ],
        "supportSamples": [
          {
            "position": [
              3.3036856651306152,
              0.009491907955413811,
              -5.259068021643913
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              3.603685665130615,
              0.009491907955413811,
              -5.259068021643913
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              3.5158176994865795,
              0.009491907955413811,
              -5.04693598728795
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              3.3036856651306152,
              0.019064408305668645,
              -4.959068021643914
            ],
            "triangleId": 583016,
            "normalY": 0.9844636917114258
          },
          {
            "position": [
              3.091553630774651,
              0.009491907955413811,
              -5.04693598728795
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              3.0036856651306154,
              0.009491907955413811,
              -5.259068021643913
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              3.091553630774651,
              0.009491907955413811,
              -5.471200055999877
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              3.3036856651306152,
              0.009491907955413811,
              -5.559068021643913
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              3.5158176994865795,
              0.009491907955413811,
              -5.471200055999878
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
    "endpointDistance": 0.6431541775353322,
    "endpointTolerance": 1e-06,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### seam:unsupported-footprint

```json
[
  {
    "seq": 47427,
    "stage": "seam",
    "kind": "swept-forward",
    "proposalId": "15:2",
    "routeId": 288,
    "from": [
      -1.2963143348693844,
      1.7073229855735008,
      -6.210565739870071
    ],
    "target": [
      -1.2963143348693844,
      1.8099888667179178,
      -4.615913844108581
    ],
    "movement": {
      "position": [
        -1.2963143348693844,
        1.7188242749300802,
        -5.2637411767616795
      ],
      "blocked": true,
      "reason": "unsupported-footprint",
      "support": {
        "valid": true,
        "eye": [
          -1.2963143348693844,
          1.7188242749300802,
          -5.2637411767616795
        ],
        "foot": [
          -1.2963143348693844,
          0.06882427493008025,
          -5.2637411767616795
        ],
        "supportTriangleIds": [
          -1,
          888071
        ],
        "supportSamples": [
          {
            "position": [
              -1.2963143348693844,
              0.05732298557350092,
              -5.2637411767616795
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.9963143348693844,
              0.05732298557350092,
              -5.2637411767616795
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -1.0841823005134201,
              0.05732298557350092,
              -5.051609142405716
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -1.2963143348693844,
              0.06882427493008025,
              -4.96374117676168
            ],
            "triangleId": 888071,
            "normalY": 0.9739966988563538
          },
          {
            "position": [
              -1.5084463692253487,
              0.05732298557350092,
              -5.051609142405716
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -1.5963143348693845,
              0.05732298557350092,
              -5.2637411767616795
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -1.5084463692253487,
              0.05732298557350092,
              -5.475873211117643
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -1.2963143348693844,
              0.05732298557350092,
              -5.563741176761679
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -1.0841823005134201,
              0.05732298557350092,
              -5.475873211117644
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
    "endpointDistance": 0.6478273326530983,
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
    "seq": 71913,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 474,
    "triangle": [
      [
        -4.684231281280518,
        0.0351107120513916,
        -4.7974056005477905
      ],
      [
        -4.680753648281097,
        0.04320114850997925,
        -4.7959840297698975
      ],
      [
        -4.684474468231201,
        0.030726492404937744,
        -4.828590154647827
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.010580919682979584,
        0.18149175643920934,
        0.0351107120513916
      ],
      [
        0.007103286683559418,
        0.18007018566131627,
        0.04320114850997925
      ],
      [
        0.010824106633663177,
        0.21267631053924596,
        0.030726492404937744
      ]
    ],
    "approach": {
      "seam": [
        -4.673650361597538,
        0.0640502369178535,
        -4.615913844108581
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
      -0.1859497630821465,
      0.0790502369178535
    ],
    "bodyBand": [
      0.0790502369178535,
      1.8640502369178535
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
    "seq": 71915,
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
python3 scripts/diagnosis/trace-query.py walkway cave-1-7 --mode expanded --stage prescreen --limit 20
```

## legacy: passed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/cave-1-7/legacy.ndjson.gz`. SHA256 `5e403e43d537ff436ce1e042b9fe25b458c3f2e849da2b5c3b3cefe7aed157c8`; 93,920 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1550 valid sampled nodes; 2806 floor tests |
| Proposals | Returned pass: 228 eligible; 29 attempted. All trace passes: 180 omitted by selection; 19 selected but not attempted |
| Pre-screen | {"source-projection": 23}; passed 6 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 750 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 1041 candidate events. Returned pass: maximum connected displacement 5.8310m |
| Topology | {"enclosed-passage": 1035} |
| Final seam | {"swept-forward:support-gap-or-step": 3, "swept-reverse:support-gap-or-step": 5, "swept-forward:unsupported-footprint": 2, "swept-forward:passed": 1, "swept-reverse:passed": 1} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 19501,
  "broad-supported-region": 9057,
  "roof-coverage": 57
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
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2548,
    "support:rejected": 1256,
    "support:node": 1550,
    "proposal:legacy-body-sample": 4252,
    "proposal:eligible": 228,
    "proposal:direction-unexecuted": 363,
    "proposal:direction-excluded": 5609,
    "proposal:selected": 48,
    "proposal:omitted": 180,
    "budget:exhausted": 1,
    "proposal:attempt": 29,
    "prescreen:edge-support-probe": 1311,
    "prescreen:projection-start": 29,
    "prescreen:projection-blocked": 23,
    "prescreen:rejected": 23,
    "prescreen:body-sample": 236,
    "prescreen:passed": 6,
    "component:entry-search": 6,
    "component:node-visited": 1966,
    "edge:tested": 1935,
    "component:node-discovered": 2113,
    "route:candidate": 1041,
    "topology:ray": 7098,
    "topology:node-feature": 546,
    "topology:node-predicate": 29524,
    "topology:sustained-sample": 29524,
    "topology:broad-feature": 229,
    "topology:sustained-result": 1047,
    "topology:route-rejected": 1035,
    "topology:witness": 12,
    "topology:route-qualified": 6,
    "seam:swept-forward": 6,
    "seam:swept-reverse": 6,
    "route:seam-rejected": 5,
    "route:accepted": 1,
    "proposal:not-attempted": 19,
    "support:accepted-dense-sample": 100,
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
    "seq": 16084,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 474,
    "triangle": [
      [
        -4.684231281280518,
        0.0351107120513916,
        -4.7974056005477905
      ],
      [
        -4.680753648281097,
        0.04320114850997925,
        -4.7959840297698975
      ],
      [
        -4.684474468231201,
        0.030726492404937744,
        -4.828590154647827
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.010580919682979584,
        0.18149175643920934
      ],
      [
        0.007103286683559418,
        0.18007018566131627
      ],
      [
        0.010824106633663177,
        0.21267631053924596
      ]
    ],
    "approach": {
      "seam": [
        -4.673650361597538,
        0.0640502369178535,
        -4.615913844108581
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
    "seq": 16085,
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 16767,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 9,
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
          1.3671697981060225
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

### predicate:broad-supported-region

```json
[
  {
    "seq": 17072,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 195,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          1.3212626700284211,
          1.1097131525475632,
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
          "featureKey": "195:support",
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

### topology:enclosed-passage

```json
[
  {
    "seq": 17108,
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

### predicate:roof-coverage

```json
[
  {
    "seq": 42642,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 278,
    "nodeId": 9,
    "topology": "explicit-cover",
    "valid": false,
    "firstFailure": "roof-coverage",
    "checks": [
      {
        "name": "roof-coverage",
        "status": "failed",
        "measured": 0,
        "threshold": 9
      }
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
    "seq": 42693,
    "stage": "seam",
    "kind": "swept-forward",
    "proposalId": "9:2",
    "routeId": 278,
    "from": [
      -2.4963143348693846,
      1.6670071981395909,
      -6.209276129305363
    ],
    "target": [
      -2.4963143348693846,
      1.8085970846154016,
      -4.615913844108581
    ],
    "movement": {
      "position": [
        -2.4963143348693846,
        1.6850800737584484,
        -5.263217272469777
      ],
      "blocked": true,
      "reason": "support-gap-or-step",
      "support": {
        "valid": true,
        "eye": [
          -2.4963143348693846,
          1.6850800737584484,
          -5.263217272469777
        ],
        "foot": [
          -2.4963143348693846,
          0.0350800737584484,
          -5.263217272469777
        ],
        "supportTriangleIds": [
          -1,
          790017
        ],
        "supportSamples": [
          {
            "position": [
              -2.4963143348693846,
              0.017007198139590875,
              -5.263217272469777
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -2.1963143348693848,
              0.017007198139590875,
              -5.263217272469777
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -2.2841823005134203,
              0.017007198139590875,
              -5.051085238113814
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -2.4963143348693846,
              0.0350800737584484,
              -4.963217272469778
            ],
            "triangleId": 790017,
            "normalY": 0.9452142119407654
          },
          {
            "position": [
              -2.708446369225349,
              0.017007198139590875,
              -5.051085238113814
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -2.7963143348693844,
              0.017007198139590875,
              -5.263217272469777
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -2.708446369225349,
              0.017007198139590875,
              -5.475349306825741
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -2.4963143348693846,
              0.017007198139590875,
              -5.563217272469777
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -2.2841823005134203,
              0.017007198139590875,
              -5.475349306825742
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
    "endpointDistance": 0.6473034283611963,
    "endpointTolerance": 1e-06,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### seam:unsupported-footprint

```json
[
  {
    "seq": 62261,
    "stage": "seam",
    "kind": "swept-forward",
    "proposalId": "23:2",
    "routeId": 578,
    "from": [
      0.30368566513061523,
      1.7098195975831323,
      -6.21505350023508
    ],
    "target": [
      0.30368566513061523,
      1.8163674139477852,
      -4.615913844108581
    ],
    "movement": {
      "position": [
        0.30368566513061523,
        1.7250150903272012,
        -5.2655643294099646
      ],
      "blocked": true,
      "reason": "unsupported-footprint",
      "support": {
        "valid": true,
        "eye": [
          0.30368566513061523,
          1.7250150903272012,
          -5.2655643294099646
        ],
        "foot": [
          0.30368566513061523,
          0.07501509032720136,
          -5.2655643294099646
        ],
        "supportTriangleIds": [
          -1,
          972927
        ],
        "supportSamples": [
          {
            "position": [
              0.30368566513061523,
              0.05981959758313233,
              -5.2655643294099646
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.6036856651306153,
              0.05981959758313233,
              -5.2655643294099646
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.5158176994865795,
              0.05981959758313233,
              -5.053432295054001
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.30368566513061523,
              0.07501509032720136,
              -4.965564329409965
            ],
            "triangleId": 972927,
            "normalY": 0.9698231220245361
          },
          {
            "position": [
              0.09155363077465101,
              0.05981959758313233,
              -5.053432295054001
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.0036856651306152455,
              0.05981959758313233,
              -5.2655643294099646
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.09155363077465092,
              0.05981959758313233,
              -5.477696363765928
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.3036856651306152,
              0.05981959758313233,
              -5.565564329409964
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.5158176994865794,
              0.05981959758313233,
              -5.477696363765929
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
    "endpointDistance": 0.6496504853013834,
    "endpointTolerance": 1e-06,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 76277,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "42:2",
    "triangleId": 104260,
    "triangle": [
      [
        -3.1023338437080383,
        0.014792382717132568,
        -5.0038981437683105
      ],
      [
        -3.0999675393104553,
        0.023909807205200195,
        -4.983215630054474
      ],
      [
        -3.0672910809516907,
        0.014054179191589355,
        -5.006834864616394
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        0.02842523403516358
      ],
      [
        0.002432261407374625,
        0.029023253917694003
      ],
      [
        0.002,
        0.02386524444694731
      ]
    ],
    "approach": {
      "seam": [
        -3.0963143348693847,
        0.01466557655693021,
        -5.004402603209019
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py walkway cave-1-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
