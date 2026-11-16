"""Recorta las hojas de 'assets/habilidades y efectos/pro/nuevos heroes/*.png' y genera, por héroe,
assets/heroes/<id>/<id>-nuevo.png + pack-nuevo.js (se carga DESPUÉS de los demás packs del héroe y sustituye reposo, caminar, ataques, habilidades y herido
sin tocar proyectiles, efectos ni formas).
Cada fotograma se identifica como 'fila.columna' tal como los numera la extracción automática (mismo orden que usó la revisión visual).
Los fotogramas se alinean por los pies dentro de un lienzo común por héroe.
Uso: python tools/empaquetar_nuevos_heroes.py [id ...]"""
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__))
os.chdir(os.path.join(os.path.dirname(__file__),'..'))
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from empaquetar_torre_lib import empaquetar
D='assets/habilidades y efectos/pro/nuevos heroes/'
def mascara(a,tol,holes):
    corn=np.concatenate([a[:6,:6].reshape(-1,3),a[:6,-6:].reshape(-1,3),a[-6:,:6].reshape(-1,3),a[-6:,-6:].reshape(-1,3)])
    bgc=np.median(corn,axis=0);d=np.abs(a-bgc).max(axis=2)
    lab,_=ndi.label(d<=tol);ext=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    fg=~np.isin(lab,list(ext));fg=ndi.binary_opening(fg,iterations=1)
    return (ndi.binary_fill_holes(fg) if holes else fg),bgc
def extraer(f):
    # la numeración de fotogramas (fila.columna) sale de la máscara con tolerancia 14 (la usada en la revisión visual);
    # los píxeles salen de otra con tolerancia corta en fondos oscuros, para no perder la armadura oscura.
    im=Image.open(D+f).convert('RGB');a=np.array(im).astype(int)
    fg14,bgc=mascara(a,14,False)
    fg=mascara(a,6,True)[0] if bgc.max()<40 else mascara(a,14,True)[0]
    rgba=np.dstack([a.astype(np.uint8),(fg*255).astype(np.uint8)])
    L,n=ndi.label(ndi.binary_dilation(fg14,iterations=3));objs=[]
    for sl in ndi.find_objects(L):
        h=sl[0].stop-sl[0].start;w=sl[1].stop-sl[1].start
        if h>=40 and w>=16:objs.append((sl[1].start,sl[0].start,sl[1].stop,sl[0].stop))
    objs.sort(key=lambda o:(o[1]+o[3])/2);rows=[]
    for o in objs:
        cy=(o[1]+o[3])/2
        if rows and abs(cy-np.mean([(r[1]+r[3])/2 for r in rows[-1]]))<40:rows[-1].append(o)
        else:rows.append([o])
    for r in rows:r.sort(key=lambda o:o[0])
    return rgba,fg,rows
def pies(a,box):
    x0,y0,x1,y1=box;fg=a[y0:y1,x0:x1,3]>0;cnt=fg.sum(axis=1);filas=np.where(cnt>=6)[0];base=int(filas.max())
    ys,xs=np.where(fg[max(0,base-12):base+1]);return base,float(np.median(xs))
