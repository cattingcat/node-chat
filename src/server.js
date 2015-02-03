var   express 	= require('express')
	, sockets 	= require('socket.io')
	, http 		= require('http')
	, config 	= require('./config.json');

var app = express();
var server = http.Server(app)

var io = sockets(server);


app.use('/', express.static(__dirname));

io.on('connection', function(socket){

	socket.on('message', function(data){
		console.log(data);
		socket.emit('message', data.message);
	});
});


server.listen(config.port, function(){
    console.log('Express server listening on port ' + config.port);
});