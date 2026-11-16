const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
vm.runInContext(`
buildHeroMenu=()=>{};refreshAll=()=>{};W=2000;H=1200;
const ranged=Object.keys(HEROES).filter(h=>!HEROES[h].melee);
assert.equal(new Set(ranged.map(h=>HRANGE[h][0])).size,ranged.length,'alcances únicos');
assert.equal(new Set(ranged.map(h=>HRANGE[h][1])).size,ranged.length,'visión propia');
for(const h of ranged){
 ONE_NEXT=true;newGame(h);
 assert.equal(heroShot(),HRANGE[h][0]);assert.ok(heroVision()>heroShot());
 if(h==='dwarf'){
  G.cls.d_aim=50;G.tv++;recalc();
  assert.ok(heroShot()>Math.max(...ranged.filter(x=>x!=='dwarf').map(x=>HRANGE[x][0])));
 }
}
// Cuatro héroes parten superpuestos y atacan a la misma presa sin amontonarse.
for(let start=0;start<ranged.length;start++){
 const team=Array.from({length:4},(_,i)=>ranged[(start+i)%ranged.length]);
 newGame(...team);G.solo=true;
 for(const i of HIDX())heroCtx(i,()=>{G.hoff=0;G.bx=400;G.by=0});
 spawnEnemy(false,EN[0],{x:W/2,y:H/2});
 Object.assign(G.enemies.at(-1),{hp:1e8,max:1e8,pending:0});
 for(let step=0;step<240;step++){
  G.t+=.05;eachHero(()=>updateMelee(.05));
 }
 const positions=HIDX().map(heroPos);
 for(let i=0;i<positions.length;i++){
  const p=positions[i];
  for(let j=i+1;j<positions.length;j++)assert.ok(Math.hypot(p.x-positions[j].x,p.y-positions[j].y)>=47.9,team[i]+' se solapa con '+team[j]);
  heroCtx(i,()=>{
   const before=G.projs.length;G.basicCd=0;fireBasic();
   assert.ok(G.projs.length>before,G.hero+' sigue disparando: distancia '+Math.hypot(cx()-W/2,cy()-H/2)+' / alcance '+heroShot());
  });
 }
}
`,ctx);
console.log('Correcto: alcances distintos para todos los héroes de rango, mejora de alcance del enano y separación de equipos contra el mismo enemigo sin impedir sus disparos.');
