const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  paymentSuccessController,
  getPaymentInfoController,
} = require("../controllers/paymentControllers");

const paymentRoute = express.Router();

paymentRoute.get("/success", auth, paymentSuccessController);
paymentRoute.get("/paymentInfo",  getPaymentInfoController);

module.exports = { paymentRoute };
