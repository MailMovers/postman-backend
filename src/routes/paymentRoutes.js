const express = require("express")

const { 
    paymentSuccessController, 

} = require("../controllers/paymentControllers")

const paymentRoute = express.Router();

paymentRoute.get("/success", paymentSuccessController)

module.exports = { paymentRoute }