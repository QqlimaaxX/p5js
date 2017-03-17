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
		if (this.pos.x>width+10||this.pos.x<-10||this.pos.y>height+10||this.pos.y<-10){
			this.pos.x=(this.pos.x+width)%width;
			this.pos.y=(this.pos.y+height)%height;
		}	
	}
}
