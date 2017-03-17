function Vehicle(){
	this.location=createVector(random(width),random(height));
	this.rotation=0;
	this.acceleration=createVector(0,0);
	this.velocity=createVector(0,0);
	this.maxSpeed=5;
	this.maxForce=0.15;
	this.slowdownDist = 200;
	this.update= function(){
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
	}

	this.applyForce=function(force){
		//limiting and applying force,ignoring mass
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
		// line(0,0,0,-this.velocity.mag()*20);
		pop();
	}

	this.seek = function(target){
		var desire = target.sub(this.location).setMag(this.maxSpeed);
		this.applyForce(desire.sub(this.velocity));
	}

	this.seekSmart = function(target){
		//this function will make the vehicle slow down
		//on reaching closer to the target = slowdownDist
		var desire = target.sub(this.location);
		var dist = desire.mag();// this is the dist b/w target and vehicle
		if(dist<this.slowdownDist){
			desire.setMag(map(dist,0,this.slowdownDist,0,this.maxSpeed));
		}else{
			desire.setMag(this.maxSpeed);
		}
		var steer = desire.sub(this.velocity);
		this.applyForce(steer);
	}

	this.follow=function(field){
		var desire = field.lookup(this.location);
		this.applyForce(desire.sub(this.velocity));
	}

}

