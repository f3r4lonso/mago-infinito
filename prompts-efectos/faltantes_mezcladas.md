# Efectos que aún se dibujan por código: hojas mezcladas de héroes

Hojas **solo de efectos** (sin héroe) que mezclan habilidades de distintos héroes para completar las 24 celdas. Los ids llevan el prefijo `f_` para no chocar con el arte que ya existe.

## Estilo común (pégalo al inicio de cada prompt)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows, cones and projectiles point RIGHT. Do not leave empty cells between effects.
```

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`.  **Formato:** 3:2 horizontal, 6 columnas × 4 filas.

> Cada efecto ocupa celdas **consecutivas** (fotogramas 1-N en orden de lectura). Si una animación no sale fluida (tamaño o centro cambian), repite solo esa fila.

Total: 47 efectos, 193 fotogramas, 9 hojas.

## Hoja 1 de 9 — Chamán, Paladín, Nigromante (23 celdas)

```
CELLS in reading order:
1-6 MONZÓN (Chamán): a huge storm: dark clouds, heavy rain sheets and lightning forks filling the frame (start, building x2, peak, fading x2)
7-10 RÁFAGA DE VIENTO (Chamán): a pale-blue cone of swirling wind streaks and small leaves pointing right (start, peak, peak, fade)
11-13 ARCO CONDUCTOR (Chamán): a jagged horizontal electric arc between two points, bright yellow-white core with blue edge, pointing right (start, full, fade)
14-15 BOLA DE RELÁMPAGO (Chamán): a glowing yellow-white ball of lightning trailing small arcs, flying to the right (loop)
16-19 BARRIDO (Paladín): a wide golden-white crescent sweep slash (start, peak, fade, sparkles)
20-23 PESTILENCIA (Nigromante): a thick sickly green plague cloud with floating tiny skulls (loop)
24-24: empty
```

**Recorte de archivos:**
- `f_c_monsoon_1`…`f_c_monsoon_6` (celdas 1-6): Monzón — Chamán
- `f_c_wind_1`…`f_c_wind_4` (celdas 7-10): Ráfaga de viento — Chamán
- `f_c_arc_1`…`f_c_arc_3` (celdas 11-13): Arco conductor — Chamán
- `f_c_orb_1`…`f_c_orb_2` (celdas 14-15): Bola de relámpago — Chamán
- `f_pl_cleave_1`…`f_pl_cleave_4` (celdas 16-19): Barrido — Paladín
- `f_n_pest_1`…`f_n_pest_4` (celdas 20-23): Pestilencia — Nigromante

## Hoja 2 de 9 — Chamán, Alquimista, Nigromante, Orco, Troll (21 celdas)

```
CELLS in reading order:
1-4 NUBE CARGADA (Chamán): a dark storm cloud flashing with yellow lightning inside, drizzling (loop)
5-8 FRASCO CORROSIVO (Alquimista): a splash of bright green acid hitting the ground with bubbling drops and a little smoke (start, splash, spread, fade)
9-13 DRAGÓN ESQUELETO (Nigromante): a pale bone dragon skull breathing green ghost fire pointing right (start, build, peak, flicker, fade)
14-17 HACHAS GIGANTES (Orco): a huge spinning two-handed axe with a heavy dust trail: 4 rotation steps (loop)
18-21 LANZAS ARDIENTES (Troll): a burning tribal spear with an orange fire trail flying right (loop 2 frames) then an ember burst (2 frames)
22-24: empty
```

**Recorte de archivos:**
- `f_c_cloud_1`…`f_c_cloud_4` (celdas 1-4): Nube cargada — Chamán
- `f_al_flask_1`…`f_al_flask_4` (celdas 5-8): Frasco corrosivo — Alquimista
- `f_n_skeldragon_1`…`f_n_skeldragon_5` (celdas 9-13): Dragón esqueleto — Nigromante
- `f_b_giant_1`…`f_b_giant_4` (celdas 14-17): Hachas gigantes — Orco
- `f_t_boar_1`…`f_t_boar_4` (celdas 18-21): Lanzas ardientes — Troll

## Hoja 3 de 9 — Alquimista, Paladín, Troll, Hombre lobo (21 celdas)

```
CELLS in reading order:
1-5 MEZCLA INESTABLE (Alquimista): a colorful unstable potion explosion: pink, green and yellow bubbles bursting (small, medium, big, scatter, fade)
6-9 DESTILACIÓN RÁPIDA (Alquimista): fast rising amber bubbles and steam with speed lines (loop)
10-13 ESPADA CONSAGRADA (Paladín): a short holy golden blade flash slash with sparkles at the point of impact (start, peak, fade, sparkles)
14-17 VENENO DE LOA (Troll): a spit of glowing green venom splashing with small bubbles and a tiny skull (start, splash, spread, fade)
18-21 PELAJE GRUESO (Hombre lobo): a thick grey-brown fur-textured shield glow with small hair strands (loop)
22-24: empty
```

