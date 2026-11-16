"""Empaqueta los fotogramas ya recortados de assets/habilidades y efectos/pro/<hoja>_frames/transparent/*.png
en atlas para el juego: assets/heroes/dwarf/fx.js, demon/fx.js, archer/fx.js y assets/comunes/fx.js.
Cada grupo (prefijo) es una animación: sus fotogramas se recortan con el mismo recuadro para que no salten al reproducirse.
Uso: python tools/empaquetar_efectos_pro.py"""
import os,sys,re,json,glob
sys.path.insert(0,os.path.dirname(__file__))
from PIL import Image
import numpy as np
from empaquetar_torre_lib import empaquetar
PRO='assets/habilidades y efectos/pro/'
MAXL=240   # lado máximo de un fotograma en el atlas
# destino -> (carpeta de salida, nombre del paquete, [carpetas de hojas])
DEST={
 'dwarf':('assets/heroes/dwarf','dwarf_fx',['enano_efectos_hoja1_frames','enano_efectos_hoja2_frames']),
 'demon':('assets/heroes/demon','demon_fx',['cazador_demonios_efectos_hoja1_frames','cazador_demonios_efectos_hoja2_frames']),
 'archer':('assets/heroes/archer','archer_fx',['arquero_efectos_hoja1_frames','arquero_efectos_hoja2_frames']),
 'comunes':('assets/comunes','comunes_fx',['comunes_efectos_hoja1_frames','comunes_efectos_hoja2_frames']),
}
# grupos que mezclan animaciones distintas en una hoja: se dividen en subgrupos (cada uno con su propio recuadro, así quedan centrados)
SPLIT={
 # arquero: los nombres antiguos (a_snc, a_snb...) se conservan para no tocar el código del juego
 'a_snipe':[('a_snc',6,7),('a_snb',3,5),('a_sni',6,9)],
 'a_shackle':[('a_chain',1,3),('a_ring',4,7)],
 'a_frost':[('a_frp',1,2),('a_fri',3,6)],
 'a_pierce':[('a_prc',1,2)],
 'a_focus':[('a_foc',1,4),('a_str',5,6)],
 'a_windrun':[('a_wind',1,4)],
 'd_rockets':[('d_rocket',1,2),('d_rsmoke',3,5)],
 'd_grenade':[('d_gren',1,2),('d_gexp',3,7)],
 'd_snipe':[('d_laser',1,3),('d_tracer',4,6),('d_impact',7,10)],
 'd_turret':[('d_muzzle',1,2),('d_tsmoke',3,3)],
 'z_coup':[('z_coupslash',1,3),('z_coupring',4,7)],
 'z_meta':[('z_wings',1,4),('z_metaburst',5,7)],
 'z_step':[('z_smoke',1,3),('z_cres',4,6)],
 'z_frag':[('z_gem',1,3),('z_gemburst',4,6)],
}
def bbox(s):
    a=np.array(s)[...,3];ys,xs=np.where(a>14)
    return (int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1))
for did,(out,pack,hojas) in DEST.items():
    grupos={}
    for h in hojas:
        for f in glob.glob(PRO+h+'/transparent/*.png'):
            m=re.match(r'(.+)_(\d+)\.png$',os.path.basename(f))
            grupos.setdefault(m.group(1),[]).append((int(m.group(2)),f))
    for pref,partes in SPLIT.items():
        if pref in grupos:
            fr=sorted(grupos.pop(pref))
            for nuevo,a,b in partes:grupos[nuevo]=[(i-a+1,f) for i,f in fr if a<=i<=b]
    sp=[];print(did)
    for pref in sorted(grupos):
        fr=[Image.open(f).convert('RGBA') for _,f in sorted(grupos[pref])]
        bb=[bbox(s) for s in fr];u=(min(b[0] for b in bb),min(b[1] for b in bb),max(b[2] for b in bb),max(b[3] for b in bb))
        k=min(1,MAXL/max(u[2]-u[0],u[3]-u[1]))
        for i,s in enumerate(fr):
            cc=s.crop(u);sp.append((f'{pref}_{i+1}',cc.resize((max(1,round(cc.width*k)),max(1,round(cc.height*k))),Image.LANCZOS) if k<1 else cc))
        print(' ',pref,len(fr),'fotogramas',(u[2]-u[0],u[3]-u[1]),'->',round(k,2))
    os.makedirs(out,exist_ok=True)
    atlas,desc=empaquetar(sp,1024);atlas.save(f'{out}/{did}-fx.png',optimize=True)
    with open(f'{out}/fx.js','w',encoding='utf-8') as fh:
        fh.write('/* Generado por tools/empaquetar_efectos_pro.py. No editar a mano. */\n')
        fh.write(f'SPR.addPack("{pack}",'+json.dumps({'game':{'img':f'{out}/{did}-fx.png','w':atlas.width,'h':atlas.height,'s':desc}},separators=(',',':'))+');\n')
    bg=Image.new('RGBA',atlas.size,(70,100,70,255));bg.alpha_composite(atlas);bg.convert('RGB').save(f'guias-arte/prev-{did}-fx.png')
    print(did,'fx',atlas.size,len(desc),'sprites')
