const express = require("express");
const { paymentController } = require("../controllers");

const paymentRouter = express.Router();

paymentRouter.post("/payment", paymentController.processPayment);

module.exports = paymentRouter;
