# Efectos: Arquero (hoja 1 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 24)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-9 DISPARO POTENTE: frames 1-2: charging golden glow at an arrow tip; frames 3-5: a thick golden beam pointing right (narrow start, full, fade); frames 6-9: impact flash (start, peak, fade)
10-16 GRILLETE: frames 1-3: a glowing energy chain stretched horizontally (appear, taut, fade); frames 4-7: a glowing shackle ring locking on the ground (loop)
17-22 FLECHAS DE ESCARCHA: frames 1-2: ice-blue arrow in flight (loop); frames 3-6: icy impact burst with shards (start, expand, peak, fade)
23-24 FLECHA PERFORANTE: a glowing white arrow flying right with a bright motion trail, 2 shimmer frames (loop)
```

**Recorte de archivos:**
- `a_snipe_1`…`a_snipe_9` (celdas 1-9): Disparo potente
- `a_shackle_1`…`a_shackle_7` (celdas 10-16): Grillete
- `a_frost_1`…`a_frost_6` (celdas 17-22): Flechas de escarcha
- `a_pierce_1`…`a_pierce_2` (celdas 23-24): Flecha perforante

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
