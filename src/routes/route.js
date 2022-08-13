const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
////////////// BOOK MODEL ///////////////////////////////
const BookController = require("../controllers/bookController");

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser)
router.get("/getUsersData", UserController.getUsersData)

////////////////// Book Model ////////////////////////

router.post("/createBook",BookController.createBook);
router.get("/getBookData",BookController.getBookData);

module.exports = router;