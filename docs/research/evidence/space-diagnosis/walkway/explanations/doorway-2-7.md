# doorway-2-7: failed

Two tall stone walls joined by an arch, with a broad human doorway and a continuous level stone path through the opening.

Locked scale: 10. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "doorway-crossing"
  ],
  "evidence": [
    {
      "kind": "doorway-crossing",
      "source": "text",
      "cue": "arch"
    },
    {
      "kind": "doorway-crossing",
      "source": "text",
      "cue": "doorway"
    }
  ],
  "ambiguities": [],
  "requirements": {
    "openSky": false,
    "covered": false,
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/doorway-2-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/doorway-2-7/expanded.ndjson.gz`. SHA256 `c76a9ddda9da21dd4490ae97b4b7a7110ab509d7396bd3ca2f8779366140c6cd`; 715,744 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1019 valid sampled nodes; 1701 floor tests |
| Proposals | Returned pass: 382 eligible; 192 attempted. All trace passes: 570 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 131, "support-edge-not-found": 153, "entry-prism-blocked": 262, "source-entry-prism": 262}; passed 30 |
| Components | Returned pass: 4 reached-entry discoveries. All passes: 983 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 10329 candidate events. Returned pass: maximum connected displacement 9.4763m |
| Topology | {"doorway-crossing": 10329} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 391719,
  "left-flank": 24132,
  "aperture-width": 24132
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
    "support:column": 4056,
    "support:rejected": 1364,
    "support:node": 2038,
    "proposal:eligible": 764,
    "proposal:direction-excluded": 7388,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 380,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 18968,
    "prescreen:projection-start": 282,
    "prescreen:projection-blocked": 131,
    "prescreen:rejected": 262,
    "prescreen:support-edge-not-found": 102,
    "prescreen:body-sample": 776,
    "prescreen:passed": 20,
    "component:entry-search": 20,
    "component:node-visited": 17678,
    "edge:tested": 3652,
    "component:node-discovered": 17658,
    "route:candidate": 6886,
    "topology:ray": 86712,
    "topology:node-feature": 1720,
    "topology:aperture-node": 261146,
    "topology:route-rejected": 6886,
    "topology:aperture-axis": 32176,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 131,
    "prescreen:entry-prism-proof": 141,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2028,
    "support:rejected": 682,
    "support:node": 1019,
    "proposal:eligible": 382,
    "proposal:direction-excluded": 3694,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 190,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9484,
    "prescreen:projection-start": 141,
    "prescreen:entry-prism-blocked": 131,
    "prescreen:entry-prism-proof": 141,
    "prescreen:rejected": 131,
    "prescreen:support-edge-not-found": 51,
    "prescreen:body-sample": 388,
    "prescreen:passed": 10,
    "route:stream-admitted": 10,
    "route:scheduler-start": 1,
    "route:stream-resumed": 3453,
    "component:entry-search": 10,
    "component:node-visited": 8839,
    "edge:tested": 1826,
    "component:node-discovered": 8829,
    "route:candidate": 3443,
    "topology:ray": 43356,
    "topology:node-feature": 860,
    "topology:aperture-node": 130573,
    "topology:route-rejected": 3443,
    "route:stream-suspended": 3443,
    "route:stream-complete": 10,
    "topology:aperture-axis": 16088,
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
    "seq": 8428,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 328,
    "triangle": [
      [
        -3.755463659763336,
        0.02222687005996704,
        -4.18711394071579
      ],
      [
        -3.7547269463539124,
        0.03956884145736694,
        -4.184190928936005
      ],
      [
        -3.7533366680145264,
        0.038440823554992676,
        -4.225621819496155
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.024161237478256048,
        0.3929930448532106
      ],
      [
        0.02342452406883222,
        0.39007003307342547
      ],
      [
        0.022034245729446233,
        0.4315009236335756
      ]
    ],
    "approach": {
      "seam": [
        -3.73130242228508,
        0.04711615714380454,
        -3.794120895862579
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
    "seq": 8429,
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
    "seq": 8608,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "498:3",
    "triangleId": 184320,
    "triangle": [
      [
        -0.786665603518486,
        0.08475050330162048,
        0.4379279166460037
      ],
      [
        -0.7870979607105255,
        0.08561879396438599,
        0.403083972632885
      ],
      [
        -0.7535611093044281,
        0.08557423949241638,
        0.39916425943374634
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.13847115901914117,
        0.6
      ],
      [
        0.13787904828786857,
        0.5949339330196382
      ],
      [
        0.1438111517228665,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.15862717628478995,
        3.989841699857516,
        0.26128521114587777
      ],
      "outward": [
        0,
        0,
        1
      ],
      "width": 1.2,
      "length": 4.849323819577694
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
    "seq": 8655,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "583:1",
    "triangleId": 249670,
    "triangle": [
      [
        0.6694160401821136,
        0.15763640403747559,
        0.8414877206087112
      ],
      [
        0.6660182029008865,
        0.19802793860435486,
        0.8430632203817368
      ],
      [
        0.6698561459779739,
        0.15891000628471375,
        0.8016480505466461
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.013044381141662509,
        -0.3643913835287096
      ],
      [
        0.009646543860435397,
        -0.3628158837556841
      ],
      [
        0.0134844869375228,
        -0.4042310535907747
      ]
    ],
    "approach": {
      "seam": [
        0.6563716590404511,
        0.1292948730430743,
        1.2058791041374208
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 3.178345710039139
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
    "seq": 8719,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "482:3",
    "eye": [
      -2.95862717628479,
      1.7325299073122493,
      -0.19412089586257864
    ],
    "outward": [
      0,
      0,
      1
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

### predicate:roof-coverage

```json
[
  {
    "seq": 9914,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 1,
    "nodeId": 689,
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
    "seq": 10110,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-walls"
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
    "seq": 12336,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 33,
    "nodeId": 678,
    "routeIndex": 22,
    "axis": [
      1,
      0,
      0
    ],
    "left": null,
    "right": null,
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

### predicate:aperture-width

```json
[
  {
    "seq": 12339,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 33,
    "nodeId": 678,
    "routeIndex": 22,
    "axis": [
      0,
      0,
      1
    ],
    "left": {
      "id": 568012,
      "distance": 0.9602595188851065
    },
    "right": {
      "id": 245358,
      "distance": 0.4117182993838478
    },
    "minimumWidth": 2.4,
    "rayMaximum": 3,
    "firstFailure": "aperture-width",
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
    "seq": 38415,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "79:2",
    "triangleId": 67777,
    "triangle": [
      [
        -2.394924908876419,
        5.045337378978729,
        -4.8513904213905334
      ],
      [
        -2.35869899392128,
        5.0191110372543335,
        -4.850991368293762
      ],
      [
        -2.357523739337921,
        5.039507746696472,
        -4.850541353225708
      ]
    ],
    "clippedApproachCoordinates": [
      [
        1.1771966462402008,
        -0.6
      ],
      [
        1.1767741307616228,
        -0.5988965630531311
      ],
      [
        1.1767991805981664,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -1.75862717628479,
        0.058267888853916455,
        -3.673767222464085
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

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 244608,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 328,
    "triangle": [
      [
        -3.755463659763336,
        0.02222687005996704,
        -4.18711394071579
      ],
      [
        -3.7547269463539124,
        0.03956884145736694,
        -4.184190928936005
      ],
      [
        -3.7533366680145264,
        0.038440823554992676,
        -4.225621819496155
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.024161237478256048,
        0.3929930448532106,
        0.02222687005996704
      ],
      [
        0.02342452406883222,
        0.39007003307342547,
        0.03956884145736694
      ],
      [
        0.022034245729446233,
        0.4315009236335756,
        0.038440823554992676
      ]
    ],
    "approach": {
      "seam": [
        -3.73130242228508,
        0.04711615714380454,
        -3.794120895862579
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
      -0.20288384285619546,
      0.06211615714380454
    ],
    "bodyBand": [
      0.06211615714380454,
      1.8471161571438046
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
    "seq": 244610,
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
python3 scripts/diagnosis/trace-query.py walkway doorway-2-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/doorway-2-7/legacy.ndjson.gz`. SHA256 `0c87b660ebcf319f8c257754456cb2ae678f7a93d96685fc87f7792b3655dc3d`; 599,529 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1019 valid sampled nodes; 1701 floor tests |
| Proposals | Returned pass: 183 eligible; 48 attempted. All trace passes: 405 omitted by selection; 44 selected but not attempted |
| Pre-screen | {"source-projection": 20, "entry-prism-blocked": 57, "source-entry-prism": 57}; passed 23 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 982 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 12288 candidate events. Returned pass: maximum connected displacement 7.0682m |
| Topology | {"doorway-crossing": 12288} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "roof-coverage": 376591,
  "left-flank": 12061,
  "aperture-width": 12061
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
    "support:column": 4056,
    "support:rejected": 1364,
    "support:node": 2038,
    "proposal:legacy-body-sample": 7136,
    "proposal:eligible": 366,
    "proposal:direction-unexecuted": 796,
    "proposal:direction-excluded": 6990,
    "proposal:selected": 96,
    "proposal:omitted": 270,
    "budget:exhausted": 4,
    "proposal:attempt": 52,
    "prescreen:edge-support-probe": 2402,
    "prescreen:projection-start": 52,
    "prescreen:projection-blocked": 20,
    "prescreen:rejected": 40,
    "prescreen:body-sample": 490,
    "prescreen:passed": 12,
    "component:entry-search": 12,
    "component:node-visited": 10992,
    "edge:tested": 3652,
    "component:node-discovered": 10998,
    "route:candidate": 8192,
    "topology:ray": 57346,
    "topology:node-feature": 1762,
    "topology:aperture-node": 270362,
    "topology:route-rejected": 8192,
    "topology:aperture-axis": 17220,
    "route:candidate-not-executed": 2,
    "proposal:not-attempted": 44,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 20,
    "prescreen:entry-prism-proof": 26,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2028,
    "support:rejected": 682,
    "support:node": 1019,
    "proposal:legacy-body-sample": 3568,
    "proposal:eligible": 183,
    "proposal:direction-unexecuted": 398,
    "proposal:direction-excluded": 3495,
    "proposal:selected": 48,
    "proposal:omitted": 135,
    "budget:exhausted": 2,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2189,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 37,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 37,
    "prescreen:body-sample": 443,
    "prescreen:passed": 11,
    "route:stream-admitted": 11,
    "route:scheduler-start": 1,
    "route:stream-resumed": 4096,
    "component:entry-search": 11,
    "component:node-visited": 6553,
    "edge:tested": 1826,
    "component:node-discovered": 6776,
    "route:candidate": 4096,
    "topology:ray": 24555,
    "topology:node-feature": 827,
    "topology:aperture-node": 106229,
    "topology:route-rejected": 4096,
    "route:stream-suspended": 4096,
    "topology:aperture-axis": 6902,
    "route:stream-unexecuted": 11,
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
    "seq": 11605,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 328,
    "triangle": [
      [
        -3.755463659763336,
        0.02222687005996704,
        -4.18711394071579
      ],
      [
        -3.7547269463539124,
        0.03956884145736694,
        -4.184190928936005
      ],
      [
        -3.7533366680145264,
        0.038440823554992676,
        -4.225621819496155
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.024161237478256048,
        0.3929930448532106
      ],
      [
        0.02342452406883222,
        0.39007003307342547
      ],
      [
        0.022034245729446233,
        0.4315009236335756
      ]
    ],
    "approach": {
      "seam": [
        -3.73130242228508,
        0.04711615714380454,
        -3.794120895862579
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
    "seq": 11606,
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 11764,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "72:0",
    "triangleId": 276,
    "triangle": [
      [
        -3.731377124786377,
        0.04649236798286438,
        -3.775181770324707
      ],
      [
        -3.7312889099121094,
        0.04684954881668091,
        -3.775230348110199
      ],
      [
        -3.7315011024475098,
        0.04666760563850403,
        -3.8138818740844727
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.017087335884570898,
        0.5810608744621275
      ],
      [
        0.01699912101030332,
        0.5811094522476195
      ],
      [
        0.01710282799525775,
        0.6
      ],
      [
        0.017148008292651812,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -3.714289788901806,
        0.0455676272597284,
        -3.1941208958625795
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
    "seq": 12966,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 1,
    "nodeId": 429,
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
    "seq": 13162,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-walls"
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
    "seq": 15666,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 49,
    "nodeId": 475,
    "routeIndex": 19,
    "axis": [
      1,
      0,
      0
    ],
    "left": null,
    "right": null,
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

### predicate:aperture-width

```json
[
  {
    "seq": 15669,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 49,
    "nodeId": 475,
    "routeIndex": 19,
    "axis": [
      0,
      0,
      1
    ],
    "left": {
      "id": 546651,
      "distance": 1.314020825785468
    },
    "right": {
      "id": 271892,
      "distance": 0.7588201154334997
    },
    "minimumWidth": 2.4,
    "rayMaximum": 3,
    "firstFailure": "aperture-width",
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
    "seq": 219099,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 328,
    "triangle": [
      [
        -3.755463659763336,
        0.02222687005996704,
        -4.18711394071579
      ],
      [
        -3.7547269463539124,
        0.03956884145736694,
        -4.184190928936005
      ],
      [
        -3.7533366680145264,
        0.038440823554992676,
        -4.225621819496155
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.024161237478256048,
        0.3929930448532106,
        0.02222687005996704
      ],
      [
        0.02342452406883222,
        0.39007003307342547,
        0.03956884145736694
      ],
      [
        0.022034245729446233,
        0.4315009236335756,
        0.038440823554992676
      ]
    ],
    "approach": {
      "seam": [
        -3.73130242228508,
        0.04711615714380454,
        -3.794120895862579
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
      -0.20288384285619546,
      0.06211615714380454
    ],
    "bodyBand": [
      0.06211615714380454,
      1.8471161571438046
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
    "seq": 219101,
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
python3 scripts/diagnosis/trace-query.py walkway doorway-2-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
