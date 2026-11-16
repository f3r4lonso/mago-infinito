"""Recorta los fogonazos de fuego del dragón (assets/habilidades y efectos/pro/paladin/dragonfire.jpg: fondo negro, 6 filas de 2 a 5 fotogramas)
y genera assets/heroes/paladin/pack4.js + paladin-fuego.png.
La luminancia pasa a ser el alfa (los sprites estaban hechos para sumar luz sobre negro).
- pf_mouth_1..2: fogonazo en la boca (fila 1)      - pf_blast_1..2: onda de fuego al impactar (fila 1)
- pf_stream_1..4: chorro de fuego largo (fila 5)   - pf_small_1..5: chorro corto (fila 6)
Los chorros se alinean por el origen de la llama (extremo izquierdo, a la altura del núcleo): el juego los estira de la boca al objetivo.
Uso: python tools/empaquetar_paladin_fuego.py"""
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__))
os.chdir(os.path.join(os.path.dirname(__file__),'..'))
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from empaquetar_torre_lib import empaquetar
SRC='assets/habilidades y efectos/pro/paladin/dragonfire.jpg'
OUT='assets/heroes/paladin'
a=np.array(Image.open(SRC).convert('RGB')).astype(int);lum=a.max(axis=2)
alfa=np.clip((lum-30)/120,0,1)
rgba=np.dstack([np.clip(a/np.maximum(alfa[...,None],.15),0,255).astype(np.uint8),(alfa*255).astype(np.uint8)])
fg=lum>55
BANDAS=[(15,149),(162,247),(261,349),(362,447),(460,526),(540,609)]
filas=[]
for y0,y1 in BANDAS:
    lab,n=ndi.label(ndi.binary_dilation(fg[y0:y1],iterations=7))
    objs=sorted([s for s in ndi.find_objects(lab) if s[1].stop-s[1].start>20],key=lambda s:s[1].start)
    filas.append([(s[1].start,y0+s[0].start,s[1].stop,y0+s[0].stop) for s in objs])
def recorte(b):
    x0,y0,x1,y1=b;return rgba[y0:y1,x0:x1].copy()
def ancla(c,modo):
    al=c[...,3].astype(float);ys,xs=np.mgrid[0:c.shape[0],0:c.shape[1]]
    if modo=='c':return (xs*al).sum()/al.sum(),(ys*al).sum()/al.sum()
    nuc=(c[...,:3].max(axis=2)>200)&(al>100)
    if nuc.sum()<5:nuc=al>100
    yy,xx=np.where(nuc);return float(xx.min()),float(yy.mean())   # origen de la llama: extremo izquierdo del núcleo
GRUPOS=[('pf_mouth',[(0,0),(0,1)],'c'),('pf_blast',[(0,2),(0,3)],'c'),('pf_stream',[(4,0),(4,1),(4,2),(4,3)],'o'),('pf_small',[(5,0),(5,1),(5,2),(5,3),(5,4)],'o')]
sp=[]
for pref,idx,modo in GRUPOS:
    dat=[]
    for r,k in idx:
        c=recorte(filas[r][k]);ax_,ay_=ancla(c,modo);dat.append((c,ax_,ay_))
    L=int(max(d[1] for d in dat))+1;R=int(max(d[0].shape[1]-d[1] for d in dat))+1
    A=int(max(d[2] for d in dat))+1;B=int(max(d[0].shape[0]-d[2] for d in dat))+1
    for n,(c,ax_,ay_) in enumerate(dat,1):
        can=Image.new('RGBA',(L+R,A+B),(0,0,0,0));can.alpha_composite(Image.fromarray(c,'RGBA'),(L-int(round(ax_)),A-int(round(ay_))));sp.append((f'{pref}_{n}',can))
    print(pref,(L+R,A+B))
atlas,desc=empaquetar(sp,1024);atlas.save(f'{OUT}/paladin-fuego.png',optimize=True)
with open(f'{OUT}/pack4.js','w',encoding='utf-8') as fh:
    fh.write('/* Generado por tools/empaquetar_paladin_fuego.py. No editar a mano. */\n')
    fh.write('SPR.addPack("paladin_fire",'+json.dumps({'game':{'img':f'{OUT}/paladin-fuego.png','w':atlas.width,'h':atlas.height,'s':desc}},separators=(',',':'))+');\n')
bg=Image.new('RGBA',atlas.size,(70,100,70,255));bg.alpha_composite(atlas);bg.convert('RGB').save('guias-arte/prev-paladin-fuego.png')
print('atlas',atlas.size,len(desc))
