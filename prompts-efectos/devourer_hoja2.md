# Efectos: Bestia abisal (hoja 2 de 3)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 21)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-8 EMBESTIDA: frames 1-4: a dust and speed-line charge streak pointing left; frames 5-8: impact (start, expand, peak, fade)
9-13 PULVERIZAR: a heavy slam impact with cracks and rocks (start, crack, peak, debris, fade)
14-17 PISOTEAR: a stomp dust ring with ground cracks (start, expand, wide, fade)
18-21 IMPACTO BRUTAL: a brutal physical shockwave ring (start, expand, wide, fade)
22-24: empty
```

**Recorte de archivos:**
- `pb_onslaught_1`…`pb_onslaught_8` (celdas 1-8): Embestida
- `pb_pulverize_1`…`pb_pulverize_5` (celdas 9-13): Pulverizar
- `pb_trample_1`…`pb_trample_4` (celdas 14-17): Pisotear
- `pb_impact_1`…`pb_impact_4` (celdas 18-21): Impacto brutal

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
