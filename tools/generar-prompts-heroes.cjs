/* Genera prompts-heroes/ (un archivo por hoja): 2 hojas por héroe (juego + iconos) leyendo las habilidades reales del juego.
   Uso: node tools/generar-prompts-heroes.cjs */
const fs=require('fs'),vm=require('vm'),path=require('path');
process.chdir(path.join(__dirname,'..'));
const {createGameContext}=require('../motor-pruebas.cjs');
const c=createGameContext(()=>{});
const J=e=>JSON.parse(vm.runInContext('JSON.stringify('+e+')',c));
const H=J("Object.keys(HEROES).map(h=>({id:h,n:HEROES[h].n,melee:!!HEROES[h].melee,basic:HEROES[h].basic.n,skills:CLS[h].map(a=>({id:a.id,n:a.n,d:a.desc}))}))").filter(h=>h.id!=='mage');

/* Diseño original de cada héroe (sin nombres de juegos ni personajes ajenos) + aspecto del ataque básico */
const D={
 archer:{look:'a slim forest elf archer: pointed ears, silver circlet, hooded forest-green tunic, leather bracers, windswept cloak, a long bow and a quiver of arrows',basic:'an arrow flying right with a small streak',hit:'a small green-white hit spark'},
 necro:{look:'a gaunt pale necromancer: hooded tattered black-and-green robes, glowing green eyes, a bone staff topped with a skull, a belt of tiny skulls',basic:'a bone shard projectile flying right with a green trail',hit:'a green bone-dust burst'},
 dwarf:{look:'a stocky bearded dwarf gunner: riveted brass-and-leather armor, round goggles, a big rifle, a bandolier of grenades',basic:'a rifle bullet with a bright streak flying right',hit:'an orange spark burst with smoke'},
 barbarian:{look:'a tusked green-skinned orc warrior: spiked shoulder pads, war paint, fur loincloth, two big throwing axes',basic:'a spinning throwing axe flying right',hit:'a red-white slash impact'},
 demon:{look:'a lean masked demon hunter: glowing green eyes, small curved horns, dark-purple leather armor, two curved scythe blades',basic:'a spinning curved green scythe blade flying right',hit:'a green slash burst'},
 priest:{look:'a holy priest: white-and-gold robes, a floating golden halo, a staff topped with a sun emblem, kind face',basic:'a golden-white holy light ray flying right',hit:'a golden light burst'},
 monk:{look:'a chubby panda monk: black-and-white panda body, orange martial-arts vest, red headband, wrapped fists',basic:'a golden chi energy fist punching to the right',hit:'a golden chi impact ring'},
 paladin:{look:'an armored knight in dragon-themed armor: red-and-gold plate, dragon-scale helmet with horns, small dragon wings on the back, a big shield with a dragon emblem, a sword',basic:'a golden-white sword slash crescent arc to the right',hit:'a golden-white slash impact'},
 troll:{look:'a lean long-limbed blue-green jungle troll hunter: long tusks, tribal beads, a red mohawk, several tribal spears',basic:'a tribal throwing spear flying right',hit:'a green-brown hit spark'},
 werewolf:{look:'a muscular grey-furred werewolf: torn trousers, sharp claws, glowing yellow eyes, snarling',basic:'three red-white claw slash marks to the right',hit:'a red claw impact burst'},
 druid:{look:'a tall bull-headed nature druid: big horns, leafy robes, totem necklace, a wooden staff with a crescent moon',basic:'a green-white nature wrath bolt flying right',hit:'a green leafy burst'},
 devourer:{look:'a huge hulking shaggy brown beast: stone plates on the shoulders, big tusks, massive fists, small head',basic:'a rocky claw swipe shockwave arc to the right',hit:'a brown rock-dust impact'},
 shaman:{look:'a lean tribal storm shaman: feather headdress, blue lightning markings on the skin, a staff crackling with electricity, a small swirling rain cloud',basic:'a blue-white static lightning bolt flying right',hit:'a blue electric spark burst'},
 assassin:{look:'a slim hooded assassin: dark red-grey cloth, face mask, long scarf, two daggers',basic:'a thrown dagger flying right',hit:'a white slash spark'},
 alchemist:{look:'a big green-skinned ogre alchemist: leather apron, goggles, a backpack of bubbling colored flasks, a mortar',basic:'a spinning corrosive green flask flying right',hit:'a green acid splash'}
};
const IP=/Magina|Phantom Assassin|Dragon Knight|Primal Beast|Windranger|Drow|Invoker|Lich|Crystal Maiden|Lina|Pudge|Lycan|Balanar|Onslaught|Trample|Uproar/gi;
const clean=s=>(s||'').replace(/\s*\([^)]*\)/g,'').replace(IP,'').replace(/[★]/g,'').replace(/\s+/g,' ').trim();
const nm=s=>clean(s);
const ds=s=>{let t=clean(s).split('. ')[0];if(t.length>105)t=t.slice(0,102).replace(/\s\S*$/,'');return t.replace(/\.$/,'')};
const ult=s=>/ULTIMATE/i.test(s.n);

