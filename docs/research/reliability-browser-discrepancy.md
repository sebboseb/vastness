# Reliability study: browser seam discrepancy

Read-only diagnosis, 2026-09-16. The scale-10 and scale-12 `tunnel-1-7` browser failures are reproduced in the actual CPU navigator. The immediate blocker is inconsistent numerical boundary tolerances, made observable by browser-sized movement increments. This evidence does **not** establish a mesh topology defect. No navigation, assessor, saved assessment, source mesh, baseline result or remote worker was changed. The proposed correction below is unimplemented and unvalidated.

## Evidence identity

The reviewed root checkout was `0d5a2b3417c24b1de87c7ccd52934e41e6d2c160`. Source hashes:

| File | SHA-256 |
| --- | --- |
| `apps/web/src/generated-passage/navigation.ts` | `0cafa5e8d7763fc8e011bcc5ea1a831ae7bb90025ecd47ee4c92a54e45c2a39e` |
| `scripts/passage-geometry.ts` | `ee386797faffe7b55dc53c7286a5e7b14ef44c267fcd98dfe09fcbf09a93fd79` |
| `tunnel-1-7/collider.glb`, 13,634,316 bytes | `03ea4b0ea0d52c31609a350bac8362969bde7ee7141a8542bacd3038af67cffe` |

Original retained evidence: [assessment](../../.runtime/reliability/candidates/tunnel-1-7/assessment.json), [scale-10 browser trace](../../.runtime/reliability/candidates/tunnel-1-7/browser/scale10-forward.json), [scale-12 browser trace](../../.runtime/reliability/candidates/tunnel-1-7/browser/scale12-forward.json), and [browser result](../../.runtime/reliability/candidates/tunnel-1-7/browser.json). Runtime evidence remains local; these links require the retained artifacts.

The scale-10 assessment records an accepted 3 m reversible, continuously enclosed route and `approachVerified: true`. Browser telemetry records `support-gap-or-step`, scaffold mode, zero generated travel, no crossing visit and final position `[-1.752294075489044, 1.8959150339320665, 5.299769506067964]`. Its accepted movement samples still have authored support ID `-1`. A persisted browser `errors` counter is not a clean per-case causal signal; the blocked reason and actual navigator reproduction establish this case independently.

## Deterministic reproduction and explanation

The original navigator, original GLB and saved scale-10 transform/approach are sufficient; no renderer, network, GPU or substituted geometry is required. A single `move(recordedBrowserPosition, [0, 0, -0.0125])` fails with the recorded reason. Repeated complete forward replays from saved `approachStart` produce:

| Requested step | Result reaching the saved generated entry |
| --- | --- |
| 0.0125 m | Blocked after 72 successful moves at z = 5.299769506067957 |
| 0.025 m | Blocked after 36 successful moves at the same z |
| 0.029 m | Blocked after 31 successful moves at z = 5.300769506067972 |
| 0.030 m | Reached entry in 61 moves |
| 0.040 m | Reached entry in 46 moves |
| 0.04885040707445729 m | Reached entry in 37 moves |
| 0.050 m | Reached entry in 37 moves |

The assessor requests the entire 1.80746506175492 m seam crossing in one `move` call. Its subdivision into 37 steps gives 0.04885040707445729 m per step. The browser requests `min(distance, dt * 1.5)` each frame, producing approximately 0.0125 m in the captured trace. Both use the same navigation function: `scripts/passage-geometry.ts:75–90`, `apps/web/src/generated-passage/navigation.ts:241–253`, and `apps/web/src/generated-passage/main.ts:116–125`.

Ranked hypotheses were (1) seam boundary-tolerance disagreement, (2) differing support-height selection, and (3) a meaningful support gap missed at the coarser step. Endpoint, interval and step-size probes distinguish them:

1. `floors()` accepts triangle barycentric coordinates down to `-1e-7` (`navigation.ts:155–162`). `makeApproach()` binary-searches this tolerant predicate and uses its last supported point as the seam (`passage-geometry.ts:77–83`). At scale 10 that seam lies approximately **2.9738 nanometres** outside the exact projected generated triangle edge.
2. `continuousSupport()` instead clips barycentric constraints at **zero** (`navigation.ts:214–222`). Its `-1e-9` rejection guard does not shift the clipping boundary. At the failing front footprint probe, triangle **494898** has starting weights `[0.5942296881252513, -9.934526623837211e-8, 0.40577041122001495]`. The 0.0125 m segment's generated-support interval begins at normalized **t = 2.379050671546968e-7**. Multiplying by segment length gives the approximately 2.9738 nm separation.
3. Interval merging accepts only a normalized gap of `1e-7` (`navigation.ts:235–237`). That permits **1.25 nm** for a 0.0125 m step, but **4.885 nm** for the assessor's step. Thus the same tiny separation fails the browser increment and passes the assessor increment. Changing only step size reproduces the predicted transition near 0.029738 m.
4. The authored rectangle has a second endpoint mismatch: point support accepts outward distance down to `-1e-9` (`navigation.ts:166`), but its interval clip uses zero (`navigation.ts:226–233`). In the scale-10 failing step the probe begins approximately 5e-15 m behind the seam, so the authored interval is omitted even though point support still accepts it. This is smaller than the main 2.9738 nm discrepancy; a +0.001 m start offset still fails the small-step crossing, so floating-point phase alone is not the cause.
5. Both endpoint assessments are valid. The 0.0125 m step raises the eye by **0.0004936143907661172 m**, far below the 0.25 m step limit, and continuity is the failed branch. Moving the starting point 1e-8 m inward makes that isolated step pass. This rejects a height-step explanation for this failure; it does not validate the remainder of the route.

