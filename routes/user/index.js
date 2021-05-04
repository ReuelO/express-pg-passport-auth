var express = require("express");
var router = express.Router();

const db = require("../../config/db");

router.get("/:userId", function (req, res) {
  var uId = req.params.userId;
  var sql = "SELECT * FROM users WHERE id = $1";
  db.query(sql, [uId], function (err, rows) {
    if (err) {
      console.log(err);
    }

    res.render("./user/dashboard", {
      title: "App",
      heading: "Dashboard",
      user: req.user,
      data: rows,
    });
  });
});

// user profile
require("./profile");

module.exports = router;
