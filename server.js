const { Server } = require("socket.io");

const io = new Server({ /* options */ });

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });

  socket.on('message', (msg) => {
    console.log(`${msg}`);
    io.emit('message', msg);
  });
});

io.listen(3000);
