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

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/cave-1-42/expanded.ndjson.gz`. SHA256 `35b523b621bb4d0641d1624c393bbd83e51d56d13637f5206d514eb2be82703a`; 65,746 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1157 valid sampled nodes; 2501 floor tests |
| Proposals | Returned pass: 688 eligible; 192 attempted. All trace passes: 1488 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 154, "support-edge-not-found": 111, "entry-prism-blocked": 304, "source-entry-prism": 304, "body-obstruction": 2}; passed 5 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 125 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 0 candidate events. Returned pass: maximum connected displacement 2.0881m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
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
    "support:column": 5408,
    "support:rejected": 2688,
    "support:node": 2314,
    "proposal:eligible": 1376,
    "proposal:direction-excluded": 7880,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 992,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 19736,
    "prescreen:projection-start": 310,
    "prescreen:projection-blocked": 154,
    "prescreen:rejected": 307,
    "prescreen:body-sample": 117,
    "prescreen:passed": 3,
    "component:entry-search": 3,
    "component:node-visited": 188,
    "edge:tested": 443,
    "component:node-discovered": 185,
    "prescreen:support-edge-not-found": 74,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 152,
    "prescreen:entry-prism-proof": 155,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2704,
    "support:rejected": 1344,
    "support:node": 1157,
    "proposal:eligible": 688,
    "proposal:direction-excluded": 3940,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 496,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9868,
    "prescreen:projection-start": 155,
    "prescreen:entry-prism-blocked": 152,
    "prescreen:entry-prism-proof": 155,
    "prescreen:rejected": 153,
    "prescreen:body-sample": 79,
    "prescreen:passed": 2,
    "route:stream-admitted": 2,
    "prescreen:support-edge-not-found": 37,
    "route:scheduler-start": 1,
    "route:stream-resumed": 2,
    "component:entry-search": 2,
    "component:node-visited": 125,
    "edge:tested": 323,
    "component:node-discovered": 123,
    "route:stream-complete": 2,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 10767,
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
    "seq": 10768,
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

### projection:wholly-below-support-band

```json
[
  {
    "seq": 10813,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 10957,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 11000,
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
    "seq": 11804,
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
    ],
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 32331,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
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
    "clippedPrismCoordinates": [
      [
        0.5809666961431503,
        0.5867230176925657,
        0.027662068605422974
      ],
      [
        0.5773045867681503,
        0.5853214144706724,
        0.04578739404678345
      ],
      [
        0.5643576522313422,
        0.6,
        0.04426939610803584
      ],
      [
        0.5660750634065669,
        0.6,
        0.037965311110736595
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
      "length": 2.218082544207573
    },
    "supportBand": [
      -0.014491019225626262,
      0.2505089807743737
    ],
    "bodyBand": [
      0.2505089807743737,
      2.035508980774374
    ],
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 32333,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "0:0",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### prescreen:body-obstruction

```json
[
  {
    "seq": 40161,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "127:1",
    "firstFailure": "body-obstruction",
    "triangleId": 508062,
    "triangle": [
      [
        4.305400550365448,
        0.5060073733329773,
        -1.6988952457904816
      ],
      [
        4.304422736167908,
        0.5105410516262054,
        -1.698889136314392
      ],
      [
        4.293334782123566,
        0.4923933744430542,
        -1.7060600221157074
      ]
    ],
    "position": [
      4.23834788799286,
      0.05893234888534127,
      -1.4152879953384399
    ],
    "unexecuted": [
      "remaining-body-samples",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope cave-1-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/cave-1-42/legacy.ndjson.gz`. SHA256 `d6c96075e0718e3a0550d65d39cbb4b209846900db244312fa666c5847ee9083`; 46,963 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1157 valid sampled nodes; 2501 floor tests |
| Proposals | Returned pass: 69 eligible; 48 attempted. All trace passes: 63 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 42, "entry-prism-blocked": 72, "source-entry-prism": 72}; passed 30 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 125 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 0 candidate events. Returned pass: maximum connected displacement 2.4739m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{}
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
    "support:column": 5408,
    "support:rejected": 2688,
    "support:node": 2314,
    "proposal:direction-excluded": 8882,
    "proposal:legacy-body-sample": 2828,
    "proposal:eligible": 138,
    "proposal:direction-unexecuted": 236,
    "proposal:selected": 96,
    "proposal:omitted": 42,
    "budget:exhausted": 2,
    "proposal:attempt": 96,
    "prescreen:edge-support-probe": 4386,
    "prescreen:projection-start": 96,
    "prescreen:projection-blocked": 42,
    "prescreen:rejected": 78,
    "prescreen:body-sample": 726,
    "prescreen:passed": 18,
    "component:entry-search": 18,
    "component:node-visited": 1128,
    "edge:tested": 443,
    "component:node-discovered": 1110,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-proof": 48,
    "prescreen:entry-prism-blocked": 36,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2704,
    "support:rejected": 1344,
    "support:node": 1157,
    "proposal:direction-excluded": 4441,
    "proposal:legacy-body-sample": 1414,
    "proposal:eligible": 69,
    "proposal:direction-unexecuted": 118,
    "proposal:selected": 48,
    "proposal:omitted": 21,
    "budget:exhausted": 1,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2193,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-proof": 48,
    "prescreen:body-sample": 486,
    "prescreen:passed": 12,
    "route:stream-admitted": 12,
    "prescreen:entry-prism-blocked": 36,
    "prescreen:rejected": 36,
    "route:scheduler-start": 1,
    "route:stream-resumed": 12,
    "component:entry-search": 12,
    "component:node-visited": 750,
    "edge:tested": 323,
    "component:node-discovered": 738,
    "route:stream-complete": 12,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:wholly-above-player

```json
[
  {
    "seq": 11375,
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
    "seq": 11376,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "147:1",
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 12490,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 13229,
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
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 13376,
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
    "seq": 27691,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "255:1",
    "triangleId": 529839,
    "triangle": [
      [
        4.960443377494812,
        0.009563714265823364,
        0.020619200076907873
      ],
      [
        4.999679625034332,
        0.010632723569869995,
        -0.016692201606929302
      ],
      [
        5.0033485889434814,
        0.010074973106384277,
        0.02074914751574397
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.002,
        0.4138881910469827,
        0.010404918165140402
      ],
      [
        0.004170426726340715,
        0.4360371428541834,
        0.010074973106384277
      ],
      [
        0.002,
        0.436030569261262,
        0.010049110284266295
      ]
    ],
    "approach": {
      "seam": [
        4.999178162217141,
        0.027398540079341113,
        -0.4152879953384394
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
      -0.22260145992065888,
      0.042398540079341115
    ],
    "bodyBand": [
      0.042398540079341115,
      1.827398540079341
    ],
    "contactBoundaryTolerance": 0.002,
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

### prescreen:source-entry-prism

```json
[
  {
    "seq": 27693,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "255:1",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "predecessor",
    "predecessorPass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope cave-1-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
