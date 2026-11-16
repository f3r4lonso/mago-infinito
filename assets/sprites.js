/* ============ SPR: sprites PNG con alternativa vectorial ============
   Script normal (no módulo): funciona abriendo index.html con doble clic.
   Cada héroe tiene un "paquete" (assets/heroes/<id>/pack.js) con dos atlas:
   - game: sprites del mapa (héroe, proyectiles, efectos)
   - ui:   iconos de interfaz
   Si un sprite no existe o el PNG no carga, el juego usa su dibujo vectorial. */
var SPR=(function(){
  const packs={},ids={};            // ids: nombre -> {A (atlas), x,y,w,h}
  const api={on:false,packs,enabled:true};
  const now=()=>performance.now()/1000;

  api.addPack=function(name,def){
    packs[name]=def;
    for(const at of ['game','ui']){
      const A=def[at];if(!A)continue;
      A.im=new Image();A.ok=false;
      A.im.onload=()=>{A.ok=true;if(at==='game')api.on=api.enabled};
      A.im.onerror=()=>{A.ok=false};
      A.im.src=A.img;
      for(const k in A.s){const r=A.s[k];ids[k]={A,x:r[0],y:r[1],w:r[2],h:r[3]}}
    }
  };
  /* se puede apagar con ?sprites=off para comparar con el dibujo vectorial */
  try{if(/[?&]sprites=off/.test(location.search))api.enabled=false}catch(e){}

  api.has=id=>{const s=ids[id];return !!(api.enabled&&s&&s.A.ok)};

  /* dibuja un sprite. o: w/h en unidades (si solo w, h por proporción), ax/ay ancla 0..1, rot, flip, a (alfa), add (suma de luz) */
  api.draw=function(c,id,x,y,o){
    const s=ids[id];if(!api.enabled||!s||!s.A.ok)return false;
    o=o||{};
    const w=o.w||(o.h?o.h*s.w/s.h:s.w),h=o.h||w*s.h/s.w,ax=o.ax==null?.5:o.ax,ay=o.ay==null?.5:o.ay;
    c.save();
    if(o.a!=null&&o.a<1)c.globalAlpha=Math.max(0,o.a);
    if(o.add)c.globalCompositeOperation='lighter';
    c.translate(x,y);
    if(o.rot)c.rotate(o.rot);
    if(o.flip)c.scale(-1,1);
    c.drawImage(s.A.im,s.x,s.y,s.w,s.h,-w*ax,-h*ay,w,h);
    c.restore();
    return true;
  };

  /* ---------- iconos de interfaz (CSS sprite: no necesita esperar a la imagen) ----------
     size=null: el icono mide 1.2em y se adapta al tamaño de letra del hueco; size=número: px fijos. */
  api.iconHtml=function(id,size,fallback){
    const s=ids[id];if(!api.enabled||!s)return fallback;
    const A=s.A,px=A.w>s.w?s.x/(A.w-s.w)*100:0,py=A.h>s.h?s.y/(A.h-s.h)*100:0;
    const st='background-image:url('+A.img+');background-size:'+(A.w/s.w*100)+'% '+(A.h/s.h*100)+'%;background-position:'+px+'% '+py+'%'+(size?';width:'+size+'px;height:'+size+'px':'');
    return '<i class="sico'+(size?'':' em')+'" style="'+st+'"></i>';
  };

  /* ---------- iconos de mejora: icono de la habilidad + marco de color + símbolo del efecto ---------- */
  const RANK=['#71df87','#65b7ff','#ca8bff','#ffd24a'];
  const GL={
    /* mago */
    i_cold:['H','D','C','D+H'], i_ghost:['H','C','L','H+C'], i_wall:['P','R','D','P+C'], i_emp:['R','D','C','R+D'],
    i_tornado:['R','T','D','R+D'], i_alacrity:['H','C','H','C+H'], i_sun:['R','D','C','R+D'], i_forge:['P','S','D','P+H'],
    i_meteor:['P','R','D','P+R'], i_blast:['R','D','C','R+D'], i_field:['R','H','D','R+H+C'], i_laguna:['D','H','C','D+C'],
    /* habilidades de la torre */
    arcane:['D','P','C','D+P'], fire:['R','D','P','D+C'], elec:['P','D','C','P+D'], smite:['R','D','P','C+T'],
    dark:['D','P','T','D+C'], spear:['D','P','C','D+T'], pulse:['R','D','C','D+T'], hail:['R','D','P','D+C'],
    orbit:['P','D','R','P+D'], lightning:['H','D','P','D+C'], wind:['D','P','C+R','D+P'], goldshot:['D','P','C','D+P'],
    /* poderes de la torre */
    nova:['D','R','H+C','D+R'], storm:['P','D','R+C','P+D'], skel:['P','S+D','S','P+D+C'], freeze:['D','H','R+C','T+D'],
    meteor:['P','R','C+D','P+D'], judge:['D','L','R+C','D+L'], hole:['R','D','H','D+C'], barrier:['S','R+D','H+C','S+D'],
    quake:['R','D','H','D+C'], spring:['L','S','C','L+C']
  };
  function glyph(c,g,x,y,r){
    c.save();c.translate(x,y);c.lineWidth=Math.max(1,r*.22);c.lineCap='round';c.lineJoin='round';c.strokeStyle='#fff';c.fillStyle='#fff';
    switch(g){
      case'H':c.beginPath();c.moveTo(-r*.6,-r*.75);c.lineTo(r*.6,-r*.75);c.lineTo(-r*.6,r*.75);c.lineTo(r*.6,r*.75);c.closePath();c.stroke();break;
      case'D':c.beginPath();for(let i=0;i<16;i++){const a=i/16*6.283,rr=i%2?r*.4:r*.95;c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}c.closePath();c.fill();break;
      case'C':c.beginPath();c.arc(0,-r*.15,r*.6,0,6.283);c.stroke();c.beginPath();c.moveTo(0,-r*.15);c.lineTo(0,-r*.5);c.moveTo(0,-r*.15);c.lineTo(r*.3,-r*.05);c.stroke();
        c.beginPath();c.moveTo(-r*.35,r*.6);c.lineTo(0,r*.95);c.lineTo(r*.35,r*.6);c.stroke();break;
      case'R':c.beginPath();c.arc(0,0,r*.38,0,6.283);c.stroke();c.beginPath();c.arc(0,0,r*.85,0,6.283);c.stroke();break;
      case'P':c.beginPath();c.moveTo(-r*.8,0);c.lineTo(r*.8,0);c.moveTo(0,-r*.8);c.lineTo(0,r*.8);c.stroke();break;
      case'L':c.beginPath();c.moveTo(0,r*.85);c.bezierCurveTo(-r*1.3,-r*.1,-r*.6,-r*.95,0,-r*.35);c.bezierCurveTo(r*.6,-r*.95,r*1.3,-r*.1,0,r*.85);c.fill();break;
      case'S':c.beginPath();c.moveTo(-r*.7,-r*.7);c.lineTo(r*.7,-r*.7);c.lineTo(r*.7,r*.1);c.lineTo(0,r*.95);c.lineTo(-r*.7,r*.1);c.closePath();c.stroke();break;
      case'T':for(let k=0;k<2;k++){const ox=k?r*.5:-r*.45,oy=k?r*.35:-r*.3;c.beginPath();for(let i=0;i<10;i++){const a=i/10*6.283-1.57,rr=i%2?r*.2:r*.5;c.lineTo(ox+Math.cos(a)*rr,oy+Math.sin(a)*rr)}c.closePath();c.fill()}break;
    }
    c.restore();
  }
  const tierCache={};
  api.tierIcon=function(hero,id,i,size){
    const g=GL[id];const s=ids[id]||ids['ico_'+id];if(!g||!s||!s.A.ok||!api.enabled)return '';
    const key=id+i+'_'+size;if(tierCache[key])return tierCache[key];
    const dpr=2,cv=document.createElement('canvas');cv.width=cv.height=size*dpr;const c=cv.getContext('2d');c.scale(dpr,dpr);
    c.drawImage(s.A.im,s.x,s.y,s.w,s.h,1,1,size-2,size-2);
    c.lineWidth=2.4;c.strokeStyle=RANK[i];c.beginPath();if(c.roundRect)c.roundRect(1.2,1.2,size-2.4,size-2.4,5);else c.rect(1.2,1.2,size-2.4,size-2.4);c.stroke();
    const parts=g[i].split('+'),R=size*.2;
    parts.forEach((p,k)=>{const bx=size-R-2-k*(R*1.9),by=size-R-2;
      c.fillStyle='rgba(14,10,30,.88)';c.beginPath();c.arc(bx,by,R+1.2,0,6.283);c.fill();
      c.strokeStyle=RANK[i];c.lineWidth=1.2;c.stroke();glyph(c,p,bx,by,R*.75)});
    let url='';try{url=cv.toDataURL()}catch(e){}
    tierCache[key]=url;return url;
  };
  api.tierIconHtml=function(hero,id,i,size){
    const u=api.tierIcon(hero,id,i,size);
    return u?'<img src="'+u+'" width="'+size+'" height="'+size+'" style="float:left;margin:0 6px 2px 0">':'';
  };

  /* ---------- efectos con sprite (G.fx con k:'spr') ----------
     campos: id | anim[], x,y | path[x1,y1,x2,y2] | pos(), w, h, ax, ay, d (duración total), wait, rot, spin,
             g0,g1 (escala inicial/final), fi,fo (aparición/desvanecimiento), a, add, vx,vy, to[x,y] (rayo estirado) */
  api.drawFx=function(c,f){
    const e=f.d-f.t,wt=f.wait||0;
    if(e<wt)return true;
    const dur=Math.max(.01,f.d-wt),p=Math.min(1,(e-wt)/dur);
    let x=f.x,y=f.y;
    if(f.pos){const q=f.pos();x=q[0];y=q[1]}
    if(f.path){x=f.path[0]+(f.path[2]-f.path[0])*p;y=f.path[1]+(f.path[3]-f.path[1])*p}
    if(f.vx||f.vy){x+=(f.vx||0)*(e-wt);y+=(f.vy||0)*(e-wt)}
    const id=f.anim?f.anim[Math.floor(now()*(f.fps||12))%f.anim.length]:f.id;
    const g0=f.g0==null?1:f.g0,g1=f.g1==null?1:f.g1,k=g0+(g1-g0)*(1-Math.pow(1-p,2));
    const fi=f.fi==null?.12:f.fi,fo=f.fo==null?.35:f.fo;
    let a=(f.a==null?1:f.a)*(fi>0&&p<fi?p/fi:1)*(fo>0&&p>1-fo?Math.max(0,(1-p)/fo):1);
    if(f.pulse)a*=.8+.2*Math.sin(now()*f.pulse);
    if(f.to){   /* rayo estirado entre dos puntos */
      const dx=f.to[0]-x,dy=f.to[1]-y,L=Math.hypot(dx,dy)||1;
      api.draw(c,id,x,y,{w:L,h:(f.h||40)*k,ax:0,ay:.5,rot:Math.atan2(dy,dx),a,add:f.add});
      return true;
    }
    api.draw(c,id,x,y,{w:f.w?f.w*k:undefined,h:f.h?f.h*k:undefined,ax:f.ax,ay:f.ay,rot:(f.rot||0)+(f.spin||0)*(e-wt),a,add:f.add,flip:f.flip});
    return true;
  };


  /* ---------- torre: base, pisos apilables que se estrechan, tejado y cristal flotante ----------
     Dibuja en coordenadas locales de la torre (origen en el suelo). Devuelve false si faltan sprites. */
  api.towerBody=function(c,n,t,flash,runes){
    if(!api.has('t_roof')||!api.has('t_floor_a')||!api.has('t_base'))return false;
    api.draw(c,'t_base',0,-5,{w:46});
    let yb=-8,top=-8,wLast=24;
    for(let i=0;i<n;i++){
      const h=31*(1-.07*Math.max(0,i-1)),a=i===0,w=h*(a?148/195:112/195);
      api.draw(c,a?'t_floor_a':'t_floor_b',0,yb,{h,ax:.5,ay:1});
      top=yb-h;wLast=w;yb-=h*.71;
    }
    const rw=wLast*1.12,rh=rw*204/116;
    api.draw(c,'t_roof',0,top+7,{w:rw,ax:.5,ay:1});
    const apex=top+7-rh,cy=apex-7+Math.sin(t*2.4)*2.4;
    hGlow(c,0,cy,15+flash*16+Math.sin(t*5)*2,'#7ff0e0',.55);
    api.draw(c,'t_crystal',0,cy,{w:22,a:.95});
    for(let i=0;i<runes;i++){const a=t*1.4+i*6.283/runes;hGlow(c,Math.cos(a)*26,cy+12+Math.sin(a)*8,5,'#9ff4ff',.85)}
    return true;
  };

  /* ---------- héroe: mago invocador (sprite completo con animación por código) ---------- */
  api.mageHero=function(c,t,aim,fx,st){
    if(!api.has('hero'))return false;
    const run=st.run||0,k=st.atk||0,u=st.u==null?-1:st.u;
    const sp=ids.hero,H=68,W=H*sp.w/sp.h;
    const orb=front=>{for(let i=0;i<3;i++){const a=t*1.6+i*2.094,sn=Math.sin(a);if((sn>0)===front)hGlow(c,Math.cos(a)*27,-6+sn*9,front?4.6:4,'#9ff4ff',front?.9:.55)}};
    c.save();
    c.scale(fx,1);
    orb(false);
    /* movimiento: rebote al correr, inclinación, respiración y encogimiento al lanzar */
    const sn=Math.sin(t*11),bob=Math.sin(t*2.3)*.6-Math.abs(sn)*3*run;
    const lean=(.09*Math.sign(st.vx||1)*run)*(fx<0?-1:1)+(u>=0?-.07*k:0)+Math.sin(t*1.7)*.012;
    const sx=1+(u>=0?.05*k:0)+Math.sin(t*2.3)*.01,sy=1-(u>=0?.05*k:0)-Math.sin(t*2.3)*.01;
    c.translate(0,26+bob);c.rotate(lean);c.scale(sx,sy);
    api.draw(c,'hero',0,0,{w:W,ax:.47,ay:1,a:st.hurt>0?1-.25*st.hurt:1});
    /* destello del cristal del bastón (arriba a la derecha del sprite) */
    const ox=W*(.9-.47),oy=-H*.76;
    hGlow(c,ox,oy,9+Math.sin(t*4)*1.5+k*14,'#8ff6ff',.55+k*.4);
    c.restore();
    c.save();c.scale(fx,1);orb(true);c.restore();
    if(st.hurt>0)hGlow(c,0,-20,34,'rgba(255,60,60,'+(.45*st.hurt)+')');
    return true;
  };

  return api;
})();
