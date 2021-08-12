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

document.addEventListener("keydown", keydown);
document.addEventListener("keyup",keyup);
canvas.addEventListener("mousedown",mousedown);
canvas.addEventListener("mousemove",mousemove);
canvas.addEventListener("wheel",roll);
window.addEventListener("mouseup",mouseup);
function keyup(e){v=e.keyCode}
function keydown(e){v=e.keyCode}
function mousedown(e){pos=[e.offsetX,e.offsetY]}
function roll(e) {
	force-=Math.sign(e.deltaY)
	force=force%50
}
function mouseup(e){
	pos=[e.offsetX,e.offsetY]
	fontaines.push(pos)
}
function mousemove(e){
	x=e.offsetX
	y=e.offsetY
}
class paillette{
	constructor(a,b){
		this.x=a
		this.y=b
		this.angle=3*Math.PI/2+Math.PI/4*(0.5-Math.random())
		this.vec=[Math.cos(this.angle)*force,Math.sin(this.angle)*force]
	}
	draw(){
		this.vec[1]+=0.1
		this.x+=this.vec[0]
		this.y+=this.vec[1]
		context.fillStyle="hsl("+this.y/H*360+",100%,50%)"
		context.beginPath()
		context.arc(parseInt(this.x),parseInt(this.y),10,0,Math.PI*2)
		context.fill()
		context.closePath()
	}


}
let x,y,next;
let force=5,fond=0;
let confettis=[]
let fontaines=[]
const el = document.querySelector('div');
let fps1,fps2;
fps1=new Date()
function bLoop() {
	fps2=new Date()
	fond+=0.1
	fond=fond%360
	context.beginPath()
	context.fillStyle='hsl('+fond+',50%,'+Math.abs(force)*2+"%)"
	context.fillRect(0,0,W,H)
	context.fill()
	context.closePath()
	for (var i = fontaines.length - 1; i >= 0; i--) {
		confettis.push(new paillette(fontaines[i][0],fontaines[i][1]))
	}
 	//confettis.push(new paillette(x,y))
	context.font = "50px cursive";
	context.fillStyle = "white";
	context.textBaseline = "middle"
	next=[]
	for (var i = confettis.length - 1; i >= 0; i--) {
		conf=confettis[i]
		conf.draw()
		if (conf.y<H){
			next.push(conf)
		}
	}
	confettis=[...next]
	el.textContent="cliquez pour ajouter une fontaine";
	context.fillStyle="white"
	context.fillText(
		"force: "+force
		+"  particules: "+confettis.length
		+" fps: "+Math.round(100/(fps2-fps1))*10
		,0,H-20)
	fps1=fps2
	requestAnimationFrame(bLoop)
	
	
}bLoop()
