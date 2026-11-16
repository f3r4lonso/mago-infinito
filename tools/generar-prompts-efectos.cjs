/* Genera prompts-efectos/: hojas "solo efectos" (sin héroe dentro) para las habilidades que aún se dibujan por código.
   Cada habilidad lleva su nº de fotogramas; el script las reparte en hojas de 6x4 = 24 celdas sin partir ninguna habilidad.
   Uso: node tools/generar-prompts-efectos.cjs */
const fs=require('fs'),path=require('path');
process.chdir(path.join(__dirname,'..'));
const OUT='prompts-efectos';fs.mkdirSync(OUT,{recursive:true});

/* [id de habilidad, nombre, nº de fotogramas, secuencia en inglés, nombre de recorte] */
const H={
common1:{n:'Efectos comunes 1: invocar, curar, escudo y estados',s:[
 ['(varias)','Invocación (nube mágica)',4,'a puff of magic smoke and sparkles appearing, expanding and thinning out','fx_summon'],
 ['(varias)','Curación',4,'green healing light: sparkles and small plus signs rising up, bright then fading','fx_heal'],
 ['(varias)','Escudo / burbuja (bucle)',4,'a translucent blue-white energy bubble with a soft rim, gently pulsing, loop','fx_shield'],
 ['(varias)','Aturdido',3,'three yellow stars circling in a ring (loop, each frame the stars rotate)','fx_stun'],
 ['(varias)','Veneno',3,'bubbling green poison drops and skull-green bubbles rising (loop)','fx_poison'],
 ['(varias)','Sangrado',3,'dripping red blood drops falling (loop)','fx_bleed'],
 ['(varias)','Marca / diana',3,'a glowing red target reticle with a small skull, pulsing (loop)','fx_mark']]},
common2:{n:'Efectos comunes 2: quemadura, hielo, miedo, maldición, crítico, invulnerable, muerte',s:[
 ['(varias)','Quemadura',3,'small orange flames flickering upwards (loop)','fx_burn'],
 ['(varias)','Ralentizado',3,'ice crystals and a small snail-slow blue swirl (loop)','fx_slow'],
 ['(varias)','Miedo',3,'a purple scared-face symbol with trembling lines (loop)','fx_fear'],
 ['(varias)','Maldición',3,'a dark purple curse sigil with skull, wisps rising (loop)','fx_curse'],
 ['(varias)','Golpe crítico',4,'a white-yellow starburst with sharp spikes, appearing and fading','fx_crit'],
 ['(varias)','Invulnerable (bucle)',4,'a golden glowing aura outline with sparkles, pulsing (loop)','fx_invuln'],
 ['(varias)','Muerte de enemigo',4,'a round puff of grey dust and small stars, expanding and fading','fx_death']]},
archer:{n:'Arquero',s:[
 ['a_pierce','Flecha perforante',2,'a glowing white arrow flying right with a bright motion trail, 2 shimmer frames (loop)','a_pierce'],
 ['a_frost','Flechas de escarcha',6,'frames 1-2: ice-blue arrow in flight (loop); frames 3-6: icy impact burst with shards (start, expand, peak, fade)','a_frost'],
 ['a_shackle','Grillete',7,'frames 1-3: a glowing energy chain stretched horizontally (appear, taut, fade); frames 4-7: a glowing shackle ring locking on the ground (loop)','a_shackle'],
 ['a_snipe','Disparo potente',9,'frames 1-2: charging golden glow at an arrow tip; frames 3-5: a thick golden beam pointing right (narrow start, full, fade); frames 6-9: impact flash (start, peak, fade)','a_snipe'],
 ['a_windrun','Carrera del viento',4,'green wind swirl wrapping around the middle of the cell, like a spiral of air (loop)','a_windrun'],
 ['a_gust','Ráfaga',4,'a cone of wind swirls pointing right, narrow on the left and wide on the right (grows then fades)','a_gust'],
 ['a_aura','Aura de precisión',4,'a flat ellipse ground ring with small target-reticle runes, glowing yellow, pulsing (loop)','a_aura'],
 ['a_focus','Fuego concentrado',6,'frames 1-4: orange-gold speed burst aura with radiating lines (loop); frames 5-6: a fast arrow streak pointing right','a_focus']]},
necro:{n:'Nigromante',s:[
 ['n_wall','Aura de la parca',4,'a flat ellipse ground ring of dark green smoke with small rotating scythes and skulls (loop)','n_wall'],
 ['n_pest','Pestilencia',4,'a round toxic green-yellow cloud with bubbles billowing around the center (loop)','n_pest'],
 ['n_curse','Maldición',4,'a purple curse sigil floating above, wisps rising (loop)','n_curse'],
 ['n_drain','Drenar vida',5,'frames 1-3: a red-purple ribbon of energy stretched horizontally (appear, flowing, fade); frames 4-5: a small glowing soul orb flying right','n_drain'],
 ['n_spear','Lanza de huesos',6,'frames 1-2: a huge bone spear pointing right (loop); frames 3-6: bone shard impact burst (start, expand, peak, fade)','n_spear'],
 ['n_corpse','Explosión de cadáveres',5,'a green-purple explosion of bones and gore-free spirit smoke (start, expand, peak, burst, fade)','n_corpse'],
 ['n_abom','Abominación',4,'bones and flesh swirling together into a flash of green light (start, swirl, peak, fade)','n_abom'],
 ['n_souls','Sentencia de la parca',9,'frames 1-5: a giant scythe reaping slash arc sweeping (start to full arc to fade); frames 6-9: a death-mark skull rising above the target (loop)','n_souls']]},
dwarf:{n:'Enano',s:[
 ['d_head','Tiro en la cabeza',4,'a sharp white headshot impact flash with a small skull-spark (start, peak, fade)','d_head'],
 ['d_shrapnel','Granada de metralla',4,'a flat ellipse ground zone of scattered metal shards and sparks (loop)','d_shrapnel'],
 ['d_grenade','Lanzagranadas',7,'frames 1-2: a round grenade spinning in flight (loop); frames 3-7: orange explosion (start, expand, peak, smoke, fade)','d_grenade'],
 ['d_mines','Campo minado',5,'a mine blast: bright flash then fire ring and smoke (start, expand, peak, smoke, fade)','d_mines'],
 ['d_turret','Torreta',3,'a muzzle flash pointing right (small, medium, fade)','d_turret'],
 ['d_rockets','Cohetes teledirigidos',5,'frames 1-2: a small rocket flying right with a flame; frames 3-5: grey smoke trail puffs pointing left (start, grow, fade)','d_rockets'],
 ['d_blast','Barril explosivo',6,'a huge powder-barrel explosion: flash, fireball, shockwave ring, smoke (6 steps)','d_blast'],
 ['d_snipe','Asesino',10,'frames 1-3: a thin red laser-sight line pointing right (appear, steady, flicker); frames 4-6: a thick white-orange bullet tracer line pointing right (start, full, fade); frames 7-10: huge impact flash (start, expand, peak, fade)','d_snipe']]},
barbarian:{n:'Orco',s:[
 ['b_multi','Hachas',4,'a throwing axe spinning in flight: 4 rotation steps of the same axe (loop)','b_axe'],
 ['b_aspd','Rugido de la manada',4,'a red-orange roar shockwave: concentric curved rings expanding (loop)','b_aspd'],
 ['b_rage','Furia',4,'a red flame aura around the center, flickering (loop)','b_rage'],
 ['b_whirl','Danza de la cuchilla',5,'a spinning circular blade slash ring, whirling steel arcs with sparks (loop)','b_whirl'],
 ['b_exec','Decapitador',4,'a brutal heavy red-white slash with a small skull flash (start, peak, fade)','b_exec'],
 ['b_berserk','Berserker',6,'a red-orange berserk fire aura with rising embers and angry eyes glow (loop)','b_berserk'],
 ['b_shout','Llamada de batalla',4,'inward-pulling concentric rings with a small horn symbol (loop)','b_shout'],
 ['b_chain','Hambre de sangre',4,'a brutal red claw-like triple slash across the cell (start, peak, fade)','b_chain'],
 ['b_fire','Jabalí embestidor',3,'a brown dust cloud of a charging dash pointing left (grow, peak, fade)','b_dust']]},
demon:{n:'Cazador de demonios',s:[
 ['z_meta','Metamorfosis',7,'frames 1-4: a pair of dark-purple bat-like demon wings spread, flapping (loop, wings only, no body); frames 5-7: transformation flash with purple fire (start, peak, fade)','z_meta'],
 ['z_immo','Aura de inmolación',4,'a flat ellipse ring of vile green-purple hellfire (loop)','z_immo'],
 ['z_eyes','Rayos oculares',3,'a twin energy beam pointing right, narrow start (start, full, fade)','z_eyes'],
 ['z_shadow','Golpe de sombras',4,'a dark violet shadow slash strike with ink splatter (start, peak, fade)','z_shadow'],
 ['z_void','Vacío vil',5,'a black-purple vortex hole with swirling particles spinning (loop)','z_void'],
 ['z_coup','Golpe de gracia',7,'frames 1-3: a golden-red critical slash flash (start, peak, fade); frames 4-7: a golden-red aura (loop)','z_coup'],
 ['z_dagger','Daga asfixiante',4,'a dagger with a dark trail spinning in flight: 4 rotation steps (loop)','z_dagger'],
 ['z_frag','Fragmentos de alma',6,'frames 1-3: a floating teal-white soul fragment pulsing (loop); frames 4-6: absorb burst (start, peak, fade)','z_frag'],
 ['z_step','Paso de sombra',6,'frames 1-3: dissolving into black-purple smoke (start, thick, fade); frames 4-6: a shadow slash arc appearing (start, peak, fade)','z_step']]},
priest:{n:'Sacerdote',s:[
 ['p_heal','Plegaria de sanación',4,'a golden light pillar with sparkles rising (start, bright, fade)','p_heal'],
 ['p_halo','Halo sagrado',4,'a golden halo ring seen from above with small rays, pulsing (loop)','p_halo'],
 ['p_judge','Juicio',7,'frames 1-3: a vertical beam of white-gold light from above (start, full, fade); frames 4-7: holy impact (start, expand, peak, fade)','p_judge'],
 ['p_barrier','Barrera divina',6,'frames 1-4: a golden holy barrier bubble (loop); frames 5-6: the barrier breaking into sparks','p_barrier'],
 ['p_consec','Consagración',4,'a flat ellipse holy ground circle with golden cross runes (loop)','p_consec'],
 ['p_purge','Purificación',4,'a sacred white-gold shockwave ring expanding (start, expand, wide, fade)','p_purge'],
 ['p_nova','Nova de luz',5,'a big holy light explosion (start, expand, peak, rays, fade)','p_nova'],
 ['p_chains','Cadenas de luz',4,'golden glowing chains wrapped around the center, pulsing (loop)','p_chains'],
 ['p_res','Resurrección',5,'a rising column of light with feathered angel wings opening (5 steps)','p_res'],
 ['p_faith','Fe ardiente',4,'holy golden flames igniting and flickering (loop)','p_faith'],
 ['p_sanct','Santuario',4,'a large translucent golden sacred dome, pulsing (loop)','p_sanct']]},
paladin:{n:'Paladín',s:[
 ['pl_holy','Espada consagrada',4,'a golden holy slash on hit with sparks (start, peak, fade)','pl_holy'],
 ['pl_cleave','Barrido',4,'a wide steel-white sweeping arc slash pointing right (start, wide, peak, fade)','pl_cleave'],
 ['pl_shield','Aura de resistencia',4,'a flat ellipse blue-gold shield aura ring (loop)','pl_shield'],
 ['pl_charge','Carga sagrada',7,'frames 1-3: a golden dash streak with dust pointing left; frames 4-7: impact shockwave (start, expand, peak, fade)','pl_charge'],
 ['pl_hammer','Martillo divino',8,'frames 1-4: a golden war hammer spinning in flight (4 rotation steps, loop); frames 5-8: impact (start, expand, peak, fade)','pl_hammer'],
 ['pl_aura','Aura de curación y daño',4,'a flat ellipse sacred golden aura ring with soft pulses (loop)','pl_aura'],
 ['pl_hands','Imposición de manos',4,'a warm golden glow with small hands of light rising (start, bright, fade)','pl_hands'],
 ['pl_beam','Lanza de luz',3,'a long spear of holy light pointing right, narrow tip (start, full, fade)','pl_beam'],
 ['pl_bastion','Invulnerabilidad',5,'a big golden shining dome with bright rays (loop)','pl_bastion'],
 ['pl_wrath','Forma de dragón',9,'frames 1-4: golden dragon wings spread, flapping (loop, wings only); frames 5-9: a cone of fire pointing right (start, grow, peak, flicker, fade)','pl_wrath'],
 ['pl_throw','Golpe con escudo',4,'a round shield bash shockwave (start, expand, peak, fade)','pl_throw'],
 ['pl_runes','Llamarada',5,'a cone of fire pointing right, narrow on the left and wide on the right (5 steps)','pl_runes']]},
monk:{n:'Panda (monje)',s:[
 ['k_combo','Combo de palma',4,'a golden palm strike shockwave burst (start, expand, peak, fade)','k_combo'],
 ['k_wave','Ola de chi',4,'a blue chi energy ring expanding with swirling lines (start, expand, wide, fade)','k_wave'],
 ['k_dragon','Palma del dragón',4,'a golden energy dragon head and body flying right (loop)','k_dragon'],
 ['k_bell','Campana dorada',4,'a golden bell-shaped glowing shield (loop)','k_bell'],
 ['k_kick','Patada del huracán',5,'a spiral whirlwind of kicks, white-blue arcs spinning (loop)','k_kick'],
 ['k_nirvana','Nirvana',5,'a serene golden lotus aura with floating petals (loop)','k_nirvana'],
 ['k_hundred','Cien puños',4,'a burst of many small golden fist impacts (start, spread, peak, fade)','k_hundred'],
 ['k_gong','Gong del trueno',5,'a thunder shockwave: yellow-blue lightning rings from a gong (5 steps)','k_gong']]},
troll:{n:'Troll',s:[
 ['t_trap','Pacto de sangre',4,'a dark red blood wave ring expanding (start, expand, wide, fade)','t_trap'],
 ['t_hex','Maleficio de rana',7,'frames 1-4: a green hex bubble with a small frog silhouette (loop); frames 5-7: green poof (start, peak, fade)','t_hex'],
 ['t_fury','Postura de guerra',4,'a red-orange war stance aura with small spears around (loop)','t_fury'],
 ['t_loa','Espíritu del Loa',12,'frames 1-6: a big ghostly teal spirit mask aura (loop); frames 7-9: a spectral spear flying down (start, mid, end); frames 10-12: spectral impact (start, peak, fade)','t_loa'],
 ['t_boar','Lanzas ardientes',6,'frames 1-2: a flaming spear flying right (loop); frames 3-6: fire impact (start, expand, peak, fade)','t_boar'],
 ['t_spear','Lanza explosiva',8,'frames 1-3: a spear stuck in the ground with a glowing pulse (loop); frames 4-8: fire explosion (start, expand, peak, smoke, fade)','t_spear']]},
werewolf:{n:'Hombre lobo',s:[
 ['w_bleed','Garras sangrientas',4,'a claw slash with three red-white streaks (start, peak, fade)','w_claw'],
 ['w_leap','Salto de presa',7,'frames 1-3: dust trail from a leap pointing left; frames 4-7: landing shockwave (start, expand, peak, fade)','w_leap'],
 ['w_howl','Aullido a la luna',5,'curved sound-wave crescents expanding from the center, with a faint moon glow (5 steps)','w_howl'],
 ['w_rend','Tajo salvaje',5,'a huge triple claw slash fan pointing right (5 steps)','w_rend'],
 ['w_prey','Marca de la presa',4,'a glowing red paw print mark, pulsing (loop)','w_prey'],
 ['w_moon','Luna llena',6,'a silver-blue full moon beam and aura with sparkles (loop)','w_moon']]},
druid:{n:'Druida',s:[
 ['u_wrath','Cólera de la naturaleza',6,'frames 1-2: a green nature energy bolt flying right (loop); frames 3-6: leafy impact (start, expand, peak, fade)','u_wrath'],
 ['u_moon','Fuego lunar',5,'a white-blue moonfire pillar falling from above (start, full, burn, flicker, fade)','u_moon'],
 ['u_thorns','Enredar',8,'frames 1-5: roots and thorny vines bursting from the ground (start to full); frames 6-8: roots holding (loop)','u_thorns'],
 ['u_rejuv','Rejuvenecimiento',4,'green leaves and sparkles swirling upward (loop)','u_rejuv'],
 ['u_star','Lluvia de estrellas',7,'frames 1-3: a falling glowing star with trail pointing down-left; frames 4-7: starfall impact (start, expand, peak, fade)','u_star'],
 ['u_bark','Piel de corteza',4,'a brown bark-plate shield with leaves (loop)','u_bark'],
 ['u_cyclone','Teletransporte',6,'frames 1-3: leaves swirling to vanish; frames 4-6: leaves swirling to appear','u_cyclone'],
 ['u_swarm','Regreso a la naturaleza',4,'a green thorn wave ring expanding (start, expand, wide, fade)','u_swarm'],
 ['u_bear','Forma de oso',8,'frames 1-4: transformation burst of leaves (start, peak, swirl, fade); frames 5-8: brown-green wild aura (loop)','u_bear'],
 ['u_eclipse','Eclipse',8,'frames 1-4: a warm golden solar-phase aura (loop); frames 5-8: a cool blue lunar-phase aura (loop)','u_eclipse']]},
devourer:{n:'Bestia abisal',s:[
 ['pb_onslaught','Embestida',8,'frames 1-4: a dust and speed-line charge streak pointing left; frames 5-8: impact (start, expand, peak, fade)','pb_onslaught'],
 ['pb_trample','Pisotear',4,'a stomp dust ring with ground cracks (start, expand, wide, fade)','pb_trample'],
 ['pb_uproar','Rugido',9,'frames 1-5: a red fury roar shockwave (start to fade); frames 6-9: a red stored-fury aura (loop)','pb_uproar'],
 ['pb_pulverize','Pulverizar',5,'a heavy slam impact with cracks and rocks (start, crack, peak, debris, fade)','pb_pulverize'],
 ['pb_rock','Lanzamiento de roca',12,'frames 1-4: a big rock spinning in flight (loop); frames 5-7: a dark ground target shadow ring pulsing (loop); frames 8-12: landing impact (start, expand, peak, debris, fade)','pb_rock'],
 ['pb_impact','Impacto brutal',4,'a brutal physical shockwave ring (start, expand, wide, fade)','pb_impact'],
 ['pb_shockwave','Ondas tectónicas',4,'an earthen crack wave on the ground pointing right (start, run, wide, fade)','pb_shockwave'],
 ['pb_aftershock','Roca fragmentada',2,'small rock fragments spinning (loop)','pb_frag']]},
shaman:{n:'Chamán',s:[
 ['c_rain','Lluvia ritual',4,'a flat ellipse zone of falling raindrops and ripples (loop)','c_rain'],
 ['c_arc','Arco conductor',3,'a blue-white electric arc stretched horizontally (start, full, flicker)','c_arc'],
 ['c_thunder','Tótem del trueno',3,'a lightning discharge crackle (start, peak, fade)','c_thunder'],
 ['c_wind','Ráfaga de viento',4,'a blue wind blast cone pointing right (grows then fades)','c_wind'],
 ['c_cloud','Nube cargada',4,'a dark storm cloud with flickering lightning (loop)','c_cloud'],
 ['c_skin','Piel de tormenta',8,'frames 1-4: an electric shield bubble crackling (loop); frames 5-8: an electric discharge nova (start, expand, peak, fade)','c_skin'],
 ['c_overload','Sobrecarga',5,'an electric burst with sparks and water splash (5 steps)','c_overload'],
 ['c_vortex','Vórtice',5,'a water whirlpool zone spinning (loop)','c_vortex'],
 ['c_monsoon','Monzón',6,'a wide zone of heavy rain with lightning flashes (loop)','c_monsoon'],
 ['c_bolt','Golpe de relámpago',7,'frames 1-3: a huge lightning bolt from above (start, full, fade); frames 4-7: impact (start, expand, peak, fade)','c_bolt'],
 ['c_orb','Bola de relámpago',7,'frames 1-4: an electric orb pulsing (loop); frames 5-7: discharge ring (start, expand, fade)','c_orb'],
 ['(estado)','Mojado y estática',6,'frames 1-3: blue water drops sticking (loop); frames 4-6: crackling static sparks (loop)','c_status']]}
};

