# Paired baseline and numerical replay comparison

All 36 candidates and 108 declared scale trials are complete. Source geometry and renderer colors are unchanged; no new GPU jobs were run.

| Outcome | Baseline | Replay |
| --- | ---: | ---: |
| Primary full pipeline | 5/36 | 12/36 |
| Any declared scale full pipeline | 11/36 | 25/36 |
| Primary geometry | 12/36 | 12/36 |
| Any declared scale geometry | 24/36 | 25/36 |

35 previous browser failures passed in replay: 32 on identical saved assessment routes and 3 on changed routes. Including the entry/approach geometry, 32 had an identical complete movement path and 3 had a changed path.

5 additional scale trials became geometry eligible; 5 passed actual browser entry, traversal and return.

| Category | Baseline primary | Replay primary | Baseline any scale | Replay any scale |
| --- | ---: | ---: | ---: | ---: |
| large_open_interior | 0/4 | 0/4 | 2/4 | 3/4 |
| tunnel | 0/4 | 1/4 | 0/4 | 2/4 |
| doorway | 1/4 | 2/4 | 2/4 | 2/4 |
| narrow_passage | 1/4 | 2/4 | 1/4 | 2/4 |
| chamber | 0/4 | 1/4 | 0/4 | 1/4 |
| cave | 1/4 | 1/4 | 1/4 | 4/4 |
| corridor | 0/4 | 3/4 | 2/4 | 4/4 |
| courtyard | 2/4 | 2/4 | 2/4 | 4/4 |
| bridge | 0/4 | 0/4 | 1/4 | 3/4 |

Support and enclosure thresholds remain unchanged: 0.3m body radius, 1.8m height, 0.25m maximum step, 35° maximum slope, 0.015m contact tolerance, at least 3m endpoint displacement, at least 1m contiguous enclosure, and at least 3m actual browser generated travel. Each saved assessment retains the same transform and navigation options.

Route lengths describe accepted paths; a zero route length on a rejected assessment does not mean absent source floor.

| Accepted browser paths | Route length range | Endpoint displacement range | Contiguous enclosure range |
| --- | ---: | ---: | ---: |
| baseline | 3.000–6.400m | 3.000–4.808m | 1.200–3.200m |
| replay | 3.000–9.800m | 3.000–8.200m | 1.200–4.000m |

Seed-pair consistency counts appear in the JSON, with every category/prompt pair retained. Browser schedules were not held identical; these paired results combine numerical movement changes and any changed route selection, rather than isolating one cause.
