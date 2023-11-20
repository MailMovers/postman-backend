const express = require("express");
const { productController } = require("../controllers");

const { insertProductController } = productController;
const productRoute = express.Router();

productRoute.post("/", insertProductController);

module.exports = { productRoute };
