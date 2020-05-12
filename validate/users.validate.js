module.exports.postCreate = (req, res, next) => {
  var errors = [];
  if (!req.body.name) {
    errors.push("Name is required.");
  }
  if (req.body.name.length > 30) {
    errors.push("Name is too long(<30)");
  }
  if (errors.length) {
    res.render("users/create", {
      errors: errors,
      value: req.body
    });
    return;
  }
  next();
};
