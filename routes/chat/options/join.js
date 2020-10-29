const express = require('express');
const router = express.Router();
const models = require('../../../models');

router.post('/join', async (request, response) => {
  models.chat.findOneAndUpdate({
    name: request.body.data.chat.name
  }, {
    $addToSet: {
      users: {
        name: request.body.data.user.name,
      }
    }
  }, {
    new: true,
  }, (error, chat) => {
    if (!error){
      response.json({
        status: true,
        body: {
          chat
        },
      });

      //console.log('Chat update! chat: ', chat);
    } else {
      //console.log('error: ', error);
    }
  });
});

module.exports = router;