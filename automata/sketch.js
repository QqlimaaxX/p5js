var vehi,vehi2;
function setup(){
	createCanvas(1700,700);
	vehi = new Vehicle();
	vehi2 = new Vehicle();
}

function draw(){
	background(255);
	vehi.seekSmart(createVector(mouseX,mouseY));
	vehi.update();
	vehi.display();
	vehi2.seekSmart(createVector(vehi.location.x,vehi.location.y));
	vehi2.update();
	vehi2.display();
}
