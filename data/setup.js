/* eslint-disable no-console */
const fs = require('fs').promises;

const setupFilename = process.env.NODE_ENV === 'test' ? 'setup.test.sql' : 'setup.sql';

module.exports = (pool) => {
  return fs
    .readFile(`${__dirname}/../sql/${setupFilename}`, { encoding: 'utf-8' })
    .then((sql) => pool.query(sql))
    .then(() => {
      if (process.env.NODE_ENV !== 'test') {
        console.log('✅ Database setup complete!');
      }
    })
    .catch((error) => {
      const dbNotFound = error.message.match(/database "(.+)" does not exist/i);

      if (dbNotFound) {
        const [err, db] = dbNotFound;
        console.error('❌ Error: ' + err);
        console.info(
          `Try running \`createdb -U postgres ${db}\` in your terminal`
        );
      } else {
        console.error(error);
        console.error('❌ Error: ' + error.message);
      }
    });
};
