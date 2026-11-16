"""Recorta la hoja del caballero (assets/arte-sin-usar/paladin rework/caballero.jpg, fondo blanco) y genera
assets/heroes/paladin/pack2.js + paladin-rework.png: reposo, caminar y 3 ataques (tajo, estocada, tajo ascendente).
pack2.js se carga DESPUÉS de pack.js: SPR.addMeta reemplaza los metadatos del paladín.
Cada fotograma se alinea por los pies (línea de suelo común) dentro de un lienzo común, para que el cuerpo no salte entre poses.
Uso: python tools/empaquetar_paladin_rework.py"""
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__))
os.chdir(os.path.join(os.path.dirname(__file__),'..'))
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from empaquetar_torre_lib import empaquetar
SRC='assets/arte-sin-usar/paladin rework/caballero.jpg'
OUT='assets/heroes/paladin'
a=np.array(Image.open(SRC).convert('RGB')).astype(int)
mx=a.max(axis=2);mn=a.min(axis=2)
claro=(mx>205)&((mx-mn)<16)                   # candidato a fondo: blanco / gris neutro
# borra las etiquetas de texto (IDLE, WALK, ATTACK 1...) a la izquierda de cada fila
for y0,y1,x1 in [(40,80,110),(190,225,95),(315,356,140),(430,478,100),(568,606,135)]:
    claro[y0:y1,:x1]=True
BANDAS=[('idle',0,137),('walk',139,277),('a1',279,407),('a2',408,529),('a3',530,672)]
frames={}
for nm,y0,y1 in BANDAS:
    band=~claro[y0:y1]
    lab,n=ndi.label(ndi.binary_dilation(band,iterations=3))
    objs=[sl for sl in ndi.find_objects(lab) if sl[0].stop-sl[0].start>=40]
    objs.sort(key=lambda s:s[1].start)
    frames[nm]=[(sl[1].start,y0+sl[0].start,sl[1].stop,y0+sl[0].stop) for sl in objs]
def recorta(box,pad=6):
    bx0,by0,bx1,by1=box;x0,y0,x1,y1=box;H_,W_=a.shape[:2];x0=max(0,x0-pad);y0=max(0,y0-pad);x1=min(W_,x1+pad);y1=min(H_,y1+pad)
    sub=a[y0:y1,x0:x1];cl=claro[y0:y1,x0:x1].copy()
    # fondo = zona clara conectada con el borde del recuadro (conserva el blanco interior de la armadura)
    lab,_=ndi.label(cl);ext=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    bg=np.isin(lab,list(ext))
    fg=~bg
    dentro=np.zeros_like(fg);dentro[by0-y0:by1-y0,bx0-x0:bx1-x0]=True;fg&=dentro   # nada fuera del recuadro propio del fotograma (restos de vecinos)
    # quita el halo claro del JPG en el borde del sprite
    for _ in range(2):
        borde=fg&ndi.binary_dilation(bg)&(sub.max(axis=2)>185)&((sub.max(axis=2)-sub.min(axis=2))<30)
        fg&=~borde
    # sombra de suelo clara del JPG: se quitan los píxeles grises claros de las últimas filas bajo los pies
    ys_=np.where(fg.sum(axis=1)>=14)[0]
    if len(ys_):
        b0=int(ys_.max());zona=np.zeros_like(fg);zona[max(0,b0-14):]=True
        fg&=~(zona&(sub.max(axis=2)>150)&((sub.max(axis=2)-sub.min(axis=2))<30))
    # solo el sprite principal y lo que esté pegado a él (descarta restos de fotogramas vecinos)
    lab2,n=ndi.label(fg)
    if n>1:
        tam=ndi.sum(fg,lab2,range(1,n+1));mayor=int(np.argmax(tam))+1
        cerca=ndi.binary_dilation(lab2==mayor,iterations=14)
        fg=np.isin(lab2,[i+1 for i,t in enumerate(tam) if t>=25 and (cerca&(lab2==i+1)).any()])
    rgba=np.dstack([sub.astype(np.uint8),(fg*255).astype(np.uint8)])
    return Image.fromarray(rgba,'RGBA'),fg
