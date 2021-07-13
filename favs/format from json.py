import json
f=open('rendu.json','r',encoding='utf-16').read()
c=json.loads(f)
rd='''<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>jean</title>
	<link rel="stylesheet" href="styles.css">
	<link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins">
</head>
<body>
<h1> Mes découvertes du net </h1>
Une liste assez longue de tous les sites que j'ai trouvés sympas durant mon voayge sur l'océan du net<br>
En cours d'amélioration d'ailleur hihi

    '''
for dc in c:
    rd+="<div>"
    if dc["img"]:
        rd+='''
            <table>
            <tr>
            <td><img src="{img}"></img></td>
            <td><a href="{link}" target="{target}">{name}</a></td>
            </tr>
            </table>'''.format(**dc)
    else:
        rd+="""<a href="{link}" target="{target}">{name}</a><br>""".format(**dc)
    rd+='''{des}
	</div>'''.format(**dc)
rd+='''</table></body>
</html>'''  
f=open('favri.html','w',encoding='utf-8')
f.write(rd)
f.close()
