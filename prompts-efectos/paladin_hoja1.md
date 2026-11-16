# Efectos: Paladín (hoja 1 de 3)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 24)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-9 FORMA DE DRAGÓN: frames 1-4: golden dragon wings spread, flapping (loop, wings only); frames 5-9: a cone of fire pointing right (start, grow, peak, flicker, fade)
10-17 MARTILLO DIVINO: frames 1-4: a golden war hammer spinning in flight (4 rotation steps, loop); frames 5-8: impact (start, expand, peak, fade)
18-24 CARGA SAGRADA: frames 1-3: a golden dash streak with dust pointing left; frames 4-7: impact shockwave (start, expand, peak, fade)
```

**Recorte de archivos:**
- `pl_wrath_1`…`pl_wrath_9` (celdas 1-9): Forma de dragón
- `pl_hammer_1`…`pl_hammer_8` (celdas 10-17): Martillo divino
- `pl_charge_1`…`pl_charge_7` (celdas 18-24): Carga sagrada

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
