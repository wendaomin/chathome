# chathome
# 项目介绍
该聊天室基于[socket.io](https://socket.io/)实现客户端与服务器双工实时通信。该聊天室可以发送消息、图片、文件。
# 通信图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200530103407240.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NoYW1hbjEzNzg=,size_16,color_FFFFFF,t_70)
1. 客户端与服务器连接
2. 客户端向服务器发送事件
3. 服务器接受事件，将事件发送给所有客户端。实现事件广播。

# 客户端
1. 创建客户端并连接服务器 localhost:3000
```
 var socket = io('localhost:3000')
 ```
 2. 向服务器发送事件
 ```
 //发送用户名
 socket.emit("join", name)
 //发送消息
 socket.emit("message", userObj) 
 //发送文件、图片
  socket.emit('base64 file', msg);
 ```
 3. 监听服务器发来的事件
 ```
 socket.on("join", function (user) {
      socket.name = user
      addLine(user + '加入了群聊')
    })
    //接收到服务器发来的message事件
    socket.on("message", function(msg) {
      addLine(msg)
    })
    socket.on('disconnect', function(msg){
      addLine(msg + '退出了群聊');
    })
    socket.on('base64 file', function(msg){
      addLine(msg)
    })
   ```
   # 服务器
   1.监听客户端发来的连接事件
 ```
   io.on('connection', function(socket){}
```
2. 监听客户端发来事件，并将该事件发送给所有客户端
```
//连接客户端
io.on('connection', function(socket){
  console.log('a user connected')
//socket捕获join事件
  socket.on("join", function (name) {
    socket.name = name;
    usocket[name] = socket
    //服务器将join事件发送给所有客户端
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
```
# 运行
1. 运行服务器
	在powershell（需要安装nodejs）上运行, 先npm install下载所有npm包，再运行server.js文件即
```
      node server
```
2. 运行客户端
在浏览器上输入 localhost：3000

# 项目代码
[demo](https://github.com/wendaomin/chathome)