const CAP=24,COLS=6,ROWS=4;
const STYLE=`Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.`;
let tot=0,resumen=[],lista=[];
for(const k in H){
  const sheets=[],uso=[];
  for(const s of [...H[k].s].sort((a,b)=>b[2]-a[2])){let j=uso.findIndex(u=>u+s[2]<=CAP);if(j<0){sheets.push([]);uso.push(0);j=sheets.length-1}sheets[j].push(s);uso[j]+=s[2]}
  sheets.forEach((sh,i)=>{
    let cell=1,lines=[],recorte=[];
    for(const [id,nom,nf,seq,rec] of sh){
      const a=cell,b=cell+nf-1;cell+=nf;
      lines.push(`${nf>1?`${a}-${b}`:a} ${nom.toUpperCase()}: ${seq}`);
      recorte.push(`- \`${rec}_1\`…\`${rec}_${nf}\` (celdas ${a}-${b}): ${nom}`);
    }
    const emp=cell<=CAP?`${cell}-${CAP}: empty`:'';
    const n=sheets.length>1?` (hoja ${i+1} de ${sheets.length})`:'';
    const nombre=`${k}_hoja${i+1}.md`;
    const md=`# Efectos: ${H[k].n}${n}\n\n**Adjunta como referencia de estilo:** \`mago_hoja1.png\` y \`torre_hoja1.png\`\n**Formato:** 3:2 horizontal, cuadrícula de ${COLS} columnas × ${ROWS} filas (${COLS*ROWS} celdas; se usan ${cell-1})\n\nCada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los \"frames 1-N\" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.\n\n\`\`\`\n${STYLE}\n\nEFFECTS-ONLY SPRITE SHEET: ${COLS} columns x ${ROWS} rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.\n\nCELLS in reading order:\n${lines.join('\n')}${emp?'\n'+emp:''}\n\`\`\`\n\n**Recorte de archivos:**\n${recorte.join('\n')}\n\n**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.\n`;
    fs.writeFileSync(path.join(OUT,nombre),md);
    resumen.push(`| ${H[k].n} | [\`${nombre}\`](${nombre}) | ${cell-1} | ${sh.map(s=>s[1]).join(', ')} |`);
  });
  const n=H[k].s.reduce((a,s)=>a+s[2],0);tot+=n;
  lista.push(`### ${H[k].n} — ${H[k].s.length} efectos, ${n} fotogramas, ${sheets.length} hoja(s)\n| Habilidad | Id | Fotogramas |\n|---|---|---|\n${H[k].s.map(s=>`| ${s[1]} | \`${s[0]}\` | ${s[2]} |`).join('\n')}\n`);
}
fs.writeFileSync(path.join(OUT,'LEEME.md'),`# Prompts de efectos: habilidades que aún se dibujan por código\n\nHojas **solo de efectos** (sin héroe) para sustituir los anillos, rayos y partículas dibujados por código por animaciones PNG. Cada habilidad lleva su número de fotogramas.\n\n## Fotogramas por tipo de efecto\n| Tipo | Fotogramas | Cómo se reproduce |\n|---|---|---|\n| Proyectil en vuelo | 2 (4 si gira) | bucle |\n| Impacto o explosión | 4-5 | una vez |\n| Zona de suelo o aura | 4-5 | bucle |\n| Rayo o haz | 3 | una vez, se estira por código |\n| Cono o tajo | 4-5 | una vez |\n| Estado sobre una unidad | 3-4 | bucle |\n| Transformación o ultimate | 5-12 | aura en bucle y destello |\n\nCada hoja es de 6 × 4 celdas (24). El juego reproduce los fotogramas a unos 10 por segundo.\n\n## Hojas\n| Grupo | Archivo | Celdas | Contiene |\n|---|---|---|---|\n${resumen.join('\n')}\n\nTotal: ${tot} fotogramas.\n\n## Detalle por habilidad\n${lista.join('\n')}\n## Sin generar\n- **Mago, alquimista y asesino**: ya tienen sprites en todas sus habilidades.\n- **Invocadas** (esqueletos, momias, vampiros, ents, lobos, osos, raptores, torretas, tótems, dragón): ya tienen sprites.\n- **Pasivas sin efecto visible** (crítico, velocidad de golpe, armadura, esquivar…): usan los efectos comunes.\n- **Poderes de la torre sin sprite** (cadena de rayos, castigo divino, pulso arcano, granizo, bolas orbitales): se pueden hacer ya con los sprites que existen.\n`);
console.log('hojas:',resumen.length,'fotogramas:',tot);
