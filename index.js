const config = require('./config');
const app = require('./app');
const database = require('./database');
const io = require('socket.io')(app);
const colors = require('colors');


database().then(info => {
  app.listen(config.port, () => {
    console.log(`Database load status - true`.yellow);
    console.log(`Server started on port: ${config.port}`.yellow);
  });

  io.on('connection', socket => {
    console.log('Socket connected'.magenta);

    //io.emit('user-connect', user);

    socket.on('connect-user', UserName => {
      console.log(`User ${UserName} connect`);
      io.emit('update-chat', `User ${UserName} logged in to the chat`);
    });

    socket.on('disconnect-user', UserName => {
      console.log(`User ${UserName} disconnect`);
      io.emit('update-chat', `User ${UserName} logged out of the chat`);
    });

    socket.on('new-message', message => {
      console.log(`new-message: ${message}`);
      io.emit('update-chat', message);
    });
  });
}).catch(error => {
  console.log(`Database load status - error`.red);
  console.log(`Database error: `.red);
  console.log(error.red);
});



