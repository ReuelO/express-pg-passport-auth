module.exports = function (app, passport) {
  app.get("/register", function (req, res) {
    res.render("./register", {
      title: "App",
      heading: "Sign Up",
      message: req.flash("error"),
    });
  });

  // Register
  app.post(
    "/register",
    passport.authenticate("local-signup", {
      // successRedirect: "/login", // redirect to the secure profile section
      failureRedirect: "/register", // redirect back to the signup page if there is an err
      failureFlash: true, // allow flash messages
    }),
    function (req, res) {
      console.log("User " + req.user.id + " registered!");

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3 * 12;
      } else {
        req.session.cookie.expires = false;
      }

      // if user is registered
      res.redirect("/login");
    }
  );
};
