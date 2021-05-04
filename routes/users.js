var express = require("express");
var router = express.Router();

const controller = require("../controllers/users");

router
  .route("/users")
  .get(controller.getUsers) // get all users
  .post(controller.createUser); // create user

router
  .route("/users/:id")
  .get(controller.getUserById) // get user by ID
  .put(controller.updateUser) // update user
  .delete(controller.deleteUser); // delete user

module.exports = router;
