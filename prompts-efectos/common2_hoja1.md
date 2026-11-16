# Efectos: Efectos comunes 2: quemadura, hielo, miedo, maldición, crítico, invulnerable, muerte

**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 6 columnas × 4 filas (24 celdas; se usan 24)

Cada habilidad ocupa **celdas consecutivas** que son los fotogramas de su animación, en orden de lectura (dentro de cada efecto, los "frames 1-N" son locales a ese efecto). No hay personaje ni enemigos: solo el efecto.

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold thick dark-purple outline, vivid saturated colors, glossy painted shading, light from top-left). Plain solid magenta #FF00FF background.

EFFECTS-ONLY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid lines. Each cell holds ONE animation frame of a visual effect, centered and filling about 80% of its cell, nothing touching the cell edges. NO characters, NO enemies, NO letters, NO numbers, NO labels, NO text, NO ground shadows. Frames of the same effect keep the exact same size, colors and center, so they play as a smooth looping or one-shot animation when shown one after another. Ground effects are flat ellipses seen from a slight top-down angle. Beams, arrows and cones point RIGHT.

CELLS in reading order:
1-4 GOLPE CRÍTICO: a white-yellow starburst with sharp spikes, appearing and fading
5-8 INVULNERABLE (BUCLE): a golden glowing aura outline with sparkles, pulsing (loop)
9-12 MUERTE DE ENEMIGO: a round puff of grey dust and small stars, expanding and fading
13-15 QUEMADURA: small orange flames flickering upwards (loop)
16-18 RALENTIZADO: ice crystals and a small snail-slow blue swirl (loop)
19-21 MIEDO: a purple scared-face symbol with trembling lines (loop)
22-24 MALDICIÓN: a dark purple curse sigil with skull, wisps rising (loop)
```

**Recorte de archivos:**
- `fx_crit_1`…`fx_crit_4` (celdas 1-4): Golpe crítico
- `fx_invuln_1`…`fx_invuln_4` (celdas 5-8): Invulnerable (bucle)
- `fx_death_1`…`fx_death_4` (celdas 9-12): Muerte de enemigo
- `fx_burn_1`…`fx_burn_3` (celdas 13-15): Quemadura
- `fx_slow_1`…`fx_slow_3` (celdas 16-18): Ralentizado
- `fx_fear_1`…`fx_fear_3` (celdas 19-21): Miedo
- `fx_curse_1`…`fx_curse_3` (celdas 22-24): Maldición

**Consejos:** si una animación no sale fluida (el tamaño o el centro cambian entre fotogramas), repite solo esa fila de celdas. Diseños originales: no cites juegos ni personajes.
