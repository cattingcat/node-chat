
var chatClient = {
    send: function (msg) {
        this.sock.emit('message', {
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
    leave: function () {
        this.sock.emit('leave', { });
        this.sock.removeAllListeners();
    }
};