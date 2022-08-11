const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/GithubService');

describe('gitty oauth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /api/v1/github/login should redirect to github oauth page', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.redirect).toEqual(true);
    expect(res.header.location).toMatch(redirectLocationPattern);
  });

  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.redirects.length).toEqual(1);
    expect(res.redirects[0]).toMatch(/http:\/\/127.0.0.1:\d+\/api\/v1\/posts/i);
  });

  afterAll(() => {
    pool.end();
  });
});

const redirectLocationPattern = new RegExp(
  `https://github\\.com/login/oauth/authorize\\?client_id=\\w+&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`,
  'i'
);
