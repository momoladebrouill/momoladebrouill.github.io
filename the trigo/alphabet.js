let canvas = document.getElementById("game");
let context = canvas.getContext("2d");
let W = window.innerWidth;
let H = window.innerHeight;
let ratio = window.devicePixelRatio;
canvas.width = W*ratio;
canvas.height = H*ratio;
canvas.style.width = W + "px";
canvas.style.height = H + "px";
context.scale(ratio,ratio);

class Missile{
	constructor(){
		this.angle=Math.random()*TAU;
		this.x=(Math.cos(this.angle)+1)*W/2
		this.y=(Math.sin(this.angle)+1)*H/2
		this.vec=[(W/2-this.x)/300,(H/2-this.y)/300]
		this.val=parseInt(Math.random()*level)/level*360
	}
	draw(){
		this.move()
		context.fillStyle="hsl("+this.val+",100%,50%)";
		if(this.val!=this.landedon()){
			context.shadowBlur=15
			context.shadowColor=context.fillStyle
		}else{
			context.shadowBlur=0
		}
		context.beginPath();
		
		context.arc(this.x,this.y,10,0,TAU);
		context.fill();
		context.closePath();
		//context.fillStyle="white"
		//context.fillText(this.val,this.x,this.y)
	}
	move(){
		this.x+=this.vec[0]*speed;
		this.y+=this.vec[1]*speed;
	}
	landedon(){
		let ang=Math.atan2(this.y-H/2,this.x-W/2)-angle%TAU
		if(ang<0){ang+=TAU}
		return parseInt(ang/TAU*level)/level*360
	}
}

function keyup(e){dict[e.keyCode]=false
}

function keydown(e){
	if(Object.keys(dict).length === 0){
		dict["runnig"]=true;
		myAudio.play();
		document.getElementById('div').style.visibility="hidden"
		bLoop()
	}else{
		dict[e.keyCode]=true;
	}
}

function distToCenter(m){return Math.sqrt((W/2-m.x)**2+(H/2-m.y)**2)
}

const TAU=2*Math.PI
let score=10
let level=2
let angle=0
let fakeangle=0
let count=0
const speed=1
let dict={}
let armada=[new Missile()]
const score_dr=document.getElementById('score')
document.addEventListener("keydown", keydown, false);
document.addEventListener("keyup", keyup, false);

myAudio = new Audio('The_down.mp3'); 
chlevel= new Audio('ting.mp3')
error=new Audio('tong.mp3')
if (typeof myAudio.loop == 'boolean')
{
    myAudio.loop = true;
}
else
{
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

function bLoop() {
	context.beginPath()
	context.fillStyle = "black";
	context.fillRect(0,0,W,H);
	context.closePath()
	count+=1
	if (count>100){
		count=0
		armada.push(new Missile())

	}
	
	let nextarmada=[]
	for (let i = 0; i <=armada.length-1; i++) {
		armada[i].draw()
		if (distToCenter(armada[i])>100){
			nextarmada.push(armada[i])
		}else{
			if(armada[i].landedon()==armada[i].val){
				score++
			}else{
				score--
				error.play()
				if(score<0){score=0}
			}
		}

	}
	armada=[...nextarmada]
	if(parseInt(score/10)+2!=level){
		armada=[]
		chlevel.play()
		level=parseInt(score/10)+2
		angle=0
	}
	fakeangle+=(angle-fakeangle)/7
	for (let i = 0; i <= level; i++) {
		context.shadowBlur=0
		context.beginPath()
		
		
		context.moveTo(W/2,H/2)

		context.fillStyle="hsl("+i/level*360+",100%,50%)"
		
		context.arc(W/2,H/2,100,i/level*TAU+fakeangle,(i+1)/level*TAU+fakeangle);
		context.fill()
		//let k=(i+0.5)/level*TAU+fakeangle
		//context.fillStyle="white"
		//context.fillText(i/level*360,W/2+Math.cos(k)*150,H/2+Math.sin(k)*150)
		context.closePath()
		
	}
	score_dr.textContent=score
	for(elem in dict){
		if(dict[elem]){
			v=elem
			if (v==37){
				angle-=Math.PI/32
			}else if(v==39){
				angle+=Math.PI/32
			}else if(v==32){
				armada.push(new Missile())
			}else if(v==27){
				angle=0
	}

		}
	}
	context.beginPath()
	context.fillStyle="black"
	context.arc(W/2,H/2,50,0,TAU);
	context.fill()
	context.closePath()
	requestAnimationFrame(bLoop)
}
