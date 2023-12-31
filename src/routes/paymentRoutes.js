const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  paymentSuccessController,
  getPaymentInfoController,
} = require("../controllers/paymentControllers");

const paymentRoute = express.Router();

paymentRoute.post("/success", auth, paymentSuccessController);
paymentRoute.get("/paymentInfo", auth, getPaymentInfoController);

module.exports = { paymentRoute };
