var express = require("express");
var controller = require("../controllers/transactions.controller");
var router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

router.get("/:id/complete", controller.completeUser);

module.exports = router;
