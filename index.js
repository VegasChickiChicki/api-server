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

    socket.on('NewMessage', msg => {
      io.emit('update-chat', msg);
    });
  });
}).catch(error => {
  console.log(`Database load status - error`.red);
  console.log(`Database error: `.red);
  console.log(error.red);
});



