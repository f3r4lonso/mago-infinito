# Efectos: Arquero (hoja 2 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 18)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-6 FUEGO CONCENTRADO: frames 1-4: orange-gold speed burst aura with radiating lines (loop); frames 5-6: a fast arrow streak pointing right
7-10 CARRERA DEL VIENTO: green wind swirl wrapping around the middle of the cell, like a spiral of air (loop)
11-14 RÁFAGA: a cone of wind swirls pointing right, narrow on the left and wide on the right (grows then fades)
15-18 AURA DE PRECISIÓN: a flat ellipse ground ring with small target-reticle runes, glowing yellow, pulsing (loop)
19-24: empty
```

**Recorte de archivos:**
- `a_focus_1`…`a_focus_6` (celdas 1-6): Fuego concentrado
- `a_windrun_1`…`a_windrun_4` (celdas 7-10): Carrera del viento
- `a_gust_1`…`a_gust_4` (celdas 11-14): Ráfaga
- `a_aura_1`…`a_aura_4` (celdas 15-18): Aura de precisión

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
