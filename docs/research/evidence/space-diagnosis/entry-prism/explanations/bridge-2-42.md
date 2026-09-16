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

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/bridge-2-42/expanded.ndjson.gz`. SHA256 `b2c3da6c011bb312d95c0799de24c3bdceaaf3cc078e1385cda8cc114c8e1a12`; 3,151,392 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 4046 valid sampled nodes; 10287 floor tests |
| Proposals | Returned pass: 1000 eligible; 1 attempted. All trace passes: 1616 omitted by selection; 364 selected but not attempted |
| Pre-screen | {"source-projection": 14, "support-edge-not-found": 3}; passed 3 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 1007 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 1253 candidate events. Returned pass: maximum connected displacement 14.2436m |
| Topology | {"elevated-bridge": 1253} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:lower-side-wall:-1": 46832,
  "deck:missing-edge:1": 92430,
  "deck:lower-side-wall:1": 41402,
  "deck:width": 90693,
  "deck:under-deck-obstruction": 94552,
  "deck:missing-edge:-1": 78584
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
    "support:column": 3100,
    "support:rejected": 6225,
    "support:node": 4046,
    "support:duplicate-layer": 16,
    "proposal:eligible": 1000,
    "proposal:direction-excluded": 15184,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 808,
    "budget:exhausted": 2,
    "proposal:attempt": 19,
    "prescreen:edge-support-probe": 868,
    "prescreen:projection-start": 16,
    "prescreen:projection-blocked": 14,
    "prescreen:rejected": 14,
    "prescreen:body-sample": 76,
    "prescreen:passed": 2,
    "component:entry-search": 2,
    "component:node-visited": 2014,
    "edge:tested": 5538,
    "component:node-discovered": 2012,
    "route:candidate": 810,
    "topology:ray": 160000,
    "topology:node-feature": 951,
    "topology:deck-edge-probe": 1604246,
    "topology:deck-node": 97352,
    "topology:route-rejected": 810,
    "prescreen:support-edge-not-found": 3,
    "topology:ray-not-executed": 144419,
    "topology:deck-longitudinal": 7677,
    "proposal:not-attempted": 173,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 3100,
    "support:rejected": 6225,
    "support:node": 4046,
    "support:duplicate-layer": 16,
    "proposal:eligible": 1000,
    "proposal:direction-excluded": 15184,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 808,
    "budget:exhausted": 2,
    "proposal:attempt": 1,
    "prescreen:edge-support-probe": 42,
    "prescreen:projection-start": 1,
    "prescreen:entry-prism-proof": 1,
    "prescreen:body-sample": 38,
    "prescreen:passed": 1,
    "component:entry-search": 1,
    "component:node-visited": 1007,
    "edge:tested": 5538,
    "component:node-discovered": 1006,
    "route:candidate": 443,
    "topology:ray": 160000,
    "topology:node-feature": 885,
    "topology:deck-edge-probe": 838963,
    "topology:deck-node": 50650,
    "topology:route-rejected": 443,
    "topology:ray-not-executed": 3455,
    "topology:deck-longitudinal": 168,
    "proposal:not-attempted": 191,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 30812,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 30813,
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
    "seq": 30862,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### predicate:deck:lower-side-wall:-1

```json
[
  {
    "seq": 32169,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 32169,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:lower-side-wall:1

```json
[
  {
    "seq": 32169,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:width

```json
[
  {
    "seq": 32169,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:under-deck-obstruction

```json
[
  {
    "seq": 32169,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 32742,
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
    ],
    "pass": "baseline"
  }
]
```

### topology:elevated-bridge

```json
[
  {
    "seq": 33029,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "elevated-bridge",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-walls",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 1049108,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 1049172,
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
    ],
    "pass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 1049214,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py entry-prism bridge-2-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/bridge-2-42/legacy.ndjson.gz`. SHA256 `3d1791a15ac2e9250d71e9c62fe0dd9c375402db5befd7257d4cc0a4e8d0fe2c`; 4,245,601 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 4046 valid sampled nodes; 10287 floor tests |
| Proposals | Returned pass: 392 eligible; 1 attempted. All trace passes: 688 omitted by selection; 93 selected but not attempted |
| Pre-screen | {"source-projection": 1}; passed 2 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 1007 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 1719 candidate events. Returned pass: maximum connected displacement 14.2436m |
| Topology | {"elevated-bridge": 1719} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:lower-side-wall:-1": 43377,
  "deck:missing-edge:1": 113934,
  "deck:lower-side-wall:1": 48333,
  "deck:width": 121534,
  "deck:under-deck-obstruction": 97620,
  "deck:missing-edge:-1": 116801
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
    "support:column": 3100,
    "support:rejected": 6225,
    "support:node": 4046,
    "support:duplicate-layer": 16,
    "proposal:legacy-body-sample": 8622,
    "proposal:eligible": 392,
    "proposal:direction-unexecuted": 556,
    "proposal:direction-excluded": 15236,
    "proposal:selected": 48,
    "proposal:omitted": 344,
    "budget:exhausted": 2,
    "proposal:attempt": 2,
    "prescreen:edge-support-probe": 84,
    "prescreen:projection-start": 2,
    "prescreen:projection-blocked": 1,
    "prescreen:rejected": 1,
    "prescreen:body-sample": 38,
    "prescreen:passed": 1,
    "component:entry-search": 1,
    "component:node-visited": 1007,
    "edge:tested": 5538,
    "component:node-discovered": 1006,
    "route:candidate": 833,
    "topology:ray": 160000,
    "topology:node-feature": 886,
    "topology:deck-edge-probe": 1629568,
    "topology:deck-node": 98652,
    "topology:route-rejected": 833,
    "topology:ray-not-executed": 147474,
    "topology:deck-longitudinal": 7975,
    "proposal:not-attempted": 46,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 3100,
    "support:rejected": 6225,
    "support:node": 4046,
    "support:duplicate-layer": 16,
    "proposal:legacy-body-sample": 8622,
    "proposal:eligible": 392,
    "proposal:direction-unexecuted": 556,
    "proposal:direction-excluded": 15236,
    "proposal:selected": 48,
    "proposal:omitted": 344,
    "budget:exhausted": 2,
    "proposal:attempt": 1,
    "prescreen:edge-support-probe": 42,
    "prescreen:projection-start": 1,
    "prescreen:entry-prism-proof": 1,
    "prescreen:body-sample": 38,
    "prescreen:passed": 1,
    "component:entry-search": 1,
    "component:node-visited": 1007,
    "edge:tested": 5538,
    "component:node-discovered": 1006,
    "route:candidate": 886,
    "topology:ray": 160000,
    "topology:node-feature": 934,
    "topology:deck-edge-probe": 1677988,
    "topology:deck-node": 101302,
    "topology:route-rejected": 886,
    "topology:ray-not-executed": 156048,
    "topology:deck-longitudinal": 8740,
    "proposal:not-attempted": 47,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 38634,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 38635,
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

### predicate:deck:lower-side-wall:-1

```json
[
  {
    "seq": 39848,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 39848,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:lower-side-wall:1

```json
[
  {
    "seq": 39848,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:width

```json
[
  {
    "seq": 39848,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:under-deck-obstruction

```json
[
  {
    "seq": 39848,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 40320,
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
    ],
    "pass": "baseline"
  }
]
```

### topology:elevated-bridge

```json
[
  {
    "seq": 40710,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "elevated-bridge",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-walls",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py entry-prism bridge-2-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
