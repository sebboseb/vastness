# Autonomous AI World Builder

## Mission

Build a local-first prototype of an AI-generated, persistent, navigable 3D world.

The user should eventually be able to enter a text prompt such as:

```text
An abandoned Scandinavian coastal research facility during a snowstorm
```

and receive a real spatial environment that can be explored with WASD and mouse.

This is not a steerable video project. The world must have an explicit spatial representation that exists independently of the camera. Turning around, revisiting an area, colliding with walls, crossing between generated regions and returning to earlier regions must all behave like a real environment.

The long-term experience is an apparently unbounded world that grows ahead of the player. Generation may be asynchronous and chunked. It does not need to generate geometry at gameplay frame rate.

The project should aggressively use existing models and open-source reconstruction systems rather than attempting to train a foundation world model.

## Hardware topology

Use both available machines, but give them different responsibilities.

The primary development and orchestration machine is a MacBook M5 Max with 36 GB unified memory. Run the lead coding agent, repository, issue tracker workflow, browser application, orchestration service, world-state database and general development tooling here.

The compute worker is a PC with an NVIDIA GPU containing 24 GB VRAM. Treat it as a remote GPU appliance. Prefer native Linux for the GPU environment because important candidate systems such as TRELLIS-family tooling are Linux/CUDA-first. If the machine currently runs Windows, WSL2 may be used initially for experimentation, but do not design the system around Windows-specific assumptions.

The Mac and GPU worker must communicate through a documented network API. Do not make the browser application depend directly on CUDA, Python environments or shared network folders.

The repository is the source of truth. Do not independently edit divergent copies of product code on both machines. GPU-worker deployments should come from Git commits.

## Agent operating system

Install and use Matt Pocock's `mattpocock/skills` workflow.

For Claude Code, prefer the official plugin installation:

```bash
claude plugins install mattpocock-skills
```

For another compatible coding agent:

```bash
npx skills@latest add mattpocock/skills
```

Run `/setup-matt-pocock-skills` once for the repository and configure GitHub Issues as the tracker unless there is a strong reason not to.

Use `/ask-matt` as the routing reference when uncertain about workflow selection.

Do not confuse `/ask-matt` with an autonomous orchestrator. It recommends a flow but does not execute the downstream skills itself.

The normal engineering flow should remain:

```text
grill-with-docs
      ↓
to-spec
      ↓
to-tickets
      ↓
implement
      ↓
code-review
```

For this project, the initial scope is large and contains technical uncertainty, so use `/wayfinder` or research subagents where unresolved architectural questions genuinely prevent a spec from being written.

Once decisions are sufficiently clear, collapse them into a spec and use `/to-tickets` to create small tracer-bullet implementation tickets.

Tickets must be vertical slices that produce demonstrable behaviour. Avoid tickets such as "build database layer", "build API layer" or "build frontend layer" unless a wide mechanical refactor genuinely demands it.

## Autonomous execution overlay

The user explicitly wants autonomous ticket execution and self-spawning subagents.

Matt Pocock's stable `/implement` workflow normally assumes one user-invoked ticket at a time. Add a thin project-local orchestration layer around it rather than weakening the underlying implementation discipline.

The lead agent acts as conductor.

After `/to-tickets` has produced tickets and blocker relationships, compute the current frontier: all unfinished tickets whose blockers are complete.

For each frontier ticket that is genuinely independent, spawn an implementation subagent in an isolated Git worktree and branch.

Each implementation subagent receives the ticket identifier, originating spec, relevant ADRs, shared exploration notes and current integration-branch commit. It should not receive an enormous copy of the lead agent's conversational context.

Each implementation subagent should follow the behaviour of `/implement`: understand the ticket, use TDD at meaningful seams, typecheck during implementation, run focused tests during development, run the full relevant verification at completion, perform code review and commit its work.

The lead agent should continue working while subagents execute.

When an implementation subagent finishes, verify its reported tests and diff, integrate its branch into the integration branch, update the tracker and recompute the frontier. Newly unblocked tickets may then be spawned automatically.

