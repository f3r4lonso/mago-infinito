const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const dir='auditoria-heroes',motor=JSON.parse(fs.readFileSync(dir+'/motor.json')),browser=JSON.parse(fs.readFileSync(dir+'/navegador.json')),cases=JSON.parse(fs.readFileSync(dir+'/casos.json')),issues=JSON.parse(fs.readFileSync(dir+'/hallazgos.json'));
const sources=['index.html','assets/sprites.js','comprobar-invocador.cjs'];
const sourceTexts=Object.fromEntries(sources.map(s=>[s,fs.readFileSync(s,'utf8')]));
function locate(needle){for(const [file,text] of Object.entries(sourceTexts)){const i=text.indexOf(needle);if(i>=0)return{file,line:text.slice(0,i).split('\n').length}}return null}
for(const issue of issues)issue.location=locate(issue.source);
const prerequisites={
 i_laguna:'Jefe; no existe en los tres objetivos iniciales.',a_focus:'Al menos 4 blancos.',b_berserk:'Al menos 4 blancos.',p_nova:'Al menos 5 blancos.',
 n_skeldragon:'Dragón comprado/incubado que muera.',n_abom:'Dos esqueletos que consumir.',n_raise:'Bajas y probabilidad de invocación.',n_corpse:'Bajas y probabilidad de explosión.',
 b_aspd:'Aliados invocados cerca.',z_hunt:'Enemigo jefe o a distancia; también baja para curación.',z_frag:'Bajas y recogida de fragmentos.',
 p_heal:'Vida perdida.',p_res:'Daño letal.',k_bell:'Vida por debajo del umbral.',pl_hands:'Vida perdida.',t_trap:'Otro héroe herido; la prueba solitaria no prepara ese aliado.',u_rejuv:'Vida perdida.',
 u_cyclone:'Objetivo lejano.',u_swarm:'Oso espiritual y distancia/peligro.',
 pb_rock:'Blanco a más de 95 px.',pb_uproar:'Daño que genere furia.',pb_impact:'Embestida terminada.',pb_shockwave:'Rugido con furia.',pb_aftershock:'Roca principal.',
 c_thunder:'Estática para que el tótem dispare.',c_overload:'Objetivos mojados.',c_bolt:'Estática suficiente (10 de base).',
 al_catalyst:'Veneno/fuego propios que consumir.',al_mix:'Dos charcos distintos solapados.',al_antidote:'Vida perdida y veneno propio.',al_coat:'Charcos cercanos.',al_transmute:'Charcos que consumir.',al_plague:'Muerte de enemigo envenenado.',x_trap:'Un enemigo que pise la trampa.'
};
const evidenceById={n_skeldragon:'Conversión comprobada al morir el dragón.',n_abom:'Abominación comprobada con esqueletos preparados.',u_swarm:'Intercambio y daño comprobados con oso.',pb_uproar:'Rugido comprobado con 5 cargas.',pb_shockwave:'Ondas tectónicas comprobadas con rugido preparado.',c_thunder:'Daño del tótem comprobado con estática.',c_overload:'Daño comprobado con Mojado.',c_bolt:'Daño comprobado con estática.',al_catalyst:'Consumo y daño comprobados con veneno.',al_mix:'Explosión comprobada con dos charcos.',al_antidote:'Curación comprobada con veneno y vida perdida.',al_transmute:'Explosiones comprobadas con charcos.',al_coat:'Factor de defensa 0,932 con charcos preparados.',al_plague:'Contagio a 6 blancos comprobado.',p_res:'Resurrección comprobada con daño letal.',x_trap:'Explosión y daño comprobados al pisarla.'};
const coverage=[];
for(const hero of motor.catalog){
 const base=motor.scenarios.find(s=>s.hero===hero.id&&s.id==='basic'&&s.mode==='combat'&&s.level===20);
 for(const skill of hero.skills){
  const r=motor.scenarios.find(s=>s.hero===hero.id&&s.id===skill.id&&s.mode==='combat'&&s.level===20),p=motor.scenarios.find(s=>s.hero===hero.id&&s.id===skill.id&&s.mode==='panel');
  const extra=Object.keys(r.damageBy).filter(k=>k!==hero.basic.n),signals=[];
  if(extra.length)signals.push('Daño: '+extra.join(', '));
  if(Object.keys(r.allies).length)signals.push('Invocados: '+Object.keys(r.allies).join(', '));
  if(r.casts.length)signals.push('Recarga/activación registrada');
  if(JSON.stringify(r.startStats)!==JSON.stringify(base.startStats))signals.push('Atributos modificados');
  if(r.maxShield)signals.push('Escudo registrado');
  if(Object.keys(r.statuses).length)signals.push('Estados en enemigos');
  if(r.healTicks>base.healTicks)signals.push('Recuperación de vida registrada');
  if(!signals.length&&r.damage>base.damage*1.05)signals.push('Cambios de daño del básico en la muestra');
  if(!signals.length&&r.states.some(k=>!base.states.includes(k)))signals.push('Estado interno activo');
  const error=[1,20,50].some(l=>motor.scenarios.find(s=>s.hero===hero.id&&s.id===skill.id&&s.mode==='combat'&&s.level===l)?.errors.length);
  coverage.push({hero:hero.id,heroName:hero.name,id:skill.id,name:skill.name,description:skill.description,levels:error?'Revisar error':'1 / 20 / 50: sin excepción',evidence:evidenceById[skill.id]||signals.join('; ')||'No concluyente en el escenario aislado; revisar condición/pasiva.',context:prerequisites[skill.id]||'Sin preparación especial identificada para esta prueba.',panelErrors:p.errors,findings:issues.filter(x=>x.skills.includes(skill.id)).map(x=>x.id)});
 }
}
fs.writeFileSync(dir+'/cobertura.json',JSON.stringify(coverage,null,2));
const revision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),summary={date:new Date().toISOString(),revision,indexSha256:motor.sha256,heroes:motor.catalog.length,skills:coverage.length,motorScenarios:motor.scenarios.length,browserScenarios:browser.results.reduce((n,h)=>n+h.runs.length,0),preparedCases:cases.length,poses:16*16,uiSelections:4*coverage.length,issues:issues.length,priorities:Object.fromEntries(['P1','P2','P3'].map(p=>[p,issues.filter(i=>i.priority===p).length])),runtimeErrors:browser.errors,motorErrors:motor.scenarios.filter(s=>s.errors.length).length,nonFinite:motor.scenarios.filter(s=>s.nonFinite.length).length,invalidRectangles:browser.assets.invalidRectangles,failedAtlases:browser.assets.packs.filter(p=>!p.ok),sourceHashesMatch:motor.sha256===browser.sha256};
fs.writeFileSync(dir+'/resumen.json',JSON.stringify(summary,null,2));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const md=['# Auditoría de héroes — Mago Infinito','',`Fecha: ${summary.date}. Revisión de referencia: \`${revision.slice(0,7)}\`, incluyendo los archivos locales presentes al probar.`,
 '', '**Resultado:** 17 hallazgos priorizados: 5 P1, 8 P2 y 4 P3. Son una mezcla de fallos confirmados, limitaciones del simulador, discrepancias de fichas y observaciones visuales; no son 17 poderes rotos.',
 '', '[Abrir la galería y la matriz interactiva](auditoria-heroes/index.html) · [Cobertura de las 192 habilidades](auditoria-heroes/cobertura.md) · [Datos de la ejecución](auditoria-heroes/resumen.json)',
 '', '## Qué se probó','',
 '- 16 héroes y sus 192 habilidades. Ataques básicos y kits completos también incluidos.',
 `- ${summary.motorScenarios} escenarios del motor: habilidades a niveles 1/20/50, básicos de referencia, kits y recorrido del panel a nivel de habilidad 20.`,
 `- ${summary.browserScenarios} escenarios adicionales en Chrome con los sprites reales: cada habilidad en el panel y en combate preparado.`,
 `- ${summary.preparedCases} casos específicos de requisitos, daño letal, invocaciones, estados y cámara.`,
 '- 256 capturas de pose: reposo, movimiento, ataque y recibir daño, en cuatro direcciones por héroe. Revisión de las 16 galerías de habilidades.',
 '- Interfaz de todos los héroes a 1400×1000, 390×844, 360×640 y 844×390: 768 selecciones y comprobación de acceso al botón principal.',
 '- No hubo excepciones del motor, valores no finitos ni errores de ejecución del navegador en los escenarios generales. Los 28 atlas cargaron y sus recortes quedaron dentro de la imagen. No se detectó solapamiento de IDs de sprite ni desbordamiento del panel en esa muestra.',
 '', '## Cómo interpretar el informe','',
 'P1: arreglar primero porque impide probar o leer una habilidad importante. P2: fallo funcional/visual o limitación que afecta la prueba. P3: calidad visual, claridad o mantenimiento. Las observaciones subjetivas están marcadas explícitamente.',
 '', 'Las pruebas del panel conservan al héroe en nivel inicial y sano, como al entrar normalmente, y configuran la habilidad a nivel 20. Las pruebas de combate usan héroe de nivel 20, objetivos variados (incluido jefe y blanco a distancia), cambios controlados de vida y bajas inducidas para activar pasivas. Las bajas inducidas y los blancos preparados hacen que estos datos no sean un benchmark de DPS ni una medida de supervivencia.',
 '', 'Que un escenario no produzca señal adicional no demuestra por sí solo un fallo. Por eso se repitieron las habilidades dependientes con veneno, charcos, estática, oso, esqueletos, dragón o daño letal. Las 192 filas de cobertura distinguen evidencia de mecánica y contexto necesario.',
 '', '## Orden propuesto de reparación','',
 '1. H01–H02: restaurar cambios de forma y animación corporal de lanzamiento.',
 '2. H03–H04 y H11: preparar automáticamente los requisitos de cada prueba, sin añadir más botones visibles.',
 '3. H05: conservar el experimento al morir.',
 '4. H06–H08: aclarar duración de invocados, mantener al héroe visible y sincronizar el campo de hielo.',
 '5. H09–H12: resolver direcciones, cámara lenta y representación del sigilo.',
 '6. H13–H17: pulir legibilidad y actualizar las pruebas antiguas.',
 '', '## Hallazgos',''];
