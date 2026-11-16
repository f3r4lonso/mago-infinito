# Efectos: Chamán (hoja 3 de 3)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 18)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-4 LLUVIA RITUAL: a flat ellipse zone of falling raindrops and ripples (loop)
5-8 RÁFAGA DE VIENTO: a blue wind blast cone pointing right (grows then fades)
9-12 NUBE CARGADA: a dark storm cloud with flickering lightning (loop)
13-15 ARCO CONDUCTOR: a blue-white electric arc stretched horizontally (start, full, flicker)
16-18 TÓTEM DEL TRUENO: a lightning discharge crackle (start, peak, fade)
19-24: empty
```

**Recorte de archivos:**
- `c_rain_1`…`c_rain_4` (celdas 1-4): Lluvia ritual
- `c_wind_1`…`c_wind_4` (celdas 5-8): Ráfaga de viento
- `c_cloud_1`…`c_cloud_4` (celdas 9-12): Nube cargada
- `c_arc_1`…`c_arc_3` (celdas 13-15): Arco conductor
- `c_thunder_1`…`c_thunder_3` (celdas 16-18): Tótem del trueno

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
