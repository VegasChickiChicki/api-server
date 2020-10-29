const models = require('../models/index');
const cors = require('cors');

module.exports = io => {
  io.on('connection', socket => {
    const date = () => {
      return [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].map((x) => x < 10 ? "0" + x : x).join(":");
    };

    socket.on('join-in-chat', data => {
      socket.join(data.chat.name);
    });

    socket.on('user-start-writing', data => {
      io.to(data.chat.name).emit('update-writing-user', {
        user: data.user.name,
        chat: data.chat.name,
      });
    });

    socket.on('user-stop-writing', data => {
      io.to(data.chat.name).emit('update-writing-user', {
        user: '',
        chat: data.chat.name,
      });
    });

    socket.on('new-message', async data => {
      io.to(data.chat.name).emit('update-chat', {
        user: data.user.name,
        message: data.message,
        date: date(),
      });

      await models.chat.findOneAndUpdate({
        name: data.chat.name
      }, {
        $push: {
          messages: {
            user: data.user.name,
            message: data.message,
            date: date(),
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