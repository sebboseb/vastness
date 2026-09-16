# bridge-1-7: failed

A stone bridge with a flat continuous deck, tall solid side parapets and an empty walkway joining two broad stone landings.

Locked scale: 12. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "elevated-bridge"
  ],
  "evidence": [
    {
      "kind": "elevated-bridge",
      "source": "text",
      "cue": "bridge"
    }
  ],
  "ambiguities": [],
  "requirements": {
    "openSky": false,
    "covered": false,
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/bridge-1-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/bridge-1-7/expanded.ndjson.gz`. SHA256 `7eed7e2b649fb331fc39716c1df51194f86150794ad4aa6471a9db80a09ce32e`; 3,338,223 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1871 valid sampled nodes; 4451 floor tests |
| Proposals | Returned pass: 802 eligible; 48 attempted. All trace passes: 1220 omitted by selection; 278 selected but not attempted |
| Pre-screen | {"source-projection": 45, "support-edge-not-found": 18, "entry-prism-blocked": 28, "source-entry-prism": 28, "exterior-approach-limit": 7}; passed 8 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 1245 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 1985 candidate events. Returned pass: maximum connected displacement 11.4280m |
| Topology | {"elevated-bridge": 1985} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:elevation": 155736,
  "deck:missing-edge:-1": 80774,
  "deck:width": 147253,
  "deck:missing-edge:1": 99363
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
    "support:rejected": 2576,
    "support:node": 1871,
    "support:duplicate-layer": 4,
    "proposal:eligible": 802,
    "proposal:direction-excluded": 6682,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 610,
    "budget:exhausted": 2,
    "proposal:attempt": 58,
    "prescreen:edge-support-probe": 2682,
    "prescreen:projection-start": 49,
    "prescreen:projection-blocked": 45,
    "prescreen:rejected": 45,
    "prescreen:body-sample": 152,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 2903,
    "edge:tested": 2580,
    "component:node-discovered": 2899,
    "route:candidate": 963,
    "topology:ray": 160000,
    "topology:node-feature": 1027,
    "topology:deck-edge-probe": 1165546,
    "topology:deck-node": 69156,
    "topology:route-rejected": 963,
    "prescreen:support-edge-not-found": 9,
    "topology:ray-not-executed": 60819,
    "proposal:not-attempted": 134,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 3844,
    "support:rejected": 2576,
    "support:node": 1871,
    "support:duplicate-layer": 4,
    "proposal:eligible": 802,
    "proposal:direction-excluded": 6682,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 610,
    "budget:exhausted": 2,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2218,
    "prescreen:projection-start": 32,
    "prescreen:entry-prism-blocked": 28,
    "prescreen:entry-prism-proof": 32,
    "prescreen:rejected": 28,
    "prescreen:body-sample": 152,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 2903,
    "edge:tested": 2580,
    "component:node-discovered": 2899,
    "route:candidate": 1022,
    "topology:ray": 160000,
    "topology:node-feature": 1041,
    "topology:deck-edge-probe": 1460597,
    "topology:deck-node": 86580,
    "topology:route-rejected": 1022,
    "prescreen:exterior-approach-limit": 7,
    "prescreen:support-edge-not-found": 9,
    "topology:ray-not-executed": 113273,
    "proposal:not-attempted": 144,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 16822,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 4286,
    "triangle": [
      [
        -6.002793073654175,
        0.37192225456237793,
        -5.901383757591248
      ],
      [
        -6.00278377532959,
        0.37613511085510254,
        -5.901421308517456
      ],
      [
        -5.994289398193359,
        0.37574315071105957,
        -5.952897548675537
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0029538229107863856,
        0.29452445507049596
      ],
      [
        0.0029445245862014247,
        0.29456200599670446
      ],
      [
        0.002,
        0.30028585998325974
      ],
      [
        0.002,
        0.3003025488352534
      ]
    ],
    "approach": {
      "seam": [
        -5.999839250743388,
        0.3762575217025941,
        -5.606859302520752
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
    "seq": 16823,
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

### predicate:deck:elevation

```json
[
  {
    "seq": 17609,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 1676,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.3532510244374467,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 1.1999999999999997,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 1.5999999999999999,
        "lateralHit": null
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "elevation",
    "otherExecutedFailures": [
      "missing-edge:-1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 17609,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 1676,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.3532510244374467,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 1.1999999999999997,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 1.5999999999999999,
        "lateralHit": null
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "elevation",
    "otherExecutedFailures": [
      "missing-edge:-1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:width

```json
[
  {
    "seq": 17609,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 1676,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.3532510244374467,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 1.1999999999999997,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 1.5999999999999999,
        "lateralHit": null
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "elevation",
    "otherExecutedFailures": [
      "missing-edge:-1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 18330,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 1687,
    "routeIndex": 11,
    "axis": [
      0,
      0,
      1
    ],
    "elevation": 0.35441464348335955,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": -0.4,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": null
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "elevation",
    "otherExecutedFailures": [
      "missing-edge:-1",
      "missing-edge:1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "baseline"
  }
]
```

### topology:elevated-bridge

```json
[
  {
    "seq": 18435,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "elevated-bridge",
    "completed": [],
    "unexecutedRequirements": [],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 198212,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "390:3",
    "triangleId": 330992,
    "triangle": [
      [
        3.3654173612594604,
        0.32356953620910645,
        -3.9741740226745605
      ],
      [
        3.3647836446762085,
        0.3196871280670166,
        -4.020953178405762
      ],
      [
        3.4131041765213013,
        0.3199385404586792,
        -3.9745455980300903
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.08483184045021491,
        0.6
      ],
      [
        0.10818501710891759,
        0.5756841897964478
      ],
      [
        0.10837448574446747,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        3.988788366317749,
        0.30510068379858774,
        -4.082730615139008
      ],
      "outward": [
        0,
        0,
        1
      ],
      "width": 1.2,
      "length": 10.187186658382416
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 198255,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "847:2",
    "triangleId": 159204,
    "triangle": [
      [
        -2.0388143062591553,
        0.35156071186065674,
        -5.78451132774353
      ],
      [
        -2.039056956768036,
        0.3519916534423828,
        -5.824011325836182
      ],
      [
        -1.992114543914795,
        0.3514673709869385,
        -5.784640789031982
      ]
    ],
    "clippedApproachCoordinates": [
      [
        5.069194126578551,
        -0.6
      ],
      [
        5.053177423775197,
        -0.5809029102325445
      ],
      [
        5.05312448273818,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -1.4112116336822504,
        6.092539810965177,
        -0.7314633652567857
      ],
      "outward": [
        0,
        0,
        -1
      ],
      "width": 1.2,
      "length": 5.375395937263966
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
    "seq": 198341,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1347:0",
    "triangleId": 1878,
    "triangle": [
      [
        -5.974473595619202,
        3.4425641298294067,
        1.012913703918457
      ],
      [
        -5.974673509597778,
        3.463412493467331,
        1.0146006345748901
      ],
      [
        -5.974489688873291,
        3.4422270208597183,
        0.9667878448963165
      ]
    ],
    "clippedApproachCoordinates": [
      [
        5.2672730341553695,
        0.38022699356079137
      ],
      [
        5.267472948133946,
        0.37854006290435827
      ],
      [
        5.267289127409459,
        0.4263528525829319
      ]
    ],
    "approach": {
      "seam": [
        -0.7072005614638323,
        0.5304363369907633,
        1.3931406974792484
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 5.4040110722184185
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
    "seq": 198405,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "490:2",
    "eye": [
      -1.011211633682251,
      2.232943690562456,
      -3.6068593025207516
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

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 1503640,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 4286,
    "triangle": [
      [
        -6.002793073654175,
        0.37192225456237793,
        -5.901383757591248
      ],
      [
        -6.00278377532959,
        0.37613511085510254,
        -5.901421308517456
      ],
      [
        -5.994289398193359,
        0.37574315071105957,
        -5.952897548675537
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0029538229107863856,
        0.29452445507049596,
        0.37192225456237793
      ],
      [
        0.0029445245862014247,
        0.29456200599670446,
        0.37613511085510254
      ],
      [
        0.002,
        0.30028585998325974,
        0.3760915272012428
      ],
      [
        0.002,
        0.3003025488352534,
        0.37235082904210043
      ]
    ],
    "approach": {
      "seam": [
        -5.999839250743388,
        0.3762575217025941,
        -5.606859302520752
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
      0.12625752170259408,
      0.3912575217025941
    ],
    "bodyBand": [
      0.3912575217025941,
      2.176257521702594
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
    "seq": 1503642,
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
    "seq": 1685032,
    "stage": "prescreen",
    "kind": "exterior-approach-limit",
    "proposalId": "390:3",
    "seam": [
      3.988788366317749,
      0.30510068379858774,
      -4.082730615139008
    ],
    "distanceToBounds": 10.087186658382416,
    "startDistance": 10.487186658382416,
    "requiredLength": 10.787186658382417,
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
python3 scripts/diagnosis/trace-query.py entry-prism bridge-1-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/bridge-1-7/legacy.ndjson.gz`. SHA256 `9a1253b73174c2d1bccc22cb2fa660f268ba417783c2b819adcee258110410c1`; 3,905,633 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1871 valid sampled nodes; 4451 floor tests |
| Proposals | Returned pass: 238 eligible; 3 attempted. All trace passes: 380 omitted by selection; 90 selected but not attempted |
| Pre-screen | {"source-projection": 1, "entry-prism-blocked": 1, "source-entry-prism": 1}; passed 4 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 829 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 2460 candidate events. Returned pass: maximum connected displacement 8.8814m |
| Topology | {"elevated-bridge": 2460} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:elevation": 182960,
  "deck:missing-edge:1": 130642,
  "deck:width": 175552,
  "deck:missing-edge:-1": 89656
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
    "support:rejected": 2576,
    "support:node": 1871,
    "support:duplicate-layer": 4,
    "proposal:legacy-body-sample": 4442,
    "proposal:eligible": 238,
    "proposal:direction-unexecuted": 418,
    "proposal:direction-excluded": 6828,
    "proposal:selected": 48,
    "proposal:omitted": 190,
    "budget:exhausted": 2,
    "proposal:attempt": 3,
    "prescreen:edge-support-probe": 126,
    "prescreen:projection-start": 3,
    "prescreen:projection-blocked": 1,
    "prescreen:rejected": 1,
    "prescreen:body-sample": 76,
    "prescreen:passed": 2,
    "component:entry-search": 2,
    "component:node-visited": 1658,
    "edge:tested": 1822,
    "component:node-discovered": 1656,
    "route:candidate": 1230,
    "topology:ray": 160000,
    "topology:node-feature": 694,
    "topology:deck-edge-probe": 1548857,
    "topology:deck-node": 91480,
    "topology:route-rejected": 1230,
    "topology:ray-not-executed": 123462,
    "proposal:not-attempted": 45,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 3844,
    "support:rejected": 2576,
    "support:node": 1871,
    "support:duplicate-layer": 4,
    "proposal:legacy-body-sample": 4442,
    "proposal:eligible": 238,
    "proposal:direction-unexecuted": 418,
    "proposal:direction-excluded": 6828,
    "proposal:selected": 48,
    "proposal:omitted": 190,
    "budget:exhausted": 2,
    "proposal:attempt": 3,
    "prescreen:edge-support-probe": 126,
    "prescreen:projection-start": 3,
    "prescreen:entry-prism-blocked": 1,
    "prescreen:entry-prism-proof": 3,
    "prescreen:rejected": 1,
    "prescreen:body-sample": 76,
    "prescreen:passed": 2,
    "component:entry-search": 2,
    "component:node-visited": 1658,
    "edge:tested": 1822,
    "component:node-discovered": 1656,
    "route:candidate": 1230,
    "topology:ray": 160000,
    "topology:node-feature": 694,
    "topology:deck-edge-probe": 1548857,
    "topology:deck-node": 91480,
    "topology:route-rejected": 1230,
    "topology:ray-not-executed": 123462,
    "proposal:not-attempted": 45,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 20508,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 4286,
    "triangle": [
      [
        -6.002793073654175,
        0.37192225456237793,
        -5.901383757591248
      ],
      [
        -6.00278377532959,
        0.37613511085510254,
        -5.901421308517456
      ],
      [
        -5.994289398193359,
        0.37574315071105957,
        -5.952897548675537
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0029538229107863856,
        0.29452445507049596
      ],
      [
        0.0029445245862014247,
        0.29456200599670446
      ],
      [
        0.002,
        0.30028585998325974
      ],
      [
        0.002,
        0.3003025488352534
      ]
    ],
    "approach": {
      "seam": [
        -5.999839250743388,
        0.3762575217025941,
        -5.606859302520752
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
    "seq": 20509,
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

### predicate:deck:elevation

```json
[
  {
    "seq": 21244,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 4,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.3880301604932041,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": null
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "elevation",
    "otherExecutedFailures": [
      "missing-edge:1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 21244,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 4,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.3880301604932041,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": null
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "elevation",
    "otherExecutedFailures": [
      "missing-edge:1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:width

```json
[
  {
    "seq": 21244,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 4,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.3880301604932041,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": null
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "elevation",
    "otherExecutedFailures": [
      "missing-edge:1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 21705,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 4,
    "routeIndex": 0,
    "axis": [
      0,
      0,
      1
    ],
    "elevation": 0.3880301604932041,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0.7999999999999999,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 1.2,
        "lateralHit": null
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "elevation",
    "otherExecutedFailures": [
      "missing-edge:-1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ],
    "pass": "baseline"
  }
]
```

### topology:elevated-bridge

```json
[
  {
    "seq": 22081,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "elevated-bridge",
    "completed": [],
    "unexecutedRequirements": [],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 1973322,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 4286,
    "triangle": [
      [
        -6.002793073654175,
        0.37192225456237793,
        -5.901383757591248
      ],
      [
        -6.00278377532959,
        0.37613511085510254,
        -5.901421308517456
      ],
      [
        -5.994289398193359,
        0.37574315071105957,
        -5.952897548675537
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0029538229107863856,
        0.29452445507049596,
        0.37192225456237793
      ],
      [
        0.0029445245862014247,
        0.29456200599670446,
        0.37613511085510254
      ],
      [
        0.002,
        0.30028585998325974,
        0.3760915272012428
      ],
      [
        0.002,
        0.3003025488352534,
        0.37235082904210043
      ]
    ],
    "approach": {
      "seam": [
        -5.999839250743388,
        0.3762575217025941,
        -5.606859302520752
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
      0.12625752170259408,
      0.3912575217025941
    ],
    "bodyBand": [
      0.3912575217025941,
      2.176257521702594
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
    "seq": 1973324,
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py entry-prism bridge-1-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
