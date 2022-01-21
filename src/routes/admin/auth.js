const express = require('express');
const { requireSignIn } = require('../../common-middleware/common-middleware');
const { AdminSignup, AdminSignin, signOut } = require('../../controller/admin/admin');


const { validateSignupRequest, validateSignInRequest, isRequestValidated } = require('../../validators/validators');
const router = express.Router();



router.post('/admin/signup',validateSignupRequest,isRequestValidated,AdminSignup)
router.post('/admin/signin',validateSignInRequest,isRequestValidated,AdminSignin) 
router.post('/admin/signout',requireSignIn,signOut)

module.exports = router;