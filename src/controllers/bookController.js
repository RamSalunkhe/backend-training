const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel = require('../models/authorModel');


const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const createAuthor = async function (req, res) {
    let data = req.body
    let savedDara = await AuthorModel.create(data);
    res.send({msg: savedDara});
}

// List out the books written by "Chetan Bhagat" ( this will need 2 DB queries one after another- first query will find the author_id for "Chetan Bhagat”. Then next query will get the list of books with that author_id )

const listBooks = async function (req, res) {
    // let idOfAuthor = await AuthorModel.find({author_name: "Chetan Bhagat"}).select({author_id: 1, _id: 0});
    let findAuthor = await AuthorModel.find({author_name: "Chetan Bhagat"});
    let findBookwithAuthorId = await BookModel.find({author_id : {$eq: findAuthor[0].author_id}})
    res.send({msg: findBookwithAuthorId});
}

// find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.  ( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query with author_id from previous query)
const updateBook = async function (req, res) {
    let updateBookPrice = await BookModel.findOneAndUpdate({name : "Two states"},{$set: {price: 100}},{new : true});
    let updatedPrice = updateBookPrice.price;
    let authorNameOfUpdatedBookPrice = await AuthorModel.find({author_id: {$eq: updateBookPrice.author_id}}).select({author_name: 1, _id: 0});
    res.send( {authorNameOfUpdatedBookPrice, updatedPrice});
}

// Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.. 
// bookModel.find( { price : { $gte: 50}  ,  price: {$lte: 100} } ) // WRONG
// bookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1})..run a map(or forEach) loop and get all the authorName corresponding to the authorId’s ( by querying authorModel)
const findInRange = async function (req, res) {
    let bookBetween50_100 = await BookModel.find({price: {$gte: 50, $lte: 100}}).select({author_id: 1, _id: 0})
    let id = bookBetween50_100.map(x => x.author_id); 
    let authorName = await AuthorModel.find({author_id: id}).select({author_name: 1, _id: 0}); 
    res.send({msg: authorName})
}


module.exports.createBook = createBook
module.exports.createAuthor = createAuthor
module.exports.listBooks = listBooks
module.exports.updateBook = updateBook
module.exports.findInRange = findInRange


// COVERD IN LECTURE /////////////////////////////////////////////////////


// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find( {authorName : "HO" } )
//     console.log(allBooks)
//     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//     else res.send({msg: "No books found" , condition: false})
// }


// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )
     
//      res.send( { msg: allBooks})
// }

// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }



// module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData
// module.exports.updateBooks= updateBooks
// module.exports.deleteBooks= deleteBooks
