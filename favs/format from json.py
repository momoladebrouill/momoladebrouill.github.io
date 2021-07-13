import json
f=open('rendu.json','r',encoding='utf-16').read()
c=json.loads(f)
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
	<h1> Mmh, interressant comme page ... 🧐</h1>
	<p> Voici une petite liste des meilleurs sites sur lequels je suis tombés durant mon voyage sur le net, j'espère que vous y trouverez votre bonheur !</p>
	<a href="https://momoladebrouill.github.io">Après y'a toujours mon site aussi🍉</a>
    <table>'''
for dc in c:
    rd+='''
        <tr>
		<td class="imag">
			<img src={img}>
		</td>
		<td>
			<a href="{link}" target={target}>{name}</a>
		</td>
		
	</tr>
	<tr>
	<td></td>
	<td class='des'>{des}</td>
	</tr>
	\n'''.format(**dc)
rd+='''</table> Hey man t'es arrivé au bout ? zarma t'as tout fait ?</body> 
</html>'''  
f=open('test.html','w',encoding='utf-16')
f.write(rd)
f.close()
