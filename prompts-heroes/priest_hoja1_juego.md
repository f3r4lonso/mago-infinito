# Sacerdote: Hoja 1 (juego)

**Héroe:** Sacerdote (`priest`) · a distancia
**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 7 columnas × 4 filas (28 celdas)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters, NO
numbers, NO labels, NO text, NO ground shadows.

HERO: a holy priest: white-and-gold robes, a floating golden halo, a staff topped with a sun emblem, kind face. Chibi proportions (big head, small body, oversized weapon), facing RIGHT.

CELLS in reading order:
1 the hero standing idle, full body
2 the same hero in an attack pose, casting or shooting to the right
3 BASIC ATTACK "Rayo sagrado": a golden-white holy light ray flying right
4 basic attack impact: a golden light burst
5-6 SKILL "Plegaria de sanación": Cada cierto tiempo te curas una parte de tu vida y curas también a tus aliados. Cell 5 = effect when cast (projectile, aura, mark or summon); cell 6 = its result (impact, zone, explosion or creature)
7-8 SKILL "Halo sagrado": Un halo de luz te rodea y quema con daño divino a los enemigos que se acercan. Cell 7 = effect when cast (projectile, aura, mark or summon); cell 8 = its result (impact, zone, explosion or creature)
9-10 SKILL "Juicio": Rayos de luz caen del cielo sobre los enemigos más fuertes a tu alcance. Cell 9 = effect when cast (projectile, aura, mark or summon); cell 10 = its result (impact, zone, explosion or creature)
11-12 SKILL "Ángeles guardianes": Ángeles permanentes vuelan a tu alrededor y atacan con daño divino. Cell 11 = effect when cast (projectile, aura, mark or summon); cell 12 = its result (impact, zone, explosion or creature)
13-14 SKILL "Barrera divina": Recibes menos daño y una barrera de luz absorbe golpes cada cierto tiempo. Cell 13 = effect when cast (projectile, aura, mark or summon); cell 14 = its result (impact, zone, explosion or creature)
15-16 SKILL "Consagración": Consagra el suelo bajo el mayor grupo de enemigos: daño divino continuo. Cell 15 = effect when cast (projectile, aura, mark or summon); cell 16 = its result (impact, zone, explosion or creature)
17-18 SKILL "Purificación": Una onda sagrada daña a los enemigos a tu alcance, les quita la invulnerabilidad y les impide. Cell 17 = effect when cast (projectile, aura, mark or summon); cell 18 = its result (impact, zone, explosion or creature)
19-20 SKILL "Nova de luz" (ULTIMATE, make it the most epic): Una explosión de luz sagrada hiere a todos los enemigos a tu alcance y cura a tus aliados y a ti. Cell 19 = effect when cast (projectile, aura, mark or summon); cell 20 = its result (impact, zone, explosion or creature)
21-22 SKILL "Cadenas de luz": Cadenas de luz atrapan a los enemigos más fuertes: inmóviles, heridos y más vulnerables. Cell 21 = effect when cast (projectile, aura, mark or summon); cell 22 = its result (impact, zone, explosion or creature)
23-24 SKILL "Resurrección": Si mueres, vuelves a la vida con parte de tu vida y unos segundos de invulnerabilidad. Cell 23 = effect when cast (projectile, aura, mark or summon); cell 24 = its result (impact, zone, explosion or creature)
25-26 SKILL "Fe ardiente": Tus rayos sagrados prenden en los enemigos: daño divino extra y quemadura. Cell 25 = effect when cast (projectile, aura, mark or summon); cell 26 = its result (impact, zone, explosion or creature)
27-28 SKILL "Santuario": Levantas un domo sagrado: los enemigos dentro van más lentos y casi no pueden herirte, y tú y tus. Cell 27 = effect when cast (projectile, aura, mark or summon); cell 28 = its result (impact, zone, explosion or creature)
```

**Recorte de archivos:** `priest_idle`, `priest_atk`, `priest_basic`, `priest_basic_hit`, y para cada habilidad `fx_<id>_a` y `fx_<id>_b`: `p_heal`, `p_halo`, `p_judge`, `p_angel`, `p_barrier`, `p_consec`, `p_purge`, `p_nova`, `p_chains`, `p_res`, `p_faith`, `p_sanct`.

**Siguiente paso:** `priest_hoja2_iconos.md` (adjuntando esta hoja).
