const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');const ctx=createGameContext(assert);
vm.runInContext(`{
buildHeroMenu=()=>{};refreshAll=()=>{};W=1100;H=700;
function setup(){ONE_NEXT=true;newGame('mage');G.noSpawn=true;beginRounds();startRound();G.heroInv=1e6}
function foe(){spawnEnemy(false,EN[0],{x:cx()+100,y:cy(),hpAbs:1e8,dmg:0,sp:0,r:12,xp:0,gold:0});const e=G.enemies.at(-1);e.res={};return e}
// El tiempo es necesario, pero no suficiente: no desaparecen los enemigos.
setup();const e=foe();G.roundT=G.roundLen-.01;G.spawnAcc=50;G.nextBoss=G.nextWave=G.nextSiege=0;G.noSpawn=false;
update(.05);assert.equal(G.round,1);assert.equal(G.modal,null);assert.equal(G.paused,false);assert.equal(e.dead,false);assert.equal(G.enemies.length,1);
assert.equal(endRound(),false);assert.ok(e.hp>0);
for(let i=0;i<100;i++)update(.05);assert.equal(G.enemies.length,1,'No hay apariciones, oleadas, jefes ni asedios en limpieza');
assert.equal(G.spawnAcc,50,'No se acumulan nuevas apariciones tras el tiempo');
kill(e);update(.05);assert.equal(G.modal,'round');assert.equal(G.round,2);assert.equal(G.enemies.length,0);
startRound();assert.equal(G.roundT,0);assert.equal(G.spawnAcc,0);assert.ok(G.nextBoss>G.t&&G.nextWave>G.t&&G.nextSiege>G.t,'Sin eventos atrasados al iniciar');
// Eliminar al último antes del tiempo tampoco termina la ronda.
setup();const early=foe();kill(early);update(.05);assert.equal(G.round,1);assert.equal(G.modal,null);
G.roundT=G.roundLen-.01;update(.05);assert.equal(G.round,2);assert.equal(G.modal,'round');
// Las resurrecciones siguen contando hasta la muerte definitiva.
setup();const revived=foe();revived.revive=1;G.roundT=G.roundLen;kill(revived);update(.05);
assert.equal(revived.dead,false);assert.equal(G.round,1);kill(revived);update(.05);assert.equal(G.round,2);
// Los hijos que deja un enemigo también deben ser derrotados.
setup();const splitter=foe();splitter.split={n:2,gen:1};G.roundT=G.roundLen;kill(splitter);update(.05);
assert.equal(G.round,1);const children=G.enemies.filter(e=>!e.dead);assert.equal(children.length,2);
for(const child of children)kill(child);update(.05);assert.equal(G.round,2);
// La última baja causada por un proyectil cierra la ronda en ese mismo paso.
setup();const hit=foe();G.roundT=G.roundLen;
G.projs.push({kind:'home',x:hit.x,y:hit.y,spd:1000,dmg:1e9,type:'magic',tgt:hit,exp:0,life:3,src:'Disparo arcano'});
update(.05);assert.equal(hit.dead,true);assert.equal(G.modal,'round');assert.equal(G.round,2);
// El modo test no entra en esta lógica, y un game over no se transforma en victoria de ronda.
SOLO_NEXT=true;newGame('mage');assert.equal(roundCleared(),false);
setup();G.roundT=G.roundLen;G.over=true;assert.equal(endRound(),false);assert.equal(G.round,1);
}`,ctx);
console.log('Correcto: tiempo y última baja, limpieza sin nuevas apariciones, resurrecciones, división, proyectiles, siguiente ronda y derrota.');
