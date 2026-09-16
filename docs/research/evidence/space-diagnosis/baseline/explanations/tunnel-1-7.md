# tunnel-1-7: failed

A short stone tunnel open at both ends, with a continuous flat floor and broad empty passage beneath a curved roof.

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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/tunnel-1-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/tunnel-1-7/expanded.ndjson.gz`. SHA256 `db0204e5e2424161b67c9b2062d612fb4ab051aba6e91fb3f4068dcb095592c9`; 13,797 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 340 valid sampled nodes; 786 floor tests |
| Proposals | 226 eligible; 192 attempted; 34 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 164, "support-edge-not-found": 27}; passed 1 |
| Components | 1 reached-entry discoveries, 3 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 0.4000m |
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
    "seq": 3349,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 10670,
    "triangle": [
      [
        -1.9436277151107788,
        1.1884732693433762,
        -2.801502764225006
      ],
      [
        -1.9435783624649048,
        1.2043346017599106,
        -2.8007091879844666
      ],
      [
        -1.944918930530548,
        1.1761156618595123,
        -2.8220561742782593
      ]
    ],
    "clippedApproachCoordinates": [
      [
        1.1941821232438088,
        0.1968854308128356
      ],
      [
        1.1941327705979348,
        0.19609185457229605
      ],
      [
        1.195473338663578,
        0.21743884086608878
      ]
    ],
    "approach": {
      "seam": [
        -0.74944559186697,
        3.0477724718087558,
        -2.6046173334121705
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
    "seq": 3350,
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 3411,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "339:1",
    "triangleId": 337900,
    "triangle": [
      [
        1.4661014378070831,
        0.16652753949165344,
        2.2091304659843445
      ],
      [
        1.465442419052124,
        0.1670747995376587,
        2.1871594190597534
      ],
      [
        1.4887205958366394,
        0.16609802842140198,
        2.2096837162971497
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.407092101109159
      ],
      [
        0.024109171330928048,
        -0.38569895029068046
      ],
      [
        0.0020000000000000018,
        -0.3862397266510877
      ]
    ],
    "approach": {
      "seam": [
        1.4646114245057114,
        0.13448038525884842,
        2.59538266658783
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 3577,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "190:0",
    "triangleId": 2706,
    "triangle": [
      [
        -2.0651990175247192,
        0.10226762294769287,
        0.011159245390444994
      ],
      [
        -2.0718029737472534,
        0.11524862051010132,
        0.014823103789240122
      ],
      [
        -2.061664581298828,
        0.10329651832580566,
        -0.008561025140807033
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.05388846248388246,
        0.38422342119738495
      ],
      [
        0.06049241870641664,
        0.3805595627985898
      ],
      [
        0.05035402625799135,
        0.403943691728637
      ]
    ],
    "approach": {
      "seam": [
        -2.011310555040837,
        0.13908432564125275,
        0.39538266658782995
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
    "seq": 3919,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "148:2",
    "eye": [
      0.06862355470657366,
      1.8164789812102202,
      -0.20461733341217014
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
    ]
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 4809,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "303:2",
    "triangleId": 147826,
    "triangle": [
      [
        -0.737688347697258,
        3.0560135543346405,
        -2.8004844188690186
      ],
      [
        -0.7252261340618134,
        3.0639955401420593,
        -2.8004295229911804
      ],
      [
        -0.7381642162799835,
        3.056227058172226,
        -2.8239859342575073
      ]
    ],
    "clippedApproachCoordinates": [
      [
        4.178912897642328,
        -0.6
      ],
      [
        4.178885805606843,
        -0.5938496887683868
      ],
      [
        4.190083698644214,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.1313764452934265,
        0.17532933757121932,
        1.3784562826156623
      ],
      "outward": [
        0,
        0,
        -1
      ],
      "width": 1.2,
      "length": 4.483073616027832
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline tunnel-1-7 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/tunnel-1-7/legacy.ndjson.gz`. SHA256 `2500e4aa6a54f4f0633bef8217f17899d247d7d45c1aafbc7d959748d1ae82b3`; 4,312 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 340 valid sampled nodes; 786 floor tests |
| Proposals | 20 eligible; 20 attempted; 0 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 19}; passed 1 |
| Components | 1 reached-entry discoveries, 1 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | [] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 3364,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:2",
    "triangleId": 134185,
    "triangle": [
      [
        -0.9261471927165985,
        1.2725360691547394,
        -2.996905267238617
      ],
      [
        -0.9494574666023254,
        1.2955333963036537,
        -2.997331202030182
      ],
      [
        -0.9261599779129028,
        1.2955901473760605,
        -2.9973331689834595
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0023097402497435832,
        -0.6
      ],
      [
        0.002310180664062411,
        -0.5947835326194764
      ],
      [
        0.002,
        -0.594774264789355
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.33137644529342647,
        3.255328940077244,
        -2.995022988319397
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

### prescreen:source-projection

```json
[
  {
    "seq": 3365,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:2",
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
    "seq": 3410,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1:2",
    "triangleId": 194753,
    "triangle": [
      [
        -0.03668731916695833,
        3.276908218860626,
        -3.000986695289612
      ],
      [
        -0.05900566466152668,
        3.29500812292099,
        -3.001868963241577
      ],
      [
        -0.034188796766102314,
        3.2961546778678894,
        -3.0020198822021484
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.09192393399927742
      ],
      [
        0.002032010257243755,
        0.0971876485273242
      ],
      [
        0.002,
        0.09711023916043209
      ]
    ],
    "approach": {
      "seam": [
        -0.1313764452934265,
        3.292917748201897,
        -2.9999878719449047
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
python3 scripts/diagnosis/trace-query.py baseline tunnel-1-7 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
