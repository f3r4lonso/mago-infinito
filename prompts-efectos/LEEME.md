# Prompts de efectos: habilidades que aún se dibujan por código

Hojas **solo de efectos** (sin héroe) para sustituir los anillos, rayos y partículas dibujados por código por animaciones PNG. Cada habilidad lleva su número de fotogramas.

## Fotogramas por tipo de efecto
| Tipo | Fotogramas | Cómo se reproduce |
|---|---|---|
| Proyectil en vuelo | 2 (4 si gira) | bucle |
| Impacto o explosión | 4-5 | una vez |
| Zona de suelo o aura | 4-5 | bucle |
| Rayo o haz | 3 | una vez, se estira por código |
| Cono o tajo | 4-5 | una vez |
| Estado sobre una unidad | 3-4 | bucle |
| Transformación o ultimate | 5-12 | aura en bucle y destello |

Cada hoja es de 6 × 4 celdas (24). El juego reproduce los fotogramas a unos 10 por segundo.

## Hojas
| Grupo | Archivo | Celdas | Contiene |
|---|---|---|---|
| Efectos comunes 1: invocar, curar, escudo y estados | [`common1_hoja1.md`](common1_hoja1.md) | 24 | Invocación (nube mágica), Curación, Escudo / burbuja (bucle), Aturdido, Veneno, Sangrado, Marca / diana |
| Efectos comunes 2: quemadura, hielo, miedo, maldición, crítico, invulnerable, muerte | [`common2_hoja1.md`](common2_hoja1.md) | 24 | Golpe crítico, Invulnerable (bucle), Muerte de enemigo, Quemadura, Ralentizado, Miedo, Maldición |
| Arquero | [`archer_hoja1.md`](archer_hoja1.md) | 24 | Disparo potente, Grillete, Flechas de escarcha, Flecha perforante |
| Arquero | [`archer_hoja2.md`](archer_hoja2.md) | 18 | Fuego concentrado, Carrera del viento, Ráfaga, Aura de precisión |
| Nigromante | [`necro_hoja1.md`](necro_hoja1.md) | 24 | Sentencia de la parca, Lanza de huesos, Drenar vida, Aura de la parca |
| Nigromante | [`necro_hoja2.md`](necro_hoja2.md) | 17 | Explosión de cadáveres, Pestilencia, Maldición, Abominación |
| Enano | [`dwarf_hoja1.md`](dwarf_hoja1.md) | 23 | Asesino, Lanzagranadas, Barril explosivo |
| Enano | [`dwarf_hoja2.md`](dwarf_hoja2.md) | 21 | Campo minado, Cohetes teledirigidos, Tiro en la cabeza, Granada de metralla, Torreta |
| Orco | [`barbarian_hoja1.md`](barbarian_hoja1.md) | 23 | Berserker, Danza de la cuchilla, Hachas, Rugido de la manada, Furia |
| Orco | [`barbarian_hoja2.md`](barbarian_hoja2.md) | 15 | Decapitador, Llamada de batalla, Hambre de sangre, Jabalí embestidor |
| Cazador de demonios | [`demon_hoja1.md`](demon_hoja1.md) | 24 | Metamorfosis, Golpe de gracia, Fragmentos de alma, Aura de inmolación |
| Cazador de demonios | [`demon_hoja2.md`](demon_hoja2.md) | 22 | Paso de sombra, Vacío vil, Golpe de sombras, Daga asfixiante, Rayos oculares |
| Sacerdote | [`priest_hoja1.md`](priest_hoja1.md) | 23 | Juicio, Barrera divina, Nova de luz, Resurrección |
| Sacerdote | [`priest_hoja2.md`](priest_hoja2.md) | 24 | Plegaria de sanación, Halo sagrado, Consagración, Purificación, Cadenas de luz, Fe ardiente |
| Sacerdote | [`priest_hoja3.md`](priest_hoja3.md) | 4 | Santuario |
| Paladín | [`paladin_hoja1.md`](paladin_hoja1.md) | 24 | Forma de dragón, Martillo divino, Carga sagrada |
| Paladín | [`paladin_hoja2.md`](paladin_hoja2.md) | 22 | Invulnerabilidad, Llamarada, Espada consagrada, Barrido, Aura de resistencia |
| Paladín | [`paladin_hoja3.md`](paladin_hoja3.md) | 15 | Aura de curación y daño, Imposición de manos, Golpe con escudo, Lanza de luz |
| Panda (monje) | [`monk_hoja1.md`](monk_hoja1.md) | 23 | Patada del huracán, Nirvana, Gong del trueno, Combo de palma, Ola de chi |
| Panda (monje) | [`monk_hoja2.md`](monk_hoja2.md) | 12 | Palma del dragón, Campana dorada, Cien puños |
| Troll | [`troll_hoja1.md`](troll_hoja1.md) | 24 | Espíritu del Loa, Lanza explosiva, Pacto de sangre |
| Troll | [`troll_hoja2.md`](troll_hoja2.md) | 17 | Maleficio de rana, Lanzas ardientes, Postura de guerra |
| Hombre lobo | [`werewolf_hoja1.md`](werewolf_hoja1.md) | 23 | Salto de presa, Luna llena, Aullido a la luna, Tajo salvaje |
| Hombre lobo | [`werewolf_hoja2.md`](werewolf_hoja2.md) | 8 | Garras sangrientas, Marca de la presa |
| Druida | [`druid_hoja1.md`](druid_hoja1.md) | 24 | Enredar, Forma de oso, Eclipse |
| Druida | [`druid_hoja2.md`](druid_hoja2.md) | 24 | Lluvia de estrellas, Cólera de la naturaleza, Teletransporte, Fuego lunar |
| Druida | [`druid_hoja3.md`](druid_hoja3.md) | 12 | Rejuvenecimiento, Piel de corteza, Regreso a la naturaleza |
| Bestia abisal | [`devourer_hoja1.md`](devourer_hoja1.md) | 23 | Lanzamiento de roca, Rugido, Roca fragmentada |
| Bestia abisal | [`devourer_hoja2.md`](devourer_hoja2.md) | 21 | Embestida, Pulverizar, Pisotear, Impacto brutal |
| Bestia abisal | [`devourer_hoja3.md`](devourer_hoja3.md) | 4 | Ondas tectónicas |
| Chamán | [`shaman_hoja1.md`](shaman_hoja1.md) | 22 | Piel de tormenta, Golpe de relámpago, Bola de relámpago |
| Chamán | [`shaman_hoja2.md`](shaman_hoja2.md) | 22 | Monzón, Mojado y estática, Sobrecarga, Vórtice |
| Chamán | [`shaman_hoja3.md`](shaman_hoja3.md) | 18 | Lluvia ritual, Ráfaga de viento, Nube cargada, Arco conductor, Tótem del trueno |

