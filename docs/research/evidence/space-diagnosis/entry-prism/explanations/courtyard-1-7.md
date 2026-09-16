# courtyard-1-7: failed

An empty courtyard enclosed by stone walls, broad entrance gate and flat continuous paving under an open sky.

Locked scale: 10. Previously unresolved: True.

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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/courtyard-1-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/courtyard-1-7/expanded.ndjson.gz`. SHA256 `e6c573eed4b0685e4643d67423c1b32c506f483a373b7923b1f2522285e59440`; 222,477 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1405 valid sampled nodes; 2496 floor tests |
| Proposals | Returned pass: 570 eligible; 192 attempted. All trace passes: 756 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 146, "support-edge-not-found": 86, "body-obstruction": 2, "entry-prism-blocked": 146, "source-entry-prism": 146}; passed 4 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 1003 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 1704 candidate events. Returned pass: maximum connected displacement 9.2195m |
| Topology | {"open-courtyard": 1704} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "open-sky": 54536,
  "boundary-directions": 6288,
  "broad-open-region": 4520
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
    "support:column": 2704,
    "support:rejected": 1091,
    "support:node": 1405,
    "proposal:eligible": 570,
    "proposal:direction-excluded": 5050,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 378,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9849,
    "prescreen:projection-start": 149,
    "prescreen:projection-blocked": 146,
    "prescreen:rejected": 147,
    "prescreen:support-edge-not-found": 43,
    "prescreen:body-sample": 79,
    "prescreen:passed": 2,
    "component:entry-search": 2,
    "component:node-visited": 2006,
    "edge:tested": 3261,
    "component:node-discovered": 2004,
    "route:candidate": 852,
    "topology:ray": 12651,
    "topology:node-feature": 971,
    "topology:node-predicate": 32672,
    "topology:sustained-sample": 32672,
    "topology:sustained-result": 852,
    "topology:route-rejected": 852,
    "topology:broad-feature": 173,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2704,
    "support:rejected": 1091,
    "support:node": 1405,
    "proposal:eligible": 570,
    "proposal:direction-excluded": 5050,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 378,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9849,
    "prescreen:projection-start": 149,
    "prescreen:entry-prism-blocked": 146,
    "prescreen:entry-prism-proof": 149,
    "prescreen:rejected": 147,
    "prescreen:support-edge-not-found": 43,
    "prescreen:body-sample": 79,
    "prescreen:passed": 2,
    "component:entry-search": 2,
    "component:node-visited": 2006,
    "edge:tested": 3261,
    "component:node-discovered": 2004,
    "route:candidate": 852,
    "topology:ray": 12651,
    "topology:node-feature": 971,
    "topology:node-predicate": 32672,
    "topology:sustained-sample": 32672,
    "topology:sustained-result": 852,
    "topology:route-rejected": 852,
    "topology:broad-feature": 173,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 11620,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 43350,
    "triangle": [
      [
        -4.686914682388306,
        0.23314833641052246,
        -4.80221688747406
      ],
      [
        -4.689984321594238,
        0.25152966380119324,
        -4.803155064582825
      ],
      [
        -4.683910608291626,
        0.23472532629966736,
        -4.833502173423767
      ]
    ],
    "clippedApproachCoordinates": [
      [
        3.7610082760453225,
        0.19285895824432409
      ],
      [
        3.764077915251255,
        0.19379713535308873
      ],
      [
        3.758004201948643,
        0.22414424419403112
      ]
    ],
    "approach": {
      "seam": [
        -0.925906406342983,
        0.16739144076321213,
        -4.609357929229736
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 4.178355921804905
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
    "seq": 11621,
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
    "seq": 11673,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1394:1",
    "triangleId": 404900,
    "triangle": [
      [
        0.554758794605732,
        3.1331047043204308,
        3.997354507446289
      ],
      [
        0.5344780534505844,
        3.1547948718070984,
        3.9977195858955383
      ],
      [
        0.5534001067280769,
        3.131413571536541,
        3.953685164451599
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.007951636612415047,
        -0.39328756332397496
      ],
      [
        0.002,
        -0.39318042649656154
      ],
      [
        0.002,
        -0.42626843412746773
      ],
      [
        0.006592948734760018,
        -0.4369569063186649
      ]
    ],
    "approach": {
      "seam": [
        0.5468071579933169,
        3.370423298243581,
        4.390642070770264
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 4.5535313963890065
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
    "seq": 11812,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "262:2",
    "triangleId": 433288,
    "triangle": [
      [
        1.0242564231157303,
        2.112954705953598,
        -4.807352423667908
      ],
      [
        1.0242007672786713,
        2.126225084066391,
        -4.805624186992645
      ],
      [
        1.0249025374650955,
        2.1086906641721725,
        -4.827100932598114
      ]
    ],
    "clippedApproachCoordinates": [
      [
        2.637952068448067,
        -0.5714812487363821
      ],
      [
        2.6362238317728046,
        -0.5715369045734411
      ],
      [
        2.6577005773782734,
        -0.5708351343870168
      ]
    ],
    "approach": {
      "seam": [
        1.5957376718521123,
        4.710029522417411,
        -2.1694003552198406
      ],
      "outward": [
        0,
        0,
        -1
      ],
      "width": 1.2,
      "length": 2.9399575740098958
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
    "seq": 12273,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "399:0",
    "eye": [
      -1.804262328147888,
      1.8174648098846453,
      -1.0093579292297363
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
    ],
    "pass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 12319,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1001:1",
    "triangleId": 534458,
    "triangle": [
      [
        2.2427017986774445,
        3.4296023845672607,
        0.6096908077597618
      ],
      [
        2.238505631685257,
        3.474559858441353,
        0.611879862844944
      ],
      [
        2.244214713573456,
        3.4418077021837234,
        0.575861856341362
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.02463122308254162,
        -0.38095126301050186
      ],
      [
        0.02043505609035412,
        -0.37876220792531967
      ],
      [
        0.026144137978552973,
        -0.4147802144289017
      ]
    ],
    "approach": {
      "seam": [
        2.218070575594903,
        0.17112218129768453,
        0.9906420707702637
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2.8822679787874215
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### predicate:open-sky

```json
[
  {
    "seq": 16717,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1401,
    "topology": "open-courtyard",
    "valid": false,
    "firstFailure": "open-sky",
    "checks": [
      {
        "name": "open-sky",
        "status": "failed",
        "measured": 9,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:boundary-directions

```json
[
  {
    "seq": 16845,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1321,
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
        "measured": 0,
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
    ],
    "pass": "baseline"
  }
]
```

### topology:open-courtyard

```json
[
  {
    "seq": 16976,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "open-courtyard",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-walls"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### predicate:broad-open-region

```json
[
  {
    "seq": 21294,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 33,
    "nodeId": 1339,
    "topology": "open-courtyard",
    "valid": false,
    "firstFailure": "broad-open-region",
    "checks": [
      {
        "name": "open-sky",
        "status": "passed",
        "measured": 0,
        "threshold": 0
      },
      {
        "name": "boundary-directions",
        "status": "passed",
        "measured": 3,
        "threshold": 3
      },
      {
        "name": "broad-open-region",
        "status": "failed",
        "measured": {
          "featureKey": "1339:open"
        }
      },
      {
        "name": "ground-relative-elevation",
        "status": "not-evaluated"
      }
    ],
    "pass": "baseline"
  }
]
```

### prescreen:body-obstruction

```json
[
  {
    "seq": 106512,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "534:1",
    "firstFailure": "body-obstruction",
    "triangleId": 1455010,
    "triangle": [
      [
        4.205504953861237,
        0.23302361369132996,
        -0.8266819268465042
      ],
      [
        4.207164943218231,
        0.24574071168899536,
        -0.8548270910978317
      ],
      [
        4.182237386703491,
        0.2333223819732666,
        -0.8530963957309723
      ]
    ],
    "position": [
      4.045737671852112,
      0.2295427063072839,
      -0.609357929229736
    ],
    "unexecuted": [
      "remaining-body-samples",
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
    "seq": 122783,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 43350,
    "triangle": [
      [
        -4.686914682388306,
        0.23314833641052246,
        -4.80221688747406
      ],
      [
        -4.689984321594238,
        0.25152966380119324,
        -4.803155064582825
      ],
      [
        -4.683910608291626,
        0.23472532629966736,
        -4.833502173423767
      ]
    ],
    "clippedPrismCoordinates": [
      [
        3.7610082760453225,
        0.19285895824432409,
        0.23314833641052246
      ],
      [
        3.764077915251255,
        0.19379713535308873,
        0.25152966380119324
      ],
      [
        3.758004201948643,
        0.22414424419403112,
        0.23472532629966736
      ]
    ],
    "approach": {
      "seam": [
        -0.925906406342983,
        0.16739144076321213,
        -4.609357929229736
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 4.778355921804905
    },
    "supportBand": [
      -0.08260855923678787,
      0.18239144076321212
    ],
    "bodyBand": [
      0.18239144076321212,
      1.9673914407632123
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
    "seq": 122785,
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
python3 scripts/diagnosis/trace-query.py entry-prism courtyard-1-7 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/courtyard-1-7/legacy.ndjson.gz`. SHA256 `7a06daf678796d056922d437946a7d5ec3210fdeefa2e977d06d64ec8837dfe0`; 726,448 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1405 valid sampled nodes; 2496 floor tests |
| Proposals | Returned pass: 48 eligible; 12 attempted. All trace passes: 0 omitted by selection; 72 selected but not attempted |
| Pre-screen | {"source-projection": 7, "entry-prism-blocked": 7, "source-entry-prism": 7}; passed 10 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 1003 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 8192 candidate events. Returned pass: maximum connected displacement 9.2347m |
| Topology | {"open-courtyard": 8192} |
| Final seam | {} |
| Exhausted bounds | ["candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "open-sky": 279910,
  "boundary-directions": 15732,
  "broad-open-region": 15964
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
    "support:column": 2704,
    "support:rejected": 1091,
    "support:node": 1405,
    "proposal:direction-excluded": 5505,
    "proposal:legacy-body-sample": 914,
    "proposal:eligible": 48,
    "proposal:direction-unexecuted": 67,
    "proposal:selected": 48,
    "proposal:attempt": 12,
    "prescreen:edge-support-probe": 544,
    "prescreen:projection-start": 12,
    "prescreen:projection-blocked": 7,
    "prescreen:rejected": 7,
    "prescreen:body-sample": 198,
    "prescreen:passed": 5,
    "component:entry-search": 5,
    "component:node-visited": 4820,
    "edge:tested": 3261,
    "component:node-discovered": 4834,
    "route:candidate": 4096,
    "topology:ray": 12653,
    "topology:node-feature": 972,
    "topology:node-predicate": 155803,
    "topology:sustained-sample": 155803,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "topology:broad-feature": 168,
    "route:candidate-not-executed": 1,
    "budget:exhausted": 1,
    "proposal:not-attempted": 36,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2704,
    "support:rejected": 1091,
    "support:node": 1405,
    "proposal:direction-excluded": 5505,
    "proposal:legacy-body-sample": 914,
    "proposal:eligible": 48,
    "proposal:direction-unexecuted": 67,
    "proposal:selected": 48,
    "proposal:attempt": 12,
    "prescreen:edge-support-probe": 544,
    "prescreen:projection-start": 12,
    "prescreen:entry-prism-blocked": 7,
    "prescreen:entry-prism-proof": 12,
    "prescreen:rejected": 7,
    "prescreen:body-sample": 198,
    "prescreen:passed": 5,
    "component:entry-search": 5,
    "component:node-visited": 4820,
    "edge:tested": 3261,
    "component:node-discovered": 4834,
    "route:candidate": 4096,
    "topology:ray": 12653,
    "topology:node-feature": 972,
    "topology:node-predicate": 155803,
    "topology:sustained-sample": 155803,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "topology:broad-feature": 168,
    "route:candidate-not-executed": 1,
    "budget:exhausted": 1,
    "proposal:not-attempted": 36,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:wholly-above-player

```json
[
  {
    "seq": 11830,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:2",
    "triangleId": 336378,
    "triangle": [
      [
        -1.097540333867073,
        2.5601273705251515,
        -4.995926916599274
      ],
      [
        -1.0996903479099274,
        2.5913976365700364,
        -4.999495446681976
      ],
      [
        -1.0599428415298462,
        2.5909841479733586,
        -5.000650882720947
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.27183026867054444
      ],
      [
        0.0024694636464124287,
        -0.2556805133819582
      ],
      [
        0.002,
        -0.2594169194852146
      ]
    ],
    "approach": {
      "seam": [
        -0.804262328147888,
        0.14318200308654905,
        -4.998181419074535
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

### prescreen:source-projection

```json
[
  {
    "seq": 11831,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:2",
    "firstFailure": "source-projection",
    "unexecuted": [
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
    "seq": 11922,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2:2",
    "triangleId": 344695,
    "triangle": [
      [
        -0.928216427564621,
        0.14197230339050293,
        -4.9985140562057495
      ],
      [
        -0.9524890035390854,
        0.14496788382530212,
        -5.000408887863159
      ],
      [
        -0.9277518838644028,
        0.14412879943847656,
        -5.002307295799255
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.5409401707772048
      ],
      [
        0.00333921760320699,
        -0.5234895557165151
      ],
      [
        0.002,
        -0.52365356462907
      ]
    ],
    "approach": {
      "seam": [
        -0.40426232814788765,
        0.13691008609840274,
        -4.998968078196048
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

### predicate:open-sky

```json
[
  {
    "seq": 12436,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 3,
    "topology": "open-courtyard",
    "valid": false,
    "firstFailure": "open-sky",
    "checks": [
      {
        "name": "open-sky",
        "status": "failed",
        "measured": 9,
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
    ],
    "pass": "baseline"
  }
]
```

### topology:open-courtyard

```json
[
  {
    "seq": 12679,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "open-courtyard",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-walls"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### predicate:boundary-directions

```json
[
  {
    "seq": 38907,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 312,
    "nodeId": 485,
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:broad-open-region

```json
[
  {
    "seq": 45080,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 377,
    "nodeId": 397,
    "topology": "open-courtyard",
    "valid": false,
    "firstFailure": "broad-open-region",
    "checks": [
      {
        "name": "open-sky",
        "status": "passed",
        "measured": 0,
        "threshold": 0
      },
      {
        "name": "boundary-directions",
        "status": "passed",
        "measured": 3,
        "threshold": 3
      },
      {
        "name": "broad-open-region",
        "status": "failed",
        "measured": {
          "featureKey": "397:open"
        }
      },
      {
        "name": "ground-relative-elevation",
        "status": "not-evaluated"
      }
    ],
    "pass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 375047,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:2",
    "triangleId": 340668,
    "triangle": [
      [
        -1.0204929858446121,
        0.1444154977798462,
        -4.984552264213562
      ],
      [
        -1.02167509496212,
        0.14776483178138733,
        -4.994405508041382
      ],
      [
        -0.9813638776540756,
        0.14568805694580078,
        -5.000654458999634
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.002,
        -0.18015307212869497,
        0.14584526691900052
      ],
      [
        0.002473039925098952,
        -0.17710154950618762,
        0.14568805694580078
      ],
      [
        0.002,
        -0.17825105928752816,
        0.14565067252084848
      ]
    ],
    "approach": {
      "seam": [
        -0.804262328147888,
        0.14318200308654905,
        -4.998181419074535
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
      -0.10681799691345095,
      0.15818200308654906
    ],
    "bodyBand": [
      0.15818200308654906,
      1.943182003086549
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
    "seq": 375049,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:2",
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
python3 scripts/diagnosis/trace-query.py entry-prism courtyard-1-7 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
