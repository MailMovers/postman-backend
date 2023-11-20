const express = require("express");
const { productController } = require("../controllers");

const {
  insertProductController,
  deleteProductController,
  getProductController,
  getProductListController,
} = productController;
const productRoute = express.Router();

productRoute.post("/", insertProductController);
productRoute.delete("/", deleteProductController);
productRoute.get("/:productId", getProductController);
productRoute.get("/?page=", getProductListController);
module.exports = { productRoute };
