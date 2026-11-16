# Efectos: Efectos comunes 1: invocar, curar, escudo y estados

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 24)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-4 INVOCACIÓN (NUBE MÁGICA): a puff of magic smoke and sparkles appearing, expanding and thinning out
5-8 CURACIÓN: green healing light: sparkles and small plus signs rising up, bright then fading
9-12 ESCUDO / BURBUJA (BUCLE): a translucent blue-white energy bubble with a soft rim, gently pulsing, loop
13-15 ATURDIDO: three yellow stars circling in a ring (loop, each frame the stars rotate)
16-18 VENENO: bubbling green poison drops and skull-green bubbles rising (loop)
19-21 SANGRADO: dripping red blood drops falling (loop)
22-24 MARCA / DIANA: a glowing red target reticle with a small skull, pulsing (loop)
```

**Recorte de archivos:**
- `fx_summon_1`…`fx_summon_4` (celdas 1-4): Invocación (nube mágica)
- `fx_heal_1`…`fx_heal_4` (celdas 5-8): Curación
- `fx_shield_1`…`fx_shield_4` (celdas 9-12): Escudo / burbuja (bucle)
- `fx_stun_1`…`fx_stun_3` (celdas 13-15): Aturdido
- `fx_poison_1`…`fx_poison_3` (celdas 16-18): Veneno
- `fx_bleed_1`…`fx_bleed_3` (celdas 19-21): Sangrado
- `fx_mark_1`…`fx_mark_3` (celdas 22-24): Marca / diana

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
