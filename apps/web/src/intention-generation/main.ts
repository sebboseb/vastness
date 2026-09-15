import './style.css';
import type {CollisionBox, Vec3} from '../../../../packages/protocol/src/index.ts';
import {movePlayer} from '../../../../packages/world-model/src/index.ts';
import {DestinationRenderer} from './renderer.ts';
import {approach, collisionBoxes, crossing, overlaps, shiftBoxes, start, stepToward} from './spatial.ts';
import type {InputSource, PreparedScene, WorldRecord} from './types.ts';

const element = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const canvas = element<HTMLCanvasElement>('world-canvas');
const history = element<HTMLSelectElement>('history');
const representation = element<HTMLSelectElement>('representation');
const input = element<HTMLTextAreaElement>('intention');
const errors: string[] = [];
const keys = new Set<string>();
const active = (status: WorldRecord['status']) => ['requested', 'generating', 'processing'].includes(status);
const message = (error: unknown) => error instanceof Error ? error.message : String(error);
let renderer: DestinationRenderer;
let world: WorldRecord | undefined;
let prepared: PreparedScene | undefined;
let destinationBoxes: CollisionBox[] = [];
let renderReady = false, loadingScene = false, submitting = false, renderFailed = false;
let position: Vec3 = [...start], yaw = 0, pitch = 0;
let travelMetres = 0, frameCount = 0, crossingCount = 0, returnCount = 0;
let epoch = 0, pollTimer: number | undefined;
let selectionAbort = new AbortController();
let walking: Vec3[] = [], walkingLabel = '', stalledSeconds = 0;
let destinationTrail: Vec3[] = [];
let dragging = false, entered = false;
let lastTelemetry = 0;

type PendingVisit = {worldId: string; event: 'crossed' | 'returned'; position: Vec3; eventId?: string};
const queueKey = 'vastness:intention-generation:pending-visits-v1';
let visits: PendingVisit[] = [];
let savingVisits = false;
try {
  const saved: unknown = JSON.parse(localStorage.getItem(queueKey) ?? '[]');
  if (!Array.isArray(saved) || !saved.every(visit => typeof visit?.worldId === 'string' && ['crossed', 'returned'].includes(visit.event) && Array.isArray(visit.position) && visit.position.length === 3 && visit.position.every(Number.isFinite))) throw new Error('Invalid saved crossing queue');
  visits = saved as PendingVisit[];
} catch (error) {report(`Saved crossing queue unavailable: ${message(error)}`);}

function report(error: unknown) {
  const detail = `${new Date().toISOString()} · ${message(error)}`;
  errors.push(detail); element('errors').textContent = errors.join('\n');
  element('retry').hidden = false;
}
function saveVisitQueue() {
  try {localStorage.setItem(queueKey, JSON.stringify(visits));} catch (error) {report(`Could not preserve pending visits locally: ${message(error)}`);}
}
async function json<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) throw new Error(`${init?.method ?? 'GET'} ${url}: ${response.status} ${(await response.text()).slice(0, 500)}`);
  return await response.json() as T;
}
function isOpen() {return world?.status === 'ready' && renderReady;}
function solids() {return collisionBoxes(destinationBoxes, isOpen());}
function stop() {walking = []; walkingLabel = ''; stalledSeconds = 0;}
function setWalking(route: Vec3[], label: string) {keys.clear(); walking = route.map(point => [...point]); walkingLabel = label; stalledSeconds = 0;}

