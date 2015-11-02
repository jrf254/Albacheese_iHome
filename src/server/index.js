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
  res.sendFile(__dirname + '/app_index.html');
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  console.log('New connection from ' + socket.request.connection.remoteAddress);
  socket.on('switch on', function(amount){
  	console.log(amount);
    io.emit('switch on', amount);
  });
});