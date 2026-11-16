"""Funciones comunes de recorte (extraidas de empaquetar_torre.py)."""
from PIL import Image
import numpy as np
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

