import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {fork,spawn} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),file=path.join(root,'data','running.json');
const open=port=>{if(process.argv.includes('--no-browser')||process.env.ANBAR_NO_BROWSER==='1')return;const url='http://127.0.0.1:'+port;spawn('rundll32.exe',['url.dll,FileProtocolHandler',url],{detached:true,stdio:'ignore',windowsHide:true}).unref()};
let running;try{running=JSON.parse(fs.readFileSync(file,'utf8'));let r=await fetch('http://127.0.0.1:'+running.port+'/api/health',{signal:AbortSignal.timeout(2000)});if(!(await r.json()).version?.endsWith('portable'))running=null}catch{running=null}
if(process.argv.includes('--stop')){if(running){let r=await fetch('http://127.0.0.1:'+running.port+'/api/shutdown',{method:'POST',headers:{'x-stop-secret':running.secret}});if(!r.ok)throw Error('Could not stop the server');console.log('انباروان متوقف شد.')}else console.log('انباروان در حال اجرا نیست.');process.exit(0)}
if(running){console.log('AnbarOne: http://127.0.0.1:'+running.port);open(running.port);process.exit(0)}
fs.mkdirSync(path.join(root,'data'),{recursive:true});const log=fs.openSync(path.join(root,'data','server.log'),'a');
let preferredPort='0';try{preferredPort=String(JSON.parse(fs.readFileSync(path.join(root,'data','port.json'),'utf8')).port||0)}catch{}
const child=fork(path.join(root,'src','server.mjs'),[],{cwd:root,detached:true,windowsHide:true,execPath:process.execPath,stdio:['ignore',log,log,'ipc'],env:{...process.env,PORT:preferredPort}});
const ready=await new Promise((resolve,reject)=>{let timer=setTimeout(()=>reject(Error('Start timed out. See data/server.log')),15000);child.once('message',m=>{clearTimeout(timer);resolve(m)});child.once('error',reject);child.once('exit',code=>reject(Error('Server exited ('+code+'). See data/server.log')))});
child.disconnect();child.unref();fs.closeSync(log);console.log('AnbarOne: http://127.0.0.1:'+ready.port);open(ready.port);
