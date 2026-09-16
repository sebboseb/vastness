# corridor-1-42: failed

A long straight corridor with parallel stone walls, level floor, overhead roof and an open doorway at each end.

Locked scale: 16. Previously unresolved: True.

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
      "cue": "corridor"
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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/corridor-1-42/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/corridor-1-42/expanded.ndjson.gz`. SHA256 `4d8f09f9adfa656b7c7d6bec828d1283f7e02c4f2e329e03e0b34b222c082372`; 1,460,209 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 11170 valid sampled nodes; 23800 floor tests |
| Proposals | Returned pass: 716 eligible; 9 attempted. All trace passes: 1048 omitted by selection; 183 selected but not attempted |
| Pre-screen | {"source-projection": 167, "support-edge-not-found": 24, "entry-prism-blocked": 8, "source-entry-prism": 8}; passed 2 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 11021 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 5154 candidate events. Returned pass: maximum connected displacement 16.3719m |
| Topology | {"enclosed-passage": 2699, "doorway-crossing": 2455} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 163452,
  "left-flank": 217567,
  "right-flank": 337,
  "roof-coverage": 33612
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
    "support:column": 6724,
    "support:rejected": 12630,
    "support:node": 11170,
    "proposal:eligible": 716,
    "proposal:direction-excluded": 43964,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 524,
    "budget:exhausted": 1,
    "proposal:attempt": 192,
    "prescreen:edge-support-probe": 8761,
    "prescreen:projection-start": 168,
    "prescreen:projection-blocked": 167,
    "prescreen:rejected": 167,
    "prescreen:support-edge-not-found": 24,
    "prescreen:body-sample": 38,
    "prescreen:passed": 1,
    "component:entry-search": 1,
    "component:node-visited": 5750,
    "edge:tested": 32816,
    "component:node-discovered": 5749,
    "route:candidate": 2699,
    "topology:ray": 73710,
    "topology:node-feature": 5670,
    "topology:node-predicate": 163452,
    "topology:sustained-sample": 163452,
    "topology:sustained-result": 2699,
    "topology:route-rejected": 2699,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 6724,
    "support:rejected": 12630,
    "support:node": 11170,
    "proposal:eligible": 716,
    "proposal:direction-excluded": 43964,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 524,
    "budget:exhausted": 2,
    "proposal:attempt": 9,
    "prescreen:edge-support-probe": 390,
    "prescreen:projection-start": 9,
    "prescreen:entry-prism-blocked": 8,
    "prescreen:entry-prism-proof": 9,
    "prescreen:rejected": 8,
    "prescreen:body-sample": 40,
    "prescreen:passed": 1,
    "component:entry-search": 1,
    "component:node-visited": 5271,
    "edge:tested": 31308,
    "component:node-discovered": 5270,
    "route:candidate": 2455,
    "topology:ray": 160000,
    "topology:node-feature": 5046,
    "topology:node-predicate": 14730,
    "topology:sustained-sample": 14730,
    "topology:witness": 2455,
    "topology:sustained-result": 2455,
    "topology:aperture-axis": 217904,
    "topology:route-rejected": 2455,
    "topology:ray-not-executed": 341406,
    "topology:aperture-node": 33612,
    "proposal:not-attempted": 183,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 76163,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 31406,
    "triangle": [
      [
        -7.984044075012207,
        0.012969493865966797,
        -7.802427768707275
      ],
      [
        -8.000038146972656,
        0.01659393310546875,
        -7.803823471069336
      ],
      [
        -7.984709739685059,
        0.011260032653808594,
        -7.86923885345459
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.13901799619197774,
        0.384229755401611
      ],
      [
        0.15501206815242696,
        0.3856254577636715
      ],
      [
        0.1396836608648293,
        0.4510408401489254
      ]
    ],
    "approach": {
      "seam": [
        -7.845026078820229,
        10.177695944482705,
        -7.418198013305664
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
    "pass": "baseline"
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 76164,
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
    "seq": 76211,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "11061:1",
    "triangleId": 693072,
    "triangle": [
      [
        7.788199424743652,
        0.01847219467163086,
        7.034107685089111
      ],
      [
        7.789325714111328,
        0.018264293670654297,
        6.968327045440674
      ],
      [
        7.862574577331543,
        0.017958641052246094,
        6.969505786895752
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.41268891457345974
      ],
      [
        0.026403918862342834,
        -0.41229619979858434
      ],
      [
        0.0020000000000000052,
        -0.3910990737825934
      ]
    ],
    "approach": {
      "seam": [
        7.8361706584692,
        0.15749364868223417,
        7.381801986694336
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

### projection:wholly-above-player

```json
[
  {
    "seq": 76354,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "5896:0",
    "triangleId": 15900,
    "triangle": [
      [
        -7.976387023925781,
        8.528273820877075,
        0.2171223759651184
      ],
      [
        -7.984638690948486,
        8.55976939201355,
        0.2182627171278
      ],
      [
        -7.976535797119141,
        8.528865814208984,
        0.1574331670999527
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.1240812063217156,
        0.3646796107292172
      ],
      [
        0.13233287334442068,
        0.3635392695665356
      ],
      [
        0.12422997951507497,
        0.4243688195943829
      ]
    ],
    "approach": {
      "seam": [
        -7.852305817604066,
        1.5164316313886808,
        0.5818019866943356
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
    "pass": "baseline"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 76749,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "10492:2",
    "eye": [
      -7.410958671569825,
      1.837128916632447,
      6.781801986694337
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
    ],
    "pass": "baseline"
  }
]
```

### predicate:opposing-wall-width

```json
[
  {
    "seq": 81143,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 5743,
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
          "minimumWidth": 0.6,
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
    ],
    "pass": "baseline"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 81386,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 538691,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "11143:3",
    "triangleId": 1174536,
    "triangle": [
      [
        2.719775915145874,
        10.10506296157837,
        7.964143753051758
      ],
      [
        2.7178282737731934,
        10.130310535430908,
        7.9651336669921875
      ],
      [
        2.659111499786377,
        10.104764461517334,
        7.963451862335205
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.3292002202302961
      ],
      [
        0.0022100523114190196,
        -0.3287869453430172
      ],
      [
        0.002,
        -0.3214533979873282
      ]
    ],
    "approach": {
      "seam": [
        2.389041328430176,
        10.125889161460837,
        7.9629236146807685
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

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 620496,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "0:0",
    "triangleId": 31724,
    "triangle": [
      [
        -7.998264312744141,
        9.891950130462646,
        -7.78987979888916
      ],
      [
        -7.998088359832764,
        9.962284088134766,
        -7.792898178100586
      ],
      [
        -7.998191833496094,
        9.89391279220581,
        -7.864171504974365
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.15314880940900363,
        0.37321581587988,
        9.927695944482705
      ],
      [
        0.15306228101253438,
        0.3747001647949215,
        9.962284088134766
      ],
      [
        0.15311462698437592,
        0.41075640791531143,
        9.927695944482705
      ]
    ],
    "approach": {
      "seam": [
        -7.845026078820229,
        10.177695944482705,
        -7.418198013305664
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
      9.927695944482705,
      10.192695944482706
    ],
    "bodyBand": [
      10.192695944482706,
      11.977695944482706
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
    "seq": 620498,
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

### predicate:left-flank

```json
[
  {
    "seq": 622853,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 4386,
    "routeIndex": 1,
    "axis": [
      1,
      0,
      0
    ],
    "left": null,
    "right": null,
    "minimumWidth": 0.6,
    "rayMaximum": 3,
    "firstFailure": "left-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "entry-prism"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 623061,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [
      "enclosed-passage"
    ],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "entry-prism"
  }
]
```

### predicate:right-flank

```json
[
  {
    "seq": 656895,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 157,
    "nodeId": 7854,
    "routeIndex": 24,
    "axis": [
      1,
      0,
      0
    ],
    "left": {
      "id": 648655,
      "distance": 2.844470032150228
    },
    "right": null,
    "minimumWidth": 0.6,
    "rayMaximum": 3,
    "firstFailure": "right-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "entry-prism"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 882464,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 936,
    "nodeId": 7651,
    "routeIndex": 49,
    "firstFailure": "roof-coverage",
    "roofCount": 0,
    "required": 9,
    "unexecuted": [
      "flank-rays",
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py entry-prism corridor-1-42 --mode expanded --stage prescreen --limit 20
```

## legacy: failed

Complete trace: `.runtime/space-diagnosis/entry-prism/candidates/corridor-1-42/legacy.ndjson.gz`. SHA256 `34b8f1a0cb4777e95fa76f7bc6a63e4d1bf3931f718851fefc31a34154622ec7`; 1,860,637 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 11170 valid sampled nodes; 23800 floor tests |
| Proposals | Returned pass: 486 eligible; 2 attempted. All trace passes: 876 omitted by selection; 81 selected but not attempted |
| Pre-screen | {"source-projection": 12, "entry-prism-blocked": 1, "source-entry-prism": 1}; passed 2 |
| Components | Returned pass: 1 reached-entry discoveries. All passes: 8877 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 8192 candidate events. Returned pass: maximum connected displacement 15.1327m |
| Topology | {"enclosed-passage": 4096, "doorway-crossing": 4096} |
| Final seam | {} |
| Exhausted bounds | ["entry-proposals", "topology-queries", "candidate-routes"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 209147,
  "left-flank": 303011,
  "right-flank": 8073,
  "roof-coverage": 64915
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
    "support:column": 6724,
    "support:rejected": 12630,
    "support:node": 11170,
    "proposal:legacy-body-sample": 10447,
    "proposal:direction-excluded": 43680,
    "proposal:eligible": 486,
    "proposal:direction-unexecuted": 514,
    "proposal:selected": 48,
    "proposal:omitted": 438,
    "budget:exhausted": 2,
    "proposal:attempt": 13,
    "prescreen:edge-support-probe": 573,
    "prescreen:projection-start": 13,
    "prescreen:projection-blocked": 12,
    "prescreen:rejected": 12,
    "prescreen:body-sample": 38,
    "prescreen:passed": 1,
    "component:entry-search": 1,
    "component:node-visited": 4449,
    "edge:tested": 25803,
    "component:node-discovered": 4520,
    "route:candidate": 4096,
    "topology:ray": 57785,
    "topology:node-feature": 4445,
    "topology:node-predicate": 209147,
    "topology:sustained-sample": 209147,
    "topology:sustained-result": 4096,
    "topology:route-rejected": 4096,
    "route:candidate-not-executed": 1,
    "proposal:not-attempted": 35,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  },
  "entry-prism": {
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 6724,
    "support:rejected": 12630,
    "support:node": 11170,
    "proposal:legacy-body-sample": 10447,
    "proposal:direction-excluded": 43680,
    "proposal:eligible": 486,
    "proposal:direction-unexecuted": 514,
    "proposal:selected": 48,
    "proposal:omitted": 438,
    "budget:exhausted": 3,
    "proposal:attempt": 2,
    "prescreen:edge-support-probe": 90,
    "prescreen:projection-start": 2,
    "prescreen:entry-prism-blocked": 1,
    "prescreen:entry-prism-proof": 2,
    "prescreen:rejected": 1,
    "prescreen:body-sample": 40,
    "prescreen:passed": 1,
    "component:entry-search": 1,
    "component:node-visited": 4428,
    "edge:tested": 26347,
    "component:node-discovered": 4470,
    "route:candidate": 4096,
    "topology:ray": 160000,
    "topology:node-feature": 4352,
    "topology:node-predicate": 24576,
    "topology:sustained-sample": 24576,
    "topology:witness": 4096,
    "topology:sustained-result": 4096,
    "topology:aperture-axis": 311084,
    "topology:route-rejected": 4096,
    "topology:ray-not-executed": 518744,
    "topology:aperture-node": 64915,
    "route:candidate-not-executed": 1,
    "proposal:not-attempted": 46,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 86189,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "17:2",
    "triangleId": 148110,
    "triangle": [
      [
        -6.040740966796875,
        0.010962486267089844,
        -7.861260414123535
      ],
      [
        -6.0413818359375,
        0.010731697082519531,
        -7.911015033721924
      ],
      [
        -5.975866794586182,
        0.010610580444335938,
        -7.85800838470459
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.007093888718690957,
        -0.6
      ],
      [
        0.0019999999999999983,
        -0.5937040666363399
      ],
      [
        0.0019999999999999987,
        -0.6
      ]
    ],
    "approach": {
      "seam": [
        -5.410958671569825,
        1.5179196873734808,
        -7.879306492209435
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
    "seq": 86190,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "17:2",
    "firstFailure": "source-projection",
    "unexecuted": [
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
    "seq": 86534,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "2285:1",
    "triangleId": 701554,
    "triangle": [
      [
        7.799244403839111,
        8.545564413070679,
        -4.7779011726379395
      ],
      [
        7.798266887664795,
        8.54591679573059,
        -4.840672492980957
      ],
      [
        7.874783515930176,
        8.544469118118286,
        -4.77876615524292
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.0020000000000000018,
        -0.3614034124767965
      ],
      [
        0.0030323997139927172,
        -0.3605681419372555
      ],
      [
        0.002,
        -0.36055632014362743
      ]
    ],
    "approach": {
      "seam": [
        7.871751116216183,
        1.5204090662447274,
        -4.418198013305664
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 88495,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 5592,
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
          "minimumWidth": 0.6,
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
    ],
    "pass": "baseline"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 88738,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "doorway-crossing",
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "baseline"
  }
]
```

### prescreen:entry-prism-blocked

```json
[
  {
    "seq": 700616,
    "stage": "prescreen",
    "kind": "entry-prism-blocked",
    "proposalId": "17:2",
    "triangleId": 148152,
    "triangle": [
      [
        -6.023956298828125,
        1.205693244934082,
        -7.905886650085449
      ],
      [
        -6.02117919921875,
        1.2695508003234863,
        -7.913352966308594
      ],
      [
        -5.970045566558838,
        1.268160104751587,
        -7.891196250915527
      ]
    ],
    "clippedPrismCoordinates": [
      [
        0.029617817058687483,
        -0.6,
        1.269272829801846
      ],
      [
        0.011889758706092657,
        -0.5590868949890133,
        1.268160104751587
      ],
      [
        0.011946297921639632,
        -0.5592943822381216,
        1.2679196873734808
      ],
      [
        0.029434323855278288,
        -0.6,
        1.2679196873734808
      ]
    ],
    "approach": {
      "seam": [
        -5.410958671569825,
        1.5179196873734808,
        -7.879306492209435
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
      1.2679196873734808,
      1.5329196873734807
    ],
    "bodyBand": [
      1.5329196873734807,
      3.3179196873734806
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
    "seq": 700618,
    "stage": "prescreen",
    "kind": "rejected",
    "proposalId": "17:2",
    "firstFailure": "source-entry-prism",
    "unexecuted": [
      "body-prescreen",
      "final-seam"
    ],
    "pass": "entry-prism"
  }
]
```

### predicate:left-flank

```json
[
  {
    "seq": 702541,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 39,
    "routeIndex": 1,
    "axis": [
      1,
      0,
      0
    ],
    "left": null,
    "right": null,
    "minimumWidth": 0.6,
    "rayMaximum": 3,
    "firstFailure": "left-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "entry-prism"
  }
]
```

### predicate:right-flank

```json
[
  {
    "seq": 702544,
    "stage": "topology",
    "kind": "aperture-axis",
    "routeId": 1,
    "nodeId": 39,
    "routeIndex": 1,
    "axis": [
      0,
      0,
      1
    ],
    "left": {
      "id": 868301,
      "distance": 2.6067701156855705
    },
    "right": null,
    "minimumWidth": 0.6,
    "rayMaximum": 3,
    "firstFailure": "right-flank",
    "unexecuted": [
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "entry-prism"
  }
]
```

### topology:doorway-crossing

```json
[
  {
    "seq": 702749,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "doorway-crossing",
    "completed": [
      "enclosed-passage"
    ],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "entry-prism"
  }
]
```

### predicate:roof-coverage

```json
[
  {
    "seq": 963257,
    "stage": "topology",
    "kind": "aperture-node",
    "routeId": 1150,
    "nodeId": 3648,
    "routeIndex": 41,
    "firstFailure": "roof-coverage",
    "roofCount": 0,
    "required": 9,
    "unexecuted": [
      "flank-rays",
      "crossing-sides",
      "wider-regions"
    ],
    "pass": "entry-prism"
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py entry-prism corridor-1-42 --mode legacy --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
