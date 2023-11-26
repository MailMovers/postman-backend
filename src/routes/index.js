const express = require("express");

const { addressRoute } = require("./addressRoutes");
const { writingLetterRoute } = require("./writingLetterRoutes");
const { productRoute } = require("./productRoutes");
const { paymentRoute } = require("./paymentRoutes");

const router = express.Router();

router.use("/address", addressRoute);
router.use("/letter", writingLetterRoute);
router.use("/product", productRoute);
router.use("/payments", paymentRoute);

module.exports = router;
