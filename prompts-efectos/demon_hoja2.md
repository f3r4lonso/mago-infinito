# Efectos: Cazador de demonios (hoja 2 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 22)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-6 PASO DE SOMBRA: frames 1-3: dissolving into black-purple smoke (start, thick, fade); frames 4-6: a shadow slash arc appearing (start, peak, fade)
7-11 VACÍO VIL: a black-purple vortex hole with swirling particles spinning (loop)
12-15 GOLPE DE SOMBRAS: a dark violet shadow slash strike with ink splatter (start, peak, fade)
16-19 DAGA ASFIXIANTE: a dagger with a dark trail spinning in flight: 4 rotation steps (loop)
20-22 RAYOS OCULARES: a twin energy beam pointing right, narrow start (start, full, fade)
23-24: empty
```

**Recorte de archivos:**
- `z_step_1`…`z_step_6` (celdas 1-6): Paso de sombra
- `z_void_1`…`z_void_5` (celdas 7-11): Vacío vil
- `z_shadow_1`…`z_shadow_4` (celdas 12-15): Golpe de sombras
- `z_dagger_1`…`z_dagger_4` (celdas 16-19): Daga asfixiante
- `z_eyes_1`…`z_eyes_3` (celdas 20-22): Rayos oculares

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
