# Prompts de arte (versión económica): 2 hojas por héroe

Estilo: dibujo animado de fantasía con cabeza grande, colores vivos y sombreado pintado. Los prompts **no citan juegos, marcas ni artistas** (ver sección 6).
Los prompts están en inglés (los generadores lo entienden mejor); el resto, en español.

**Resultado:** el mago completo (90 sprites) sale de **2 generaciones**:

| Hoja | Contiene | Celdas |
|---|---|---|
| **Hoja 1: personaje y efectos** | Mago de referencia, 4 piezas del cuerpo, ataque básico y 27 efectos | 34 |
| **Hoja 2: iconos** | 12 iconos de habilidad, 48 de mejora, 3 de interfaz | 63 |

Más el mapa (sección 4): 1 generación para ordenador y 1 para móvil.

## 0. Flujo (en este orden)
1. Genera la **Hoja 1**. Revisa que el mago salga bien.
2. Genera la **Hoja 2** pasando la Hoja 1 como **imagen de referencia**.
3. Si una celda sale mal, **no repitas la hoja**: recorta esa celda, pásala como referencia y pide solo ese sprite.
4. Usa la **resolución máxima** que ofrezca tu generador (2048 px de ancho o más).
5. Recorta cada celda, quita el magenta `#FF00FF`, guarda PNG con transparencia y ajusta al tamaño final **sin deformar** (encajando en el lienzo, no estirando).

El resto de héroes usará las mismas dos hojas: solo cambia el bloque `HERO`, la lista de habilidades y sus mejoras.

---

## 1. Hoja 1: personaje y efectos

Formato **3:2 horizontal**, cuadrícula de 7 columnas × 5 filas. Las 34 celdas se leen de izquierda a derecha y de arriba abajo; la celda 35 queda vacía.

```
Original cartoon fantasy tower-defense game art, hand-painted look. Chibi proportions
(big head = 1/3 of height, small body, oversized hands and weapon), bold thick dark-purple
outline #140e22, vivid saturated colors, glossy cel-shading with highlights, light from
top-left, flat 2D. Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 5 rows of equal cells, ONE separate sprite centered in each
cell, nothing touching the cell edges. Invisible grid: NO grid lines, NO labels, NO numbers,
NO text, NO ground shadows. Same art style in every cell.

HERO (cells 1-7): ORIGINAL character, a friendly elderly star-gazing wizard. Tall midnight-
indigo pointed hat with a floppy tip, cream hat band with a brass crescent-moon buckle,
a few small cream star patches, brass brim. Peach face, big round nose, thick grey-white
mustache and long beard tied with a small teal bead, round brass-rimmed spectacles. Deep
indigo robe with cream trim and tiny embroidered cream stars, brown leather belt with a
small brass hourglass charm, teal scarf, short plum cape. Twisted driftwood staff topped by
a brass ring holding a glowing pale-teal crystal with two tiny orbiting stars.

CELLS in order:
1 full wizard, front, standing (reference)
2 cape only: plum-colored trapezoid flaring at the hem, seen from front
3 robe and torso only, no head, arms or legs
4 head with full hat only, no neck
5 staff only, horizontal, orb pointing right
6 arcane bolt flying right: white-teal orb, violet tail
7 violet starburst impact
8 ice block with frost mist
9 ice shards burst
10 translucent white-blue ghost aura, empty center
11 ice explosion
12 single ice chain link, horizontal, pointing right
13 electric blue-violet pulse ring seen from above, empty center
14 thin glowing blue-violet circle marker with runes, seen from above
15-18 tornado, 4 animation frames (grey-teal funnel, swirl shifts each frame), side view
19 golden-orange wind ring with sparks, empty center
20 tall vertical column of white-gold light
21 golden sun impact ring seen from above
22-25 small fire spirit flying right, 4 animation frames (orange-red teardrop flame, yellow eyes)
26 flaming meteor falling toward bottom-right, tail to top-left
27 scorched crater seen from above, glowing molten cracks
28 round fireball explosion
29 cone of 4 nested white-yellow shockwave arcs pointing right
30 large six-pointed snowflake, pale blue
31 small simple snowflake
32 circular frost patch seen from above
33 horizontal beam of white-yellow light
34 white-gold lens-flare starburst, 8 rays
35 (empty)
```

