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
context.fillStyle="black"
context.fillRect(0,0,W,H)
context.drawImage(new Image("birck.jpg"),50,50)
context.lineWidth=0
context.shadowOffsetX=5
context.shadowOffsetX=5
context.shadowBlur=10

canvas.addEventListener("mousedown",mousedown);
canvas.addEventListener("mousemove",mousemove);
canvas.addEventListener("wheel",scroll,{"passive":true});
window.addEventListener("mouseup",mouseup);
function scroll(e) {
	coul-=Math.sign(e.deltaY)*36
	coul=coul%360
	let hsl='hsl('+coul+',50%,50%)'
	context.shadowColor=hsl
	context.fillStyle=hsl
	context.strokeStyle=hsl
}
function mouseup(e){IsDown=false;oldpos=false}
function mousedown(e){IsDown=true}
function mousemove(e){
	if(IsDown){
		pos=[e.offsetX,e.offsetY]
		if(oldpos==false){
			oldpos=pos
		}else{
			distance=dist(oldpos,pos)
			for(let i=0;i<10;i++){
				draw([oldpos[0]+(pos[0]-oldpos[0])/10*i,
					oldpos[1]+(pos[1]-oldpos[1])/10*i]);
			}
		}
		oldpos=pos
		size+=(Math.random()-0.5)*2
		size=Math.abs(size%50)
	}
}
function hey(num) {
	console.log(num)
}
function set_coul(val) {
	coul=val
	let hsl='hsl('+coul+',50%,50%)'
	context.shadowColor=hsl
	context.fillStyle=hsl
	context.strokeStyle=hsl
}
function dist(a,b){return Math.sqrt((a[0]-b[0])**2+(a[1]-b[1])**2)}
function draw(pos) {
	context.beginPath()
	context.arc(pos[0]-size/2,pos[1]-size/2,size,0,Math.PI*2)
	context.closePath()
	context.fill()
	context.stroke()
}
let IsDown=false
let size=25
let coul=360
let oldpos=false;
let hsl='hsl('+coul+',50%,50%)'
context.shadowColor=hsl
context.fillStyle=hsl
context.strokeStyle=hsl
