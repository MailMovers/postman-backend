const express = require("express");
const { insertCsController } = require("../controllers/csControllers");

const csRoute = express.Router();

csRoute.post("/", insertCsController);

module.exports = csRoute;