Total: 648 fotogramas.

## Detalle por habilidad
### Efectos comunes 1: invocar, curar, escudo y estados — 7 efectos, 24 fotogramas, 1 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Invocación (nube mágica) | `(varias)` | 4 |
| Curación | `(varias)` | 4 |
| Escudo / burbuja (bucle) | `(varias)` | 4 |
| Aturdido | `(varias)` | 3 |
| Veneno | `(varias)` | 3 |
| Sangrado | `(varias)` | 3 |
| Marca / diana | `(varias)` | 3 |

### Efectos comunes 2: quemadura, hielo, miedo, maldición, crítico, invulnerable, muerte — 7 efectos, 24 fotogramas, 1 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Quemadura | `(varias)` | 3 |
| Ralentizado | `(varias)` | 3 |
| Miedo | `(varias)` | 3 |
| Maldición | `(varias)` | 3 |
| Golpe crítico | `(varias)` | 4 |
| Invulnerable (bucle) | `(varias)` | 4 |
| Muerte de enemigo | `(varias)` | 4 |

### Arquero — 8 efectos, 42 fotogramas, 2 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Flecha perforante | `a_pierce` | 2 |
| Flechas de escarcha | `a_frost` | 6 |
| Grillete | `a_shackle` | 7 |
| Disparo potente | `a_snipe` | 9 |
| Carrera del viento | `a_windrun` | 4 |
| Ráfaga | `a_gust` | 4 |
| Aura de precisión | `a_aura` | 4 |
| Fuego concentrado | `a_focus` | 6 |

