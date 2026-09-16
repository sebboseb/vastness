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

Complete trace: `.runtime/space-diagnosis/coverage/candidates/bridge-2-42/expanded.ndjson.gz`. SHA256 `488008539e031a8a260f1df6df364336022d68437b4936f4a6d94a6bd87b4c70`; 4,240,957 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 4046 valid sampled nodes; 10287 floor tests |
| Proposals | Returned pass: 1000 eligible; 192 attempted. All trace passes: 2424 omitted by selection; 364 selected but not attempted |
| Pre-screen | {"source-projection": 14, "support-edge-not-found": 63, "entry-prism-blocked": 116, "source-entry-prism": 116, "exterior-approach-limit": 3}; passed 16 |
| Components | Returned pass: 5 reached-entry discoveries. All passes: 1007 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 2226 candidate events. Returned pass: maximum connected displacement 6.8000m |
| Topology | {"elevated-bridge": 2226} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:lower-side-wall:-1": 68861,
  "deck:missing-edge:1": 125698,
  "deck:lower-side-wall:1": 60703,
  "deck:width": 128835,
  "deck:under-deck-obstruction": 141697,
  "deck:missing-edge:-1": 108539
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
    "support:column": 6200,
    "support:rejected": 12450,
    "support:node": 8092,
    "support:duplicate-layer": 32,
    "proposal:eligible": 2000,
    "proposal:direction-excluded": 30368,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 1616,
    "budget:exhausted": 4,
    "proposal:attempt": 20,
    "prescreen:edge-support-probe": 910,
    "prescreen:projection-start": 17,
    "prescreen:projection-blocked": 14,
    "prescreen:rejected": 14,
    "prescreen:body-sample": 114,
    "prescreen:passed": 3,
    "component:entry-search": 3,
    "component:node-visited": 3021,
    "edge:tested": 11076,
    "component:node-discovered": 3018,
    "route:candidate": 1253,
    "topology:ray": 320000,
    "topology:node-feature": 1836,
    "topology:deck-edge-probe": 2443209,
    "topology:deck-node": 148002,
    "topology:route-rejected": 1253,
    "prescreen:support-edge-not-found": 3,
    "topology:ray-not-executed": 147874,
    "topology:deck-longitudinal": 7845,
    "proposal:not-attempted": 364,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-proof": 1,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
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
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9979,
    "prescreen:projection-start": 129,
    "prescreen:entry-prism-proof": 129,
    "prescreen:body-sample": 494,
    "prescreen:passed": 13,
    "route:stream-admitted": 13,
    "prescreen:entry-prism-blocked": 116,
    "prescreen:rejected": 116,
    "prescreen:support-edge-not-found": 60,
    "prescreen:exterior-approach-limit": 3,
    "route:scheduler-start": 1,
    "route:stream-resumed": 973,
    "component:entry-search": 13,
    "component:node-visited": 4406,
    "edge:tested": 5538,
    "component:node-discovered": 4526,
    "route:candidate": 973,
    "topology:ray": 160000,
    "topology:node-feature": 938,
    "topology:deck-edge-probe": 818791,
    "topology:deck-node": 49308,
    "topology:route-rejected": 973,
    "route:stream-suspended": 973,
    "topology:ray-not-executed": 118,
    "topology:deck-longitudinal": 4,
    "route:stream-unexecuted": 13,
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
    "seq": 30813,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 30814,
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 30863,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:lower-side-wall:-1

