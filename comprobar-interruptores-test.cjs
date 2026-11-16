const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
vm.runInContext(`{
buildHeroMenu=()=>{};refreshAll=()=>{};W=1100;H=700;
const setup=hero=>{SOLO_NEXT=true;newGame(hero);G.noSpawn=true;recalc()};
for(const hero of Object.keys(HEROES)){
 setup(hero);G.pending=20;
 for(const skill of CLS[hero])G.cls[skill.id]=10;
 G.tv++;recalc();const levels={...G.cls};
 setAllSoloPowers(false);assert.ok(CLS[hero].every(s=>clv(s.id)===0));assert.equal(soloPowerEnabled('basic'),false);
 assert.deepEqual(G.cls,levels);assert.equal(G.pending,20);
 const target=CLS[hero][0];setSoloPowerEnabled(target.id,true);
 assert.equal(clv(target.id),10);assert.ok(CLS[hero].filter(s=>s.id!==target.id).every(s=>clv(s.id)===0));
 assert.equal(learnedClv(target.id),10);assert.equal(G.pending,20);
 setAllSoloPowers(true);assert.deepEqual(G.cls,levels);assert.ok(CLS[hero].every(s=>clv(s.id)===10));
 setSoloPowerEnabled(target.id,false);assert.equal(heroUp(target.id,'pt'),true);assert.equal(learnedClv(target.id),11);assert.equal(clv(target.id),0);
 assert.equal(upgradeOptions('hero').find(s=>s.id===target.id).level,11);
 assert.ok(heroTip0(target).includes('Nivel 11 /'));
 setSoloPowerEnabled(target.id,true);assert.equal(clv(target.id),11);
}
setup('mage');spawnEnemy(false,EN[0],{x:cx()+100,y:cy(),hpAbs:100000,dmg:0,sp:0,r:12,xp:0,gold:0});const enemy=G.enemies[0];enemy.res={};
setSoloPowerEnabled('basic',false);fireBasic();assert.equal(G.projs.length,0);assert.equal(G.atkN||0,0);
setSoloPowerEnabled('basic',true);fireBasic();assert.ok(G.projs.length>0);assert.ok(enemy.pending>0);
setSoloPowerEnabled('basic',false);assert.equal(G.projs.length,0);assert.equal(enemy.pending,0);
// Activas: el conjuro aislado actúa; deshabilitado no se ejecuta ni consume su recarga.
G.cls.i_cold=10;G.tv++;setSoloPowerEnabled('i_cold',false);G.ht.i_cold=0;
for(let i=0;i<100;i++){G.t+=.05;updateHero(.05)}assert.equal(enemy.hp,enemy.max);
setSoloPowerEnabled('i_cold',true);G.ht.i_cold=0;
for(let i=0;i<100;i++){G.t+=.05;updateHero(.05)}assert.ok(enemy.hp<enemy.max||G.projs.length>0||Object.keys(enemy.dots).length>0);
// Pasivas: la defensa se recalcula, sin borrar el nivel aprendido.
setup('dwarf');G.cls.d_armor=10;G.tv++;recalc();const armored=S.def;
setSoloPowerEnabled('d_armor',false);assert.ok(S.def>armored);assert.equal(learnedClv('d_armor'),10);
setSoloPowerEnabled('d_armor',true);assert.equal(S.def,armored);
// La partida normal ignora cualquier interruptor residual.
setup('mage');G.cls.i_cold=8;selectSoloTest('i_cold');assert.equal(G.soloTestRunning,false);
G.soloSupportBasic=true;runSoloTest();assert.equal(G.soloTestRunning,true);assert.equal(clv('i_cold'),8);assert.ok(soloPowerEnabled('basic'));assert.ok(G.enemies.length>0);
stopSoloTest();assert.equal(G.soloTestRunning,false);assert.equal(clv('i_cold'),0);assert.equal(learnedClv('i_cold'),8);
selectSoloTest('anim:walk');runSoloTest();assert.equal(G.soloAnimation,'walk');assert.equal(G.paused,true);stopSoloTest();assert.equal(G.soloAnimation,'idle');
selectSoloTest('inexistente');assert.equal(G.soloTestChoice,'anim:walk');
// Panel libre: cualquier héroe puede cambiar de nivel sin puntos ni XP.
for(const hero of Object.keys(HEROES)){
 setup(hero);G.pending=0;G.xp=0;
 const id=CLS[hero][0].id;assert.equal(heroUp(id,'pt'),true);assert.equal(learnedClv(id),1);assert.equal(G.pending,0);assert.equal(G.xp,0);
 setSoloPowerEnabled(id,false);assert.equal(setSoloSkillLevel(id,50),true);assert.equal(learnedClv(id),50);assert.equal(clv(id),0);
 setSoloSkillLevel(id,500);assert.equal(learnedClv(id),50);setSoloSkillLevel(id,-3);assert.equal(learnedClv(id),0);
 assert.equal(setSoloSkillLevel(id,'mal'),false);assert.equal(setSoloSkillLevel('inexistente',10),false);
 const time=G.t;G.paused=false;
 for(const mode of ['idle','walk','attack','hurt']){
  setSoloAnimation(mode);assert.equal(G.paused,true);G.soloAnimTime=.15;
  const pose=soloAnimationPose();assert.equal(pose.state.run,mode==='walk'?1:0);
  if(mode==='attack')assert.ok(pose.state.u>=0);if(mode==='hurt')assert.ok(pose.state.hurt>0);
  drawHero(cx(),cy());assert.equal(G.t,time);
 }
 setSoloAnimation('auto');assert.equal(G.paused,false);
 G.paused=true;setSoloAnimation('walk');setSoloAnimation('auto');assert.equal(G.paused,true);
}
// Paladín: la forma de dragón se puede probar aislada (volar, moverse, mordisco, soplo de fuego y recibir daño); los demás héroes no la ofrecen.
setup('paladin');
for(const mode of ['dragon-fly','dragon-move','dragon-bite','dragon-fire','dragon-hurt']){
 setSoloAnimation(mode);assert.equal(G.soloAnimation,mode);assert.equal(G.paused,true);G.soloAnimTime=.15;
 const pose=soloAnimationPose();assert.equal(pose.state.form,'dragon');
 assert.equal(pose.state.run,mode==='dragon-move'?1:0);
 if(mode==='dragon-bite'||mode==='dragon-fire')assert.ok(pose.state.u>=0);
 assert.equal(pose.fire>=0,mode==='dragon-fire');if(mode==='dragon-hurt')assert.ok(pose.state.hurt>0);
 drawHero(cx(),cy());
}
setSoloAnimation('auto');
setup('mage');setSoloAnimation('walk');assert.equal(soloAnimationPose().state.form,0);setSoloAnimation('auto');
newGame('mage');G.soloDisabled={basic:true,i_cold:true};G.cls.i_cold=10;assert.equal(clv('i_cold'),10);assert.equal(soloPowerEnabled('basic'),true);
G.pending=0;assert.equal(heroUp(CLS.mage[0].id,'pt'),false);assert.equal(setSoloSkillLevel(CLS.mage[0].id,50),false);
}`,ctx);
console.log('Correcto: interruptores individuales, Todo ON/OFF, niveles y compras conservados, ataque básico, habilidades activas y pasivas, limpieza de efectos y partidas normales.');
