const     express 	= require('express')
		, sockets 	= require('socket.io')
		, http 		= require('http')
		, config 	= require('./config.json');

var datasoure = require('./core/mongo.js');

var app = express();
var server = http.Server(app)

var io = sockets(server);




app.use('/', express.static(__dirname));
app.use('/', express.static(__dirname + '/views'));

io.on('connection', function(socket){

	socket.on('message', function(data){
		if(socket.rooms.indexOf(data.group) != -1){
			socket.to(data.group).emit('message', data.message);
		}
	});

	socket.on('join', function(data){
		var joined = function(){
			socket.join(data.group);
			socket.emit('joined', {status: 'success'});
			socket.to(data.group).emit('message', {sender: 'global', text: data.name + ' joined'});
		};

		datasoure.getRooms(data.group, function(i){
			if(i.length == 0){
				// create if not exist
				datasoure.createRoom({ name: data.group, password: data.password });
				joined();
			} else if(i[0].password == data.password) {
				// join if exist
				joined();
			} else {
				// failed join
				socket.emit('failJoined', {status: 'denied'});
			}
		});

		
	});

	socket.on('leave', function(data){
		socket.leave(data.group);
	});
});


server.listen(config.port, function(){
    console.log('Express server listening on port ' + config.port);
});