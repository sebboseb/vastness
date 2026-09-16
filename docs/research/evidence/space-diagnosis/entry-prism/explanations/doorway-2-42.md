# doorway-2-42: failed

Two tall stone walls joined by an arch, with a broad human doorway and a continuous level stone path through the opening.

Locked scale: 6. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "doorway-crossing"
  ],
  "evidence": [
    {
      "kind": "doorway-crossing",
      "source": "text",
      "cue": "arch"
    },
    {
      "kind": "doorway-crossing",
      "source": "text",
      "cue": "doorway"
    }
  ],
  "ambiguities": [],
  "requirements": {
    "openSky": false,
    "covered": false,
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/doorway-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/doorway-2-42/expanded.ndjson.gz`. SHA256 `38b8873e9422ba0d9f837542e0bcbf14231eebfd8241a8f452cf95f29706a516`; 232,875 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 440 valid sampled nodes; 1031 floor tests |
| Proposals | Returned pass: 220 eligible; 192 attempted. All trace passes: 56 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"support-edge-not-found": 36, "source-projection": 141, "entry-prism-blocked": 140, "source-entry-prism": 140}; passed 67 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 394 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 4912 candidate events. Returned pass: maximum connected displacement 6.2129m |
| Topology | {"doorway-crossing": 4912} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 122206,
  "left-flank": 2786,
  "aperture-width": 2786
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
    "support:column": 992,
    "support:rejected": 591,
    "support:node": 440,
    "proposal:eligible": 220,
    "proposal:direction-excluded": 1540,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 28,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 8944,
    "prescreen:support-edge-not-found": 18,
    "prescreen:projection-start": 174,
    "prescreen:projection-blocked": 141,
    "prescreen:rejected": 141,
    "prescreen:body-sample": 1270,
    "prescreen:passed": 33,
    "component:entry-search": 33,
    "component:node-visited": 10535,
    "edge:tested": 707,
    "component:node-discovered": 10502,
    "route:candidate": 2456,
    "topology:ray": 10252,
    "topology:node-feature": 360,
    "topology:aperture-node": 61103,
    "topology:route-rejected": 2456,
    "topology:aperture-axis": 2786,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 992,
    "support:rejected": 591,
    "support:node": 440,
    "proposal:eligible": 220,
    "proposal:direction-excluded": 1540,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 28,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 8944,
    "prescreen:support-edge-not-found": 18,
    "prescreen:projection-start": 174,
    "prescreen:entry-prism-blocked": 140,
    "prescreen:entry-prism-proof": 174,
    "prescreen:rejected": 140,
    "prescreen:body-sample": 1310,
    "prescreen:passed": 34,
    "component:entry-search": 34,
    "component:node-visited": 10547,
    "edge:tested": 735,
    "component:node-discovered": 10513,
    "route:candidate": 2456,
    "topology:ray": 10252,
    "topology:node-feature": 360,
    "topology:aperture-node": 61103,
    "topology:route-rejected": 2456,
    "topology:aperture-axis": 2786,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 4262,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "0:0",
    "eye": [
      -0.8902062773704529,
      1.6570500206016627,
      -2.6009891986846925
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
    "pass": "baseline"
  }
]
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 4308,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "400:3",
    "triangleId": 5060,
    "triangle": [
      [
        -2.7084732055664062,
        0.0011276006698608398,
        2.999587297439575
      ],
      [
        -2.7095983028411865,
        0.0016617178916931152,
        2.9749717712402344
      ],
      [
        -2.683444082736969,
        0.0010794997215270996,
        2.999598205089569
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.1696387156370707,
        0.6
      ],
      [
        0.176005899906158,
        0.5932378053665159
      ],
      [
        0.17600295295301244,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -2.090206277370453,
        3.7217921237693825,
        2.823592305183411
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
    "pass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 4309,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "400:3",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "baseline"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 4355,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "439:1",
    "triangleId": 481302,
    "triangle": [
      [
        2.907071828842163,
        0.0052054524421691895,
        2.217556357383728
      ],
      [
        2.906769633293152,
        0.005240678787231445,
        2.193281650543213
      ],
      [
        2.9154614210128784,
        0.005731701850891113,
        2.2172555923461914
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.3903958817710893
      ],
      [
        0.005132688581943157,
        -0.38175520896911674
      ],
      [
        0.002,
        -0.3816429027711793
      ]
    ],
    "approach": {
      "seam": [
        2.9103287324309353,
        0.00689525838050056,
        2.599010801315308
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
    "seq": 4470,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "255:1",
    "triangleId": 193086,
    "triangle": [
      [
        -1.5171375274658203,
        3.0718472599983215,
        0.619888186454773
      ],
      [
        -1.513522982597351,
        3.0989708304405212,
        0.6162443161010742
      ],
      [
        -1.519569218158722,
        3.1016796827316284,
        0.5911572575569153
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.37931377846914965
      ],
      [
        0.005424919724463795,
        -0.3827664852142334
      ],
      [
        0.002,
        -0.3969771723044974
      ]
    ],
    "approach": {
      "seam": [
        -1.5189479023218149,
        0.07061110823715776,
        0.9990108013153076
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 4.5445124894380555
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 5136,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 1,
    "nodeId": 76,
    "routeIndex": 1,
    "firstFailure": "roof-coverage",
    "roofCount": 1,
    "required": 9,
    "unexecuted": [
      "flank-rays",
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "baseline"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 5347,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-walls"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 8788,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 41,
    "nodeId": 36,
    "routeIndex": 21,
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
    "pass": "baseline"
  }
]
```

### predicate:aperture-width

```json
[
  {
    "seq": 8791,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 41,
    "nodeId": 36,
    "routeIndex": 21,
    "axis": [
      0,
      0,
      1
    ],
    "left": {
      "id": 770802,
      "distance": 0.33103450285317526
    },
    "right": {
      "id": 327011,
      "distance": 0.5199273493684474
    },
    "minimumWidth": 2.4,
    "rayMaximum": 3,
    "firstFailure": "aperture-width",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 12228,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "64:0",
    "triangleId": 292,
    "triangle": [
      [
        -2.8831669092178345,
        0.0048288702964782715,
        -0.3875191658735275
      ],
      [
        -2.8795092701911926,
        0.005050778388977051,
        -0.3884516805410385
      ],
      [
        -2.8822402954101562,
        0.004861414432525635,
        -0.4110930562019348
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0026172164434850598,
        -0.6
      ],
      [
        0.0038359537720680237,
        -0.5898961424827576
      ],
      [
        0.004233103913850446,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -2.8784043416380882,
        0.004904689477545584,
        -1.0009891986846924
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
    "seq": 120612,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "400:3",
    "triangleId": 58975,
    "triangle": [
      [
        -2.2424944639205933,
        3.7176060676574707,
        2.824792206287384
      ],
      [
        -2.241385281085968,
        3.710125207901001,
        2.8241302371025085
      ],
      [
        -2.233921766281128,
        3.7137420773506165,
        2.8270221948623657
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.002,
        0.14740572358017884,
        3.711953764821326
      ],
      [
        0.003429889678954634,
        0.14371548891067487,
        3.7137420773506165
      ],
      [
        0.002,
        0.1492123833849306,
        3.7162197043310132
      ]
    ],
    "approach": {
      "seam": [
        -2.090206277370453,
        3.7217921237693825,
        2.823592305183411
      ],
      "outward": [
        0,
        0,
        1
      ],
      "width": 1.2,
      "length": 2
    },
    "supportBand": [
      3.4717921237693825,
      3.7367921237693826
    ],
    "bodyBand": [
      3.7367921237693826,
      5.521792123769383
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
    "seq": 120614,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "400:3",
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
python3 scripts/diagnosis/trace-query.py entry-prism doorway-2-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/doorway-2-42/legacy.ndjson.gz`. SHA256 `a0c9839c53a2ac37cb7f6b00955bd058aaaf4dadba469def7da42cbc483b97a9`; 254,526 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 440 valid sampled nodes; 1031 floor tests |
| Proposals | Returned pass: 104 eligible; 48 attempted. All trace passes: 112 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 25, "entry-prism-blocked": 25, "source-entry-prism": 25}; passed 46 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 382 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 6504 candidate events. Returned pass: maximum connected displacement 6.2129m |
| Topology | {"doorway-crossing": 6504} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 159160,
  "left-flank": 3500,
  "aperture-width": 3500
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
    "support:column": 992,
    "support:rejected": 591,
    "support:node": 440,
    "proposal:direction-excluded": 1523,
    "proposal:legacy-body-sample": 1908,
    "proposal:eligible": 104,
    "proposal:direction-unexecuted": 133,
    "proposal:selected": 48,
    "proposal:omitted": 56,
    "budget:exhausted": 1,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2184,
    "prescreen:projection-start": 48,
    "prescreen:body-sample": 933,
    "prescreen:passed": 23,
    "component:entry-search": 23,
    "component:node-visited": 7889,
    "edge:tested": 707,
    "component:node-discovered": 7866,
    "route:candidate": 3252,
    "topology:ray": 11719,
    "topology:node-feature": 363,
    "topology:aperture-node": 79580,
    "topology:aperture-axis": 3500,
    "topology:route-rejected": 3252,
    "prescreen:projection-blocked": 25,
    "prescreen:rejected": 25,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 992,
    "support:rejected": 591,
    "support:node": 440,
    "proposal:direction-excluded": 1523,
    "proposal:legacy-body-sample": 1908,
    "proposal:eligible": 104,
    "proposal:direction-unexecuted": 133,
    "proposal:selected": 48,
    "proposal:omitted": 56,
    "budget:exhausted": 1,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2184,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-proof": 48,
    "prescreen:body-sample": 933,
    "prescreen:passed": 23,
    "component:entry-search": 23,
    "component:node-visited": 7889,
    "edge:tested": 707,
    "component:node-discovered": 7866,
    "route:candidate": 3252,
    "topology:ray": 11719,
    "topology:node-feature": 363,
    "topology:aperture-node": 79580,
    "topology:aperture-axis": 3500,
    "topology:route-rejected": 3252,
    "prescreen:entry-prism-blocked": 25,
    "prescreen:rejected": 25,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### predicate:roof-coverage

