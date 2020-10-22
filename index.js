const config = require('./config');
const app = require('./app');
const database = require('./database');
const io = require('socket.io')(app);
const colors = require('colors');

const date = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].map((x) => x < 10 ? "0" + x : x).join(":");

database().then(info => {
  app.listen(config.port, () => {
    console.log(`Database load status - true`.yellow);
    console.log(`Server started on port: ${config.port}`.yellow);
  });

  io.on('connection', socket => {
    console.log('Socket connected'.magenta);

    //io.emit('user-connect', user);

    socket.on('connect-user', data => {
      console.log(`User ${data.user} connect`);
      io.emit('update-chat', {
        user: data.user,
        message: `Logged in to the chat`,
        date: date
      });
    });

    socket.on('disconnect-user', data => {
      console.log(`User ${data.user} disconnect`);
      io.emit('update-chat', {
        user: data.user,
        message: `Logged out of the chat`,
        date: date
      });
    });

    socket.on('new-message', data => {
      console.log(`new-message: ${data.message}`);
      io.emit('update-chat', {
        user: data.user,
        message: data.message,
        date: date,
      });
    });
  });
}).catch(error => {
  console.log(`Database load status - error`.red);
  console.log(`Database error: `.red);
  console.log(error.red);
});



