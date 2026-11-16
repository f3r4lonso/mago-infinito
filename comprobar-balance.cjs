const vm=require('node:vm'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
const metrics=vm.runInContext(`(()=>{
 buildHeroMenu=()=>{};refreshAll=()=>{};W=1100;H=700;
 let seed=7381;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 const result={};
 // Misma torre, niveles, objetivos y duración; sin ataques de héroes ni bajas.
 newGame('mage');G.noSpawn=true;G.tower.lvl=20;
 for(const s of SK)G.skills[s.id]=20;for(const sp of SPS)G.spLv[sp.id]=20;
 G.tv++;recalc();
 for(let i=0;i<24;i++){
  const a=i*Math.PI*2/24;spawnEnemy(false,EN[0],{x:towX()+Math.cos(a)*170,y:towY()+Math.sin(a)*170,hpAbs:1e9,dmg:0,sp:0,r:12,xp:0,gold:0});G.enemies.at(-1).res={};
 }
 const attack=fireBasic,movement=updateMelee,skills=updateHero;
 fireBasic=()=>{};updateMelee=()=>{};updateHero=()=>{};
 for(let i=0;i<1200;i++){G.hp=S.maxHp*.2;update(.05)}
 result.towerDamage60s=Math.round(Object.values(G.dmgBy).reduce((n,v)=>n+v,0));
 fireBasic=attack;updateMelee=movement;updateHero=skills;
 // Mismas 180 bajas con el mismo aporte de torre; se usa la ruta real de muerte/XP.
 for(const one of [false,true]){
  ONE_NEXT=one;newGame('mage');recalc();
  for(let i=0;i<180;i++){
   G.t=i;spawnEnemy(false,EN[0],{hpAbs:1,dmg:0,sp:0,r:12,xp:4,gold:0});
   const e=G.enemies.at(-1);e.res={};SRC='Rayo arcano de la torre';dealDamage(e,1,'magic');G.enemies=[];
  }
  result[one?'oneHero':'teamHeroes']=HIDX().map(i=>heroCtx(i,()=>G.lvl));
  result[one?'oneTower':'teamTower']=tLvl();
 }
 return result;
})()`,ctx,{timeout:20000});
const baseline=path.join(os.tmpdir(),'mago-balance-antes.json');
if(process.argv.includes('--guardar')){
 fs.writeFileSync(baseline,JSON.stringify(metrics));console.log('Referencia anterior: '+JSON.stringify(metrics));
}else{
 vm.runInContext(`{
  newGame('mage');G.noSpawn=true;G.tower.hp=100;update(.5);assert.ok(Math.abs(G.tower.hp-100.5)<1e-8,'Regeneración reducida');
  G.t=0;G.tower.xp=0;towerKillXp({xp:1,tdmg:100,max:100,damageTaken:100});assert.equal(G.tower.xp,.75);
  newGame('mage');gainXp(10);assert.equal(G.xp,3,'Experiencia de héroes reducida');
  spawnEnemy(false,EN[0],{x:towX()+10000,y:towY(),hpAbs:100000,dmg:0,sp:0,r:12,xp:0,gold:0});
  const far=G.enemies.at(-1);far.res={};
  for(let i=0;i<20;i++)spawnEnemy(false,EN[0],{x:towX()+60+i,y:towY(),hpAbs:100000,dmg:0,sp:0,r:12,xp:0,gold:0});
  SRC='★ Misil arcano';castUlt(SK.find(s=>s.id==='arcane'),20);assert.equal(G.projs.length,24);assert.ok(G.projs.every(p=>p.tgt!==far),'No alcanza todo el mapa');
  newGame('mage');G.t=3600;recalc();
  assert.equal(xpTimeBonus(3600),xpTimeBonus(300));
  G.hp=S.maxHp*.1;SRC='Fuente de vida';G.spLv.spring=50;G.tv++;castSpecial('spring');
  assert.ok(G.hp<=S.maxHp*.35+1e-8);assert.ok(G.shield<=S.maxHp*.12+1e-8);
  G.shield=0;G.spLv.barrier=50;G.tv++;SRC='Barrera rúnica';castSpecial('barrier');assert.ok(G.shield<=S.maxHp*.25+1e-8);
  G.tower.lvl=50;G.spLv.skel=50;G.tv++;castSpecial('skel');
  assert.ok(G.allies.length<=8);assert.equal(G.allies.filter(a=>a.kind==='skel').length,G.allies.filter(a=>a.kind==='skelA').length);
  assert.ok(powerCooldown('nova')>=SPS.find(s=>s.id==='nova').cd*.55);
 }`,ctx);
 if(fs.existsSync(baseline)){
  const before=JSON.parse(fs.readFileSync(baseline,'utf8'));
  assert.ok(metrics.towerDamage60s<before.towerDamage60s*.5,'El daño de la torre debe bajar al menos a la mitad');
  assert.ok(metrics.oneHero[0]<before.oneHero[0]);assert.ok(metrics.teamHeroes[0]<before.teamHeroes[0]);
  assert.ok(metrics.oneTower<before.oneTower);assert.ok(metrics.teamTower<before.teamTower);
  console.log('Antes: '+JSON.stringify(before));
  console.log('Después: '+JSON.stringify(metrics));
  console.log('Reducción de daño en simulación: '+(100*(1-metrics.towerDamage60s/before.towerDamage60s)).toFixed(1)+'%');
 }else console.log(JSON.stringify(metrics));
 assert.ok(metrics.towerDamage60s<450000,'El daño de torre vuelve a superar el límite de referencia');
 console.log('Correcto: daño de torre, progresión de 1 y 4 héroes, límites de apoyo y guardia de esqueletos.');
}