**Recorte de archivos:**
- `f_al_mix_1`…`f_al_mix_5` (celdas 1-5): Mezcla inestable — Alquimista
- `f_al_distill_1`…`f_al_distill_4` (celdas 6-9): Destilación rápida — Alquimista
- `f_pl_holy_1`…`f_pl_holy_4` (celdas 10-13): Espada consagrada — Paladín
- `f_t_venom_1`…`f_t_venom_4` (celdas 14-17): Veneno de loa — Troll
- `f_w_hide_1`…`f_w_hide_4` (celdas 18-21): Pelaje grueso — Hombre lobo

## Hoja 4 de 9 — Sacerdote, Chamán, Paladín, Orco, Hombre lobo (21 celdas)

```
CELLS in reading order:
1-4 CONSAGRACIÓN (Sacerdote): a flat golden consecrated ground circle with rising sparks and light rays (loop)
5-8 PIEL DE TORMENTA (Chamán): a faint blue-white electric aura outline with crackling sparks hugging a body shape (loop)
9-13 LLAMARADA (Paladín): a cone of orange-gold flames pointing right (start, grow, peak, flicker, fade)
14-17 HACHAS MÚLTIPLES (Orco): a spinning orc throwing axe with a metal glint: 4 rotation steps (loop)
18-21 SED DE SANGRE (Hombre lobo): a crimson blood aura with small red fang-shaped sparks rising (loop)
22-24: empty
```

**Recorte de archivos:**
- `f_p_consec_1`…`f_p_consec_4` (celdas 1-4): Consagración — Sacerdote
- `f_c_skin_1`…`f_c_skin_4` (celdas 5-8): Piel de tormenta — Chamán
- `f_pl_runes_1`…`f_pl_runes_5` (celdas 9-13): Llamarada — Paladín
- `f_b_multi_1`…`f_b_multi_4` (celdas 14-17): Hachas múltiples — Orco
- `f_w_blood_1`…`f_w_blood_4` (celdas 18-21): Sed de sangre — Hombre lobo

## Hoja 5 de 9 — Sacerdote, Chamán, Alquimista, Troll (21 celdas)

```
CELLS in reading order:
1-5 NOVA DE LUZ (Sacerdote): an expanding ring of bright holy light with rays (small, medium, large, thin, fade)
6-9 BARRERA DIVINA (Sacerdote): a translucent golden-white energy bubble with a faint glowing cross, shimmering (loop)
10-13 TÓTEM DE LA MAREA (Chamán): a turquoise water wave swirling around a small carved totem base, bubbles (loop)
14-17 GAS VOLÁTIL (Alquimista): a billowing sickly yellow-green gas cloud with small skull-like wisps (loop)
18-21 LLUVIA DE LANZAS (Troll): a tribal spear falling from above and sticking into the ground (falling, falling, impact, planted fade)
22-24: empty
```

**Recorte de archivos:**
- `f_p_nova_1`…`f_p_nova_5` (celdas 1-5): Nova de luz — Sacerdote
- `f_p_barrier_1`…`f_p_barrier_4` (celdas 6-9): Barrera divina — Sacerdote
- `f_c_tide_1`…`f_c_tide_4` (celdas 10-13): Tótem de la marea — Chamán
- `f_al_fumes_1`…`f_al_fumes_4` (celdas 14-17): Gas volátil — Alquimista
- `f_t_multi_1`…`f_t_multi_4` (celdas 18-21): Lluvia de lanzas — Troll

## Hoja 6 de 9 — Sacerdote, Chamán, Paladín, Hombre lobo (21 celdas)

```
CELLS in reading order:
1-5 RESURRECCIÓN (Sacerdote): a pillar of warm white light rising from a glowing sigil with feathers and sparks (start, grow, peak, shrink, fade)
6-9 FE ARDIENTE (Sacerdote): a holy golden-white flame burning on a target with small sparkles (loop)
10-13 TÓTEM DEL TRUENO (Chamán): a lightning bolt striking a small carved wooden totem with crackling sparks (start, strike, flash, fade)
14-17 AURA DE CURACIÓN Y DAÑO (Paladín): a gentle golden-green circle of rising plus signs and light motes on the ground (loop)
18-21 ZARPAZO DOBLE (Hombre lobo): two parallel red-white claw slashes in an X shape (start, peak, fade, sparks)
22-24: empty
```

**Recorte de archivos:**
- `f_p_res_1`…`f_p_res_5` (celdas 1-5): Resurrección — Sacerdote
- `f_p_faith_1`…`f_p_faith_4` (celdas 6-9): Fe ardiente — Sacerdote
- `f_c_thunder_1`…`f_c_thunder_4` (celdas 10-13): Tótem del trueno — Chamán
- `f_pl_aura_1`…`f_pl_aura_4` (celdas 14-17): Aura de curación y daño — Paladín
- `f_w_cleave_1`…`f_w_cleave_4` (celdas 18-21): Zarpazo doble — Hombre lobo

