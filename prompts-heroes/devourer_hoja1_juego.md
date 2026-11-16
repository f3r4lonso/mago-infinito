# Bestia abisal: Hoja 1 (juego)

**Héroe:** Bestia abisal (`devourer`) · cuerpo a cuerpo
**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 7 columnas × 4 filas (28 celdas)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters, NO
numbers, NO labels, NO text, NO ground shadows.

HERO: a huge hulking shaggy brown beast: stone plates on the shoulders, big tusks, massive fists, small head. Chibi proportions (big head, small body, oversized weapon), facing RIGHT.

CELLS in reading order:
1 the hero standing idle, full body
2 the same hero in an attack pose, lunging forward and swinging to the right
3 BASIC ATTACK "Zarpazo primigenio": a rocky claw swipe shockwave arc to the right
4 basic attack impact: a brown rock-dust impact
5-6 SKILL "Embestida": Se prepara durante 0,7 s y carga en línea hacia una presa. Cell 5 = effect when cast (projectile, aura, mark or summon); cell 6 = its result (impact, zone, explosion or creature)
7-8 SKILL "Pisotear": Durante unos segundos, cada 45 px recorridos causa daño de área. Cell 7 = effect when cast (projectile, aura, mark or summon); cell 8 = its result (impact, zone, explosion or creature)
9-10 SKILL "Rugido": Acumula hasta 5 cargas de furia con el daño que llega a su vida. Cell 9 = effect when cast (projectile, aura, mark or summon); cell 10 = its result (impact, zone, explosion or creature)
11-12 SKILL "Pulverizar" (ULTIMATE, make it the most epic): Agarra a un enemigo cercano y lo golpea repetidamente contra el suelo. Cell 11 = effect when cast (projectile, aura, mark or summon); cell 12 = its result (impact, zone, explosion or creature)
13-14 SKILL "Lanzamiento de roca": Lanza una roca con trayectoria visible a una posición distante. Cell 13 = effect when cast (projectile, aura, mark or summon); cell 14 = its result (impact, zone, explosion or creature)
15-16 SKILL "Colosal": Aumenta vida máxima. Cell 15 = effect when cast (projectile, aura, mark or summon); cell 16 = its result (impact, zone, explosion or creature)
17-18 SKILL "Piel pétrea": Reduce daño recibido; durante Pisotear obtiene protección adicional. Cell 17 = effect when cast (projectile, aura, mark or summon); cell 18 = its result (impact, zone, explosion or creature)
19-20 SKILL "Impacto brutal": Al terminar una Embestida emite una onda física adicional. Cell 19 = effect when cast (projectile, aura, mark or summon); cell 20 = its result (impact, zone, explosion or creature)
21-22 SKILL "Ondas tectónicas": Rugido libera 3 oleadas de proyectiles terrestres. Cell 21 = effect when cast (projectile, aura, mark or summon); cell 22 = its result (impact, zone, explosion or creature)
23-24 SKILL "Roca fragmentada": La roca principal se divide al caer en 3 fragmentos que impactan detrás del objetivo. Cell 23 = effect when cast (projectile, aura, mark or summon); cell 24 = its result (impact, zone, explosion or creature)
25-26 SKILL "Ímpetu salvaje": Aumenta la velocidad de desplazamiento y el daño de los zarpazos. Cell 25 = effect when cast (projectile, aura, mark or summon); cell 26 = its result (impact, zone, explosion or creature)
27-28 SKILL "Vigor ancestral": Regenera vida de forma constante, sin consumir cadáveres ni invocar criaturas. Cell 27 = effect when cast (projectile, aura, mark or summon); cell 28 = its result (impact, zone, explosion or creature)
```

**Recorte de archivos:** `devourer_idle`, `devourer_atk`, `devourer_basic`, `devourer_basic_hit`, y para cada habilidad `fx_<id>_a` y `fx_<id>_b`: `pb_onslaught`, `pb_trample`, `pb_uproar`, `pb_pulverize`, `pb_rock`, `pb_colossal`, `pb_hide`, `pb_impact`, `pb_shockwave`, `pb_aftershock`, `pb_momentum`, `pb_regen`.

**Siguiente paso:** `devourer_hoja2_iconos.md` (adjuntando esta hoja).
