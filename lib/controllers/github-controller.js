const { Router } = require('express');
const GithubService = require('../services/GithubService');
const SessionService = require('../services/SessionService');
const { GithubUser } = require('../models/GithubUser');
const jwt = require('jsonwebtoken');

const ONE_DAY_IN_MS = 3600 * 24 * 1000;

const router = Router();

router.get('/login', async (req, res) => {
  const sessionToken = req.cookies.session;
  if (!SessionService.isUserLoggedIn(sessionToken)) {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  } else {
    res.redirect('/');
  }
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
    const sessionToken = SessionService.issueSessionToken({ id: user.id, username: user.username });

    res.cookie(process.env.COOKIE_NAME, sessionToken, {
      httpOnly: true,
      maxAge: ONE_DAY_IN_MS
    });

    res.redirect('/');
  } catch (e) {
    next(e);
  }
});

// Since the cookie is httpOnly, we can't access it from client side javascript. There's nothing
// sensitive in there, so this route just exposes the session info for clients.
router.get('/session', (req, res) => {
  try {
    const cookie = req.cookies?.[process.env.COOKIE_NAME];
    const session = jwt.verify(cookie, process.env.JWT_SECRET);
    res.json(session);
  } catch (e) {
    // If we're here, there either isn't a cookie or it was invalid.
    // Clear the cookie if it exists and send back a null response.
    res.clearCookie(process.env.COOKIE_NAME, { httpOnly: true });
    res.json(null);
  }
});

router.delete('/', (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME, { httpOnly: true })
    .status(204)
    .send();
});

module.exports = router;
