# Prompts de arte: Enemigos (3 hojas, 34 enemigos × 2 fotogramas)

Mismo método que el mago y la torre. Cada enemigo ocupa **2 celdas seguidas**: fotograma A y fotograma B de caminar. El juego los alterna y ya aplica por código el volteo, el rebote y los efectos de jefe, élite, aturdimiento y muerte.

| Hoja | Enemigos | Celdas |
|---|---|---|
| **1** | 12 enemigos (1 a 12) | 24 (6×4) |
| **2** | 11 enemigos (13 a 23) | 22 (6×4, 2 vacías) |
| **3** | 11 enemigos (24 a 34) | 22 (6×4, 2 vacías) |

## Flujo
1. Genera la **Hoja 1** adjuntando `mago_hoja1.png` y `torre_hoja1.png` como referencia de estilo.
2. Genera las hojas 2 y 3 adjuntando la Hoja 1 de enemigos, para que todos compartan estilo.
3. Fondo magenta `#FF00FF`, resolución máxima. Si una celda sale mal, recórtala y pide solo ese enemigo.

## Reglas comunes (ya incluidas en el prompt)
- **Mirando a la derecha**, de perfil o 3/4, de pie en el suelo. El juego los voltea por código.
- **Sin armas ni elementos que sobresalgan** mucho: el juego reduce todo al radio del enemigo (de 9 a 23 px).
- **Sin letras, números ni sombras en el suelo.**
- **Los jefes y élites** llevan su corona y aura por código: no se dibujan.
- **Diseños originales**, sin citar juegos, marcas ni personajes. Compara con personajes conocidos antes de publicar.

---

## Bloque común (se pega al principio de las 3 hojas)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

ENEMY SPRITE SHEET: 6 columns x 4 rows of equal cells separated by thin dark-purple grid
lines. Each ENEMY uses TWO ADJACENT CELLS (left cell = walk frame A, right cell = walk
frame B), so each row holds 3 enemies. Every enemy is hostile, chibi-proportioned (big head,
small body), facing RIGHT, standing on the ground, centered and filling about 80% of its
cell, nothing touching the cell edges. Frame A and B are the same creature with a different
walking pose (other leg forward, or squashed vs stretched for blobs, wings up vs down for
flyers). NO letters, NO numbers, NO labels, NO text, NO ground shadows.
```

---

## Hoja 1: enemigos 1 a 12

```
Row 1: [1] SKELETON: grey-green bones, rusty short sword, tattered cloth, dim red glowing
         eyes | [2] SLIME: round green jelly blob with two big eyes and a wobbly shape |
         [3] GOBLIN: small green goblin with huge pointed ears and a dagger
Row 2: [4] ZOMBIE: rotting grey-green zombie with arms stretched forward, torn clothes |
         [5] SPECTRE: pale blue-white ghost with hollow eyes and a tattered tail, floating |
         [6] GOLEM: big mossy boulder golem with glowing orange cracks and tiny head
Row 3: [7] FIRE ELEMENTAL: living humanoid flame with yellow eyes | [8] ICE ELEMENTAL:
         jagged pale-blue ice crystal creature with a frosty face | [9] DEMON: small red
         horned demon with bat wings and a pointed tail
Row 4: [10] AUTOMATON: brass clockwork robot with rivets, gears and a glowing blue eye |
         [11] SKELETON ARCHER: skeleton in a ragged hood drawing a bow | [12] DARK SORCERER:
         hooded purple-robed mage holding a staff with a glowing dark orb
```

### Archivos (A y B de cada uno)
`e_skel_1/2`, `e_slime_1/2`, `e_goblin_1/2`, `e_zombie_1/2`, `e_ghost_1/2`, `e_golem_1/2`, `e_fire_1/2`, `e_ice_1/2`, `e_demon_1/2`, `e_robot_1/2`, `e_archer_1/2`, `e_mage_1/2`

---

## Hoja 2: enemigos 13 a 23 (las celdas 23 y 24 quedan vacías)

```
Row 1: [13] SNIPER: hooded hunter with a very long crossbow | [14] SEWER RAT: big dirty
         brown rat with a long tail and red eyes | [15] BAT: purple bat with spread wings
Row 2: [16] DIRE WOLF: big grey wolf, snarling, fur bristling | [17] MOTHER SPIDER: pink-
         magenta spider with a round body, 8 legs and a small egg sac on its back |
         [18] GIANT JELLY: big teal jelly blob with floating bubbles and a half-dissolved
         skull inside
Row 3: [19] GOBLIN HEALER: green goblin shaman in a leaf robe holding a glowing green staff |
         [20] REVENANT: undead wrapped in old burial bandages with glowing eyes and a ragged
         shroud | [21] TROLL: big green troll with warty skin and a wooden club
Row 4: [22] ARMORED CRAB: orange-red crab with a thick spiked shell and big claws |
         [23] PHOENIX: fiery red-orange bird with burning wings | [empty] [empty]
```

### Archivos
`e_wolf`, `e_sniper`, `e_rat`, `e_bat`, `e_spider`, `e_gel`, `e_healer`, `e_mummy`, `e_troll`, `e_crab`, `e_phoenix` (cada uno con `_1` y `_2`)

---

## Hoja 3: enemigos 24 a 34 (las celdas 23 y 24 quedan vacías)

```
Row 1: [24] VAMPIRE: pale noble in a high-collared dark red cape with fangs | [25] ELECTRIC
         ELEMENTAL: yellow-white living lightning with sparks | [26] SHADOW: black smoke
         creature with two white glowing eyes
Row 2: [27] ICE MAMMOTH: icy blue woolly mammoth with big tusks | [28] HOLY GUARDIAN:
         golden armored statue with a big shield and a floating halo | [29] CRYSTAL KNIGHT:
         knight made of cyan crystal with a faceted sword
Row 3: [30] HYDRA: green three-headed serpent | [31] SIEGE RAM: wooden battering ram on small
         wheels with an iron head, pushed by tiny feet | [32] SAPPER: small goblin carrying a
         barrel bomb with a lit fuse
Row 4: [33] ORC COMMANDER: armored orc with a war horn and a small banner on its back |
         [34] CATAPULT: small wooden catapult with a boulder | [empty] [empty]
```

### Archivos
`e_vampire`, `e_zap`, `e_shadow`, `e_mammoth`, `e_guardian`, `e_crystal`, `e_hydra`, `e_ram`, `e_sapper`, `e_commander`, `e_catapult` (cada uno con `_1` y `_2`)

---

## Equivalencia con el juego
Los ids de los 30 primeros coinciden con `FOE_MAP` del juego (`skel`, `slime`, `goblin`…). Los 4 nuevos (`ram`, `sapper`, `commander`, `catapult`) sustituyen al arte reutilizado de ariete (`golem`), zapador (`goblin`), comandante orco (`troll`) y catapulta (`robot`).

## Qué no se dibuja
Jefe, élite, aura, escudo de invulnerabilidad, aturdimiento, ralentización y muerte: el juego los pinta por código encima del sprite.

## Consejos
- **Coherencia de tamaño:** el juego escala cada enemigo a su radio. Dibújalos todos llenando la celda: el tamaño relativo (rata pequeña, mamut grande) lo da el juego.
- **Los dos fotogramas deben ser casi iguales.** Si A y B difieren mucho de forma, la animación parpadea. Repite la celda mala, no la hoja.
- **Flotantes** (espectro, murciélago, fénix, sombra, elementales): no necesitan pies.
- **Derechos:** diseños originales, sin referencias a juegos ni personajes.
