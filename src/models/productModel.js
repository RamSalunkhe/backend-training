const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: String,
        category:String,
        price:{
            type : Number,
            required :true
        }
    },{ timestamps :true}
)

module.exports = new mongoose.model("Product" , productSchema)
