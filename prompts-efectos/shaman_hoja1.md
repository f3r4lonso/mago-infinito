# Efectos: Chamán (hoja 1 de 3)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 22)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-8 PIEL DE TORMENTA: frames 1-4: an electric shield bubble crackling (loop); frames 5-8: an electric discharge nova (start, expand, peak, fade)
9-15 GOLPE DE RELÁMPAGO: frames 1-3: a huge lightning bolt from above (start, full, fade); frames 4-7: impact (start, expand, peak, fade)
16-22 BOLA DE RELÁMPAGO: frames 1-4: an electric orb pulsing (loop); frames 5-7: discharge ring (start, expand, fade)
23-24: empty
```

**Recorte de archivos:**
- `c_skin_1`…`c_skin_8` (celdas 1-8): Piel de tormenta
- `c_bolt_1`…`c_bolt_7` (celdas 9-15): Golpe de relámpago
- `c_orb_1`…`c_orb_7` (celdas 16-22): Bola de relámpago

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
