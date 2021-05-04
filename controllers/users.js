const db = require("../config/db");

const getUsers = (req, res) => {
  db.query("SELECT * FROM users ORDER BY id ASC", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send(data.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  db.query("SELECT * FROM users WHERE id = $1", [id], (err, data) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send(data.rows);
  });
};

const createUser = (req, res) => {
  const { name, email } = req.body;

  //   check if user exists
  db.query(
    "SELECT * FROM users WHERE name = $1 AND email = $2",
    [name, email],
    (err, user) => {
      if (err) {
        console.log(err);
      }

      if (user.length > 0) {
        res.status(205).send(`User already exists`);
      } else {
        //   if user doesn't exist, create user
        db.query(
          "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id",
          [name, email],
          (err, data) => {
            if (err) {
              console.log(err);
            }

            res.status(201).send(`User with ID:${data.rows[0].id} added`);
          }
        );
      }
    }
  );
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  db.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (err, data) => {
      if (err) {
        console.log(err);
      }

      res.status(200).send(`User with ID:${id} modified`);
    }
  );
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  db.query("DELETE FROM users WHERE id = $1", [id], (err, data) => {
    if (err) {
      console.log(err);
    }

    res.status(200).send(`User with ID:${id} deleted`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
