# Alquimista: rework completo (cuerpo + habilidades)

Sustituye a `alchemist_hoja1_juego.md` (arte antiguo) y a las filas del alquimista de `../prompts-efectos/faltantes_mezcladas.md`. La hoja de iconos (`alchemist_hoja2_iconos.md`) sigue valiendo.

## Por qué se rehace
El arte actual tiene tres fallos que no se arreglan por código:
- **Cuerpo recortado:** mochila, mortero y pies tocan los bordes de la celda y salen cortados.
- **Sin movimiento:** solo hay 2 poses (reposo y ataque); el juego lo balancea por código y se ve mal.
- **Demasiado alto:** su cabeza tapa la barra de energía (cada héroe mide 58-74 px en pantalla; el alquimista 82).
- **Habilidades repetidas:** 7 de 12 se parecían al mismo salpicón verde.

Reglas nuevas que valen para las dos hojas: **todo dentro de la celda con un margen mínimo del 12 %**, los pies a la misma altura en todos los fotogramas y el mismo tamaño de personaje en todas las poses.

---

## PROMPT 1: cuerpo del alquimista (hoja de juego)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png` (y, si quieres mantener el diseño, el alquimista actual `assets/heroes/alchemist/alchemist-juego.png`).
**Formato:** 3:2 horizontal, cuadrícula de **6 columnas × 3 filas** (18 celdas; se usan 16).

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 6 columns x 3 rows of equal cells separated by thin dark-purple grid lines. ONE separate sprite centered in each cell. NO letters, NO numbers, NO labels, NO text, NO ground shadows.

VERY IMPORTANT FRAMING RULES: the whole character, including backpack, flasks, mortar, weapon and BOTH feet, must fit completely inside its cell with a clear empty magenta margin of at least 12% on every side. Nothing may touch or be cut by the cell edges. In every full-body cell the character has the SAME size and the feet rest on the SAME horizontal line (the bottom of the shoes is at the same height in all cells). Compact chibi proportions: a big head, but the whole character is NOT tall: total height only about 1.2 times its width, never a tall or stretched figure. The goggles and hair stay below the top 15% of the cell.

HERO: a green-skinned ogre alchemist: brown leather apron, brass goggles on the forehead, a backpack of bubbling colored flasks (green, orange, purple), a stone mortar on the belt and a brass flask-launcher gun for attacks. Facing RIGHT in every cell. Keep exactly the same face, colors and outfit in all cells.

CELLS in reading order:
1-2 IDLE: standing, 2 frames of a subtle breathing loop (flasks bubble slightly, shoulders rise 2%)
3-6 WALK CYCLE: 4 frames of a walking loop facing right: contact, passing, contact (other leg), passing; the backpack flasks sway a little; same size as the idle
7-9 ATTACK: 3 frames throwing a flask with the launcher to the right: wind-up (arm back), release (arm forward, small muzzle puff), follow-through
10 HURT: recoiling backwards with eyes shut tight and a small red-orange glow around the body
11-12 BASIC ATTACK PROJECTILE: a spinning corrosive green flask with a short bright trail flying right, 2 rotation steps (loop)
13-15 BASIC ATTACK IMPACT: a lime-green acid splash: frame 13 small start, 14 big peak with drops, 15 fading drops
16 PORTRAIT: head-and-shoulders bust for the interface, facing right, centered
17-18: empty
```

**Recorte de archivos:** `alchemist_idle_1`, `alchemist_idle_2`, `alchemist_walk_1`…`alchemist_walk_4`, `alchemist_atk_1`…`alchemist_atk_3`, `alchemist_hurt`, `al_proj_1`, `al_proj_2`, `al_splash_1`…`al_splash_3`, `alchemist_portrait`.

**Después de generarla:** pásamela y la integro (caminar, golpeado y ataque en 3 pasos) y corrijo la altura para que no choque con la barra.

---

## PROMPT 2: habilidades del alquimista (4 hojas de efectos)

Cada habilidad tiene **su propio color y su propia forma** para que no se repitan. **Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`. **Formato:** 3:2 horizontal, 6 columnas × 4 filas (24 celdas), las 4 hojas llenas.

