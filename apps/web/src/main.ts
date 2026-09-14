import './style.css';
import { WorldSchema, type World, type PlayerPose, type Chunk } from '../../../packages/protocol/src/index.ts';
import { chunkAt, movePlayer, shouldLoadNeighbor } from '../../../packages/world-model/src/index.ts';
import { StationScene, type LoadState } from './scene.ts';

function element<T extends HTMLElement>(id: string): T {
  const value = document.getElementById(id);
  if (!value) throw new Error(`Missing interface element: ${id}`);
  return value as T;
}
const canvas = element<HTMLCanvasElement>('world-canvas');
const enter = element<HTMLButtonElement>('enter');
const retry = element<HTMLButtonElement>('retry');
const keys = new Set<string>();
let scene: StationScene;
let world: World;
let pose: PlayerPose = {position:[0,1.65,5],yaw:0,pitch:0};
let ready = false;
let locked = false;
let entered = false;
let dragging = false;
let automaticDirection = 0;
let saveInFlight = false;
let lastSaved = '';
let failedChunk: Chunk | undefined;
let lastTelemetry = 0;

function notice(message: string, error = false) {
  element('notice-text').textContent = message;
  element('notice').classList.toggle('error',error);
  element('notice').classList.toggle('quiet',!message);
}
function problem(error: unknown): string { return error instanceof Error ? error.message : String(error); }

function updateTelemetry() {
  if (!world || !scene) return;
  const current = chunkAt(pose.position,world.chunks);
  const chunk = world.chunks.find(chunk => chunk.id === current);
  element('chunk-state').textContent = current ?? 'outside world';
  element('pose-state').textContent = pose.position.map(n => n.toFixed(2)).join(' / ');
  element('pose-state').dataset.position = JSON.stringify(pose.position);
  element('pose-state').dataset.yaw = pose.yaw.toFixed(2);
  element('load-state').textContent = world.chunks.map(chunk => `${chunk.id}: ${scene.states.get(chunk.id) ?? 'waiting'}`).join(' · ');
  element('location-name').textContent = chunk?.label ?? 'North Station';
  element('location-index').textContent = `${current === 'observatory' ? '02' : '01'} / NORTH STATION`;
  element('location-caption').textContent = current === 'observatory' ? 'Observation room · Seaward instruments' : 'Field equipment · Coastal approach';
  for (const chunk of world.chunks) {
    const mapRoom = document.getElementById(`map-${chunk.id}`);
    mapRoom?.classList.toggle('loaded',scene.loaded.has(chunk.id));
    mapRoom?.classList.toggle('active',chunk.id === current);
  }
  document.getElementById('map-player')?.setAttribute('cx',String(80+pose.position[0]*82/14));
  document.getElementById('map-player')?.setAttribute('cy',String(190-(9-pose.position[2])*172/36));
  const bearing = document.querySelector('.bearing');
  if (bearing) bearing.textContent = `${Math.round(((360-pose.yaw)%360+360)%360).toString().padStart(3,'0')}°`;
}

function onLoadState(id: string, state: LoadState) {
  const descriptions: Partial<Record<LoadState,string>> = {metadata:'Requesting room',visual:'Loading spatial splats',collision:'Checking solid surfaces'};
  if (descriptions[state]) notice(`${descriptions[state]} · ${id === 'observatory' ? 'Observatory' : 'Arrival hall'}`);
  if (state === 'ready') notice(ready ? 'Passage open · Both rooms remain in memory' : 'Station ready · Your place is saved as you explore');
  updateTelemetry();
}

async function loadNeighbor(chunk: Chunk) {
  try {
    await scene.load(chunk,true);
    if (failedChunk?.id === chunk.id) {failedChunk = undefined; retry.hidden = true;}
  } catch (error) {
    failedChunk = chunk; retry.hidden = false;
    notice(`Passage closed · ${problem(error)}`,true);
  }
}

async function savePose(keepalive = false) {
  if (!ready) return;
  const snapshot = JSON.stringify(pose);
  if (snapshot === lastSaved || (saveInFlight && !keepalive)) return;
  if (!keepalive) saveInFlight = true;
  element('save-state').textContent = 'SAVING';
  try {
    const response = await fetch('/api/player',{method:'PUT',headers:{'Content-Type':'application/json','X-Pose-Time':String(performance.timeOrigin + performance.now())},body:snapshot,keepalive});
    if (!response.ok) throw new Error(`Save failed (${response.status})`);
    lastSaved = JSON.stringify(await response.json());
    element('save-state').textContent = 'SAVED LOCALLY';
  } catch {
    element('save-state').textContent = 'SAVE FAILED · RETRYING';
  } finally {
    if (!keepalive) saveInFlight = false;
  }
}

