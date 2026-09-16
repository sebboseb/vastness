# large_open_interior-2-7: failed

A vast open warehouse interior, tall roof and large doorway, empty flat concrete floor with no furniture or central obstacles.

Locked scale: 12. Previously unresolved: True.

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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/large_open_interior-2-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/large_open_interior-2-7/expanded.ndjson.gz`. SHA256 `04f0166f599adac32a723c292bfae00d5ac56f7d4bf75c6c0a4adf62250f69df`; 94,694 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 5573 valid sampled nodes; 7988 floor tests |
| Proposals | 1464 eligible; 192 attempted; 1272 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 164, "support-edge-not-found": 24}; passed 4 |
| Components | 2 reached-entry discoveries, 1015 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 643 candidates; maximum connected displacement 10.0896m |
| Topology | {"doorway-crossing": 643} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 22602,
  "left-flank": 204,
  "opposite-crossing-sides": 45,
  "right-flank": 63
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 35839,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 58466,
    "triangle": [
      [
        -5.985119462013245,
        0.007847785949707031,
        -5.796996474266052
      ],
      [
        -5.996865391731262,
        0.015572190284729004,
        -5.796501159667969
      ],
      [
        -5.99778413772583,
        0.013836264610290527,
        -5.852550745010376
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.08995304554700834,
        0.1835825681686405
      ],
      [
        0.10169897526502591,
        0.183087253570557
      ],
      [
        0.10261772125959379,
        0.23913683891296422
      ]
    ],
    "approach": {
      "seam": [
        -5.895166416466236,
        7.98085921254091,
        -5.613413906097412
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
    "seq": 35840,
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
    "seq": 35886,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "5572:1",
    "triangleId": 1577972,
    "triangle": [
      [
        5.993249416351318,
        0.05817675590515137,
        5.181609034538269
      ],
      [
        6.007458686828613,
        0.08839845657348633,
        5.180678129196167
      ],
      [
        5.993524074554443,
        0.05831480026245117,
        5.2293219566345215
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.40514766298969845
      ],
      [
        0.013605189323423694,
        -0.4059079647064223
      ],
      [
        0.002,
        -0.36539583449921964
      ]
    ],
    "approach": {
      "seam": [
        5.99385349750519,
        0.19364203547189665,
        5.586586093902589
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
    "seq": 36246,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "3352:2",
    "eye": [
      -5.62136754989624,
      9.702821089955831,
      0.9865860939025879
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 36549,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "424:1",
    "triangleId": 360639,
    "triangle": [
      [
        -1.4702507257461548,
        3.1750885248184204,
        -4.9918001890182495
      ],
      [
        -1.4830617606639862,
        3.182424008846283,
        -5.038378000259399
      ],
      [
        -1.4667667150497437,
        3.1829549968242645,
        -5.039966940879822
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.4262895114051709
      ],
      [
        0.004702508449553777,
        -0.42655303478241
      ],
      [
        0.002,
        -0.389190619670554
      ]
    ],
    "approach": {
      "seam": [
        -1.4714692234992974,
        3.1335681312752874,
        -4.613413906097412
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 7.581335461139678
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 37176,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2433:0",
    "triangleId": 29566,
    "triangle": [
      [
        -6.000213861465454,
        8.124713659286499,
        -0.575266644358635
      ],
      [
        -6.002514123916626,
        8.164901375770569,
        -0.5762908011674881
      ],
      [
        -6.000288963317871,
        8.124305248260498,
        -0.6236697435379028
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.03751172344962479
      ],
      [
        0.002872839570045471,
        -0.037123104929923656
      ],
      [
        0.002,
        -0.018538282013796956
      ]
    ],
    "approach": {
      "seam": [
        -5.9996412843465805,
        0.046324534296275095,
        -0.6134139060974118
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

### predicate:roof-coverage

```json
[
  {
    "seq": 39510,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 1,
    "nodeId": 32,
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

### topology:doorway-crossing

```json
[
  {
    "seq": 39721,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [
      "broad-covered-interior",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 70487,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 320,
    "nodeId": 1205,
    "routeIndex": 1,
    "axis": [
      1,
      0,
      0
    ],
    "left": null,
    "right": {
      "id": 865466,
      "distance": 1.4395402068636967
    },
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

### predicate:opposite-crossing-sides

```json
[
  {
    "seq": 70547,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 320,
    "nodeId": 1574,
    "routeIndex": 4,
    "axis": [
      1,
      0,
      0
    ],
    "before": -1,
    "after": -1,
    "beforeSigned": null,
    "afterSigned": null,
    "minimumSignedMagnitude": 0.8,
    "firstFailure": "opposite-crossing-sides",
    "unexecuted": [
      "wider-regions"
    ]
  }
]
```

### predicate:right-flank

```json
[
  {
    "seq": 70647,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 320,
    "nodeId": 2203,
    "routeIndex": 9,
    "axis": [
      1,
      0,
      0
    ],
    "left": {
      "id": 79682,
      "distance": 1.9225869058399754
    },
    "right": null,
    "minimumWidth": 2.4,
    "rayMaximum": 3,
    "firstFailure": "right-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ]
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline large_open_interior-2-7 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/large_open_interior-2-7/legacy.ndjson.gz`. SHA256 `62f4b4eb159a6f8fc84dfe3eea77fc5689bcb2ce7c985dbc26c6efd279213158`; 94,579 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 5573 valid sampled nodes; 7988 floor tests |
| Proposals | 323 eligible; 48 attempted; 275 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 42}; passed 6 |
| Components | 2 reached-entry discoveries, 1015 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 665 candidates; maximum connected displacement 9.8955m |
| Topology | {"doorway-crossing": 665} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 21939,
  "left-flank": 1022,
  "opposite-crossing-sides": 210,
  "right-flank": 270
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 41077,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2:2",
    "triangleId": 126126,
    "triangle": [
      [
        -4.852574944496155,
        4.135828231461346,
        -5.99885630607605
      ],
      [
        -4.85230278968811,
        4.1834910325706005,
        -5.999013662338257
      ],
      [
        -4.805449962615967,
        4.183494435623288,
        -5.999117016792297
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002027146396210013,
        -0.6
      ],
      [
        0.0020622596144681538,
        -0.5840824127197264
      ],
      [
        0.002,
        -0.5953362010024192
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -4.22136754989624,
        8.12031560094527,
        -5.997054757177829
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
    "seq": 41078,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "2:2",
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
    "seq": 41261,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "28:2",
    "triangleId": 529824,
    "triangle": [
      [
        0.7312372773885727,
        7.99070405960083,
        -6.002459764480591
      ],
      [
        0.7335568964481354,
        8.045352816581726,
        -6.004134178161621
      ],
      [
        0.7812724113464355,
        8.046442866325378,
        -6.003790855407715
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0022508805464227233,
        -0.6
      ],
      [
        0.002231885492801844,
        -0.5973600387573246
      ],
      [
        0.002161654273654042,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        1.3786324501037601,
        8.076686627055295,
        -6.001558969914913
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

### predicate:roof-coverage

```json
[
  {
    "seq": 43302,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 1,
    "nodeId": 160,
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

### topology:doorway-crossing

```json
[
  {
    "seq": 43498,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [
      "broad-covered-interior",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 83933,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "607:0",
    "triangleId": 46680,
    "triangle": [
      [
        -5.997761964797974,
        0.054190993309020996,
        -4.20069694519043
      ],
      [
        -5.9850733280181885,
        0.08043980598449707,
        -4.217923521995544
      ],
      [
        -6.008912801742554,
        0.05224621295928955,
        -4.238131284713745
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        0.41845884346952666
      ],
      [
        0.009383310377597098,
        0.4247173786163332
      ],
      [
        0.001999999999999999,
        0.39993095685672453
      ]
    ],
    "approach": {
      "seam": [
        -5.999529491364957,
        0.052760249771676176,
        -3.813413906097412
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

### predicate:left-flank

```json
[
  {
    "seq": 84971,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 624,
    "nodeId": 963,
    "routeIndex": 1,
    "axis": [
      1,
      0,
      0
    ],
    "left": null,
    "right": {
      "id": 865466,
      "distance": 1.0395401136979938
    },
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

### predicate:opposite-crossing-sides

```json
[
  {
    "seq": 85071,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 624,
    "nodeId": 1574,
    "routeIndex": 6,
    "axis": [
      1,
      0,
      0
    ],
    "before": -1,
    "after": -1,
    "beforeSigned": null,
    "afterSigned": null,
    "minimumSignedMagnitude": 0.8,
    "firstFailure": "opposite-crossing-sides",
    "unexecuted": [
      "wider-regions"
    ]
  }
]
```

### predicate:right-flank

```json
[
  {
    "seq": 85171,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 624,
    "nodeId": 2203,
    "routeIndex": 11,
    "axis": [
      1,
      0,
      0
    ],
    "left": {
      "id": 79682,
      "distance": 1.9225869058399754
    },
    "right": null,
    "minimumWidth": 2.4,
    "rayMaximum": 3,
    "firstFailure": "right-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ]
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 93166,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2364:0",
    "triangleId": 29566,
    "triangle": [
      [
        -6.000213861465454,
        8.124713659286499,
        -0.575266644358635
      ],
      [
        -6.002514123916626,
        8.164901375770569,
        -0.5762908011674881
      ],
      [
        -6.000288963317871,
        8.124305248260498,
        -0.6236697435379028
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.23758871500564452
      ],
      [
        0.0030457630753506493,
        -0.23712310492992383
      ],
      [
        0.002,
        -0.21485633078882552
      ]
    ],
    "approach": {
      "seam": [
        -5.999468360841275,
        0.04729037592463329,
        -0.8134139060974119
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
python3 scripts/diagnosis/trace-query.py baseline large_open_interior-2-7 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
