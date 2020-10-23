const UserAuth = require('./user/auth');
const UserRegister = require('./user/register');
const UserGetUser = require('./user/user');
const UserLogout = require('./user/logout');

const MessagesList = require('./chat/messages/list');
const UsersList = require('./chat/users/list');
const CreateChat = require('./chat/options/create');

module.exports = {
  user: {
    auth: UserAuth,
    logout: UserRegister,
    register: UserGetUser,
    user: UserLogout,
  },
  chat: {
    messages: {
      list: MessagesList
    },
    users: {
      list: UsersList,
    },
    options: {
      create: CreateChat,
    }
  }
};