"""Recorta invocados1.jpg, invocados2.jpg y dragon1.jpg (rejilla de 6 x 4, cada unidad en 2 celdas = 2 fotogramas)
y genera assets/summons/ (atlas y pack.js). Los dos fotogramas de cada unidad se recortan con el mismo recuadro
para que no salten al alternarse.  Uso: python tools/empaquetar_invocadas.py"""
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__))
from PIL import Image
import numpy as np
from empaquetar_torre_lib import fondo,quitar_fondo,empaquetar
D0,D1=62,135
OUT='assets/summons';os.makedirs(OUT,exist_ok=True)
# (archivo, [ (nombre, celda 1-based del fotograma A) ... ], lado maximo)
HOJAS=[
 ('invocados1.jpg',[('a_golem',1),('a_mummy',3),('a_vamp',5),('a_angel',7),('a_wolf',9),('a_raptor',11),('a_treant',13),('a_abom',15),('a_cub',17),('a_boar',19),('a_alpha',21),('a_larva',23)],160),
 ('invocados2.jpg',[('a_sbear',1),('a_sclone',3),('a_hawk',5),('a_turret',7),('a_mine',9),('a_totem_troll',11),('a_totem_thunder',13),('a_totem_tide',15)],160),
 ('dragon1.jpg',[('dr_egg',1),('dr_t1',3),('dr_t2',5),('dr_t3',7),('dr_t4',9),('dr_t5',11),('dr_skel',13)],200),
]
SUELTOS=[('dragon1.jpg','dr_fx_breath',15),('dragon1.jpg','dr_fx_bite',16),('dragon1.jpg','dr_fx_tail',17)]   # celdas de un solo sprite
COLS,ROWS,INS=6,4,12
def celda(im,idx):
    r,c=divmod(idx-1,COLS);H,W,_=im.shape;cw,ch=W/COLS,H/ROWS
    return im[int(r*ch)+INS:int((r+1)*ch)-INS,int(c*cw)+INS:int((c+1)*cw)-INS]
def fondo_robusto(rgb):
    # el magenta mas comun de la celda (las esquinas pueden traer restos oscuros de la cuadricula)
    m=(rgb[...,0]>200)&(rgb[...,1]<60)&(rgb[...,2]>200)
    return np.median(rgb[m],axis=0) if m.sum()>300 else fondo(rgb)
def clave(rgb):
    img=quitar_fondo(rgb,fondo_robusto(rgb),D0,D1);a=np.array(img)
    # restos de la cuadricula (morado oscuro) en la franja del borde de la celda
    linea=(rgb[...,0]>55)&(rgb[...,0]<140)&(rgb[...,1]<40)&(rgb[...,2]>85)&(rgb[...,2]<150)
    borde=np.zeros(linea.shape,bool);borde[:20,:]=True;borde[-20:,:]=True;borde[:,:20]=True;borde[:,-20:]=True
    a[linea&borde,3]=0
    return Image.fromarray(a,'RGBA')
def bbox(s):
    a=np.array(s)[...,3];ys,xs=np.where(a>10)
    return (int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1))
def redu(s,maxl):
    k=maxl/max(s.size)
    return s.resize((max(1,round(s.width*k)),max(1,round(s.height*k))),Image.LANCZOS) if k<1 else s
sprites=[];cache={}
for f,lista,maxl in HOJAS:
    cache[f]=np.array(Image.open('assets/'+f).convert('RGB')).astype(int)
    for nombre,idx in lista:
        A=clave(celda(cache[f],idx));B=clave(celda(cache[f],idx+1))
        if nombre=='dr_egg':   # huevo entero y huevo roto: recuadros distintos
            sprites.append(('dr_egg_1',redu(A.crop(bbox(A)),maxl)));sprites.append(('dr_egg_2',redu(B.crop(bbox(B)),maxl)));continue
        ba,bb=bbox(A),bbox(B);u=(min(ba[0],bb[0]),min(ba[1],bb[1]),max(ba[2],bb[2]),max(ba[3],bb[3]))   # recuadro comun
        k=min(1,maxl/max(u[2]-u[0],u[3]-u[1]))
        for n,s in ((nombre+'_1',A),(nombre+'_2',B)):
            c=s.crop(u);sprites.append((n,c.resize((max(1,round(c.width*k)),max(1,round(c.height*k))),Image.LANCZOS) if k<1 else c))
for f,nombre,idx in SUELTOS:
    s=clave(celda(cache[f],idx));sprites.append((nombre,redu(s.crop(bbox(s)),200)))
atlas,desc=empaquetar(sprites,1024);atlas.save(f'{OUT}/summons.png',optimize=True)
with open(f'{OUT}/pack.js','w',encoding='utf-8') as fh:
    fh.write('/* Generado por tools/empaquetar_invocadas.py. No editar a mano. */\n')
    fh.write('SPR.addPack("summons",'+json.dumps({'game':{'img':'assets/summons/summons.png','w':atlas.width,'h':atlas.height,'s':desc}},separators=(',',':'))+');\n')
print('summons',atlas.size,len(desc),'sprites')
bg=Image.new('RGBA',atlas.size,(70,100,70,255));bg.alpha_composite(atlas);bg.convert('RGB').save('guias-arte/prev-summons.png')
