// create the server
var express = require('express');
var http = require('http');

// app and app config
var path = require('path');
var app = express();
app.configure(function() {
	
	// IF NEEDED, CHANGE THIS
	// Server authentication
	// app.use(express.basicAuth(function(user, pass) {
	//   return user === 'howdy' && pass === 'pass';
	// }));

    app.use(express.static(path.join(__dirname, 'app')));
    app.use(express.bodyParser());
    app.use(express.logger("short"));
    app.use('/js/lib/', express.static('node_modules/requirejs/'));
    app.use('/node_modules', express.static('node_modules'));
});

// socket.io
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// routing
app.get("/", function(req, res) {
	res.sendfile(filedir + '/index.html');
});

// server listening port
server.listen(167);

// store the connected users
var users = {};

// corrected now 
var now = function() {
	var dt = new Date();
	var mh = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
	var hh = dt.getHours() > 12 ? dt.getHours() - 12 : (dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours());
	var mm = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
	var ap = dt.getHours() > 12 ? "PM" : "AM";

	return {
		timeStamp: hh + ':' + mm + ' ' + ap,
		dateTime: mh + ':' + mm
	}
};

// initialize socket.io
io.sockets.on('connection', function(socket) {

	// when the client emits sendchat, this listens and executes
	socket.on('sendchat', function(msg, notifyMsg) {
		// tell the client to execute updatechat with 3 paramaters
		io.sockets.emit('updatechat', {
			timeStamp: now().timeStamp,
			dateTime: now().dateTime,
			userName: socket.userName,
			msg: msg,
			notifyMsg: notifyMsg,
			color: socket.color
		});
	});

	// when the client emits adduser this listen and executes
	socket.on('adduser', function(options) {
		// we store the userName in the socket session for this client
		socket.userName = options.userName;
		// add userName to global list
		users[options.userName] = options;
		// just as such
		socket.color = options.color;

		// echo to client that they've connected
		socket.emit('updatechat', {
			timeStamp: now().timeStamp,
			dateTime: now().dateTime,
			userName: 'Server',
			msg: 'You have connected',
			notifyMsg: 'You have connected',
			color: options.color
		});

		// echo globally that a person has connected
		socket.broadcast.emit('updatechat', {
			timeStamp: now().timeStamp,
			dateTime: now().dateTime,
			userName: 'Server',
			msg: options.userName + ' has connected',
			notifyMsg: options.userName + ' has connected',
			color: options.color
		});

		// update the list of users in chat, client side
		io.sockets.emit('updateusers', users);
	});

	// when the user disconnects
	socket.on('disconnect', function() {
		// remove userName from global list
		delete users[socket.userName];

		// update list of users in chat client side
		io.sockets.emit('updateusers', users);

		// echo globally that the user has left
		socket.broadcast.emit('updatechat', {
			timeStamp: now().timeStamp,
			dateTime: now().dateTime,
			userName: 'Server',
			msg: socket.userName + ' has left',
			notifyMsg: socket.userName + ' has left',
			color: socket.color
		});
	});
});