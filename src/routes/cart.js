const express=require('express');
const { requireSignIn, userMiddleware } = require('../common-middleware/common-middleware');
const { addItemToCart,getCartItems,removeCartItems} = require('../controller/cart');
const router=express.Router();



router.post('/user/cart/addtocart',requireSignIn, userMiddleware,addItemToCart);
router.post("/user/getCartItems", requireSignIn, userMiddleware,getCartItems);
router.post("/user/cart/removeItem",requireSignIn, userMiddleware,removeCartItems);


module.exports = router;