```json
[
  {
    "seq": 6241,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 1,
    "nodeId": 1,
    "routeIndex": 1,
    "firstFailure": "roof-coverage",
    "roofCount": 0,
    "required": 9,
    "unexecuted": [
      "flank-rays",
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "baseline"
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 6348,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 37,
    "routeIndex": 8,
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
    "pass": "baseline"
  }
]
```

### predicate:aperture-width

```json
[
  {
    "seq": 6351,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 37,
    "routeIndex": 8,
    "axis": [
      0,
      0,
      1
    ],
    "left": {
      "id": 770802,
      "distance": 0.5310407219033321
    },
    "right": {
      "id": 327011,
      "distance": 0.3199261074412169
    },
    "minimumWidth": 2.4,
    "rayMaximum": 3,
    "firstFailure": "aperture-width",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "baseline"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 6502,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-walls"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 58361,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "10:1",
    "triangleId": 481217,
    "triangle": [
      [
        2.889582395553589,
        0.00425952672958374,
        -2.7776092886924744
      ],
      [
        2.8781173825263977,
        0.004010438919067383,
        -2.8009936809539795
      ],
      [
        2.8902538418769836,
        0.004137754440307617,
        -2.800187587738037
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.19923798306578938
      ],
      [
        0.0025961235165592456,
        -0.19919838905334464
      ],
      [
        0.002,
        -0.1791529221917238
      ]
    ],
    "approach": {
      "seam": [
        2.8876577183604244,
        0.005043395750177501,
        -2.6009891986846925
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

### prescreen:source-projection

```json
[
  {
    "seq": 58362,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "10:1",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 66641,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "44:1",
    "triangleId": 962338,
    "triangle": [
      [
        2.890998601913452,
        0.004782378673553467,
        -2.2837480902671814
      ],
      [
        2.8912739753723145,
        0.0051732659339904785,
        -2.284072458744049
      ],
      [
        2.8907768726348877,
        0.004797220230102539,
        -2.2594631910324097
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.48304089430663555
      ],
      [
        0.0020359665155407214,
        -0.48308326005935687
      ],
      [
        0.002,
        -0.4813027234761584
      ]
    ],
    "approach": {
      "seam": [
        2.8892380088567737,
        0.004685187192500965,
        -1.8009891986846922
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

### projection:wholly-below-support-band

```json
[
  {
    "seq": 88027,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "401:3",
    "triangleId": 16418,
    "triangle": [
      [
        -2.4939982295036316,
        0.004767894744873047,
        2.970035970211029
      ],
      [
        -2.4855732321739197,
        0.0051566362380981445,
        2.958304703235626
      ],
      [
        -2.501439929008484,
        0.005154848098754883,
        2.9573614597320557
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.1401269819890761,
        0.6
      ],
      [
        0.1336757645010942,
        0.5953669548034668
      ],
      [
        0.13340033919808728,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -1.8902062773704529,
        3.7206746199695457,
        2.824628938734532
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
    "pass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 185604,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "10:1",
    "triangleId": 481217,
    "triangle": [
      [
        2.889582395553589,
        0.00425952672958374,
        -2.7776092886924744
      ],
      [
        2.8781173825263977,
        0.004010438919067383,
        -2.8009936809539795
      ],
      [
        2.8902538418769836,
        0.004137754440307617,
        -2.800187587738037
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.002,
        -0.19923798306578938,
        0.004131500905067899
      ],
      [
        0.0025961235165592456,
        -0.19919838905334464,
        0.004137754440307617
      ],
      [
        0.002,
        -0.1791529221917238,
        0.0042458663217395335
      ]
    ],
    "approach": {
      "seam": [
        2.8876577183604244,
        0.005043395750177501,
        -2.6009891986846925
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2
    },
    "supportBand": [
      -0.2449566042498225,
      0.020043395750177502
    ],
    "bodyBand": [
      0.020043395750177502,
      1.8050433957501775
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
    "seq": 185606,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "10:1",
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
python3 scripts/diagnosis/trace-query.py entry-prism doorway-2-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
