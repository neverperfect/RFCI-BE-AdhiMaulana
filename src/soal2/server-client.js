var net = require('net');
var fs = require('fs');
var moment = require('moment');

/* Server Side */
var port = 1337;
var ipAddress = '127.0.0.1'
var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket).on('data', function(data) {
		fs.appendFile('server.log', `[${moment().format()}] Success : POST http://${ipAddress}/ ${data} `, function(err, result) {
			if(err) console.log('error',err);
		});
	});
});

server.listen(port, ipAddress);



/* Client Side */
var net = require('net');

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
	client.write(`{"counter": 1, "X-RANDOM": "93f9h3dx"}`);
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy();
});

client.on('close', function() {
	console.log('Connection closed');
});