# id: (hoja, alto en pantalla de la figura, idle, walk, atks, casts, hurt)   -> 'f.c' = fila.columna
H={
 'priest':('2026-11-16_17-41-36_Lumina.png',62,['2.1'],['2.1','2.5'],[['3.1']],[['3.5']],'4.5'),
 'assassin':('acesino.png',62,['0.0','0.1','0.2','0.3'],['0.4','0.5','0.6','0.7','0.8'],[['2.1','2.2','2.3','2.5']],[['3.4','3.0','3.5']],'6.1'),
 'alchemist':('alchemist.png',70,['0.3','0.4'],['2.0','2.1','2.2','2.3','2.4','2.5','2.6','2.7'],[['3.1','3.2','3.4','3.5']],None,None),
 'archer':('arquero elfo.png',64,['0.4','1.4'],['0.9','1.9'],[['2.8','3.9','4.8']],None,'5.9'),
 'barbarian':('guerrero.png',72,['1.1','1.2','1.3','1.4'],['2.1','2.2','2.3','2.4','2.5','2.6'],[['4.0','4.2','4.3','4.4','4.5']],[['6.0','6.1','6.2','6.3']],'6.5'),
 'druid':('druida.png',66,['1.1'],['1.4','1.5','1.6','1.7','1.8'],[['2.0','2.1','2.2']],[['2.3','2.4','2.5']],'2.8'),
 'werewolf':('hombre lobo y lobo.png',66,['0.0','0.1','0.2','0.3'],['0.4','0.5','0.6','0.7','0.8','0.9'],[['1.0','1.1','1.2','1.3']],[['1.4','1.5','1.6']],None),
 'mage':('magoinvocador.png',80,['0.0','0.1','0.2','0.3'],['0.4','0.5','0.6','0.7','0.8'],[['1.0','1.1','1.2','1.3']],[['2.0','2.1'],['3.0','3.1','3.2'],['4.1','4.2','4.3']],'4.5'),
 'necro':('necro.png',68,['1.1','1.2','1.3','1.4'],['2.1','2.2','2.3','2.4','2.5','2.6'],[['3.0','3.1','3.2']],[['3.7','3.9']],'4.1'),
 'paladin':('paladin dragon.png',72,['1.2'],['2.0','2.1','2.2','2.3','2.4','2.5','2.6','2.7','2.8','2.9'],[['4.1','4.2','4.3','4.4'],['4.5','4.6','4.7','4.8']],[['5.1','5.2']],None),
 'monk':('panda.png',70,['0.1','0.2','0.3','0.4'],['1.0','1.1','1.2','1.3','1.4','1.5','1.6','1.7'],[['3.0','3.1','3.3','3.5']],[['4.1','4.2']],None),
 'devourer':('primarbeast.png',62,['0.1','0.2','0.3','0.4'],['0.5','0.6','0.7','0.8'],[['1.4','1.5','1.6','1.7']],[['2.1','2.3']],'3.4'),
 'dwarf':('sniper.png',58,['0.2'],['1.2','2.2'],[['3.2','4.2']],[['3.2','4.1','4.2']],'5.3'),
 'shaman':('troll chaman.png',72,['1.0','1.1','1.2','1.3'],['2.0','2.1','2.2','2.3','2.4','2.5','2.6'],[['3.0','3.1','3.2','3.3','3.4']],[['4.1','4.2','4.3']],'5.1'),
 'troll':('trollhunter.png',70,['2.0','2.1','2.2','2.4'],['3.0','3.1','3.2','3.3','3.4','3.5','3.6','3.7','3.8'],[['5.1','5.3','5.4','5.5']],[['7.0','7.2','7.4']],'8.2'),
}
LIMPIA={'archer':(2,.2)}   # (dilatación, fracción mínima del trozo mayor) para quitar restos de fotogramas vecinos
def uno(ref,rows):
    r,c=ref.split('.');return rows[int(r)][int(c)]
