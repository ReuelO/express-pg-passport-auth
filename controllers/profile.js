const db = require("../config/db");
const bcrypt = require("bcrypt");

const getProfileById = (req, res) => {
  const id = parseInt(req.params.id);

  db.query("SELECT * FROM users WHERE id = $1", [id], (err, data) => {
    if (err) {
      console.log(err);
    }

    res.status(200).send(data.rows);
  });
};

const updateProfile = (req, res) => {
  const id = parseInt(req.params.id);
  const { username, password } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, null, null);

  db.query(
    "UPDATE users SET username = $1, password = $2 WHERE id = $3",
    [username, encryptedPassword, id],
    (err, data) => {
      if (err) {
        console.log(err);
      }

      res.status(200).send(`Profile with ID:${id} modified`);
    }
  );
};

module.exports = {
  getProfileById,
  updateProfile,
};
