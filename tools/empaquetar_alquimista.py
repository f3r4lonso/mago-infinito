"""Recorta alche1.jpg (juego) y alche2.jpg (iconos) y genera assets/heroes/alchemist/ (atlas + pack.js).
Uso: python tools/empaquetar_alquimista.py"""
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__))
from PIL import Image
import numpy as np
from empaquetar_torre_lib import fondo,quitar_fondo,recortar,empaquetar
OUT='assets/heroes/alchemist';os.makedirs(OUT,exist_ok=True)
D0,D1=62,135   # JPG: recorte algo mas duro

# ---------- Hoja 1: rejilla 7 x 4 ----------
im=np.array(Image.open('assets/alche1.jpg').convert('RGB')).astype(int);H,W,_=im.shape;cw,ch=W/7,H/4
def celda(r,c,c2=None,ins=15):
    x0=int(c*cw)+ins;x1=int(((c2 if c2 is not None else c)+1)*cw)-ins;y0=int(r*ch)+ins;y1=int((r+1)*ch)-ins
    return im[y0:y1,x0:x1]
def sprite(rgb,trim=True,maxl=140):
    s=quitar_fondo(rgb,fondo(rgb),D0,D1)
    if trim:s=recortar(s)
    k=maxl/max(s.size)
    return s.resize((max(1,round(s.width*k)),max(1,round(s.height*k))),Image.LANCZOS) if k<1 else s
# indice 0-based = fila*7+columna ; (nombre, indice, ¿recortar?)  Gemini cambio el orden previsto, se asigna por lo que dibuja cada celda
MAPA=[('alchemist_idle',0,False),('alchemist_atk',1,False),('al_proj',2,True),('al_splash',3,True),('al_flask_a',4,True),('al_acid',5,True),
 ('al_oil_splash',6,True),('al_oil_zone',7,True),('al_spark_proj',8,True),('al_boom1',9,True),('al_cat_vortex',10,True),('al_cat_burst',11,True),
 ('al_mix_a',12,True),('al_boom2',13,True),('al_heal',14,True),('al_antidote_b',15,True),('al_coat_a',16,True),
 ('al_distill_a',18,True),('al_distill_b',19,True),('al_fumes_zone',20,True),('al_fumes_b',21,True),
 ('al_gold_boom',24,True),('al_plague_a',25,True),('al_plague_b',26,True),('al_plague_boom',27,True)]   # la celda 17 lleva numeros y se descarta
juego=[]
for n,idx,trim in MAPA:
    r,c=divmod(idx,7);s=sprite(celda(r,c),trim,170 if not trim else 140)
    if n=='alchemist_atk':   # el rayo del arma se corta en el borde de la celda: se desvanece
        a=np.array(s);fade=36;a[:,-fade:,3]=(a[:,-fade:,3]*np.linspace(1,0,fade)[None,:]).astype(np.uint8);s=Image.fromarray(a,'RGBA')
    juego.append((n,s))
# moneda con estela: ocupa dos celdas (fila 3, columnas 1 y 2)
rgbm=celda(3,1,2).copy();xb=int(2*cw)-(int(1*cw)+15)   # la linea de cuadricula que cruza la moneda se rellena con las columnas vecinas
for dx in range(-4,5):rgbm[:,xb+dx]=((rgbm[:,xb-6]+rgbm[:,xb+6])//2)
juego.append(('al_gold_proj',sprite(rgbm,True,200)))
atlas,desc=empaquetar(juego,1024);atlas.save(f'{OUT}/alchemist-juego.png',optimize=True);print('juego',atlas.size,len(desc))

# ---------- Hoja 2: 6 x 3 iconos ----------
im2=np.array(Image.open('assets/alche2.jpg').convert('RGB')).astype(int)
def runs(m,minlen=1):
    o=[];s=None
    for i,v in enumerate(m):
        if v and s is None:s=i
        if not v and s is not None:
            if i-s>=minlen:o.append((s,i))
            s=None
    if s is not None:o.append((s,len(m)))
    return o
fg=np.sqrt(((im2-fondo(im2))**2).sum(axis=2))>90
bands=runs(fg.sum(axis=1)/im2.shape[1]>0.03,20);assert len(bands)==3,bands
NOM=['al_flask','al_oil','al_spark','al_catalyst','al_mix','al_antidote','al_coat','al_distill','al_fumes','al_transmute','al_gold','al_plague','alchemist_icon','alchemist_basic_icon','alchemist_portrait']
ico=[];k=0
for (a,b) in bands:
    cols=runs(fg[a:b].sum(axis=0)/(b-a)>0.05,20)
    for (x0,x1) in cols:
        rgb=im2[a-2:b+2,x0-2:x1+2];s=recortar(quitar_fondo(rgb,fondo(rgb),D0,D1),0).resize((96,96),Image.LANCZOS);ico.append((NOM[k],s));k+=1
assert k==15,k
atlas2,desc2=empaquetar(ico,480);atlas2.save(f'{OUT}/alchemist-ui.png',optimize=True);print('ui',atlas2.size)
with open(f'{OUT}/pack.js','w',encoding='utf-8') as f:
    f.write('/* Generado por tools/empaquetar_alquimista.py. No editar a mano. */\n')
    f.write('SPR.addPack("alchemist",'+json.dumps({'game':{'img':'assets/heroes/alchemist/alchemist-juego.png','w':atlas.width,'h':atlas.height,'s':desc},
      'ui':{'img':'assets/heroes/alchemist/alchemist-ui.png','w':atlas2.width,'h':atlas2.height,'s':desc2}},separators=(',',':'))+');\n')
print('pack.js escrito')
