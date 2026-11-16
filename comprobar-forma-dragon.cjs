const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
vm.runInContext(`
{
buildHeroMenu=()=>{};refreshAll=()=>{};W=1100;H=700;
SOLO_NEXT=true;newGame('paladin');G.pending=0;G.lvl=20;G.cls.pl_wrath=10;G.cls.pl_hammer=10;G.cls.pl_throw=10;recalc();
const hp0=S.maxHp,dmg0=S.dmg,h0=hdmg(10);G.hp=hp0;
assert.equal(dragonForm(),false);
// Al transformarse: más vida máxima y más daño en todo (básico y habilidades), con la vida ganada.
G.ht.wrathOn=8;recalc();
assert.equal(dragonForm(),true);
assert.ok(S.maxHp>=Math.round(hp0*1.39)&&S.maxHp<=Math.round(hp0*1.41),'vida máxima +40%');
assert.ok(Math.abs(S.dmg/dmg0-1.3)<.001,'daño +30%');assert.ok(hdmg(10)>h0*1.29,'las habilidades también pegan más');
// Sigue pudiendo usar todas sus habilidades mientras es dragón.
for(let i=0;i<6;i++)spawnSoloEnemies(1,true);
for(const e of G.enemies){e.x=cx()+70;e.y=cy();e.hp=e.max=5000}
G.hp=S.maxHp;G.heroInv=1e6;let castHammer=false,castThrow=false;
for(let i=0;i<120&&G.ht.wrathOn>0;i++){update(.05);G.hp=S.maxHp;G.heroInv=1e6;if(G.ht.pl_hammer>0)castHammer=true;if(G.ht.pl_throw>0)castThrow=true}
assert.ok(castHammer||castThrow,'usó habilidades del paladín en forma de dragón');
// Al terminar el efecto vuelve a su estado normal: vida máxima y daño de siempre.
G.ht.wrathOn=.04;G.hp=S.maxHp;update(.05);update(.05);
assert.equal(G.ht.wrathOn,0);assert.equal(dragonForm(),false);
assert.equal(S.maxHp,hp0,'vida máxima normal');assert.ok(Math.abs(S.dmg/dmg0-1)<.001,'daño normal');assert.ok(G.hp<=S.maxHp,'la vida no supera el máximo normal');
// Otros héroes no cambian.
newGame('mage');recalc();const m0=S.maxHp;G.ht.wrathOn=5;recalc();assert.equal(S.maxHp,m0);assert.equal(dragonForm(),false);
}
`,ctx);
console.log('Correcto: Forma de dragón: +40% de vida máxima y +30% de daño en todo, sigue usando sus habilidades y vuelve a lo normal al terminar.');
