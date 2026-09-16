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

Complete trace: `.runtime/space-diagnosis/baseline/candidates/chamber-2-7/expanded.ndjson.gz`. SHA256 `d9f28c13ebe1bce339d27af966232e8326e723d9d5f7af511fb2f6dbc34b1a76`; 17,835 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1401 valid sampled nodes; 1688 floor tests |
| Proposals | 256 eligible; 192 attempted; 64 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 176, "support-edge-not-found": 16}; passed 0 |
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
    "seq": 8811,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 8812,
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
    "seq": 8854,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 9188,
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
    ]
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 9636,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 11268,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline chamber-2-7 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/chamber-2-7/legacy.ndjson.gz`. SHA256 `fa1309021ce30d88936e4024514dfdf0eaff79f2bccdcd16b83ccf40f1796267`; 15,613 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1401 valid sampled nodes; 1688 floor tests |
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
    "seq": 13257,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 13258,
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
    "seq": 13303,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline chamber-2-7 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
