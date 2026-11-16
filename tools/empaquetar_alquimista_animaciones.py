"""Recorta las animaciones de habilidades del alquimista (assets/arte-sin-usar/alche rework/*.png: 4 imágenes de 3 filas x 6 fotogramas)
y genera assets/heroes/alchemist/pack3.js + alchemist-anim.png con los sprites alx_<habilidad>_<n>.
Los fotogramas de cada fila se colocan en un lienzo común (mismo tamaño), anclados abajo (efectos de suelo) o al centro, para que conserven su tamaño relativo.
Uso: python tools/empaquetar_alquimista_animaciones.py"""
import os,sys,json,glob
sys.path.insert(0,os.path.dirname(__file__))
os.chdir(os.path.join(os.path.dirname(__file__),'..'))
import numpy as np
from PIL import Image
from empaquetar_torre_lib import quitar_fondo,empaquetar
D='assets/arte-sin-usar/alche rework/'
OUT='assets/heroes/alchemist'
# imagen (prefijo del archivo) -> [(id de habilidad, ancla 'b' abajo / 'c' centro), ...] por filas
GRUPOS={
 'Frasco corrosivo':[('flask','b'),('oil','b'),('spark','b')],
 'Catalizador':[('cat','c'),('mix','c'),('antidote','c')],
 'Delantal protector':[('coat','c'),('distill','c'),('fumes','b')],
 'Gran transmutaci':[('transmute','b'),('gold','c'),('plague','c')],
}
LO=50   # alfa mínimo (quita el halo rosado del fondo)
def clave(path):
    rgb=np.array(Image.open(path).convert('RGB')).astype(int)
    R,G,B=rgb[...,0],rgb[...,1],rgb[...,2];bgm=(R>170)&(G<110)&(B>170)
    a=np.array(quitar_fondo(rgb,np.median(rgb[bgm],axis=0),62,135))
    al=a[...,3].astype(float);a[...,3]=(np.clip((al-LO)/(255-LO),0,1)*255).astype(np.uint8)
    return a
def cortes(v,n,total,rango=50,vent=9):
    # n-1 cortes en los valles de ocupación más cercanos a la división uniforme
    s=np.convolve(v,np.ones(vent)/vent,mode='same');o=[0]
    for k in range(1,n):
        c=int(k*total/n);lo,hi=max(1,c-rango),min(total-1,c+rango);o.append(lo+int(np.argmin(s[lo:hi])))
    return o+[total]
def bbox(c):
    ys,xs=np.where(c[...,3]>40)
    return (int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)) if len(xs) else None
sp=[]
for pref,filas in GRUPOS.items():
    f=[p for p in glob.glob(D+'*.png') if os.path.basename(p).startswith(pref)]
    assert f,pref
    a=clave(f[0]);H,W=a.shape[:2]
    ry=cortes((a[...,3]>40).sum(axis=1),3,H,rango=60,vent=15)
    for r,(sid,anc) in enumerate(filas):
        banda=a[ry[r]:ry[r+1]]
        cx=cortes((banda[...,3]>40).sum(axis=0),6,W)
        fr=[]
        for i in range(6):
            c=banda[:,cx[i]:cx[i+1]];b=bbox(c)
            fr.append(Image.fromarray(c[b[1]:b[3],b[0]:b[2]],'RGBA'))
        cw=max(i.width for i in fr);ch=max(i.height for i in fr)
        k=min(1,230/max(cw,ch))
        for n,im in enumerate(fr,1):
            can=Image.new('RGBA',(cw,ch),(0,0,0,0))
            can.alpha_composite(im,((cw-im.width)//2,(ch-im.height) if anc=='b' else (ch-im.height)//2))
            if k<1:can=can.resize((max(1,round(cw*k)),max(1,round(ch*k))),Image.LANCZOS)
            sp.append((f'alx_{sid}_{n}',can))
        print(sid,anc,(cw,ch),'k',round(k,2))
atlas,desc=empaquetar(sp,1024);atlas.save(f'{OUT}/alchemist-anim.png',optimize=True)
with open(f'{OUT}/pack3.js','w',encoding='utf-8') as fh:
    fh.write('/* Generado por tools/empaquetar_alquimista_animaciones.py. No editar a mano. */\n')
    fh.write('SPR.addPack("alchemist_anim",'+json.dumps({'game':{'img':f'{OUT}/alchemist-anim.png','w':atlas.width,'h':atlas.height,'s':desc}},separators=(',',':'))+');\n')
bg=Image.new('RGBA',atlas.size,(70,100,70,255));bg.alpha_composite(atlas);bg.convert('RGB').save('guias-arte/prev-alchemist-anim.png')
print('atlas',atlas.size,len(desc),'sprites')
