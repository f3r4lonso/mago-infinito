# Sprites de héroes unificados (rehacer los 16)

Objetivo: que los 16 héroes tengan **la misma resolución, tamaños proporcionales y el mismo conjunto de movimientos**, fáciles de recortar con una herramienta automática y que una IA de imágenes (gratis o de pago) pueda producir. Después nosotros completamos las animaciones intermedias.
Todos los diseños son originales: **no se cita ningún juego, serie ni personaje existente**.

## 1. Especificación técnica (igual para todos)

| Concepto | Valor |
|---|---|
| Vista | Lateral mirando a la **derecha** (el juego la voltea para la izquierda). Nada de vista cenital. |
| Celda de fotograma | **256 × 256 px** (héroes XL y cuadrúpedos: 384 × 256). |
| Línea del suelo | Los pies siempre en **y = 224** de la celda; eje del cuerpo en **x = 128**. |
| Margen | Mínimo 16 px a cada lado; el arma y los efectos pequeños dentro de la celda. |
| Fondo | Magenta liso **#FF00FF**, sin degradados, sin sombra de suelo, sin cuadrícula, sin texto. |
| Estilo | Pixel art 2D, contorno oscuro de 1 px, 3 tonos de sombreado por color, luz arriba a la izquierda, máximo 32 colores por héroe, sin desenfoque ni antialiasing. |
| Orden de los fotogramas | Una **fila horizontal por animación**, celdas del mismo tamaño pegadas, sin solaparse. |

### Alturas proporcionales (de la cabeza a los pies, en px de la celda)

| Clase | Altura | Héroes |
|---|---|---|
| S | 120 | enano artillero |
| M | 150 | mago invocador, arquero elfo, nigromante, asesino, sacerdote (144), druida (156), cazador de demonios (156) |
| L | 176–190 | alquimista orco (176), hombre lobo (176), chamán troll (178), monje panda (180), caballero dragón (184), troll cazador (184), orco guerrero (190) |
| XL | 210 (celda 384×256) | devorador (cuadrúpedo: altura al lomo 150, largo 230) |

Regla de proporción: cabeza ≈ 1/4,5 de la altura en M, 1/4 en L, 1/3,5 en S. Mantén la misma proporción entre animaciones del mismo héroe.

## 2. Conjunto de animaciones (el mismo para los 16)

| Animación | Fotogramas finales | Claves que se piden a la IA | Notas |
|---|---|---|---|
| idle | 6 (ciclo) | 2 | Respiración suave; el arma se mueve poco. |
| walk | 8 (ciclo) | 4 | Contacto, bajada, paso, subida; mismo largo de paso en todos. |
| attack_a | 6 | 4 | Golpe o disparo principal. **Fotograma de impacto = el 4.** |
| attack_b | 6 | 4 | Variante alterna del ataque. Impacto = el 4. |
| attack_c | 6 | 4 | Tercer ataque (más potente). Impacto = el 4. |
| cast_a | 6 | 3 | Habilidad rápida. Efecto = el 4. |
| cast_b | 6 | 3 | Habilidad larga / canalizada (los últimos fotogramas repetibles). |
| hurt | 3 | 1 | Retroceso del golpe. |
| death | 6 | 3 | Cae y queda en el suelo; el último fotograma es estático. |

**Total por héroe: 47 fotogramas finales, 24 claves** (nosotros hacemos los intermedios).
Tiempo estándar: idle 4 f/s, walk 9 f/s, ataques 0,38 s en total.

### Héroes con transformación: set extra (también 29 fotogramas finales)
idle 6, walk 8, attack 6, cast 6, hurt 3 de la forma transformada, con la misma línea del suelo y su propia altura (ver tabla):
- caballero dragón → dragón (celda 384×256, vuela: línea del suelo al centro, mismas 5 animaciones).
- cazador de demonios → demonio alado (clase L, 190).
- hombre lobo → lobo gigante (cuadrúpedo, altura al lomo 110, celda 384×256).
- druida → oso colosal bípedo (clase L, 200).

