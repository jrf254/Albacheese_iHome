var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/button', function(req, res){
  res.sendFile(__dirname + '/button.html');
});

app.get('/app', function(req, res){
  res.sendFile(__dirname + '/public/app/app_index.html');
});

var currentLights = 0;

var currentAlarm = "disarm";

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
	io.emit('update', currentLights, currentAlarm);
  console.log('New connection from ' + socket.request.connection.remoteAddress + " " + currentLights + " " + currentAlarm);

  socket.on('alarm on', function(amount){
  	currentAlarm = amount;
    io.emit('update', currentLights, currentAlarm);
  });  

  socket.on('switch on', function(amount){
  	currentLights = amount;
    io.emit('update', currentLights, currentAlarm);
  });
});