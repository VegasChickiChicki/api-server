const express = require('express');
const router = express.Router();
const models = require('../../../models');

router.get('/find', async (request, response) => {
  await models.chat.find({
    name: new RegExp(JSON.parse(request.query.chat).name),
  }).lean().exec((error, chats) => {
    if (error){
      return response.json({
        status: false,
        error: {
          text: 'Failed find chat!',
          ErrorBody: error,
        }
      });
    } else {
      return response.json({
        status: true,
        body: {
          chats: chats
        },
      });
    }
  });
});

module.exports = router;