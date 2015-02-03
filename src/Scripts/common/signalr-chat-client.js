var signalrClient = {
    send: function (group, msg) {
        $.connection.chatHub.server.send(group, msg);
    },
    connect: function (callback) {
        var func = 'sendMessage';                       // Backend func
        $.connection.chatHub.client[func] = callback;
        return $.connection.hub.start();                //async function .done()
    },
    join: function (group, pwd) {
        return $.connection.chatHub.server.join(group, pwd);
    },
    leave: function (group) {
        return $.connection.chatHub.server.leave(group);
    }
};