def hacer(hid):
    hoja,fig,idle,walk,atks,casts,hurt=H[hid];rgba,fg,rows=extraer(hoja)
    items=[]
    def add(pref,refs):
        ids=[]
        for i,r in enumerate(refs):
            sid=f'nh_{hid}_{pref}{i+1}';items.append((sid,uno(r,rows)));ids.append(sid)
        return ids
    o_idle=add('idle',idle);o_walk=add('walk',walk)
    o_atks=[add(f'a{k+1}_',g) for k,g in enumerate(atks)]
    o_casts=[add(f'c{k+1}_',g) for k,g in enumerate(casts)] if casts else None
    o_hurt=add('hurt',[hurt])[0] if hurt else None
    dat=[]
    for sid,b in items:
        sub=rgba[b[1]:b[3],b[0]:b[2]].copy();al=sub[...,3]>0;L2,n2=ndi.label(ndi.binary_dilation(al,iterations=LIMPIA.get(hid,(4,.05))[0]))   # quita restos sueltos de fotogramas vecinos
        if n2>1:
            tam=ndi.sum(al,L2,range(1,n2+1));ok=[i+1 for i,s in enumerate(tam) if s>=LIMPIA.get(hid,(4,.05))[1]*tam.max()];sub[...,3]*=np.isin(L2,ok).astype(np.uint8)
        full=rgba.copy();full[b[1]:b[3],b[0]:b[2]]=sub;base,ax_=pies(full,b);img=Image.fromarray(sub,'RGBA');dat.append((sid,img,base,ax_))
    Lm=int(max(d[3] for d in dat))+1;R=int(max(d[1].width-d[3] for d in dat))+1
    A=int(max(d[2] for d in dat))+1;B=int(max(d[1].height-d[2] for d in dat))+1
    cw,ch=Lm+R,A+B;sp=[]
    for sid,img,base,ax_ in dat:
        can=Image.new('RGBA',(cw,ch),(0,0,0,0));can.alpha_composite(img,(Lm-int(round(ax_)),A-base));sp.append((sid,can))
    # alto del cuerpo en reposo (primer fotograma) para escalar la figura al tamaño de pantalla pedido
    d0=dat[0];cuerpo=d0[2]-int(np.where(np.array(d0[1])[...,3]>0)[0].min())
    Hp=round(ch*fig/cuerpo,1);ax=round(Lm/cw,3);ay=round(A/ch,3)
    out=f'assets/heroes/{hid}'
    atlas,desc=empaquetar(sp,1024);atlas.save(f'{out}/{hid}-nuevo.png',optimize=True)
    extra={'idle':o_idle[0],'idleSeq':o_idle if len(o_idle)>1 else None,'walk':o_walk,'atk':o_atks[0][min(1,len(o_atks[0])-1)],'atks':o_atks,'casts':o_casts,'hurt':o_hurt,'ax':ax,'ay':ay,'H':Hp,'atkax':None}
    with open(f'{out}/pack-nuevo.js','w',encoding='utf-8') as fh:
        fh.write('/* Generado por tools/empaquetar_nuevos_heroes.py. Se carga después de los demás packs del héroe: sustituye reposo, caminar, ataques, habilidades y herido. No editar a mano. */\n')
        fh.write('SPR.addPack("'+hid+'_nuevo",'+json.dumps({'game':{'img':f'{out}/{hid}-nuevo.png','w':atlas.width,'h':atlas.height,'s':desc}},separators=(',',':'))+');\n')
        fh.write('{const o=SPR.heroMeta("'+hid+'")||{};SPR.addMeta("'+hid+'",Object.assign({},o,'+json.dumps(extra,separators=(',',':'))+'))}\n')
    bg=Image.new('RGBA',atlas.size,(70,100,70,255));bg.alpha_composite(atlas);bg.convert('RGB').save(f'guias-arte/prev-{hid}-nuevo.png')
    print(f'{hid:10s} {hoja[:22]:22s} lienzo {cw}x{ch} H {Hp} ax {ax} ay {ay} atlas {atlas.size} {len(desc)} sprites')
def ciclope():
    # Cíclope de piedra (invocación de la torre del castillo): ciclope.png -> assets/invocaciones/ciclope-nuevo.png + pack.js (variable CYC_ART)
    rgba,fg,rows=extraer('ciclope.png');idle=['0.0','0.1','0.2','0.3'];walk=['0.4','0.5','0.6','0.7','0.8','0.9'];hit=['1.5','1.7']
    items=[(f'cyc_idle_{i+1}',uno(r,rows)) for i,r in enumerate(idle)]+[(f'cyc_walk_{i+1}',uno(r,rows)) for i,r in enumerate(walk)]+[(f'cyc_hit_{i+1}',uno(r,rows)) for i,r in enumerate(hit)]
    dat=[]
    for sid,b in items:
        base,ax_=pies(rgba,b);dat.append((sid,Image.fromarray(rgba[b[1]:b[3],b[0]:b[2]],'RGBA'),base,ax_))
    Lm=int(max(d[3] for d in dat))+1;R=int(max(d[1].width-d[3] for d in dat))+1;A=int(max(d[2] for d in dat))+1;B=int(max(d[1].height-d[2] for d in dat))+1
    cw,ch=Lm+R,A+B;sp=[]
    for sid,img,base,ax_ in dat:
        can=Image.new('RGBA',(cw,ch),(0,0,0,0));can.alpha_composite(img,(Lm-int(round(ax_)),A-base));sp.append((sid,can))
    d0=dat[0];cuerpo=d0[2]-int(np.where(np.array(d0[1])[...,3]>0)[0].min())
    Hp=round(ch*42/cuerpo,1);ax=round(Lm/cw,3);ay=round(A/ch,3);os.makedirs('assets/invocaciones',exist_ok=True)
    atlas,desc=empaquetar(sp,1024);atlas.save('assets/invocaciones/ciclope-nuevo.png',optimize=True)
    art={'idle':[s for s,_ in items if s.startswith('cyc_idle')],'walk':[s for s,_ in items if s.startswith('cyc_walk')],'hit':[s for s,_ in items if s.startswith('cyc_hit')],'h':Hp,'ax':ax,'ay':ay}
    with open('assets/invocaciones/pack-ciclope.js','w',encoding='utf-8') as fh:
        fh.write('/* Generado por tools/empaquetar_nuevos_heroes.py (ciclope). Cíclope de piedra de la torre del castillo. No editar a mano. */'+chr(10))
        fh.write('SPR.addPack("ciclope_nuevo",'+json.dumps({'game':{'img':'assets/invocaciones/ciclope-nuevo.png','w':atlas.width,'h':atlas.height,'s':desc}},separators=(',',':'))+');'+chr(10)+'var CYC_ART='+json.dumps(art,separators=(',',':'))+';'+chr(10))
    print('ciclope lienzo',cw,ch,'H',Hp,'atlas',atlas.size,len(desc))
