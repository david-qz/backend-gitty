const { Router } = require('express');
const jsonwebtoken = require('jsonwebtoken');
const GithubService = require('../services/GithubService');
const { GithubUser } = require('../models/GithubUser');

const ONE_DAY_IN_MS = 3600 * 24 * 1000;

const router = Router();

router.get('/login', async (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
  );
});

router.get('/callback', async (req, res, next) => {
  try {
    // Get the user's GitHub profile
    const { code } = req.query;
    const token = await GithubService.exchangeCodeForToken(code);
    const githubProfile = await GithubService.getGithubProfile(token);

    // Use the GitHub profile to get user info from our database.
    let user = await GithubUser.getByUsername(githubProfile.login);

    // If they aren't in our database, sign them up with a new profile.
    if (!user) {
      user = await GithubUser.insert({
        username: githubProfile.login,
        email: githubProfile.email,
        avatar: githubProfile.avatar_url
      });
    }

    // Issue a jwt and redirect
    const jwt = jsonwebtoken.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });

    res.cookie(process.env.COOKIE_NAME, jwt, {
      httpOnly: true,
      maxAge: ONE_DAY_IN_MS
    });

    res.redirect('/api/v1/posts');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
