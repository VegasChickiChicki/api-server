const express = require('express');
const router = express.Router();
const models = require('../../models');

router.get('/info', async (request, response) => {
  await models.user.findOne({
    token: JSON.parse(request.query.user).token,
  }, { _id: 0 }).lean().exec((error, user) => {
    if (error){
      return response.json({
        status: false,
        error: {
          text: 'Failed get user info!',
          ErrorBody: error,
        }
      });
    } else {
      return response.json({
        status: true,
        body: {
          user: user
        },
      });
    }
  });
});

module.exports = router;