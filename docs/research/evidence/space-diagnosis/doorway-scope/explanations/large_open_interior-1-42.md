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

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/large_open_interior-1-42/expanded.ndjson.gz`. SHA256 `c068522540f5939bc3e42a40b94f34b68f5f239d8c1fc122d06e3a4716b10e23`; 519,041 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1969 valid sampled nodes; 3288 floor tests |
| Proposals | Returned pass: 458 eligible; 192 attempted. All trace passes: 798 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 163, "support-edge-not-found": 84, "body-obstruction": 7, "entry-prism-blocked": 304, "source-entry-prism": 304}; passed 18 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 967 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 5648 candidate events. Returned pass: maximum connected displacement 9.4594m |
| Topology | {"broad-covered-interior": 5648} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 175256
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
    "support:column": 3328,
    "support:rejected": 2638,
    "support:node": 3938,
    "proposal:eligible": 916,
    "proposal:direction-excluded": 14836,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 532,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 19516,
    "prescreen:projection-start": 328,
    "prescreen:projection-blocked": 163,
    "prescreen:rejected": 319,
    "prescreen:support-edge-not-found": 56,
    "prescreen:body-sample": 349,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 152,
    "prescreen:entry-prism-proof": 164,
    "prescreen:passed": 9,
    "component:entry-search": 9,
    "component:node-visited": 8703,
    "edge:tested": 5621,
    "component:node-discovered": 8694,
    "route:candidate": 2824,
    "topology:ray": 12532,
    "topology:node-feature": 964,
    "topology:node-predicate": 87628,
    "topology:sustained-sample": 87628,
    "topology:sustained-result": 2824,
    "topology:route-rejected": 2824,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1664,
    "support:rejected": 1319,
    "support:node": 1969,
    "proposal:eligible": 458,
    "proposal:direction-excluded": 7418,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 266,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9758,
    "prescreen:projection-start": 164,
    "prescreen:entry-prism-blocked": 152,
    "prescreen:entry-prism-proof": 164,
    "prescreen:rejected": 155,
    "prescreen:support-edge-not-found": 28,
    "prescreen:body-sample": 344,
    "prescreen:passed": 9,
    "route:stream-admitted": 9,
    "route:scheduler-start": 1,
    "route:stream-resumed": 2833,
    "component:entry-search": 9,
    "component:node-visited": 8703,
    "edge:tested": 5621,
    "component:node-discovered": 8694,
    "route:candidate": 2824,
    "topology:ray": 12532,
    "topology:node-feature": 964,
    "topology:node-predicate": 87628,
    "topology:sustained-sample": 87628,
    "topology:sustained-result": 2824,
    "topology:route-rejected": 2824,
    "route:stream-suspended": 2824,
    "route:stream-complete": 9,
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
    "seq": 13560,
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
    "seq": 13561,
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
    "seq": 13607,
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
    "seq": 13696,
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
    "seq": 13760,
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
    "seq": 14169,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:body-obstruction

```json
[
  {
    "seq": 20629,
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
    "seq": 37518,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
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
    "clippedPrismCoordinates": [
      [
        0.0033656343817716206,
        0.21730450391769418,
        0.08710265159606934
      ],
      [
        0.003241656720638808,
        0.2112084388732911,
        0.09215638041496277
      ],
      [
        0.002,
        0.21455619999675446,
        0.09116344711826507
      ],
      [
        0.002,
        0.2201580992427625,
        0.08667443184067407
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
    "supportBand": [
      -0.11225333019750519,
      0.1527466698024948
    ],
    "bodyBand": [
      0.1527466698024948,
      1.9377466698024948
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
    "seq": 37520,
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

### predicate:roof-coverage

```json
[
  {
    "seq": 39877,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1915,
    "topology": "broad-covered-interior",
    "valid": false,
    "firstFailure": "roof-coverage",
    "checks": [
      {
        "name": "roof-coverage",
        "status": "failed",
        "measured": 0,
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
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### topology:broad-covered-interior

```json
[
  {
    "seq": 40120,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "broad-covered-interior",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope large_open_interior-1-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/large_open_interior-1-42/legacy.ndjson.gz`. SHA256 `d45fc75399709d2a3a8b75bec340b380ed9f1e54a29681690673db88be3b9e89`; 685,762 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1969 valid sampled nodes; 3288 floor tests |
| Proposals | Returned pass: 80 eligible; 48 attempted. All trace passes: 96 omitted by selection; 18 selected but not attempted |
| Pre-screen | {"source-projection": 48, "entry-prism-blocked": 62, "source-entry-prism": 62}; passed 16 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 967 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 8192 candidate events. Returned pass: maximum connected displacement 8.2000m |
| Topology | {"broad-covered-interior": 8192} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 271684
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
    "support:column": 3328,
    "support:rejected": 2638,
    "support:node": 3938,
    "proposal:direction-excluded": 15186,
    "proposal:legacy-body-sample": 3354,
    "proposal:eligible": 160,
    "proposal:direction-unexecuted": 406,
    "proposal:selected": 96,
    "proposal:omitted": 64,
    "budget:exhausted": 3,
    "proposal:attempt": 78,
    "prescreen:edge-support-probe": 3583,
    "prescreen:projection-start": 78,
    "prescreen:projection-blocked": 48,
    "prescreen:rejected": 71,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 23,
    "prescreen:entry-prism-proof": 30,
    "prescreen:body-sample": 278,
    "prescreen:passed": 7,
    "component:entry-search": 7,
    "component:node-visited": 6134,
    "edge:tested": 5621,
    "component:node-discovered": 6148,
    "route:candidate": 4096,
    "topology:ray": 10751,
    "topology:node-feature": 827,
    "topology:node-predicate": 146805,
    "topology:sustained-sample": 146805,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "route:candidate-not-executed": 1,
    "proposal:not-attempted": 18,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1664,
    "support:rejected": 1319,
    "support:node": 1969,
    "proposal:direction-excluded": 7593,
    "proposal:legacy-body-sample": 1677,
    "proposal:eligible": 80,
    "proposal:direction-unexecuted": 203,
    "proposal:selected": 48,
    "proposal:omitted": 32,
    "budget:exhausted": 2,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2197,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 39,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 39,
    "prescreen:body-sample": 358,
    "prescreen:passed": 9,
    "route:stream-admitted": 9,
    "route:scheduler-start": 1,
    "route:stream-resumed": 4096,
    "component:entry-search": 9,
    "component:node-visited": 6590,
    "edge:tested": 4700,
    "component:node-discovered": 6769,
    "route:candidate": 4096,
    "topology:ray": 10465,
    "topology:node-feature": 805,
    "topology:node-predicate": 124879,
    "topology:sustained-sample": 124879,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "route:stream-suspended": 4096,
    "route:stream-unexecuted": 9,
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
    "seq": 14644,
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
    "seq": 14645,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "71:1",
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
    "seq": 14985,
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
    "seq": 31624,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "71:1",
    "triangleId": 372109,
    "triangle": [
      [
        4.989904761314392,
        4.425546377897263,
        -2.3340943455696106
      ],
      [
        4.96395468711853,
        4.471767097711563,
        -2.3325687646865845
      ],
      [
        4.993099570274353,
        4.466925263404846,
        -2.3354950547218323
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0020000000000000018,
        -0.3098744369081244,
        4.467051562262099
      ],
      [
        0.0027602419257162225,
        -0.3099507689476013,
        4.466925263404846
      ],
      [
        0.002,
        -0.3096174539241996,
        4.457078676645974
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
    "supportBand": [
      4.239995566268045,
      4.504995566268045
    ],
    "bodyBand": [
      4.504995566268045,
      6.289995566268045
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
    "seq": 31626,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "71:1",
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

### predicate:roof-coverage

```json
[
  {
    "seq": 34191,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 630,
    "topology": "broad-covered-interior",
    "valid": false,
    "firstFailure": "roof-coverage",
    "checks": [
      {
        "name": "roof-coverage",
        "status": "failed",
        "measured": 0,
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
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### topology:broad-covered-interior

```json
[
  {
    "seq": 34434,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "broad-covered-interior",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope large_open_interior-1-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
