"""Recorta torre_hoja1.png (juego) y torre_hoja2.png (UI), quita el magenta y genera:
   assets/tower/tower-juego.png, assets/tower/tower-ui.png, assets/tower/pack.js
Uso: python tools/empaquetar_torre.py   (reutiliza las funciones de empaquetar_mago.py)"""
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__))
from PIL import Image
import numpy as np
from celdas import detectar, celdas_banda

# funciones compartidas (copiadas de empaquetar_mago.py para no ejecutar aquel script al importarlo)
def fondo(rgb):
    p=5;q=[rgb[:p,:p],rgb[:p,-p:],rgb[-p:,:p],rgb[-p:,-p:]]
    return np.median(np.concatenate([a.reshape(-1,3) for a in q]),axis=0)
def quitar_fondo(rgb,bg,d0=38,d1=105):
    f=rgb.astype(float);d=np.sqrt(((f-bg)**2).sum(axis=2));a=np.clip((d-d0)/(d1-d0),0,1)
    col=np.clip((f-(1-a)[...,None]*bg)/np.maximum(a,0.02)[...,None],0,255)
    return Image.fromarray(np.dstack([col,a*255]).astype(np.uint8),'RGBA')
def recortar(img,pad=2):
    a=np.array(img)[...,3];ys,xs=np.where(a>10)
    if len(xs)==0:return img
    return img.crop((max(0,xs.min()-pad),max(0,ys.min()-pad),min(img.width,xs.max()+1+pad),min(img.height,ys.max()+1+pad)))
def empaquetar(sprites,ancho,sep=3):
    orden=sorted(sprites,key=lambda s:-s[1].height);x=y=fila=0;pos={}
    for n,s in orden:
        if x+s.width+sep>ancho:x=0;y+=fila+sep;fila=0
        pos[n]=(x,y);x+=s.width+sep;fila=max(fila,s.height)
    atlas=Image.new('RGBA',(ancho,y+fila+sep),(0,0,0,0));desc={}
    for n,s in sprites:
        px,py=pos[n];atlas.paste(s,(px,py));desc[n]=[px,py,s.width,s.height]
    return atlas,desc
def runs(m,minlen=1):
    o=[];s=None
    for i,v in enumerate(m):
        if v and s is None:s=i
        if not v and s is not None:
            if i-s>=minlen:o.append((s,i))
            s=None
    if s is not None:o.append((s,len(m)))
    return o

OUT='assets/tower';os.makedirs(OUT,exist_ok=True)

# ---------- Hoja 1 (juego): 7 x 4 ----------
NAMES=['t_base','t_floor_a','t_floor_b','t_roof','t_crystal','t_ruins','t_bolt',
       't_impact','s_arcane','s_fire','s_bolt','s_dark','s_spear','s_hail',
       's_wind','s_coin','u_cyc_idle','u_cyc_hit','u_skelw_1','u_skelw_2','u_skela_1',
       'u_skela_2','p_nova','p_hole','p_barrier','p_quake','p_spring','p_heal']
im,dark,bandas=detectar('assets/torre_hoja1.png');H,W,_=im.shape
cells=[c for b in bandas for c in celdas_banda(dark,b,W)]
print('celdas detectadas:',len(cells),'bandas',len(bandas))
assert len(cells)==28,'se esperaban 28 celdas'
juego=[]
for n,(x0,y0,x1,y1) in zip(NAMES,cells):
    rgb=im[y0+3:y1-2,x0+3:x1-2]
    d0,d1=(95,165) if n in ('t_crystal','p_heal') else (38,105)   # brillos: recorte mas duro para quitar la neblina del fondo
    juego.append((n,recortar(quitar_fondo(rgb,fondo(rgb),d0,d1))))
atlas,desc=empaquetar(juego,1024);atlas.save(f'{OUT}/tower-juego.png',optimize=True);print('juego',atlas.size)

# ---------- Hoja 2 (UI): 6 x 4 casillas ----------
UI=['arcane','fire','elec','smite','dark','spear','pulse','hail','orbit','lightning','wind','goldshot',
    'nova','storm','skel','freeze','meteor','judge','hole','barrier','quake','spring','tower','towerbasic']
im2=np.array(Image.open('assets/torre_hoja2.png').convert('RGB')).astype(int)
fg=np.sqrt(((im2-np.array([240,55,248]))**2).sum(axis=2))>90
bands=runs(fg.sum(axis=1)/im2.shape[1]>0.03,20);print('filas',len(bands))
assert len(bands)==4
ico=[];k=0
for (a,b) in bands:
    cols=runs(fg[a:b].sum(axis=0)/(b-a)>0.05,20);assert len(cols)==6,len(cols)
    for (x0,x1) in cols:
        rgb=im2[a-2:b+2,x0-2:x1+2]
        s=recortar(quitar_fondo(rgb,fondo(rgb)),0).resize((96,96),Image.LANCZOS)
        ico.append(('ico_'+UI[k],s));k+=1
atlas2,desc2=empaquetar(ico,480);atlas2.save(f'{OUT}/tower-ui.png',optimize=True);print('ui',atlas2.size)
with open(f'{OUT}/pack.js','w',encoding='utf-8') as f:
    f.write('/* Generado por tools/empaquetar_torre.py. No editar a mano. */\n')
    f.write('SPR.addPack("tower",'+json.dumps({'game':{'img':'assets/tower/tower-juego.png','w':atlas.width,'h':atlas.height,'s':desc},
        'ui':{'img':'assets/tower/tower-ui.png','w':atlas2.width,'h':atlas2.height,'s':desc2}},separators=(',',':'))+');\n')
print('pack.js escrito')