Scale 12 independently reproduces the same mechanism at the recorded position `[-2.262752890586853, 1.94710843924768, 6.296464650169956]`. Its front probe meets triangle **488520**, with one starting weight `-9.982048399686591e-8`. Generated support starts at t = `1.9591106928657184e-7`, while authored support ends at t = `7.105427357600901e-13`: approximately **2.4489 nm** between them for a 0.0125 m step. The same interval threshold rejects it.

These nanometre-scale boundary disagreements should be classified as a navigation/assessment consistency failure. The raw generated triangles and floor provenance remain intact. The strict baseline browser failure remains a failure, since that is the predeclared endpoint; retain its distinct cause rather than counting it as model topology damage.

## Proposed bounded correction after the unchanged study

A small candidate patch is to make projected continuity use the **same accepted support domain** as point sampling. Share the current tolerances instead of changing step size or the model:

```ts
// Shared by floors() and continuousSupport(); existing point-support values.
const FLOOR_BARYCENTRIC_EPSILON = 1e-7;
const APPROACH_OUTWARD_EPSILON = 1e-9;

// floors(): w.some(value => value < -FLOOR_BARYCENTRIC_EPSILON)
// floors(): outward >= -APPROACH_OUTWARD_EPSILON

// continuousSupport(): shift only the triangle barycentric constraints.
...wa.map((v, i): Point2 => [
  v + FLOOR_BARYCENTRIC_EPSILON,
  wb[i] + FLOOR_BARYCENTRIC_EPSILON,
])

// continuousSupport(): match the authored outward lower bound as well.
[ca[0] + APPROACH_OUTWARD_EPSILON,
 cb[0] + APPROACH_OUTWARD_EPSILON]
```

This is a reviewable proposal, not an executed fix. It preserves the seam, mesh vertices/indices, triangle IDs, slope limits, body sweeps, enclosure criterion and original-floor provenance. It makes continuous support agree with the tiny extrapolation already allowed by point support. Barycentric epsilon is dimensionless, so its world-space meaning depends on triangle geometry; no claim of a universal fixed nanometre tolerance is warranted. The existing normalized interval-union allowance also remains length-dependent, so a broader mathematical claim of invariance would require a separately reviewed world-space numerical policy. Do not replace `1e-7` with the 1.5 cm body contact tolerance: that would permit physically meaningful gaps.

Validation recipe before accepting the proposal:

- Lock the saved source SHA-256, options, transforms, seam, original generated entry and route. Replay both scale-10 and scale-12 saved cases forward and backward at steps 0.00625, 0.0125, 0.025, 0.03, 0.04 and 0.05 m, with a deterministic mixed-step schedule and small starting phases around the seam. Require the same reachability outcome and final position tolerance. This guards the actual browser call pattern, not merely a single large `move`.
- Require each support sample to remain valid, each generated support ID to reference an unchanged source triangle, and generated-only portions to exclude `-1`. Repeat original body/head obstruction and true-gap tests. Check both endpoint support and swept motion; success through the seam alone is not complete traversal acceptance.
- Add the four-vertex fixture below as a committed red-before/green-after navigation regression. The exact-touch floor must pass every step size; the 3 nm mismatch currently fails small steps and must become invariant; a 1 mm real gap must continue to block every size. Include reverse movement and small translated/rotated fixture variants to prevent dependence on the convenient origin.
- After the unchanged 36-trial baseline finishes, make a separately committed numerical patch, run focused passage tests and the required project checks, then perform a separately labelled browser replay. Retain baseline and corrected results, commits and source hashes side by side. Reuse existing generations and raw floor geometry; do not overwrite baseline evidence or silently promote secondary scales to primary successes.

Minimal fixture exercised during diagnosis (original unmodified navigator):

```ts
const mesh = {
  positions: [-2, 0, -4,  2, 0, -4,  2, 0, 0,  -2, 0, 0],
  indices: [0, 2, 1, 0, 3, 2],
};
// Each seamZ is a separate fixture; all original floor triangles stay fixed.
for (const seamZ of [0, 3e-9, 0.001]) {
  const nav = createSurfaceNavigator(mesh,
    {scale: 1, yaw: 0, position: [0, 0, 0]}, {},
    {seam: [0, 0, seamZ], outward: [0, 0, 1], width: 1.2, length: 2});
  for (const step of [0.00625, 0.0125, 0.025, 0.03, 0.04, 0.05]) {
    const start: Vec3 = [0, 1.65, seamZ + 0.3];
    const result = nav.move(start, [0, 0, -step]);
    // Future regression asserts:
    // seamZ <= 3e-9: !result.blocked; seamZ === 0.001: result.blocked.
  }
}
```

