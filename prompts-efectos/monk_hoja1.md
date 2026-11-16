# Efectos: Panda (monje) (hoja 1 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 23)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-5 PATADA DEL HURACÁN: a spiral whirlwind of kicks, white-blue arcs spinning (loop)
6-10 NIRVANA: a serene golden lotus aura with floating petals (loop)
11-15 GONG DEL TRUENO: a thunder shockwave: yellow-blue lightning rings from a gong (5 steps)
16-19 COMBO DE PALMA: a golden palm strike shockwave burst (start, expand, peak, fade)
20-23 OLA DE CHI: a blue chi energy ring expanding with swirling lines (start, expand, wide, fade)
24-24: empty
```

**Recorte de archivos:**
- `k_kick_1`…`k_kick_5` (celdas 1-5): Patada del huracán
- `k_nirvana_1`…`k_nirvana_5` (celdas 6-10): Nirvana
- `k_gong_1`…`k_gong_5` (celdas 11-15): Gong del trueno
- `k_combo_1`…`k_combo_4` (celdas 16-19): Combo de palma
- `k_wave_1`…`k_wave_4` (celdas 20-23): Ola de chi

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
