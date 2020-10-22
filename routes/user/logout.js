const express = require('express');
const router = express.Router();
const models = require('../../models/index');

router.post('/logout', async (request, response) => {
  try {
    const user = await models.user.LogoutUser(request.body.id);

    if (!user){
      return response.json({
        status: false,
        errors: [{
          text: 'Невозможно разлогинить пользователя, пользователь с таким айди не найден',
        }]
      })
    }

    user.token = null;
    user.save();

    response.send({
      status: true
    });
  } catch (error) {
    await response.json({
      status: false,
      errors: [{
        text: 'Logout failed! Check authentication credentials',
        type: 'database',
        ErrorBody: error,
      }]
    })
  }
});

module.exports = router;