### Nigromante — 8 efectos, 41 fotogramas, 2 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Aura de la parca | `n_wall` | 4 |
| Pestilencia | `n_pest` | 4 |
| Maldición | `n_curse` | 4 |
| Drenar vida | `n_drain` | 5 |
| Lanza de huesos | `n_spear` | 6 |
| Explosión de cadáveres | `n_corpse` | 5 |
| Abominación | `n_abom` | 4 |
| Sentencia de la parca | `n_souls` | 9 |

### Enano — 8 efectos, 44 fotogramas, 2 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Tiro en la cabeza | `d_head` | 4 |
| Granada de metralla | `d_shrapnel` | 4 |
| Lanzagranadas | `d_grenade` | 7 |
| Campo minado | `d_mines` | 5 |
| Torreta | `d_turret` | 3 |
| Cohetes teledirigidos | `d_rockets` | 5 |
| Barril explosivo | `d_blast` | 6 |
| Asesino | `d_snipe` | 10 |

### Orco — 9 efectos, 38 fotogramas, 2 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Hachas | `b_multi` | 4 |
| Rugido de la manada | `b_aspd` | 4 |
| Furia | `b_rage` | 4 |
| Danza de la cuchilla | `b_whirl` | 5 |
| Decapitador | `b_exec` | 4 |
| Berserker | `b_berserk` | 6 |
| Llamada de batalla | `b_shout` | 4 |
| Hambre de sangre | `b_chain` | 4 |
| Jabalí embestidor | `b_fire` | 3 |

### Cazador de demonios — 9 efectos, 46 fotogramas, 2 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Metamorfosis | `z_meta` | 7 |
| Aura de inmolación | `z_immo` | 4 |
| Rayos oculares | `z_eyes` | 3 |
| Golpe de sombras | `z_shadow` | 4 |
| Vacío vil | `z_void` | 5 |
| Golpe de gracia | `z_coup` | 7 |
| Daga asfixiante | `z_dagger` | 4 |
| Fragmentos de alma | `z_frag` | 6 |
| Paso de sombra | `z_step` | 6 |

### Sacerdote — 11 efectos, 51 fotogramas, 3 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Plegaria de sanación | `p_heal` | 4 |
| Halo sagrado | `p_halo` | 4 |
| Juicio | `p_judge` | 7 |
| Barrera divina | `p_barrier` | 6 |
| Consagración | `p_consec` | 4 |
| Purificación | `p_purge` | 4 |
| Nova de luz | `p_nova` | 5 |
| Cadenas de luz | `p_chains` | 4 |
| Resurrección | `p_res` | 5 |
| Fe ardiente | `p_faith` | 4 |
| Santuario | `p_sanct` | 4 |

### Paladín — 12 efectos, 61 fotogramas, 3 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Espada consagrada | `pl_holy` | 4 |
| Barrido | `pl_cleave` | 4 |
| Aura de resistencia | `pl_shield` | 4 |
| Carga sagrada | `pl_charge` | 7 |
| Martillo divino | `pl_hammer` | 8 |
| Aura de curación y daño | `pl_aura` | 4 |
| Imposición de manos | `pl_hands` | 4 |
| Lanza de luz | `pl_beam` | 3 |
| Invulnerabilidad | `pl_bastion` | 5 |
| Forma de dragón | `pl_wrath` | 9 |
| Golpe con escudo | `pl_throw` | 4 |
| Llamarada | `pl_runes` | 5 |

