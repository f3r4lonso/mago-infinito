"""Recorta mago_hoja1.png y mago_hoja2.png, quita el fondo magenta y genera:
   assets/heroes/mage/mage-juego.png  (sprites del juego)
   assets/heroes/mage/mage-ui.png     (iconos de interfaz)
   assets/heroes/mage/pack.js         (descriptor: coordenadas de cada sprite)
Uso: python tools/empaquetar_mago.py
"""
from PIL import Image
import numpy as np, json, os, sys
sys.path.insert(0,os.path.dirname(__file__))
from celdas import detectar, celdas_banda

SRC1='assets/mago_hoja1.png'; SRC2='assets/mago_hoja2.png'
OUT='assets/heroes/mage'; os.makedirs(OUT,exist_ok=True)

def fondo(rgb):
    h,w,_=rgb.shape; p=5
    parches=[rgb[:p,:p],rgb[:p,-p:],rgb[-p:,:p],rgb[-p:,-p:]]
    return np.median(np.concatenate([q.reshape(-1,3) for q in parches]),axis=0)

def quitar_fondo(rgb,bg,d0=38,d1=105):
    f=rgb.astype(float)
    d=np.sqrt(((f-bg)**2).sum(axis=2))
    a=np.clip((d-d0)/(d1-d0),0,1)
    aa=np.maximum(a,0.02)[...,None]
    col=np.clip((f-(1-a)[...,None]*bg)/aa,0,255)
    out=np.dstack([col,a*255]).astype(np.uint8)
    return Image.fromarray(out,'RGBA')

def recortar(img,pad=2):
    a=np.array(img)[...,3]
    ys,xs=np.where(a>10)
    if len(xs)==0:return img
    x0,x1,y0,y1=max(0,xs.min()-pad),min(img.width,xs.max()+1+pad),max(0,ys.min()-pad),min(img.height,ys.max()+1+pad)
    return img.crop((x0,y0,x1,y1))

def sprite_de_celda(im,rect,inset=3):
    x0,y0,x1,y1=rect
    rgb=im[y0+inset:y1-inset+1,x0+inset:x1-inset+1]
    return recortar(quitar_fondo(rgb,fondo(rgb)))

def empaquetar(sprites,ancho,sep=3):
    """sprites: lista (nombre,img). Empaquetado por estantes. Devuelve (atlas,dict)."""
    orden=sorted(sprites,key=lambda s:-s[1].height)
    x=y=fila=0;pos={}
    for n,s in orden:
        if x+s.width+sep>ancho:x=0;y+=fila+sep;fila=0
        pos[n]=(x,y);x+=s.width+sep;fila=max(fila,s.height)
    alto=y+fila+sep
    atlas=Image.new('RGBA',(ancho,alto),(0,0,0,0))
    desc={}
    for n,s in sprites:
        px,py=pos[n];atlas.paste(s,(px,py));desc[n]=[px,py,s.width,s.height]
    return atlas,desc

# ---------- Hoja 1 (juego) ----------
im1,dark,bandas=detectar(SRC1);H,W,_=im1.shape
rows=[celdas_banda(dark,b,W) for b in bandas]
nombres=[
 ['hero','cape','torso','head','staff','bolt','impact'],
 [None,'iceblock','iceshards','ghost','iceexplosion','chainlink','pulsering'],
 ['pulsemarker','runecircle','tornado1','tornado2','tornado3','tornado4','windring','sunbeam'],
 ['sunimpact','spirit1','spirit2','spirit3','spirit4','meteor1','meteor2','crater'],
 ['flame','fireball','blastarcs','snow1','snow2','frostpatch','lagunabeam','flare'],
]
juego=[]
for r,fila in enumerate(nombres):
    for c,n in enumerate(fila):
        if n is None:continue
        rect=rows[r][c]
        if n=='hero':rect=(rows[0][0][0],rows[0][0][1],rows[1][0][2],rows[1][0][3])
        juego.append((n,sprite_de_celda(im1,rect)))
atlas,desc=empaquetar(juego,1024)
atlas.save(f'{OUT}/mage-juego.png',optimize=True)
print('juego',atlas.size,len(desc))

# ---------- Hoja 2 (iconos) ----------
im2=np.array(Image.open(SRC2).convert('RGB')).astype(int)
d=np.sqrt(((im2-np.array([240,55,248]))**2).sum(axis=2)); fg=d>90
def runs(m,minlen=1):
    o=[];s=None
    for i,v in enumerate(m):
        if v and s is None:s=i
        if not v and s is not None:
            if i-s>=minlen:o.append((s,i))
            s=None
    if s is not None:o.append((s,len(m)))
    return o
bandas2=runs(fg.sum(axis=1)/im2.shape[1]>0.03,20)
habs=['i_cold','i_ghost','i_wall','i_emp','i_tornado','i_alacrity','i_sun','i_forge','i_meteor','i_blast','i_field','i_laguna']
ui=[]
for r,(a,b) in enumerate(bandas2):
    cols=runs(fg[a:b].sum(axis=0)/(b-a)>0.05,20)
    if r<6:
        for k in (0,1):
            x0,x1=cols[k*6]
            ui.append((habs[r*2+k],(x0,a,x1,b)))
    else:
        for n,(x0,x1) in zip(['hero_icon','basic_icon','hero_portrait'],cols[:3]):
            ui.append((n,(x0,a,x1,b)))
ico=[]
for n,(x0,y0,x1,y1) in ui:
    rgb=im2[y0-2:y1+2,x0-2:x1+2]
    s=quitar_fondo(rgb,fondo(rgb));s=recortar(s,0)
    s=s.resize((96,96),Image.LANCZOS)
    ico.append((n,s))
atlas2,desc2=empaquetar(ico,480)
atlas2.save(f'{OUT}/mage-ui.png',optimize=True)
print('ui',atlas2.size,len(desc2))

with open(f'{OUT}/pack.js','w',encoding='utf-8') as f:
    f.write('/* Generado por tools/empaquetar_mago.py. No editar a mano. */\n')
    f.write('SPR.addPack("mage",'+json.dumps({
        'game':{'img':'assets/heroes/mage/mage-juego.png','w':atlas.width,'h':atlas.height,'s':desc},
        'ui':{'img':'assets/heroes/mage/mage-ui.png','w':atlas2.width,'h':atlas2.height,'s':desc2}
    },separators=(',',':'))+');\n')
print('pack.js escrito')
