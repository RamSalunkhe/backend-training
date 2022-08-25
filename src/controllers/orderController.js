// const { count } = require("console")
const OrderModel= require("../models/productModel")

const createOrder= async function (req, res) {
    let data = req.body
    // let authorId = data.dauthor_id
    // if(!authorId) return res.send({msg: 'AuthorId is mandatory in the request'})
    let savedData= await OrderModel.create(data)
    res.send({data: savedData})
}

module.exports.createOrder= createOrder
