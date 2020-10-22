const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const schema = mongoose.Schema;

const UniqueValidator = require('mongoose-unique-validator');

mongoose.plugin(UniqueValidator);

const user = new schema({
  login: {
    type: String,
    required: true,
    unique: true,
    minLength: 5
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({
          error: 'Invalid Email address'
        })
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  token: {
    type: String,
  }
});

user.set('toJSON', {
  virtuals: true
});

user.pre('save', async function(next) {
  const user = this;

  console.log('user object: ', user);

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

user.methods.GenerateAuthToken = async function() {
  const user = this;

  const token = jwt.sign({
    id: user.id
  }, 'nuxt-chat-legendary-secret-key');

  user.token = token;

  await user.save();

  return token;
};

user.statics.FindWithEmail = async function (email)  {
  const user = this;

  return user.findOne({
    email: email
  });
};

user.statics.FindWithLogin = async function (login)  {
  const user = this;

  return user.findOne({
    login: login
  });
};

user.statics.FindWithToken = async function (token)  {
  const user = this;

  return user.findOne({
    token: token
  });
};

user.statics.LoginUser = async function (data)  {
  const user = this;

  let FoundUser = false;

  await user.findOne({
    email: data.login,
  }).then(response => {
    if (response){
      FoundUser = response;
    }
  });

  await user.findOne({
    login: data.login,
  }).then(response => {
    if (response){
      FoundUser = response;
    }
  });

  console.log('FoundUser: ', FoundUser);

  if (!FoundUser) {
    return false
  }

  const IsPasswordMatch = await bcrypt.compare(data.password, FoundUser.password);

  if (!IsPasswordMatch) {
    return false;
  }

  return FoundUser;
};

user.statics.LogoutUser = async function (id)  {
  const user = this;

  let FoundUser = false;

  await user.findOne({
    id: id,
  }).then(response => {
    if (response){
      FoundUser = response;
    }
  });

  return FoundUser;
};



module.exports = mongoose.model('user', user);