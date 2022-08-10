class GithubService {
  static async exchangeCodeForToken(code) {
    const clientId = process.env.GH_CLIENT_ID;
    const clientSecret = process.env.GH_CLIENT_SECRET;

    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    return await res.json();
  }

  static async getGithubProfile(token) {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token.access_token}`
      }
    });

    return await res.json();
  }
}

module.exports = GithubService;
