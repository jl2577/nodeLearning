/**
 * Created by lightjiang on 2016/9/22.
 */
var Chat = function (socket) {
    this.socket = socket;
}
Chat.prototype.sendMessage = function (room,text) {
    var message = {
        room :room,
        text : text
    };
    this.socket.emit('message',message);
};

Chat.prototype.changeRoom = function (room) {
    this.socket.emit('join',function(){
        newRoom : room
    });
}

Chat.prototype.processCommand = function (command) {
    var words = command.split(' ');
    var command = words[0].substring(1,words[0].length).toLowerCase();
    var message = flase;

    switch (command){
        case 'join':
            words.shift();
            var room  = words.join(' ');
            this.changeRoom(room);
            break;
        case 'nick':
            words.shift();
            var room  = words.join(' ');
            this.socket.emit('nameAttempt',name);
            break;
        default:
            message = "unrecognized command";
            break;
    }
    return messgae;
}