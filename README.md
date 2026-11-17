# Mago Infinito

Juego de defensa de torres en el navegador (ordenador y móvil, en vertical u horizontal). Abre `index.html` con la carpeta `assets` a su lado; no necesita instalar nada.

**Cómo se juega**
- Elige cuatro de los 16 héroes y un mapa. Los héroes defienden la torre; los enemigos atacan a las torres.
- La partida va por **olas**: ola → descanso → ola siguiente. Cada ola trae un desafío distinto (horda, marea veloz, asedio, élites, jefes, combinación mortal) y **un jefe final** desde la ola 2 (10 jefes con sprites animados y habilidades propias, con aviso en el suelo).
- Al empezar, cada héroe tiene su habilidad 1 y la torre el cíclope de piedra. Entre olas se abre un menú central grande donde se gastan puntos y oro (héroes, habilidades de la torre, inventario y huevo del dragón). Cada ola sube 1 o 2 niveles a héroes y torre.
- Controles: `Enter` empieza la ola, `P` pausa, `F` velocidad, rueda del ratón o `+`/`-` para el zoom (limitado, no se puede alejar mucho). En móvil, pellizco para el zoom.
- Los enemigos nacen en el borde del mapa. El juego corre al 75 % de velocidad (`GAME_SPEED`).
- El modo **Prueba poderes** permite probar cada héroe y sus habilidades.
- El ranking se guarda localmente en el navegador.

**Archivos**
- `index.html`: todo el código del juego.
- `assets/`: sprites y atlas (`heroes/`, `enemies/`, `summons/`, `tower/`, `comunes/`, `invocaciones/`, `ICONOS/` con los iconos y los jefes finales) y los mapas.
