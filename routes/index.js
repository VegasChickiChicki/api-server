const UserAuth = require('./user/auth');
const UserRegister = require('./user/register');
const UserGetUser = require('./user/user');
const UserLogout = require('./user/logout');
const UserInfo = require('./user/info');

const ChatsList = require('./chat/options/list');
const MessagesList = require('./chat/messages/list');
const UsersList = require('./chat/users/list');
const CreateChat = require('./chat/options/create');
const FindChat = require('./chat/options/find');
const JoinChat = require('./chat/options/join');

module.exports = {
  user: {
    auth: UserAuth,
    logout: UserRegister,
    register: UserGetUser,
    user: UserLogout,
    info: UserInfo,
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
      list: ChatsList,
      find: FindChat,
      join: JoinChat,
    }
  }
};