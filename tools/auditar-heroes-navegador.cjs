const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto'),{spawn}=require('node:child_process');
const pause=ms=>new Promise(r=>setTimeout(r,ms)),out=path.resolve('auditoria-heroes');fs.mkdirSync(out,{recursive:true});
async function main(){
 const root=process.cwd(),server=require('node:http').createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent((req.url||'/').split('?')[0]));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}
  try{const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg'};res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.writeHead(404);res.end()}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const profile=fs.mkdtempSync(path.join(os.tmpdir(),'mago-auditoria-'));
 const browser=spawn(process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore',windowsHide:true});
 let ws,seq=0;const pending=new Map(),errors=[];
 try{
  let port;for(let i=0;i<100;i++){try{port=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0];if(port)break}catch{}await pause(100)}
  if(!port)throw Error('Chrome no inició CDP');
  const tabs=await(await fetch('http://127.0.0.1:'+port+'/json')).json();ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result)}};
  const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
  const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value};
  const png=(name,url)=>fs.writeFileSync(path.join(out,name),Buffer.from(url.split(',')[1],'base64'));
  await send('Runtime.enable');await send('Emulation.setDeviceMetricsOverride',{width:1400,height:1000,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:'http://127.0.0.1:'+server.address().port+'/index.html'});
  for(let i=0;i<120;i++){if(await evaluate('typeof G!=="undefined"&&typeof SPR!=="undefined"&&Object.values(SPR.packs).every(p=>[p.game,p.ui].filter(Boolean).every(a=>a.ok))'))break;await pause(100)}
  await evaluate(fs.readFileSync('tools/escenarios-auditoria.js','utf8'));
  const catalog=await evaluate('HeroAudit.catalog()');
  const assets=await evaluate(`(()=>{
   const data={packs:[],heroes:[],duplicates:[],invalidRectangles:[]},known=new Map();
   for(const [name,p] of Object.entries(SPR.packs))for(const at of ['game','ui']){const a=p[at];if(!a)continue;data.packs.push({name,atlas:at,path:a.img,ok:a.ok,width:a.im.naturalWidth,height:a.im.naturalHeight,declared:[a.w,a.h]});
    for(const [id,r] of Object.entries(a.s)){if(known.has(id))data.duplicates.push({id,first:known.get(id),last:name});known.set(id,name);if(r[0]<0||r[1]<0||r[0]+r[2]>a.im.naturalWidth||r[1]+r[3]>a.im.naturalHeight)data.invalidRectangles.push({name,id,rect:r})}}
   for(const hero of Object.keys(HEROES)){const m=SPR.heroMeta(hero);data.heroes.push({hero,meta:m,idle:m?SPR.has(m.idle):SPR.has('hero'),attack:m?SPR.has(m.atk):SPR.has('hero')})}return data;
  })()`);
  await evaluate(`globalThis.auditOverview=document.createElement('canvas');auditOverview.width=900;auditOverview.height=HeroAudit.catalog().length*155;globalThis.auditPoseContext=auditOverview.getContext('2d');`);
  const results=[];
  for(let heroIndex=0;heroIndex<catalog.length;heroIndex++){
   const hero=catalog[heroIndex];
   const data=await evaluate(`(()=>{
    const hero=${JSON.stringify(hero.id)},heroIndex=${heroIndex},missing={},originalSpriteDraw=SPR.draw;
    SPR.draw=function(c,id,...args){if(!SPR.has(id))missing[id]=(missing[id]||0)+1;return originalSpriteDraw.call(this,c,id,...args)};
    const pose=document.createElement('canvas');pose.width=800;pose.height=720;const p=pose.getContext('2d');p.fillStyle='#171327';p.fillRect(0,0,800,720);
    const modes=['idle','walk','attack','hurt'],aims=[0,Math.PI,-Math.PI/2,Math.PI/2],faces=['Derecha','Izquierda','Arriba','Abajo'];
    const poseErrors=[];
    SOLO_NEXT=true;newGame(hero);G.soloAnimation='auto';G.noSpawn=true;G.paused=true;setZoom(1);resize();
    for(let row=0;row<4;row++)for(let col=0;col<4;col++){
     const x=col*200,y=row*180;p.fillStyle='#262037';p.fillRect(x+2,y+2,196,176);p.fillStyle='#eee';p.font='12px Segoe UI';p.fillText(modes[row]+' · '+faces[col],x+8,y+18);
     G.soloAnimation=modes[row];G.soloAnimAim=aims[col];G.soloAnimTime=.13;
     try{const a=soloAnimationPose();drawHeroOn(p,x+100,y+130,hero,a.time,a.aim,1.25,a.state)}catch(e){poseErrors.push(String(e))}
    }
    const overview=auditPoseContext;overview.fillStyle=heroIndex%2?'#231b31':'#181321';overview.fillRect(0,heroIndex*155,900,155);overview.fillStyle='#fff';overview.font='13px Segoe UI';overview.fillText(HEROES[hero].n,8,heroIndex*155+18);
    for(let i=0;i<4;i++)overview.drawImage(pose,0,i*180,200,180,150+i*180,heroIndex*155,170,153);
    const sheet=document.createElement('canvas');sheet.width=1440;sheet.height=1200;const c=sheet.getContext('2d');c.fillStyle='#151120';c.fillRect(0,0,1440,1200);
    const runs=[],diagnostics=[];
    for(let n=0;n<CLS[hero].length;n++){
     const skill=CLS[hero][n],x=(n%4)*360,y=Math.floor(n/4)*400;
     c.fillStyle='#fff';c.font='bold 12px Segoe UI';c.fillText(skill.n.slice(0,48),x+6,y+17);c.font='11px Segoe UI';c.fillStyle='#bfb2d1';c.fillText(skill.id+' · Nv20',x+6,y+33);
     for(let j=0;j<2;j++){
      const before={...missing};let best=-1;const capture=document.createElement('canvas');capture.width=350;capture.height=160;const g=capture.getContext('2d');
      const r=HeroAudit.run(hero,skill.id,20,{lab:j===0,duration:8,onFrame:(frame)=>{
       if(![6,20,40,80,140].includes(frame))return;
       const score=G.fx.length+G.projs.length*2+G.allies.length*3+(G.ht.field?10:0)+(G.ht.chemicals?.length||0)*5;
       if(score>best){best=score;G.soloAnimation='auto';G.paused=true;resize();draw();const d=cv.width/W;g.clearRect(0,0,350,160);g.drawImage(cv,(cx()-115)*d,(cy()-80)*d,350*d,160*d,0,0,350,160);if(n===0&&j===0)diagnostics.push({W,H,dpr,cv:[cv.width,cv.height],xy:[cx(),cy()],alpha:g.getImageData(175,80,1,1).data[3]})}
      }});
      c.drawImage(capture,x+5,y+54+j*170);c.fillStyle='#bfb2d1';c.fillText(j===0?'Panel: objetivos inmóviles':'Combate: blancos y daño recibidos',x+6,y+48+j*170);
      r.missingSprites=Object.fromEntries(Object.entries(missing).filter(([k,v])=>v>(before[k]||0)).map(([k,v])=>[k,v-(before[k]||0)]));runs.push(r);
     }
    }
    SPR.draw=originalSpriteDraw;return{hero,poseErrors,missing,runs,diagnostics,poses:pose.toDataURL('image/png'),sheet:sheet.toDataURL('image/png')};
   })()`);
   png('poses-'+hero.id+'.png',data.poses);png('habilidades-'+hero.id+'.png',data.sheet);delete data.poses;delete data.sheet;results.push(data);
   console.log(hero.id+': galería de 12 habilidades y 16 poses · '+Object.keys(data.missing).length+' sprites solicitados no disponibles');
  }
  png('poses-resumen.png',await evaluate('auditOverview.toDataURL("image/png")'));
  const visualProofs=await evaluate(`(()=>{
   const rows=[['druid','u_bear','bearOn'],['werewolf','w_moon','wolfOn'],['demon','z_meta','metaOn'],['devourer','pb_colossal','']];
   const board=document.createElement('canvas');board.width=750;board.height=rows.length*190;const b=board.getContext('2d'),proofs=[];
   const make=hero=>{const c=document.createElement('canvas');c.width=220;c.height=170;const g=c.getContext('2d');drawHeroOn(g,110,122,hero,.13,0,1.25,{run:0,atk:0,u:-1,n:0,since:9,face:1,vx:0,hurt:0});return c};
   for(let i=0;i<rows.length;i++){
    const [hero,id,flag]=rows[i];SOLO_NEXT=true;newGame(hero);G.cls[id]=flag?20:0;G.tv++;recalc();G.ht[flag]=0;const inactive=make(hero);
    if(flag)G.ht[flag]=10;else{G.cls[id]=50;G.tv++;recalc()}
    const active=make(hero),enabled=SPR.enabled;SPR.enabled=false;const vector=make(hero);SPR.enabled=enabled;
    proofs.push({hero,id,spriteBodyIdentical:inactive.toDataURL()===active.toDataURL(),formFactor:heroForm(hero)});
    for(const [n,c] of [[0,inactive],[1,active],[2,vector]]){b.fillStyle='#21192e';b.fillRect(n*250,i*190,248,188);b.drawImage(c,n*250+15,i*190+20);b.fillStyle='#fff';b.font='12px Segoe UI';b.fillText(hero+' · '+['Inactivo','Activo (PNG)','Activo (vector)'][n],n*250+8,i*190+15)}
   }
   const directions=[];for(const hero of Object.keys(HEROES)){SOLO_NEXT=true;newGame(hero);const images=[];for(const angle of [0,-Math.PI/2,Math.PI/2]){G.soloAnimation='attack';G.soloAnimTime=.13;G.soloAnimAim=angle;const p=soloAnimationPose(),c=document.createElement('canvas');c.width=c.height=180;drawHeroOn(c.getContext('2d'),90,125,hero,p.time,p.aim,1.25,p.state);images.push(c.toDataURL())}directions.push({hero,rightEqualsUp:images[0]===images[1],upEqualsDown:images[1]===images[2]})}
   SOLO_NEXT=true;newGame('assassin');G.ht.hideOn=0;const visible=make('assassin');G.ht.hideOn=10;const hidden=make('assassin');const invisibility={bodyIdentical:visible.toDataURL()===hidden.toDataURL()};
   SOLO_NEXT=true;newGame('mage');G.cls.i_field=20;G.tv++;recalc();HeroAudit.targets();G.ht.i_field=0;updateHero(.01);const patch=G.fx.find(f=>f.id==='frostpatch');G.bx+=150;G.t+=.05;updateHero(.05);const field={patchX:patch?.x,heroX:cx(),damageCenterX:G.ht.field?.x,offset:patch?cx()-patch.x:null};
   return{forms:proofs,directions,invisibility,field,image:board.toDataURL('image/png')};
  })()`);
  png('formas-comparacion.png',visualProofs.image);delete visualProofs.image;
  const ui=[];
  for(const viewport of [{width:1400,height:1000},{width:390,height:844},{width:360,height:640},{width:844,height:390}]){
   await send('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:viewport.width<700});
   const row=await evaluate(`(()=>{
    const issues=[];for(const hero of Object.keys(HEROES)){
     startSolo(hero);resize();const panel=$('#bottomp');
     for(const skill of CLS[hero]){selectSoloTest(skill.id);const button=$('#soloTestPlay'),r=button.getBoundingClientRect();if(panel.scrollWidth>panel.clientWidth+1)issues.push({hero,skill:skill.id,issue:'horizontal overflow'});if(r.bottom>innerHeight||r.top<0)issues.push({hero,skill:skill.id,issue:'play outside viewport'});const hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);if(hit!==button)issues.push({hero,skill:skill.id,issue:'play obstructed',hit:hit?.id||hit?.tagName})}
    }return{width:innerWidth,height:innerHeight,issues};
   })()`);ui.push(row);const shot=await send('Page.captureScreenshot',{format:'png'});png('ui-'+viewport.width+'.png','data:image/png;base64,'+shot.data);
  }
  fs.writeFileSync(path.join(out,'navegador.json'),JSON.stringify({date:new Date().toISOString(),sha256:crypto.createHash('sha256').update(fs.readFileSync('index.html')).digest('hex'),assets,visualProofs,errors,ui,results},null,2));
  console.log(JSON.stringify({heroes:results.length,skills:results.reduce((n,h)=>n+h.runs.length/2,0),runtimeErrors:errors.length,uiIssues:ui.reduce((n,v)=>n+v.issues.length,0),invalidRectangles:assets.invalidRectangles.length}));
  await send('Browser.close').catch(()=>{});
 }finally{ws?.close();browser.kill();server.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
