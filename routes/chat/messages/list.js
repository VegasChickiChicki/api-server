const express = require('express');
const router = express.Router();
const models = require('../../../models');

router.get('/list', async (request, response) => {
  console.log('request.query.ChatName:', request.query.ChatName);

  await models.chat.findOne({
    name: request.query.ChatName,
  }, { messages: 1 }).lean().exec((error, messages) => {
    if (error){
      return response.json({
        status: false,
        error: {
          text: 'Failed get chats list!',
          ErrorBody: error,
        }
      });
    } else {
      console.log('messages:', messages);
      return response.json({
        status: true,
        body: messages,
      });
    }
  });
});

module.exports = router;