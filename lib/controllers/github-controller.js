const { Router } = require('express');

const router = Router();

router.get('/login', async (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
  );
});

module.exports = router;
