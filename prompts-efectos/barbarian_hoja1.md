# Efectos: Orco (hoja 1 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 23)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-6 BERSERKER: a red-orange berserk fire aura with rising embers and angry eyes glow (loop)
7-11 DANZA DE LA CUCHILLA: a spinning circular blade slash ring, whirling steel arcs with sparks (loop)
12-15 HACHAS: a throwing axe spinning in flight: 4 rotation steps of the same axe (loop)
16-19 RUGIDO DE LA MANADA: a red-orange roar shockwave: concentric curved rings expanding (loop)
20-23 FURIA: a red flame aura around the center, flickering (loop)
24-24: empty
```

**Recorte de archivos:**
- `b_berserk_1`…`b_berserk_6` (celdas 1-6): Berserker
- `b_whirl_1`…`b_whirl_5` (celdas 7-11): Danza de la cuchilla
- `b_axe_1`…`b_axe_4` (celdas 12-15): Hachas
- `b_aspd_1`…`b_aspd_4` (celdas 16-19): Rugido de la manada
- `b_rage_1`…`b_rage_4` (celdas 20-23): Furia

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
