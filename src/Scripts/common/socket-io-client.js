
var chatClient = {
    send: function (group, msg) {
        this.sock.emit('message', {
            group: group, 
            message: msg
        });
    },
    connect: function (msgCallback, joinCallback, joinFailCallback) {
        this.sock = io.connect(window.location.origin);

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
    leave: function (name, group) {
        this.sock.emit('leave', {
            group: group,
            name: name
        });
        this.sock.removeAllListeners();
    }
};