# Vastness

A local-first, persistent spatial world prototype. Milestone Zero is a small Scandinavian coastal research station: two authored Gaussian-splat rooms, separate solid collision proxies, a streamed portal, and a saved player position.

**Current content is deterministic fixture geometry, not AI-generated.** Real generation will be introduced through a separate worker API after the walking loop is proven.

## Run on the Mac

Requires Node.js 22.13+ and npm. Tested runtime: Node 22.23.1. The worker's fake mode also uses Python 3.11+.

```sh
npm ci
npm run dev
```

Open [Vastness locally](http://127.0.0.1:5173). Enter the station, use **WASD** to move and the **mouse** to look. **Escape** pauses. If mouse capture is unavailable in an embedded browser, drag to look; walking-assist buttons and arrow-key looking are also available. Walk toward the north doorway to load the observatory, cross it, then turn and return. Both chunks remain loaded. Quit and relaunch with the same command to resume the saved world.

`npm run dev` writes reproducible fixtures if needed and starts the Mac orchestrator on `127.0.0.1:4310` and Vite on `127.0.0.1:5173`. Ctrl+C stops both. Keep these ports available. The browser only talks to the Mac through same-origin proxied HTTP routes.

## Persistence

The SQLite database lives in `.runtime/`, with heavy artifacts in `artifacts/`. These are local runtime data and excluded from Git. Back up **both directories together** while the app is stopped. Accepted artifact hashes and world metadata survive restart; revisits reuse accepted bytes. The authored fixture source lives in Git and can be reproduced with `npm run fixtures`.

## Verify

```sh
npm run fixtures
npm run check
python3 -m unittest discover -s services/gpu-worker -p 'test_*.py'
```

Public movement tests exercise wall blocking, diagonal sliding, doorway clearance and a closed streaming gate. Orchestrator tests use real HTTP requests and reopen SQLite to verify stable worlds, artifact hashes and player state. Browser acceptance and its input-surface limits are recorded in [the validation notes](docs/research/m0-validation.md).

## Project map

| Area | Responsibility |
| --- | --- |
| `apps/web` | PlayCanvas renderer, first-person controls and chunk streaming |
| `services/orchestrator` | Local HTTP API, SQLite and accepted artifacts |
| `services/gpu-worker` | Project-owned HTTP jobs and backend adapters |
| `packages/protocol` | Validated world, artifact and worker contracts |
| `packages/world-model` | Spatial movement and proximity behavior |
| `docs` | Original brief, spec, decisions, research and ticket mirrors |

[GitHub Issues](https://github.com/sebboseb/vastness/issues) is the tracker. `npm run frontier` reports unfinished tickets whose blockers are complete. Independent implementation tickets run in isolated Git worktrees based on the current integration tip; the lead verifies, integrates and updates blockers. See `docs/agents/conductor.md`.

Matt Pocock's project-local workflow skills are installed in `.agents/skills` with provenance in `skills-lock.json`. Setup selected GitHub Issues, default labels and one domain glossary. The requested autonomous policy governs routine workflow approvals.

## GPU appliance

See `docs/worker.md` for the fake-worker contract and deployment procedure, and `docs/research/gpu-connectivity.md` for connection results. Worker deployment must use Git commits. The Mac/browser never requires a shared network folder or a CUDA installation. Initial heavy-job concurrency is one.

Real-world generation, model benchmarks, generated boundary continuity and predictive generation remain later milestones. GPU performance is not claimed until measured on the actual PC.
