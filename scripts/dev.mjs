import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const cwd=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const children=[];
let stopping=false;
function stop(code=0){if(stopping)return;stopping=true;for(const child of children)child.kill('SIGTERM');setTimeout(()=>process.exit(code),300).unref();}
process.on('SIGINT',()=>stop());process.on('SIGTERM',()=>stop());
const fixture=spawn(process.execPath,['--import','tsx','scripts/create-fixtures.ts'],{cwd,stdio:'inherit'});
const [status]=await once(fixture,'exit');
if(status!==0)process.exit(status??1);
for(const args of [['--import','tsx','services/orchestrator/src/index.ts'],['node_modules/vite/bin/vite.js','apps/web','--host','127.0.0.1','--port','5173','--strictPort']]){
 const child=spawn(process.execPath,args,{cwd,stdio:'inherit'});children.push(child);
 child.on('exit',code=>{if(!stopping)stop(code??1)});
}
console.log('\nVastness → http://127.0.0.1:5173 · Ctrl+C stops both services\n');
