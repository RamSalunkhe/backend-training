const BookModel = require('../models/bookModel');

const createBook = async function(req, res) {
    let data = req.body;
    let savedData = await BookModel.create(data);
    res.send({msg : savedData});
}

const getBookData = async function (req, res) {
    let allBooks = await BookModel.find();
    res.send({msg : allBooks});
}

const bookLists = async function (req, res) {
    let listBooks = await BookModel.find().select({bookName: 1, authorName: 1, _id: 0});
    res.send({msg: listBooks});
}

const getBooksInYear = async function (req, res) {
    let bookByYear = await BookModel.find({year :req.body.year}).select({bookName: 1, _id: 0});
    res.send({msg: bookByYear});
}

const getParticularBooks = async function (req, res) {
    let particularBook = await BookModel.find(req.body);
    res.send({msg: particularBook});
}

const getXINRBooks = async function (req, res) {
    let bookByIndianRupees = await BookModel.find({"prices.indianPrice":{$in:["940","200"]}}).select({bookName:1, _id: 0});
    res.send({msg : bookByIndianRupees});
}

const getRandomBooks = async function (req, res) {
    let randomBooks = await BookModel.find({$or:[{stockAvailable: true},{totalPages:{$gt: 500} }]})
    res.send({msg: randomBooks});
}

module.exports.createBook = createBook;
module.exports.getBookData = getBookData;
module.exports.bookLists = bookLists;
module.exports.getBooksInYear = getBooksInYear;
module.exports.getParticularBooks = getParticularBooks;
module.exports.getXINRBooks = getXINRBooks;
module.exports.getRandomBooks = getRandomBooks;