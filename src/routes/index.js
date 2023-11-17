const express = require("express");

const { addressRoute } = require("./addressRoutes");
const { writingLetterRoute } = require("./writingLetterRoutes");
const { paymentRoute } = require("./paymentRoutes")

const router = express.Router();

router.use("/address", addressRoute);
router.use("/letter", writingLetterRoute);
router.use("/payments", paymentRoute);


module.exports = router;
