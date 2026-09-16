# narrow_passage-1-42: failed

A narrow human passage between tall stone walls, straight flat floor and clear overhead space, open entrances at both ends.

Locked scale: 6. Previously unresolved: True.

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
      "cue": "passage"
    }
  ],
  "ambiguities": [],
  "requirements": {
    "openSky": false,
    "covered": false,
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/narrow_passage-1-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/narrow_passage-1-42/expanded.ndjson.gz`. SHA256 `5bb0d005c699ec6a9fea7081c1626202475eb403419e5ad910ef42e54b28346e`; 17,374 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1155 valid sampled nodes; 1748 floor tests |
| Proposals | 364 eligible; 192 attempted; 172 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 174, "support-edge-not-found": 18}; passed 0 |
| Components | 0 reached-entry discoveries, 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 7996,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 123606,
    "triangle": [
      [
        -2.9972932934761047,
        1.130601704120636,
        -2.781974136829376
      ],
      [
        -2.997314929962158,
        1.1549105644226074,
        -2.7822457551956177
      ],
      [
        -2.9976900815963745,
        1.1547791361808777,
        -2.808462917804718
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.005060975253581734,
        0.17399009466171256
      ],
      [
        0.005082611739635201,
        0.174261713027954
      ],
      [
        0.00545776337385151,
        0.20047887563705435
      ]
    ],
    "approach": {
      "seam": [
        -2.992232318222523,
        5.99405575978473,
        -2.6079840421676637
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
    "seq": 7997,
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
    "seq": 8039,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1115:1",
    "triangleId": 961542,
    "triangle": [
      [
        2.898037075996399,
        0.007930576801300049,
        2.004209339618683
      ],
      [
        2.8980127573013306,
        0.007925927639007568,
        1.9805100560188293
      ],
      [
        2.9248030185699463,
        0.007646083831787109,
        1.9800233244895935
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.4118680501354279
      ],
      [
        0.008857202529906516,
        -0.4119926333427433
      ],
      [
        0.002000000000000001,
        -0.4057963858660915
      ]
    ],
    "approach": {
      "seam": [
        2.9159458160400398,
        0.09630713906823922,
        2.392015957832337
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 9052,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "177:1",
    "triangleId": 279880,
    "triangle": [
      [
        -2.046978235244751,
        0.7240294218063354,
        -2.004683196544647
      ],
      [
        -2.0440476536750793,
        0.7465619444847107,
        -2.004144251346588
      ],
      [
        -2.043897807598114,
        0.7466556429862976,
        -2.0163740515708923
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.39667917555451687
      ],
      [
        0.0048219442367551935,
        -0.3961602091789247
      ],
      [
        0.0049717903137205255,
        -0.4083900094032289
      ],
      [
        0.002,
        -0.397111455347906
      ]
    ],
    "approach": {
      "seam": [
        -2.0488695979118345,
        0.09065764136507613,
        -1.6079840421676634
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 5.152621829509735
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 9116,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "836:2",
    "eye": [
      -2.606003499031067,
      1.7335706133211355,
      1.1920159578323366
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

### projection:wholly-above-player

```json
[
  {
    "seq": 11523,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "949:3",
    "triangleId": 399462,
    "triangle": [
      [
        -1.2223763465881348,
        5.223432183265686,
        2.9888391494750977
      ],
      [
        -1.2219326198101044,
        5.216620981693268,
        2.985854744911194
      ],
      [
        -1.2033063769340515,
        5.216160893440247,
        2.985829532146454
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.03995789744596131,
        0.6
      ],
      [
        0.039954246580601094,
        0.597302877902985
      ],
      [
        0.04037990564288001,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.6060034990310665,
        0.08570576064822387,
        2.9458752855658528
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline narrow_passage-1-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/narrow_passage-1-42/legacy.ndjson.gz`. SHA256 `a2576fd00659822f406d4a5b9bc1d8c28769db43bd85d490d1aa20e7a9fcade5`; 11,866 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1155 valid sampled nodes; 1748 floor tests |
| Proposals | 62 eligible; 48 attempted; 14 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 48}; passed 0 |
| Components | 0 reached-entry discoveries, 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 0.0000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-below-support-band

```json
[
  {
    "seq": 9690,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:2",
    "triangleId": 130608,
    "triangle": [
      [
        -2.9936403036117554,
        0.27642953395843506,
        -3.000403046607971
      ],
      [
        -2.9917513132095337,
        0.2895627021789551,
        -3.0000393390655518
      ],
      [
        -2.977569580078125,
        0.2768211364746094,
        -3.0045286417007446
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.3774871011201444
      ],
      [
        0.0038743302226063037,
        -0.371566081047058
      ],
      [
        0.002,
        -0.3788672926640188
      ]
    ],
    "approach": {
      "seam": [
        -2.606003499031067,
        5.975027995066942,
        -3.0006543114781383
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
    "seq": 9691,
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 9736,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "5:2",
    "triangleId": 241470,
    "triangle": [
      [
        -2.214821219444275,
        5.905732154846191,
        -2.9992053508758545
      ],
      [
        -2.2143439650535583,
        5.934095621109009,
        -3.0003104209899902
      ],
      [
        -2.1902668476104736,
        5.905421733856201,
        -2.9991295337677
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002699439089380168,
        -0.6
      ],
      [
        0.002,
        -0.5857391317465248
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -1.6060034990310668,
        5.97559866452125,
        -2.997201915085316
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
    "seq": 11493,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1131:3",
    "triangleId": 1552666,
    "triangle": [
      [
        -0.4807610660791397,
        5.983096361160278,
        2.9936227798461914
      ],
      [
        -0.48074814677238464,
        5.995195984840393,
        2.9910537600517273
      ],
      [
        -0.5034660547971725,
        5.9830005168914795,
        2.9933647513389587
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.00205412209033895,
        0.0747575670480729
      ],
      [
        0.002,
        0.07475729487426995
      ],
      [
        0.002,
        0.07951999219140857
      ]
    ],
    "approach": {
      "seam": [
        -0.4060034990310668,
        5.995012683635425,
        2.9915686577558525
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline narrow_passage-1-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