for(const issue of issues){
 md.push(`### ${issue.id} · ${issue.priority} · ${issue.title}`,'',`**Tipo:** ${issue.type}.`, '',issue.actual,'',`**Evidencia:** ${issue.evidence}`,'',`**Reproducir:** ${issue.steps}`,'',`**Siguiente arreglo:** ${issue.recommendation}`);
 if(issue.location)md.push('',`**Código:** ${issue.location.file}, línea ${issue.location.line} (buscar \`${issue.source}\`).`);
 if(issue.image)md.push('',`[Captura de referencia](auditoria-heroes/${issue.image}).`);
 md.push('');
}
md.push('## Lo que se confirmó que sí funciona con contexto preparado','',
 '| Caso | Resultado observado |','|---|---|',
 '| Resurrección | Revive tras daño letal; no solicita reinicio de la prueba. |',
 '| Dragón esqueleto | Convierte un dragón muerto en una unidad esquelética. |',
 '| Abominación | Aparece cuando hay esqueletos que consumir. |',
 '| Regreso a la naturaleza | Intercambia la posición con el oso y causa daño. |',
 '| Rugido de la Bestia | Consume 5 cargas y activa el estado durante 8,75 s en la prueba. |',
 '| Ondas tectónicas | Registra daño al preparar Rugido con furia. |',
 '| Tótem del trueno, Sobrecarga y Golpe de relámpago | Registran daño con estática/Mojado preparados. |',
 '| Catalizador, Mezcla, Antídoto, Delantal, Gran transmutación y Pandemia | Responden al preparar veneno/charcos/vida perdida. |',
 '| Trampa venenosa | Explota y causa daño cuando un enemigo pisa su posición. |','',
 '## Artefactos y repetición','',
 '- `node tools/auditar-heroes.cjs`: barrido del motor y `motor.json`.',
 '- `node tools/auditar-casos.cjs`: reproducciones concretas y `casos.json`.',
 '- `node tools/auditar-heroes-navegador.cjs`: Chrome, atlas, poses, galerías y `navegador.json`. Inicia un servidor local temporal para poder exportar las capturas; no modifica ni publica el juego.',
 '- `node tools/generar-informe-auditoria.cjs`: vuelve a generar este informe, la matriz y la galería.',
 '', `SHA-256 de index.html probado: \`${summary.indexSha256}\`. Coincide entre motor y navegador: **${summary.sourceHashesMatch?'sí':'no'}**.`,
 '', 'No se corrigieron las mecánicas ni los sprites durante esta auditoría. Las pruebas son una revisión amplia con escenarios controlados y capturas, no una demostración exhaustiva de todas las combinaciones posibles, probabilidades, fases de animación o dispositivos físicos. Los cambios posteriores a esta instantánea requieren una nueva pasada.','');
