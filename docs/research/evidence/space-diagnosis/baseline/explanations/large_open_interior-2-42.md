# large_open_interior-2-42: failed

A vast open warehouse interior, tall roof and large doorway, empty flat concrete floor with no furniture or central obstacles.

Locked scale: 16. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "doorway-crossing",
    "broad-covered-interior"
  ],
  "evidence": [
    {
      "kind": "doorway-crossing",
      "source": "text",
      "cue": "doorway"
    },
    {
      "kind": "broad-covered-interior",
      "source": "text",
      "cue": "warehouse"
    },
    {
      "kind": "broad-covered-interior",
      "source": "text",
      "cue": "interior"
    }
  ],
  "ambiguities": [
    "Multiple positive topology cues are conjunctive: the same supported route must witness each requirement.",
    "Alternative topology wording is not resolved by this lexical compiler; conservative conjunction retained."
  ],
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/large_open_interior-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/large_open_interior-2-42/expanded.ndjson.gz`. SHA256 `c3849f510377d9c1bf05c5b2c413e4d89eee1a8004018e33af30c4d24ab017fb`; 108,893 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 16884 valid sampled nodes; 24083 floor tests |
| Proposals | 966 eligible; 192 attempted; 774 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"support-edge-not-found": 16, "source-projection": 176}; passed 0 |
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

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 99567,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "0:0",
    "eye": [
      -5.213744354248046,
      12.434147103688936,
      -7.620225524902343
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 99613,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "16808:1",
    "triangleId": 811758,
    "triangle": [
      [
        7.735641956329346,
        0.10542011260986328,
        7.03848934173584
      ],
      [
        7.735918998718262,
        0.10525846481323242,
        6.972538948059082
      ],
      [
        7.809356689453125,
        0.10180997848510742,
        7.040745258331299
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.35653765797960546
      ],
      [
        0.020851327478885295,
        -0.3390292167663578
      ],
      [
        0.0020000000000000018,
        -0.3396061302367578
      ]
    ],
    "approach": {
      "seam": [
        7.78850536197424,
        0.17225542270738137,
        7.379774475097657
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
    "seq": 99614,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "16808:1",
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
    "seq": 99657,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "16809:3",
    "triangleId": 0,
    "triangle": [
      [
        -7.9212727546691895,
        0.7021632194519043,
        7.9679436683654785
      ],
      [
        -7.924078464508057,
        0.7397079467773438,
        7.9697265625
      ],
      [
        -7.91802453994751,
        0.6764936447143555,
        7.930805206298828
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.05615623891353483,
        0.5075284004211422
      ],
      [
        0.05793913304805631,
        0.5103341102600094
      ],
      [
        0.019017776846884438,
        0.5042801856994625
      ]
    ],
    "approach": {
      "seam": [
        -7.413744354248047,
        10.736224246338804,
        7.911787429451944
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 99753,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "8313:0",
    "triangleId": 45012,
    "triangle": [
      [
        -7.913849830627441,
        0.8951678276062012,
        -0.3993991017341614
      ],
      [
        -7.918703079223633,
        0.9396634101867676,
        -0.4004376530647278
      ],
      [
        -7.9138593673706055,
        0.8950190544128418,
        -0.46120765805244446
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.27103447169065475,
        0.3791735768318176
      ],
      [
        0.27588772028684616,
        0.38021212816238403
      ],
      [
        0.2710440084338188,
        0.4409821331501007
      ]
    ],
    "approach": {
      "seam": [
        -7.642815358936787,
        0.1742077145476426,
        -0.02022552490234375
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

### projection:wholly-above-player

```json
[
  {
    "seq": 100130,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "16154:0",
    "triangleId": 7163,
    "triangle": [
      [
        -7.998438835144043,
        5.1824780106544495,
        6.57977819442749
      ],
      [
        -7.997440814971924,
        5.245085448026657,
        6.629489421844482
      ],
      [
        -7.9980788230896,
        5.248332232236862,
        6.5794901847839355
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.2618194743990898,
        0.399996280670166
      ],
      [
        0.2608214542269707,
        0.35028505325317383
      ],
      [
        0.26145946234464645,
        0.4002842903137207
      ]
    ],
    "approach": {
      "seam": [
        -7.736619360744953,
        0.1491523105799067,
        6.979774475097656
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
python3 scripts/diagnosis/trace-query.py baseline large_open_interior-2-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/large_open_interior-2-42/legacy.ndjson.gz`. SHA256 `45e9a639132a8afa4faaa15d2e488c60ba8cc157d0bd0248a9436f8f659371f2`; 102,348 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 16884 valid sampled nodes; 24083 floor tests |
| Proposals | 0 eligible; 0 attempted; 0 omitted by selection; 0 selected but not attempted |
| Pre-screen | {}; passed 0 |
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline large_open_interior-2-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
