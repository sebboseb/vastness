# bridge-1-42: failed

A stone bridge with a flat continuous deck, tall solid side parapets and an empty walkway joining two broad stone landings.

Locked scale: 16. Previously unresolved: True.

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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/bridge-1-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/bridge-1-42/expanded.ndjson.gz`. SHA256 `545af5cca3a81a4e33496a92e24e06a8b67b158118e1c2f07bbc316585fdca11`; 1,923,328 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 2092 valid sampled nodes; 4336 floor tests |
| Proposals | 1026 eligible; 112 attempted; 834 omitted by selection; 80 selected but not attempted |
| Pre-screen | {"source-projection": 93, "support-edge-not-found": 17}; passed 2 |
| Components | 1 reached-entry discoveries, 898 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 760 candidates; maximum connected displacement 15.3584m |
| Topology | {"elevated-bridge": 760} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:width": 63757,
  "deck:missing-edge:-1": 42439,
  "deck:missing-edge:1": 27251,
  "deck:lower-side-wall:-1": 26,
  "deck:elevation": 46288,
  "deck:lower-side-wall:1": 109,
  "deck:under-deck-obstruction": 22
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 19298,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 188,
    "triangle": [
      [
        -6.248334884643555,
        0.9247872829437256,
        -7.801060676574707
      ],
      [
        -6.24758243560791,
        0.9256346225738525,
        -7.801246643066406
      ],
      [
        -6.260787487030029,
        0.9271540641784668,
        -7.869132041931152
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.029887399077416,
        0.18181838989257848
      ],
      [
        0.029134950041771468,
        0.1820043563842777
      ],
      [
        0.04234000146389061,
        0.2498897552490238
      ]
    ],
    "approach": {
      "seam": [
        -6.218447485566139,
        0.9183898910495175,
        -7.6192422866821286
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
    "seq": 19299,
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

### projection:wholly-below-support-band

```json
[
  {
    "seq": 19346,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1985:1",
    "triangleId": 225798,
    "triangle": [
      [
        1.3616169691085815,
        3.4126963019371033,
        6.214893817901611
      ],
      [
        1.34261155128479,
        3.4145474433898926,
        6.214959621429443
      ],
      [
        1.3410934209823608,
        3.4143866300582886,
        6.151953220367432
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0102456554770467,
        -0.3658638954162612
      ],
      [
        0.002,
        -0.36583534601920464
      ],
      [
        0.0020000000000000018,
        -0.39115126188888627
      ]
    ],
    "approach": {
      "seam": [
        1.3513713136315348,
        8.414744858589259,
        6.5807577133178725
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 5.155276845395564
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 19394,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "823:1",
    "triangleId": 278374,
    "triangle": [
      [
        2.7544262409210205,
        0.24779081344604492,
        -0.9762275218963623
      ],
      [
        2.7547361850738525,
        0.25020694732666016,
        -1.0414756536483765
      ],
      [
        2.8079230785369873,
        0.2610301971435547,
        -1.0479423999786377
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.22449548137748143
      ],
      [
        0.03658173531293896,
        -0.22870011329650897
      ],
      [
        0.0020000000000000018,
        -0.18234176685285414
      ]
    ],
    "approach": {
      "seam": [
        2.7713413432240483,
        0.27285458204678137,
        -0.8192422866821287
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 3.7353068158030514
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 19598,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "672:2",
    "eye": [
      -4.877913570404052,
      2.1274779936337014,
      -1.2192422866821282
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

### predicate:deck:width

```json
[
  {
    "seq": 20858,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 2082,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.9481827146489226,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 2,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 1.7999999999999998,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 0.6000000000000001,
        "lateralHit": null
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "width",
    "otherExecutedFailures": [],
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
    "seq": 20946,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 2079,
    "routeIndex": 3,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.9377891723961393,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0.20000000000000007,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 0.6000000000000001,
        "lateralHit": null
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
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
    "seq": 21486,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 1833,
    "routeIndex": 19,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.9200024392167094,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0.9999999999999999,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 1.4,
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
    "firstFailure": "missing-edge:1",
    "otherExecutedFailures": [
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
    "seq": 21976,
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

### predicate:deck:lower-side-wall:-1

```json
[
  {
    "seq": 22450,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 2,
    "nodeId": 1860,
    "routeIndex": 17,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.9219587924675691,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 2,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": {
          "id": 10600,
          "distance": 2.4574402220183633
        }
      },
      {
        "sign": 1,
        "edge": 2.4,
        "lateralHit": null
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
      "lower-side-wall:-1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ]
  }
]
```

### predicate:deck:elevation

```json
[
  {
    "seq": 40240,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 19,
    "nodeId": 1634,
    "routeIndex": 25,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.7341967933139999,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0.9999999999999999,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 1.4,
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

### predicate:deck:lower-side-wall:1

```json
[
  {
    "seq": 399791,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 199,
    "nodeId": 491,
    "routeIndex": 62,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.9016588107557193,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0.6,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 1,
        "lateralHit": {
          "id": 290290,
          "distance": 0.1686891776111927
        }
      }
    ],
    "below": {
      "id": 290302,
      "distance": 0.057877273768929614
    },
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
      "lower-side-wall:1",
      "width",
      "under-deck-obstruction"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ]
  }
]
```

### predicate:deck:under-deck-obstruction

```json
[
  {
    "seq": 399791,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 199,
    "nodeId": 491,
    "routeIndex": 62,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.9016588107557193,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0.6,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 1,
        "lateralHit": {
          "id": 290290,
          "distance": 0.1686891776111927
        }
      }
    ],
    "below": {
      "id": 290302,
      "distance": 0.057877273768929614
    },
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
      "lower-side-wall:1",
      "width",
      "under-deck-obstruction"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ]
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 1015263,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "611:2",
    "triangleId": 154154,
    "triangle": [
      [
        -0.31068071722984314,
        3.9281033277511597,
        -7.834845542907715
      ],
      [
        -0.29188936948776245,
        3.910197913646698,
        -7.842479228973389
      ],
      [
        -0.266294926404953,
        3.9531666934490204,
        -7.838641166687012
      ]
    ],
    "clippedApproachCoordinates": [
      [
        5.755911488267335,
        -0.6
      ],
      [
        5.754169192910195,
        -0.5883813560009008
      ],
      [
        5.753175631668487,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        0.3220864295959478,
        0.5411537331169434,
        -2.084471973776817
      ],
      "outward": [
        0,
        0,
        -1
      ],
      "width": 1.2,
      "length": 6.034770312905311
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline bridge-1-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/bridge-1-42/legacy.ndjson.gz`. SHA256 `89a7374774120a574b425a435ecfb9ec5438f81f879630c2ca9d252c33c929ae`; 1,666,396 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 2092 valid sampled nodes; 4336 floor tests |
| Proposals | 123 eligible; 13 attempted; 75 omitted by selection; 35 selected but not attempted |
| Pre-screen | {"source-projection": 12}; passed 1 |
| Components | 1 reached-entry discoveries, 898 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 735 candidates; maximum connected displacement 15.1605m |
| Topology | {"elevated-bridge": 735} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:missing-edge:1": 30014,
  "deck:width": 62684,
  "deck:missing-edge:-1": 31194,
  "deck:lower-side-wall:1": 2332,
  "deck:elevation": 41724,
  "deck:lower-side-wall:-1": 12,
  "deck:under-deck-obstruction": 32
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 20565,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 188,
    "triangle": [
      [
        -6.248334884643555,
        0.9247872829437256,
        -7.801060676574707
      ],
      [
        -6.24758243560791,
        0.9256346225738525,
        -7.801246643066406
      ],
      [
        -6.260787487030029,
        0.9271540641784668,
        -7.869132041931152
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.029887399077416,
        0.18181838989257848
      ],
      [
        0.029134950041771468,
        0.1820043563842777
      ],
      [
        0.04234000146389061,
        0.2498897552490238
      ]
    ],
    "approach": {
      "seam": [
        -6.218447485566139,
        0.9183898910495175,
        -7.6192422866821286
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
    "seq": 20566,
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
    "seq": 20611,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2:2",
    "triangleId": 5447,
    "triangle": [
      [
        -5.744608402252197,
        0.9130289554595947,
        -7.970952033996582
      ],
      [
        -5.8027238845825195,
        0.9147036075592041,
        -8.001298904418945
      ],
      [
        -5.740378379821777,
        0.914757251739502,
        -8.002117156982422
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.27452117113886365
      ],
      [
        0.0021582335233691907,
        -0.26246480941772443
      ],
      [
        0.002,
        -0.26248628635376603
      ]
    ],
    "approach": {
      "seam": [
        -5.477913570404053,
        0.919290214890157,
        -7.999958923459053
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

### projection:wholly-below-support-band

```json
[
  {
    "seq": 20887,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "17:2",
    "triangleId": 68101,
    "triangle": [
      [
        -2.4496965408325195,
        0.909214973449707,
        -7.989185333251953
      ],
      [
        -2.5082263946533203,
        0.9145569801330566,
        -8.014052391052246
      ],
      [
        -2.448402166366577,
        0.916550874710083,
        -8.008734703063965
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.004591388711890243,
        -0.6
      ],
      [
        0.002,
        -0.5708467608063033
      ],
      [
        0.002000000000000001,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -1.8779135704040524,
        3.479019658887049,
        -8.006766539812087
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

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 21805,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 31,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.9184069851447028,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0.20000000000000007,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.6000000000000001,
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
    "firstFailure": "missing-edge:1",
    "otherExecutedFailures": [
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
    "seq": 21805,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 31,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.9184069851447028,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0.20000000000000007,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.6000000000000001,
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
    "firstFailure": "missing-edge:1",
    "otherExecutedFailures": [
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
    "seq": 22185,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 186,
    "routeIndex": 11,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.9239266161704632,
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
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
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
    "seq": 22654,
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

### predicate:deck:lower-side-wall:1

```json
[
  {
    "seq": 25633,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 5,
    "nodeId": 133,
    "routeIndex": 11,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.9372007374975764,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 1.5999999999999996,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 1.9999999999999998,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 18735,
          "distance": 2.4598363929836546
        }
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "missing-edge:1",
    "otherExecutedFailures": [
      "lower-side-wall:1",
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ]
  }
]
```

### predicate:deck:elevation

```json
[
  {
    "seq": 40150,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 21,
    "nodeId": 351,
    "routeIndex": 22,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.7212963117910273,
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

### predicate:deck:lower-side-wall:-1

```json
[
  {
    "seq": 70306,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 51,
    "nodeId": 401,
    "routeIndex": 27,
    "axis": [
      0,
      0,
      1
    ],
    "elevation": 0.9454332247839432,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0.9999999999999999,
    "minimumWidth": 2.4,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": {
          "id": 298749,
          "distance": 0.3903292056608798
        }
      },
      {
        "sign": 1,
        "edge": 1,
        "lateralHit": null
      }
    ],
    "below": null,
    "valid": false,
    "firstFailure": "lower-side-wall:-1",
    "otherExecutedFailures": [
      "width"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ]
  }
]
```

### predicate:deck:under-deck-obstruction

```json
[
  {
    "seq": 127268,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 101,
    "nodeId": 472,
    "routeIndex": 32,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 0.9341064034918942,
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
        "lateralHit": {
          "id": 290270,
          "distance": 0.621629034184752
        }
      }
    ],
    "below": {
      "id": 10217,
      "distance": 0.09431699363270986
    },
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
      "lower-side-wall:1",
      "width",
      "under-deck-obstruction"
    ],
    "unexecuted": [
      "longitudinal-displacement"
    ]
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline bridge-1-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
