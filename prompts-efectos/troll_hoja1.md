# Efectos: Troll (hoja 1 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 24)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-12 ESPÍRITU DEL LOA: frames 1-6: a big ghostly teal spirit mask aura (loop); frames 7-9: a spectral spear flying down (start, mid, end); frames 10-12: spectral impact (start, peak, fade)
13-20 LANZA EXPLOSIVA: frames 1-3: a spear stuck in the ground with a glowing pulse (loop); frames 4-8: fire explosion (start, expand, peak, smoke, fade)
21-24 PACTO DE SANGRE: a dark red blood wave ring expanding (start, expand, wide, fade)
```

**Recorte de archivos:**
- `t_loa_1`…`t_loa_12` (celdas 1-12): Espíritu del Loa
- `t_spear_1`…`t_spear_8` (celdas 13-20): Lanza explosiva
- `t_trap_1`…`t_trap_4` (celdas 21-24): Pacto de sangre

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
