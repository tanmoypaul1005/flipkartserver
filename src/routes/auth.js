const express = require('express');
const { signup,signin,signOut} = require('../controller/auth');
const router = express.Router();
const { validateSignupRequest, validateSignInRequest, isRequestValidated } = require('../validators/validators');
const User=require('../models/user');


router.post('/user/signup',validateSignupRequest,isRequestValidated,signup)
router.post('/user/signin',validateSignInRequest,isRequestValidated,signin)
router.post('/user/signout',signOut)
module.exports = router;