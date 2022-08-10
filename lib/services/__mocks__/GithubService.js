class GithubService {
  static async exchangeCodeForToken(code) {
    return {
      access_token: `some_token_for_code_${code}`,
      token_type: 'bearer',
      scope: 'user'
    };
  }

  // eslint-disable-next-line no-unused-vars
  static async getGithubProfile(token) {
    return {
      login: 'nicholas_cage_dev',
      email: 'dev@niccage.com',
      avatar_url: 'https://www.placecage.com/gif/200/300'
    };
  }
}

module.exports = GithubService;
