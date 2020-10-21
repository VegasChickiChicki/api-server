const auth = require('./user/auth');
const register = require('./user/register');
const user = require('./user/user');
const logout = require('./user/logout');

module.exports = {
  user: {
    auth: auth,
    logout: logout,
    register: register,
    user: user,
  }
};