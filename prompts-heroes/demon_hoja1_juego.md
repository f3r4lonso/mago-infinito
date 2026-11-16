# Cazador demonio: Hoja 1 (juego)

**Héroe:** Cazador demonio (`demon`) · a distancia
**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 7 columnas × 4 filas (28 celdas)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters, NO
numbers, NO labels, NO text, NO ground shadows.

HERO: a lean masked demon hunter: glowing green eyes, small curved horns, dark-purple leather armor, two curved scythe blades. Chibi proportions (big head, small body, oversized weapon), facing RIGHT.

CELLS in reading order:
1 the hero standing idle, full body
2 the same hero in an attack pose, casting or shooting to the right
3 BASIC ATTACK "Guadañas viles": a spinning curved green scythe blade flying right
4 basic attack impact: a green slash burst
5-6 SKILL "Metamorfosis": Te transformas en un demonio alado: lanzas 3 guadañas, atacas más rápido, pegas más fuerte y te. Cell 5 = effect when cast (projectile, aura, mark or summon); cell 6 = its result (impact, zone, explosion or creature)
7-8 SKILL "Aura de inmolación": Un aura de fuego vil te rodea y quema a los enemigos que se acercan. Cell 7 = effect when cast (projectile, aura, mark or summon); cell 8 = its result (impact, zone, explosion or creature)
9-10 SKILL "Rayos oculares": Tus ojos disparan rayos de energía que atraviesan a todos los enemigos en línea. Cell 9 = effect when cast (projectile, aura, mark or summon); cell 10 = its result (impact, zone, explosion or creature)
11-12 SKILL "Evasión": Posibilidad de esquivar el daño que recibes. Cell 11 = effect when cast (projectile, aura, mark or summon); cell 12 = its result (impact, zone, explosion or creature)
13-14 SKILL "Quemadura vil": Tus guadañas queman a los enemigos con energía vil. Cell 13 = effect when cast (projectile, aura, mark or summon); cell 14 = its result (impact, zone, explosion or creature)
15-16 SKILL "Golpe de sombras": Golpea con sombras a los enemigos más duros del mapa y los ralentiza. Cell 15 = effect when cast (projectile, aura, mark or summon); cell 16 = its result (impact, zone, explosion or creature)
17-18 SKILL "Cazador de demonios": Más daño contra jefes y enemigos que disparan, y recuperas vida con cada baja. Cell 17 = effect when cast (projectile, aura, mark or summon); cell 18 = its result (impact, zone, explosion or creature)
19-20 SKILL "Vacío vil": Abres un agujero oscuro que atrae a los enemigos hacia su centro y los desgarra. Cell 19 = effect when cast (projectile, aura, mark or summon); cell 20 = its result (impact, zone, explosion or creature)
21-22 SKILL "Golpe de gracia" (ULTIMATE, make it the most epic): Durante unos segundos tus golpes son siempre críticos devastadores, atacas más rápido y esquivas más. Cell 21 = effect when cast (projectile, aura, mark or summon); cell 22 = its result (impact, zone, explosion or creature)
23-24 SKILL "Daga asfixiante": Lanzas dagas a los enemigos más fuertes: los dañan, los ralentizan y los marcan para recibir más daño. Cell 23 = effect when cast (projectile, aura, mark or summon); cell 24 = its result (impact, zone, explosion or creature)
25-26 SKILL "Fragmentos de alma": Los enemigos caídos pueden soltar fragmentos de alma. Cell 25 = effect when cast (projectile, aura, mark or summon); cell 26 = its result (impact, zone, explosion or creature)
27-28 SKILL "Paso de sombra": Te desvaneces y reapareces junto a los enemigos más fuertes, hiriéndolos con un tajo de sombras y. Cell 27 = effect when cast (projectile, aura, mark or summon); cell 28 = its result (impact, zone, explosion or creature)
```

**Recorte de archivos:** `demon_idle`, `demon_atk`, `demon_basic`, `demon_basic_hit`, y para cada habilidad `fx_<id>_a` y `fx_<id>_b`: `z_meta`, `z_immo`, `z_eyes`, `z_evade`, `z_burn`, `z_shadow`, `z_hunt`, `z_void`, `z_coup`, `z_dagger`, `z_frag`, `z_step`.

**Siguiente paso:** `demon_hoja2_iconos.md` (adjuntando esta hoja).
