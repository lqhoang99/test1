const shortid = require("shortid");
var Book=require('../models/book.model');
module.exports.index = async (req, res) => {
  var sessionId = req.signedCookies.sessionId;
  var books=await Book.find();
  res.render("books/index", {
    books: books
  });
}


/*const shortid = require("shortid");
var db = require("../db.js");

module.exports.index = (req, res) => {
  var sessionId = req.signedCookies.sessionId;
  res.render("books/index", {
    books: db.get("books").value(),
    numCart: db.get("sessions")
              .find({ id: sessionId })
              .get("numCart")
              .value()
  });
};*/