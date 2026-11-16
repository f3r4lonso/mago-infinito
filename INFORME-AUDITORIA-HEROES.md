# Auditoría de héroes — Mago Infinito

Fecha: 2026-11-16T03:11:04.152Z. Revisión de referencia: `8d7d184`, incluyendo los archivos locales presentes al probar.

**Resultado:** 17 hallazgos priorizados: 5 P1, 8 P2 y 4 P3. Son una mezcla de fallos confirmados, limitaciones del simulador, discrepancias de fichas y observaciones visuales; no son 17 poderes rotos.

[Abrir la galería y la matriz interactiva](auditoria-heroes/index.html) · [Cobertura de las 192 habilidades](auditoria-heroes/cobertura.md) · [Datos de la ejecución](auditoria-heroes/resumen.json)

## Qué se probó

- 16 héroes y sus 192 habilidades. Ataques básicos y kits completos también incluidos.
- 880 escenarios del motor: habilidades a niveles 1/20/50, básicos de referencia, kits y recorrido del panel a nivel de habilidad 20.
- 384 escenarios adicionales en Chrome con los sprites reales: cada habilidad en el panel y en combate preparado.
- 30 casos específicos de requisitos, daño letal, invocaciones, estados y cámara.
- 256 capturas de pose: reposo, movimiento, ataque y recibir daño, en cuatro direcciones por héroe. Revisión de las 16 galerías de habilidades.
- Interfaz de todos los héroes a 1400×1000, 390×844, 360×640 y 844×390: 768 selecciones y comprobación de acceso al botón principal.
- No hubo excepciones del motor, valores no finitos ni errores de ejecución del navegador en los escenarios generales. Los 28 atlas cargaron y sus recortes quedaron dentro de la imagen. No se detectó solapamiento de IDs de sprite ni desbordamiento del panel en esa muestra.

## Cómo interpretar el informe

P1: arreglar primero porque impide probar o leer una habilidad importante. P2: fallo funcional/visual o limitación que afecta la prueba. P3: calidad visual, claridad o mantenimiento. Las observaciones subjetivas están marcadas explícitamente.

Las pruebas del panel conservan al héroe en nivel inicial y sano, como al entrar normalmente, y configuran la habilidad a nivel 20. Las pruebas de combate usan héroe de nivel 20, objetivos variados (incluido jefe y blanco a distancia), cambios controlados de vida y bajas inducidas para activar pasivas. Las bajas inducidas y los blancos preparados hacen que estos datos no sean un benchmark de DPS ni una medida de supervivencia.

Que un escenario no produzca señal adicional no demuestra por sí solo un fallo. Por eso se repitieron las habilidades dependientes con veneno, charcos, estática, oso, esqueletos, dragón o daño letal. Las 192 filas de cobertura distinguen evidencia de mecánica y contexto necesario.

## Orden propuesto de reparación

1. H01–H02: restaurar cambios de forma y animación corporal de lanzamiento.
2. H03–H04 y H11: preparar automáticamente los requisitos de cada prueba, sin añadir más botones visibles.
3. H05: conservar el experimento al morir.
4. H06–H08: aclarar duración de invocados, mantener al héroe visible y sincronizar el campo de hielo.
5. H09–H12: resolver direcciones, cámara lenta y representación del sigilo.
6. H13–H17: pulir legibilidad y actualizar las pruebas antiguas.

## Hallazgos

### H01 · P1 · Las transformaciones conservan el cuerpo PNG normal

**Tipo:** Visual confirmado.

Forma de oso, Luna llena, Metamorfosis y Colosal conservan exactamente la misma imagen del cuerpo PNG antes y después de activar el estado. El Caballero dragón conserva el caballero y añade efectos/alas, sin cuerpo de dragón.

**Evidencia:** Comparación píxel a píxel: cuerpo idéntico en los cuatro primeros casos. heroForm devuelve 1,38 para el druida, 1,32 para el lobo y 1,12 para Colosal, pero el camino PNG retorna antes de aplicar esa transformación. La alternativa vectorial sí cambia el oso y otros rasgos.

**Reproducir:** Druida → Forma de oso → Nv20 → Probar. Repetir con Luna llena, Metamorfosis y Colosal. Comparar con index.html?sprites=off.

