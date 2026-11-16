"""Recorta las hojas de efectos de assets/habilidades y efectos/pro/EFECTOS2 (cuadrícula 6xN con fondo magenta) y genera
assets/heroes/<id>/<id>-fx.png y fx.js para devourer, troll, druid, werewolf, monk, necro y paladin.
Cada grupo es una animación: sus fotogramas se recortan con el mismo recuadro para que no salten al reproducirse.
Uso: python tools/empaquetar_efectos2.py"""
import os,sys,json,glob
sys.path.insert(0,os.path.dirname(__file__))
from PIL import Image
import numpy as np
from empaquetar_torre_lib import fondo,quitar_fondo,empaquetar
D='assets/habilidades y efectos/pro/EFECTOS2/'
D3='assets/habilidades y efectos/pro/EFECTOS 3/'
# destino especial: héroe -> (carpeta, atlas, script, nombre del paquete); por defecto assets/heroes/<id>/<id>-fx.png y fx.js
OUT={'demon2':('assets/heroes/demon','demon-fx2.png','fx2.js','demon_fx2')}
# héroe -> [(hoja, columnas, filas, [(prefijo, primera celda 1-based, nº de fotogramas, lado máximo), ...]), ...]
H={
 'demon2':[   # EFECTOS 3: variante nueva del cazador de demonios (hojas 8x4 y 6x4)
  (D3+'demon_hoja1.jpg',8,4,[('zn_wings',1,5,240),('zn_burst',7,4,240),('zn_slash',11,3,240),('zn_ring',14,6,240),('zn_gem',20,4,160),('zn_gemburst',24,4,200)],{'inset':6,'strict':90}),
  (D3+'demon_hoja2.jpg',6,4,[('zn_smoke',1,3,240),('zn_dagger',16,4,160)],{'inset':22,'strict':90}),
 ],
 'devourer':[
  (D+'bestia_abisal_efectos_hoja1.png',6,4,[('pb_rock',1,4,200),('pb_ring',5,3,240),('pb_impact',8,5,240),('pb_thorn',13,5,240),('pb_flame',18,4,240),('pb_debris',22,2,200)]),
  (D+'bestia_abisal_efectos_hoja2.png',6,4,[('pb_dash',1,4,240),('pb_burst',5,4,240),('pb_crack',9,5,240),('pb_shock',14,4,240),('pb_halo',18,4,240)]),
 ],
 'troll':[
  (D+'troll_efectos_hoja1.png',6,4,[('t_mask',1,6,200),('t_spirit',7,3,200),('t_spirx',10,3,240),('t_fspear',13,3,200),('t_fexp',16,3,240),('t_smoke',19,2,200),('t_blood',21,4,240)]),
  (D+'troll_efectos_hoja2.png',6,4,[('t_frog',1,4,160),('t_poof',5,3,200),('t_proj',8,2,200),('t_star',10,3,200),('t_ring',14,4,240)]),
 ],
 'druid':[
  (D+'druida_efectos_hoja1.png',6,4,[('u_tree',1,8,230),('u_leafburst',9,4,200),('u_toxic',13,4,240),('u_sun',17,4,240),('u_moonf',21,4,240)]),
  (D+'druida_efectos_hoja2.png',6,4,[('u_star',1,3,200),('u_starimp',4,4,220),('u_leafbolt',8,2,200),('u_leafimp',10,3,220),('u_cyc',13,7,220),('u_pillar',20,5,240)]),
  (D+'druida_efectos_hoja3.png',6,4,[('u_spiral',1,4,220),('u_bark',5,4,200),('u_thorn',9,4,240)]),
 ],
 'werewolf':[
  (D+'hombre_lobo_efectos_hoja1.png',6,4,[('w_dash',1,3,240),('w_land',4,3,240),('w_moon',7,6,200),('w_moonwave',13,6,220),('w_claw',19,5,220)]),
  (D+'hombre_lobo_efectos_hoja2.png',6,4,[('w_claw2',1,4,200),('w_paw',5,4,160)]),
 ],
 'monk':[
  (D+'panda_monje_efectos_hoja1.png',6,4,[('k_tornado',1,5,220),('k_lotus',6,5,220),('k_gong',11,5,240),('k_palm',16,4,240),('k_wave',20,4,240)]),
  (D+'panda_monje_efectos_hoja2.png',6,4,[('k_dragon',1,4,240),('k_bell',5,4,200),('k_fists',9,4,240)]),
 ],
 'necro':[
  (D+'necro_efectos.png',6,4,[('n_scythe',1,5,240),('n_ghost',6,4,200),('n_bspear',10,2,200),('n_bburst',12,4,240),('n_drain',16,3,240),('n_skullr',19,2,160),('n_wall',21,4,240)]),
  (D+'necro_efectos1.png',6,4,[('n_rise',1,6,160),('n_hand',7,6,160),('n_vortex',13,6,160),('n_spirits',19,6,160)]),
  (D+'necro_efectos2.png',6,4,[('n_pest',1,6,160),('n_skullp',7,6,160),('n_hand2',13,6,160),('n_vortex2',19,6,160)]),
  (D+'necro_efecto3.png',6,4,[('n_dfire',1,6,160),('n_skull2',7,6,160),('n_bones',13,6,160),('n_circle',19,6,160)]),
 ],
 'paladin':[
  (D+'paladin_efectos1.png',6,4,[('pl_pillar',1,6,160),('pl_shield',7,6,160),('pl_burst',13,6,160),('pl_slash',19,6,160)]),
  (D+'paladin_efectos2.png',6,5,[('pl_cross',1,6,160),('pl_arc',7,6,160),('pl_bubble',13,6,160),('pl_heal',19,6,160),('pl_dart',25,6,160)]),
  (D+'paladin_efectos3.png',6,4,[('pl_star',1,6,160),('pl_sphere',7,6,160),('pl_crown',13,6,160),('pl_swirl',19,5,160)]),
 ],
}
def centros(v):
    idx=np.where(v>.45)[0];o=[];s=p=None
    for i in idx:
        if s is None:s=p=i
        elif i-p>3:o.append([s,p]);s=i
        p=i
    if s is not None:o.append([s,p])
    return o
