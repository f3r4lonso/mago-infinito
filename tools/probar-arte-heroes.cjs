/* Prueba en Chrome real (con los sprites PNG) las habilidades y animaciones de los héroes QUE YA TIENEN ARTE:
   - cuerpo de los 16 héroes: reposo, caminar, ataque y recibir daño
   - ataque básico de cada héroe
   - habilidades con efectos o criaturas en sprite (mago, alquimista, asesino, arquero, orco y las invocaciones de los demás)
   Por héroe genera auditoria-arte/<héroe>.png (una fila por habilidad, 6 fotogramas) y mide: ¿se lanza?, ¿daña?, ¿invoca?,
   ¿usa sprites que no existen?, ¿lanza excepciones? Los resultados quedan en auditoria-arte/resultados.json.
   Uso: node tools/probar-arte-heroes.cjs [héroe ...]   (sin argumentos prueba todos) */
const fs=require('fs'),path=require('path'),cp=require('child_process');
process.chdir(path.join(__dirname,'..'));
const CHROME='C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT='auditoria-arte';fs.mkdirSync(OUT,{recursive:true});
/* habilidades con arte por héroe (las demás todavía se dibujan por código y no se prueban) */
const PLAN={
 mage:['basic','i_cold','i_ghost','i_wall','i_emp','i_tornado','i_alacrity','i_sun','i_forge','i_meteor','i_blast','i_field','i_laguna'],
 alchemist:['basic','al_flask','al_oil','al_spark','al_catalyst','al_mix','al_antidote','al_coat','al_distill','al_fumes','al_transmute','al_gold','al_plague'],
 assassin:['basic','x_blink','x_smoke','x_stealth','x_mark','x_daggers','x_clone','x_trap','x_dance'],
 archer:['basic','a_pierce','a_frost','a_shackle','a_snipe','a_windrun','a_gust','a_aura','a_hawk','a_focus'],
 barbarian:['basic','b_whirl','b_exec','b_berserk','b_shout','b_chain','b_fire','b_aspd','b_rage'],
 necro:['basic','n_raise','n_vamp','n_mummy','n_abom','n_skeldragon'],
 druid:['basic','u_treants','u_storm'],werewolf:['basic','w_pack','w_alpha'],monk:['basic','k_cubs'],troll:['basic','t_raptor','t_totem'],
 dwarf:['basic','d_grenade','d_mines','d_turret','d_rockets','d_shrapnel','d_blast','d_snipe'],shaman:['basic','c_thunder','c_tide'],priest:['basic','p_angel'],
 paladin:['basic'],demon:['basic','z_dagger','z_coup','z_meta','z_immo','z_eyes','z_shadow','z_step','z_void','z_frag'],devourer:['basic']
};
const heroes=process.argv.slice(2).length?process.argv.slice(2):Object.keys(PLAN);
const source=fs.readFileSync('index.html','utf8');
const start=source.indexOf('{const r0=loadRank();'),end=source.indexOf('</script>',start);
if(start<0||end<0)throw Error('No se encuentra el arranque del juego');
const preview=`
window.addEventListener('error',e=>{window.__err=(window.__err||[]).concat(e.message)});
resize();buildShop();buildSkillsMenu();buildAutoUpgradeHeaders();buildBar();buildRankBtn();buildTabs();setupDrawers();setupTip();
const HERO=(location.hash||'#mage').slice(1),PLAN=${JSON.stringify(PLAN)};
const CW=200,CH=172,LW=130,LARGOS=['x_trap','d_mines','n_skeldragon','n_raise'];
function crop(){   /* recorte del lienzo alrededor del héroe */
  const k=dpr,w=300,h=260,x=cx()-w/2,y=cy()-h/2-20,c=document.createElement('canvas');c.width=CW;c.height=CH;
  c.getContext('2d').drawImage(cv,x*k,y*k,w*k,h*k,0,0,CW,CH);return c;
}
function probar(hero,id){
  const R={id,errors:[],ids:[],missing:[],dmg:0,kills:0,allies:0,kinds:[],casts:0,frames:[]};
  try{
    startSolo(hero);G.pending=0;G.soloTestChoice=id;
    if(id!=='basic')G.cls[id]=20;
    G.tv=(G.tv||0)+1;recalc();G.hp=S.maxHp;runSoloTest();
  }catch(e){R.errors.push('preparar: '+e.message);return R}
  const hm=SPR.heroMeta(hero);R.meta=hm?{idle:SPR.has(hm.idle),atk:SPR.has(hm.atk),basic:!!hm.basic,melee:!!hm.melee}:null;
  const seen=new WeakSet(),ids=new Set(),h0=new Map(),kinds=new Set();let lastCast=G.castAt,projSprites=0;
  for(const e of G.enemies)h0.set(e,e.hp);
  const STEPS=LARGOS.includes(id)?[10,40,80,120,160,199]:[2,5,9,15,24,40];
  for(let s=0;s<=STEPS[STEPS.length-1];s++){
    try{update(.05);draw()}catch(e){R.errors.push('paso '+s+': '+e.message);break}
    for(const e of G.enemies)if(!h0.has(e))h0.set(e,e.hp);
    for(const f of G.fx)if(f.k==='spr'&&!seen.has(f)){seen.add(f);for(const i of [f.id,...(f.seq||[]),...(f.anim||[])])if(i)ids.add(i)}
    R.allies=Math.max(R.allies,G.allies.length);for(const a of G.allies)kinds.add(a.kind);
    if(G.castAt!==lastCast){R.casts++;lastCast=G.castAt}
    if(STEPS.includes(s))R.frames.push(crop());
  }
  for(const [e,hp] of h0){if(e.n!=='Objetivo de prueba'&&e.n!=='Jefe de prueba')continue;R.dmg+=Math.max(0,5000-(e.dead?0:e.hp));if(e.dead)R.kills++}   /* los objetivos de prueba nacen con 5000 de vida; el lanzamiento inicial ocurre antes de medir */
  R.dmg=Math.round(R.dmg);R.ids=[...ids];R.kinds=[...kinds];R.missing=R.ids.filter(i=>!SPR.has(i));
  R.cast=G.castAt!=null;R.cd=G.ht&&G.ht[id]>0?+G.ht[id].toFixed(1):0;R.hp=Math.round(G.hp);R.finite=Number.isFinite(G.hp)&&G.enemies.every(e=>Number.isFinite(e.x)&&Number.isFinite(e.y)&&Number.isFinite(e.hp));
  R.fxLive=G.fx.length;
  return R;
}
const FORMA={druid:'bearOn',werewolf:'wolfOn',demon:'metaOn',paladin:'wrathOn',assassin:'hideOn',devourer:'pbRoarOn'};
function poses(hero){   /* cuerpo del héroe: reposo, caminar, ataque, recibir daño y (si tiene) su forma o sigilo */
  startSolo(hero);
  const out=[],st=[{run:0,atk:0,u:-1,since:9,hurt:0},{run:1,atk:0,u:-1,since:9,hurt:0,vx:200},{run:0,atk:.9,u:.25,since:.08,hurt:0},{run:0,atk:0,u:-1,since:9,hurt:.8}];
  if(FORMA[hero])st.push({run:0,atk:0,u:-1,since:9,hurt:0,forma:FORMA[hero]});
  for(const s of st){
    if(G.ht)for(const k of Object.values(FORMA))G.ht[k]=0;
    if(s.forma){G.ht[s.forma]=30;G.soloAnimation='auto'}else G.soloAnimation='idle';
    Object.assign(s,{n:0,face:1});
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#b99d6b';ctx.fillRect(0,0,W,H);
    drawHeroOn(ctx,W/2,H/2,hero,1.7,0,1.25,s);
    const c=document.createElement('canvas');c.width=CW;c.height=CH;
    c.getContext('2d').drawImage(cv,(W/2-100)*dpr,(H/2-100)*dpr,200*dpr,172*dpr,0,0,CW,CH);out.push(c);
  }
  return out;
}
let waited=0;
const wait=setInterval(()=>{
  waited+=100;if(!SPR.on&&waited<8000)return;clearInterval(wait);
  const res={hero:HERO,sprOn:SPR.on,rows:[]},list=PLAN[HERO]||['basic'];
  let body;try{body=poses(HERO)}catch(e){res.poseError=e.message;body=[]}
  for(const id of list)res.rows.push(probar(HERO,id));
  const total=document.createElement('canvas'),nr=res.rows.length+1;total.width=LW+CW*6;total.height=nr*CH;
  const t=total.getContext('2d');t.fillStyle='#1d1830';t.fillRect(0,0,total.width,total.height);t.font='13px sans-serif';t.textBaseline='top';
  t.fillStyle='#ffd24a';t.fillText(HERO+' · cuerpo',6,6);t.fillStyle='#aaa';t.fillText('reposo / caminar / ataque / daño',6,24);
  body.forEach((c,i)=>t.drawImage(c,LW+i*CW,0));
  res.rows.forEach((r,i)=>{
    const y=(i+1)*CH;t.fillStyle='#fff';t.fillText(r.id,6,y+6);
    t.fillStyle=r.errors.length||r.missing.length?'#ff6a6a':'#9bd564';t.fillText('dmg '+r.dmg+' · '+(r.cast?'lanzó':'NO lanzó'),6,y+24);
    if(r.allies){t.fillStyle='#9fd0ff';t.fillText('aliados '+r.allies,6,y+42)}
    r.frames.forEach((c,k)=>t.drawImage(c,LW+k*CW,y));
    delete r.frames;
  });
  document.body.innerHTML='';document.body.style.cssText='margin:0;background:#1d1830';document.body.appendChild(total);
  res.err=window.__err||[];
  console.log('ARTE_RESULT '+JSON.stringify(res));
  document.title='listo';
},100);
`;
const html=source.slice(0,start)+preview+source.slice(end);
fs.writeFileSync('preview-arte-tmp.html',html);
const results={};
for(const h of heroes){
  const rows=(PLAN[h]||['basic']).length+1;
  const png=path.resolve(OUT,h+'.png');
  const url='file:///'+path.resolve('preview-arte-tmp.html').replace(/\\/g,'/')+'#'+h;
  const r=cp.spawnSync(CHROME,['--headless=new','--disable-gpu','--hide-scrollbars','--window-size='+(130+1200)+','+Math.max(rows*172,700),'--force-device-scale-factor=1','--virtual-time-budget=60000','--enable-logging=stderr','--v=0','--screenshot='+png,url],{encoding:'utf8',maxBuffer:1<<26,timeout:240000});
  const m=(r.stderr||'').match(/ARTE_RESULT (\{.*\})/);
  if(!m){console.log(h,'SIN RESULTADO',(r.stderr||'').slice(-300));continue}
  const res=JSON.parse(m[1]);results[h]=res;
  const bad=res.rows.filter(x=>x.errors.length||x.missing.length||!x.finite);
  console.log(h.padEnd(10),'filas',res.rows.length,'· problemas de ejecución:',bad.length,res.err.length?('· errores de página: '+res.err.slice(0,2).join(' | ')):'');
}
fs.writeFileSync(path.join(OUT,'resultados.json'),JSON.stringify(results,null,1));
fs.rmSync('preview-arte-tmp.html',{force:true});
