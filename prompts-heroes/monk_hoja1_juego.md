# Monje panda: Hoja 1 (juego)

**Héroe:** Monje panda (`monk`) · cuerpo a cuerpo
**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 7 columnas × 4 filas (28 celdas)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters, NO
numbers, NO labels, NO text, NO ground shadows.

HERO: a chubby panda monk: black-and-white panda body, orange martial-arts vest, red headband, wrapped fists. Chibi proportions (big head, small body, oversized weapon), facing RIGHT.

CELLS in reading order:
1 the hero standing idle, full body
2 the same hero in an attack pose, lunging forward and swinging to the right
3 BASIC ATTACK "Puño de chi": a golden chi energy fist punching to the right
4 basic attack impact: a golden chi impact ring
5-6 SKILL "Combo de palma": Cada pocos puñetazos das un golpe de palma: mucho más daño, explosión en área y aturdimiento breve. Cell 5 = effect when cast (projectile, aura, mark or summon); cell 6 = its result (impact, zone, explosion or creature)
7-8 SKILL "Ráfaga de puños": Golpeas más rápido y a más enemigos a la vez. Cell 7 = effect when cast (projectile, aura, mark or summon); cell 8 = its result (impact, zone, explosion or creature)
9-10 SKILL "Paso del viento": Posibilidad de esquivar el daño que recibes. Cell 9 = effect when cast (projectile, aura, mark or summon); cell 10 = its result (impact, zone, explosion or creature)
11-12 SKILL "Ola de chi": Liberas una ola de chi que daña y empuja a los enemigos cercanos. Cell 11 = effect when cast (projectile, aura, mark or summon); cell 12 = its result (impact, zone, explosion or creature)
13-14 SKILL "Palma del dragón": Una palma de energía en forma de dragón atraviesa a todos los enemigos en línea. Cell 13 = effect when cast (projectile, aura, mark or summon); cell 14 = its result (impact, zone, explosion or creature)
15-16 SKILL "Campana dorada": Cuando tu vida baja del 40% te vuelves invulnerable unos segundos. Cell 15 = effect when cast (projectile, aura, mark or summon); cell 16 = its result (impact, zone, explosion or creature)
17-18 SKILL "Serenidad": Regeneras vida y recibes menos daño. Cell 17 = effect when cast (projectile, aura, mark or summon); cell 18 = its result (impact, zone, explosion or creature)
19-20 SKILL "Patada del huracán": Giras con una serie de patadas que hieren, empujan y aturden a todos los que te rodean. Cell 19 = effect when cast (projectile, aura, mark or summon); cell 20 = its result (impact, zone, explosion or creature)
21-22 SKILL "Nirvana" (ULTIMATE, make it the most epic): Alcanzas el nirvana: atacas un 50% más rápido, pegas un 30% más fuerte, recibes la mitad de daño, te. Cell 21 = effect when cast (projectile, aura, mark or summon); cell 22 = its result (impact, zone, explosion or creature)
23-24 SKILL "Cien puños": Golpeas en un instante a muchos enemigos a tu alcance, tres veces cada uno. Cell 23 = effect when cast (projectile, aura, mark or summon); cell 24 = its result (impact, zone, explosion or creature)
25-26 SKILL "Gong del trueno": Golpeas un gong gigante: una onda de trueno hiere, empuja y aturde a todos los que te rodean. Cell 25 = effect when cast (projectile, aura, mark or summon); cell 26 = its result (impact, zone, explosion or creature)
27-28 SKILL "Crías de panda": Invocas crías de panda que ruedan y pelean a tu lado durante un rato. Cell 27 = effect when cast (projectile, aura, mark or summon); cell 28 = its result (impact, zone, explosion or creature)
```

**Recorte de archivos:** `monk_idle`, `monk_atk`, `monk_basic`, `monk_basic_hit`, y para cada habilidad `fx_<id>_a` y `fx_<id>_b`: `k_combo`, `k_flurry`, `k_wind`, `k_wave`, `k_dragon`, `k_bell`, `k_serene`, `k_kick`, `k_nirvana`, `k_hundred`, `k_gong`, `k_cubs`.

**Siguiente paso:** `monk_hoja2_iconos.md` (adjuntando esta hoja).
