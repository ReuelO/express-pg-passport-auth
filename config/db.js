const { Pool } = require("pg");

if (process.env.NODE_ENV === "production") {
  var connectionString = {
    host: "localhost", // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: "api",
    user: "postgres",
    password: "reuenga7",
  };
  // var connectionString = "postgresql://postgres:7005@localhost:5432/api";
} else if (process.env.NODE_ENV === "production") {
  var connectionString = DATABASE_URL;
}

const pool = new Pool({
  connectionString,
  // max: 20,
});

// create tables: users, session
const init =
  "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, username VARCHAR UNIQUE, password VARCHAR, created TIMESTAMP); CREATE TABLE IF NOT EXISTS session(session_id VARCHAR, session_data VARCHAR, expire TIMESTAMP);";

pool
  .query(init)
  .then((data) => console.log(data.rows[0]))
  .catch((err) => console.error("Error executing query", err.stack));

pool.connect();

module.exports = pool;
