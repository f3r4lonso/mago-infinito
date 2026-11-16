const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const context=createGameContext(assert);
vm.runInContext(`
buildHeroMenu=()=>{};refreshAll=()=>{};W=1100;H=700;
const tot=()=>towerUnits().reduce((n,u)=>n+uLvl(u),0);   // las habilidades de la torre gastan los niveles libres de las torres (skFree)
function setup(){newGame('mage');G.pending=0;G.tpending=0;G.gold=0;G.dr.pts=0;G.skSpent=tot()}
const tpts=n=>{G.skSpent=tot()-n};
const hero=CLS.mage[0].id,first='slot:hero:'+hero;
// Prioridad global por orden de selección y renumeración al desmarcar.
setup();setAutoUpgrade(first,true);setAutoUpgrade('section:tower',true);setAutoUpgrade('slot:inventory:staff',true);
assert.deepEqual(G.autoUpgrades,[first,'section:tower','slot:inventory:staff']);
setAutoUpgrade('section:tower',false);assert.deepEqual(G.autoUpgrades,[first,'slot:inventory:staff']);
setAutoUpgrade(first,true);assert.equal(G.autoUpgrades.length,2);
const control=makeAutoUpgradeControl('slot:inventory:staff');refreshAutoUpgradeUi();
assert.equal(autoUpgradeControls.get('slot:inventory:staff').rank.textContent,'2');
setAutoUpgrade(first,false);assert.equal(autoUpgradeControls.get('slot:inventory:staff').rank.textContent,'1');
// Cada grupo usa solo sus propios puntos; se saltan las prioridades sin fondos.
setup();setAutoUpgrade(first,true);setAutoUpgrade('slot:tower:arcane',true);tpts(1);
assert.equal(runAutoUpgrades(),1);assert.equal(G.skills.arcane,1);assert.equal(G.cls[hero],0);assert.equal(G.pending,0);assert.equal(skFree(),0);
G.pending=1;assert.equal(runAutoUpgrades(),1);assert.equal(G.cls[hero],1);assert.equal(G.gold,0);
// (las mejoras del dragón ya no usan puntos propios: el dragón se prepara con el huevo del inventario)
// Los puntos se gastan antes que el oro; cuando no quedan se usa oro.
setup();setAutoUpgrade('slot:tower:arcane',true);tpts(1);G.gold=1000;const gold=G.gold;
runAutoUpgrades(1);assert.equal(G.gold,gold);assert.equal(G.skills.arcane,1);
const cost=skGoldCost(1);runAutoUpgrades(1);assert.equal(G.gold,gold-cost);assert.equal(G.skills.arcane,2);
// Una casilla cara deja comprar la siguiente sin alterar su prioridad.
setup();G.items.staff=40;setAutoUpgrade('slot:inventory:staff',true);setAutoUpgrade('slot:inventory:amulet',true);G.gold=itemCost('amulet');
assert.equal(runAutoUpgrades(),1);assert.equal(G.items.staff,40);assert.equal(G.items.amulet,1);assert.equal(G.autoUpgrades[0],'slot:inventory:staff');
// Secciones: ordenar por nivel, volver a ordenar tras cada compra y saltar lo impagable.
setup();for(const s of SK)G.skills[s.id]=5;G.skills.arcane=0;G.skills.fire=0;tpts(4);
setAutoUpgrade('section:tower',true);assert.equal(runAutoUpgrades(),4);assert.equal(G.skills.arcane,2);assert.equal(G.skills.fire,2);
setup();for(const item of ITEMS)G.items[item.id]=item.max;G.items.luck=0;G.items.amulet=1;G.gold=itemCost('amulet');
assert.ok(G.gold<itemCost('luck'));setAutoUpgrade('section:inventory',true);assert.equal(runAutoUpgrades(),1);assert.equal(G.items.luck,0);assert.equal(G.items.amulet,2);
// Una casilla seleccionada aparte conserva su prioridad incluso con su sección activa.
setup();setAutoUpgrade('section:tower',true);setAutoUpgrade('slot:tower:arcane',true);tpts(1);
runAutoUpgrades();assert.equal(G.skills.arcane,0);assert.equal(G.skills.fire,1);
// Al máximo se desactiva automáticamente y se compactan todos los números.
setup();G.skills.arcane=SKMAX-1;tpts(1);setAutoUpgrade('slot:tower:arcane',true);setAutoUpgrade(first,true);
runAutoUpgrades();assert.equal(G.skills.arcane,SKMAX);assert.deepEqual(G.autoUpgrades,[first]);
setAutoUpgrade('slot:tower:arcane',true);assert.deepEqual(G.autoUpgrades,[first]);
setup();for(const s of SK)G.skills[s.id]=SKMAX;G.skills.arcane=SKMAX-1;tpts(1);setAutoUpgrade('section:tower',true);
runAutoUpgrades();assert.equal(G.skills.arcane,SKMAX);assert.deepEqual(G.autoUpgrades,[]);
// (los poderes de la torre ya no forman parte de las compras automáticas)
// Reponer huevo usa la misma cola; el inventario por sección solo mejora objetos permanentes.
setup();setAutoUpgrade('slot:inventory:egg',true);assert.equal(G.dr.auto,true);G.gold=G.dr.eggCost;
assert.equal(runAutoUpgrades(),1);assert.ok(G.dr.egg);assert.equal(G.autoUpgrades.length,1);assert.equal(runAutoUpgrades(),0);
setAutoUpgrade('slot:inventory:egg',false);assert.equal(G.dr.auto,false);
// (la poción ya no es un consumible de la compra automática)
setup();assert.equal(upgradeOptions('inventory').length,ITEMS.length);
// Pausa, menús y fin de partida no gastan nada; el límite por tick evita bloquear el juego.
for(const state of ['paused','over','modal']){
 setup();setAutoUpgrade(first,true);G.pending=10;G[state]=state==='modal'?'start':true;
 assert.equal(runAutoUpgrades(),0);assert.equal(G.pending,10);assert.equal(AUTO_UPGRADE_BUSY,false);
}
setup();setAutoUpgrade(first,true);G.pending=10;assert.equal(runAutoUpgrades(3),3);assert.equal(G.pending,7);
newGame('mage');assert.deepEqual(G.autoUpgrades,[]);
// La compra manual de un máximo también limpia la selección al refrescar.
setup();G.cls[hero]=CLSMAX;G.autoUpgrades=[first];pruneAutoUpgrades();assert.deepEqual(G.autoUpgrades,[]);
console.log('Correcto: prioridades, secciones equilibradas, puntos y oro, bloqueos, consumibles, límites y renumeración.');
// Partidas del motor con las cinco secciones automatizadas para todo el plantel.
for(const heroId of Object.keys(HEROES)){
 newGame(heroId);G.gold=5000;G.pending=5;G.tpending=5;G.dr.pts=5;G.tower.lvl=30;
 for(const section of Object.keys(AUTO_SECTIONS))setAutoUpgrade('section:'+section,true);
 for(let i=0;i<600&&!G.over;i++)update(.05);
 assert.ok(Number.isFinite(G.hp)&&Number.isFinite(G.gold)&&G.gold>=0,heroId);
 assert.ok(G.pending>=0&&G.tpending>=0&&G.dr.pts>=0,heroId);
 assert.equal(new Set(G.autoUpgrades).size,G.autoUpgrades.length);
 assert.equal(AUTO_UPGRADE_BUSY,false);
 assert.ok(CLS[heroId].some(a=>G.cls[a.id]>0),heroId);
}
console.log('Correcto: 16 partidas con las cinco secciones en mejora automática, sin recursos negativos ni errores.');
`,context,{timeout:10000});
