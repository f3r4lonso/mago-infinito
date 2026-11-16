# Animaciones que faltan (reemplazan dibujos vectoriales)

Un prompt pequeño por animación. **Uso:** pega el PREFIJO y después la línea de la animación. Una hoja por animación.
Todos los diseños son originales: no se cita ningún juego, serie ni personaje existente.

## PREFIJO (pegar siempre antes)

```
Hoja de sprites de efecto, pixel art 2D vista lateral, contorno limpio, 3 tonos de sombreado, luz arriba a la izquierda, sin desenfoque ni antialiasing.
Fotogramas en UNA fila horizontal, celdas cuadradas iguales de 256x256 px, el efecto centrado y COMPLETO dentro de su celda con 16 px de margen, sin tocar el borde ni la celda vecina.
Fondo liso magenta #FF00FF en toda la imagen (sin degradados, sin cuadrícula, sin sombras de suelo, sin texto, sin marcos). Colores vivos y claros: el efecto se mezcla con luz sobre el mapa.
Efectos de suelo: elipse aplastada 2:1 en perspectiva, celda de 384x192. Efectos de caída desde el cielo: celda de 192x384.
```

Formato de cada línea: **id · nombre** — fotogramas — descripción. Ciclo = `(loop)`: el último fotograma enlaza con el primero.

## Mago invocador
- **mage_basic_orbs · Orbes del ataque básico** — 4 por color (rojo, azul, rosa): orbe de energía con cola corta que parpadea; 3 hojas, una por color.
- **i_alacrity · Marca de alacridad** — 4 (loop): icono redondo de 64 px sobre la cabeza con dos flechas doradas veloces que pulsan.
- **i_cold_shards · Estallido del cubo de hielo** — 6: un cubo de hielo se quiebra y lanza esquirlas azul pálido hacia fuera, con destello blanco.
- **i_ghost_missiles · Misiles mágicos** — 4 (loop): proyectil mágico violeta/rosa con cola de chispas, pequeño, apuntando a la derecha; más 5 fotogramas del impacto en estrella.
- **i_sun_beam · Rayo solar** — 6 (celda 192x384): columna de luz dorada y blanca que cae del cielo, se afina y se disipa, con destello al tocar el suelo.
- **i_field_blizzard · Ventisca (campo de hielo)** — 6 (loop, suelo): disco de escarcha translúcido con copos de nieve cayendo y cristales en el borde.
- **i_laguna_hit · Impacto del rayo de luz** — 5: flash dorado circular con rayos finos en cada enemigo atravesado.

## Alquimista
- **al_flask · Frasco corrosivo** — 5: salpicadura verde ácido con burbujas que se expande y deja un charco brillante.
- **al_oil · Aceite inflamable** — 4 (loop, suelo): charco de aceite negro brillante con reflejos que ondula.
- **al_spark · Chispa reactiva** — 5: ignición naranja, chispa que prende en llamarada baja.
- **al_catalyst · Catalizador** — 4: burbujeo morado y verde con destello rápido sobre el veneno.
- **al_mix · Mezcla inestable** — 6: dos charcos de color distinto chocan y estallan en explosión amarilla y violeta.
- **al_antidote · Antídoto experimental** — 5: hilos verdes suben desde los enemigos hacia el héroe y se enroscan en una espiral curativa.
- **al_coat · Delantal protector** — 4 (loop): brillo de escudo de cuero y gotas alrededor del héroe, tono ámbar.
- **al_distill · Destilación rápida** — 4 (loop): chorros de vapor blanco y burbujas junto a las manos.
- **al_transmute · Gran transmutación** — 6: explosión alquímica doble anillo verde-dorado con burbujas y vapor.
- **al_gold · Toque de oro** — 6: destello dorado, el enemigo se cubre de oro brillante y suelta lluvia de monedas.
- **al_plague · Pandemia** — 6: calavera verde translúcida suelta nubes tóxicas que saltan a los de al lado.

## Orco guerrero
- **b_aspd · Rugido de la manada** — 5: ondas de sonido rojas en anillos concéntricos con polvo.
- **b_fire · Jabalí embestidor** — 5: estela de polvo y chispas de un choque de embestida, bajo y ancho.

## Nigromante
- **n_skeldragon · Dragón esqueleto** — 6: huesos y luz verde espectral se ensamblan en un estallido ascendente.
- **n_drain · Drenar vida** — 6 (loop): zarcillos morados y rojos tensos que fluyen del enemigo al héroe.
- **n_abom · Abominación** — 6: fusión de carne y huesos con salpicadura verde y violeta, vapor.

## Druida
- **u_swarm · Regreso a la naturaleza** — 6: remolino de hojas verdes y anillo de espinas que se expande.
- **u_bear · Forma de oso** — 6: estallido de hojas y raíces marrones y verdes al transformarse.
- **u_storm · Compañero oso espiritual** — 4 (loop): aura de luz verde-azulada pulsante bajo un oso fantasma.

## Hombre lobo
- **w_pack · Llamada de la manada** — 6: volutas fantasmales azules que forman siluetas de lobo.
- **w_moon · Luna llena** — 6: luna blanca con halo y estallido de luz plateada alrededor.
- **w_alpha · Lobo alfa** — 5: onda de aullido en anillos plateados y rojos.
- **w_silver · Zarpas de plata** — 4: tres tajos finos de plata brillante con chispas.

