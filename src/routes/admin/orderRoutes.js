const express = require("express");
const { requireSignIn,adminMiddleware  } = require('../../common-middleware/common-middleware');
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controller/admin/orderAdmin");
const router = express.Router();

router.post(`/order/update`, requireSignIn,adminMiddleware, updateOrder);
router.get(`/order/getCustomerOrders`,getCustomerOrders);

module.exports = router;