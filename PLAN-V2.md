# Mago Infinito v2: plan de desarrollo (arte en PNG + sonido)

## 1. Objetivo
1. Poder sustituir **cualquier gráfico** del juego por un PNG: enemigos, héroes, habilidades y proyectiles, torre, dragón, iconos y efectos.
2. Añadir **sonido**: efectos, música y control de volumen.
3. No romper nada: lo que no tenga PNG o sonido sigue funcionando con el dibujo vectorial actual.

## 2. Qué hay hoy (resultado de la investigación)

| Área | Estado actual | Dónde |
|---|---|---|
| Estructura | **Un solo `index.html` de 617 KB** y unas 7.500 líneas, con un único `<script>` | `index.html:283-7491` |
| Imágenes | Solo el **fondo del mapa**, cargado con `new Image()` y con alternativa si falla | `index.html:4522-4561` |
| Audio | **Nada**: no hay `AudioContext` ni `<audio>` | n/a |
| Enemigos | 33 tipos en el array `EN`. Cada uno se dibuja con una función `FA.<tipo>`; los 8 fotogramas se guardan en caché en `FRM`. El nombre se asocia al sprite con `FOE_MAP` y a la animación de muerte con `FKIND` | `:311`, `:4573-4940` |
| Héroes | 16 héroes. Son muñecos articulados con cinemática inversa, con piezas en `HR` y aspecto en `HBASE`; la pose sale de `heroPose()` | `:2575-3000` |
| Habilidades | Iconos hechos con **emoji** (`n:'🪄 ...'`, `e:'💀'`, `icon:'🧙'`). Los proyectiles se dibujan en `drawSkProj` (un `switch` por habilidad), `drawSkFx` y funciones sueltas como `drawArrow` o `drawAxe` | `:297`, `:2395-2549` |
| Torre y dragón | Dibujadas en vivo con polígonos y degradados (`drawTower`, `drawDragonUnit`) | `:7334`, `:1193-1280` |
| Efectos | Lista `G.fx` con `k:'ring'` (70 usos), `'bolt'` (41), `'p'` (24), etc. | repartido |
| Pruebas | `motor-pruebas.cjs` **lee `index.html`, corta el texto entre `<script>` y `</script>`** y lo ejecuta en `vm` con un canvas falso | `motor-pruebas.cjs` |
| Rendimiento | Modo de baja calidad automático (`LOWQ`), caché de fotogramas de enemigos, gestión de `dpr` | `:562`, `:7422` |

### Hallazgos que condicionan el diseño
1. **El dibujo y la lógica están mezclados.** No existe una capa de render. Cada entidad se dibuja con su propia función.
2. **No hay un punto único donde ocurren los eventos del juego.** Para el sonido hace falta engancharse a golpes, muertes, disparos y compras. Esos puntos existen como funciones (`hitEnemy`, `kill`, `hurt`, `heroDie`, `fireBasic`, `castSkill`, `buy`), pero no hay un sistema de eventos.
3. **Abrir `index.html` con doble clic (`file://`) limita la técnica.** Los módulos ES (`import`) y `fetch()` de JSON **no funcionan** desde `file://`. Cargar PNG con `new Image()` y audio con `<audio>` sí funciona. La decisión de arquitectura depende de esto (ver sección 6).
4. **Dividir el archivo rompe `motor-pruebas.cjs`**, porque asume un solo script. Hay que adaptarlo antes o a la vez.
5. **Los iconos de la interfaz son emoji dentro de cadenas de texto.** Para poner PNG hay que separar el nombre del icono (`n:'🪄 Bastón'` pasa a `n:'Bastón', icon:'staff'`).
6. **Los héroes son esqueletos animados con fórmulas, no fotogramas.** Un PNG fijo no se mueve igual. Hace falta decidir cómo se representan (ver 4.3).

## 3. Arquitectura propuesta

Principio: **registro de recursos + render híbrido + bus de eventos**. Si hay arte, se usa; si no, se usa el dibujo vectorial actual.

```
assets/
  manifest.js          ← lista de recursos (un <script> normal, funciona en file://)
  sprites/
    enemies/<id>.png          (hoja de fotogramas)
    heroes/<id>.png
    skills/<id>.png           (iconos y proyectiles)
    fx/  towers/  dragon/  ui/
  audio/
    sfx/<id>.ogg|mp3
    music/<id>.ogg|mp3
```

### 3.1 Capa de recursos (`Assets`)
- `Assets.load(manifest)` precarga PNG y audio, con barra de progreso en la pantalla de inicio.
- `Assets.sprite(id)` devuelve la imagen o `null`. **Nunca lanza error**: un PNG que falta no rompe el juego.
- `Assets.sound(id)` igual para audio.
- Todo se registra en `manifest.js`, con este formato por sprite:

