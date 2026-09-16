import {test} from 'node:test';
import assert from 'node:assert/strict';
import {shardCandidates,claimShard} from './runner-parallel.ts';
import {mkdtempSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
test('CPU shards partition every candidate exactly once in stable cohort order',()=>{
 const cohort=Array.from({length:36},(_,id)=>({id}));
 for(const count of [1,2,3]){
  const shards=Array.from({length:count},(_,i)=>shardCandidates(cohort,count,i));
  const all=shards.flat();
  assert.equal(new Set(all).size,36);
  assert.deepEqual(all.sort((a,b)=>a.id-b.id),cohort);
  for(const shard of shards)assert.deepEqual(shard.map(x=>x.id),shard.map(x=>x.id).sort((a,b)=>a-b));
 }
});
test('invalid CPU shard requests fail instead of silently dropping the cohort',()=>{
 for(const [count,index]of [[0,0],[4,0],[3,3],[3,-1],[2,0.5],[NaN,0]])assert.throws(()=>shardCandidates([1,2,3],count,index));
});
test('a live duplicate cannot steal a shard or alter its lock; release permits resume',()=>{
 const dir=mkdtempSync(join(tmpdir(),'vastness-shard-')),path=join(dir,'0.lock');
 try{const release=claimShard(path);assert.throws(()=>claimShard(path),/already running/);assert.ok(existsSync(path));release();const next=claimShard(path);next();assert.equal(existsSync(path),false);}finally{rmSync(dir,{recursive:true,force:true});}
});
