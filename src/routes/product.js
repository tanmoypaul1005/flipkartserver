const express=require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware/common-middleware');
const { createProduct, getProductsBySlug,getProductDetailsById } = require('../controller/product');
var multer = require('multer');
const router = express.Router();
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


router.post("/product/create",requireSignIn, adminMiddleware,upload.array('picture'),createProduct);
router.get("/products/:slug",getProductsBySlug);
router.get("/product/:productId", getProductDetailsById);

module.exports = router;