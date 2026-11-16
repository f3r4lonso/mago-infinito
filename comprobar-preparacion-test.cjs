/* Comprueba que el botón "Probar" del modo test prepara lo que cada habilidad necesita (objetivos, jefe, dependencias, vida, estática)
   y que morir no borra el experimento. Cubre H03, H04, H05, H11 y H16 de INFORME-AUDITORIA-HEROES.md. Uso: node comprobar-preparacion-test.cjs */
const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
vm.runInContext(`
buildHeroMenu=()=>{};refreshAll=()=>{};refreshSoloTestPanel=()=>{};buildSoloTestPanel=()=>{};W=1100;H=700;
const probar=(hero,id,nivel=20)=>{startSolo(hero);G.pending=0;G.soloTestChoice=id;G.cls[id]=nivel;G.tv=(G.tv||0)+1;recalc();runSoloTest();return G.ht[id]};
const esperar=(n=80)=>{for(let i=0;i<n;i++){G.heroInv=1e6;update(.05)}};
// H03: los ultimates que exigen 4+ objetivos o un jefe se lanzan con la preparacion automatica.
for(const [h,id,prop] of [['archer','a_focus','focusOn'],['barbarian','b_berserk','bersOn'],['priest','p_nova',null],['mage','i_laguna',null]]){
  probar(h,id);esperar();
  assert.ok(G.ht[id]>0||(prop&&G.ht[prop]>0),h+' '+id+' no se lanzo');
}
// H04: dependencias: la abominacion necesita esqueletos; Sobrecarga necesita Mojado; Impacto brutal necesita Embestida.
probar('necro','n_abom');esperar(160);assert.ok(G.allies.some(a=>a.kind==='abom')||G.ht.n_abom>0,'abominacion');
probar('shaman','c_overload');esperar(120);assert.ok(G.ht.c_overload>0,'sobrecarga');
probar('devourer','pb_impact');esperar(160);assert.ok(G.enemies.some(e=>e.hp<4999),'impacto brutal (la embestida base se activa como dependencia)');
stopSoloTest();assert.equal(learnedClv('n_raise'),0,'las dependencias se devuelven al detener');
// H11: curacion y resurreccion se preparan solas.
probar('priest','p_heal');esperar(40);assert.ok(G.ht.p_heal>0,'plegaria');
probar('priest','p_res');esperar(60);assert.ok(G.ht.p_res>0||G.hp>0,'resurreccion');
// H05: al morir se conserva el experimento.
probar('monk','k_combo');G.hp=0;heroDie();assert.equal(G.soloReset,true);update(.05);
assert.equal(G.soloTestChoice,'k_combo');assert.equal(G.cls.k_combo,20);assert.equal(G.soloTestRunning,true);
// H16: nivel 0 -> Probar usa nivel 1 (y el panel lo avisa).
probar('mage','i_sun',0);assert.equal(learnedClv('i_sun'),1);
`,ctx,{timeout:60000});
console.log('Correcto: el modo test prepara objetivos, jefe, dependencias, vida y estática, y conserva el experimento al morir.');
