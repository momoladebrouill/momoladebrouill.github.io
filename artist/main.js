let canvas = document.getElementById("fen");
let context = canvas.getContext("2d")
let W = window.innerWidth
let H = window.innerHeight
let ratio = window.devicePixelRatio;
canvas.width = W*ratio;
canvas.height = H*ratio;
canvas.style.width = W  + "px";
canvas.style.height = H  + "px";
context.scale(ratio,ratio);
context.lineWidth=5
context.shadowBlur=0
document.addEventListener("wheel",scroll,false);
canvas.addEventListener("mousemove", bouge, false);
document.addEventListener("keydown", keydown, false);
document.addEventListener("keyup", keyup, false);
document.onmouseup= function up(e) {mode=''}
document.onmousedown= function click(e) {
	switch(e.buttons){
		case 1:
			mode='c'
			break;
		case 4:
			mode='take'
			coulSel=lieux[[mousex,mousey]]
			break;
		case 2:
			mode='e'
			break;
	}
}

function bouge(p){
	mouseRlx=p.offsetX
	mouseRly=p.offsetY
	actu_mousepos()
}

function actu_mousepos() {
	mousex=Math.round((mouseRlx-dep.fkx)/size.fk-.5)
    mousey=Math.round((mouseRly-dep.fky)/size.fk-.5)
}

function scroll(cb){
	const ch=size.rl/64
	if(cb.deltaY<0){
		dep.rlx-=mousex*ch
		dep.rly-=mousey*ch
		size.rl+=ch;
	}else if(cb.deltaY>0){
		size.rl-=ch
		if(size.rl<0){
			size.rl=1
		}else{
			dep.rlx+=mousex*ch
			dep.rly+=mousey*ch
		}
	}
}

function keydown(e) {
	v=e.keyCode
	switch(v){
		case 87:
			coulSel+=0.1
			if(coulSel>1){coulSel=0}
			break;
		case 88:
			coulSel-=0.1
			if(coulSel<0){coulSel=1}
			break;
		case 27:
			dep.rlx=0
			dep.rly=0
			actu_mousepos()
			break;
		case 67:
			coulSel=lieux[[mousex,mousey]]
			break;
		case 32:
			if(helper.style.display == "block")
			{
				helper.style.display = "none";
			}
			else{
				helper.style.display = "block";
			}
			break;
		case 17:
			if (context.shadowBlur==15){
				context.shadowBlur=0
			}else{
				context.shadowBlur=15
			}
			break
		case 77:
			scroll({deltaY:1})
			break
		case 80:
			scroll({deltaY:-1})
			break
		case 65:
			mode='e'
			context.strokeStyle = "black";
			context.fillStyle="black"
			bLoop()
			let img=canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
			window.location.href = img;
			mode=''
		default:
			key_dict[v]=true
	}
	coulSel=Math.round(coulSel*10)/10
	document.body.style.backgroundColor = coul(coulSel)
}

function keyup(e) {key_dict[e.keyCode]=false}

function move_by_key(e){
	v=parseInt(e)
	switch(v){
		case 81:
			dep.rlx+=10
			break;
		case 83:
			dep.rly-=10
			break;
		case 68:
			dep.rlx-=10
			break;
		case 90:
			dep.rly+=10
			break;
		
	}
	actu_mousepos()	
}

function find(xer,yer){return lieux[[xer,yer]]!=undefined}

function coul(sel) {
	if(sel==1){
		return "white"
	}else{
		return "hsl("+sel*360+",100%,50%)";
	}
}

let dep={'rlx':0,'rly':0,'fkx':0,'fky':0}
let size={'fk':50,'rl':50}
let lieux={},key_dict={};
let mode=''
let coulSel=Math.round(Math.random()*10)/10

let mousex=10
let mousey=10
context.strokeStyle = coul(coulSel);
const helper=document.getElementById("help")

function bLoop() {
	context.fillStyle='black'
	context.fillRect(0,0,W,H)

	for(K in key_dict){
		if(key_dict[K]){
			move_by_key(K)
		}
	}

	dep.fkx+=Math.round((dep.rlx-dep.fkx)/7)
	dep.fky+=Math.round((dep.rly-dep.fky)/7)
	size.fk+=(size.rl-size.fk)/10

	context.beginPath()
	context.moveTo(dep.fkx-10,dep.fky)
	context.lineTo(dep.fkx+10,dep.fky)
	context.stroke()
	context.closePath()
	context.beginPath()
	context.moveTo(dep.fkx,dep.fky-10)
	context.lineTo(dep.fkx,dep.fky+10)
	context.stroke()
	context.closePath()

	

	for(clef in lieux){
		pos=clef.split(',')
		pos[0]=parseInt(pos[0])
		pos[1]=parseInt(pos[1])
		if(pos[0]>-dep.rlx/size.rl-1 && pos[1]>-dep.rly/size.rl-1
			 && pos[0]<(-dep.rlx+W)/size.rl &&pos[1]<(-dep.rly+H)/size.rl)
		{
			context.shadowColor = coul(lieux[clef]);
			context.fillStyle=coul(lieux[clef])
			context.fillRect(pos[0]*size.fk+dep.fkx,
							pos[1]*size.fk+dep.fky,
							size.fk,size.fk)

		}
	}
	
	if(mode=='e')
	{
		context.strokeStyle = "black";
		if(find(mousex,mousey))
		{
			delete lieux[[mousex,mousey]]
		}
		
	}
	else{
		context.strokeStyle = coul(coulSel);
	 	if(mode=='c')
		{
			lieux[[mousex,mousey]]=coulSel
		}
	}

	context.rect(mousex*size.fk+dep.fkx,mousey*size.fk+dep.fky,size.fk,size.fk);
	context.stroke();
	//helper.textContent=coulSel
	helper.style.color=coul(coulSel)

	requestAnimationFrame(bLoop)
}

bLoop()