**Siguiente arreglo:** Aplicar la escala de forma también al sprite y elegir un sprite/pose de transformación cuando corresponda. Decidir si Forma de dragón debe transformar el cuerpo o describirse como un aura.

**Código:** index.html, línea 3156 (buscar `if(h==='mage'&&SPR.on&&SPR.mageHero`).

[Captura de referencia](auditoria-heroes/formas-comparacion.png).

### H02 · P1 · Una habilidad activa no anima el cuerpo si se apaga el básico

**Tipo:** Visual confirmado.

Se puede ver daño y VFX de un conjuro mientras el personaje permanece en la pose de reposo. Con el básico activado parece que castea porque sus disparos proporcionan la pose de ataque.

**Evidencia:** Rayo solar sin básico infligió 5420,8 de daño en el escenario preparado, pero atkAt siguió sin definir, punchAt=-9 y attackCount=0. drawHero toma su pose de esas marcas del ataque básico.

**Reproducir:** Mago → Rayo solar → Ajustes → desactivar básico de apoyo → Probar. Observar el cuerpo durante el rayo.

**Siguiente arreglo:** Emitir un evento de animación de lanzamiento desde las habilidades activas, independiente del ataque básico. No exigir pose nueva para las pasivas.

**Código:** index.html, línea 3191 (buscar `const since=G.t-Math.max(G.atkAt`).

[Captura de referencia](auditoria-heroes/habilidades-mage.png).

### H03 · P1 · Tres objetivos no bastan para varios ultimates

**Tipo:** Simulador confirmado.

Fuego concentrado y Berserker exigen al menos 4 objetivos; Nova de luz exige 5; Rayo de luz solo busca jefes. El botón Probar prepara 3 objetivos sin jefe y muestra Detener aunque esos poderes no se hayan lanzado.

**Evidencia:** No se activaron con la preparación del panel. Sí activaron focusOn, bersOn, Nova de luz y Rayo de luz con un escenario de 10 enemigos que incluía jefe.

**Reproducir:** Entrar al test → elegir cada uno de esos poderes → Nv20 → Probar sin cambiar Ajustes.

**Siguiente arreglo:** Preparar el número y tipo de blancos que requiere la habilidad elegida. Mostrar si está esperando una condición, en lugar de sugerir que ya se ejecutó.

**Código:** index.html, línea 5859 (buscar `function previewSoloSkill`).

[Captura de referencia](auditoria-heroes/habilidades-archer.png).

### H04 · P1 · La prueba aislada elimina los requisitos de otras habilidades

**Tipo:** Simulador confirmado.

Probar desactiva todas las demás habilidades y limpia aliados/estados. Abominación queda sin esqueletos, Regreso a la naturaleza sin oso, varias habilidades del chamán sin estática/Mojado, las del alquimista sin veneno/charcos y las mejoras de la Bestia sin su acción base. Rugido de la manada no tiene aliados que potenciar.

**Evidencia:** Las versiones preparadas y/o kits completos sí invocaron una abominación, intercambiaron con el oso, produjeron Sobrecarga/Golpe de relámpago, Mezcla/Gran transmutación/Pandemia y daños de Impacto brutal/Roca fragmentada. Dragón esqueleto convirtió un dragón muerto en una unidad esquelética.

**Reproducir:** Elegir una de estas habilidades sola y pulsar Probar. Después contrastar con un kit completo o el caso preparado de casos.json.

**Siguiente arreglo:** Cada prueba debe suministrar sus dependencias mínimas o permitir un preset de combinación sin ampliar la interfaz principal. En Dragón esqueleto preparar un dragón y su muerte.

**Código:** index.html, línea 5859 (buscar `function previewSoloSkill`).

[Captura de referencia](auditoria-heroes/habilidades-alchemist.png).

### H05 · P1 · Morir borra la configuración de la prueba

**Tipo:** Simulador confirmado.

La muerte vuelve a crear la partida. Se pierden los niveles configurados, la habilidad seleccionada y la prueba en curso; las apariciones quedan detenidas.

**Evidencia:** Después de matar al monje con Combo de palma Nv20: skillLevel=0, choice=basic, spawnsPaused=true y running=false.

**Reproducir:** Subir una habilidad, elegir enemigos progresivos y dejar morir al héroe.

**Siguiente arreglo:** Reaparecer conservando el preset o restaurar la configuración al reiniciar. Separar reiniciar el campo de borrar el experimento.

