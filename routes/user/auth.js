const express = require('express');
const router = express.Router();
const models = require('../../models/index');
const { body, validationResult } = require('express-validator');

router.post('/auth', [
  body('login').notEmpty().withMessage({
    text: 'Поле "Email/Login" является обязательным',
    type: 'email/login',
  }),
  body('password').notEmpty().withMessage({
    text: 'Поле "Password" является обязательным',
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
      const user = await models.user.LoginUser({
        login: request.body.login,
        password: request.body.password,
      });

      if (!user) {
        return response.json({
          status: false,
          errors: [{
            text: 'Неверные учетные данные для входа в систему',
            type: 'auth',
          }]
        })
      }

      await user.GenerateAuthToken();

      response.send({
        status: true,
        data: user
      });
    } catch (error) {
      await response.json({
        status: false,
        errors: [{
          text: 'Login failed! Check authentication credentials',
          type: 'database',
          ErrorBody: error,
        }]
      })
    }
  }
});

module.exports = router;