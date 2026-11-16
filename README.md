# Mago Infinito

Juego de supervivencia infinito en el navegador. Elige cuatro de los 16 héroes (mago, arquero elfo, nigromante, enano artillero, bárbaro, cazador demonio, sacerdote, monje, paladín, cazador troll, hombre lobo, tauren druida, Bestia abisal, Chamán de la tormenta, Asesino o Alquimista), combina habilidades, objetos y un dragón, y sobrevive el mayor tiempo posible.

- 30 tipos de enemigos, cada uno con su armadura y resistencias por tipo de daño. Algunos corren más, resucitan, se dividen, se curan (o curan a otros), se vuelven invulnerables por momentos o llegan en enjambres y oleadas numerosas. Pasa el ratón por encima de un enemigo para ver sus rasgos.
- Toda la interfaz está en el panel inferior: las habilidades de los cuatro héroes (solo con puntos de experiencia), las habilidades de la torre y el inventario (14 objetos), estos dos últimos con oro. En pantalla solo están los poderes de la torre, en modo automático o manual. Pasa el ratón (o mantén pulsado en móvil) sobre cualquier casilla para ver su descripción.
- El dragón es una mascota autónoma: sube de nivel con su propia experiencia, sin panel ni puntos. Sus 10 habilidades (incluidas *Aliento helado* y *Escamas de dragón*) igualan su nivel y las ultimates se desbloquean a nivel 10. Solo se compra su huevo en el inventario.
- Cada habilidad tiene su propio alcance (por ejemplo, la *Lanza de acero* llega lejos y los *Cien puños* del monje solo cuerpo a cuerpo). Al pasar el ratón sobre una habilidad se ve su alcance en el tooltip y como un círculo en el mapa. El *Cristal de alcance* suma un 5% a todas.
- La **Torre del mago** es una estructura fija junto al héroe, indestructible, con su propio ataque básico (*Rayo arcano de la torre*). Lanza las 12 habilidades generales (se quitaron *Dagas*, *Bola de hielo*, *Dardo venenoso* y *Martillo sagrado* por redundantes) y desbloquea los 10 poderes automáticos al subir de nivel (5, 10, 15... 50). Sube con su propia experiencia (15% base de cada baja más el 85% de su proporción de daño efectivo), con 50 niveles por torre, y cada nivel da 1 punto de torre para mejorar sus poderes (los puntos del héroe quedan para las habilidades del héroe). Se hace más alta y gana runas al subir. Las 12 habilidades generales están equilibradas: las de área destacan contra grupos y las de un objetivo contra jefes.
- El monje y el paladín pelean cuerpo a cuerpo: igual que el dragón, salen a perseguir al enemigo más cercano, golpean al llegar y vuelven a su puesto (la cámara se queda en el centro). El paladín tiene *Espada consagrada*, *Barrido*, *Escudo del cruzado*, *Carga sagrada*, *Martillo de la justicia*, *Aura de devoción*, *Imposición de manos* e *Ira vengadora*.
- Se juega en el navegador, sin instalar nada (abre `index.html` y conserva la carpeta `assets` a su lado).
- Funciona en ordenador y en móvil (el panel inferior se abre por pestañas, zoom con pellizco).
- Controles de escritorio: `P` pausa, `F` velocidad, rueda del ratón o `+`/`-` para zoom.
- El ranking se guarda localmente en tu navegador.

Estado: beta.

**Inicio de partida:** elige primero **Equipo de 4**, **Un héroe** o **Prueba poderes**, después el mapa y los personajes. En los modos individuales solo aparece un puesto seleccionado; el equipo de cuatro se conserva al alternar modos. Un único botón inicia el modo elegido. La pantalla se adapta a móvil con tarjetas compactas, desplazamiento vertical y el botón de inicio siempre accesible.

**Mapas:** Ruinas del bosque usa `assets/mapa1.jpg` y `assets/mapa1_movil.jpg`; Ruinas sombrías usa `assets/mapa2.jpg` y `assets/mapa2_movil.jpg`. El juego utiliza la variante móvil en formato vertical y la de escritorio en horizontal, sin deformarlas. La elección se recuerda en este navegador y se mantiene al reiniciar la partida, también en modo prueba. Verificar el inicio, los tres modos y los mapas en Chrome a cuatro tamaños: `node comprobar-inicio.cjs`.

