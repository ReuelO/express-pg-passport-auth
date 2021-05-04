module.exports = function (app, passport) {
  app.get("/login", function (req, res) {
    res.render("./login", {
      title: "App",
      heading: "Sign In",
      message: req.flash("error"),
    });
  });

  // Login
  app.post(
    "/login",
    passport.authenticate("local-login", {
      //   successRedirect: "/dashboard", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the login page if there is an err
      failureFlash: true, // allow flash messages
    }),
    function (req, res) {
      console.log("User " + req.user.id + " logged in!");

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3 * 12;
      } else {
        req.session.cookie.expires = false;
      }

      // if user is logged in
      res.redirect("/dashboard/" + req.user.id);
    }
  );

  app.use("/dashboard", isLoggedIn, require("./user"));

  // route middleware to make sure
  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      return next();
    } else {
      // if they aren't redirect them to the home page
      res.redirect("/login");
      console.log("User is not authenticated");
    }
  }

  // Logout
  app.get("/logout", function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
      res.redirect("/login");
      console.log("User logged out!");
    });
  });
};
