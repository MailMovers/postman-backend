const express = require("express");
const auth = require("../middlewares/auth.middleware");
const { paymentController } = require("../controllers");

const { paymentSuccessController } = paymentController;

const paymentRoute = express.Router();

paymentRoute.get("/success", auth, paymentSuccessController);

module.exports = { paymentRoute };
