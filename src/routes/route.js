const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middle = require("../middleware/auth");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.post("/users", userController.createUser);
router.post("/login", userController.loginUser);

//The userId is sent by front end
router.get(
  "/users/:userId",
  middle.authenticate,
  middle.authorise,
  userController.getUserData
);
router.post(
  "/users/:userId/posts",
  middle.authenticate,
  middle.authorise,
  userController.postMessage
);
router.put(
  "/users/:userId",
  middle.authenticate,
  middle.authorise,
  userController.updateUser
);
router.put(
  "/deleteUser/:userId",
  middle.authenticate,
  middle.authorise,
  userController.deleteUser
);

module.exports = router;
