# Alquimista: rework para Microsoft Designer (versión gratis)

El alquimista es un **ogro de piel verde** con gafas de latón, delantal de cuero marrón y una mochila de frascos burbujeantes. Cada prompt de cuerpo lo repite para que salga siempre el mismo personaje.

**Cómo usarlo:** Designer gratis genera mejor imágenes cortas, así que cada prompt pide **una tira de pocos fotogramas** (o un solo sprite) con un máximo de **450 caracteres**. Copia el prompt tal cual, elige la variante que salga más limpia y guárdala con el nombre de la lista **Recorte**. Si Designer no respeta el fondo magenta, dímelo: puedo quitar cualquier fondo liso al recortar. Para mantener el aspecto del ogro, genera primero el reposo y usa esa imagen como referencia cuando la herramienta lo permita.

Reglas que ya van dentro de los prompts: todo el cuerpo con margen, los pies siempre en la misma línea y el mismo tamaño en cada fotograma.

## Parte 1: cuerpo del ogro alquimista

### C01 · Reposo (2 fotogramas)  (397 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Chibi GREEN-SKINNED OGRE alchemist, big head, brass goggles, brown leather apron, backpack of bubbling colored flasks, facing right. Sprite strip of 2 frames in one row, same size, feet on the same line: standing idle, frame 2 breathes slightly (flasks bubble, shoulders up).
```
Recorte: `alchemist_idle_1, alchemist_idle_2`

### C02 · Caminar (4 fotogramas)  (411 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Chibi GREEN-SKINNED OGRE alchemist, big head, brass goggles, brown leather apron, backpack of bubbling colored flasks, facing right. Sprite strip of 4 frames in one row, same size, feet on the same line: walking cycle, contact, passing, contact with the other leg, passing; backpack sways.
```
Recorte: `alchemist_walk_1 … alchemist_walk_4`

### C03 · Ataque (3 fotogramas)  (434 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Chibi GREEN-SKINNED OGRE alchemist, big head, brass goggles, brown leather apron, backpack of bubbling colored flasks, facing right. Sprite strip of 3 frames in one row, same size, feet on the same line: throwing a flask with a brass launcher gun to the right: wind-up, release with a small puff, follow-through.
```
Recorte: `alchemist_atk_1 … alchemist_atk_3`

### C04 · Golpeado  (404 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Chibi GREEN-SKINNED OGRE alchemist, big head, brass goggles, brown leather apron, backpack of bubbling colored flasks, facing right. Single full-body sprite recoiling backwards, eyes shut tight, small red-orange glow around the body, whole body fully inside the image with a margin.
```
Recorte: `alchemist_hurt`

### C05 · Retrato  (349 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Chibi GREEN-SKINNED OGRE alchemist, big head, brass goggles, brown leather apron, backpack of bubbling colored flasks, facing right. Head-and-shoulders portrait bust for a game interface, proud smile, centered, nothing cut off.
```
Recorte: `alchemist_portrait`

### C06 · Ataque básico: proyectil e impacto  (334 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 5 frames in one row, no character: frames 1-2 a spinning lime-green corrosive flask with a short trail flying right; frames 3-5 a lime-green acid splash (small start, big peak with drops, fading).
```
Recorte: `al_proj_1-2, al_splash_1-3`

## Parte 2: habilidades (sin personaje)

Cada habilidad tiene su propio color para que no se repitan.

### H01 · Frasco corrosivo  (391 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 9 frames in one row, equal size, same center, nothing touching the edges, no character: frames 1-2 spinning lime-green acid flask with drip trail flying right; 3-6 acid splash (start, peak, spread, fade); 7-9 flat bubbling lime-green acid puddle (loop).
```
Recorte: `al_flask_proj_1-2, al_flask_hit_1-4, al_flask_pool_1-3`

### H02 · Aceite inflamable  (374 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 6 frames in one row, equal size, same center, nothing touching the edges, no character: frames 1-3 thick dark AMBER-BROWN oil splash landing (start, peak, settle); 4-6 flat glossy dark amber oil puddle with shimmering highlights (loop).
```
Recorte: `al_oil_hit_1-3, al_oil_pool_1-3`

