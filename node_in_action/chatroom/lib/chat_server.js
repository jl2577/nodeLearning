/**
 * Created by lightjiang on 2016/9/22.
 */
var socketio= require('socket.io');
var io;
var guestNumber =1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server){
    io = socketio.listen(server);
    io.set('log level',1);
    io.sockets.on('connection' , function (socket) {
        guestNumber = assignGuestName(socket,guestNumber,nickNames,namesUsed);
        joinRoom(socket,'Lobby');
        handleMessageBroadcasting(socket,nickNames);
        handleNameChangeAttempts(socket,nickNames,namesUsed);
        handleRoomJoining(socket);
        socket.on('rooms',function () {
            socket.emit('rooms',io.sockets.adapter.rooms);   //版本更新 manager 更新为adapter
        });
        handleClientDisconnection(socket,nickNames,namesUsed);
    })
}


//分配用户昵称
function assignGuestName(socket , guestNumber , nickNames , nameUsed) {
    var name = "Guest "+guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult' , {
        success : true,
        name : name
    });
    nameUsed.push(name);
    return guestNumber+1;
}


//进入聊天室
function joinRoom(socket , room) {
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult',{room : room});
    socket.broadcast.to(room).emit('message',{
        text:nickNames[socket.id]+ 'has joined '+ room + '.'
    });
    var usersInRoom = io.sockets.adapter.rooms[room];   //版本更新 io.sockets.clients(room) 更新为io.sockets.adapter.rooms(room)
    console.dir(usersInRoom);
    console.dir(nickNames);
    console.log(room);
    if(usersInRoom.length > 1){
        var usersInRoomSummary = "Users currently in "+room +": ";
        for (var index in usersInRoom.sockets
            ){
            usersInRoomSummary += nickNames[index];
        }
        usersInRoomSummary += ',';
        socket.emit('message',{text:usersInRoomSummary});
    }
}

function handleNameChangeAttempts(socket,nickNames,namesUsed) {
    socket.on('nameAttempt',function (name) {
        if(name.indexOf('Guest') == 0){
            socket.emit('nameResult',{
                success : false,
                message : 'Names cannot begin with "Guest" .'
            });
        }else{
            if(namesUsed.indexOf(name) == -1){
                var previousName = nickNames[socket.id];
                var previousNameIndex = namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id] = name;
                delete namesUsed[previousNameIndex];
                socket.emit('nameResult',{
                    success: true,
                    name : name
                });
                socket.broadcast.to(currentRoom[socket.id]).emit('messgae',{
                    text:previousName + ' is now known as '+ name + '.'
                });
            }else{
                socket.emit('nameResult',{
                    success:false,
                    message:'that name is already in use.'
                });
            }
        }
    });
}

function handleMessageBroadcasting(socket) {
    socket.on('message',function(message){
        socket.broadcast.to(message.room).emit('message',{
            text:nickNames[socket.id]+ ": "+message.text
        });
    })
}

function handleRoomJoining(socket) {
    socket.on('join',function (room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket,room.newRoom);
    })
}

function handleClientDisconnection(socket){
    socket.on('disconnect',function(){
        var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    })
}