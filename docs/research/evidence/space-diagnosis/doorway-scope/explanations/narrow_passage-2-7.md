# narrow_passage-2-7: passed

A tight covered corridor with parallel brick walls, a level empty walkway and enough width and headroom for one person.

Locked scale: 6. Previously unresolved: False.

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

Modifier-scope warnings: 0. Exact normalized spans and every compiler decision are in `../candidates/narrow_passage-2-7/intent-trace.json`. Warnings are hypotheses, not automatic corrections.

## expanded: passed

Complete trace: `.runtime/space-diagnosis/doorway-scope/candidates/narrow_passage-2-7/expanded.ndjson.gz`. SHA256 `5b6b049f40e67321a803eaeeab4e3d9e7e1924946f95bb69fca49399ee14c3c7`; 41,626 contiguous events.

Returned assessment metrics describe its final selected pass. Trace event totals below accumulate every recorded pass; these are explicitly separate quantities.

| Stage | Observed outcome |
|---|---|
| Generated support | 1194 valid sampled nodes; 1701 floor tests |
| Proposals | Returned pass: 308 eligible; 80 attempted. All trace passes: 116 omitted by selection; 112 selected but not attempted |
| Pre-screen | {"source-projection": 50, "support-edge-not-found": 20}; passed 10 |
| Components | Returned pass: 4 reached-entry discoveries. All passes: 819 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | All passes: 294 candidate events. Returned pass: maximum connected displacement 5.5570m |
| Topology | {"enclosed-passage": 291} |
| Final seam | {"swept-forward:support-gap-or-step": 2, "swept-reverse:support-gap-or-step": 2, "swept-forward:passed": 1, "swept-reverse:passed": 1} |
| Exhausted bounds | ["entry-proposals"] |

First-failure predicate observations (later short-circuited checks remain untested):

```json
{
  "opposing-wall-width": 7273
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
  "predecessor": {
    "result:coverage-pass-start": 1,
    "result:entry-pass-start": 1,
    "result:assessment-start": 1,
    "support:grid": 1,
    "support:column": 960,
    "support:rejected": 507,
    "support:node": 1194,
    "proposal:eligible": 308,
    "proposal:direction-excluded": 4468,
    "proposal:rank-selection": 192,
    "proposal:selected": 192,
    "proposal:omitted": 116,
    "budget:exhausted": 1,
    "proposal:attempt": 80,
    "prescreen:edge-support-probe": 3931,
    "prescreen:projection-start": 60,
    "prescreen:projection-blocked": 50,
    "prescreen:rejected": 50,
    "prescreen:body-sample": 397,
    "prescreen:passed": 10,
    "component:entry-search": 10,
    "component:node-visited": 2128,
    "edge:tested": 3626,
    "component:node-discovered": 2173,
    "route:candidate": 294,
    "topology:ray": 5057,
    "topology:node-feature": 389,
    "topology:node-predicate": 7309,
    "topology:sustained-sample": 7309,
    "topology:sustained-result": 297,
    "topology:route-rejected": 291,
    "prescreen:support-edge-not-found": 20,
    "topology:witness": 6,
    "topology:route-qualified": 3,
    "seam:swept-forward": 3,
    "seam:swept-reverse": 3,
    "route:seam-rejected": 2,
    "route:accepted": 1,
    "proposal:not-attempted": 112,
    "support:accepted-dense-sample": 68,
    "result:assessment-complete": 1,
    "result:entry-pass-complete": 1,
    "result:coverage-pass-complete": 1
  }
}
```

### projection:wholly-below-support-band

