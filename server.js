// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

const cookieSession = require('cookie-session');
const uuidv5 = require('uuid/v5');


app.set("view engine", "ejs");
app.use(cookieSession({
  name: 'session',
  keys: ['123']
}));

const generateRandomString = function() {/// pick 6 in total letter of number and return it to make a unique key
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();



// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/scss",
  dest: __dirname + "/public/css",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const orderRoutes = require("./routes/order");
const menuRoutes = require("./routes/menu");
const drinksRoutes = require("./routes/drinks");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/order", orderRoutes(db));
app.use("/api/menu", menuRoutes(db));
app.use("/api/drinks", drinksRoutes(db));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/order", (req, res) => {
  res.render("order.ejs");
})

const updateOrderTable = function(currentOrder) {
  console.log(currentOrder);

  let queryString = `INSERT INTO orders (owner_id, item_name, item_price,item_quantity)
  VALUES
  `;

  for (let i = 0; i < currentOrder['itemsInTheOrder'].length; i++) {
    if (currentOrder['itemsInTheOrder'].length - 1 === i) {
      queryString +=
      `
      ('${currentOrder.owner_id}',
      '${currentOrder['itemsInTheOrder'][i].name}',
      ${currentOrder['itemsInTheOrder'][i].price * 100},
      ${currentOrder['itemsInTheOrder'][i].quantity})
      `;

    console.log(queryString);

    } else {
      queryString +=
      `
      ('${currentOrder.owner_id}',
      '${currentOrder['itemsInTheOrder'][i].name}',
      ${currentOrder['itemsInTheOrder'][i].price * 100},
      ${currentOrder['itemsInTheOrder'][i].quantity}),
      `;

      console.log(queryString);
    }

  }

  queryString +=
    `
    RETURNING *;
    `;

  return db.query(queryString)
    .then(res => res.rows[0]);
};

app.post("/api/order", (req, res) => {
  const id = generateRandomString()
  const urlUUID = uuidv5(id, uuidv5.URL);
  req.session.userID = urlUUID;

  const currentOrder = req.body.order;
  console.log(Array.isArray(currentOrder));
  console.log(typeof currentOrder)


  updateOrderTable(
    {
      owner_id: req.session.userID,
      itemsInTheOrder: currentOrder
    }
  )
  .then(cartOrder => {
    res.send(cartOrder);
    // res.redirect('/order');
  })
  .catch(e => {
      console.error(e);
      res.send(e);
    });
})


/* TESTINGTESTINGTESTINGTESTINGTESTINGTESTINGTESTING

app.post('/order', (req, res) => {
  const userID = req.session.userID;
  const currentOrder = JSON.parse(localStorage.getItem('order'))
  database.updateOrderTable({currentOrder, owner_id: userID})
    .then(cartOrder => {
      res.send(cartOrder);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });

TESTINGTESTINGTESTINGTESTINGTESTINGTESTINGTESTINGTESTING */

app.listen(PORT, () => {
  console.log(`The Second Breakfast Club listening on port: ${PORT}`);
});
