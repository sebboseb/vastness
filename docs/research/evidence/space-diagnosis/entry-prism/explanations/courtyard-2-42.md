# courtyard-2-42: failed

A square cloister courtyard with a wide doorway, level tiled floor and empty central space bordered by covered arcades.

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
      "cue": "doorway"
    }
  ],
  "ambiguities": [
    "Multiple positive topology cues are conjunctive: the same supported route must witness each requirement.",
    "Both open-sky and covered requirements occur; they must be witnessed on different route portions."
  ],
  "requirements": {
    "openSky": true,
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/courtyard-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/courtyard-2-42/expanded.ndjson.gz`. SHA256 `893c7cb3780d48d256313ba2eccdbd00deb3b73bdbab119a5d1a2a83584493a5`; 79,514 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 4695 valid sampled nodes; 6510 floor tests |
| Proposals | Returned pass: 1188 eligible; 192 attempted. All trace passes: 1992 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"support-edge-not-found": 124, "source-projection": 130, "entry-prism-blocked": 130, "source-entry-prism": 130}; passed 0 |
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
  "baseline": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2704,
    "support:rejected": 1813,
    "support:node": 4695,
    "support:duplicate-layer": 2,
    "proposal:eligible": 1188,
    "proposal:direction-excluded": 17592,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 996,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9667,
    "prescreen:support-edge-not-found": 62,
    "prescreen:projection-start": 130,
    "prescreen:projection-blocked": 130,
    "prescreen:rejected": 130,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2704,
    "support:rejected": 1813,
    "support:node": 4695,
    "support:duplicate-layer": 2,
    "proposal:eligible": 1188,
    "proposal:direction-excluded": 17592,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 996,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 9667,
    "prescreen:support-edge-not-found": 62,
    "prescreen:projection-start": 130,
    "prescreen:entry-prism-blocked": 130,
    "prescreen:entry-prism-proof": 130,
    "prescreen:rejected": 130,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 29441,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "0:0",
    "eye": [
      -2.8141823291778563,
      8.363155141576163,
      -4.610824203491211
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
    "seq": 29489,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "4671:1",
    "triangleId": 780145,
    "triangle": [
      [
        4.841348826885223,
        4.767904579639435,
        3.9906567335128784
      ],
      [
        4.861170947551727,
        4.811013340950012,
        4.015210866928101
      ],
      [
        4.838413894176483,
        4.808609485626221,
        3.9846551418304443
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.37951673558160576
      ],
      [
        0.0064818754792206335,
        -0.37396492958068883
      ],
      [
        0.002,
        -0.3799827102136581
      ]
    ],
    "approach": {
      "seam": [
        4.854689072072507,
        0.3005764529820478,
        4.389175796508789
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
    "pass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 29490,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "4671:1",
    "firstFailure": "source-projection",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "baseline"
  }
]
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 29532,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "4673:3",
    "triangleId": 87883,
    "triangle": [
      [
        -4.827012121677399,
        2.7391204237937927,
        4.9838244915008545
      ],
      [
        -4.832679927349091,
        2.712910547852516,
        4.980236887931824
      ],
      [
        -4.81297105550766,
        2.7278970927000046,
        4.96331125497818
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.06810833393872982,
        0.6
      ],
      [
        0.06706811338662977,
        0.5987887263298033
      ],
      [
        0.0688377185569254,
        0.6
      ]
    ],
    "approach": {
      "seam": [
        -4.214182329177857,
        6.698632563478928,
        4.89624314159155
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
    "pass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 29806,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "18:2",
    "triangleId": 522547,
    "triangle": [
      [
        1.5852710604667664,
        6.799006760120392,
        -4.9884796142578125
      ],
      [
        1.5486961603164673,
        6.839539706707001,
        -4.98773068189621
      ],
      [
        1.587332934141159,
        6.83955192565918,
        -4.987553060054779
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.07538729728029402,
        -0.6
      ],
      [
        0.07538033127784782,
        -0.5984847366809847
      ],
      [
        0.07606125252650267,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        2.1858176708221437,
        6.699890904017775,
        -4.912172728776931
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 29919,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2252:1",
    "triangleId": 578790,
    "triangle": [
      [
        2.439832091331482,
        0.007369816303253174,
        -0.6046207621693611
      ],
      [
        2.4396273493766785,
        0.007191598415374756,
        -0.6439971923828125
      ],
      [
        2.4787473678588867,
        0.007118284702301025,
        -0.6439396739006042
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.43312198947463676
      ],
      [
        0.006433808803558261,
        -0.433115470409394
      ],
      [
        0.002,
        -0.42863567346236353
      ]
    ],
    "approach": {
      "seam": [
        2.4723135590553285,
        0.2074375288061687,
        -0.21082420349121023
      ],
      "outward": [
        1,
        0,
        0
      ],
      "width": 1.2,
      "length": 2.6366986632347107
    },
    "contactBoundaryTolerance": 0.002,
    "pass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 69180,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "4671:1",
    "triangleId": 780216,
    "triangle": [
      [
        4.833056628704071,
        0.27782291173934937,
        4.008035361766815
      ],
      [
        4.860477447509766,
        0.3059113025665283,
        4.008294641971588
      ],
      [
        4.861291348934174,
        0.299418568611145,
        3.9700621366500854
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0020000000000000018,
        -0.3809169758876172,
        0.30203069744544
      ],
      [
        0.0057883754372589635,
        -0.3808811545372013,
        0.3059113025665283
      ],
      [
        0.0066022768616669225,
        -0.41911365985870397,
        0.299418568611145
      ],
      [
        0.002,
        -0.41292400067691154,
        0.2958984631833746
      ]
    ],
    "approach": {
      "seam": [
        4.854689072072507,
        0.3005764529820478,
        4.389175796508789
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
      0.050576452982047826,
      0.31557645298204784
    ],
    "bodyBand": [
      0.31557645298204784,
      2.1005764529820476
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
    "seq": 69182,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "4671:1",
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
python3 scripts/diagnosis/trace-query.py entry-prism courtyard-2-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/courtyard-2-42/legacy.ndjson.gz`. SHA256 `40d836aac5501b35e75305f1d2f4d79a8a416c3ad605d4e18b65246e732c5ab6`; 360,096 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 4695 valid sampled nodes; 6510 floor tests |
| Proposals | Returned pass: 7 eligible; 7 attempted. All trace passes: 0 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"source-projection": 7, "entry-prism-blocked": 5, "source-entry-prism": 5}; passed 2 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 1616 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 2725 candidate events. Returned pass: maximum connected displacement 10.2000m |
| Topology | {"open-courtyard": 2725} |
| Final seam | {} |
| Exhausted bounds | [] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "open-sky": 125398
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
    "support:rejected": 1813,
    "support:node": 4695,
    "support:duplicate-layer": 2,
    "proposal:direction-excluded": 18759,
    "proposal:legacy-body-sample": 1834,
    "proposal:eligible": 7,
    "proposal:direction-unexecuted": 14,
    "proposal:selected": 7,
    "proposal:attempt": 7,
    "prescreen:edge-support-probe": 329,
    "prescreen:projection-start": 7,
    "prescreen:projection-blocked": 7,
    "prescreen:rejected": 7,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 2704,
    "support:rejected": 1813,
    "support:node": 4695,
    "support:duplicate-layer": 2,
    "proposal:direction-excluded": 18759,
    "proposal:legacy-body-sample": 1834,
    "proposal:eligible": 7,
    "proposal:direction-unexecuted": 14,
    "proposal:selected": 7,
    "proposal:attempt": 7,
    "prescreen:edge-support-probe": 329,
    "prescreen:projection-start": 7,
    "prescreen:entry-prism-proof": 7,
    "prescreen:body-sample": 82,
    "prescreen:passed": 2,
    "component:entry-search": 2,
    "component:node-visited": 3232,
    "edge:tested": 12268,
    "component:node-discovered": 3230,
    "route:candidate": 2725,
    "topology:ray": 20345,
    "topology:node-feature": 1565,
    "topology:node-predicate": 125398,
    "topology:sustained-sample": 125398,
    "topology:sustained-result": 2725,
    "topology:route-rejected": 2725,
    "prescreen:entry-prism-blocked": 5,
    "prescreen:rejected": 5,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:wholly-above-player

