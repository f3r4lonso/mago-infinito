# Efectos: Sacerdote (hoja 2 de 3)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 24)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-4 PLEGARIA DE SANACIÓN: a golden light pillar with sparkles rising (start, bright, fade)
5-8 HALO SAGRADO: a golden halo ring seen from above with small rays, pulsing (loop)
9-12 CONSAGRACIÓN: a flat ellipse holy ground circle with golden cross runes (loop)
13-16 PURIFICACIÓN: a sacred white-gold shockwave ring expanding (start, expand, wide, fade)
17-20 CADENAS DE LUZ: golden glowing chains wrapped around the center, pulsing (loop)
21-24 FE ARDIENTE: holy golden flames igniting and flickering (loop)
```

**Recorte de archivos:**
- `p_heal_1`…`p_heal_4` (celdas 1-4): Plegaria de sanación
- `p_halo_1`…`p_halo_4` (celdas 5-8): Halo sagrado
- `p_consec_1`…`p_consec_4` (celdas 9-12): Consagración
- `p_purge_1`…`p_purge_4` (celdas 13-16): Purificación
- `p_chains_1`…`p_chains_4` (celdas 17-20): Cadenas de luz
- `p_faith_1`…`p_faith_4` (celdas 21-24): Fe ardiente

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
