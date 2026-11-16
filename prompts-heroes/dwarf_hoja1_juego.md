# Enano artillero: Hoja 1 (juego)

**Héroe:** Enano artillero (`dwarf`) · a distancia
**Adjunta como referencia de estilo:** `mago_hoja1.png` y `torre_hoja1.png`
**Formato:** 3:2 horizontal, cuadrícula de 7 columnas × 4 filas (28 celdas)

```
Same art style as the attached reference sheets (original cartoon fantasy game art, bold
thick dark-purple outline, vivid saturated colors, glossy painted shading, light from
top-left). Plain solid magenta #FF00FF background.

SPRITE SHEET: 7 columns x 4 rows of equal cells separated by thin dark-purple grid lines.
ONE separate sprite centered in each cell, nothing touching the cell edges. NO letters, NO
numbers, NO labels, NO text, NO ground shadows.

HERO: a stocky bearded dwarf gunner: riveted brass-and-leather armor, round goggles, a big rifle, a bandolier of grenades. Chibi proportions (big head, small body, oversized weapon), facing RIGHT.

CELLS in reading order:
1 the hero standing idle, full body
2 the same hero in an attack pose, casting or shooting to the right
3 BASIC ATTACK "Disparo de fusil": a rifle bullet with a bright streak flying right
4 basic attack impact: an orange spark burst with smoke
5-6 SKILL "Golpe crítico": Tus disparos pueden hacer golpes críticos. Cell 5 = effect when cast (projectile, aura, mark or summon); cell 6 = its result (impact, zone, explosion or creature)
7-8 SKILL "Velocidad de golpe": Disparas más rápido. Cell 7 = effect when cast (projectile, aura, mark or summon); cell 8 = its result (impact, zone, explosion or creature)
9-10 SKILL "Armadura de hierro": Más vida máxima y menos daño recibido. Cell 9 = effect when cast (projectile, aura, mark or summon); cell 10 = its result (impact, zone, explosion or creature)
11-12 SKILL "Tiro en la cabeza": Algunos disparos son tiros a la cabeza: daño extra, empujan y aturden al enemigo. Cell 11 = effect when cast (projectile, aura, mark or summon); cell 12 = its result (impact, zone, explosion or creature)
13-14 SKILL "Disparo de precisión": Pasiva: más alcance y más daño cuanto más lejos está el enemigo. Cell 13 = effect when cast (projectile, aura, mark or summon); cell 14 = its result (impact, zone, explosion or creature)
15-16 SKILL "Granada de metralla": Lanzas una granada que deja una zona de metralla: daña y ralentiza a quien la pise. Cell 15 = effect when cast (projectile, aura, mark or summon); cell 16 = its result (impact, zone, explosion or creature)
17-18 SKILL "Lanzagranadas": Lanza granadas que explotan tras un instante. Cell 17 = effect when cast (projectile, aura, mark or summon); cell 18 = its result (impact, zone, explosion or creature)
19-20 SKILL "Campo minado": Siembra minas a tu alrededor que explotan al pisarlas. Cell 19 = effect when cast (projectile, aura, mark or summon); cell 20 = its result (impact, zone, explosion or creature)
21-22 SKILL "Torreta": Despliega torretas automáticas que disparan a los enemigos. Cell 21 = effect when cast (projectile, aura, mark or summon); cell 22 = its result (impact, zone, explosion or creature)
23-24 SKILL "Cohetes teledirigidos": Lanzas una salva de cohetes que persiguen a distintos enemigos y explotan en área. Cell 23 = effect when cast (projectile, aura, mark or summon); cell 24 = its result (impact, zone, explosion or creature)
25-26 SKILL "Barril explosivo": Detonas un barril de pólvora a tus pies a costa de parte de tu vida: gran explosión que empuja y aturda. Cell 25 = effect when cast (projectile, aura, mark or summon); cell 26 = its result (impact, zone, explosion or creature)
27-28 SKILL "Asesino" (ULTIMATE, make it the most epic): Apuntas 2 s al enemigo más fuerte y disparas una bala devastadora que atraviesa todo lo que hay detrás. Cell 27 = effect when cast (projectile, aura, mark or summon); cell 28 = its result (impact, zone, explosion or creature)
```

**Recorte de archivos:** `dwarf_idle`, `dwarf_atk`, `dwarf_basic`, `dwarf_basic_hit`, y para cada habilidad `fx_<id>_a` y `fx_<id>_b`: `d_crit`, `d_aspd`, `d_armor`, `d_head`, `d_aim`, `d_shrapnel`, `d_grenade`, `d_mines`, `d_turret`, `d_rockets`, `d_blast`, `d_snipe`.

**Siguiente paso:** `dwarf_hoja2_iconos.md` (adjuntando esta hoja).
