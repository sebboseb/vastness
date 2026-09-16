# cave-2-42: failed

A wide cave passage through rough rock, two visible openings and a smooth level stone floor without boulders or steps.

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
      "cue": "cave"
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/cave-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/cave-2-42/expanded.ndjson.gz`. SHA256 `c558f22c97967a5ac52a05f0dc13851c299b8043a47e40f5131bcc1e1377e68f`; 17,158 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 870 valid sampled nodes; 1757 floor tests |
| Proposals | 360 eligible; 192 attempted; 168 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 168, "support-edge-not-found": 21}; passed 3 |
| Components | 2 reached-entry discoveries, 5 distinct visited nodes; not exhaustive mesh decomposition |
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
    "seq": 6860,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 37842,
    "triangle": [
      [
        -2.99712073802948,
        0.008936941623687744,
        -2.8018194437026978
      ],
      [
        -2.9991998076438904,
        0.017843663692474365,
        -2.802477478981018
      ],
      [
        -2.9994449615478516,
        0.017739593982696533,
        -2.8261565566062927
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.028658689558505923,
        0.1934105396270751
      ],
      [
        0.030737759172916324,
        0.19406857490539542
      ],
      [
        0.030982913076877505,
        0.21774765253067008
      ]
    ],
    "approach": {
      "seam": [
        -2.968462048470974,
        3.905746182379654,
        -2.6084089040756226
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
    "seq": 6861,
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
    "seq": 6905,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "869:1",
    "triangleId": 888226,
    "triangle": [
      [
        2.950825273990631,
        0.03763943910598755,
        2.216793715953827
      ],
      [
        2.9551713466644287,
        0.06123429536819458,
        2.215241253376007
      ],
      [
        2.9552485942840576,
        0.06123858690261841,
        2.190694212913513
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.006674514710902635,
        -0.37479737997055107
      ],
      [
        0.011020587384700242,
        -0.3763498425483709
      ],
      [
        0.011097835004329148,
        -0.4008968830108648
      ]
    ],
    "approach": {
      "seam": [
        2.9441507592797285,
        0.02571583690209604,
        2.591591095924378
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
    "seq": 6995,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "20:2",
    "triangleId": 613430,
    "triangle": [
      [
        0.5747886300086975,
        0.003743290901184082,
        -2.9476030468940735
      ],
      [
        0.5739791840314865,
        0.003568410873413086,
        -2.9755266308784485
      ],
      [
        0.5975583046674728,
        0.003673553466796875,
        -2.975552201271057
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.00847883264027409,
        -0.6
      ],
      [
        0.008485540747642517,
        -0.5938142806291582
      ],
      [
        0.002,
        -0.5990979343246582
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        1.191372585296631,
        0.024266326207200158,
        -2.9670666605234146
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

### projection:wholly-above-player

```json
[
  {
    "seq": 7045,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "455:1",
    "triangleId": 158750,
    "triangle": [
      [
        -2.120607912540436,
        3.4263997972011566,
        -0.20226933807134628
      ],
      [
        -2.110261559486389,
        3.429324209690094,
        -0.2026759386062622
      ],
      [
        -2.1222267150878906,
        3.4274297654628754,
        -0.22271224111318588
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.3941342965121635
      ],
      [
        0.005377650260925293,
        -0.3942670345306398
      ],
      [
        0.002,
        -0.3999230932267755
      ]
    ],
    "approach": {
      "seam": [
        -2.1156392097473145,
        0.027983961952486966,
        0.19159109592437762
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 5.2230288743972775
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 7785,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "853:0",
    "eye": [
      0.9913725852966309,
      1.676586706201203,
      2.591591095924378
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline cave-2-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/cave-2-42/legacy.ndjson.gz`. SHA256 `a5c6dccc8567bbc99e841f591c4bf3cece9774652c9e822356014d10dd020bc3`; 8,170 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 870 valid sampled nodes; 1757 floor tests |
| Proposals | 5 eligible; 5 attempted; 0 omitted by selection; 0 selected but not attempted |
| Pre-screen | {}; passed 5 |
| Components | 2 reached-entry discoveries, 5 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 0.4000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | [] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline cave-2-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
