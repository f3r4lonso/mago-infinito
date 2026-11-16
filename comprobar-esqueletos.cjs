const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
vm.runInContext(`
buildHeroMenu=()=>{};refreshAll=()=>{};W=1100;H=700;
for(let level=1;level<=50;level++){
 newGame('mage');G.tower.lvl=level;G.spLv.skel=level;G.tv++;recalc();
 const f=tf('skel'),oldCount=3+Math.floor(level/6)+Math.floor((level-1)/3)+f.cnt;
 const necro=addAlly('skel',cx(),cy(),100,10,999,'Esqueletos del nigromante');necro.perm=true;
 SRC='Soldados esqueleto';castSpecial('skel');
 const guard=()=>G.allies.filter(a=>a.tower&&a.hp>0);
 const n=towerSkeletonLimit();
 assert.equal(guard().length,n);assert.equal(n%2,0);assert.ok(n<=Math.max(2,oldCount/2));
 assert.equal(guard().filter(a=>a.kind==='skelA').length,n/2);
 assert.ok(Math.abs(guard()[0].max/(60*(1+.15*level)*spK(level)*f.hpm)-1.12)<1e-10);
 assert.ok(Math.abs(guard()[0].dmgAbs/((18+4*level)*S.dmg*spK(level)*3)-.504)<1e-10);
 assert.ok(n<=8);
 for(let i=0;i<10;i++)castSpecial('skel');assert.equal(guard().length,n);
 const fallen=guard().find(a=>a.kind==='skelA');fallen.hp=0;castSpecial('skel');
 assert.equal(guard().length,n);assert.equal(guard().filter(a=>a.kind==='skelA').length,n/2);
 assert.ok(G.allies.includes(necro));
}
newGame('mage');recalc();
const a=addAlly('skelA',cx(),cy(),100,75,999,'Soldados esqueleto');a.tower=true;
spawnEnemy(false,EN[0],{x:cx()+150,y:cy()});const e=G.enemies.at(-1);
Object.assign(e,{hp:10000,max:10000,res:{},pending:0});
updateAllies(.01);assert.equal(e.hp,10000);
const p=G.projs.find(p=>p.skelArrow);assert.ok(p&&p.arrow);assert.equal(p.src,'Soldados esqueleto');
assert.equal(p.dmg,75);assert.equal(e.pending,75);
hitEnemy(p,e);release(p);assert.equal(e.hp,9925);assert.equal(e.pending,0);
// Los arqueros no dibujan la hoja de espada de los guerreros.
const poly=hPoly;let swords=0;hPoly=(c,pts,...args)=>{if(pts.length===10&&pts[2]===15&&pts[4]===17)swords++;return poly(c,pts,...args)};
const o={t:0,ph:0,sp:0,u:-1};const c=cv.getContext('2d');
AL.skelA(c,a,o);assert.equal(swords,0);AL.skel(c,a,o);assert.equal(swords,1);
drawArrow(p);
`,ctx);
console.log('Correcto: guardia limitada y equilibrada en niveles 1–50, reposición, fuerza individual, flechas con daño al impactar y arqueros sin espada.');
