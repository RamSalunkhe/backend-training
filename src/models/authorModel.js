const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    author_id: {
        type: Number, 
        required : true
    },
    author_name : String,
    age: Number,
    address : String
 
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema) //users



// String, Number
// Boolean, Object/json, array

   // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]