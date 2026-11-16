# Efectos: Enano (hoja 2 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 21)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-5 CAMPO MINADO: a mine blast: bright flash then fire ring and smoke (start, expand, peak, smoke, fade)
6-10 COHETES TELEDIRIGIDOS: frames 1-2: a small rocket flying right with a flame; frames 3-5: grey smoke trail puffs pointing left (start, grow, fade)
11-14 TIRO EN LA CABEZA: a sharp white headshot impact flash with a small skull-spark (start, peak, fade)
15-18 GRANADA DE METRALLA: a flat ellipse ground zone of scattered metal shards and sparks (loop)
19-21 TORRETA: a muzzle flash pointing right (small, medium, fade)
22-24: empty
```

**Recorte de archivos:**
- `d_mines_1`…`d_mines_5` (celdas 1-5): Campo minado
- `d_rockets_1`…`d_rockets_5` (celdas 6-10): Cohetes teledirigidos
- `d_head_1`…`d_head_4` (celdas 11-14): Tiro en la cabeza
- `d_shrapnel_1`…`d_shrapnel_4` (celdas 15-18): Granada de metralla
- `d_turret_1`…`d_turret_3` (celdas 19-21): Torreta

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
