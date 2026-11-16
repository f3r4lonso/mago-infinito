"""Recorta el rework del alquimista (assets/arte-sin-usar/alche rework/*.jpg) y genera
assets/heroes/alchemist/pack2.js + alchemist-rework.png + alchemist-rework-ui.png.
pack2.js se carga DESPUÉS de pack.js: los sprites con el mismo id reemplazan a los antiguos.
- alche-rework.jpg (6x3): cuerpo (reposo, caminar, ataque, golpeado), proyectil, impacto y retrato
- alche-habilidades rework.jpg (4x3): 12 efectos de habilidad (uno por celda)
Uso: python tools/empaquetar_alquimista_rework.py"""
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__))
os.chdir(os.path.join(os.path.dirname(__file__),'..'))
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from empaquetar_torre_lib import quitar_fondo,empaquetar
D='assets/arte-sin-usar/alche rework/'
OUT='assets/heroes/alchemist'
STRICT=90   # el JPG deja un halo rosado: el alfa por debajo se descarta
def clave(path):
    rgb=np.array(Image.open(path).convert('RGB')).astype(int)
    R,G,B=rgb[...,0],rgb[...,1],rgb[...,2]
    bgm=(R>170)&(G<110)&(B>170)
    linea=ndi.binary_dilation(((R<150)&(G<90)&(B>50)&(B<210))&~bgm,iterations=1)
    bg=np.median(rgb[bgm],axis=0)
    a=np.array(quitar_fondo(rgb,bg,62,135))
    # las líneas de la cuadrícula ya quedan fuera por el margen de cada celda; quitarlas por color borraría los contornos violetas del arte
    al=a[...,3].astype(float);a[...,3]=(np.clip((al-STRICT)/(255-STRICT),0,1)*255).astype(np.uint8)
    return a
def celdas(a,cols,rows,ins):
    H,W=a.shape[:2];o=[]
    for r in range(rows):
        for c in range(cols):
            o.append(a[int(r*H/rows)+ins:int((r+1)*H/rows)-ins,int(c*W/cols)+ins:int((c+1)*W/cols)-ins])
    return o
def bbox(c):
    ys,xs=np.where(c[...,3]>30)
    return (int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)) if len(xs) else None
def img(c,box=None):
    if box:c=c[box[1]:box[3],box[0]:box[2]]
    return Image.fromarray(c,'RGBA')
def esc(im,maxl):
    k=min(1,maxl/max(im.size));return im.resize((max(1,round(im.width*k)),max(1,round(im.height*k))),Image.LANCZOS) if k<1 else im
sp=[]
# ---------- cuerpo: 6 x 3 (1-based: fila*6+columna) ----------
body=celdas(clave(D+'alche-rework.jpg'),6,3,7)
CUERPO={'idle':1,'walk':[3,8,4,9],'atk':[5,11,6],'hurt':13}
usados=[CUERPO['idle']]+CUERPO['walk']+CUERPO['atk']
bbs=[bbox(body[i-1]) for i in usados]
u=(min(b[0] for b in bbs),min(b[1] for b in bbs),max(b[2] for b in bbs),max(b[3] for b in bbs))   # mismo recuadro para todas las poses: alineadas
K=min(1,170/(u[3]-u[1]))
def cuerpo(i):
    c=img(body[i-1],u);return c.resize((max(1,round(c.width*K)),max(1,round(c.height*K))),Image.LANCZOS)
sp.append(('alchemist_idle',cuerpo(CUERPO['idle'])))
for n,i in enumerate(CUERPO['walk'],1):sp.append((f'alchemist_walk_{n}',cuerpo(i)))
sp.append(('alchemist_atk',cuerpo(CUERPO['atk'][1])))
sp.append(('alchemist_hurt',cuerpo(CUERPO['hurt'])))
b0=bbox(body[CUERPO['idle']-1]);ax=((b0[0]+b0[2])/2-u[0])/(u[2]-u[0])
print('recuadro',u,'escala',round(K,2),'ax',round(ax,3),'alto',round((u[3]-u[1])*K))
# proyectil, impacto
sp.append(('al_proj',esc(img(body[13],bbox(body[13])),140)))
sp.append(('al_flask_a',esc(img(body[14],bbox(body[14])),140)))
sp.append(('al_splash',esc(img(body[15],bbox(body[15])),140)))
# ---------- habilidades: 4 x 3 ----------
sk=celdas(clave(D+'alche-habilidades rework.jpg'),4,3,16)
HAB=['al_acid','al_oil_zone','al_boom1','al_cat_vortex','al_boom2','al_heal','al_coat_a','al_distill_a','al_fumes_zone','al_fumes_b','al_gold_boom','al_plague_a']
for n,c in zip(HAB,sk):sp.append((n,esc(img(c,bbox(c)),140)))
atlas,desc=empaquetar(sp,1024);atlas.save(f'{OUT}/alchemist-rework.png',optimize=True)
# ---------- interfaz: retrato 96x96 ----------
p=img(body[16],bbox(body[16]));k=88/max(p.size);p=p.resize((max(1,round(p.width*k)),max(1,round(p.height*k))),Image.LANCZOS)
ui=Image.new('RGBA',(96,96),(0,0,0,0));ui.alpha_composite(p,((96-p.width)//2,(96-p.height)//2));ui.save(f'{OUT}/alchemist-rework-ui.png',optimize=True)
pack={'game':{'img':f'{OUT}/alchemist-rework.png','w':atlas.width,'h':atlas.height,'s':desc},
      'ui':{'img':f'{OUT}/alchemist-rework-ui.png','w':96,'h':96,'s':{'alchemist_portrait':[0,0,96,96],'alchemist_icon':[0,0,96,96]}}}
with open(f'{OUT}/pack2.js','w',encoding='utf-8') as fh:
    fh.write('/* Generado por tools/empaquetar_alquimista_rework.py. Se carga después de pack.js: reemplaza sus sprites. No editar a mano. */\n')
    fh.write('SPR.addPack("alchemist_rework",'+json.dumps(pack,separators=(',',':'))+');\n')
bg=Image.new('RGBA',atlas.size,(70,100,70,255));bg.alpha_composite(atlas);bg.convert('RGB').save('guias-arte/prev-alchemist-rework.png')
print('atlas',atlas.size,len(desc),'sprites')
