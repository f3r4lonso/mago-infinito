# Prompts de arte: Torre, habilidades de torre y poderes (2 hojas)

Mismo método que el mago (`PROMPTS-ARTE-MAGO.md`): **2 generaciones**.

| Hoja | Contiene | Celdas |
|---|---|---|
| **1: torre y efectos** | Piezas de la torre, disparo básico, efectos de las 12 habilidades, cíclope, esqueletos y efectos de los poderes | 28 (7×4) |
| **2: iconos** | 12 habilidades + 10 poderes + 2 de interfaz | 24 (6×4) |

## Lo que cambia respecto al mago
- **No se piden iconos de mejora** (los 88 de habilidades y poderes): el código los compone con el icono, el marco de color y un símbolo.
- **Se piden líneas de cuadrícula** entre celdas. Facilitan el recorte automático.
- **Se reutilizan sprites del mago** (ver sección 4) para no generarlos otra vez.
- **Los prompts no citan juegos, marcas ni artistas.** El diseño de la torre continúa el del mago: piedra cálida, tejado índigo con luna creciente de latón y cristal turquesa flotante.

## Flujo
1. Genera la **Hoja 1** adjuntando `mago_hoja1.png` como referencia de estilo.
2. Genera la **Hoja 2** adjuntando la Hoja 1 de la torre y `mago_hoja2.png`.
3. Fondo magenta `#FF00FF`, resolución máxima. Si una celda sale mal, recórtala y pide solo ese sprite.

---

## 1. Hoja 1: torre y efectos (adjunta `mago_hoja1.png` como estilo)

Formato **3:2 horizontal**, cuadrícula de 7 columnas × 4 filas.

```
Same art style as the attached reference sheet (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters,
NO numbers, NO labels, NO text, NO ground shadows.

THEME: an arcane wizard tower built of warm cream-gray stone, indigo roof tiles with a
brass crescent-moon ornament, glowing teal windows, teal crystals; same world as the
wizard in the reference. Units are chibi: big head, small body.

CELLS in reading order:
1 tower ground base: low round stone platform with rune ring, front view
2 tower floor segment, WIDE: round stone tower section with one glowing teal arched
  window and a small battlement ledge on top; flat top and bottom edges, straight sides,
  must stack vertically
3 tower floor segment, NARROW: same design, 70% as wide
4 tower roof: tall pointed indigo roof with brass finial and a brass crescent moon
5 floating teal crystal: faceted glowing crystal diamond with soft halo
6 ruined tower: collapsed stone stump with rubble, cracked walls, a few teal crystal shards
7 tower ray bolt flying right: teal-white energy streak with a pointed head
8 teal starburst impact
9 arcane star missile flying right: glowing white-teal four-point star with a small trail
10 fireball flying right: orange fireball with a long flame tail
11 lightning bolt segment, horizontal: jagged yellow-white electric zigzag
12 dark orb: swirling purple-black sphere with a violet aura
13 steel spear flying right: gleaming spear with a pointed head
14 falling ice shard: large jagged pale-blue ice spike pointing down
15 wind blade: pale green-white crescent slash pointing right
16 gold coin: shiny gold coin with a star, slightly tilted
17 stone cyclops idle: chibi stone golem with ONE big eye, standing, arms down
18 stone cyclops attack: same golem with a fist raised to smash
19 skeleton warrior walking frame 1: chibi skeleton with sword and round shield, facing right
20 skeleton warrior walking frame 2: same, other leg forward
21 skeleton archer walking frame 1: chibi skeleton with a bow, facing right
22 skeleton archer walking frame 2: same, other leg forward
23 fire shockwave ring seen from above: orange-red ring with flame tips, empty center
24 black hole seen from above: dark swirling vortex with a glowing purple ring
25 rune barrier dome: translucent teal dome with a glowing rune ring, front view
26 ground crack ring seen from above: ring of cracked earth radiating outward, empty center
27 stone fountain: round basin with a water jet and sparkles, front view
28 healing burst: green-white plus-shaped sparkles radiating from the center
```

### Recorte (nombres de archivo)
| Celda | Archivo | Celda | Archivo |
|---|---|---|---|
| 1 | `t-base` | 15 | `s-wind` |
| 2 | `t-floor-a` | 16 | `s-coin` |
| 3 | `t-floor-b` | 17 | `u-cyclops-idle` |
| 4 | `t-roof` | 18 | `u-cyclops-hit` |
| 5 | `t-crystal` | 19-20 | `u-skelw-1`, `u-skelw-2` |
| 6 | `t-ruins` | 21-22 | `u-skela-1`, `u-skela-2` |
| 7 | `t-bolt` | 23 | `p-nova` |
| 8 | `t-impact` | 24 | `p-hole` |
| 9 | `s-arcane` | 25 | `p-barrier` |
| 10 | `s-fire` | 26 | `p-quake` |
| 11 | `s-bolt` | 27 | `p-spring` |
| 12 | `s-dark` | 28 | `p-heal` |
| 13 | `s-spear` | | |
| 14 | `s-hail` | | |

