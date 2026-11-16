/* Genera preview-mago-v2.html: partida real con el mago, sprites PNG activos y varias habilidades lanzándose.
   Uso: node tools/previsualizar-mago-v2.cjs  y abrir preview-mago-v2.html#<pasos>[,<héroe>]  (por ejemplo #120,alchemist)  (pasos de .05 s a simular) */
const fs=require('node:fs');
const source=fs.readFileSync('index.html','utf8');
const start=source.indexOf('{const r0=loadRank();'),end=source.indexOf('</script>',start);
if(start<0||end<0)throw Error('No se encuentra el arranque del juego');
const preview=`
window.addEventListener('error',e=>{document.body.dataset.previewError=e.message});
resize();buildShop();buildSkillsMenu();buildAutoUpgradeHeaders();buildBar();buildRankBtn();buildTabs();setupDrawers();setupTip();
const HERO=((location.hash||'#120').slice(1).split(',')[1])||'mage';
ONE_NEXT=true;newGame(HERO);G.lvl=40;G.gold=99999;
for(const a of CLS[HERO])G.cls[a.id]=Math.min(40,CLSMAX);
G.tower.lvl=40;for(const k of SK)G.skills[k.id]=12;for(const sp of SPS)G.spLv[sp.id]=15;
G.tv=(G.tv||0)+1;recalc();G.hp=S.maxHp;G.heroInv=1e6;
for(const sp of SPS)G.spFire[sp.id]=true;
try{buyEgg()}catch(e){}
refreshAll();refreshBar();
const steps=parseInt((location.hash||'#120').slice(1).split(',')[0])||120;
let waited=0;
const wait=setInterval(()=>{
  waited+=100;
  if(!(SPR.on)&&waited<3000)return;
  clearInterval(wait);
  for(let i=0;i<22;i++){const a=i*Math.PI/11;spawnEnemy(false,EN[i%EN.length],{x:cx()+Math.cos(a)*(150+(i%3)*55),y:cy()+Math.sin(a)*(120+(i%3)*45)})}
  G.paused=false;
  for(let i=0;i<steps;i++){G.heroInv=1e6;update(.05);if(i%40==0&&G.enemies.length<14)for(let k=0;k<6;k++){const a=Math.random()*6.28;spawnEnemy(false,EN[k%EN.length],{x:cx()+Math.cos(a)*220,y:cy()+Math.sin(a)*170})}}
  G.paused=false;resize();document.body.dataset.hx=String(Math.round(hx()));document.body.dataset.hy=String(Math.round(hy()));refreshAll();(function repaint(){draw();requestAnimationFrame(repaint)})();
  document.body.dataset.sprOn=String(SPR.on);document.body.dataset.done='1';
},100);
`;
fs.writeFileSync('preview-mago-v2.html',source.slice(0,start)+preview+source.slice(end));
console.log('Generada preview-mago-v2.html');
