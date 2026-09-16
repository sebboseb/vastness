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

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/large_open_interior-1-7/expanded.ndjson.gz`. SHA256 `613de79f763f77d97f5b27615c035c7027e5cfa5f9dbc4e253ee6c0e854d23b0`; 508,130 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 2789 valid sampled nodes; 5570 floor tests |
| Proposals | Returned pass: 1360 eligible; 192 attempted. All trace passes: 2336 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 120, "support-edge-not-found": 140, "entry-prism-blocked": 113, "source-entry-prism": 113, "body-obstruction": 4, "exterior-approach-limit": 1}; passed 6 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 1588 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 3980 candidate events. Returned pass: maximum connected displacement 12.0930m |
| Topology | {"broad-covered-interior": 3980} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "boundary-directions": 126550,
  "broad-covered-region": 43836,
  "roof-coverage": 74
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
    "support:column": 2604,
    "support:rejected": 2779,
    "support:node": 2789,
    "support:duplicate-layer": 2,
    "proposal:eligible": 1360,
    "proposal:direction-excluded": 9796,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 1168,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9866,
    "prescreen:projection-start": 122,
    "prescreen:projection-blocked": 120,
    "prescreen:rejected": 120,
    "prescreen:support-edge-not-found": 70,
    "prescreen:body-sample": 75,
    "prescreen:passed": 2,
    "component:entry-search": 2,
    "component:node-visited": 3176,
    "edge:tested": 7468,
    "component:node-discovered": 3174,
    "route:candidate": 1358,
    "topology:ray": 21057,
    "topology:node-feature": 1530,
    "topology:node-predicate": 60766,
    "topology:sustained-sample": 60766,
    "topology:broad-feature": 505,
    "topology:sustained-result": 1358,
    "topology:route-rejected": 1358,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2604,
    "support:rejected": 2779,
    "support:node": 2789,
    "support:duplicate-layer": 2,
    "proposal:eligible": 1360,
    "proposal:direction-excluded": 9796,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 1168,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9866,
    "prescreen:projection-start": 121,
    "prescreen:entry-prism-blocked": 113,
    "prescreen:entry-prism-proof": 121,
    "prescreen:rejected": 117,
    "prescreen:support-edge-not-found": 70,
    "prescreen:body-sample": 162,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 6352,
    "edge:tested": 7468,
    "component:node-discovered": 6348,
    "route:candidate": 2622,
    "topology:ray": 21275,
    "topology:node-feature": 1546,
    "topology:broad-feature": 519,
    "topology:node-predicate": 115561,
    "topology:sustained-sample": 115561,
    "topology:sustained-result": 2622,
    "topology:route-rejected": 2622,
    "prescreen:exterior-approach-limit": 1,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 20929,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 20930,
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
    "seq": 20972,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 21057,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 21245,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 21350,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:boundary-directions

```json
[
  {
    "seq": 27868,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:broad-covered-region

```json
[
  {
    "seq": 27901,
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
    ],
    "pass": "baseline"
  }
]
```

### topology:broad-covered-interior

```json
[
  {
    "seq": 28128,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "broad-covered-interior",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 63586,
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
    ],
    "pass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 214902,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 14488,
    "triangle": [
      [
        -3.7418614625930786,
        2.5283392779529095,
        -5.79553484916687
      ],
      [
        -3.7415807247161865,
        2.57606029137969,
        -5.7962400913238525
      ],
      [
        -3.742787003517151,
        2.5291133746504784,
        -5.8468769788742065
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.014474767812250022,
        0.18806018792898682,
        2.5460854043282737
      ],
      [
        0.014298428595066248,
        0.1885031700134281,
        2.57606029137969
      ],
      [
        0.015068619127918133,
        0.22083404689959207,
        2.5460854043282737
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
    "supportBand": [
      2.5460854043282737,
      2.811085404328274
    ],
    "bodyBand": [
      2.811085404328274,
      4.5960854043282735
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
    "seq": 214904,
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

### prescreen:body-obstruction

```json
[
  {
    "seq": 304984,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "57:2",
    "firstFailure": "body-obstruction",
    "triangleId": 334912,
    "triangle": [
      [
        2.39280903339386,
        0.5836045145988464,
        -5.755866765975952
      ],
      [
        2.371857762336731,
        0.6096265912055969,
        -5.754440546035767
      ],
      [
        2.3678966760635376,
        0.6050069332122803,
        -5.779961585998535
      ]
    ],
    "position": [
      2.4178194284439094,
      0.10119258120428265,
      -5.457736921310425
    ],
    "unexecuted": [
      "remaining-body-samples",
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
    "seq": 437803,
    "stage": "prescreen",
    "kind": "exterior-approach-limit",
    "proposalId": "2662:2",
    "seam": [
      -1.3821805715560913,
      5.160849167898212,
      3.604912497103215
    ],
    "distanceToBounds": 9.612649418413639,
    "startDistance": 10.01264941841364,
    "requiredLength": 10.31264941841364,
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
python3 scripts/diagnosis/trace-query.py entry-prism large_open_interior-1-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/large_open_interior-1-7/legacy.ndjson.gz`. SHA256 `1d98f63832c67228b1b2b1fd3c8e3b99bba49b753172af0f848744531b410420`; 825,112 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 2789 valid sampled nodes; 5570 floor tests |
| Proposals | Returned pass: 102 eligible; 34 attempted. All trace passes: 108 omitted by selection; 28 selected but not attempted |
| Pre-screen | {"source-projection": 30, "entry-prism-blocked": 30, "source-entry-prism": 30}; passed 8 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 1588 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 8192 candidate events. Returned pass: maximum connected displacement 11.3719m |
| Topology | {"broad-covered-interior": 8192} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "broad-covered-region": 62106,
  "boundary-directions": 263212,
  "roof-coverage": 90
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
    "support:column": 2604,
    "support:rejected": 2779,
    "support:node": 2789,
    "support:duplicate-layer": 2,
    "proposal:direction-excluded": 10918,
    "proposal:legacy-body-sample": 2150,
    "proposal:eligible": 102,
    "proposal:direction-unexecuted": 136,
    "proposal:selected": 48,
    "proposal:omitted": 54,
    "budget:exhausted": 2,
    "proposal:attempt": 34,
    "prescreen:edge-support-probe": 1428,
    "prescreen:projection-start": 34,
    "prescreen:projection-blocked": 30,
    "prescreen:rejected": 30,
    "prescreen:body-sample": 156,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 5104,
    "edge:tested": 7468,
    "component:node-discovered": 5128,
    "route:candidate": 4096,
    "topology:ray": 21838,
    "topology:node-feature": 1588,
    "topology:broad-feature": 532,
    "topology:node-predicate": 167634,
    "topology:sustained-sample": 167634,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "route:candidate-not-executed": 1,
    "proposal:not-attempted": 14,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2604,
    "support:rejected": 2779,
    "support:node": 2789,
    "support:duplicate-layer": 2,
    "proposal:direction-excluded": 10918,
    "proposal:legacy-body-sample": 2150,
    "proposal:eligible": 102,
    "proposal:direction-unexecuted": 136,
    "proposal:selected": 48,
    "proposal:omitted": 54,
    "budget:exhausted": 2,
    "proposal:attempt": 34,
    "prescreen:edge-support-probe": 1428,
    "prescreen:projection-start": 34,
    "prescreen:entry-prism-blocked": 30,
    "prescreen:entry-prism-proof": 34,
    "prescreen:rejected": 30,
    "prescreen:body-sample": 156,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 5104,
    "edge:tested": 7468,
    "component:node-discovered": 5128,
    "route:candidate": 4096,
    "topology:ray": 21838,
    "topology:node-feature": 1588,
    "topology:broad-feature": 532,
    "topology:node-predicate": 167634,
    "topology:sustained-sample": 167634,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "route:candidate-not-executed": 1,
    "proposal:not-attempted": 14,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 21630,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 21631,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:2",
    "firstFailure": "source-projection",
    "unexecuted": [
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
    "seq": 21979,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 22022,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 22237,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### predicate:broad-covered-region

```json
[
  {
    "seq": 23910,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:boundary-directions

```json
[
  {
    "seq": 23960,
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
    ],
    "pass": "baseline"
  }
]
```

### topology:broad-covered-interior

```json
[
  {
    "seq": 24155,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "broad-covered-interior",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 44579,
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
    ],
    "pass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 434168,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:2",
    "triangleId": 14842,
    "triangle": [
      [
        -3.7434056997299194,
        2.526544790714979,
        -5.952603220939636
      ],
      [
        -3.7430076599121094,
        2.5721565820276737,
        -5.952515602111816
      ],
      [
        -3.7345386743545532,
        2.5693319477140903,
        -5.976571083068848
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0020000000000000018,
        -0.35453920627570046,
        2.5700594043476404
      ],
      [
        0.008195251226425171,
        -0.3523581027984619,
        2.5693319477140903
      ],
      [
        0.002,
        -0.3546500656583671,
        2.558272255137216
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
    "supportBand": [
      2.552996756653407,
      2.817996756653407
    ],
    "bodyBand": [
      2.817996756653407,
      4.602996756653407
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
    "seq": 434170,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:2",
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
python3 scripts/diagnosis/trace-query.py entry-prism large_open_interior-1-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
