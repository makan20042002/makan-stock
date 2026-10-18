import test from 'node:test';import assert from 'node:assert/strict';import {spawn} from 'node:child_process';import {mkdtempSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
async function start(dir){const child=spawn(process.execPath,['src/server.mjs'],{cwd:root,env:{...process.env,PORT:'0',ANBAR_DATA:dir},stdio:'pipe'});let output='',port;child.stdout.on('data',b=>{output+=b;port=output.match(/127.0.0.1:(\d+)/)?.[1]});child.stderr.on('data',b=>output+=b);const exited=new Promise(r=>child.once('exit',r));for(let i=0;i<100&&!port;i++)await new Promise(r=>setTimeout(r,50));if(!port){child.kill();throw Error(output)}return {base:'http://127.0.0.1:'+port,stop:async()=>{child.kill();await exited}}}
test('real HTTP setup, RBAC, keys, backup/restore, audit and restart persistence',async()=>{const dir=mkdtempSync(path.join(tmpdir(),'anbar-portable-'));let srv=await start(dir),cookie;
const get=async p=>fetch(srv.base+'/api/'+p,{headers:cookie?{cookie}:{}}),post=async(p,b={},c=cookie)=>fetch(srv.base+'/api/'+p,{method:'POST',headers:{'content-type':'application/json',...(c?{cookie:c}:{})},body:JSON.stringify(b)});
try{
assert.equal((await get('state')).status,401);assert.equal((await(await get('health')).json()).setup,true);
let r=await post('setup',{username:'owner',name:'Owner',password:'temporary-test-password',company:'QA',demo:true});assert.equal(r.status,200);cookie=r.headers.get('set-cookie').split(';')[0];assert.equal((await post('setup',{})).status,409);
let b=await(await get('backup')).json(),s=await(await get('state')).json();assert.equal(s.products.length,5);
assert.equal((await post('preferences',{lang:'fa',theme:'dark',mode:'pro',calendar:'persian',zone:'Asia/Tehran'})).status,200);
assert.equal((await(await get('preferences')).json()).theme,'dark');
let system=await(await get('system')).json();assert.equal(system.localOnly,true);assert.equal(system.dataPath,dir);
let a={type:'receive',product:'p1',warehouse:'w1',qty:3,requestId:'test-key'};r=await post('actions',a);assert.equal(r.status,200);let first=await r.json();assert.deepEqual(await(await post('actions',a)).json(),first);assert.equal((await post('actions',{...a,qty:4})).status,400);
assert.equal((await fetch(srv.base+'/api/actions',{method:'POST',headers:{cookie,origin:'https://invalid.example'},body:'{}'})).status,403);
assert.equal((await post('users',{username:'viewer',name:'Viewer',role:'viewer',password:'temporary-view-password',warehouses:['w2']})).status,200);
let login=await post('login',{username:'viewer',password:'temporary-view-password'},null),viewer=login.headers.get('set-cookie').split(';')[0];assert.equal((await post('actions',{type:'receive',warehouse:'w2',product:'p1',qty:1},viewer)).status,403);
let view=await(await fetch(srv.base+'/api/state',{headers:{cookie:viewer}})).json();assert.ok(view.stock.every(b=>b.warehouse==='w2'));assert.equal(view.audit.length,0);
assert.equal((await fetch(srv.base+'/api/system',{headers:{cookie:viewer}})).status,403);
let users=await(await get('users')).json(),user=users.find(u=>u.username==='viewer');let key=await(await post('keys',{userId:user.id,name:'read-test',scope:'read'})).json();assert.ok(key.token);
assert.equal((await fetch(srv.base+'/api/v1/stock',{headers:{authorization:'Bearer '+key.token}})).status,200);assert.equal((await fetch(srv.base+'/api/v1/actions',{method:'POST',headers:{authorization:'Bearer '+key.token},body:JSON.stringify(a)})).status,403);
let bad=structuredClone(b);bad.state.stock[0].qty=-1;assert.equal((await post('restore',{backup:bad,password:'temporary-test-password'})).status,400);
assert.equal((await post('restore',{backup:b,password:'temporary-test-password'})).status,200);assert.equal((await(await get('state')).json()).stock[0].qty,s.stock[0].qty);
assert.equal((await post('snapshot')).status,200);assert.equal((await(await get('audit/verify')).json()).ok,true);
assert.equal((await post('hooks',{url:'http://127.0.0.1/'})).status,400);assert.equal((await post('hooks',{url:'https://127.0.0.1/'})).status,400);
await srv.stop();srv=await start(dir);assert.equal((await(await get('state')).json()).settings.company,'QA');assert.equal((await(await get('audit/verify')).json()).ok,true);
assert.equal((await(await get('preferences')).json()).theme,'dark');
assert.equal((await post('logout')).status,200);assert.equal((await get('state')).status,401);
}finally{await srv.stop();rmSync(dir,{recursive:true,force:true})}});
