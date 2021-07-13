'''Pour passer d' un truc pas dégeulasse à un fichier correct JSON'''
import json
antes=open('favri.html','r',encoding='utf8').read()#le fichier favri
i=fin=0
rd='['
ind=0
while i<len(antes) and fin!=-1 and '<tr>' in antes[i:]:
    
    #extraire la balise
    i+=antes[i:].find('<tr>')
    fin=antes[i:].find('</tr>')
    elem=antes[i:i+fin]
    i+=10

    #extraire les informations dans la balise
    dc={'link':'"','img':'"','name':'""','target':'rt',"des":""}
    target=elem.find('target="')
    # le lien
    dc['link']=elem[elem.find('<a HREF=')+9:target-2]
    # le nom
    dc['name']=elem[elem[target:].find('>')+target+1:elem.find('</a')]
    #le hash
    dc['target']=str(abs(hash(dc['link'])))
    #l'image
    db=elem.find('''<td class="imag">
			<img src=''')+30
    dc['img']=elem[db+1:elem[db:].find('>')+db-1]
    #si disponible, la description
    if '<td>' in elem[target:]:
        beg=elem[target:].find('<td>')+target
        dc['des']=elem[beg+4:elem[beg:].find('</td')+beg]
    #mettre en forme dans le nouveaux fichier
    rd+=f"{json.dumps(dc,indent=4, ensure_ascii=False)},"
    ind+=1
rd+="]"
f=open('rendu.json','wb')
f.write(rd.encode('utf16'))
f.close()
