const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const db = require("./db");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });

  passport.use(
    "local-signup",
    new LocalStrategy((username, password, done) => {
      db.query("SELECT * FROM users WHERE username = $1", username)
        .then((data) => {
          // if user exists
          if (data.length > 0) {
            return done(
              null,
              false,
              req.flash("error", `User '${data[0].username}' already exists.`)
            );
            // if user doesn't exist, register user
          } else {
            const post = {
              username: username,
              password: bcrypt.hashSync(password, 10),
              created: new Date(),
            };

            db.one(
              "INSERT INTO users(username, password, created) VALUES ($1, $2, $3) RETURNING *",
              [post.username, post.password, post.created]
            )
              .then((req, data) => {
                return done(
                  null,
                  post,
                  req.flash("error", `User '${data.username}' registered.`)
                );
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
  );

  passport.use(
    "local-login",
    new LocalStrategy((username, password, done) => {
      db.query("SELECT * FROM users WHERE username = $1", username)
        .then((data) => {
          // if user doesn't exist
          if (data.length === 0) {
            return done(
              null,
              false,
              req.flash("error", `User '${username}' is not registered.`)
            );
            // if user exists
          } else {
            const hash = data[0].password;
            // match stored hash against input password
            bcrypt
              .compare(password, hash)
              .then((isMatch) => {
                // if password is incorrect
                if (!isMatch) {
                  return done(
                    null,
                    false,
                    req.flash("error", `Password '${password}' is incorrect.`)
                  );
                  // if password is correct, log in user
                } else {
                  return done(
                    null,
                    data,
                    req.flash(
                      "success",
                      `User '${data[0].username}' logged in.`
                    )
                  );
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
  );
};
