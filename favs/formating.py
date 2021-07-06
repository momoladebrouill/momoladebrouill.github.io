'''Pour passer du html nul de chrome à un truc pas dégeulasse'''

antes=open('favs.html','r',encoding="utf-8").read()#le fichier chrome
i=fin=0

rd='''
<!DOCTYPE html>
<html>
	<head>
		<title>le web</title>
		<meta charset="utf-8" lang="fr">
		<link rel="icon" href="../img/µ.svg">
		<link rel="stylesheet" href="styles.css">
		<link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins">
	</head>
	<body>
	<body>
	<h1> Les meilleurs sites du web !</h1>
	<p> Voici une petite liste des meilleurs sites sur lequels je suis tombés durant mon voyage sur le net, j'espère que vous y trouverez votre bonheur !</p>
	<table>'''

while i<len(antes) and fin!=-1 and '<A' in antes[i:]:
    
    #extraire la balise
    i+=antes[i:].find('<A')
    fin=antes[i:].find('</A>')
    elem=antes[i:i+fin]
    i+=2

    #extraire les informations dans la balise
    dc={'link':'"','img':'"','name':'""','target':'rt'}
    # le lien
    link=elem.find('HREF="')
    long=elem[(link+6):].find('"')+6
    dc['link']=elem[link:link+long]
    
    # l'image
    if 'ICON="' in elem:
        img=elem.find('ICON="')
        long=elem[(img+6):].find('"')+6
        if long!=-1:
            dc['img']=elem[img+5:img+long]
    # le titre
    dc['name']=elem[elem.find('>')+1:]

    # la target
    dc['target']=hex(hash(dc['link']))
    #mettre en forme dans le nouveaux fichier
    rd+='''
        <tr>
		<td>
			<img src={img}">
		</td>
		<td>
			<a {link}" target="{target}">{name}</a>
		</td>
	</tr>\n'''.format(**dc)
   
rd+='''</table>	</body> 
</html>'''  
f=open('favri.html','w',encoding='utf-8')
f.write(rd)
f.close()
