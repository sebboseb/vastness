# courtyard-2-7: failed

A square cloister courtyard with a wide doorway, level tiled floor and empty central space bordered by covered arcades.

Locked scale: 6. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "open-courtyard",
    "doorway-crossing"
  ],
  "evidence": [
    {
      "kind": "open-courtyard",
      "source": "text",
      "cue": "courtyard"
    },
    {
      "kind": "doorway-crossing",
      "source": "text",
      "cue": "doorway"
    }
  ],
  "ambiguities": [
    "Multiple positive topology cues are conjunctive: the same supported route must witness each requirement.",
    "Both open-sky and covered requirements occur; they must be witnessed on different route portions."
  ],
  "requirements": {
    "openSky": true,
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/courtyard-2-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/courtyard-2-7/expanded.ndjson.gz`. SHA256 `6b1929b37b58b5f1cdbd16f26db01704ddb900a4f78264f2a79eb20b498292a1`; 122,967 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 644 valid sampled nodes; 1214 floor tests |
| Proposals | Returned pass: 356 eligible; 192 attempted. All trace passes: 492 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 127, "support-edge-not-found": 189, "entry-prism-blocked": 254, "source-entry-prism": 254}; passed 6 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 454 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 792 candidate events. Returned pass: maximum connected displacement 6.6483m |
| Topology | {"open-courtyard": 792} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "open-sky": 16410,
  "boundary-directions": 5961
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
    "support:column": 1920,
    "support:rejected": 1134,
    "support:node": 1288,
    "support:duplicate-layer": 6,
    "proposal:eligible": 712,
    "proposal:direction-excluded": 4440,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 328,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 19342,
    "prescreen:projection-start": 258,
    "prescreen:projection-blocked": 127,
    "prescreen:rejected": 254,
    "prescreen:body-sample": 154,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 1816,
    "edge:tested": 2950,
    "component:node-discovered": 1812,
    "route:candidate": 528,
    "topology:ray": 11206,
    "topology:node-feature": 862,
    "topology:node-predicate": 14914,
    "topology:sustained-sample": 14914,
    "topology:sustained-result": 528,
    "topology:route-rejected": 528,
    "prescreen:support-edge-not-found": 126,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 127,
    "prescreen:entry-prism-proof": 129,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 960,
    "support:rejected": 567,
    "support:node": 644,
    "support:duplicate-layer": 3,
    "proposal:eligible": 356,
    "proposal:direction-excluded": 2220,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 164,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9671,
    "prescreen:projection-start": 129,
    "prescreen:entry-prism-blocked": 127,
    "prescreen:entry-prism-proof": 129,
    "prescreen:rejected": 127,
    "prescreen:body-sample": 77,
    "prescreen:passed": 2,
    "route:stream-admitted": 2,
    "prescreen:support-edge-not-found": 63,
    "route:scheduler-start": 1,
    "route:stream-resumed": 266,
    "component:entry-search": 2,
    "component:node-visited": 908,
    "edge:tested": 1475,
    "component:node-discovered": 906,
    "route:candidate": 264,
    "topology:ray": 5603,
    "topology:node-feature": 431,
    "topology:node-predicate": 7457,
    "topology:sustained-sample": 7457,
    "topology:sustained-result": 264,
    "topology:route-rejected": 264,
    "route:stream-suspended": 264,
    "route:stream-complete": 2,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 5348,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 2047,
    "triangle": [
      [
        -2.8010873794555664,
        0.012207984924316406,
        -2.8466280698776245
      ],
      [
        -2.801933169364929,
        0.02801889181137085,
        -2.822554349899292
      ],
      [
        -2.8021203875541687,
        0.02821826934814453,
        -2.846397578716278
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.2298171408161503
      ],
      [
        0.0020726606249805712,
        0.23907085657119742
      ],
      [
        0.002,
        0.23908706905961702
      ]
    ],
    "approach": {
      "seam": [
        -2.800047726929188,
        0.10400546865822796,
        -2.6073267221450807
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
    "seq": 5349,
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

### projection:wholly-below-support-band

```json
[
  {
    "seq": 5430,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "323:2",
    "triangleId": 149310,
    "triangle": [
      [
        -0.6211182028055191,
        3.368766635656357,
        -2.797304928302765
      ],
      [
        -0.6095497906208038,
        3.3705354630947113,
        -2.7972861528396606
      ],
      [
        -0.6042141169309616,
        3.370496481657028,
        -2.8103633522987366
      ]
    ],
    "clippedApproachCoordinates": [
      [
        2.693258723084285,
        -0.6
      ],
      [
        2.6982754349708555,
        -0.5979531139135363
      ],
      [
        2.6966942133309013,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.006261003017425271,
        4.041940277158333,
        -0.11208791732788087
      ],
      "outward": [
        0,
        0,
        -1
      ],
      "width": 1.2,
      "length": 2.9952388048171996
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:open-sky

```json
[
  {
    "seq": 6883,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 11,
    "topology": "open-courtyard",
    "valid": false,
    "firstFailure": "open-sky",
    "checks": [
      {
        "name": "open-sky",
        "status": "failed",
        "measured": 9,
        "threshold": 0
      },
      {
        "name": "boundary-directions",
        "status": "not-evaluated"
      },
      {
        "name": "broad-open-region",
        "status": "not-evaluated"
      },
      {
        "name": "ground-relative-elevation",
        "status": "not-evaluated"
      }
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:open-courtyard

```json
[
  {
    "seq": 7142,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "open-courtyard",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:boundary-directions

```json
[
  {
    "seq": 10739,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 21,
    "nodeId": 102,
    "topology": "open-courtyard",
    "valid": false,
    "firstFailure": "boundary-directions",
    "checks": [
      {
        "name": "open-sky",
        "status": "passed",
        "measured": 0,
        "threshold": 0
      },
      {
        "name": "boundary-directions",
        "status": "failed",
        "measured": 0,
        "threshold": 3
      },
      {
        "name": "broad-open-region",
        "status": "not-evaluated"
      },
      {
        "name": "ground-relative-elevation",
        "status": "not-evaluated"
      }
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 20590,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "213:1",
    "eye": [
      0.7937389969825746,
      1.7709183315174417,
      -1.0073267221450806
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
    "seq": 20768,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "472:1",
    "triangleId": 259520,
    "triangle": [
      [
        1.252589464187622,
        3.1507904827594757,
        0.8078259229660034
      ],
      [
        1.252013772726059,
        3.1502782702445984,
        0.7846384048461914
      ],
      [
        1.267180860042572,
        3.1365606486797333,
        0.7828298807144165
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.4096665909403987
      ],
      [
        0.003482775390147852,
        -0.4098433971405031
      ],
      [
        0.002,
        -0.4073033031926595
      ]
    ],
    "approach": {
      "seam": [
        1.2636980846524242,
        0.13218363347815318,
        1.1926732778549196
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 21072,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "639:3",
    "triangleId": 559786,
    "triangle": [
      [
        0.2038317248225212,
        3.6556005477905273,
        3.0023410320281982
      ],
      [
        0.20153850317001343,
        3.676498532295227,
        3.003317356109619
      ],
      [
        0.17832894623279572,
        3.677485764026642,
        3.003114938735962
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.3920536229058142
      ],
      [
        0.0020625293254843413,
        0.3922004938125614
      ],
      [
        0.002,
        0.39937022392936566
      ]
    ],
    "approach": {
      "seam": [
        0.5937389969825748,
        3.6009381570106793,
        3.001254826784135
      ],
      "outward": [
        0,
        0,
        1
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
    "seq": 46071,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 2047,
    "triangle": [
      [
        -2.8010873794555664,
        0.012207984924316406,
        -2.8466280698776245
      ],
      [
        -2.801933169364929,
        0.02801889181137085,
        -2.822554349899292
      ],
      [
        -2.8021203875541687,
        0.02821826934814453,
        -2.846397578716278
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.002,
        0.2298171408161503,
        0.028140889599478497
      ],
      [
        0.0020726606249805712,
        0.23907085657119742,
        0.02821826934814453
      ],
      [
        0.002,
        0.23908706905961702,
        0.02709212399272469
      ]
    ],
    "approach": {
      "seam": [
        -2.800047726929188,
        0.10400546865822796,
        -2.6073267221450807
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
      -0.14599453134177204,
      0.11900546865822796
    ],
    "bodyBand": [
      0.11900546865822796,
      1.904005468658228
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
    "seq": 46073,
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope courtyard-2-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/courtyard-2-7/legacy.ndjson.gz`. SHA256 `efa63e403a6438b4279ce734b36adaaf6fa0c2d90248e9c33db1f30d23453414`; 147,293 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 644 valid sampled nodes; 1214 floor tests |
| Proposals | Returned pass: 174 eligible; 48 attempted. All trace passes: 378 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 46, "entry-prism-blocked": 92, "source-entry-prism": 92}; passed 6 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 454 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 1461 candidate events. Returned pass: maximum connected displacement 6.2482m |
| Topology | {"open-courtyard": 1461} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "open-sky": 28644,
  "boundary-directions": 12078
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
    "support:column": 1920,
    "support:rejected": 1134,
    "support:node": 1288,
    "support:duplicate-layer": 6,
    "proposal:legacy-body-sample": 6552,
    "proposal:eligible": 348,
    "proposal:direction-unexecuted": 608,
    "proposal:direction-excluded": 4196,
    "proposal:selected": 96,
    "proposal:omitted": 252,
    "budget:exhausted": 2,
    "proposal:attempt": 96,
    "prescreen:edge-support-probe": 4456,
    "prescreen:projection-start": 96,
    "prescreen:projection-blocked": 46,
    "prescreen:rejected": 92,
    "prescreen:body-sample": 162,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 1816,
    "edge:tested": 2950,
    "component:node-discovered": 1812,
    "route:candidate": 974,
    "topology:ray": 11388,
    "topology:node-feature": 876,
    "topology:node-predicate": 27148,
    "topology:sustained-sample": 27148,
    "topology:sustained-result": 974,
    "topology:route-rejected": 974,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 46,
    "prescreen:entry-prism-proof": 48,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 960,
    "support:rejected": 567,
    "support:node": 644,
    "support:duplicate-layer": 3,
    "proposal:legacy-body-sample": 3276,
    "proposal:eligible": 174,
    "proposal:direction-unexecuted": 304,
    "proposal:direction-excluded": 2098,
    "proposal:selected": 48,
    "proposal:omitted": 126,
    "budget:exhausted": 1,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2228,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 46,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 46,
    "prescreen:body-sample": 81,
    "prescreen:passed": 2,
    "route:stream-admitted": 2,
    "route:scheduler-start": 1,
    "route:stream-resumed": 489,
    "component:entry-search": 2,
    "component:node-visited": 908,
    "edge:tested": 1475,
    "component:node-discovered": 906,
    "route:candidate": 487,
    "topology:ray": 5694,
    "topology:node-feature": 438,
    "topology:node-predicate": 13574,
    "topology:sustained-sample": 13574,
    "topology:sustained-result": 487,
    "topology:route-rejected": 487,
    "route:stream-suspended": 487,
    "route:stream-complete": 2,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 8250,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 2047,
    "triangle": [
      [
        -2.8010873794555664,
        0.012207984924316406,
        -2.8466280698776245
      ],
      [
        -2.801933169364929,
        0.02801889181137085,
        -2.822554349899292
      ],
      [
        -2.8021203875541687,
        0.02821826934814453,
        -2.846397578716278
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.2298171408161503
      ],
      [
        0.0020726606249805712,
        0.23907085657119742
      ],
      [
        0.002,
        0.23908706905961702
      ]
    ],
    "approach": {
      "seam": [
        -2.800047726929188,
        0.10400546865822796,
        -2.6073267221450807
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
    "seq": 8251,
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

### projection:wholly-above-player

```json
[
  {
    "seq": 8342,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "7:2",
    "triangleId": 125594,
    "triangle": [
      [
        -1.0288475453853607,
        3.3266164362430573,
        -3.0015907287597656
      ],
      [
        -1.0230024755001068,
        3.3434667885303497,
        -3.000905156135559
      ],
      [
        -1.0044866502285004,
        3.348928213119507,
        -3.001896858215332
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0021505205217359226,
        -0.6
      ],
      [
        0.002245554327964694,
        -0.5982256472110752
      ],
      [
        0.002223257049898403,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.4062610030174252,
        0.10640095493435847,
        -2.9996513038873673
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

### projection:wholly-below-support-band

```json
[
  {
    "seq": 8388,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "10:2",
    "triangleId": 150581,
    "triangle": [
      [
        -0.5981326103210449,
        0.0009430646896362305,
        -2.9942679405212402
      ],
      [
        -0.6210725605487823,
        0.005935192108154297,
        -3.00167977809906
      ],
      [
        -0.5979315787553787,
        0.005974709987640381,
        -3.0016093254089355
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.006511847800473685,
        -0.6
      ],
      [
        0.006486488878726604,
        -0.5916705757379535
      ],
      [
        0.002,
        -0.5917934307438456
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.006261003017425271,
        3.7010943539268912,
        -2.995122836530209
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 8480,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "18:2",
    "triangleId": 258782,
    "triangle": [
      [
        1.2067634761333466,
        0.1441887617111206,
        -2.995883345603943
      ],
      [
        1.207132637500763,
        0.17823761701583862,
        -2.9963874220848083
      ],
      [
        1.219523012638092,
        0.17968511581420898,
        -3.003864884376526
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.42494555414719887
      ],
      [
        0.0025060027837753296,
        0.4257840156555175
      ],
      [
        0.002,
        0.4249751038435168
      ]
    ],
    "approach": {
      "seam": [
        0.7937389969825746,
        0.10758563459925247,
        -3.0013588815927505
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

### predicate:open-sky

```json
[
  {
    "seq": 9829,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 32,
    "topology": "open-courtyard",
    "valid": false,
    "firstFailure": "open-sky",
    "checks": [
      {
        "name": "open-sky",
        "status": "failed",
        "measured": 9,
        "threshold": 0
      },
      {
        "name": "boundary-directions",
        "status": "not-evaluated"
      },
      {
        "name": "broad-open-region",
        "status": "not-evaluated"
      },
      {
        "name": "ground-relative-elevation",
        "status": "not-evaluated"
      }
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:open-courtyard

```json
[
  {
    "seq": 10072,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "open-courtyard",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:boundary-directions

```json
[
  {
    "seq": 14322,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 37,
    "nodeId": 102,
    "topology": "open-courtyard",
    "valid": false,
    "firstFailure": "boundary-directions",
    "checks": [
      {
        "name": "open-sky",
        "status": "passed",
        "measured": 0,
        "threshold": 0
      },
      {
        "name": "boundary-directions",
        "status": "failed",
        "measured": 0,
        "threshold": 3
      },
      {
        "name": "broad-open-region",
        "status": "not-evaluated"
      },
      {
        "name": "ground-relative-elevation",
        "status": "not-evaluated"
      }
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
    "seq": 56987,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 2047,
    "triangle": [
      [
        -2.8010873794555664,
        0.012207984924316406,
        -2.8466280698776245
      ],
      [
        -2.801933169364929,
        0.02801889181137085,
        -2.822554349899292
      ],
      [
        -2.8021203875541687,
        0.02821826934814453,
        -2.846397578716278
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.002,
        0.2298171408161503,
        0.028140889599478497
      ],
      [
        0.0020726606249805712,
        0.23907085657119742,
        0.02821826934814453
      ],
      [
        0.002,
        0.23908706905961702,
        0.02709212399272469
      ]
    ],
    "approach": {
      "seam": [
        -2.800047726929188,
        0.10400546865822796,
        -2.6073267221450807
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
      -0.14599453134177204,
      0.11900546865822796
    ],
    "bodyBand": [
      0.11900546865822796,
      1.904005468658228
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
    "seq": 56989,
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope courtyard-2-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
