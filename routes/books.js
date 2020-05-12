var express = require("express");
var controller = require("../controllers/books.controller");
var router = express.Router();

router.get("/", controller.index);
module.exports = router;
