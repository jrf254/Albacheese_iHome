var socket = io();
console.log("here");
$$('.lightToggleButton').on("click", function(){
	console.log($$(this).attr('id'));
	socket.emit('switch on', $$(this).attr('id'));
});
