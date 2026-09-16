# doorway-1-42: failed

A freestanding thick stone doorway with a large empty opening and attached flat floor extending through it on both sides.

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
      "cue": "doorway"
    }
  ],
  "ambiguities": [],
  "requirements": {
    "openSky": false,
    "covered": false,
    "opposingWalls": false,
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/doorway-1-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/doorway-1-42/expanded.ndjson.gz`. SHA256 `8e6ff366ed4e58e7b675770b1aa656ab3408084766291f7cfdad8f15d3658dd4`; 18,862 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1176 valid sampled nodes; 2388 floor tests |
| Proposals | 356 eligible; 192 attempted; 164 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 109, "support-edge-not-found": 83}; passed 0 |
| Components | 0 reached-entry discoveries, 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 8712,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 120040,
    "triangle": [
      [
        -3.0001380443573,
        0.00868535041809082,
        -2.803517997264862
      ],
      [
        -3.0010757446289062,
        0.03122556209564209,
        -2.803525686264038
      ],
      [
        -3.000322937965393,
        0.00855642557144165,
        -2.8290531635284424
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002229656279086889,
        0.19583364725112906
      ],
      [
        0.0031673565506933343,
        0.1958413362503051
      ],
      [
        0.0024145498871801507,
        0.22136881351470938
      ]
    ],
    "approach": {
      "seam": [
        -2.997908388078213,
        6.006285151583904,
        -2.607684350013733
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
    "seq": 8713,
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
    "seq": 8757,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1175:1",
    "triangleId": 1050558,
    "triangle": [
      [
        2.969311237335205,
        4.823714375495911,
        2.215262711048126
      ],
      [
        2.9695011377334595,
        4.847064435482025,
        2.2152771949768066
      ],
      [
        2.9693493247032166,
        4.8238853216171265,
        2.1915380358695984
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.377047072256016
      ],
      [
        0.0021129816770546483,
        -0.377038455009461
      ],
      [
        0.002,
        -0.3947055156267732
      ]
    ],
    "approach": {
      "seam": [
        2.967388156056405,
        0.03899317025846339,
        2.5923156499862676
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 8802,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "19:2",
    "triangleId": 368348,
    "triangle": [
      [
        -1.4152387082576752,
        0.010684490203857422,
        -2.999910593032837
      ],
      [
        -1.4158962070941925,
        0.031063735485076904,
        -3.001265287399292
      ],
      [
        -1.392761081457138,
        0.031090736389160156,
        -3.001293182373047
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.03214849117927103,
        -0.6
      ],
      [
        0.03216386735439292,
        -0.5872475326061251
      ],
      [
        0.03137946846581784,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.805513548851013,
        0.012277713050440474,
        -2.969129315018654
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 8894,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1069:0",
    "triangleId": 21412,
    "triangle": [
      [
        -2.9978302717208862,
        0.010064363479614258,
        2.000759482383728
      ],
      [
        -3.0036399364471436,
        0.030641555786132812,
        1.9992542266845703
      ],
      [
        -3.0036885738372803,
        0.030631184577941895,
        1.9743728041648865
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.028037893772125067,
        0.3915561676025394
      ],
      [
        0.03384755849838239,
        0.39306142330169713
      ],
      [
        0.03389619588851911,
        0.41794284582138097
      ]
    ],
    "approach": {
      "seam": [
        -2.969792377948761,
        0.0347676188729421,
        2.3923156499862674
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

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 9095,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "910:3",
    "eye": [
      -0.005513548851013184,
      1.6649638462209457,
      1.3923156499862674
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
    ]
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline doorway-1-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/doorway-1-42/legacy.ndjson.gz`. SHA256 `5cd1c555e7e5dbce792f59aa532dd1848d17f9f4df5c1f369c6ea09224da0099`; 15,372 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1176 valid sampled nodes; 2388 floor tests |
| Proposals | 200 eligible; 48 attempted; 152 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 48}; passed 0 |
| Components | 0 reached-entry discoveries, 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 12984,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 120040,
    "triangle": [
      [
        -3.0001380443573,
        0.00868535041809082,
        -2.803517997264862
      ],
      [
        -3.0010757446289062,
        0.03122556209564209,
        -2.803525686264038
      ],
      [
        -3.000322937965393,
        0.00855642557144165,
        -2.8290531635284424
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002229656279086889,
        0.19583364725112906
      ],
      [
        0.0031673565506933343,
        0.1958413362503051
      ],
      [
        0.0024145498871801507,
        0.22136881351470938
      ]
    ],
    "approach": {
      "seam": [
        -2.997908388078213,
        6.006285151583904,
        -2.607684350013733
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
    "seq": 12985,
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
    "seq": 13122,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "24:2",
    "triangleId": 436720,
    "triangle": [
      [
        -0.8089992105960846,
        5.8565354347229,
        -3.000101923942566
      ],
      [
        -0.8092374801635742,
        5.880822479724884,
        -3.0004230737686157
      ],
      [
        -0.7856964468955994,
        5.85649037361145,
        -3.000135898590088
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002156755068505145,
        -0.6
      ],
      [
        0.002,
        -0.5871500862243021
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.20551354885101292,
        6.0053707077969385,
        -2.9982208907604218
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline doorway-1-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
