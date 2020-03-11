/**
 * The following route gets all values from the menu table in POSTGRES-SQL and returns them as a JSON when the user
 * navigates to /api/menu.
**/

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM menu`;
    console.log(query);
    db.query(query)
      .then(data => {
        const menu = data.rows;
        res.json({ menu });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
