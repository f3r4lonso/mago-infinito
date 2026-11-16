# Efectos: Paladín (hoja 3 de 3)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 15)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-4 AURA DE CURACIÓN Y DAÑO: a flat ellipse sacred golden aura ring with soft pulses (loop)
5-8 IMPOSICIÓN DE MANOS: a warm golden glow with small hands of light rising (start, bright, fade)
9-12 GOLPE CON ESCUDO: a round shield bash shockwave (start, expand, peak, fade)
13-15 LANZA DE LUZ: a long spear of holy light pointing right, narrow tip (start, full, fade)
16-24: empty
```

**Recorte de archivos:**
- `pl_aura_1`…`pl_aura_4` (celdas 1-4): Aura de curación y daño
- `pl_hands_1`…`pl_hands_4` (celdas 5-8): Imposición de manos
- `pl_throw_1`…`pl_throw_4` (celdas 9-12): Golpe con escudo
- `pl_beam_1`…`pl_beam_3` (celdas 13-15): Lanza de luz

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
