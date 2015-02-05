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
app.set('etag', true);

io.on('connection', function(socket){

	socket.on('message', function(data){
		socket.to(socket.chGroup).emit('message', data);
	});

	socket.on('join', function(data){
		var joined = function(){
			socket.join(data.group);
			socket.emit('joined', {status: 'success'});
			socket.to(data.group).emit('message', {sender: 'global', text: data.name + ' joined'});
			
			// put information in socket
			socket.name = data.name;
			socket.chGroup = data.group;
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

	var leaveNofit = function(){
		socket.to(socket.chGroup).emit('message', {sender: 'global', text: socket.name + ' leave'});
		socket.leave(socket.chGroup);
	};

	socket.on('leave', leaveNofit);
	socket.on('disconnect', leaveNofit);
});


server.listen(config.port, function(){
    console.log('Express server listening on port ' + config.port);
});