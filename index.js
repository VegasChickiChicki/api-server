const config = require('./config');
const app = require('./app');
const database = require('./database');
const io = require('socket.io')(app);
const colors = require('colors');
const models = require('./models');

const date = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].map((x) => x < 10 ? "0" + x : x).join(":");

database().then(info => {
  app.listen(config.port, () => {
    console.log(`Database load status - true`.yellow);
    console.log(`Server started on port: ${config.port}`.yellow);
  });

  io.on('connection', socket => {
    console.log('Socket connected'.magenta);
    /*

    socket.on('connect-user', data => {
      console.log(`User ${data.user} connect`);

      models.chat.create({
        user: data.user,
        message: `Logged in to the chat`,
        date: date,
      });

      io.emit('update-chat', {
        user: data.user,
        message: `Logged in to the chat`,
        date: date
      });
    });

    socket.on('disconnect-user', data => {
      console.log(`User ${data.user} disconnect`);

      models.chat.create({
        user: data.user,
        message: `Logged out of the chat`,
        date: date,
      });

      io.emit('update-chat', {
        user: data.user,
        message: `Logged out of the chat`,
        date: date
      });
    });

    */

    socket.on('new-message', async data => {
      console.log(`new-message: ${data.message}`);

      io.emit('update-chat', {
        user: data.UserName,
        message: data.message,
        date: date,
      });

      /*

      models.chat.updateOne({ name: data.ChatName }, {
        $push: {
          messages: {
            user: data.UserName,
            message: data.message,
            date: date,
          }
        },
      });

      */

      console.log('doc name: ', data.ChatName.magenta);

      console.log('data: ', {
        user: data.UserName,
        message: data.message,
        date: date,
      });

      await models.chat.findOneAndUpdate({
        name: 'BlueSky'
      }, {
        $push: {
          messages: {
            user: data.UserName,
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
}).catch(error => {
  console.log(`Database load status - error`.red);
  console.log(`Database error: `.red);
  console.log(error.red);
});



