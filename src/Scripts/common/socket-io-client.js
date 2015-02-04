
var chatClient = {
    send: function (group, msg) {
        this.sock.emit('message', {
            group: group, 
            message: msg
        });
    },
    connect: function (msgCallback, joinCallback, joinFailCallback) {
        this.sock = io.connect('http://localhost:9000');
        this.sock.on('message', msgCallback);
        this.sock.on('joined', joinCallback);
        this.sock.on('failJoined', joinFailCallback);
    },
    join: function (name, group, pwd) {
        this.sock.emit('join', {
            name: name,
            group: group, 
            password: pwd
        });
    },
    leave: function (group) {
        this.sock.emit('leave', {
            group: group
        });
    }
};