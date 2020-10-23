const mongoose = require('mongoose');
const schema = mongoose.Schema;

const messages = new schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
}, {
  versionKey: false,
  collation: 'chat'
});

module.exports = mongoose.model('messages', messages);