## Hoja 7 de 9 — Sacerdote, Chamán, Alquimista, Hombre lobo (21 celdas)

```
CELLS in reading order:
1-4 JUICIO (Sacerdote): a column of white-gold light striking down from above with a small impact burst (start, full beam, impact, fade)
5-8 SANTUARIO (Sacerdote): a translucent golden dome with a rune circle on the ground, pulsing (loop)
9-13 SOBRECARGA (Chamán): a violent electric discharge burst with forked lightning in all directions (small, growing, peak, branching, fade)
14-17 CATALIZADOR (Alquimista): a swirl of purple and gold sparkles around a small glowing vial reaction (loop)
18-21 ZARPAS DE PLATA (Hombre lobo): three bright silver-blue claw slashes with shiny sparkles (start, peak, fade, sparkles)
22-24: empty
```

**Recorte de archivos:**
- `f_p_judge_1`…`f_p_judge_4` (celdas 1-4): Juicio — Sacerdote
- `f_p_sanct_1`…`f_p_sanct_4` (celdas 5-8): Santuario — Sacerdote
- `f_c_overload_1`…`f_c_overload_5` (celdas 9-13): Sobrecarga — Chamán
- `f_al_catalyst_1`…`f_al_catalyst_4` (celdas 14-17): Catalizador — Alquimista
- `f_w_silver_1`…`f_w_silver_4` (celdas 18-21): Zarpas de plata — Hombre lobo

## Hoja 8 de 9 — Sacerdote, Chamán, Alquimista, Paladín (21 celdas)

```
CELLS in reading order:
1-4 PURIFICACIÓN (Sacerdote): a white-gold cleansing burst: swirling light and small doves of light dispersing (start, peak, fade, sparkles)
5-9 VÓRTICE (Chamán): a spinning vortex of blue-white wind and water with lightning sparks, seen from slightly above (loop)
10-13 GOLPE DE RELÁMPAGO (Chamán): a thick vertical lightning bolt from the sky with a ground impact flash (start, full, impact, fade)
14-17 ACEITE INFLAMABLE (Alquimista): a dark oil puddle catching orange flames, flames growing and flickering (loop)
18-21 AURA DE RESISTENCIA (Paladín): a golden shield-shaped energy glow with small stars, steady (loop)
22-24: empty
```

**Recorte de archivos:**
- `f_p_purge_1`…`f_p_purge_4` (celdas 1-4): Purificación — Sacerdote
- `f_c_vortex_1`…`f_c_vortex_5` (celdas 5-9): Vórtice — Chamán
- `f_c_bolt_1`…`f_c_bolt_4` (celdas 10-13): Golpe de relámpago — Chamán
- `f_al_oil_1`…`f_al_oil_4` (celdas 14-17): Aceite inflamable — Alquimista
- `f_pl_shield_1`…`f_pl_shield_4` (celdas 18-21): Aura de resistencia — Paladín

## Hoja 9 de 9 — Sacerdote, Chamán, Alquimista, Nigromante, Orco (23 celdas)

```
CELLS in reading order:
1-4 HALO SAGRADO (Sacerdote): a golden holy halo ring on the ground with floating light motes, gentle pulse (loop)
5-7 CADENAS DE LUZ (Sacerdote): a horizontal chain made of glowing golden light links pointing right (start, full, fade)
8-11 LLUVIA RITUAL (Chamán): a ground circle with teal blue rain falling and ripples, small totem glyphs (loop)
12-15 DELANTAL PROTECTOR (Alquimista): a soft glowing teal shield sheen with tiny bubbles, shimmering (loop)
16-19 AURA DE LA PARCA (Nigromante): a ring of floating green skulls and small scythes orbiting on the ground (loop)
20-23 SANGRADO (Orco): red blood drops and a slash mark dripping on a target (start, peak, drip, fade)
24-24: empty
```

**Recorte de archivos:**
- `f_p_halo_1`…`f_p_halo_4` (celdas 1-4): Halo sagrado — Sacerdote
- `f_p_chains_1`…`f_p_chains_3` (celdas 5-7): Cadenas de luz — Sacerdote
- `f_c_rain_1`…`f_c_rain_4` (celdas 8-11): Lluvia ritual — Chamán
- `f_al_coat_1`…`f_al_coat_4` (celdas 12-15): Delantal protector — Alquimista
- `f_n_wall_1`…`f_n_wall_4` (celdas 16-19): Aura de la parca — Nigromante
- `f_b_bleed_1`…`f_b_bleed_4` (celdas 20-23): Sangrado — Orco
