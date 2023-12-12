const express = require("express");
const router = express.Router();


const { addressRoute } = require("./addressRoutes");
const { writingLetterRoute } = require("./writingLetterRoutes");
const { productRoute } = require("./productRoutes");
const { paymentRoute } = require("./paymentRoutes");
const userRoute = require("./userRoutes");

router.use("/user", userRoute);
router.use("/address", addressRoute);
router.use("/letter", writingLetterRoute);
router.use("/product", productRoute);
router.use("/payments", paymentRoute);

module.exports = router;
