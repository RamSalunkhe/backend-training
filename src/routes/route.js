const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const Auth = require("../middleware/auth");

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", UserController.createUser)
router.post("/login", UserController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", Auth.auth,UserController.getUserData)
router.put("/users/:userId", Auth.auth,UserController.updateUser)
router.put("/deleteUser/:userId",Auth.auth,UserController.deleteUser)

module.exports = router;