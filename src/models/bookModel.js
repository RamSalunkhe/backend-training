// Create a bookSchema with bookName, authorName, category and year . Create same 2 api's for books i.e. : 1 api to create a new book and another api to get the list of all books. 

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type: String,
        required: true
    }, 
    authorName: String, 
    tags: [String],
    year : {
        type : Number,
        default : 2021
    },
    isPublished: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    totalPages: Number,
    stockAvailable: Boolean
}, { timestamps: true });



module.exports = mongoose.model('Book',bookSchema);