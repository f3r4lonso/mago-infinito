# Efectos: Druida (hoja 2 de 3)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 24)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-7 LLUVIA DE ESTRELLAS: frames 1-3: a falling glowing star with trail pointing down-left; frames 4-7: starfall impact (start, expand, peak, fade)
8-13 CÓLERA DE LA NATURALEZA: frames 1-2: a green nature energy bolt flying right (loop); frames 3-6: leafy impact (start, expand, peak, fade)
14-19 TELETRANSPORTE: frames 1-3: leaves swirling to vanish; frames 4-6: leaves swirling to appear
20-24 FUEGO LUNAR: a white-blue moonfire pillar falling from above (start, full, burn, flicker, fade)
```

**Recorte de archivos:**
- `u_star_1`…`u_star_7` (celdas 1-7): Lluvia de estrellas
- `u_wrath_1`…`u_wrath_6` (celdas 8-13): Cólera de la naturaleza
- `u_cyclone_1`…`u_cyclone_6` (celdas 14-19): Teletransporte
- `u_moon_1`…`u_moon_5` (celdas 20-24): Fuego lunar

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
