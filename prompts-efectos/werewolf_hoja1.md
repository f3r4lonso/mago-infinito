# Efectos: Hombre lobo (hoja 1 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 23)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-7 SALTO DE PRESA: frames 1-3: dust trail from a leap pointing left; frames 4-7: landing shockwave (start, expand, peak, fade)
8-13 LUNA LLENA: a silver-blue full moon beam and aura with sparkles (loop)
14-18 AULLIDO A LA LUNA: curved sound-wave crescents expanding from the center, with a faint moon glow (5 steps)
19-23 TAJO SALVAJE: a huge triple claw slash fan pointing right (5 steps)
24-24: empty
```

**Recorte de archivos:**
- `w_leap_1`…`w_leap_7` (celdas 1-7): Salto de presa
- `w_moon_1`…`w_moon_6` (celdas 8-13): Luna llena
- `w_howl_1`…`w_howl_5` (celdas 14-18): Aullido a la luna
- `w_rend_1`…`w_rend_5` (celdas 19-23): Tajo salvaje

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
