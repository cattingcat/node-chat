
var chatClient = {
    send: function (group, msg) {
        this.sock.emit('message', {
            group: group, 
            message: msg
        });
    },
    connect: function (callback) {
        this.sock = io.connect('http://localhost:9000');
        this.sock.on('message', callback);
    },
    join: function (group, pwd) {
        this.sock.emit('join', {
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