# Chamán de la tormenta: Hoja 1 (juego)

**Héroe:** Chamán de la tormenta (`shaman`) · a distancia
**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 7 columnas × 4 filas (28 celdas)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters, NO
numbers, NO labels, NO text, NO ground shadows.

HERO: a lean tribal storm shaman: feather headdress, blue lightning markings on the skin, a staff crackling with electricity, a small swirling rain cloud. Chibi proportions (big head, small body, oversized weapon), facing RIGHT.

CELLS in reading order:
1 the hero standing idle, full body
2 the same hero in an attack pose, casting or shooting to the right
3 BASIC ATTACK "Descarga estática": a blue-white static lightning bolt flying right
4 basic attack impact: a blue electric spark burst
5-6 SKILL "Lluvia ritual": Crea una zona que aplica Mojado durante 4 s. Cell 5 = effect when cast (projectile, aura, mark or summon); cell 6 = its result (impact, zone, explosion or creature)
7-8 SKILL "Arco conductor": Los impactos del ataque básico saltan a otros enemigos, priorizando mojados. Cell 7 = effect when cast (projectile, aura, mark or summon); cell 8 = its result (impact, zone, explosion or creature)
9-10 SKILL "Tótem del trueno": Coloca tótems destructibles. Cell 9 = effect when cast (projectile, aura, mark or summon); cell 10 = its result (impact, zone, explosion or creature)
11-12 SKILL "Tótem de la marea": Coloca un tótem destructible que cura al héroe y a aliados cercanos cada segundo. Cell 11 = effect when cast (projectile, aura, mark or summon); cell 12 = its result (impact, zone, explosion or creature)
13-14 SKILL "Ráfaga de viento": Golpea y aleja enemigos cercanos. Cell 13 = effect when cast (projectile, aura, mark or summon); cell 14 = its result (impact, zone, explosion or creature)
15-16 SKILL "Nube cargada": Una nube sigue lentamente al grupo elegido y descarga cada segundo. Cell 15 = effect when cast (projectile, aura, mark or summon); cell 16 = its result (impact, zone, explosion or creature)
17-18 SKILL "Piel de tormenta": Crea una barrera temporal. Cell 17 = effect when cast (projectile, aura, mark or summon); cell 18 = its result (impact, zone, explosion or creature)
19-20 SKILL "Sobrecarga": Consume Mojado de varios objetivos para causar daño eléctrico adicional y aturdir. Cell 19 = effect when cast (projectile, aura, mark or summon); cell 20 = its result (impact, zone, explosion or creature)
21-22 SKILL "Vórtice": Una zona atrae enemigos normales y los moja. Cell 21 = effect when cast (projectile, aura, mark or summon); cell 22 = its result (impact, zone, explosion or creature)
23-24 SKILL "Monzón" (ULTIMATE, make it the most epic): Moja una zona amplia, descarga rayos y genera estática para los tótems una vez por segundo. Cell 23 = effect when cast (projectile, aura, mark or summon); cell 24 = its result (impact, zone, explosion or creature)
25-26 SKILL "Golpe de relámpago": Un rayo enorme cae sobre el enemigo más fuerte y gasta estática. Cell 25 = effect when cast (projectile, aura, mark or summon); cell 26 = its result (impact, zone, explosion or creature)
27-28 SKILL "Bola de relámpago": Un orbe eléctrico recorre despacio al grupo más numeroso: descarga sobre todos los de su alrededor,. Cell 27 = effect when cast (projectile, aura, mark or summon); cell 28 = its result (impact, zone, explosion or creature)
```

**Recorte de archivos:** `shaman_idle`, `shaman_atk`, `shaman_basic`, `shaman_basic_hit`, y para cada habilidad `fx_<id>_a` y `fx_<id>_b`: `c_rain`, `c_arc`, `c_thunder`, `c_tide`, `c_wind`, `c_cloud`, `c_skin`, `c_overload`, `c_vortex`, `c_monsoon`, `c_bolt`, `c_orb`.

**Siguiente paso:** `shaman_hoja2_iconos.md` (adjuntando esta hoja).
