# chamber-1-42: failed

An empty underground stone chamber with a broad doorway and continuous level floor, high ceiling and open walking space.

Locked scale: 6. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "enclosed-passage",
    "doorway-crossing"
  ],
  "evidence": [
    {
      "kind": "enclosed-passage",
      "source": "text",
      "cue": "chamber"
    },
    {
      "kind": "doorway-crossing",
      "source": "text",
      "cue": "doorway"
    }
  ],
  "ambiguities": [
    "Multiple positive topology cues are conjunctive: the same supported route must witness each requirement."
  ],
  "requirements": {
    "openSky": false,
    "covered": true,
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/chamber-1-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/chamber-1-42/expanded.ndjson.gz`. SHA256 `06af259153605d20c400723c678ed5dda8e0243177d046cb88d577a2a5d399b2`; 55,328 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1383 valid sampled nodes; 2229 floor tests |
| Proposals | Returned pass: 220 eligible; 192 attempted. All trace passes: 84 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 187, "support-edge-not-found": 15, "entry-prism-blocked": 374, "source-entry-prism": 374}; passed 0 |
| Components | Returned pass: 0 reached-entry discoveries. All passes: 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 0 candidate events. Returned pass: maximum connected displacement 0.0000m |
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
    "support:column": 2048,
    "support:rejected": 1672,
    "support:node": 2766,
    "support:duplicate-layer": 20,
    "proposal:eligible": 440,
    "proposal:direction-excluded": 10624,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 56,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 16710,
    "prescreen:projection-start": 374,
    "prescreen:projection-blocked": 187,
    "prescreen:rejected": 374,
    "prescreen:support-edge-not-found": 10,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 187,
    "prescreen:entry-prism-proof": 187,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 836,
    "support:node": 1383,
    "support:duplicate-layer": 10,
    "proposal:eligible": 220,
    "proposal:direction-excluded": 5312,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 28,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 8355,
    "prescreen:projection-start": 187,
    "prescreen:entry-prism-blocked": 187,
    "prescreen:entry-prism-proof": 187,
    "prescreen:rejected": 187,
    "prescreen:support-edge-not-found": 5,
    "route:scheduler-start": 1,
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
    "seq": 9247,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 114628,
    "triangle": [
      [
        -2.9911755323410034,
        1.7922768294811249,
        -2.787836730480194
      ],
      [
        -2.9917101860046387,
        1.819489449262619,
        -2.7863223552703857
      ],
      [
        -2.9900357723236084,
        1.7938034534454346,
        -2.8087695837020874
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.1797343169813966
      ],
      [
        0.002271273732185275,
        0.17896595001220694
      ],
      [
        0.002,
        0.18260265192337166
      ]
    ],
    "approach": {
      "seam": [
        -2.9894389122724534,
        6.001104273714782,
        -2.607356405258179
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
    "seq": 9248,
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 9290,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1195:1",
    "triangleId": 1046734,
    "triangle": [
      [
        2.9351075291633606,
        1.6138223111629486,
        1.4160207509994507
      ],
      [
        2.9349764585494995,
        1.640097051858902,
        1.4150216281414032
      ],
      [
        2.9341800212860107,
        1.641152411699295,
        1.3925058245658875
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.01643818467855418,
        -0.3766228437423713
      ],
      [
        0.016307114064693096,
        -0.3776219666004188
      ],
      [
        0.015510676801204326,
        -0.40013777017593455
      ]
    ],
    "approach": {
      "seam": [
        2.9186693444848064,
        1.117647485868675,
        1.792643594741822
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 9337,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1357:3",
    "triangleId": 1605866,
    "triangle": [
      [
        -0.7850541472434998,
        5.878642916679382,
        2.998629570007324
      ],
      [
        -0.7848840951919556,
        5.901297211647034,
        2.9992815256118774
      ],
      [
        -0.8084457814693451,
        5.878603935241699,
        2.9986626505851746
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.5817955990339693
      ],
      [
        0.0021740451455110055,
        0.5817502021789553
      ],
      [
        0.002,
        0.5883764141598787
      ]
    ],
    "approach": {
      "seam": [
        -0.20313389301300022,
        6.0046863253276035,
        2.9971074804663664
      ],
      "outward": [
        0,
        0,
        1
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
    "seq": 9401,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "605:3",
    "eye": [
      -2.6031338930130006,
      2.75738850879821,
      -0.20735640525817844
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

### projection:wholly-above-player

```json
[
  {
    "seq": 9532,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1354:3",
    "triangleId": 420590,
    "triangle": [
      [
        -1.1963714361190796,
        5.5733184814453125,
        2.988490104675293
      ],
      [
        -1.205668866634369,
        5.584140479564667,
        2.9893121123313904
      ],
      [
        -1.2125865519046783,
        5.574557304382324,
        2.9881301522254944
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0719181135296818,
        0.5932375431060795
      ],
      [
        0.07251599821746625,
        0.6
      ],
      [
        0.07176799662901891,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.6031338930130001,
        1.116842921842047,
        2.916571991145611
      ],
      "outward": [
        0,
        0,
        1
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
    "seq": 27563,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 115464,
    "triangle": [
      [
        -2.993288040161133,
        5.739774763584137,
        -2.805056154727936
      ],
      [
        -2.9934058785438538,
        5.762477874755859,
        -2.8050861954689026
      ],
      [
        -2.993954122066498,
        5.762319445610046,
        -2.827196180820465
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0039079326551591164,
        0.19771474066970932,
        5.751104273714782
      ],
      [
        0.003966966271400363,
        0.1977297902107238,
        5.762477874755859
      ],
      [
        0.004515209794044406,
        0.2198397755622863,
        5.762319445610046
      ],
      [
        0.004183857901105381,
        0.20882590550157804,
        5.751104273714782
      ]
    ],
    "approach": {
      "seam": [
        -2.9894389122724534,
        6.001104273714782,
        -2.607356405258179
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2
    },
    "supportBand": [
      5.751104273714782,
      6.016104273714782
    ],
    "bodyBand": [
      6.016104273714782,
      7.801104273714782
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
    "seq": 27565,
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py walkway chamber-1-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/chamber-1-42/legacy.ndjson.gz`. SHA256 `70f654bfc00b766c02032df563f2aae4678fc2c9dacdeabfb8a112b6a29f7d37`; 46,983 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1383 valid sampled nodes; 2229 floor tests |
| Proposals | Returned pass: 199 eligible; 48 attempted. All trace passes: 453 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 48, "entry-prism-blocked": 96, "source-entry-prism": 96}; passed 0 |
| Components | Returned pass: 0 reached-entry discoveries. All passes: 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 0 candidate events. Returned pass: maximum connected displacement 0.0000m |
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
    "support:column": 2048,
    "support:rejected": 1672,
    "support:node": 2766,
    "support:duplicate-layer": 20,
    "proposal:legacy-body-sample": 8558,
    "proposal:eligible": 398,
    "proposal:direction-unexecuted": 628,
    "proposal:direction-excluded": 10038,
    "proposal:selected": 96,
    "proposal:omitted": 302,
    "budget:exhausted": 2,
    "proposal:attempt": 96,
    "prescreen:edge-support-probe": 4332,
    "prescreen:projection-start": 96,
    "prescreen:projection-blocked": 48,
    "prescreen:rejected": 96,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 48,
    "prescreen:entry-prism-proof": 48,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 836,
    "support:node": 1383,
    "support:duplicate-layer": 10,
    "proposal:legacy-body-sample": 4279,
    "proposal:eligible": 199,
    "proposal:direction-unexecuted": 314,
    "proposal:direction-excluded": 5019,
    "proposal:selected": 48,
    "proposal:omitted": 151,
    "budget:exhausted": 1,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2166,
    "prescreen:projection-start": 48,
    "prescreen:entry-prism-blocked": 48,
    "prescreen:entry-prism-proof": 48,
    "prescreen:rejected": 48,
    "route:scheduler-start": 1,
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
    "seq": 13313,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 114628,
    "triangle": [
      [
        -2.9911755323410034,
        1.7922768294811249,
        -2.787836730480194
      ],
      [
        -2.9917101860046387,
        1.819489449262619,
        -2.7863223552703857
      ],
      [
        -2.9900357723236084,
        1.7938034534454346,
        -2.8087695837020874
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.1797343169813966
      ],
      [
        0.002271273732185275,
        0.17896595001220694
      ],
      [
        0.002,
        0.18260265192337166
      ]
    ],
    "approach": {
      "seam": [
        -2.9894389122724534,
        6.001104273714782,
        -2.607356405258179
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
    "seq": 13314,
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
    "seq": 13950,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "76:1",
    "triangleId": 2276612,
    "triangle": [
      [
        3.00204598903656,
        5.982173144817352,
        -2.821201801300049
      ],
      [
        2.996219515800476,
        6.002312064170837,
        -2.8211633563041687
      ],
      [
        2.9961708784103394,
        6.002207636833191,
        -2.7979542016983032
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0062289461493483245,
        -0.4138453960418702
      ],
      [
        0.002,
        -0.41381749205764146
      ],
      [
        0.002,
        -0.397111609553047
      ]
    ],
    "approach": {
      "seam": [
        2.9958170428872117,
        6.00269430441677,
        -2.4073564052581786
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
    "seq": 28940,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 115464,
    "triangle": [
      [
        -2.993288040161133,
        5.739774763584137,
        -2.805056154727936
      ],
      [
        -2.9934058785438538,
        5.762477874755859,
        -2.8050861954689026
      ],
      [
        -2.993954122066498,
        5.762319445610046,
        -2.827196180820465
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0039079326551591164,
        0.19771474066970932,
        5.751104273714782
      ],
      [
        0.003966966271400363,
        0.1977297902107238,
        5.762477874755859
      ],
      [
        0.004515209794044406,
        0.2198397755622863,
        5.762319445610046
      ],
      [
        0.004183857901105381,
        0.20882590550157804,
        5.751104273714782
      ]
    ],
    "approach": {
      "seam": [
        -2.9894389122724534,
        6.001104273714782,
        -2.607356405258179
      ],
      "outward": [
        -1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2
    },
    "supportBand": [
      5.751104273714782,
      6.016104273714782
    ],
    "bodyBand": [
      6.016104273714782,
      7.801104273714782
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
    "seq": 28942,
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py walkway chamber-1-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