```json
[
  {
    "seq": 7987,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "0:0",
    "triangleId": 66192,
    "triangle": [
      [
        -2.8008286356925964,
        2.3520081639289856,
        -2.8208606243133545
      ],
      [
        -2.8011685609817505,
        2.370989128947258,
        -2.820258915424347
      ],
      [
        -2.8021520376205444,
        2.345525622367859,
        -2.823599338531494
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.21456304919870126
      ],
      [
        0.0023336023092266345,
        0.21397253274917594
      ],
      [
        0.00331707894802058,
        0.21731295585632315
      ],
      [
        0.002,
        0.21458732672946418
      ]
    ],
    "approach": {
      "seam": [
        -2.798834958672524,
        3.9043784975392573,
        -2.606286382675171
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
    "seq": 7988,
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
    "seq": 8037,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1191:1",
    "triangleId": 500910,
    "triangle": [
      [
        2.460379958152771,
        0.021498441696166992,
        2.2173736095428467
      ],
      [
        2.4604573845863342,
        0.02157461643218994,
        2.1908469200134277
      ],
      [
        2.4753148555755615,
        0.016817808151245117,
        2.218849539756775
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        -0.3913711047502134
      ],
      [
        0.010758204758166467,
        -0.37486407756805473
      ],
      [
        0.002,
        -0.3757296006885967
      ]
    ],
    "approach": {
      "seam": [
        2.464556650817395,
        0.028634816080508163,
        2.5937136173248296
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

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 8084,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "1154:3",
    "triangleId": 790950,
    "triangle": [
      [
        -2.1906269788742065,
        3.890795588493347,
        2.996718406677246
      ],
      [
        -2.1919959783554077,
        3.8962098956108093,
        3.0017402172088623
      ],
      [
        -2.2147486209869385,
        3.890570282936096,
        2.996622383594513
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.002,
        0.5790247293983565
      ],
      [
        0.002795261144637351,
        0.5792415261268617
      ],
      [
        0.002,
        0.5827770636191207
      ]
    ],
    "approach": {
      "seam": [
        -1.612754452228546,
        3.8934063186594132,
        2.998944956064225
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

### predicate:opposing-wall-width

```json
[
  {
    "seq": 9020,
    "stage": "topology",
    "kind": "node-predicate",
    "routeId": 1,
    "nodeId": 1186,
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 9279,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 22181,
    "stage": "prescreen",
    "kind": "support-edge-not-found",
    "proposalId": "763:2",
    "eye": [
      -0.012754452228545876,
      5.523454252669632,
      0.7937136173248294
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
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### seam:support-gap-or-step

```json
[
  {
    "seq": 29623,
    "stage": "seam",
    "kind": "swept-forward",
    "proposalId": "1179:3",
    "routeId": 182,
    "from": [
      0.787245547771454,
      1.673888700259488,
      4.199812643229962
    ],
    "target": [
      0.787245547771454,
      1.6792591232857144,
      2.5937136173248296
    ],
    "movement": {
      "position": [
        0.787245547771454,
        1.678279206580617,
        3.226419294196547
      ],
      "blocked": true,
      "reason": "support-gap-or-step",
      "support": {
        "valid": true,
        "eye": [
          0.787245547771454,
          1.678279206580617,
          3.226419294196547
        ],
        "foot": [
          0.787245547771454,
          0.028279206580616924,
          3.226419294196547
        ],
        "supportTriangleIds": [
          -1,
          997393
        ],
        "supportSamples": [
          {
            "position": [
              0.787245547771454,
              0.023888700259488152,
              3.226419294196547
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              1.087245547771454,
              0.023888700259488152,
              3.226419294196547
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.9993775821274182,
              0.023888700259488152,
              3.4385513285525113
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.787245547771454,
              0.023888700259488152,
              3.526419294196547
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.5751135134154897,
              0.023888700259488152,
              3.4385513285525113
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.48724554777145396,
              0.023888700259488152,
              3.226419294196547
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.5751135134154897,
              0.023888700259488152,
              3.0142872598405828
            ],
            "triangleId": -1,
            "normalY": 1
          },
          {
            "position": [
              0.787245547771454,
              0.028279206580616924,
              2.9264192941965472
            ],
            "triangleId": 997393,
            "normalY": 0.9997082948684692
          },
          {
            "position": [
              0.9993775821274181,
              0.023888700259488152,
              3.0142872598405828
            ],
            "triangleId": -1,
            "normalY": 1
          }
        ],
        "headClearance": 1.8,
        "reason": null,
        "blockedTriangleId": null
      }
    },
    "endpointDistance": 0.6327056768717174,
    "endpointTolerance": 1e-06,
    "pass": "predecessor",
    "predecessorPass": "baseline"
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 31086,
    "stage": "prescreen",
    "kind": "projection-blocked",
    "proposalId": "968:0",
    "triangleId": 80,
    "triangle": [
      [
        -2.8102360367774963,
        3.8887529969215393,
        1.2515358924865723
      ],
      [
        -2.810472071170807,
        3.89140123128891,
        1.2516388893127441
      ],
      [
        -2.8097087144851685,
        3.8817243576049805,
        1.2320002913475037
      ]
    ],
    "clippedApproachCoordinates": [
      [
        0.3668090105056758,
        0.5421777248382575
      ],
      [
        0.3670450448989864,
        0.5420747280120857
      ],
      [
        0.36628168821334794,
        0.5617133259773261
      ]
    ],
    "approach": {
      "seam": [
        -2.4434270262718205,
        0.0315218462402192,
        1.7937136173248298
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

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py doorway-scope narrow_passage-2-7 --mode expanded --stage prescreen --limit 20
```

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
