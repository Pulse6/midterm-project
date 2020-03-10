/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/order", (req, res) => {
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



// /* router.post? */ app.post('/order', (req, res) => {
//   const userID = req.session.userID;
//   const currentOrder = JSON.parse(localStorage.getItem('order'))
//   database.updateOrderTable({currentOrder, owner_id: userID})
//     .then(cartOrder => {
//       res.send(cartOrder);
//     })
//     .catch(e => {
//       console.error(e);
//       res.send(e);
//     });
// });
