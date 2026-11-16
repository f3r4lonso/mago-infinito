const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
vm.runInContext(`
buildHeroMenu=()=>{};refreshAll=()=>{};W=3200;H=1000;
function setup(){
 newGame('mage','necro','druid','priest');
 for(const i of HIDX())heroCtx(i,()=>{G.hoff=-1200+i*800;G.bx=0;G.by=0});
 G.enemies=[];G.allies=[];
}
// Todos los tipos de invocación siguen a su dueño, incluso después de que se mueva.
for(const kind of Object.keys(ALLYK)){
 setup();
 const units=HIDX().map(i=>heroCtx(i,()=>addAlly(kind,cx(),cy(),100,10,999,'Prueba')));
 for(const i of HIDX())heroCtx(i,()=>{G.bx=130;G.by=100});
 for(let step=0;step<100;step++)updateAllies(.05);
 for(const [i,a] of units.entries()){
  assert.equal(a.owner,i,kind+' dueño');
  const p=heroPos(i);assert.ok(Math.hypot(a.x-p.x,a.y-p.y)<100,kind+' sigue a héroe '+i);
  heroCtx(i,()=>assert.equal(ownAlly(a),true));
  heroCtx((i+1)%4,()=>assert.equal(ownAlly(a),false));
 }
 assert.equal(HCUR,0);
}
// Cada unidad ataca cerca de su héroe y abandona objetivos que se alejan de él.
setup();
const guards=HIDX().map(i=>heroCtx(i,()=>{
 spawnEnemy(false,EN[0],{x:cx()+30,y:cy()});
 const e=G.enemies.at(-1);Object.assign(e,{hp:1e6,max:1e6,res:{},revive:0,split:null});
 const a=addAlly('skel',e.x,e.y,100,10,999,'Guardia');return {a,e};
}));
updateAllies(.1);
for(const {a,e} of guards){assert.ok(e.hp<e.max);assert.equal(a.tx,e.x)}
for(const i of HIDX())heroCtx(i,()=>{G.by=700});
const ys=guards.map(({a})=>a.y);updateAllies(.1);
guards.forEach(({a},i)=>assert.ok(a.y>ys[i],'regresa a su dueño'));
// Invocaciones de torres adicionales defienden su torre, sin seguir al primer héroe.
setup();G.tower.satellites.push({lvl:1,hp:500});
const towers=[0,1].map(i=>{towerBegin(i);const a=addAlly('skel',towX(i),towY(i),100,10,999,'Torre');a.tower=true;towerEnd();return a});
for(let step=0;step<100;step++)updateAllies(.05);
towers.forEach((a,i)=>{assert.equal(a.towerIndex,i);assert.ok(Math.hypot(a.x-towX(i),a.y-towY(i))<80)});
// Reconjurar espíritus no elimina los que pertenecen a otro héroe.
setup();const foreign=heroCtx(1,()=>addAlly('spirit',cx(),cy(),100,10,999,'Espíritu de fuego'));
G.cls.i_forge=10;G.tv++;recalc();spawnEnemy(false,EN[0],{x:cx()+80,y:cy()});
invokerTick('mage',.1,G.ht,cx(),cy(),id=>id==='i_forge',()=>{},()=>{});
assert.ok(G.allies.includes(foreign));assert.ok(G.allies.some(a=>a.kind==='spirit'&&a.owner===0));
// También funciona en modo de un héroe y en el simulador.
for(const solo of [false,true]){
 SOLO_NEXT=solo;ONE_NEXT=!solo;newGame('druid');
 const a=addAlly('sbear',cx(),cy(),100,10,999,'Oso');G.bx+=200;
 for(let step=0;step<100;step++)updateAllies(.05);
 assert.equal(a.owner,0);assert.ok(Math.hypot(a.x-cx(),a.y-cy())<100);
}
`,ctx);
console.log('Correcto: todas las invocaciones siguen y defienden a su dueño; torres independientes, reconjurar sin borrar aliados ajenos y modos de un héroe/test.');
