module.exports = io => {
  io.on('connection', socket => {
    const date = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].map((x) => x < 10 ? "0" + x : x).join(":");

    /*

    socket.on('connect-user', data => {
      io.emit('update-chat', {
        user: data.user.name,
        message: data.message,
        date: date,
      });
    });

    socket.on('disconnect-user', data => {
      const date = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].map((x) => x < 10 ? "0" + x : x).join(":");

      io.emit('update-chat', {
        user: data.user.name,
        message: `Logged out of the chat`,
        date: date
      });
    });

    */

    socket.on('new-message', async data => {
      const date = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].map((x) => x < 10 ? "0" + x : x).join(":");

      io.emit('update-chat', {
        user: data.user.name,
        message: data.message,
        date: date,
      });

      await models.chat.findOneAndUpdate({
        name: data.chat.name
      }, {
        $push: {
          messages: {
            user: data.user.name,
            message: data.message,
            date: date,
          }
        }
      }, {
        new: true,
      }, (error, chat) => {
        if (!error){
          //console.log('Chat update! chat: ', chat);
        } else {
          //console.log('error: ', error);
        }
      });
    });
  });
};