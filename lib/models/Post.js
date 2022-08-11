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

  static async insert({ authorId, content }) {
    const { rows } = await pool.query(
      `
        with new_post as (
          insert into posts (author_id, content)
          values ($1, $2)
          returning *
        )
        select new_post.id, new_post.content, to_json(gu) as author from new_post
        left join github_users gu on new_post.author_id = gu.id;
      `,
      [authorId, content]
    );
    return new Post(rows[0]);
  }
}

module.exports.Post = Post;
