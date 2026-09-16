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

Complete trace: `.runtime/space-diagnosis/baseline/candidates/doorway-2-42/expanded.ndjson.gz`. SHA256 `d4a492cd8c158ab21c3ba3e4cb9fc6f1c11d28bf3a162a56b37d37638f1ead61`; 116,305 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 440 valid sampled nodes; 1031 floor tests |
| Proposals | 220 eligible; 192 attempted; 28 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"support-edge-not-found": 18, "source-projection": 141}; passed 33 |
| Components | 2 reached-entry discoveries, 382 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 2456 candidates; maximum connected displacement 6.2129m |
| Topology | {"doorway-crossing": 2456} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 61103,
  "left-flank": 1393,
  "aperture-width": 1393
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 4261,
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
    ]
  }
]
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 4307,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 4308,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "400:3",
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
    "seq": 4354,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 4469,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 5135,
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
    ]
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 5346,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-walls"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 8787,
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
    ]
  }
]
```

### predicate:aperture-width

```json
[
  {
    "seq": 8790,
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
    ]
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 12227,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline doorway-2-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/doorway-2-42/legacy.ndjson.gz`. SHA256 `449beb5e62bfa0d7487b7875b2fffc1353f6660c014a0f2b09855ffb9bd8cdfb`; 127,239 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 440 valid sampled nodes; 1031 floor tests |
| Proposals | 104 eligible; 48 attempted; 56 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 25}; passed 23 |
| Components | 2 reached-entry discoveries, 382 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 3252 candidates; maximum connected displacement 6.2129m |
| Topology | {"doorway-crossing": 3252} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 79580,
  "left-flank": 1750,
  "aperture-width": 1750
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### predicate:roof-coverage

```json
[
  {
    "seq": 6240,
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
    ]
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 6347,
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
    ]
  }
]
```

### predicate:aperture-width

```json
[
  {
    "seq": 6350,
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
    ]
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 6501,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-walls"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 58360,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 58361,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "10:1",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ]
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 66640,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 88026,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline doorway-2-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