**Balance vigente — torre de apoyo:** respecto al ajuste anterior, el daño de las habilidades generales y los poderes ofensivos baja un 60%. El rayo básico hace la mitad de daño y tarda un 30% más entre disparos. Los poderes tienen un 50% más de recarga base; los niveles solo reducen la recarga hasta un 30%. Los ultimates automáticos también tardan más, y Lluvia arcana, Juicio de luz y Clavados al suelo alcanzan como máximo a 12 enemigos dentro de su rango, en vez de cubrir todo el mapa. Tormenta de rayos alcanza hasta 12 objetivos y Lluvia de meteoros hasta 8; ambas escalan con menos impactos. Los efectos temporales de los poderes duran un 35% menos y Ventisca ralentiza menos.

Curaciones y escudos de torre se reducen a la mitad antes de aplicar límites: Juicio divino cura como máximo un 20% de la vida; Fuente de vida cura hasta un 25% a héroes y un 30% a invocados, con hasta un 12% de escudo; Barrera rúnica da hasta un 25% de escudo. La regeneración de las torres baja del 0,8% al 0,2% de vida máxima por segundo y recuperan menos vida al subir de nivel.

Soldados esqueleto mantiene como máximo 8 unidades, mitad guerreros y mitad arqueros, y solo repone bajas. Su vida baja un 30% respecto al ajuste anterior y su daño recibe el mismo nerf que los poderes. Los arqueros llevan arco sin espada y disparan flechas verdes con contorno oscuro que dañan al impactar. La mejora Guardia eterna aumenta la vida. Verificación: `node comprobar-esqueletos.cjs`.

**Progresión más lenta:** los héroes reciben un 40% menos de experiencia y las torres un 50% menos. El bono temporal de experiencia de ambos deja de crecer al llegar a x4 a los 5 minutos. Se mantienen el reparto por héroe, el bono por baja y los puntos de habilidad por nivel. El modo de prueba conserva los botones para añadir niveles manualmente. Verificar daño y progresión con escenarios controlados de 1 y 4 héroes: `node comprobar-balance.cjs`. La simulación comprueba el cambio de balance; no sustituye las partidas manuales de supervivencia.

**Rondas:** la partida se divide en rondas de 3 a 4 minutos (duración de pruebas; empieza en 3:00 y suma 5 s por ronda hasta 4:00). Al terminar una ronda se eliminan los enemigos, los héroes y las torres se recuperan y el juego se detiene: solo en ese descanso se gastan puntos, experiencia y oro (habilidades, poderes, objetos y huevo del dragón). Las mejoras automáticas también se compran en el descanso. Se empieza la siguiente ronda con el botón o con `Enter`.

**Torre (reglas actuales):** cada torre tiene 50 niveles; al llegar al 50 aparece otra torre nueva en nivel 1. Las 12 habilidades de la torre ya no se compran: salen en una barra sobre el mapa, suben solas con el nivel de la **torre principal** (de 1 a 50, sin coste) y se lanzan en automático o en manual (botón AUTO/MANUAL, clic o teclas `1`-`0`). Todas las torres usan esos niveles al lanzarlas. Las habilidades de la torre se compran con 1 punto de torre (uno por nivel de torre) o con oro; los puntos y el oro de la torre se gastan también en sus **poderes** (panel inferior, entre rondas). El nivel de cada torre solo afecta a su golpe base.

**Movimiento:** todos los héroes se mueven. Los de cuerpo a cuerpo salen a perseguir enemigos; los de distancia se apartan (hasta 170 px) del enemigo que se acerca a menos de 150 px y vuelven a su puesto cuando no hay peligro.

Los 14 objetos se pueden mejorar hasta nivel **50**. Cada habilidad muestra una estrella: gris antes de 5, verde desde 5, azul desde 10, violeta desde 15 y dorada desde 20. En objetos los tramos son 10/20/30/40; el nivel 50 conserva el dorado con brillo de máximo. Las estrellas permanecen visibles aunque no puedas comprar una mejora.

El Escudo arcano conserva su reducción anterior hasta nivel 20. Después reduce un 2,5% del daño restante por nivel para que cada mejora siga siendo útil sin convertir el daño en curación. Comprobación de compras y estrellas: `node comprobar-items-estrellas.cjs`.

Todas las habilidades de héroe, generales y los diez poderes de torre tienen mejoras acumulativas en los niveles 5, 10, 15 y 20. Las generales conservan además sus ultimates existentes. Las fichas muestran las mejoras desbloqueadas y pendientes.