**Estilo común (pégalo al inicio de cada una de las 4 hojas):**

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows, cones and projectiles point RIGHT. Do not leave empty cells between effects.
```

### Hoja A: Frasco corrosivo, Aceite inflamable, Chispa reactiva
```
CELLS in reading order:
1-2 FRASCO CORROSIVO (lime green): a spinning flask of glowing lime-green acid with a short drip trail flying right (2 rotation steps, loop)
3-6 FRASCO CORROSIVO impact: an acid splash with sizzling bubbles: start, big peak with drops, spreading, fading
7-9 FRASCO CORROSIVO pool: a flat bubbling lime-green acid puddle with tiny rising bubbles (3 frames, loop)
10-12 ACEITE INFLAMABLE (amber brown): a thick dark amber oil splash landing: start, peak, settling
13-15 ACEITE INFLAMABLE pool: a flat glossy dark amber oil puddle with slow shimmering highlights (3 frames, loop)
16-17 CHISPA REACTIVA (orange-red): a small comet-like fireball with a sparking tail flying right (2 frames, loop)
18-21 CHISPA REACTIVA explosion: an orange and yellow fire burst with sparks: start, peak, shrinking, smoke wisps
22-24 CHISPA REACTIVA burning oil: flat orange flames dancing over a puddle (3 frames, loop)
```
Recorte: `al_flask_proj_1-2`, `al_flask_hit_1-4`, `al_flask_pool_1-3`, `al_oil_hit_1-3`, `al_oil_pool_1-3`, `al_spark_proj_1-2`, `al_spark_boom_1-4`, `al_spark_burn_1-3`.

### Hoja B: Catalizador, Mezcla inestable, Antídoto experimental
```
CELLS in reading order:
1-3 CATALIZADOR (electric violet): a swirling violet energy vortex with white sparks around a small glowing vial, spinning (3 frames, loop)
4-7 CATALIZADOR reaction: a violet crystalline burst with white flash and flying sparks: start, peak, shards, fade
8-9 MEZCLA INESTABLE (chaotic pink, teal and yellow): two flasks, one green and one orange, spiraling together in a colorful swirl (2 frames, loop)
10-14 MEZCLA INESTABLE explosion: a colorful unstable blast of pink, teal and yellow bubbles with a bright core: small, medium, big, scatter, fade
15-18 ANTIDOTO EXPERIMENTAL (soft emerald and white): a healing flask surrounded by a gentle emerald glow ring with small plus signs (4 frames, loop)
19-21 ANTIDOTO EXPERIMENTAL poison drained: wisps of sickly green-purple poison with tiny skulls being pulled upward (3 frames)
22-24 ANTIDOTO EXPERIMENTAL herbs: green healing leaves and white sparkles rising in a spiral (3 frames)
```
Recorte: `al_cat_vortex_1-3`, `al_cat_burst_1-4`, `al_mix_swirl_1-2`, `al_mix_boom_1-5`, `al_antidote_flask_1-4`, `al_antidote_drain_1-3`, `al_antidote_herbs_1-3`.

### Hoja C: Delantal protector, Destilación rápida, Gas volátil
```
CELLS in reading order:
1-4 DELANTAL PROTECTOR (warm amber): a translucent amber-orange protective bubble forming around an empty space, with small glowing apron-like runes (frames growing)
5-8 DELANTAL PROTECTOR steady: the same amber bubble shimmering gently with tiny bubbles (4 frames, loop)
9-12 DESTILACION RAPIDA (copper and gold): a rapid volley of four small flasks flying in a fast copper-gold swirl with speed lines (4 frames, loop)
13-14 DESTILACION RAPIDA steam: a small puff of white-gold steam with tiny droplets (2 frames)
15-17 GAS VOLATIL (sickly purple and yellow-green): a toxic cloud starting to form from small bubbles (3 frames)
18-21 GAS VOLATIL cloud: a big billowing purple and yellow-green toxic cloud with floating bubbles (4 frames, loop)
22-24 GAS VOLATIL dissipating: the cloud thinning out into small bubbles and wisps (3 frames)
```
Recorte: `al_coat_form_1-4`, `al_coat_loop_1-4`, `al_distill_volley_1-4`, `al_distill_steam_1-2`, `al_fumes_start_1-3`, `al_fumes_loop_1-4`, `al_fumes_end_1-3`.

### Hoja D: Gran transmutación (ULTIMATE), Toque de oro, Pandemia
```
CELLS in reading order:
1-6 GRAN TRANSMUTACION (ULTIMATE, make it the most epic, gold and violet): a huge flat alchemical circle with glowing violet runes and gold lines forming on the ground, growing from small to full (6 frames)
7-12 GRAN TRANSMUTACION explosion: an enormous transmutation blast, golden and violet, with a pillar of light, floating runes and flying gold sparks: start, rising, peak, peak, collapsing, fading
13-14 TOQUE DE ORO (pure gold): a glowing golden bolt with sparkling trail flying right (2 frames, loop)
15-19 TOQUE DE ORO burst: a pile of golden coins and sparkles exploding outward: start, peak, scatter, falling coins, fade
20-22 PANDEMIA (toxic green): a bubbling toxic-green cloud shaped like a plague-doctor bird mask with tiny skulls (3 frames, loop)
23-24 PANDEMIA spread: a green skull-shaped infection burst with drops flying outward (2 frames: peak, fade)
```
Recorte: `al_transmute_circle_1-6`, `al_transmute_boom_1-6`, `al_gold_proj_1-2`, `al_gold_boom_1-5`, `al_plague_mask_1-3`, `al_plague_spread_1-2`.

**Consejos:** si una animación no sale fluida (cambia el tamaño o el centro entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
