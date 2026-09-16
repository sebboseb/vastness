# large_open_interior-2-42: failed

A vast open warehouse interior, tall roof and large doorway, empty flat concrete floor with no furniture or central obstacles.

Locked scale: 16. Previously unresolved: True.

## Intent compilation

```json
{
  "version": 1,
  "supported": true,
  "required": [
    "doorway-crossing",
    "broad-covered-interior"
  ],
  "evidence": [
    {
      "kind": "doorway-crossing",
      "source": "text",
      "cue": "doorway"
    },
    {
      "kind": "broad-covered-interior",
      "source": "text",
      "cue": "warehouse"
    },
    {
      "kind": "broad-covered-interior",
      "source": "text",
      "cue": "interior"
    }
  ],
  "ambiguities": [
    "Multiple positive topology cues are conjunctive: the same supported route must witness each requirement.",
    "Alternative topology wording is not resolved by this lexical compiler; conservative conjunction retained."
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

Modifier-scope warnings: 1. Exact normalized spans and every compiler decision are in `../candidates/large_open_interior-2-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/large_open_interior-2-42/expanded.ndjson.gz`. SHA256 `5287e4642af80013467f6a42e528f54ecc17935f343d9f3f16c1a4f0807bd2b2`; 327,028 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 16884 valid sampled nodes; 24083 floor tests |
| Proposals | Returned pass: 966 eligible; 192 attempted. All trace passes: 2322 omitted by selection; 0 selected but not attempted |
| Pre-screen | {"support-edge-not-found": 48, "source-projection": 176, "entry-prism-blocked": 350, "source-entry-prism": 350, "exterior-approach-limit": 2}; passed 0 |
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
    "support:column": 13448,
    "support:rejected": 14398,
    "support:node": 33768,
    "proposal:eligible": 1932,
    "proposal:direction-excluded": 133140,
    "proposal:rank-selection": 384,
    "proposal:selected": 384,
    "proposal:omitted": 1548,
    "budget:exhausted": 2,
    "proposal:attempt": 384,
    "prescreen:edge-support-probe": 17298,
    "prescreen:support-edge-not-found": 32,
    "prescreen:projection-start": 351,
    "prescreen:projection-blocked": 176,
    "prescreen:rejected": 351,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "prescreen:entry-prism-blocked": 175,
    "prescreen:entry-prism-proof": 175,
    "prescreen:exterior-approach-limit": 1,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 6724,
    "support:rejected": 7199,
    "support:node": 16884,
    "proposal:eligible": 966,
    "proposal:direction-excluded": 66570,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 774,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 8649,
    "prescreen:support-edge-not-found": 16,
    "prescreen:projection-start": 175,
    "prescreen:entry-prism-blocked": 175,
    "prescreen:entry-prism-proof": 175,
    "prescreen:rejected": 175,
    "prescreen:exterior-approach-limit": 1,
    "route:scheduler-start": 1,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 99569,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "0:0",
    "eye": [
      -5.213744354248046,
      12.434147103688936,
      -7.620225524902343
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

### projection:below-feet-within-support-band

```json
[
  {
    "seq": 99615,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "16808:1",
    "triangleId": 811758,
    "triangle": [
      [
        7.735641956329346,
        0.10542011260986328,
        7.03848934173584
      ],
      [
        7.735918998718262,
        0.10525846481323242,
        6.972538948059082
      ],
      [
        7.809356689453125,
        0.10180997848510742,
        7.040745258331299
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.35653765797960546
      ],
      [
        0.020851327478885295,
        -0.3390292167663578
      ],
      [
        0.0020000000000000018,
        -0.3396061302367578
      ]
    ],
    "approach": {
      "seam": [
        7.78850536197424,
        0.17225542270738137,
        7.379774475097657
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
    "seq": 99616,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "16808:1",
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
    "seq": 99659,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "16809:3",
    "triangleId": 0,
    "triangle": [
      [
        -7.9212727546691895,
        0.7021632194519043,
        7.9679436683654785
      ],
      [
        -7.924078464508057,
        0.7397079467773438,
        7.9697265625
      ],
      [
        -7.91802453994751,
        0.6764936447143555,
        7.930805206298828
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.05615623891353483,
        0.5075284004211422
      ],
      [
        0.05793913304805631,
        0.5103341102600094
      ],
      [
        0.019017776846884438,
        0.5042801856994625
      ]
    ],
    "approach": {
      "seam": [
        -7.413744354248047,
        10.736224246338804,
        7.911787429451944
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 99755,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "8313:0",
    "triangleId": 45012,
    "triangle": [
      [
        -7.913849830627441,
        0.8951678276062012,
        -0.3993991017341614
      ],
      [
        -7.918703079223633,
        0.9396634101867676,
        -0.4004376530647278
      ],
      [
        -7.9138593673706055,
        0.8950190544128418,
        -0.46120765805244446
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.27103447169065475,
        0.3791735768318176
      ],
      [
        0.27588772028684616,
        0.38021212816238403
      ],
      [
        0.2710440084338188,
        0.4409821331501007
      ]
    ],
    "approach": {
      "seam": [
        -7.642815358936787,
        0.1742077145476426,
        -0.02022552490234375
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

### projection:wholly-above-player

```json
[
  {
    "seq": 100132,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "16154:0",
    "triangleId": 7163,
    "triangle": [
      [
        -7.998438835144043,
        5.1824780106544495,
        6.57977819442749
      ],
      [
        -7.997440814971924,
        5.245085448026657,
        6.629489421844482
      ],
      [
        -7.9980788230896,
        5.248332232236862,
        6.5794901847839355
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.2618194743990898,
        0.399996280670166
      ],
      [
        0.2608214542269707,
        0.35028505325317383
      ],
      [
        0.26145946234464645,
        0.4002842903137207
      ]
    ],
    "approach": {
      "seam": [
        -7.736619360744953,
        0.1491523105799067,
        6.979774475097656
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
    "seq": 208507,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "16808:1",
    "triangleId": 811758,
    "triangle": [
      [
        7.735641956329346,
        0.10542011260986328,
        7.03848934173584
      ],
      [
        7.735918998718262,
        0.10525846481323242,
        6.972538948059082
      ],
      [
        7.809356689453125,
        0.10180997848510742,
        7.040745258331299
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.0020000000000000018,
        -0.35653765797960546,
        0.10269519892746375
      ],
      [
        0.020851327478885295,
        -0.3390292167663578,
        0.10180997848510742
      ],
      [
        0.0020000000000000018,
        -0.3396061302367578,
        0.102733210758284
      ]
    ],
    "approach": {
      "seam": [
        7.78850536197424,
        0.17225542270738137,
        7.379774475097657
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
      -0.07774457729261863,
      0.18725542270738138
    ],
    "bodyBand": [
      0.18725542270738138,
      1.9722554227073814
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
    "seq": 208509,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "16808:1",
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

### prescreen:exterior-approach-limit

```json
[
  {
    "seq": 209756,
    "stage": "prescreen",
    "kind": "exterior-approach-limit",
    "proposalId": "386:0",
    "seam": [
      5.4149780720472345,
      5.5529108709677235,
      -7.220225524902344
    ],
    "distanceToBounds": 13.42872242629528,
    "startDistance": 13.82872242629528,
    "requiredLength": 14.128722426295282,
    "maximumLength": 10,
    "unexecuted": [
      "projection",
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
python3 scripts/diagnosis/trace-query.py doorway-scope large_open_interior-2-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/large_open_interior-2-42/legacy.ndjson.gz`. SHA256 `1edddf149f66cf66ef50c7edebd7e9d4839b6136f74fd27bbc06f872e2ee4de5`; 307,047 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 16884 valid sampled nodes; 24083 floor tests |
| Proposals | Returned pass: 0 eligible; 0 attempted. All trace passes: 0 omitted by selection; 0 selected but not attempted |
| Pre-screen | {}; passed 0 |
| Components | Returned pass: 0 reached-entry discoveries. All passes: 0 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 0 candidate events. Returned pass: maximum connected displacement 0.0000m |
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
    "support:column": 13448,
    "support:rejected": 14398,
    "support:node": 33768,
    "proposal:direction-excluded": 135072,
    "proposal:legacy-body-sample": 7998,
    "result:assessment-complete": 2,
    "result:entry-pass-complete": 2,
    "result:coverage-pass-complete": 1
  },
  "coverage-round-robin": {
    "result:coverage-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 6724,
    "support:rejected": 7199,
    "support:node": 16884,
    "proposal:direction-excluded": 67536,
    "proposal:legacy-body-sample": 3999,
    "route:scheduler-start": 1,
    "route:scheduler-complete": 1,
    "result:assessment-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope large_open_interior-2-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
