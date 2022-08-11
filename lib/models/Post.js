const pool = require('../utils/pool');
const { GithubUser } = require('./GithubUser');

class Post {
  id;
  author;
  content;

  constructor(row) {
    this.id = row.id;
    this.author = row.author ? new GithubUser(row.author) : null;
    this.content = row.content;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      select posts.id, posts.content, to_json(gu) as author from posts
      left join github_users gu on posts.author_id = gu.id;
      `
    );
    return rows.map(row => new Post(row));
  }
}

module.exports.Post = Post;
