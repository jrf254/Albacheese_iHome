var Lamp = illuminated.Lamp
  , RectangleObject = illuminated.RectangleObject
  , DiscObject = illuminated.DiscObject
  , Vec2 = illuminated.Vec2
  , Lighting = illuminated.Lighting
  , DarkMask = illuminated.DarkMask
  , LineObject = illuminated.LineObject
  , PolygonObject = illuminated.PolygonObject;


var socket = io();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');
var on = true;
var walls = [];

setBackground(removeLighting);
addExterior();

function setBackground(cb, amount){
	var backgroundImage = new Image();
	backgroundImage.addEventListener("load", function(){
		ctx.drawImage(backgroundImage, 0, 0);
		if(cb != null){
			cb(amount);
		}
	}, false);
	backgroundImage.src = 'assets/house.png';
}

function addLighting(amount){
	on = true;
	ctx.fillStyle = "rgba(0,0,0,.5)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	var coordinates = [325,301,427,230,801,244,930,307,1031,730,881,641];
	for(i = 0; i < coordinates.length; i += 2){
		var light = new Lamp({
		    position: new Vec2(coordinates[i], coordinates[i+1]),
		    distance: amount,
		    samples: 50
		});
		var lighting = new Lighting({
			light: light,
			objects: []
		});

		lighting.compute(canvas.width, canvas.height);

		lighting.render(ctx);
		addExterior();
	}
}

function addExterior(){
	var outerImage = new Image();
	outerImage.addEventListener("load", function(){
		ctx2.drawImage(outerImage, 0, 0);
	}, false);
	outerImage.src='assets/houseext2.png';
}

function removeLighting(){
	on = false;
	ctx.fillStyle = "rgba(0,0,0,.5)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

socket.on('switch on', function(amount){
	if(amount == 0){
		setBackground(removeLighting);
	}else{
		setBackground(addLighting, amount);
	}
});