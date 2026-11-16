# Efectos: Bestia abisal (hoja 1 de 3)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 23)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-12 LANZAMIENTO DE ROCA: frames 1-4: a big rock spinning in flight (loop); frames 5-7: a dark ground target shadow ring pulsing (loop); frames 8-12: landing impact (start, expand, peak, debris, fade)
13-21 RUGIDO: frames 1-5: a red fury roar shockwave (start to fade); frames 6-9: a red stored-fury aura (loop)
22-23 ROCA FRAGMENTADA: small rock fragments spinning (loop)
24-24: empty
```

**Recorte de archivos:**
- `pb_rock_1`…`pb_rock_12` (celdas 1-12): Lanzamiento de roca
- `pb_uproar_1`…`pb_uproar_9` (celdas 13-21): Rugido
- `pb_frag_1`…`pb_frag_2` (celdas 22-23): Roca fragmentada

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