### Panda (monje) — 8 efectos, 35 fotogramas, 2 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Combo de palma | `k_combo` | 4 |
| Ola de chi | `k_wave` | 4 |
| Palma del dragón | `k_dragon` | 4 |
| Campana dorada | `k_bell` | 4 |
| Patada del huracán | `k_kick` | 5 |
| Nirvana | `k_nirvana` | 5 |
| Cien puños | `k_hundred` | 4 |
| Gong del trueno | `k_gong` | 5 |

### Troll — 6 efectos, 41 fotogramas, 2 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Pacto de sangre | `t_trap` | 4 |
| Maleficio de rana | `t_hex` | 7 |
| Postura de guerra | `t_fury` | 4 |
| Espíritu del Loa | `t_loa` | 12 |
| Lanzas ardientes | `t_boar` | 6 |
| Lanza explosiva | `t_spear` | 8 |

### Hombre lobo — 6 efectos, 31 fotogramas, 2 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Garras sangrientas | `w_bleed` | 4 |
| Salto de presa | `w_leap` | 7 |
| Aullido a la luna | `w_howl` | 5 |
| Tajo salvaje | `w_rend` | 5 |
| Marca de la presa | `w_prey` | 4 |
| Luna llena | `w_moon` | 6 |

### Druida — 10 efectos, 60 fotogramas, 3 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Cólera de la naturaleza | `u_wrath` | 6 |
| Fuego lunar | `u_moon` | 5 |
| Enredar | `u_thorns` | 8 |
| Rejuvenecimiento | `u_rejuv` | 4 |
| Lluvia de estrellas | `u_star` | 7 |
| Piel de corteza | `u_bark` | 4 |
| Teletransporte | `u_cyclone` | 6 |
| Regreso a la naturaleza | `u_swarm` | 4 |
| Forma de oso | `u_bear` | 8 |
| Eclipse | `u_eclipse` | 8 |

### Bestia abisal — 8 efectos, 48 fotogramas, 3 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Embestida | `pb_onslaught` | 8 |
| Pisotear | `pb_trample` | 4 |
| Rugido | `pb_uproar` | 9 |
| Pulverizar | `pb_pulverize` | 5 |
| Lanzamiento de roca | `pb_rock` | 12 |
| Impacto brutal | `pb_impact` | 4 |
| Ondas tectónicas | `pb_shockwave` | 4 |
| Roca fragmentada | `pb_aftershock` | 2 |

### Chamán — 12 efectos, 62 fotogramas, 3 hoja(s)
| Habilidad | Id | Fotogramas |
|---|---|---|
| Lluvia ritual | `c_rain` | 4 |
| Arco conductor | `c_arc` | 3 |
| Tótem del trueno | `c_thunder` | 3 |
| Ráfaga de viento | `c_wind` | 4 |
| Nube cargada | `c_cloud` | 4 |
| Piel de tormenta | `c_skin` | 8 |
| Sobrecarga | `c_overload` | 5 |
| Vórtice | `c_vortex` | 5 |
| Monzón | `c_monsoon` | 6 |
| Golpe de relámpago | `c_bolt` | 7 |
| Bola de relámpago | `c_orb` | 7 |
| Mojado y estática | `(estado)` | 6 |

## Sin generar
- **Mago, alquimista y asesino**: ya tienen sprites en todas sus habilidades.
- **Invocadas** (esqueletos, momias, vampiros, ents, lobos, osos, raptores, torretas, tótems, dragón): ya tienen sprites.
- **Pasivas sin efecto visible** (crítico, velocidad de golpe, armadura, esquivar…): usan los efectos comunes.
- **Poderes de la torre sin sprite** (cadena de rayos, castigo divino, pulso arcano, granizo, bolas orbitales): se pueden hacer ya con los sprites que existen.
