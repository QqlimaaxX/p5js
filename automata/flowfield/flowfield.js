function Flowfield(){
	//a flowfield has to store vectors
	//in a grid, have them point in some directions
	//and have some resolution set for division
	//of the display into the grid
	this.resolution = 100;
	this.cols=width/this.resolution;
	this.rows=height/this.resolution;
	this.grid=[];
	for(var i=0; i<this.cols;i++){
		this.grid.push([]);
		for (var j=0;j<this.rows;j++){
			var vec = p5.Vector.fromAngle(random(-PI/4,PI/4));
			// var vec = createVector(width/2-(i+0.5)*this.resolution,height/2-(j+0.5)*this.resolution)
			this.grid[i].push(vec);
		}
	}

	this.show = function(){
		for(var i=1; i<=this.cols;i++){
			for (var j=1;j<=this.rows;j++){
				push();
				translate((i-0.5)*this.resolution,(j-0.5)*this.resolution);
				rotate(this.grid[i-1][j-1].heading());
				line(-this.resolution/4,0,this.resolution/4,0);
				line(this.resolution/8,this.resolution/8,this.resolution/4,0);
				line(this.resolution/8	,-this.resolution/8,this.resolution/4,0);
				pop();
			}
		}	
	}

	this.lookup=function(location){
		//to be implemented
	}

}
