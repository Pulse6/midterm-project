const db = require('./server.js');

const getMenu = function() {
  let queryString = `SELECT * FROM users`;

  return db.query(queryString)
    .then(res => console.log(res.rows));
}
exports.getMenu = getMenu;

getMenu();
