# chamber-2-7: failed

A quiet rectangular meditation chamber, wide entrance, plain walls, tall ceiling and an uninterrupted flat floor without furniture.

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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/chamber-2-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/chamber-2-7/expanded.ndjson.gz`. SHA256 `b80c4b528d17f747c2903293318034c33b2348b6c55d0431062f2da5338dfff5`; 601,757 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1401 valid sampled nodes; 1688 floor tests |
| Proposals | Returned pass: 256 eligible; 192 attempted. All trace passes: 192 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 176, "support-edge-not-found": 48, "entry-prism-blocked": 318, "source-entry-prism": 318}; passed 34 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 729 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 7636 candidate events. Returned pass: maximum connected displacement 6.8118m |
| Topology | {"enclosed-passage": 7636} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 219228
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
    "support:rejected": 574,
    "support:node": 2802,
    "proposal:eligible": 512,
    "proposal:direction-excluded": 10696,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 128,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 16656,
    "prescreen:projection-start": 352,
    "prescreen:projection-blocked": 176,
    "prescreen:rejected": 335,
    "prescreen:support-edge-not-found": 32,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 159,
    "prescreen:entry-prism-proof": 176,
    "prescreen:body-sample": 646,
    "prescreen:passed": 17,
    "component:entry-search": 17,
    "component:node-visited": 12393,
    "edge:tested": 3984,
    "component:node-discovered": 12376,
    "route:candidate": 3818,
    "topology:ray": 9308,
    "topology:node-feature": 716,
    "topology:node-predicate": 109614,
    "topology:sustained-sample": 109614,
    "topology:sustained-result": 3818,
    "topology:route-rejected": 3818,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 287,
    "support:node": 1401,
    "proposal:eligible": 256,
    "proposal:direction-excluded": 5348,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 64,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 8328,
    "prescreen:projection-start": 176,
    "prescreen:entry-prism-blocked": 159,
    "prescreen:entry-prism-proof": 176,
    "prescreen:rejected": 159,
    "prescreen:body-sample": 646,
    "prescreen:passed": 17,
    "route:stream-admitted": 17,
    "prescreen:support-edge-not-found": 16,
    "route:scheduler-start": 1,
    "route:stream-resumed": 3835,
    "component:entry-search": 17,
    "component:node-visited": 12393,
    "edge:tested": 3984,
    "component:node-discovered": 12376,
    "route:candidate": 3818,
    "topology:ray": 9308,
    "topology:node-feature": 716,
    "topology:node-predicate": 109614,
    "topology:sustained-sample": 109614,
    "topology:sustained-result": 3818,
    "topology:route-rejected": 3818,
    "route:stream-suspended": 3818,
    "route:stream-complete": 17,
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
    "seq": 8813,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 122990,
    "triangle": [
      [
        -2.9945247173309326,
        0.008334338665008545,
        -2.8026997447013855
      ],
      [
        -2.996853768825531,
        0.02947211265563965,
        -2.803108513355255
      ],
      [
        -2.997141480445862,
        0.02927255630493164,
        -2.8265649676322937
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.024725776910781594,
        0.1964652180671691
      ],
      [
        0.027054828405379983,
        0.19687398672103873
      ],
      [
        0.027342540025710793,
        0.2203304409980773
      ]
    ],
    "approach": {
      "seam": [
        -2.969798940420151,
        5.975111871178145,
        -2.6062345266342164
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
    "seq": 8814,
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
    "seq": 8856,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1400:1",
    "triangleId": 665622,
    "triangle": [
      [
        2.899148941040039,
        0.003957867622375488,
        2.2137290239334106
      ],
      [
        2.899125337600708,
        0.003958940505981445,
        2.18997985124588
      ],
      [
        2.9255189895629883,
        0.004000067710876465,
        2.214347541332245
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.3885513731803238
      ],
      [
        0.011892807483672385,
        -0.37941793203353935
      ],
      [
        0.002,
        -0.3796499708008038
      ]
    ],
    "approach": {
      "seam": [
        2.913626182079316,
        0.0957133927297884,
        2.5937654733657842
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
    "seq": 9190,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "894:2",
    "eye": [
      -0.0004620552062988281,
      1.7176774537061394,
      0.793765473365784
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
    "seq": 9638,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "39:2",
    "triangleId": 462746,
    "triangle": [
      [
        0.578493744134903,
        5.973802328109741,
        -2.9193279147148132
      ],
      [
        0.5787417590618134,
        5.9743616580963135,
        -2.950880527496338
      ],
      [
        0.6021788567304611,
        5.974307477474213,
        -2.9508912563323975
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.006633542027959294,
        -0.6
      ],
      [
        0.0066347509622572964,
        -0.5973590880632402
      ],
      [
        0.0031154092109524746,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        1.1995379447937013,
        0.06482637279038911,
        -2.94425650537014
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
    "seq": 11270,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "161:1",
    "triangleId": 666724,
    "triangle": [
      [
        2.9226112961769104,
        0.08776992559432983,
        -2.8014761209487915
      ],
      [
        2.9335577487945557,
        0.10445183515548706,
        -2.8008495569229126
      ],
      [
        2.9273248314857483,
        0.0873461365699768,
        -2.826338768005371
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.001999999999999999,
        -0.5948934820410312
      ],
      [
        0.006864720582961503,
        -0.5946150302886961
      ],
      [
        0.0055479253784175755,
        -0.6
      ],
      [
        0.0019999999999999996,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        2.926693028211594,
        0.07573289582479849,
        -2.2062345266342165
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

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 26647,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 123476,
    "triangle": [
      [
        -2.9751094579696655,
        5.704185962677002,
        -2.7968859672546387
      ],
      [
        -2.974313735961914,
        5.727400124073029,
        -2.797065317630768
      ],
      [
        -2.9752696752548218,
        5.727469861507416,
        -2.82044380903244
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.004593230991430916,
        0.1908131121749746,
        5.725111871178145
      ],
      [
        0.004514795541763039,
        0.19083079099655142,
        5.727400124073029
      ],
      [
        0.005470734834670754,
        0.2142092823982238,
        5.727469861507416
      ],
      [
        0.005454509424496449,
        0.21182354951494942,
        5.725111871178145
      ]
    ],
    "approach": {
      "seam": [
        -2.969798940420151,
        5.975111871178145,
        -2.6062345266342164
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
      5.725111871178145,
      5.9901118711781445
    ],
    "bodyBand": [
      5.9901118711781445,
      7.775111871178145
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
    "seq": 26649,
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 28682,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1023,
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
    "predecessorPass": "entry-prism"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 28941,
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
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope chamber-2-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/chamber-2-7/legacy.ndjson.gz`. SHA256 `8f92aa601ecc616a3b1a206971888dc34cd7ae9d46104980be458db49619e580`; 569,884 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1401 valid sampled nodes; 1688 floor tests |
| Proposals | Returned pass: 200 eligible; 48 attempted. All trace passes: 456 omitted by selection; 14 selected but not attempted |
| Pre-screen | {"source-projection": 48, "entry-prism-blocked": 58, "source-entry-prism": 58}; passed 24 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 729 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 8192 candidate events. Returned pass: maximum connected displacement 5.2612m |
| Topology | {"enclosed-passage": 8192} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 215062
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
    "support:rejected": 574,
    "support:node": 2802,
    "proposal:legacy-body-sample": 9388,
    "proposal:eligible": 400,
    "proposal:direction-unexecuted": 632,
    "proposal:direction-excluded": 10176,
    "proposal:selected": 96,
    "proposal:omitted": 304,
    "budget:exhausted": 3,
    "proposal:attempt": 82,
    "prescreen:edge-support-probe": 3772,
    "prescreen:projection-start": 82,
    "prescreen:projection-blocked": 48,
    "prescreen:rejected": 72,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 24,
    "prescreen:entry-prism-proof": 34,
    "prescreen:body-sample": 404,
    "prescreen:passed": 10,
    "component:entry-search": 10,
    "component:node-visited": 7238,
    "edge:tested": 3984,
    "component:node-discovered": 7237,
    "route:candidate": 4096,
    "topology:ray": 9477,
    "topology:node-feature": 729,
    "topology:node-predicate": 113942,
    "topology:sustained-sample": 113942,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "route:candidate-not-executed": 1,
    "proposal:not-attempted": 14,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 287,
    "support:node": 1401,
    "proposal:legacy-body-sample": 4694,
    "proposal:eligible": 200,
    "proposal:direction-unexecuted": 316,
    "proposal:direction-excluded": 5088,
    "proposal:selected": 48,
    "proposal:omitted": 152,
    "budget:exhausted": 2,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2204,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 34,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 34,
    "prescreen:body-sample": 564,
    "prescreen:passed": 14,
    "route:stream-admitted": 14,
    "route:scheduler-start": 1,
    "route:stream-resumed": 4096,
    "component:entry-search": 14,
    "component:node-visited": 8331,
    "edge:tested": 3984,
    "component:node-discovered": 8561,
    "route:candidate": 4096,
    "topology:ray": 9477,
    "topology:node-feature": 729,
    "topology:node-predicate": 101120,
    "topology:sustained-sample": 101120,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "route:stream-suspended": 4096,
    "route:stream-unexecuted": 14,
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
    "seq": 13259,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 122990,
    "triangle": [
      [
        -2.9945247173309326,
        0.008334338665008545,
        -2.8026997447013855
      ],
      [
        -2.996853768825531,
        0.02947211265563965,
        -2.803108513355255
      ],
      [
        -2.997141480445862,
        0.02927255630493164,
        -2.8265649676322937
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.024725776910781594,
        0.1964652180671691
      ],
      [
        0.027054828405379983,
        0.19687398672103873
      ],
      [
        0.027342540025710793,
        0.2203304409980773
      ]
    ],
    "approach": {
      "seam": [
        -2.969798940420151,
        5.975111871178145,
        -2.6062345266342164
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
    "seq": 13260,
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
    "seq": 13305,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "8:2",
    "triangleId": 180299,
    "triangle": [
      [
        -2.3995699882507324,
        5.955521643161774,
        -2.9927122592926025
      ],
      [
        -2.4239602088928223,
        5.97637939453125,
        -2.9953486919403076
      ],
      [
        -2.400006651878357,
        5.976252794265747,
        -2.9952208399772644
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0027863714449372274,
        -0.6
      ],
      [
        0.0027839407324790066,
        -0.5995445966720583
      ],
      [
        0.002,
        -0.5994081376750725
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -1.8004620552062987,
        5.987887708340912,
        -2.9924368992447854
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

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 28871,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 123476,
    "triangle": [
      [
        -2.9751094579696655,
        5.704185962677002,
        -2.7968859672546387
      ],
      [
        -2.974313735961914,
        5.727400124073029,
        -2.797065317630768
      ],
      [
        -2.9752696752548218,
        5.727469861507416,
        -2.82044380903244
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.004593230991430916,
        0.1908131121749746,
        5.725111871178145
      ],
      [
        0.004514795541763039,
        0.19083079099655142,
        5.727400124073029
      ],
      [
        0.005470734834670754,
        0.2142092823982238,
        5.727469861507416
      ],
      [
        0.005454509424496449,
        0.21182354951494942,
        5.725111871178145
      ]
    ],
    "approach": {
      "seam": [
        -2.969798940420151,
        5.975111871178145,
        -2.6062345266342164
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
      5.725111871178145,
      5.9901118711781445
    ],
    "bodyBand": [
      5.9901118711781445,
      7.775111871178145
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
    "seq": 28873,
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 31653,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 434,
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
    "predecessorPass": "entry-prism"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 31896,
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
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope chamber-2-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