**Código:** index.html, línea 2454 (buscar `function soloRestart`).

### H06 · P2 · Las invocaciones temporales no caducan

**Tipo:** Mecánica/ficha discrepantes.

updateAllies asigna life=999 en cada actualización. Afecta también a unidades cuyas fichas indican una duración. No confundirlo con las invocaciones declaradas permanentes.

**Evidencia:** Crías de panda Nv20: nacieron 5 con 32 s de vida; se desactivaron nuevas invocaciones sin limpiarlas y, después de 120 s, seguían las 5, todas con life=999.

**Reproducir:** Invocar Crías de panda y evitar muertes/nuevas invocaciones. Esperar más que la duración indicada.

**Siguiente arreglo:** Respetar la vida temporal de las unidades que la usan y reservar la permanencia a las marcadas como tales; si se desea que todas sean permanentes, corregir las fichas y el balance.

**Código:** index.html, línea 1734 (buscar `a.life=999;`).

[Captura de referencia](auditoria-heroes/habilidades-monk.png).

### H07 · P2 · El héroe puede salir del campo visible al perseguir

**Tipo:** Visual/móvil confirmado.

El movimiento se limita por una correa del mundo, pero la cámara permanece centrada. Con zoom 1x el personaje puede superar el borde de una pantalla estrecha.

**Evidencia:** Monje, ancho 390 px, zoom 1x y blanco a 260 px del centro: después de 3 s, centro del héroe x=415, fuera del ancho 390. Es una reproducción a ese zoom, no una afirmación sobre todos los zooms por defecto.

**Reproducir:** Móvil de 390 px → zoom 1x → colocar/encontrar un blanco a la derecha, a unos 260 px del centro → dejar que el monje lo persiga.

**Siguiente arreglo:** Limitar el recorrido a la zona visible en modo test, ajustar zoom automáticamente o seguir al héroe con la cámara.

**Código:** index.html, línea 1920 (buscar `function updateMelee`).

### H08 · P2 · El suelo de Campo de hielo no acompaña su daño

**Tipo:** Visual confirmado.

El campo lógico sigue al mago, pero el sprite frostpatch conserva la posición en la que se creó. Al moverse el héroe se separan suelo visible y área real.

**Evidencia:** Al desplazar al mago 150 px: patchX=700, heroX=850 y damageCenterX=850.

**Reproducir:** Campo de hielo activo → dejar que el mago esquive/se mueva → comparar el suelo azul con la posición del héroe.

**Siguiente arreglo:** Anclar el efecto a la posición actual del campo mediante pos() o actualizar sus coordenadas durante su duración.

**Código:** index.html, línea 6453 (buscar `spr({id:'frostpatch'`).

[Captura de referencia](auditoria-heroes/habilidades-mage.png).

### H09 · P2 · Arriba y Abajo no tienen pose propia

**Tipo:** Animación confirmada.

Las tres capturas del cuerpo mirando a Derecha, Arriba y Abajo son idénticas en los 16 héroes. La dirección solo resuelve el espejo horizontal del sprite.

**Evidencia:** Comparación de PNG renderizados con la misma fase de ataque: rightEqualsUp=true y upEqualsDown=true para 16/16.

**Reproducir:** Animación de ataque → Ajustes → alternar Derecha, Arriba y Abajo.

**Siguiente arreglo:** Añadir variantes verticales o limitar/renombrar el selector a las orientaciones que realmente se pueden representar.

**Código:** assets/sprites.js, línea 170 (buscar `api.spriteHero=function`).

[Captura de referencia](auditoria-heroes/poses-resumen.png).

### H10 · P2 · La velocidad no ralentiza los VFX ni los golpes reales

**Tipo:** Simulador confirmado.

El ajuste modifica el reloj de las poses de previsualización; el combate, los proyectiles y los efectos continúan con dt normal.

**Evidencia:** Meteoro del caos: primer daño a 0,70 s tanto a x0,5 como a x2, con el mismo daño total en la muestra determinista.

**Reproducir:** Probar Meteoro del caos y cambiar Velocidad de animación de lenta a rápida.

**Siguiente arreglo:** Aclarar que el control solo afecta a la pose, o introducir cámara lenta del experimento completo para inspeccionar los efectos.

**Código:** index.html, línea 7892 (buscar `G.soloAnimTime=(G.soloAnimTime||0)`).

