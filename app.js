const express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('api-server is ready to work!')
});

module.exports = require('http').createServer(app);
