const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");
const bookController = require("../controllers/bookController");
const publisherController = require("../controllers/publisherController");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});


// Author
router.post("/createAuthor", authorController.createAuthor);

// Publisher
router.post("/createPublisher", publisherController.createPublisher);

// Book
router.post("/createBook", bookController.createBook);
router.get("/fetchData", bookController.fetchData);
router.put("/setTrue",bookController.setTrue)
router.put("/updateBookPrice",bookController.updateBookPrice)
// router.put("/addAtrribute", bookController.addAtrribute);

module.exports = router;
