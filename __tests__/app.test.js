const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const redirectLocationPattern = new RegExp(
  `https://github\\.com/login/oauth/authorize\\?client_id=\\w+&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`,
  'i'
);

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /api/v1/github/login should redirect to github oauth page', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.redirect).toEqual(true);
    expect(res.header.location).toMatch(redirectLocationPattern);
  });

  afterAll(() => {
    pool.end();
  });
});
