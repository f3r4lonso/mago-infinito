const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
vm.runInContext(`
buildHeroMenu=()=>{};refreshAll=()=>{};gameOver=()=>{G.over=true};W=1100;H=700;
function setup(h='mage'){newGame(h);G.tv=(G.tv||0)+1;recalc()}
function foe(hp=100,x=towX()+20,y=towY()){
 spawnEnemy(false,EN[0],{x,y});const e=G.enemies.at(-1);
 Object.assign(e,{hp,max:hp,xp:1,gold:0,res:{},revive:0,split:null});return e;
}
const XPT=XPK*TOWER_BALANCE.towerXp;   // la torre cobra su parte de la experiencia con el balance actual
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,a+' != '+b);
assert.equal(SK.length,12);
for(const id of ['dagger','frost','poison','hammer']){
 assert.ok(!SK.some(s=>s.id===id));assert.ok(!TIERS[id]);assert.ok(!ULT[id]);assert.ok(!ULTCH[id]);assert.ok(!SKI[id]);assert.ok(!RNG[id]);
}
// El golpe mortal cuenta, el exceso de daño no cuenta y el héroe conserva sus puntos.
setup();let e=foe();SRC='Rayo arcano de la torre';dealDamage(e,10000,'magic');
near(G.tower.xp,XPT);near(e.tdmg,100);assert.equal(G.kills,1);
setup();e=foe();SRC='Rayo arcano de la torre';dealDamage(e,40,'magic');
SRC=HEROES.mage.basic.n;dealDamage(e,60,'magic');near(G.tower.xp,XPT*(.15+.85*.4));
setup();e=foe();SRC=HEROES.mage.basic.n;dealDamage(e,100,'magic');near(G.tower.xp,XPT*.15);
// La invulnerabilidad, las resistencias y las resurrecciones respetan el daño efectivo.
setup();e=foe();e.invT=1;SRC='Rayo arcano de la torre';dealDamage(e,100,'magic');near(e.tdmg||0,0);
e.invT=0;e.res.magic=.5;dealDamage(e,80,'magic');near(e.tdmg,40);
setup();e=foe();e.revive=1;SRC='Rayo arcano de la torre';dealDamage(e,10000,'magic');assert.equal(e.dead,false);near(G.tower.xp,0);
e.invT=0;SRC=HEROES.mage.basic.n;dealDamage(e,60,'magic');near(G.tower.xp,XPT*(.15+.85*100/160));
// La quemadura acredita también el último tick y registra el daño efectivo total.
setup();e=foe();G.basicCd=10;G.tower.cd=10;e.dots.fire={dps:2000,t:1,src:'Bola de fuego'};
update(.05);assert.equal(e.dead,true);near(e.tdmg,100);near(e.damageTaken,100);near(G.tower.xp,XPT*(1+.05/100));
// Puntos independientes y compra con oro.
// Las habilidades de la torre gastan los niveles libres de las torres (sin puntos de héroe) y después cuestan oro; los poderes usan sus propios puntos.
setup();const hp=G.pending;assert.equal(skillBuy(0),true);assert.equal(G.pending,hp);assert.equal(G.tpending,1);
assert.equal(skillBuy(1),false);G.gold=80;assert.equal(skillBuy(1),true);assert.equal(G.gold,0);
const heroSkill=CLS.mage[0];assert.equal(heroUp(heroSkill.id,'pt'),true);assert.equal(G.tpending,1);
// El héroe puede moverse y ganar nivel durante un lanzamiento sin mover su origen.
setup('monk');G.bx=210;G.by=45;const heroX=cx(),heroY=cy();towerBegin();towerBegin();
assert.equal(cx(),heroX);assert.equal(cy(),heroY);assert.equal(ax(),towX());towerEnd();assert.equal(ax(),towX());towerEnd();assert.equal(G.org,null);
e=foe(1000);towerBegin();SRC='Misil arcano';castSkill(SK[0],1);towerEnd();assert.ok(Math.abs(G.projs[0].x-towX())<=5);assert.equal(G.projs[0].y,towY()-10);
G.projs=[];towerBegin();towerBasic(1);towerEnd();assert.equal(G.projs[0].x,towX());assert.equal(G.projs[0].y,towerTopY());
// Desbloqueos por nivel compartido y poderes automáticos.
setup();G.lvl=100;recalc();useSpecial('nova');assert.equal(G.spCd.nova,0);
for(const sp of SPS){
 G.tower.lvl=sp.unlock-1;useSpecial(sp.id);assert.equal(G.spCd[sp.id],0);
 towerGainXp(tNeed(G.tower.lvl));assert.equal(tLvl(),sp.unlock);useSpecial(sp.id);assert.ok(G.spCd[sp.id]>0,sp.id);
 assert.equal(G.org,null);
}
// Cada torre sube hasta 40; al llegar aparece otra nueva en nivel 1 que sube por separado.
setup();for(let level=1;level<31;level++)towerGainXp(tNeed(tLvl()));
assert.equal(G.tower.lvl,31);assert.equal(G.tpending,1);   // subir de nivel ya no concede puntos de poder: se compran con oro (solo queda el inicial)
assert.equal(towerCount(),1);
for(let n=1;n<=3;n++){
 const last=syncTowers()[n-1];last.lvl=TOWER_MAXLVL-1;last.xp=0;assert.equal(towerCount(),n);
 towerGainXp(tNeed(tLvl())+7);assert.equal(last.lvl,TOWER_MAXLVL);assert.equal(towerCount(),n+1);
 const fresh=syncTowers()[n];assert.equal(fresh.lvl,1);assert.equal(fresh.xp,7);assert.equal(syncTowers().length,towerCount());
 assert.ok(towerFloors(n)<towerFloors(n-1));
}
assert.ok(Number.isFinite(tNeed(10000)));assert.ok(tNeed(10001)>tNeed(10000));
const positions=Array.from({length:50},(_,i)=>towerPosition(i));assert.equal(new Set(positions.map(p=>p.x.toFixed(4)+','+p.y.toFixed(4))).size,50);
G.enemies=[];G.projs=[];for(let i=0;i<towerCount();i++)foe(1e8,towX(i)+20,towY(i));
for(const unit of syncTowers())unit.cd=0;towerBasic(.1);assert.equal(G.projs.length,towerCount());
for(let i=0;i<towerCount();i++){assert.equal(G.projs[i].x,towX(i));assert.equal(G.projs[i].y,towerTopY(i))}draw();
setup();for(const s of SK)G.skills[s.id]=SKMAX;towerGainXp(tNeed(1));assert.equal(G.tpending,1);assert.equal(G.bonus,0);
// Cíclope: uno por torre, prioriza jefes y petrifica; el viento empuja hacia atrás.
setup();G.skills.lightning=1;G.skills.wind=1;G.enemies=[];
const common=foe(1e6,towX()+60,towY()),bossE=foe(1e6,towX()+120,towY());bossE.boss=true;
updateCyclopes(.1);assert.ok(syncTowers()[0].cyc);
for(let i=0;i<200;i++)updateCyclopes(.05);
assert.ok(bossE.tdmg>0&&!(common.tdmg>0),'el cíclope prioriza al jefe');assert.ok(common.stone>0||bossE.stone>0);
drawCyclopes();
const wx=foe(1e6,100,100),wx0=wx.x;hitEnemy({sk:'wind',vx:600,vy:0,dmg:1,type:'phys',src:'t'},wx);assert.ok(wx.x>wx0);
// Meteoros, zonas e invocaciones conservan su atribución y los objetos amplían su duración.
for(const id of ['meteor','hole','skel']){
 setup();G.tower.lvl=TOWER_MAXLVL;G.items.hourglass=10;G.items.banner=10;G.tv=(G.tv||0)+1;recalc();e=foe(10000);
 useSpecial(id);assert.equal(G.org,null);
 if(id==='meteor'){assert.ok(G.delayed.length);updateZones(1);assert.ok(e.tdmg>0)}
 if(id==='hole'){assert.ok(G.zones[0].t>2);for(let k=0;k<6;k++)updateZones(.5);assert.ok(e.tdmg>0)}
 if(id==='skel'){assert.equal(G.allies[0].tower,true);assert.ok(G.allies[0].life>10);G.allies[0].x=e.x;G.allies[0].y=e.y;updateAllies(.1);assert.ok(e.tdmg>0)}
}
// Los poderes se lanzan automáticamente sin controles de lanzamiento.
setup();G.tower.lvl=5;for(let i=0;i<3;i++)foe(10000);towerBegin();updateSpecials(.1);towerEnd();assert.ok(G.spCd.nova>0);assert.ok(G.enemies.every(e=>e.tdmg>0));
// Compras y mejoras de los diez poderes: umbrales (TIER_LV), caché, límite y efectos reales a nivel máximo.
assert.equal(SPS.length,10);assert.equal(new Set(SPS.map(sp=>sp.key)).size,10);
for(const sp of SPS){
 setup();G.tower.lvl=TOWER_MAXLVL;G.tpending=100;const initialHeroPoints=G.pending;
 assert.equal(TIERS[sp.id].length,4);
 for(let l=1;l<=SPMAX;l++){
  assert.equal(G.spLv[sp.id],l);
  assert.equal(tierHtml(sp.id).split('✔').length-1,TIER_LV.filter(n=>l>=n).length);
  const f=tf(sp.id);assert.ok(f.cd>0&&f.cd<=1);assert.ok(f.dm>=1);
  if(l<SPMAX)assert.equal(powerUp(sp.id,'pt'),true);
 }
 assert.equal(powerUp(sp.id,'pt'),false);assert.equal(G.tpending,100-(SPMAX-1));assert.equal(G.pending,initialHeroPoints);
 G.spCd[sp.id]=0;G.enemies=[];G.fx=[];for(let i=0;i<35;i++)foe(1e7,towX()+15+(i%7)*3,towY()+Math.floor(i/7)*3);
 G.hp=S.maxHp*.2;useSpecial(sp.id);assert.ok(G.spCd[sp.id]>0);near(G.spCd[sp.id],powerCooldown(sp.id));
 if(sp.id==='skel'){assert.ok(G.allies.length>=8);assert.ok(G.allies[0].life>20);G.allies[0].x=G.enemies[0].x;G.allies[0].y=G.enemies[0].y;updateAllies(.1);assert.ok(G.enemies.some(e=>e.tdmg>0))}
 else if(sp.id==='meteor'){assert.equal(G.delayed.length,8);assert.ok(G.delayed[0].mark.r>100);updateZones(1);assert.ok(G.enemies.some(e=>e.tdmg>0))}
 else if(sp.id==='hole'){assert.ok(G.zones[0].t>6);updateZones(.5);assert.ok(G.enemies.some(e=>e.tdmg>0))}
 else {assert.ok(G.enemies.some(e=>e.tdmg>0)||sp.id==='barrier'||sp.id==='spring');if(sp.id==='freeze')assert.ok(G.enemies[0].stun>=1);if(sp.id==='barrier')assert.ok(G.shield>S.maxHp*.2);if(sp.id==='judge')assert.ok(G.hp>S.maxHp*.2)}
 draw();assert.equal(G.org,null);
}
// Nido fijo: el dibujo y el nacimiento usan la misma posición aunque el héroe se mueva.
setup('monk');G.gold=EGG_COST;assert.equal(buyEgg(),true);const nest={x:eggX(),y:eggY()};G.bx=230;G.by=-80;
assert.equal(eggX(),nest.x);assert.equal(eggY(),nest.y);
const translations=[],translate=ctx.translate;ctx.translate=(x,y)=>translations.push([x,y]);drawDragon(cx(),cy());ctx.translate=translate;
assert.ok(translations.some(([x,y])=>x===nest.x&&y===nest.y+8));hatch();assert.equal(G.dr.egg,null);assert.equal(G.dragon.x,nest.x);assert.equal(G.dragon.y,nest.y);
// El fondo de respaldo funciona sin imagen y la ilustración invalida la caché una sola vez.
setup();BG=null;drawBG(hx(),hy());const fallback=BG;drawBG(hx(),hy());assert.equal(BG,fallback);
FOREST_TEXTURE.image={};FOREST_TEXTURE.ready=true;BG=null;drawBG(hx(),hy());assert.notEqual(BG,fallback);const loaded=BG;drawBG(hx(),hy());assert.equal(BG,loaded);
FOREST_TEXTURE.ready=false;BG=null;draw();
// Las invocaciones sin animación específica también pueden desaparecer sin fallar.
allyDie({kind:'cub',x:0,y:0,r:9});assert.ok(G.dying.length);
console.log('Correcto: experiencia proporcional, golpes mortales, resurrección, puntos, origen, poderes, objetos, automatización y diez poderes con mejoras 5/10/15/20.');
`,ctx,{timeout:10000});