Measured baseline: exact seam passes all six steps; 3 nm seam blocks through 0.03 m and passes 0.04/0.05 m; 1 mm gap blocks all six. The boundary value 0.03 m is rounding-sensitive, so it should not be used as a tolerance definition.

## Strict enclosure is not broad navigability

The [predeclared study](../specs/generated-space-reliability.md) requires **all** of original generated support, 1.8 m body clearance, a reversible ≥3 m route, ≥1 m sustained enclosure, a safe exterior seam, and browser entry/traversal/return at primary scale 6. Open doorway, courtyard and bridge requests retain that enclosure rule. Keep that endpoint unchanged, but name it accurately: it measures an enclosed passage criterion, not every useful generated open route.

[Doorway-1-7's original assessment](../../.runtime/reliability/candidates/doorway-1-7/assessment.json) provides a concrete distinction:

| Scale | Supported grid points | Enclosed grid points | Maximum connected graph displacement | Strict assessment |
| --- | ---: | ---: | ---: | --- |
| 6 | 506 | 22 | 7.353910524340097 m | Failed |
| 10 | 1,836 | 107 | 13.010764773832477 m | Failed |
| 12 | 2,886 | 244 | 15.839191898578667 m | Failed |

The graph links already undergo forward/reverse support and body-clearance movement checks. These values are evidence of extensive generated-supported connected space, despite no selected strict passage route. They do **not** prove browser entry, traversal through the semantic doorway, a safe exterior seam, or complete broad-route success. A freestanding doorway and open generated base may correctly follow intent while failing sustained enclosure; geometry repair is not implied.

The route search first requires ≥1.1 m of enclosure on its coarse candidate path (`passage-geometry.ts:108–115`), then ≥1 m on dense samples (`:135–136`). This conservative search and the 48-entry budget further limit claims about nonexistence. `maximumConnectedDisplacement` is recorded before the enclosure test (`:106–107`); `continuousEnclosedDistance: 0` is computed on an **empty selected route** after failure, so it is not a measured maximum enclosure span over every connected route. Do not turn that zero into a claim that no enclosed segment exists.

Report at least these distinct outcomes without changing the primary denominator: generated support exists; reversible supported graph connectivity reaches ≥3 m; strict sustained enclosure qualifies; exterior seam qualifies; browser entry/traversal/return succeeds. A secondary open-route measurement would need its own retained witness path and browser checks; this diagnosis does not supply those. Model topology failures, conservative search rejection, intended open geometry and browser numerical failures must remain separate causal labels when applying the fallback trigger.

## Runnable saved-mesh reproduction

The following minimal body reproduces the single-step failure and exits 1 while the defect remains. Run with the root checkout's existing `tsx`; set `root` to the retained evidence checkout. It imports the actual navigator without copying or patching it.

```ts
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root = '/Users/seb/Documents/ChatGPT/vastness';
const {createSurfaceNavigator, parsePassageGlb} =
  await import(root + '/apps/web/src/generated-passage/navigation.ts');
const base = root + '/.runtime/reliability/candidates/tunnel-1-7/';
const batch = JSON.parse(readFileSync(base + 'assessment.json', 'utf8'));
const a = batch.attempts.find((value: any) => value.transform.scale === 10);
const data = readFileSync(base + 'collider.glb');
if (createHash('sha256').update(data).digest('hex') !== batch.source.sha256)
  throw new Error('Source changed');
const mesh = parsePassageGlb(
  data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
const nav = createSurfaceNavigator(mesh, a.transform, a.options, a.approach);
const p = JSON.parse(readFileSync(base + 'browser/scale10-forward.json', 'utf8')).position;
const result = nav.move(p, [0, 0, -0.0125]);
console.log({position: result.position, blocked: result.blocked, reason: result.reason});
if (result.blocked) process.exitCode = 1;
```

Command actually run twice, each approximately 0.13–0.15 seconds, exit 1:

```sh
/Users/seb/Documents/ChatGPT/vastness/node_modules/.bin/tsx \
  /Users/seb/Documents/ChatGPT/vastness/.worktrees/reliability-fallback/.runtime/browser-diagnosis/minimal.ts
```

Output: `blocked: true`, `reason: 'support-gap-or-step'`, original recorded position unchanged. The full-approach replay also exits 1, while independently printing successful assessor-sized movement and the small-step failure. The small harnesses are clearly marked ignored diagnosis files in the research worktree; temporary instrumented navigation copies were removed after interval values were captured here. No product fix or corrected browser acceptance is claimed.
