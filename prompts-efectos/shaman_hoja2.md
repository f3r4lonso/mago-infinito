# Efectos: Chamán (hoja 2 de 3)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 22)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-6 MONZÓN: a wide zone of heavy rain with lightning flashes (loop)
7-12 MOJADO Y ESTÁTICA: frames 1-3: blue water drops sticking (loop); frames 4-6: crackling static sparks (loop)
13-17 SOBRECARGA: an electric burst with sparks and water splash (5 steps)
18-22 VÓRTICE: a water whirlpool zone spinning (loop)
23-24: empty
```

**Recorte de archivos:**
- `c_monsoon_1`…`c_monsoon_6` (celdas 1-6): Monzón
- `c_status_1`…`c_status_6` (celdas 7-12): Mojado y estática
- `c_overload_1`…`c_overload_5` (celdas 13-17): Sobrecarga
- `c_vortex_1`…`c_vortex_5` (celdas 18-22): Vórtice

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