if(process.argv.includes('--simular'))vm.runInContext(`
// Inmunidad solo para medir doce minutos completos de progresión de cada héroe.
const normalHurt=hurt;hurt=()=>{};
for(const hero of Object.keys(HEROES)){
 let seed=7183;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 setup(hero);
 const unlocked={};let nextShop=0;
 for(let step=0;step<14400;step++){
  if(G.t>=nextShop){
   nextShop++;
   for(const a of [...CLS[hero]].sort((a,b)=>clv(a.id)-clv(b.id)))if(G.pending>0)heroUp(a.id,'pt');
   for(const s of [...SK].sort((a,b)=>G.skills[a.id]-G.skills[b.id]))if(G.tpending>0)skillUp(SK.indexOf(s),'pt');
   // Alterna compras de héroe, torre y objetos, eligiendo el menor coste.
   for(let purchase=0;purchase<8;purchase++){
    const opts=[];
    for(const a of CLS[hero])if(clv(a.id)<CLSMAX)opts.push({cost:clsCost(a.id),buy:()=>heroUp(a.id,'gold')});
    for(const s of SK)if(G.skills[s.id]<SKMAX)opts.push({cost:skGoldCost(G.skills[s.id]),buy:()=>skillUp(SK.indexOf(s),'gold')});
    for(const id of ['staff','ring','crystal','hat','robe','shield','amulet']){const item=ITEMS.find(i=>i.id===id);if(G.items[id]<item.max)opts.push({cost:itemCost(id),buy:()=>buy(id)})}
    opts.sort((a,b)=>a.cost-b.cost);if(!opts.length||opts[0].cost>G.gold)break;opts[0].buy();
   }
  }
  update(.05);
  for(const sp of SPS)if(tLvl()>=sp.unlock&&unlocked[sp.id]===undefined)unlocked[sp.id]=Math.round(G.t);
  assert.equal(G.org,null);assert.ok(Number.isFinite(G.hp)&&Number.isFinite(G.tower.xp),hero+': '+G.t);
 }
 assert.ok(tLvl()>1,hero);assert.ok(G.enemies.every(e=>Number.isFinite(e.hp)&&Number.isFinite(e.x)&&Number.isFinite(e.y)),hero);
 assert.ok(Object.values(G.dmgBy).filter(Number.isFinite).length);draw();
 console.log(JSON.stringify({hero,time:Math.round(G.t),tower:tLvl(),kills:G.kills,unlocked,damage:Math.round(Object.values(G.dmgBy).reduce((a,b)=>a+b,0))}));
}
hurt=normalHurt;
`,ctx,{timeout:240000});

if(process.argv.includes('--comparar'))vm.runInContext(`
const realTowerBegin=towerBegin,previousHurt=hurt;hurt=()=>{};
for(const hero of Object.keys(HEROES)){
 const totals=[];
 for(const origin of ['hero','tower']){
  let seed=3817;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
  setup(hero);G.lvl=12;G.tower.lvl=12;
  for(const s of SK)G.skills[s.id]=5;for(const a of CLS[hero])G.cls[a.id]=5;G.tv=(G.tv||0)+1;recalc();
  towerBegin=origin==='tower'?realTowerBegin:()=>{G.orgN=(G.orgN||0)+1;G.org={x:cx(),y:cy()}};
  for(let i=0;i<1800;i++)update(.05);
  totals.push(Object.values(G.dmgBy).reduce((a,b)=>a+b,0));
 }
 const ratio=totals[1]/totals[0];assert.ok(Number.isFinite(ratio)&&ratio>.7,hero+': '+ratio);
 console.log(hero+': daño torre / origen héroe = '+ratio.toFixed(3));
}
towerBegin=realTowerBegin;hurt=previousHurt;
`,ctx,{timeout:60000});
