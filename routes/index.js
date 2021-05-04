module.exports = function (app, passport) {
  app.get("/", function (req, res) {
    res.render("index", {
      title: "App",
      heading: "Home",
      message: req.flash("success", "Welcome"),
    });
  });

  require("./register")(app, passport);

  require("./login")(app, passport);
};
