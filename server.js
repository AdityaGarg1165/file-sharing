const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected');
  const ip = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress;
  console.log('User IP:', ip);
  socket.emit('ip', ip);
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
const port = process.env.PORT
server.listen(port, () => {
  console.log('Server running at http://localhost:3000');
});
