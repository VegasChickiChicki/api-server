const express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');

const app = express();

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use('/api/user', routes.user.auth);
app.use('/api/user', routes.user.logout);
app.use('/api/user', routes.user.register);
app.use('/api/user', routes.user.user);
app.use('/api/user', routes.user.info);

app.use('/api/chat/messages', routes.chat.messages.list);
app.use('/api/chat/users', routes.chat.users.list);
app.use('/api/chat/options', routes.chat.options.list);
app.use('/api/chat/options', routes.chat.options.create);
app.use('/api/chat/options', routes.chat.options.find);
app.use('/api/chat/options', routes.chat.options.join);


app.get('/', (req, res) => {
  res.send('api-server is ready to work! version - 2.0.3')
});

module.exports = require('http').createServer(app);