### H11 · P2 · El panel no prepara curación, defensa, furia ni resurrección

**Tipo:** Simulador: requisitos no preparados.

Los blancos del panel tienen daño y velocidad cero y el héroe empieza sano. No permiten apreciar por sí solos curaciones, respuesta al daño, furia, resurrección o trampas por contacto. Pacto de sangre necesita además otro héroe herido. Los objetos opcionales empiezan sin oro para preparar rápidamente un dragón.

**Evidencia:** Resurrección sí funcionó al recibir daño letal (hp=256,62; resCd=49; sin reinicio); Rugido sí funcionó al acumular 5 cargas (8,75 s de estado). No se clasifican esos poderes como rotos.

**Reproducir:** Probar Plegaria de sanación, Resurrección o Rugido desde el estado inicial, sin enemigos progresivos.

**Siguiente arreglo:** Preparar salud/daño/recursos o un aliado de prueba según el poder. La preparación puede ser automática y mantener el panel minimalista.

**Código:** index.html, línea 5866 (buscar `hpAbs:5000,dmg:0,sp:0`).

### H12 · P2 · Invisibilidad mantiene el cuerpo completamente visible

**Tipo:** Visual confirmado; mecánica no invalidada.

La imagen del cuerpo es idéntica con hideOn=0 y hideOn=10. Puede aparecer un efecto de sigilo alrededor, pero el cuerpo no se atenúa ni cambia de representación.

**Evidencia:** Comparación del cuerpo renderizado: bodyIdentical=true. El aumento de daño de emboscada sí se observó en combate; el fallo señalado es de lectura visual.

**Reproducir:** Asesino → Invisibilidad → apagar el básico de apoyo para no consumir inmediatamente la emboscada → Probar.

**Siguiente arreglo:** Aplicar transparencia/silueta al cuerpo y conservar una referencia tenue para el jugador.

**Código:** assets/sprites.js, línea 170 (buscar `api.spriteHero=function`).

[Captura de referencia](auditoria-heroes/habilidades-assassin.png).

### H13 · P3 · Caminar y recibir daño tienen poca animación corporal

**Tipo:** Limitación visual observada.

La ruta PNG escoge entre reposo y ataque. Caminar reutiliza reposo con balanceo/inclinación; recibir daño mantiene la silueta y añade un brillo/variación de opacidad. No hay ciclo de piernas ni pose de impacto dedicada.

**Evidencia:** Revisión de 256 poses y del selector de sprite basado en st.u. Es una limitación de animación, no una excepción del motor.

**Reproducir:** Elegir Caminar o Recibir daño y compararlo con Reposo.

**Siguiente arreglo:** Definir qué nivel de animación se quiere: añadir fotogramas de movimiento/impacto o mantenerlo como animación procedural explícita.

**Código:** assets/sprites.js, línea 170 (buscar `api.spriteHero=function`).

[Captura de referencia](auditoria-heroes/poses-resumen.png).

### H14 · P3 · Algunos efectos tapan demasiada información

**Tipo:** Revisión visual subjetiva.

En las capturas, los destellos blancos de EMP/rayo solar, el aro de cuchillas del orco, el aceite/gas del alquimista y el vacío del demonio ocultan siluetas o buena parte del suelo. El sprite de ataque del panda y su estela ocupan varios blancos próximos.

**Evidencia:** Revisión de las galerías de esos cinco héroes. Los recortes de la galería son acercamientos; conviene contrastar la escala en el juego antes de elegir tamaños finales.

**Reproducir:** Probar esos poderes contra varios blancos juntos, especialmente en móvil.

**Siguiente arreglo:** Revisar opacidad, tamaño y capas. Mantener siluetas/barras visibles por encima de los VFX sin cambiar el radio mecánico.

**Código:** assets/sprites.js, línea 126 (buscar `api.drawFx=function`).

[Captura de referencia](auditoria-heroes/habilidades-alchemist.png).

### H15 · P3 · Las señales de poder se confunden con los golpes normales

**Tipo:** Revisión visual subjetiva.

Muchas pruebas repiten exactamente el mismo cuerpo de ataque mientras el VFX característico es una línea/círculo tenue, queda debajo de otras unidades o no tiene señal persistente. Las pasivas y estados difíciles de activar no ofrecen un indicador claro de que han actuado.

