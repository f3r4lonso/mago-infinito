"""Recorta el dragón de la forma de dragón del paladín (assets/habilidades y efectos/pro/paladin/reddragonfly.png: cuadrícula 4x4, vista lateral hacia la derecha)
y genera assets/heroes/paladin/pack3.js + paladin-dragon.png.
Filas del original: 1 y 2 = aleteo, 3 (primer fotograma blanco = destello al recibir daño), 4 = mordisco con la boca abierta.
Los fotogramas se alinean por su centro de masa (el dragón vuela) dentro de un lienzo común.
pack3.js añade a los metadatos del paladín la forma 'dragon' (se carga después de pack2.js).
Uso: python tools/empaquetar_paladin_dragon.py"""
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__))
os.chdir(os.path.join(os.path.dirname(__file__),'..'))
import numpy as np
from PIL import Image
from empaquetar_torre_lib import empaquetar
SRC='assets/habilidades y efectos/pro/paladin/reddragonfly.png'
OUT='assets/heroes/paladin'
im=np.array(Image.open(SRC).convert('RGBA'));H,W=im.shape[:2];cw,ch=W//4,H//4
def celda(r,c):return im[r*ch:(r+1)*ch,c*cw:(c+1)*cw]
def cm(a):
    al=a[...,3].astype(float);ys,xs=np.mgrid[0:a.shape[0],0:a.shape[1]];t=al.sum()
    return (xs*al).sum()/t,(ys*al).sum()/t
# (id, fila, columna)
CUADROS=[('pd_fly_%d'%(c+1),0,c) for c in range(4)]+[('pd_atk_%d'%(c+1),3,c) for c in range(4)]+[('pd_hurt',2,0)]
datos={}
for sid,r,c in CUADROS:
    a=celda(r,c);cx,cy=cm(a);datos[sid]=(a,cx,cy)
L=int(max(d[1] for d in datos.values()))+1;R=int(max(d[0].shape[1]-d[1] for d in datos.values()))+1
A=int(max(d[2] for d in datos.values()))+1;B=int(max(d[0].shape[0]-d[2] for d in datos.values()))+1
sp=[]
for sid,(a,cx,cy) in datos.items():
    can=Image.new('RGBA',(L+R,A+B),(0,0,0,0));can.alpha_composite(Image.fromarray(a,'RGBA'),(L-int(round(cx)),A-int(round(cy))));sp.append((sid,can))
atlas,desc=empaquetar(sp,1024);atlas.save(f'{OUT}/paladin-dragon.png',optimize=True)
W_PANT=118                                  # ancho del dragón en pantalla (el caballero mide unos 40 px de ancho)
meta={'fly':['pd_fly_1','pd_fly_2','pd_fly_3','pd_fly_4'],'atk':['pd_atk_1','pd_atk_2','pd_atk_3','pd_atk_4'],'hurt':'pd_hurt','fps':9,'W':W_PANT,'y':6}
with open(f'{OUT}/pack3.js','w',encoding='utf-8') as fh:
    fh.write('/* Generado por tools/empaquetar_paladin_dragon.py. Añade la forma de dragón al paladín. No editar a mano. */\n')
    fh.write('SPR.addPack("paladin_dragon",'+json.dumps({'game':{'img':f'{OUT}/paladin-dragon.png','w':atlas.width,'h':atlas.height,'s':desc}},separators=(',',':'))+');\n')
    fh.write('SPR.addMeta("paladin",Object.assign({},SPR.heroMeta("paladin"),{forms:{dragon:'+json.dumps(meta,separators=(',',':'))+'}}));\n')
bg=Image.new('RGBA',atlas.size,(70,100,70,255));bg.alpha_composite(atlas);bg.convert('RGB').save('guias-arte/prev-paladin-dragon.png')
print('lienzo',(L+R,A+B),'atlas',atlas.size,len(desc))
