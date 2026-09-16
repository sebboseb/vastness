# bridge-2-42: failed

A covered wooden footbridge with parallel side walls, high roof and flat uninterrupted deck, open entrances at both ends.

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
      "cue": "footbridge"
    }
  ],
  "ambiguities": [],
  "requirements": {
    "openSky": false,
    "covered": true,
    "opposingWalls": true,
    "minimumWidth": 0.6
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/bridge-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/bridge-2-42/expanded.ndjson.gz`. SHA256 `f3eecfe1f2790baa0de799b9e1e6c077028b0c02c0ccb582aac00145925a86af`; 2,057,787 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 4046 valid sampled nodes; 10287 floor tests |
| Proposals | 1000 eligible; 19 attempted; 808 omitted by selection; 173 selected but not attempted |
| Pre-screen | {"source-projection": 14, "support-edge-not-found": 3}; passed 2 |
| Components | 1 reached-entry discoveries, 1007 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 810 candidates; maximum connected displacement 13.1712m |
| Topology | {"elevated-bridge": 810} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:lower-side-wall:-1": 27648,
  "deck:missing-edge:1": 64433,
  "deck:lower-side-wall:1": 16549,
  "deck:width": 60138,
  "deck:under-deck-obstruction": 46348,
  "deck:missing-edge:-1": 48249
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 30811,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 33554,
    "triangle": [
      [
        -5.989356279373169,
        0.0035011768341064453,
        -4.730318069458008
      ],
      [
        -6.003818035125732,
        0.009294390678405762,
        -4.730935335159302
      ],
      [
        -6.0061891078948975,
        0.009964227676391602,
        -4.776913046836853
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.33678733187463944
      ],
      [
        0.003834079205990548,
        0.3723521471023563
      ],
      [
        0.002,
        0.3672752297557662
      ]
    ],
    "approach": {
      "seam": [
        -6.002355028688907,
        3.767850990252449,
        -4.404560899734497
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
    "seq": 30812,
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
    "seq": 30861,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "4044:1",
    "triangleId": 793068,
    "triangle": [
      [
        5.839577794075012,
        0.006583571434020996,
        4.015772581100464
      ],
      [
        5.839526653289795,
        0.0066443681716918945,
        3.968973755836487
      ],
      [
        5.896491050720215,
        0.006061077117919922,
        3.968731641769409
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.4266870711828633
      ],
      [
        0.006796710193156308,
        -0.4267074584960948
      ],
      [
        0.002,
        -0.42274279777404955
      ]
    ],
    "approach": {
      "seam": [
        5.8896943405270585,
        0.10951131457034721,
        4.395439100265504
      ],
      "outward": [
        1,
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

### predicate:deck:lower-side-wall:-1

```json
[
  {
    "seq": 32168,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 98,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 3.7723182228288,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": {
          "id": 1498572,
          "distance": 0.3317561381061318
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 697655,
          "distance": 2.0385931200515093
        }
      }
    ],
    "below": {
      "id": 1498404,
      "distance": 0.18731984470991708
    },
    "valid": false,
    "firstFailure": "lower-side-wall:-1",
    "otherExecutedFailures": [
      "missing-edge:1",
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

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 32168,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 98,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 3.7723182228288,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": {
          "id": 1498572,
          "distance": 0.3317561381061318
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 697655,
          "distance": 2.0385931200515093
        }
      }
    ],
    "below": {
      "id": 1498404,
      "distance": 0.18731984470991708
    },
    "valid": false,
    "firstFailure": "lower-side-wall:-1",
    "otherExecutedFailures": [
      "missing-edge:1",
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

### predicate:deck:lower-side-wall:1

```json
[
  {
    "seq": 32168,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 98,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 3.7723182228288,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": {
          "id": 1498572,
          "distance": 0.3317561381061318
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 697655,
          "distance": 2.0385931200515093
        }
      }
    ],
    "below": {
      "id": 1498404,
      "distance": 0.18731984470991708
    },
    "valid": false,
    "firstFailure": "lower-side-wall:-1",
    "otherExecutedFailures": [
      "missing-edge:1",
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

### predicate:deck:width

```json
[
  {
    "seq": 32168,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 98,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 3.7723182228288,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": {
          "id": 1498572,
          "distance": 0.3317561381061318
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 697655,
          "distance": 2.0385931200515093
        }
      }
    ],
    "below": {
      "id": 1498404,
      "distance": 0.18731984470991708
    },
    "valid": false,
    "firstFailure": "lower-side-wall:-1",
    "otherExecutedFailures": [
      "missing-edge:1",
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
    "seq": 32168,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 98,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 3.7723182228288,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": {
          "id": 1498572,
          "distance": 0.3317561381061318
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 697655,
          "distance": 2.0385931200515093
        }
      }
    ],
    "below": {
      "id": 1498404,
      "distance": 0.18731984470991708
    },
    "valid": false,
    "firstFailure": "lower-side-wall:-1",
    "otherExecutedFailures": [
      "missing-edge:1",
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

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 32741,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 90,
    "routeIndex": 4,
    "axis": [
      0,
      0,
      1
    ],
    "elevation": 3.7718440570658003,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": -0.4,
    "minimumWidth": 0.6,
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
    "below": {
      "id": 1443188,
      "distance": 0.18803641041273117
    },
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
      "missing-edge:1",
      "width",
      "under-deck-obstruction"
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
    "seq": 33028,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "elevated-bridge",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-walls",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 1049107,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "49:2",
    "triangleId": 325274,
    "triangle": [
      [
        -1.4286142587661743,
        3.008970558643341,
        -4.679031014442444
      ],
      [
        -1.4271883964538574,
        2.9985528588294983,
        -4.7340381145477295
      ],
      [
        -1.3792327344417572,
        2.9987305998802185,
        -4.73404848575592
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.006948520215384217,
        -0.6
      ],
      [
        0.006954708695412037,
        -0.5713849484920503
      ],
      [
        0.002,
        -0.575832100680649
      ],
      [
        0.002000000000000001,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.8078477859497069,
        0.09033686372163927,
        -4.727093777060508
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

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 1049171,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "2309:1",
    "eye": [
      -5.407847785949707,
      5.3959542561565215,
      0.7954391002655035
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
    ]
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 1049213,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1607:1",
    "triangleId": 804956,
    "triangle": [
      [
        5.897692322731018,
        0.0961228609085083,
        -1.3754906058311462
      ],
      [
        5.92491352558136,
        0.14255082607269287,
        -1.379190355539322
      ],
      [
        5.8977813720703125,
        0.09601879119873047,
        -1.4225552380084991
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.3713085358523197
      ],
      [
        0.026433932781218417,
        -0.3746294558048251
      ],
      [
        0.0020000000000000018,
        -0.413681815687939
      ]
    ],
    "approach": {
      "seam": [
        5.8984795928001414,
        0.09867668641528661,
        -1.0045608997344968
      ],
      "outward": [
        1,
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline bridge-2-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/bridge-2-42/legacy.ndjson.gz`. SHA256 `58d7f6e80b4cbb53479b4a4c713f09e630eec41b66ac24de2f9669c24099434b`; 2,092,541 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 4046 valid sampled nodes; 10287 floor tests |
| Proposals | 392 eligible; 2 attempted; 344 omitted by selection; 46 selected but not attempted |
| Pre-screen | {"source-projection": 1}; passed 1 |
| Components | 1 reached-entry discoveries, 1007 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 833 candidates; maximum connected displacement 13.0231m |
| Topology | {"elevated-bridge": 833} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:lower-side-wall:-1": 21977,
  "deck:missing-edge:1": 57927,
  "deck:lower-side-wall:1": 23765,
  "deck:width": 60424,
  "deck:under-deck-obstruction": 48613,
  "deck:missing-edge:-1": 56138
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 38633,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 33554,
    "triangle": [
      [
        -5.989356279373169,
        0.0035011768341064453,
        -4.730318069458008
      ],
      [
        -6.003818035125732,
        0.009294390678405762,
        -4.730935335159302
      ],
      [
        -6.0061891078948975,
        0.009964227676391602,
        -4.776913046836853
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.33678733187463944
      ],
      [
        0.003834079205990548,
        0.3723521471023563
      ],
      [
        0.002,
        0.3672752297557662
      ]
    ],
    "approach": {
      "seam": [
        -6.002355028688907,
        3.767850990252449,
        -4.404560899734497
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
    "seq": 38634,
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

### predicate:deck:lower-side-wall:-1

```json
[
  {
    "seq": 39847,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 16,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 3.766348664144197,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": {
          "id": 967000,
          "distance": 0.3347665973361277
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 161148,
          "distance": 2.0156435459560695
        }
      }
    ],
    "below": {
      "id": 970259,
      "distance": 0.17611650623225014
    },
    "valid": false,
    "firstFailure": "lower-side-wall:-1",
    "otherExecutedFailures": [
      "missing-edge:1",
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

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 39847,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 16,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 3.766348664144197,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": {
          "id": 967000,
          "distance": 0.3347665973361277
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 161148,
          "distance": 2.0156435459560695
        }
      }
    ],
    "below": {
      "id": 970259,
      "distance": 0.17611650623225014
    },
    "valid": false,
    "firstFailure": "lower-side-wall:-1",
    "otherExecutedFailures": [
      "missing-edge:1",
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

### predicate:deck:lower-side-wall:1

```json
[
  {
    "seq": 39847,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 16,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 3.766348664144197,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": {
          "id": 967000,
          "distance": 0.3347665973361277
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 161148,
          "distance": 2.0156435459560695
        }
      }
    ],
    "below": {
      "id": 970259,
      "distance": 0.17611650623225014
    },
    "valid": false,
    "firstFailure": "lower-side-wall:-1",
    "otherExecutedFailures": [
      "missing-edge:1",
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

### predicate:deck:width

```json
[
  {
    "seq": 39847,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 16,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 3.766348664144197,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": {
          "id": 967000,
          "distance": 0.3347665973361277
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 161148,
          "distance": 2.0156435459560695
        }
      }
    ],
    "below": {
      "id": 970259,
      "distance": 0.17611650623225014
    },
    "valid": false,
    "firstFailure": "lower-side-wall:-1",
    "otherExecutedFailures": [
      "missing-edge:1",
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
    "seq": 39847,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 16,
    "routeIndex": 0,
    "axis": [
      1,
      0,
      0
    ],
    "elevation": 3.766348664144197,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 0,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0.4,
        "lateralHit": {
          "id": 967000,
          "distance": 0.3347665973361277
        }
      },
      {
        "sign": 1,
        "edge": 0,
        "lateralHit": {
          "id": 161148,
          "distance": 2.0156435459560695
        }
      }
    ],
    "below": {
      "id": 970259,
      "distance": 0.17611650623225014
    },
    "valid": false,
    "firstFailure": "lower-side-wall:-1",
    "otherExecutedFailures": [
      "missing-edge:1",
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

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 40319,
    "stage": "topology",
    "kind": "deck-node",
    "routeId": 1,
    "nodeId": 16,
    "routeIndex": 0,
    "axis": [
      0,
      0,
      1
    ],
    "elevation": 3.766348664144197,
    "minimumElevation": 0.75,
    "transverseWidthLowerBound": 1.5999999999999996,
    "minimumWidth": 0.6,
    "deckObservations": [
      {
        "sign": -1,
        "edge": 0,
        "lateralHit": null
      },
      {
        "sign": 1,
        "edge": 1.9999999999999998,
        "lateralHit": {
          "id": 856852,
          "distance": 1.916084150225224
        }
      }
    ],
    "below": {
      "id": 970259,
      "distance": 0.17611650623225014
    },
    "valid": false,
    "firstFailure": "missing-edge:-1",
    "otherExecutedFailures": [
      "lower-side-wall:1",
      "under-deck-obstruction"
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
    "seq": 40709,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "elevated-bridge",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-walls",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline bridge-2-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