---

## 2. Hoja 2: iconos (adjunta la Hoja 1 de la torre y `mago_hoja2.png`)

Formato **3:2 horizontal**, cuadrícula de 6 columnas × 4 filas, un icono por casilla.

```
Same art style and same icon tile style as the attached reference sheets (original cartoon
fantasy game art, bold thick dark-purple outline, vivid colors, glossy shading). Plain
solid magenta #FF00FF background.

ICON SHEET: 6 columns x 4 rows, 24 equal square game icons, each one a rounded-square tile
with a dark-purple outline and a deep purple gradient background, ONE strong readable
symbol filling 80% of the tile, readable at 64 px. Tiles separated by clear magenta gaps.
NO letters, NO numbers, NO text on any icon, NO extra frames or badges.

Row 1 (tower skills): glowing white-teal star missile | orange fireball with flame tail |
  yellow-white chain lightning jumping between two sparks | golden beam of divine light from
  above | swirling purple-black dark orb | steel spear with a motion streak
Row 2: blue-violet magic pulse ring radiating | falling ice shards in a cloud |
  three small fireballs orbiting a core | stone one-eyed cyclops head | pale green wind
  blade crescent | gold coin with a spark
Row 3 (tower powers): fiery explosion burst | storm cloud with lightning bolts |
  skeleton head with a sword behind it | blizzard of snowflakes | flaming meteor falling |
  radiant golden star with rays of divine judgment
Row 4: black hole vortex with a purple ring | glowing rune shield | cracked ground with
  a stone fist | stone fountain with a water jet | arcane stone tower with a teal crystal |
  teal energy bolt orb
```

### Recorte (de izquierda a derecha, de arriba abajo)
| Fila | Archivos |
|---|---|
| 1 | `ico-arcane`, `ico-fire`, `ico-elec`, `ico-smite`, `ico-dark`, `ico-spear` |
| 2 | `ico-pulse`, `ico-hail`, `ico-orbit`, `ico-lightning` (cíclope), `ico-wind`, `ico-goldshot` |
| 3 | `ico-nova`, `ico-storm`, `ico-skel`, `ico-freeze`, `ico-meteor`, `ico-judge` |
| 4 | `ico-hole`, `ico-barrier`, `ico-quake`, `ico-spring`, `ico-tower`, `ico-towerbasic` |

Los ids coinciden con los de `SK` y `SPS` del juego, salvo `ico-lightning` (que es el cíclope) y los dos últimos, de interfaz.

---

## 3. Qué habilidades y poderes hay (para tener la referencia)

**Habilidades (12):** Misil arcano, Bola de fuego, Cadena de rayos, Castigo divino, Orbe oscuro, Lanza de acero, Pulso arcano, Granizo, Bolas de fuego orbitales, Cíclope de piedra, Cuchilla de viento, Disparo de oro.

**Poderes (10):** Explosión (nv 5), Tormenta de rayos (10), Soldados esqueleto (15), Ventisca (20), Lluvia de meteoros (25), Juicio divino (30), Agujero negro (35), Barrera rúnica (40), Terremoto (45), Fuente de vida (50).

Cada una tiene 4 mejoras. Sus iconos no se generan: el código los compone.

---

## 4. Qué se reutiliza del mago (no hay que generarlo)

| Efecto de torre | Sprite del mago |
|---|---|
| Explosión de la bola de fuego | `fireball` |
| Bolas orbitales | `flame` |
| Castigo divino y Juicio divino | `sunbeam`, `sunimpact` |
| Pulso arcano | `pulsering` |
| Granizo (impacto) | `iceshards` |
| Ventisca | `frostpatch`, `snow1`, `snow2` |
| Lluvia de meteoros | `meteor1`, `meteor2`, `crater` |
| Tormenta de rayos | `s-bolt` (se rota para caer vertical) |
| Barrera rúnica (onda) | `pulsering` |

---

## 5. Consejos
- **Pieza clave: las secciones de la torre.** El juego apila de 1 a 5 pisos y los estrecha hacia arriba. Si las dos secciones no encajan en ancho, se ve un salto. Revisa que los bordes de arriba y abajo coincidan.
- **El tejado y el cristal van encima** de la última sección, y el cristal flota. Si el cristal sale con un fondo duro, repite solo esa celda.
- **El cíclope y los esqueletos** se animan con 2 fotogramas: el juego los alterna al andar.
- **Revisión de derechos:** no menciones juegos, marcas ni artistas, y compara los personajes con otros conocidos antes de publicar.
