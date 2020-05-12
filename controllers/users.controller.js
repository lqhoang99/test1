const shortid = require("shortid");
var db = require("../db.js");

module.exports.index = (req, res) => {
  var page = parseInt(req.query.page) || 1;
  var perPage = 9;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  res.render("users/index", {
    users: db.get("users").value().slice(start,end),
    page:req.query.page
  });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.update = (req, res) => {
  res.render("users/update");
};

module.exports.deleteUser = (req, res) => {
  var id = req.params.id;
  var todo = db
    .get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
};

module.exports.updateUser = (req, res) => {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/update", { id: id, user: user });
};

module.exports.profile = (req, res) => {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/profile", { id: id, user: user });
};


module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};

module.exports.postUpdateUser = (req, res) => {
  var id = req.params.id;
  var upuser = req.body.upuser;
  db.get("users")
    .find({ id: id })
    .assign({ name: upuser })
    .write();
  res.redirect("/users");
};


