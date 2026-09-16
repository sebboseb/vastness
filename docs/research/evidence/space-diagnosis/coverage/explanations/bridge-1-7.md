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

Complete trace: `.runtime/space-diagnosis/coverage/candidates/bridge-1-7/expanded.ndjson.gz`. SHA256 `ca2572e46e0b8ff167a24e3d679a980b8de2b9e2b946cd3bb5d278a20eb05144`; 4,394,234 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1871 valid sampled nodes; 4451 floor tests |
| Proposals | Returned pass: 802 eligible; 192 attempted. All trace passes: 1830 omitted by selection; 278 selected but not attempted |
| Pre-screen | {"source-projection": 45, "support-edge-not-found": 59, "entry-prism-blocked": 137, "source-entry-prism": 137, "exterior-approach-limit": 29}; passed 28 |
| Components | Returned pass: 5 reached-entry discoveries. All passes: 1245 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 2995 candidate events. Returned pass: maximum connected displacement 6.6000m |
| Topology | {"elevated-bridge": 2995} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:elevation": 205160,
  "deck:missing-edge:-1": 107958,
  "deck:width": 194090,
  "deck:missing-edge:1": 123507
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
    "support:rejected": 5152,
    "support:node": 3742,
    "support:duplicate-layer": 8,
    "proposal:eligible": 1604,
    "proposal:direction-excluded": 13364,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 1220,
    "budget:exhausted": 4,
    "proposal:attempt": 106,
    "prescreen:edge-support-probe": 4900,
    "prescreen:projection-start": 81,
    "prescreen:projection-blocked": 45,
    "prescreen:rejected": 73,
    "prescreen:body-sample": 304,
    "prescreen:passed": 8,
    "component:entry-search": 8,
    "component:node-visited": 5806,
    "edge:tested": 5160,
    "component:node-discovered": 5798,
    "route:candidate": 1985,
    "topology:ray": 320000,
    "topology:node-feature": 2068,
    "topology:deck-edge-probe": 2626143,
    "topology:deck-node": 155736,
    "topology:route-rejected": 1985,
    "prescreen:support-edge-not-found": 18,
    "topology:ray-not-executed": 174092,
    "proposal:not-attempted": 278,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 28,
    "prescreen:entry-prism-proof": 32,
    "prescreen:exterior-approach-limit": 7,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
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
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9252,
    "prescreen:projection-start": 129,
    "prescreen:entry-prism-blocked": 109,
    "prescreen:entry-prism-proof": 129,
    "prescreen:rejected": 109,
    "prescreen:body-sample": 762,
    "prescreen:passed": 20,
    "route:stream-admitted": 20,
    "prescreen:exterior-approach-limit": 22,
    "prescreen:support-edge-not-found": 41,
    "route:scheduler-start": 1,
    "route:stream-resumed": 1010,
    "component:entry-search": 20,
    "component:node-visited": 5862,
    "edge:tested": 2229,
    "component:node-discovered": 6087,
    "route:candidate": 1010,
    "topology:ray": 160000,
    "topology:node-feature": 916,
    "topology:deck-edge-probe": 799664,
    "topology:deck-node": 49424,
    "topology:route-rejected": 1010,
    "route:stream-suspended": 1010,
    "topology:ray-not-executed": 180,
    "route:stream-unexecuted": 20,
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
    "seq": 16823,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 16824,
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

### predicate:deck:elevation

```json
[
  {
    "seq": 17610,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 17610,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:width

```json
[
  {
    "seq": 17610,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 18331,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:elevated-bridge

```json
[
  {
    "seq": 18436,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "elevated-bridge",
    "completed": [],
    "unexecutedRequirements": [],
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
    "seq": 198213,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 198256,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 198342,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 198406,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 1503641,
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
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 1503643,
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
    "seq": 1685033,
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
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py coverage bridge-1-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/coverage/candidates/bridge-1-7/legacy.ndjson.gz`. SHA256 `161560a5b074bb7853918df9a6f3c608ce161c234f8eded23f33624e781bc1dc`; 4,956,791 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1871 valid sampled nodes; 4451 floor tests |
| Proposals | Returned pass: 238 eligible; 48 attempted. All trace passes: 570 omitted by selection; 90 selected but not attempted |
| Pre-screen | {"source-projection": 1, "entry-prism-blocked": 22, "source-entry-prism": 22}; passed 31 |
| Components | Returned pass: 3 reached-entry discoveries. All passes: 1059 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 3648 candidate events. Returned pass: maximum connected displacement 5.4000m |
| Topology | {"elevated-bridge": 3648} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:elevation": 232858,
  "deck:missing-edge:1": 154894,
  "deck:width": 223539,
  "deck:missing-edge:-1": 116281
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
    "support:rejected": 5152,
    "support:node": 3742,
    "support:duplicate-layer": 8,
    "proposal:legacy-body-sample": 8884,
    "proposal:eligible": 476,
    "proposal:direction-unexecuted": 836,
    "proposal:direction-excluded": 13656,
    "proposal:selected": 96,
    "proposal:omitted": 380,
    "budget:exhausted": 4,
    "proposal:attempt": 6,
    "prescreen:edge-support-probe": 252,
    "prescreen:projection-start": 6,
    "prescreen:projection-blocked": 1,
    "prescreen:rejected": 2,
    "prescreen:body-sample": 152,
    "prescreen:passed": 4,
    "component:entry-search": 4,
    "component:node-visited": 3316,
    "edge:tested": 3644,
    "component:node-discovered": 3312,
    "route:candidate": 2460,
    "topology:ray": 320000,
    "topology:node-feature": 1388,
    "topology:deck-edge-probe": 3097714,
    "topology:deck-node": 182960,
    "topology:route-rejected": 2460,
    "topology:ray-not-executed": 246924,
    "proposal:not-attempted": 90,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 1,
    "prescreen:entry-prism-proof": 3,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
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
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2207,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 21,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 21,
    "prescreen:body-sample": 1078,
    "prescreen:passed": 27,
    "route:stream-admitted": 27,
    "route:scheduler-start": 1,
    "route:stream-resumed": 1188,
    "component:entry-search": 27,
    "component:node-visited": 6212,
    "edge:tested": 1816,
    "component:node-discovered": 6480,
    "route:candidate": 1188,
    "topology:ray": 160000,
    "topology:node-feature": 803,
    "topology:deck-edge-probe": 797015,
    "topology:deck-node": 49898,
    "topology:route-rejected": 1188,
    "route:stream-suspended": 1188,
    "topology:ray-not-executed": 133,
    "route:stream-unexecuted": 27,
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
    "seq": 20509,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 20510,
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

### predicate:deck:elevation

```json
[
  {
    "seq": 21245,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 21245,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:width

```json
[
  {
    "seq": 21245,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 21706,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:elevated-bridge

```json
[
  {
    "seq": 22082,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "elevated-bridge",
    "completed": [],
    "unexecutedRequirements": [],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 1973323,
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
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 1973325,
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
python3 scripts/diagnosis/trace-query.py coverage bridge-1-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