Do not parallelize tickets that modify the same architectural surface simply because their blocker graph permits it. Shared registries, protocol schemas, central configuration, generated types, database migrations and other high-contention files should be serialized unless the seam is explicitly established first.

Before dispatching parallel tickets that depend on the same newly introduced public name, pin exact shared names and interfaces in the exploration notes. Do not allow two subagents to independently invent competing names for the same concept.

Every worktree must be created from the current integration-branch tip. Before reporting completion, a long-running subagent should incorporate the latest integration branch when doing so is safe, then rerun affected verification.

Do not spawn subagents for trivial grep operations, one-line edits, strongly sequential tasks or tasks where isolated context would make the work worse. Subagents are for independent workstreams, research, review and ticket-sized implementation.

The lead agent may run several coding/research subagents simultaneously. The physical GPU worker, however, should initially process one heavy generation job at a time. GPU concurrency must be an explicit later optimization.

## Human-interruption policy

Operate autonomously by default.

Do not ask the user to approve routine implementation details, package choices that are easy to reverse, test fixes, refactors needed to satisfy an approved ticket, branch creation, local service startup or normal research decisions.

Stop and ask only when encountering an irreversible or expensive architectural choice not covered by the spec, destructive operations affecting user data, credentials/secrets that are unavailable, paid external services with material cost, a decision that changes the core product definition, or two viable directions whose tradeoff cannot be resolved experimentally.

When a question can be answered with a small prototype or benchmark, run the experiment instead of asking the user to speculate.

Persist important decisions in ADRs so subsequent agents do not reopen them.

## Repository shape

Prefer a monorepo with a small number of deep modules rather than many tiny packages.

A sensible initial shape is:

```text
world-builder/
  apps/
    web/
  services/
    orchestrator/
    gpu-worker/
  packages/
    protocol/
    world-model/
  docs/
    adr/
    research/
  scripts/
```

`apps/web` contains the interactive browser experience.

`services/orchestrator` owns generation jobs, world chunks, persistence, scheduling and communication with the GPU worker.

`services/gpu-worker` is a Python service intended for the NVIDIA machine. It wraps experimental generation/reconstruction backends behind a stable project-owned API.

`packages/protocol` contains shared schemas for jobs, chunks, portals, transforms, artifact metadata and worker capabilities.

`packages/world-model` contains domain logic for world graphs, chunk adjacency, generation states, persistence and player-proximity scheduling.

Do not leak implementation-specific objects from WorldGrow, Hunyuan, TRELLIS, gsplat or another model across the worker boundary. They are adapters behind the project's own protocol.

## Core domain model

A world contains persistent chunks.

Each chunk has a stable identifier, world-space transform, bounds, generation status, visual artifact, collision artifact, semantic metadata and portals connecting it to adjacent chunks.

A portal represents a controlled seam where another chunk may connect.

A generated chunk should conceptually resemble:

```json
{
  "id": "lab-004",
  "transform": {
    "position": [0, 0, -20],
    "rotation": [0, 0, 0]
  },
  "theme": "abandoned cryogenic laboratory",
  "visualAsset": "artifacts/lab-004/scene.ply",
  "collisionAsset": "artifacts/lab-004/collider.glb",
  "portals": {
    "south": {
      "connectedTo": "entrance-003"
    },
    "north": {
      "connectedTo": null
    }
  }
}
```

The visual representation and physics representation are intentionally separate.

A Gaussian splat may provide photorealistic appearance while a crude invisible GLB mesh provides floor, wall and obstacle collisions.

Persistence matters more than generative novelty. Once a chunk is accepted into the world, revisiting it should load the same artifacts rather than regenerate it.

## Renderer strategy

Start with the end of the pipeline.

Use PlayCanvas/SuperSplat Viewer or its underlying libraries as the initial browser rendering target unless an experiment proves another option materially better.

The browser must be able to load a Gaussian splat and a separate collision asset, enter first-person walk mode, move with keyboard and mouse, prevent movement through collision geometry and report player position to the application.

