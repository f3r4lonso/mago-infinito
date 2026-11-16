/* Genera preview-enemigos.html: los 34 enemigos en una cuadrícula (algunos como jefe/élite). Abrir preview-enemigos.html#<t>,<desde> con t = tiempo del juego y desde = índice del primer enemigo (8 por pantalla). */
const fs=require('node:fs');
const source=fs.readFileSync('index.html','utf8');
const start=source.indexOf('{const r0=loadRank();'),end=source.indexOf('</script>',start);
const preview=`
window.addEventListener('error',e=>{document.body.dataset.previewError=e.message});
resize();buildShop();buildSkillsMenu();buildAutoUpgradeHeaders();buildBar();buildRankBtn();buildTabs();setupDrawers();setupTip();
ONE_NEXT=true;newGame('mage');G.heroInv=1e6;
let waited=0;
const wait=setInterval(()=>{
  waited+=100;if(!SPR.on&&waited<3000)return;clearInterval(wait);
  const hs=(location.hash||'#0').slice(1).split(',');const t=parseFloat(hs[0])||0,from=parseInt(hs[1])||0;
  EN.slice(from).forEach((d,i)=>{const col=i%8,row=(i/8)|0;
    spawnEnemy(false,d,{x:cx()+(col-3.5)*110,y:cy()-110+row*110});
    const e=G.enemies[G.enemies.length-1];e.sp=0;e.dmg=0;e.ph=(i%2)*.5;
    if(from===0&&(i===5||i===20||i===27))e.boss=true;if(from===0&&(i===9||i===15))e.elite=true;if(from>0&&i===7)e.boss=true;});
  G.t=t;G.paused=false;resize();
  document.body.dataset.done='1';
  (function repaint(){draw();requestAnimationFrame(repaint)})();
},100);
`;
fs.writeFileSync('preview-enemigos.html',source.slice(0,start)+preview+source.slice(end));
console.log('Generada preview-enemigos.html');
