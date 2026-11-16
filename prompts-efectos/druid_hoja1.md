# Efectos: Druida (hoja 1 de 3)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 24)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-8 ENREDAR: frames 1-5: roots and thorny vines bursting from the ground (start to full); frames 6-8: roots holding (loop)
9-16 FORMA DE OSO: frames 1-4: transformation burst of leaves (start, peak, swirl, fade); frames 5-8: brown-green wild aura (loop)
17-24 ECLIPSE: frames 1-4: a warm golden solar-phase aura (loop); frames 5-8: a cool blue lunar-phase aura (loop)
```

**Recorte de archivos:**
- `u_thorns_1`…`u_thorns_8` (celdas 1-8): Enredar
- `u_bear_1`…`u_bear_8` (celdas 9-16): Forma de oso
- `u_eclipse_1`…`u_eclipse_8` (celdas 17-24): Eclipse

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
