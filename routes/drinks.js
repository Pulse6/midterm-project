/**
 * The following route gets all values from the drinks table in POSTGRES-SQL and returns them as a JSON when the user
 * navigates to /api/drinks.
**/

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM drinks`;
    // console.log(query);
    db.query(query)
      .then(data => {
        const drinks = data.rows;
        res.json({ drinks });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
