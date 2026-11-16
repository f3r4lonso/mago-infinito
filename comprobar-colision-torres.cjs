const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
vm.runInContext(`
buildHeroMenu=()=>{};refreshAll=()=>{};W=1100;H=700;
const clear=()=>{for(const t of aliveTowers())assert.ok(Math.hypot(cx()-towX(t.i),cy()-towY(t.i))>=TOWER_R+16-1e-7,G.hero+' dentro de torre '+t.i)};
function setup(hero='monk'){ONE_NEXT=true;newGame(hero);recalc()}
// Todos los héroes salen de un destino ocupado por una torre (teletransporte).
for(const hero of Object.keys(HEROES)){
 setup(hero);G.bx=towX()-hx()-G.hoff;G.by=towY()-hy();avoidHeroTowers();clear();
}
// Deben llegar al enemigo situado al otro lado, sin atascarse en la torre.
setup();G.bx=towX()-100-hx()-G.hoff;G.by=towY()-hy();
spawnEnemy(false,EN[0],{x:towX()+160,y:towY()});
for(let i=0;i<500;i++){G.t+=.02;updateMelee(.02);clear()}
assert.ok(cx()>towX()+70,'El héroe debe rodear la torre y llegar al otro lado');
// Un desplazamiento rápido que cruzaría el diámetro tampoco atraviesa la base.
setup();G.by=towY()-hy();G.bx=-20;const ox=G.bx,oy=G.by;G.bx+=100;avoidHeroTowers(ox,oy);clear();
assert.ok(cy()!==towY(),'El desplazamiento debe desviarse alrededor de la base');
// También se bloquean las torres adicionales, pero no sus ruinas.
G.tower.satellites.push({lvl:1,hp:500});G.bx=towX(1)-hx()-G.hoff;G.by=towY(1)-hy();avoidHeroTowers();clear();
G.tower.satellites[0].dead=true;G.bx=towX(1)-hx()-G.hoff;G.by=towY(1)-hy();const bx=G.bx,by=G.by;avoidHeroTowers();assert.equal(G.bx,bx);assert.equal(G.by,by);
// Resurrección y las cuatro posiciones del equipo.
newGame('mage','monk','priest','barbarian');for(const i of HIDX())heroCtx(i,()=>{heroRevive();clear()});
// El modo de prueba no tiene torres físicas.
SOLO_NEXT=true;newGame('mage');G.bx=0;G.by=-30;avoidHeroTowers();assert.equal(G.bx,0);assert.equal(G.by,-30);
`,ctx);
console.log('Correcto: héroes rodean torres, no se solapan al desplazarse o reaparecer, colisión con torres adicionales y paso libre por ruinas y modo prueba.');
