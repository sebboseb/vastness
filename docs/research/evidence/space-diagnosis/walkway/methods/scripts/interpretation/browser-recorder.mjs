/** Drives only the existing visible inspection controls; telemetry is read-only DOM evidence. */
export function createInterpretationRecorder(tab, fs, data, baseUrl) {
 const read = () => tab.playwright.evaluate(() => JSON.parse(document.querySelector('#telemetry').getAttribute('data-state')));
 const wait = async (field, value) => {
  for (let n = 0; n < 15; n++) {
   try {await tab.playwright.locator(`#telemetry[data-state*='"${field}":${JSON.stringify(value)}']`).waitFor({state:'visible',timeoutMs:3000}); return;}
   catch (e) {if (!/deadline|timed out/i.test(String(e))) throw e;}
  }
  throw Error(`Bounded browser wait exceeded for ${field}`);
 };
 async function run(id) {
  const dir = data + '/candidates/' + id, out = dir + '/browser';
  try {await fs.access(out + '/returned.json'); throw Error('Browser attempt already recorded: ' + id);} catch(e) {if(e.code !== 'ENOENT') throw e;}
  await tab.goto(baseUrl + '?interpretation=' + id + '#' + id); await wait('ready', true);
  const init = await read(); if (init.caseId !== id || init.errors || init.mode !== 'inspection') throw Error('Unclean inspection start');
  await fs.mkdir(out, {recursive:true});
  await fs.writeFile(out + '/overview.json', JSON.stringify(init, null, 2));
  await fs.writeFile(out + '/overview.png', await tab.screenshot({fullPage:false}));
  if (init.assessment !== 'passed') return {id,status:'not-eligible'};
  await tab.playwright.getByRole('button',{name:'Approach',exact:true}).click();
  await tab.playwright.getByRole('button',{name:'Walk generated route',exact:true}).click();
  await wait('walking','generated-route'); await wait('walking',''); await wait('pendingVisits',0);
  const forward = await read();
  await fs.writeFile(out + '/forward.json', JSON.stringify(forward,null,2));
  await fs.writeFile(out + '/forward.png', await tab.screenshot({fullPage:false}));
  if (forward.mode === 'generated') {
   await tab.playwright.getByRole('button',{name:'Return',exact:true}).click();
   await wait('walking','return'); await wait('walking',''); await wait('pendingVisits',0);
  }
  const returned = await read();
  await fs.writeFile(out + '/returned.json',JSON.stringify(returned,null,2));
  await fs.writeFile(out + '/returned.png',await tab.screenshot({fullPage:false}));
  return {id,scale:(JSON.parse(await fs.readFile(dir+'/selected-assessment.json','utf8'))).transform.scale,travel:forward.generatedTravel,mode:forward.mode,returnMode:returned.mode,blocked:forward.blocked,errors:returned.errors};
 }
 return {run,read,wait};
}
