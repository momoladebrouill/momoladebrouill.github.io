let canvas = document.getElementById("can");
let context = canvas.getContext("2d");
let W = window.innerWidth;
let H = window.innerHeight;
let ratio = window.devicePixelRatio;
canvas.width = W*ratio;
canvas.height = H*ratio;
canvas.style.width = W + "px";
canvas.style.height = H + "px";
context.scale(ratio,ratio);
context.shadowBlur=50
//document.addEventListener("wheel",scroll,false);
context.fillStyle="black"
context.fillRect(0,0,W,H)
function scroll(e) {
	let val=Math.sign(e.deltaY)
	/*for (var i = bulles.length - 1; i >= 0; i--) {
		bulles[i].vec[1]-=val*10
	}*/
	bulles.push(new Circle())
	
	
}
class Circle{
	constructor(){
		this.x=W/2
		this.y=H/2
		this.ang=Math.random()*2*Math.PI
		this.ray=Math.random()*50
		this.color="hsl("+Math.random()*360+",100%,50%)"
	}
	move(){
		this.x+=Math.cos(this.ang)
		this.y+=Math.sin(this.ang)
		if(this.x<0 || this.x>W || this.y<0 || this.y>H){
			this.remove()
		}

	}
	draw(){
		this.move()
		context.shadowColor=this.color
		context.fillStyle=this.color
		context.beginPath()
		context.arc(this.x,this.y,this.ray,0,2*Math.PI)
		context.closePath()
		context.fill()
	}

	remove(){
		for (var i = bulles.length - 1; i >= 0; i--) {
			if(bulles[i]==this){
				bulles.splice(i,1);
				break;
			}
		}
	}
}
let bulles=[]
function boom(){
	for (var i =0; i <10; i++) {
		bulles.push(new Circle())
	}
}

let time=0
function Bloop(moment) {
	context.fillStyle="black"
	context.fillRect(0,0,W,H)
	context.fillStyle="red"
	context.fillText(10,10,"r")
	time+=1/60
	if(Math.round(time)==10){
		time=0
		boom()
	}
	for (var i = bulles.length - 1; i >= 0; i--) {
		bulles[i].draw()
	}
	requestAnimationFrame(Bloop)
}
Bloop()
