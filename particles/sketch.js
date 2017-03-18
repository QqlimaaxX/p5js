var particles = [];
var count = 100;
var min_len = 125*125;
var alp,gap,stkw;
var fro,to,mid;

function setup(){
	createCanvas(windowWidth,windowHeight);
	noStroke();
	count=Math.floor(windowWidth*windowHeight/17500);
	for(var i=0;i<count;i++){
		particles.push(new Particle());
	}
	fill(0);
}

function draw(){
	background(255,228,225);
	for(var i=0;i<particles.length;i++){
		var pos1=particles[i].pos;
		for(var j=i;j<particles.length;j++){
			var pos2=particles[j].pos;
			// gap = dist(pos1.x,pos1.y,pos2.x,pos2.y);
			gap = Math.pow((pos1.x-pos2.x),2) + Math.pow((pos2.y-pos1.y),2);
			if(gap<min_len){
				alp = map(gap,0,min_len,1,0);
				stkw = map(gap,1,min_len,2,0);
				stroke('rgba(0,0,0,'+alp+')');
				strokeWeight(stkw);
				line(pos1.x,pos1.y,pos2.x,pos2.y);
			}
		}
		//also checking the distance of particle[i] with mouse's pos
		// gap=dist(pos1.x,pos1.y,mouseX,mouseY);
		gap = Math.pow((pos1.x-mouseX),2) + Math.pow((mouseY-pos1.y),2);

		if(gap<min_len){
				alp = map(gap,0,min_len,1,0);
				stkw = map(gap,1,min_len,2,0);
				stroke('rgba(0,0,0,'+alp+')');
				strokeWeight(stkw);
				line(pos1.x,pos1.y,mouseX,mouseY);
		}
	}

	//updating particles
	noStroke();
	for(var i=particles.length-1;i>=0;i--){
		particles[i].update();		
	}
}
