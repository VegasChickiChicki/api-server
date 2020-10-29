const express = require('express');
const router = express.Router();
const models = require('../../../models');
const { body, validationResult } = require('express-validator');

router.post('/create', [
  body('data.chat.name').notEmpty().withMessage({
    text: 'Field "Chat name" is required',
    type: 'name',
  }).custom(async ChatName => {
    return !await models.chat.findOne({ name: ChatName }) ? true : Promise.reject({
      text: 'This chat already exists',
      type: 'name',
    })
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
    const chat = await models.chat.create({
      name: request.body.data.chat.name,
      users: [{
        name: request.body.data.user.name
      }],
    });

    await response.json({
      status: true,
      body: {
        chat: chat,
      }
    });
  }
});

module.exports = router;