const io = require("socket.io")(3000); // crea un server en el puerto 3000

const users = {} // store users info

io.on("connection", // cada vez que un usuario entra a nuestro we, llamara esta función
  (socket) => {
    socket.on('new-user', name => {
      users[socket.id] = name;
      socket.broadcast.emit("user-connected", name)
    })
    socket.on('send-chat-message', message => {  //send the message a todas las otras personas conectadas al servidor
      socket.broadcast.emit("chat-message", {
        message: message,
        name: users[socket.id]
      })
    })
    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconected', users[socket.id]);
      delete users[socket.id]
    })
  });
