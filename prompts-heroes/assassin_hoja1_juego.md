# Asesino: Hoja 1 (juego)

**Héroe:** Asesino (`assassin`) · cuerpo a cuerpo
**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 7 columnas × 4 filas (28 celdas)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters, NO
numbers, NO labels, NO text, NO ground shadows.

HERO: a slim hooded assassin: dark red-grey cloth, face mask, long scarf, two daggers. Chibi proportions (big head, small body, oversized weapon), facing RIGHT.

CELLS in reading order:
1 the hero standing idle, full body
2 the same hero in an attack pose, lunging forward and swinging to the right
3 BASIC ATTACK "Daga": a thrown dagger flying right
4 basic attack impact: a white slash spark
5-6 SKILL "Puñal envenenado": Tus golpes envenenan al enemigo: el veneno se acumula con cada daga. Cell 5 = effect when cast (projectile, aura, mark or summon); cell 6 = its result (impact, zone, explosion or creature)
7-8 SKILL "Golpe letal": Tus golpes pueden ser críticos con mucho daño. Cell 7 = effect when cast (projectile, aura, mark or summon); cell 8 = its result (impact, zone, explosion or creature)
9-10 SKILL "Esquiva": Posibilidad de evitar por completo un golpe. Cell 9 = effect when cast (projectile, aura, mark or summon); cell 10 = its result (impact, zone, explosion or creature)
11-12 SKILL "Puñalada de sombra": Te teletransportas junto al enemigo más fuerte y lo apuñalas, aturdiéndolo. Cell 11 = effect when cast (projectile, aura, mark or summon); cell 12 = its result (impact, zone, explosion or creature)
13-14 SKILL "Bomba de humo": Una nube de humo ralentiza, debilita a los enemigos y te protege dentro de ella. Cell 13 = effect when cast (projectile, aura, mark or summon); cell 14 = its result (impact, zone, explosion or creature)
15-16 SKILL "Invisibilidad": Te vuelves invisible: recibes menos daño, te mueves más rápido y tu siguiente golpe es una emboscada. Cell 15 = effect when cast (projectile, aura, mark or summon); cell 16 = its result (impact, zone, explosion or creature)
17-18 SKILL "Marca de muerte": Marcas al enemigo más fuerte: recibe más daño y, si muere, se reinician tus recargas. Cell 17 = effect when cast (projectile, aura, mark or summon); cell 18 = its result (impact, zone, explosion or creature)
19-20 SKILL "Lluvia de dagas": Lanzas una andanada de dagas contra los enemigos cercanos. Cell 19 = effect when cast (projectile, aura, mark or summon); cell 20 = its result (impact, zone, explosion or creature)
21-22 SKILL "Clon de sombra": Un clon de sombra pelea a tu lado hasta que lo derrotan. Cell 21 = effect when cast (projectile, aura, mark or summon); cell 22 = its result (impact, zone, explosion or creature)
23-24 SKILL "Trampa venenosa": Siembras trampas que estallan al pisarlas: dañan, envenenan y frenan. Cell 23 = effect when cast (projectile, aura, mark or summon); cell 24 = its result (impact, zone, explosion or creature)
25-26 SKILL "Ejecución": Tus golpes matan al instante a los enemigos con poca vida. Cell 25 = effect when cast (projectile, aura, mark or summon); cell 26 = its result (impact, zone, explosion or creature)
27-28 SKILL "Danza mortal" (ULTIMATE, make it the most epic): Eres invulnerable y saltas de enemigo en enemigo golpeándolos con críticos garantizados. Cell 27 = effect when cast (projectile, aura, mark or summon); cell 28 = its result (impact, zone, explosion or creature)
```

**Recorte de archivos:** `assassin_idle`, `assassin_atk`, `assassin_basic`, `assassin_basic_hit`, y para cada habilidad `fx_<id>_a` y `fx_<id>_b`: `x_poison`, `x_crit`, `x_dodge`, `x_blink`, `x_smoke`, `x_stealth`, `x_mark`, `x_daggers`, `x_clone`, `x_trap`, `x_exec`, `x_dance`.

**Siguiente paso:** `assassin_hoja2_iconos.md` (adjuntando esta hoja).
