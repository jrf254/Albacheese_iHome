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
var canvas3 = document.getElementById('alarm-canvas');
var ctx3 = canvas3.getContext('2d');

var on = true;
var walls = [];
var alarm = null;

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
		
	}
	setAlarm();
	addExterior();
}

function setAlarm(){
	ctx3.clearRect(0, 0, canvas.width, canvas.height);
	var alarmImage = new Image();

	if(alarm == 'arm'){
		var light = new Lamp({
		    position: new Vec2(460,490),
		    distance: 50,
		    color: 'rgba(255,0,0,0.8)',
		    samples: 50
		});
	}else{
		var light = new Lamp({
		    position: new Vec2(460,490),
		    distance: 1,
		    color: 'rgba(255,0,0,0)',
		    samples: 50
		});
	}
	var lighting = new Lighting({
		light: light,
		objects: []
	});
	lighting.compute(canvas.width, canvas.height);

	lighting.render(ctx3);
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
	setAlarm();
}

socket.on('update', function(currentLights, currentAlarm){
	alarm = currentAlarm;
	if(currentLights == 0){
		setBackground(removeLighting);
	}else{
		setBackground(addLighting, currentLights);
	}
});