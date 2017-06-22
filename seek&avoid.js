var balls=[];
var numBalls = 1;
var collisionDist = 20;

function setup(){
	createCanvas(1700,900);
	for(var i=0;i<numBalls;i++){
		balls.push(new Ball());
	}
	// frameRate(1);
}


function draw(){
	background(255);
	text("Frames - "+Math.round(frameRate()),10,10);
	text("Balls - "+ numBalls,10,20);
	// ellipse(mouseX,mouseY,200,200);
	numBalls = balls.length;
	for(var i=0;i<numBalls-1;i++){
		for(var j=i+1;j<numBalls;j++){
				var direction =createVector(balls[i].pos.x-balls[j].pos.x,balls[i].pos.y-balls[j].pos.y); //direction vector from ball[i] to ball[j]
				var dist = direction.mag();
				
				if(dist<collisionDist){

					direction.setMag(balls[i].maxSpeed);
					var otherDirection = direction.copy().mult(-1);
					var maxColForce = map (dist,0,collisionDist,2,0);
					// balls[i].debugDraw(direction,"direction",20);
					// balls[j].debugDraw(otherDirection,"direction",20);
					var steer = direction.sub(balls[i].velocity).limit(maxColForce);
					var otherSteer = otherDirection.sub(balls[j].velocity).limit(maxColForce);

					// balls[i].debugDraw(steer,"steer",20);
					// balls[j].debugDraw(otherSteer,"steer",20);

					balls[i].applyFullForce(steer)
					balls[j].applyFullForce(otherSteer);
				}
		}
	}
	var mouse = createVector(mouseX,mouseY);
	balls.forEach(function(ball){
		ball.seekSmart(mouse);
		ball.update();
		ball.draw();
	});
}

function mouseDragged(){
	balls.push(new Ball());
}

function Ball(){
	this.pos = createVector(random(width),random(height));
	this.velocity = createVector(0,0);
	this.accl = createVector(0,0);

	this.maxSpeed = 7;
	this.maxForce = 0.3;
	this.avoidCollisionForce = 0.3;
	this.rad = 10;
	this.thresholdDist = 100;

	this.draw = function(){
		ellipse(this.pos.x,this.pos.y,this.rad,this.rad);
	}

	this.update = function(){
		this.velocity.add(this.accl);
		this.velocity.limit(this.maxSpeed);
		this.pos.add(this.velocity);
		this.accl.mult(0);
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
}