- [Detalle de habilidades y escalados](ANALISIS-HABILIDADES.md).
- [Análisis del plantel y propuesta de cuatro nuevos héroes](PROPUESTA-HEROES.md).
- Comprobar la progresión: `node comprobar-progresion.cjs`.
- Regenerar el informe desde el código: `node generar-analisis.cjs`.

La **Bestia abisal** adapta el estilo de Primal Beast: Embestida, Pisotear, Rugido, Pulverizar y Lanzamiento de roca, junto con Colosal y mejoras complementarias. Tiene doce habilidades con progresión en 5/10/15/20. Acumula furia al recibir daño y deja de atacar durante Pisotear o Pulverizar. Su silueta muestra lomo naranja con grandes placas dorsales, vientre pizarra y brazos enormes con cadenas.

- [Dirección visual de los cuatro héroes elegidos](DISENO-NUEVOS-HEROES.md).
- Comprobar las mecánicas de la Bestia: `node comprobar-devorador.cjs`.
- Generar galería visual y partida de prueba: `node previsualizar-devorador.cjs`.

Los tres nuevos héroes tienen habilidades propias y mejoras en 5/10/15/20:

- **Chamán troll:** piel azul, orejas largas, colmillos y bastón ritual. Aplica Mojado, acumula hasta 30 de estática, mantiene tótems destructibles y desata Monzón.
- **Asesino:** luchador cuerpo a cuerpo con capucha oscura, bufanda roja y dos dagas.
- **Alquimista ogro:** cuerpo corpulento, barriga, colmillos y alambique dorsal. Combina hasta 16 charcos de ácido, aceite y gas. El fuego enciende el aceite; Mezcla y Transmutación consumen charcos sin generar reacciones infinitas.

Comprobar sus mecánicas y seis simulaciones del motor: `node comprobar-nuevos-heroes.cjs`. Regenerar su galería y página de prueba: `node previsualizar-nuevos-heroes.cjs`.

Cada torre llega al nivel 50. Hasta el nivel 30 conserva la curva `redondear(15 × 1,33^(nivel − 1))`; después el coste crece linealmente un 6% del coste del nivel 30 por nivel. Al llegar al nivel **50** aparece otra torre con su propio rayo arcano. Todas comparten nivel, experiencia y mejoras; las habilidades generales y los poderes salen de la torre principal. Se ajustó la curva inicial tras simular doce minutos con cada héroe. Las habilidades de la torre empiezan en 0 y los poderes se desbloquean en los niveles 5, 10, 15… 50 de la torre. La **Barrera rúnica** otorga un escudo al héroe y libera una onda arcana que daña y ralentiza. Sus mejoras aumentan el escudo, el daño, el radio y la duración de la ralentización, y reducen su recarga.

Cada poder empieza en nivel 1 y se puede mejorar hasta 20 con puntos de torre u oro. Todos tienen mejoras acumulativas en **5, 10, 15 y 20**, detalladas en su ficha y en el informe de habilidades. Se lanzan automáticamente al recargarse y tener objetivos adecuados. Los iconos del panel inferior sirven para comprar mejoras; se han retirado los botones y atajos de lanzamiento manual.

- Verificar torre, reparto de experiencia, compras y las cuatro mejoras de los diez poderes: `node comprobar-torre.cjs`.
- Simular doce minutos por héroe y mostrar los tiempos de desbloqueo: `node comprobar-torre.cjs --simular`. Usa semilla fija, compras automáticas e inmunidad del héroe para medir la progresión completa; no mide supervivencia ni sustituye el balance de partidas manuales.
- Comparar el daño con las comunes desde el héroe o la torre: `node comprobar-torre.cjs --comparar`.
- Verificar la interfaz real en Chrome, a 1500×1000 y móvil a 390×844: `node previsualizar-torre.cjs` y `node comprobar-interfaz.cjs` (Windows; usa `CHROME_PATH` si Chrome está en otra ruta).
- Generar una partida de revisión de la torre para ordenador y móvil: `node previsualizar-torre.cjs`.