### Para recortar la Hoja 1
| Celda | Archivo | Tamaño final |
|---|---|---|
| 1 | `mage-referencia.png` (solo guía; sirve también de retrato) | 130×150 |
| 2 | `cuerpo-capa.png` | 156×174 |
| 3 | `cuerpo-torso.png` | 192×200 |
| 4 | `cuerpo-cabeza.png` | 190×260 |
| 5 | `cuerpo-baston.png` | 330×80 |
| 6 | `basico-proyectil.png` | 128×64 |
| 7 | `basico-impacto.png` | 192×192 |
| 8 | `fx-i_cold-cubo.png` | 256×256 |
| 9 | `fx-i_cold-esquirlas.png` | 192×192 |
| 10 | `fx-i_ghost-aura.png` | 256×256 |
| 11 | `fx-i_wall-explosion.png` | 256×256 |
| 12 | `fx-i_wall-eslabon.png` | 128×64 |
| 13 | `fx-i_emp-pulso.png` | 256×256 |
| 14 | `fx-i_emp-carga.png` | 256×256 |
| 15-18 | `fx-i_tornado.png` (tira de 4 fotogramas) | 1024×256 |
| 19 | `fx-i_alacrity-aura.png` | 256×256 |
| 20 | `fx-i_sun-haz.png` | 128×512 |
| 21 | `fx-i_sun-impacto.png` | 256×256 |
| 22-25 | `fx-i_forge-espiritu.png` (tira de 4 fotogramas) | 512×128 |
| 26 | `fx-i_meteor-roca.png` | 192×192 |
| 27 | `fx-i_meteor-crater.png` | 256×256 |
| 28 | `fx-i_meteor-explosion.png` | 256×256 |
| 29 | `fx-i_blast-onda.png` | 384×192 |
| 30 | `fx-i_field-copo1.png` | 96×96 |
| 31 | `fx-i_field-copo2.png` | 64×64 |
| 32 | `fx-i_field-suelo.png` | 256×256 |
| 33 | `fx-i_laguna-haz.png` | 512×128 |
| 34 | `fx-i_laguna-destello.png` | 256×256 |

Los efectos de suelo se reducen a 256 px por lado: el juego los escala con el ancho `w` del descriptor, así que no pierden tamaño en pantalla.

---

## 2. Hoja 2: iconos (habilidades, mejoras e interfaz)

Formato **3:2 horizontal**, cuadrícula de 10 columnas × 7 filas. **Pasa la Hoja 1 como referencia.**

Cada fila contiene **2 habilidades**. Cada habilidad ocupa **5 celdas seguidas**: el icono de la habilidad y sus 4 mejoras. La fila 7 lleva 3 iconos de interfaz.

