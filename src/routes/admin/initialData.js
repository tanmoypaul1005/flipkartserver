
const express = require('express');
const { requireSignIn,adminMiddleware  } = require('../../common-middleware/common-middleware');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();


router.post('/initialdata',requireSignIn,adminMiddleware , initialData);


module.exports = router;