function updateInterface() {
  if (!renderer) return;
  const open = isOpen(), near = position[2] < -7 && position[2] >= -12;
  renderer.setGate(open);
  element('intention-panel').hidden = !near || (world?.status === 'ready' && !renderFailed);
  element<HTMLButtonElement>('submit').disabled = submitting || Boolean(world && active(world.status));
  input.disabled = submitting || Boolean(world && active(world.status));
  history.disabled = submitting;
  element<HTMLButtonElement>('circuit').disabled = !open;
  element<HTMLButtonElement>('return').disabled = !open || position[2] >= -12;
  representation.disabled = !renderReady;
  const descriptions: Record<WorldRecord['status'], string> = {
    requested: 'Intention recorded. Waiting for the generation worker.',
    generating: 'Generating the destination on the GPU. The threshold remains closed.',
    processing: 'Checking artifacts, deriving collision, and validating a walkable route.',
    ready: renderFailed ? 'Destination rendering failed. The threshold remains closed.' : open ? 'Destination ready. Walk through the threshold.' : 'Loading the accepted destination into the renderer.',
    failed: `Generation failed. The threshold remains closed. ${world?.error ?? ''}`,
  };
  let status = world ? descriptions[world.status] : 'Approach the threshold to describe what lies beyond.';
  if (open && position[2] < -12) status = 'Inside your generated destination. Return through the same threshold.';
  if (walkingLabel) status += ` ${walkingLabel}.`;
  if (visits.length) status += ` ${visits.length} crossing event(s) awaiting persistence.`;
  element('status').textContent = status;
  element('progress').textContent = world ? `${world.rawIntent.text}\n${descriptions[world.status]}` : 'Free-form input is compiled into a limited semantic description, then generates a new artifact.';
  const state = {
    position, yaw, pitch, overlaps: overlaps(position, solids()), worldId: world?.id ?? null,
    status: world?.status ?? 'unshaped', renderReady, gateOpen: open, loadingScene, renderFailed,
    travelMetres, crossingCount, returnCount, pendingVisits: visits.length, savingVisits,
    walking: walkingLabel || null, pathRemaining: walking.length, frameCount,
    representation: representation.value, ...renderer.counts, errorCount: errors.length,
    artifactUrls: world?.artifacts?.map(artifact => artifact.url) ?? [],
  };
  element('telemetry').dataset.state = JSON.stringify(state);
  element('telemetry').textContent = `${position.map(n => n.toFixed(2)).join(' / ')} · ${travelMetres.toFixed(1)} m walked · seam ${open ? 'open' : 'closed'} · ${world?.status ?? 'unshaped'} · ${state.generatedTriangles} triangles`;
  element('world-record').textContent = world ? JSON.stringify(world, null, 2) : 'No destination requested.';
}

async function persistVisits() {
  if (savingVisits || !visits.length) return;
  savingVisits = true;
  try {
    while (visits.length) {
      const visit = visits[0];
      const record = await json<WorldRecord>(`/api/intent/worlds/${encodeURIComponent(visit.worldId)}/visit`, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({event: visit.event, position: visit.position, eventId: visit.eventId}), keepalive: true,
      });
      visits.shift(); saveVisitQueue();
      if (world?.id === visit.worldId) world = record;
    }
  } catch (error) {report(`Crossing persistence failed; retained for retry. ${message(error)}`);}
  finally {savingVisits = false; updateInterface();}
}
function move(next: Vec3) {
  const before = position;
  travelMetres += Math.hypot(next[0] - before[0], next[2] - before[2]);
  position = next;
  const event = crossing(before, next);
  if (event && world && isOpen()) {
    if (event === 'crossed') {crossingCount++; destinationTrail = [[...before], [...next]];}
    else {returnCount++; destinationTrail = [];}
    visits.push({worldId: world.id, event, position: [...next], eventId: crypto.randomUUID()}); saveVisitQueue(); void persistVisits();
  } else if (next[2] < -12 && Math.hypot(next[0] - before[0], next[2] - before[2]) > .001) destinationTrail.push([...next]);
}

