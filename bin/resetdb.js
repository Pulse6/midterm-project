// LOAD DATA FROM .env INTO process.env \\
require('dotenv').config();

// NODE MODULE DEPENDENCIES \\
const fs = require('fs');
const chalk = require('chalk');
const Client = require('pg-native');

// POSTGRES-SQL DATABASE CLIENT/CONNECTION SETUP USING \\
const connectionString = process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const client = new Client();

// LOAD FILES FROM THE db FOLDER AND SYNC THEM WITH POSTGRES-SQL \\
/* Set up a function that loads and syncs each file from db/schema */
const runSchemaFiles = function() {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync('./db/schema');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    client.querySync(sql);
  }
};

/* Set up a function that loads and syncs each file from db/seeds */
const runSeedFiles = function() {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const schemaFilenames = fs.readdirSync('./db/seeds');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    client.querySync(sql);
  }
};

/* Run functions above and then end connection. */
try {
  console.log(`-> Connecting to PG using ${connectionString} ...`);
  client.connectSync(connectionString);
  runSchemaFiles();
  runSeedFiles();
  client.end();
} catch (err) {
  console.error(chalk.red(`Failed due to error: ${err}`));
  client.end();
}


