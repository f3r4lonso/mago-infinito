# Efectos: Nigromante (hoja 2 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 17)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-5 EXPLOSIÓN DE CADÁVERES: a green-purple explosion of bones and gore-free spirit smoke (start, expand, peak, burst, fade)
6-9 PESTILENCIA: a round toxic green-yellow cloud with bubbles billowing around the center (loop)
10-13 MALDICIÓN: a purple curse sigil floating above, wisps rising (loop)
14-17 ABOMINACIÓN: bones and flesh swirling together into a flash of green light (start, swirl, peak, fade)
18-24: empty
```

**Recorte de archivos:**
- `n_corpse_1`…`n_corpse_5` (celdas 1-5): Explosión de cadáveres
- `n_pest_1`…`n_pest_4` (celdas 6-9): Pestilencia
- `n_curse_1`…`n_curse_4` (celdas 10-13): Maldición
- `n_abom_1`…`n_abom_4` (celdas 14-17): Abominación

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