## Monje panda
- **k_combo · Combo de palma** — 5: explosión de onda dorada desde una palma abierta.
- **k_nirvana · Nirvana** — 6 (loop): flor de loto dorada y aura cálida girando.
- **k_gong · Gong del trueno** — 6: onda de trueno azul y dorada en anillo que se expande con rayos cortos.
- **k_cubs · Crías de panda** — 4: nube de polvo pequeña y estrellitas al rodar.

## Troll cazador
- **t_multi · Lluvia de lanzas** — 4: estelas rojas finas de varias lanzas lanzadas a la derecha.
- **t_totem · Tótem ancestral** — 5: pulso verde de curación y rayos cortos que salen del tótem.

## Enano artillero
- **d_shrapnel · Granada de metralla** — 5 (suelo): fragmentos metálicos que saltan y quedan clavados brillando.
- **d_blast · Barril explosivo** — 6: explosión de pólvora naranja con humo gris y chispas.

## Chamán
- **c_arc · Arco conductor** — 4: arco eléctrico azul y blanco entre dos puntos, finísimo y ramificado.
- **c_thunder · Tótem del trueno** — 5: descarga amarilla y azul que sale hacia arriba y abajo.
- **c_wind · Ráfaga de viento** — 5: remolino de aire con trazos curvos blancos azulados.
- **c_cloud · Nube cargada** — 5 (loop): nube oscura con lluvia y destello de rayo.
- **c_monsoon · Monzón** — 6 (loop, suelo): zona de lluvia intensa con salpicaduras y rayos.
- **c_bolt · Golpe de relámpago** — 6 (celda 192x384): rayo enorme desde el cielo con flash blanco y chispas.
- **c_orb · Bola de relámpago** — 4 (loop): orbe eléctrico girando con arcos pequeños.

## Sacerdote
- **p_judge · Juicio** — 6 (celda 192x384): rayo de luz blanca-dorada desde el cielo con halo en el suelo.
- **p_barrier · Barrera divina** — 5 (loop): burbuja de luz translúcida con brillos que corren por la superficie.
- **p_purge · Purificación** — 5: onda sagrada en anillo blanco-dorado con plumas de luz.
- **p_nova · Nova de luz** — 6: explosión de luz dorada con rayos y anillo.
- **p_chains · Cadenas de luz** — 6: cadenas doradas brillantes que se enroscan y se cierran.
- **p_res · Resurrección** — 6: columna de luz blanca asciende con partículas y destello.
- **p_faith · Fe ardiente** — 5: llama dorada y blanca que prende y vibra sobre el objetivo.
- **p_sanct · Santuario** — 6 (loop, suelo): domo sagrado translúcido con runas de luz.

## Caballero dragón
- **pl_basic_slash · Tajo básico** — 4: arco de espada rojo-naranja con chispas.
- **pl_shield · Aura de resistencia** — 5 (loop): escudo de runas doradas que gira.
- **pl_aura · Aura de curación y daño** — 5 (loop, suelo): aura dorada con llamas bajas y destellos verdes de curación.
- **pl_bastion · Invulnerabilidad** — 6: domo dorado y blanco que pulsa con ondas.

## Cazador de demonios
- **z_meta · Metamorfosis** — 6: alas oscuras translúcidas se abren con estallido violeta.
- **z_void · Vacío vil** — 6 (loop, suelo): agujero negro y violeta con espiral hacia el centro.
- **z_coup · Golpe de gracia** — 5: tajo rojo intenso con destello y marca de calavera.

## Devorador
- **pb_basic_claw · Zarpazo básico** — 4: media luna roja de garra con chispas.
- **pb_onslaught · Embestida** — 5: estela de polvo y piedras que sale hacia atrás.
- **pb_trample · Pisotear** — 5 (suelo): huella con grietas y anillo de polvo.
- **pb_uproar · Rugido** — 5: anillos de choque blancos y dorados con polvo.
- **pb_pulverize · Pulverizar** — 6: impacto contra el suelo, grietas rojas y escombros.
- **pb_rock · Lanzamiento de roca** — 5: roca con estela y nube de polvo al caer.
- **pb_colossal · Colosal** — 4 (loop): aura de fragmentos de roca que flotan alrededor.
- **pb_hide · Piel pétrea** — 4 (loop): brillo gris con vetas que recorre el cuerpo.
- **pb_impact · Impacto brutal** — 5 (suelo): onda de choque física con polvo.
- **pb_shockwave · Ondas tectónicas** — 5 (suelo): olas de tierra que se desplazan con rocas.
- **pb_aftershock · Roca fragmentada** — 5: tres trozos de roca que impactan con polvo.
- **pb_momentum · Ímpetu salvaje** — 4 (loop): líneas de velocidad y polvo detrás del cuerpo.
- **pb_regen · Vigor ancestral** — 4 (loop): motas verdes y ámbar que suben lentas.

## Arquero elfo
- **a_crit_burst · Destello de crítico** — 5: estrella dorada de ocho rayos con halo blanco.
- **a_split · Flecha dividida** — 4: destello blanco de donde salen tres flechas, con trazos cortos.
- **a_snipe_arrow · Disparo potente** — 4 (loop): flecha enorme con estela larga dorada, apuntando a la derecha.
- **a_explosive · Flecha explosiva** — 6: bola de fuego naranja con humo, con chispas redondas.
- **a_windrun · Carrera del viento** — 4 (loop): remolinos verdes y blancos con líneas de velocidad.