# formas de transformación: id del héroe -> (nombre de la forma, hoja, alto de la figura, idle, walk, atk, cast, herido)
FORMAS={
 'werewolf':('wolf','hombre lobo y lobo.png',50,['2.0','2.1','2.2','2.3'],['2.5','2.6','2.1','2.2'],['3.0','3.2','3.3'],['3.2','3.3','3.4','3.5'],'3.0'),
 'druid':('bear','hombre oso.png',92,['0.1'],['1.0','1.1','1.2','1.3'],['2.4','2.5','2.6','2.7'],['3.0','3.1','3.2','3.3'],'3.5'),
}
def forma(hid):
    nom,hoja,fig,idle,walk,atk,cast,hurt=FORMAS[hid];rgba,fg,rows=extraer(hoja);items=[]
    def add(pref,refs):
        ids=[]
        for i,r in enumerate(refs):
            sid=f'nh_{hid}_{nom}_{pref}{i+1}';items.append((sid,uno(r,rows)));ids.append(sid)
        return ids
    o_idle=add('idle',idle);o_walk=add('walk',walk);o_atk=add('atk',atk);o_cast=add('cast',cast);o_hurt=add('hurt',[hurt])[0]
    dat=[]
    for sid,b in items:
        base,ax_=pies(rgba,b);dat.append((sid,Image.fromarray(rgba[b[1]:b[3],b[0]:b[2]],'RGBA'),base,ax_))
    Lm=int(max(d[3] for d in dat))+1;R=int(max(d[1].width-d[3] for d in dat))+1;A=int(max(d[2] for d in dat))+1;B=int(max(d[1].height-d[2] for d in dat))+1
    cw,ch=Lm+R,A+B;sp=[]
    for sid,img,base,ax_ in dat:
        can=Image.new('RGBA',(cw,ch),(0,0,0,0));can.alpha_composite(img,(Lm-int(round(ax_)),A-base));sp.append((sid,can))
    d0=dat[0];cuerpo=d0[2]-int(np.where(np.array(d0[1])[...,3]>0)[0].min())
    Hp=round(ch*fig/cuerpo,1);ax=round(Lm/cw,3);ay=round(A/ch,3);out=f'assets/heroes/{hid}'
    atlas,desc=empaquetar(sp,1024);atlas.save(f'{out}/{hid}-forma.png',optimize=True)
    F={'stand':1,'idle':o_idle,'walk':o_walk,'atk':o_atk,'cast':o_cast,'hurt':o_hurt,'fps':9,'ax':ax,'ay':ay,'H':Hp}
    with open(f'{out}/pack-forma.js','w',encoding='utf-8') as fh:
        fh.write('/* Generado por tools/empaquetar_nuevos_heroes.py (forma). Añade la forma de transformación del héroe. No editar a mano. */'+chr(10))
        fh.write('SPR.addPack("'+hid+'_forma",'+json.dumps({'game':{'img':f'{out}/{hid}-forma.png','w':atlas.width,'h':atlas.height,'s':desc}},separators=(',',':'))+');'+chr(10))
        fh.write('{const o=SPR.heroMeta("'+hid+'")||{};SPR.addMeta("'+hid+'",Object.assign({},o,{forms:Object.assign({},o.forms||{},{'+nom+':'+json.dumps(F,separators=(',',':'))+'})}))}'+chr(10))
    bg=Image.new('RGBA',atlas.size,(70,100,70,255));bg.alpha_composite(atlas);bg.convert('RGB').save(f'guias-arte/prev-{hid}-forma.png')
    print(f'forma {hid}/{nom} lienzo {cw}x{ch} H {Hp} ax {ax} ay {ay} atlas {atlas.size}')
if __name__=='__main__':
    args=sys.argv[1:]
    if 'formas' in args:
        for hid in FORMAS:forma(hid)
        sys.exit()
    if not args or 'ciclope' in args:ciclope()
    for hid in ([a for a in args if a!='ciclope'] or list(H)):hacer(hid)
