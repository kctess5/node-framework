
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path'); 

var app = express();
var XRegExp = require('xregexp').XRegExp





// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
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

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen( app.get('port') );
var io = require('socket.io').listen(server, function() {
        console.log("Express server listening on port " + app.get('port'));
});


// A user connects to the server (opens a socket)
io.sockets.on('connection', function (socket) {

    // (2): The server recieves a ping event
    // from the browser on this socket
    socket.on('ping', function ( data ) {
  
    	console.log('socket: server recieves ping (2)');

	    // (3): Return a pong event to the browser
	    // echoing back the data from the ping event 
	    socket.emit( 'pong', data );   

	    console.log('socket: server sends pong (3)');

    });
});