import './style.css';
import type {Vec3} from '../../../../packages/protocol/src/index.ts';
import {PassageRenderer, type DisplayScene, type DisplayTransform} from './renderer.ts';
import {createSurfaceNavigator, parsePassageGlb, type AuthoredApproach} from './navigation.ts';

type Asset = {url: string; sha256: string; bytes: number};
type Assessment = {status: 'passed' | 'failed'; transform: DisplayTransform; options: Parameters<typeof createSurfaceNavigator>[2]; route: Vec3[]; reasons: string[]; metrics: unknown; sourceSha256: string; seam: Vec3; approach: AuthoredApproach; approachStart: Vec3; approachVerified: boolean};
type Case = {id: string; identity: string; label: string; worldId: string; rawIntent: string; semantics: unknown; assets: Record<string, Asset>; assessment: Assessment | null; visits: {event: string; eventId: string}[]};
const element = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const canvas = element<HTMLCanvasElement>('world-canvas'), select = element<HTMLSelectElement>('case'), representation = element<HTMLSelectElement>('representation');
const renderer = new PassageRenderer(canvas), errors: string[] = [], keys = new Set<string>();
let current: Case | undefined, navigator: ReturnType<typeof createSurfaceNavigator> | undefined;
let scene: DisplayScene | undefined, position: Vec3 = [0, 2, 8], yaw = 0, pitch = 0, epoch = 0, ready = false;
let mode: 'inspection' | 'scaffold' | 'generated' = 'inspection', route: Vec3[] = [], trail: Vec3[] = [];
let entry: Vec3 = [0, 1.65, 0], outward: Vec3 = [0, 0, 1], approach: Vec3 = [0, 1.65, 2];
let audit: {position: Vec3; supportTriangleIds: number[]; valid: boolean; headClearance: number; navigationMs: number}[] = [];
let generatedTravel = 0, blocked = '', walking = '', stalled = 0, dragging = false, visitBusy = false;
let visits: {id: string; identity: string; event: 'crossed' | 'returned'; eventId: string; position: Vec3}[] = [];
const queueKey = 'vastness:generated-passage:visits';
try {visits = JSON.parse(localStorage.getItem(queueKey) ?? '[]');} catch { /* No prior queue. */ }
function report(error: unknown) {errors.push(String(error)); element('errors').textContent = errors.join('\n');}
async function json<T>(url: string, options?: RequestInit): Promise<T> {const response = await fetch(url, options); if (!response.ok) throw new Error(`${response.status}: ${await response.text()}`); return await response.json() as T;}
async function verified(asset: Asset) {
  const response = await fetch(asset.url); if (!response.ok) throw new Error(`Artifact unavailable: ${response.status}`);
  const bytes = await response.arrayBuffer();
  const sha = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(n => n.toString(16).padStart(2, '0')).join('');
  if (bytes.byteLength !== asset.bytes || sha !== asset.sha256) throw new Error('Artifact identity verification failed'); return bytes;
}
const decoded = <T>(bytes: ArrayBuffer): T => JSON.parse(new TextDecoder().decode(bytes)) as T;
function stop() {route = []; walking = ''; stalled = 0; keys.clear();}
function lookAt(target: Vec3) {yaw = Math.atan2(position[0] - target[0], position[2] - target[2]) * 180 / Math.PI; pitch = Math.atan2(target[1] - position[1], Math.hypot(target[0] - position[0], target[2] - position[2])) * 180 / Math.PI;}
function inspect() {
  stop(); mode = 'inspection';
  const transform = current?.assessment?.transform ?? {...scene!.transform, yaw: 0};
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  scene!.mesh.positions.forEach((value, i) => {min[i % 3] = Math.min(min[i % 3], value); max[i % 3] = Math.max(max[i % 3], value);});
  const size = Math.max(...max.map((value, i) => value - min[i])) * transform.scale;
  const center = min.map((value, i) => (value + max[i]) / 2 * transform.scale + transform.position[i]) as Vec3;
  position = [center[0] + size * 1.1, center[1] + size * .5, center[2] + size * 1.6]; lookAt(center);
}
function toApproach() {if (!navigator || current?.assessment?.status !== 'passed') return; stop(); mode = 'scaffold'; position = [...approach]; pitch = 0; lookAt(entry); trail = [];}
async function saveVisits() {
  if (visitBusy) return; visitBusy = true;
  try {
    while (visits.length) {
      const visit = visits[0];
      const record = await json<Case>(`/api/passage/cases/${visit.id}/visits`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(visit)});
      visits.shift(); localStorage.setItem(queueKey, JSON.stringify(visits)); if (current?.id === visit.id) current = record;
    }
  } catch (error) {report(error);} finally {visitBusy = false;}
}
function visit(event: 'crossed' | 'returned') {visits.push({id: current!.id, identity: current!.identity, event, eventId: crypto.randomUUID(), position: [...position]}); localStorage.setItem(queueKey, JSON.stringify(visits)); void saveVisits();}
function scaffoldCoordinates(point: Vec3) {const dx = point[0] - entry[0], dz = point[2] - entry[2]; return {along: dx * outward[0] + dz * outward[2], side: dx * outward[2] - dz * outward[0]};}
function move(delta: Vec3) {
  if (!ready || !navigator || mode === 'inspection') return;
  const before: Vec3 = [...position], requested: Vec3 = [before[0] + delta[0], before[1], before[2] + delta[2]];
  const navigationStarted = performance.now();
  const result = navigator.move(position, delta);
  position = result.position; blocked = result.blocked ? String(result.reason) : '';
  const oldSide = scaffoldCoordinates(before).along, newSide = scaffoldCoordinates(position).along;
  if (oldSide > 0 && newSide <= 0) {mode = 'generated'; trail = [[...before], [...position]]; visit('crossed');}
  if (oldSide <= 0 && newSide > 0) {mode = 'scaffold'; visit('returned');}
  const moved = Math.hypot(position[0] - before[0], position[2] - before[2]);
  const support = navigator.assess(position);
  if (moved > .001) audit.push({position: [...position], supportTriangleIds: support.supportTriangleIds, valid: support.valid, headClearance: support.headClearance, navigationMs: performance.now() - navigationStarted});
  if (support.valid && support.supportTriangleIds.every(id => id >= 0)) generatedTravel += moved;
  if (mode === 'generated' && moved > .001) trail.push([...position]);
}
async function choose(id: string) {
  const generation = ++epoch; ready = false; representation.disabled = true; navigator = undefined; stop(); current = undefined; scene = undefined; renderer.clear(); generatedTravel = 0; audit = []; blocked = ''; mode = 'inspection';
  try {
    const item = await json<Case>(`/api/passage/cases/${id}`);
    const [sceneBytes, colorBytes] = await Promise.all([verified(item.assets.scene), verified(item.assets.colors)]);
    if (generation !== epoch) return;
    scene = decoded<DisplayScene>(sceneBytes); const colors = decoded<{colors: number[]; source: {scene: {sha256: string}; ply: {sha256: string}}}>(colorBytes);
    if (colors.source.scene.sha256 !== item.assets.scene.sha256 || colors.source.ply.sha256 !== item.assets.ply.sha256) throw new Error('Colors are bound to a different source artifact');
    if (scene.sources.jobId !== item.worldId || scene.sources.glb.sha256 !== item.assets.glb.sha256 || scene.sources.ply.sha256 !== item.assets.ply.sha256) throw new Error('Display geometry and collision belong to different generation artifacts');
    current = item;
    const transform = item.assessment?.transform ?? {...scene.transform, yaw: 0};
    await renderer.install(scene, colors.colors, transform); if (generation !== epoch) return;
    if (item.assessment?.status === 'passed') {
      const glb = await verified(item.assets.glb); if (generation !== epoch) return;
      if (item.assessment.sourceSha256 !== item.assets.glb.sha256) throw new Error('Assessment/source mismatch');
      if (!item.assessment.approachVerified || !item.assessment.approach) throw new Error('Generated approach seam has not passed');
      navigator = createSurfaceNavigator(parsePassageGlb(glb), transform, item.assessment.options, item.assessment.approach);
      entry = [item.assessment.seam[0], item.assessment.seam[1] + 1.65, item.assessment.seam[2]];
      outward = item.assessment.approach.outward; approach = [...item.assessment.approachStart];
      renderer.addScaffold(entry, outward, 1.65, item.assessment.approach.width, item.assessment.approach.length);
    }
    await renderer.representation('coarse', item.assets.ply.url);
    if (generation !== epoch) return;
    ready = true; representation.value = 'coarse'; representation.disabled = false; inspect();
    window.history.replaceState(null, '', `#${id}`); select.value = id;
  } catch (error) {if (generation === epoch) {ready = false; report(error);}}
}
function telemetry() {
  const assessment = current?.assessment, supported = navigator && mode === 'generated' ? navigator.assess(position) : null;
  element<HTMLButtonElement>('approach').disabled = !ready || !navigator;
  element<HTMLButtonElement>('walk').disabled = !ready || !navigator || mode === 'inspection';
  element<HTMLButtonElement>('return').disabled = !ready || mode !== 'generated';
  element('status').textContent = !ready ? 'Loading verified artifacts…' : assessment?.status === 'passed' ? `Accepted generated route · ${mode}` : 'Inspection only · no accepted generated passage';
  const state = {caseId: current?.id, worldId: current?.worldId, ready, mode, position, yaw, pitch, representation: representation.value, assessment: assessment?.status ?? 'not-assessed', generatedTravel, support: supported, blocked, walking, pathRemaining: route.length, visits: current?.visits, pendingVisits: visits.length, errors: errors.length, glbSha256: current?.assets.glb.sha256, identity: current?.identity, audit};
  element('telemetry').dataset.state = JSON.stringify(state); element('telemetry').textContent = `${mode} · ${generatedTravel.toFixed(2)} m on generated support · ${position.map(n => n.toFixed(2)).join(' / ')}${blocked ? ` · blocked: ${blocked}` : ''}`;
  element('record').textContent = JSON.stringify({rawIntent: current?.rawIntent, semantics: current?.semantics, assessment: assessment?.metrics, reasons: assessment?.reasons, visits: current?.visits}, null, 2);
}
select.addEventListener('change', () => void choose(select.value));
representation.addEventListener('change', async () => {try {await renderer.representation(representation.value, current!.assets.ply.url);} catch (error) {report(error);}});
element('overview').addEventListener('click', inspect); element('approach').addEventListener('click', toApproach); element('stop').addEventListener('click', stop);
element('walk').addEventListener('click', () => {if (!current?.assessment || mode !== 'scaffold') return; route = current.assessment.route.map(p => [...p]); walking = 'generated-route';});
element('return').addEventListener('click', () => {if (mode !== 'generated') return; route = [...trail].reverse().concat([[...approach]]); walking = 'return';});
document.addEventListener('keydown', event => {if (['INPUT', 'SELECT'].includes((event.target as HTMLElement)?.tagName)) return; if (event.code === 'Escape') stop(); if (/^(Key[WASD]|Arrow(Left|Right|Up|Down))$/.test(event.code)) {stop(); keys.add(event.code); event.preventDefault();}});
document.addEventListener('keyup', event => keys.delete(event.code)); window.addEventListener('blur', stop);
canvas.addEventListener('pointerdown', event => {dragging = true; canvas.focus(); canvas.setPointerCapture(event.pointerId);}); canvas.addEventListener('pointerup', () => dragging = false); canvas.addEventListener('pointercancel', () => dragging = false);
canvas.addEventListener('pointermove', event => {if (dragging) {yaw -= event.movementX * .12; pitch = Math.max(-80, Math.min(80, pitch - event.movementY * .12));}});
let lastTelemetry = 0;
renderer.app.on('update', (elapsed: number) => {
  const dt = Math.min(elapsed, .05);
  if (route.length) {
    const target = route[0], distance = Math.hypot(target[0] - position[0], target[2] - position[2]);
    if (distance < .01) {route.shift(); if (!route.length) walking = '';}
    else {
      const before = [...position], step = Math.min(distance, dt * 1.5); lookAt([target[0], position[1], target[2]]);
      move([(target[0] - position[0]) / distance * step, 0, (target[2] - position[2]) / distance * step]);
      stalled = Math.hypot(position[0] - before[0], position[2] - before[2]) < .0001 ? stalled + dt : 0;
      if (stalled > 1) {report(`Collision-constrained walk stopped: ${blocked}`); stop();}
    }
  } else {
    yaw += ((keys.has('ArrowLeft') ? 1 : 0) - (keys.has('ArrowRight') ? 1 : 0)) * dt * 65;
    pitch = Math.max(-80, Math.min(80, pitch + ((keys.has('ArrowUp') ? 1 : 0) - (keys.has('ArrowDown') ? 1 : 0)) * dt * 50));
    const forward = Number(keys.has('KeyW')) - Number(keys.has('KeyS')), right = Number(keys.has('KeyD')) - Number(keys.has('KeyA')), length = Math.hypot(forward, right), angle = yaw * Math.PI / 180;
    if (length) move([(-Math.sin(angle) * forward + Math.cos(angle) * right) * dt * 1.5 / length, 0, (-Math.cos(angle) * forward - Math.sin(angle) * right) * dt * 1.5 / length]);
  }
  renderer.pose(position, yaw, pitch); if (performance.now() - lastTelemetry > 200) {lastTelemetry = performance.now(); telemetry();}
});
async function start() {try {const cases = await json<Case[]>('/api/passage/cases'); for (const item of cases) select.add(new Option(item.label, item.id)); const id = decodeURIComponent(location.hash.slice(1)); await choose(cases.find(item => item.id === id)?.id ?? cases[0].id); void saveVisits();} catch (error) {report(error);}}
void start();