Do not start with AI generation.

First prove that two static hand-supplied chunks can be loaded and traversed in a way that feels like one world.

This is Milestone Zero.

The acceptance test for Milestone Zero is:

```text
Launch browser
→ enter first-person mode
→ walk around chunk A
→ approach a portal
→ chunk B loads
→ cross into chunk B
→ collision works
→ return to chunk A
→ no reload/regeneration destroys state
```

Do not proceed to sophisticated world generation until this loop works reliably.

## GPU worker contract

Implement the GPU service behind an API before tightly coupling any model to the product.

The first worker implementation may be a fake generator that copies fixture assets after a delay.

The API should support health/capability inspection, job submission, job status, cancellation where practical, logs/progress, artifact manifests and version information for the backend that produced each artifact.

Conceptually:

```text
GET  /health
GET  /capabilities
POST /jobs
GET  /jobs/:id
POST /jobs/:id/cancel
GET  /jobs/:id/artifacts
```

The orchestrator should be able to run fully with a fake GPU worker.

This allows browser, persistence, scheduling and chunk-boundary work to progress without waiting for fragile research software.

## Generation strategy

Treat model choice as an adapter-selection problem, not as an early permanent architecture decision.

Research and benchmark several approaches on the 24 GB machine.

WorldGrow is highly relevant because its published architecture grows explicit walkable 3D environments block by block. Determine whether its released inference pipeline can run acceptably on this specific 24 GB GPU and whether its boundary-conditioning mechanisms can be adapted to portal-based generation.

HunyuanWorld should also be investigated. Its family explicitly targets immersive and explorable 3D worlds, and consumer-GPU-oriented variants have been released. Determine which currently released version provides the best usable inference path on this hardware. Do not assume the newest model is the best practical choice: newer full pipelines may target multi-GPU systems.

TRELLIS and TRELLIS.2 are useful candidates for scene assets and geometry experiments. TRELLIS.2's published minimum is 24 GB VRAM on NVIDIA/Linux, putting this machine at its stated boundary rather than comfortably above it. Benchmark before making it part of a critical path.

A simple reconstruction pipeline should also be maintained as a fallback:

```text
prompt
→ reference image or generated camera video
→ camera pose estimation
→ RGB/depth/multiview reconstruction
→ Gaussian splat
→ collision proxy
```

WorldSplat-like pipelines are useful implementation references for this fallback because they demonstrate the composition of generated video, camera-pose estimation, gsplat reconstruction and a browser viewer on consumer hardware. Do not blindly vendor a small third-party project; study the architecture and adopt only justified pieces.

Depth Anything V2 or another suitable depth estimator may be used for experiments. Apple MPS support means lightweight depth work can also be tested on the Mac, but CUDA-only production reconstruction should remain on the PC unless benchmarking proves otherwise.

## Chunk generation

Do not initially attempt seamless arbitrary infinite geometry.

The first dynamic worlds should be composed from spatial chunks with controlled portals.

A chunk may be a room, courtyard, cave chamber, alley segment, forest clearing, corridor section or similarly bounded region.

When generating a neighbouring chunk, pass the generator a boundary contract describing what must remain consistent at the connecting portal.

That contract may contain portal dimensions, camera/reference imagery, approximate depth, world-space orientation, architectural description, lighting, materials and semantic continuity.

The generator does not need to match every surface of the previous chunk. It needs to make the transition region convincing.

Prefer environments that naturally hide seams during early development: doors, bends, tunnels, elevators, fog, dense vegetation, stairwells and narrow passages.

## Predictive generation

After basic dynamic chunk generation works, generate ahead of the player.

The orchestrator should observe player position, orientation and velocity.

When the player approaches a portal whose destination does not exist, enqueue generation before the portal is reached.

Later, assign probabilities to multiple possible exits and speculatively generate the most likely destination.

Generated but unexplored chunks are still valid parts of the persistent world unless storage policy explicitly prunes them.

The first scheduling algorithm can be extremely simple. Do not introduce machine learning into player-path prediction until heuristics have been measured and found inadequate.

