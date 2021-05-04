const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// create tables: users, session
const init =
  "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, username VARCHAR UNIQUE, password VARCHAR, created TIMESTAMP); CREATE TABLE IF NOT EXISTS session(session_id VARCHAR, session_data VARCHAR, expire TIMESTAMP);";

client
  .query(init)
  .then((data) => console.log(data.rows[0]))
  .catch((err) => console.error("Error executing query", err.stack));

client.connect();

module.exports = client;
