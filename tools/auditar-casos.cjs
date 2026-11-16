const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('../motor-pruebas.cjs');const ctx=createGameContext(assert);
vm.runInContext(fs.readFileSync('tools/escenarios-auditoria.js','utf8'),ctx);
const result=vm.runInContext(`(()=>{
 buildHeroMenu=()=>{};refreshAll=()=>{};W=1100;H=700;const results=[];
 function setup(hero,id,level=20){SOLO_NEXT=true;newGame(hero);G.noSpawn=true;G.lvl=20;G.cls[id]=level;G.tv++;recalc();G.hp=S.maxHp*.5;G.heroInv=10000;G.ht[id]=0;HeroAudit.targets()}
 function tick(seconds=2){for(let i=0;i<seconds/.05;i++)update(.05)}
 function record(name,fn){try{results.push({name,...fn()})}catch(e){results.push({name,error:e.stack})}}
 record('invocaciones_temporales',()=>{
  setup('monk','k_cubs');updateHero(.01);const born=G.allies.slice(),initial=born.map(a=>a.life);
  G.cls.k_cubs=0;G.tv++;G.enemies=[];for(let i=0;i<2400;i++){G.t+=.05;updateAllies(.05)}
  return{spawned:born.length,initialLife:initial,seconds:120,survivors:G.allies.filter(a=>born.includes(a)).length,lives:G.allies.map(a=>a.life)};
 });
 for(const [hero,id] of [['archer','a_focus'],['barbarian','b_berserk'],['priest','p_nova'],['mage','i_laguna'],['demon','z_coup'],['devourer','pb_rock'],['druid','u_cyclone']])record('panel_vs_preparado_'+id,()=>{
  const panel=HeroAudit.run(hero,id,20,{lab:true,duration:8});setup(hero,id);tick(3);
  return{panelStates:panel.states,panelSources:Object.keys(panel.damageBy),preparedStates:Object.keys(G.ht).filter(k=>G.ht[k]),preparedSources:Object.keys(G.dmgBy)};
 });
 record('resurreccion',()=>{setup('priest','p_res');G.heroInv=0;G.hp=1;hurt(10000);update(.05);return{hp:G.hp,resCd:G.ht.resCd||0,soloReset:!!G.soloReset,dead:!!G.dead}});
 record('dragon_esqueleto',()=>{setup('necro','n_skeldragon');G.gold=10000;buyEgg();hatch();const dragon=G.dragon;dragon.hp=0;updateDragon(.05);return{skeletalDragons:G.sdrags.length,mainDragon:!!G.dragon}});
 record('abominacion',()=>{setup('necro','n_abom');for(let i=0;i<4;i++)addAlly('skel',cx()+20*i,cy(),100,1,999,'Preparación');updateHero(.05);return{kinds:G.allies.map(a=>a.kind),damage:G.dmgBy}});
 record('regreso_naturaleza',()=>{setup('druid','u_swarm');addAlly('sbear',cx()+220,cy(),500,1,999,'Oso espiritual');const before=cx();G.hp=S.maxHp*.2;updateHero(.05);return{before,after:cx(),hp:G.hp,damage:G.dmgBy}});
 record('furia_bestia',()=>{setup('devourer','pb_uproar');G.heroInv=0;G.hp=S.maxHp;hurt(S.maxHp*.25);const rage=G.ht.pbRage;updateHero(.05);return{rageBefore:rage,roarOn:G.ht.pbRoarOn||0,roarStacks:G.ht.pbRoarStacks||0}});
 record('onda_tectonica_preparada',()=>{setup('devourer','pb_shockwave');G.cls.pb_uproar=20;G.tv++;G.ht.pbRage=5;primalRoar();tick(2);return{sources:G.dmgBy}});
 record('trampa_preparada',()=>{setup('assassin','x_trap');G.enemies=[];G.ht.trT=0;updateHero(.05);const trap=G.ht.traps[0];spawnEnemy(false,EN[0],{x:trap.x,y:trap.y,hpAbs:100000,dmg:0,sp:0,r:12,xp:0,gold:0});tick(1);return{sources:G.dmgBy,trapsRemaining:G.ht.traps.length}});
 for(const id of ['c_thunder','c_overload','c_bolt'])record('chaman_preparado_'+id,()=>{setup('shaman',id);shamanStatic(30);for(const e of G.enemies)e.wetUntil=60;tick(2);return{static:G.ht.static,sources:G.dmgBy,totems:(G.ht.stormTotems||[]).length}});
 for(const id of ['al_catalyst','al_mix','al_antidote','al_transmute','al_coat','al_plague'])record('alquimista_preparado_'+id,()=>{
  setup('alchemist',id);const e=G.enemies[0];nhChem('acid',e.x,e.y,140,30,20,'al_flask');nhChem('oil',e.x+10,e.y,140,30,20,'al_oil');
  e.dots.poison={dps:100,t:5,src:'Frasco corrosivo'};G.hp=S.maxHp*.3;const hp=G.hp;
  if(id==='al_plague'){SRC='Frasco corrosivo';kill(e)}else updateHero(.05);
  const defense=newHeroesDefense(),cd=G.ht[id];tick(2);
  return{sources:G.dmgBy,hpBefore:hp,hpAfter:G.hp,defense,cd,poisoned:G.enemies.filter(e=>e.dots.poison).length};
 });
 record('casteo_sin_basico',()=>{setup('mage','i_sun');G.soloSupportBasic=false;G.soloTestChoice='i_sun';runSoloTest();tick(2);return{atkAt:G.atkAt??null,punchAt:G.punchAt,attackCount:G.atkN||0,damage:G.dmgBy,fx:G.fx.map(f=>f.id||f.k)}});
 record('marcado_cadaver',()=>{setup('necro','n_corpse');const e=G.enemies[0];SRC='Proyectil de hueso';kill(e);tick(.5);return{sources:G.dmgBy}});
 record('muerte_borra_configuracion',()=>{setup('monk','k_combo');G.soloTestChoice='k_combo';G.soloTestRunning=true;G.noSpawn=false;G.heroInv=0;G.hp=1;hurt(100000);update(.05);const requested=G.soloReset;update(.05);return{requested:!!requested,skillLevel:learnedClv('k_combo'),choice:G.soloTestChoice,spawnsPaused:G.noSpawn,running:G.soloTestRunning}});
 record('nivel_cero',()=>{setup('mage','i_sun',0);G.soloTestChoice='i_sun';const before=learnedClv('i_sun');runSoloTest();return{before,after:learnedClv('i_sun')}});
 record('velocidad_no_afecta_hechizos',()=>{const runs=[];for(const speed of [.5,2]){let first=null;const r=HeroAudit.run('mage','i_meteor',20,{lab:true,duration:4,onFrame:i=>{G.soloAnimSpeed=speed;if(first===null&&G.dmgBy['Meteoro del caos']>0)first=G.t}});runs.push({speed,firstDamageTime:first,totalDamage:r.damage})}return{runs}});
 record('camara_movil',()=>{W=390;H=844-270;setup('monk','k_combo');W=390;H=844-270;G.enemies=[];spawnEnemy(false,EN[0],{x:cx()+260,y:cy(),hpAbs:100000,dmg:0,sp:0,r:12,xp:0,gold:0});tick(3);return{viewport:W,worldX:cx(),screenX:hx()+(cx()-hx())*1,offscreen:cx()>W}});
 return results;
})()`,ctx,{timeout:20000});
fs.writeFileSync('auditoria-heroes/casos.json',JSON.stringify(result,null,2));for(const item of result)console.log(JSON.stringify(item));
