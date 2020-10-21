const express = require('express');
const router = express.Router();
const models = require('../../models/index');
const { body, validationResult } = require('express-validator');

router.post('/register', [
  body('data.email').notEmpty().withMessage({
    text: 'Поле "Email" является обязательным',
    type: 'email',
  }).isEmail().withMessage({
    text: 'Поле "Email" заполнено неверно',
    type: 'email',
  }).custom(async email => {
    return !await models.user.FindWithEmail(email) ? true : Promise.reject({
      text: 'Почта уже занята',
      type: 'email',
    })
  }),
  body('data.login').notEmpty().withMessage({
    text: 'Поле "Login" является обязательным',
    type: 'login',
  }).isLength({ min: 4 }).withMessage({
    text: 'Поле "Login" должно имень больше 3 символов',
    type: 'login',
  }).custom(async login => {
    return !await models.user.FindWithLogin(login) ? true : Promise.reject({
      text: 'Логин уже занят',
      type: 'login',
    })
  }),
  body('data.password').notEmpty().withMessage({
    text: 'Поле "Password" является обязательным',
    type: 'password',
  }).isLength({ min: 6 }).withMessage({
    text: 'Поле "Password" должно имень больше 5 символов',
    type: 'password',
  }),
], async (request, response) => {
  const errors = validationResult.withDefaults({
    formatter: error => {
      return error.msg
    }
  });

  if (!errors(request).isEmpty()) {
    return await response.json({
      status: false,
      errors: errors(request).array({
        onlyFirstError: true
      }),
    });
  } else {
    try {
      const user = new models.user({
        email: request.body.data.email,
        login: request.body.data.login,
        password: request.body.data.password,
      });

      await user.GenerateAuthToken();
      await user.save();

      await response.json({
        status: true,
        body: {
          user: user,
        }
      });
    } catch (error) {
      await response.json({
        status: false,
        errors: [{
          text: 'Register error!',
          type: 'database',
          ErrorBody: error,
        }]
      });
    }
  }
});

module.exports = router;