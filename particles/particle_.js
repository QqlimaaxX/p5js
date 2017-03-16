function Particle(){
	this.pos = createVector(random(width),random(height));
	this.velocity=createVector(random(-0.75,0.75),random(-0.75,0.75));
	this.radius = random(2,4);
	this.update = function(){
		this.pos.add(this.velocity);
		ellipse(this.pos.x,this.pos.y,this.radius,this.radius);
		this.isOffScreen();
	}

	this.isOffScreen = function(){
		// return(this.pos.x>width+10||this.pos.x<-10||this.pos.y>height+10||this.pos.y<-10);		
		if(this.pos.x<0){this.pos.x=width;}
	 	if(this.pos.x>width){this.pos.x=10;}
		if(this.pos.y<0){this.pos.y=height;}
		if(this.pos.y>height){this.pos.y=10;}
	}
}