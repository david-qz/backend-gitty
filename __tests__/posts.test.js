const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

// The mocked authorize middleware will make use appear as user bob to all protected routes.
jest.mock('../lib/middleware/authorize');

describe('gitty posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /api/v1/posts should return a list of posts', async () => {
    const res = await request(app).get('/api/v1/posts');
    expect(res.status).toEqual(200);

    const posts = res.body;

    expect(posts).toBeInstanceOf(Array);
    expect(posts[0]).toEqual({
      id: expect.any(String),
      author: {
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        avatar: expect.any(String)
      },
      content: expect.any(String)
    });
  });

  it('POST /api/v1/posts should make a new post', async () => {
    const res = await request(app).post('/api/v1/posts').send({ content: 'test post' });
    expect(res.status).toEqual(200);

    const post = res.body;

    expect(post).toEqual({
      id: expect.any(String),
      content: 'test post',
      author: {
        id: 1,
        username: 'bob',
        email: 'bob@example.com',
        avatar: 'bobs-avatar.png'
      }
    });
  });

  afterAll(() => {
    pool.end();
  });
});
