import {apply} from './core.mjs';
const cacheKey='anbar:offline:v12',queueKey='anbar:queue:v12';
const queueStorage=(userId=cached()?.me.id||'anonymous')=>queueKey+':'+userId;
export const cached=()=>{try{return JSON.parse(localStorage.getItem(cacheKey))}catch{return null}};
export const pending=()=>{try{return JSON.parse(localStorage.getItem(queueStorage()))||[]}catch{return []}};
export function saveCache(me,state){try{localStorage.setItem(cacheKey,JSON.stringify({me,state,at:new Date().toISOString()}))}catch{}}
export function clearCache(){localStorage.removeItem(queueStorage());localStorage.removeItem(cacheKey)}
export function enqueue(command){let c=cached();if(!c||!['receive','issue','transfer','count_create'].includes(command.type))throw Error('Offline: this operation requires a connection');let queue=pending();if(queue.some(x=>x.conflict)||queue.length>=100)throw Error('Review the offline queue before adding operations');let simulated=c.state;for(let row of queue)simulated=apply(simulated,row.command,c.me.username);command={...command,expectedRevision:simulated.revision,instanceId:c.state.settings.instanceId};apply(simulated,command,c.me.username);queue.push({id:command.requestId,user:c.me.id,command,at:new Date().toISOString(),conflict:false});localStorage.setItem(queueStorage(),JSON.stringify(queue));return {queued:true,count:queue.length}}
let syncing=false;
export async function syncQueue(){if(syncing)return;syncing=true;try{let c=cached();if(!c)return;const storage=queueStorage(c.me.id);let queue=pending();for(let row of queue){if(row.conflict||row.user!==c.me.id)break;let res;try{res=await fetch('/api/actions',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(row.command)})}catch{break}if(cached()?.me.id!==c.me.id)break;if(!res.ok){row.conflict=true;row.error=res.status===409?'conflict':res.status===401?'signin':'rejected';break}let state=await res.json();queue=queue.filter(x=>x.id!==row.id);localStorage.setItem(storage,JSON.stringify(queue));saveCache(c.me,state)}localStorage.setItem(storage,JSON.stringify(queue))}finally{syncing=false}}
export function discardQueued(id){localStorage.setItem(queueStorage(),JSON.stringify(pending().filter(x=>x.id!==id)))}