def pies(fg):
    # línea de suelo: la fila más baja con una anchura de píxeles propia de unas botas (ignora la punta de la espada); x = centro de los pies
    cnt=fg.sum(axis=1);filas=np.where(cnt>=14)[0];base=int(filas.max())
    ys,xs=np.where(fg[max(0,base-14):base+1]);return base,float(np.median(xs))
def prep(nm,k,flip=False):
    img,fg=recorta(frames[nm][k])
    base,ax_=pies(fg)
    if flip:
        img=img.transpose(Image.FLIP_LEFT_RIGHT);ax_=img.width-1-ax_
    return img,base,ax_
# (id de sprite, banda, índice, espejo)
CUADROS=[('paladin_idle','idle',2,True),
 ('paladin_walk_1','walk',3,False),('paladin_walk_2','idle',2,True),
 ('paladin_a1_1','a1',1,False),('paladin_a1_2','a1',2,False),('paladin_a1_3','a1',3,False),
 ('paladin_a2_1','a2',0,False),('paladin_a2_2','a2',1,False),('paladin_a2_3','a2',2,False),
 ('paladin_a3_1','a3',0,False),('paladin_a3_2','a3',1,False),('paladin_a3_3','a3',2,False),('paladin_a3_4','a3',3,False)]
pre={}
for sid,nm,k,fl in CUADROS:pre[sid]=prep(nm,k,fl)
Lmax=int(max(p[2] for p in pre.values()))+1
Rmax=int(max(p[0].width-p[2] for p in pre.values()))+1
Amax=int(max(p[1] for p in pre.values()))+1
Bmax=int(max(p[0].height-p[1] for p in pre.values()))+1
cw,ch=Lmax+Rmax,Amax+Bmax
# altura visible del cuerpo en reposo (para calcular H en pantalla)
ib=pre['paladin_idle'];ys=np.where(np.array(ib[0])[...,3]>40)[0];cuerpo=int(ib[1]-ys.min())
K=min(1,190/ch)
sp=[]
for sid,(img,base,axx) in pre.items():
    can=Image.new('RGBA',(cw,ch),(0,0,0,0));can.alpha_composite(img,(Lmax-int(round(axx)),Amax-base))
    if K<1:can=can.resize((max(1,round(cw*K)),max(1,round(ch*K))),Image.LANCZOS)
    sp.append((sid,can))
atlas,desc=empaquetar(sp,1024);atlas.save(f'{OUT}/paladin-rework.png',optimize=True)
FIG=66                                     # altura del cuerpo en pantalla (el resto de héroes: 58-74)
H=round(ch*FIG/cuerpo,1);ax=round(Lmax/cw,3);ay=round(Amax/ch,3)
meta={'idle':'paladin_idle','atk':'paladin_a1_2','walk':['paladin_walk_1','paladin_walk_2'],
      'atks':[['paladin_a1_1','paladin_a1_2','paladin_a1_3'],['paladin_a2_1','paladin_a2_2','paladin_a2_3'],['paladin_a3_1','paladin_a3_2','paladin_a3_3','paladin_a3_4']],
      'ax':ax,'ay':ay,'H':H}
with open(f'{OUT}/pack2.js','w',encoding='utf-8') as fh:
    fh.write('/* Generado por tools/empaquetar_paladin_rework.py. Se carga después de pack.js: reemplaza sus sprites y metadatos. No editar a mano. */\n')
    fh.write('SPR.addPack("paladin_rework",'+json.dumps({'game':{'img':f'{OUT}/paladin-rework.png','w':atlas.width,'h':atlas.height,'s':desc}},separators=(',',':'))+');\n')
    fh.write('SPR.addMeta("paladin",'+json.dumps(meta,separators=(',',':'))+');\n')
bg=Image.new('RGBA',atlas.size,(70,100,70,255));bg.alpha_composite(atlas);bg.convert('RGB').save('guias-arte/prev-paladin-rework.png')
print('lienzo',(cw,ch),'escala',round(K,2),'cuerpo reposo',cuerpo,'H',H,'ax',ax,'ay',ay,'atlas',atlas.size,len(desc))
