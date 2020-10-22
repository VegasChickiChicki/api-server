const config = require('./config');
const mongoose = require('mongoose');

const UniqueValidator = require('mongoose-unique-validator');

mongoose.plugin(UniqueValidator);

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;

    mongoose.set('debug', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

    mongoose.connection.on('error', error => {
      reject(error);
    }).on('close', () => {
      console.log('database connection closed');
    }).on('open', () => {
      resolve(mongoose.connections[0]);
    });

    mongoose.connect(`${config.MongoUrl}`,{  useNewUrlParser: true, useUnifiedTopology: true });
  })
};