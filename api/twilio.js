/*
 * Basic Twilio Setup
**/

// LOAD DATA FROM .env INTO process.env \\
require('dotenv').config();

// SEND TEXTS ON FUNCTION CALL \\
function runTwilio() {
  const accountSid = process.env.TWILIO_ACC_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  /* Text to Client */
  client.messages
    .create({
      body: 'Your order is being prepared!',
      from: process.env.TWILIO_NUMBER,
      to: process.env.CLIENT_NUMBER
    })
    .then(message => console.log(message.sid));

  /* Text to Restaurant */
  client.messages
    .create({
      body: 'You have an order to prepare!',
      from: process.env.TWILIO_NUMBER,
      to: process.env.RESTAURANT_NUMBER
    })
    .then(message => console.log(message.sid));
}

module.exports = runTwilio;
