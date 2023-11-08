const express = require("express");
const paymentRouter = require("./paymentRouter")

const router = express.Router();

router.use("/payment", paymentRouter);

module.exports = router;
