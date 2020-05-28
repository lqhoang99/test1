var express=require('express');
var controller=require('../controllers/cart.controller');
var router=express.Router();

router.get('/add/:bookId',controller.addToCart);
router.get('/thue',controller.thue);

module.exports=router;