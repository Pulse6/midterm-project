const runTwilio = require('./api/twilio');

/* ————————————————————————— REQUIREMENTS ————————————————————————— */

// LOAD DATA FROM .env INTO process.env \\
require('dotenv').config();

// WEB SERVER CONFIGURATION \\
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";

// NODE MODULE DEPENDENCIES \\
const express       = require('express');
const app           = express();
const server        = require('http').Server(app);
const sass          = require('node-sass-middleware');
const morgan        = require('morgan');
const uuidv5        = require('uuid/v5');
const bodyParser    = require('body-parser');
const cookieSession = require('cookie-session');
const io = require('socket.io')(server);
const cors = require('cors');
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:8080");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

// POSTGRES-SQL DATABASE CLIENT/CONNECTION SETUP \\
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

/* ————————————————————————— MIDDLEWARE ————————————————————————— */

// MORGAN (HTTP REQUEST LOGGER) \\
/**
 * Load the logger first so all (static) HTTP requests are logged to STDOUT.
 * 'dev' = Concise output colored by response status for development use.
 * The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
**/
app.use(morgan('dev'));

// EJS (TEMPLATING ENGINE) \\
app.set("view engine", "ejs");

// REQ(UEST)/RES(PONSE) BODY PARSER \\
app.use(bodyParser.urlencoded({ extended: true }));

// COOKIE SESSION \\
app.use(cookieSession({
  name: 'session',
  keys: ['123']
}));

// CORS MIDDLEWARE FOR WEBSOCKET CONNECTIONS \\
app.use(allowCrossDomain);
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

// NODE-SASS (.scss COMPILER) \\
app.use("/styles", sass({
  src: __dirname + "/scss",
  dest: __dirname + "/public/css",
  debug: true,
  outputStyle: 'expanded'
}));

// SERVE ALL ASSETS OUT OF THE PUBLIC FOLDER \\
app.use(express.static("public"));

/* - - - - - - - - - - - - - - SOCKET.IO DATA HANDLING - - - - - - - - - - - - - - */

let users = [];
let connections = [];

// Upon Connection
io.sockets.on('connection', socket => {
  connections.push(socket);
  console.log('Connected: %s sockets connected!', connections.length);

  // Disconnect
  socket.on('disconnect', data => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected!', connections.length);
  });

  // Send Message
  socket.on('send message', data => {
    console.log(data);
    io.sockets.emit('new message', { msg: data, user: socket.username });
  });

  // New User
  socket.on('new user', (data, callback) => {
    callback(true);
    socket.username = data;
    users.push(socket.username);
  });
})

/* ————————————————————————— ROUTES / MOUNTING ————————————————————————— */

/**
 * Separated routes for each resource.
 * NOTE: Feel free to replace the example routes below with your own.
**/

const usersRoutes = require("./routes/users");
const menuRoutes = require("./routes/menu");
const drinksRoutes = require("./routes/drinks");
const orderRoutes = require("./routes/order");

/**
 * Mount all resource routes (i.e., the routes above).
 * NOTE: Feel free to replace the example mounts below with your own.
 * NOTE: Mount other resources here, using the same pattern above.
**/

app.use("/api/users", usersRoutes(db));
app.use("/api/menu", menuRoutes(db));
app.use("/api/drinks", drinksRoutes(db));
app.use("/api/order", orderRoutes(db));

/* ————————————————————————— HELPER FUNCTIONS ————————————————————————— */

const generateRandomString = function() {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

const updateOrderTable = function(currentOrder) {
  let queryString = `INSERT INTO orders (owner_id, item_name, item_price,item_quantity, item_img)
  VALUES
  `;

  for (let i = 0; i < currentOrder['itemsInTheOrder'].length; i++) {
    if (currentOrder['itemsInTheOrder'].length - 1 === i) {
      queryString +=
      `
      ('${currentOrder.owner_id}',
      '${currentOrder['itemsInTheOrder'][i].name}',
      ${currentOrder['itemsInTheOrder'][i].price * 100},
      ${currentOrder['itemsInTheOrder'][i].quantity},
      '${currentOrder['itemsInTheOrder'][i].storagePic}')
      `;
    } else {
      queryString +=
      `
      ('${currentOrder.owner_id}',
      '${currentOrder['itemsInTheOrder'][i].name}',
      ${currentOrder['itemsInTheOrder'][i].price * 100},
      ${currentOrder['itemsInTheOrder'][i].quantity},
      '${currentOrder['itemsInTheOrder'][i].storagePic}'),
      `;
    }
  }

  queryString +=
    `
    RETURNING *;
    `;

  return db.query(queryString)
    .then(res => res.rows);
};

/* ————————————————————————— ROUTING ————————————————————————— */

/**
 *  Warning: avoid creating more routes in this file!
 * Separate them into separate routes files (see above).'
**/

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/order", (req, res) => {
  res.render("order.ejs");
})

app.post("/api/order", (req, res) => {
  const ID = generateRandomString()
  const UUID = uuidv5(ID, uuidv5.URL);

  req.session.userID = UUID;
  const currentOrder = req.body.order;

  updateOrderTable({owner_id: req.session.userID, itemsInTheOrder: currentOrder})
    .then(cartOrder => {
      runTwilio(cartOrder);
      res.send(cartOrder);
    })
    .catch(e => {
        console.error(e);
        res.send(e);
      });

})

/* ————————————————————————— SERVER LISTEN ————————————————————————— */
app.listen(PORT, () => {
  console.log(`The Second Breakfast Club listening on port ${PORT}`);
});
