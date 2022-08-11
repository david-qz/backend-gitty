const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { CookieAccessInfo } = require('cookiejar');

jest.mock('../lib/services/GithubService');

describe('gitty /api/v1/github OAuth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /login should redirect to github oauth page', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.redirect).toEqual(true);
    expect(res.header.location).toMatch(redirectLocationPattern);
  });

  it('GET /callback should login and redirect users to /api/v1/posts', async () => {
    const agent = request.agent(app);
    const res = await agent.get('/api/v1/github/callback?code=42').redirects(1);

    expect(res.redirects.length).toEqual(1);
    expect(res.redirects[0]).toMatch(/http:\/\/127.0.0.1:\d+\/api\/v1\/posts/i);

    const session = agent.jar.getCookie(process.env.COOKIE_NAME, CookieAccessInfo.All);
    expect(session).toMatchObject({
      name: process.env.COOKIE_NAME,
      value: expect.any(String)
    });
  });

  it('DELETE / should log a user out', async () => {
    // "Log in"
    const agent = request.agent(app);
    await agent.get('/api/v1/github/callback?code=42');

    let session = agent.jar.getCookie(process.env.COOKIE_NAME, CookieAccessInfo.All);
    expect(session).toBeTruthy();

    const res = await agent.delete('/api/v1/github');
    expect(res.status).toEqual(204);

    session = agent.jar.getCookie(process.env.COOKIE_NAME, CookieAccessInfo.All);
    expect(session).toBeUndefined();
  });

  afterAll(() => {
    pool.end();
  });
});

const redirectLocationPattern = new RegExp(
  `https://github\\.com/login/oauth/authorize\\?client_id=\\w+&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`,
  'i'
);
