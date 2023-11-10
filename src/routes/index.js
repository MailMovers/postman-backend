const express = require("express");

const { addressRoute } = require("./addressRoutes");
const { writingLetterRoute } = require("./writingLetterRoutes");

const router = express.Router();

router.use("/address", addressRoute);
router.use("/letter", writingLetterRoute);

module.exports = router;
