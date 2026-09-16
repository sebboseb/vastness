# tunnel-1-42: failed

A short stone tunnel open at both ends, with a continuous flat floor and broad empty passage beneath a curved roof.

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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/tunnel-1-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/coverage/candidates/tunnel-1-42/expanded.ndjson.gz`. SHA256 `48a616b53ac5ed62859c230afbba4c727cbf2568097ebfd632cf6d06e8824cd6`; 1,687,346 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 5726 valid sampled nodes; 11037 floor tests |
| Proposals | Returned pass: 1092 eligible; 192 attempted. All trace passes: 2700 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 162, "support-edge-not-found": 75, "entry-prism-blocked": 242, "source-entry-prism": 242, "exterior-approach-limit": 82}; passed 15 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 1538 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 10293 candidate events. Returned pass: maximum connected displacement 19.4618m |
| Topology | {"enclosed-passage": 10293} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 689409
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
    "support:column": 12956,
    "support:rejected": 10622,
    "support:node": 11452,
    "proposal:eligible": 2184,
    "proposal:direction-excluded": 43624,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 1800,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 16844,
    "prescreen:projection-start": 293,
    "prescreen:projection-blocked": 162,
    "prescreen:rejected": 283,
    "prescreen:body-sample": 390,
    "prescreen:passed": 10,
    "component:entry-search": 10,
    "component:node-visited": 15380,
    "edge:tested": 6006,
    "component:node-discovered": 15370,
    "route:candidate": 6862,
    "topology:ray": 38636,
    "topology:node-feature": 2972,
    "topology:node-predicate": 459606,
    "topology:sustained-sample": 459606,
    "topology:sustained-result": 6862,
    "topology:route-rejected": 6862,
    "prescreen:support-edge-not-found": 50,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 121,
    "prescreen:entry-prism-proof": 126,
    "prescreen:exterior-approach-limit": 41,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 6478,
    "support:rejected": 5311,
    "support:node": 5726,
    "proposal:eligible": 1092,
    "proposal:direction-excluded": 21812,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 900,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 8422,
    "prescreen:projection-start": 126,
    "prescreen:entry-prism-blocked": 121,
    "prescreen:entry-prism-proof": 126,
    "prescreen:rejected": 121,
    "prescreen:body-sample": 195,
    "prescreen:passed": 5,
    "route:stream-admitted": 5,
    "prescreen:exterior-approach-limit": 41,
    "prescreen:support-edge-not-found": 25,
    "route:scheduler-start": 1,
    "route:stream-resumed": 3436,
    "component:entry-search": 5,
    "component:node-visited": 7690,
    "edge:tested": 3003,
    "component:node-discovered": 7685,
    "route:candidate": 3431,
    "topology:ray": 19318,
    "topology:node-feature": 1486,
    "topology:node-predicate": 229803,
    "topology:sustained-sample": 229803,
    "topology:sustained-result": 3431,
    "topology:route-rejected": 3431,
    "route:stream-suspended": 3431,
    "route:stream-complete": 5,
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
    "seq": 41750,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 1122,
    "triangle": [
      [
        -7.720361232757568,
        0.11344432830810547,
        -7.804757595062256
      ],
      [
        -7.71581506729126,
        0.12411308288574219,
        -7.812213897705078
      ],
      [
        -7.718918800354004,
        0.12053680419921875,
        -7.866519927978516
      ]
    ],
    "clippedApproachCoordinates": [
      [
        3.4438076183199886,
        0.189587497711182
      ],
      [
        3.43926145285368,
        0.19704380035400426
      ],
      [
        3.442365185916424,
        0.25134983062744176
      ]
    ],
    "approach": {
      "seam": [
        -4.27655361443758,
        1.5884520884711888,
        -7.615170097351074
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 3.5891920253634457
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
    "seq": 41751,
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
    "seq": 41794,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "5725:1",
    "triangleId": 595456,
    "triangle": [
      [
        7.740422248840332,
        0.045726776123046875,
        7.225832462310791
      ],
      [
        7.740658283233643,
        0.04505109786987305,
        7.163004398345947
      ],
      [
        7.763465881347656,
        0.05008983612060547,
        7.161459922790527
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.42336800463074004
      ],
      [
        0.0020291686058033775,
        -0.42336997985839986
      ],
      [
        0.002,
        -0.4232884971655461
      ]
    ],
    "approach": {
      "seam": [
        7.761436712741853,
        0.09706916960559674,
        7.584829902648927
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 42857,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 5688,
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
          1.423926145529904,
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
    "seq": 43100,
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 161652,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2194:0",
    "triangleId": 332,
    "triangle": [
      [
        -7.731978416442871,
        0.05480670928955078,
        -2.399477958679199
      ],
      [
        -7.728014945983887,
        0.06009244918823242,
        -2.4001364707946777
      ],
      [
        -7.731947422027588,
        0.05484151840209961,
        -2.4619789123535156
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.004441435635090585,
        0.5843078613281252
      ],
      [
        0.002,
        0.5847134944623962
      ],
      [
        0.002,
        0.6
      ],
      [
        0.004433653855228279,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -7.7275369808077805,
        0.05949977480483849,
        -1.815170097351074
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

### projection:wholly-above-player

```json
[
  {
    "seq": 161696,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "47:2",
    "triangleId": 361083,
    "triangle": [
      [
        1.2393405437469482,
        8.781156539916992,
        -7.937128067016602
      ],
      [
        1.1905235052108765,
        8.800966262817383,
        -7.975807189941406
      ],
      [
        1.2337627410888672,
        8.787068367004395,
        -7.979249954223633
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.03193635856984476,
        -0.6
      ],
      [
        0.0020000000000000018,
        -0.5960358115109269
      ],
      [
        0.002000000000000001,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        1.834254360198976,
        1.5781249985932073,
        -7.943601036071777
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

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 260998,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "1859:0",
    "eye": [
      -0.9657456398010247,
      3.2478352055440975,
      -3.015170097351074
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

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 601875,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 1170,
    "triangle": [
      [
        -7.707967758178711,
        1.3242592811584473,
        -7.953011512756348
      ],
      [
        -7.710478782653809,
        1.3800137042999268,
        -7.9535231590271
      ],
      [
        -7.713047981262207,
        1.3847568035125732,
        -7.979635715484619
      ]
    ],
    "clippedPrismCoordinates": [
      [
        3.4320533483911766,
        0.3379716597253457,
        1.3384520884711888
      ],
      [
        3.433925168216229,
        0.33835306167602575,
        1.3800137042999268
      ],
      [
        3.4364943668246273,
        0.3644656181335453,
        1.3847568035125732
      ],
      [
        3.4326059715139734,
        0.3440874923431991,
        1.3384520884711888
      ]
    ],
    "approach": {
      "seam": [
        -4.27655361443758,
        1.5884520884711888,
        -7.615170097351074
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 4.189192025363446
    },
    "supportBand": [
      1.3384520884711888,
      1.6034520884711887
    ],
    "bodyBand": [
      1.6034520884711887,
      3.3884520884711886
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
    "seq": 601877,
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

### prescreen:exterior-approach-limit

```json
[
  {
    "seq": 721740,
    "stage": "prescreen",
    "kind": "exterior-approach-limit",
    "proposalId": "3108:0",
    "seam": [
      5.763318838179111,
      0.11925401730278201,
      0.5848299026489254
    ],
    "distanceToBounds": 13.529064477980135,
    "startDistance": 13.929064477980136,
    "requiredLength": 14.229064477980137,
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
python3 scripts/diagnosis/trace-query.py coverage tunnel-1-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/coverage/candidates/tunnel-1-42/legacy.ndjson.gz`. SHA256 `923ad8b771f14ef22aee42c682790301437b0c175c50b4a26520427c1a9b5d96`; 1,785,206 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 5726 valid sampled nodes; 11037 floor tests |
| Proposals | Returned pass: 526 eligible; 48 attempted. All trace passes: 1434 omitted by selection; 10 selected but not attempted |
| Pre-screen | {"source-projection": 39, "entry-prism-blocked": 78, "source-entry-prism": 78}; passed 17 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 1793 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 12288 candidate events. Returned pass: maximum connected displacement 14.6000m |
| Topology | {"enclosed-passage": 12284} |
| Final seam | {"swept-forward:support-gap-or-step": 4, "swept-reverse:support-gap-or-step": 4} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 738941,
  "broad-supported-region": 86
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
    "support:column": 12956,
    "support:rejected": 10622,
    "support:node": 11452,
    "proposal:direction-excluded": 43082,
    "proposal:legacy-body-sample": 19710,
    "proposal:eligible": 1052,
    "proposal:direction-unexecuted": 1674,
    "proposal:selected": 96,
    "proposal:omitted": 956,
    "budget:exhausted": 4,
    "proposal:attempt": 86,
    "prescreen:edge-support-probe": 3850,
    "prescreen:projection-start": 86,
    "prescreen:projection-blocked": 39,
    "prescreen:rejected": 76,
    "prescreen:body-sample": 414,
    "prescreen:passed": 10,
    "component:entry-search": 10,
    "component:node-visited": 10133,
    "edge:tested": 7004,
    "component:node-discovered": 10198,
    "route:candidate": 8192,
    "topology:ray": 40118,
    "topology:node-feature": 3086,
    "topology:node-predicate": 546027,
    "topology:sustained-sample": 546027,
    "topology:sustained-result": 8194,
    "topology:route-rejected": 8190,
    "route:candidate-not-executed": 2,
    "proposal:not-attempted": 10,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 37,
    "prescreen:entry-prism-proof": 43,
    "topology:broad-feature": 52,
    "topology:witness": 4,
    "topology:route-qualified": 2,
    "seam:swept-forward": 2,
    "seam:swept-reverse": 2,
    "route:seam-rejected": 2,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 6478,
    "support:rejected": 5311,
    "support:node": 5726,
    "proposal:direction-excluded": 21541,
    "proposal:legacy-body-sample": 9855,
    "proposal:eligible": 526,
    "proposal:direction-unexecuted": 837,
    "proposal:selected": 48,
    "proposal:omitted": 478,
    "budget:exhausted": 2,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2140,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 41,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 41,
    "prescreen:body-sample": 285,
    "prescreen:passed": 7,
    "route:stream-admitted": 7,
    "route:scheduler-start": 1,
    "route:stream-resumed": 4096,
    "component:entry-search": 7,
    "component:node-visited": 5464,
    "edge:tested": 3373,
    "component:node-discovered": 5581,
    "route:candidate": 4096,
    "topology:ray": 15925,
    "topology:node-feature": 1225,
    "topology:broad-feature": 52,
    "topology:node-predicate": 193048,
    "topology:sustained-sample": 193048,
    "topology:sustained-result": 4098,
    "topology:route-rejected": 4094,
    "route:stream-suspended": 4094,
    "topology:witness": 4,
    "topology:route-qualified": 2,
    "seam:swept-forward": 2,
    "seam:swept-reverse": 2,
    "route:seam-rejected": 2,
    "route:stream-unexecuted": 5,
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
    "seq": 50847,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:2",
    "triangleId": 111996,
    "triangle": [
      [
        -4.595004558563232,
        0.0966949462890625,
        -7.9349141120910645
      ],
      [
        -4.595846176147461,
        0.15336990356445312,
        -7.939780235290527
      ],
      [
        -4.533674716949463,
        0.09667062759399414,
        -7.933725833892822
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0027361803063133986,
        -0.6
      ],
      [
        0.0019999999999999996,
        -0.5924403089802268
      ],
      [
        0.0019999999999999996,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -3.965745639801025,
        1.5636174881567455,
        -7.934112794697285
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
    "seq": 50848,
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

### projection:wholly-above-player

```json
[
  {
    "seq": 50890,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "11:2",
    "triangleId": 213632,
    "triangle": [
      [
        -2.6092777252197266,
        7.86902928352356,
        -7.942417144775391
      ],
      [
        -2.5891001224517822,
        7.899165391921997,
        -7.9578166007995605
      ],
      [
        -2.5509121417999268,
        7.871371030807495,
        -7.920050144195557
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.007925727783932343,
        -0.6
      ],
      [
        0.0020000000000000052,
        -0.5940081331872427
      ],
      [
        0.002000000000000003,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -1.9657456398010247,
        1.5811317735870793,
        -7.926794180274009
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
    "seq": 51233,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "220:1",
    "triangleId": 595934,
    "triangle": [
      [
        7.7625508308410645,
        0.0625615119934082,
        -7.597389221191406
      ],
      [
        7.745687484741211,
        0.06566095352172852,
        -7.646318435668945
      ],
      [
        7.769681453704834,
        0.06661033630371094,
        -7.5813469886779785
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.012845273315906347,
        -0.38221912384033185
      ],
      [
        0.002,
        -0.41368682313318583
      ],
      [
        0.002,
        -0.4148524559041361
      ],
      [
        0.01997589617967588,
        -0.3661768913269041
      ]
    ],
    "approach": {
      "seam": [
        7.749705557525158,
        0.06276787326013462,
        -7.215170097351074
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
    "seq": 51374,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "861:1",
    "triangleId": 595880,
    "triangle": [
      [
        7.734133243560791,
        0.0511021614074707,
        -5.960066795349121
      ],
      [
        7.733148097991943,
        0.050981998443603516,
        -6.021798610687256
      ],
      [
        7.749019622802734,
        0.05508136749267578,
        -6.024119853973389
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.40890414666745634
      ],
      [
        0.0023118585348118614,
        -0.4089497566223148
      ],
      [
        0.002,
        -0.4076078928495244
      ]
    ],
    "approach": {
      "seam": [
        7.7467077642679225,
        0.06144907750224656,
        -5.615170097351074
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 53282,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 5583,
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
    "seq": 53525,
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
    "seq": 696177,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:2",
    "triangleId": 112038,
    "triangle": [
      [
        -4.597598552703857,
        1.3036303520202637,
        -7.977884292602539
      ],
      [
        -4.599292755126953,
        1.363046407699585,
        -7.977604389190674
      ],
      [
        -4.533073902130127,
        1.3622214794158936,
        -7.975375175476074
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.04236225313235109,
        -0.6,
        1.3626284910034148
      ],
      [
        0.04126238077878952,
        -0.5673282623291018,
        1.3622214794158936
      ],
      [
        0.04253285982536326,
        -0.6,
        1.332554151858268
      ]
    ],
    "approach": {
      "seam": [
        -3.965745639801025,
        1.5636174881567455,
        -7.934112794697285
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
      1.3136174881567455,
      1.5786174881567454
    ],
    "bodyBand": [
      1.5786174881567454,
      3.3636174881567458
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
    "seq": 696179,
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

### predicate:broad-supported-region

```json
[
  {
    "seq": 697684,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 51,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "broad-supported-region",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "passed",
        "measured": [
          6.788710685014737,
          2.165535787762402,
          null,
          5.416277585230643
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
          "featureKey": "51:support",
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
    "predecessorPass": "entry-prism"
  }
]
```

### seam:support-gap-or-step

```json
[
  {
    "seq": 698270,
    "stage": "seam",
    "kind": "swept-forward",
    "proposalId": "51:2",
    "routeId": 2,
    "from": [
      2.4342543601989757,
      3.2285516215188967,
      -9.148740231990814
    ],
    "target": [
      2.4342543601989757,
      3.2373121087781733,
      -7.615170097351074
    ],
    "movement": {
      "position": [
        2.4342543601989757,
        3.230603942075313,
        -8.208810149469695
      ],
      "blocked": true,
      "reason": "support-gap-or-step",
      "support": {
        "valid": true,
        "eye": [
          2.4342543601989757,
          3.230603942075313,
          -8.208810149469695
        ],
        "foot": [
          2.4342543601989757,
          1.580603942075313,
          -8.208810149469695
        ],
        "supportTriangleIds": [
          -1,
          1014849
        ],
        "supportSamples": [
          {
            "position": [
              2.4342543601989757,
              1.5785516215188968,
              -8.208810149469695
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              2.7342543601989755,
              1.5785516215188968,
              -8.208810149469695
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              2.64638639455494,
              1.5785516215188968,
              -7.996678115113731
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              2.4342543601989757,
              1.580603942075313,
              -7.908810149469695
            ],
            "triangleId": 1014849,
            "normalY": 0.9996477365493774
          },
          {
            "position": [
              2.2221223258430114,
              1.5785516215188968,
              -7.996678115113731
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              2.134254360198976,
              1.5785516215188968,
              -8.208810149469695
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              2.2221223258430114,
              1.5785516215188968,
              -8.420942183825659
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              2.4342543601989757,
              1.5785516215188968,
              -8.508810149469696
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              2.64638639455494,
              1.5785516215188968,
              -8.420942183825659
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
    "endpointDistance": 0.5936400521186211,
    "endpointTolerance": 1e-06,
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py coverage tunnel-1-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
