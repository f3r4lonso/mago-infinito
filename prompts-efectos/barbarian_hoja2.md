# Efectos: Orco (hoja 2 de 2)

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 15)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-4 DECAPITADOR: a brutal heavy red-white slash with a small skull flash (start, peak, fade)
5-8 LLAMADA DE BATALLA: inward-pulling concentric rings with a small horn symbol (loop)
9-12 HAMBRE DE SANGRE: a brutal red claw-like triple slash across the cell (start, peak, fade)
13-15 JABALÍ EMBESTIDOR: a brown dust cloud of a charging dash pointing left (grow, peak, fade)
16-24: empty
```

**Recorte de archivos:**
- `b_exec_1`…`b_exec_4` (celdas 1-4): Decapitador
- `b_shout_1`…`b_shout_4` (celdas 5-8): Llamada de batalla
- `b_chain_1`…`b_chain_4` (celdas 9-12): Hambre de sangre
- `b_dust_1`…`b_dust_3` (celdas 13-15): Jabalí embestidor

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
