const express = require("express");
const { paymentController } = require("../controllers");

const { paymentSuccessController } = paymentController;

const paymentRoute = express.Router();

paymentRoute.get("/success", paymentSuccessController);

module.exports = { paymentRoute };
