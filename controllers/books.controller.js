const shortid = require("shortid");
var db = require("../db.js");

module.exports.index = (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
};
