# tunnel-1-42: failed

A short stone tunnel open at both ends, with a continuous flat floor and broad empty passage beneath a curved roof.

Locked scale: 16. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "enclosed-passage"
  ],
  "evidence": [
    {
      "kind": "enclosed-passage",
      "source": "text",
      "cue": "tunnel"
    },
    {
      "kind": "enclosed-passage",
      "source": "text",
      "cue": "passage"
    }
  ],
  "ambiguities": [],
  "requirements": {
    "openSky": false,
    "covered": true,
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/tunnel-1-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/tunnel-1-42/expanded.ndjson.gz`. SHA256 `12c588ee66db5264bfa61b713fb52f683547b730ec8e87467ff6750ad40a2a5e`; 560,126 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 5726 valid sampled nodes; 11037 floor tests |
| Proposals | 1092 eligible; 192 attempted; 900 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 162, "support-edge-not-found": 25}; passed 5 |
| Components | 1 reached-entry discoveries, 1538 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 3431 candidates; maximum connected displacement 19.4618m |
| Topology | {"enclosed-passage": 3431} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 229803
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 41748,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 1122,
    "triangle": [
      [
        -7.720361232757568,
        0.11344432830810547,
        -7.804757595062256
      ],
      [
        -7.71581506729126,
        0.12411308288574219,
        -7.812213897705078
      ],
      [
        -7.718918800354004,
        0.12053680419921875,
        -7.866519927978516
      ]
    ],
    "clippedApproachCoordinates": [
      [
        3.4438076183199886,
        0.189587497711182
      ],
      [
        3.43926145285368,
        0.19704380035400426
      ],
      [
        3.442365185916424,
        0.25134983062744176
      ]
    ],
    "approach": {
      "seam": [
        -4.27655361443758,
        1.5884520884711888,
        -7.615170097351074
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 3.5891920253634457
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 41749,
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
    "seq": 41792,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "5725:1",
    "triangleId": 595456,
    "triangle": [
      [
        7.740422248840332,
        0.045726776123046875,
        7.225832462310791
      ],
      [
        7.740658283233643,
        0.04505109786987305,
        7.163004398345947
      ],
      [
        7.763465881347656,
        0.05008983612060547,
        7.161459922790527
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.42336800463074004
      ],
      [
        0.0020291686058033775,
        -0.42336997985839986
      ],
      [
        0.002,
        -0.4232884971655461
      ]
    ],
    "approach": {
      "seam": [
        7.761436712741853,
        0.09706916960559674,
        7.584829902648927
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 42855,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 5688,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "opposing-wall-width",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "failed",
        "measured": [
          null,
          null,
          1.423926145529904,
          null
        ],
        "threshold": {
          "minimumWidth": 2.4,
          "pairs": [
            [
              0,
              1
            ],
            [
              2,
              3
            ]
          ]
        }
      },
      {
        "name": "broad-supported-region",
        "status": "not-evaluated"
      },
      {
        "name": "required-roof-coverage",
        "status": "not-evaluated"
      }
    ]
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 43098,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 161650,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2194:0",
    "triangleId": 332,
    "triangle": [
      [
        -7.731978416442871,
        0.05480670928955078,
        -2.399477958679199
      ],
      [
        -7.728014945983887,
        0.06009244918823242,
        -2.4001364707946777
      ],
      [
        -7.731947422027588,
        0.05484151840209961,
        -2.4619789123535156
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.004441435635090585,
        0.5843078613281252
      ],
      [
        0.002,
        0.5847134944623962
      ],
      [
        0.002,
        0.6
      ],
      [
        0.004433653855228279,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -7.7275369808077805,
        0.05949977480483849,
        -1.815170097351074
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

### projection:wholly-above-player

```json
[
  {
    "seq": 161694,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "47:2",
    "triangleId": 361083,
    "triangle": [
      [
        1.2393405437469482,
        8.781156539916992,
        -7.937128067016602
      ],
      [
        1.1905235052108765,
        8.800966262817383,
        -7.975807189941406
      ],
      [
        1.2337627410888672,
        8.787068367004395,
        -7.979249954223633
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.03193635856984476,
        -0.6
      ],
      [
        0.0020000000000000018,
        -0.5960358115109269
      ],
      [
        0.002000000000000001,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        1.834254360198976,
        1.5781249985932073,
        -7.943601036071777
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
    "seq": 260996,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "1859:0",
    "eye": [
      -0.9657456398010247,
      3.2478352055440975,
      -3.015170097351074
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline tunnel-1-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/tunnel-1-42/legacy.ndjson.gz`. SHA256 `5a2e65aaf0ebb9858a6333f4345f22c4f79e0a68e6523d8e61b8950d7eaef93f`; 645,331 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 5726 valid sampled nodes; 11037 floor tests |
| Proposals | 526 eligible; 43 attempted; 478 omitted by selection; 5 selected but not attempted |
| Pre-screen | {"source-projection": 39}; passed 4 |
| Components | 1 reached-entry discoveries, 1538 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 4096 candidates; maximum connected displacement 19.9650m |
| Topology | {"enclosed-passage": 4096} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 273020
}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 50845,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:2",
    "triangleId": 111996,
    "triangle": [
      [
        -4.595004558563232,
        0.0966949462890625,
        -7.9349141120910645
      ],
      [
        -4.595846176147461,
        0.15336990356445312,
        -7.939780235290527
      ],
      [
        -4.533674716949463,
        0.09667062759399414,
        -7.933725833892822
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0027361803063133986,
        -0.6
      ],
      [
        0.0019999999999999996,
        -0.5924403089802268
      ],
      [
        0.0019999999999999996,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -3.965745639801025,
        1.5636174881567455,
        -7.934112794697285
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

### prescreen:source-projection

```json
[
  {
    "seq": 50846,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:2",
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
    "seq": 50888,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "11:2",
    "triangleId": 213632,
    "triangle": [
      [
        -2.6092777252197266,
        7.86902928352356,
        -7.942417144775391
      ],
      [
        -2.5891001224517822,
        7.899165391921997,
        -7.9578166007995605
      ],
      [
        -2.5509121417999268,
        7.871371030807495,
        -7.920050144195557
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.007925727783932343,
        -0.6
      ],
      [
        0.0020000000000000052,
        -0.5940081331872427
      ],
      [
        0.002000000000000003,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -1.9657456398010247,
        1.5811317735870793,
        -7.926794180274009
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
    "seq": 51231,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "220:1",
    "triangleId": 595934,
    "triangle": [
      [
        7.7625508308410645,
        0.0625615119934082,
        -7.597389221191406
      ],
      [
        7.745687484741211,
        0.06566095352172852,
        -7.646318435668945
      ],
      [
        7.769681453704834,
        0.06661033630371094,
        -7.5813469886779785
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.012845273315906347,
        -0.38221912384033185
      ],
      [
        0.002,
        -0.41368682313318583
      ],
      [
        0.002,
        -0.4148524559041361
      ],
      [
        0.01997589617967588,
        -0.3661768913269041
      ]
    ],
    "approach": {
      "seam": [
        7.749705557525158,
        0.06276787326013462,
        -7.215170097351074
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
    "seq": 51372,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "861:1",
    "triangleId": 595880,
    "triangle": [
      [
        7.734133243560791,
        0.0511021614074707,
        -5.960066795349121
      ],
      [
        7.733148097991943,
        0.050981998443603516,
        -6.021798610687256
      ],
      [
        7.749019622802734,
        0.05508136749267578,
        -6.024119853973389
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.40890414666745634
      ],
      [
        0.0023118585348118614,
        -0.4089497566223148
      ],
      [
        0.002,
        -0.4076078928495244
      ]
    ],
    "approach": {
      "seam": [
        7.7467077642679225,
        0.06144907750224656,
        -5.615170097351074
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 53280,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 5583,
    "topology": "enclosed-passage",
    "valid": false,
    "firstFailure": "opposing-wall-width",
    "checks": [
      {
        "name": "opposing-wall-width",
        "status": "failed",
        "measured": [
          null,
          null,
          null,
          null
        ],
        "threshold": {
          "minimumWidth": 2.4,
          "pairs": [
            [
              0,
              1
            ],
            [
              2,
              3
            ]
          ]
        }
      },
      {
        "name": "broad-supported-region",
        "status": "not-evaluated"
      },
      {
        "name": "required-roof-coverage",
        "status": "not-evaluated"
      }
    ]
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 53523,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline tunnel-1-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
