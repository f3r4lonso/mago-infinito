# Orco guerrero: Hoja 1 (juego)

**Héroe:** Orco guerrero (`barbarian`) · cuerpo a cuerpo
**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 7 columnas × 4 filas (28 celdas)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters, NO
numbers, NO labels, NO text, NO ground shadows.

HERO: a tusked green-skinned orc warrior: spiked shoulder pads, war paint, fur loincloth, two big throwing axes. Chibi proportions (big head, small body, oversized weapon), facing RIGHT.

CELLS in reading order:
1 the hero standing idle, full body
2 the same hero in an attack pose, lunging forward and swinging to the right
3 BASIC ATTACK "Hacha giratoria": a spinning throwing axe flying right
4 basic attack impact: a red-white slash impact
5-6 SKILL "Golpe crítico": Tus hachas pueden hacer golpes críticos. Cell 5 = effect when cast (projectile, aura, mark or summon); cell 6 = its result (impact, zone, explosion or creature)
7-8 SKILL "Hachas múltiples": Lanzas varias hachas a la vez, cada una a un enemigo distinto. Cell 7 = effect when cast (projectile, aura, mark or summon); cell 8 = its result (impact, zone, explosion or creature)
9-10 SKILL "Rugido de la manada": Un rugido constante que mejora el daño y la velocidad de ataque de tus invocaciones y aliados cercanos. Cell 9 = effect when cast (projectile, aura, mark or summon); cell 10 = its result (impact, zone, explosion or creature)
11-12 SKILL "Hachas gigantes": Tus hachas crecen de tamaño: golpean a muchos más enemigos a la vez y pegan más fuerte. Cell 11 = effect when cast (projectile, aura, mark or summon); cell 12 = its result (impact, zone, explosion or creature)
13-14 SKILL "Sangrado": Las hachas hacen sangrar a los enemigos. Cell 13 = effect when cast (projectile, aura, mark or summon); cell 14 = its result (impact, zone, explosion or creature)
15-16 SKILL "Furia": Cada enemigo que matas te da furia: más daño y más velocidad durante unos segundos. Cell 15 = effect when cast (projectile, aura, mark or summon); cell 16 = its result (impact, zone, explosion or creature)
17-18 SKILL "Danza de la cuchilla": Giras con tus hachas y desgarras a todos a tu alrededor, con mucha probabilidad de golpe crítico. Cell 17 = effect when cast (projectile, aura, mark or summon); cell 18 = its result (impact, zone, explosion or creature)
19-20 SKILL "Decapitador": Golpeas a los enemigos más débiles: los que están por debajo del 30% de vida mueren al instante. Cell 19 = effect when cast (projectile, aura, mark or summon); cell 20 = its result (impact, zone, explosion or creature)
21-22 SKILL "Berserker" (ULTIMATE, make it the most epic): Entras en trance: atacas un 60% más rápido, pegas un 40% más fuerte, recibes un 40% menos de daño y. Cell 21 = effect when cast (projectile, aura, mark or summon); cell 22 = its result (impact, zone, explosion or creature)
23-24 SKILL "Llamada de batalla": Atraes y aturdes a los enemigos cercanos y, mientras dura, recibes un 40% menos de daño y pegas más. Cell 23 = effect when cast (projectile, aura, mark or summon); cell 24 = its result (impact, zone, explosion or creature)
25-26 SKILL "Hambre de sangre": Marcas a los enemigos más fuertes con un tajo brutal: sangran y, si mueren, te curas y ganas velocidad. Cell 25 = effect when cast (projectile, aura, mark or summon); cell 26 = its result (impact, zone, explosion or creature)
27-28 SKILL "Jabalí embestidor": Un jabalí de guerra te acompaña: provoca a los enemigos y embiste periódicamente aturdiendo a los que. Cell 27 = effect when cast (projectile, aura, mark or summon); cell 28 = its result (impact, zone, explosion or creature)
```

**Recorte de archivos:** `barbarian_idle`, `barbarian_atk`, `barbarian_basic`, `barbarian_basic_hit`, y para cada habilidad `fx_<id>_a` y `fx_<id>_b`: `b_crit`, `b_multi`, `b_aspd`, `b_giant`, `b_bleed`, `b_rage`, `b_whirl`, `b_exec`, `b_berserk`, `b_shout`, `b_chain`, `b_fire`.

**Siguiente paso:** `barbarian_hoja2_iconos.md` (adjuntando esta hoja).
