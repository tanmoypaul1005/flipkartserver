const express = require('express');
const { upload, requireSignIn,adminMiddleware  } = require('../../common-middleware/common-middleware');
const { createPage, getPage } = require('../../controller/admin/page');
const router = express.Router();

router.post(`/page/create`,requireSignIn, adminMiddleware, upload.fields([
    { name: 'banners' },
    { name: 'products' }
]), createPage)

router.get(`/page/:category/:type`, getPage);

module.exports = router;