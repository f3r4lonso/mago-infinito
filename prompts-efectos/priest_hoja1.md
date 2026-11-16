# Efectos: Sacerdote (hoja 1 de 3)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 23)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-7 JUICIO: frames 1-3: a vertical beam of white-gold light from above (start, full, fade); frames 4-7: holy impact (start, expand, peak, fade)
8-13 BARRERA DIVINA: frames 1-4: a golden holy barrier bubble (loop); frames 5-6: the barrier breaking into sparks
14-18 NOVA DE LUZ: a big holy light explosion (start, expand, peak, rays, fade)
19-23 RESURRECCIÓN: a rising column of light with feathered angel wings opening (5 steps)
24-24: empty
```

**Recorte de archivos:**
- `p_judge_1`…`p_judge_7` (celdas 1-7): Juicio
- `p_barrier_1`…`p_barrier_6` (celdas 8-13): Barrera divina
- `p_nova_1`…`p_nova_5` (celdas 14-18): Nova de luz
- `p_res_1`…`p_res_5` (celdas 19-23): Resurrección

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
