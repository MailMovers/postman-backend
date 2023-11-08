const express = require("express");

const { addressRoute } = require("./addressRoutes");

const router = express.Router();

router.use("/address", addressRoute);

module.exports = router;