El huevo del dragón incuba en un nido fijo junto a la torre, incluso cuando el héroe se desplaza; el dragón nace en ese mismo punto. El mapa representa las ruinas de un antiguo campo de batalla arcano: una plaza de piedra agrietada con un mosaico violeta y azul, murallas derrumbadas, columnas caídas, estandartes y restos de máquinas de asedio. La hierba, la hiedra y las flores recuperan las esquinas. Los colores de las ruinas armonizan con la piedra gris, el tejado violeta y el cristal azul de las torres. El escenario tiene ilustraciones propias para ordenador y móvil, mostradas sin deformarlas. Las imágenes se cargan una vez y el fondo se guarda en caché; si no está disponible, se dibuja un suelo de piedra con vegetación en los bordes como respaldo.

La experiencia de la torre aparece únicamente en el HUD superior, junto a la vida, la experiencia del héroe y las barras del dragón. Las cinco secciones inferiores comparten altura de cabecera y filas alineadas; en móvil se mantienen dentro del cajón de habilidades y tienda.


Cada casilla del panel inferior tiene un checkbox de **mejora automática**, y cada cabecera permite automatizar su sección completa. El número junto al checkbox es su posición en una cola global, asignada por orden de selección. Al desmarcar una opción o llegar a su nivel máximo, se retira de la cola y se renumeran las demás. Una compra manual que complete el nivel máximo también desactiva su automatización.

Se gastan primero los puntos obtenidos con experiencia del grupo correspondiente (héroe, torre o dragón), y después oro. Los objetos del inventario usan oro. Si una opción no puede pagarse, se prueba la siguiente prioridad. Cada sección mejora primero sus casillas de menor nivel que se puedan pagar y vuelve a ordenar después de cada compra. Las casillas seleccionadas individualmente conservan su prioridad propia y su sección no las compra por adelantado. Los poderes bloqueados esperan a desbloquearse sin consumir recursos.

La sección de inventario automatiza sus 14 objetos permanentes. Los checkboxes individuales del huevo y la poción permiten reponerlos cuando hagan falta; permanecen activos mientras se incuban o la vida está completa. El checkbox de la propia casilla del huevo controla su reposición; no hay un control duplicado en la cabecera del dragón. Las mejoras automáticas solo compran mientras la partida está en marcha; al abrir un cajón móvil se mantiene la pausa de compras existente. Una partida nueva empieza con todas las automatizaciones desmarcadas.

Verificar la cola, el uso de recursos, los máximos y la renumeración: `node comprobar-auto-mejoras.cjs`. La prueba de interfaz también comprueba los 60 checkboxes de casilla y las cinco cabeceras, su numeración y que marcarlos no provoque una compra manual.

Las cabeceras del panel inferior muestran el nombre de la sección, los puntos disponibles y el checkbox de mejora automática en una sola línea.

**Cuatro héroes:** al empezar se eligen cuatro héroes. Cada uno tiene sus propias habilidades y puntos (cada nivel da 1 punto a cada uno); comparten experiencia, oro, objetos y torres. Los enemigos atacan al héroe más cercano. Las mejoras automáticas tienen una sección por héroe (hero, hero2, hero3, hero4).

**Poderes de la torre:** salieron del panel. Están en la segunda fila de la barra de pantalla (teclas Q, W, E, R, Z, C, V, N, G, T), se lanzan solos o a mano según el modo AUTO/MANUAL y suben solos con el nivel de la torre principal, sin puntos ni oro.

**Mejoras (corrección):** las habilidades de la torre (Misil arcano, Bola de fuego…) vuelven al panel junto al inventario y se compran con oro; se lanzan siempre solas. Los héroes solo suben con puntos de experiencia, sin oro.

## Torre central, órbitas y rangos

- La primera torre está en el centro, algo más grande, con dos héroes a cada lado.
- Los héroes rodean la base de las torres en pie en lugar de atravesarla. La colisión también se aplica a cargas y destinos de teletransporte; las ruinas permiten el paso. Comprobación: `node comprobar-colision-torres.cjs`.
- Las bolas de fuego orbitales giran alrededor de cada torre.
- Los héroes ya no tienen rango máximo: tienen rango de disparo y rango de visión; avanzan, se acercan o se apartan según estén a distancia o cuerpo a cuerpo.

## Experiencia por héroe

- Cada héroe tiene su propio nivel y XP. La XP de cada enemigo se reparte por igual entre los héroes vivos y el que da el golpe mortal recibe un 15% extra.

## Mago: nuevos ultimates

- **Campo de hielo** (Crystal Maiden): ventisca a su alrededor que daña y ralentiza.
- **Rayo de luz** (Lina): daño enorme solo a jefes y después bono de velocidad de ataque.

## Caballero dragón (antes Paladín enano)

