/* Escenarios de diagnóstico; se ejecutan en el motor VM y en el navegador. No modifica el juego. */
globalThis.HeroAudit=(()=>{
 const catalog=()=>Object.entries(HEROES).map(([id,h])=>({id,name:h.n,basic:h.basic,skills:CLS[id].map(s=>({id:s.id,name:s.n,description:s.desc,effects:[1,20,50].map(l=>s.eff(l))}))}));
 const round=n=>Math.round((n||0)*100)/100;
 function targets(){
  for(let i=0;i<10;i++){
   const angle=(i%5-2)*.24,distance=i<5?48+i*10:150+(i-5)*44;
   spawnEnemy(false,EN[0],{x:cx()+Math.cos(angle)*distance,y:cy()+Math.sin(angle)*distance,hpAbs:40000,dmg:1,sp:12,r:12,xp:0,gold:0});
   const e=G.enemies.at(-1);e.res={};e.max=40000;e.hp=i===0?5000:40000;e.boss=i===9;
   if(i===8){e.rng={range:220,cd:2,spd:180,col:'#ff6666'};e.shotCd=0}
  }
 }
 function run(hero,id,level,options={}){
  const build=buildHeroMenu,refresh=refreshAll;buildHeroMenu=()=>{};refreshAll=()=>{};
  let seed=37519;const oldRandom=Math.random;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
  const result={hero,id,level,mode:options.lab?'panel':options.fullKit?'kit':'combat',errors:[],casts:[],states:[],allies:{},effects:{},damageBy:{},maxShield:0,healTicks:0,gold:0,nonFinite:[]};
  try{
   SOLO_NEXT=true;newGame(hero);G.noSpawn=true;G.lvl=options.lab?1:20;G.hp=S.maxHp;G.soloDisabled={};G.soloAnimation='auto';
   if(options.lab){G.soloTestChoice=id;G.soloSupportBasic=true;if(id!=='basic')G.cls[id]=level;G.tv++;recalc();G.hp=S.maxHp;runSoloTest()}
   else{
    if(options.fullKit)for(const s of CLS[hero])G.cls[s.id]=level;
    else if(id!=='basic')G.cls[id]=level;
    G.tv++;recalc();targets();G.ht[id]=0;
   }
   result.startStats={damage:S.dmg,attack:S.atk,defense:S.def,dodge:S.dodge,maxHp:S.maxHp,regen:S.regen};
   const duration=options.duration||18,dt=.05,steps=Math.ceil(duration/dt),states=new Set(),nonFinite=new Set();
   for(let i=0;i<steps;i++){
    if(!options.lab){
     G.hp=S.maxHp*([.2,.5,.95][Math.floor(i/100)%3]);G.heroInv=0;
     if(i>0&&i%100===0){const e=G.enemies.find(e=>!e.dead);if(e){SRC=HEROES[hero].basic.n;kill(e)}}
     if(G.enemies.filter(e=>!e.dead).length<6)targets();
    }
    const before=G.hp,cd=G.ht[id];update(dt);
    if(G.hp>before+S.regen*dt+.1)result.healTicks++;
    result.maxShield=Math.max(result.maxShield,G.shield||0);
    if(cd!==undefined&&cd<=.1&&G.ht[id]>1)result.casts.push(round(G.t));
    for(const [key,val] of Object.entries(G.ht))if(key!==id&&val&&!(typeof val==='number'&&val<0))states.add(key);
    for(const a of G.allies)result.allies[a.kind]=Math.max(result.allies[a.kind]||0,G.allies.filter(v=>v.kind===a.kind).length);
    for(const f of G.fx){const key=f.id||f.sk||f.k;result.effects[key]=(result.effects[key]||0)+1}
    for(const [key,value] of Object.entries({hp:G.hp,maxHp:S.maxHp,damage:S.dmg,attack:S.atk,defense:S.def}))if(!Number.isFinite(value))nonFinite.add(key);
    for(const e of G.enemies)if(![e.hp,e.x,e.y].every(Number.isFinite))nonFinite.add('enemy');
    for(const a of G.allies)if(![a.hp,a.x,a.y].every(Number.isFinite))nonFinite.add('ally:'+a.kind);
    for(const p of G.projs)if(![p.x,p.y,p.dmg].every(Number.isFinite))nonFinite.add('projectile:'+p.src);
    if(options.onFrame)options.onFrame(i,result);
    if(G.soloReset){result.errors.push('El héroe murió y solicita reinicio');break}
   }
   result.states=[...states];result.nonFinite=[...nonFinite];result.damageBy=Object.fromEntries(Object.entries(G.dmgBy).map(([k,v])=>[k,round(v)]));
   result.damage=round(Object.values(G.dmgBy).reduce((a,b)=>a+b,0));result.kills=G.kills;result.gold=G.gold;
   result.statuses={};for(const key of ['slow','stun','stone','root','rep','silenced','silence','vt','nhT']){const n=G.enemies.filter(e=>e[key]).length;if(n)result.statuses[key]=n}
   result.endStats={damage:S.dmg,attack:S.atk,defense:S.def,dodge:S.dodge,maxHp:S.maxHp,regen:S.regen};
   result.remainingAllies=G.allies.map(a=>({kind:a.kind,life:round(a.life),born:round(a.born),hp:round(a.hp)}));
  }catch(e){result.errors.push(e.stack||String(e))}
  finally{buildHeroMenu=build;refreshAll=refresh;Math.random=oldRandom}
  return result;
 }
 return{catalog,run,targets};
})();
