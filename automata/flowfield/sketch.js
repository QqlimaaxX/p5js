var vehicles=[],field;
function setup(){
	createCanvas(1800,900);
	field = new Flowfield();
}

function draw(){
	background(255);
	field.update();
	field.display();
	vehicles.forEach(function(vehi){
		// vehi.seekSmart(createVector(mouseX,mouseY));
		vehi.follow(field);
		vehi.update();
		vehi.display();
	});

}

function mouseDragged(){
	var newVehi = new Vehicle();
	vehicles.push(newVehi);
	newVehi.location = createVector(mouseX,mouseY);
}

function keyPressed(){
	field.canDisplay=!field.canDisplay;
}
