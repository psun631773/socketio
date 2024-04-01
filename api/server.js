const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
// const io = socketIo(server);
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000", // 允许来自前端服务器的连接
      methods: ["GET", "POST"]
    }
  });
  
io.on('connection', (socket) => {
  console.log('New client connected');
// 1 message monitoring
  socket.on('message', (message) => {

    console.log('Message received:', message);
    if (message.startsWith('a')) {
        console.log(`${message} send`, message);
      socket.emit('message', '111');
    } else {
      socket.emit('message', '222');
      console.log('message send', message);
    }
  });

// alert monitoring
  socket.on('alert', (alertMessage) => {
    // 在这里处理 alert 事件
    console.log('Alert received:', alertMessage);
    // 根据需要发送响应
    socket.emit('alert', `Alert received: ${alertMessage}`);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
