# large_open_interior-1-7: failed

An enormous empty vaulted hall with a broad entrance and a continuous level floor, widely spaced perimeter columns and clear central space.

Locked scale: 12. Previously unresolved: False.

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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/large_open_interior-1-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/large_open_interior-1-7/expanded.ndjson.gz`. SHA256 `dde52948477f780cbc32eb41b11373b1cc14431841a8543e52242c569a95f946`; 193,974 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 2789 valid sampled nodes; 5570 floor tests |
| Proposals | 1360 eligible; 192 attempted; 1168 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 120, "support-edge-not-found": 70}; passed 2 |
| Components | 1 reached-entry discoveries, 1588 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 1358 candidates; maximum connected displacement 12.0930m |
| Topology | {"broad-covered-interior": 1358} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "boundary-directions": 47904,
  "broad-covered-region": 10889,
  "roof-coverage": 19
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 20928,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 14382,
    "triangle": [
      [
        -3.726503849029541,
        0.08558106422424316,
        -5.820611000061035
      ],
      [
        -3.7296277284622192,
        0.0869402289390564,
        -5.793217062950134
      ],
      [
        -3.7310192584991455,
        0.08605974912643433,
        -5.850279450416565
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.18850930842801428
      ],
      [
        0.002345432341098963,
        0.18548014163970983
      ],
      [
        0.0037369623780252326,
        0.2425425291061405
      ],
      [
        0.002,
        0.23112983609817317
      ]
    ],
    "approach": {
      "seam": [
        -3.7272822961211203,
        2.7960854043282737,
        -5.6077369213104244
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
    "seq": 20929,
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
    "seq": 20971,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2694:1",
    "triangleId": 423833,
    "triangle": [
      [
        3.735081911087036,
        0.08486992120742798,
        4.430872321128845
      ],
      [
        3.7286338806152344,
        0.08480679988861084,
        4.382248878479004
      ],
      [
        3.7352932691574097,
        0.08485060930252075,
        4.3833746910095215
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002133384368536662,
        -0.6
      ],
      [
        0.002,
        -0.5700250792919463
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        3.7331203326582916,
        0.0852240420377783,
        4.992263078689575
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
    "seq": 21056,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "702:1",
    "triangleId": 423468,
    "triangle": [
      [
        3.7029948234558105,
        2.400418058037758,
        -3.5756717920303345
      ],
      [
        3.7029844522476196,
        2.4108857810497284,
        -3.62075936794281
      ],
      [
        3.7348283529281616,
        2.4130649864673615,
        -3.625483989715576
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.4172706457583054
      ],
      [
        0.005211083590983545,
        -0.41774706840515163
      ],
      [
        0.002,
        -0.4127224565173359
      ]
    ],
    "approach": {
      "seam": [
        3.729617269337178,
        0.0929983835800587,
        -3.2077369213104245
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
    "seq": 21244,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2788:3",
    "triangleId": 718496,
    "triangle": [
      [
        1.6220775246620178,
        4.977220416069031,
        5.998950004577637
      ],
      [
        1.6268731355667114,
        5.027291357517242,
        6.000468492507935
      ],
      [
        1.5792322754859924,
        5.0261828899383545,
        6.000246047973633
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.5929369143321609
      ],
      [
        0.002630312740801166,
        0.5909462928771978
      ],
      [
        0.002588039203731853,
        0.6
      ],
      [
        0.002,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        2.2178194284439092,
        4.96265897299096,
        5.997838179767133
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

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 21349,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "909:2",
    "eye": [
      -2.182180571556091,
      6.628432677843177,
      -2.007736921310425
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

### predicate:boundary-directions

```json
[
  {
    "seq": 27867,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 2374,
    "topology": "broad-covered-interior",
    "valid": false,
    "firstFailure": "boundary-directions",
    "checks": [
      {
        "name": "roof-coverage",
        "status": "passed",
        "measured": 9,
        "threshold": 9
      },
      {
        "name": "boundary-directions",
        "status": "failed",
        "measured": 1,
        "threshold": 2
      },
      {
        "name": "broad-covered-region",
        "status": "not-evaluated"
      }
    ]
  }
]
```

### predicate:broad-covered-region

```json
[
  {
    "seq": 27900,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 2372,
    "topology": "broad-covered-interior",
    "valid": false,
    "firstFailure": "broad-covered-region",
    "checks": [
      {
        "name": "roof-coverage",
        "status": "passed",
        "measured": 9,
        "threshold": 9
      },
      {
        "name": "boundary-directions",
        "status": "passed",
        "measured": 2,
        "threshold": 2
      },
      {
        "name": "broad-covered-region",
        "status": "failed",
        "measured": {
          "featureKey": "2372:covered"
        }
      }
    ]
  }
]
```

### topology:broad-covered-interior

```json
[
  {
    "seq": 28127,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "broad-covered-interior",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 63585,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 314,
    "nodeId": 2603,
    "topology": "broad-covered-interior",
    "valid": false,
    "firstFailure": "roof-coverage",
    "checks": [
      {
        "name": "roof-coverage",
        "status": "failed",
        "measured": 8,
        "threshold": 9
      },
      {
        "name": "boundary-directions",
        "status": "not-evaluated"
      },
      {
        "name": "broad-covered-region",
        "status": "not-evaluated"
      }
    ]
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline large_open_interior-1-7 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/large_open_interior-1-7/legacy.ndjson.gz`. SHA256 `80bf1517b29c72814ece476f04c068f510980c5ae767da52f5d2c73a0cd7f866`; 412,539 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 2789 valid sampled nodes; 5570 floor tests |
| Proposals | 102 eligible; 34 attempted; 54 omitted by selection; 14 selected but not attempted |
| Pre-screen | {"source-projection": 30}; passed 4 |
| Components | 1 reached-entry discoveries, 1588 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 4096 candidates; maximum connected displacement 11.3719m |
| Topology | {"broad-covered-interior": 4096} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "broad-covered-region": 31053,
  "boundary-directions": 131606,
  "roof-coverage": 45
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 21629,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:2",
    "triangleId": 14736,
    "triangle": [
      [
        -3.7288055419921875,
        0.08283126354217529,
        -5.9514477252960205
      ],
      [
        -3.7318750619888306,
        0.08448708057403564,
        -5.951790690422058
      ],
      [
        -3.7285101413726807,
        0.08450764417648315,
        -5.978948950767517
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.3473917830897815
      ],
      [
        0.010573118925094604,
        -0.34632956981658936
      ],
      [
        0.002,
        -0.34642165679083
      ]
    ],
    "approach": {
      "seam": [
        -3.3821805715560913,
        2.802996756653407,
        -5.9683758318424225
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
    "seq": 21630,
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
    "seq": 21978,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "55:2",
    "triangleId": 302130,
    "triangle": [
      [
        1.5804138779640198,
        4.9804388880729675,
        -5.996338963508606
      ],
      [
        1.5846499800682068,
        5.0296520590782166,
        -5.998691439628601
      ],
      [
        1.6342468857765198,
        5.03034782409668,
        -5.9993884563446045
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0031171781027690844,
        -0.6
      ],
      [
        0.0033480435609813952,
        -0.5835725426673894
      ],
      [
        0.0024174729782647578,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        2.2178194284439092,
        4.8694841804577695,
        -5.996040412783623
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
    "seq": 22021,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "129:1",
    "triangleId": 424378,
    "triangle": [
      [
        3.7291438579559326,
        0.08542817831039429,
        -5.559614896774292
      ],
      [
        3.7304627895355225,
        0.08522826433181763,
        -5.610071182250977
      ],
      [
        3.7379729747772217,
        0.08536416292190552,
        -5.557074308395386
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.393878743470902
      ],
      [
        0.008311954140662436,
        -0.34933738708496076
      ],
      [
        0.002,
        -0.35115365904766593
      ]
    ],
    "approach": {
      "seam": [
        3.7296610206365592,
        0.09480130124997707,
        -5.207736921310425
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
    "seq": 22236,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "428:1",
    "triangleId": 423554,
    "triangle": [
      [
        3.703071355819702,
        2.4537385627627373,
        -4.569306135177612
      ],
      [
        3.7030709981918335,
        2.447928339242935,
        -4.619285702705383
      ],
      [
        3.732132911682129,
        2.456439860165119,
        -4.566779851913452
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.3602874586569502
      ],
      [
        0.002688844501971488,
        -0.35904293060302717
      ],
      [
        0.002,
        -0.35910281095992125
      ]
    ],
    "approach": {
      "seam": [
        3.7294440671801574,
        0.09442663823075427,
        -4.207736921310425
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

### predicate:broad-covered-region

```json
[
  {
    "seq": 23909,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1762,
    "topology": "broad-covered-interior",
    "valid": false,
    "firstFailure": "broad-covered-region",
    "checks": [
      {
        "name": "roof-coverage",
        "status": "passed",
        "measured": 9,
        "threshold": 9
      },
      {
        "name": "boundary-directions",
        "status": "passed",
        "measured": 2,
        "threshold": 2
      },
      {
        "name": "broad-covered-region",
        "status": "failed",
        "measured": {
          "featureKey": "1762:covered"
        }
      }
    ]
  }
]
```

### predicate:boundary-directions

```json
[
  {
    "seq": 23959,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1759,
    "topology": "broad-covered-interior",
    "valid": false,
    "firstFailure": "boundary-directions",
    "checks": [
      {
        "name": "roof-coverage",
        "status": "passed",
        "measured": 9,
        "threshold": 9
      },
      {
        "name": "boundary-directions",
        "status": "failed",
        "measured": 1,
        "threshold": 2
      },
      {
        "name": "broad-covered-region",
        "status": "not-evaluated"
      }
    ]
  }
]
```

### topology:broad-covered-interior

```json
[
  {
    "seq": 24154,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "broad-covered-interior",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 44578,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 220,
    "nodeId": 2504,
    "topology": "broad-covered-interior",
    "valid": false,
    "firstFailure": "roof-coverage",
    "checks": [
      {
        "name": "roof-coverage",
        "status": "failed",
        "measured": 8,
        "threshold": 9
      },
      {
        "name": "boundary-directions",
        "status": "not-evaluated"
      },
      {
        "name": "broad-covered-region",
        "status": "not-evaluated"
      }
    ]
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline large_open_interior-1-7 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