```json
[
  {
    "seq": 29892,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2179:1",
    "triangleId": 1685414,
    "triangle": [
      [
        5.006381869316101,
        6.769907176494598,
        -0.810406282544136
      ],
      [
        5.006076693534851,
        6.801895201206207,
        -0.814429521560669
      ],
      [
        5.001293420791626,
        6.798143982887268,
        -0.776558518409729
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0051198378205290496,
        -0.39958207905292564
      ],
      [
        0.0048146620392790496,
        -0.40360531806945854
      ],
      [
        0.002,
        -0.38132056018912547
      ],
      [
        0.002,
        -0.3788292829542832
      ]
    ],
    "approach": {
      "seam": [
        5.001262031495572,
        0.2179449973226331,
        -0.4108242034912104
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
    "pass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 29893,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "2179:1",
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
    "seq": 29994,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2279:1",
    "triangleId": 1684960,
    "triangle": [
      [
        5.000417232513428,
        0.08370012044906616,
        -0.6089349091053009
      ],
      [
        5.000201463699341,
        0.13119518756866455,
        -0.611029863357544
      ],
      [
        5.000345706939697,
        0.1294127106666565,
        -0.5685283616185188
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.00436042696237493,
        -0.3981107056140907
      ],
      [
        0.004144658148288016,
        -0.4002056598663337
      ],
      [
        0.004288901388644462,
        -0.3577041581273086
      ]
    ],
    "approach": {
      "seam": [
        4.996056805551053,
        0.21487494291628947,
        -0.21082420349121023
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
    "pass": "baseline"
  }
]
```

### predicate:open-sky

```json
[
  {
    "seq": 61360,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 2179,
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
    "pass": "entry-prism"
  }
]
```

### topology:open-courtyard

```json
[
  {
    "seq": 61619,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "open-courtyard",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "entry-prism"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 359886,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "2279:1",
    "triangleId": 1684960,
    "triangle": [
      [
        5.000417232513428,
        0.08370012044906616,
        -0.6089349091053009
      ],
      [
        5.000201463699341,
        0.13119518756866455,
        -0.611029863357544
      ],
      [
        5.000345706939697,
        0.1294127106666565,
        -0.5685283616185188
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.00436042696237493,
        -0.3981107056140907,
        0.08370012044906616
      ],
      [
        0.004144658148288016,
        -0.4002056598663337,
        0.13119518756866455
      ],
      [
        0.004288901388644462,
        -0.3577041581273086,
        0.1294127106666565
      ]
    ],
    "approach": {
      "seam": [
        4.996056805551053,
        0.21487494291628947,
        -0.21082420349121023
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
      -0.035125057083710526,
      0.22987494291628946
    ],
    "bodyBand": [
      0.22987494291628946,
      2.0148749429162893
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
    "seq": 359888,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "2279:1",
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
python3 scripts/diagnosis/trace-query.py entry-prism courtyard-2-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
