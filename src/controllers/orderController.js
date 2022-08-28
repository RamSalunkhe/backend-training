const ProductModel = require('../models/productModel')
const UserModel = require("../models/userModel")
const OrderModel = require("../models/orderModel")

const createOrder = async function (req,res){
    const order = req.body;
    const uid = order.userId
    const pid = order.productId

    const isValidUser = await UserModel.findById(uid)
    const isValidProduct = await ProductModel.findById(pid)

    if(!isValidUser && !isValidProduct){
        res.send("userId and productId must be present")
    }
    if(!isValidUser){ res.send("please, Enter Valid user id")}

    if(!isValidProduct){ res.send("please, Enter Valid prodcut id")}

    const isFreeAppUser = req.isAppFree

    if(isFreeAppUser == true){
        order.amount = 0;
        order.isFreeAppUser = isFreeAppUser;
        const saveOrder = await OrderModel.create(order)
        return res.send({order : saveOrder})
    }
    else if(isFreeAppUser == false){
        const user = await UserModel.findById(uid)

        if(user['balance'] < order.amount){
            return res.send(" You Have not enough balance ")
        } else {
            // const updateAmount = await ProductModel.findById({_id: pid}).select({price: 1})
            // console.log(updateAmount)
            const updatedUser = await UserModel.updateOne({_id : uid} ,{$inc : {balance : -order.amount} } , {new :true})
            console.log(updatedUser);
            order.isFreeAppUser = isFreeAppUser;
            const saveOrder = await OrderModel.create(order)
            return res.send({order : saveOrder})
    }
    }    

}

module.exports.createOrder = createOrder