Llamarada, Forma de dragón, Golpe con escudo, Aura de curación y daño, Aura de resistencia (todo el equipo), Martillo divino y el ultimate Invulnerabilidad (todos los héroes). Conserva Espada consagrada, Barrido, Carga sagrada, Imposición de manos y Lanza de luz.

## Orco guerrero

Llamada de batalla (atrae, aturde y reduce el daño recibido), Danza de la cuchilla (críticos en área), Hambre de sangre (marca y cura al matar), Jabalí embestidor (aliado que embiste y aturde) y Rugido de la manada (aura de daño y velocidad para aliados). Conserva Golpe crítico, Hachas múltiples, Hachas gigantes, Sangrado, Furia, Decapitador y el ultimate Berserker.

## Cazador troll

Pacto de sangre (sacrifica vida para curar al equipo), Lanzas ardientes (más daño cuanta menos vida tienes) y Postura de guerra (alterna lanzas veloces y hachas con sangrado y robo de vida). Su ultimate Espíritu del Loa impide que muera mientras dura. Se retiran Trampa de sombra, Frenesí sangriento y Jabalí de guerra.

## Druida
- **Compañero oso espiritual** (antes Tormenta eléctrica): oso permanente que provoca, aplasta, aturde y marca a los enemigos; reaparece solo si cae.
- **Regreso a la naturaleza** (antes Enjambre): intercambia tu sitio con el oso, te cura y suelta una onda de espinas en ambos puntos.
- **Fuerza de la naturaleza** (antes Retoños): 3+ ents que duran hasta que los derroten (máx. 10).
- **Teletransporte** (antes Ciclón): salto a un grupo lejano con explosión que daña y aturde.
- **Forma de oso** (ultimate): además agranda y potencia al oso espiritual.

## Nigromante
- **Aura de la parca** (antes Muro de huesos): cada segundo hiere a los enemigos cercanos (más a los de mucha vida) y cura a héroes y aliados.
- **★ Sentencia de la parca** (ultimate, antes Cosecha de almas): ejecuta a los enemigos con menos del 50% de vida (jefes incluidos), daña al resto, cura por completo a los aliados y los potencia.

## Asesino (sustituye al Bardo)
Cuerpo a cuerpo, rápido y frágil, con 12 habilidades: *Puñal envenenado*, *Golpe letal*, *Esquiva*, *Puñalada de sombra* (teletransporte al enemigo más fuerte), *Bomba de humo*, *Invisibilidad* (siguiente golpe = emboscada crítica), *Marca de muerte* (si el marcado muere, se reinician recargas), *Lluvia de dagas*, *Clon de sombra* (permanente hasta que lo derrotan), *Trampa venenosa*, *Ejecución* (mata bajo ~15% de vida; jefes, la mitad) y ★ *Danza mortal* (invulnerable, saltos con críticos garantizados).

## Modo prueba de héroe
En la pantalla de inicio, selecciona un héroe y pulsa **🧪 Probar héroe**: juegas solo con ese héroe, sin torre ni rondas, y los enemigos lo atacan a él. Una barra superior permite subir niveles, dar oro, curar, invocar enemigos o un jefe, limpiar el campo, subir la dificultad y pausar las apariciones.

La opción **Pocos enemigos débiles** está activada al entrar: aparece un goblin de práctica cada 3 segundos, hasta un máximo de 4, con 30 de vida y 1 de daño, sin resistencias ni escalado con el tiempo. No hay jefes ni oleadas; el botón de enemigos añade hasta 3 débiles respetando el límite. Desmarca la opción para recuperar los enemigos normales y los controles de jefe y dificultad. Cambiar la opción limpia el campo.

Junto al nombre del personaje, **↺ Reset habilidades** pone sus habilidades a cero y devuelve todos los puntos gastados. Conserva su nivel, experiencia, oro y objetos; cura al héroe, limpia enemigos, invocaciones y efectos, y desactiva la compra automática de sus habilidades para poder probar otra combinación. Verificación: `node comprobar-modo-prueba.cjs`.

## Arquero elfo (Windranger + Drow Ranger)
12 habilidades: *Golpe crítico*, *Velocidad de golpe*, *Flechas múltiples*, *Flecha perforante*, *Flechas de escarcha* (ralentizan y congelan), *Grillete* (ata y aturde a dos enemigos), *Disparo potente* (línea), *Carrera del viento* (esquiva pasiva; activa: invulnerable y veloz), *Ráfaga* (empuja y silencia a los que disparan), *Aura de precisión* (+daño a todo el equipo), *Halcón compañero* y ★ *Fuego concentrado* (dispara a hasta 12 enemigos a la vez a velocidad x2,5).

