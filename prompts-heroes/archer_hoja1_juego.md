# Arquero elfo: Hoja 1 (juego)

**Héroe:** Arquero elfo (`archer`) · a distancia
**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 7 columnas × 4 filas (28 celdas)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters, NO
numbers, NO labels, NO text, NO ground shadows.

HERO: a slim forest elf archer: pointed ears, silver circlet, hooded forest-green tunic, leather bracers, windswept cloak, a long bow and a quiver of arrows. Chibi proportions (big head, small body, oversized weapon), facing RIGHT.

CELLS in reading order:
1 the hero standing idle, full body
2 the same hero in an attack pose, casting or shooting to the right
3 BASIC ATTACK "Flecha": an arrow flying right with a small streak
4 basic attack impact: a small green-white hit spark
5-6 SKILL "Golpe crítico": Tus flechas pueden hacer golpes críticos. Cell 5 = effect when cast (projectile, aura, mark or summon); cell 6 = its result (impact, zone, explosion or creature)
7-8 SKILL "Velocidad de golpe": Disparas más rápido. Cell 7 = effect when cast (projectile, aura, mark or summon); cell 8 = its result (impact, zone, explosion or creature)
9-10 SKILL "Flechas múltiples": Cada disparo lanza flechas a varios enemigos. Cell 9 = effect when cast (projectile, aura, mark or summon); cell 10 = its result (impact, zone, explosion or creature)
11-12 SKILL "Flecha perforante": Algunas flechas atraviesan a todos los enemigos en línea. Cell 11 = effect when cast (projectile, aura, mark or summon); cell 12 = its result (impact, zone, explosion or creature)
13-14 SKILL "Flechas de escarcha": Tus flechas ralentizan al enemigo y pueden congelarlo en el sitio. Cell 13 = effect when cast (projectile, aura, mark or summon); cell 14 = its result (impact, zone, explosion or creature)
15-16 SKILL "Grillete": Una flecha ata al enemigo más fuerte con otro cercano: ambos quedan aturdidos y heridos. Cell 15 = effect when cast (projectile, aura, mark or summon); cell 16 = its result (impact, zone, explosion or creature)
17-18 SKILL "Disparo potente": Una flecha cargada contra el enemigo más fuerte que atraviesa a todos los de su línea: los primeros. Cell 17 = effect when cast (projectile, aura, mark or summon); cell 18 = its result (impact, zone, explosion or creature)
19-20 SKILL "Carrera del viento": Pasiva: esquivas ataques. Cell 19 = effect when cast (projectile, aura, mark or summon); cell 20 = its result (impact, zone, explosion or creature)
21-22 SKILL "Ráfaga": Una ráfaga empuja a los enemigos y silencia a los que disparan desde lejos. Cell 21 = effect when cast (projectile, aura, mark or summon); cell 22 = its result (impact, zone, explosion or creature)
23-24 SKILL "Aura de precisión": Pasiva: todos los héroes del equipo infligen más daño. Cell 23 = effect when cast (projectile, aura, mark or summon); cell 24 = its result (impact, zone, explosion or creature)
25-26 SKILL "Halcón compañero": Un halcón te acompaña, se lanza en picado sobre el enemigo más fuerte y lo marca: los marcados. Cell 25 = effect when cast (projectile, aura, mark or summon); cell 26 = its result (impact, zone, explosion or creature)
27-28 SKILL "Fuego concentrado" (ULTIMATE, make it the most epic): Disparas a todos los enemigos a tu alcance a una velocidad enorme, con menos daño por flecha. Cell 27 = effect when cast (projectile, aura, mark or summon); cell 28 = its result (impact, zone, explosion or creature)
```

**Recorte de archivos:** `archer_idle`, `archer_atk`, `archer_basic`, `archer_basic_hit`, y para cada habilidad `fx_<id>_a` y `fx_<id>_b`: `a_crit`, `a_aspd`, `a_multi`, `a_pierce`, `a_frost`, `a_shackle`, `a_snipe`, `a_windrun`, `a_gust`, `a_aura`, `a_hawk`, `a_focus`.

**Siguiente paso:** `archer_hoja2_iconos.md` (adjuntando esta hoja).
