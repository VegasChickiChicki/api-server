const express = require('express');
const router = express.Router();
const models = require('../../../models');

router.get('/list', async (request, response) => {
  await models.chat.find({
    'users.name': JSON.parse(request.query.user).name,
  }, { name: 1, users: 1, _id: 0 }).lean().exec((error, chats) => {
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
        body: {
          chats: chats
        },
      });
    }
  });
});

module.exports = router;