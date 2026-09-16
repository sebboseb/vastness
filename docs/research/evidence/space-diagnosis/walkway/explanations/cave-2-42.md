# cave-2-42: failed

A wide cave passage through rough rock, two visible openings and a smooth level stone floor without boulders or steps.

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
      "cue": "cave"
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/cave-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/cave-2-42/expanded.ndjson.gz`. SHA256 `d2984ad2f0f0eb6609c0cb9140424fcec69365930db809fd15f374f1ebf5edff`; 51,852 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 870 valid sampled nodes; 1757 floor tests |
| Proposals | Returned pass: 360 eligible; 192 attempted. All trace passes: 504 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 168, "support-edge-not-found": 63, "entry-prism-blocked": 324, "source-entry-prism": 324, "body-obstruction": 12}; passed 9 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 5 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 0 candidate events. Returned pass: maximum connected displacement 0.4000m |
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
    "support:rejected": 1772,
    "support:node": 1740,
    "support:duplicate-layer": 2,
    "proposal:eligible": 720,
    "proposal:direction-excluded": 6240,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 336,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 18954,
    "prescreen:projection-start": 342,
    "prescreen:projection-blocked": 168,
    "prescreen:rejected": 336,
    "prescreen:support-edge-not-found": 42,
    "prescreen:body-sample": 246,
    "prescreen:passed": 6,
    "component:entry-search": 6,
    "component:node-visited": 16,
    "edge:tested": 16,
    "component:node-discovered": 10,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 162,
    "prescreen:entry-prism-proof": 171,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 886,
    "support:node": 870,
    "support:duplicate-layer": 1,
    "proposal:eligible": 360,
    "proposal:direction-excluded": 3120,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 168,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9477,
    "prescreen:projection-start": 171,
    "prescreen:entry-prism-blocked": 162,
    "prescreen:entry-prism-proof": 171,
    "prescreen:rejected": 168,
    "prescreen:support-edge-not-found": 21,
    "prescreen:body-sample": 132,
    "prescreen:passed": 3,
    "route:stream-admitted": 3,
    "route:scheduler-start": 1,
    "route:stream-resumed": 3,
    "component:entry-search": 3,
    "component:node-visited": 8,
    "edge:tested": 8,
    "component:node-discovered": 5,
    "route:stream-complete": 3,
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
    "seq": 6862,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 37842,
    "triangle": [
      [
        -2.99712073802948,
        0.008936941623687744,
        -2.8018194437026978
      ],
      [
        -2.9991998076438904,
        0.017843663692474365,
        -2.802477478981018
      ],
      [
        -2.9994449615478516,
        0.017739593982696533,
        -2.8261565566062927
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.028658689558505923,
        0.1934105396270751
      ],
      [
        0.030737759172916324,
        0.19406857490539542
      ],
      [
        0.030982913076877505,
        0.21774765253067008
      ]
    ],
    "approach": {
      "seam": [
        -2.968462048470974,
        3.905746182379654,
        -2.6084089040756226
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
    "seq": 6863,
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
    "seq": 6907,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "869:1",
    "triangleId": 888226,
    "triangle": [
      [
        2.950825273990631,
        0.03763943910598755,
        2.216793715953827
      ],
      [
        2.9551713466644287,
        0.06123429536819458,
        2.215241253376007
      ],
      [
        2.9552485942840576,
        0.06123858690261841,
        2.190694212913513
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.006674514710902635,
        -0.37479737997055107
      ],
      [
        0.011020587384700242,
        -0.3763498425483709
      ],
      [
        0.011097835004329148,
        -0.4008968830108648
      ]
    ],
    "approach": {
      "seam": [
        2.9441507592797285,
        0.02571583690209604,
        2.591591095924378
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
    "seq": 6997,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "20:2",
    "triangleId": 613430,
    "triangle": [
      [
        0.5747886300086975,
        0.003743290901184082,
        -2.9476030468940735
      ],
      [
        0.5739791840314865,
        0.003568410873413086,
        -2.9755266308784485
      ],
      [
        0.5975583046674728,
        0.003673553466796875,
        -2.975552201271057
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.00847883264027409,
        -0.6
      ],
      [
        0.008485540747642517,
        -0.5938142806291582
      ],
      [
        0.002,
        -0.5990979343246582
      ],
      [
        0.002,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        1.191372585296631,
        0.024266326207200158,
        -2.9670666605234146
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
    "seq": 7047,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "455:1",
    "triangleId": 158750,
    "triangle": [
      [
        -2.120607912540436,
        3.4263997972011566,
        -0.20226933807134628
      ],
      [
        -2.110261559486389,
        3.429324209690094,
        -0.2026759386062622
      ],
      [
        -2.1222267150878906,
        3.4274297654628754,
        -0.22271224111318588
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.3941342965121635
      ],
      [
        0.005377650260925293,
        -0.3942670345306398
      ],
      [
        0.002,
        -0.3999230932267755
      ]
    ],
    "approach": {
      "seam": [
        -2.1156392097473145,
        0.027983961952486966,
        0.19159109592437762
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 5.2230288743972775
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
    "seq": 7787,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "853:0",
    "eye": [
      0.9913725852966309,
      1.676586706201203,
      2.591591095924378
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 24019,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 38154,
    "triangle": [
      [
        -2.9882969856262207,
        3.6550440788269043,
        -2.7995342016220093
      ],
      [
        -2.9883227348327637,
        3.678370177745819,
        -2.7996851205825806
      ],
      [
        -2.9883320331573486,
        3.678530752658844,
        -2.821973204612732
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.019835712193089758,
        0.19112984012930043,
        3.655746182379654
      ],
      [
        0.019860686361789615,
        0.19127621650695792,
        3.678370177745819
      ],
      [
        0.019869984686374575,
        0.2135643005371093,
        3.678530752658844
      ],
      [
        0.01983598485558498,
        0.19179608234259424,
        3.655746182379654
      ]
    ],
    "approach": {
      "seam": [
        -2.968462048470974,
        3.905746182379654,
        -2.6084089040756226
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
      3.655746182379654,
      3.9207461823796543
    ],
    "bodyBand": [
      3.9207461823796543,
      5.705746182379654
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
    "seq": 24021,
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
    "seq": 25242,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "7:2",
    "firstFailure": "body-obstruction",
    "triangleId": 330887,
    "triangle": [
      [
        -1.2979649305343628,
        4.080402374267578,
        -2.9963216185569763
      ],
      [
        -1.3211324214935303,
        4.082451045513153,
        -2.9917677640914917
      ],
      [
        -1.2978613078594208,
        4.082421898841858,
        -2.991738438606262
      ]
    ],
    "position": [
      -1.208627414703369,
      3.89894986380053,
      -2.7084089040756227
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
python3 scripts/diagnosis/trace-query.py walkway cave-2-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/walkway/candidates/cave-2-42/legacy.ndjson.gz`. SHA256 `bc871b983ea91c0cccc5baa0f6c1f4b9abde9b736e4acc7ac379161963d7564f`; 24,538 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 870 valid sampled nodes; 1757 floor tests |
| Proposals | Returned pass: 5 eligible; 5 attempted. All trace passes: 0 omitted by selection; 0 selected but not attempted |
| Pre-screen | {}; passed 15 |
| Components | Returned pass: 2 reached-entry discoveries. All passes: 5 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 0 candidate events. Returned pass: maximum connected displacement 0.4000m |
| Topology | {} |
| Final seam | {} |
| Exhausted bounds | [] |

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
    "support:rejected": 1772,
    "support:node": 1740,
    "support:duplicate-layer": 2,
    "proposal:legacy-body-sample": 2898,
    "proposal:direction-excluded": 6920,
    "proposal:eligible": 10,
    "proposal:direction-unexecuted": 30,
    "proposal:selected": 10,
    "proposal:attempt": 10,
    "prescreen:edge-support-probe": 420,
    "prescreen:projection-start": 10,
    "prescreen:body-sample": 380,
    "prescreen:passed": 10,
    "component:entry-search": 10,
    "component:node-visited": 26,
    "edge:tested": 16,
    "component:node-discovered": 16,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-proof": 5,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 1024,
    "support:rejected": 886,
    "support:node": 870,
    "support:duplicate-layer": 1,
    "proposal:legacy-body-sample": 1449,
    "proposal:direction-excluded": 3460,
    "proposal:eligible": 5,
    "proposal:direction-unexecuted": 15,
    "proposal:selected": 5,
    "proposal:attempt": 5,
    "prescreen:edge-support-probe": 210,
    "prescreen:projection-start": 5,
    "prescreen:entry-prism-proof": 5,
    "prescreen:body-sample": 190,
    "prescreen:passed": 5,
    "route:stream-admitted": 5,
    "route:scheduler-start": 1,
    "route:stream-resumed": 5,
    "component:entry-search": 5,
    "component:node-visited": 13,
    "edge:tested": 8,
    "component:node-discovered": 8,
    "route:stream-complete": 5,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py walkway cave-2-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
