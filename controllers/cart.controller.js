var db = require("../db");
var shortid=require('shortid');
module.exports.addToCart = function(req, res, next) {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/books");
    return;
  }

  var count = db
    .get("sessions")
    .find({ id: sessionId })
    .get("cart." + bookId, 0)
    .value();
  var numCart = db.get("sessions")
    .find({ id: sessionId })
    .get("numCart", 0)
    .value();

  db.get("sessions")
    .find({ id: sessionId })
    .set("cart." + bookId, count + 1)
    .write();
  db.get("sessions")
    .find({ id: sessionId })
    .assign({ numCart: numCart + 1 })
    .write();
  res.redirect("/books");
};
module.exports.thue = function(req, res, next) {
  var userId= req.signedCookies.userId;
  if(!userId){
    res.redirect("/auth/login");
    return;
  }
  var id=shortid.generate();
  var sessionId = req.signedCookies.sessionId;
  
  var object = db.get("sessions")
              .find({ id: sessionId })
              .value();
  var cart=object.cart;
  for(var i in cart){
    db.get("transactions")
      .push({
        userId:userId,
        bookId:i,
        id:id
      })
      .write();
  }
  db.get('sessions')
  .find({ id: sessionId })
  .assign({ cart: {}})
  .assign({ numCart: 0})
  .write()
  res.redirect("/books");
};