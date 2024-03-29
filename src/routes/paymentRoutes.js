const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  paymentSuccessController,
  getPaymentInfoController,
  getPointTransactions,
  usePointsForPaymentController,
} = require("../controllers/paymentControllers");

const paymentRoute = express.Router();

paymentRoute.post("/success", auth, paymentSuccessController);
paymentRoute.get("/paymentInfo", auth, getPaymentInfoController);
paymentRoute.get("/pointTransactions", auth, getPointTransactions);
paymentRoute.post("/usePointsForPayment", auth, usePointsForPaymentController);

module.exports = { paymentRoute };
