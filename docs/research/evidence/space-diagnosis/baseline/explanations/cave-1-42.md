# cave-1-42: failed

A natural cave chamber with a broad entrance, high rocky ceiling and a continuous flat sandy floor with empty walking space.

Locked scale: 10. Previously unresolved: True.

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
      "cue": "cave"
    },
    {
      "kind": "enclosed-passage",
      "source": "text",
      "cue": "chamber"
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/cave-1-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/cave-1-42/expanded.ndjson.gz`. SHA256 `a9f8c421386cf12d3f500aefd16d6c0cb59eaf9b185ecdac18ff4e26edb74150`; 21,565 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1157 valid sampled nodes; 2501 floor tests |
| Proposals | 688 eligible; 192 attempted; 496 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 154, "support-edge-not-found": 37}; passed 1 |
| Components | 1 reached-entry discoveries, 63 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 2.0881m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 10765,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 36392,
    "triangle": [
      [
        -4.0745362639427185,
        0.027662068605422974,
        -3.802011013031006
      ],
      [
        -4.0708741545677185,
        0.04578739404678345,
        -3.8006094098091125
      ],
      [
        -4.0516045689582825,
        0.043528079986572266,
        -3.8224563002586365
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.5809666961431503,
        0.5867230176925657
      ],
      [
        0.5773045867681503,
        0.5853214144706724
      ],
      [
        0.5643576522313422,
        0.6
      ],
      [
        0.5660750634065669,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -3.493569567799568,
        0.23550898077437374,
        -3.21528799533844
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
    "seq": 10766,
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
    "seq": 10811,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1156:1",
    "triangleId": 388830,
    "triangle": [
      [
        2.002902030944824,
        3.5869818925857544,
        4.193243086338043
      ],
      [
        1.9840508699417114,
        3.6060746014118195,
        4.191474616527557
      ],
      [
        1.9818264245986938,
        3.603624254465103,
        4.147543013095856
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.017333288490771537,
        -0.39146891832351827
      ],
      [
        0.0019999999999999983,
        -0.39290736860182857
      ],
      [
        0.002000000000000001,
        -0.4247174235177951
      ]
    ],
    "approach": {
      "seam": [
        1.9855687424540527,
        4.1034073494535,
        4.5847120046615615
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 3.1274030163884157
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 10955,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "72:3",
    "triangleId": 314556,
    "triangle": [
      [
        0.14712028205394745,
        4.269676506519318,
        -1.909310221672058
      ],
      [
        0.16645142808556557,
        4.246976971626282,
        -1.9312314689159393
      ],
      [
        0.19013568758964539,
        4.246936589479446,
        -1.9323492050170898
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.07428355378701679,
        0.6
      ],
      [
        0.07419918179512042,
        0.5982122004032142
      ],
      [
        0.07515672443877676,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        0.7883478879928596,
        4.2660161147219915,
        -2.0065483868122103
      ],
      "outward": [
        0,
        0,
        1
      ],
      "width": 1.2,
      "length": 7.117555576562881
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 10998,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1024:0",
    "triangleId": 287,
    "triangle": [
      [
        -4.985835254192352,
        4.2171710729599,
        3.027750253677368
      ],
      [
        -4.992202520370483,
        4.230696111917496,
        2.9904764890670776
      ],
      [
        -4.985694587230682,
        4.210929870605469,
        2.9842665791511536
      ]
    ],
    "clippedApproachCoordinates": [
      [
        2.6587033167481424,
        0.35696175098419225
      ],
      [
        2.6650705829262735,
        0.3942355155944828
      ],
      [
        2.6585626497864725,
        0.40044542551040685
      ]
    ],
    "approach": {
      "seam": [
        -2.32713193744421,
        0.11274234477824019,
        3.3847120046615604
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2.7845201745629313
    },
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 11802,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "419:3",
    "eye": [
      2.7883478879928596,
      1.751012830661801,
      0.3847120046615604
    ],
    "outward": [
      0,
      0,
      1
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
python3 scripts/diagnosis/trace-query.py baseline cave-1-42 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

## legacy: failed

Complete trace: `.runtime/space-diagnosis/baseline/candidates/cave-1-42/legacy.ndjson.gz`. SHA256 `4443e7b11bb449878018126185552eb1b8da6e81bb299a65a0c7c8dc8600ce7f`; 14,818 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1157 valid sampled nodes; 2501 floor tests |
| Proposals | 69 eligible; 48 attempted; 21 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 42}; passed 6 |
| Components | 1 reached-entry discoveries, 63 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 0 candidates; maximum connected displacement 2.4739m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
```

Representative exact rejection events follow. They are an index into the complete trace, not a replacement for it.

### projection:wholly-above-player

```json
[
  {
    "seq": 11373,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "147:1",
    "triangleId": 1059560,
    "triangle": [
      [
        5.001279711723328,
        4.12464439868927,
        -1.6362865269184113
      ],
      [
        5.002848505973816,
        4.162193387746811,
        -1.6387969255447388
      ],
      [
        4.999547600746155,
        4.124491363763809,
        -1.5976102650165558
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.42177966013935286
      ],
      [
        0.003080652654170457,
        -0.4235089302062991
      ],
      [
        0.002,
        -0.4100252125753827
      ]
    ],
    "approach": {
      "seam": [
        4.9997678533196455,
        0.03013161548169594,
        -1.2152879953384397
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

### prescreen:source-projection

```json
[
  {
    "seq": 11374,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "147:1",
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
    "seq": 12488,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "373:1",
    "triangleId": 529858,
    "triangle": [
      [
        4.959901869297028,
        0.014217346906661987,
        -0.17514267936348915
      ],
      [
        4.959962069988251,
        0.014924407005310059,
        -0.21381333470344543
      ],
      [
        4.999435544013977,
        0.014341026544570923,
        -0.21569028496742249
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.40023255149463555
      ],
      [
        0.005569702386855724,
        -0.4004022896289827
      ],
      [
        0.002,
        -0.39674103411600636
      ]
    ],
    "approach": {
      "seam": [
        4.993865841627121,
        0.010194565345701352,
        0.18471200466156024
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

### projection:wholly-below-support-band

```json
[
  {
    "seq": 13227,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "431:0",
    "triangleId": 1432,
    "triangle": [
      [
        -4.9819910526275635,
        4.169796258211136,
        0.002986974432133138
      ],
      [
        -4.984159171581268,
        4.1894641518592834,
        0.0029838262707926333
      ],
      [
        -4.987397491931915,
        4.188833832740784,
        -0.031786863692104816
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.5835833556579294
      ],
      [
        0.0035289415746132223,
        0.6
      ],
      [
        0.002500390409174787,
        0.6
      ],
      [
        0.0020000000000000005,
        0.5967815240109032
      ]
    ],
    "approach": {
      "seam": [
        -4.982331950962544,
        4.456822072995738,
        0.5847120046615606
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 13374,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "485:0",
    "triangleId": 1306,
    "triangle": [
      [
        -4.984791278839111,
        4.206536710262299,
        0.39094578474760056
      ],
      [
        -4.989792704582214,
        4.229021966457367,
        0.39173148572444916
      ],
      [
        -4.989318251609802,
        4.18982520699501,
        0.3611456975340843
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.20838106721639615,
        0.3937662199139602
      ],
      [
        0.21338249295949918,
        0.3929805189371116
      ],
      [
        0.21290803998708707,
        0.42356630712747645
      ]
    ],
    "approach": {
      "seam": [
        -4.776410211622715,
        4.390091389512701,
        0.7847120046615608
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline cave-1-42 --mode legacy --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
