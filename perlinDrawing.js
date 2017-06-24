var rows = 30;
var cols = 30;
var initialParticles = 1000;

var field = [];
var particles = [];
var thicknessX;
var thicknessY;
			
var k = 0.05;
var time = 0;

var canDraw = false;
var influence = 1;

var random1=0;
var random2=0;

function setup(){
	createCanvas(1900,950);
	thicknessX = width/rows;
	thicknessY = height/cols;
	for( var i=0;i<rows;i++){
		field[i] = new Array(cols);
	}
	for ( var i = 0; i < initialParticles; i++){
		particles.push(new Particle());
	}
	background(255);
	fill('rgba(255,255,255,0.1)');
	// console.log(field);
}

function draw(){
	// background(0);
	rect(0,0,width,height);
	for (var i=0;i<rows;i++){
		for (var j=0;j<cols;j++){
			field[i][j] = p5.Vector.fromAngle(noise(i*k,j*k,time)*TWO_PI*2);

			//draws vectors for flowfield
			if(canDraw){
				push();
					translate(thicknessX*(i+0.5),thicknessY*(j+0.5));
					rotate(field[i][j].heading());
					line(-thicknessX/4,0,thicknessX/4,0);
					line(thicknessX/4,0,thicknessX/8,thicknessY/8);
					line(thicknessX/4,0,thicknessX/8,-thicknessY/8);
				pop();
			}
		}
	}
	var s = "rgba("+floor(noise(random2*k)*255)+","+floor(noise(random1*k)*255)+","+floor(noise(time*k)*255)+",0.5)";
	stroke(s);

	particles.forEach(function(particle){
		var pos = particle.pos;

		var coordX = floor(pos.x/thicknessX);
		var coordY = floor(pos.y/thicknessY);

		particle.applyForce(field[coordX][coordY].setMag(influence));
		particle.updatePos();
		particle.update();
		particle.draw();
	});


	time+=0.01;
	random1 += 0.05;
	random2 += 0.02;
}

function keyPressed(){
	if(keyCode === ENTER){
		canDraw = !canDraw;
	}
}

function Particle(){
	this.pos = createVector(random(width),random(height));
	this.prevPos = this.pos.copy();
	this.velocity = createVector(0,0);
	this.accl = createVector(0,0);

	this.maxSpeed = 2;
	this.maxForce = 1;

	this.draw = function(){
		point(this.pos.x,this.pos.y);
		line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y);
	}

	this.update = function(){
		this.velocity.add(this.accl);
		this.velocity.limit(this.maxSpeed);
		this.updatePos();
		this.pos.add(this.velocity);
		this.accl.mult(0);
		this.checkEdge();
	}

	this.applyForce = function(force){
		this.accl.add(force);
		this.accl.limit(this.maxForce);
	}

	this.applyFullForce = function(force){
		this.accl.add(force);
	}


	this.seek = function(target){
		var desired = target.sub(this.pos);
		desired.setMag(this.maxSpeed);
		// this.debugDraw(desired,"desired",20);
		var steer = desired.sub(this.velocity);
		steer.limit(this.maxForce);
		// this.debugDraw(steer,"steer",200);
		this.applyForce(steer);
	}

	this.seekSmart = function(target){
		var desired = target.copy();
		desired.sub(this.pos);
		var dist = desired.mag();
		var speed = this.maxSpeed;
		if(dist<this.thresholdDist){
			speed = map(dist,0,this.thresholdDist,0,this.maxSpeed); 
		}
		desired.setMag(speed);
		var steer = desired.sub(this.velocity);
		steer.limit(this.maxForce);
		this.applyForce(steer);
		// this.debugDraw(steer,"steer",200);
		// this.debugDraw(desired,"desired",20);
	}

	this.debugDraw = function(vec,str,k){
		push();
			translate(this.pos.x,this.pos.y);
			text(str,vec.x*k/2,vec.y*k/2);
			line(0,0,vec.x*k,vec.y*k);
		pop();
	}

	this.updatePos=function(){
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
		// console.log(this.pos,this.prevPos);
	}

	this.checkEdge = function () {
		if(this.pos.x>width){
			this.pos.x = 0;
			this.updatePos();
		}
		if(this.pos.x<0){
			this.pos.x = width-1;
			this.updatePos();
		}
		if(this.pos.y>height){
			this.pos.y = 0;
			this.updatePos();
		}
		if(this.pos.y<0){
			this.pos.y = height-1;
			this.updatePos();
		}
	}
}
