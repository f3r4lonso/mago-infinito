"""Recorta las hojas "solo efectos" de un héroe (assets/<x>_efectos*.jpg) y genera assets/heroes/<id>/<id>-fx.png y fx.js.
Cada grupo es una animación: sus fotogramas se recortan con el mismo recuadro para que no salten al reproducirse.
Las hojas de Gemini no siempre traen la cuadrícula uniforme (ni filas iguales): se detectan las líneas moradas reales.
Uso: python tools/empaquetar_efectos.py"""
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__))
from PIL import Image
import numpy as np
from empaquetar_torre_lib import fondo,quitar_fondo,empaquetar
D0,D1=62,135
# héroe -> [(hoja, columnas, filas, [(prefijo, primera celda 1-based, nº de fotogramas, lado máximo), ...]), ...]
H={
 'assassin':[
  ('acesino_efectos1.jpg',6,4,[('x_slash',1,6,200),('x_trail',7,3,260),('x_trapa',10,3,90),('x_trapb',13,5,200),('x_vanish',18,3,200),('x_stab',21,4,200)]),
  ('acesino_efectos2.jpg',6,4,[('x_dag',1,4,64),('x_dagh',5,3,110),('x_smoke',8,5,200),('x_stealth',13,4,160),('x_mark',17,5,64)]),
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
    # límites de cada celda entre las líneas de la cuadrícula (una línea simple o un par de líneas con hueco)
    m=(im[...,0]>40)&(im[...,0]<150)&(im[...,1]<60)&(im[...,2]>60)&(im[...,2]<180)
    cx,cy=centros(m.mean(axis=0)),centros(m.mean(axis=1))
    def lim(c,n):
        if len(c)==n+1:return [(c[i][1]+4,c[i+1][0]-4) for i in range(n)]      # lineas simples entre celdas
        if len(c)==2*n:return [(c[2*i][1]+4,c[2*i+1][0]-4) for i in range(n)]  # cada celda con su propio marco (dos lineas con hueco)
        raise AssertionError((len(c),n))
    return lim(cx,cols),lim(cy,rows)
def fondo_robusto(rgb):
    m=(rgb[...,0]>200)&(rgb[...,1]<60)&(rgb[...,2]>200)
    return np.median(rgb[m],axis=0) if m.sum()>300 else fondo(rgb)
def clave(rgb):
    a=np.array(quitar_fondo(rgb,fondo_robusto(rgb),D0,D1))
    linea=(rgb[...,0]>40)&(rgb[...,0]<150)&(rgb[...,1]<60)&(rgb[...,2]>60)&(rgb[...,2]<180)   # restos de la cuadrícula en el borde
    borde=np.zeros(linea.shape,bool);borde[:14,:]=True;borde[-14:,:]=True;borde[:,:14]=True;borde[:,-14:]=True
    a[linea&borde,3]=0
    h,w=a.shape[:2];yy,xx=np.mgrid[0:h,0:w]   # el arte que toca el borde de la celda se desvanece para que no quede un corte recto
    d=np.minimum(np.minimum(xx,w-1-xx),np.minimum(yy,h-1-yy));a[...,3]=(a[...,3]*np.clip(d/18,0,1)).astype(np.uint8)
    return Image.fromarray(a,'RGBA')
def bbox(s):
    a=np.array(s)[...,3];ys,xs=np.where(a>14)
    return (int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1))
for hid,hojas in H.items():
    sp=[];print(hid)
    for f,cols,rows,grupos in hojas:
        im=np.array(Image.open('assets/'+f).convert('RGB')).astype(int);xs,ys=celdas_de(im,cols,rows)
        for pref,c0,n,maxl in grupos:
            fr=[]
            for i in range(n):
                r,c=divmod(c0-1+i,cols);fr.append(clave(im[ys[r][0]:ys[r][1],xs[c][0]:xs[c][1]]))
            bb=[bbox(s) for s in fr];u=(min(b[0] for b in bb),min(b[1] for b in bb),max(b[2] for b in bb),max(b[3] for b in bb))
            k=min(1,maxl/max(u[2]-u[0],u[3]-u[1]))
            for i,s in enumerate(fr):
                cc=s.crop(u);sp.append((f'{pref}_{i+1}',cc.resize((max(1,round(cc.width*k)),max(1,round(cc.height*k))),Image.LANCZOS) if k<1 else cc))
            print(' ',pref,n,'fotogramas',(u[2]-u[0],u[3]-u[1]),'->',round(k,2))
    out=f'assets/heroes/{hid}';atlas,desc=empaquetar(sp,1024);atlas.save(f'{out}/{hid}-fx.png',optimize=True)
    with open(f'{out}/fx.js','w',encoding='utf-8') as fh:
        fh.write('/* Generado por tools/empaquetar_efectos.py. No editar a mano. */\n')
        fh.write(f'SPR.addPack("{hid}_fx",'+json.dumps({'game':{'img':f'assets/heroes/{hid}/{hid}-fx.png','w':atlas.width,'h':atlas.height,'s':desc}},separators=(',',':'))+');\n')
    bg=Image.new('RGBA',atlas.size,(70,100,70,255));bg.alpha_composite(atlas);bg.convert('RGB').save(f'guias-arte/prev-{hid}-fx.png')
    print(hid,'fx',atlas.size,len(desc),'sprites')