function originalUrl() {
  const artifact = world?.artifacts?.find(item => item.format === 'ply' || item.url.endsWith('/scene.ply'));
  if (!artifact) return undefined;
  return artifact.url.startsWith('/artifacts/') ? `/api/intent${artifact.url}` : artifact.url;
}
async function applyRepresentation() {
  const selectedEpoch = epoch;
  try {await renderer.setRepresentation(representation.value as 'solid' | 'original', originalUrl());}
  catch (error) {
    if (selectedEpoch !== epoch) return;
    representation.value = 'solid'; await renderer.setRepresentation('solid');
    report(`Original splat unavailable; abstract mesh remains visible. ${message(error)}`);
  }
  updateInterface();
}
async function loadScene(record: WorldRecord, selectedEpoch: number) {
  if (loadingScene || renderReady || renderFailed) return;
  loadingScene = true; updateInterface();
  try {
    const data = await json<PreparedScene>(record.sceneUrl ?? `/api/intent/worlds/${encodeURIComponent(record.id)}/scene`, {signal: selectionAbort.signal});
    if (selectedEpoch !== epoch) return;
    await renderer.install(data);
    if (selectedEpoch !== epoch) return;
    prepared = data;
    destinationBoxes = [...data.validation.room, ...shiftBoxes(data.boxes, data.validation.placement)];
    renderReady = true; await applyRepresentation();
  } catch (error) {
    if (selectedEpoch !== epoch) return;
    renderReady = false; renderFailed = true; destinationBoxes = []; renderer.clear();
    report(`Destination rendering failed: ${message(error)}`);
  } finally {if (selectedEpoch === epoch) {loadingScene = false; updateInterface();}}
}
async function poll(id: string, selectedEpoch: number) {
  if (selectedEpoch !== epoch) return;
  try {
    const record = await json<WorldRecord>(`/api/intent/worlds/${encodeURIComponent(id)}`, {signal: selectionAbort.signal});
    if (selectedEpoch !== epoch) return;
    world = record; input.value = record.rawIntent.text;
    if (record.status === 'ready') await loadScene(record, selectedEpoch);
    if (record.status === 'failed' && record.error && !errors.some(error => error.endsWith(record.error!))) report(record.error);
    updateInterface();
  } catch (error) {if (selectedEpoch === epoch) report(error);}
  if (selectedEpoch === epoch && (!world || active(world.status))) pollTimer = window.setTimeout(() => void poll(id, selectedEpoch), 2000);
}
function resetSelection() {
  epoch++; selectionAbort.abort(); selectionAbort = new AbortController(); window.clearTimeout(pollTimer);
  stop(); keys.clear(); world = undefined; prepared = undefined; destinationBoxes = [];
  renderReady = false; loadingScene = false; renderFailed = false;
  position = [...start]; yaw = 0; pitch = 0; travelMetres = 0; crossingCount = 0; returnCount = 0; destinationTrail = [];
  representation.value = 'solid'; renderer.clear(); renderer.setPose(position, yaw, pitch);
}
async function selectWorld(id: string, record?: WorldRecord) {
  resetSelection(); history.value = id;
  window.history.replaceState(null, '', `${location.pathname}${location.search}${id ? `#${encodeURIComponent(id)}` : ''}`);
  if (!id) {input.value = ''; updateInterface(); return;}
  if (record) {world = record; input.value = record.rawIntent.text;}
  updateInterface(); await poll(id, epoch);
}
async function refreshHistory() {
  const records = await json<WorldRecord[]>('/api/intent/worlds');
  const selected = world?.id ?? decodeURIComponent(location.hash.slice(1));
  history.replaceChildren(new Option('New intention', ''));
  for (const record of records) history.add(new Option(`${record.status} · ${record.rawIntent.text.slice(0, 70)}`, record.id));
  history.value = selected;
}
const textInput: InputSource = {
  async submit(text) {
    if (submitting || (world && active(world.status))) return;
    const trimmed = text.trim(); if (!trimmed) {input.focus(); return;}
    submitting = true; updateInterface();
    try {
      const record = await json<WorldRecord>('/api/intent/worlds', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({text: trimmed, source: 'text'})});
      // Submission keeps the player's approach position; selecting older history resets to arrival.
      const submissionPosition: Vec3 = [...position];
      resetSelection(); world = record; position = submissionPosition; input.value = record.rawIntent.text;
      window.history.replaceState(null, '', `${location.pathname}${location.search}#${encodeURIComponent(record.id)}`);
      try {await refreshHistory();} catch (error) {report(error);}
      void poll(record.id, epoch);
    } catch (error) {report(`Request could not be confirmed. Check saved destinations before retrying: ${message(error)}`);}
    finally {submitting = false; updateInterface();}
  },
};

