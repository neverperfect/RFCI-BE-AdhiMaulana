var net = require('net');
var fs = require('fs');
var moment = require('moment');

/* Server Side */

var port = 1337;
var ipAddress = '127.0.0.1'
var dataStream = fs.createWriteStream('server.log')
var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket).on('data', function(data) {
		dataStream.write(`[${moment().format()}] Success : POST http://${ipAddress}/ ${data} `, function(err, result) {
			if(err) console.log('error',err);
		});
	});
});

server.listen(port, ipAddress);



/* Client Side */
var net = require('net');
var counter = 1;

function xrandom(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
 }

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
	var myVar = setInterval(myTimer, 2000);
	function myTimer() {
		client.write(`{"counter": ${counter}, "X-RANDOM": "${xrandom(8)}"} \n`);
		counter++;
	}
	setTimeout( function() {
		clearInterval(myVar);
	}, 2000 * 4)
});

setTimeout( function() {
	client.on('data', function(data) {
 		console.log('Received: ' + data);
	 	client.destroy();
	});
}, 2000 * 5);

client.on('close', function() {
	console.log('Connection closed');
});
