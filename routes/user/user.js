const express = require('express');
const router = express.Router();
const models = require('../../models/index');

router.get('/user', async (request, response) => {
  try {
    const token = request.header('Authorization');

    const user = await models.user.FindWithToken(token);

    await response.json({
      status: true,
      data: {
        user: user,
      }
    });
  } catch (error) {
    await response.json({
      status: false,
      error: {
        text: 'Authorization failed!',
        ErrorBody: error,
      }
    });
  }
});

module.exports = router;