## Collision generation

Visual-quality geometry is not required for physics.

Generate or derive a low-detail collision proxy independently from the Gaussian splat.

Start with crude manually-authored fixture colliders.

Then experiment with automatic collider derivation from depth, point clouds, meshes or occupancy/voxel data.

Collision quality should be evaluated on walkability rather than visual fidelity.

## Persistence

Use a lightweight local database initially, preferably SQLite.

Store world metadata separately from heavy artifacts.

Large PLY/SOG/GLB/image artifacts should live in an artifact directory addressed by stable IDs and hashes.

The world database should preserve chunk topology, transforms, portal links, prompt lineage, generator/backend version, generation seeds where available, artifact locations and user-created persistent state.

A player should be able to stop the application, restart it and continue in the same generated world.

## Initial development sequence

The lead agent should not attempt to build the entire vision in one pass.

First establish the repository, Matt Pocock workflow, tracker, CI and machine protocol.

Then build Milestone Zero: static splat plus collider, first-person walking and a two-chunk portal transition.

Then introduce the fake GPU-worker API and make chunk loading asynchronous through the exact interface the future generator will use.

Then create a real GPU capability probe on the PC and benchmark the candidate generation/reconstruction stacks.

Then choose the first real generation backend based on measured quality, runtime, VRAM use, artifact formats and integration difficulty.

Then generate one complete chunk automatically.

Then generate a second chunk from a boundary contract and make it connect to the first.

Then add persistent world storage.

Then add predictive generation.

Only after that should the project pursue increasingly seamless transitions, larger worlds, semantic objects, editable worlds, NPCs or realtime generation.

## Research protocol

Technical uncertainty should become reproducible research notes, not chat speculation.

For each candidate backend, record exact commit/version, OS, GPU, CUDA/PyTorch versions, model weights, peak VRAM if measurable, wall-clock generation time, output formats, license, success/failure status and representative artifacts.

Keep these under `docs/research/`.

When a backend fails, record the failure rather than silently deleting the experiment.

Do not allow a research subagent to change product architecture merely because one dependency was easiest to install.

## Quality bar

At every stage, optimize for a compelling walkable prototype rather than theoretical generality.

A small environment that feels spatially convincing is more valuable than an enormous incoherent world.

Prioritize spatial persistence, responsive movement, convincing transitions and short iteration loops.

Avoid training foundation models.

Avoid premature distributed systems.

Avoid Kubernetes.

Avoid introducing a message broker until a simple HTTP job API demonstrably fails.

Avoid building an original splat renderer before exhausting existing libraries.

Avoid tying world-state representation to one generation model.

Avoid hiding failed experiments.

## Definition of first major success

The first major success is not "we integrated an AI model."

It is this:

```text
User enters a world prompt.

A first spatial chunk is generated.

The user enters it in the browser and walks freely.

The user approaches an unexplored exit.

A second chunk is generated on the NVIDIA worker.

The application loads the new chunk.

The player crosses the boundary without leaving first-person mode.

The second chunk visually and spatially relates to the first.

The player turns around and walks back.

The original chunk is exactly where it was.

Restarting the application preserves the world.
```

Once that works, the project has crossed from a 3D-generation demo into an actual generative-world system.

## Begin now

Do not spend the first session attempting to install every generative model.

Initialize the project on the Mac.

Install Matt Pocock's skills and run the per-repository setup.

Create the tracker and persistent project documentation.

Establish SSH connectivity to the NVIDIA PC and add a minimal GPU-worker `/health` service.

Run `/grill-with-docs` against this brief, using research/prototypes to resolve only questions that block the first implementation spec.

Use `/to-spec` and `/to-tickets` once Milestone Zero is sufficiently specified.

Then enter autonomous frontier execution: spawn independent ticket subagents in isolated worktrees, integrate completed work, recompute blockers and continue until the milestone is green or a genuine human decision is required.

The first visible target is a browser in which the user can walk through two persistent locally stored chunks with collision. AI generation comes immediately after that foundation proves sound.
