# Efectos: Nigromante (hoja 1 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 24)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-9 SENTENCIA DE LA PARCA: frames 1-5: a giant scythe reaping slash arc sweeping (start to full arc to fade); frames 6-9: a death-mark skull rising above the target (loop)
10-15 LANZA DE HUESOS: frames 1-2: a huge bone spear pointing right (loop); frames 3-6: bone shard impact burst (start, expand, peak, fade)
16-20 DRENAR VIDA: frames 1-3: a red-purple ribbon of energy stretched horizontally (appear, flowing, fade); frames 4-5: a small glowing soul orb flying right
21-24 AURA DE LA PARCA: a flat ellipse ground ring of dark green smoke with small rotating scythes and skulls (loop)
```

**Recorte de archivos:**
- `n_souls_1`…`n_souls_9` (celdas 1-9): Sentencia de la parca
- `n_spear_1`…`n_spear_6` (celdas 10-15): Lanza de huesos
- `n_drain_1`…`n_drain_5` (celdas 16-20): Drenar vida
- `n_wall_1`…`n_wall_4` (celdas 21-24): Aura de la parca

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