```
Same art style and same wizard as the attached reference sheet (original cartoon fantasy
game art, bold thick dark-purple outline, vivid colors, glossy shading). Plain solid
magenta #FF00FF background.

ICON SHEET: 10 columns x 7 rows of equal square cells, ONE square game icon centered in
each cell, nothing touching the cell edges. Invisible grid: NO grid lines, NO frames, NO
borders, NO labels, NO numbers, NO text. Each icon is one strong readable symbol that
fills 80% of its cell, readable at 64 px.

Each group of 5 consecutive cells = one skill: cell 1 is the SKILL ICON (its motif);
cells 2-5 are its 4 UPGRADES: the same motif drawn smaller in the back and one big clear
effect GLYPH in front. Cell 5 is the epic version: golden sparkles and ornate gold accents.
GLYPHS: H = hourglass, D = starburst impact, C = clock with down arrow, R = concentric
rings with outward arrows, P = two copies of the motif with a plus sign, L = heart,
S = heart with shield, T = spinning stars. A "+" between letters means both symbols together.

Row 1: [ice] a block of pale cyan ice with a frozen hand inside: H, D, C, D+H
       [ghost] a translucent glowing white-blue wizard ghost: H, C, L, H+C
Row 2: [chain] a chain of ice crystal links with ice shards bursting: P, R, D, P+C
       [pulse] a blue-violet electric ring with lightning arcs: R, D, C, R+D
Row 3: [tornado] a grey-teal tornado funnel with debris: R, T, D, R+D
       [haste] golden-orange wind swirls around a clenched fist: H, C, H, C+H
Row 4: [sun] a golden sun with a vertical white-gold beam: R, D, C, R+D
       [spirit] a small fierce fire spirit with yellow eyes: P, S, D, P+H
Row 5: [meteor] a flaming meteor falling diagonally: P, R, D, P+R
       [blast] a cone of white-yellow sound waves with a flash: R, D, C, R+D
Row 6: [blizzard] a circle of large pale-blue snowflakes around an ice crystal: R, H, D, R+H+C
       [beam] a thick beam of white-yellow light with a flare: D, H, C, D+C
Row 7: cell 1 = wizard head and hat, tight crop; cell 2 = glowing purple arcane bolt orb;
       cell 3 = wizard waist-up portrait holding the staff; cells 4-10 empty.
```

### Para recortar la Hoja 2
Cada habilidad ocupa 5 celdas: icono + `-1`, `-2`, `-3`, `-4`. Todos se reducen a **64×64**.

| Fila | Habilidad izquierda | Habilidad derecha |
|---|---|---|
| 1 | `i_cold` | `i_ghost` |
| 2 | `i_wall` | `i_emp` |
| 3 | `i_tornado` | `i_alacrity` |
| 4 | `i_sun` | `i_forge` |
| 5 | `i_meteor` | `i_blast` |
| 6 | `i_field` | `i_laguna` |

Archivos: `ico-<id>.png` para el icono y `mej-<id>-1.png` … `mej-<id>-4.png` para las mejoras. Ejemplo: fila 1, celdas 1 a 5 = `ico-i_cold`, `mej-i_cold-1`, `-2`, `-3`, `-4`.
Fila 7: `ui-icono.png` (64×64), `ui-basico.png` (64×64) y `ui-retrato.png` (130×150).

### Qué significa cada glifo (mejoras)
| Mejora | Glifos |
|---|---|
| Golpe gélido: Escarcha larga, Golpe profundo, Recarga fría, Cero absoluto | H, D, C, D+H |
| Paso fantasma: Fase larga, Recarga corta, Curación espectral, Más allá | H, C, L, H+C |
| Cadena de hielo: Rebote extra, Escarcha amplia, Hielo potente, Cadena infinita | P, R, D, P+C |
| Pulso electromagnético: Pulso amplio, Descarga fuerte, Recarga rápida, Colapso | R, D, C, R+D |
| Tornado: Tornado ancho, Larga suspensión, Vendaval, Ciclón | R, T, D, R+D |
| Alacridad: Alacridad larga, Recarga corta, Furia veloz, Ritmo perfecto | H, C, H, C+H |
| Rayo solar: Rayo ancho, Rayo potente, Recarga rápida, Eclipse | R, D, C, R+D |
| Espíritu de fuego: Espíritu extra, Espíritus robustos, Llama intensa, Legión ígnea | P, S, D, P+H |
| Meteoro del caos: Impacto extra, Meteoros grandes, Lluvia ardiente, Apocalipsis | P, R, D, P+R |
| Explosión ensordecedora: Onda larga, Onda potente, Recarga rápida, Trueno final | R, D, C, R+D |
| Campo de hielo: Ventisca amplia, Ventisca larga, Frío mordiente, Cero eterno | R, H, D, R+H+C |
| Rayo de luz: Rayo potente, Frenesí luminoso, Recarga rápida, Juicio solar | D, H, C, D+C |

