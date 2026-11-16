/* Genera assets/tier-glyphs.js: el símbolo de cada una de las 4 mejoras de las habilidades de todos los héroes,
   deducido del texto del efecto (duración, daño, enfriamiento, radio, cantidad, curación, escudo, aturdir).
   Lo usa SPR.tierIcon para componer los iconos de mejora. Uso: node tools/generar-glifos.cjs */
const fs=require('fs'),vm=require('vm'),path=require('path');
process.chdir(path.join(__dirname,'..'));
const {createGameContext}=require('../motor-pruebas.cjs');
const c=createGameContext(()=>{});
const J=e=>JSON.parse(vm.runInContext('JSON.stringify('+e+')',c));
/* los que ya tienen símbolos escritos a mano en sprites.js (mago, torre y alquimista) no se tocan */
const hechos=new Set(['i_cold','i_ghost','i_wall','i_emp','i_tornado','i_alacrity','i_sun','i_forge','i_meteor','i_blast','i_field','i_laguna',
 'arcane','fire','elec','smite','dark','spear','pulse','hail','orbit','lightning','wind','goldshot','nova','storm','skel','freeze','meteor','judge','hole','barrier','quake','spring']);
const data=J("Object.fromEntries(Object.keys(CLS).map(h=>[h,CLS[h].map(a=>({id:a.id,t:(TIERS[a.id]||[]).map(x=>x[1])}))]))");
function glifos(txt){
  const s=txt.toLowerCase(),g=[];
  const add=x=>{if(!g.includes(x))g.push(x)};
  /* orden de aparición en el texto */
  const re=[['H',/duraci|durante|dura\b/],['C',/enfriamiento|recarga/],['R',/radio|alcance|anchura|área|zona|tamaño|rango/],
    ['P',/\+\d+\s+(objetivo|flecha|hacha|lanza|salto|dagas?|daga|unidad|criatura|clon|lobo|raptor|ent|esqueleto|espíritu|meteoro|orbe|bola|cuchilla|moneda|misil|explosi|rayo|cría|golpe|mina|torreta|tótem|charco|enemigo)/],
    ['S',/escudo|vida máxima|menos daño|reduce el daño|recibe(s)? menos/],['L',/curaci|cura\b|regener|vida\/s|robo de vida/],
    ['T',/aturd|ralentiz|congela|petrific|silenci|inmoviliz|empuj|miedo|huir/],['D',/daño|crítico|veneno|sangrado|quemadura|velocidad|ataque/]];
  const pos=re.map(([k,r])=>{const m=s.match(r);return m?[m.index,k]:null}).filter(Boolean).sort((a,b)=>a[0]-b[0]);
  for(const [,k] of pos)add(k);
  return (g.slice(0,3).join('+'))||'D';
}
const out={};
for(const h in data){
  if(h==='mage'||h==='alchemist')continue;
  for(const a of data[h]){
    if(hechos.has(a.id)||a.t.length<4)continue;
    out[a.id]=a.t.map(glifos);
  }
}
let js='/* Generado por tools/generar-glifos.cjs. No editar a mano. */\nSPR.addGlyphs('+JSON.stringify(out)+');\n';
fs.writeFileSync('assets/tier-glyphs.js',js);
console.log('tier-glyphs.js:',Object.keys(out).length,'habilidades');
