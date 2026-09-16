# Synthetic-frozen criteria and route method

This module is frozen using synthetic geometry before any frozen-cohort artifact or outcome is read. It imports no dataset, category, identifier, prior verdict or scale selector. All geometry is unchanged. `deriveSpatialCriteria(rawIntent, semantics?)` uses text and, only as fallback, the documented `concept` and `axes.openness` fields. `assessInterpretedSpace({mesh, transform, criteria, searchMode})` returns `InterpretedSpaceAssessment`, extending `PassageAssessment`; existing renderer/browser fields remain available.

## Interpretation and witnesses

Positive lexical topology cues are conjunctive. Local `no/not/without/avoid` exclusions cannot be resurrected by semantic fallback. Unsupported concepts fail with an ambiguity rather than accepting generic scenery. Alternatives, multiple cues and conflicting open/covered requirements are recorded. This is an explicit bounded lexical interpretation, not general language understanding; long-distance negation and relational descriptions are unresolved. Inferred cover for tunnel/cave/cavern/chamber is suppressed by explicit open-sky wording. Every positive requirement must be witnessed on the same route; different portions can witness covered and open areas.

Physical defaults are fixed: radius .3m, height1.8m, eye1.65m, step.25m, slope35°, sample step.05m. Every graph edge passes the unchanged corrected original-triangle navigator in both directions. Accepted routes have at least3m endpoint displacement (floating-point comparison tolerance1e-7m). Dense samples independently verify support/body clearance and retain source triangle IDs. No accepted route contact uses authored support.

Operational topology witnesses retain route vertex indices, source support IDs, structural ray-hit triangle IDs, and quantitative measurements:

- **Enclosed passage:** at least1m continuous route with opposing torso-height source walls within12m. A roof covering the nine body footprint probes is additionally required when cover is stated or inferred. A generic explicitly open walled passage can pass without a roof. Wide/broad wording adds eight reversible1.2m radial moves from witness centers, preventing longitudinal room length from masquerading as usable width.
- **Open courtyard:** at least1m continuous route with no roof above any body probe, at least three cardinal source-wall boundaries within12m, and an open broad region. Foot height must be within.75m of the source minimum, conservatively excluding rooftops and also some valid elevated courtyards.
- **Doorway crossing:** an actual roof/lintel over all body probes, opposing torso-height flanks each within3m, and route samples at least.8m before and after an aperture plane on opposite sides. Both sides must expand laterally by at least.5m or lose a flank. Simply walking alongside an arch does not qualify. Maximum witnessed aperture width is6m. Orthogonal axes can miss oblique or irregular apertures.
- **Elevated bridge:** at least3m continuous longitudinal displacement on a deck at least.75m above source minimum, with unsupported transverse edges within2.5m on both sides. Rays.6m below the deck must not encounter enclosing lateral walls; a downward ray from.55m to.75m below must remain clear. This excludes the base and ordinary building roofs. A covered bridge is allowed. Detached thin roofs can be geometrically indistinguishable from bridge decks, and piers/diagonal geometry may cause conservative misses. The source bounds minimum is an operational elevation reference, not a known ground plane.
- **Broad covered interior:** at least1m continuous route beneath a roof over the body probes, at least two real cardinal side boundaries, and broad supported covered space. Broad regions use eight reversible radial movements of1.2m (or half declared width, if greater), plus roof/open-sky checks at those endpoints. Thus the2.4m diameter describes supported body-center paths and includes extra body-radius margin; it is conservative rather than an exact room-width estimator. A thin roof strip over a large floor does not suffice.

Roof ray height extends to the mesh's actual upper bound; roofs above6m can witness tall interiors. Compatibility `samples[].enclosure` retains the unchanged navigator's old6m limit on dense samples, while `topologyWitnesses` is authoritative for intent acceptance. `enclosurePoints` counts only queried witness nodes, not every supported node. Topology query exhaustion fails all candidate witnesses closed; missing rays after exhaustion cannot imply sky or void.

## Entry, support and search bounds

Grid pitch is.2m; support considers every upward layer subject to declared caps. Legacy proposals use the prior global-AABB proximity rule, direction order(-X,+X,-Z,+Z), raster-order spread and48-entry cap. Expanded proposals use local support boundaries at every layer and deterministic farthest-point spreading in XYZ, up to192 proposals. This finds recessed and L-shaped entrances and distributes search across components/layers. Each entry starts a BFS using cached reversible movement edges; reached nodes identify whether a newly attempted entry explores previously unseen support. `componentsExplored` is this reached-entry count, not exhaustive graph decomposition. Routes are tested beyond3m displacement; expanded mode tests alternate checkerboard endpoints. The search still follows shortest BFS predecessors and is incomplete for routes requiring a longer detour to obtain a witness.

For both modes, find the actual original-support edge by binary search, and require the full1.2m-wide outward corridor to be disjoint from every source triangle's XZ projection until it extends beyond global bounds. Projected triangles are clipped exactly against the corridor;2mm outward contact-boundary tolerance does not provide an interior floor. The authored approach itself is only2m long. This rejects internal holes even when they are wider than the approach, rejects walls/roofs over scaffold, and permits externally connected recesses. It can conservatively reject exteriors behind detached fragments or approaches requiring a curved exterior path. A separate original-navigator build verifies entry and return using the approach. Seam-side reversals are reported in `routeCrossesBehindSeam` for browser gate handling.

The safety checks are common to both modes. Therefore the legacy-criteria ablation preserves old *proposal/search style*, not byte-identical old acceptance: approach footprint exclusion is strengthened, candidate/ray caps differ, and criteria legitimately require different routes. Do not attribute the entire difference from the original strict assessor to semantics alone.

Deterministic operation caps are recorded in every assessment:

| Resource | Cap |
|---|---:|
| Grid cells / supported nodes |20,000 each|
| Layers per column |32|
| Legacy / expanded entries |48 /192|
| Cached tested edges |80,000|
| Candidate routes |4,096|
| Topology rays |160,000|
| Final approach navigator builds |8|
| Additional topology CSR index references |24,000,000|

The existing navigator separately enforces its mesh/extent/index bounds. The witness index uses compact typed arrays and.2m XZ CSR buckets; no per-source-triangle JS object graph is retained. Failed bounded search is not proof of irreparable generation. Exhausted caps are explicitly reported. Candidate checks stop when query budgets are exhausted; input/index-bound violations throw explicit errors for the caller to preserve as failures.

## Synthetic verification

Run `npx tsx --test scripts/interpretation/criteria.test.ts scripts/interpretation/routes.test.ts`. Tests cover sealed boxes, real gaps/disconnected floors, opening crossing versus a usable bypass, elevated bridge versus base/ordinary roof, a covered bridge, an open walled passage, courtyard versus rooftop, tall broad interior versus thin canopy, explicit width versus longitudinal length, recessed/L-shaped entry, an8×8m internal hole inside a12×12m sealed ring, unchanged input geometry, original support IDs, and complete outward/return movement replay.

A larger deterministic mesh is opt-in: `INTERPRETATION_LARGE_SYNTHETIC=1 npx tsx --test scripts/interpretation/routes.test.ts`. Its1,999,400-triangle tessellated room passed in16.43seconds on the local Mac (index/build.225seconds,409 tested edges,78 topology rays,one final approach rebuild). This is a synthetic feasibility measurement, not a worst-case runtime bound; real thin/layered geometry and unsuccessful searches can take longer. No cohort evaluation was performed while choosing these rules.
