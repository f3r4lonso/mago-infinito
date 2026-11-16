# Nigromante: Hoja 1 (juego)

**Héroe:** Nigromante (`necro`) · a distancia
**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 7 columnas × 4 filas (28 celdas)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters, NO
numbers, NO labels, NO text, NO ground shadows.

HERO: a gaunt pale necromancer: hooded tattered black-and-green robes, glowing green eyes, a bone staff topped with a skull, a belt of tiny skulls. Chibi proportions (big head, small body, oversized weapon), facing RIGHT.

CELLS in reading order:
1 the hero standing idle, full body
2 the same hero in an attack pose, casting or shooting to the right
3 BASIC ATTACK "Proyectil de hueso": a bone shard projectile flying right with a green trail
4 basic attack impact: a green bone-dust burst
5-6 SKILL "Levantar esqueletos": Probabilidad de invocar un esqueleto cuando muere un enemigo. Cell 5 = effect when cast (projectile, aura, mark or summon); cell 6 = its result (impact, zone, explosion or creature)
7-8 SKILL "Vampiros": Vampiros vuelan a tu alrededor y atacan a los enemigos. Cell 7 = effect when cast (projectile, aura, mark or summon); cell 8 = its result (impact, zone, explosion or creature)
9-10 SKILL "Momias": Invoca momias resistentes que pelean contigo. Cell 9 = effect when cast (projectile, aura, mark or summon); cell 10 = its result (impact, zone, explosion or creature)
11-12 SKILL "Dragón esqueleto": Cuando tu dragón muere, vuelve como dragón esqueleto y sigue peleando. Cell 11 = effect when cast (projectile, aura, mark or summon); cell 12 = its result (impact, zone, explosion or creature)
13-14 SKILL "Aura de la parca": Un aura de muerte te rodea: cada segundo hiere a los enemigos cercanos y cura a tus héroes y aliados. Cell 13 = effect when cast (projectile, aura, mark or summon); cell 14 = its result (impact, zone, explosion or creature)
15-16 SKILL "Pestilencia": Una nube de pestilencia te rodea, daña y ralentiza a los enemigos. Cell 15 = effect when cast (projectile, aura, mark or summon); cell 16 = its result (impact, zone, explosion or creature)
17-18 SKILL "Maldición": Maldice a los enemigos: reciben más daño durante unos segundos. Cell 17 = effect when cast (projectile, aura, mark or summon); cell 18 = its result (impact, zone, explosion or creature)
19-20 SKILL "Drenar vida": Drenas la vida de los enemigos más fuertes durante unos segundos y la conviertes en tu propia vida. Cell 19 = effect when cast (projectile, aura, mark or summon); cell 20 = its result (impact, zone, explosion or creature)
21-22 SKILL "Lanza de huesos": Lanzas una enorme lanza de hueso que atraviesa a todos los enemigos en línea. Cell 21 = effect when cast (projectile, aura, mark or summon); cell 22 = its result (impact, zone, explosion or creature)
23-24 SKILL "Explosión de cadáveres": Los enemigos muertos pueden explotar y dañar a los de alrededor. Cell 23 = effect when cast (projectile, aura, mark or summon); cell 24 = its result (impact, zone, explosion or creature)
25-26 SKILL "Abominación": Fusionas esqueletos en una abominación de carne enorme y resistente que atrae a los enemigos y golpea. Cell 25 = effect when cast (projectile, aura, mark or summon); cell 26 = its result (impact, zone, explosion or creature)
27-28 SKILL "Sentencia de la parca" (ULTIMATE, make it the most epic): Condenas a todos los enemigos cercanos: los que tienen menos de la mitad de vida mueren al instante y. Cell 27 = effect when cast (projectile, aura, mark or summon); cell 28 = its result (impact, zone, explosion or creature)
```

**Recorte de archivos:** `necro_idle`, `necro_atk`, `necro_basic`, `necro_basic_hit`, y para cada habilidad `fx_<id>_a` y `fx_<id>_b`: `n_raise`, `n_vamp`, `n_mummy`, `n_skeldragon`, `n_wall`, `n_pest`, `n_curse`, `n_drain`, `n_spear`, `n_corpse`, `n_abom`, `n_souls`.

**Siguiente paso:** `necro_hoja2_iconos.md` (adjuntando esta hoja).
