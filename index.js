const express = require('express');
const BodyParser = require('body-parser');

const app = express();

app.use(BodyParser.urlencoded({
  extended: true,
}));

app.use(BodyParser.json());


app.get('/', (req, res) => res.send('api-server is ready to work!'));

app.listen(8080, () => console.log('Example app listening on port 8080'));


app.post('/', (request, response, next) => {
  console.clear();
  console.log(request.body);

  response.json({status: true});

  next();
});