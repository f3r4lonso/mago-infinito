"""Recorta todo el arte que existe pero el juego no usa y lo deja en assets/arte-sin-usar/ (PNG transparentes, uno por sprite):
- efectos: animaciones de assets/heroes/*/fx*.js que ningún código referencia (se cortan del atlas)
- enemigos: hojas assets/enemigos (1,3,4,5,6,7).jpg
- iconos: assets/ICONOS/*
- monje y mago: assets/monk1.jpg y el borrador Gemini del mago
Las hojas con fondo magenta se separan por componentes conexos (sin las líneas de la cuadrícula) y se les quita el fondo.
Uso: python tools/recortar_arte_sin_usar.py"""
import os,re,json,sys,glob
sys.path.insert(0,os.path.dirname(__file__))
import numpy as np
from PIL import Image,ImageDraw
from scipy import ndimage as ndi
from empaquetar_torre_lib import fondo,quitar_fondo
os.chdir(os.path.join(os.path.dirname(__file__),'..'))
OUT='assets/arte-sin-usar'
import shutil;shutil.rmtree(OUT,ignore_errors=True)   # se regenera completa
# ---------- efectos del atlas ----------
EFECTOS={ # héroe -> {familia: [fotogramas o None=todos]}
 'assassin':{'x_dag':None},
 'demon':{'z_coupring':None,'z_coupslash':None,'z_dagger':None,'z_gem':None,'z_gemburst':None,'z_metaburst':None,'z_smoke':None,'z_wings':None},
 'devourer':{'pb_debris':None,'pb_ring':None,'pb_rock':None,'pb_shock':None,'pb_thorn':None},
 'druid':{'u_leafbolt':None,'u_leafimp':None},
 'dwarf':{'d_tsmoke':None},
 'necro':{'n_ghost':None,'n_hand2':None,'n_skull2':None,'n_skullp':None,'n_skullr':None},
 'paladin':{'pl_cross':None,'pl_crown':None,'pl_bubble':[1,2,3,4,6]},
 'troll':{'t_smoke':None,'t_star':None},
}
grupos={}
def guarda(grupo,carpeta,nombre,img):
    d=f'{OUT}/{grupo}/{carpeta}';os.makedirs(d,exist_ok=True)
    img.save(f'{d}/{nombre}.png',optimize=True);grupos.setdefault((grupo,carpeta),[]).append((nombre,img))
n=0
for hid,fams in EFECTOS.items():
    desc={}
    for js in glob.glob(f'assets/heroes/{hid}/fx*.js'):
        t=open(js,encoding='utf-8').read();m=re.search(r'"img":"([^"]+)"',t)
        a=Image.open(m.group(1)).convert('RGBA')
        for k,x,y,w,h in re.findall(r'"([A-Za-z0-9_]+)":\[(\d+),(\d+),(\d+),(\d+)\]',t):
            desc[k]=(a,int(x),int(y),int(w),int(h))
    for fam,frs in fams.items():
        for k in sorted(desc,key=lambda s:(re.sub(r'_\d+$','',s),int(re.search(r'_(\d+)$',s).group(1)))):
            if not re.fullmatch(re.escape(fam)+r'_\d+',k):continue
            i=int(k.rsplit('_',1)[1])
            if frs and i not in frs:continue
            a,x,y,w,h=desc[k];guarda('efectos',hid,k,a.crop((x,y,x+w,y+h)));n+=1
print('efectos',n)
# ---------- hojas con fondo magenta ----------
def sprites_de(path,dil=7,minside=14,lineas=True):
    rgb=np.array(Image.open(path).convert('RGB')).astype(int)
    R,G,B=rgb[...,0],rgb[...,1],rgb[...,2]
    bgm=(R>170)&(G<110)&(B>170)                      # magenta y rosas del fondo
    linea=(R<150)&(G<90)&(B>50)&(B<210)               # líneas oscuras de la cuadrícula
    linea=ndi.binary_dilation(linea&~bgm,iterations=1) if lineas else np.zeros_like(bgm)   # en los iconos el borde morado es parte del icono
    fg=~bgm&~linea
    fg=ndi.binary_opening(fg,iterations=1)
    lab,nl=ndi.label(ndi.binary_dilation(fg,iterations=dil))
    lab=lab*fg                                          # solo píxeles reales
    bg=fondo(rgb) if bgm.sum()<50 else np.median(rgb[bgm],axis=0)
    full=np.array(quitar_fondo(rgb,bg,50,125))
    full[...,3]=np.where(linea&~fg,0,full[...,3])
    out=[]
    for sl in ndi.find_objects(lab):
        if sl is None:continue
        h=sl[0].stop-sl[0].start;w=sl[1].stop-sl[1].start
        if h<minside or w<minside:continue
        m=(lab[sl]>0)
        if m.sum()<400:continue
        crop=full[sl].copy();crop[...,3]=np.where(ndi.binary_dilation(m,iterations=2),crop[...,3],0)
        out.append(((sl[0].start,sl[1].start),Image.fromarray(crop,'RGBA')))
    out.sort(key=lambda o:(round(o[0][0]/70),o[0][1]))   # orden de lectura aproximado
    return [im for _,im in out]