const STYLE1=`Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.`;
let out=`# Prompts de arte: los 15 héroes restantes (2 hojas por héroe)

Mismo método que el mago, la torre y los enemigos. **Cada héroe necesita 2 generaciones**:

| Hoja | Contiene | Celdas |
|---|---|---|
| **1: juego** | Héroe de pie, héroe atacando, ataque básico, impacto y **2 efectos por habilidad** (24) | 28 (7×4) |
| **2: iconos** | 12 iconos de habilidad + icono del héroe, icono del ataque básico y retrato | 18 (6×3, 3 vacías) |

Total: **30 generaciones** para los 15 héroes. Este documento lo genera \`tools/generar-prompts-heroes.cjs\` leyendo las habilidades reales del juego: si cambias un kit, vuelve a ejecutarlo.

## Flujo (por héroe)
1. **Hoja 1:** adjunta \`mago_hoja1.png\` y \`torre_hoja1.png\` como referencia de estilo.
2. **Hoja 2:** adjunta la Hoja 1 de ese héroe y \`mago_hoja2.png\`.
3. Fondo magenta \`#FF00FF\`, resolución máxima. Si una celda sale mal, recórtala y pide solo ese sprite.

## Cómo funciona cada habilidad en la Hoja 1
Cada habilidad ocupa **2 celdas seguidas**:
- **A:** lo que aparece al lanzarla (proyectil, aura, invocación, marca).
- **B:** su resultado (impacto, zona, explosión, criatura).

Si la habilidad es pasiva (críticos, velocidad de golpe, esquiva…), dibuja un efecto simbólico pequeño (destello, aura, símbolo).

## Qué NO se pide
- **Iconos de mejora** (los compone el código), jefes, marcos y estrellas.
- **Animación por partes:** el héroe es un sprite completo; el juego lo anima con rebote, inclinación y volteo.

## Reglas de derechos
Diseños **originales**: no cites juegos, personajes ni marcas. Compara cada héroe con personajes conocidos antes de publicar y cambia rasgos si se parece demasiado a uno. Los textos de las habilidades vienen del juego: algunos **nombres** (por ejemplo "Carrera del viento" o "Golpe de gracia") reproducen los de otros juegos; renómbralos antes de publicar.

---
`;
const dir='prompts-heroes';fs.mkdirSync(dir,{recursive:true});
let idx=out.replace('# Prompts de arte: los 15 héroes restantes (2 hojas por héroe)','# Prompts de arte: los 15 héroes restantes (un archivo por hoja)').replace('Este documento lo genera','Cada hoja tiene su **propio archivo** (30 en total). Esta carpeta la genera')+`
## Archivos (copia el contenido del bloque de código de cada uno)

| Héroe | Hoja 1: juego | Hoja 2: iconos |
|---|---|---|
`;
for(const h of H){
  const d=D[h.id];
  let p1=`SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters, NO
numbers, NO labels, NO text, NO ground shadows.

HERO: ${d.look}. Chibi proportions (big head, small body, oversized weapon), facing RIGHT.

CELLS in reading order:
1 the hero standing idle, full body
2 the same hero in an attack pose, ${h.melee?'lunging forward and swinging':'casting or shooting'} to the right
3 BASIC ATTACK "${nm(h.basic)}": ${d.basic}
4 basic attack impact: ${d.hit}
`;
  let cell=5;
  for(const sk of h.skills){
    p1+=`${cell}-${cell+1} SKILL "${nm(sk.n)}"${ult(sk)?' (ULTIMATE, make it the most epic)':''}: ${ds(sk.d)}. Cell ${cell} = effect when cast (projectile, aura, mark or summon); cell ${cell+1} = its result (impact, zone, explosion or creature)
`;
    cell+=2;
  }
  const f1=`# ${h.n}: Hoja 1 (juego)

**Héroe:** ${h.n} (\`${h.id}\`) · ${h.melee?'cuerpo a cuerpo':'a distancia'}
**Adjunta como referencia de estilo:** \`mago_hoja1.png\` y \`torre_hoja1.png\`
**Formato:** 3:2 horizontal, cuadrícula de 7 columnas × 4 filas (28 celdas)

\`\`\`
${STYLE1}

${p1}\`\`\`

**Recorte de archivos:** \`${h.id}_idle\`, \`${h.id}_atk\`, \`${h.id}_basic\`, \`${h.id}_basic_hit\`, y para cada habilidad \`fx_<id>_a\` y \`fx_<id>_b\`: ${h.skills.map(x=>'\`'+x.id+'\`').join(', ')}.

**Siguiente paso:** \`${h.id}_hoja2_iconos.md\` (adjuntando esta hoja).
`;
  let p2=`ICON SHEET: 6 columns x 3 rows, equal square game icons, each one a rounded-square tile with a
dark-purple outline and a deep purple gradient background, ONE strong readable symbol filling
80% of the tile, readable at 64 px. Tiles separated by clear magenta gaps. NO letters, NO
numbers, NO text on any icon, NO extra frames or badges.

Icons in reading order (12 skills, then 3 interface icons, last 3 cells empty):
`;
  h.skills.forEach((sk,i)=>{p2+=`${i+1} "${nm(sk.n)}": ${ds(sk.d)}
`});
  p2+=`13 the hero's head, tight crop, readable at 64 px: ${d.look.split(':')[0]}
14 the basic attack "${nm(h.basic)}" as an icon: ${d.basic}
15 waist-up portrait of the hero looking at the viewer
`;
  const f2=`# ${h.n}: Hoja 2 (iconos)

**Héroe:** ${h.n} (\`${h.id}\`)
**Adjunta como referencia:** la Hoja 1 de ${h.n} (la que acabas de generar) y \`mago_hoja2.png\`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 3 filas (15 iconos y 3 casillas vacías)

\`\`\`
Same art style and same icon tile style as the attached reference sheets (original cartoon
fantasy game art, bold thick dark-purple outline, vivid colors, glossy shading). Plain solid
magenta #FF00FF background.

${p2}\`\`\`

**Recorte de archivos:** ${h.skills.map(x=>'\`ico_'+x.id+'\`').join(', ')}, \`${h.id}_icon\`, \`${h.id}_basic_icon\`, \`${h.id}_portrait\`.
`;
  fs.writeFileSync(`${dir}/${h.id}_hoja1_juego.md`,f1);
  fs.writeFileSync(`${dir}/${h.id}_hoja2_iconos.md`,f2);
  idx+=`| ${h.n} | [\`${h.id}_hoja1_juego.md\`](${h.id}_hoja1_juego.md) | [\`${h.id}_hoja2_iconos.md\`](${h.id}_hoja2_iconos.md) |
`;
}
fs.writeFileSync(`${dir}/LEEME.md`,idx);
console.log(`prompts-heroes/: ${H.length*2} archivos de prompt + LEEME.md`);
