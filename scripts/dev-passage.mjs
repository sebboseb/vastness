import {spawn} from 'node:child_process';
const children=[spawn(process.execPath,['node_modules/tsx/dist/cli.mjs','services/passage-prototype/server.ts'],{stdio:'inherit'}),spawn(process.execPath,['node_modules/vite/bin/vite.js','apps/web','--config','apps/web/vite.generated-passage.config.ts'],{stdio:'inherit'})];
let stopping=false;
function stop(code=0){if(stopping)return;stopping=true;for(const child of children)child.kill('SIGINT');setTimeout(()=>process.exit(code),1000).unref();}
for(const child of children)child.once('exit',code=>stop(code??0));process.once('SIGINT',()=>stop());process.once('SIGTERM',()=>stop());