```js
Assets.sprites = {
  'enemy.skel': { src:'sprites/enemies/skel.png', frames:8, fw:64, fh:64, fps:10, anchor:[.5,.9], scale:1 },
  'skill.arcane': { src:'sprites/skills/arcane.png', frames:1, anchor:[.5,.5], rotate:true },
  'hero.mage': { src:'sprites/heroes/mage.png', ... }
};
```

### 3.2 Render híbrido (`Sprites.draw`)
Una única función `drawSprite(ctx, id, x, y, opts)`:
1. Si `Assets.sprite(id)` existe → dibuja el PNG (fotograma, escala, rotación, volteo, anclaje).
2. Si no → llama al dibujo vectorial actual.

Así se migra **entidad por entidad** sin romper el juego.

### 3.3 Bus de eventos (`Events`)
`Events.emit('hit', {src, type, x, y})`. El sonido y, más adelante, los efectos de partículas escuchan estos eventos. La lógica deja de saber nada de audio.

Eventos mínimos: `shot`, `hit`, `crit`, `kill`, `bossKill`, `heroHurt`, `heroDie`, `towerHurt`, `towerDie`, `cast:<habilidad>`, `levelUp`, `buy`, `roundStart`, `roundEnd`, `uiClick`, `dragonBorn`, `dragonBreath`.

### 3.4 Motor de audio (`Audio`)
- **Web Audio API** (`AudioContext`) con tres buses: `master`, `sfx`, `music`.
- Los sonidos cortos se decodifican a `AudioBuffer`. Esto permite reproducir muchos a la vez.
- **Control de saturación**: máximo de voces simultáneas, límite por sonido (por ejemplo, no más de 3 golpes iguales en 50 ms) y variación leve de tono para que no suene repetitivo. Es imprescindible con cientos de enemigos.
- Sonido posicional sencillo (volumen según distancia al héroe) y prioridad por tipo.
- Música con fundido entre menú, ronda y descanso.
- Ajustes en el menú: volumen general, efectos, música y silencio. Se guardan en `localStorage`.
- Los navegadores bloquean el audio hasta el primer clic. Se activa con el botón "Jugar".

## 4. Diseño de los PNG por tipo de entidad

### 4.1 Enemigos
- Hoja horizontal de **8 fotogramas** (el ciclo actual, `FOE_NF=8`), con una fila opcional para ataque y otra para muerte.
- `foeFrame()` ya devuelve un canvas por fotograma. Se enchufa la hoja ahí y se conserva la caché.
- La animación de muerte (`FKIND`) se mantiene como alternativa, o se sustituye por una fila de fotogramas.
- Los jefes siguen usando corona, aura y orbes de código sobre el PNG, o un PNG propio.

### 4.2 Habilidades y proyectiles
- **Icono** de interfaz (`skill.<id>.icon`, 64×64) que sustituye al emoji.
- **Sprite de proyectil** (`skill.<id>.proj`), con rotación hacia la velocidad (ya existe `atan2(vy,vx)`).
- **Efectos de área** (anillos, rayos): se mantienen vectoriales al principio, y se ofrece sprite opcional.
- Se sustituye el gran `switch` de `drawSkProj` por una tabla `id → dibujador`, con el PNG como primera opción.

### 4.3 Héroes (decisión importante)
Hay tres caminos. Se propone el **B** como primera entrega.

| Opción | Qué es | Pros | Contras |
|---|---|---|---|
| A. Hoja de fotogramas por dirección | Idle/correr/ataque en varias direcciones | Aspecto de juego clásico | Mucho arte (16 héroes × estados × direcciones) |
| **B. Sprite por partes (recomendada)** | Cabeza, torso, brazos, piernas y arma en PNG separados que el esqueleto actual mueve | **Reutiliza toda la animación actual**, poco arte, mismo código de poses | Requiere recortar el arte en piezas |
| C. Un solo PNG con balanceo | Imagen fija con rebote, inclinación y volteo | Muy fácil | Movimiento pobre |

Se implementa **B**, con **C** como atajo para héroes que aún no tengan piezas.

### 4.4 Torre, dragón y fondo
- **Torre:** PNG por piso (base, piso, techo) para apilarlos según `towerFloors()`, más cristal y runas como sprites.
- **Dragón:** PNG por partes (cuerpo, ala, cabeza, cola) para conservar el aleteo, o hoja de fotogramas. Una paleta por tier se puede hacer con un PNG por tier.
- **Fondo:** ya funciona con PNG. Se mueve al manifiesto.

### 4.5 Iconos de interfaz
- Objetos (15), tipos de daño (8), héroes y habilidades pasan de emoji a PNG, con el emoji como alternativa.

## 5. Plan por fases

