const express = require('express');
const router = express.Router();
const models = require('../../../models');

router.get('/list', async (request, response) => {
  await models.chat.find({
    name: request.query.ChatName,
  }).lean().exec((error, messages) => {
    if (error){
      return response.json({
        status: false,
        error: {
          text: 'Failed get chats list!',
          ErrorBody: error,
        }
      });
    } else {
      return response.json({
        status: true,
        body: messages,
      });
    }
  });
});

module.exports = router;