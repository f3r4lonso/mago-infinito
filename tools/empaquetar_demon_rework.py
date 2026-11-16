"""Recorta el rework del cazador de demonios (assets/habilidades y efectos/pro/demon hunter/demonhunter1.png y demonhunter2.png)
y genera assets/heroes/demon/pack2.js + demon-rework.png + demon-rework-ui.png.
- demonhunter1.png (fondo gris liso): cazador normal: reposo, movimiento, ataque a distancia, habilidad especial, golpeado, retrato
- demonhunter2.png (fondo negro): forma demonio (Metamorfosis): reposo, caminar, ataque, ataque especial, herido
Los fotogramas se alinean por los pies dentro de un lienzo común (uno por forma). pack2.js se carga DESPUÉS de pack.js y añade SPR.addMeta("demon", ...).
Uso: python tools/empaquetar_demon_rework.py"""
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__))
os.chdir(os.path.join(os.path.dirname(__file__),'..'))
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from empaquetar_torre_lib import empaquetar
D='assets/habilidades y efectos/pro/demon hunter/'
OUT='assets/heroes/demon'
def cargar(f,bgc,tol,borrar):
    a=np.array(Image.open(D+f).convert('RGBA'))
    for x0,y0,x1,y1 in borrar:a[y0:y1,x0:x1,:3]=bgc
    d=np.abs(a[...,:3].astype(int)-np.array(bgc)).max(axis=2)
    lab,_=ndi.label(d<=tol);ext=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    fg=~np.isin(lab,list(ext));fg=ndi.binary_opening(fg,iterations=1)
    a[...,3]=(fg*255).astype(np.uint8);return a,fg
def comps(fg,dil=5):
    L,n=ndi.label(ndi.binary_dilation(fg,iterations=dil));o=[]
    for sl in ndi.find_objects(L):
        h=sl[0].stop-sl[0].start;w=sl[1].stop-sl[1].start
        if h>=45 and w>=20:o.append((sl[1].start,sl[0].start,sl[1].stop,sl[0].stop))
    return o
def en(objs,x0,y0,x1,y1):
    return sorted([o for o in objs if x0<=(o[0]+o[2])/2<=x1 and y0<=(o[1]+o[3])/2<=y1],key=lambda o:o[0])
def partir(fg,box,n):
    # un recuadro con n fotogramas pegados -> n recuadros, cortando en los valles de la ocupación por columnas
    x0,y0,x1,y1=box;occ=fg[y0:y1,x0:x1].sum(axis=0).astype(float);s=np.convolve(occ,np.ones(7)/7,mode='same');w=x1-x0;cuts=[0]
    for k in range(1,n):
        c=int(k*w/n);lo,hi=max(1,c-int(w/n*.35)),min(w-1,c+int(w/n*.35));cuts.append(lo+int(np.argmin(s[lo:hi])))
    cuts.append(w)
    out=[]
    for i in range(n):
        sub=fg[y0:y1,x0+cuts[i]:x0+cuts[i+1]];ys,xs=np.where(sub)
        out.append((x0+cuts[i]+int(xs.min()),y0+int(ys.min()),x0+cuts[i]+int(xs.max())+1,y0+int(ys.max())+1))
    return out
def pies(a,box):
    x0,y0,x1,y1=box;fg=a[y0:y1,x0:x1,3]>0;cnt=fg.sum(axis=1);filas=np.where(cnt>=6)[0];base=int(filas.max())
    ys,xs=np.where(fg[max(0,base-12):base+1]);return base,float(np.median(xs))
# ---------- hoja 1: cazador normal ----------
a1,fg1=cargar('demonhunter1.png',(56,57,58),7,[])
c1=comps(fg1,4)
idle=en(c1,20,300,570,475);mov=en(c1,660,300,1245,475)
rng=en(c1,670,555,1250,700);flecha=[o for o in rng if o[0]>1100]
rng=[o for o in rng if o[0]<=1100]
hurt_=en(c1,20,790,350,920);esp_=en(c1,20,1030,660,1170);retrato=en(c1,330,70,520,245)
hurt=[hurt_[0]]+partir(fg1,hurt_[1],2) if len(hurt_)==2 else hurt_
esp=[esp_[0]]+partir(fg1,esp_[1],2)+[esp_[2]] if len(esp_)==3 else esp_
print('normal: idle',len(idle),'mov',len(mov),'ataque',len(rng),'flecha',len(flecha),'herido',len(hurt),'especial',len(esp))
# ---------- hoja 2: forma demonio ----------
borrar2=[(420,26,590,52),(420,262,555,292),(400,494,645,520),(345,726,845,752),(25,988,110,1010),(345,988,440,1010)]
a2,fg2=cargar('demonhunter2.png',(1,0,1),6,borrar2)
c2=comps(fg2,5)
d_idle=en(c2,415,50,1140,250);d_walk=en(c2,415,260,1215,470)
d_at=en(c2,395,525,1210,700)
if len(d_at)==4:d_at=[d_at[0],d_at[1]]+partir(fg2,d_at[2],2)+[d_at[3]]
d_esp_=en(c2,333,730,1215,960);d_esp=partir(fg2,d_esp_[0],3)+[d_esp_[1]] if len(d_esp_)==2 else d_esp_
d_hurt_=en(c2,15,1020,330,1170);d_hurt=partir(fg2,d_hurt_[0],2)+[d_hurt_[1]] if len(d_hurt_)==2 else d_hurt_
print('demonio: idle',len(d_idle),'caminar',len(d_walk),'ataque',len(d_at),'especial',len(d_esp),'herido',len(d_hurt))
def lienzo(items,a):
    # items: [(id, recuadro)] -> lienzo común alineado por los pies
    dat=[]
    for sid,b in items:
        base,ax_=pies(a,b);img=Image.fromarray(a[b[1]:b[3],b[0]:b[2]],'RGBA');dat.append((sid,img,base,ax_))
    L=int(max(d[3] for d in dat))+1;R=int(max(d[1].width-d[3] for d in dat))+1
    A=int(max(d[2] for d in dat))+1;B=int(max(d[1].height-d[2] for d in dat))+1
    sp=[]
    for sid,img,base,ax_ in dat:
        can=Image.new('RGBA',(L+R,A+B),(0,0,0,0));can.alpha_composite(img,(L-int(round(ax_)),A-base));sp.append((sid,can))
    return sp,(L+R,A+B),(L,A,B),dat