### Fase 0: preparación (base de todo)
- [ ] Decidir la forma de ejecución (sección 6) y el formato de audio.
- [ ] Separar el código en archivos con `<script>` clásico: `core`, `data`, `render`, `fx`, `ui`, `audio`, `assets`.
- [ ] **Adaptar `motor-pruebas.cjs`** para cargar varios archivos en orden.
- [ ] Arreglar los 3 tests rotos de `PENDIENTE.md` (`comprobar-torre`, `comprobar-progresion`, `comprobar-auto-mejoras`), para tener una red de seguridad fiable antes de refactorizar.
- [ ] Comprobar que el juego se ve y juega igual (captura antes y después, como ya se hace con `previsualizar-*.cjs`).

### Fase 1: capa de recursos y render híbrido
- [ ] `Assets` + `manifest.js` + precarga con barra de progreso.
- [ ] `drawSprite()` con alternativa vectorial.
- [ ] **Primera migración de prueba: 1 enemigo (Esqueleto)** con una hoja de 8 fotogramas, para validar escala, anclaje, volteo y caché.
- [ ] Herramienta de comprobación: un modo `?debug=sprites` que muestre cada entidad con y sin PNG y marque lo que falta.

### Fase 2: bus de eventos y motor de audio
- [ ] `Events.emit` en los puntos de enganche: `fireBasic`/`shot`, `hitEnemy`, `kill`, `hurt`, `heroDie`, `hurtTower`, `castSkill`, `buy`, `startRound`/`endRound`, subida de nivel.
- [ ] `Audio` con buses, límite de voces, limitación por sonido y variación de tono.
- [ ] Menú de volumen y silencio, guardado en `localStorage`.
- [ ] **Sonidos mínimos viables:** golpe, muerte, disparo básico, subida de nivel, compra, ronda nueva, daño al héroe, jefe y música de combate y de descanso.

### Fase 3: migrar el arte, por prioridad
1. **Iconos de habilidades y objetos** (barato, mucho impacto visual en la interfaz).
2. **Enemigos** (33 tipos, uno por uno).
3. **Proyectiles y efectos** de las habilidades generales (12) y del arquero y bárbaro.
4. **Héroes** (opción B, de uno en uno).
5. **Torre y dragón.**
6. **Habilidades de héroe** (los kits de 12 de cada uno) y sonido específico de cada una.

### Fase 4: pulido
- [ ] Rendimiento con PNG: atlas por categoría, límite de memoria y comprobación en móvil.
- [ ] Respetar `LOWQ` (menos fotogramas y efectos si el rendimiento cae).
- [ ] Mezcla final de volúmenes y prioridades de sonido.
- [ ] Actualizar `README.md`, `assets/README.md` y esta guía con el flujo para añadir un PNG o sonido nuevo.

## 6. Decisiones que necesito de ti
1. **¿Seguirá abriéndose con doble clic (`file://`) o aceptas un servidor local?**
   - Con doble clic: archivos clásicos y `manifest.js`, sin módulos ES. Es la opción recomendada, porque respeta el README actual.
   - Con servidor local (por ejemplo `npx serve`): módulos ES y manifiesto `.json`, más limpio, pero ya no basta con abrir el archivo.
2. **¿Quién crea el arte?** Una IA de imágenes, un artista o recursos libres. Esto cambia el tamaño estándar, el estilo y la cantidad de trabajo.
3. **Héroes: opción A, B o C** de la sección 4.3. Recomiendo B.
4. **Formato de audio:** `.ogg` (mejor compresión, no funciona en Safari antiguo) o `.mp3` (universal). Recomiendo `.mp3`, o ambos.
5. **¿Los sonidos son tuyos o los busco?** Puedo proponer una lista de sonidos con nombre y duración, o usar sonidos generados con código para empezar.
6. **Tamaño de sprite estándar** (por ejemplo 64×64 para enemigos normales, 128×128 para jefes).

## 7. Riesgos
| Riesgo | Efecto | Mitigación |
|---|---|---|
| Refactor grande de un archivo de 7.500 líneas | Romper el juego | Fase 0 con pruebas y capturas. Cambios pequeños y frecuentes |
| Cientos de enemigos con PNG | Bajo rendimiento y mucha memoria | Atlas, caché de fotogramas (ya existe) y `LOWQ` |
| Saturación de sonido | Ruido y picos de CPU | Límite de voces y limitación por sonido |
| PNG que no coinciden con las animaciones del héroe | Se ve mal | Opción B (por partes) y herramienta de depuración |
| `file://` y módulos | No cargan | Decisión 1 de la sección 6 |
| Mucho arte pendiente | Retraso | Alternativa vectorial: se migra a medida que llega el arte |

## 8. Criterios de aceptación de la v2
- Soltar un PNG en la carpeta y anotarlo en el manifiesto lo muestra en el juego, sin tocar el código.
- Sin ningún PNG ni sonido, el juego se ve y juega igual que hoy.
- Con 100+ enemigos en pantalla se mantiene la fluidez actual.
- Menú con volumen general, efectos, música y silencio, que se recuerda al volver.
- Pruebas automáticas en verde y documentación de cómo añadir recursos.
