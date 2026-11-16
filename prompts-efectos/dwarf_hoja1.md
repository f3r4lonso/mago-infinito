# Efectos: Enano (hoja 1 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 23)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-10 ASESINO: frames 1-3: a thin red laser-sight line pointing right (appear, steady, flicker); frames 4-6: a thick white-orange bullet tracer line pointing right (start, full, fade); frames 7-10: huge impact flash (start, expand, peak, fade)
11-17 LANZAGRANADAS: frames 1-2: a round grenade spinning in flight (loop); frames 3-7: orange explosion (start, expand, peak, smoke, fade)
18-23 BARRIL EXPLOSIVO: a huge powder-barrel explosion: flash, fireball, shockwave ring, smoke (6 steps)
24-24: empty
```

**Recorte de archivos:**
- `d_snipe_1`…`d_snipe_10` (celdas 1-10): Asesino
- `d_grenade_1`…`d_grenade_7` (celdas 11-17): Lanzagranadas
- `d_blast_1`…`d_blast_6` (celdas 18-23): Barril explosivo

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
