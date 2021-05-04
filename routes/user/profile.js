var express = require("express");
var router = express.Router();

const controller = require("../../controllers/profile");

router
  .route("/profile/:id")
  .get(controller.getProfileById) // get Profile by ID
  .put(controller.updateProfile); // update Profile

module.exports = router;
