const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: 'hhtp://localhost:3000'
    }
});

io.on("connection", (socket) => {
  // ...
});

io.listen(3000);