### H03 · Chispa reactiva  (407 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 9 frames in one row, equal size, same center, nothing touching the edges, no character: frames 1-2 small orange-red comet fireball with sparking tail flying right; 3-6 orange and yellow fire explosion (start, peak, shrink, smoke); 7-9 flat orange flames dancing (loop).
```
Recorte: `al_spark_proj_1-2, al_spark_boom_1-4, al_spark_burn_1-3`

### H04 · Catalizador  (392 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 7 frames in one row, equal size, same center, nothing touching the edges, no character: frames 1-3 swirling ELECTRIC VIOLET energy vortex with white sparks around a small vial (loop); 4-7 violet crystal burst with white flash (start, peak, shards, fade).
```
Recorte: `al_cat_vortex_1-3, al_cat_burst_1-4`

### H05 · Mezcla inestable  (406 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 7 frames in one row, equal size, same center, nothing touching the edges, no character: frames 1-2 a green flask and an orange flask spiraling together in a swirl; 3-7 chaotic blast of PINK, TEAL and YELLOW bubbles with bright core (small, medium, big, scatter, fade).
```
Recorte: `al_mix_swirl_1-2, al_mix_boom_1-5`

### H06 · Antídoto experimental  (434 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 10 frames in one row, equal size, same center, nothing touching the edges, no character: frames 1-4 healing flask with soft EMERALD glow ring and small plus signs (loop); 5-7 sickly green-purple poison wisps with tiny skulls pulled upward; 8-10 green leaves and white sparkles rising in a spiral.
```
Recorte: `al_antidote_flask_1-4, al_antidote_drain_1-3, al_antidote_herbs_1-3`

### H07 · Delantal protector  (410 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 8 frames in one row, equal size, same center, nothing touching the edges, no character: translucent warm AMBER-ORANGE protective bubble with small glowing runes: frames 1-4 forming and growing around an empty center; frames 5-8 steady, shimmering with tiny bubbles (loop).
```
Recorte: `al_coat_form_1-4, al_coat_loop_1-4`

### H08 · Destilación rápida  (377 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 6 frames in one row, equal size, same center, nothing touching the edges, no character: frames 1-4 rapid volley of four small flasks in a fast COPPER and GOLD swirl with speed lines (loop); 5-6 small puff of white-gold steam with droplets.
```
Recorte: `al_distill_volley_1-4, al_distill_steam_1-2`

### H09 · Gas volátil  (411 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 10 frames in one row, equal size, same center, nothing touching the edges, no character: sickly PURPLE and yellow-green toxic gas: frames 1-3 cloud forming from small bubbles; 4-7 big billowing cloud with floating bubbles (loop); 8-10 cloud thinning into bubbles and wisps.
```
Recorte: `al_fumes_start_1-3, al_fumes_loop_1-4, al_fumes_end_1-3`

### H10 · Gran transmutación (ultimate): círculo  (405 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 6 frames in one row, equal size, same center, nothing touching the edges, no character: ULTIMATE, epic, GOLD and VIOLET: a huge flat alchemical circle seen from slightly above with glowing violet runes and gold lines, forming and growing from small to full, 6 frames.
```
Recorte: `al_transmute_circle_1-6`

### H11 · Gran transmutación (ultimate): explosión  (386 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 6 frames in one row, equal size, same center, nothing touching the edges, no character: ULTIMATE, epic GOLD and VIOLET transmutation blast with a pillar of light, floating runes and flying gold sparks: start, rising, peak, peak, collapsing, fading.
```
Recorte: `al_transmute_boom_1-6`

### H12 · Toque de oro  (393 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 7 frames in one row, equal size, same center, nothing touching the edges, no character: pure GOLD: frames 1-2 glowing golden bolt with sparkling trail flying right (loop); 3-7 burst of golden coins and sparkles (start, peak, scatter, falling coins, fade).
```
Recorte: `al_gold_proj_1-2, al_gold_boom_1-5`

### H13 · Pandemia  (406 caracteres)

```
Cartoon fantasy game art, thick dark-purple outline, glossy colors, solid magenta #FF00FF background, no text, no shadow. Sprite strip of 5 frames in one row, equal size, same center, nothing touching the edges, no character: toxic GREEN: frames 1-3 bubbling cloud shaped like a plague-doctor bird mask with tiny skulls (loop); 4-5 green skull-shaped infection burst with drops flying outward (peak, fade).
```
Recorte: `al_plague_mask_1-3, al_plague_spread_1-2`
