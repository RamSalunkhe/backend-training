const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const publisherModel = require("../models/publisherModel");

// The authorId is present in the request body. If absent send an error message that this detail is required
const createBook = async function (req, res) {
  let book = req.body;
  let authorRefId = book.author;
  let publisherRefId = book.publisher;

  if (!authorRefId && !publisherRefId) {
    res.send({ msg: "Author and publisher is required" });
  } else {
    let bookCreated = await bookModel.create(book);
    res.send({ data: bookCreated });
  }

  //Q3 a) If authorId is absent send an error message that this detail is required
  if (!authorRefId) {
    res.send("Authore is required");
  }

  // b) If present, make sure the authorId is a valid ObjectId in the author collection. If not then send an error message that the author is not present.
  let author = await bookModel.findById(book.author);
  if (!author) {
    res.send({ status: false, msg: "author ID is not valid" });
  }

  // c) The publisherId is present in the request body. If absent send an error message that this detail is required
  if (!publisherRefId) {
    res.send("Publisher is required");
  }

  // d) If present, make sure the publisherId is a valid ObjectId in the publisher collection. If not then send an error message that the publisher is not present.
  let publisher = await bookModel.findById(book.publisher);
  if (!publisher) {
    res.send("Publisher id is not valid");
  }
};

// 4. Write a GET api that fetches all the books along with their author details (you have to populate for this) as well the publisher details (you have to populate for this)
const fetchData = async function (req, res) {
  let getBooks = await bookModel.find().populate("author publisher");
  res.send({ msg: getBooks });
};

// 5. Create at least 4 publishers (Penguin, Bloomsbury, Saraswati House, HarperCollins). Create at least 6 authors with ratings 2, 3, 3.5, 4, 4.5 and 5. Create around 10 books with these publishers and authors.
// Create a new PUT api /books and perform the following two operations

//  a) Add a new boolean attribute in the book schema called isHardCover with a default false value. 
// For the books published by 'Penguin' and 'HarperCollins', update this key to true.

// const addAtrribute = async function(req, res) {
//   let add = await bookModel.updateMany({},{$set: {isHardCover : 'false' }})
//   res.send({msg: add})
// }

const setTrue = async function (req, res) {
  let requiredPublishers = await publisherModel.find(
    { $or: [{ name: "Penguin" }, { name: "HarperCollins" }] },
    { _id: 1 }
  );
 
  let idOfPublisher = requiredPublishers.map((x) => x._id);
  let updatedBooks = await bookModel.updateMany({ publisher: { $in: idOfPublisher } },{ isHardCover: true },{new : true}
  );

  res.send({ data: updatedBooks });
};

//  b) For the books written by authors having a rating greater than 3.5, update the books price by 10 (For eg if old price for such a book is 50, new will be 60)

const updateBookPrice = async function (req, res) {
  let authorId = await (await authorModel.find({rating: {$gt: 3.5}},{_id: 1})).map(x => x._id)

  let updatePrice = await bookModel.updateMany({author: {$in: authorId}},{$inc:{price: 10}})
  res.send(updatePrice)
}



module.exports.createBook = createBook;
module.exports.fetchData = fetchData;
// module.exports.addAtrribute = addAtrribute
module.exports.setTrue = setTrue;
module.exports.updateBookPrice = updateBookPrice;