def sprites_rejilla(path,cols,rows,recorte_abajo=0):
    # hojas con cuadrícula uniforme: cada celda es un sprite (se recorta al contenido)
    rgb=np.array(Image.open(path).convert('RGB')).astype(int);H,W=rgb.shape[:2]
    R,G,B=rgb[...,0],rgb[...,1],rgb[...,2]
    bgm=(R>170)&(G<110)&(B>170);linea=ndi.binary_dilation(((R<150)&(G<90)&(B>50)&(B<210))&~bgm,iterations=1)
    bg=np.median(rgb[bgm],axis=0);full=np.array(quitar_fondo(rgb,bg,50,125));full[...,3]=np.where(linea,0,full[...,3])
    out=[]
    for r in range(rows):
        for c in range(cols):
            y0,y1,x0,x1=int(r*H/rows)+5,int((r+1)*H/rows)-5-recorte_abajo,int(c*W/cols)+5,int((c+1)*W/cols)-5
            cell=full[y0:y1,x0:x1];ys,xs=np.where(cell[...,3]>40)
            if len(xs)<150:continue
            out.append(Image.fromarray(cell[ys.min():ys.max()+1,xs.min():xs.max()+1],'RGBA'))
    return out
def sprites_bandas(path):
    # iconos separados por huecos magenta: filas y columnas por proyección
    rgb=np.array(Image.open(path).convert('RGB')).astype(int)
    R,G,B=rgb[...,0],rgb[...,1],rgb[...,2];bgm=(R>170)&(G<110)&(B>170);fg=~bgm
    bg=np.median(rgb[bgm],axis=0);full=np.array(quitar_fondo(rgb,bg,50,125))
    def runs(v,gap=1,mn=20):
        idx=np.where(v)[0];o=[];s0=p0=None
        for i in idx:
            if s0 is None:s0=p0=i
            elif i-p0>gap:o.append((s0,p0+1));s0=i
            p0=i
        if s0 is not None:o.append((s0,p0+1))
        return [r for r in o if r[1]-r[0]>=mn]
    out=[]
    for a,b in runs(fg.mean(axis=1)>.03):
        for c,d in runs(fg[a:b].mean(axis=0)>.03):
            out.append(Image.fromarray(full[a:b,c:d],'RGBA'))
    return out
HOJAS=[ # (archivo, grupo, carpeta, nombre, dilatación)
 ('assets/enemigos (1).jpg','enemigos','hoja1_gemas_y_cangrejos','enemigo',16),
 ('assets/enemigos (3).jpg','enemigos','hoja3_libros_y_cajas','enemigo',9),
 ('assets/enemigos (4).jpg','enemigos','hoja4_golems_naranja','enemigo',9),
 ('assets/enemigos (5).jpg','enemigos','hoja5_hormigas_y_maquinas','enemigo',9,'rejilla',8,4,18),
 ('assets/enemigos (6).jpg','enemigos','hoja6_libros_y_cajas_v2','enemigo',9),
 ('assets/enemigos (7).jpg','enemigos','hoja7_criaturas_electronicas','enemigo',10,'rejilla',7,4),
 ('assets/ICONOS/MAGO ICONOS.png','iconos','mago','icono_mago',2,'bandas'),
 ('assets/ICONOS/TORRE ICONOS.png','iconos','torre','icono_torre',2,False),
 ('assets/ICONOS/acesino_iconos.jpg','iconos','asesino','icono_asesino',2,False),
 ('assets/monk1.jpg','monje','hoja_panda','panda',10,'rejilla',8,4),
 ('assets/Gemini_Generated_Image_ghn0esghn0esghn0.jpg','mago','borrador_gemini','mago',9),
]
for path,grupo,carpeta,nombre,dil,*op in HOJAS:
    if not os.path.exists(path):print('falta',path);continue
    if op and op[0]=='rejilla':sp=sprites_rejilla(path,op[1],op[2],op[3] if len(op)>3 else 0)
    elif op and op[0]=='bandas':sp=sprites_bandas(path)
    else:sp=sprites_de(path,dil,lineas=op[0] if op else True)
    for i,im in enumerate(sp,1):guarda(grupo,carpeta,f'{nombre}_{i:02d}',im)
    print(grupo,carpeta,len(sp))
# ---------- vistas previas e índice ----------
def hoja_previa(items,ruta,T=96,cols=12):
    rows=(len(items)+cols-1)//cols
    sh=Image.new('RGB',(cols*T,rows*(T+12)),(60,90,60));d=ImageDraw.Draw(sh)
    for i,(nm,im) in enumerate(items):
        t=im.copy();t.thumbnail((T-4,T-4));x,y=(i%cols)*T,(i//cols)*(T+12)
        sh.paste(t,(x+2,y+12),t);d.text((x+2,y),nm[-14:],fill=(255,255,255))
    sh.save(ruta)
md=['# Arte sin usar (recortado y transparente)','','Todo lo de esta carpeta existe en el proyecto pero **ningún código del juego lo usa**. Generado por `tools/recortar_arte_sin_usar.py`; cada PNG ya está recortado y con fondo transparente.','']
for (grupo,carpeta),items in sorted(grupos.items()):
    hoja_previa(items,f'{OUT}/{grupo}/{carpeta}/_vista_previa.png')
    fams={}
    for nm,_ in items:
        f=re.sub(r'_\d+$','',nm);fams[f]=fams.get(f,0)+1
    md.append(f'## {grupo}/{carpeta} — {len(items)} sprites')
    md.append(('Familias (fotogramas): '+', '.join(f'`{k}` ({v})' for k,v in fams.items())) if grupo=='efectos' else f'Archivos `{items[0][0]}` … `{items[-1][0]}`. Vista previa: `{grupo}/{carpeta}/_vista_previa.png`')
    md.append('')
open(f'{OUT}/INDICE.md','w',encoding='utf-8').write('\n'.join(md))
print('total',sum(len(v) for v in grupos.values()),'sprites en',OUT)