## 3. Cómo pedirlo a la IA (flujo recomendado)

1. **Hoja de referencia** del héroe (una sola imagen): vista de frente, de lado derecho y de espaldas, pose neutra, sin arma levantada, fondo magenta. Fija diseño, colores y proporción. Úsala como imagen de referencia en todos los pasos siguientes.
2. **Una animación por imagen**, usando la referencia, con el PROMPT BASE + bloque del héroe + bloque de animación. Pide siempre *el mismo seed / la misma referencia*.
3. Si la IA no respeta la cuadrícula, pide **un fotograma por imagen** (mismo prompt con "fotograma N de M") y nosotros los unimos.
4. Pide solo las **claves** de la tabla; los intermedios los completamos nosotros.
5. Revisa que cada fotograma cumpla: pies en y=224, mismo tamaño, contorno completo, nada fuera de la celda.

## 4. PROMPT BASE (pegar siempre)

```
Hoja de sprites para videojuego 2D, pixel art, personaje visto de lado mirando a la derecha, cuerpo completo siempre visible.
Fotogramas en UNA fila horizontal, celdas cuadradas iguales de 256x256 px, el personaje con los pies exactamente en la misma línea del suelo en todas las celdas, centrado, mismo tamaño en todos los fotogramas, sin tocar los bordes de la celda ni la celda vecina.
Fondo liso magenta #FF00FF en toda la imagen, sin sombra de suelo, sin degradados, sin cuadrícula, sin marcos, sin texto, sin números.
Contorno oscuro de 1 px, 3 tonos de sombreado por color, luz desde arriba a la izquierda, paleta limitada de 32 colores, sin desenfoque ni antialiasing, sin render 3D, sin fotografía.
Diseño original, no copiar ningún personaje existente.
```

## 5. Bloques de animación (pegar uno tras el base)

- **idle (6, ciclo):** de pie, pose de combate relajada; el pecho sube y baja 2 px, el arma o la capa se mueven apenas; el fotograma 6 enlaza con el 1.
- **walk (8, ciclo):** caminata lateral; claves 1 contacto con pie delantero, 3 bajada, 5 contacto con el otro pie, 7 subida; el torso avanza 1 px por fotograma, brazos opuestos a las piernas; ciclo cerrado.
- **attack_a (6):** 1 preparación (se encoge), 2 armado hacia atrás, 3 salida rápida, 4 **IMPACTO** con el cuerpo estirado y el arma en el punto de contacto al frente, 5 seguimiento, 6 recuperación. Ranged: 4 = el proyectil sale del arma.
- **attack_b (6):** igual estructura que attack_a pero con otro gesto (otro lado del cuerpo o golpe en diagonal); impacto en el 4.
- **attack_c (6):** el ataque más potente: preparación más larga y exagerada, impacto fuerte en el 4, recuperación pesada.
- **cast_a (6):** gesto de habilidad rápida: 1-2 reúne energía, 3 sube el brazo o el arma, 4 **LIBERA** con el cuerpo estirado hacia delante, 5-6 baja.
- **cast_b (6):** habilidad larga: 1-2 reúne, 3-5 sostiene con el cuerpo brillando (fotogramas 4 y 5 repetibles), 6 suelta.
- **hurt (3):** 1 impacto con el cuerpo echado hacia atrás y los ojos entrecerrados, 2 máximo retroceso, 3 vuelve a la guardia.
- **death (6):** 1 golpe mortal, 2 rodillas, 3 cae hacia atrás, 4 en el suelo, 5-6 quieto y plano; el arma cae al lado.

## 6. Bloque del héroe (pegar tras el base y el bloque de animación)

Formato: **clase y altura · descripción del personaje · ataques · habilidades.**

