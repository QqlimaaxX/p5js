var vehi;
function setup(){
	createCanvas(1700,700);
	vehi = new Vehicle();
}

function draw(){
	background(255);
	var mouse=createVector(mouseX,mouseY);
	ellipse(mouse.x,mouse.y,20,20);
	vehi.seek(mouse);
	vehi.update();
	vehi.display();
}