function setAutomaticWalking(direction: number) {
  automaticDirection = direction;
  if (direction) entered = true;
  element('walk-forward').setAttribute('aria-pressed',String(direction === 1));
  element('walk-backward').setAttribute('aria-pressed',String(direction === -1));
  element<HTMLButtonElement>('stop-walking').disabled = direction === 0;
  document.body.classList.toggle('walking',entered);
  if (direction && !failedChunk) notice('');
}
function releaseControls() {keys.clear(); setAutomaticWalking(0); void savePose();}
document.addEventListener('pointerlockchange', () => {
  const wasLocked = locked;
  locked = document.pointerLockElement === canvas;
  if (wasLocked && !locked) entered = false;
  document.body.classList.toggle('walking',entered);
  element('enter-label').textContent = locked ? 'Exploring' : 'Enter station';
  if (!locked) releaseControls();
  else if (!failedChunk) notice('');
});
function pointerFallback() {notice('Drag to look · Mouse capture is unavailable here. WASD to walk; Esc to pause.');}
document.addEventListener('pointerlockerror',pointerFallback);
canvas.tabIndex = 0;
canvas.addEventListener('pointerdown', event => {
  if (!entered || locked || event.button !== 0) return;
  dragging = true; canvas.setPointerCapture(event.pointerId); canvas.focus();
});
canvas.addEventListener('pointerup', () => {dragging = false;});
canvas.addEventListener('pointercancel', () => {dragging = false;});
document.addEventListener('mousemove', event => {
  if (!locked && !(entered && dragging)) return;
  pose.yaw = (pose.yaw-event.movementX*0.1)%360;
  pose.pitch = Math.max(-85,Math.min(85,pose.pitch-event.movementY*0.1));
});
document.addEventListener('keydown', event => {
  if (!ready) return;
  if (event.code === 'Escape') {entered = false;dragging = false;releaseControls();if (locked) document.exitPointerLock();}
  const walkingKey = ['KeyW','KeyA','KeyS','KeyD'].includes(event.code);
  if (walkingKey && automaticDirection) setAutomaticWalking(0);
  if ((entered && walkingKey) || ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.code)) {keys.add(event.code);event.preventDefault();}
});
document.addEventListener('keyup', event => keys.delete(event.code));
window.addEventListener('blur',releaseControls);
document.addEventListener('visibilitychange', () => {if (document.hidden) {keys.clear();setAutomaticWalking(0);void savePose(true);}});
window.addEventListener('pagehide', () => {keys.clear();void savePose(true);});
enter.addEventListener('click', () => {
  if (!ready) return;
  entered = true; document.body.classList.add('walking'); canvas.focus();
  try {void canvas.requestPointerLock()?.catch(pointerFallback);} catch {pointerFallback();}
});
element('walk-forward').addEventListener('click', () => setAutomaticWalking(automaticDirection === 1 ? 0 : 1));
element('walk-backward').addEventListener('click', () => setAutomaticWalking(automaticDirection === -1 ? 0 : -1));
element('stop-walking').addEventListener('click', () => {setAutomaticWalking(0);void savePose();});
retry.addEventListener('click', () => {
  retry.hidden = true;
  if (ready && failedChunk) void loadNeighbor(failedChunk);
  else window.location.reload();
});

function frame(dt: number) {
  if (!ready) return;
  dt = Math.min(dt,0.05);
  if (entered || automaticDirection || keys.size) {
    pose.yaw += ((keys.has('ArrowLeft')?1:0)-(keys.has('ArrowRight')?1:0))*dt*65;
    pose.pitch = Math.max(-85,Math.min(85,pose.pitch+((keys.has('ArrowUp')?1:0)-(keys.has('ArrowDown')?1:0))*dt*55));
    let forward = automaticDirection || (keys.has('KeyW')?1:0)-(keys.has('KeyS')?1:0);
    let right = (keys.has('KeyD')?1:0)-(keys.has('KeyA')?1:0);
    const length = Math.hypot(forward,right);
    if (length) {
      forward /= length; right /= length;
      const yaw = pose.yaw*Math.PI/180, distance = dt*3.2;
      pose.position = movePlayer(pose.position,[(-Math.sin(yaw)*forward+Math.cos(yaw)*right)*distance,0,(-Math.cos(yaw)*forward-Math.sin(yaw)*right)*distance],scene.collisionBoxes());
    }
    for (const loaded of scene.loaded.values()) for (const portal of loaded.chunk.portals) {
      const neighbor = world.chunks.find(chunk => chunk.id === portal.connectedTo);
      if (neighbor && !scene.states.has(neighbor.id) && shouldLoadNeighbor(pose.position,portal)) void loadNeighbor(neighbor);
    }
  }
  scene.setPose(pose);
  if (performance.now()-lastTelemetry > 100) {updateTelemetry();lastTelemetry = performance.now();}
}

async function start() {
  try {
    try {scene = new StationScene(canvas,onLoadState);} catch (error) {throw new Error(`Renderer could not start: ${problem(error)}. This station requires WebGL 2 and browser graphics acceleration.`);}
    const response = await fetch('/api/world');
    if (!response.ok) throw new Error(`Local world unavailable (${response.status}). Check that npm run dev is running.`);
    world = WorldSchema.parse(await response.json()); pose = structuredClone(world.player);
    element('world-state').textContent = world.id;
    scene.setPose(pose);
    const current = world.chunks.find(chunk => chunk.id === chunkAt(pose.position,world.chunks));
    if (!current) throw new Error('Saved player position is outside the station bounds');
    await scene.load(current);
    // At a saved seam position, load the adjacent room before enabling movement.
    for (const portal of current.portals) if (shouldLoadNeighbor(pose.position,portal)) {
      const neighbor = world.chunks.find(chunk => chunk.id === portal.connectedTo);
      if (neighbor) {
        await loadNeighbor(neighbor);
        // A restored pose can overlap the portal barrier; do not enable a walker inside it.
        if (!scene.loaded.has(neighbor.id)) throw new Error('Cannot safely restore this passage. Retry when the adjacent room is available.');
      }
    }
    ready = true; enter.disabled = false; element('enter-label').textContent = 'Enter station';
    element<HTMLButtonElement>('walk-forward').disabled = false;
    element<HTMLButtonElement>('walk-backward').disabled = false;
    lastSaved = JSON.stringify(pose); element('save-state').textContent = 'SAVED LOCALLY';
    updateTelemetry(); scene.app.on('update',frame);
    window.setInterval(() => void savePose(),1000);
  } catch (error) {
    notice(problem(error),true); retry.hidden = false;
    element('enter-label').textContent = 'Station unavailable';
  }
}

void start();
