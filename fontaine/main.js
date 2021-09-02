let canvas = document.getElementById("fen");
let context = canvas.getContext("2d");
let W = window.innerWidth;
let H = window.innerHeight;
let ratio = window.devicePixelRatio;
canvas.width = W*ratio;
canvas.height = H*ratio;
canvas.style.width = W + "px";
canvas.style.height = H + "px";
context.scale(ratio,ratio);

context.font = "50px cursive";
context.textBaseline = "middle"


canvas.addEventListener("mousedown",mousedown);
canvas.addEventListener("mousemove",mousemove);
canvas.addEventListener("wheel",roll,{passive:true});
window.addEventListener("mouseup",mouseup);


function roll(e) {
	force-=Math.sign(e.deltaY)
	force=force%50
	helper.style.color="#"+hex(50-Math.abs(force)).repeat(3)
}

function mousedown(e) {isRotating=true}

function mouseup(e){
	isRotating=false
	fontaines.push(new fontaine(e.offsetX,e.offsetY,angleDeDépart))
}

function mousemove(e){
	x=e.offsetX
	y=e.offsetY
}

class paillette{
	constructor(a,b,angle=3*Math.PI/2,ouverture=Math.PI/8){
		this.x=a
		this.y=b
		this.angle=angle+ouverture*2*(0.5-Math.random())
		this.vec=[Math.cos(this.angle)*force,Math.sin(this.angle)*force]
		this.coul="hsl("+this.y/H*360+",100%,50%)"
	}
	draw(){
		this.vec[1]+=0.1
		this.x+=this.vec[0]
		this.y+=this.vec[1]
		context.fillStyle=this.coul
		context.beginPath()
		context.arc(parseInt(this.x),parseInt(this.y),25-Math.abs(force)/2,0,Math.PI*2)
		context.fill()
		context.closePath()
	}
}
class fontaine{
	constructor(x,y,angle=0){
		this.x=x
		this.y=y
		this.angle=angle
	}
	eja(){
		confettis.push(new paillette(this.x,this.y,this.angle))
	}
}
function hex(val) {
	let t=parseInt(val/50*255).toString(16)
	if (t.length==1){ t='0'+t}
	return t
}
let x,y,next,fps1,fps2,isRotating;
let force=5,fond=0, angleDeDépart=0;
let confettis=[],fontaines=[];
const helper=document.getElementById("shell")
fps1=new Date()
function bLoop() {
	fps2=new Date()

	//Le fond
	fond+=0.1
	fond=fond%360
	context.beginPath()
	context.fillStyle="#"+hex(Math.abs(force)).repeat(3)
	context.fillRect(0,0,W,H)
	context.fill()
	context.closePath()

	//Sortie des fontaines réelles ou fictives
	for (var i = fontaines.length - 1; i >= 0; i--) {
		fontaines[i].eja()
	}
	if(isRotating){
		confettis.push(new paillette(x,y,angleDeDépart))
		angleDeDépart+=Math.PI/32
		angleDeDépart=angleDeDépart%(2*Math.PI)
	}

	//Dessin et chute des paillettes
	next=[]
	for (var i = confettis.length - 1; i >= 0; i--) {
		conf=confettis[i]
		conf.draw()
		if (conf.y<H){
			next.push(conf)
		}
	}
	confettis=[...next]

	context.fillStyle="#"+hex(50-Math.abs(force)).repeat(3)
	context.fillText(
		"force: "+force+"/50 "+
		"particules: "+confettis.length+" "+
		"fps: "+parseInt(1000/(fps2-fps1)),0,H-20)
	fps1=fps2
	requestAnimationFrame(bLoop)
	
	
}bLoop()
