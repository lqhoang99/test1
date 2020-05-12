var express = require("express");
var multer  = require('multer');


var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

var controller = require("../controllers/profile.controller");
var router = express.Router();

router.get("/", controller.profile);
router.get("/avatar", controller.updateAvatar);
router.post("/:id", controller.postUpdateUser);
router.post("/avatar/:id",upload.single('avatar'), controller.postAvatarUser);
module.exports = router;

