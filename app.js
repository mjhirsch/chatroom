
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io')
var app = express();
var io = require('socket.io')(http)

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//index route
// app.get('/', routes.index);
app.get('/', function (req, res) {
  res.sendfile('/HTML/index.html', {root : './public'});
});
 
//Create the server
var server = http.createServer(app)

//Start the web socket server
var io = socketio.listen(server);

var users = []

//If the client just connected
io.on('connection', function(socket) {
	// console.log(socket)
	console.log('a user connected')

	socket.on('send', function(data){
		console.log(data)
		io.emit('update', socket.username, data)
	})

	socket.on('adduser', function(username){
		socket.username = username
		users.push(username)
		socket.emit('update', 'Server', 'you have connected')
		socket.broadcast.emit('update', 'Server', username + ' has connected')
		io.sockets.emit('updateusers', users)
	})

});

server.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});


