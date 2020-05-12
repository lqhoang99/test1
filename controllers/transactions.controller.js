const shortid = require("shortid");
var db = require("../db.js");

module.exports.index = (req, res) => {
  var Transactions = db.get("transactions").value();

  var matchedTransactions = Transactions.filter(function(Transaction) {
    return Transaction.userId == req.cookies.userId && !Transaction.isAdmin;
  });
  res.render("transactions/index", {
    transactions: matchedTransactions
  });
};

module.exports.create = (req, res) => {
  res.render("transactions/create");
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  req.body.isComplete = false;
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("/transactions");
};

module.exports.completeUser = (req, res) => {
  var id = req.params.id;
  if (id) {
    var transaction = db
      .get("transactions")
      .find({ id: id })
      .assign({ isComplete: true })
      .write();
    res.redirect("/transactions");
  }
};
