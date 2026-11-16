const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {createGameContext}=require('../motor-pruebas.cjs');
const out=path.resolve('auditoria-heroes');fs.mkdirSync(out,{recursive:true});
const ctx=createGameContext(assert);vm.runInContext(fs.readFileSync('tools/escenarios-auditoria.js','utf8'),ctx);
const catalog=vm.runInContext('HeroAudit.catalog()',ctx);
fs.writeFileSync(path.join(out,'catalogo.json'),JSON.stringify(catalog,null,2));
const all=[],started=new Date().toISOString();
for(const hero of catalog){
 for(const level of [1,20,50]){
  all.push(vm.runInContext(`HeroAudit.run(${JSON.stringify(hero.id)},'basic',${level})`,ctx,{timeout:20000}));
  for(const skill of hero.skills)all.push(vm.runInContext(`HeroAudit.run(${JSON.stringify(hero.id)},${JSON.stringify(skill.id)},${level})`,ctx,{timeout:20000}));
  all.push(vm.runInContext(`HeroAudit.run(${JSON.stringify(hero.id)},'kit',${level},{fullKit:true})`,ctx,{timeout:20000}));
 }
 all.push(vm.runInContext(`HeroAudit.run(${JSON.stringify(hero.id)},'basic',20,{lab:true,duration:8})`,ctx,{timeout:20000}));
 for(const skill of hero.skills)all.push(vm.runInContext(`HeroAudit.run(${JSON.stringify(hero.id)},${JSON.stringify(skill.id)},20,{lab:true,duration:8})`,ctx,{timeout:20000}));
 console.log(hero.id+': '+hero.skills.length+' habilidades · '+all.filter(r=>r.hero===hero.id&&r.errors.length).length+' escenarios con error');
 fs.writeFileSync(path.join(out,'motor.json'),JSON.stringify({started,ended:new Date().toISOString(),sha256:crypto.createHash('sha256').update(fs.readFileSync('index.html')).digest('hex'),catalog,scenarios:all},null,2));
}
console.log(JSON.stringify({heroes:catalog.length,skills:catalog.reduce((n,h)=>n+h.skills.length,0),scenarios:all.length,errors:all.filter(s=>s.errors.length).length,nonFinite:all.filter(s=>s.nonFinite.length).length}));
