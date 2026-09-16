# large_open_interior-1-42: failed

An enormous empty vaulted hall with a broad entrance and a continuous level floor, widely spaced perimeter columns and clear central space.

Locked scale: 10. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "broad-covered-interior"
  ],
  "evidence": [
    {
      "kind": "broad-covered-interior",
      "source": "text",
      "cue": "hall"
    }
  ],
  "ambiguities": [],
  "requirements": {
    "openSky": false,
    "covered": true,
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/large_open_interior-1-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/large_open_interior-1-42/expanded.ndjson.gz`. SHA256 `57e0a72ce7ef032962eca03733952c9cccc17b25040cbf5401cc3ed1faed13ef`; 23,959 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1969 valid sampled nodes; 3288 floor tests |
| Proposals | 458 eligible; 192 attempted; 266 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 163, "support-edge-not-found": 28, "body-obstruction": 1}; passed 0 |
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 13558,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 10170,
    "triangle": [
      [
        -5.002819299697876,
        0.08710265159606934,
        -2.642848789691925
      ],
      [
        -5.002695322036743,
        0.09215638041496277,
        -2.636752724647522
      ],
      [
        -4.9922192096710205,
        0.08377879858016968,
        -2.664998471736908
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0033656343817716206,
        0.21730450391769418
      ],
      [
        0.003241656720638808,
        0.2112084388732911
      ],
      [
        0.002,
        0.21455619999675446
      ],
      [
        0.002,
        0.2201580992427625
      ]
    ],
    "approach": {
      "seam": [
        -4.999453665316104,
        0.1377466698024948,
        -2.425544285774231
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
    "seq": 13559,
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

### projection:wholly-below-support-band

```json
[
  {
    "seq": 13605,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1941:1",
    "triangleId": 371018,
    "triangle": [
      [
        4.959834814071655,
        0.07345393300056458,
        1.5748681128025055
      ],
      [
        4.959651827812195,
        0.0720570981502533,
        1.5380404889583588
      ],
      [
        4.9997347593307495,
        0.07311403751373291,
        1.5757867693901062
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.40453491192252183
      ],
      [
        0.008229094743727572,
        -0.39866894483566284
      ],
      [
        0.002000000000000001,
        -0.3988123635517527
      ]
    ],
    "approach": {
      "seam": [
        4.991505664587022,
        4.487281521704792,
        1.974455714225769
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
    "seq": 13694,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "17:0",
    "triangleId": 15910,
    "triangle": [
      [
        -4.9061208963394165,
        2.3495513573288918,
        -2.800188660621643
      ],
      [
        -4.9060580134391785,
        2.3510570428334177,
        -2.80068039894104
      ],
      [
        -4.901649653911591,
        2.3493558960035443,
        -2.8268274664878845
      ]
    ],
    "clippedApproachCoordinates": [
      [
        7.526776704192161,
        0.5746443748474119
      ],
      [
        7.526713821291923,
        0.5751361131668089
      ],
      [
        7.522521804262955,
        0.6
      ],
      [
        7.522520839738793,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        2.620655807852745,
        0.23699126585989674,
        -2.225544285774231
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 7.733989366888999
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 13758,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "1835:1",
    "eye": [
      -0.013333559036254883,
      1.6637740296723489,
      1.7744557142257698
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
    ]
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 14167,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1135:1",
    "triangleId": 87854,
    "triangle": [
      [
        -3.2680335640907288,
        2.503526248037815,
        -0.020203248132020235
      ],
      [
        -3.2507216930389404,
        2.5104114040732384,
        -0.02020751591771841
      ],
      [
        -3.25136661529541,
        2.5109087117016315,
        -0.05937970709055662
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.3946631080978063
      ],
      [
        0.002495066821574632,
        -0.3946632301434878
      ],
      [
        0.002,
        -0.42473329205173455
      ]
    ],
    "approach": {
      "seam": [
        -3.253216759860515,
        2.508970201762672,
        0.3744557142257694
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 8.367350809276102
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:body-obstruction

```json
[
  {
    "seq": 20627,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "1022:1",
    "firstFailure": "body-obstruction",
    "triangleId": 342976,
    "triangle": [
      [
        4.585399329662323,
        0.09710028767585754,
        -0.32356247305870056
      ],
      [
        4.597628712654114,
        0.15184029936790466,
        -0.33132806420326233
      ],
      [
        4.576551914215088,
        0.15155509114265442,
        -0.3417044132947922
      ]
    ],
    "position": [
      4.586666440963746,
      0.08264117505698731,
      -0.025544285774230957
    ],
    "unexecuted": [
      "remaining-body-samples",
      "final-seam"
    ]
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline large_open_interior-1-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/large_open_interior-1-42/legacy.ndjson.gz`. SHA256 `87bc658e2946a112466e7fa5b9dab7faf3126423213bec930fe8e41d0443ebc4`; 16,981 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1969 valid sampled nodes; 3288 floor tests |
| Proposals | 80 eligible; 48 attempted; 32 omitted by selection; 0 selected but not attempted |
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
    "seq": 14642,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "71:1",
    "triangleId": 744212,
    "triangle": [
      [
        4.982810020446777,
        2.1838492061942816,
        -2.615242302417755
      ],
      [
        4.9857097864151,
        2.2056095860898495,
        -2.626831829547882
      ],
      [
        4.994097054004669,
        2.1994508430361748,
        -2.592715322971344
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.5743208578345704
      ],
      [
        0.0037577256560323846,
        -0.567171037197113
      ],
      [
        0.002,
        -0.5706791555634473
      ]
    ],
    "approach": {
      "seam": [
        4.990339328348637,
        4.489995566268045,
        -2.025544285774231
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
    "seq": 14643,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "71:1",
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
    "seq": 14983,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "234:0",
    "triangleId": 8319,
    "triangle": [
      [
        -4.997979402542114,
        2.831946164369583,
        -1.8559150397777557
      ],
      [
        -4.998459815979004,
        2.8609153255820274,
        -1.8183837831020355
      ],
      [
        -4.998674392700195,
        2.8614767268300056,
        -1.8571816384792328
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.4014906862285082
      ],
      [
        0.002166730165481745,
        0.4316373527050019
      ],
      [
        0.002,
        0.4313334919831763
      ]
    ],
    "approach": {
      "seam": [
        -4.996507662534714,
        0.08674374768133963,
        -1.4255442857742309
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
python3 scripts/diagnosis/trace-query.py baseline large_open_interior-1-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
