const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chat = new schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [{
    name: {
      type: String,
      required: true,
    },
    _id: false
  }],
  messages: [{
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
  }]
}, {
  versionKey: false,
  collation: 'chat'
});

module.exports = mongoose.model('chat', chat);