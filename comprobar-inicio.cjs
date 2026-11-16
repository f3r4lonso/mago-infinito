const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function main(){
 const profile=fs.mkdtempSync(path.join(os.tmpdir(),'mago-inicio-'));
 const chrome=process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe';
 const browser=spawn(chrome,['--headless','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore',windowsHide:true});
 let ws,seq=0;const pending=new Map(),errors=[];
 try{
  let port;
  for(let i=0;i<100;i++){try{port=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0];if(port)break}catch{}await pause(100)}
  assert.ok(port,'Chrome no publicó el puerto de pruebas');
  const targets=await(await fetch('http://127.0.0.1:'+port+'/json')).json();
  ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
  ws.onmessage=event=>{const m=JSON.parse(event.data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result)}};
  const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
  const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value};
  await send('Runtime.enable');
  for(const viewport of [{width:1500,height:1000},{width:390,height:844},{width:360,height:640},{width:844,height:390}]){
   await send('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:viewport.width<700});
   await send('Page.navigate',{url:'file:///'+path.resolve('index.html').replaceAll('\\','/')});
   for(let i=0;i<100;i++){if(await evaluate('typeof G!=="undefined"&&G?.modal==="start"'))break;await pause(50)}
   assert.equal(await evaluate('G.modal'),'start');
   const result=await evaluate(`(async()=>{
    const check=(ok,msg)=>{if(!ok)throw Error(msg)};
    const card=document.querySelector('.start-card');
    check(card.scrollWidth<=card.clientWidth+1,'Inicio desborda horizontalmente');
    const rect=card.getBoundingClientRect();check(rect.top>=0&&rect.bottom<=innerHeight+1,'Inicio fuera de pantalla');
    document.querySelector('#modeTeam').click();check(document.querySelectorAll('.hcard.on').length===4,'Equipo inicial');
    document.querySelector('#play1').click();check(document.querySelectorAll('.hcard.on').length===1,'Sobran héroes al elegir uno');
    check(document.querySelectorAll('.party-slot').length===1,'Sobran puestos en modo individual');
    document.querySelector('.hcard[aria-label="'+HEROES.monk.n+'"]').click();check(selHero==='monk','Selección individual');
    document.querySelector('#modeTeam').click();check(document.querySelectorAll('.hcard.on').length===4,'Se perdió el equipo');
    document.querySelector('#play1').click();
    for(const id of ['mapa1','mapa2']){
     document.querySelector('[data-map="'+id+'"]').click();
     for(let i=0;i<100&&!FOREST_TEXTURE.ready;i++)await new Promise(r=>setTimeout(r,40));
     for(let i=0;i<100&&!FOREST_TEXTURE.portraitReady;i++)await new Promise(r=>setTimeout(r,40));
     check(FOREST_TEXTURE.ready&&FOREST_TEXTURE.portraitReady,'No cargan ambas imágenes de '+id);
     for(const portrait of [false,true]){
      const used=[],g={createRadialGradient:()=>({addColorStop(){}}),fillRect(){},save(){},restore(){},translate(){},scale(){},drawImage(img){used.push(img.src)}};
      paintBattlefield(g,portrait?600:1000,portrait?1000:600,300,300);
      check(used.length===9&&used.every(src=>src.endsWith(BATTLE_MAPS[id][portrait?'mobile':'desktop'])),'Variante incorrecta '+id);
     }
    }
    document.querySelector('#play').click();check(G.one&&G.heroes.length===1&&G.hero==='monk','Partida con un héroe');check(G.mapId==='mapa2','Mapa de partida');
    const togglePanel=document.querySelector('#panelToggle');
    const restHeight=document.querySelector('#game').getBoundingClientRect().height;
    togglePanel.click();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    check(getComputedStyle(document.querySelector('#bottomp')).display==='none'&&G.paused,'Ocultar panel en descanso');
    check(document.querySelector('#game').getBoundingClientRect().height>restHeight+20,'Más espacio al ocultar panel normal');
    check(togglePanel.getAttribute('aria-expanded')==='false','Botón recuperable');
    togglePanel.click();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));check(getComputedStyle(document.querySelector('#bottomp')).display!=='none'&&G.paused,'Recuperar panel en descanso');
    check(getComputedStyle(document.querySelector('#heroSec2')).display==='none','Panel de héroe extra visible');
    showStart();document.querySelector('#modeTeam').click();document.querySelector('#play').click();check(!G.one&&!G.solo&&G.heroes.length===4,'Partida de equipo');
    showStart();document.querySelector('#solo').click();check(document.querySelectorAll('.hcard.on').length===1,'Selección de prueba');document.querySelector('#play').click();check(G.solo&&G.soloWeak&&G.heroes.length===1,'Modo prueba');
    const options=document.querySelector('#soloTestOptions');check(!options.open&&G.noSpawn,'Ajustes cerrados y campo tranquilo');
    const choice=document.querySelector('#soloTestChoice'),play=document.querySelector('#soloTestPlay');
    check(choice.options.length===CLS[G.hero].length+5,'Selector de golpes, habilidades y animaciones');
    check(document.querySelector('#soloLevelControl').hidden,'El básico no necesita selector de nivel');
    play.click();check(G.soloTestRunning&&soloPowerEnabled('basic'),'Probar golpe básico');play.click();check(!G.soloTestRunning&&!soloPowerEnabled('basic'),'Detener prueba');
    const skill=CLS[G.hero][0];choice.value=skill.id;choice.dispatchEvent(new Event('change'));
    check(!document.querySelector('#soloLevelControl').hidden,'Nivel de habilidad visible');
    G.pending=0;G.xp=0;document.querySelector('#soloLevelUp').click();check(learnedClv(skill.id)===1&&G.pending===0&&G.xp===0,'Subir sin experiencia');
    const levelInput=document.querySelector('#soloSkillLevel');levelInput.value='42';levelInput.dispatchEvent(new Event('change'));check(learnedClv(skill.id)===42,'Nivel directo');
    play.click();check(clv(skill.id)===42&&soloPowerEnabled('basic')&&CLS[G.hero].filter(s=>s.id!==skill.id).every(s=>!soloPowerEnabled(s.id)),'Habilidad con golpes de apoyo');play.click();
    options.open=true;
    const support=document.querySelector('#soloSupportBasic');support.click();play.click();check(!soloPowerEnabled('basic')&&clv(skill.id)===42,'Habilidad sin ataque básico');play.click();support.click();
    const enemyMode=document.querySelector('#soloEnemyMode');enemyMode.value='progressive';enemyMode.dispatchEvent(new Event('change'));check(!G.soloWeak&&!G.noSpawn,'Modo progresivo');enemyMode.value='none';enemyMode.dispatchEvent(new Event('change'));check(G.noSpawn,'Detener apariciones');
    const fold=document.querySelector('#soloItemsFold');check(!fold.open&&fold.contains(document.querySelector('#invSec')),'Objetos ocultos en desplegable');fold.open=true;check(document.querySelector('#invSec').getBoundingClientRect().height>0,'Abrir objetos');fold.open=false;
    choice.value='anim:attack';choice.dispatchEvent(new Event('change'));play.click();check(G.paused&&G.soloAnimation==='attack','Previsualizar ataque');
    const direction=document.querySelector('#soloAnimDirection');direction.value=String(Math.PI);direction.dispatchEvent(new Event('change'));check(soloAnimationPose().state.face===-1,'Dirección de animación');
    const speed=document.querySelector('#soloAnimSpeed');speed.value='0.5';speed.dispatchEvent(new Event('change'));check(G.soloAnimSpeed===.5,'Velocidad de animación');
    play.click();check(!G.soloTestRunning,'Detener animación');
    check(document.querySelector('#bottomp').scrollWidth<=document.querySelector('#bottomp').clientWidth+1,'Panel test desborda');
    document.querySelector('#bottomp').scrollTop=0;
    options.open=false;choice.value=skill.id;choice.dispatchEvent(new Event('change'));play.click();
    const testHeight=document.querySelector('#game').getBoundingClientRect().height;
    const testChoice=G.soloTestChoice,testLevel=learnedClv(testChoice);togglePanel.click();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    check(getComputedStyle(document.querySelector('#bottomp')).display==='none'&&G.soloTestRunning,'Ocultar sin detener prueba');
    check(document.querySelector('#game').getBoundingClientRect().height>testHeight+20,'Más espacio en test');
    const toggleRect=togglePanel.getBoundingClientRect();check(toggleRect.bottom<=innerHeight&&toggleRect.top>=0,'Mostrar panel accesible');
    togglePanel.click();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    check(G.soloTestChoice===testChoice&&learnedClv(testChoice)===testLevel,'Conservar prueba al mostrar panel');
    check(Math.abs(document.querySelector('#game').getBoundingClientRect().height-testHeight)<2,'Restaurar tamaño de campo');
    const visibleButtons=Array.from(document.querySelectorAll('#bottomp button')).filter(b=>!b.classList.contains('solo-pw')&&!b.closest('details:not([open])')&&b.getClientRects().length&&b.offsetHeight>0);   // la rejilla de poderes (.solo-pw) es la función de prueba rápida y no cuenta
    check(document.querySelectorAll('#soloGrid .solo-pw').length===CLS[G.hero].length+1,'Rejilla con un botón por poder y el básico');
    check(visibleButtons.length<=4,'Demasiados botones visibles: '+visibleButtons.map(b=>b.textContent).join(', '));
    check(document.querySelector('#soloTestPlay').getBoundingClientRect().bottom<=innerHeight,'Botón principal fuera de pantalla');
    G.soloAnimTime=.12;
    return{modeSwitch:true,maps:true,variants:true,launches:true,noOverflow:true,testControls:true};
   })()`);
   await pause(150);
   const testShot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(os.tmpdir(),'mago-test-'+viewport.width+'.png'),Buffer.from(testShot.data,'base64'));
   await evaluate("newGame('mage');if(document.querySelector('#invSec').parentElement.id!=='bottomp')throw Error('No se restauró el inventario normal');showStart();document.querySelector('#modeTeam').click();document.querySelector('.start-card').scrollTop=0;");
   await pause(100);
   const shot=await send('Page.captureScreenshot',{format:'png'});
   const screenshot=path.join(os.tmpdir(),'mago-inicio-'+viewport.width+'.png');fs.writeFileSync(screenshot,Buffer.from(shot.data,'base64'));
   console.log(JSON.stringify({viewport,...result,screenshot}));
  }
  assert.deepEqual(errors,[],'Errores en navegador');
  await send('Browser.close').catch(()=>{});
 }finally{ws?.close();browser.kill()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
