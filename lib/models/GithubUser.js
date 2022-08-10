const pool = require('../utils/pool');

class GithubUser {
  id;
  username;
  email;
  avatar;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.avatar = row.avatar;
  }

  static async getByUsername(username) {
    const { rows } = await pool.query('select * from github_users where username = $1;', [username]);
    const row = rows[0];

    if (!rows[0]) return null;
    return new GithubUser(row);
  }

  static async insert({ username, email, avatar }) {
    const { rows } = await pool.query(
      `
        insert into github_users (username, email, avatar)
        values ($1, $2, $3)
        returning *;
      `,
      [username, email, avatar]
    );

    return new GithubUser(rows[0]);
  }
}

module.exports.GithubUser = GithubUser;
