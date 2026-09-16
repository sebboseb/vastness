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

Complete trace: `.runtime/space-diagnosis/coverage/candidates/large_open_interior-2-7/expanded.ndjson.gz`. SHA256 `ac86209148fdbdb8320985d770f50619e695ecf9332d579fbe11153b20fad6f1`; 318,845 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 5573 valid sampled nodes; 7988 floor tests |
| Proposals | Returned pass: 1464 eligible; 192 attempted. All trace passes: 3816 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 164, "support-edge-not-found": 72, "entry-prism-blocked": 290, "source-entry-prism": 290, "exterior-approach-limit": 34}; passed 16 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 1015 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 2607 candidate events. Returned pass: maximum connected displacement 10.2489m |
| Topology | {"doorway-crossing": 2607} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 92186,
  "left-flank": 894,
  "opposite-crossing-sides": 195,
  "right-flank": 255
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

Per-pass event counts (nested predecessor identity is retained in each complete trace event):

```json
{
  "single": {
    "result:begin": 1,
    "result:complete": 1
  },
  "predecessor": {
    "result:coverage-pass-start": 1,
    "result:entry-pass-start": 2,
    "result:assessment-start": 2,
    "support:grid": 2,
    "support:column": 7688,
    "support:rejected": 4830,
    "support:node": 11146,
    "proposal:eligible": 2928,
    "proposal:direction-excluded": 41656,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 2544,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 17534,
    "prescreen:projection-start": 319,
    "prescreen:projection-blocked": 164,
    "prescreen:rejected": 309,
    "prescreen:support-edge-not-found": 48,
    "prescreen:body-sample": 382,
    "prescreen:passed": 10,
    "component:entry-search": 10,
    "component:node-visited": 5075,
    "edge:tested": 14428,
    "component:node-discovered": 5065,
    "route:candidate": 1625,
    "topology:ray": 26759,
    "topology:node-feature": 1931,
    "topology:aperture-node": 57394,
    "topology:route-rejected": 1625,
    "topology:aperture-axis": 828,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 145,
    "prescreen:entry-prism-proof": 151,
    "prescreen:exterior-approach-limit": 17,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 3844,
    "support:rejected": 2415,
    "support:node": 5573,
    "proposal:eligible": 1464,
    "proposal:direction-excluded": 20828,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 1272,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 8767,
    "prescreen:projection-start": 151,
    "prescreen:entry-prism-blocked": 145,
    "prescreen:entry-prism-proof": 151,
    "prescreen:rejected": 145,
    "prescreen:body-sample": 230,
    "prescreen:passed": 6,
    "route:stream-admitted": 6,
    "prescreen:support-edge-not-found": 24,
    "prescreen:exterior-approach-limit": 17,
    "route:scheduler-start": 1,
    "route:stream-resumed": 988,
    "component:entry-search": 6,
    "component:node-visited": 3045,
    "edge:tested": 7214,
    "component:node-discovered": 3039,
    "route:candidate": 982,
    "topology:ray": 13902,
    "topology:node-feature": 990,
    "topology:aperture-node": 34792,
    "topology:route-rejected": 982,
    "route:stream-suspended": 982,
    "topology:aperture-axis": 516,
    "route:stream-complete": 6,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 35841,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 35842,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 35888,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 36248,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 36551,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 37178,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 39512,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 39723,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [
      "broad-covered-interior",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 70489,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:opposite-crossing-sides

```json
[
  {
    "seq": 70549,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:right-flank

```json
[
  {
    "seq": 70649,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 130534,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 58796,
    "triangle": [
      [
        -6.00055718421936,
        7.696275472640991,
        -5.793694496154785
      ],
      [
        -6.000894069671631,
        7.743035674095154,
        -5.794395089149475
      ],
      [
        -6.000918388366699,
        7.697544693946838,
        -5.8550437688827515
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.10563992747645867,
        0.18079874706163296,
        7.73085921254091
      ],
      [
        0.10572765320539457,
        0.18098118305206334,
        7.743035674095154
      ],
      [
        0.10573416253217943,
        0.19721486970115695,
        7.73085921254091
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
    "supportBand": [
      7.73085921254091,
      7.99585921254091
    ],
    "bodyBand": [
      7.99585921254091,
      9.78085921254091
    ],
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 130536,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### prescreen:exterior-approach-limit

```json
[
  {
    "seq": 164175,
    "stage": "prescreen",
    "kind": "exterior-approach-limit",
    "proposalId": "1451:1",
    "seam": [
      -5.124928939342499,
      8.067838659691732,
      -2.413413906097412
    ],
    "distanceToBounds": 11.13479517698288,
    "startDistance": 11.53479517698288,
    "requiredLength": 11.834795176982881,
    "maximumLength": 10,
    "unexecuted": [
      "projection",
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py coverage large_open_interior-2-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/coverage/candidates/large_open_interior-2-7/legacy.ndjson.gz`. SHA256 `a7fdbfb10dcdfd1fd08c2b82953df918a2f4e69d2aee1850231e60d63eda2928`; 291,662 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 5573 valid sampled nodes; 7988 floor tests |
| Proposals | Returned pass: 323 eligible; 48 attempted. All trace passes: 825 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 42, "entry-prism-blocked": 80, "source-entry-prism": 80}; passed 22 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 1015 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 2043 candidate events. Returned pass: maximum connected displacement 9.8955m |
| Topology | {"doorway-crossing": 2043} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 65817,
  "left-flank": 4186,
  "opposite-crossing-sides": 870,
  "right-flank": 1090
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

Per-pass event counts (nested predecessor identity is retained in each complete trace event):

```json
{
  "single": {
    "result:begin": 1,
    "result:complete": 1
  },
  "predecessor": {
    "result:coverage-pass-start": 1,
    "result:entry-pass-start": 2,
    "result:assessment-start": 2,
    "support:grid": 2,
    "support:column": 7688,
    "support:rejected": 4830,
    "support:node": 11146,
    "proposal:direction-excluded": 43002,
    "proposal:legacy-body-sample": 13164,
    "proposal:eligible": 646,
    "proposal:direction-unexecuted": 936,
    "proposal:selected": 96,
    "proposal:omitted": 550,
    "budget:exhausted": 2,
    "proposal:attempt": 96,
    "prescreen:edge-support-probe": 4436,
    "prescreen:projection-start": 96,
    "prescreen:projection-blocked": 42,
    "prescreen:rejected": 82,
    "prescreen:body-sample": 560,
    "prescreen:passed": 14,
    "component:entry-search": 14,
    "component:node-visited": 3350,
    "edge:tested": 14428,
    "component:node-discovered": 3336,
    "route:candidate": 1354,
    "topology:ray": 31555,
    "topology:node-feature": 1839,
    "topology:aperture-node": 43878,
    "topology:route-rejected": 1354,
    "topology:aperture-axis": 3824,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 40,
    "prescreen:entry-prism-proof": 48,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 3844,
    "support:rejected": 2415,
    "support:node": 5573,
    "proposal:direction-excluded": 21501,
    "proposal:legacy-body-sample": 6582,
    "proposal:eligible": 323,
    "proposal:direction-unexecuted": 468,
    "proposal:selected": 48,
    "proposal:omitted": 275,
    "budget:exhausted": 1,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2218,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 40,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 40,
    "prescreen:body-sample": 320,
    "prescreen:passed": 8,
    "route:stream-admitted": 8,
    "route:scheduler-start": 1,
    "route:stream-resumed": 697,
    "component:entry-search": 8,
    "component:node-visited": 1807,
    "edge:tested": 7214,
    "component:node-discovered": 1799,
    "route:candidate": 689,
    "topology:ray": 16643,
    "topology:node-feature": 923,
    "topology:aperture-node": 21939,
    "topology:route-rejected": 689,
    "route:stream-suspended": 689,
    "topology:aperture-axis": 2322,
    "route:stream-complete": 8,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 41079,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 41080,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "2:2",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 41263,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 43304,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 43500,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [
      "broad-covered-interior",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 83935,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 84973,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:opposite-crossing-sides

```json
[
  {
    "seq": 85073,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:right-flank

```json
[
  {
    "seq": 85173,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 93168,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 135657,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "2:2",
    "triangleId": 126284,
    "triangle": [
      [
        -4.8518418073654175,
        7.844754695892334,
        -5.999962091445923
      ],
      [
        -4.851924777030945,
        7.8890297412872314,
        -5.999949216842651
      ],
      [
        -4.804859519004822,
        7.888924956321716,
        -6.00003719329834
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0029515785812315167,
        -0.6,
        7.888961709407118
      ],
      [
        0.0029824361205106342,
        -0.5834919691085814,
        7.888924956321716
      ],
      [
        0.0029560477996568913,
        -0.6,
        7.873404979558265
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
    "supportBand": [
      7.87031560094527,
      8.13531560094527
    ],
    "bodyBand": [
      8.13531560094527,
      9.92031560094527
    ],
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 135659,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "2:2",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py coverage large_open_interior-2-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
