// Build a server with Node's HTTP module
const express = require('express');
const BodyParser = require('body-parser');

const app = express();


app.use(BodyParser.urlencoded({
  extended: true,
}));

app.use(BodyParser.json());


app.get('/', (req, res) => res.send('Hello World'));

app.listen(8080, () => console.log('Example app listening on port 8080'));


app.post('/', (request, response) => {
  console.clear();
  console.log(request.body);

  response.json({status: true});

  next();
});