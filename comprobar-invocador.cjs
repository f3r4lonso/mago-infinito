const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
vm.runInContext(`
buildHeroMenu=()=>{};refreshAll=()=>{};gameOver=()=>{G.over=true};W=1100;H=700;
function setup(){newGame('mage');G.tv=(G.tv||0)+1;recalc()}
function foe(hp=1e6,dx=120,dy=0,boss=false){
 spawnEnemy(false,EN[0],{x:cx()+dx,y:cy()+dy});const e=G.enemies.at(-1);
 Object.assign(e,{hp,max:hp,xp:1,gold:0,res:{},revive:0,split:null,boss});return e;
}
const ids=CLS.mage.map(a=>a.id);
assert.equal(ids.length,12);
for(const id of ids){assert.ok(CLS.mage.find(a=>a.id===id).eff(5));assert.ok(TIERS[id]&&TIERS[id].length===4)}
// Cada conjuro hace algo.
const run=(id,pre)=>{setup();G.cls[id]=10;G.tv++;recalc();const es=[foe(),foe(1e6,150,30),foe(1e6,60,-20)];if(pre)pre(es);G.ht[id]=0;
 for(let i=0;i<200;i++){G.hp=S.maxHp;update(.05)}return es};
let es=run('i_cold');assert.ok(es.some(e=>e.hp<e.max));
// Paso fantasma: invulnerable y ralentiza a los enemigos cercanos (se mide justo tras lanzarlo, antes de que expire).
setup();G.cls.i_ghost=10;G.tv++;recalc();{const gs=[foe(1e6,60,0),foe(1e6,90,20)];G.ht.i_ghost=0;for(let i=0;i<6&&!(G.heroInv>0);i++)update(.05);assert.ok(G.heroInv>0,'invulnerable');assert.ok(gs.some(e=>e.slow&&e.slow.a>0),'ralentiza');}
es=run('i_wall');assert.ok(es.some(e=>e.hp<e.max));
es=run('i_emp');assert.ok(es.some(e=>e.hp<e.max));
es=run('i_tornado');assert.ok(es.some(e=>e.hp<e.max));
es=run('i_alacrity');assert.ok(G.ht.alacT!==undefined);
es=run('i_sun');assert.ok(es.some(e=>e.hp<e.max));
es=run('i_forge');assert.ok(G.allies.some(a=>a.kind==='spirit'));
es=run('i_meteor');assert.ok(es.some(e=>e.hp<e.max));
es=run('i_blast');assert.ok(es.some(e=>e.hp<e.max));
es=run('i_field');assert.ok(es.some(e=>e.hp<e.max));
es=run('i_laguna',es=>{es[0].boss=true});assert.ok(G.dmgBy['Rayo de luz']>0);
es=run('i_laguna');assert.ok(!G.dmgBy['Rayo de luz']);
// El rayo solar prioriza al jefe aunque esté lejos.
setup();G.cls.i_sun=5;G.tv++;recalc();const big=foe(5e6,100,0),bs=foe(1e3,500,0,true);G.ht.i_sun=0;
for(let i=0;i<80;i++){G.hp=S.maxHp;update(.05)}assert.ok(bs.dead||bs.hp<bs.max*.5);assert.ok(big.hp>big.max*.9);
// Los dibujos no fallan.
setup();for(const id of ids)G.cls[id]=3;G.tv++;recalc();foe();for(let i=0;i<300;i++){G.hp=S.maxHp;update(.05);if(i%20==0)draw()}
console.log('ok');
`,ctx);