```json
[
  {
    "seq": 32170,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 32170,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:lower-side-wall:1

```json
[
  {
    "seq": 32170,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:width

```json
[
  {
    "seq": 32170,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:under-deck-obstruction

```json
[
  {
    "seq": 32170,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 32743,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:elevated-bridge

```json
[
  {
    "seq": 33030,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 1049109,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 1049173,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 1049215,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 3182293,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
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
    "clippedPrismCoordinates": [
      [
        0.0020000000000000018,
        -0.4266870711828633,
        0.0061101933777139876
      ],
      [
        0.006796710193156308,
        -0.4267074584960948,
        0.006061077117919922
      ],
      [
        0.002,
        -0.42274279777404955,
        0.006105113498187743
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
    "supportBand": [
      -0.1404886854296528,
      0.12451131457034721
    ],
    "bodyBand": [
      0.12451131457034721,
      1.9095113145703473
    ],
    "contactBoundaryTolerance": 0.002,
    "pass": "coverage-round-robin"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 3182295,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "4044:1",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "coverage-round-robin"
  }
]
```

### prescreen:exterior-approach-limit

```json
[
  {
    "seq": 3183842,
    "stage": "prescreen",
    "kind": "exterior-approach-limit",
    "proposalId": "1138:1",
    "seam": [
      -4.23365875929594,
      3.746601761440625,
      -2.004560899734497
    ],
    "distanceToBounds": 10.238611190021038,
    "startDistance": 10.638611190021038,
    "requiredLength": 10.938611190021039,
    "maximumLength": 10,
    "unexecuted": [
      "projection",
      "body-prescreen",
      "final-seam"
    ],
    "pass": "coverage-round-robin"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py coverage bridge-2-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/coverage/candidates/bridge-2-42/legacy.ndjson.gz`. SHA256 `c865ca2209b7e532c58a9e163eac08a33761dac3d19449fb993610d4cc711541`; 5,363,806 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 4046 valid sampled nodes; 10287 floor tests |
| Proposals | Returned pass: 392 eligible; 48 attempted. All trace passes: 1032 omitted by selection; 93 selected but not attempted |
| Pre-screen | {"source-projection": 1, "entry-prism-blocked": 22, "source-entry-prism": 22}; passed 28 |
| Components | Returned pass: 4 reached-entry discoveries. All passes: 1007 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 2969 candidate events. Returned pass: maximum connected displacement 4.6000m |
| Topology | {"elevated-bridge": 2969} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "deck:lower-side-wall:-1": 64702,
  "deck:missing-edge:1": 145671,
  "deck:lower-side-wall:1": 69603,
  "deck:width": 160291,
  "deck:under-deck-obstruction": 146803,
  "deck:missing-edge:-1": 148992
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
    "support:column": 6200,
    "support:rejected": 12450,
    "support:node": 8092,
    "support:duplicate-layer": 32,
    "proposal:legacy-body-sample": 17244,
    "proposal:eligible": 784,
    "proposal:direction-unexecuted": 1112,
    "proposal:direction-excluded": 30472,
    "proposal:selected": 96,
    "proposal:omitted": 688,
    "budget:exhausted": 4,
    "proposal:attempt": 3,
    "prescreen:edge-support-probe": 126,
    "prescreen:projection-start": 3,
    "prescreen:projection-blocked": 1,
    "prescreen:rejected": 1,
    "prescreen:body-sample": 76,
    "prescreen:passed": 2,
    "component:entry-search": 2,
    "component:node-visited": 2014,
    "edge:tested": 11076,
    "component:node-discovered": 2012,
    "route:candidate": 1719,
    "topology:ray": 320000,
    "topology:node-feature": 1820,
    "topology:deck-edge-probe": 3307556,
    "topology:deck-node": 199954,
    "topology:route-rejected": 1719,
    "topology:ray-not-executed": 303522,
    "topology:deck-longitudinal": 16715,
    "proposal:not-attempted": 93,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-proof": 1,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
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
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2210,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-proof": 48,
    "prescreen:body-sample": 1040,
    "prescreen:passed": 26,
    "route:stream-admitted": 26,
    "prescreen:entry-prism-blocked": 22,
    "prescreen:rejected": 22,
    "route:scheduler-start": 1,
    "route:stream-resumed": 1250,
    "component:entry-search": 26,
    "component:node-visited": 6294,
    "edge:tested": 5499,
    "component:node-discovered": 6564,
    "route:candidate": 1250,
    "topology:ray": 160000,
    "topology:node-feature": 726,
    "topology:deck-edge-probe": 841669,
    "topology:deck-node": 50218,
    "topology:route-rejected": 1250,
    "route:stream-suspended": 1250,
    "topology:ray-not-executed": 92,
    "topology:deck-longitudinal": 5,
    "route:stream-unexecuted": 26,
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
    "seq": 38635,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 38636,
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

### predicate:deck:lower-side-wall:-1

```json
[
  {
    "seq": 39849,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:missing-edge:1

```json
[
  {
    "seq": 39849,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:lower-side-wall:1

```json
[
  {
    "seq": 39849,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:width

```json
[
  {
    "seq": 39849,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:under-deck-obstruction

```json
[
  {
    "seq": 39849,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### predicate:deck:missing-edge:-1

```json
[
  {
    "seq": 40321,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:elevated-bridge

```json
[
  {
    "seq": 40711,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 4284490,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "48:2",
    "triangleId": 325442,
    "triangle": [
      [
        -1.4325298368930817,
        3.688094973564148,
        -4.787952303886414
      ],
      [
        -1.4331778585910797,
        3.7385387420654297,
        -4.788549542427063
      ],
      [
        -1.385169267654419,
        3.738623321056366,
        -4.788646817207336
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0025148238752876364,
        -0.6,
        3.7385833672448516
      ],
      [
        0.002560774981976266,
        -0.5773214817047121,
        3.738623321056366
      ],
      [
        0.0022282086022205913,
        -0.6,
        3.7144279181831785
      ]
    ],
    "approach": {
      "seam": [
        -0.8078477859497069,
        3.768391749297985,
        -4.78608604222536
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
      3.518391749297985,
      3.783391749297985
    ],
    "bodyBand": [
      3.783391749297985,
      5.568391749297985
    ],
    "contactBoundaryTolerance": 0.002,
    "pass": "coverage-round-robin"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 4284492,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "48:2",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "coverage-round-robin"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py coverage bridge-2-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
