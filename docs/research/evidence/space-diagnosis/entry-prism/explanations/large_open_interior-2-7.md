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

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/large_open_interior-2-7/expanded.ndjson.gz`. SHA256 `7de28adec8fd308bd474e29ff5091d84ee7347a72839ba49de236004af64d3a8`; 205,777 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 5573 valid sampled nodes; 7988 floor tests |
| Proposals | Returned pass: 1464 eligible; 192 attempted. All trace passes: 2544 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 164, "support-edge-not-found": 48, "entry-prism-blocked": 145, "source-entry-prism": 145, "exterior-approach-limit": 17}; passed 10 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 1015 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 1625 candidate events. Returned pass: maximum connected displacement 10.2489m |
| Topology | {"doorway-crossing": 1625} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 57394,
  "left-flank": 549,
  "opposite-crossing-sides": 120,
  "right-flank": 159
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
  "baseline": {
    "result:entry-pass-start": 1,
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
    "prescreen:projection-start": 168,
    "prescreen:projection-blocked": 164,
    "prescreen:rejected": 164,
    "prescreen:support-edge-not-found": 24,
    "prescreen:body-sample": 152,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 2030,
    "edge:tested": 7214,
    "component:node-discovered": 2026,
    "route:candidate": 643,
    "topology:ray": 12857,
    "topology:node-feature": 941,
    "topology:aperture-node": 22602,
    "topology:route-rejected": 643,
    "topology:aperture-axis": 312,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
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
    "component:entry-search": 6,
    "component:node-visited": 3045,
    "edge:tested": 7214,
    "component:node-discovered": 3039,
    "route:candidate": 982,
    "topology:ray": 13902,
    "topology:node-feature": 990,
    "topology:aperture-node": 34792,
    "topology:route-rejected": 982,
    "prescreen:support-edge-not-found": 24,
    "prescreen:exterior-approach-limit": 17,
    "topology:aperture-axis": 516,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 35840,
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
    "pass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 35841,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "baseline"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 35887,
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
    "pass": "baseline"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 36247,
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
    "pass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 36550,
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
    "pass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 37177,
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
    "pass": "baseline"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 39511,
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
    "pass": "baseline"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 39722,
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
    "pass": "baseline"
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 70488,
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
    "pass": "baseline"
  }
]
```

### predicate:opposite-crossing-sides

```json
[
  {
    "seq": 70548,
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
    "pass": "baseline"
  }
]
```

### predicate:right-flank

```json
[
  {
    "seq": 70648,
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
    "pass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 130533,
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
    "pass": "entry-prism"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 130535,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "entry-prism"
  }
]
```

### prescreen:exterior-approach-limit

```json
[
  {
    "seq": 164174,
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
    "pass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py entry-prism large_open_interior-2-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/large_open_interior-2-7/legacy.ndjson.gz`. SHA256 `f0c10e25fca8398e8943f43a487bd6c89c1d7bdcfe4e58f536e3641610c16dbf`; 192,418 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 5573 valid sampled nodes; 7988 floor tests |
| Proposals | Returned pass: 323 eligible; 48 attempted. All trace passes: 550 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 42, "entry-prism-blocked": 40, "source-entry-prism": 40}; passed 14 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 1015 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 1354 candidate events. Returned pass: maximum connected displacement 9.8955m |
| Topology | {"doorway-crossing": 1354} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 43878,
  "left-flank": 2604,
  "opposite-crossing-sides": 540,
  "right-flank": 680
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
  "baseline": {
    "result:entry-pass-start": 1,
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
    "prescreen:projection-blocked": 42,
    "prescreen:rejected": 42,
    "prescreen:body-sample": 240,
    "prescreen:passed": 6,
    "component:entry-search": 6,
    "component:node-visited": 1543,
    "edge:tested": 7214,
    "component:node-discovered": 1537,
    "route:candidate": 665,
    "topology:ray": 14912,
    "topology:node-feature": 916,
    "topology:aperture-node": 21939,
    "topology:route-rejected": 665,
    "topology:aperture-axis": 1502,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
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
    "component:entry-search": 8,
    "component:node-visited": 1807,
    "edge:tested": 7214,
    "component:node-discovered": 1799,
    "route:candidate": 689,
    "topology:ray": 16643,
    "topology:node-feature": 923,
    "topology:aperture-node": 21939,
    "topology:route-rejected": 689,
    "topology:aperture-axis": 2322,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 41078,
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
    "pass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 41079,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "2:2",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "baseline"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 41262,
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
    "pass": "baseline"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 43303,
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
    "pass": "baseline"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 43499,
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
    "pass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 83934,
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
    "pass": "baseline"
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 84972,
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
    "pass": "baseline"
  }
]
```

### predicate:opposite-crossing-sides

```json
[
  {
    "seq": 85072,
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
    "pass": "baseline"
  }
]
```

### predicate:right-flank

```json
[
  {
    "seq": 85172,
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
    "pass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 93167,
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
    "pass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 135656,
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
    "pass": "entry-prism"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 135658,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "2:2",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py entry-prism large_open_interior-2-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
