import {execFileSync} from 'node:child_process';
const issues=JSON.parse(execFileSync('gh',['issue','list','--state','all','--limit','100','--label','ticket','--json','number,title,body,state,assignees'],{encoding:'utf8'}));
const closed=new Set(issues.filter(i=>i.state==='CLOSED').map(i=>i.number));
const frontier=issues.filter(i=>i.state==='OPEN').filter(i=>{
const block=i.body.split('## Blocked by')[1]??'';
return [...block.matchAll(/#(\d+)/g)].every(m=>closed.has(Number(m[1])));
});
console.log(JSON.stringify(frontier.map(({number,title,assignees})=>({number,title,claimed:assignees.length>0})),null,2));
