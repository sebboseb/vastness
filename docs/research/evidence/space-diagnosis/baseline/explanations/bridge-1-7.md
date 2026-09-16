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

Complete trace: `.runtime/space-diagnosis/baseline/candidates/bridge-1-7/expanded.ndjson.gz`. SHA256 `14ae5c5dba7217f3b4d6a695429391c1f24be4f145eedf27ef658cc1979a1983`; 1,486,819 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1871 valid sampled nodes; 4451 floor tests |
| Proposals | 802 eligible; 58 attempted; 610 omitted by selection; 134 selected but not attempted |
| Pre-screen | {"source-projection": 45, "support-edge-not-found": 9}; passed 4 |
| Components | 2 reached-entry discoveries, 1245 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 963 candidates; maximum connected displacement 9.8509m |
| Topology | {"elevated-bridge": 963} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:elevation": 69156,
  "deck:missing-edge:-1": 35878,
  "deck:width": 66481,
  "deck:missing-edge:1": 46863
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 16821,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 16822,
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

### predicate:deck:elevation

```json
[
  {
    "seq": 17608,
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
    ]
  }
]
```

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 17608,
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
    ]
  }
]
```

### predicate:deck:width

```json
[
  {
    "seq": 17608,
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
    ]
  }
]
```

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 18329,
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
    ]
  }
]
```

### topology:elevated-bridge

```json
[
  {
    "seq": 18434,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "elevated-bridge",
    "completed": [],
    "unexecutedRequirements": [],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 198211,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 198254,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 198340,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 198404,
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
    ]
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline bridge-1-7 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/bridge-1-7/legacy.ndjson.gz`. SHA256 `2c542683ba16508a0fe61bfa8a3c50c705180232802ff513b6e47845e29c8a6f`; 1,952,815 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1871 valid sampled nodes; 4451 floor tests |
| Proposals | 238 eligible; 3 attempted; 190 omitted by selection; 45 selected but not attempted |
| Pre-screen | {"source-projection": 1}; passed 2 |
| Components | 1 reached-entry discoveries, 829 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 1230 candidates; maximum connected displacement 8.8814m |
| Topology | {"elevated-bridge": 1230} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:elevation": 91480,
  "deck:missing-edge:1": 65321,
  "deck:width": 87776,
  "deck:missing-edge:-1": 44828
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 20507,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 20508,
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

### predicate:deck:elevation

```json
[
  {
    "seq": 21243,
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
    ]
  }
]
```

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 21243,
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
    ]
  }
]
```

### predicate:deck:width

```json
[
  {
    "seq": 21243,
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
    ]
  }
]
```

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 21704,
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
    ]
  }
]
```

### topology:elevated-bridge

```json
[
  {
    "seq": 22080,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "elevated-bridge",
    "completed": [],
    "unexecutedRequirements": [],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline bridge-1-7 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
