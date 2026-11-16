# Prompts de arte: los 15 héroes restantes (un archivo por hoja)

Mismo método que el mago, la torre y los enemigos. **Cada héroe necesita 2 generaciones**:

| Hoja | Contiene | Celdas |
|---|---|---|
| **1: juego** | Héroe de pie, héroe atacando, ataque básico, impacto y **2 efectos por habilidad** (24) | 28 (7×4) |
| **2: iconos** | 12 iconos de habilidad + icono del héroe, icono del ataque básico y retrato | 18 (6×3, 3 vacías) |

Total: **30 generaciones** para los 15 héroes. Cada hoja tiene su **propio archivo** (30 en total). Esta carpeta la genera `tools/generar-prompts-heroes.cjs` leyendo las habilidades reales del juego: si cambias un kit, vuelve a ejecutarlo.

## Flujo (por héroe)
1. **Hoja 1:** adjunta `mago_hoja1.png` y `torre_hoja1.png` como referencia de estilo.
2. **Hoja 2:** adjunta la Hoja 1 de ese héroe y `mago_hoja2.png`.
3. Fondo magenta `#FF00FF`, resolución máxima. Si una celda sale mal, recórtala y pide solo ese sprite.

## Cómo funciona cada habilidad en la Hoja 1
Cada habilidad ocupa **2 celdas seguidas**:
- **A:** lo que aparece al lanzarla (proyectil, aura, invocación, marca).
- **B:** su resultado (impacto, zona, explosión, criatura).

Si la habilidad es pasiva (críticos, velocidad de golpe, esquiva…), dibuja un efecto simbólico pequeño (destello, aura, símbolo).

## Qué NO se pide
- **Iconos de mejora** (los compone el código), jefes, marcos y estrellas.
- **Animación por partes:** el héroe es un sprite completo; el juego lo anima con rebote, inclinación y volteo.

## Reglas de derechos
Diseños **originales**: no cites juegos, personajes ni marcas. Compara cada héroe con personajes conocidos antes de publicar y cambia rasgos si se parece demasiado a uno. Los textos de las habilidades vienen del juego: algunos **nombres** (por ejemplo "Carrera del viento" o "Golpe de gracia") reproducen los de otros juegos; renómbralos antes de publicar.

---

## Archivos (copia el contenido del bloque de código de cada uno)

| Héroe | Hoja 1: juego | Hoja 2: iconos |
|---|---|---|
| Arquero elfo | [`archer_hoja1_juego.md`](archer_hoja1_juego.md) | [`archer_hoja2_iconos.md`](archer_hoja2_iconos.md) |
| Nigromante | [`necro_hoja1_juego.md`](necro_hoja1_juego.md) | [`necro_hoja2_iconos.md`](necro_hoja2_iconos.md) |
| Enano artillero | [`dwarf_hoja1_juego.md`](dwarf_hoja1_juego.md) | [`dwarf_hoja2_iconos.md`](dwarf_hoja2_iconos.md) |
| Orco guerrero | [`barbarian_hoja1_juego.md`](barbarian_hoja1_juego.md) | [`barbarian_hoja2_iconos.md`](barbarian_hoja2_iconos.md) |
| Cazador demonio | [`demon_hoja1_juego.md`](demon_hoja1_juego.md) | [`demon_hoja2_iconos.md`](demon_hoja2_iconos.md) |
| Sacerdote | [`priest_hoja1_juego.md`](priest_hoja1_juego.md) | [`priest_hoja2_iconos.md`](priest_hoja2_iconos.md) |
| Monje panda | [`monk_hoja1_juego.md`](monk_hoja1_juego.md) | [`monk_hoja2_iconos.md`](monk_hoja2_iconos.md) |
| Caballero dragón | [`paladin_hoja1_juego.md`](paladin_hoja1_juego.md) | [`paladin_hoja2_iconos.md`](paladin_hoja2_iconos.md) |
| Cazador troll | [`troll_hoja1_juego.md`](troll_hoja1_juego.md) | [`troll_hoja2_iconos.md`](troll_hoja2_iconos.md) |
| Hombre lobo | [`werewolf_hoja1_juego.md`](werewolf_hoja1_juego.md) | [`werewolf_hoja2_iconos.md`](werewolf_hoja2_iconos.md) |
| Tauren druida | [`druid_hoja1_juego.md`](druid_hoja1_juego.md) | [`druid_hoja2_iconos.md`](druid_hoja2_iconos.md) |
| Bestia abisal | [`devourer_hoja1_juego.md`](devourer_hoja1_juego.md) | [`devourer_hoja2_iconos.md`](devourer_hoja2_iconos.md) |
| Chamán de la tormenta | [`shaman_hoja1_juego.md`](shaman_hoja1_juego.md) | [`shaman_hoja2_iconos.md`](shaman_hoja2_iconos.md) |
| Asesino | [`assassin_hoja1_juego.md`](assassin_hoja1_juego.md) | [`assassin_hoja2_iconos.md`](assassin_hoja2_iconos.md) |
| Alquimista | [`alchemist_hoja1_juego.md`](alchemist_hoja1_juego.md) | [`alchemist_hoja2_iconos.md`](alchemist_hoja2_iconos.md) |
