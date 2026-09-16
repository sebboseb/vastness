# courtyard-1-42: failed

An empty courtyard enclosed by stone walls, broad entrance gate and flat continuous paving under an open sky.

Locked scale: 6. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "open-courtyard",
    "doorway-crossing"
  ],
  "evidence": [
    {
      "kind": "open-courtyard",
      "source": "text",
      "cue": "courtyard"
    },
    {
      "kind": "doorway-crossing",
      "source": "text",
      "cue": "gate"
    }
  ],
  "ambiguities": [
    "Multiple positive topology cues are conjunctive: the same supported route must witness each requirement."
  ],
  "requirements": {
    "openSky": true,
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/courtyard-1-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/courtyard-1-42/expanded.ndjson.gz`. SHA256 `dac212c3b2748bd1e87a9e7a49b4467d1139e737e7cf7319fa401410f564f6eb`; 255,565 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 638 valid sampled nodes; 1014 floor tests |
| Proposals | 198 eligible; 192 attempted; 6 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 156, "support-edge-not-found": 8, "body-obstruction": 1}; passed 27 |
| Components | 1 reached-entry discoveries, 570 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 3651 candidates; maximum connected displacement 5.9363m |
| Topology | {"open-courtyard": 3651} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "boundary-directions": 87213,
  "open-sky": 7583
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 5028,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 12134,
    "triangle": [
      [
        -2.9981871843338013,
        2.082215666770935,
        -2.7812127470970154
      ],
      [
        -2.9981939792633057,
        2.104818731546402,
        -2.7818883061408997
      ],
      [
        -2.9982916116714478,
        2.108101487159729,
        -2.8063425421714783
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.005267725884914309,
        0.17493494749069205
      ],
      [
        0.005274520814418704,
        0.17561050653457633
      ],
      [
        0.005372153222560794,
        0.20006474256515494
      ]
    ],
    "approach": {
      "seam": [
        -2.992919458448887,
        5.808131899545815,
        -2.6062777996063233
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
    "seq": 5029,
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 5078,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "633:1",
    "triangleId": 374268,
    "triangle": [
      [
        2.092669665813446,
        0.11512577533721924,
        1.994210958480835
      ],
      [
        2.0924983620643616,
        0.13436758518218994,
        1.9947881698608398
      ],
      [
        2.09283846616745,
        0.11782622337341309,
        1.9811807870864868
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.00768401324748913,
        -0.39951124191284215
      ],
      [
        0.007512709498404657,
        -0.39893403053283727
      ],
      [
        0.007852813601493036,
        -0.4125414133071903
      ]
    ],
    "approach": {
      "seam": [
        2.084985652565957,
        0.02510996991366814,
        2.393722200393677
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 5123,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "637:3",
    "triangleId": 353526,
    "triangle": [
      [
        1.9962544441223145,
        5.8152419328689575,
        2.971406400203705
      ],
      [
        1.993138611316681,
        5.830391585826874,
        2.9711036682128906
      ],
      [
        1.9899975657463074,
        5.831571936607361,
        2.967379331588745
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.004169952869414573,
        0.5957082271575933
      ],
      [
        0.0038672208786003637,
        0.5988240599632269
      ],
      [
        0.0024729091920518654,
        0.6
      ],
      [
        0.002,
        0.6
      ],
      [
        0.002,
        0.5990796947147038
      ]
    ],
    "approach": {
      "seam": [
        2.5919626712799078,
        6.007574812486037,
        2.9672364473342903
      ],
      "outward": [
        0,
        0,
        1
      ],
      "width": 1.2,
      "length": 2
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 5313,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "102:2",
    "triangleId": 327108,
    "triangle": [
      [
        1.587905466556549,
        5.695412993431091,
        -2.847326874732971
      ],
      [
        1.581357479095459,
        5.720806181430817,
        -2.847703993320465
      ],
      [
        1.5986523628234863,
        5.708661317825317,
        -2.8481656908988953
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.7429051836450007,
        -0.6
      ],
      [
        0.743083769083023,
        -0.5933103084564211
      ],
      [
        0.7425616256406355,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        2.1919626712799074,
        0.04352940798566601,
        -2.1050819218158723
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

### predicate:boundary-directions

```json
[
  {
    "seq": 6461,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 622,
    "topology": "open-courtyard",
    "valid": false,
    "firstFailure": "boundary-directions",
    "checks": [
      {
        "name": "open-sky",
        "status": "passed",
        "measured": 0,
        "threshold": 0
      },
      {
        "name": "boundary-directions",
        "status": "failed",
        "measured": 1,
        "threshold": 3
      },
      {
        "name": "broad-open-region",
        "status": "not-evaluated"
      },
      {
        "name": "ground-relative-elevation",
        "status": "not-evaluated"
      }
    ]
  }
]
```

### topology:open-courtyard

```json
[
  {
    "seq": 6704,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "open-courtyard",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-walls"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### predicate:open-sky

```json
[
  {
    "seq": 8362,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 7,
    "nodeId": 561,
    "topology": "open-courtyard",
    "valid": false,
    "firstFailure": "open-sky",
    "checks": [
      {
        "name": "open-sky",
        "status": "failed",
        "measured": 1,
        "threshold": 0
      },
      {
        "name": "boundary-directions",
        "status": "not-evaluated"
      },
      {
        "name": "broad-open-region",
        "status": "not-evaluated"
      },
      {
        "name": "ground-relative-elevation",
        "status": "not-evaluated"
      }
    ]
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 31132,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "63:0",
    "eye": [
      -0.6080373287200924,
      1.6939345728032782,
      -1.806277799606323
    ],
    "outward": [
      -1,
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

### prescreen:body-obstruction

```json
[
  {
    "seq": 254211,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "6:2",
    "firstFailure": "body-obstruction",
    "triangleId": 111868,
    "triangle": [
      [
        -1.458753079175949,
        5.876165807247162,
        -2.9159756898880005
      ],
      [
        -1.455303579568863,
        5.883547425270081,
        -2.9161664843559265
      ],
      [
        -1.4566254615783691,
        5.883828699588776,
        -2.9230352640151978
      ]
    ],
    "position": [
      -1.6080373287200926,
      5.8088587859487255,
      -2.656277799606323
    ],
    "unexecuted": [
      "remaining-body-samples",
      "final-seam"
    ]
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline courtyard-1-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/courtyard-1-42/legacy.ndjson.gz`. SHA256 `f6ceede7994b9b9767e474811872ffe56b3170286786b465b901eb371ad0a2ad`; 259,896 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 638 valid sampled nodes; 1014 floor tests |
| Proposals | 102 eligible; 42 attempted; 54 omitted by selection; 6 selected but not attempted |
| Pre-screen | {"source-projection": 26}; passed 16 |
| Components | 1 reached-entry discoveries, 570 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 4096 candidates; maximum connected displacement 5.6604m |
| Topology | {"open-courtyard": 4096} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "boundary-directions": 96507,
  "open-sky": 9004
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 6890,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 12134,
    "triangle": [
      [
        -2.9981871843338013,
        2.082215666770935,
        -2.7812127470970154
      ],
      [
        -2.9981939792633057,
        2.104818731546402,
        -2.7818883061408997
      ],
      [
        -2.9982916116714478,
        2.108101487159729,
        -2.8063425421714783
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.005267725884914309,
        0.17493494749069205
      ],
      [
        0.005274520814418704,
        0.17561050653457633
      ],
      [
        0.005372153222560794,
        0.20006474256515494
      ]
    ],
    "approach": {
      "seam": [
        -2.992919458448887,
        5.808131899545815,
        -2.6062777996063233
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
    "seq": 6891,
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

### projection:wholly-above-player

```json
[
  {
    "seq": 6933,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "9:2",
    "triangleId": 160388,
    "triangle": [
      [
        -1.007817953824997,
        1.953186571598053,
        -2.940616250038147
      ],
      [
        -1.007849782705307,
        1.9599519073963165,
        -2.940617322921753
      ],
      [
        -1.0169094800949097,
        1.9446848630905151,
        -2.9410420060157776
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.018892666697502225,
        -0.5997806251049043
      ],
      [
        0.018893739581108182,
        -0.5998124539852143
      ],
      [
        0.018902531002985317,
        -0.6
      ],
      [
        0.018902940019071803,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.4080373287200927,
        0.023334900871469607,
        -2.9217235833406447
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 7124,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "28:2",
    "triangleId": 188316,
    "triangle": [
      [
        -0.8094449937343597,
        0.020109236240386963,
        -2.9043243527412415
      ],
      [
        -0.8144439160823822,
        0.018321096897125244,
        -2.9279538989067078
      ],
      [
        -0.8056409060955048,
        0.016773462295532227,
        -2.9256913661956787
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0047205471365324185,
        -0.6
      ],
      [
        0.004104623198508683,
        -0.5976035773754123
      ],
      [
        0.002,
        -0.5979782750892957
      ],
      [
        0.0020000000000000005,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.2080373287200925,
        0.02327557844469308,
        -2.92158674299717
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 7267,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "78:0",
    "triangleId": 679,
    "triangle": [
      [
        -2.9997333884239197,
        0.03473585844039917,
        -2.0751065611839294
      ],
      [
        -2.9997766613960266,
        0.055907607078552246,
        -2.090253174304962
      ],
      [
        -3.0055882930755615,
        0.02963966131210327,
        -2.094769299030304
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.48563482957612425
      ],
      [
        0.005676141381263378,
        0.48849149942398085
      ],
      [
        0.0020000000000000005,
        0.476145780993584
      ]
    ],
    "approach": {
      "seam": [
        -2.999912151694298,
        0.025252770069345065,
        -1.606277799606323
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

### predicate:boundary-directions

```json
[
  {
    "seq": 8263,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 106,
    "topology": "open-courtyard",
    "valid": false,
    "firstFailure": "boundary-directions",
    "checks": [
      {
        "name": "open-sky",
        "status": "passed",
        "measured": 0,
        "threshold": 0
      },
      {
        "name": "boundary-directions",
        "status": "failed",
        "measured": 2,
        "threshold": 3
      },
      {
        "name": "broad-open-region",
        "status": "not-evaluated"
      },
      {
        "name": "ground-relative-elevation",
        "status": "not-evaluated"
      }
    ]
  }
]
```

### topology:open-courtyard

```json
[
  {
    "seq": 8506,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "open-courtyard",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-walls"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### predicate:open-sky

```json
[
  {
    "seq": 8609,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 2,
    "nodeId": 112,
    "topology": "open-courtyard",
    "valid": false,
    "firstFailure": "open-sky",
    "checks": [
      {
        "name": "open-sky",
        "status": "failed",
        "measured": 1,
        "threshold": 0
      },
      {
        "name": "boundary-directions",
        "status": "not-evaluated"
      },
      {
        "name": "broad-open-region",
        "status": "not-evaluated"
      },
      {
        "name": "ground-relative-elevation",
        "status": "not-evaluated"
      }
    ]
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline courtyard-1-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
