"""Recorta enemigos1.png, enemigos2.jpg y enemigos3.jpg (34 enemigos x 2 fotogramas), quita el magenta y genera:
   assets/enemies/enemies.png  y  assets/enemies/pack.js
Uso: python tools/empaquetar_enemigos.py"""
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__))
from PIL import Image
import numpy as np
from celdas import detectar, celdas_banda
from empaquetar_torre_lib import fondo,quitar_fondo,recortar,empaquetar

NOMBRES=[
 ['skel','slime','goblin','zombie','ghost','golem','fire','ice','demon','robot','archer','mage'],
 ['sniper','rat','bat','wolf','spider','gel','healer','mummy','troll','crab','phoenix'],
 ['vampire','zap','shadow','mammoth','guardian','crystal','hydra','ram','sapper','commander','catapult']]
ARCH=['assets/enemigos1.png','assets/enemigos2.jpg','assets/enemigos3.jpg']
MAXLADO=128
sprites=[]
for hoja,(arch,nombres) in enumerate(zip(ARCH,NOMBRES)):
    im,dark,bandas=detectar(arch);H,W,_=im.shape
    if hoja==0:   # PNG con lineas nitidas
        celdas=[c for b in bandas for c in celdas_banda(dark,b,W)];assert len(celdas)==24
    else:         # JPG: rejilla uniforme de 6 x 4
        cw,ch=W/6,H/4;celdas=[(int(c*cw),int(r*ch),int((c+1)*cw)-1,int((r+1)*ch)-1) for r in range(4) for c in range(6)]
    jpg=arch.endswith('.jpg');d0,d1=(62,135) if jpg else (38,105)
    for k,n in enumerate(nombres):
        for fr in (0,1):
            x0,y0,x1,y1=celdas[k*2+fr];ins=12 if jpg else 4
            rgb=im[y0+ins:y1-ins+1,x0+ins:x1-ins+1]
            s=recortar(quitar_fondo(rgb,fondo(rgb),d0,d1))
            k_=MAXLADO/max(s.size)
            if k_<1:s=s.resize((max(1,round(s.width*k_)),max(1,round(s.height*k_))),Image.LANCZOS)
            sprites.append((f'e_{n}_{fr+1}',s))

# ---------- Enemigos extra en pixel art (hoja assets/enemigos (2).jpg: rejilla de 8 x 4, cada criatura repetida 2 veces) ----------
EXTRA={'gem':(0,0),'crystalgolem':(0,1),'crystalfairy':(1,1),'gemball':(1,3),'scorpion':(2,3),'octopus':(3,1),'boxcrab':(3,2),'wyvern':(3,3)}   # (fila, columna)
imx=np.array(Image.open('assets/enemigos (2).jpg').convert('RGB')).astype(int);cwx,chx=imx.shape[1]/8,imx.shape[0]/4
for n,(r,c) in EXTRA.items():
    x0,y0=int(c*cwx),int(r*chx);rgb=imx[y0+10:int((r+1)*chx)-10,x0+10:int((c+1)*cwx)-10]
    s=recortar(quitar_fondo(rgb,fondo(rgb),62,135))
    k_=MAXLADO/max(s.size)
    if k_<1:s=s.resize((max(1,round(s.width*k_)),max(1,round(s.height*k_))),Image.LANCZOS)
    sprites.append((f'e_{n}_1',s))   # un solo fotograma: el juego lo anima con rebote
print('sprites',len(sprites))
atlas,desc=empaquetar(sprites,1024)
os.makedirs('assets/enemies',exist_ok=True);atlas.save('assets/enemies/enemies.png',optimize=True);print('atlas',atlas.size)
with open('assets/enemies/pack.js','w',encoding='utf-8') as f:
    f.write('/* Generado por tools/empaquetar_enemigos.py. No editar a mano. */\n')
    f.write('SPR.addPack("enemies",'+json.dumps({'game':{'img':'assets/enemies/enemies.png','w':atlas.width,'h':atlas.height,'s':desc}},separators=(',',':'))+');\n')
