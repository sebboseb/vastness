# chamber-2-42: failed

A quiet rectangular meditation chamber, wide entrance, plain walls, tall ceiling and an uninterrupted flat floor without furniture.

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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/chamber-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/chamber-2-42/expanded.ndjson.gz`. SHA256 `6520d76ff1f279c1345b17e08b813151c3f61d628020dd672457513af02c2108`; 118,296 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 20000 valid sampled nodes; 21377 floor tests |
| Proposals | 1216 eligible; 192 attempted; 1024 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 132, "support-edge-not-found": 60}; passed 0 |
| Components | 0 reached-entry discoveries, 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["supported-nodes", "entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 108488,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 100024,
    "triangle": [
      [
        -7.989238739013672,
        0.017724990844726562,
        -7.8031158447265625
      ],
      [
        -7.989719390869141,
        0.07624530792236328,
        -7.805107116699219
      ],
      [
        -7.989487171173096,
        0.0762472152709961,
        -7.872740745544434
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.01246246546506935,
        0.1881364822387699
      ],
      [
        0.0129431173205381,
        0.19012775421142614
      ],
      [
        0.012710897624493178,
        0.257761383056641
      ]
    ],
    "approach": {
      "seam": [
        -7.9767762735486025,
        15.997120807907109,
        -7.614979362487793
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
    "seq": 108489,
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
    "seq": 108531,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "19696:1",
    "triangleId": 913704,
    "triangle": [
      [
        7.87335205078125,
        0.013788223266601562,
        5.030513763427734
      ],
      [
        7.873361587524414,
        0.013522148132324219,
        4.961656093597412
      ],
      [
        7.925593376159668,
        0.004837989807128906,
        4.96358585357666
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.4220382108130113
      ],
      [
        0.01833263486623604,
        -0.42143478393554723
      ],
      [
        0.0020000000000000018,
        -0.4005105614729689
      ]
    ],
    "approach": {
      "seam": [
        7.907260741293432,
        0.10186923853847676,
        5.385020637512207
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
    "seq": 108683,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "19756:3",
    "eye": [
      -4.612419700622558,
      14.553291621218564,
      5.5850206375122085
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

### projection:wholly-above-player

```json
[
  {
    "seq": 110760,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "696:2",
    "triangleId": 832943,
    "triangle": [
      [
        6.994884967803955,
        15.964816093444824,
        -7.7888994216918945
      ],
      [
        6.9287943840026855,
        15.978532791137695,
        -7.864973068237305
      ],
      [
        6.994846820831299,
        15.978257656097412,
        -7.867826461791992
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.05255940609966033,
        -0.6
      ],
      [
        0.05287331193685496,
        -0.592733478546144
      ],
      [
        0.0020000000000000018,
        -0.5927088904856146
      ],
      [
        0.0020000000000000018,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        7.587580299377443,
        2.9175957973303324,
        -7.814953149855137
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
    "seq": 111259,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "10421:1",
    "triangleId": 880965,
    "triangle": [
      [
        7.889017105102539,
        12.897056579589844,
        -1.4142553806304932
      ],
      [
        7.89235258102417,
        12.952932357788086,
        -1.3539196252822876
      ],
      [
        7.892665386199951,
        12.952972412109375,
        -1.4163939952850342
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.08508397191762906,
        -0.5992760181427004
      ],
      [
        0.08841944783925992,
        -0.5389402627944948
      ],
      [
        0.08872517003908179,
        -0.6
      ],
      [
        0.08631901878277941,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        7.80393313318491,
        12.866193727524736,
        -0.8149793624877928
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
python3 scripts/diagnosis/trace-query.py baseline chamber-2-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/chamber-2-42/legacy.ndjson.gz`. SHA256 `e3e89bb02ccc28c0054aadc636e7dd9227ac71d93202b45bf53a1ccfd1c866a6`; 121,358 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 20000 valid sampled nodes; 21377 floor tests |
| Proposals | 409 eligible; 48 attempted; 361 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 48}; passed 0 |
| Components | 0 reached-entry discoveries, 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["supported-nodes", "entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 119053,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 100024,
    "triangle": [
      [
        -7.989238739013672,
        0.017724990844726562,
        -7.8031158447265625
      ],
      [
        -7.989719390869141,
        0.07624530792236328,
        -7.805107116699219
      ],
      [
        -7.989487171173096,
        0.0762472152709961,
        -7.872740745544434
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.01246246546506935,
        0.1881364822387699
      ],
      [
        0.0129431173205381,
        0.19012775421142614
      ],
      [
        0.012710897624493178,
        0.257761383056641
      ]
    ],
    "approach": {
      "seam": [
        -7.9767762735486025,
        15.997120807907109,
        -7.614979362487793
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
    "seq": 119054,
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
    "seq": 119867,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "376:2",
    "triangleId": 800952,
    "triangle": [
      [
        6.172474384307861,
        15.957697868347168,
        -7.792782306671143
      ],
      [
        6.172341346740723,
        15.958245754241943,
        -7.872546672821045
      ],
      [
        6.237381935119629,
        15.960016250610352,
        -7.872655868530273
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0024258992664971265,
        -0.6
      ],
      [
        0.002509510517120006,
        -0.5501983642578132
      ],
      [
        0.002,
        -0.5506124071402055
      ],
      [
        0.0020000000000000013,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        6.787580299377442,
        15.987235052105344,
        -7.870146358013153
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
python3 scripts/diagnosis/trace-query.py baseline chamber-2-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
