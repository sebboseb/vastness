# Domain glossary

- **World**: a persistent spatial environment containing connected chunks and player state.
- **Chunk**: a stable bounded region with a world transform, visual artifact, collision artifact and portals.
- **Portal**: a controlled opening linking two chunks; remains impassable until its destination is ready.
- **Visual artifact**: the accepted appearance of a chunk, independent of the camera.
- **Collision artifact**: a separate simplified spatial representation of solid surfaces.
- **Generation job**: asynchronous work that produces candidate chunk artifacts.
- **Accepted chunk**: a chunk whose artifacts and topology have been stored for reuse.
- **Worker**: the GPU appliance exposing the project-owned job API; fixture mode needs no GPU.
- **Frontier**: unfinished tickets with all blockers complete and no conflicting architectural ownership.
