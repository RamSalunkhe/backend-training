const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema( {
    userid : {
        type:ObjectId,
        ref:  userid
    },
    productId:{
        type: ObjectId,
        ref: Product
    },
    amount: Number,
    isFreeAppUser: Boolean,
    date: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema)