n_items=[(f'dh_idle_{i+1}',b) for i,b in enumerate(idle)]+[(f'dh_walk_{i+1}',b) for i,b in enumerate(mov)]+[(f'dh_atk_{i+1}',b) for i,b in enumerate(rng)]+[(f'dh_cast_{i+1}',b) for i,b in enumerate(esp)]+[('dh_hurt',hurt[0])]
f_items=[(f'dm_idle_{i+1}',b) for i,b in enumerate(d_idle)]+[(f'dm_walk_{i+1}',b) for i,b in enumerate(d_walk)]+[(f'dm_atk_{i+1}',b) for i,b in enumerate(d_at)]+[(f'dm_cast_{i+1}',b) for i,b in enumerate(d_esp)]+[('dm_hurt',d_hurt[0])]
spN,(cwN,chN),(LN,AN,BN),datN=lienzo(n_items,a1)
spF,(cwF,chF),(LF,AF,BF),datF=lienzo(f_items,a2)
cuerpoN=int(datN[0][2]-np.where(np.array(datN[0][1])[...,3]>0)[0].min());cuerpoF=int(datF[0][2]-np.where(np.array(datF[0][1])[...,3]>0)[0].min())
sp=spN+spF
# proyectil: la flecha de energía verde
bf=flecha[0];sp.append(('demon_proj',Image.fromarray(a1[bf[1]:bf[3],bf[0]:bf[2]],'RGBA')))
atlas,desc=empaquetar(sp,1024);atlas.save(f'{OUT}/demon-rework.png',optimize=True)
# retrato de interfaz 96x96
rb=retrato[0];p=Image.fromarray(a1[rb[1]:rb[3],rb[0]:rb[2]],'RGBA');p=p.resize((96,96),Image.LANCZOS);p.save(f'{OUT}/demon-rework-ui.png',optimize=True)
def meta_cuerpo(ch,cuerpo,fig,L,A,B,cw):return round(ch*fig/cuerpo,1),round(L/cw,3),round(A/ch,3)
HN,axN,ayN=meta_cuerpo(chN,cuerpoN,66,LN,AN,BN,cwN);HF,axF,ayF=meta_cuerpo(chF,cuerpoF,80,LF,AF,BF,cwF)
ids=lambda p,n:[f'{p}{i+1}' for i in range(n)]
extra={'idle':'dh_idle_1','idleSeq':ids('dh_idle_',len(idle)),'walk':ids('dh_walk_',len(mov)),'atk':'dh_atk_2','atks':[ids('dh_atk_',len(rng))],'casts':[ids('dh_cast_',len(esp))],'hurt':'dh_hurt','ax':axN,'ay':ayN,'H':HN,
 'forms':{'demon':{'stand':1,'idle':ids('dm_idle_',len(d_idle)),'walk':ids('dm_walk_',len(d_walk)),'atk':ids('dm_atk_',len(d_at)),'cast':ids('dm_cast_',len(d_esp)),'hurt':'dm_hurt','fps':10,'ax':axF,'ay':ayF,'H':HF}}}
with open(f'{OUT}/pack2.js','w',encoding='utf-8') as fh:
    fh.write('/* Generado por tools/empaquetar_demon_rework.py. Se carga después de pack.js: reemplaza sus sprites y amplía los metadatos. No editar a mano. */\n')
    fh.write('SPR.addPack("demon_rework",'+json.dumps({'game':{'img':f'{OUT}/demon-rework.png','w':atlas.width,'h':atlas.height,'s':desc},'ui':{'img':f'{OUT}/demon-rework-ui.png','w':96,'h':96,'s':{'demon_portrait':[0,0,96,96],'demon_icon':[0,0,96,96]}}},separators=(',',':'))+');\n')
    fh.write('{const o=SPR.heroMeta("demon")||{};SPR.addMeta("demon",Object.assign({},o,'+json.dumps(extra,separators=(',',':'))+',{basic:Object.assign({},o.basic||{},{proj:"demon_proj",w:46,ax:.82,spin:0})}))}\n')
bgp=Image.new('RGBA',atlas.size,(70,100,70,255));bgp.alpha_composite(atlas);bgp.convert('RGB').save('guias-arte/prev-demon-rework.png')
print('normal H',HN,'ax',axN,'ay',ayN,'| demonio H',HF,'ax',axF,'ay',ayF,'| atlas',atlas.size,len(desc))
