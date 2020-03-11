/**
 * The following route gets all values from the orders table given a user ID in POSTGRES-SQL and returns them as a
 * JSON when the user navigates to /api/order.
**/

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM order WHERE user_id = users(id)`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
