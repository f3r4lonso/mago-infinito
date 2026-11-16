# Alquimista: Hoja 1 (juego)

**Héroe:** Alquimista (`alchemist`) · a distancia
**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 7 columnas × 4 filas (28 celdas)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters, NO
numbers, NO labels, NO text, NO ground shadows.

HERO: a big green-skinned ogre alchemist: leather apron, goggles, a backpack of bubbling colored flasks, a mortar. Chibi proportions (big head, small body, oversized weapon), facing RIGHT.

CELLS in reading order:
1 the hero standing idle, full body
2 the same hero in an attack pose, casting or shooting to the right
3 BASIC ATTACK "Frasco corrosivo": a spinning corrosive green flask flying right
4 basic attack impact: a green acid splash
5-6 SKILL "Frasco corrosivo": Mejora el ataque básico, añade salpicadura e intoxicación y deja un charco ácido al impactar. Cell 5 = effect when cast (projectile, aura, mark or summon); cell 6 = its result (impact, zone, explosion or creature)
7-8 SKILL "Aceite inflamable": Coloca aceite que ralentiza un 30%. Cell 7 = effect when cast (projectile, aura, mark or summon); cell 8 = its result (impact, zone, explosion or creature)
9-10 SKILL "Chispa reactiva": Lanza una ignición de fuego sobre un grupo y prende el aceite cercano. Cell 9 = effect when cast (projectile, aura, mark or summon); cell 10 = its result (impact, zone, explosion or creature)
11-12 SKILL "Catalizador": Adelanta 1 s de daño de venenos y quemaduras propios y reduce su duración en 1 s. Cell 11 = effect when cast (projectile, aura, mark or summon); cell 12 = its result (impact, zone, explosion or creature)
13-14 SKILL "Mezcla inestable": Consume dos charcos cercanos de sustancias distintas para causar una explosión. Cell 13 = effect when cast (projectile, aura, mark or summon); cell 14 = its result (impact, zone, explosion or creature)
15-16 SKILL "Antídoto experimental": Consume una parte del veneno propio de hasta 3 enemigos cercanos para curarte. Cell 15 = effect when cast (projectile, aura, mark or summon); cell 16 = its result (impact, zone, explosion or creature)
17-18 SKILL "Delantal protector": Reduce el daño recibido mientras estás cerca de tus charcos; cuenta como máximo 3. Cell 17 = effect when cast (projectile, aura, mark or summon); cell 18 = its result (impact, zone, explosion or creature)
19-20 SKILL "Destilación rápida": Acelera el lanzamiento de frascos básicos. Cell 19 = effect when cast (projectile, aura, mark or summon); cell 20 = its result (impact, zone, explosion or creature)
21-22 SKILL "Gas volátil": Crea una nube tóxica persistente que puede combinarse con ácido o aceite mediante Mezcla inestable. Cell 21 = effect when cast (projectile, aura, mark or summon); cell 22 = its result (impact, zone, explosion or creature)
23-24 SKILL "Gran transmutación" (ULTIMATE, make it the most epic): Consume hasta 8 charcos y provoca una explosión en cada uno. Cell 23 = effect when cast (projectile, aura, mark or summon); cell 24 = its result (impact, zone, explosion or creature)
25-26 SKILL "Toque de oro": Conviertes en oro a los enemigos más fuertes: los hieres y te llevas monedas. Cell 25 = effect when cast (projectile, aura, mark or summon); cell 26 = its result (impact, zone, explosion or creature)
27-28 SKILL "Pandemia": Cuando muere un enemigo envenenado, su veneno se contagia a los de alrededor. Cell 27 = effect when cast (projectile, aura, mark or summon); cell 28 = its result (impact, zone, explosion or creature)
```

**Recorte de archivos:** `alchemist_idle`, `alchemist_atk`, `alchemist_basic`, `alchemist_basic_hit`, y para cada habilidad `fx_<id>_a` y `fx_<id>_b`: `al_flask`, `al_oil`, `al_spark`, `al_catalyst`, `al_mix`, `al_antidote`, `al_coat`, `al_distill`, `al_fumes`, `al_transmute`, `al_gold`, `al_plague`.

**Siguiente paso:** `alchemist_hoja2_iconos.md` (adjuntando esta hoja).
