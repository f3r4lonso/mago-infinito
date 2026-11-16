const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
vm.runInContext(`
buildHeroMenu=()=>{};refreshAll=()=>{};W=1600;H=1000;
let actions=[],attempts=[];
const originalTier=tierCast,originalBasic=fireBasic,originalQueue=queueHeroCast;
tierCast=(id,...args)=>{if(G.ht.lastAction?.kind==='skill'&&G.ht.lastAction.id===id&&G.ht.lastAction.at===G.t)actions.push({kind:'skill',id,hero:HCUR});return originalTier(id,...args)};
fireBasic=()=>{const previous=G.ht.lastAction;originalBasic();if(G.ht.lastAction!==previous)actions.push({kind:'basic',hero:HCUR})};
queueHeroCast=(rdy,id,cast)=>originalQueue(rdy,id,()=>{if(rdy(id))attempts.push({id,level:clv(id)});cast()});
function setup(hero='mage'){
 SOLO_NEXT=true;newGame(hero);G.noSpawn=true;
 for(let i=0;i<10;i++){
  spawnEnemy(false,EN[0],{x:cx()+40+i*8,y:cy()+(i%2)*10});
  Object.assign(G.enemies.at(-1),{hp:1e9,max:1e9,res:{},pending:0});
 }
 actions=[];attempts=[];
}
function level(id,l){G.cls[id]=l;G.ht[id]=0;G.tv++;recalc()}
function tick(dt=.05){actions=[];attempts=[];G.t+=dt;updateHero(dt);return actions}
// Prioridad por nivel, incluso si el código de la habilidad aparece después.
setup();level('i_cold',1);level('i_meteor',10);level('i_emp',5);
tick();assert.deepEqual(actions.map(a=>a.id),['i_meteor']);
const wait=G.basicCd,coldCd=G.ht.i_cold;
tick(wait/2);assert.equal(actions.length,0);assert.equal(G.ht.i_cold,coldCd);
tick(wait/2+.001);assert.deepEqual(actions.map(a=>a.id),['i_emp']);
// Una habilidad sin objetivos válidos permite usar la siguiente de la lista.
setup();level('i_laguna',20);level('i_cold',5);
tick();assert.deepEqual(attempts.map(a=>a.id),['i_laguna','i_cold']);assert.equal(actions[0].id,'i_cold');
// Los empates conservan un orden estable y las habilidades aún en cooldown se saltan.
setup();level('i_cold',5);level('i_meteor',5);tick();assert.equal(actions[0].id,'i_cold');
G.basicCd=0;G.ht.i_meteor=0;tick();assert.equal(actions[0].id,'i_meteor');
// Básico y habilidades comparten el mismo reloj; no basta con que termine el cooldown de la habilidad.
setup();tick();assert.equal(actions[0].kind,'basic');const delay=G.basicCd;
level('i_cold',5);tick(delay/2);assert.equal(actions.length,0);assert.equal(G.ht.i_cold,0);
tick(delay/2+.001);assert.equal(actions[0].id,'i_cold');
actions=[];fireBasic();assert.equal(actions.length,0,'no básico inmediatamente después de castear');
// Los cooldowns siguen avanzando mientras el héroe espera su próximo turno.
G.ht.i_cold=2;G.basicCd=1;tick(.1);assert.ok(Math.abs(G.ht.i_cold-1.9)<1e-9);assert.equal(actions.length,0);
// Las canalizaciones también impiden nuevas acciones.
setup('dwarf');level('d_grenade',10);G.ht.sniAim=2;tick();assert.equal(actions.length,0);
// Cada héroe conserva su propio turno y su propia animación de casteo.
newGame('mage','archer','necro','priest');G.noSpawn=true;
for(const i of HIDX())heroCtx(i,()=>{G.basicCd=0;G.castAt=-9});
heroCtx(2,()=>{G.basicCd=.75;G.castAt=4});
assert.equal(G.basicCd,0);assert.equal(G.castAt,-9);
heroCtx(2,()=>{assert.equal(G.basicCd,.75);assert.equal(G.castAt,4)});
// El bucle real de combate respeta el turno de cada uno de los cuatro héroes.
G.solo=true;G.noSpawn=true;
for(const i of HIDX())heroCtx(i,()=>{
 G.basicCd=0;
 spawnEnemy(false,EN[0],{x:cx()+60,y:cy()});Object.assign(G.enemies.at(-1),{hp:1e9,max:1e9,res:{}});
 for(const s of CLS[G.hero])G.cls[s.id]=5;
});
G.tv++;recalc();
for(let step=0;step<80;step++){
 actions=[];update(.05);
 for(const i of HIDX())assert.ok(actions.filter(a=>a.hero===i).length<=1,'dos acciones en el bucle real del héroe '+i);
}
// Kits completos: jamás dos acciones en el mismo turno, con niveles y velocidades diferentes.
for(const hero of Object.keys(HEROES))for(const highSpeed of [false,true]){
 setup(hero);
 CLS[hero].forEach((s,i)=>level(s.id,1+(i*7)%CLSMAX));
 if(highSpeed)S.atk=10;
 let count=0;
 for(let step=0;step<160;step++){
  G.hp=S.maxHp*.4;G.ht.static=30;G.ht.pbRage=5;G.ht.pbRageUntil=G.t+10;
  const old=G.basicCd;tick();
  assert.ok(actions.length<=1,hero+' ejecuta dos acciones');
  if(old>.050001)assert.equal(actions.length,0,hero+' no respeta el turno');
  for(let i=1;i<attempts.length;i++)assert.ok(attempts[i-1].level>=attempts[i].level,hero+' prioridad incorrecta');
  if(actions.length){count++;assert.ok(G.basicCd>=.34,hero+' solapa animaciones')}
 }
 assert.ok(count>0,hero+' no actúa');
}
// Las áreas y los tótems recién casteados permanecen en sus listas tras el mantenimiento.
for(const [hero,id,key] of [['shaman','c_rain','weather'],['shaman','c_thunder','stormTotems'],['troll','t_totem',null],['monk','k_gong','x5']]){
 setup(hero);level(id,5);G.ht.static=30;tick();
 assert.equal(actions[0]?.id,id);
 const list=key==='x5'?G.x5:key?G.ht[key]:G.totems;
 assert.ok(list?.length,id+' pierde su efecto al castear');
}
for(const [hero,id] of [['paladin','pl_hands'],['monk','k_bell']]){
 setup(hero);level(id,10);G.hp=S.maxHp*.2;tick();
 assert.equal(actions.length,1);assert.equal(actions[0].id,id);assert.ok(G.basicCd>0);
}
`,ctx);
console.log('Correcto: prioridad por nivel, una acción por turno, cooldown compartido con el básico, objetivos inválidos, canalizaciones, turnos independientes y 16 kits a velocidad normal/alta.');
