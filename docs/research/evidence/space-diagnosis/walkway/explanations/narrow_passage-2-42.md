# narrow_passage-2-42: failed

A tight covered corridor with parallel brick walls, a level empty walkway and enough width and headroom for one person.

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
      "cue": "corridor"
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/narrow_passage-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/narrow_passage-2-42/expanded.ndjson.gz`. SHA256 `a1972bb52cd7f9134c04fa7c62a688040d8ac800782c507545598089594a2e0a`; 53,877 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1458 valid sampled nodes; 1737 floor tests |
| Proposals | Returned pass: 216 eligible; 192 attempted. All trace passes: 72 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 192, "entry-prism-blocked": 384, "source-entry-prism": 384}; passed 0 |
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
    "support:rejected": 558,
    "support:node": 2916,
    "proposal:eligible": 432,
    "proposal:direction-excluded": 11232,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 48,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 16108,
    "prescreen:projection-start": 384,
    "prescreen:projection-blocked": 192,
    "prescreen:rejected": 384,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 192,
    "prescreen:entry-prism-proof": 192,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 279,
    "support:node": 1458,
    "proposal:eligible": 216,
    "proposal:direction-excluded": 5616,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 24,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 8054,
    "prescreen:projection-start": 192,
    "prescreen:entry-prism-blocked": 192,
    "prescreen:entry-prism-proof": 192,
    "prescreen:rejected": 192,
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
    "seq": 9051,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 88708,
    "triangle": [
      [
        -2.997656464576721,
        0.05565100908279419,
        -2.8062910437583923
      ],
      [
        -2.998460590839386,
        0.08303815126419067,
        -2.8060521483421326
      ],
      [
        -2.9977877140045166,
        0.05529892444610596,
        -2.8304450511932373
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.19650505937108026
      ],
      [
        0.0026649743318554187,
        0.19630750417709342
      ],
      [
        0.002,
        0.2204139281686047
      ]
    ],
    "approach": {
      "seam": [
        -2.9957956165075306,
        6.001119730993146,
        -2.609744644165039
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
    "seq": 9052,
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
    "seq": 9096,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1457:1",
    "triangleId": 648389,
    "triangle": [
      [
        2.9789929389953613,
        0.07968109846115112,
        2.1908692717552185
      ],
      [
        2.9788237810134888,
        0.10883688926696777,
        2.21327143907547
      ],
      [
        2.9787431359291077,
        0.10914444923400879,
        2.19020676612854
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.011120392382144573,
        -0.39938608407974296
      ],
      [
        0.010951234400272014,
        -0.3769839167594915
      ],
      [
        0.01087058931589091,
        -0.40004858970642143
      ]
    ],
    "approach": {
      "seam": [
        2.9678725466132168,
        0.039265976629838405,
        2.5902553558349615
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
    "seq": 9141,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "19:2",
    "triangleId": 217946,
    "triangle": [
      [
        -1.4154455959796906,
        0.001270294189453125,
        -2.9762958884239197
      ],
      [
        -1.4174078106880188,
        0.008422672748565674,
        -2.9966155886650085
      ],
      [
        -1.3943586945533752,
        0.008423030376434326,
        -2.99656480550766
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.020771565571462026,
        -0.6
      ],
      [
        0.020744748413562775,
        -0.5878284096717836
      ],
      [
        0.009045307601836973,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -0.8065302848815916,
        0.03588108706920318,
        -2.975820057094097
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

### projection:wholly-above-player

```json
[
  {
    "seq": 9876,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "973:0",
    "triangleId": 40168,
    "triangle": [
      [
        -3.0004312992095947,
        2.006798028945923,
        0.5996562838554382
      ],
      [
        -2.998955011367798,
        2.031797468662262,
        0.59849913418293
      ],
      [
        -2.9991910457611084,
        2.0318285822868347,
        0.575088769197464
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.02320302575826627,
        0.3905990719795227
      ],
      [
        0.021726737916469396,
        0.39175622165203094
      ],
      [
        0.021962772309779943,
        0.41516658663749695
      ]
    ],
    "approach": {
      "seam": [
        -2.9772282734513285,
        0.032496389101311425,
        0.9902553558349609
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
    "seq": 26880,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 89030,
    "triangle": [
      [
        -2.999242901802063,
        5.750524699687958,
        -2.803760826587677
      ],
      [
        -2.9991692304611206,
        5.775462806224823,
        -2.8034679293632507
      ],
      [
        -2.9991012811660767,
        5.775459945201874,
        -2.8263038992881775
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.003445527472458354,
        0.1940091937999259,
        5.751119730993146
      ],
      [
        0.003373613953590038,
        0.19372328519821158,
        5.775462806224823
      ],
      [
        0.0033056646585460925,
        0.21655925512313834,
        5.775459945201874
      ],
      [
        0.0034439057925409315,
        0.1945541291600962,
        5.751119730993146
      ]
    ],
    "approach": {
      "seam": [
        -2.9957956165075306,
        6.001119730993146,
        -2.609744644165039
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
      5.751119730993146,
      6.016119730993146
    ],
    "bodyBand": [
      6.016119730993146,
      7.801119730993146
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
    "seq": 26882,
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
python3 scripts/diagnosis/trace-query.py walkway narrow_passage-2-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/narrow_passage-2-42/legacy.ndjson.gz`. SHA256 `28773d8f70564371d56093ec71f1078198330efc492fb8c9967bbfa51f4ef7c0`; 48,288 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1458 valid sampled nodes; 1737 floor tests |
| Proposals | Returned pass: 200 eligible; 48 attempted. All trace passes: 456 omitted by selection; 0 selected but not attempted |
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
    "support:rejected": 558,
    "support:node": 2916,
    "proposal:legacy-body-sample": 9660,
    "proposal:eligible": 400,
    "proposal:direction-unexecuted": 632,
    "proposal:direction-excluded": 10632,
    "proposal:selected": 96,
    "proposal:omitted": 304,
    "budget:exhausted": 2,
    "proposal:attempt": 96,
    "prescreen:edge-support-probe": 4482,
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
    "support:rejected": 279,
    "support:node": 1458,
    "proposal:legacy-body-sample": 4830,
    "proposal:eligible": 200,
    "proposal:direction-unexecuted": 316,
    "proposal:direction-excluded": 5316,
    "proposal:selected": 48,
    "proposal:omitted": 152,
    "budget:exhausted": 1,
    "proposal:attempt": 48,
    "prescreen:edge-support-probe": 2241,
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
    "seq": 13673,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 88708,
    "triangle": [
      [
        -2.997656464576721,
        0.05565100908279419,
        -2.8062910437583923
      ],
      [
        -2.998460590839386,
        0.08303815126419067,
        -2.8060521483421326
      ],
      [
        -2.9977877140045166,
        0.05529892444610596,
        -2.8304450511932373
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.19650505937108026
      ],
      [
        0.0026649743318554187,
        0.19630750417709342
      ],
      [
        0.002,
        0.2204139281686047
      ]
    ],
    "approach": {
      "seam": [
        -2.9957956165075306,
        6.001119730993146,
        -2.609744644165039
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
    "seq": 13674,
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
    "seq": 13903,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "40:2",
    "triangleId": 391314,
    "triangle": [
      [
        0.7834481298923492,
        5.731842041015625,
        -2.9997410774230957
      ],
      [
        0.7835864424705505,
        5.75658792257309,
        -2.999790072441101
      ],
      [
        0.80701544880867,
        5.731931626796722,
        -2.9997432231903076
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020104324466202776,
        -0.6
      ],
      [
        0.002,
        -0.5947828011366467
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        1.3934697151184086,
        6.004821918289091,
        -2.9977598771452905
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

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 29735,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 89030,
    "triangle": [
      [
        -2.999242901802063,
        5.750524699687958,
        -2.803760826587677
      ],
      [
        -2.9991692304611206,
        5.775462806224823,
        -2.8034679293632507
      ],
      [
        -2.9991012811660767,
        5.775459945201874,
        -2.8263038992881775
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.003445527472458354,
        0.1940091937999259,
        5.751119730993146
      ],
      [
        0.003373613953590038,
        0.19372328519821158,
        5.775462806224823
      ],
      [
        0.0033056646585460925,
        0.21655925512313834,
        5.775459945201874
      ],
      [
        0.0034439057925409315,
        0.1945541291600962,
        5.751119730993146
      ]
    ],
    "approach": {
      "seam": [
        -2.9957956165075306,
        6.001119730993146,
        -2.609744644165039
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
      5.751119730993146,
      6.016119730993146
    ],
    "bodyBand": [
      6.016119730993146,
      7.801119730993146
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
    "seq": 29737,
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
python3 scripts/diagnosis/trace-query.py walkway narrow_passage-2-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
