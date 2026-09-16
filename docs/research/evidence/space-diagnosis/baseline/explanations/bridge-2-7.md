# bridge-2-7: failed

A covered wooden footbridge with parallel side walls, high roof and flat uninterrupted deck, open entrances at both ends.

Locked scale: 16. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "elevated-bridge"
  ],
  "evidence": [
    {
      "kind": "elevated-bridge",
      "source": "text",
      "cue": "footbridge"
    }
  ],
  "ambiguities": [],
  "requirements": {
    "openSky": false,
    "covered": true,
    "opposingWalls": true,
    "minimumWidth": 0.6
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/bridge-2-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/bridge-2-7/expanded.ndjson.gz`. SHA256 `cec28625089c8cf53bf3e2a815e4abfa69f7e2ba24357a6dbdccda83e7a35061`; 43,371 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 4423 valid sampled nodes; 7646 floor tests |
| Proposals | 1280 eligible; 192 attempted; 1088 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 145, "support-edge-not-found": 47}; passed 0 |
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
    "seq": 33347,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 117694,
    "triangle": [
      [
        -2.083895683288574,
        0.169342041015625,
        -7.521005153656006
      ],
      [
        -2.0677123069763184,
        0.1853961944580078,
        -7.544327735900879
      ],
      [
        -2.01051664352417,
        0.17838621139526367,
        -7.571967601776123
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0848632842302326,
        -0.04295883178710902
      ],
      [
        0.06867990791797673,
        -0.019636249542235973
      ],
      [
        0.011484244465828297,
        0.008003616333008168
      ]
    ],
    "approach": {
      "seam": [
        -1.9990323990583416,
        0.1966045558515366,
        -7.563963985443115
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 6.09265299141407
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 33348,
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
    "seq": 33456,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1833:1",
    "triangleId": 144360,
    "triangle": [
      [
        -1.1433031558990479,
        8.124064207077026,
        -0.7180870175361633
      ],
      [
        -1.1456674337387085,
        8.122507810592651,
        -0.7758967280387878
      ],
      [
        -1.0882105827331543,
        8.093044996261597,
        -0.774173378944397
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.4102921962717427
      ],
      [
        0.004760663211345051,
        -0.41020939350128227
      ],
      [
        0.002,
        -0.4073989320234407
      ]
    ],
    "approach": {
      "seam": [
        -1.0929712459444993,
        8.48904813066565,
        -0.3639639854431147
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 9.191547410190104
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 33501,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1088:1",
    "triangleId": 299544,
    "triangle": [
      [
        7.933455467224121,
        0.7972965240478516,
        -1.8981597423553467
      ],
      [
        7.934326648712158,
        0.8153038024902344,
        -1.9642289876937866
      ],
      [
        7.985132217407227,
        0.8059499263763428,
        -1.905867099761963
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.3551129962864878
      ],
      [
        0.013499552011488447,
        -0.341903114318848
      ],
      [
        0.002,
        -0.3401880072919071
      ]
    ],
    "approach": {
      "seam": [
        7.971632665395738,
        0.803904406132276,
        -1.5639639854431149
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
    "seq": 34104,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "3593:2",
    "eye": [
      -0.5916853904724118,
      1.8754413487793482,
      2.636036014556886
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
    "seq": 34365,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "3043:3",
    "triangleId": 183700,
    "triangle": [
      [
        0.5594394207000732,
        7.492588758468628,
        1.8375645875930786
      ],
      [
        0.5597537755966187,
        7.492638826370239,
        1.7759308815002441
      ],
      [
        0.6166197657585144,
        7.465616703033447,
        1.8373541831970215
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.15079569677056334,
        0.6
      ],
      [
        0.15976643860340012,
        0.5916948437690746
      ],
      [
        0.15979699877891396,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        1.208314609527589,
        3.7177643555102735,
        1.6775877445936214
      ],
      "outward": [
        0,
        0,
        1
      ],
      "width": 1.2,
      "length": 6.205325940251349
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline bridge-2-7 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/bridge-2-7/legacy.ndjson.gz`. SHA256 `ea80bcc9553f2a54579b8845135941f8d86dd04f44d5e34f3738c0415bd19892`; 33,535 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 4423 valid sampled nodes; 7646 floor tests |
| Proposals | 25 eligible; 25 attempted; 0 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 25}; passed 0 |
| Components | 0 reached-entry discoveries, 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | [] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 32367,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:2",
    "triangleId": 136020,
    "triangle": [
      [
        -1.444771647453308,
        0.17864751815795898,
        -7.881711959838867
      ],
      [
        -1.4147107601165771,
        0.18680143356323242,
        -7.90965461730957
      ],
      [
        -1.3787243366241455,
        0.18294095993041992,
        -7.920538425445557
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002000000000000001,
        0.0012738286224351567
      ],
      [
        0.005534708499908447,
        0.012961053848266069
      ],
      [
        0.002,
        0.0069481967072412745
      ]
    ],
    "approach": {
      "seam": [
        -1.3916853904724116,
        0.18872289740057308,
        -7.915003716945648
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
    "seq": 32368,
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
    "seq": 32766,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "899:0",
    "triangleId": 52,
    "triangle": [
      [
        -7.918210983276367,
        0.15226459503173828,
        -1.9525843858718872
      ],
      [
        -7.916989803314209,
        0.1534743309020996,
        -1.951532244682312
      ],
      [
        -7.913371562957764,
        0.15275049209594727,
        -1.9805328845977783
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0028926864266392016,
        -0.011379599571228027
      ],
      [
        0.002,
        -0.012148718118818578
      ],
      [
        0.002,
        -0.0062241793318169
      ]
    ],
    "approach": {
      "seam": [
        -7.915318296849728,
        0.15330518363511242,
        -1.9639639854431152
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
python3 scripts/diagnosis/trace-query.py baseline bridge-2-7 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
