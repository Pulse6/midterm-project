/*
 * Basic Twilio Setup
**/

// LOAD DATA FROM .env INTO process.env \\
require('dotenv').config();

// SEND TEXTS ON FUNCTION CALL \\

const prettyString = (order) => {
  let startString = `You have to make `;

  for (const item of order) {
    const { item_name, item_quantity } = item;
    startString += `${item_quantity}:${item_name}. `;
  }

  return startString;
}


function runTwilio(orderBody) {
  const restaurantMessage = prettyString(orderBody);

  const accountSid = process.env.TWILIO_ACC_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  /* Text to Client */
  client.messages
    .create({
      body: "Your order is being prepared!.",
      from: process.env.TWILIO_NUMBER,
      to: process.env.CLIENT_NUMBER
    })
    .then(message => console.log(message.sid));

  /* Text to Restaurant */
  client.messages
    .create({
      body: `Ready-up! You have an order to prepare. ${restaurantMessage}`,
      from: process.env.TWILIO_NUMBER,
      to: process.env.RESTAURANT_NUMBER
    })
    .then(message => console.log(message.sid));
}

module.exports = runTwilio;
