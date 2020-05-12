var express = require("express");
var controller = require("../controllers/users.controller");
var validate = require("../validate/users.validate.js");
var router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.get("/update", controller.update);

router.get("/:id/delete", controller.deleteUser);

router.get("/:id/update", controller.updateUser);

router.post("/create", validate.postCreate, controller.postCreate);

router.post("/:id/update", controller.postUpdateUser);

router.get("/:id/profile", controller.profile);

module.exports = router;