def celdas_de(im,cols,rows):
    # límites de cada celda entre las líneas oscuras de la cuadrícula; si no se detectan bien, cuadrícula uniforme
    h,w=im.shape[:2]
    m=(im[...,0]<150)&(im[...,1]<80)&(im[...,2]>40)&(im[...,2]<200)
    cx,cy=centros(m.mean(axis=0)),centros(m.mean(axis=1))
    def lim(c,n,total):
        if len(c)==n+1:return [(c[i][1]+4,c[i+1][0]-4) for i in range(n)]
        if len(c)==2*n:return [(c[2*i][1]+4,c[2*i+1][0]-4) for i in range(n)]
        s=total/n;return [(int(i*s)+5,int((i+1)*s)-5) for i in range(n)]
    return lim(cx,cols,w),lim(cy,rows,h)
def clave(rgb):
    f=rgb.astype(float);R,G,B=f[...,0],f[...,1],f[...,2]
    m=(R>200)&(G<60)&(B>200)
    bg=np.median(rgb[m],axis=0) if m.sum()>300 else fondo(rgb)
    a=np.array(quitar_fondo(rgb,bg,62,135))
    pal=np.clip((G-90)/80,0,1)+np.where(np.minimum(R,B)>=185,0,1)            # rosa/lila pálido -> transparente (el blanco real tiene G alto y se conserva)
    rose=np.where((R>180)&(G<70)&(B>110)&(B<215),0,1)                         # rosa oscuro del marco
    a[...,3]=(a[...,3]*np.clip(pal,0,1)*rose).astype(np.uint8)
    linea=(rgb[...,0]<150)&(rgb[...,1]<80)&(rgb[...,2]>40)&(rgb[...,2]<200)
    borde=np.zeros(linea.shape,bool);borde[:14,:]=True;borde[-14:,:]=True;borde[:,:14]=True;borde[:,-14:]=True
    a[linea&borde,3]=0
    h,w=a.shape[:2];yy,xx=np.mgrid[0:h,0:w]   # el arte que toca el borde de la celda se desvanece
    d=np.minimum(np.minimum(xx,w-1-xx),np.minimum(yy,h-1-yy));a[...,3]=(a[...,3]*np.clip(d/12,0,1)).astype(np.uint8)
    return Image.fromarray(a,'RGBA')
def estricto(img,lo):
    # quita el halo rosado de los fondos JPG: el alfa por debajo de 'lo' desaparece y el resto se reescala
    if not lo:return img
    a=np.array(img).astype(float);a[...,3]=np.clip((a[...,3]-lo)/(255-lo),0,1)*255;return Image.fromarray(a.astype(np.uint8),'RGBA')
def bbox(s):
    a=np.array(s)[...,3];ys,xs=np.where(a>14)
    if len(xs)==0:return (0,0,s.width,s.height)
    return (int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1))
for hid,hojas in H.items():
    sp=[];print(hid)
    for f,cols,rows,grupos,*op in hojas:
        opt=op[0] if op else {}
        im=np.array(Image.open(f).convert('RGB')).astype(int);xs,ys=celdas_de(im,cols,rows)
        ins=opt.get('inset',0);xs=[(a+ins,b-ins) for a,b in xs];ys=[(a+ins,b-ins) for a,b in ys]
        for pref,c0,n,maxl in grupos:
            fr=[]
            for cel in range(c0,c0+n):
                r,c=divmod(cel-1,cols);fr.append(estricto(clave(im[ys[r][0]:ys[r][1],xs[c][0]:xs[c][1]]),opt.get('strict',0)))
            bb=[bbox(s) for s in fr];u=(min(b[0] for b in bb),min(b[1] for b in bb),max(b[2] for b in bb),max(b[3] for b in bb))
            k=min(1,maxl/max(u[2]-u[0],u[3]-u[1]))
            for i,s in enumerate(fr):
                cc=s.crop(u);sp.append((f'{pref}_{i+1}',cc.resize((max(1,round(cc.width*k)),max(1,round(cc.height*k))),Image.LANCZOS) if k<1 else cc))
            print(' ',pref,n,'fotogramas',(u[2]-u[0],u[3]-u[1]),'->',round(k,2))
    out,png,js,pack=OUT.get(hid,(f'assets/heroes/{hid}',f'{hid}-fx.png','fx.js',f'{hid}_fx'));os.makedirs(out,exist_ok=True)
    atlas,desc=empaquetar(sp,1024);atlas.save(f'{out}/{png}',optimize=True)
    with open(f'{out}/{js}','w',encoding='utf-8') as fh:
        fh.write('/* Generado por tools/empaquetar_efectos2.py. No editar a mano. */\n')
        fh.write(f'SPR.addPack("{pack}",'+json.dumps({'game':{'img':f'{out}/{png}','w':atlas.width,'h':atlas.height,'s':desc}},separators=(',',':'))+');\n')
    bg=Image.new('RGBA',atlas.size,(70,100,70,255));bg.alpha_composite(atlas);bg.convert('RGB').save(f'guias-arte/prev-{hid}-fx.png')
    print(hid,'fx',atlas.size,len(desc),'sprites')