## Enano artillero (Sniper + Techies)
12 habilidades: *Golpe crítico*, *Velocidad de golpe*, *Armadura de hierro*, *Tiro en la cabeza* (empuja y aturde), *Disparo de precisión* (alcance y daño a distancia), *Granada de metralla* (zona que daña y ralentiza), *Lanzagranadas*, *Campo minado*, *Torreta*, *Cohetes teledirigidos*, *Barril explosivo* (cuesta vida; más daño cuanta menos tengas) y ★ *Asesino* (2 s de apuntado y una bala devastadora que atraviesa).

## Cazador de demonios (Magina + Phantom Assassin)
Se sustituyen *Caos vil* y *Tormenta de guadañas* por *Daga asfixiante* (daña, ralentiza y marca a los más fuertes) y ★ *Golpe de gracia* (ultimate: críticos garantizados x3,5, +40% de velocidad y 30% de esquiva). El resto (Metamorfosis, Inmolación, Rayos oculares, Evasión, Quemadura, Golpe de sombras, Cazador de demonios, Vacío vil, Fragmentos y Paso de sombra) se mantiene.

## Jugar con 1 héroe
En la pantalla de inicio, el botón **Jugar con 1 héroe** empieza la partida completa (torres, rondas, asedios) con solo el héroe seleccionado. El panel inferior muestra únicamente la torre, ese héroe y los objetos, como en el modo prueba.

## Arte en PNG (versión 2, en curso)

El **mago invocador**, el **alquimista**, la **torre** y los **42 enemigos** ya se dibujan con sprites PNG: personaje, disparo arcano, torre por pisos, cíclope, esqueletos, iconos de habilidad y de poder, iconos de mejora y la mayoría de los efectos. El resto de héroes y el dragón siguen en vectorial. Los enemigos usan 2 fotogramas de caminar (`assets/enemigos1.png`, `enemigos2.jpg` y `enemigos3.jpg`; `python tools/empaquetar_enemigos.py`) y conservan por código la corona de jefe, el aro de élite y los efectos de estado.

- Los sprites viven en `assets/heroes/mage/` y `assets/tower/` (dos atlas y `pack.js` cada uno) y se cargan con `assets/sprites.js` (script normal: sigue funcionando con doble clic).
- Si un sprite falta o el PNG no carga, se usa el dibujo vectorial de siempre. Con `index.html?sprites=off` se fuerza el dibujo vectorial para comparar.
- Las hojas originales están en `assets/mago_hoja1.png` y `assets/mago_hoja2.png`. Hojas de la torre: `assets/torre_hoja1.png` y `assets/torre_hoja2.png`. Para regenerar los atlas: `python tools/empaquetar_mago.py`, `python tools/empaquetar_torre.py` y `python tools/empaquetar_alquimista.py` (hojas `assets/alche1.jpg` y `alche2.jpg`) (requiere `pillow` y `numpy`).
- Los iconos de mejora no se recortan de la hoja: el código compone el icono de la habilidad, el marco de color del nivel y el símbolo del efecto.
- Vista previa con una partida real del mago: `node tools/previsualizar-mago-v2.cjs` y abrir `preview-mago-v2.html#120`.
- Prompts de arte y plantillas guía: `PROMPTS-ARTE-MAGO.md` y `guias-arte/`. Plan completo: `PLAN-V2.md`.

- **8 enemigos extra** con arte pixel art (Fragmento de cristal, Hada de cristal, Gema rodante, Cristalino, Escorpión, Dragoncillo, Pulpo y Cangrejo dorados), salidos de `assets/enemigos (2).jpg`. Tienen un solo fotograma y se animan con rebote por código; sus estadísticas son parecidas a las de enemigos existentes del mismo nivel. Las demás hojas `enemigos (N).jpg` no encajan con el juego y no se usan.

- Prompts de arte de los 15 héroes restantes: carpeta `prompts-heroes/` (2 archivos por héroe, uno por hoja; empieza por `LEEME.md`). Se regenera con `node tools/generar-prompts-heroes.cjs`.

- Prompts de arte de las unidades invocadas: carpeta prompts-invocadas/ (3 hojas, un archivo por hoja; empieza por LEEME.md).
