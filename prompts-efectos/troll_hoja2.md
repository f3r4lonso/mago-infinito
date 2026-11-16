# Efectos: Troll (hoja 2 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 17)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-7 MALEFICIO DE RANA: frames 1-4: a green hex bubble with a small frog silhouette (loop); frames 5-7: green poof (start, peak, fade)
8-13 LANZAS ARDIENTES: frames 1-2: a flaming spear flying right (loop); frames 3-6: fire impact (start, expand, peak, fade)
14-17 POSTURA DE GUERRA: a red-orange war stance aura with small spears around (loop)
18-24: empty
```

**Recorte de archivos:**
- `t_hex_1`…`t_hex_7` (celdas 1-7): Maleficio de rana
- `t_boar_1`…`t_boar_6` (celdas 8-13): Lanzas ardientes
- `t_fury_1`…`t_fury_4` (celdas 14-17): Postura de guerra

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
