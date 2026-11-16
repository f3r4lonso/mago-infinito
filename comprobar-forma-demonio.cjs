const vm=require('node:vm'),assert=require('node:assert/strict');
const {createGameContext}=require('./motor-pruebas.cjs');
const ctx=createGameContext(assert);
vm.runInContext(`
{
buildHeroMenu=()=>{};refreshAll=()=>{};W=1100;H=700;
SOLO_NEXT=true;newGame('demon');G.pending=0;G.lvl=20;G.cls.z_meta=10;G.cls.z_dagger=10;G.cls.z_eyes=10;recalc();
const hp0=S.maxHp,dmg0=S.dmg,h0=hdmg(10);G.hp=hp0;
assert.equal(demonForm(),false);
// Metamorfosis: más daño en todo (ataque básico y habilidades); la vida máxima no cambia.
G.ht.metaOn=8;recalc();
const k=(1.3+.02*10)*tf('z_meta').dm;
assert.equal(demonForm(),true);
assert.ok(Math.abs(S.dmg/dmg0-k)<.001,'daño +'+Math.round((k-1)*100)+'%');assert.ok(hdmg(10)>h0*(k-.01),'las habilidades también pegan más');
assert.equal(S.maxHp,hp0,'la vida máxima no cambia');
// Sigue pudiendo usar todas sus habilidades mientras es demonio.
for(let i=0;i<6;i++)spawnSoloEnemies(1,true);
for(const e of G.enemies){e.x=cx()+90;e.y=cy();e.hp=e.max=9000}
G.hp=S.maxHp;G.heroInv=1e6;let castDagger=false,castEyes=false;
for(let i=0;i<140&&G.ht.metaOn>0;i++){update(.05);G.hp=S.maxHp;G.heroInv=1e6;if(G.ht.z_dagger>0)castDagger=true;if(G.ht.z_eyes>0)castEyes=true}
assert.ok(castDagger||castEyes,'usó habilidades del cazador en forma de demonio');
// Al terminar el efecto vuelve a su estado normal.
G.ht.metaOn=.04;G.hp=S.maxHp;update(.05);update(.05);
assert.equal(G.ht.metaOn,0);assert.equal(demonForm(),false);
assert.ok(Math.abs(S.dmg/dmg0-1)<.001,'daño normal');
// Otros héroes no cambian.
newGame('mage');recalc();const d0=S.dmg;G.ht.metaOn=5;recalc();assert.equal(S.dmg,d0);assert.equal(demonForm(),false);
}
`,ctx);
console.log('Correcto: Metamorfosis: más daño en todo (básico y habilidades), sigue usando sus habilidades y vuelve a lo normal al terminar.');
