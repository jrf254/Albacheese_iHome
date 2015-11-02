
  // Importing relevant classes
  var Lamp = illuminated.Lamp
  , RectangleObject = illuminated.RectangleObject
  , DiscObject = illuminated.DiscObject
  , Vec2 = illuminated.Vec2
  , Lighting = illuminated.Lighting
  ;

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var light1 = new Lamp({
    position: new Vec2(100, 250),
    distance: 200,
    radius: 10,
    samples: 50
  });
  var light2 = new Lamp({
    position: new Vec2(300, 50),
    color: '#CCF',
    distance: 200,
    radius: 10,
    samples: 50
  });
  var disc = new DiscObject({ center: new Vec2(100, 100), radius: 30 });
  var rect = new RectangleObject({ topleft: new Vec2(250, 200), bottomright: new Vec2(350, 250) });

  var objects = [ disc, rect ];

  var lighting1 = new Lighting({
    light: light1,
    objects: objects
  });
  var lighting2 = new Lighting({
    light: light2,
    objects: [ disc, rect ]
  });
  lighting1.compute(canvas.width, canvas.height);
  lighting2.compute(canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "lighter";
  lighting1.render(ctx);
  //lighting2.render(ctx);

