var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');
var usocket = [];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
//开发静态资源
app.use(express.static(path.join(__dirname, 'public')));
io.on('connection', function(socket){
  console.log('a user connected')

  socket.on("join", function (name) {
    socket.name = name;
    usocket[name] = socket
    io.emit("join", name)
  })

  socket.on("message", function (msg) {
    io.emit("message", msg) //将新消息广播出去
  })
  socket.on('disconnect', function(msg){
    io.emit('disconnect', socket.name);
  })
  socket.on('base64 file', function (msg) {
    socket.username = msg.username;
    // socket.broadcast.emit('base64 image', //exclude sender
    io.sockets.emit('base64 file',  //include sender
        msg
    );
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});