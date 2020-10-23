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

app.use('/api/chat/messages', routes.chat.messages.list);
app.use('/api/chat/users', routes.chat.users.list);
app.use('/api/chat/options', routes.chat.options.create);


app.get('/', (req, res) => {
  res.send('api-server is ready to work! version - 1.4.0')
});

module.exports = require('http').createServer(app);