El marco de color de cada mejora (verde, azul, violeta y dorado) lo pone el código.

---

## 3. Si algo sale mal (sin repetir la hoja entera)
- **Celda deformada o con otro estilo:** recorta esa celda, pásala como referencia y pide `the same sprite, fixed: {qué corregir}`. Es mucho más barato que repetir 34 o 63 sprites.
- **El generador mezcla celdas o pone texto:** repite la hoja una vez añadiendo `each sprite fully isolated with wide empty margins`. Si sigue mal, parte la Hoja 2 en dos mitades de 5 columnas (una por habilidad de cada fila).
- **Fondo no limpio:** aplica un recorte por color en un editor en lugar de pedir otra generación.

---

## 4. Mapa (2 generaciones)

El juego carga `assets/campo-batalla-arcano.png` (1586×992) y `assets/campo-batalla-arcano-movil.png` (941×1672). Con esos mismos nombres, el código no cambia. El mapa **no lleva torres ni personajes**, y su centro debe quedar despejado y de poco contraste.

### 4.1 Ordenador (16:10)
```
Original cartoon fantasy tower-defense MAP background, hand-painted look.
16:10 landscape, slightly raised top-down view, no horizon, no sky. Vivid saturated
colors, chunky stylized props with bold dark-purple outlines, outline-free ground.
Forgotten wizard battlefield: a wide OPEN central arena of warm cracked cobblestone and
dusty dirt with a faint broken circular arcane mosaic. The center 60% is flat, uncluttered
and LOW CONTRAST (characters must stay readable on it). Perimeter only: collapsed stone
arch top-left, broken battlements along the top, shattered round watchtower base on the
right, fallen columns, broken siege wheels, faded violet banners, rubble. Four corners:
lush emerald grass tufts, big leafy trees, bushes, ferns, ivy, red mushrooms, small
flowers, blending into the stone; a few small glowing cyan crystals. Warm daylight, soft
shadows, full-bleed, no border or vignette. NO towers, NO characters, NO creatures,
NO UI, NO text, NO bright objects in the center.
```

### 4.2 Móvil (9:16), con el mapa de ordenador como referencia
```
Recompose the attached landscape map as a PORTRAIT 9:16 mobile map, same cartoon
style and same elements, without stretching any object: large open low-contrast
central plaza (middle 65%), arch top-left, battlements along the top, watchtower base near
the upper right, columns and siege wheels in the lower corners, lush green trees, bushes
and mushrooms in all four corners, small cyan crystals. Full-bleed, no border. NO towers,
NO characters, NO UI, NO text.
```

---

## 5b. Derechos de autor: reglas para los prompts
No es asesoramiento legal. Son reglas prácticas para reducir el riesgo.
- **No nombres juegos, personajes, marcas ni artistas** en los prompts (ni "al estilo de…"). Describe el estilo con palabras: proporciones, contorno, color, sombreado.
- **No subas capturas ni arte de otros juegos como referencia.** Usa solo imágenes tuyas o de tu propia hoja de referencia.
- **Diseña rasgos propios** y compara el resultado con personajes famosos: si se parece demasiado a uno concreto, repite cambiando rasgos (forma del sombrero, colores, accesorios).
- **Guarda el prompt y la fecha** de cada generación. Sirve como prueba de que el diseño es original.
- **Revisa las condiciones de uso** del generador sobre uso comercial de lo que crea.

## 5. Resumen de ahorro
| | Antes | Ahora |
|---|---|---|
| Generaciones del mago | ~90 imágenes sueltas | **2 hojas** (+ correcciones puntuales) |
| Longitud del prompt | ~150 palabras de estilo repetidas en cada imagen | El estilo se escribe **una vez por hoja** |
| Mapa | 2 prompts largos | 2 prompts cortos |