element('intention-form').addEventListener('submit', event => {event.preventDefault(); void textInput.submit(input.value);});
history.addEventListener('change', () => void selectWorld(history.value));
element('refresh').addEventListener('click', () => void refreshHistory().catch(report));
representation.addEventListener('change', () => void applyRepresentation());
element<HTMLInputElement>('colliders').addEventListener('change', event => renderer.showColliders((event.target as HTMLInputElement).checked));
element('approach').addEventListener('click', () => {
  if (position[2] < -12) {report('Return through the threshold before walking the source approach.'); return;}
  setWalking([[0, 1.65, position[2]], approach], 'Walking to threshold');
});
element('circuit').addEventListener('click', () => {
  if (!isOpen() || !prepared) return;
  if (position[2] < -12 && Math.hypot(position[0] - prepared.validation.entry[0], position[2] - prepared.validation.entry[2]) > .25) {report('Return through the threshold before starting the validated circuit from its entry.'); return;}
  setWalking(position[2] >= -12 ? [[0, 1.65, position[2]], approach, ...prepared.validation.route] : prepared.validation.route, 'Walking validated destination circuit');
});
element('return').addEventListener('click', () => {
  if (!isOpen() || position[2] >= -12 || !destinationTrail.length) return;
  setWalking([...destinationTrail].reverse().concat([approach]), 'Retracing your walk to the threshold');
});
element('stop').addEventListener('click', stop);
element('reset').addEventListener('click', () => {stop(); yaw = 0; pitch = 0;});
element('retry').addEventListener('click', () => {
  element('retry').hidden = true; renderFailed = false;
  if (world) {window.clearTimeout(pollTimer); void poll(world.id, epoch);}
  else if (location.hash) void selectWorld(decodeURIComponent(location.hash.slice(1)));
  void refreshHistory().catch(report); void persistVisits();
});
function editable(target: EventTarget | null) {return target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);}
document.addEventListener('keydown', event => {
  if (editable(event.target)) return;
  if (event.code === 'Escape') {stop(); keys.clear(); dragging = false; entered = false; if (document.pointerLockElement) document.exitPointerLock();}
  if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.code)) {stop(); keys.add(event.code); event.preventDefault();}
});
document.addEventListener('keyup', event => keys.delete(event.code));
window.addEventListener('blur', () => {keys.clear(); dragging = false; stop();});
document.addEventListener('visibilitychange', () => {if (document.hidden) {keys.clear(); stop();}});
input.addEventListener('focus', () => {keys.clear(); stop();});
element('enter').addEventListener('click', () => {
  entered = true; canvas.focus();
  try {void canvas.requestPointerLock()?.catch(() => {element('status').textContent = 'Drag to look; WASD to walk. Mouse capture is unavailable.';});} catch { /* Drag look remains available. */ }
});
canvas.addEventListener('pointerdown', event => {if (event.button === 0) {entered = true; dragging = true; canvas.focus(); canvas.setPointerCapture(event.pointerId);}});
canvas.addEventListener('pointerup', () => dragging = false);
canvas.addEventListener('pointercancel', () => dragging = false);
document.addEventListener('pointerlockchange', () => {keys.clear(); if (!document.pointerLockElement) dragging = false;});
document.addEventListener('mousemove', event => {
  if (!entered || !(document.pointerLockElement === canvas || dragging)) return;
  yaw = (yaw - event.movementX * .12) % 360; pitch = Math.max(-80, Math.min(80, pitch - event.movementY * .12));
});

function frame(delta: number) {
  const dt = Math.min(delta, .05); frameCount++;
  const boxes = solids();
  if (walking.length) {
    const target = walking[0], before = position;
    const next = stepToward(position, target, dt * 3.2, boxes);
    const distance = Math.hypot(next[0] - before[0], next[2] - before[2]);
    if (distance > .0001) yaw = Math.atan2(before[0] - next[0], before[2] - next[2]) * 180 / Math.PI;
    move(next);
    stalledSeconds = distance < .0001 ? stalledSeconds + dt : 0;
    if (Math.hypot(target[0] - position[0], target[2] - position[2]) < .012) walking.shift();
    if (!walking.length) stop();
    if (stalledSeconds > .8) {report(`Walk blocked by collision at ${position.map(n => n.toFixed(2)).join(', ')}. Use manual movement or return.`); stop();}
  } else if (keys.size) {
    yaw += ((keys.has('ArrowLeft') ? 1 : 0) - (keys.has('ArrowRight') ? 1 : 0)) * dt * 70;
    pitch = Math.max(-80, Math.min(80, pitch + ((keys.has('ArrowUp') ? 1 : 0) - (keys.has('ArrowDown') ? 1 : 0)) * dt * 55));
    const forward = (keys.has('KeyW') ? 1 : 0) - (keys.has('KeyS') ? 1 : 0);
    const right = (keys.has('KeyD') ? 1 : 0) - (keys.has('KeyA') ? 1 : 0);
    const length = Math.hypot(forward, right);
    if (length) {
      const radians = yaw * Math.PI / 180, distance = dt * 3.2 / length;
      move(movePlayer(position, [(-Math.sin(radians) * forward + Math.cos(radians) * right) * distance, 0, (-Math.cos(radians) * forward - Math.sin(radians) * right) * distance], boxes, .3));
    }
  }
  renderer.setPose(position, yaw, pitch);
  if (performance.now() - lastTelemetry > 120) {lastTelemetry = performance.now(); updateInterface();}
}
async function startApp() {
  try {
    renderer = new DestinationRenderer(canvas); renderer.setPose(position, yaw, pitch); renderer.app.on('update', frame);
    updateInterface();
    await refreshHistory();
    const id = decodeURIComponent(location.hash.slice(1));
    if (id) await selectWorld(id);
    void persistVisits(); window.setInterval(() => {if (visits.length) void persistVisits();}, 5000);
  } catch (error) {report(error); element('status').textContent = `Unable to start: ${message(error)}`;}
}
void startApp();
