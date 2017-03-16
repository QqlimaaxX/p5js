function Vehicle(){
	this.location=createVector(random(width),random(height));
	this.rotation=0;
	this.acceleration=createVector(0,0);
	this.velocity=createVector(0,0);
	this.maxSpeed=5;
	this.maxForce=0.15;

	this.update= function(){
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
	}

	this.applyForce=function(force){
		this.acceleration.add(force.limit(this.maxForce));
	}

	this.display = function(){
		push();
		translate(this.location.x,this.location.y);
		rotate(this.velocity.heading()+PI/2);
		beginShape();
		vertex(0,-10);
		vertex(-5,10);
		vertex(5,10);
		endShape(CLOSE);
		pop();
	}

	this.seek = function(target){
		var desire = target.sub(this.location).setMag(this.maxSpeed);
		this.applyForce(desire.sub(this.velocity));
	}
}

