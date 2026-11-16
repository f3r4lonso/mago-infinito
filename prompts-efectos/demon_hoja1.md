# Efectos: Cazador de demonios (hoja 1 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 24)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-7 METAMORFOSIS: frames 1-4: a pair of dark-purple bat-like demon wings spread, flapping (loop, wings only, no body); frames 5-7: transformation flash with purple fire (start, peak, fade)
8-14 GOLPE DE GRACIA: frames 1-3: a golden-red critical slash flash (start, peak, fade); frames 4-7: a golden-red aura (loop)
15-20 FRAGMENTOS DE ALMA: frames 1-3: a floating teal-white soul fragment pulsing (loop); frames 4-6: absorb burst (start, peak, fade)
21-24 AURA DE INMOLACIÓN: a flat ellipse ring of vile green-purple hellfire (loop)
```

**Recorte de archivos:**
- `z_meta_1`…`z_meta_7` (celdas 1-7): Metamorfosis
- `z_coup_1`…`z_coup_7` (celdas 8-14): Golpe de gracia
- `z_frag_1`…`z_frag_6` (celdas 15-20): Fragmentos de alma
- `z_immo_1`…`z_immo_4` (celdas 21-24): Aura de inmolación

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
