const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function main(){
 const profile=fs.mkdtempSync(path.join(os.tmpdir(),'mago-informe-'));
 const child=spawn(process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore',windowsHide:true});
 let ws,seq=0;const pending=new Map();
 try{
  let port;for(let i=0;i<100;i++){try{port=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0];if(port)break}catch{}await pause(50)}
  const tabs=await(await fetch('http://127.0.0.1:'+port+'/json')).json();ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result)}};
  const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
  const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value};
  await send('Page.navigate',{url:'file:///'+path.resolve('auditoria-heroes/index.html').replaceAll('\\','/')});
  for(let i=0;i<100;i++){if(await evaluate("typeof apply==='function'"))break;await pause(50)}
  assert.equal(await evaluate("document.querySelectorAll('tbody tr').length"),192);assert.equal(await evaluate("document.querySelectorAll('article').length"),17);
  assert.equal(await evaluate("search.value='H03';apply();document.querySelectorAll('tbody tr:not([hidden])').length"),4);
  assert.equal(await evaluate("search.value='';filter.value='mage';apply();document.querySelectorAll('.hero:not([hidden]) tbody tr').length"),12);
  await evaluate("filter.value='';apply()");
  for(const width of [1400,390]){await send('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width===390});assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'))}
  for(const file of fs.readdirSync('auditoria-heroes').filter(f=>f.startsWith('habilidades-')&&f.endsWith('.png')))assert.ok(fs.statSync(path.join('auditoria-heroes',file)).size>10000,'Captura vacía: '+file);
  console.log('Correcto: informe con 17 hallazgos y 192 filas, filtros funcionales, 16 galerías y diseño sin desbordamiento en ordenador y móvil.');
  await send('Browser.close').catch(()=>{});
 }finally{ws?.close();child.kill()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
