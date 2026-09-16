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

Complete trace: `.runtime/space-diagnosis/baseline/candidates/narrow_passage-2-7/expanded.ndjson.gz`. SHA256 `596ae4040634813f6e938bac59c68a95345af5ed238c693fbef76a291abed24c`; 41,623 contiguous events.

| Stage | Observed outcome |
|---|---|
| Generated support | 1194 valid sampled nodes; 1701 floor tests |
| Proposals | 308 eligible; 80 attempted; 116 omitted by selection; 112 selected but not attempted |
| Pre-screen | {"source-projection": 50, "support-edge-not-found": 20}; passed 10 |
| Components | 4 reached-entry discoveries, 819 distinct visited nodes; not exhaustive mesh decomposition |
| Routes | 294 candidates; maximum connected displacement 5.5570m |
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

### projection:wholly-below-support-band

```json
[
  {
    "seq": 7985,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### prescreen:source-projection

```json
[
  {
    "seq": 7986,
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
    "seq": 8035,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### projection:intersects-or-straddles-height-band

```json
[
  {
    "seq": 8082,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

### predicate:opposing-wall-width

```json
[
  {
    "seq": 9018,
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
    ]
  }
]
```

### topology:enclosed-passage

```json
[
  {
    "seq": 9277,
    "stage": "topology",
    "kind": "route-rejected",
    "routeId": 1,
    "firstFailingTopology": "enclosed-passage",
    "completed": [],
    "unexecutedRequirements": [
      "explicit-cover"
    ],
    "observationsAreFirstFailureNotExhaustive": true
  }
]
```

### prescreen:support-edge-not-found

```json
[
  {
    "seq": 22179,
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
    ]
  }
]
```

### seam:support-gap-or-step

```json
[
  {
    "seq": 29621,
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
    "endpointTolerance": 1e-06
  }
]
```

### projection:wholly-above-player

```json
[
  {
    "seq": 31084,
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
    "contactBoundaryTolerance": 0.002
  }
]
```

Read any stage or proposal from the full trace:

```sh
python3 scripts/diagnosis/trace-query.py baseline narrow_passage-2-7 --mode expanded --stage prescreen --limit 20
```

Historical assessment parity: `True`. Only timing/harness provenance was excluded from comparison.

A stage with zero events was not reached or was short-circuited. It does not establish that its geometry predicate would fail. All original source artifacts remain unchanged.
