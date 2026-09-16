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
  },
  "widthByTopology": {
    "doorway-crossing": 2.4
  }
}
```

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/chamber-1-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/chamber-1-7/expanded.ndjson.gz`. SHA256 `c55e560b4684564ed410f04b3f16154226b7bb81bf71d63e8db3f16f1a58ecc0`; 300,553 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1141 valid sampled nodes; 1921 floor tests |
| Proposals | Returned pass: 408 eligible; 192 attempted. All trace passes: 864 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 110, "support-edge-not-found": 284, "body-obstruction": 4, "entry-prism-blocked": 321, "source-entry-prism": 321}; passed 49 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 956 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 2415 candidate events. Returned pass: maximum connected displacement 6.2290m |
| Topology | {"enclosed-passage": 2392, "doorway-crossing": 20} |
| Final seam | {"swept-forward:support-gap-or-step": 3, "swept-reverse:support-gap-or-step": 3} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "broad-supported-region": 8475,
  "opposing-wall-width": 55331,
  "left-flank": 550,
  "right-flank": 108,
  "opposite-crossing-sides": 47,
  "region-does-not-widen": 4
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

Per-pass event counts (nested predecessor identity is retained in each complete trace event):

```json
{
  "single": {
    "result:begin": 1,
    "result:doorway-pass-start": 2,
    "result:doorway-pass-complete": 2,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 960,
    "support:rejected": 747,
    "support:node": 1141,
    "support:duplicate-layer": 33,
    "proposal:eligible": 408,
    "proposal:direction-excluded": 4156,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 216,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 10042,
    "prescreen:projection-start": 121,
    "prescreen:entry-prism-blocked": 107,
    "prescreen:entry-prism-proof": 121,
    "prescreen:rejected": 108,
    "prescreen:support-edge-not-found": 71,
    "prescreen:body-sample": 591,
    "prescreen:passed": 13,
    "route:stream-admitted": 13,
    "route:scheduler-start": 1,
    "route:stream-resumed": 623,
    "component:entry-search": 13,
    "component:node-visited": 3198,
    "edge:tested": 3595,
    "component:node-discovered": 3233,
    "route:candidate": 613,
    "topology:ray": 10076,
    "topology:node-feature": 664,
    "topology:node-predicate": 16432,
    "topology:sustained-sample": 16432,
    "topology:witness": 29,
    "topology:sustained-result": 616,
    "topology:aperture-axis": 705,
    "topology:route-rejected": 610,
    "route:stream-suspended": 610,
    "route:stream-complete": 10,
    "topology:aperture-wider-regions": 7,
    "topology:aperture-accepted": 3,
    "topology:route-qualified": 3,
    "seam:swept-forward": 3,
    "seam:swept-reverse": 3,
    "route:seam-rejected": 3,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:doorway-result": 1,
    "result:complete": 1
  },
  "predecessor": {
    "result:coverage-pass-start": 1,
    "result:entry-pass-start": 2,
    "result:assessment-start": 2,
    "support:grid": 2,
    "support:column": 1920,
    "support:rejected": 1494,
    "support:node": 2282,
    "support:duplicate-layer": 66,
    "proposal:eligible": 816,
    "proposal:direction-excluded": 8312,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 432,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 20084,
    "prescreen:projection-start": 242,
    "prescreen:projection-blocked": 110,
    "prescreen:rejected": 219,
    "prescreen:support-edge-not-found": 142,
    "prescreen:body-sample": 1048,
    "prescreen:passed": 23,
    "component:entry-search": 23,
    "component:node-visited": 5251,
    "edge:tested": 7334,
    "component:node-discovered": 5228,
    "route:candidate": 1060,
    "topology:ray": 20709,
    "topology:node-feature": 1593,
    "topology:broad-feature": 492,
    "topology:node-predicate": 27872,
    "topology:sustained-sample": 27872,
    "topology:sustained-result": 1060,
    "topology:route-rejected": 1060,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 107,
    "prescreen:entry-prism-proof": 121,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 960,
    "support:rejected": 747,
    "support:node": 1141,
    "support:duplicate-layer": 33,
    "proposal:eligible": 408,
    "proposal:direction-excluded": 4156,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 216,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 10042,
    "prescreen:projection-start": 121,
    "prescreen:entry-prism-blocked": 107,
    "prescreen:entry-prism-proof": 121,
    "prescreen:rejected": 108,
    "prescreen:support-edge-not-found": 71,
    "prescreen:body-sample": 591,
    "prescreen:passed": 13,
    "route:stream-admitted": 13,
    "route:scheduler-start": 1,
    "route:stream-resumed": 755,
    "component:entry-search": 13,
    "component:node-visited": 3533,
    "edge:tested": 3667,
    "component:node-discovered": 3520,
    "route:candidate": 742,
    "topology:ray": 10868,
    "topology:node-feature": 836,
    "topology:broad-feature": 246,
    "topology:node-predicate": 19823,
    "topology:sustained-sample": 19823,
    "topology:sustained-result": 742,
    "topology:route-rejected": 742,
    "route:stream-suspended": 742,
    "route:stream-complete": 13,
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
    "seq": 8096,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 8097,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 8141,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 8231,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 8340,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### predicate:broad-supported-region

```json
[
  {
    "seq": 8620,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 8878,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 10248,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### predicate:opposing-wall-width

```json
[
  {
    "seq": 12684,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### prescreen:body-obstruction

```json
[
  {
    "seq": 50561,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 62260,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 67096,
    "triangle": [
      [
        -2.800736367702484,
        3.8936349749565125,
        -2.8671305179595947
      ],
      [
        -2.8007871508598328,
        3.9200153946876526,
        -2.868630051612854
      ],
      [
        -2.800990641117096,
        3.91959285736084,
        -2.896283447742462
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.002,
        0.28474715705957054,
        3.9196998615352885
      ],
      [
        0.00205153226852417,
        0.29175015687942496,
        3.91959285736084
      ],
      [
        0.002,
        0.2858418844470494,
        3.914332108538865
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
    "supportBand": [
      3.7244010648382986,
      3.9894010648382987
    ],
    "bodyBand": [
      3.9894010648382987,
      5.774401064838298
    ],
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "entry-prism",
    "scopePass": "conservative-predecessor"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 62262,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism",
    "scopePass": "conservative-predecessor"
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 243303,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 1111,
    "routeIndex": 1,
    "axis": [
      1,
      0,
      0
    ],
    "left": null,
    "right": null,
    "minimumWidth": 2.4,
    "rayMaximum": 3,
    "firstFailure": "left-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "scopePass": "scoped-coverage"
  }
]
```

### predicate:right-flank

```json
[
  {
    "seq": 243306,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 1111,
    "routeIndex": 1,
    "axis": [
      0,
      0,
      1
    ],
    "left": {
      "id": 921585,
      "distance": 1.875012248995982
    },
    "right": null,
    "minimumWidth": 2.4,
    "rayMaximum": 3,
    "firstFailure": "right-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "scopePass": "scoped-coverage"
  }
]
```

### predicate:opposite-crossing-sides

```json
[
  {
    "seq": 243324,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 1117,
    "routeIndex": 4,
    "axis": [
      0,
      0,
      1
    ],
    "before": -1,
    "after": -1,
    "beforeSigned": null,
    "afterSigned": null,
    "minimumSignedMagnitude": 0.8,
    "firstFailure": "opposite-crossing-sides",
    "unexecuted": [
      "wider-regions"
    ],
    "scopePass": "scoped-coverage"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 243511,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [
      "enclosed-passage"
    ],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "scopePass": "scoped-coverage"
  }
]
```

### predicate:region-does-not-widen

```json
[
  {
    "seq": 250819,
    "stage": "topology",
    "kind": "aperture-wider-regions",
    "routeId": 7,
    "nodeId": 759,
    "routeIndex": 4,
    "axis": [
      0,
      0,
      1
    ],
    "valid": false,
    "sideObservations": [
      {
        "routeIndex": 0,
        "nodeId": 953,
        "left": {
          "id": 880320,
          "distance": 2.545509463361304
        },
        "right": {
          "id": 782603,
          "distance": 2.977927071670366
        },
        "minimumCombinedDistance": 6.026543633260847,
        "valid": false
      }
    ],
    "unexecutedSides": [
      "after"
    ],
    "firstFailure": "region-does-not-widen",
    "scopePass": "scoped-coverage"
  }
]
```

### seam:support-gap-or-step

```json
[
  {
    "seq": 250869,
    "stage": "seam",
    "kind": "swept-forward",
    "proposalId": "953:3",
    "routeId": 7,
    "from": [
      -0.21155693531036368,
      1.6622045410264195,
      4.19955299794674
    ],
    "target": [
      -0.21155693531036368,
      1.8223539047778035,
      1.7954667091369636
    ],
    "movement": {
      "position": [
        -0.21155693531036368,
        1.6639907116143238,
        3.2182932882284634
      ],
      "blocked": true,
      "reason": "support-gap-or-step",
      "support": {
        "valid": true,
        "eye": [
          -0.21155693531036368,
          1.6639907116143238,
          3.2182932882284634
        ],
        "foot": [
          -0.21155693531036368,
          0.013990711614323869,
          3.2182932882284634
        ],
        "supportTriangleIds": [
          -1,
          1232991
        ],
        "supportSamples": [
          {
            "position": [
              -0.21155693531036368,
              0.012204541026419522,
              3.2182932882284634
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.08844306468963631,
              0.012204541026419522,
              3.2182932882284634
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.0005750990456005745,
              0.012204541026419522,
              3.4304253225844277
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.21155693531036365,
              0.012204541026419522,
              3.518293288228463
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.4236889696663279,
              0.012204541026419522,
              3.4304253225844277
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.5115569353103637,
              0.012204541026419522,
              3.2182932882284634
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.42368896966632796,
              0.012204541026419522,
              3.006161253872499
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              -0.21155693531036374,
              0.013990711614323869,
              2.9182932882284636
            ],
            "triangleId": 1232991,
            "normalY": 0.9997240304946899
          },
          {
            "position": [
              0.0005750990456005189,
              0.012204541026419522,
              3.006161253872499
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
    "endpointDistance": 1.4228265790914998,
    "endpointTolerance": 1e-06,
    "scopePass": "scoped-coverage"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope chamber-1-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/chamber-1-7/legacy.ndjson.gz`. SHA256 `4ac2d693ec41d17b29b0456fe66c016d549f2c44cb3247abe387739149d5c7ca`; 60,470 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1141 valid sampled nodes; 1921 floor tests |
| Proposals | Returned pass: 185 eligible; 48 attempted. All trace passes: 548 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 40, "entry-prism-blocked": 120, "source-entry-prism": 120}; passed 32 |
| Components | Returned pass: 4 reached-entry discoveries. All passes: 37 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 8 candidate events. Returned pass: maximum connected displacement 3.2000m |
| Topology | {"enclosed-passage": 6, "doorway-crossing": 2} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "broad-supported-region": 99,
  "left-flank": 39,
  "opposite-crossing-sides": 6,
  "right-flank": 13
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

Per-pass event counts (nested predecessor identity is retained in each complete trace event):

```json
{
  "single": {
    "result:begin": 1,
    "result:doorway-pass-start": 2,
    "result:doorway-pass-complete": 2,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 960,
    "support:rejected": 747,
    "support:node": 1141,
    "support:duplicate-layer": 33,
    "proposal:legacy-body-sample": 4018,
    "proposal:eligible": 185,
    "proposal:direction-unexecuted": 255,
    "proposal:direction-excluded": 4124,
    "proposal:selected": 48,
    "proposal:omitted": 137,
    "budget:exhausted": 1,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2161,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 40,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 40,
    "prescreen:body-sample": 332,
    "prescreen:passed": 8,
    "route:stream-admitted": 8,
    "route:scheduler-start": 1,
    "route:stream-resumed": 10,
    "component:entry-search": 8,
    "component:node-visited": 91,
    "edge:tested": 199,
    "component:node-discovered": 83,
    "route:stream-complete": 8,
    "route:candidate": 2,
    "topology:ray": 324,
    "topology:node-feature": 16,
    "topology:node-predicate": 12,
    "topology:sustained-sample": 12,
    "topology:witness": 2,
    "topology:sustained-result": 2,
    "topology:aperture-axis": 58,
    "topology:route-rejected": 2,
    "route:stream-suspended": 2,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:doorway-result": 1,
    "result:complete": 1
  },
  "predecessor": {
    "result:coverage-pass-start": 1,
    "result:entry-pass-start": 2,
    "result:assessment-start": 2,
    "support:grid": 2,
    "support:column": 1920,
    "support:rejected": 1494,
    "support:node": 2282,
    "support:duplicate-layer": 66,
    "proposal:legacy-body-sample": 8036,
    "proposal:eligible": 370,
    "proposal:direction-unexecuted": 510,
    "proposal:direction-excluded": 8248,
    "proposal:selected": 96,
    "proposal:omitted": 274,
    "budget:exhausted": 2,
    "proposal:attempt": 96,
    "prescreen:edge-support-probe": 4322,
    "prescreen:projection-start": 96,
    "prescreen:projection-blocked": 40,
    "prescreen:rejected": 80,
    "prescreen:body-sample": 664,
    "prescreen:passed": 16,
    "component:entry-search": 16,
    "component:node-visited": 182,
    "edge:tested": 398,
    "component:node-discovered": 166,
    "route:candidate": 4,
    "topology:ray": 442,
    "topology:node-feature": 34,
    "topology:broad-feature": 34,
    "topology:node-predicate": 66,
    "topology:sustained-sample": 66,
    "topology:sustained-result": 4,
    "topology:route-rejected": 4,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 40,
    "prescreen:entry-prism-proof": 48,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 960,
    "support:rejected": 747,
    "support:node": 1141,
    "support:duplicate-layer": 33,
    "proposal:legacy-body-sample": 4018,
    "proposal:eligible": 185,
    "proposal:direction-unexecuted": 255,
    "proposal:direction-excluded": 4124,
    "proposal:selected": 48,
    "proposal:omitted": 137,
    "budget:exhausted": 1,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2161,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 40,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 40,
    "prescreen:body-sample": 332,
    "prescreen:passed": 8,
    "route:stream-admitted": 8,
    "route:scheduler-start": 1,
    "route:stream-resumed": 10,
    "component:entry-search": 8,
    "component:node-visited": 91,
    "edge:tested": 199,
    "component:node-discovered": 83,
    "route:stream-complete": 8,
    "route:candidate": 2,
    "topology:ray": 221,
    "topology:node-feature": 17,
    "topology:broad-feature": 17,
    "topology:node-predicate": 33,
    "topology:sustained-sample": 33,
    "topology:sustained-result": 2,
    "topology:route-rejected": 2,
    "route:stream-suspended": 2,
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
    "seq": 11699,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 11700,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 12511,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### predicate:broad-supported-region

```json
[
  {
    "seq": 14680,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 14938,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 15038,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline",
    "scopePass": "conservative-predecessor"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 26738,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 67096,
    "triangle": [
      [
        -2.800736367702484,
        3.8936349749565125,
        -2.8671305179595947
      ],
      [
        -2.8007871508598328,
        3.9200153946876526,
        -2.868630051612854
      ],
      [
        -2.800990641117096,
        3.91959285736084,
        -2.896283447742462
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.002,
        0.28474715705957054,
        3.9196998615352885
      ],
      [
        0.00205153226852417,
        0.29175015687942496,
        3.91959285736084
      ],
      [
        0.002,
        0.2858418844470494,
        3.914332108538865
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
    "supportBand": [
      3.7244010648382986,
      3.9894010648382987
    ],
    "bodyBand": [
      3.9894010648382987,
      5.774401064838298
    ],
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "entry-prism",
    "scopePass": "conservative-predecessor"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 26740,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism",
    "scopePass": "conservative-predecessor"
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 60129,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 1131,
    "routeIndex": 1,
    "axis": [
      1,
      0,
      0
    ],
    "left": null,
    "right": null,
    "minimumWidth": 2.4,
    "rayMaximum": 3,
    "firstFailure": "left-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "scopePass": "scoped-coverage"
  }
]
```

### predicate:opposite-crossing-sides

```json
[
  {
    "seq": 60176,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 1121,
    "routeIndex": 6,
    "axis": [
      0,
      0,
      1
    ],
    "before": -1,
    "after": -1,
    "beforeSigned": null,
    "afterSigned": null,
    "minimumSignedMagnitude": 0.8,
    "firstFailure": "opposite-crossing-sides",
    "unexecuted": [
      "wider-regions"
    ],
    "scopePass": "scoped-coverage"
  }
]
```

### predicate:right-flank

```json
[
  {
    "seq": 60236,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 1115,
    "routeIndex": 9,
    "axis": [
      0,
      0,
      1
    ],
    "left": {
      "id": 921585,
      "distance": 2.2751516991070626
    },
    "right": null,
    "minimumWidth": 2.4,
    "rayMaximum": 3,
    "firstFailure": "right-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "scopePass": "scoped-coverage"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 60337,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [
      "enclosed-passage"
    ],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "scopePass": "scoped-coverage"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope chamber-1-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
