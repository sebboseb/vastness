# corridor-2-7: failed

An empty covered walkway between brick walls, broad straight path, low arched ceiling and flat continuous paving.

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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/corridor-2-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/corridor-2-7/expanded.ndjson.gz`. SHA256 `b68f5e2065c6fca706be9f381e06b5f79e226273c7a3306d4ed54af521d63ed5`; 1,071,604 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1581 valid sampled nodes; 2420 floor tests |
| Proposals | Returned pass: 408 eligible; 192 attempted. All trace passes: 648 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 146, "support-edge-not-found": 105, "entry-prism-blocked": 278, "source-entry-prism": 278, "body-obstruction": 6}; passed 41 |
| Components | Returned pass: 7 reached-entry discoveries. All passes: 1552 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 11479 candidate events. Returned pass: maximum connected displacement 10.0319m |
| Topology | {"enclosed-passage": 11479} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 363952,
  "broad-supported-region": 45371
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
    "support:column": 2600,
    "support:rejected": 1678,
    "support:node": 3162,
    "proposal:eligible": 816,
    "proposal:direction-excluded": 11832,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 432,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 18810,
    "prescreen:projection-start": 314,
    "prescreen:projection-blocked": 146,
    "prescreen:rejected": 288,
    "prescreen:support-edge-not-found": 70,
    "prescreen:body-sample": 1055,
    "prescreen:passed": 26,
    "component:entry-search": 26,
    "component:node-visited": 21118,
    "edge:tested": 10730,
    "component:node-discovered": 21092,
    "route:candidate": 7416,
    "topology:ray": 39325,
    "topology:node-feature": 3025,
    "topology:node-predicate": 265475,
    "topology:sustained-sample": 265475,
    "topology:sustained-result": 7416,
    "topology:route-rejected": 7416,
    "topology:broad-feature": 436,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 139,
    "prescreen:entry-prism-proof": 157,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1300,
    "support:rejected": 839,
    "support:node": 1581,
    "proposal:eligible": 408,
    "proposal:direction-excluded": 5916,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 216,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9405,
    "prescreen:projection-start": 157,
    "prescreen:entry-prism-blocked": 139,
    "prescreen:entry-prism-proof": 157,
    "prescreen:rejected": 142,
    "prescreen:support-edge-not-found": 35,
    "prescreen:body-sample": 609,
    "prescreen:passed": 15,
    "route:stream-admitted": 15,
    "route:scheduler-start": 1,
    "route:stream-resumed": 4078,
    "component:entry-search": 15,
    "component:node-visited": 11797,
    "edge:tested": 5365,
    "component:node-discovered": 11782,
    "route:candidate": 4063,
    "topology:ray": 19708,
    "topology:node-feature": 1516,
    "topology:node-predicate": 143848,
    "topology:sustained-sample": 143848,
    "topology:broad-feature": 219,
    "topology:sustained-result": 4063,
    "topology:route-rejected": 4063,
    "route:stream-suspended": 4063,
    "route:stream-complete": 15,
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
    "seq": 10692,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 32126,
    "triangle": [
      [
        -2.327755242586136,
        0.011496245861053467,
        -4.784606099128723
      ],
      [
        -2.3313099145889282,
        0.027097314596176147,
        -4.783117771148682
      ],
      [
        -2.3276598751544952,
        0.011191517114639282,
        -4.8299440741539
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.00233540534973109,
        0.17649271488189733
      ],
      [
        0.0058900773525234484,
        0.17500438690185582
      ],
      [
        0.002240037918090465,
        0.22183068990707433
      ]
    ],
    "approach": {
      "seam": [
        -2.3254198372364048,
        4.16728474449925,
        -4.608113384246826
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
    "seq": 10693,
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
    "seq": 10735,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1548:1",
    "triangleId": 324730,
    "triangle": [
      [
        2.2998046875,
        0.0023712217807769775,
        4.027232825756073
      ],
      [
        2.30092316865921,
        0.0023721158504486084,
        3.9861658215522766
      ],
      [
        2.3422248661518097,
        0.0023891031742095947,
        3.986358642578125
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.405536747503375
      ],
      [
        0.003879435360431227,
        -0.4055279731750492
      ],
      [
        0.002,
        -0.40371703348467375
      ]
    ],
    "approach": {
      "seam": [
        2.3383454307913785,
        0.10953588912936993,
        4.391886615753174
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
    "seq": 10888,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "776:1",
    "eye": [
      -1.9865951597690583,
      1.664831430875541,
      -0.008113384246826172
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

### projection:wholly-above-player

```json
[
  {
    "seq": 11116,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1516:0",
    "triangleId": 114,
    "triangle": [
      [
        -2.3275743424892426,
        2.237752601504326,
        3.988114595413208
      ],
      [
        -2.3275786638259888,
        2.239028848707676,
        3.9877820014953613
      ],
      [
        -2.3275762796401978,
        2.237765034660697,
        3.988078534603119
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.1488275200128557,
        0.4037720203399662
      ],
      [
        0.14883184134960192,
        0.40410461425781286
      ],
      [
        0.1488294571638109,
        0.4038080811500553
      ]
    ],
    "approach": {
      "seam": [
        -2.178746822476387,
        0.10990371544077257,
        4.391886615753174
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 12945,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1367,
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
    "seq": 13188,
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
    "seq": 54006,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 328,
    "nodeId": 10,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          0.8022508464972223,
          1.9486899664679767,
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
          "featureKey": "10:support",
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
    "seq": 81051,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "157:0",
    "triangleId": 27846,
    "triangle": [
      [
        -2.326945662498474,
        0.01174822449684143,
        -3.993394374847412
      ],
      [
        -2.3301705718040466,
        0.027551203966140747,
        -3.9928364753723145
      ],
      [
        -2.3273859918117523,
        0.012022554874420166,
        -4.027610123157501
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.938914629817009,
        0.3852809906005863
      ],
      [
        0.9421395391225815,
        0.38472309112548864
      ],
      [
        0.9393549591302872,
        0.4194967389106754
      ]
    ],
    "approach": {
      "seam": [
        -1.388031032681465,
        0.014289988334604473,
        -3.608113384246826
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
    "seq": 330543,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 32326,
    "triangle": [
      [
        -2.3312510550022125,
        3.9123569428920746,
        -4.779393672943115
      ],
      [
        -2.3313452303409576,
        3.9534029364585876,
        -4.7800639271736145
      ],
      [
        -2.331889569759369,
        3.9542241394519806,
        -4.824557304382324
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.005842524043115241,
        0.17136075647370888,
        3.9172847444992502
      ],
      [
        0.005925393104552867,
        0.17195054292678869,
        3.9534029364585876
      ],
      [
        0.006469732522964122,
        0.2164439201354984,
        3.9542241394519806
      ],
      [
        0.0059063714494803216,
        0.1765960832533378,
        3.9172847444992502
      ]
    ],
    "approach": {
      "seam": [
        -2.3254198372364048,
        4.16728474449925,
        -4.608113384246826
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
      3.9172847444992502,
      4.18228474449925
    ],
    "bodyBand": [
      4.18228474449925,
      5.96728474449925
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
    "seq": 330545,
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

### prescreen:body-obstruction

```json
[
  {
    "seq": 488578,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "802:1",
    "firstFailure": "body-obstruction",
    "triangleId": 255378,
    "triangle": [
      [
        1.463109403848648,
        1.8044096603989601,
        0.023397146724164486
      ],
      [
        1.458979845046997,
        1.827913299202919,
        0.023144138976931572
      ],
      [
        1.4591027796268463,
        1.8281273171305656,
        -0.015449329512193799
      ]
    ],
    "position": [
      1.163404840230942,
      0.03236574621421151,
      -0.008113384246826172
    ],
    "unexecuted": [
      "remaining-body-samples",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope corridor-2-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/corridor-2-7/legacy.ndjson.gz`. SHA256 `0da13df85cda8853f8692bb5ed4f484f39b99e6ad4f951ad2e6cd3d20581975d`; 702,592 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1581 valid sampled nodes; 2420 floor tests |
| Proposals | Returned pass: 321 eligible; 48 attempted. All trace passes: 819 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 43, "entry-prism-blocked": 84, "source-entry-prism": 84}; passed 17 |
| Components | Returned pass: 5 reached-entry discoveries. All passes: 1553 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 7394 candidate events. Returned pass: maximum connected displacement 9.7693m |
| Topology | {"enclosed-passage": 7394} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "broad-supported-region": 45874,
  "opposing-wall-width": 213143
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
    "support:column": 2600,
    "support:rejected": 1678,
    "support:node": 3162,
    "proposal:legacy-body-sample": 12068,
    "proposal:eligible": 642,
    "proposal:direction-unexecuted": 1152,
    "proposal:direction-excluded": 10854,
    "proposal:selected": 96,
    "proposal:omitted": 546,
    "budget:exhausted": 2,
    "proposal:attempt": 96,
    "prescreen:edge-support-probe": 4260,
    "prescreen:projection-start": 96,
    "prescreen:projection-blocked": 43,
    "prescreen:rejected": 85,
    "prescreen:body-sample": 441,
    "prescreen:passed": 11,
    "component:entry-search": 11,
    "component:node-visited": 6829,
    "edge:tested": 10730,
    "component:node-discovered": 6818,
    "route:candidate": 4811,
    "topology:ray": 38610,
    "topology:node-feature": 2970,
    "topology:broad-feature": 450,
    "topology:node-predicate": 169268,
    "topology:sustained-sample": 169268,
    "topology:sustained-result": 4811,
    "topology:route-rejected": 4811,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 42,
    "prescreen:entry-prism-proof": 48,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1300,
    "support:rejected": 839,
    "support:node": 1581,
    "proposal:legacy-body-sample": 6034,
    "proposal:eligible": 321,
    "proposal:direction-unexecuted": 576,
    "proposal:direction-excluded": 5427,
    "proposal:selected": 48,
    "proposal:omitted": 273,
    "budget:exhausted": 1,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2130,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 42,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 42,
    "prescreen:body-sample": 239,
    "prescreen:passed": 6,
    "route:stream-admitted": 6,
    "route:scheduler-start": 1,
    "route:stream-resumed": 2589,
    "component:entry-search": 6,
    "component:node-visited": 3724,
    "edge:tested": 5365,
    "component:node-discovered": 3718,
    "route:candidate": 2583,
    "topology:ray": 19305,
    "topology:node-feature": 1485,
    "topology:broad-feature": 225,
    "topology:node-predicate": 89749,
    "topology:sustained-sample": 89749,
    "topology:sustained-result": 2583,
    "topology:route-rejected": 2583,
    "route:stream-suspended": 2583,
    "route:stream-complete": 6,
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
    "seq": 16447,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 32126,
    "triangle": [
      [
        -2.327755242586136,
        0.011496245861053467,
        -4.784606099128723
      ],
      [
        -2.3313099145889282,
        0.027097314596176147,
        -4.783117771148682
      ],
      [
        -2.3276598751544952,
        0.011191517114639282,
        -4.8299440741539
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.00233540534973109,
        0.17649271488189733
      ],
      [
        0.0058900773525234484,
        0.17500438690185582
      ],
      [
        0.002240037918090465,
        0.22183068990707433
      ]
    ],
    "approach": {
      "seam": [
        -2.3254198372364048,
        4.16728474449925,
        -4.608113384246826
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
    "seq": 16448,
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
    "seq": 16493,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "6:2",
    "triangleId": 82509,
    "triangle": [
      [
        -1.5863651037216187,
        0.005937516689300537,
        -4.992536306381226
      ],
      [
        -1.6228123009204865,
        0.02435535192489624,
        -5.0035905838012695
      ],
      [
        -1.583411544561386,
        0.02428203821182251,
        -5.003606677055359
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.003878592477224964,
        -0.6
      ],
      [
        0.003879892826081033,
        -0.596816384792328
      ],
      [
        0.002,
        -0.5973179375262125
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.9865951597690581,
        0.009482474743026258,
        -4.999726784229278
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

### predicate:broad-supported-region

```json
[
  {
    "seq": 17754,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 20,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          1.8022521272801855,
          0.9487095732603623,
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
          "featureKey": "20:support",
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
    "seq": 17804,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 111,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "opposing-wall-width",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "failed",
        "measured": [
          1.8020545933480046,
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
    "seq": 18002,
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 62706,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "26:2",
    "triangleId": 242852,
    "triangle": [
      [
        1.3037565350532532,
        0.002147108316421509,
        -4.981100261211395
      ],
      [
        1.2870502471923828,
        0.004040449857711792,
        -4.995711445808411
      ],
      [
        1.3245068490505219,
        0.0048542022705078125,
        -5.002025365829468
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.30851254479115237
      ],
      [
        0.002436496317386627,
        0.3111020088195797
      ],
      [
        0.002,
        0.3106691586231415
      ]
    ],
    "approach": {
      "seam": [
        1.0134048402309421,
        0.007035576624205675,
        -4.999588869512081
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
    "seq": 95542,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "601:1",
    "triangleId": 337110,
    "triangle": [
      [
        2.3520544171333313,
        2.886810228228569,
        -1.5802769362926483
      ],
      [
        2.3309002816677094,
        2.89209246635437,
        -1.5794934332370758
      ],
      [
        2.3286816477775574,
        2.8916779160499573,
        -1.6174206137657166
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.012424376606940957,
        -0.3721635520458224
      ],
      [
        0.002,
        -0.371777455864428
      ],
      [
        0.002,
        -0.38872982524401145
      ]
    ],
    "approach": {
      "seam": [
        2.3396300405263903,
        0.020037124449790618,
        -1.208113384246826
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
    "seq": 233683,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 32326,
    "triangle": [
      [
        -2.3312510550022125,
        3.9123569428920746,
        -4.779393672943115
      ],
      [
        -2.3313452303409576,
        3.9534029364585876,
        -4.7800639271736145
      ],
      [
        -2.331889569759369,
        3.9542241394519806,
        -4.824557304382324
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.005842524043115241,
        0.17136075647370888,
        3.9172847444992502
      ],
      [
        0.005925393104552867,
        0.17195054292678869,
        3.9534029364585876
      ],
      [
        0.006469732522964122,
        0.2164439201354984,
        3.9542241394519806
      ],
      [
        0.0059063714494803216,
        0.1765960832533378,
        3.9172847444992502
      ]
    ],
    "approach": {
      "seam": [
        -2.3254198372364048,
        4.16728474449925,
        -4.608113384246826
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
      3.9172847444992502,
      4.18228474449925
    ],
    "bodyBand": [
      4.18228474449925,
      5.96728474449925
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
    "seq": 233685,
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
python3 scripts/diagnosis/trace-query.py doorway-scope corridor-2-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
