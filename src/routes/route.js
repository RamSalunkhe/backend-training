const express = require('express');
const router = express.Router();
const moment = require('moment');

const UserController= require("../controllers/userController")
const ProductController= require("../controllers/productController")
const OrderController = require("../controllers/orderController")
const Middleware = require ("../middlewares/commonMiddlewares")


const middle = function(req,res,next) {
    const time = moment().format("YYYY-MM-DD hh:mm")
    const ip = req.socket.localAddress
    const path = req.route.path
    console.log("You are in middleware");
    console.log(time,ip,path);
    next()
}

router.get("/test-me",middle, function (req, res) {
    res.send("My first ever api!")
})

router.post("/createProduct", ProductController.createProduct)
router.post("/createUser", Middleware.validate , UserController.createUser)
router.post("/createOrder", Middleware.validate , OrderController.createOrder)




module.exports = router;