- **Mago invocador (M 150):** hombre rubio con túnica larga morada y dorada, cuello alto, tres orbes pequeños de energía (azul, rosa y naranja) flotando alrededor del torso. Ataques: dispara orbes con una mano extendida. Habilidades: eleva ambas manos, invoca con los orbes brillando.
- **Arquero elfo (M 150):** elfa de pelo largo rubio, capa verde, jubón verde oscuro, botas marrones, arco largo, carcaj a la espalda. Ataques: tensa el arco y dispara; ataque b: dos flechas; ataque c: disparo cargado con el cuerpo inclinado. Habilidades: gesto de la mano libre al aire, giro rápido.
- **Nigromante (M 150):** esquelético con túnica azul oscura, capucha, bastón terminado en una calavera con llama espectral verde. Ataques: lanza el bastón al frente con llama verde. Habilidades: levanta el bastón y la mano libre, invoca.
- **Enano artillero (S 120):** enano de barba blanca con gorro rojo, gafas, mochila de municiones, fusil largo de francotirador. Ataques: apunta y dispara con retroceso. Habilidades: lanza una granada, planta una mina.
- **Orco guerrero (L 190):** orco de piel roja musculoso con hombrera de pinchos, cinturón ancho, hacha de guerra grande. Ataques: tres tajos distintos de hacha. Habilidades: rugido con los brazos arriba, giro con el hacha.
- **Cazador de demonios (M 156):** esbelta de piel morada, pelo negro con coleta alta, venda en los ojos, dos hojas curvas verdes en los antebrazos. Ataques: tajos cruzados con las hojas. Habilidades: lanza hojas, paso de sombra.
- **Sacerdote (M 144):** hombre joven de pelo castaño con túnica blanca con cruz dorada, bastón dorado y libro en el cinturón. Ataques: golpe de bastón con arco de luz. Habilidades: bastón al frente con luz, curación con la mano abierta.
- **Monje panda (L 180):** panda gordo con chaleco rojo, faja, barril de madera a la espalda, bastón largo. Ataques: bastonazos y puñetazos rápidos. Habilidades: lanza el barril, giro con el bastón.
- **Caballero dragón (L 184):** caballero de armadura roja con detalles dorados, yelmo con cuernos, escudo con un emblema, espada ancha. Ataques: tajo, estocada y golpe de escudo. Habilidades: aliento de fuego, invocar la transformación.
- **Troll cazador (L 184):** troll de piel azul grisácea con cresta roja, vendajes rojos, lanza de punta roja. Ataques: estocada, lanzamiento de lanza. Habilidades: lluvia de lanzas, furia con aura roja.
- **Hombre lobo (L 176):** hombre de barba con abrigo de pelo gris y capa roja, manos con garras. Ataques: zarpazos alternados. Habilidades: aullido, salto con embestida.
- **Druida (M 156):** anciano de barba blanca con cuernos de ciervo, capa verde de hojas, bastón con gema verde. Ataques: bastonazo con estela verde. Habilidades: levanta el bastón y brotan raíces.
- **Devorador (XL 210, cuadrúpedo):** bestia cuadrúpeda enorme de piel marrón rojiza con púas dorsales, cuernos y garras. Ataques: zarpazo, mordida. Habilidades: rugido erguido, embestida, pisotón.
- **Chamán troll (L 178):** troll de piel verdosa con melena de rastas, cráneo en el bastón, adornos de huesos. Ataques: golpe de bastón con chispa. Habilidades: levanta el bastón con aura verde, curación.
- **Asesino (M 150):** figura encapuchada de armadura negra azulada con casco de visera, dos dagas curvas largas en las manos. Ataques: tajos rápidos cruzados. Habilidades: paso sombrío, cuchillas giratorias.
- **Alquimista (L 176):** orco de piel verde con mochila de tubos y frascos, delantal de cuero, goggles. Ataques: lanza frascos. Habilidades: mezcla de frascos de colores.

## 7. Qué recibimos y cómo lo usamos

Entrega por héroe: una imagen por animación (idle, walk, attack_a/b/c, cast_a/b, hurt, death; y las de la forma si tiene) + la hoja de referencia.
Nuestra herramienta recorta por celdas fijas de 256 px usando la línea del suelo y el eje central; por eso la **consistencia de pies y centro** es lo más importante. Si algo sale desalineado, mejor regenerar esa animación que corregirla a mano.
