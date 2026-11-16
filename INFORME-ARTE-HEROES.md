# Prueba del arte de los héroes

Solo se probó lo que ya tiene arte PNG. Las habilidades que todavía se dibujan por código (11 héroes sin hojas de efectos) **no se probaron**.

Repetir la prueba: `node tools/probar-arte-heroes.cjs [héroe …]`. Genera `auditoria-arte/<héroe>.png` (una fila por habilidad, 6 fotogramas) y `auditoria-arte/resultados.json`.

## Qué se probó
- **Cuerpo de los 16 héroes:** reposo, caminar, ataque y recibir daño. Además, la forma o el sigilo en druida, hombre lobo, cazador de demonios, paladín, asesino y bestia abisal.
- **Ataque básico de los 16 héroes.**
- **82 pruebas de habilidad con arte** en Chrome real, a nivel 20, con objetivos preparados por el modo test:
  - Mago (12) y alquimista (12).
  - Asesino (7 con efecto, más el clon), arquero (8, más el halcón) y orco (8).
  - Invocaciones de los demás: nigromante (5), druida, hombre lobo, panda, troll, enano, chamán y sacerdote.
- **Cómo se midió:** ¿se lanza?, ¿hace daño?, ¿invoca?, ¿usa sprites que no existen?, ¿lanza excepciones?, ¿quedan valores no finitos? Y se revisaron a ojo los 6 fotogramas de cada una.

## Resultado
No hubo excepciones, sprites inexistentes ni valores no finitos en las 82 pruebas. Todas las habilidades hacen lo que dicen. Se encontraron y corrigieron 8 fallos, uno de ellos grave.

| # | Gravedad | Fallo | Estado |
|---|---|---|---|
| 1 | Alta | El asesino lanzaba un error al dibujarse sin partida (pantalla de selección de héroe). Lo introduje yo con el sigilo transparente. | Corregido |
| 2 | Media | El anillo de Alacridad y el fantasma de Paso fantasma se quedaban en el sitio de lanzamiento y no seguían al mago. | Corregido |
| 3 | Media | Ráfaga del arquero: conos enormes con una neblina morada alrededor. | Conos un 30 % más pequeños y neblina recortada. La mezcla de verde y violeta es del propio dibujo. |
| 4 | Media | Furia del orco casi invisible. | Aura más grande y más opaca |
| 5 | Baja | Llamada de batalla (anillos morados enormes) y Danza de la cuchilla tapaban demasiado. | Menos tamaño y menos opacidad |
| 6 | Baja | Campo de hielo: neblina blanca que cubría la zona. | Más transparente |
| 7 | Baja | Gas del alquimista y aceite muy opacos. | Más transparentes |
| 8 | Prueba | Abominación, Levantar esqueletos y Dragón esqueleto no se podían probar aisladas. | El modo test ahora prepara esqueletos, una baja y un dragón muerto. |

## Comprobado a ojo y correcto
- **Cuerpos:** los 16 se ven bien en las cuatro poses. Las formas escalan (oso ×1,38, lobo ×1,32) y el asesino se vuelve casi transparente con Invisibilidad. El destello de la forma apenas se nota en las capturas.
- **Mago:** las 12 habilidades se ven y hacen daño o efecto. Paso fantasma y Alacridad no dañan, como corresponde.
- **Alquimista:** charcos de ácido, aceite, gas, explosiones y toque de oro correctos.
- **Asesino:** trampas, humo, estela, tajos, dagas, calavera de marca y clon correctos.
- **Arquero:** grillete, disparo potente, carrera del viento, aura y fuego concentrado correctos.
- **Orco:** torbellino, decapitador, berserker, grito, garras, jabalí y rugido correctos.
- **Invocaciones:** momias, ents, oso, lobos, crías de panda, raptor, torreta, tótems y ángel aparecen y atacan.

## Observaciones sin arreglar
- **Dragón esqueleto y minas del enano:** funcionan, pero el recorte de la captura sigue al héroe, que se aleja, así que no pude verlos bien. No es un fallo del juego.
- **Paladín y bestia abisal:** no tienen sprite de golpe propio. El efecto del ataque viene dibujado en la pose de ataque.
- **Panda:** su pose de ataque se queda casi todo el rato porque ataca sin parar; es normal.
- **Ráfaga (arquero):** sigue siendo muy vistosa.
- **Gigantes y destellos:** el rayo solar y el pulso electromagnético del mago siguen siendo grandes. No se tocó su radio.
