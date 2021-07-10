const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Connection
io.on('connection', (socket) => {
  io.emit('user connected', `user has connected`);

  socket.on('disconnect', () => {
      io.emit('user disconnected', 'user has disconected')
  })

});

//Message
io.on('connection', (socket) => {
    // var date = new Date()
    // var time = date.getTime()

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        // io.emit('chat time', time);
    });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});