**Evidencia:** Comparación manual de las 16 galerías completas. No implica que esas habilidades carezcan de daño; varias registraron daño propio y recarga.

**Reproducir:** Alternar esos poderes con ataque de apoyo y comparar el fotograma de impacto y el estado activo.

**Siguiente arreglo:** Añadir señales breves y consistentes de lanzamiento/impacto/estado y distinguirlas del básico. Evitar llenar la interfaz con más controles.

**Código:** index.html, línea 3150 (buscar `function drawHero`).

[Captura de referencia](auditoria-heroes/habilidades-monk.png).

### H16 · P3 · Probar un nivel cero lo convierte en nivel uno

**Tipo:** Simulador confirmado.

Al pulsar Probar sobre una habilidad con nivel 0 se le asigna automáticamente nivel 1. Puede ser cómodo para estrenarla, pero no sirve como experimento de nivel cero y no se avisa antes.

**Evidencia:** Rayo solar: before=0 y after=1 después de runSoloTest.

**Reproducir:** Poner una habilidad a cero y pulsar Probar.

**Siguiente arreglo:** Indicar el nivel mínimo de la prueba o separar la prueba desactivada/básico de la activación automática.

**Código:** index.html, línea 5862 (buscar `if(id!=='basic'&&!learnedClv(id))`).

### H17 · P2 · Tres comprobaciones antiguas fallan y otra oculta un fallo

**Tipo:** Pruebas automatizadas.

comprobar-progresion, comprobar-torre y comprobar-auto-mejoras fallan con expectativas que no coinciden con las reglas actuales. Además, la comprobación de Paso fantasma usa una aserción terminada en ||true, que siempre pasa.

**Evidencia:** Resultados observados: progresión 0 != 1; torre 0,75 != 1,5; auto-mejoras 1 != 0. comprobar-invocador contiene assert.ok(es.some(e=>e.slow)||true). No se atribuyen automáticamente esos tres fallos a una mecánica rota.

**Reproducir:** Ejecutar los tres scripts antiguos y revisar la aserción de i_ghost.

**Siguiente arreglo:** Actualizar las expectativas de diseño y sustituir las aserciones vacías por efectos/estados medibles. Mantener separadas las pruebas del motor y las visuales.

**Código:** comprobar-invocador.cjs, línea 18 (buscar `assert.ok(es.some(e=>e.slow)||true)`).

## Lo que se confirmó que sí funciona con contexto preparado

| Caso | Resultado observado |
|---|---|
| Resurrección | Revive tras daño letal; no solicita reinicio de la prueba. |
| Dragón esqueleto | Convierte un dragón muerto en una unidad esquelética. |
| Abominación | Aparece cuando hay esqueletos que consumir. |
| Regreso a la naturaleza | Intercambia la posición con el oso y causa daño. |
| Rugido de la Bestia | Consume 5 cargas y activa el estado durante 8,75 s en la prueba. |
| Ondas tectónicas | Registra daño al preparar Rugido con furia. |
| Tótem del trueno, Sobrecarga y Golpe de relámpago | Registran daño con estática/Mojado preparados. |
| Catalizador, Mezcla, Antídoto, Delantal, Gran transmutación y Pandemia | Responden al preparar veneno/charcos/vida perdida. |
| Trampa venenosa | Explota y causa daño cuando un enemigo pisa su posición. |

## Artefactos y repetición

- `node tools/auditar-heroes.cjs`: barrido del motor y `motor.json`.
- `node tools/auditar-casos.cjs`: reproducciones concretas y `casos.json`.
- `node tools/auditar-heroes-navegador.cjs`: Chrome, atlas, poses, galerías y `navegador.json`. Inicia un servidor local temporal para poder exportar las capturas; no modifica ni publica el juego.
- `node tools/generar-informe-auditoria.cjs`: vuelve a generar este informe, la matriz y la galería.

SHA-256 de index.html probado: `270d601382ba90a8fcc1f50681f7f6ef449359314b08d3cc3cf3cc7eab6cf13f`. Coincide entre motor y navegador: **sí**.

No se corrigieron las mecánicas ni los sprites durante esta auditoría. Las pruebas son una revisión amplia con escenarios controlados y capturas, no una demostración exhaustiva de todas las combinaciones posibles, probabilidades, fases de animación o dispositivos físicos. Los cambios posteriores a esta instantánea requieren una nueva pasada.
