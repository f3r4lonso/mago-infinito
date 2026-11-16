const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
vm.runInContext(`
{
const realBuildPanel=buildHeroPanel;
buildHeroMenu=()=>{};refreshAll=()=>{};W=1100;H=700;
function setup(hero='mage'){SOLO_NEXT=true;newGame(hero);G.pending=3;recalc()}
setup();assert.equal(G.soloWeak,true);
G.t=3600;G.lvl=50;recalc();spawnSoloEnemies(20,true);
assert.equal(G.enemies.length,4);
for(const e of G.enemies){assert.equal(e.hp,30);assert.equal(e.dmg,1);assert.equal(e.sp,42);assert.equal(e.boss,false);assert.ok(!e.elite);assert.deepEqual(e.res,{})}
// Ninguna vía automática añade jefes ni oleadas; el botón de pausa sigue funcionando.
G.nextWave=0;G.nextBoss=0;G.nextSiege=0;
for(let i=0;i<200;i++){G.hp=S.maxHp;update(.05);assert.ok(G.enemies.length<=4);assert.ok(G.enemies.every(e=>e.n==='Goblin de práctica'&&!e.boss))}
clearSoloArena();G.noSpawn=true;G.soloSpawnTimer=0;update(.05);assert.equal(G.enemies.length,0);
G.noSpawn=false;update(.05);assert.equal(G.enemies.length,1);
clearSoloArena();update(.05);assert.equal(G.enemies.length,0);
G.soloSpawnTimer=0;update(.05);assert.equal(G.enemies.length,1);
setSoloWeak(false);assert.equal(G.enemies.length,0);spawnSoloEnemies(1,true);assert.equal(G.enemies[0].boss,true);
setSoloWeak(true);assert.equal(G.enemies.length,0);assert.equal(G.spawnAcc,0);
// El modo progresivo usa apariciones continuas, sin oleadas, asedios ni jefes automáticos.
setup();setSoloWeak(false);G.nextWave=G.nextBoss=G.nextSiege=0;G.heroInv=1e6;
const wave=spawnWave,siege=spawnSiege,spawn=spawnEnemy;let waves=0,sieges=0,bosses=0,arrivals=0;
spawnWave=()=>waves++;spawnSiege=()=>sieges++;
spawnEnemy=(boss,...args)=>{arrivals++;if(boss)bosses++;return spawn(boss,...args)};
for(let i=0;i<1400;i++){G.hp=S.maxHp;update(.05)}
assert.ok(arrivals>10);assert.equal(waves+sieges+bosses,0);assert.equal(G.heroes.length,1);
clearSoloArena();const oldArrivals=arrivals;G.noSpawn=true;for(let i=0;i<60;i++)update(.05);assert.equal(arrivals,oldArrivals);
G.noSpawn=false;G.spawnAcc=1;update(.05);assert.ok(arrivals>oldArrivals);
spawnWave=wave;spawnSiege=siege;spawnEnemy=spawn;
clearSoloArena();G.t=0;spawnEnemy(false,EN[0]);const early={hp:G.enemies.at(-1).max,dmg:G.enemies.at(-1).dmg};
G.t=300;spawnEnemy(false,EN[0]);assert.ok(G.enemies.at(-1).max>early.hp);assert.ok(G.enemies.at(-1).dmg>early.dmg);
// Incluso los tipos de enjambre aparecen de uno en uno en modo test.
clearSoloArena();G.t=600;const pool=EN.filter(d=>d.from*1.6<=eT(G.t)),swarm=pool.findIndex(d=>d.swarm),random=Math.random;
assert.ok(swarm>=0);Math.random=()=>(swarm+.1)/pool.length;spawnEnemy(false);Math.random=random;assert.equal(G.enemies.length,1);
// El bloqueo de oleadas solo se aplica a la prueba, no a una partida normal.
newGame('mage');G.noSpawn=false;G.nextWave=G.nextBoss=G.nextSiege=0;
spawnWave=()=>waves++;spawnSiege=()=>sieges++;spawnEnemy=()=>{};update(.05);
assert.equal(waves,1);assert.equal(sieges,1);spawnWave=wave;spawnSiege=siege;spawnEnemy=spawn;
// Reset en todo el plantel: devuelve puntos, conserva nivel, XP, objetos y oro,
// elimina habilidades activas, invocaciones y su compra automática.
for(const hero of Object.keys(HEROES)){
 setup(hero);G.lvl=15;G.xp=7;G.gold=321;G.items.staff=2;G.pending=4;
 for(const skill of CLS[hero])G.cls[skill.id]=2;
 const refund=4; // Los niveles de prueba son gratuitos: resetear no fabrica puntos.
 G.ht={testEffect:true};G.allies=[{hp:100}];G.projs=[{dmg:100}];G.zones=[{}];G.delayed=[{}];
 G.autoUpgrades=['section:hero','slot:hero:'+CLS[hero][0].id,'section:inventory'];
 resetSoloSkills();assert.equal(G.pending,refund);assert.ok(CLS[hero].every(s=>G.cls[s.id]===0));
 assert.equal(G.lvl,15);assert.equal(G.xp,7);assert.equal(G.gold,321);assert.equal(G.items.staff,2);
 assert.deepEqual(G.ht,{});assert.equal(G.allies.length+G.projs.length+G.zones.length+G.delayed.length,0);
 assert.deepEqual(G.autoUpgrades,['section:inventory']);assert.equal(G.hp,S.maxHp);
 resetSoloSkills();assert.equal(G.pending,refund,'Reset repetido no duplica puntos');
 update(.05);assert.ok(Number.isFinite(G.hp));
}
// Los controles se crean y el reset queda junto al nombre del personaje.
const originalQuery=document.querySelector;
const nodes=new Map();
function node(){return{style:{},dataset:{},children:[],classList:{toggle:()=>{}},appendChild(c){this.children.push(c);c.parentNode=this;return c},remove(){},blur(){}}}
document.createElement=node;document.createTextNode=text=>({textContent:text});
document.querySelector=s=>{
 if(s.startsWith('#bardMelody'))return null;
 if(s==='#soloBar')return nodes.get(s)||null;
 if(!nodes.has(s)){const n=node();n.parentNode=node();nodes.set(s,n)}return nodes.get(s);
};
startSolo('mage');
assert.equal(G.noSpawn,true);assert.equal(G.soloTestChoice,'basic');assert.equal(G.soloTestRunning,false);
// Reiniciar conserva el modo de enemigos y los interruptores.
setSoloWeak(false);setSoloPowerEnabled('basic',false);soloRestart();assert.equal(G.soloWeak,false);assert.equal(soloPowerEnabled('basic'),false);
mkSlot=()=>({b:{}});realBuildPanel(0);
assert.equal(nodes.get('#soloResetSkills').onclick,resetSoloSkills);
// Fuera del modo de prueba estos controles no alteran la partida.
newGame('mage');G.pending=8;G.cls[CLS.mage[0].id]=2;resetSoloSkills();setSoloWeak(true);
assert.equal(G.pending,8);assert.equal(G.cls[CLS.mage[0].id],2);assert.ok(!G.soloWeak);
}
`,ctx);
console.log('Correcto: enemigos débiles y continuos progresivos sin oleadas, pausa, escalado, reinicio y partidas normales; reset de todo el plantel e interfaz.');
