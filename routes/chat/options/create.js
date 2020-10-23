const express = require('express');
const router = express.Router();
const models = require('../../../models');

router.post('/create', async (request, response) => {
  const chat = await models.chat.create({
    name: request.body.data.name,
    users: [{
      name: request.body.data.user.name
    }],
  });

  await response.json({
    status: true,
    data: chat
  });
});

module.exports = router;