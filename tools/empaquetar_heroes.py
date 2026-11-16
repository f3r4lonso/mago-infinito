"""Recorta las hojas de héroes (assets/*.jpg) y genera, para cada héroe, assets/heroes/<id>/ con atlas y pack.js:
   <id>_idle, <id>_atk (celda completa, alineadas), <id>_proj / <id>_hit (ataque básico) e iconos si hay hoja de iconos.
Uso: python tools/empaquetar_heroes.py"""
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__))
from PIL import Image
import numpy as np
from empaquetar_torre_lib import fondo,quitar_fondo,recortar,empaquetar
D0,D1=62,135
# celdas 1-based en orden de lectura; idle/atk/proj/hit pueden ser un indice o una lista (celdas contiguas de una fila = region unida)
# basic: src (nombre del ataque basico en el juego), w, ax, spin ; melee: efecto al golpear cuerpo a cuerpo
H={
 'archer':dict(f='archer1.jpg',cols=7,rows=4,idle=1,atk=2,proj=3,hit=4,basic=dict(src='Flecha',w=38,ax=.82),hw=34,icons='archer2.jpg',kit='a_crit a_aspd a_multi a_pierce a_frost a_shackle a_snipe a_windrun a_gust a_aura a_hawk a_focus'),
 'assassin':dict(f='acesino1.jpg',grid=True,cols=7,rows=6,idle=1,atk=[2,3],hit=5,melee=True,hw=40,H=58,atks=.78,radial=True,atk_ext=62,fade_r=10,icons='acesino2.jpg',kit='x_poison x_crit x_dodge x_blink x_smoke x_stealth x_mark x_daggers x_clone x_trap x_exec x_dance'),
 'demon':dict(f='demonhunter1.jpg',cols=7,rows=4,idle=1,atk=2,proj=13,hit=14,basic=dict(src='Guadañas viles',w=34,ax=.5,spin=14),hw=38),
 'paladin':dict(f='dragonkings1.jpg',cols=7,rows=4,idle=1,atk=2,melee=True),
 'druid':dict(f='druida1.jpg',cols=7,rows=4,idle=1,atk=2,proj=4,hit=5,basic=dict(src='Cólera',w=44,ax=.8),hw=38),
 'barbarian':dict(f='geurrero1.jpg',cols=8,rows=4,idle=1,atk=3,proj=4,hit=5,basic=dict(src='Hacha giratoria',w=32,ax=.5,spin=18),hw=38),
 'werewolf':dict(f='hombrelobo1.jpg',cols=8,rows=4,idle=1,atk=3,hit=4,melee=True,hw=42,icons='hombrelobo2.jpg',kit='w_bleed w_cleave w_leap w_blood w_hide w_howl w_pack w_rend w_prey w_moon w_alpha w_silver'),
 'troll':dict(f='hunter1.jpg',cols=7,rows=4,idle=1,atk=2,proj=3,hit=4,basic=dict(src='Lanza arrojadiza',w=46,ax=.8),hw=36),
 'monk':dict(f='monk1_.jpg',cols=8,rows=4,idle=1,atk=[2,3],hit=7,melee=True,hw=46,thr=150,H=84,fade_r=90,fade_l=40),
 'necro':dict(f='necro1.jpg',cols=7,rows=4,idle=1,atk=2,proj=3,hit=4,basic=dict(src='Proyectil de hueso',w=34,ax=.8),hw=38),
 'priest':dict(f='priest1.jpg',cols=7,rows=4,idle=1,atk=2,proj=3,hit=20,basic=dict(src='Rayo sagrado',w=56,ax=.9),hw=44,radial=True),
 'devourer':dict(f='primalbeast1.jpg',cols=7,rows=4,idle=1,atk=2,melee=True),
 'shaman':dict(f='shaman1.jpg',cols=8,rows=4,idle=1,atk=2,proj=3,hit=4,basic=dict(src='Descarga estática',w=46,ax=.8),hw=38),
 'dwarf':dict(f='sniper1.jpg',cols=7,rows=4,idle=1,atk=2,proj=3,hit=4,basic=dict(src='Disparo de fusil',w=36,ax=.85),hw=44),
}
GRID=None   # (xs, ys): limites reales de las celdas cuando la cuadricula de la hoja no es uniforme (grid=True en el heroe)
def lineas_cuadricula(im):
    # centros de las lineas moradas de la cuadricula (horizontales y verticales), agrupando las pegadas
    m=(im[...,0]>40)&(im[...,0]<150)&(im[...,1]<60)&(im[...,2]>60)&(im[...,2]<180)
    def centros(v):
        idx=np.where(v>.45)[0];o=[];s=p=None
        for i in idx:
            if s is None:s=p=i
            elif i-p>3:o.append((s+p)//2);s=i
            p=i
        if s is not None:o.append((s+p)//2)
        return o
    return centros(m.mean(axis=0)),centros(m.mean(axis=1))
def region(im,cols,rows,cells,ins=12,ext=None):   # ext: la region unida solo se adentra ext px en la ultima celda (p. ej. la punta de un arma que cruza la linea)
    cells=cells if isinstance(cells,list) else [cells]
    r,c0=divmod(cells[0]-1,cols);c1=divmod(cells[-1]-1,cols)[1]
    Hh,W,_=im.shape;cw,ch=W/cols,Hh/rows
    if GRID:
        xs,ys=GRID;ins=7;x0=int(xs[c0])+ins;reg=im[int(ys[r])+ins:int(ys[r+1])-ins,x0:(int(xs[c1])+ext if ext else int(xs[c1+1])-ins)].copy()
        cw=(xs[c1+1]-xs[c0])/(c1-c0+1)
    else:
        x0=int(c0*cw)+ins;reg=im[int(r*ch)+ins:int((r+1)*ch)-ins,x0:(int(c1*cw)+ext if ext else int((c1+1)*cw)-ins)].copy()
    for k in range(c0+1,c1+1):   # lineas de cuadricula internas de una region unida: se rellenan con las columnas vecinas
        xb=int((GRID[0][k] if GRID else k*cw))-x0
        if 14<xb<reg.shape[1]-14:
            def puntos(x):   # fraccion de pixeles de la columna con el morado de la linea de cuadricula
                c=reg[:,x];return float(((c[:,0]>50)&(c[:,0]<135)&(c[:,1]<30)&(c[:,2]>80)&(c[:,2]<160)).mean())
            xb=max(range(xb-10,xb+11),key=puntos)
            import cv2   # relleno (inpainting) de la franja de la linea con el contenido de alrededor
            # solo los pixeles con el morado de la linea (cerca de la columna detectada), ensanchados un poco
            sub=reg[:,xb-12:xb+13];m=((sub[...,0]>40)&(sub[...,0]<150)&(sub[...,1]<45)&(sub[...,2]>70)&(sub[...,2]<170))
            mask=np.zeros(reg.shape[:2],np.uint8);mask[:,xb-12:xb+13]=m.astype(np.uint8)*255
            mask=cv2.dilate(mask,np.ones((3,3),np.uint8),iterations=2)
            reg=cv2.inpaint(reg.astype(np.uint8),mask,4,cv2.INPAINT_TELEA).astype(int)
    return reg
def pure(rgb,maxl=160):
    s=recortar(quitar_fondo(rgb,fondo(rgb),D0,D1));k=maxl/max(s.size)
    return s.resize((max(1,round(s.width*k)),max(1,round(s.height*k))),Image.LANCZOS) if k<1 else s
def full(rgb,maxl=256,thr=10,k=None):
    s=quitar_fondo(rgb,fondo(rgb),D0,D1);a=np.array(s)[...,3];ys,xs=np.where(a>thr)
    box=(xs.min(),ys.min(),xs.max()+1,ys.max()+1)
    if k is None:k=min(1,maxl/max(s.size))
    s2=s.resize((round(s.width*k),round(s.height*k)),Image.LANCZOS) if k<1 else s
    return s2,(box[0]*k,box[1]*k,box[2]*k,box[3]*k)
def runs(m,minlen=1):
    o=[];s=None
    for i,v in enumerate(m):
        if v and s is None:s=i
        if not v and s is not None:
            if i-s>=minlen:o.append((s,i))
            s=None
    if s is not None:o.append((s,len(m)))
    return o
for hid,cfg in H.items():
    im=np.array(Image.open('assets/'+cfg['f']).convert('RGB')).astype(int)
    GRID=None
    if cfg.get('grid'):
        xs_,ys_=lineas_cuadricula(im);assert len(xs_)==cfg['cols']+1 and len(ys_)==cfg['rows']+1,(hid,xs_,ys_);GRID=(xs_,ys_)
    out=f'assets/heroes/{hid}';os.makedirs(out,exist_ok=True)
    sp=[]
    ri=region(im,cfg['cols'],cfg['rows'],cfg['idle']);idle,box=full(ri,thr=cfg.get('thr',10));sp.append((f'{hid}_idle',idle))
    k_idle=idle.width/ri.shape[1]   # misma escala para el ataque
    atk,_=full(region(im,cfg['cols'],cfg['rows'],cfg['atk'],ext=cfg.get('atk_ext')),k=k_idle)
    atkax=None
    if abs(atk.width-idle.width)<=2 and abs(atk.height-idle.height)<=2:atk=atk.resize(idle.size,Image.LANCZOS)
    else:atkax=round(((box[0]+box[2])/2)/atk.width,3)   # ataque de varias celdas: el cuerpo queda en la primera
    if cfg.get('atks'):atk=atk.resize((round(atk.width*cfg['atks']),round(atk.height*cfg['atks'])),Image.LANCZOS)   # la pose de ataque viene dibujada mas grande que la de reposo
    a=np.array(atk);fr_=cfg.get('fade_r',24);fl_=cfg.get('fade_l',0)
    a[:,-fr_:,3]=(a[:,-fr_:,3]*np.linspace(1,0,fr_)[None,:]).astype(np.uint8)
    if fl_:a[:,:fl_,3]=(a[:,:fl_,3]*np.linspace(0,1,fl_)[None,:]).astype(np.uint8)
    atk=Image.fromarray(a,'RGBA');sp.append((f'{hid}_atk',atk))
    if 'proj' in cfg:sp.append((f'{hid}_proj',pure(region(im,cfg['cols'],cfg['rows'],cfg['proj']),150)))
    if 'hit' in cfg:
        hs=pure(region(im,cfg['cols'],cfg['rows'],cfg['hit']),150)
        if cfg.get('radial'):   # el efecto llena toda la celda: se desvanece en circulo para que no quede cuadrado
            a=np.array(hs).astype(float);hh,ww=a.shape[:2];yy,xx=np.mgrid[0:hh,0:ww]
            r=np.sqrt(((xx-ww/2)/(ww/2))**2+((yy-hh/2)/(hh/2))**2);a[...,3]*=np.clip((1-r)/.3,0,1);hs=Image.fromarray(a.astype(np.uint8),'RGBA')
        sp.append((f'{hid}_hit',hs))
    atlas,desc=empaquetar(sp,1024);atlas.save(f'{out}/{hid}-juego.png',optimize=True)
    pack={'game':{'img':f'assets/heroes/{hid}/{hid}-juego.png','w':atlas.width,'h':atlas.height,'s':desc}}
    if 'icons' in cfg:
        im2=np.array(Image.open('assets/'+cfg['icons']).convert('RGB')).astype(int)
        fg=np.sqrt(((im2-fondo(im2))**2).sum(axis=2))>90
        bands=runs(fg.sum(axis=1)/im2.shape[1]>0.03,20);assert len(bands)==3,(hid,bands)
        names=cfg['kit'].split()+[f'{hid}_icon',f'{hid}_basic_icon',f'{hid}_portrait'];ico=[];k=0
        for (y0,y1) in bands:
            for (x0,x1) in runs(fg[y0:y1].sum(axis=0)/(y1-y0)>0.05,20):
                if k>=len(names):continue   # casillas vacias de la ultima fila
                rgb=im2[max(0,y0-2):y1+2,max(0,x0-2):x1+2];ico.append((names[k],recortar(quitar_fondo(rgb,fondo(rgb),D0,D1),0).resize((96,96),Image.LANCZOS)));k+=1
        assert k==15,(hid,k)
        at2,d2=empaquetar(ico,480);at2.save(f'{out}/{hid}-ui.png',optimize=True)
        pack['ui']={'img':f'assets/heroes/{hid}/{hid}-ui.png','w':at2.width,'h':at2.height,'s':d2}
    bw,bh=box[2]-box[0],box[3]-box[1];W_,H_=idle.size
    meta={'idle':f'{hid}_idle','atk':f'{hid}_atk','ax':round((box[0]+bw/2)/W_,3),'ay':round(box[3]/H_,3),'H':cfg.get('H',round(64/(bh/H_),1))}
    if atkax is not None:meta['atkax']=atkax
    if 'basic' in cfg:
        b=dict(cfg['basic']);meta['basic']={'src':b['src'],'proj':f'{hid}_proj','w':b['w'],'ax':b['ax'],'spin':b.get('spin',0),'hit':f'{hid}_hit' if 'hit' in cfg else '','hw':cfg.get('hw',36)}
    if cfg.get('melee') and 'hit' in cfg:meta['melee']={'hit':f'{hid}_hit','w':cfg.get('hw',38)}
    with open(f'{out}/pack.js','w',encoding='utf-8') as f:
        f.write('/* Generado por tools/empaquetar_heroes.py. No editar a mano. */\n')
        f.write(f'SPR.addPack("{hid}",'+json.dumps(pack,separators=(',',':'))+');\n')
        f.write(f'SPR.addMeta("{hid}",'+json.dumps(meta,separators=(',',':'),ensure_ascii=False)+');\n')
    print(hid,'ok',atlas.size,'con iconos' if 'icons' in cfg else '')
# hoja de contacto para revisar el resultado
cs=[]
for hid in H:
    a=Image.open(f'assets/heroes/{hid}/{hid}-juego.png')
    d=json.loads(open(f'assets/heroes/{hid}/pack.js',encoding='utf8').read().split('SPR.addPack("'+hid+'",')[1].split(');\n')[0])['game']['s']
    cs.append([a.crop((r[0],r[1],r[0]+r[2],r[1]+r[3])) for n,r in d.items()])
Wt=max(sum(min(i.width,170)+4 for i in r) for r in cs);Ht=len(cs)*174
sheet=Image.new('RGBA',(Wt,Ht),(70,100,70,255))
for i,r in enumerate(cs):
    x=0
    for im_ in r:
        t=im_.copy();t.thumbnail((170,170));sheet.alpha_composite(t,(x,i*174));x+=t.width+4
sheet.convert('RGB').save('guias-arte/prev-heroes.png');print(sheet.size)