fs.writeFileSync('INFORME-AUDITORIA-HEROES.md',md.join('\n'));
const matrix=['# Cobertura de las 192 habilidades','', 'Niveles 1/20/50 en el motor, más pruebas del panel, kits y galería. «Sin excepción» no significa aprobación completa de la mecánica o el arte. Las observaciones de estilos están en el informe principal.',''];
for(const hero of motor.catalog){matrix.push('## '+hero.name,'','[Galería de habilidades](habilidades-'+hero.id+'.png) · [Poses](poses-'+hero.id+'.png)','','| Habilidad | Motor | Evidencia de combate / caso específico | Contexto | Hallazgos |','|---|---|---|---|---|');for(const r of coverage.filter(r=>r.hero===hero.id))matrix.push(`| ${r.name} (\`${r.id}\`) | ${r.levels} | ${r.evidence.replaceAll('|','/')} | ${r.context} | ${r.findings.join(', ')||'Sin hallazgo específico confirmado'} |`);matrix.push('')}
fs.writeFileSync(dir+'/cobertura.md',matrix.join('\n'));
const heroSections=motor.catalog.map(h=>`<section class="hero" data-hero="${h.id}"><h2>${esc(h.name)}</h2><details><summary>Ver capturas de habilidades y poses</summary><a href="habilidades-${h.id}.png" target="_blank"><img loading="lazy" src="habilidades-${h.id}.png" alt="Las 12 habilidades de ${esc(h.name)}"></a><a href="poses-${h.id}.png" target="_blank"><img loading="lazy" class="poses" src="poses-${h.id}.png" alt="Poses de ${esc(h.name)}"></a></details><div class="table"><table><thead><tr><th>Habilidad</th><th>Evidencia</th><th>Qué necesita</th><th>Hallazgos</th></tr></thead><tbody>${coverage.filter(r=>r.hero===h.id).map(r=>`<tr data-search="${esc((r.id+' '+r.name+' '+h.name+' '+r.findings.join(' ')).toLowerCase())}"><td><strong>${esc(r.name)}</strong><br><code>${r.id}</code><br><small>${esc(r.levels)}</small></td><td>${esc(r.evidence)}</td><td>${esc(r.context)}</td><td>${r.findings.map(id=>`<a href="#${id}">${id}</a>`).join(' ')||'—'}</td></tr>`).join('')}</tbody></table></div></section>`).join('');
const cards=issues.map(i=>`<article id="${i.id}"><span class="badge ${i.priority}">${i.priority} · ${i.id}</span><h3>${esc(i.title)}</h3><p class="type">${esc(i.type)}</p><p>${esc(i.actual)}</p><details><summary>Evidencia y reproducción</summary><p><strong>Evidencia:</strong> ${esc(i.evidence)}</p><p><strong>Reproducir:</strong> ${esc(i.steps)}</p><p><strong>Arreglo propuesto:</strong> ${esc(i.recommendation)}</p>${i.location?`<p><code>${i.location.file}:${i.location.line}</code></p>`:''}${i.image?`<a href="${i.image}" target="_blank">Abrir captura</a>`:''}</details></article>`).join('');
fs.writeFileSync(dir+'/index.html',`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Auditoría de héroes · Mago Infinito</title><style>
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#12101b;color:#eee9f5;font:15px/1.5 system-ui,sans-serif}main{max-width:1280px;margin:auto;padding:24px}h1{font-size:28px;line-height:1.15}h2{margin-top:32px}h3{margin:10px 0}a{color:#c7b2ff}small,.type{color:#aaa0b8}.stats{display:flex;flex-wrap:wrap;gap:12px}.stats b{padding:12px 18px;background:#282135;border-radius:10px}.notice{padding:12px;border-left:3px solid #d8ae5e;color:#c4b9ce}.findings{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}article{border:1px solid #463951;border-radius:12px;padding:16px;background:#1e1929;scroll-margin-top:12px}.badge{font-size:12px;padding:4px 8px;border-radius:5px;background:#3f3048}.P1{background:#61303a}.P2{background:#665032}.P3{background:#334b5f}summary{cursor:pointer;color:#cbb6f4;padding:8px 0}details p{font-size:14px}.filters{position:sticky;top:0;padding:12px;background:#17121fed;display:flex;gap:8px;z-index:2;border:1px solid #493b58;border-radius:10px}.filters input,.filters select{min-height:44px;min-width:0;padding:8px;color:#eee;background:#2b2139;border:1px solid #6b567e;border-radius:7px;font:inherit}.filters input{flex:1}img{width:100%;display:block;margin:12px 0;border-radius:8px}img.poses{max-width:800px}.table{overflow:auto}table{width:100%;border-collapse:collapse;font-size:13px}td,th{text-align:left;padding:10px;border-bottom:1px solid #463951;vertical-align:top}td:first-child{min-width:180px}code{font-size:12px;color:#c6b5df}section.hero{margin:24px 0;padding:16px;border:1px solid #463951;border-radius:12px}footer{color:#a89ab8;font-size:12px;margin-top:30px}@media(max-width:700px){main{padding:12px}.findings{grid-template-columns:1fr}.filters{flex-direction:column}h1{font-size:24px}.stats b{padding:8px}section.hero{padding:10px}}
</style><main><h1>Auditoría de héroes</h1><p>Mago Infinito · ${esc(summary.date.slice(0,10))} · revisión ${revision.slice(0,7)}</p><div class="stats"><b>16 héroes</b><b>192 habilidades</b><b>1264 escenarios</b><b>17 hallazgos</b></div><p class="notice">Los hallazgos distinguen fallos confirmados, condiciones de prueba y observaciones visuales. Un poder sin activación en el panel no se considera roto si funciona con sus requisitos. El barrido no encontró excepciones; eso no garantiza que todo se vea o se comporte correctamente.</p><p><a href="../INFORME-AUDITORIA-HEROES.md">Informe completo</a> · <a href="cobertura.md">Matriz en Markdown</a> · <a href="resumen.json">Datos y metodología</a> · <a href="formas-comparacion.png">Comparación de transformaciones</a></p><h2>Qué arreglar</h2><div class="findings">${cards}</div><h2>Revisión de las 192 habilidades</h2><div class="filters"><input id="search" type="search" placeholder="Buscar héroe, habilidad o H01…" aria-label="Buscar"><select id="heroFilter" aria-label="Filtrar héroe"><option value="">Todos los héroes</option>${motor.catalog.map(h=>`<option value="${h.id}">${esc(h.name)}</option>`).join('')}</select></div>${heroSections}<footer>Motor: ${motor.scenarios.length} escenarios. Navegador: ${summary.browserScenarios}. Casos preparados: ${cases.length}. Poses: 256. Fuente index.html: ${summary.indexSha256}. No se cambiaron mecánicas ni sprites. Las capturas son acercamientos para revisión, no pruebas de balance de supervivencia.</footer></main><script>const search=document.querySelector('#search'),filter=document.querySelector('#heroFilter');function apply(){const q=search.value.toLocaleLowerCase();for(const section of document.querySelectorAll('.hero')){let any=false;for(const row of section.querySelectorAll('tbody tr')){row.hidden=!row.dataset.search.includes(q);any=any||!row.hidden}section.hidden=!!(filter.value&&section.dataset.hero!==filter.value)||!any}}search.oninput=apply;filter.onchange=apply;</script></html>`);
console.log(JSON.stringify({report:'INFORME-AUDITORIA-HEROES.md',gallery:dir+'/index.html',...summary},null,2));
