# Efectos: Paladín (hoja 2 de 3)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 22)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-5 INVULNERABILIDAD: a big golden shining dome with bright rays (loop)
6-10 LLAMARADA: a cone of fire pointing right, narrow on the left and wide on the right (5 steps)
11-14 ESPADA CONSAGRADA: a golden holy slash on hit with sparks (start, peak, fade)
15-18 BARRIDO: a wide steel-white sweeping arc slash pointing right (start, wide, peak, fade)
19-22 AURA DE RESISTENCIA: a flat ellipse blue-gold shield aura ring (loop)
23-24: empty
```

**Recorte de archivos:**
- `pl_bastion_1`…`pl_bastion_5` (celdas 1-5): Invulnerabilidad
- `pl_runes_1`…`pl_runes_5` (celdas 6-10): Llamarada
- `pl_holy_1`…`pl_holy_4` (celdas 11-14): Espada consagrada
- `pl_cleave_1`…`pl_cleave_4` (celdas 15-18): Barrido
- `pl_shield_1`…`pl_shield_4` (celdas 19-22): Aura de resistencia

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
