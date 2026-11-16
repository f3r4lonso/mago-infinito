"""Detecta las celdas de una hoja de sprites por las lineas oscuras de la cuadricula."""
from PIL import Image
import numpy as np, sys, json

def runs(mask):
    out=[];s=None
    for i,v in enumerate(mask):
        if v and s is None:s=i
        if not v and s is not None:out.append((s,i-1));s=None
    if s is not None:out.append((s,len(mask)-1))
    return out

def detectar(path,hlines_min=0.55,vfrac=0.80):
    im=np.array(Image.open(path).convert('RGB')).astype(int)
    H,W,_=im.shape
    dark=(im.sum(axis=2)<230)
    rowfrac=dark.sum(axis=1)/W
    hl=[(a,b) for a,b in runs(rowfrac>hlines_min)]
    # bandas = huecos entre lineas horizontales largas
    bands=[]
    edges=[(-1,-1)]+hl+[(H,H)]
    for (a0,b0),(a1,b1) in zip(edges,edges[1:]):
        if a1-b0>20:bands.append((b0+1,a1-1))
    return im,dark,bands

def celdas_banda(dark,band,W,vfrac=0.80):
    y0,y1=band
    sub=dark[y0:y1+1]
    colfrac=sub.sum(axis=0)/max(1,sub.shape[0])
    vl=runs(colfrac>vfrac)
    xs=[(-1,-1)]+vl+[(W,W)]
    cells=[]
    for (a0,b0),(a1,b1) in zip(xs,xs[1:]):
        if a1-b0>20:cells.append((b0+1,y0,a1-1,y1))
    return cells

if __name__=='__main__':
    im,dark,bands=detectar(sys.argv[1])
    H,W,_=im.shape
    print('bandas',bands)
    for b in bands:
        print(b,celdas_banda(dark,b,W))
